// Tüm sayfaların ortak arayüz yardımcıları: dil, üst menü, alt bilgi.
(function () {
  "use strict";
  const CONFIG = globalThis.QB_CONFIG;
  const I18N = globalThis.QB_I18N;
  const REPO_URL = "https://github.com/cagriceylan193/High_school_question_creator";

  function storageGet(k) {
    try { return localStorage.getItem(k); } catch { return null; }
  }
  function storageSet(k, v) {
    try { localStorage.setItem(k, v); } catch { /* yok say */ }
  }

  const params = new URLSearchParams(location.search);
  let lang = params.get("dil") || storageGet("qb-lang") || CONFIG.defaultLanguage;
  if (!QB.LANGS.includes(lang)) lang = QB.LANGS[0];

  const listeners = [];

  function t(key, vars) {
    let s = (I18N[lang] && I18N[lang][key]) ?? I18N.tr[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  }

  function subjectName(key) {
    return (I18N[lang].subjects && I18N[lang].subjects[key]) || key;
  }
  function topicName(key) {
    return (I18N[lang].topics && I18N[lang].topics[key]) || subjectName(key);
  }

  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children) if (c != null) e.append(c);
    return e;
  }

  // --- Üst menü ---------------------------------------------------------------
  const NAV = [
    ["home", "index.html", "navHome"],
    ["questions", "sorular.html", "navQuestions"],
    ["faq", "sss.html", "navFaq"],
    ["teacher", "ogretmen.html", "navTeacher"],
    ["account", "hesap.html", "navAccount"],
  ];

  function renderHeader() {
    const host = document.getElementById("siteHeader");
    if (!host) return;
    const page = host.dataset.page;
    host.className = "site-header";
    host.innerHTML = "";

    const brand = el("a", { class: "brand", href: "index.html" },
      el("span", { class: "mark", "aria-hidden": "true" }, "F=ma"),
      el("span", { class: "brand-name" }, t("appName")));

    const nav = el("nav", { class: "nav", "aria-label": t("menu") });
    const me = globalThis.QBA && globalThis.QBA.current();
    for (const [key, href, label] of NAV) {
      const a = el("a", { href, "aria-current": key === page ? "page" : false }, t(label));
      if (key === "account") {
        a.classList.add("nav-account");
        if (me) a.prepend(el("span", { class: "avatar", "aria-hidden": "true" }, me.name.trim().charAt(0).toLocaleUpperCase("tr-TR")));
      }
      nav.append(a);
    }

    const sel = el("select", { id: "lang", class: "lang", "aria-label": "Dil / Language / Sprache" });
    for (const l of QB.LANGS) sel.append(el("option", { value: l }, I18N[l] ? I18N[l].langName : l));
    sel.value = lang;
    sel.addEventListener("change", () => setLang(sel.value));

    host.append(el("div", { class: "site-header-inner" }, brand, nav, sel));
  }

  function renderFooter() {
    const host = document.getElementById("siteFooter");
    if (!host) return;
    host.className = "site-footer";
    host.innerHTML = "";
    const links = el("nav", { class: "footer-links", "aria-label": t("menu") });
    for (const [, href, label] of NAV) links.append(el("a", { href }, t(label)));
    links.append(el("a", { href: REPO_URL, target: "_blank", rel: "noopener" }, t("footerSource")));
    host.append(el("div", { class: "site-footer-inner" },
      el("span", { class: "muted" }, t("appName")),
      links));
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((e) => { e.textContent = t(e.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((e) => { e.placeholder = t(e.dataset.i18nPlaceholder); });
    renderHeader();
    renderFooter();
  }

  function setLang(l) {
    lang = l;
    storageSet("qb-lang", l);
    applyStatic();
    listeners.forEach((fn) => fn(l));
  }

  // Konu seçim kutuları (öğrenci ve öğretmen sayfası)
  function topicKeys() {
    const order = Object.keys(I18N.tr.topics || {});
    const keys = [...new Set(QB.active().map(QB.topicOf).filter(Boolean))];
    return keys.sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  }

  function renderTopicChips(box, wanted) {
    const prev = new Set([...box.querySelectorAll("input:checked")].map((i) => i.value));
    const first = !box.children.length;
    box.innerHTML = "";
    for (const k of topicKeys()) {
      const id = "konu-" + k;
      const input = el("input", { type: "checkbox", id, value: k });
      input.checked = first ? (!wanted || wanted.includes(k)) : prev.has(k);
      box.append(el("label", { class: "chip", for: id }, input, topicName(k)));
    }
  }

  function renderLevelChips(box, wanted) {
    const prev = new Set([...box.querySelectorAll("input:checked")].map((i) => i.value));
    const first = !box.children.length;
    const have = new Set(QB.active().map(QB.levelOf));
    box.innerHTML = "";
    for (const lv of [1, 2, 3]) {
      if (!have.has(lv)) continue;
      const id = "zorluk-" + lv;
      const input = el("input", { type: "checkbox", id, value: lv });
      input.checked = first ? (!wanted || wanted.includes(lv)) : prev.has(String(lv));
      box.append(el("label", { class: "chip", for: id }, input, levelName(lv)));
    }
  }

  function pickedLevels(box) {
    const all = box.querySelectorAll("input");
    const picked = [...box.querySelectorAll("input:checked")].map((i) => Number(i.value));
    return picked.length === all.length ? [] : picked;
  }

  function levelName(lv) {
    return (I18N[lang].levels && I18N[lang].levels[lv]) || String(lv);
  }

  // Soru başlığındaki etiket: "Hareket · Zor"
  function questionTag(tpl) {
    const lv = QB.levelOf(tpl);
    return el("span", { class: "q-subject" }, topicName(QB.topicOf(tpl)),
      el("span", { class: "lvl lvl-" + lv }, levelName(lv)));
  }

  function pickedTopics(box) {
    const all = box.querySelectorAll("input");
    const picked = [...box.querySelectorAll("input:checked")].map((i) => i.value);
    return picked.length === all.length ? [] : picked;
  }

  // Şıkları çizer. opts: { name, picked, locked, checked, onPick, showRight }
  function choiceList(inst, lang, opts = {}) {
    const box = el("div", { class: "choices", role: opts.name ? "radiogroup" : null });
    const head = QB.choiceHeader(inst, lang);
    if (head) box.append(el("div", { class: "choice-head", "aria-hidden": "true" }, el("span", { class: "letter" }, ""), el("span", { html: head })));
    inst.choices.forEach((c, ci) => {
      const content = [el("span", { class: "letter" }, QB.LETTERS[ci] + ")"), el("span", { class: "choice-body", html: QB.choiceHtml(inst, ci, lang) })];
      if (!opts.name) { box.append(el("div", { class: "choice" }, ...content)); return; }
      const id = `${opts.name}c${ci}`;
      const input = el("input", { type: "radio", name: opts.name, id, value: ci });
      input.checked = opts.picked === ci;
      input.disabled = !!opts.locked;
      input.addEventListener("change", () => opts.onPick && opts.onPick(ci));
      let cls = "choice";
      if (opts.checked && c.correct && opts.showRight) cls += " is-right";
      if (opts.checked && opts.picked === ci && !c.correct) cls += " is-picked-wrong";
      box.append(el("label", { class: cls, for: id }, input, ...content));
    });
    return box;
  }

  // Tek bir soru kartı (soru sayfası ve hesap geçmişi ortak kullanır)
  // st = { resp, checked, locked, name, onPick, onInput }
  function questionCard(inst, qi, lang, st = {}) {
    const li = el("li", { class: "q" });
    const body = el("div", { class: "q-body" });
    body.append(questionTag(inst.tpl));
    li.append(el("div", { class: "q-top" }, el("span", { class: "q-num", "aria-hidden": "true" }), body));
    if (inst.error) {
      body.append(el("p", { class: "error" }, t("questionError", { e: inst.error })));
      return li;
    }
    try { body.append(el("div", { class: "q-text", html: QB.render(inst, lang) })); }
    catch (err) { body.append(el("p", { class: "error" }, t("questionError", { e: err.message }))); }

    const CONFIG = globalThis.QB_CONFIG;
    const resp = st.resp;
    const ok = st.checked && QB.isCorrect(inst, resp);
    const blank = resp === null || resp === undefined || resp === "";
    if (inst.choices) {
      li.append(choiceList(inst, lang, {
        name: st.name || "q" + qi, picked: resp, locked: st.locked || st.checked, checked: st.checked,
        showRight: ok || CONFIG.showCorrectAfterCheck, onPick: st.onPick,
      }));
    } else {
      const id = (st.name || "q" + qi) + "in";
      const input = el("input", { type: "text", id, inputmode: "decimal", autocomplete: "off", "aria-label": t("answerLabel") });
      input.value = resp ?? "";
      input.disabled = !!(st.locked || st.checked);
      if (st.onInput) input.addEventListener("input", () => st.onInput(input.value));
      const unit = QB.unitFor(inst, lang);
      li.append(el("div", { class: "open" }, el("label", { for: id, class: "small muted" }, t("answerLabel") + ":"), input, unit ? el("span", { class: "unit" }, unit) : null));
    }
    if (st.checked) {
      li.classList.add(ok ? "is-ok" : "is-bad");
      const fb = el("div", { class: "feedback" },
        el("span", { class: "pill " + (ok ? "ok" : blank ? "blank" : "bad") }, t(ok ? "correct" : blank ? "blank" : "wrong")));
      if (!ok && CONFIG.showCorrectAfterCheck && !inst.choices) fb.append(el("span", {}, t("correctIs", { a: QB.answerString(inst, lang) })));
      li.append(fb);
    }
    return li;
  }

  function formatDate(iso, withTime) {
    const loc = { tr: "tr-TR", en: "en-GB", de: "de-DE" }[lang] || lang;
    try {
      return new Intl.DateTimeFormat(loc, withTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "long" }).format(new Date(iso));
    } catch { return String(iso).slice(0, 10); }
  }

  globalThis.UI = {
    choiceList,
    questionCard,
    formatDate,
    get lang() { return lang; },
    t,
    subjectName,
    topicName,
    topicKeys,
    renderTopicChips,
    pickedTopics,
    renderLevelChips,
    pickedLevels,
    levelName,
    questionTag,
    applyStatic,
    setLang,
    onLang: (fn) => listeners.push(fn),
    el,
    params,
    storageGet,
    storageSet,
    REPO_URL,
  };
  applyStatic();
})();
