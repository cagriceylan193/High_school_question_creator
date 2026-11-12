// Öğrenci sayfası
(function () {
  "use strict";
  const { t, el } = UI;
  const CONFIG = QB_CONFIG;
  const $ = (id) => document.getElementById(id);

  let exam = null; // { student, code, items, responses, checked }

  // --- Başlangıç formu --------------------------------------------------------
  const p = UI.params;
  const wantedTopics = p.get("konu") ? p.get("konu").split(",") : null;
  const wantedLevels = p.get("zorluk") ? p.get("zorluk").split(",").map(Number) : null;
  function renderTopics() {
    UI.renderTopicChips($("topics"), wantedTopics);
    $("topicsWrap").hidden = UI.topicKeys().length < 2;
    UI.renderLevelChips($("levels"), wantedLevels);
  }

  $("student").value = p.get("ad") || UI.storageGet("qb-student") || "";
  $("code").value = p.get("kod") || CONFIG.defaultExamCode;
  $("count").value = p.get("n") || Math.min(CONFIG.defaultCount, Math.max(1, QB.active().length));
  renderTopics();
  if (!QB.active().length) {
    $("startForm").hidden = true;
    $("emptyNote").hidden = false;
  }

  $("startForm").addEventListener("submit", (e) => {
    e.preventDefault();
    start($("student").value, $("code").value, Number($("count").value), UI.pickedTopics($("topics")), UI.pickedLevels($("levels")));
  });

  function start(student, code, count, topics, levels) {
    student = student.trim();
    code = code.trim();
    if (!student || !code) return;
    UI.storageSet("qb-student", student);
    const items = QB.buildExam({ student, code, count, topics, levels });
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
      body.append(UI.questionTag(inst.tpl));
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

      if (inst.choices) {
        li.append(UI.choiceList(inst, lang, {
          name: "q" + qi, picked: resp, locked: exam.checked, checked: exam.checked,
          showRight: ok || CONFIG.showCorrectAfterCheck,
          onPick: (ci) => { exam.responses[qi] = ci; },
        }));
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
        if (!ok && CONFIG.showCorrectAfterCheck && !inst.choices) fb.append(el("span", {}, t("correctIs", { a: QB.answerString(inst, lang) })));
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

  UI.onLang(() => { renderTopics(); renderExam(); });

  // Bağlantıda ad ve kod varsa sınavı doğrudan aç.
  if (p.get("ad") && p.get("kod") && QB.active().length) $("startForm").requestSubmit();
})();
