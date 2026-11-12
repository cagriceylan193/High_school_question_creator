// Öğretmen sayfası: cevap anahtarı, yazdırılabilir kâğıtlar ve şablon önizleme
(function () {
  "use strict";
  const { t, el } = UI;
  const CONFIG = QB_CONFIG;
  const $ = (id) => document.getElementById(id);

  UI.mountLangSelect($("lang"));

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
  const subjectKeys = [...new Set(QB.templates.map((tp) => tp.subject).filter(Boolean))];
  function renderSubjects() {
    const box = $("subjects");
    const picked = new Set([...box.querySelectorAll("input:checked")].map((i) => i.value));
    const first = !box.children.length;
    box.innerHTML = "";
    for (const s of subjectKeys) {
      const id = "sub-" + s;
      const input = el("input", { type: "checkbox", id, value: s });
      input.checked = first || picked.has(s);
      box.append(el("label", { class: "chip", for: id }, input, UI.subjectName(s)));
    }
    $("subjectsWrap").hidden = subjectKeys.length < 2;
  }
  renderSubjects();

  $("code").value = UI.storageGet("qb-t-code") || CONFIG.defaultExamCode;
  $("count").value = UI.storageGet("qb-t-count") || Math.min(CONFIG.defaultCount, Math.max(1, QB.templates.length));
  $("students").value = UI.storageGet("qb-t-students") || "";

  let current = null; // { code, count, subjects, rows: [{ student, items }] }

  function readForm() {
    const students = $("students").value.split("\n").map((s) => s.trim()).filter(Boolean);
    const subjects = [...$("subjects").querySelectorAll("input:checked")].map((i) => i.value);
    return { code: $("code").value.trim(), count: Number($("count").value), subjects, students };
  }

  $("keyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = readForm();
    if (!f.code || !f.students.length) return;
    UI.storageSet("qb-t-code", f.code);
    UI.storageSet("qb-t-count", String(f.count));
    UI.storageSet("qb-t-students", f.students.join("\n"));
    current = {
      ...f,
      rows: f.students.map((student) => ({ student, items: QB.buildExam({ student, code: f.code, count: f.count, subjects: f.subjects }) })),
    };
    renderKey();
  });

  function shareLink() {
    const u = new URL("index.html", location.href);
    u.searchParams.set("kod", current.code);
    u.searchParams.set("n", current.count);
    if (current.subjects.length && current.subjects.length < subjectKeys.length) u.searchParams.set("ders", current.subjects.join(","));
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
        const short = inst.type === "mc" ? full.slice(0, 1) : full;
        tr.append(el("td", { title: full }, short));
      });
      tbody.append(tr);
    }
    out.append(el("div", { class: "table-scroll" }, el("table", {}, el("thead", {}, head), tbody)));

    $("shareLink").value = shareLink();
    $("shareBox").hidden = false;
    $("printKey").hidden = false;
    $("printSheets").hidden = false;
  }

  $("shareLink").addEventListener("focus", (e) => e.target.select());
  $("printKey").addEventListener("click", () => window.print());

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
        if (inst.type === "mc") {
          const box = el("div", { class: "choices" });
          inst.choices.forEach((c, ci) => box.append(el("div", { class: "choice" },
            el("span", { class: "letter" }, QB.LETTERS[ci] + ")"), el("span", {}, QB.valueString(inst, c.v, lang)))));
          li.append(box);
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

  // --- Şablon önizleme --------------------------------------------------------
  let roll = 0;
  $("reroll").addEventListener("click", () => { roll++; renderPreview(); });

  function renderPreview() {
    const lang = UI.lang;
    $("tplCount").textContent = t("templateCount", { n: QB.templates.length });

    const pb = $("problems");
    pb.innerHTML = "";
    if (QB.problems.length) {
      const ul = el("ul", {});
      for (const pr of QB.problems) ul.append(el("li", {}, el("code", {}, pr.id), " — " + pr.message));
      pb.append(el("div", { class: "panel tpl broken" }, el("h3", { class: "error" }, t("problemsTitle")), ul));
    }

    const list = $("tplList");
    list.innerHTML = "";
    for (const tpl of QB.templates) {
      const card = el("div", { class: "panel tpl" });
      const meta = [tpl.subject && UI.subjectName(tpl.subject), tpl.grade && t("grade", { g: tpl.grade }), tpl.type || CONFIG.defaultType].filter(Boolean).join(" · ");
      card.append(el("div", { class: "tpl-head" }, el("span", { class: "tpl-id" }, tpl.id), el("span", { class: "muted small" }, meta)));
      const ol = el("ol", { class: "samples" });
      for (let k = 1; k <= 3; k++) {
        try {
          const inst = QB.generate(tpl, `önizleme-${roll}-${k}`);
          const li = el("li", {}, el("span", { html: QB.render(inst, lang) }), " ");
          li.append(el("span", { class: "ans" }, "→ " + QB.answerString(inst, lang)));
          if (inst.type === "mc") li.append(el("div", { class: "muted small" }, inst.choices.map((c, i) => `${QB.LETTERS[i]}) ${QB.formatNum(c.v, inst.d, lang)}`).join("   ")));
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
    renderSubjects();
    renderKey();
    if (!$("panel-preview").hidden) renderPreview();
  });
})();
