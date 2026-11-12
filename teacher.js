// Öğretmen sayfası: cevap anahtarı, yazdırılabilir kâğıtlar ve şablon önizleme
(function () {
  "use strict";
  const { t, el } = UI;
  const CONFIG = QB_CONFIG;
  const $ = (id) => document.getElementById(id);

  // --- Sekmeler ---------------------------------------------------------------
  function showTab(name) {
    $("tab-key").setAttribute("aria-selected", name === "key");
    $("tab-preview").setAttribute("aria-selected", name === "preview");
    $("panel-key").hidden = name !== "key";
    $("panel-preview").hidden = name !== "preview";
    if (name === "preview") renderPreview();
  }
  $("tab-key").addEventListener("click", () => showTab("key"));
  $("tab-preview").addEventListener("click", () => showTab("preview"));

  // --- Cevap anahtarı ---------------------------------------------------------
  function renderTopics() {
    const saved = QB.GROUPS.includes(UI.storageGet("qb-t-grade")) ? UI.storageGet("qb-t-grade") : "";
    UI.renderGradeChips($("grades"), saved, (g) => {
      UI.storageSet("qb-t-grade", g);
      $("gradeErr").hidden = true;
      renderFilters();
    });
    renderFilters();
  }
  function renderFilters() {
    const g = UI.pickedGrade($("grades"));
    $("filters").hidden = !g;
    if (!g) return;
    const pool = QB.poolFor(g);
    UI.renderTopicChips($("topics"), null, pool);
    $("topicsWrap").hidden = UI.topicKeys(pool).length < 2;
    UI.renderLevelChips($("levels"), null, pool);
    UI.renderFormatChips($("formats"), null, pool);
  }
  renderTopics();

  $("code").value = UI.storageGet("qb-t-code") || CONFIG.defaultExamCode;
  $("count").value = UI.storageGet("qb-t-count") || Math.min(CONFIG.defaultCount, Math.max(1, QB.active().length));
  $("students").value = UI.storageGet("qb-t-students") || "";

  let current = null; // { code, count, topics, rows: [{ student, items }] }

  function readForm() {
    const students = $("students").value.split("\n").map((s) => s.trim()).filter(Boolean);
    return { group: UI.pickedGrade($("grades")), code: $("code").value.trim(), count: Number($("count").value), topics: UI.pickedTopics($("topics")), levels: UI.pickedLevels($("levels")), formats: UI.pickedFormats($("formats")), students };
  }

  $("keyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = readForm();
    if (!f.group) { $("gradeErr").hidden = false; $("grades").scrollIntoView({ block: "center", behavior: "smooth" }); return; }
    if (!f.code || !f.students.length) return;
    UI.storageSet("qb-t-code", f.code);
    UI.storageSet("qb-t-count", String(f.count));
    UI.storageSet("qb-t-students", f.students.join("\n"));
    current = {
      ...f,
      rows: f.students.map((student) => ({ student, items: QB.buildExam({ student, code: f.code, count: f.count, topics: f.topics, levels: f.levels, formats: f.formats, group: f.group }) })),
    };
    renderKey();
  });

  function shareLink() {
    const u = new URL("sorular.html", location.href);
    u.searchParams.set("kod", current.code);
    u.searchParams.set("n", current.count);
    if (current.group) u.searchParams.set("sinif", current.group);
    if (current.topics.length) u.searchParams.set("konu", current.topics.join(","));
    if (current.levels.length) u.searchParams.set("zorluk", current.levels.join(","));
    if (current.formats.length) u.searchParams.set("bicim", current.formats.join(","));
    u.searchParams.set("dil", UI.lang);
    return u.toString();
  }

  function renderKey() {
    const out = $("keyOut");
    out.innerHTML = "";
    if (!current) return;
    const lang = UI.lang;
    const n = Math.max(...current.rows.map((r) => r.items.length));

    const head = el("tr", {}, el("th", {}, t("studentCol")));
    for (let i = 0; i < n; i++) head.append(el("th", {}, String(i + 1)));
    const tbody = el("tbody");
    for (const row of current.rows) {
      const tr = el("tr", {}, el("td", { class: "student" }, row.student));
      row.items.forEach((inst) => {
        if (inst.error) { tr.append(el("td", { class: "error" }, "!")); return; }
        const full = QB.answerString(inst, lang);
        const short = inst.type === "yazili" ? t("rubricCell") : inst.choices ? full.slice(0, 1) : full;
        tr.append(el("td", { title: full }, short));
      });
      tbody.append(tr);
    }
    out.append(el("div", { class: "table-scroll" }, el("table", {}, el("thead", {}, head), tbody)));

    $("shareLink").value = shareLink();
    $("shareBox").hidden = false;
    $("printKey").hidden = false;
    $("printSheets").hidden = false;
    $("pdfSheets").hidden = false;
    $("pdfKeyWrap").hidden = false;
  }

  $("shareLink").addEventListener("focus", (e) => e.target.select());
  $("printKey").addEventListener("click", () => window.print());

  QBPDF.bindButton($("pdfSheets"), () => ({
    sheets: current.rows.map((row) => ({ student: row.student, code: current.code, items: row.items })),
    includeKey: $("pdfKey").checked,
    filename: `${QBPDF.slug(current.code)}_${current.rows.length}.pdf`,
  }), $("pdfStatus"));

  // --- Yazdırılabilir sınav kâğıtları -----------------------------------------
  $("printSheets").addEventListener("click", () => {
    if (!current) return;
    const lang = UI.lang;
    const area = $("printArea");
    area.innerHTML = "";
    for (const row of current.rows) {
      const ol = el("ol", { class: "questions" });
      for (const inst of row.items) {
        const li = el("li", { class: "q" });
        const body = el("div", { class: "q-body" });
        li.append(el("div", { class: "q-top" }, el("span", { class: "q-num" }), body));
        if (inst.error) { body.append(el("p", { class: "error" }, inst.error)); ol.append(li); continue; }
        body.append(el("div", { class: "q-text", html: QB.render(inst, lang) }));
        if (inst.type === "yazili") {
          li.append(UI.yaziliParts(inst, 0, lang, { locked: true, name: "pr" + Math.random().toString(36).slice(2, 7) }));
        } else if (inst.choices) {
          li.append(UI.choiceList(inst, lang));
        } else {
          const unit = QB.unitFor(inst, lang);
          li.append(el("div", { class: "open" }, el("span", {}, t("answerLabel") + ": ______________ " + (unit || ""))));
        }
        ol.append(li);
      }
      area.append(el("section", { class: "sheet" },
        el("div", { class: "sheet-head" },
          el("span", {}, `${t("sheetName")}: ${row.student}`),
          el("span", {}, `${t("sheetCode")}: ${current.code}`)),
        ol));
    }
    document.body.classList.add("printing-sheets");
    window.print();
  });
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-sheets"));

  // Açık uçlu soru için öğretmen anahtarı: bölüm cevapları, örnek cevap ve rubrik
  function yaziliKey(inst, lang) {
    const ol = el("ol", { class: "key-parts" });
    inst.tpl.parts.forEach((pt, i) => {
      const li = el("li", {}, el("b", {}, QB.PART_LETTERS[i] + ") "), el("span", { class: "muted small" }, `(${t("pts", { n: QB.partPoints(inst.tpl, i) })}) `));
      if (pt.kind !== "text") {
        li.append(el("span", { class: "ans" }, QB.partAnswer(inst, i, lang)));
        const sol = QB.partSolution(inst, i, lang);
        if (sol) li.append(el("div", { class: "model small" }, el("b", {}, t("mebSolution") + ": "), el("span", { html: sol })));
      }
      else {
        li.append(el("div", { class: "model small" }, el("b", {}, t("modelAnswer") + ": "), el("span", { html: QB.partModel(inst, i, lang) })));
        const ul = el("ul", { class: "rubric-list small" });
        QB.partRubric(inst, i, lang).forEach((r) => ul.append(el("li", {}, el("span", { html: r.text }), el("span", { class: "part-pts" }, t("pts", { n: r.points })))));
        li.append(el("div", { class: "small muted" }, t("rubricTitle")), ul);
      }
      ol.append(li);
    });
    return ol;
  }

  // --- Şablon önizleme --------------------------------------------------------
  let roll = 0;
  $("reroll").addEventListener("click", () => { roll++; renderPreview(); });

  function renderPreview() {
    const lang = UI.lang;
    const tpls = QB.active();
    $("tplCount").textContent = t("templateCount", { n: tpls.length });

    const pb = $("problems");
    pb.innerHTML = "";
    if (QB.problems.length) {
      const ul = el("ul", {});
      for (const pr of QB.problems) ul.append(el("li", {}, el("code", {}, pr.id), " — " + pr.message));
      pb.append(el("div", { class: "panel tpl broken" }, el("h3", { class: "error" }, t("problemsTitle")), ul));
    }

    const list = $("tplList");
    list.innerHTML = "";
    for (const tpl of tpls) {
      const card = el("div", { class: "panel tpl" });
      const meta = [UI.topicName(QB.topicOf(tpl)), tpl.grade && t("grade", { g: tpl.grade }), UI.levelName(QB.levelOf(tpl)), QB.kindOf(tpl)].filter(Boolean).join(" · ");
      card.append(el("div", { class: "tpl-head" }, el("span", { class: "tpl-id" }, tpl.id), el("span", { class: "muted small" }, meta)));
      const ol = el("ol", { class: "samples" });
      for (let k = 1; k <= 2; k++) {
        try {
          const inst = QB.generate(tpl, `önizleme-${roll}-${k}`);
          const li = el("li", { class: "sample" }, el("div", { class: "q-text", html: QB.render(inst, lang) }));
          if (inst.choices) li.append(UI.choiceList(inst, lang));
          if (inst.type === "yazili") li.append(yaziliKey(inst, lang));
          else {
            li.append(el("div", { class: "ans" }, "→ " + QB.answerString(inst, lang)));
            const sol = UI.solutionBox(inst, lang, false);
            if (sol) li.append(sol);
          }
          ol.append(li);
        } catch (e) {
          card.classList.add("broken");
          ol.append(el("li", { class: "error" }, e.message));
        }
      }
      card.append(ol);
      list.append(card);
    }
  }

  UI.onLang(() => {
    renderTopics();
    renderKey();
    if (!$("panel-preview").hidden) renderPreview();
  });
})();
