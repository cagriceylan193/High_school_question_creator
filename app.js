// Soru sayfası (öğrenci)
(function () {
  "use strict";
  const { t, el } = UI;
  const CONFIG = QB_CONFIG;
  const $ = (id) => document.getElementById(id);

  // { student, code, count, topics, levels, items, responses, checked, savedId }
  let exam = null;

  // --- Başlangıç formu --------------------------------------------------------
  const p = UI.params;
  const wantedTopics = p.get("konu") ? p.get("konu").split(",") : null;
  const wantedLevels = p.get("zorluk") ? p.get("zorluk").split(",").map(Number) : null;
  function renderTopics() {
    UI.renderTopicChips($("topics"), wantedTopics);
    $("topicsWrap").hidden = UI.topicKeys().length < 2;
    UI.renderLevelChips($("levels"), wantedLevels);
  }

  const me = QBA.current();
  $("student").value = p.get("ad") || (me && me.name) || UI.storageGet("qb-student") || "";
  $("code").value = p.get("kod") || CONFIG.defaultExamCode;
  $("count").value = p.get("n") || Math.min(CONFIG.defaultCount, Math.max(1, QB.active().length));
  renderTopics();
  if (!QB.active().length) {
    $("startForm").hidden = true;
    $("emptyNote").hidden = false;
  }

  // Hesap bilgisi: giriş yapılmışsa sonuçların kaydedileceğini söyle
  function renderAccountNote() {
    const box = $("accountNote");
    box.innerHTML = "";
    const u = QBA.current();
    if (u) {
      box.append(el("span", { class: "avatar", "aria-hidden": "true" }, u.name.charAt(0).toLocaleUpperCase("tr-TR")),
        el("span", {}, t(u.cloud ? "accSignedInCloud" : "accSignedInAs", { name: u.name, email: u.email || "" }) + " "),
        el("a", { href: "hesap.html" }, t("navAccount")));
    } else {
      box.append(el("span", {}, t("accSaveHint") + " "), el("a", { href: "hesap.html" }, t("accSignInLink")));
    }
  }
  renderAccountNote();

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
    exam = { student, code, count, topics, levels, items, responses: items.map(() => null), checked: false, savedId: null };
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
    exam.items.forEach((inst, qi) => {
      list.append(UI.questionCard(inst, qi, lang, {
        resp: exam.responses[qi],
        checked: exam.checked,
        onPick: (ci) => { exam.responses[qi] = ci; },
        onInput: (v) => { exam.responses[qi] = v; },
      }));
    });

    const valid = exam.items.filter((i) => !i.error);
    const nOk = exam.items.filter((inst, qi) => !inst.error && QB.isCorrect(inst, exam.responses[qi])).length;
    $("score").textContent = exam.checked ? t("score", { c: nOk, n: valid.length }) : "";
    $("checkBtn").hidden = exam.checked;
    $("clearBtn").hidden = !exam.checked;
    $("pdfKeyWrap").hidden = exam.checked;

    const saved = $("savedNote");
    saved.innerHTML = "";
    saved.hidden = !exam.checked;
    if (exam.checked) {
      if (exam.savedId) saved.append(el("span", {}, t("accSaved") + " "), el("a", { href: "hesap.html" }, t("navAccount")));
      else saved.append(el("span", {}, t("accSaveHint") + " "), el("a", { href: "hesap.html" }, t("accSignInLink")));
    }
  }

  $("checkBtn").addEventListener("click", () => {
    exam.checked = true;
    // Giriş yapılmışsa sonucu geçmişe kaydet
    if (QBA.current()) {
      const ok = exam.items.map((inst, qi) => !inst.error && QB.isCorrect(inst, exam.responses[qi]));
      const rec = QBA.addAttempt({
        code: exam.code, student: exam.student, lang: UI.lang, count: exam.count,
        topics: exam.topics, levels: exam.levels, seed: QB.examSeed(exam.student, exam.code),
        ids: exam.items.map((i) => i.tpl.id), resp: exam.responses, ok,
        score: ok.filter(Boolean).length, total: exam.items.filter((i) => !i.error).length,
      });
      exam.savedId = rec ? rec.id : null;
    }
    renderExam();
    $("score").scrollIntoView({ block: "nearest" });
  });

  $("clearBtn").addEventListener("click", () => {
    exam.checked = false;
    exam.savedId = null;
    exam.responses = exam.items.map(() => null);
    renderExam();
    window.scrollTo(0, 0);
  });

  // PDF: kontrol edilmişse cevaplarla birlikte, değilse boş kâğıt (+ istenirse cevap anahtarı)
  QBPDF.bindButton($("pdfBtn"), () => ({
    sheets: [{ student: exam.student, code: exam.code, items: exam.items, responses: exam.responses, checked: exam.checked }],
    includeKey: !exam.checked && $("pdfKey").checked,
    filename: `${QBPDF.slug(exam.student)}_${QBPDF.slug(exam.code)}.pdf`,
  }), $("pdfStatus"));

  UI.onLang(() => { renderTopics(); renderAccountNote(); renderExam(); });

  // Bulut hesabıyla giriş yapılmışsa oturumu doğrula ve bekleyen sınavları gönder
  if (QBA.isCloud() && QBC.state.available) {
    QBC.onChange(() => { renderAccountNote(); if (exam && exam.checked) renderExam(); });
    QBC.init().catch((e) => console.warn(e));
  }

  // Bağlantıda ad ve kod varsa sınavı doğrudan aç.
  if (p.get("ad") && p.get("kod") && QB.active().length) $("startForm").requestSubmit();
})();
