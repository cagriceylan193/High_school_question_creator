/*
 * Sanal laboratuvar çekirdeği (QBL)
 *
 *  - Deney kaydı ve deney metinleri (tr/en/de)
 *  - Sayı biçimleri, föydeki kurallara göre belirsizlik yuvarlama, en küçük kareler
 *  - Sahne (canvas): fizik döngüsü, sürükleme, büyüteç
 *  - Denetimler: kaydırıcı, seçim, düğmeler, dijital gösterge, kronometre
 *  - Veri tablosu, grafik + doğru/parabol uydurma, kayıt grafiği, sonuçlar, PDF rapor
 *
 * Deney dosyaları (lab/exp-*.js) QBL.register({...}) ile kaydolur. Bu dosya DOM'a
 * yalnızca fonksiyonların içinde dokunur; bu sayede tools/check.js Node'da yükleyebilir.
 */
(function () {
  "use strict";
  const QBL = (globalThis.QBL = globalThis.QBL || {});
  const experiments = [];

  // ---------------------------------------------------------------------------
  // Rastgelelik
  // ---------------------------------------------------------------------------
  function hash(s) {
    let h = 2166136261 >>> 0;
    for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function rng(seed) {
    let a = typeof seed === "number" ? seed >>> 0 : hash(seed);
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function gauss(r) {
    r = r || Math.random;
    let u = 0;
    while (u === 0) u = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
  }
  const between = (r, a, b) => a + (b - a) * r();
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // ---------------------------------------------------------------------------
  // Sayılar
  // ---------------------------------------------------------------------------
  const LOC = { tr: "tr-TR", en: "en-US", de: "de-DE" };
  const lang = () => (globalThis.UI && UI.lang) || "tr";
  const nf = {};
  function fixed(v, d) {
    if (v == null || !Number.isFinite(v)) return "–";
    d = clamp(Math.round(d) || 0, 0, 10);
    const k = lang() + d;
    if (!nf[k]) nf[k] = new Intl.NumberFormat(LOC[lang()] || "tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false });
    const s = nf[k].format(v);
    return s === "-0" || /^-0[.,]0*$/.test(s) ? s.slice(1) : s.replace(/^-/, "−");
  }
  const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
  const sup = (n) => String(n).split("").map((c) => SUP[c] || c).join("");
  function sci(v, n) {
    const p = Math.floor(Math.log10(Math.abs(v)));
    let m = v / 10 ** p;
    if (Math.abs(Number(m.toFixed(n - 1))) >= 10) return sci(v * 1.0000001, n);
    return fixed(m, n - 1) + " × 10" + sup(p);
  }
  // n anlamlı basamakla
  function sig(v, n = 3) {
    if (v == null || !Number.isFinite(v)) return "–";
    if (v === 0) return fixed(0, Math.min(n - 1, 3));
    const p = Math.floor(Math.log10(Math.abs(v)));
    if (p >= 6 || p <= -4) return sci(v, n);
    return fixed(v, Math.max(0, n - 1 - p));
  }
  function roundTo(x, d) {
    if (d >= 0) return Number(x.toFixed(Math.min(d, 15)));
    const f = 10 ** -d;
    return Math.round(x / f) * f;
  }
  /**
   * Föydeki kurallar: belirsizlik tek anlamlı basamağa (ilk basamak 1 ise iki
   * basamağa) yuvarlanır; sonucun son basamağı belirsizlikle aynı ondalık yerde olur.
   * Büyük/küçük sayılar bilimsel gösterimle yazılır.
   */
  function unc(v, e, unit) {
    if (v == null || !Number.isFinite(v)) return "–";
    const u = unit ? " " + unit : "";
    let p10 = 0;
    const av = Math.abs(v);
    if (av >= 1e5 || (av < 1e-3 && av > 0)) {
      p10 = Math.floor(Math.log10(av));
      v /= 10 ** p10;
      if (e) e /= 10 ** p10;
    }
    const tail = p10 ? " × 10" + sup(p10) : "";
    if (!(e > 0) || !Number.isFinite(e)) return sig(v, 4) + tail + u;
    const p = Math.floor(Math.log10(e));
    const lead = e / 10 ** p;
    const d = (lead < 1.95 ? 1 : 0) - p;
    const dd = Math.max(0, d);
    const body = fixed(roundTo(v, d), dd) + " ± " + fixed(roundTo(e, d), dd);
    return p10 || unit ? "(" + body + ")" + tail + u : body;
  }
  function parseNum(s) {
    if (typeof s === "number") return Number.isFinite(s) ? s : null;
    if (s == null) return null;
    s = String(s).trim().replace(/\s+/g, "").replace(/[−–]/g, "-");
    if (!s) return null;
    if ((s.match(/,/g) || []).length === 1 && !s.includes(".")) s = s.replace(",", ".");
    if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return null;
    const v = Number(s);
    return Number.isFinite(v) ? v : null;
  }
  // Dahili ham değer ("0.2850") → ekranda dilin ondalık ayırıcısıyla
  function showRaw(raw) {
    if (raw == null) return "";
    const sep = lang() === "en" ? "." : ",";
    return String(raw).replace(".", sep).replace(/^-/, "−");
  }

  // ---------------------------------------------------------------------------
  // İstatistik ve en küçük kareler
  // ---------------------------------------------------------------------------
  const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : NaN);
  function sd(a) {
    if (a.length < 2) return 0;
    const m = mean(a);
    return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1));
  }
  const sem = (a) => (a.length > 1 ? sd(a) / Math.sqrt(a.length) : 0);
  function meanDev(a) {
    if (!a.length) return 0;
    const m = mean(a);
    return a.reduce((s, x) => s + Math.abs(x - m), 0) / a.length;
  }

  function fitLine(xs, ys) {
    const n = xs.length;
    if (n < 2) return null;
    const mx = mean(xs), my = mean(ys);
    let sxx = 0, sxy = 0, syy = 0;
    for (let i = 0; i < n; i++) {
      const dx = xs[i] - mx, dy = ys[i] - my;
      sxx += dx * dx; sxy += dx * dy; syy += dy * dy;
    }
    if (!(sxx > 0)) return null;
    const a = sxy / sxx, b = my - a * mx;
    let ss = 0;
    for (let i = 0; i < n; i++) ss += (ys[i] - a * xs[i] - b) ** 2;
    const s2 = n > 2 ? ss / (n - 2) : 0;
    return { type: "line", n, a, b, sa: Math.sqrt(s2 / sxx), sb: Math.sqrt(s2 * (1 / n + (mx * mx) / sxx)), r2: syy > 0 ? 1 - ss / syy : 1, f: (x) => a * x + b };
  }
  function fitProp(xs, ys) {
    const n = xs.length;
    if (n < 1) return null;
    let sxx = 0, sxy = 0;
    for (let i = 0; i < n; i++) { sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
    if (!(sxx > 0)) return null;
    const a = sxy / sxx, my = mean(ys);
    let ss = 0, st = 0;
    for (let i = 0; i < n; i++) { ss += (ys[i] - a * xs[i]) ** 2; st += (ys[i] - my) ** 2; }
    const s2 = n > 1 ? ss / (n - 1) : 0;
    return { type: "prop", n, a, b: 0, sa: Math.sqrt(s2 / sxx), sb: 0, r2: st > 0 ? 1 - ss / st : 1, f: (x) => a * x };
  }
  function inv3(m) {
    const [a, b, c] = m[0], [d, e, f] = m[1], [g, h, i] = m[2];
    const A = e * i - f * h, B = -(d * i - f * g), Cc = d * h - e * g;
    const det = a * A + b * B + c * Cc;
    if (!det || !Number.isFinite(det)) return null;
    return [
      [A / det, -(b * i - c * h) / det, (b * f - c * e) / det],
      [B / det, (a * i - c * g) / det, -(a * f - c * d) / det],
      [Cc / det, -(a * h - b * g) / det, (a * e - b * d) / det],
    ];
  }
  /**
   * Parabol: y = c0 + c1·w + c2·w², w = x − x0 (x0 verilmezse 0).
   * Sayısal kararlılık için hesap ölçeklenmiş değişkenle yapılır.
   */
  function fitQuad(xs, ys, x0 = 0) {
    const n = xs.length;
    if (n < 3) return null;
    const m = mean(xs), s = sd(xs) || 1;
    const S = [0, 0, 0, 0, 0], T = [0, 0, 0];
    for (let i = 0; i < n; i++) {
      const u = (xs[i] - m) / s;
      let p = 1;
      for (let k = 0; k < 5; k++) { S[k] += p; if (k < 3) T[k] += p * ys[i]; p *= u; }
    }
    const inv = inv3([[S[0], S[1], S[2]], [S[1], S[2], S[3]], [S[2], S[3], S[4]]]);
    if (!inv) return null;
    const c = [0, 1, 2].map((r) => inv[r][0] * T[0] + inv[r][1] * T[1] + inv[r][2] * T[2]);
    let ss = 0, st = 0;
    const my = mean(ys);
    for (let i = 0; i < n; i++) {
      const u = (xs[i] - m) / s;
      ss += (ys[i] - (c[0] + c[1] * u + c[2] * u * u)) ** 2;
      st += (ys[i] - my) ** 2;
    }
    const s2 = n > 3 ? ss / (n - 3) : 0;
    const d = x0 - m;
    const J = [[1, d / s, (d * d) / (s * s)], [0, 1 / s, (2 * d) / (s * s)], [0, 0, 1 / (s * s)]];
    const cn = J.map((row) => row[0] * c[0] + row[1] * c[1] + row[2] * c[2]);
    const se = J.map((row) => {
      let v = 0;
      for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) v += row[a] * inv[a][b] * row[b];
      return Math.sqrt(Math.max(0, s2 * v));
    });
    return { type: "quad", n, x0, c: cn, se, a: cn[1], b: cn[0], r2: st > 0 ? 1 - ss / st : 1, f: (x) => cn[0] + cn[1] * (x - x0) + cn[2] * (x - x0) ** 2 };
  }
  function fit(type, xs, ys, x0) {
    if (type === "prop") return fitProp(xs, ys);
    if (type === "quad") return fitQuad(xs, ys, x0);
    if (type === "line") return fitLine(xs, ys);
    return null;
  }

  // ---------------------------------------------------------------------------
  // Metinler
  // ---------------------------------------------------------------------------
  function fill(s, vars) {
    return vars && typeof s === "string" ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : s;
  }
  function tx(def, key, vars) {
    const L = lang();
    const own = def && def.text && ((def.text[L] && def.text[L][key]) ?? (def.text.tr && def.text.tr[key]));
    if (own !== undefined && own !== null) return fill(own, vars);
    return globalThis.UI ? UI.t(key, vars) : key;
  }

  // ---------------------------------------------------------------------------
  // Tema renkleri (sahne ve grafikler için)
  // ---------------------------------------------------------------------------
  let THEME = null;
  const LIGHT = {
    dark: false, ink: "#18222d", muted: "#5a6877", line: "#d6dde5", surface: "#ffffff", bg: "#f3f5f8",
    accent: "#2356c4", ok: "#1b7343", bad: "#b3312a", warn: "#a8640a", grid: "#e6ebf1",
    wallTop: "#f4f6f9", wallBottom: "#e4e9ef", string: "#3b4148", series: ["#2356c4", "#c2410c", "#1b7343", "#7c3aed", "#b3312a"],
  };
  function theme() {
    if (THEME) return THEME;
    if (typeof document === "undefined") return LIGHT;
    const cs = getComputedStyle(document.documentElement);
    const v = (n, d) => (cs.getPropertyValue(n) || "").trim() || d;
    const t = document.documentElement.dataset.theme;
    const dark = t === "dark" || (t !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
    THEME = {
      dark, ink: v("--ink", LIGHT.ink), muted: v("--muted", LIGHT.muted), line: v("--line", LIGHT.line),
      surface: v("--surface", LIGHT.surface), bg: v("--bg", LIGHT.bg), accent: v("--accent", LIGHT.accent),
      ok: v("--ok", LIGHT.ok), bad: v("--bad", LIGHT.bad), warn: v("--warn", LIGHT.warn),
      grid: dark ? "#25303c" : "#e6ebf1",
      wallTop: dark ? "#1c2530" : "#f4f6f9", wallBottom: dark ? "#141b23" : "#e4e9ef",
      string: dark ? "#d9dee4" : "#3b4148",
      series: dark ? ["#79a3ff", "#ff9a5c", "#5fcf8f", "#b794ff", "#ff8a7e"] : LIGHT.series,
    };
    return THEME;
  }
  if (typeof matchMedia === "function") {
    try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { THEME = null; }); } catch { /* eski tarayıcı */ }
  }

  // ---------------------------------------------------------------------------
  // Küçük DOM yardımcıları
  // ---------------------------------------------------------------------------
  const el = (...a) => UI.el(...a);
  const t = (k, v) => UI.t(k, v);
  let uid = 0;
  const nextId = (p) => `${p}-${++uid}`;

  // ---------------------------------------------------------------------------
  // Sahne
  // ---------------------------------------------------------------------------
  /**
   * def: { world:[x0,y0,x1,y1], draw(ctx,S), step(dt,S), pointer:{down,move,up,cursor},
   *        maxH, label, lens:true }
   * Dünya koordinatları deneyin seçtiği birimdedir (çoğunlukla cm), y aşağı doğrudur.
   */
  function Stage(def) {
    const S = { t: 0, running: true, timeScale: 1, px: 1, inLens: false, colors: theme(), stage: null };
    const wrap = el("div", { class: "lab-stage" });
    const canvas = el("canvas", { class: "lab-canvas", role: "img", "aria-label": def.label || "" });
    const tools = el("div", { class: "lab-stage-tools" });
    wrap.append(canvas, tools);
    const ctx = canvas.getContext("2d");
    let world = def.world.slice();
    let W = 0, H = 0, dpr = 1, scale = 1, ox = 0, oy = 0;
    const lens = { on: false, p: null, touch: false, zoom: def.lensZoom || 3.5, r: 78 };
    if (!def.pointer) canvas.style.touchAction = "pan-y";

    function layout() {
      const cw = wrap.clientWidth;
      if (!cw) return;
      const ww = world[2] - world[0], wh = world[3] - world[1];
      const maxH = Math.min(def.maxH || 640, Math.max(260, window.innerHeight * 0.74));
      W = cw;
      H = Math.min(maxH, (cw * wh) / ww);
      scale = Math.min(W / ww, H / wh);
      ox = (W - ww * scale) / 2 - world[0] * scale;
      oy = (H - wh * scale) / 2 - world[1] * scale;
      dpr = Math.min(2.5, window.devicePixelRatio || 1);
      lens.r = clamp(Math.min(W, H) * 0.2, 64, 112);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.height = H + "px";
      render();
    }
    function toWorld(cx, cy) {
      const r = canvas.getBoundingClientRect();
      const x = cx - r.left, y = cy - r.top;
      return { x: (x - ox) / scale, y: (y - oy) / scale, sx: x, sy: y };
    }
    function scene(c, sc, tx0, ty0, inLens) {
      c.save();
      c.translate(tx0, ty0);
      c.scale(sc, sc);
      S.px = 1 / sc;
      S.inLens = inLens;
      S.scale = sc;
      try { def.draw(c, S); } catch (e) { console.error(e); }
      c.restore();
    }
    function render() {
      if (!W) return;
      S.colors = theme();
      S.view = { x0: -ox / scale, y0: -oy / scale, x1: (W - ox) / scale, y1: (H - oy) / scale };
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      scene(ctx, scale, ox, oy, false);
      if (lens.on && lens.p) {
        const R = lens.r;
        const cx = lens.p.x, cy = lens.touch ? Math.max(R + 4, lens.p.y - R - 30) : lens.p.y;
        const wx = (lens.p.x - ox) / scale, wy = (lens.p.y - oy) / scale;
        const z = scale * lens.zoom;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = S.colors.bg;
        ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
        scene(ctx, z, cx - wx * z, cy - wy * z, true);
        ctx.restore();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(25,32,40,0.85)";
        ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(cx, cy, R - 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(220,40,40,0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 10, cy); ctx.lineTo(cx - 3, cy); ctx.moveTo(cx + 3, cy); ctx.lineTo(cx + 10, cy);
        ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy - 3); ctx.moveTo(cx, cy + 3); ctx.lineTo(cx, cy + 10);
        ctx.stroke();
      }
    }

    let raf = 0, last = 0, visible = true, alive = true;
    function frame(ts) {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
      last = ts;
      if (def.step && S.running && dt > 0) {
        const h = dt * S.timeScale;
        S.t += h;
        try { def.step(h, S); } catch (e) { console.error(e); }
      }
      if (visible) render();
    }

    // İşaretçi
    let drag = null;
    function setLensPos(e) {
      const p = toWorld(e.clientX, e.clientY);
      lens.p = { x: p.sx, y: p.sy };
      lens.touch = e.pointerType !== "mouse";
    }
    canvas.addEventListener("pointerdown", (e) => {
      if (lens.on) {
        setLensPos(e);
        drag = { lens: true };
        try { canvas.setPointerCapture(e.pointerId); } catch { /* yok say */ }
        e.preventDefault();
        return;
      }
      if (!def.pointer || !def.pointer.down) return;
      const p = toWorld(e.clientX, e.clientY);
      if (def.pointer.down(p, e, S)) {
        drag = { id: e.pointerId };
        try { canvas.setPointerCapture(e.pointerId); } catch { /* yok say */ }
        e.preventDefault();
      }
    });
    canvas.addEventListener("pointermove", (e) => {
      if (lens.on) {
        if (e.pointerType === "mouse" || drag) setLensPos(e);
        return;
      }
      const p = toWorld(e.clientX, e.clientY);
      if (drag && def.pointer && def.pointer.move) def.pointer.move(p, e, S);
      else if (def.pointer && def.pointer.cursor) canvas.style.cursor = def.pointer.cursor(p, S) || "";
    });
    const end = (e) => {
      if (drag && !drag.lens && def.pointer && def.pointer.up) def.pointer.up(toWorld(e.clientX, e.clientY), e, S);
      if (drag && drag.lens && lens.touch) lens.p = null;
      drag = null;
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener("pointerleave", () => { if (lens.on && !drag) lens.p = null; });

    // Büyüteç düğmesi
    const lensBtn = el("button", { type: "button", class: "lab-tool", "aria-pressed": "false", title: t("labMagnifierHint") },
      el("span", { class: "lab-ico", "aria-hidden": "true", html: '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12.6 12.6 17 17" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' }),
      el("span", {}, t("labMagnifier")));
    lensBtn.addEventListener("click", () => {
      lens.on = !lens.on;
      lens.p = null;
      lensBtn.setAttribute("aria-pressed", String(lens.on));
      canvas.classList.toggle("lens-on", lens.on);
      canvas.style.touchAction = lens.on || def.pointer ? "none" : "pan-y";
      if (lens.on && def.onLens) def.onLens();
    });
    if (def.lens !== false) tools.append(lensBtn);

    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(() => layout()) : null;
    if (ro) ro.observe(wrap);
    const io = typeof IntersectionObserver === "function" ? new IntersectionObserver((en) => { visible = en.some((x) => x.isIntersecting); }) : null;
    if (io) io.observe(wrap);
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => { layout(); raf = requestAnimationFrame(frame); });

    const stage = {
      el: wrap, canvas, S, tools, render, toWorld,
      get scale() { return scale; },
      setWorld(w) { world = w.slice(); layout(); },
      addTool(btn) { tools.prepend(btn); },
      destroy() {
        alive = false;
        cancelAnimationFrame(raf);
        if (ro) ro.disconnect();
        if (io) io.disconnect();
        window.removeEventListener("resize", onResize);
      },
    };
    S.stage = stage;
    return stage;
  }

  // ---------------------------------------------------------------------------
  // Denetimler
  // ---------------------------------------------------------------------------
  const C = {
    group(title, ...kids) {
      return el("fieldset", { class: "lab-group" }, title ? el("legend", {}, title) : null, ...kids);
    },
    row(...kids) { return el("div", { class: "lab-row" }, ...kids); },
    note(text, cls) { return el("p", { class: "lab-note" + (cls ? " " + cls : ""), html: text }); },
    button(label, onClick, o = {}) {
      const b = el("button", { type: "button", class: (o.primary ? "primary" : "") + (o.cls ? " " + o.cls : ""), title: o.title || false }, label);
      b.addEventListener("click", onClick);
      if (o.disabled) b.disabled = true;
      return b;
    },
    buttons(list) {
      return el("div", { class: "lab-btns" }, ...list.filter(Boolean).map((b) => (b instanceof Node ? b : C.button(b.label, b.onClick, b))));
    },
    /** Kaydırıcı: show=false ise sayısal değer gösterilmez (ölçeği öğrenci okur). */
    slider(o) {
      const id = nextId("sl");
      const input = el("input", { type: "range", id, min: o.min, max: o.max, step: o.step || "any", value: o.value });
      const out = el("output", { for: id, class: "lab-val" });
      const show = () => { out.textContent = o.show === false ? "" : (o.format ? o.format(Number(input.value)) : fixed(Number(input.value), o.digits ?? 0) + (o.unit ? " " + o.unit : "")); };
      const fire = () => { show(); if (o.onInput) o.onInput(Number(input.value)); };
      input.addEventListener("input", fire);
      const nudge = (d) => {
        const v = clamp(Number(input.value) + d, Number(o.min), Number(o.max));
        input.value = String(Number(v.toFixed(6)));
        fire();
      };
      const fine = (o.fine || []).map((d) => C.button((d > 0 ? "+" : "−") + (o.fineLabel ? o.fineLabel(Math.abs(d)) : ""), () => nudge(d), { cls: "lab-nudge", title: o.fineTitle ? o.fineTitle(d) : false }));
      show();
      const box = el("div", { class: "lab-ctl" },
        el("div", { class: "lab-ctl-head" }, el("label", { for: id }, o.label), out),
        el("div", { class: "lab-slider" }, ...fine.filter((b, i) => (o.fine[i] < 0)), input, ...fine.filter((b, i) => (o.fine[i] > 0))));
      return {
        el: box, input,
        get value() { return Number(input.value); },
        set value(v) { input.value = String(v); show(); },
        disable(d) { input.disabled = d; fine.forEach((b) => { b.disabled = d; }); },
      };
    },
    segment(o) {
      const name = nextId("seg");
      const box = el("div", { class: "lab-seg", role: "radiogroup", "aria-label": o.label || false });
      let value = o.value;
      const inputs = o.options.map((opt) => {
        const id = nextId("sg");
        const inp = el("input", { type: "radio", name, id, value: String(opt.value) });
        inp.checked = String(opt.value) === String(value);
        inp.addEventListener("change", () => { if (inp.checked) { value = opt.value; if (o.onChange) o.onChange(opt.value); } });
        box.append(el("label", { for: id, class: "lab-seg-item", title: opt.title || false }, inp, el("span", {}, opt.label)));
        return inp;
      });
      const wrapEl = el("div", { class: "lab-ctl" }, o.label ? el("div", { class: "lab-ctl-head" }, el("span", {}, o.label)) : null, box);
      return {
        el: wrapEl,
        get value() { return value; },
        set value(v) { value = v; inputs.forEach((i) => { i.checked = i.value === String(v); }); },
        disable(d) { inputs.forEach((i) => { i.disabled = d; }); },
      };
    },
    select(o) {
      const id = nextId("se");
      const s = el("select", { id });
      for (const opt of o.options) s.append(el("option", { value: String(opt.value) }, opt.label));
      s.value = String(o.value);
      s.addEventListener("change", () => o.onChange && o.onChange(s.value));
      return { el: el("label", { class: "lab-ctl", for: id }, el("span", { class: "lab-ctl-head" }, o.label), s), input: s, get value() { return s.value; }, set value(v) { s.value = String(v); } };
    },
    check(o) {
      const id = nextId("ch");
      const i = el("input", { type: "checkbox", id });
      i.checked = !!o.value;
      i.addEventListener("change", () => o.onChange && o.onChange(i.checked));
      return { el: el("label", { class: "lab-check", for: id }, i, el("span", {}, o.label)), input: i, get value() { return i.checked; }, set value(v) { i.checked = !!v; } };
    },
    /** Yedi bölmeli dijital gösterge */
    lcd(o = {}) {
      const cv = el("canvas", { class: "lab-lcd-canvas", "aria-hidden": "true" });
      const txt = el("span", { class: "visually-hidden", "aria-live": "off" });
      const label = o.label ? el("span", { class: "lab-lcd-label" }, o.label) : null;
      const unit = el("span", { class: "lab-lcd-unit" }, o.unit || "");
      const box = el("div", { class: "lab-lcd" + (o.light ? " light" : "") }, label, el("div", { class: "lab-lcd-face" }, cv, unit), txt);
      let text = o.value || "";
      const cells = o.cells || 6;
      function draw() {
        const h = o.height || 36;
        const w = Math.ceil(cells * h * 0.62 + 8);
        const d = Math.min(2.5, window.devicePixelRatio || 1);
        if (cv.dataset.size !== w + "x" + d) {
          cv.dataset.size = w + "x" + d;
          cv.width = Math.round(w * d); cv.height = Math.round((h + 8) * d);
          cv.style.width = w + "px"; cv.style.height = h + 8 + "px";
        }
        const c = cv.getContext("2d");
        c.setTransform(d, 0, 0, d, 0, 0);
        c.clearRect(0, 0, w, h + 8);
        const on = o.light ? "#1d2416" : o.color || "#ff4b3a";
        const off = o.light ? "rgba(0,0,0,0.07)" : "rgba(255,80,60,0.10)";
        QBL.D.sevenSeg(c, text, w - 4, 4, h, on, off, { cells, align: "right" });
      }
      draw();
      return {
        el: box,
        set(v, u) { text = String(v); txt.textContent = text + (u || o.unit || ""); if (u !== undefined) unit.textContent = u; draw(); },
        get text() { return text; },
        setUnit(u) { unit.textContent = u; },
      };
    },
    /** Kronometre: öğrenci kendisi başlatıp durdurur (gerçek zaman). */
    stopwatch(o = {}) {
      let running = false, t0 = 0, acc = 0, raf = 0;
      const disp = C.lcd({ cells: 7, light: true, height: 40, value: "0:00.00" });
      const fmt = (s) => {
        const m = Math.floor(s / 60);
        const r = s - m * 60;
        return m + ":" + (r < 10 ? "0" : "") + r.toFixed(2);
      };
      const now = () => (running ? acc + (performance.now() - t0) / 1000 : acc);
      const tick = () => { disp.set(fmt(Math.floor(now() * 100) / 100)); if (running) raf = requestAnimationFrame(tick); };
      const btnGo = C.button(t("labStart"), () => toggle(), { primary: true, cls: "lab-sw-go" });
      const btnReset = C.button(t("labReset"), () => { if (running) return; acc = 0; tick(); });
      const btnRec = o.onRecord ? C.button(t("labRecord"), () => { if (running) return; o.onRecord(Math.floor(acc * 100) / 100); }) : null;
      function toggle() {
        if (running) { acc = now(); running = false; cancelAnimationFrame(raf); btnGo.textContent = t("labStart"); }
        else { t0 = performance.now(); running = true; btnGo.textContent = t("labStop"); }
        btnReset.disabled = running;
        if (btnRec) btnRec.disabled = running;
        tick();
        if (o.onToggle) o.onToggle(running);
      }
      const box = C.group(o.label || t("labStopwatch"), disp.el, C.buttons([btnGo, btnReset, btnRec]), C.note(t("labSpaceHint"), "small"));
      box.classList.add("lab-stopwatch");
      return { el: box, toggle, get running() { return running; }, get value() { return now(); }, reset() { running = false; acc = 0; btnGo.textContent = t("labStart"); btnReset.disabled = false; if (btnRec) btnRec.disabled = false; tick(); } };
    },
  };

  // ---------------------------------------------------------------------------
  // Veri tablosu
  // ---------------------------------------------------------------------------
  /**
   * def: { id, title, columns:[{key,label,input,calc(row,tb),digits,sig,text,fixed,w}],
   *        rows:[...önceden dolu satırlar], minRows, allowAdd, note }
   * Satır değerleri: row[key] = sayı, row["$"+key] = ham metin ("0.2850").
   */
  class Table {
    constructor(def, ctx) {
      this.def = def;
      this.ctx = ctx;
      this.colMap = Object.fromEntries(def.columns.map((c) => [c.key, c]));
      const saved = ctx.store.tables[def.id];
      this.rows = Array.isArray(saved) ? saved.map((r) => ({ ...r })) : (def.rows || []).map((r) => ({ ...r }));
      const min = def.minRows ?? (def.rows ? 0 : 3);
      while (this.rows.length < min) this.rows.push({});
      this.active = this.rows.length ? Math.max(0, this.rows.findIndex((r) => this.def.columns.some((c) => c.input && !c.fixed && r[c.key] == null))) : -1;
      this.el = null;
    }
    label(c) { return typeof c.label === "function" ? c.label() : c.label; }
    raw(row, key) { const v = row[key]; return typeof v === "number" && Number.isFinite(v) ? v : null; }
    get(row, key) {
      const c = this.colMap[key];
      if (c && c.calc) {
        try { const v = c.calc(row, this); return typeof v === "number" && Number.isFinite(v) ? v : null; } catch { return null; }
      }
      return this.raw(row, key);
    }
    avg(row, keys) {
      const v = keys.map((k) => this.get(row, k)).filter((x) => x != null);
      return v.length ? mean(v) : null;
    }
    values(key) { return this.rows.map((r) => this.get(r, key)).filter((v) => v != null); }
    /** Ölçüm sütunları: önceden doldurulmuş (ör. kütle listesi) olmayan giriş sütunları */
    measured() {
      if (!this._meas) {
        const preset = new Set((this.def.rows || []).flatMap((r) => Object.keys(r)));
        const cols = this.def.columns.filter((c) => !c.calc && !c.fixed && !preset.has(c.key));
        this._meas = cols.length ? cols : this.def.columns.filter((c) => !c.calc);
      }
      return this._meas;
    }
    hasData(r) { return this.measured().some((c) => r[c.key] != null); }
    filled() { return this.rows.filter((r) => this.hasData(r)).length; }
    save() { this.ctx.store.tables[this.def.id] = this.rows; this.ctx.persist(); }
    changed(structural) {
      this.save();
      if (structural) this.render();
      else this.refreshCalc();
      this.ctx.onChange(this);
    }
    setActive(i) {
      this.active = i;
      if (!this.el) return;
      this.el.querySelectorAll("tbody tr").forEach((tr, k) => tr.classList.toggle("is-active", k === i));
    }
    addRow(values = {}, raws = {}) {
      const row = { ...values };
      for (const [k, v] of Object.entries(raws)) row["$" + k] = v;
      this.rows.push(row);
      this.active = this.rows.length - 1;
      this.changed(true);
      return this.active;
    }
    set(i, values, raws = {}) {
      if (i < 0 || i >= this.rows.length) return false;
      Object.assign(this.rows[i], values);
      for (const [k, v] of Object.entries(raws)) this.rows[i]["$" + k] = v;
      this.changed(true);
      return true;
    }
    /** Seçili satırdaki (yoksa yeni satır) grubun ilk boş hücresine değer yazar. */
    record(value, o = {}) {
      let i = this.active;
      if (o.match) {
        i = this.rows.findIndex((r) => Object.entries(o.match).every(([k, v]) => r[k] != null && Math.abs(r[k] - v) < 1e-9));
        if (i < 0) {
          const row = { ...o.match };
          for (const [k, v] of Object.entries(o.match)) row["$" + k] = String(v);
          this.rows.push(row);
          i = this.rows.length - 1;
        }
      }
      if (i < 0 || i >= this.rows.length) { this.rows.push({ ...(o.base || {}) }); i = this.rows.length - 1; }
      const row = this.rows[i];
      const keys = o.group || [o.key];
      const key = keys.find((k) => row[k] == null);
      if (!key) return { ok: false };
      row[key] = value;
      row["$" + key] = o.raw ?? String(value);
      this.active = i;
      if (o.next && keys.every((k) => row[k] != null) && i + 1 < this.rows.length) this.active = i + 1;
      this.changed(true);
      return { ok: true, row: i, key };
    }
    clear() {
      this.rows = (this.def.rows || []).map((r) => ({ ...r }));
      const min = this.def.minRows ?? (this.def.rows ? 0 : 3);
      while (this.rows.length < min) this.rows.push({});
      this.active = this.rows.length ? 0 : -1;
      this.changed(true);
    }
    cellText(row, c) {
      const v = this.get(row, c.key);
      if (c.text) return row[c.key] == null ? "" : String(row[c.key]);
      if (v == null) return "";
      if (!c.calc && row["$" + c.key] != null) return showRaw(row["$" + c.key]);
      if (!c.calc && Number.isInteger(v)) return String(v).replace("-", "−");
      if (c.digits != null) return fixed(v, c.digits);
      return sig(v, c.sig || 4);
    }
    refreshCalc() {
      if (!this.el) return;
      const trs = this.el.querySelectorAll("tbody tr");
      this.rows.forEach((row, i) => {
        const tr = trs[i];
        if (!tr) return;
        this.def.columns.forEach((c, j) => {
          if (!c.calc) return;
          const td = tr.children[j + 1];
          if (td) td.textContent = this.cellText(row, c);
        });
      });
    }
    render(host) {
      if (host) this.host = host;
      if (!this.host) return;
      const def = this.def;
      const thead = el("thead", {}, el("tr", {}, el("th", { class: "lab-rowno" }, "#"), ...def.columns.map((c) => el("th", { class: c.calc ? "calc" : "", title: c.title || false }, this.label(c))), el("th", {}, "")));
      const tbody = el("tbody");
      this.rows.forEach((row, i) => {
        const tr = el("tr", { class: i === this.active ? "is-active" : "" });
        tr.addEventListener("pointerdown", () => this.setActive(i));
        tr.append(el("td", { class: "lab-rowno" }, String(i + 1)));
        for (const c of def.columns) {
          if (c.calc || c.fixed) {
            tr.append(el("td", { class: c.calc ? "calc" : "fixed" }, this.cellText(row, c)));
            continue;
          }
          const inp = el("input", { type: "text", inputmode: c.text ? "text" : "decimal", autocomplete: "off", class: "lab-in", "aria-label": `${this.label(c)} · ${i + 1}`, size: c.w || 6 });
          inp.value = this.cellText(row, c);
          inp.addEventListener("focus", () => this.setActive(i));
          inp.addEventListener("input", () => {
            if (c.text) { row[c.key] = inp.value.trim() || null; this.changed(false); return; }
            const v = parseNum(inp.value);
            inp.classList.toggle("bad", inp.value.trim() !== "" && v == null);
            if (v == null) { delete row[c.key]; delete row["$" + c.key]; }
            else { row[c.key] = v; row["$" + c.key] = String(inp.value).trim().replace(",", ".").replace(/[−–]/, "-"); }
            this.changed(false);
          });
          tr.append(el("td", {}, inp));
        }
        const del = el("button", { type: "button", class: "lab-del", title: t("labDelRow"), "aria-label": t("labDelRow") + " " + (i + 1) }, "×");
        del.addEventListener("click", (e) => {
          e.stopPropagation();
          this.rows.splice(i, 1);
          if (this.active >= this.rows.length) this.active = this.rows.length - 1;
          this.changed(true);
        });
        tr.append(el("td", { class: "lab-delcell" }, def.fixedRows ? null : del));
        tbody.append(tr);
      });
      const table = el("table", { class: "lab-table" }, thead, tbody);
      const actions = el("div", { class: "lab-table-actions" });
      if (def.allowAdd !== false && !def.fixedRows) actions.append(C.button(t("labAddRow"), () => this.addRow({ ...(def.newRow ? def.newRow(this) : {}) })));
      const box = el("div", { class: "lab-tablebox" },
        def.title ? el("h3", { class: "lab-table-title" }, typeof def.title === "function" ? def.title() : def.title) : null,
        def.note ? el("p", { class: "lab-note small", html: typeof def.note === "function" ? def.note() : def.note }) : null,
        el("div", { class: "table-scroll" }, table),
        actions);
      if (this.el && this.el.parentNode === this.host) this.host.replaceChild(box, this.el);
      else this.host.append(box);
      this.el = box;
    }
  }

  // ---------------------------------------------------------------------------
  // Grafik (tablodan ya da deneyin verdiği noktalardan)
  // ---------------------------------------------------------------------------
  function niceStep(span, n) {
    const raw = span / (n || 5);
    const p = 10 ** Math.floor(Math.log10(raw));
    const m = raw / p;
    return (m < 1.5 ? 1 : m < 2.25 ? 2 : m < 3.5 ? 2.5 : m < 7.5 ? 5 : 10) * p;
  }
  function niceRange(min, max, zero, n) {
    if (zero) { min = Math.min(min, 0); max = Math.max(max, 0); }
    if (!(max > min)) { const d = Math.abs(min) * 0.1 || 1; min -= d; max += d; }
    const pad = (max - min) * 0.04;
    if (!(zero && min === 0)) min -= pad;
    if (!(zero && max === 0)) max += pad;
    const st = niceStep(max - min, n);
    return { min: Math.floor(min / st + 1e-9) * st, max: Math.ceil(max / st - 1e-9) * st, step: st };
  }
  function stepDecimals(st) {
    const p = Math.floor(Math.log10(st));
    const m = Math.round(st / 10 ** p * 10) / 10;
    return Math.max(0, -p + (m === 2.5 ? 1 : 0));
  }
  function marker(c, kind, x, y, r) {
    c.beginPath();
    if (kind === 1) c.rect(x - r, y - r, 2 * r, 2 * r);
    else if (kind === 2) { c.moveTo(x, y - r * 1.2); c.lineTo(x + r * 1.1, y + r * 0.8); c.lineTo(x - r * 1.1, y + r * 0.8); c.closePath(); }
    else if (kind === 3) { c.moveTo(x, y - r * 1.3); c.lineTo(x + r * 1.3, y); c.lineTo(x, y + r * 1.3); c.lineTo(x - r * 1.3, y); c.closePath(); }
    else c.arc(x, y, r, 0, Math.PI * 2);
  }

  /**
   * def: { id, title, x:{key|get,label}, y:{key|get,label}, series:[{table,name}] | points(ctx),
   *        fit:"line"|"prop"|"quad"|"none", fits:[...], zeroX, zeroY, hline, minPoints, xRef }
   */
  class Graph {
    constructor(def, ctx) {
      this.def = def;
      this.ctx = ctx;
      ctx.store.fits = ctx.store.fits || {};
      ctx.store.hline = ctx.store.hline || {};
      this.fitType = ctx.store.fits[def.id] || def.fit || "line";
      this.hy = ctx.store.hline[def.id] ?? null;
      this.el = null;
    }
    series() {
      const d = this.def;
      if (d.points) return d.points(this.ctx.api).map((s, i) => ({ ...s, i }));
      return (d.series || []).map((s, i) => {
        const tb = this.ctx.table(s.table);
        const pts = [];
        if (tb) for (const row of tb.rows) {
          if (s.filter && !s.filter(row, tb)) continue;
          const xa = s.x || d.x, ya = s.y || d.y;
          const x = xa.get ? xa.get(row, tb) : tb.get(row, xa.key);
          const y = ya.get ? ya.get(row, tb) : tb.get(row, ya.key);
          if (x != null && y != null && Number.isFinite(x) && Number.isFinite(y)) pts.push({ x, y });
        }
        return { name: typeof s.name === "function" ? s.name() : s.name, pts, i };
      });
    }
    fits() {
      return this.series().map((s) => {
        if (this.fitType === "none") return null;
        const need = this.fitType === "quad" ? 3 : this.fitType === "prop" ? 1 : 2;
        if (s.pts.length < Math.max(need, this.def.minPoints || 0)) return null;
        return fit(this.fitType, s.pts.map((p) => p.x), s.pts.map((p) => p.y), this.def.xRef || 0);
      });
    }
    fit(i = 0) { return this.fits()[i] || null; }
    label(a) { return typeof a.label === "function" ? a.label() : a.label; }
    /** hline: yatay çizginin her seri çizgisiyle kesişimleri (x değerleri) */
    crossings(i = 0) {
      if (this.hy == null) return [];
      const s = this.series()[i];
      if (!s) return [];
      const pts = s.pts.slice().sort((a, b) => a.x - b.x);
      const out = [];
      for (let k = 0; k + 1 < pts.length; k++) {
        const a = pts[k], b = pts[k + 1];
        if ((a.y - this.hy) * (b.y - this.hy) <= 0 && a.y !== b.y) out.push(a.x + ((this.hy - a.y) * (b.x - a.x)) / (b.y - a.y));
      }
      return out;
    }
    draw(cv, W, H, dpr, pal) {
      const c = cv.getContext("2d");
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, W, H);
      c.fillStyle = pal.surface;
      c.fillRect(0, 0, W, H);
      const ser = this.series();
      const fits = this.fits();
      const all = ser.flatMap((s) => s.pts);
      const d = this.def;
      const L = 64, R = 16, T = 16, B = 50;
      const pw = W - L - R, ph = H - T - B;
      c.font = "13px Lexend, system-ui, sans-serif";
      if (!all.length) {
        c.fillStyle = pal.muted;
        c.textAlign = "center";
        c.fillText(t("labNeedData", { n: d.minPoints || 2 }), W / 2, H / 2);
        this.map = null;
        return;
      }
      let xmin = Math.min(...all.map((p) => p.x)), xmax = Math.max(...all.map((p) => p.x));
      let ymin = Math.min(...all.map((p) => p.y)), ymax = Math.max(...all.map((p) => p.y));
      if (this.hy != null) { ymin = Math.min(ymin, this.hy); ymax = Math.max(ymax, this.hy); }
      const zx = d.zeroX ?? (this.fitType === "prop"), zy = d.zeroY ?? (this.fitType === "prop");
      const xr = niceRange(xmin, xmax, zx, W < 420 ? 4 : 6), yr = niceRange(ymin, ymax, zy, 5);
      const X = (x) => L + ((x - xr.min) / (xr.max - xr.min)) * pw;
      const Y = (y) => T + ph - ((y - yr.min) / (yr.max - yr.min)) * ph;
      this.map = { X, Y, xr, yr, L, T, pw, ph };
      // ızgara
      c.strokeStyle = pal.grid;
      c.lineWidth = 1;
      c.beginPath();
      for (let x = xr.min; x <= xr.max + xr.step / 2; x += xr.step) { c.moveTo(Math.round(X(x)) + 0.5, T); c.lineTo(Math.round(X(x)) + 0.5, T + ph); }
      for (let y = yr.min; y <= yr.max + yr.step / 2; y += yr.step) { c.moveTo(L, Math.round(Y(y)) + 0.5); c.lineTo(L + pw, Math.round(Y(y)) + 0.5); }
      c.stroke();
      // eksenler
      c.strokeStyle = pal.muted;
      c.lineWidth = 1.2;
      c.strokeRect(L + 0.5, T + 0.5, pw, ph);
      if (xr.min < 0 && xr.max > 0) { c.beginPath(); c.moveTo(X(0), T); c.lineTo(X(0), T + ph); c.stroke(); }
      if (yr.min < 0 && yr.max > 0) { c.beginPath(); c.moveTo(L, Y(0)); c.lineTo(L + pw, Y(0)); c.stroke(); }
      c.fillStyle = pal.muted;
      c.textAlign = "center";
      c.textBaseline = "top";
      const dx = stepDecimals(xr.step), dy = stepDecimals(yr.step);
      for (let x = xr.min; x <= xr.max + xr.step / 2; x += xr.step) c.fillText(fixed(x, dx), X(x), T + ph + 6);
      c.textAlign = "right";
      c.textBaseline = "middle";
      for (let y = yr.min; y <= yr.max + yr.step / 2; y += yr.step) c.fillText(fixed(y, dy), L - 6, Y(y));
      c.fillStyle = pal.ink;
      c.textAlign = "center";
      c.textBaseline = "bottom";
      c.fillText(this.label(d.x), L + pw / 2, H - 6);
      c.save();
      c.translate(14, T + ph / 2);
      c.rotate(-Math.PI / 2);
      c.textBaseline = "middle";
      c.fillText(this.label(d.y), 0, 0);
      c.restore();
      // uydurma eğrileri
      c.save();
      c.beginPath();
      c.rect(L, T, pw, ph);
      c.clip();
      ser.forEach((s, i) => {
        const f = fits[i];
        if (!f) return;
        const col = pal.series[i % pal.series.length];
        c.strokeStyle = col;
        c.lineWidth = 1.8;
        c.setLineDash([]);
        c.beginPath();
        const xs = s.pts.map((p) => p.x);
        let a = Math.min(...xs), b = Math.max(...xs);
        if (f.type === "prop" || zx) a = Math.min(a, 0, xr.min);
        if (f.type !== "quad") { a = xr.min; b = xr.max; }
        for (let k = 0; k <= 80; k++) {
          const x = a + ((b - a) * k) / 80;
          const px = X(x), py = Y(f.f(x));
          if (k) c.lineTo(px, py); else c.moveTo(px, py);
        }
        c.stroke();
      });
      // noktalar
      ser.forEach((s, i) => {
        const col = pal.series[i % pal.series.length];
        for (const p of s.pts) {
          marker(c, i % 4, X(p.x), Y(p.y), 4.2);
          c.fillStyle = pal.surface;
          c.fill();
          c.lineWidth = 2;
          c.strokeStyle = col;
          c.stroke();
        }
        if (d.connect && s.pts.length > 1) {
          const pts = s.pts.slice().sort((a, b) => a.x - b.x);
          c.strokeStyle = col;
          c.lineWidth = 1.2;
          c.setLineDash([4, 3]);
          c.beginPath();
          pts.forEach((p, k) => (k ? c.lineTo(X(p.x), Y(p.y)) : c.moveTo(X(p.x), Y(p.y))));
          c.stroke();
          c.setLineDash([]);
        }
      });
      // yatay çizgi ve kesişimler
      if (this.hy != null) {
        c.strokeStyle = pal.bad;
        c.lineWidth = 1.5;
        c.setLineDash([6, 4]);
        c.beginPath();
        c.moveTo(L, Y(this.hy));
        c.lineTo(L + pw, Y(this.hy));
        c.stroke();
        c.setLineDash([]);
        ser.forEach((s, i) => {
          for (const x of this.crossings(i)) {
            c.beginPath();
            c.arc(X(x), Y(this.hy), 5, 0, Math.PI * 2);
            c.strokeStyle = pal.bad;
            c.lineWidth = 2;
            c.stroke();
          }
        });
      }
      c.restore();
      // açıklama
      if (ser.length > 1) {
        c.font = "12px Lexend, system-ui, sans-serif";
        c.textAlign = "left";
        c.textBaseline = "middle";
        let y = T + 12;
        ser.forEach((s, i) => {
          if (!s.pts.length) return;
          const col = pal.series[i % pal.series.length];
          marker(c, i % 4, L + 14, y, 4);
          c.fillStyle = pal.surface;
          c.fill();
          c.strokeStyle = col;
          c.lineWidth = 2;
          c.stroke();
          c.fillStyle = pal.ink;
          c.fillText(s.name || "", L + 24, y);
          y += 17;
        });
      }
    }
    summary() {
      const ser = this.series();
      const fits = this.fits();
      const d = this.def;
      const lines = [];
      ser.forEach((s, i) => {
        const f = fits[i];
        const name = ser.length > 1 && s.name ? s.name + ": " : "";
        if (!s.pts.length && ser.length > 1) return; // hiç ölçümü olmayan seriyi yazma
        if (!f) { if (this.fitType !== "none") lines.push(name + t("labNeedData", { n: this.fitType === "quad" ? 3 : 2 })); return; }
        const su = d.slopeUnit ? " " + d.slopeUnit : "";
        if (f.type === "quad") {
          const w = d.xRef ? `(x − ${fixed(d.xRef, 0)})` : "x";
          lines.push(`${name}y = a + b·${w} + c·${w}²: a = ${unc(f.c[0], f.se[0])}, b = ${unc(f.c[1], f.se[1])}, c = ${unc(f.c[2], f.se[2])}; R² = ${fixed(f.r2, 4)}`);
        } else if (f.type === "prop") {
          lines.push(`${name}${t("labSlope")} = ${unc(f.a, f.sa)}${su}; R² = ${fixed(f.r2, 4)}`);
        } else {
          lines.push(`${name}${t("labSlope")} = ${unc(f.a, f.sa)}${su}; ${t("labIntercept")} = ${unc(f.b, f.sb)}${d.interceptUnit ? " " + d.interceptUnit : ""}; R² = ${fixed(f.r2, 4)}`);
        }
      });
      if (d.hline && this.hy != null) {
        ser.forEach((s, i) => {
          const xs = this.crossings(i);
          if (xs.length) lines.push(`${ser.length > 1 && s.name ? s.name + ": " : ""}${this.label(d.y).split(" ")[0]} = ${fixed(this.hy, 3)} → ${xs.map((x) => fixed(x, 1)).join("; ")}`);
        });
      }
      return lines;
    }
    render(host) {
      if (host) this.host = host;
      if (!this.host) return;
      const d = this.def;
      const cv = el("canvas", { class: "lab-graph-canvas", role: "img", "aria-label": this.label(d.y) + " – " + this.label(d.x) });
      const sum = el("ul", { class: "lab-fit-summary" });
      const head = el("div", { class: "lab-graph-head" }, el("h3", {}, typeof d.title === "function" ? d.title() : d.title || ""));
      const fits = d.fits || [d.fit || "line"];
      if (fits.length > 1) {
        const sel = C.select({
          label: t("labFit"),
          value: this.fitType,
          options: fits.map((f) => ({ value: f, label: t({ line: "labFitLine", prop: "labFitProp", quad: "labFitQuad", none: "labFitNone" }[f]) })),
          onChange: (v) => { this.fitType = v; this.ctx.store.fits[d.id] = v; this.ctx.persist(); this.update(); this.ctx.onChange(this); },
        });
        sel.el.classList.add("lab-fit-select");
        head.append(sel.el);
      }
      const box = el("div", { class: "lab-graph" }, head, el("div", { class: "lab-graph-wrap" }, cv), sum, d.hline ? el("p", { class: "lab-note small" }, t("labHlineHint")) : null);
      if (this.el && this.el.parentNode === this.host) this.host.replaceChild(box, this.el);
      else this.host.append(box);
      this.el = box;
      this.cv = cv;
      this.sum = sum;
      if (d.hline) {
        cv.style.touchAction = "none";
        let dragging = false;
        const setY = (e) => {
          if (!this.map) return;
          const r = cv.getBoundingClientRect();
          const py = e.clientY - r.top;
          const { yr, T, ph } = this.map;
          this.hy = yr.min + ((T + ph - py) / ph) * (yr.max - yr.min);
          this.ctx.store.hline[d.id] = this.hy;
          this.update();
        };
        cv.addEventListener("pointerdown", (e) => { dragging = true; cv.setPointerCapture(e.pointerId); setY(e); });
        cv.addEventListener("pointermove", (e) => { if (dragging) setY(e); });
        const stop = () => { if (dragging) { dragging = false; this.ctx.persist(); this.ctx.onChange(this); } };
        cv.addEventListener("pointerup", stop);
        cv.addEventListener("pointercancel", stop);
      }
      if (!this.ro && typeof ResizeObserver === "function") {
        this.ro = new ResizeObserver(() => this.update());
      }
      if (this.ro) { this.ro.disconnect(); this.ro.observe(box); }
      this.update();
    }
    update() {
      if (!this.cv || !this.cv.isConnected) return;
      const W = this.cv.parentNode.clientWidth || 600;
      const H = Math.round(Math.min(380, Math.max(240, W * 0.6)));
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      this.cv.width = Math.round(W * dpr);
      this.cv.height = Math.round(H * dpr);
      this.cv.style.height = H + "px";
      this.draw(this.cv, W, H, dpr, theme());
      this.sum.innerHTML = "";
      for (const line of this.summary()) this.sum.append(el("li", {}, line));
    }
    image(W = 900, H = 520) {
      if (typeof document === "undefined") return null;
      const cv = document.createElement("canvas");
      cv.width = W;
      cv.height = H;
      this.draw(cv, W, H, 1, { ...LIGHT });
      return cv.toDataURL("image/png");
    }
  }

  // ---------------------------------------------------------------------------
  // Kayıt grafiği (zaman serisi; artı imleci ve aralık seçip uydurma)
  // ---------------------------------------------------------------------------
  class LogChart {
    constructor(o) {
      this.o = o;
      this.data = (o.series || [{}]).map(() => ({ x: [], y: [] }));
      this.sel = null;
      this.cross = null;
      this.fitType = o.fit || "quad";
      this.view = o.view || null; // {xmin,xmax,ymin,ymax} sabit eksen
      const cv = el("canvas", { class: "lab-graph-canvas lab-log-canvas", role: "img", "aria-label": o.yLabel || "" });
      this.read = el("div", { class: "lab-log-read" });
      this.fitOut = el("p", { class: "lab-log-fit small" });
      const fitSel = o.fits && o.fits.length > 1 ? C.select({
        label: t("labFit"), value: this.fitType,
        options: o.fits.map((f) => ({ value: f, label: t({ line: "labFitLine", quad: "labFitQuad" }[f]) })),
        onChange: (v) => { this.fitType = v; this.doFit(); this.draw(); },
      }) : null;
      if (fitSel) fitSel.el.classList.add("lab-fit-select");
      this.el = el("div", { class: "lab-graph lab-log" },
        o.title ? el("div", { class: "lab-graph-head" }, el("h3", {}, o.title), fitSel ? fitSel.el : null) : null,
        el("div", { class: "lab-graph-wrap" }, cv, this.read),
        o.select === false ? null : el("p", { class: "lab-note small" }, t("labSelectRange")),
        this.fitOut);
      this.cv = cv;
      cv.style.touchAction = "none";
      let down = null;
      const xOf = (e) => {
        if (!this.map) return null;
        const r = cv.getBoundingClientRect();
        const px = e.clientX - r.left;
        return this.map.x0 + ((px - this.map.L) / this.map.pw) * (this.map.x1 - this.map.x0);
      };
      cv.addEventListener("pointerdown", (e) => { const x = xOf(e); if (x == null) return; down = x; cv.setPointerCapture(e.pointerId); this.cross = x; this.draw(); });
      cv.addEventListener("pointermove", (e) => {
        const x = xOf(e);
        if (x == null) return;
        this.cross = x;
        if (down != null && o.select !== false && Math.abs(x - down) > (this.map.x1 - this.map.x0) * 0.01) this.sel = [Math.min(down, x), Math.max(down, x)];
        this.draw();
      });
      const up = () => { if (down != null) { down = null; this.doFit(); this.draw(); } };
      cv.addEventListener("pointerup", up);
      cv.addEventListener("pointercancel", up);
      cv.addEventListener("pointerleave", () => { if (down == null) { this.cross = null; this.draw(); } });
      if (typeof ResizeObserver === "function") { this.ro = new ResizeObserver(() => this.draw()); this.ro.observe(this.el); }
      this.pending = false;
    }
    push(i, x, y) { this.data[i].x.push(x); this.data[i].y.push(y); this.schedule(); }
    clear() { this.data.forEach((d) => { d.x.length = 0; d.y.length = 0; }); this.sel = null; this.fit = null; this.fitOut.textContent = ""; this.schedule(); }
    setData(i, xs, ys) { this.data[i] = { x: xs.slice(), y: ys.slice() }; this.schedule(); }
    schedule() { if (this.pending) return; this.pending = true; requestAnimationFrame(() => { this.pending = false; this.draw(); }); }
    doFit() {
      this.fit = null;
      if (!this.sel) { this.fitOut.textContent = ""; return; }
      const d = this.data[this.o.fitSeries || 0];
      const xs = [], ys = [];
      d.x.forEach((x, k) => { if (x >= this.sel[0] && x <= this.sel[1]) { xs.push(x); ys.push(d.y[k]); } });
      const x0 = this.fitType === "quad" ? this.sel[0] : 0;
      this.fit = fit(this.fitType, xs, ys, x0);
      const f = this.fit;
      const fx = (v) => fixed(v, 2);
      if (!f) { this.fitOut.textContent = t("labNeedData", { n: 3 }); }
      else if (f.type === "quad") this.fitOut.textContent = `${fx(this.sel[0])} … ${fx(this.sel[1])}: y = A + B·(x − ${fx(x0)}) + C·(x − ${fx(x0)})²  →  A = ${unc(f.c[0], f.se[0])}, B = ${unc(f.c[1], f.se[1])}, C = ${unc(f.c[2], f.se[2])}`;
      else this.fitOut.textContent = `${fx(this.sel[0])} … ${fx(this.sel[1])}: ${t("labSlope")} = ${unc(f.a, f.sa)}, ${t("labIntercept")} = ${unc(f.b, f.sb)}`;
      if (this.o.onFit) this.o.onFit(f, this.sel);
    }
    draw() {
      const cv = this.cv;
      if (!cv.isConnected) return;
      const W = cv.parentNode.clientWidth || 600;
      const H = this.o.height || Math.round(Math.min(320, Math.max(220, W * 0.5)));
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.height = H + "px";
      }
      const pal = theme();
      const c = cv.getContext("2d");
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.fillStyle = pal.surface;
      c.fillRect(0, 0, W, H);
      const L = 60, R = 14, T = 12, B = 44;
      const pw = W - L - R, ph = H - T - B;
      let xs = [], ys = [];
      this.data.forEach((d) => { xs = xs.concat(d.x); ys = ys.concat(d.y); });
      const v = this.view || {};
      let x0 = v.xmin ?? (xs.length ? Math.min(...xs) : 0), x1 = v.xmax ?? (xs.length ? Math.max(...xs) : 1);
      if (!(x1 > x0)) x1 = x0 + 1;
      let y0 = v.ymin ?? (ys.length ? Math.min(...ys) : 0), y1 = v.ymax ?? (ys.length ? Math.max(...ys) : 1);
      const xr = niceRange(x0, x1, false, W < 420 ? 4 : 6), yr = niceRange(y0, y1, !!this.o.zeroY, 5);
      x0 = v.xmin ?? xr.min; x1 = v.xmax ?? xr.max;
      const X = (x) => L + ((x - x0) / (x1 - x0)) * pw;
      const Y = (y) => T + ph - ((y - yr.min) / (yr.max - yr.min)) * ph;
      this.map = { L, pw, x0, x1 };
      c.font = "12px Lexend, system-ui, sans-serif";
      c.strokeStyle = pal.grid;
      c.lineWidth = 1;
      c.beginPath();
      for (let x = xr.min; x <= xr.max + xr.step / 2; x += xr.step) if (x >= x0 && x <= x1) { c.moveTo(Math.round(X(x)) + 0.5, T); c.lineTo(Math.round(X(x)) + 0.5, T + ph); }
      for (let y = yr.min; y <= yr.max + yr.step / 2; y += yr.step) { c.moveTo(L, Math.round(Y(y)) + 0.5); c.lineTo(L + pw, Math.round(Y(y)) + 0.5); }
      c.stroke();
      c.strokeStyle = pal.muted;
      c.strokeRect(L + 0.5, T + 0.5, pw, ph);
      c.fillStyle = pal.muted;
      c.textAlign = "center";
      c.textBaseline = "top";
      const dx = stepDecimals(xr.step), dy = stepDecimals(yr.step);
      for (let x = xr.min; x <= xr.max + xr.step / 2; x += xr.step) if (x >= x0 - 1e-9 && x <= x1 + 1e-9) c.fillText(fixed(x, dx), X(x), T + ph + 5);
      c.textAlign = "right";
      c.textBaseline = "middle";
      for (let y = yr.min; y <= yr.max + yr.step / 2; y += yr.step) c.fillText(fixed(y, dy), L - 6, Y(y));
      c.fillStyle = pal.ink;
      c.textAlign = "center";
      c.textBaseline = "bottom";
      c.fillText(this.o.xLabel || "", L + pw / 2, H - 4);
      c.save();
      c.translate(13, T + ph / 2);
      c.rotate(-Math.PI / 2);
      c.textBaseline = "middle";
      c.fillText(this.o.yLabel || "", 0, 0);
      c.restore();
      if (this.sel) {
        c.fillStyle = pal.dark ? "rgba(111,155,255,0.16)" : "rgba(35,86,196,0.10)";
        c.fillRect(X(this.sel[0]), T, X(this.sel[1]) - X(this.sel[0]), ph);
      }
      c.save();
      c.beginPath();
      c.rect(L, T, pw, ph);
      c.clip();
      this.data.forEach((d, i) => {
        const col = (this.o.series && this.o.series[i] && this.o.series[i].color) || pal.series[i % pal.series.length];
        c.strokeStyle = col;
        c.fillStyle = col;
        c.lineWidth = 1.6;
        if (this.o.dots) {
          for (let k = 0; k < d.x.length; k++) { c.beginPath(); c.arc(X(d.x[k]), Y(d.y[k]), 2.2, 0, Math.PI * 2); c.fill(); }
        } else {
          c.beginPath();
          let started = false;
          const stepK = Math.max(1, Math.floor(d.x.length / (pw * 2)));
          for (let k = 0; k < d.x.length; k += stepK) {
            if (d.x[k] == null || d.y[k] == null) { started = false; continue; }
            const px = X(d.x[k]), py = Y(d.y[k]);
            if (started) c.lineTo(px, py); else { c.moveTo(px, py); started = true; }
          }
          c.stroke();
        }
      });
      if (this.fit && this.sel) {
        c.strokeStyle = pal.bad;
        c.lineWidth = 2;
        c.setLineDash([5, 3]);
        c.beginPath();
        for (let k = 0; k <= 60; k++) {
          const x = this.sel[0] + ((this.sel[1] - this.sel[0]) * k) / 60;
          const px = X(x), py = Y(this.fit.f(x));
          if (k) c.lineTo(px, py); else c.moveTo(px, py);
        }
        c.stroke();
        c.setLineDash([]);
      }
      if (this.cross != null) {
        c.strokeStyle = pal.ink;
        c.globalAlpha = 0.45;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(X(this.cross), T);
        c.lineTo(X(this.cross), T + ph);
        c.stroke();
        c.globalAlpha = 1;
      }
      c.restore();
      // okuma
      if (this.cross != null) {
        const parts = [];
        this.data.forEach((d, i) => {
          if (!d.x.length) return;
          let best = 0, bd = Infinity;
          for (let k = 0; k < d.x.length; k++) { const dd = Math.abs(d.x[k] - this.cross); if (dd < bd) { bd = dd; best = k; } }
          const name = this.o.series && this.o.series[i] && this.o.series[i].name ? this.o.series[i].name + ": " : "";
          if (i === 0) parts.push(`${this.o.xName || "x"} = ${fixed(d.x[best], this.o.xDigits ?? 2)}`);
          parts.push(`${name}${this.o.yName || "y"} = ${fixed(d.y[best], this.o.yDigits ?? 2)}`);
        });
        this.read.textContent = parts.join("   ");
      } else this.read.textContent = "";
    }
  }

  // ---------------------------------------------------------------------------
  // Sonuç tablosu
  // ---------------------------------------------------------------------------
  function resultsTable(rows) {
    const body = el("tbody");
    let any = false;
    for (const r of rows || []) {
      if (!r) continue;
      if (r.head) { body.append(el("tr", { class: "lab-res-head" }, el("th", { colspan: 4 }, r.head))); continue; }
      if (r.text) { body.append(el("tr", {}, el("td", { colspan: 4, class: "lab-res-text", html: r.text }))); any = true; continue; }
      any = true;
      const val = r.value == null || !Number.isFinite(r.value) ? "–" : r.err != null ? unc(r.value, r.err, r.unit) : (r.digits != null ? fixed(r.value, r.digits) : sig(r.value, r.sig || 4)) + (r.unit ? " " + r.unit : "");
      const ref = r.ref != null ? (r.refText || sig(r.ref, 4)) + (r.unit && !r.refText ? " " + r.unit : "") : "";
      let diff = "";
      if (r.ref != null && r.value != null && Number.isFinite(r.value) && r.ref !== 0) diff = fixed((Math.abs(r.value - r.ref) / Math.abs(r.ref)) * 100, 1) + " %";
      body.append(el("tr", {}, el("th", { scope: "row", html: r.label }), el("td", { class: "lab-res-val" }, val), el("td", { class: "muted" }, ref), el("td", { class: "muted" }, diff)));
    }
    if (!any) return el("p", { class: "muted small" }, t("labNoResults"));
    const head = el("thead", {}, el("tr", {}, el("th", {}, t("labQuantity")), el("th", {}, t("labValue")), el("th", {}, t("labAccepted")), el("th", {}, t("labDiff"))));
    return el("div", { class: "table-scroll" }, el("table", { class: "lab-results" }, head, body));
  }
  function resultText(r) {
    if (r.head) return null;
    if (r.text) return { text: r.text.replace(/<[^>]+>/g, ""), full: true };
    const val = r.value == null || !Number.isFinite(r.value) ? "–" : r.err != null ? unc(r.value, r.err, r.unit) : (r.digits != null ? fixed(r.value, r.digits) : sig(r.value, r.sig || 4)) + (r.unit ? " " + r.unit : "");
    const ref = r.ref != null ? (r.refText || sig(r.ref, 4)) + (r.unit && !r.refText ? " " + r.unit : "") : "";
    const diff = r.ref != null && r.value != null && Number.isFinite(r.value) && r.ref !== 0 ? fixed((Math.abs(r.value - r.ref) / Math.abs(r.ref)) * 100, 1) + " %" : "";
    return { label: r.label.replace(/<[^>]+>/g, ""), val, ref, diff };
  }

  // ---------------------------------------------------------------------------
  // Kalıcı veri
  // ---------------------------------------------------------------------------
  const KEY = (id) => "qb-lab-" + id;
  function load(id) {
    try { const s = JSON.parse(localStorage.getItem(KEY(id)) || "null"); return s && typeof s === "object" ? s : null; } catch { return null; }
  }
  function saveStore(id, s) {
    try { localStorage.setItem(KEY(id), JSON.stringify(s)); } catch { /* yok say */ }
  }
  function freshStore(def) {
    return { v: 1, seed: Math.floor(Math.random() * 2 ** 31), tables: {}, fits: {}, hline: {}, extra: {}, comments: "", student: "", part: def.parts && def.parts[0] ? def.parts[0].id : null };
  }
  function countData(def) {
    const s = load(def.id);
    if (!s || !s.tables) return 0;
    // önceden doldurulmuş değerler (ör. kütle listesi) ölçüm sayılmaz
    const preset = {};
    for (const p of def.parts || []) for (const td of p.tables || []) preset[td.id] = new Set((td.rows || []).flatMap((r) => Object.keys(r)));
    let n = 0;
    for (const [id, rows] of Object.entries(s.tables)) {
      if (!Array.isArray(rows)) continue;
      const pre = preset[id] || new Set();
      for (const r of rows) if (Object.keys(r).some((k) => !k.startsWith("$") && !pre.has(k) && typeof r[k] === "number")) n++;
    }
    return n;
  }

  // Deney oturumu boyunca (dil değişse de) korunan bellek
  const MEM = {};

  // ---------------------------------------------------------------------------
  // Deney sayfası
  // ---------------------------------------------------------------------------
  let current = null;
  function unmount() {
    if (!current) return;
    try { current.destroy(); } catch (e) { console.error(e); }
    current = null;
  }

  function mount(root, def) {
    unmount();
    let store = load(def.id) || freshStore(def);
    if (!store.tables) store.tables = {};
    if (!store.extra) store.extra = {};
    if (!def.parts.some((p) => p.id === store.part)) store.part = def.parts[0].id;
    const mem = (MEM[def.id] = MEM[def.id] || {});
    const destroyers = [];
    let hooks = {};
    const tables = {};
    const graphs = {};
    const partHooks = [];
    let changeTimer = 0;
    let statusTimer = 0;

    const tt = (k, v) => tx(def, k, v);
    const persist = () => saveStore(def.id, store);
    const ctx = {
      get store() { return store; },
      persist,
      table: (id) => tables[id],
      onChange() {
        clearTimeout(changeTimer);
        changeTimer = setTimeout(refreshAnalysis, 60);
      },
      api: null,
    };

    // --- iskelet
    root.innerHTML = "";
    const steps = (() => {
      const s = tt("steps");
      return s && typeof s === "object" && !Array.isArray(s) ? s : { _: s };
    })();
    const kicker = tt("kicker");
    const head = el("div", { class: "lab-top" },
      el("a", { class: "lab-back", href: "#" }, t("labBack")),
      el("p", { class: "eyebrow" }, kicker),
      el("h1", {}, tt("title")),
      el("p", { class: "lead" }, el("b", {}, t("labAim") + ": "), tt("aim")));
    const theory = el("details", { class: "lab-info panel slim" }, el("summary", {}, t("labTheory")), el("div", { class: "lab-info-body", html: tt("theory") }));
    const stepsBox = el("details", { class: "lab-info panel slim lab-steps" }, el("summary", {}, t("labSteps")));
    // dar ekranda düzenek hemen görünsün diye adımlar ilk açılışta kapalı
    stepsBox.open = mem.stepsOpen ?? (typeof window === "undefined" || window.innerWidth > 700);
    stepsBox.addEventListener("toggle", () => { mem.stepsOpen = stepsBox.open; });
    const stepsList = el("ol", { class: "lab-steps-list" });
    stepsBox.append(stepsList);
    const tabs = el("div", { class: "tabs lab-parts", role: "tablist", "aria-label": t("labPart") });
    const stageHost = el("div", { class: "lab-stage-host" });
    const side = el("div", { class: "lab-side" });
    const status = el("p", { class: "lab-status", role: "status", "aria-live": "polite" });
    const bench = el("section", { class: "lab-bench", "aria-label": tt("title") }, el("div", { class: "lab-stage-col" }, stageHost, status), side);
    const dataSec = el("section", { class: "panel lab-data" }, el("div", { class: "lab-sec-head" }, el("h2", {}, t("labData")), el("p", { class: "muted small" }, t("labSaved"))));
    const dataBody = el("div", { class: "lab-data-body" });
    dataSec.append(dataBody);
    const anaSec = el("section", { class: "panel lab-analysis" }, el("h2", {}, t("labAnalysis")));
    const graphBody = el("div", { class: "lab-graphs" });
    const resBody = el("div", { class: "lab-res" });
    anaSec.append(graphBody, el("h3", {}, t("labResults")), resBody);
    const extraBody = el("div", { class: "lab-extra" });
    anaSec.insertBefore(extraBody, graphBody);

    // rapor
    const nameIn = el("input", { type: "text", autocomplete: "name", id: "labStudent" });
    const me = globalThis.QBA && QBA.current && QBA.current();
    nameIn.value = store.student || (me ? me.name : "");
    nameIn.addEventListener("input", () => { store.student = nameIn.value; persist(); });
    const comm = el("textarea", { id: "labComments", rows: 4, placeholder: t("labCommentsPh") });
    comm.value = store.comments || "";
    comm.addEventListener("input", () => { store.comments = comm.value; persist(); });
    const pdfStatus = el("p", { class: "small muted", role: "status" });
    const pdfBtn = C.button(t("labPdf"), async () => {
      pdfBtn.disabled = true;
      const lbl = pdfBtn.textContent;
      pdfBtn.textContent = t("pdfPreparing");
      pdfStatus.textContent = "";
      try { await reportPdf(); } catch (e) { console.error(e); pdfStatus.textContent = t("pdfError"); }
      pdfBtn.disabled = false;
      pdfBtn.textContent = lbl;
    }, { primary: true });
    const clearBtn = C.button(t("labClearData"), () => {
      if (!confirm(t("labClearConfirm"))) return;
      store.tables = {};
      store.hline = {};
      persist();
      Object.values(tables).forEach((tb) => tb.clear());
      if (hooks.onClear) hooks.onClear();
      refreshAnalysis();
    });
    const newBtn = C.button(t("labNewSetup"), () => {
      if (!confirm(t("labNewSetupConfirm"))) return;
      const keep = { student: store.student };
      store = Object.assign(freshStore(def), keep, { part: store.part });
      persist();
      delete MEM[def.id];
      mount(root, def);
    });
    const repSec = el("section", { class: "panel lab-report" }, el("h2", {}, t("labReport")),
      el("div", { class: "fields" }, el("label", { class: "field", for: "labStudent" }, t("labStudent"), nameIn)),
      el("label", { class: "field", for: "labComments" }, t("labComments"), comm),
      el("div", { class: "actions" }, pdfBtn, clearBtn, newBtn), pdfStatus);

    root.append(el("div", { class: "lab-exp" }, head, theory, stepsBox, tabs, bench, dataSec, anaSec, repSec));
    head.querySelector(".lab-back").addEventListener("click", (e) => { e.preventDefault(); location.hash = ""; });

    // --- tablolar ve grafikler (tüm bölümler)
    for (const p of def.parts) {
      for (const td of p.tables || []) tables[td.id] = new Table(td, ctx);
      for (const gd of p.graphs || []) graphs[gd.id] = new Graph(gd, ctx);
    }

    function setStatus(msg, kind) {
      status.textContent = msg || "";
      status.className = "lab-status" + (kind ? " " + kind : "");
      clearTimeout(statusTimer);
      if (msg) statusTimer = setTimeout(() => { status.textContent = ""; }, kind === "bad" ? 7000 : 4500);
    }

    const api = {
      def, mem, el, C, D: QBL.D,
      get store() { return store; },
      get lang() { return lang(); },
      get part() { return store.part; },
      t: tt,
      tg: t,
      persist,
      rng: rng(store.seed + ":" + def.id),
      noise: Math.random,
      gauss,
      between,
      fixed, sig, unc, parseNum,
      panel: side,
      extra: extraBody,
      status: setStatus,
      table: (id) => tables[id],
      graph: (id) => graphs[id],
      refresh: () => refreshAnalysis(),
      stage(sdef) {
        const st = Stage(sdef);
        stageHost.append(st.el);
        destroyers.push(() => st.destroy());
        return st;
      },
      onPart(fn) { partHooks.push(fn); },
      onDestroy(fn) { destroyers.push(fn); },
      stopwatch(o) {
        const sw = C.stopwatch(o);
        api.sw = sw;
        return sw;
      },
      /** Tabloya yazma kısayolu: başarısızsa uyarı verir */
      record(tableId, value, o = {}) {
        const tb = tables[tableId];
        if (!tb) return false;
        const r = tb.record(value, o);
        if (!r.ok) { setStatus(t("labRowFull"), "bad"); return false; }
        setStatus(t("labRecorded"), "ok");
        return true;
      },
    };
    ctx.api = api;

    // boşluk tuşu → kronometre
    const onKey = (e) => {
      if (e.code !== "Space" && e.key !== " ") return;
      const tag = (e.target && e.target.tagName) || "";
      if (/^(INPUT|TEXTAREA|SELECT|BUTTON|SUMMARY|A)$/.test(tag) || (e.target && e.target.isContentEditable)) return;
      if (!api.sw) return;
      e.preventDefault();
      api.sw.toggle();
    };
    document.addEventListener("keydown", onKey);
    destroyers.push(() => document.removeEventListener("keydown", onKey));

    hooks = def.mount(api) || {};

    function renderPart() {
      const p = def.parts.find((x) => x.id === store.part) || def.parts[0];
      // sekmeler
      tabs.innerHTML = "";
      tabs.hidden = def.parts.length < 2;
      for (const q of def.parts) {
        const b = el("button", { type: "button", role: "tab", "aria-selected": String(q.id === p.id) }, tt(q.title));
        b.addEventListener("click", () => {
          if (q.id === store.part) return;
          store.part = q.id;
          persist();
          renderPart();
          partHooks.forEach((fn) => fn(q.id));
        });
        tabs.append(b);
      }
      // adımlar
      stepsList.innerHTML = "";
      const list = steps[p.id] || steps._ || [];
      for (const s of list) stepsList.append(el("li", { html: s }));
      stepsBox.hidden = !list.length;
      // tablolar
      dataBody.innerHTML = "";
      for (const td of p.tables || []) { tables[td.id].el = null; tables[td.id].render(dataBody); }
      dataSec.hidden = !(p.tables || []).length;
      graphBody.innerHTML = "";
      for (const gd of p.graphs || []) { graphs[gd.id].el = null; graphs[gd.id].render(graphBody); }
      refreshAnalysis();
    }

    function resultCtx() {
      return {
        api, t: tt, fit: (gid, i = 0) => (graphs[gid] ? graphs[gid].fit(i) : null),
        graph: (gid) => graphs[gid], table: (id) => tables[id], mean, sd, sem, meanDev, g: 9.81,
      };
    }
    function refreshAnalysis() {
      const p = def.parts.find((x) => x.id === store.part) || def.parts[0];
      for (const gd of p.graphs || []) graphs[gd.id].update();
      resBody.innerHTML = "";
      let rows = [];
      try { rows = p.results ? p.results(resultCtx()) : []; } catch (e) { console.error(e); }
      resBody.append(resultsTable(rows));
      if (hooks.onData) hooks.onData();
    }

    async function reportPdf() {
      await QBPDF.ensureLib();
      const L = lang();
      const content = [];
      const muted = "#5a6877";
      content.push({ text: tt("kicker"), color: muted, fontSize: 10 });
      content.push({ text: tt("title"), fontSize: 17, bold: true, margin: [0, 2, 0, 4] });
      const date = new Intl.DateTimeFormat(LOC[L] || L, { dateStyle: "long", timeStyle: "short" }).format(new Date());
      content.push({ columns: [{ text: [{ text: t("labStudent") + ": ", color: muted }, store.student || "—"] }, { text: date, alignment: "right", color: muted }], margin: [0, 0, 0, 8] });
      content.push({ text: [{ text: t("labAim") + ": ", bold: true }, tt("aim")], margin: [0, 0, 0, 10] });
      const ctxR = resultCtx();
      for (const p of def.parts) {
        const has = (p.tables || []).some((td) => tables[td.id].filled() > 0) || (p.pdfAlways && p.pdfAlways(api));
        if (!has) continue;
        content.push({ text: tt(p.title), fontSize: 13, bold: true, margin: [0, 8, 0, 6] });
        for (const td of p.tables || []) {
          const tb = tables[td.id];
          if (!tb.filled()) continue;
          if (td.title) content.push({ text: typeof td.title === "function" ? td.title() : td.title, bold: true, margin: [0, 2, 0, 3] });
          const cols = td.columns;
          const body = [["#", ...cols.map((c) => ({ text: tb.label(c), bold: true }))]];
          tb.rows.forEach((row, i) => { if (tb.hasData(row)) body.push([String(i + 1), ...cols.map((c) => tb.cellText(row, c))]); });
          content.push({ table: { headerRows: 1, body }, layout: "lightHorizontalLines", fontSize: 8.5, margin: [0, 0, 0, 8] });
        }
        for (const gd of p.graphs || []) {
          const g = graphs[gd.id];
          if (!g.series().some((s) => s.pts.length)) continue;
          if (gd.title) content.push({ text: typeof gd.title === "function" ? gd.title() : gd.title, bold: true, margin: [0, 4, 0, 3] });
          const img = g.image();
          if (img) content.push({ image: img, width: 430, margin: [0, 0, 0, 4] });
          for (const line of g.summary()) content.push({ text: line, fontSize: 9, color: muted });
        }
        if (p.pdfExtra) { try { content.push(...(p.pdfExtra(api) || [])); } catch (e) { console.error(e); } }
        let rows = [];
        try { rows = p.results ? p.results(ctxR) : []; } catch (e) { console.error(e); }
        const rt = rows.filter(Boolean).map(resultText).filter(Boolean);
        if (rt.length) {
          const body = [[t("labQuantity"), t("labValue"), t("labAccepted"), t("labDiff")].map((x) => ({ text: x, bold: true }))];
          for (const r of rt) body.push(r.full ? [{ text: r.text, colSpan: 4 }, "", "", ""] : [r.label, r.val, r.ref, r.diff]);
          content.push({ text: t("labResults"), bold: true, margin: [0, 8, 0, 3] });
          content.push({ table: { headerRows: 1, widths: ["*", "auto", "auto", "auto"], body }, layout: "lightHorizontalLines", fontSize: 9, margin: [0, 0, 0, 6] });
        }
      }
      if (store.comments) {
        content.push({ text: t("labComments"), fontSize: 13, bold: true, margin: [0, 10, 0, 4] });
        content.push({ text: store.comments });
      }
      const doc = {
        pageSize: "A4",
        pageMargins: [42, 40, 42, 48],
        info: { title: tt("title"), creator: t("appName") },
        defaultStyle: { font: "Roboto", fontSize: 10, lineHeight: 1.2, color: "#18222d" },
        footer: (page, pages) => ({ columns: [{ text: t("appName") + " · " + t("labTitle"), color: muted }, { text: t("pdfPage", { p: page, n: pages }), alignment: "right", color: muted }], fontSize: 8, margin: [42, 16, 42, 0] }),
        content,
      };
      const name = QBPDF.slug(tt("title")) + (store.student ? "-" + QBPDF.slug(store.student) : "") + ".pdf";
      await new Promise((resolve, reject) => { try { window.pdfMake.createPdf(doc).download(name, resolve); } catch (e) { reject(e); } });
    }

    renderPart();
    partHooks.forEach((fn) => fn(store.part));

    current = {
      def,
      api,
      destroy() {
        clearTimeout(changeTimer);
        clearTimeout(statusTimer);
        for (const g of Object.values(graphs)) if (g.ro) g.ro.disconnect();
        if (hooks.destroy) hooks.destroy();
        destroyers.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
      },
    };
    return current;
  }

  // ---------------------------------------------------------------------------
  // Dışa aktarılanlar
  // ---------------------------------------------------------------------------
  Object.assign(QBL, {
    experiments,
    register(def) {
      experiments.push(def);
      experiments.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      return def;
    },
    find: (id) => experiments.find((e) => e.id === id),
    tx, rng, gauss, between, clamp, hash,
    fixed, sig, sci, unc, parseNum, showRaw, sup, roundTo,
    mean, sd, sem, meanDev, fitLine, fitProp, fitQuad, fit,
    theme, Stage, C, Table, Graph, LogChart, resultsTable,
    mount, unmount, countData, load,
    get current() { return current; },
    G: 9.806,
  });
})();
