/*
 * Yapay zekâ asistanı (öğrenci tarafı)
 * ------------------------------------
 * Her sorunun altında "Yardım iste" paneli. Öğrencinin mesajı, sorunun metni
 * ve şekli (resim olarak) ara sunucuya (worker/) gönderilir; cevap akış
 * hâlinde gelir.
 *  - Test sırasında (kontrol edilmeden önce) "ipucu" modu: cevap söylenmez,
 *    doğru cevap sunucuya hiç gönderilmez.
 *  - Kontrolden sonra "açıklama" modu: çözüm adım adım anlatılır.
 * Yalnızca e-posta ile giriş yapmış öğrenciler kullanabilir.
 * config.js → assistant.endpoint boşsa asistan görünmez.
 */
(function () {
  "use strict";
  const CFG = (globalThis.QB_CONFIG || {}).assistant || {};
  const MAX_USER = CFG.maxQuestionsPerItem || 8;
  const state = new Map(); // soru → { open, msgs, busy, img, error, render }

  function endpoint() {
    return String(globalThis.QB_ASSISTANT_ENDPOINT || CFG.endpoint || "").replace(/\/+$/, "");
  }
  const keyOf = (inst) => `${inst.tpl.id}|${inst.seed}`;

  // HTML → düz yazı (alt/üst simgeler korunur: R_1, m^2)
  function plain(html) {
    const d = document.createElement("div");
    d.innerHTML = String(html || "");
    d.querySelectorAll("svg").forEach((x) => x.remove());
    d.querySelectorAll("sub").forEach((x) => { x.textContent = "_" + x.textContent; });
    d.querySelectorAll("sup").forEach((x) => { x.textContent = "^" + x.textContent; });
    d.querySelectorAll("li, p, div").forEach((x) => x.append("\n"));
    return d.textContent.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function hasAnswer(v) {
    return v !== null && v !== undefined && v !== "";
  }

  // Modele gidecek soru bağlamı
  function context(inst, lang, resp, mode) {
    const p = QB.renderParts(inst, lang);
    let text = plain(p.stem);
    p.statements.forEach((s, i) => { text += `\n${QB.ROMAN[i]}. ${plain(s)}`; });
    if (p.ask) text += "\n" + plain(p.ask);
    if (inst.type === "changes") text += "\n(" + inst.tpl.changes.map((c) => plain(QB.localized(c.label, lang))).join(" / ") + ")";
    if (inst.type === "yazili") {
      inst.tpl.parts.forEach((pt, i) => {
        text += `\n${QB.PART_LETTERS[i]}) ${plain(QB.partText(inst, i, lang))}`;
        if (pt.kind === "select") text += " [" + QB.partOptions(inst, i, lang).map(plain).join(" / ") + "]";
        if (pt.kind === "number" && QB.partUnit(inst, i, lang)) text += ` (${QB.partUnit(inst, i, lang)})`;
      });
    } else if (!inst.choices && QB.unitFor(inst, lang)) {
      text += `\n(${QB.unitFor(inst, lang)})`;
    }
    const choices = inst.choices ? inst.choices.map((c, i) => plain(QB.choiceHtml(inst, i, lang))) : [];

    let studentAnswer = "";
    if (inst.choices && hasAnswer(resp)) studentAnswer = `${QB.LETTERS[resp]}) ${choices[resp]}`;
    else if (inst.type === "yazili" && resp && resp.p) {
      studentAnswer = inst.tpl.parts.map((pt, i) => {
        const v = resp.p[i];
        if (!hasAnswer(v)) return null;
        return `${QB.PART_LETTERS[i]}) ${pt.kind === "select" ? plain(QB.partOptions(inst, i, lang)[Number(v)]) : v}`;
      }).filter(Boolean).join("\n");
    } else if (!inst.choices && inst.type !== "yazili" && hasAnswer(resp)) studentAnswer = String(resp);

    let answer = "";
    if (mode === "explain") {
      answer = inst.type === "yazili"
        ? inst.tpl.parts.map((pt, i) => `${QB.PART_LETTERS[i]}) ${QB.partAnswer(inst, i, lang)}`).join("\n")
        : QB.answerString(inst, lang);
    }
    return { text, choices, studentAnswer, answer };
  }

  // Sorunun şeklini PNG'ye çevir (asistan şekli "görebilsin")
  async function figurePng(inst, lang) {
    const svg = QB.figure(inst, lang);
    if (!svg || !globalThis.QB_FIG) return "";
    const styled = QB_FIG.inlineStyles(svg);
    const w = Number((/width="(\d+(?:\.\d+)?)"/.exec(styled) || [0, 360])[1]);
    const h = Number((/height="(\d+(?:\.\d+)?)"/.exec(styled) || [0, 200])[1]);
    const url = URL.createObjectURL(new Blob([styled], { type: "image/svg+xml" }));
    try {
      const img = await new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = reject;
        im.src = url;
      });
      const c = document.createElement("canvas");
      c.width = w * 2;
      c.height = h * 2;
      const g = c.getContext("2d");
      g.fillStyle = "#ffffff";
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL("image/png").split(",")[1] || "";
    } catch {
      return "";
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function getToken() {
    if (!globalThis.QBC || !QBA.isCloud()) return null;
    return QBC.idToken();
  }

  // Sunucuya sor; cevabı parça parça onText ile ver
  async function ask(inst, lang, s, mode, resp, onText) {
    const token = await QBAI.getToken();
    if (!token) throw Object.assign(new Error("login"), { code: "auth" });
    if (s.img === undefined) s.img = await figurePng(inst, lang);
    const body = {
      lang, mode,
      question: { ...context(inst, lang, resp, mode), image: s.img || undefined },
      messages: s.msgs.filter((m) => !m.pending).map(({ role, content }) => ({ role, content })),
    };
    let res;
    try {
      res = await fetch(endpoint() + "/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify(body),
      });
    } catch {
      throw Object.assign(new Error("network"), { code: "network" });
    }
    if (!res.ok) {
      let e = {};
      try { e = await res.json(); } catch { /* yok say */ }
      throw Object.assign(new Error("http"), { code: e.error || (res.status === 429 ? "quota" : "upstream") });
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "", end = null;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf("\n\n")) >= 0) {
        const line = buf.slice(0, i);
        buf = buf.slice(i + 2);
        if (!line.startsWith("data: ")) continue;
        let ev;
        try { ev = JSON.parse(line.slice(6)); } catch { continue; }
        if (ev.t) onText(ev.t);
        if (ev.refusal) end = { refusal: true };
        if (ev.error) throw Object.assign(new Error("upstream"), { code: ev.error });
        if (ev.done) end = end || { stop: ev.stop };
      }
    }
    return end || {};
  }

  const ERR = { auth: "aiErrAuth", quota: "aiErrQuota", busy: "aiErrBusy", not_configured: "aiErrConfig", network: "aiErrNetwork" };

  // --- Panel ---------------------------------------------------------------------------
  // opts = { resp, getResp, checked }
  function panel(inst, lang, opts) {
    const { t, el } = UI;
    const k = keyOf(inst);
    const s = state.get(k) || { open: false, msgs: [], busy: false };
    state.set(k, s);
    const mode = opts.checked ? "explain" : "hint";
    const wrap = el("div", { class: "ai", "data-ai": k });

    function render() {
      wrap.innerHTML = "";
      const toggle = el("button", { type: "button", class: "ai-toggle", "aria-expanded": s.open ? "true" : "false" },
        el("span", { class: "ai-spark", "aria-hidden": "true" }, "✦"), t(s.open ? "aiHide" : "aiAsk"));
      toggle.addEventListener("click", () => { s.open = !s.open; render(); });
      wrap.append(toggle);
      if (!s.open) return;

      const box = el("div", { class: "ai-box" });
      box.append(el("p", { class: "ai-mode small" }, t(mode === "explain" ? "aiExplainMode" : "aiHintMode")));

      if (!QBAI.canUse()) {
        box.append(el("p", { class: "small" }, t("aiLogin") + " ", el("a", { href: "hesap.html" }, t("accSignInLink"))));
        wrap.append(box);
        return;
      }

      if (!s.msgs.length) box.append(el("p", { class: "ai-notice small muted" }, t("aiNotice")));

      const log = el("div", { class: "ai-log", "aria-live": "polite" });
      for (const m of s.msgs) {
        const bubble = el("div", { class: "ai-msg " + (m.role === "user" ? "me" : "bot") + (m.pending ? " pending" : "") });
        bubble.append(el("span", { class: "ai-who small" }, t(m.role === "user" ? "aiYou" : "aiBot")));
        const txt = el("div", { class: "ai-text" });
        txt.textContent = m.content || (m.pending ? t("aiThinking") : "");
        bubble.append(txt);
        log.append(bubble);
      }
      box.append(log);
      if (s.error) box.append(el("p", { class: "error small" }, s.error));

      const used = s.msgs.filter((m) => m.role === "user").length;
      if (used >= MAX_USER) {
        box.append(el("p", { class: "small muted" }, t("aiLimit")));
        wrap.append(box);
        return;
      }

      // Hazır sorular
      if (!s.msgs.length || mode === "explain" && !s.msgs.some((m) => m.mode === "explain")) {
        const chips = el("div", { class: "ai-chips" });
        (mode === "explain" ? ["aiQ4", "aiQ5"] : ["aiQ1", "aiQ2", "aiQ3"]).forEach((q) => {
          const b = el("button", { type: "button", class: "chip ai-chip" }, t(q));
          b.disabled = s.busy;
          b.addEventListener("click", () => send(t(q)));
          chips.append(b);
        });
        box.append(chips);
      }

      const ta = el("textarea", { rows: 2, maxlength: 600, placeholder: t("aiPlaceholder"), "aria-label": t("aiPlaceholder") });
      ta.value = s.draft || "";
      ta.disabled = s.busy;
      ta.addEventListener("input", () => { s.draft = ta.value; });
      ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(ta.value); } });
      const btn = el("button", { type: "button", class: "primary" }, t("aiSend"));
      btn.disabled = s.busy;
      btn.addEventListener("click", () => send(ta.value));
      box.append(el("div", { class: "ai-form" }, ta, btn),
        el("p", { class: "small muted ai-left" }, t("aiRemaining", { n: MAX_USER - used })));
      wrap.append(box);
    }

    async function send(text) {
      text = String(text || "").trim();
      if (!text || s.busy) return;
      s.error = "";
      s.draft = "";
      s.busy = true;
      s.msgs.push({ role: "user", content: text, mode });
      const reply = { role: "assistant", content: "", pending: true, mode };
      s.msgs.push(reply);
      (s.render || render)();
      try {
        const resp = opts.getResp ? opts.getResp() : opts.resp;
        const end = await ask(inst, lang, s, mode, resp, (delta) => {
          reply.content += delta;
          const live = document.querySelector(`[data-ai="${CSS.escape(k)}"] .ai-msg.pending .ai-text`);
          if (live) live.textContent = reply.content;
        });
        if (end.refusal) reply.content = UI.t("aiRefusal");
        reply.pending = false;
        if (!reply.content) throw Object.assign(new Error("empty"), { code: "upstream" });
      } catch (e) {
        // Başarısız soru-cevap çiftini geri al; öğrencinin yazdığı metin kutuda kalsın
        s.msgs.splice(s.msgs.length - 2, 2);
        s.draft = text;
        s.error = UI.t(ERR[e.code] || "aiErrNetwork");
      } finally {
        s.busy = false;
        (s.render || render)();
      }
    }

    s.render = render;
    render();
    return wrap;
  }

  globalThis.QBAI = {
    enabled: () => !!endpoint(),
    canUse: () => !!(globalThis.QBA && QBA.isCloud()),
    getToken,
    panel,
    context,
    _state: state,
  };
})();
