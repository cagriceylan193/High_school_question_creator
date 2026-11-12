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

  function questionBlock(inst, n, lang, resp, checked) {
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
    const score = sheet.checked
      ? t("score", { c: valid.filter((inst) => QB.isCorrect(inst, sheet.responses[sheet.items.indexOf(inst)])).length, n: valid.length })
      : "";
    return [
      {
        columns: [
          { text: t("appName"), bold: true, fontSize: 13, color: C.accent },
          { text: fmtDate(sheet.date ? new Date(sheet.date) : new Date(), lang), alignment: "right", fontSize: 9, color: C.muted, margin: [0, 3, 0, 0] },
        ],
        pageBreak: first ? undefined : "before",
      },
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
    }
    return out;
  }

  async function download({ sheets, includeKey, filename }) {
    await ensureLib();
    const lang = UI.lang;
    const content = [];
    sheets.forEach((sh, si) => {
      content.push(...sheetHeader(sh, lang, si === 0));
      sh.items.forEach((inst, qi) => content.push(questionBlock(inst, qi + 1, lang, sh.responses ? sh.responses[qi] : null, !!sh.checked)));
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

  window.QBPDF = { download, slug, bindButton };
})();
