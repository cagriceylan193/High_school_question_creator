/*
 * Şekil kütüphanesi
 * -----------------
 * Şablonlardaki figure(v, f) fonksiyonları bu yardımcılarla SVG çizer.
 * Renkler CSS sınıflarıyla verilir (style.css → ".fig"), böylece şekiller
 * açık/koyu temada ve çıktıda okunur kalır.
 *
 *   figure: (v, f) => {
 *     const s = f.svg(320, 160);
 *     s.add(f.rect(20, 40, 80, 50), f.text(60, 65, "m"));
 *     return s;
 *   }
 *
 * f.n(sayı, ondalık)  → dile göre biçimlenmiş sayı
 * f.$("x")            → x değişkeninin biçimlenmiş değeri
 * f.t({tr, en, de})   → dile göre metin
 * Etiketlerde alt simge: "R_1", "d_{su}"
 */
(function (root) {
  "use strict";
  const r = (x) => Math.round(x * 10) / 10;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // "R_1" → R + alt simge 1 ;  "d_{su}" → d + alt simge su
  function label(s) {
    return esc(s).replace(/_(\{[^}]*\}|[^\s])/g, (m, g) =>
      `<tspan dy="4" font-size="0.78em">${g.replace(/[{}]/g, "")}</tspan><tspan dy="-4">​</tspan>`);
  }

  function svg(w, h, aria) {
    const parts = [];
    return {
      w, h,
      add(...xs) { for (const x of xs) if (x) parts.push(String(x)); return this; },
      toString() {
        return `<svg class="fig" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"` +
          (aria ? ` aria-label="${esc(aria)}"` : "") + ` xmlns="http://www.w3.org/2000/svg">${parts.join("")}</svg>`;
      },
    };
  }

  const line = (x1, y1, x2, y2, cls = "ln") => `<line class="${cls}" x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}"/>`;
  const dashed = (x1, y1, x2, y2) => line(x1, y1, x2, y2, "dash");
  const rect = (x, y, w, h, cls = "obj", rx = 0) => `<rect class="${cls}" x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}"${rx ? ` rx="${rx}"` : ""}/>`;
  const circle = (cx, cy, rad, cls = "obj") => `<circle class="${cls}" cx="${r(cx)}" cy="${r(cy)}" r="${r(rad)}"/>`;
  const dot = (cx, cy, rad = 3) => circle(cx, cy, rad, "dot");
  const pts = (p) => p.map(([x, y]) => `${r(x)},${r(y)}`).join(" ");
  const poly = (p, cls = "obj") => `<polygon class="${cls}" points="${pts(p)}"/>`;
  const polyline = (p, cls = "ln") => `<polyline class="${cls}" points="${pts(p)}"/>`;
  const path = (d, cls = "ln") => `<path class="${cls}" d="${d}"/>`;

  // text(x, y, "metin", { a: "start|middle|end", cls: "mut|acc|b", size })
  function text(x, y, s, o = {}) {
    const a = o.a || "middle";
    return `<text x="${r(x)}" y="${r(y)}" text-anchor="${a}" dominant-baseline="central"` +
      (o.cls ? ` class="${o.cls}"` : "") + (o.size ? ` font-size="${o.size}"` : "") + `>${label(s)}</text>`;
  }

  // Ok: çizgi + üçgen uç. cls "acc" → vurgu rengi
  function arrow(x1, y1, x2, y2, cls = "ln", head = 9) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const bx = x2 - head * Math.cos(ang), by = y2 - head * Math.sin(ang);
    const w = head * 0.5;
    const p1 = [bx + w * Math.sin(ang), by - w * Math.cos(ang)];
    const p2 = [bx - w * Math.sin(ang), by + w * Math.cos(ang)];
    return line(x1, y1, bx, by, cls) + poly([[x2, y2], p1, p2], cls === "acc" ? "acc-head" : "head");
  }

  // Ölçü çizgileri: iki uçta kısa çizgi, ortada etiket
  function dimH(x1, x2, y, s, below) {
    return line(x1, y, x2, y, "thin") + line(x1, y - 5, x1, y + 5, "thin") + line(x2, y - 5, x2, y + 5, "thin") +
      text((x1 + x2) / 2, below ? y + 12 : y - 10, s, { cls: "mut" });
  }
  function dimV(x, y1, y2, s, left) {
    return line(x, y1, x, y2, "thin") + line(x - 5, y1, x + 5, y1, "thin") + line(x - 5, y2, x + 5, y2, "thin") +
      text(left ? x - 8 : x + 8, (y1 + y2) / 2, s, { cls: "mut", a: left ? "end" : "start" });
  }

  // Zemin: çizgi + altında taramalar
  function ground(x1, x2, y) {
    let s = line(x1, y, x2, y);
    for (let x = x1 + 4; x <= x2; x += 10) s += line(x, y + 1, x - 7, y + 8, "thin");
    return s;
  }

  function grid(x, y, cols, rows, cell) {
    let s = "";
    for (let i = 0; i <= cols; i++) s += line(x + i * cell, y, x + i * cell, y + rows * cell, "grid");
    for (let j = 0; j <= rows; j++) s += line(x, y + j * cell, x + cols * cell, y + j * cell, "grid");
    return s;
  }

  // Ağzı açık kap: sol, alt ve sağ duvar. Sıvı yüksekliği h (piksel), sıvı sınıfı cls
  function vessel(x, y, w, h, liquidH, cls = "liq") {
    return (liquidH > 0 ? rect(x, y + h - liquidH, w, liquidH, cls) : "") +
      polyline([[x, y], [x, y + h], [x + w, y + h], [x + w, y]], "ln");
  }

  // --- Devre elemanları -----------------------------------------------------
  // Direnç: (x1,y1)-(x2,y2) arası yatay ya da dikey; ortada zikzak
  function resistor(x1, y1, x2, y2, s) {
    const horiz = Math.abs(y2 - y1) < Math.abs(x2 - x1);
    const len = horiz ? x2 - x1 : y2 - y1;
    const zl = 36 * Math.sign(len), a = (len - zl) / 2;
    const p = [];
    if (horiz) {
      p.push([x1, y1], [x1 + a, y1]);
      for (let i = 1; i <= 6; i++) p.push([x1 + a + (zl * i) / 6 - zl / 12, y1 + (i % 2 ? -6 : 6)]);
      p.push([x1 + a + zl, y1], [x2, y2]);
      return polyline(p) + (s ? text((x1 + x2) / 2, y1 - 17, s) : "");
    }
    p.push([x1, y1], [x1, y1 + a]);
    for (let i = 1; i <= 6; i++) p.push([x1 + (i % 2 ? -6 : 6), y1 + a + (zl * i) / 6 - zl / 12]);
    p.push([x1, y1 + a + zl], [x2, y2]);
    return polyline(p) + (s ? text(x1 + 12, (y1 + y2) / 2, s, { a: "start" }) : "");
  }

  // Üreteç (pil): (x1,y)-(x2,y) yatay tel üzerinde uzun (+) ve kısa (−) plaka
  function battery(x1, y, x2, y2, s) {
    const m = (x1 + x2) / 2;
    return line(x1, y, m - 4, y) + line(m + 4, y, x2, y) +
      line(m - 4, y - 13, m - 4, y + 13) + `<line class="ln thick" x1="${r(m + 4)}" y1="${r(y - 7)}" x2="${r(m + 4)}" y2="${r(y + 7)}"/>` +
      (s ? text(m, y + 26, s) : "");
  }

  // Açık anahtar
  function switchOpen(x1, y, x2, s) {
    return line(x1, y, x1 + 8, y) + dot(x1 + 8, y, 2.5) + line(x1 + 8, y, x2 - 10, y - 14) + dot(x2 - 8, y, 2.5) + line(x2 - 8, y, x2, y) +
      (s ? text((x1 + x2) / 2, y + 18, s) : "");
  }

  // Kapalı anahtar
  function switchClosed(x1, y, x2, s) {
    return line(x1, y, x2, y) + dot(x1 + 8, y, 2.5) + dot(x2 - 8, y, 2.5) + (s ? text((x1 + x2) / 2, y + 18, s) : "");
  }

  // --- Grafik -------------------------------------------------------------
  // o = { x, y, w, h, xmax, ymin, ymax, xticks, yticks, xLabel, yLabel, pts, fx, fy }
  // fx/fy: işaret etiketlerini biçimlendiren fonksiyonlar
  function graph(o) {
    const ymin = o.ymin ?? 0;
    const X = (t) => o.x + (t / o.xmax) * o.w;
    const Y = (v) => o.y + o.h - ((v - ymin) / (o.ymax - ymin)) * o.h;
    const fx = o.fx || String, fy = o.fy || String;
    let s = "";
    for (const t of o.xticks || []) if (t) s += dashed(X(t), Y(o.ymax), X(t), Y(ymin)) + text(X(t), Y(ymin) + 12, fx(t), { cls: "mut" });
    for (const v of o.yticks || []) if (v) s += dashed(X(0), Y(v), X(o.xmax), Y(v)) + text(X(0) - 6, Y(v), fy(v), { cls: "mut", a: "end" });
    s += text(X(0) - 6, Y(0) + (ymin < 0 ? 0 : 10), "0", { cls: "mut", a: "end" });
    s += arrow(X(0), Y(ymin) + 4, X(0), o.y - 14) + arrow(X(0) - 4, Y(0), X(o.xmax) + 18, Y(0));
    if (o.yLabel) s += text(X(0) + 6, o.y - 14, o.yLabel, { a: "start" });
    if (o.xLabel) s += text(X(o.xmax) + 22, Y(0), o.xLabel, { a: "start" });
    s += polyline(o.pts.map(([t, v]) => [X(t), Y(v)]), "plot");
    return s;
  }

  // Sinüs dalgası: (x, ymid) başlangıç, dalga boyu lam piksel, genlik amp piksel, uzunluk len piksel
  function wave(x, ymid, lam, amp, len) {
    const p = [];
    for (let i = 0; i <= len; i += 2) p.push([x + i, ymid - amp * Math.sin((2 * Math.PI * i) / lam)]);
    return polyline(p, "plot");
  }

  // Noktalardan geçen yumuşak eğri (Catmull-Rom)
  function curve(p, cls = "ln") {
    let d = `M${r(p[0][0])},${r(p[0][1])}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${r(c1[0])},${r(c1[1])} ${r(c2[0])},${r(c2[1])} ${r(p2[0])},${r(p2[1])}`;
    }
    return path(d, cls);
  }

  // Basit araç: gövde + iki tekerlek
  function car(x, y, w = 46, s) {
    return rect(x, y - 16, w, 14, "obj", 3) + rect(x + w * 0.2, y - 26, w * 0.55, 11, "obj", 3) +
      circle(x + w * 0.22, y - 1, 5) + circle(x + w * 0.78, y - 1, 5) + (s ? text(x + w / 2, y - 36, s) : "");
  }

  // Kutu (blok) ortasında etiket
  function box(x, y, w, h, s, cls = "obj") {
    return rect(x, y, w, h, cls) + (s ? text(x + w / 2, y + h / 2, s) : "");
  }

  root.QB_FIG = {
    svg, line, dashed, rect, circle, dot, poly, polyline, path, text, arrow,
    dimH, dimV, ground, grid, vessel, resistor, battery, switchOpen, switchClosed, graph, wave, curve, car, box, label, esc,
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
