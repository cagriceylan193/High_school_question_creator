/*
 * Laboratuvar çizim kütüphanesi (QBL.D): düzenek parçaları.
 * Tüm ölçüler dünya birimindedir (deneyin seçtiği birim, çoğunlukla cm).
 * px: bir ekran pikselinin dünya birimindeki karşılığı (S.px); ince çizgiler için.
 */
(function () {
  "use strict";
  const QBL = (globalThis.QBL = globalThis.QBL || {});
  const D = (QBL.D = {});
  const FONT = "Lexend, 'Segoe UI', system-ui, sans-serif";

  D.rr = function (c, x, y, w, h, r) {
    r = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  };
  D.font = (size, weight = 500, family = FONT) => `${weight} ${size}px ${family}`;
  D.text = function (c, s, x, y, o = {}) {
    c.font = D.font(o.size || 1, o.weight || 500, o.mono ? "'IBM Plex Mono', ui-monospace, monospace" : FONT);
    c.fillStyle = o.color || "#18222d";
    c.textAlign = o.align || "left";
    c.textBaseline = o.base || "alphabetic";
    if (o.rotate) { c.save(); c.translate(x, y); c.rotate(o.rotate); c.fillText(s, 0, 0); c.restore(); }
    else c.fillText(s, x, y);
  };
  D.line = function (c, x1, y1, x2, y2, color, w) {
    c.strokeStyle = color;
    c.lineWidth = w;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
  };
  D.arrow = function (c, x1, y1, x2, y2, o = {}) {
    const w = o.w || 0.15, head = o.head || w * 4.5;
    const a = Math.atan2(y2 - y1, x2 - x1);
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 1e-9) return;
    const hx = x2 - Math.cos(a) * Math.min(head, len * 0.6), hy = y2 - Math.sin(a) * Math.min(head, len * 0.6);
    c.strokeStyle = o.color || "#18222d";
    c.fillStyle = o.color || "#18222d";
    c.lineWidth = w;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(hx, hy);
    c.stroke();
    const hh = Math.min(head, len * 0.6);
    c.beginPath();
    c.moveTo(x2, y2);
    c.lineTo(x2 - Math.cos(a - 0.38) * hh, y2 - Math.sin(a - 0.38) * hh);
    c.lineTo(x2 - Math.cos(a + 0.38) * hh, y2 - Math.sin(a + 0.38) * hh);
    c.closePath();
    c.fill();
    c.lineCap = "butt";
  };

  // --- Ortam ----------------------------------------------------------------
  D.wall = function (c, S, x0, y0, x1, y1) {
    const v = S.view || {};
    x0 = Math.min(x0 ?? Infinity, v.x0 ?? Infinity); y0 = Math.min(y0 ?? Infinity, v.y0 ?? Infinity);
    x1 = Math.max(x1 ?? -Infinity, v.x1 ?? -Infinity); y1 = Math.max(y1 ?? -Infinity, v.y1 ?? -Infinity);
    const g = c.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, S.colors.wallTop);
    g.addColorStop(1, S.colors.wallBottom);
    c.fillStyle = g;
    c.fillRect(x0, y0, x1 - x0, y1 - y0);
  };
  D.bench = function (c, S, x0, x1, y, thick = 3, depth = 0, full = true) {
    const dark = S && S.colors && S.colors.dark;
    if (full && S && S.view) { x0 = Math.min(x0, S.view.x0); x1 = Math.max(x1, S.view.x1); thick = Math.max(thick, S.view.y1 - y); }
    if (depth) {
      const gt = c.createLinearGradient(0, y - depth, 0, y);
      gt.addColorStop(0, dark ? "#5b4632" : "#d9b88f");
      gt.addColorStop(1, dark ? "#4a3828" : "#c9a274");
      c.fillStyle = gt;
      c.fillRect(x0, y - depth, x1 - x0, depth);
    }
    const g = c.createLinearGradient(0, y, 0, y + thick);
    g.addColorStop(0, dark ? "#6b5139" : "#b98b5c");
    g.addColorStop(1, dark ? "#3f2f20" : "#8d6640");
    c.fillStyle = g;
    c.fillRect(x0, y, x1 - x0, thick);
    c.fillStyle = "rgba(255,255,255,0.18)";
    c.fillRect(x0, y, x1 - x0, thick * 0.08);
  };
  D.metal = function (c, x0, y0, x1, y1, tone) {
    const g = c.createLinearGradient(x0, y0, x1, y1);
    if (tone === "dark") {
      g.addColorStop(0, "#2b3036"); g.addColorStop(0.35, "#6b737c"); g.addColorStop(0.6, "#3c434a"); g.addColorStop(1, "#1d2126");
    } else if (tone === "alu") {
      g.addColorStop(0, "#8c949c"); g.addColorStop(0.3, "#f2f4f6"); g.addColorStop(0.65, "#c3c9cf"); g.addColorStop(1, "#7d858d");
    } else if (tone === "brass") {
      g.addColorStop(0, "#8a6a22"); g.addColorStop(0.35, "#f3dc90"); g.addColorStop(0.65, "#caa64c"); g.addColorStop(1, "#7a5a19");
    } else if (tone === "copper") {
      g.addColorStop(0, "#7a3b1b"); g.addColorStop(0.35, "#f2b48a"); g.addColorStop(0.65, "#c47447"); g.addColorStop(1, "#6b3216");
    } else {
      g.addColorStop(0, "#6f7780"); g.addColorStop(0.35, "#eef1f4"); g.addColorStop(0.6, "#aab2ba"); g.addColorStop(1, "#59616a");
    }
    return g;
  };
  D.rodV = function (c, x, y1, y2, w, tone) {
    c.fillStyle = D.metal(c, x - w / 2, 0, x + w / 2, 0, tone);
    c.fillRect(x - w / 2, Math.min(y1, y2), w, Math.abs(y2 - y1));
  };
  D.rodH = function (c, x1, x2, y, w, tone) {
    c.fillStyle = D.metal(c, 0, y - w / 2, 0, y + w / 2, tone);
    c.fillRect(Math.min(x1, x2), y - w / 2, Math.abs(x2 - x1), w);
  };
  /** Ayaklı sehpa: taban + dikey çubuk. Döndürür: çubuğun üst y'si */
  D.stand = function (c, x, yBase, height, o = {}) {
    const bw = o.baseW || 16, bh = o.baseH || 1.6, rw = o.rodW || 1.1;
    D.rodV(c, x, yBase - height, yBase - bh * 0.5, rw);
    c.fillStyle = D.metal(c, 0, yBase - bh, 0, yBase, "dark");
    D.rr(c, x - bw * (o.baseLeft ?? 0.35), yBase - bh, bw, bh, bh * 0.35);
    c.fill();
    c.fillStyle = "rgba(255,255,255,0.12)";
    c.fillRect(x - bw * (o.baseLeft ?? 0.35) + bh * 0.3, yBase - bh, bw - bh * 0.6, bh * 0.18);
    return yBase - height;
  };
  /** Bağlama parçası (kıskaç başı) */
  D.boss = function (c, x, y, s = 2) {
    c.fillStyle = D.metal(c, x - s, 0, x + s, 0, "dark");
    D.rr(c, x - s / 2, y - s / 2, s, s, s * 0.15);
    c.fill();
    c.fillStyle = "#1c1f23";
    c.beginPath();
    c.arc(x + s * 0.75, y, s * 0.28, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#4b525a";
    c.fillRect(x + s / 2, y - s * 0.08, s * 0.25, s * 0.16);
  };
  D.knob = function (c, x, y, r, ang = 0, color = "#22262b") {
    const g = c.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    g.addColorStop(0, "#5a6068");
    g.addColorStop(1, color);
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "#e8ecef";
    c.lineWidth = r * 0.16;
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + Math.sin(ang) * r * 0.8, y - Math.cos(ang) * r * 0.8);
    c.stroke();
  };
  D.led = function (c, x, y, r, on, color = "#ff3b2f") {
    c.fillStyle = on ? color : "#3a2a2a";
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
    if (on) {
      const g = c.createRadialGradient(x, y, 0, x, y, r * 3);
      g.addColorStop(0, color + "aa");
      g.addColorStop(1, color + "00");
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, r * 3, 0, Math.PI * 2);
      c.fill();
    }
  };

  // --- Cetvel ---------------------------------------------------------------
  /**
   * o: { x, y, len (cm), dir:"v"|"h", u (dünya birimi / cm), from (başlangıç cm), w (genişlik),
   *      side:"left"|"right"|"top"|"bottom" (çizgilerin olduğu kenar), every (etiket aralığı cm),
   *      px, face, reverse (dikeyde değerler yukarı artar) }
   */
  D.ruler = function (c, o) {
    const u = o.u || 1, len = o.len, w = o.w || 2.6 * u, px = o.px || 0.02 * u;
    const vertical = o.dir === "v";
    const face = o.face || "#f3ead0";
    c.save();
    c.translate(o.x, o.y);
    if (vertical) c.rotate(Math.PI / 2);
    // gövde (yatay çizip döndürüyoruz: boy x yönünde, genişlik y yönünde)
    const sideTop = vertical ? o.side === "right" : o.side !== "bottom";
    c.fillStyle = face;
    c.fillRect(0, sideTop ? 0 : -w, len * u, w);
    c.strokeStyle = "rgba(60,50,30,0.55)";
    c.lineWidth = px;
    c.strokeRect(0, sideTop ? 0 : -w, len * u, w);
    const sgn = sideTop ? 1 : -1;
    c.strokeStyle = "#1a1a1a";
    const n = Math.round(len * 10);
    const from = o.from || 0;
    const every = o.every || 1;
    const fs = o.fontSize || Math.min(w * 0.3, 0.9 * u);
    c.font = D.font(fs, 500);
    c.fillStyle = "#1a1a1a";
    c.textBaseline = "middle";
    c.textAlign = "center";
    const mmLen = o.noMm ? 0 : w * 0.16, fiveLen = w * 0.26, cmLen = w * 0.38;
    c.beginPath();
    for (let i = 0; i <= n; i++) {
      const pos = (o.reverse ? len - i / 10 : i / 10) * u;
      const val = from + i / 10;
      const r10 = Math.round(val * 10);
      const L = r10 % 10 === 0 ? cmLen : r10 % 5 === 0 ? fiveLen : mmLen;
      if (!L) continue;
      c.moveTo(pos, 0);
      c.lineTo(pos, sgn * L);
    }
    c.lineWidth = Math.max(px, 0.012 * u);
    c.stroke();
    for (let i = 0; i <= n; i += 10) {
      const val = from + i / 10;
      const r = Math.round(val);
      if (Math.abs(val - r) > 1e-6 || r % every !== 0) continue;
      const pos = (o.reverse ? len - i / 10 : i / 10) * u;
      c.save();
      c.translate(pos, sgn * (cmLen + fs * 0.75));
      if (vertical) c.rotate(-Math.PI / 2);
      c.fillText(String(r), 0, 0);
      c.restore();
    }
    if (o.unitLabel) {
      c.save();
      c.translate(len * u - fs * 1.2, sgn * (w - fs * 0.8));
      if (vertical) c.rotate(-Math.PI / 2);
      c.font = D.font(fs * 0.8, 500);
      c.fillText(o.unitLabel, 0, 0);
      c.restore();
    }
    c.restore();
  };

  // --- Yay, kanca, kütle ----------------------------------------------------
  D.spring = function (c, x, y1, y2, o = {}) {
    const r = o.r || 1, coils = o.coils || 14, wire = o.wire || 0.18;
    const lead = o.lead ?? 0.8;
    const top = y1 + lead, bot = y2 - lead;
    c.lineCap = "round";
    c.strokeStyle = o.dark || "#5b6168";
    c.lineWidth = wire;
    c.beginPath();
    c.moveTo(x, y1);
    c.lineTo(x, top);
    c.moveTo(x, bot);
    c.lineTo(x, y2);
    c.stroke();
    const N = Math.max(8, Math.round(coils * 20));
    const pt = (k) => {
      const s = k / N, ph = s * coils * Math.PI * 2;
      return [x + r * Math.sin(ph), top + (bot - top) * s, Math.cos(ph)];
    };
    for (const pass of [0, 1]) {
      c.strokeStyle = pass ? o.color || "#b9c0c7" : o.dark || "#5b6168";
      c.lineWidth = pass ? wire : wire * 0.9;
      c.beginPath();
      let pen = false;
      for (let k = 0; k <= N; k++) {
        const [px, py, z] = pt(k);
        const front = z > 0;
        if (front === !!pass) { if (pen) c.lineTo(px, py); else { c.moveTo(px, py); pen = true; } }
        else pen = false;
      }
      c.stroke();
    }
    c.lineCap = "butt";
  };
  D.hook = function (c, x, y, s = 1, color = "#5b6168") {
    c.strokeStyle = color;
    c.lineWidth = s * 0.16;
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x, y + s * 0.7);
    c.arc(x - s * 0.3, y + s * 0.7, s * 0.3, 0, Math.PI * 0.95);
    c.stroke();
  };
  /** Yarıklı kütle (yandan): üst kenar y, genişlik w, kalınlık h */
  D.slotted = function (c, cx, y, w, h, o = {}) {
    const tone = o.tone || "brass";
    c.fillStyle = D.metal(c, cx - w / 2, 0, cx + w / 2, 0, tone);
    D.rr(c, cx - w / 2, y, w, h, Math.min(h * 0.25, w * 0.08));
    c.fill();
    c.strokeStyle = "rgba(0,0,0,0.35)";
    c.lineWidth = o.px || h * 0.04;
    c.stroke();
    if (o.label) {
      c.font = D.font(Math.min(h * 0.62, w * 0.22), 600);
      c.fillStyle = tone === "steel" || tone === "alu" ? "#1d2228" : "#3d2a05";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(o.label, cx, y + h * 0.54);
    }
  };
  /**
   * Kütle askısı: tepe (kanca) cx,top; çubuk boyu len; disk genişliği w.
   * masses: [{h, label, tone}] alttan üste dizilir. Döndürür {bottom}.
   */
  D.hanger = function (c, cx, top, o = {}) {
    const len = o.len || 6, w = o.w || 4, plate = o.plate || 0.5;
    const rod = o.rod || 0.3;
    D.hook(c, cx, top - 0.9, 1.0, "#4b525a");
    c.fillStyle = D.metal(c, cx - rod / 2, 0, cx + rod / 2, 0);
    c.fillRect(cx - rod / 2, top, rod, len);
    const bottom = top + len;
    c.fillStyle = D.metal(c, cx - w / 2, 0, cx + w / 2, 0, "dark");
    D.rr(c, cx - w / 2, bottom - plate, w, plate, plate * 0.3);
    c.fill();
    let y = bottom - plate;
    for (const m of o.masses || []) {
      y -= m.h;
      D.slotted(c, cx, y, m.w || w * 0.92, m.h, { tone: m.tone, label: m.label, px: o.px });
    }
    return { bottom, top };
  };

  // --- Makara, ip, bilye ----------------------------------------------------
  D.pulley = function (c, cx, cy, r, ang = 0, o = {}) {
    c.fillStyle = D.metal(c, cx - r, cy - r, cx + r, cy + r, o.tone || "alu");
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "rgba(0,0,0,0.45)";
    c.lineWidth = r * 0.08;
    c.beginPath();
    c.arc(cx, cy, r * 0.86, 0, Math.PI * 2);
    c.stroke();
    c.strokeStyle = "rgba(0,0,0,0.3)";
    c.lineWidth = r * 0.07;
    for (let k = 0; k < (o.spokes || 3); k++) {
      const a = ang + (k * Math.PI * 2) / (o.spokes || 3);
      c.beginPath();
      c.moveTo(cx + Math.cos(a) * r * 0.2, cy + Math.sin(a) * r * 0.2);
      c.lineTo(cx + Math.cos(a) * r * 0.8, cy + Math.sin(a) * r * 0.8);
      c.stroke();
    }
    c.fillStyle = "#2b3036";
    c.beginPath();
    c.arc(cx, cy, r * 0.17, 0, Math.PI * 2);
    c.fill();
  };
  D.string = function (c, pts, color, w) {
    c.strokeStyle = color;
    c.lineWidth = w;
    c.lineJoin = "round";
    c.beginPath();
    pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
    c.stroke();
  };
  const BALL = {
    steel: ["#ffffff", "#b8c0c8", "#5d656e", "#2c3238"],
    brass: ["#fff6cf", "#e2c06a", "#9a7424", "#4f3a0c"],
    lead: ["#e3e6ea", "#8d949c", "#4d535a", "#25292d"],
    wood: ["#ffe6c0", "#d3a26a", "#9b6a36", "#5c3c18"],
    red: ["#ffd7cf", "#e2493a", "#9b1e14", "#4f0d08"],
    blue: ["#d8e6ff", "#4d7fe0", "#1f4aa0", "#0c2250"],
    black: ["#8a9096", "#30353b", "#16191c", "#050607"],
  };
  D.ball = function (c, x, y, r, kind = "steel") {
    const k = BALL[kind] || BALL.steel;
    const g = c.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.05, x, y, r);
    g.addColorStop(0, k[0]);
    g.addColorStop(0.35, k[1]);
    g.addColorStop(0.85, k[2]);
    g.addColorStop(1, k[3]);
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
  };

  // --- Elektronik -----------------------------------------------------------
  /** Çatal ışık kapısı (fotosel). dir:"v" → kollar düşey, ışın yatay. */
  D.photogate = function (c, x, y, o = {}) {
    const s = o.s || 1;
    const gap = (o.gap || 3) * s, arm = (o.arm || 3.2) * s, th = 0.9 * s, body = 1.4 * s;
    c.save();
    c.translate(x, y);
    if (o.dir === "h") c.rotate(-Math.PI / 2);
    // gövde: ışın noktası (0,0); kollar ±gap/2'de, yukarıdan aşağı uzanır
    c.fillStyle = o.color || "#2b3138";
    D.rr(c, -gap / 2 - th, -arm * 0.5, th, arm, th * 0.3);
    c.fill();
    D.rr(c, gap / 2, -arm * 0.5, th, arm, th * 0.3);
    c.fill();
    D.rr(c, -gap / 2 - th, arm * 0.5 - body * 0.1, gap + 2 * th, body, th * 0.3);
    c.fill();
    c.fillStyle = "rgba(255,255,255,0.12)";
    c.fillRect(-gap / 2 - th, -arm * 0.5, th * 0.25, arm);
    // ışın
    if (o.beam !== false) {
      c.strokeStyle = o.blocked ? "rgba(255,40,30,0.25)" : "rgba(255,40,30,0.8)";
      c.lineWidth = 0.08 * s;
      c.setLineDash([0.25 * s, 0.2 * s]);
      c.beginPath();
      c.moveTo(-gap / 2, 0);
      c.lineTo(gap / 2, 0);
      c.stroke();
      c.setLineDash([]);
    }
    D.led(c, 0, arm * 0.5 + body * 0.4, 0.22 * s, !!o.blocked, "#ff3b2f");
    c.restore();
  };

  const SEG = {
    "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc", "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcdfg",
    "-": "g", "−": "g", " ": "", "E": "afged", "r": "eg", "o": "cdeg", "P": "abfge", "H": "bcefg", "L": "fed", "A": "abcefg", "b": "cdefg",
    "C": "adef", "c": "deg", "d": "bcdeg", "F": "aefg", "n": "ceg", "t": "defg", "u": "cde", "S": "afgcd", "h": "cefg", "U": "bcdef", "_": "d", "°": "abfg",
  };
  function digit(c, ch, dp, x, y, w, h, on, off) {
    const t = h * 0.12, k = 0.07;
    c.save();
    c.translate(x, y);
    c.transform(1, 0, -k, 1, k * h, 0);
    const X0 = t / 2, X1 = w - t / 2, Y0 = t / 2, Ym = h / 2, Y1 = h - t / 2, g = t * 0.18;
    const hseg = (y0) => { c.beginPath(); c.moveTo(X0 + g, y0); c.lineTo(X0 + t / 2 + g, y0 - t / 2); c.lineTo(X1 - t / 2 - g, y0 - t / 2); c.lineTo(X1 - g, y0); c.lineTo(X1 - t / 2 - g, y0 + t / 2); c.lineTo(X0 + t / 2 + g, y0 + t / 2); c.closePath(); };
    const vseg = (x0, ya, yb) => { c.beginPath(); c.moveTo(x0, ya + g); c.lineTo(x0 + t / 2, ya + t / 2 + g); c.lineTo(x0 + t / 2, yb - t / 2 - g); c.lineTo(x0, yb - g); c.lineTo(x0 - t / 2, yb - t / 2 - g); c.lineTo(x0 - t / 2, ya + t / 2 + g); c.closePath(); };
    const segs = { a: () => hseg(Y0), g: () => hseg(Ym), d: () => hseg(Y1), f: () => vseg(X0, Y0, Ym), b: () => vseg(X1, Y0, Ym), e: () => vseg(X0, Ym, Y1), c: () => vseg(X1, Ym, Y1) };
    const lit = SEG[ch] ?? "";
    for (const s of "abcdefg") {
      segs[s]();
      c.fillStyle = lit.includes(s) ? on : off;
      c.fill();
    }
    c.fillStyle = dp ? on : off;
    c.beginPath();
    c.arc(w + t * 0.35, Y1, t * 0.55, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
  /** Yedi bölmeli yazı. o.align: "left"|"right" (x sol ya da sağ kenar), o.cells: hane sayısı */
  D.sevenSeg = function (c, text, x, y, h, on, off, o = {}) {
    const chars = [];
    for (const ch of String(text)) {
      if ((ch === "." || ch === ",") && chars.length && !chars[chars.length - 1].dp && chars[chars.length - 1].ch !== ":") chars[chars.length - 1].dp = true;
      else chars.push({ ch, dp: false });
    }
    if (o.cells) while (chars.filter((q) => q.ch !== ":").length < o.cells) chars.unshift({ ch: " ", dp: false });
    const w = h * 0.5, gap = h * 0.12, colonW = h * 0.28;
    const cw = (q) => (q.ch === ":" ? colonW : w + gap);
    const total = chars.reduce((s, q) => s + cw(q), 0);
    let cx = o.align === "right" ? x - total : x;
    for (const q of chars) {
      if (q.ch === ":") {
        c.fillStyle = on;
        for (const yy of [h * 0.32, h * 0.72]) { c.beginPath(); c.arc(cx + colonW * 0.4, y + yy, h * 0.065, 0, Math.PI * 2); c.fill(); }
      } else digit(c, q.ch, q.dp, cx, y, w, h, on, off);
      cx += cw(q);
    }
    return total;
  };
  /** Dijital sayaç kutusu (ön panel + kırmızı rakamlar) */
  D.counter = function (c, x, y, w, h, text, o = {}) {
    c.fillStyle = D.metal(c, 0, y, 0, y + h, "dark");
    const body = o.body || "#c8322b";
    const g = c.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, body);
    g.addColorStop(1, shade(body, -0.25));
    c.fillStyle = g;
    D.rr(c, x, y, w, h, h * 0.08);
    c.fill();
    const dh = h * 0.42, dw = w * 0.86;
    c.fillStyle = "#16090a";
    D.rr(c, x + (w - dw) / 2, y + h * 0.12, dw, dh + h * 0.12, h * 0.04);
    c.fill();
    D.sevenSeg(c, text, x + (w + dw) / 2 - h * 0.08, y + h * 0.18, dh, o.on || "#ff4130", o.off || "rgba(255,65,48,0.1)", { align: "right", cells: o.cells });
    if (o.label) D.text(c, o.label, x + w * 0.07, y + h * 0.86, { size: h * 0.11, color: "rgba(255,255,255,0.88)", base: "middle" });
    if (o.unit) D.text(c, o.unit, x + w * 0.93, y + h * 0.86, { size: h * 0.12, color: "#fff", align: "right", base: "middle", weight: 600 });
  };
  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const k = f < 0 ? 0 : 255, a = Math.abs(f);
    r = Math.round(r + (k - r) * a); g = Math.round(g + (k - g) * a); b = Math.round(b + (k - b) * a);
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }
  D.shade = shade;

  // --- Açı ölçer ------------------------------------------------------------
  /** Açı ölçer: merkez cx,cy, yarıçap r; açılar derece, matematik yönünde (saat yönü tersine, y yukarı) */
  D.protractor = function (c, cx, cy, r, o = {}) {
    const from = o.from ?? 0, to = o.to ?? 180, px = o.px || r * 0.005;
    const rad = (d) => (-d * Math.PI) / 180;
    c.fillStyle = o.face || "rgba(240,246,250,0.82)";
    c.beginPath();
    c.moveTo(cx, cy);
    c.arc(cx, cy, r, rad(from), rad(to), true);
    c.closePath();
    c.fill();
    c.strokeStyle = "rgba(20,40,60,0.55)";
    c.lineWidth = px * 1.5;
    c.stroke();
    c.strokeStyle = "#1a2530";
    c.fillStyle = "#1a2530";
    c.font = D.font(r * 0.075, 500);
    c.textAlign = "center";
    c.textBaseline = "middle";
    for (let d = Math.ceil(from); d <= to; d++) {
      const L = d % 10 === 0 ? r * 0.12 : d % 5 === 0 ? r * 0.08 : r * 0.045;
      const a = rad(d);
      c.lineWidth = d % 10 === 0 ? px * 1.4 : px;
      c.beginPath();
      c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      c.lineTo(cx + Math.cos(a) * (r - L), cy + Math.sin(a) * (r - L));
      c.stroke();
      if (d % (o.every || 10) === 0) {
        const lbl = o.label ? o.label(d) : String(d);
        c.fillText(lbl, cx + Math.cos(a) * (r * 0.8), cy + Math.sin(a) * (r * 0.8));
      }
    }
  };
  /** Ölçü oku (iki uçlu) ve etiket */
  D.dim = function (c, x1, y1, x2, y2, label, o = {}) {
    const col = o.color || "#334";
    D.arrow(c, (x1 + x2) / 2, (y1 + y2) / 2, x1, y1, { color: col, w: o.w || 0.08, head: o.head || 0.5 });
    D.arrow(c, (x1 + x2) / 2, (y1 + y2) / 2, x2, y2, { color: col, w: o.w || 0.08, head: o.head || 0.5 });
    if (label) D.text(c, label, (x1 + x2) / 2 + (o.dx || 0), (y1 + y2) / 2 + (o.dy || -0.3), { size: o.size || 0.8, color: col, align: "center", base: o.base || "bottom" });
  };
})();
