// Ana sayfa: canlı örnek (aynı şablon, üç öğrenci) ve konu kartları
(function () {
  "use strict";
  const { t, el } = UI;
  const $ = (id) => document.getElementById(id);

  // Örnekte gösterilecek şablonlar sırayla döner ("Başka örnek" butonu).
  const pool = QB.active().filter((x) => !x.figure && ["mc", "open"].includes(QB.kindOf(x)));
  let turn = 0;
  const STUDENTS = [0, 3, 6]; // QB.NAMES listesindeki sıra numaraları

  function renderDemo() {
    const box = $("demoCards");
    box.innerHTML = "";
    if (!pool.length) return;
    const lang = UI.lang;
    const tpl = pool[turn % pool.length];
    STUDENTS.forEach((n, k) => {
      const name = (QB.NAMES[lang] || QB.NAMES.tr)[n];
      let inst;
      try { inst = QB.generate(tpl, `ornek-${turn}-${k}`); } catch { return; }
      box.append(el("article", { class: "demo-card" },
        el("p", { class: "demo-student" }, t("demoStudent", { name })),
        el("div", { class: "demo-text", html: QB.render(inst, lang, true) }),
        el("p", { class: "demo-answer" }, "→ " + QB.valueString(inst, inst.answer, lang))));
    });
  }

  function renderTopics() {
    const box = $("topicCards");
    box.innerHTML = "";
    for (const key of UI.topicKeys()) {
      const tpls = QB.active().filter((x) => QB.topicOf(x) === key);
      const grades = [...new Set(tpls.map((x) => x.grade).filter(Boolean))].sort((a, b) => a - b);
      box.append(el("a", { class: "topic-card", href: "sorular.html?konu=" + encodeURIComponent(key) },
        el("span", { class: "topic-name" }, UI.topicName(key)),
        el("span", { class: "muted small" }, [
          t("topicTemplates", { n: tpls.length }),
          grades.length ? t("grade", { g: grades.join(", ") }) : null,
          tpls.some((x) => QB.levelOf(x) === 3) ? t("levelCount", { n: tpls.filter((x) => QB.levelOf(x) === 3).length }) : null,
        ].filter(Boolean).join(" · ")),
        el("span", { class: "topic-arrow", "aria-hidden": "true" }, "→")));
    }
  }

  $("demoReroll").addEventListener("click", () => { turn++; renderDemo(); });
  UI.onLang(() => { renderDemo(); renderTopics(); });
  renderDemo();
  renderTopics();
})();
