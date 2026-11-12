/*
 * PDF indirme
 * -----------
 * Soruları (şekiller dahil) gerçek bir PDF dosyası olarak indirir.
 * pdfmake kütüphanesi (vendor/pdfmake) yalnızca ilk indirmede yüklenir.
 *
 * QBPDF.download({
 *   sheets: [{ student, code, items, responses?, checked? }],
 *   includeKey: true,          // sonda cevap anahtarı sayfası
 *   filename: "sinav.pdf",
 * })
 */
(function () {
  "use strict";
  const here = document.currentScript ? document.currentScript.src : location.href;
  const BASE = new URL("vendor/pdfmake/", here).href;
  const C = { ink: "#18222d", muted: "#5a6877", ok: "#1b7343", bad: "#b3312a", accent: "#2356c4", line: "#d6dde5" };

  let loading = null;
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Yüklenemedi: " + src));
      document.head.append(s);
    });
  }
  function ensureLib() {
    if (window.pdfMake && window.pdfMake.vfs && window.pdfMake.vfs["Roboto-Regular.ttf"]) return Promise.resolve();
    if (!loading) {
      loading = loadScript(BASE + "pdfmake.min.js").then(() => loadScript(BASE + "vfs_fonts.js"));
      loading.catch(() => { loading = null; });
    }
    return loading;
  }

  // Soru HTML'ini (<b>, <i>, <sub>, <sup>) pdfmake metin parçalarına çevirir.
  function runs(html, base = {}) {
    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
    const out = [];
    (function walk(node, st) {
      for (const n of node.childNodes) {
        if (n.nodeType === 3) {
          if (n.textContent) out.push({ text: n.textContent, ...st });
        } else if (n.nodeType === 1) {
          const tag = n.tagName.toLowerCase();
          if (tag === "br") { out.push({ text: "\n" }); continue; }
          const s2 = { ...st };
          if (tag === "b" || tag === "strong") s2.bold = true;
          if (tag === "i" || tag === "em") s2.italics = true;
          if (tag === "sub") s2.sub = true;
          if (tag === "sup") s2.sup = true;
          walk(n, s2);
        }
      }
    })(doc.body.firstChild, base);
    return out.length ? out : [{ text: "" }];
  }
  const plain = (html) => runs(html).map((r) => r.text).join("");

  function svgWidth(svg) {
    const m = /width="(\d+(?:\.\d+)?)"/.exec(svg);
    return m ? Number(m[1]) : 320;
  }

  // Boş cevap satırları
  function lines(k) {
    return { canvas: Array.from({ length: k }, (_, i) => ({ type: "line", x1: 0, y1: 18 * (i + 1), x2: 440, y2: 18 * (i + 1), lineWidth: 0.5, lineColor: "#b8c0ca" })), margin: [16, 0, 0, 4] };
  }

  // Açık uçlu (bölümlü) sorunun a), b), c) bölümleri
  // MEB biçimi cevap kutusu
  function answerBox(h) {
    return { canvas: [{ type: "rect", x: 0, y: 0, w: 455, h, r: 4, lineWidth: 0.9, lineColor: "#c9a13b" }], margin: [0, 2, 0, 6] };
  }
  function yaziliBlocks(inst, lang, resp, checked, qNo, scaled) {
    const t = UI.t;
    const r = resp && typeof resp === "object" ? resp : { p: [], s: {} };
    const given = r.p || [];
    const scores = checked ? QB.partScores(inst, r) : null;
    const out = [];
    const oc = QB.outcomeOf(inst.tpl, lang);
    if (!oc && inst.tpl.skills && inst.tpl.skills.length) {
      const names = inst.tpl.skills.map((k) => (QB_I18N[lang].skills || {})[k] || k).join(" · ");
      out.push({ text: `${t("skillsLabel")}: ${names}`, fontSize: 8, color: C.muted, margin: [0, 0, 0, 4] });
    }
    inst.tpl.parts.forEach((pt, i) => {
      const max = QB.partPoints(inst.tpl, i);
      const shown = scaled ? scaled[i] : max;
      const part = [{
        columns: [
          { text: QB.partLabel(qNo, i), width: 26, bold: true },
          { text: runs(QB.partText(inst, i, lang)), width: "*" },
          { text: t("pts", { n: shown }), width: 44, alignment: "right", noWrap: true, fontSize: 8, color: C.muted },
        ],
        bold: true,
        margin: [0, 6, 0, 3],
      }];
      if (!checked) {
        if (pt.kind === "select") {
          part.push({ text: QB.partOptions(inst, i, lang).map((o) => "(   ) " + plain(o)).join("      "), margin: [26, 4, 0, 4] });
        } else part.push(answerBox(pt.kind === "number" ? 56 : 78));
      } else {
        const got = scores[i];
        const col = got >= max ? C.ok : got > 0 ? "#a8640a" : C.bad;
        let mine;
        if (pt.kind === "select") mine = given[i] === null || given[i] === undefined || given[i] === "" ? "—" : plain(QB.partOptions(inst, i, lang)[Number(given[i])] || "—");
        else mine = given[i] === null || given[i] === undefined || String(given[i]).trim() === "" ? "—" : String(given[i]) + (pt.kind === "number" && QB.partUnit(inst, i, lang) ? " " + QB.partUnit(inst, i, lang) : "");
        part.push({ text: [{ text: t("pdfYourAnswer") + ": ", color: C.muted }, { text: mine, color: pt.kind === "text" ? C.ink : col }], margin: [16, 2, 0, 2] });
        if (pt.kind !== "text") {
          if (got < max) part.push({ text: t("correctIs", { a: QB.partAnswer(inst, i, lang) }), fontSize: 9, margin: [16, 0, 0, 2] });
        } else {
          part.push({ text: [{ text: t("modelAnswer") + ": ", bold: true }, ...runs(QB.partModel(inst, i, lang))], fontSize: 9, margin: [16, 3, 0, 2] });
          const ticks = (r.s && r.s[String(i)]) || [];
          QB.partRubric(inst, i, lang).forEach((rb, j) => part.push({
            columns: [{ text: ticks[j] ? "[x]" : "[  ]", width: 20, color: ticks[j] ? C.ok : C.muted }, { text: runs(rb.text), width: "*" }, { text: t("pts", { n: rb.points }), width: 44, alignment: "right", noWrap: true, color: C.muted }],
            fontSize: 8.5, margin: [16, 1, 0, 1],
          }));
        }
        const g2 = scaled ? Math.round((got / max) * shown * 10) / 10 : got;
        part.push({ text: `${QB.formatNum(g2, 1, lang)} / ${shown}`, bold: true, color: col, fontSize: 9, margin: [16, 2, 0, 0] });
      }
      out.push({ stack: part, unbreakable: true });
    });
    if (checked) {
      const got = QB.pointsOf(inst, r), max = QB.maxPoints(inst);
      out.push({ text: scaled ? "" : t("qPoints", { p: got, m: max }), bold: true, color: got >= max ? C.ok : got > 0 ? "#a8640a" : C.bad, margin: [0, 6, 0, 0] });
    }
    return out;
  }

  function questionBlock(inst, n, lang, resp, checked, scaled) {
    const t = UI.t;
    const stack = [];
    stack.push({ text: `${UI.topicName(QB.topicOf(inst.tpl))} · ${UI.levelName(QB.levelOf(inst.tpl))}`.toUpperCase(),
      fontSize: 7.5, color: C.muted, characterSpacing: 0.4, margin: [0, 1, 0, 3] });
    if (inst.error) {
      stack.push({ text: t("questionError", { e: inst.error }), color: C.bad });
      return { stack: [{ columns: [{ text: `${n}.`, width: 20, bold: true, color: C.accent }, { stack, width: "*" }] }], margin: [0, 0, 0, 14] };
    }
    const p = QB.renderParts(inst, lang);
    const fig = p.figure
      ? { svg: QB_FIG.inlineStyles(p.figure), width: Math.min(svgWidth(p.figure) * 0.72, 280), margin: [0, 4, 0, 6] }
      : null;
    if (fig && p.figureFirst) stack.push(fig);
    stack.push({ text: runs(p.stem), margin: [0, 0, 0, 3] });
    if (fig && !p.figureFirst) stack.push(fig);
    p.statements.forEach((st, i) => stack.push({
      columns: [{ text: QB.ROMAN[i] + ".", width: 24, color: C.muted }, { text: runs(st), width: "*" }], margin: [6, 1, 0, 1],
    }));
    if (p.ask) stack.push({ text: runs(p.ask, { bold: true }), margin: [0, 3, 0, 2] });

    if (inst.type === "yazili") {
      stack.push(...yaziliBlocks(inst, lang, resp, checked, n, scaled));
      return {
        stack: [{ columns: [{ text: `${n}.`, width: 20, bold: true, color: C.accent }, { stack, width: "*" }] }],
        margin: [0, 0, 0, 16],
      };
    }

    if (inst.choices) {
      if (inst.type === "changes") {
        stack.push({ text: "(" + inst.tpl.changes.map((c) => plain(QB.localized(c.label, lang))).join(" / ") + ")",
          fontSize: 8.5, color: C.muted, margin: [6, 3, 0, 1] });
      }
      inst.choices.forEach((c, ci) => {
        const picked = resp === ci;
        let color = C.ink, bold = false;
        if (checked && c.correct) { color = C.ok; bold = true; }
        if (checked && picked && !c.correct) color = C.bad;
        const label = inst.type === "changes" ? [{ text: QB.choiceText(inst, ci, lang) }] : runs(QB.choiceHtml(inst, ci, lang));
        const body = [...label];
        if (checked && picked) body.push({ text: `   (${t("pdfYourChoice")})`, fontSize: 8, bold: false });
        stack.push({
          columns: [{ text: QB.LETTERS[ci] + ")", width: 18, color: checked ? color : C.muted, bold }, { text: body, color, bold, width: "*" }],
          margin: [6, 1.5, 0, 1.5],
        });
      });
    } else if (checked) {
      const unit = QB.unitFor(inst, lang);
      const given = resp === null || resp === undefined || resp === "" ? "—" : String(resp) + (unit ? " " + unit : "");
      stack.push({ text: [{ text: t("pdfYourAnswer") + ": ", color: C.muted }, { text: given, color: QB.isCorrect(inst, resp) ? C.ok : C.bad, bold: true }], margin: [6, 4, 0, 0] });
    } else {
      const unit = QB.unitFor(inst, lang);
      stack.push({ text: `${t("answerLabel")}: ______________ ${unit || ""}`, margin: [6, 8, 0, 0] });
    }

    if (checked) {
      const ok = QB.isCorrect(inst, resp);
      const blank = resp === null || resp === undefined || resp === "";
      stack.push({
        text: [
          { text: t(ok ? "correct" : blank ? "blank" : "wrong"), bold: true, color: ok ? C.ok : blank ? C.muted : C.bad },
          ok ? "" : { text: "   " + t("correctIs", { a: QB.answerString(inst, lang) }), color: C.ink },
        ],
        fontSize: 9, margin: [6, 4, 0, 0],
      });
    }

    return {
      stack: [{ columns: [{ text: `${n}.`, width: 20, bold: true, color: C.accent }, { stack, width: "*" }] }],
      unbreakable: true,
      margin: [0, 0, 0, 14],
    };
  }

  function fmtDate(d, lang) {
    try { return new Intl.DateTimeFormat({ tr: "tr-TR", en: "en-GB", de: "de-DE" }[lang] || lang, { dateStyle: "long" }).format(d); }
    catch { return d.toISOString().slice(0, 10); }
  }

  function sheetHeader(sheet, lang, first) {
    const t = UI.t;
    const valid = sheet.items.filter((i) => !i.error);
    let score = "";
    if (sheet.checked) {
      const rs = (inst) => sheet.responses[sheet.items.indexOf(inst)];
      score = t("score", { c: valid.filter((inst) => QB.isCorrect(inst, rs(inst))).length, n: valid.length });
      if (allOpen(sheet)) {
        const sc = QB.scale100(sheet.items);
        let p = 0;
        sheet.items.forEach((inst, qi) => { if (sc[qi]) QB.partScores(inst, sheet.responses[qi]).forEach((v, i) => { p += (v / QB.partPoints(inst.tpl, i)) * sc[qi][i]; }); });
        score = t("mebScore100", { p: Math.round(p) });
      } else if (valid.some((i) => i.type === "yazili")) {
        const pts = valid.reduce((a, inst) => a + QB.pointsOf(inst, rs(inst)), 0);
        const max = valid.reduce((a, inst) => a + QB.maxPoints(inst), 0);
        score += " · " + t("pointsTotal", { p: pts, m: max });
      }
    }
    const band = allOpen(sheet) ? [{
      table: { widths: ["*"], body: [[{ text: [{ text: (QB_I18N[lang].subjects.fizik || "Fizik").toUpperCase() + "\n", fontSize: 13 }, { text: t("mebHeader").toUpperCase(), fontSize: 9.5 }], bold: true, alignment: "center", color: "#ffffff", fillColor: HEAD, margin: [0, 4, 0, 4] }]] },
      layout: "noBorders", margin: [0, 6, 0, 0],
    }] : [];
    return [
      {
        columns: [
          { text: t("appName"), bold: true, fontSize: 13, color: C.accent },
          { text: fmtDate(sheet.date ? new Date(sheet.date) : new Date(), lang), alignment: "right", fontSize: 9, color: C.muted, margin: [0, 3, 0, 0] },
        ],
        pageBreak: first ? undefined : "before",
      },
      ...band,
      {
        table: {
          widths: ["*", "auto", "auto"],
          body: [[
            { text: [{ text: t("sheetName") + ": ", color: C.muted }, { text: sheet.student || "", bold: true }] },
            { text: [{ text: t("sheetCode") + ": ", color: C.muted }, sheet.code || ""] },
            score ? { text: score, bold: true, color: C.accent } : "",
          ]],
        },
        layout: { hLineWidth: (i) => (i === 1 ? 0.8 : 0), vLineWidth: () => 0, hLineColor: () => C.line, paddingLeft: () => 0, paddingRight: () => 10, paddingBottom: () => 6 },
        margin: [0, 8, 0, 14],
      },
    ];
  }

  function keySection(sheets, lang) {
    const t = UI.t;
    const out = [{ text: t("pdfKey"), bold: true, fontSize: 13, color: C.accent, pageBreak: "before", margin: [0, 0, 0, 10] }];
    for (const sh of sheets) {
      if (sheets.length > 1 || sh.student) out.push({ text: `${sh.student}${sh.code ? " · " + sh.code : ""}`, bold: true, margin: [0, 6, 0, 4] });
      const answerRuns = (inst) => {
        if (inst.error) return [{ text: "—" }];
        if (!inst.choices) return [{ text: QB.answerString(inst, lang) }];
        const ci = inst.choices.findIndex((c) => c.correct);
        const body = inst.type === "changes" ? [{ text: QB.choiceText(inst, ci, lang) }] : runs(QB.choiceHtml(inst, ci, lang));
        return [{ text: QB.LETTERS[ci] + ") " }, ...body];
      };
      const cells = sh.items.map((inst, i) => ({
        text: [{ text: `${i + 1}. `, bold: true, color: C.accent }, ...answerRuns(inst)],
        fontSize: 9.5, margin: [0, 1, 0, 1],
      }));
      const half = Math.ceil(cells.length / 2);
      out.push({ columns: [{ stack: cells.slice(0, half) }, { stack: cells.slice(half) }], columnGap: 20 });

      // Açık uçlu sorular: MEB "Çözümler" bölümü (çözüm + TAM / KISMİ / SIFIR PUAN)
      const sc = allOpen(sh) ? QB.scale100(sh.items) : null;
      sh.items.forEach((inst, qi) => {
        if (inst.error || inst.type !== "yazili") return;
        const block = [];
        if (qi === sh.items.findIndex((x) => !x.error && x.type === "yazili")) out.push({ text: t("mebSolutions").toUpperCase(), bold: true, alignment: "center", color: HEAD, fontSize: 11, margin: [0, 12, 0, 6] });
        inst.tpl.parts.forEach((pt, i) => {
          const max = QB.partPoints(inst.tpl, i);
          const shown = sc ? sc[qi][i] : max;
          const k = shown / max;
          const item = [];
          const sol = pt.kind === "text" ? QB.partModel(inst, i, lang) : [QB.partAnswer(inst, i, lang), QB.partSolution(inst, i, lang)].filter(Boolean).join(" — ");
          item.push({ columns: [{ text: QB.partLabel(qi + 1, i), width: 30, bold: true }, { text: runs(sol), width: "*" }], fontSize: 9.5, margin: [0, 4, 0, 3] });
          const fullTxt = pt.kind === "number" ? t("mebFullNum") : pt.kind === "select" ? t("mebFullSel") : t("mebFullText");
          item.push({ text: t("mebFull", { n: shown }), bold: true, fontSize: 8.5, margin: [30, 1, 0, 0] });
          item.push({ text: fullTxt, fontSize: 8.5, margin: [30, 0, 0, 2] });
          const crit = QB.partRubric(inst, i, lang);
          item.push({ text: t("mebPartial"), bold: true, fontSize: 8.5, margin: [30, 1, 0, 0] });
          if (!crit.length) item.push({ text: t("mebNoPartial"), fontSize: 8.5, margin: [30, 0, 0, 2] });
          crit.forEach((rb) => item.push({ text: [...runs(rb.text), { text: `  (${t("pts", { n: QB.formatNum(Math.round(rb.points * k * 10) / 10, 1, lang) })})`, color: C.muted }], fontSize: 8.5, margin: [30, 0, 0, 1] }));
          item.push({ text: t("mebZero"), bold: true, fontSize: 8.5, margin: [30, 2, 0, 0] });
          item.push({ text: t("mebZeroText"), fontSize: 8.5, margin: [30, 0, 0, 4] });
          block.push({ stack: item, unbreakable: true });
        });
        out.push({ text: `${qi + 1}.`, bold: true, color: C.accent, margin: [0, 6, 0, 0] }, ...block);
      });
    }
    return out;
  }

  const allOpen = (sh) => { const v = sh.items.filter((i) => !i.error); return v.length > 0 && v.every((i) => i.type === "yazili"); };
  const HEAD = "#5a5a2a", HEADBG = "#e9e6c8";

  // MEB kitapçığındaki gibi: "Soru no / Öğrenme çıktısı / Beceriler" ve "Puanlama tablosu"
  function mebTables(sh, lang, sc) {
    const t = UI.t;
    const out = [];
    const rows = [[{ text: t("mebQNo"), bold: true, fillColor: HEADBG }, { text: t("mebOutcome"), bold: true, fillColor: HEADBG }, { text: t("mebSkills"), bold: true, fillColor: HEADBG }]];
    sh.items.forEach((inst, qi) => {
      if (inst.error || inst.type !== "yazili") return;
      const o = QB.outcomeOf(inst.tpl, lang);
      rows.push([{ text: String(qi + 1), alignment: "center" }, o ? o.text : UI.topicName(QB.topicOf(inst.tpl)), o ? o.skills.join("\n") : "—"]);
    });
    out.push({ table: { headerRows: 1, widths: [34, "*", 150], body: rows }, layout: { hLineColor: () => "#b9b48a", vLineColor: () => "#b9b48a" }, fontSize: 8.5, margin: [0, 14, 0, 10], unbreakable: true });
    // puanlama tablosu: her soru için madde puanları
    const cells = [];
    sh.items.forEach((inst, qi) => {
      if (inst.error || inst.type !== "yazili") return;
      inst.tpl.parts.forEach((_, i) => cells.push({ label: QB.partLabel(qi + 1, i), pts: sc ? sc[qi][i] : QB.partPoints(inst.tpl, i) }));
    });
    const total = cells.reduce((a, c) => a + c.pts, 0);
    for (let k = 0; k < cells.length; k += 12) {
      const chunk = cells.slice(k, k + 12);
      const last = k + 12 >= cells.length;
      const head = chunk.map((c) => ({ text: c.label, bold: true, alignment: "center", fillColor: HEADBG }));
      const vals = chunk.map((c) => ({ text: String(c.pts), alignment: "center" }));
      if (last) { head.push({ text: t("mebTotal").toUpperCase(), bold: true, alignment: "center", fillColor: HEADBG }); vals.push({ text: String(total), bold: true, alignment: "center" }); }
      out.push({
        table: { widths: head.map(() => "*"), body: [head, vals] },
        layout: { hLineColor: () => "#b9b48a", vLineColor: () => "#b9b48a" }, fontSize: 8.5,
        margin: [0, k ? 4 : 0, 0, 0],
      });
      if (k === 0) out.splice(out.length - 1, 0, { text: t("mebScoreTable").toUpperCase(), bold: true, alignment: "center", color: HEAD, fontSize: 10, margin: [0, 6, 0, 4] });
    }
    return out;
  }

  async function download({ sheets, includeKey, filename }) {
    await ensureLib();
    const lang = UI.lang;
    const content = [];
    sheets.forEach((sh, si) => {
      content.push(...sheetHeader(sh, lang, si === 0));
      const sc = allOpen(sh) ? QB.scale100(sh.items) : null;
      sh.items.forEach((inst, qi) => content.push(questionBlock(inst, qi + 1, lang, sh.responses ? sh.responses[qi] : null, !!sh.checked, sc ? sc[qi] : null)));
      if (sh.items.some((i) => !i.error && i.type === "yazili")) content.push(...mebTables(sh, lang, sc));
    });
    if (includeKey) content.push(...keySection(sheets, lang));
    const doc = {
      pageSize: "A4",
      pageMargins: [42, 40, 42, 48],
      info: { title: filename.replace(/\.pdf$/, ""), creator: UI.t("appName") },
      defaultStyle: { font: "Roboto", fontSize: 10.5, lineHeight: 1.2, color: C.ink },
      footer: (page, pages) => ({
        columns: [
          { text: UI.t("appName"), color: C.muted },
          { text: UI.t("pdfPage", { p: page, n: pages }), alignment: "right", color: C.muted },
        ],
        fontSize: 8, margin: [42, 16, 42, 0],
      }),
      content,
    };
    await new Promise((resolve, reject) => {
      try { window.pdfMake.createPdf(doc).download(filename, resolve); } catch (e) { reject(e); }
    });
  }

  // Dosya adı için güvenli parça: "Ayşe Yılmaz" → "ayse-yilmaz"
  function slug(s) {
    const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", ä: "a", ß: "ss" };
    return String(s || "").toLocaleLowerCase("tr-TR").replace(/[çğıöşüäß]/g, (c) => map[c] || c)
      .normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "sinav";
  }

  // Butona bağlar: tıklayınca "hazırlanıyor" gösterir, hata olursa mesaj verir.
  function bindButton(btn, getOptions, statusEl) {
    btn.addEventListener("click", async () => {
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = UI.t("pdfPreparing");
      if (statusEl) statusEl.textContent = "";
      try {
        await download(getOptions());
      } catch (e) {
        console.error(e);
        if (statusEl) statusEl.textContent = UI.t("pdfError");
      } finally {
        btn.disabled = false;
        btn.textContent = label;
      }
    });
  }

  window.QBPDF = { download, slug, bindButton, ensureLib };
})();
