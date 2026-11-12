// Öğrenci ve öğretmen sayfalarının ortak arayüz yardımcıları.
(function () {
  "use strict";
  const CONFIG = globalThis.QB_CONFIG;
  const I18N = globalThis.QB_I18N;

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

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  }

  function setLang(l) {
    lang = l;
    storageSet("qb-lang", l);
    applyStatic();
    listeners.forEach((fn) => fn(l));
  }

  function mountLangSelect(sel) {
    sel.innerHTML = "";
    for (const l of QB.LANGS) {
      const o = document.createElement("option");
      o.value = l;
      o.textContent = I18N[l] ? I18N[l].langName : l;
      sel.appendChild(o);
    }
    sel.value = lang;
    sel.addEventListener("change", () => setLang(sel.value));
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

  globalThis.UI = {
    get lang() { return lang; },
    t,
    subjectName,
    applyStatic,
    setLang,
    onLang: (fn) => listeners.push(fn),
    mountLangSelect,
    el,
    params,
    storageGet,
    storageSet,
  };
  applyStatic();
})();
