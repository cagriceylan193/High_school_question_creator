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
    for (const [key, href, label] of NAV) {
      nav.append(el("a", { href, "aria-current": key === page ? "page" : false }, t(label)));
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

  function pickedTopics(box) {
    const all = box.querySelectorAll("input");
    const picked = [...box.querySelectorAll("input:checked")].map((i) => i.value);
    return picked.length === all.length ? [] : picked;
  }

  globalThis.UI = {
    get lang() { return lang; },
    t,
    subjectName,
    topicName,
    topicKeys,
    renderTopicChips,
    pickedTopics,
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
