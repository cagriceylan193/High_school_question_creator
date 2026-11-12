// Öğrenci sayfası
(function () {
  "use strict";
  const { t, el } = UI;
  const CONFIG = QB_CONFIG;
  const $ = (id) => document.getElementById(id);

  let exam = null; // { student, code, items, responses, checked }

  UI.mountLangSelect($("lang"));

  // --- Başlangıç formu --------------------------------------------------------
  const subjectKeys = [...new Set(QB.templates.map((tp) => tp.subject).filter(Boolean))];

  function renderSubjects() {
    const box = $("subjects");
    const picked = new Set([...box.querySelectorAll("input:checked")].map((i) => i.value));
    const first = !box.children.length;
    box.innerHTML = "";
    for (const s of subjectKeys) {
      const id = "sub-" + s;
      const input = el("input", { type: "checkbox", id, value: s });
      input.checked = first ? true : picked.has(s);
      box.append(el("label", { class: "chip", for: id }, input, UI.subjectName(s)));
    }
    $("subjectsWrap").hidden = subjectKeys.length < 2;
  }

  const p = UI.params;
  $("student").value = p.get("ad") || UI.storageGet("qb-student") || "";
  $("code").value = p.get("kod") || CONFIG.defaultExamCode;
  $("count").value = p.get("n") || Math.min(CONFIG.defaultCount, Math.max(1, QB.templates.length));
  renderSubjects();
  if (p.get("ders")) {
    const want = p.get("ders").split(",");
    $("subjects").querySelectorAll("input").forEach((i) => { i.checked = want.includes(i.value); });
  }
  if (!QB.templates.length) {
    $("startForm").hidden = true;
    $("emptyNote").hidden = false;
  }

  $("startForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const subjects = [...$("subjects").querySelectorAll("input:checked")].map((i) => i.value);
    start($("student").value, $("code").value, Number($("count").value), subjects);
  });

  function start(student, code, count, subjects) {
    student = student.trim();
    code = code.trim();
    if (!student || !code) return;
    UI.storageSet("qb-student", student);
    const items = QB.buildExam({ student, code, count, subjects });
    exam = { student, code, items, responses: items.map(() => null), checked: false };
    $("start").hidden = true;
    $("exam").hidden = false;
    renderExam();
    window.scrollTo(0, 0);
  }

  $("newExam").addEventListener("click", () => {
    exam = null;
    $("exam").hidden = true;
    $("start").hidden = false;
  });

  // --- Sınav ------------------------------------------------------------------
  function renderExam() {
    if (!exam) return;
    const lang = UI.lang;
    $("examTitle").textContent = t("examFor", { name: exam.student, code: exam.code });
    const list = $("questions");
    list.innerHTML = "";
    let nOk = 0;

    exam.items.forEach((inst, qi) => {
      const li = el("li", { class: "q" });
      const body = el("div", { class: "q-body" });
      if (inst.tpl.subject) body.append(el("span", { class: "q-subject" }, UI.subjectName(inst.tpl.subject)));
      li.append(el("div", { class: "q-top" }, el("span", { class: "q-num", "aria-hidden": "true" }), body));

      if (inst.error) {
        body.append(el("p", { class: "error" }, t("questionError", { e: inst.error })));
        list.append(li);
        return;
      }
      let text;
      try { text = QB.render(inst, lang); } catch (err) { text = null; body.append(el("p", { class: "error" }, t("questionError", { e: err.message }))); }
      if (text !== null) body.append(el("div", { class: "q-text", html: text }));

      const resp = exam.responses[qi];
      const ok = exam.checked && QB.isCorrect(inst, resp);
      const blank = resp === null || resp === "";
      if (ok) nOk++;

      if (inst.type === "mc") {
        const box = el("div", { class: "choices", role: "radiogroup" });
        inst.choices.forEach((c, ci) => {
          const id = `q${qi}c${ci}`;
          const input = el("input", { type: "radio", name: "q" + qi, id, value: ci });
          input.checked = resp === ci;
          input.disabled = exam.checked;
          input.addEventListener("change", () => { exam.responses[qi] = ci; });
          let cls = "choice";
          if (exam.checked && c.correct && (ok || CONFIG.showCorrectAfterCheck)) cls += " is-right";
          if (exam.checked && resp === ci && !c.correct) cls += " is-picked-wrong";
          box.append(el("label", { class: cls, for: id }, input,
            el("span", { class: "letter" }, QB.LETTERS[ci] + ")"),
            el("span", {}, QB.valueString(inst, c.v, lang))));
        });
        li.append(box);
      } else {
        const id = "q" + qi;
        const input = el("input", { type: "text", id, inputmode: "decimal", autocomplete: "off", "aria-label": t("answerLabel") });
        input.value = resp ?? "";
        input.disabled = exam.checked;
        input.addEventListener("input", () => { exam.responses[qi] = input.value; });
        const unit = QB.unitFor(inst, lang);
        li.append(el("div", { class: "open" }, el("label", { for: id, class: "small muted" }, t("answerLabel") + ":"), input, unit ? el("span", { class: "unit" }, unit) : null));
      }

      if (exam.checked) {
        li.classList.add(ok ? "is-ok" : "is-bad");
        const fb = el("div", { class: "feedback" },
          el("span", { class: "pill " + (ok ? "ok" : blank ? "blank" : "bad") }, t(ok ? "correct" : blank ? "blank" : "wrong")));
        if (!ok && CONFIG.showCorrectAfterCheck && inst.type !== "mc") fb.append(el("span", {}, t("correctIs", { a: QB.answerString(inst, lang) })));
        li.append(fb);
      }
      list.append(li);
    });

    const valid = exam.items.filter((i) => !i.error).length;
    $("score").textContent = exam.checked ? t("score", { c: nOk, n: valid }) : "";
    $("checkBtn").hidden = exam.checked;
    $("clearBtn").hidden = !exam.checked;
  }

  $("checkBtn").addEventListener("click", () => {
    exam.checked = true;
    renderExam();
    $("score").scrollIntoView({ block: "nearest" });
  });
  $("clearBtn").addEventListener("click", () => {
    exam.checked = false;
    exam.responses = exam.items.map(() => null);
    renderExam();
    window.scrollTo(0, 0);
  });

  UI.onLang(() => { renderSubjects(); renderExam(); });

  // Bağlantıda ad ve kod varsa sınavı doğrudan aç.
  if (p.get("ad") && p.get("kod") && QB.templates.length) $("startForm").requestSubmit();
})();
