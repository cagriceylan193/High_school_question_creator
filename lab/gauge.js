/*
 * Kumpas (1/20 mm verniyeli) ve mikrometre (0,5 mm vida adımı, 50 bölmeli tambur).
 * Dünya birimi: mm. Ölçekler gerçek geometriyle çizilir; okumayı öğrenci yapar.
 *
 *   const g = QBL.Gauge.caliper();      g.setObject({shape, size, ...}, "outer"|"inner"|"depth")
 *   const m = QBL.Gauge.micrometer({zero: 0.02});
 *   g.draw(c, S); g.set(v); g.close(); g.reading(); g.hit(p); g.drag(p)
 *   QBL.Gauge.panel(api, g, { onRecord(value) }) → denetim kutusu
 */
(function () {
  "use strict";
  const QBL = globalThis.QBL;
  const D = QBL.D;
  const VSTEP = 1.95; // verniye bölmesi (39 mm / 20): ana cetvelin 2 mm'sinden 0,05 mm kısa

  function hatch(c, x, y, w, h, color, gap = 1.6, px = 0.12) {
    c.save();
    c.beginPath();
    c.rect(x, y, w, h);
    c.clip();
    c.strokeStyle = color;
    c.lineWidth = px;
    c.beginPath();
    for (let k = -h; k < w + h; k += gap) { c.moveTo(x + k, y + h); c.lineTo(x + k + h, y); }
    c.stroke();
    c.restore();
  }
  function objFill(c, obj, x0, y0, x1, y1) {
    const g = c.createLinearGradient(x0, y0, x0, y1);
    const tone = obj.tone || "copper";
    const cols = { copper: ["#f0b48c", "#b8673a"], alu: ["#e9edf1", "#9aa3ab"], brass: ["#f6dd92", "#b38a2f"], steel: ["#e6eaee", "#7d868f"], wood: ["#e3bd8a", "#a5743f"] }[tone];
    g.addColorStop(0, cols[0]);
    g.addColorStop(1, cols[1]);
    return g;
  }

  // ---------------------------------------------------------------------------
  // Kumpas
  // ---------------------------------------------------------------------------
  function caliper(o = {}) {
    const g = {
      kind: "caliper", s: o.s ?? 12, obj: null, mode: "outer", res: 0.05, tol: 0.026, max: 100,
      world: [-34, -44, 176, 70],
      END: 128,
    };
    g.setObject = function (obj, mode) {
      g.obj = obj || null;
      g.mode = mode || "outer";
      g.set(g.s);
    };
    g.limits = function () {
      const ob = g.obj;
      if (!ob) return [0, g.max];
      if (g.mode === "outer") return [ob.size, g.max];
      return [0, Math.min(g.max, ob.size)];
    };
    g.set = function (v) {
      const [a, b] = g.limits();
      g.s = QBL.clamp(v, a, b);
      return g.s;
    };
    g.close = function () {
      const [a, b] = g.limits();
      g.s = g.mode === "outer" ? a : b;
    };
    g.open = function () {
      const [a, b] = g.limits();
      g.s = g.mode === "outer" ? Math.min(b, a + 6) : Math.max(0, b - 6);
    };
    g.inContact = function () {
      if (!g.obj) return g.s < 1e-9;
      const [a, b] = g.limits();
      return g.mode === "outer" ? Math.abs(g.s - a) < 1e-9 : Math.abs(g.s - b) < 1e-9;
    };
    /** Verniyede çakışan çizgiye göre gerçek okuma */
    g.reading = function () {
      const n = Math.round((g.s - Math.floor(g.s)) / 0.05);
      return Math.floor(g.s) + n * 0.05;
    };
    g.hit = function (p) {
      return p.x > g.s - 12 && p.x < g.s + 46 && p.y > -8 && p.y < 36;
    };
    g.drag = function (p, start) {
      if (start) g._dx = p.x - g.s;
      g.set(p.x - (g._dx || 0));
    };

    g.draw = function (c, S) {
      const s = g.s, px = S.px, E = g.END;
      // nesne (arkada kalanlar)
      const ob = g.obj;
      if (ob && g.mode === "inner") drawInnerObj(c, ob, S);
      if (ob && g.mode === "depth") drawDepthObj(c, ob, S, E);
      // derinlik çubuğu
      c.fillStyle = D.metal(c, 0, 6, 0, 9.5);
      c.fillRect(E - 2, 6.2, s + 2, 2.6);
      // ana cetvel (gövde)
      c.fillStyle = D.metal(c, 0, 0, 0, 16, "alu");
      D.rr(c, -14, 0, E + 14, 16, 0.6);
      c.fill();
      c.strokeStyle = "rgba(0,0,0,0.35)";
      c.lineWidth = px;
      c.stroke();
      // sabit çeneler
      c.fillStyle = D.metal(c, -14, 0, 0, 0, "alu");
      c.beginPath();
      c.moveTo(-14, 16); c.lineTo(0, 16); c.lineTo(0, 50); c.lineTo(-2.4, 57); c.lineTo(-8, 44); c.lineTo(-14, 30); c.closePath();
      c.fill(); c.stroke();
      c.beginPath();
      c.moveTo(0, 0); c.lineTo(0, -17); c.lineTo(1.6, -21); c.lineTo(5.5, -3); c.lineTo(5.5, 0); c.closePath();
      c.fill(); c.stroke();
      // ana ölçek
      c.strokeStyle = "#111";
      c.lineWidth = Math.max(px, 0.09);
      c.beginPath();
      for (let k = 0; k <= 120; k++) {
        const L = k % 10 === 0 ? 5.2 : k % 5 === 0 ? 3.8 : 2.6;
        c.moveTo(k, 16); c.lineTo(k, 16 - L);
      }
      c.stroke();
      c.fillStyle = "#111";
      c.font = D.font(3.1, 500);
      c.textAlign = "center";
      c.textBaseline = "alphabetic";
      for (let k = 0; k <= 120; k += 10) c.fillText(String(k / 10), k, 9.6);
      c.font = D.font(2.2, 500);
      c.fillText("cm", 124, 9.6);
      // kayar parça (sürgü)
      c.fillStyle = D.metal(c, 0, -4, 0, 28, "alu");
      D.rr(c, s - 12, -3.2, 58, 3.4, 0.8);
      c.fill(); c.stroke();
      D.rr(c, s - 12, 16, 58, 11.5, 0.8);
      c.fill(); c.stroke();
      // hareketli alt çene
      c.beginPath();
      c.moveTo(s, 27.4); c.lineTo(s, 50); c.lineTo(s + 2.4, 57); c.lineTo(s + 8, 44); c.lineTo(s + 13, 30); c.lineTo(s + 13, 27.4); c.closePath();
      c.fill(); c.stroke();
      c.fillStyle = D.metal(c, s - 6, 0, s, 0, "alu");
      c.beginPath();
      c.moveTo(s, 0); c.lineTo(s, -17); c.lineTo(s - 1.6, -21); c.lineTo(s - 5.5, -3); c.lineTo(s - 5.5, 0); c.closePath();
      c.fill(); c.stroke();
      // ölçme yüzeyi (çene) ince çizgisi
      c.fillStyle = D.metal(c, 0, 16, 0, 50);
      // verniye ölçeği
      c.strokeStyle = "#111";
      c.lineWidth = Math.max(px, 0.08);
      c.beginPath();
      for (let j = 0; j <= 20; j++) {
        const x = s + j * VSTEP;
        const L = j % 2 === 0 ? 3.6 : 2.4;
        c.moveTo(x, 16); c.lineTo(x, 16 + L);
      }
      c.stroke();
      c.fillStyle = "#111";
      c.font = D.font(1.9, 500);
      c.textBaseline = "top";
      for (let j = 0; j <= 20; j += 2) c.fillText(String(j / 2), s + j * VSTEP, 20.2);
      c.font = D.font(1.6, 500);
      c.textAlign = "left";
      c.fillText("1/20 mm", s + 40.4, 24.4);
      // tespit vidası ve tekerlek
      D.knob(c, s + 6, -5.4, 2.1, 0.4, "#3a4047");
      c.fillStyle = D.metal(c, s + 17, 0, s + 25, 0, "dark");
      c.beginPath();
      c.ellipse(s + 21, 31.5, 4, 2.4, 0, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = "rgba(255,255,255,0.25)";
      c.lineWidth = 0.2;
      c.beginPath();
      for (let k = -3.4; k <= 3.4; k += 0.8) { c.moveTo(s + 21 + k, 29.6); c.lineTo(s + 21 + k, 33.4); }
      c.stroke();
      // nesne (önde kalanlar)
      if (ob && g.mode === "outer") drawOuterObj(c, ob, S);
    };

    function drawOuterObj(c, ob, S) {
      const w = ob.size;
      c.strokeStyle = "rgba(0,0,0,0.45)";
      c.lineWidth = S.px * 1.2;
      if (ob.shape === "circle") {
        const r = w / 2;
        const g2 = c.createRadialGradient(r - r * 0.35, 38 - r * 0.4, r * 0.1, r, 38, r);
        const cols = { copper: ["#ffd7bd", "#c97a49", "#6b3216"], steel: ["#ffffff", "#9aa3ac", "#4a5159"], brass: ["#fff4c9", "#d4ae55", "#6e5214"] }[ob.tone || "steel"];
        g2.addColorStop(0, cols[0]); g2.addColorStop(0.6, cols[1]); g2.addColorStop(1, cols[2]);
        c.fillStyle = g2;
        c.beginPath();
        c.arc(r, 38, r, 0, Math.PI * 2);
        c.fill();
        c.stroke();
      } else if (ob.shape === "wire") {
        // uzunluğu ölçülen tel (yandan)
        const th = Math.max(1.6, ob.thick || 2);
        c.fillStyle = objFill(c, ob, 0, 38 - th / 2, 0, 38 + th / 2);
        c.fillRect(0, 38 - th / 2, w, th);
        c.strokeRect(0, 38 - th / 2, w, th);
      } else if (ob.shape === "tube") {
        const h = Math.min(ob.h || 20, 22);
        c.fillStyle = objFill(c, ob, 0, 30, 0, 30 + h);
        c.fillRect(0, 30, w, h);
        c.strokeRect(0, 30, w, h);
        c.setLineDash([1, 0.8]);
        const e = (ob.D - ob.d) / 2;
        c.beginPath();
        c.moveTo(e, 30); c.lineTo(e, 30 + h);
        c.moveTo(w - e, 30); c.lineTo(w - e, 30 + h);
        c.stroke();
        c.setLineDash([]);
      } else {
        const h = Math.min(ob.h || 14, 22);
        c.fillStyle = objFill(c, ob, 0, 31, 0, 31 + h);
        c.fillRect(0, 31, w, h);
        c.strokeRect(0, 31, w, h);
      }
    }
    function drawInnerObj(c, ob, S) {
      const d = ob.size, wall = (ob.D - ob.d) / 2;
      const y0 = -19, h = 13;
      c.fillStyle = objFill(c, ob, 0, y0, 0, y0 + h);
      c.fillRect(-wall, y0, wall, h);
      c.fillRect(d, y0, wall, h);
      hatch(c, -wall, y0, wall, h, "rgba(0,0,0,0.45)", 1.4, S.px);
      hatch(c, d, y0, wall, h, "rgba(0,0,0,0.45)", 1.4, S.px);
      c.strokeStyle = "rgba(0,0,0,0.5)";
      c.lineWidth = S.px;
      c.strokeRect(-wall, y0, wall + d + wall, h);
    }
    function drawDepthObj(c, ob, S, E) {
      // borunun yandan kesiti; sağ ucu düz bir plakaya dayalı
      const H = ob.size, cy = 7.5, R = ob.D / 2, r = ob.d / 2;
      c.fillStyle = "#5c6670";
      c.fillRect(E + H, cy - R - 8, 4, 2 * R + 16);
      c.fillStyle = objFill(c, ob, 0, cy - R, 0, cy + R);
      c.fillRect(E, cy - R, H, R - r);
      c.fillRect(E, cy + r, H, R - r);
      hatch(c, E, cy - R, H, R - r, "rgba(0,0,0,0.45)", 1.4, S.px);
      hatch(c, E, cy + r, H, R - r, "rgba(0,0,0,0.45)", 1.4, S.px);
      c.strokeStyle = "rgba(0,0,0,0.5)";
      c.lineWidth = S.px;
      c.strokeRect(E, cy - R, H, 2 * R);
    }
    return g;
  }

  // ---------------------------------------------------------------------------
  // Mikrometre
  // ---------------------------------------------------------------------------
  function micrometer(o = {}) {
    const g = {
      kind: "micrometer", s: o.s ?? 6, zero: o.zero || 0, obj: null, res: 0.01, tol: 0.006, max: 25,
      world: [-26, -24, 96, 34],
      SL: 30, // sabit tamburun sıfır çizgisi
    };
    g.setObject = function (obj) { g.obj = obj || null; g.set(g.s); };
    g.limits = () => [g.obj ? g.obj.size : 0, g.max];
    g.set = function (v) { const [a, b] = g.limits(); g.s = QBL.clamp(v, a, b); return g.s; };
    g.close = function () { g.s = g.limits()[0]; };
    g.open = function () { const [a, b] = g.limits(); g.s = Math.min(b, a + 3); };
    g.inContact = () => Math.abs(g.s - g.limits()[0]) < 1e-9;
    g.reading = () => g.s + g.zero;
    g.hit = (p) => p.x > g.SL + g.reading() - 2 && p.x < g.SL + g.reading() + 34 && Math.abs(p.y) < 9;
    g.drag = function (p, start) {
      if (start) { g._x = p.x; g._s = g.s; }
      // tamburun yanal sürüklenmesi: 1 mm sürükleme = 0,1 mm
      g.set(g._s + (p.x - g._x) * 0.1);
    };

    g.draw = function (c, S) {
      const px = S.px;
      const r = g.reading();
      const xt = g.SL + r; // tamburun sol kenarı
      // gövde (U)
      c.strokeStyle = "#3d4f63";
      c.lineWidth = 7;
      c.lineJoin = "round";
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(-6, 2);
      c.lineTo(-6, 15);
      c.quadraticCurveTo(-6, 22, 2, 22);
      c.lineTo(20, 22);
      c.quadraticCurveTo(27, 22, 27, 15);
      c.lineTo(27, 2);
      c.stroke();
      c.lineCap = "butt";
      c.strokeStyle = "rgba(255,255,255,0.18)";
      c.lineWidth = 1.2;
      c.beginPath();
      c.moveTo(-8.2, 3); c.lineTo(-8.2, 15);
      c.stroke();
      // ısı yalıtım plakası
      c.fillStyle = "#1f2a35";
      D.rr(c, 0, 18.6, 20, 6.8, 1.5);
      c.fill();
      // örs
      c.fillStyle = D.metal(c, 0, -3, 0, 3);
      c.fillRect(-9, -3, 9, 6);
      // mil
      c.fillRect(g.s, -3, g.SL - g.s + 1, 6);
      c.strokeStyle = "rgba(0,0,0,0.35)";
      c.lineWidth = px;
      c.strokeRect(-9, -3, 9, 6);
      c.strokeRect(g.s, -3, g.SL - g.s + 1, 6);
      // kilit kolu
      c.fillStyle = "#2a2f35";
      c.fillRect(22, -7.5, 3, 4.5);
      // nesne
      if (g.obj) drawObj(c, g.obj, S);
      // sabit tambur (gövde boru)
      c.fillStyle = D.metal(c, 0, -4.6, 0, 4.6, "alu");
      c.fillRect(g.SL - 4, -4.6, 34, 9.2);
      c.strokeRect(g.SL - 4, -4.6, 34, 9.2);
      // referans çizgisi ve ölçek
      c.strokeStyle = "#111";
      c.lineWidth = Math.max(px, 0.07);
      c.beginPath();
      c.moveTo(g.SL - 1, 0); c.lineTo(g.SL + 29, 0);
      for (let k = 0; k <= 25; k++) { const x = g.SL + k; const L = k % 5 === 0 ? 2.8 : 2.0; c.moveTo(x, 0); c.lineTo(x, -L); }
      for (let k = 0; k < 25; k++) { const x = g.SL + k + 0.5; c.moveTo(x, 0); c.lineTo(x, 2.0); }
      c.stroke();
      c.fillStyle = "#111";
      c.font = D.font(1.9, 500);
      c.textAlign = "center";
      c.textBaseline = "alphabetic";
      for (let k = 0; k <= 25; k += 5) c.fillText(String(k), g.SL + k, -3.2);
      // dönen tambur
      const R = 7, L = 26;
      c.fillStyle = D.metal(c, 0, -R, 0, R, "alu");
      c.beginPath();
      c.moveTo(xt, -4.9); c.lineTo(xt + 2.6, -R); c.lineTo(xt + L, -R); c.lineTo(xt + L, R); c.lineTo(xt + 2.6, R); c.lineTo(xt, 4.9); c.closePath();
      c.fill();
      c.strokeStyle = "rgba(0,0,0,0.4)";
      c.lineWidth = px;
      c.stroke();
      // tambur bölmeleri
      const v = (((r % 0.5) + 0.5) % 0.5) / 0.01; // 0..50
      c.strokeStyle = "#111";
      c.fillStyle = "#111";
      c.textAlign = "left";
      c.textBaseline = "middle";
      for (let i = 0; i < 50; i++) {
        let d = i - v;
        d = ((d % 50) + 75) % 50 - 25; // -25..25
        const th = (2 * Math.PI * d) / 50;
        if (Math.cos(th) < 0.12) continue;
        const y = -Math.sin(th) * 5.2;
        const len = i % 5 === 0 ? 3.4 : 2.3;
        c.lineWidth = Math.max(px * 0.8, 0.075 * Math.cos(th));
        c.beginPath();
        c.moveTo(xt + 0.25, y);
        c.lineTo(xt + 0.25 + len, y);
        c.stroke();
        if (i % 5 === 0) {
          c.save();
          c.translate(xt + 4.1, y);
          c.scale(1, Math.max(0.15, Math.cos(th)));
          c.font = D.font(1.55, 500);
          c.fillText(String(i), 0, 0);
          c.restore();
        }
      }
      // tırtıl
      c.strokeStyle = "rgba(0,0,0,0.22)";
      c.lineWidth = 0.18;
      c.beginPath();
      for (let x = xt + 12; x < xt + L - 0.5; x += 0.7) { c.moveTo(x, -R + 0.4); c.lineTo(x, R - 0.4); }
      c.stroke();
      // cırcır
      c.fillStyle = D.metal(c, 0, -4, 0, 4, "dark");
      D.rr(c, xt + L, -4.2, 8, 8.4, 1.2);
      c.fill();
      c.strokeStyle = "rgba(255,255,255,0.2)";
      c.beginPath();
      for (let x = xt + L + 1; x < xt + L + 7.5; x += 0.8) { c.moveTo(x, -3.8); c.lineTo(x, 3.8); }
      c.stroke();
    };
    function drawObj(c, ob, S) {
      const w = ob.size;
      c.strokeStyle = "rgba(0,0,0,0.45)";
      c.lineWidth = S.px * 1.2;
      if (ob.shape === "circle") {
        const rr = w / 2;
        D.ball(c, rr, 0, rr, ob.tone === "brass" ? "brass" : "steel");
      } else if (ob.shape === "wire") {
        c.fillStyle = objFill(c, ob, 0, 0, w, 0);
        const gg = c.createLinearGradient(0, 0, w, 0);
        gg.addColorStop(0, "#9b5530"); gg.addColorStop(0.45, "#f3b892"); gg.addColorStop(1, "#8a4523");
        c.fillStyle = gg;
        c.fillRect(0, -13, w, 26);
        c.strokeRect(0, -13, w, 26);
      } else {
        c.fillStyle = objFill(c, ob, 0, -9, 0, 9);
        c.fillRect(0, -9, w, 18);
        c.strokeRect(0, -9, w, 18);
      }
    }
    return g;
  }

  // ---------------------------------------------------------------------------
  // Denetim kutusu: kaydırma, ince ayar, kapat/aç, okuma kontrolü, tabloya yaz
  // ---------------------------------------------------------------------------
  function panel(api, g, o = {}) {
    const { C } = api;
    const t = api.tg;
    const cal = g.kind === "caliper";
    const sl = C.slider({
      label: o.slideLabel || "", min: 0, max: g.max, step: 0.001, value: g.s, show: false,
      fine: cal ? [-1, -0.05, 0.05, 1] : [-0.5, -0.01, 0.01, 0.5],
      fineLabel: (d) => (d >= 0.5 ? (d === 1 ? "1" : "0,5") : cal ? "0,05" : "0,01"),
      onInput: (v) => { g.set(v); sync(); if (o.onMove) o.onMove(); },
    });
    function sync() { sl.value = g.s; }
    const input = api.el("input", { type: "text", inputmode: "decimal", autocomplete: "off", id: "gaugeRead-" + g.kind });
    const fb = api.el("p", { class: "lab-note small", role: "status" });
    const check = () => {
      const v = QBL.parseNum(input.value);
      if (v == null) { fb.textContent = t("labReadingEmpty"); fb.className = "lab-note small warn"; return null; }
      const ok = Math.abs(v - g.reading()) <= g.tol;
      fb.textContent = ok ? t("labReadingOk", { v: QBL.fixed(v, cal ? 2 : 3) + " mm" }) : t("labReadingBad");
      fb.className = "lab-note small " + (ok ? "" : "warn");
      return v;
    };
    const box = C.group(o.title || "",
      sl.el,
      C.buttons([
        { label: o.closeLabel || "", onClick: () => { g.close(); sync(); if (o.onMove) o.onMove(); } },
        { label: o.openLabel || "", onClick: () => { g.open(); sync(); if (o.onMove) o.onMove(); } },
      ]),
      api.el("div", { class: "lab-readbox" },
        api.el("label", { for: input.id }, t("labYourReading") + " (mm)", input),
        C.button(t("labCheck"), check)),
      fb,
      o.onRecord ? C.buttons([{ label: t("labRecord"), primary: true, onClick: () => { const v = QBL.parseNum(input.value); if (v == null) { fb.textContent = t("labReadingEmpty"); fb.className = "lab-note small warn"; return; } o.onRecord(v, input.value); } }]) : null);
    return { el: box, sync, input, clear() { input.value = ""; fb.textContent = ""; } };
  }

  QBL.Gauge = { caliper, micrometer, panel };
})();
