// FİZİK · Madde, basınç, kaldırma kuvveti, ısı
// Tüm sorular ve şekiller bu proje için özgün olarak yazılmıştır.
// level: 1 = kolay, 2 = orta, 3 = zor.  g = 10 m/s².
(function () {
  "use strict";

  // Kapta sıvı + kap etiketleri
  const L = (f, x, y, s, o) => f.text(x, y, s, o);

  // --- Madde ve özellikleri ----------------------------------------------------

  QB.add({
    id: "fiz-madde-karisim-hacim",
    subject: "fizik",
    topic: "madde",
    grade: 9,
    level: 2,
    vars: {
      d1: { values: [0.8, 1, 1.2, 1.5, 2] },
      d2: { values: [0.8, 1, 1.2, 1.5, 2, 2.5] },
      V1: { min: 100, max: 400, step: 100 },
      V2: { min: 100, max: 400, step: 100 },
      dk: "(d1 * V1 + d2 * V2) / (V1 + V2)",
    },
    where: ["d1 != d2", "abs(dk * 100 - round(dk * 100)) < 0.000001"],
    answer: "dk",
    decimals: 2,
    unit: "g/cm³",
    distractors: ["(d1 + d2) / 2", "(d1 * V2 + d2 * V1) / (V1 + V2)", "d1 * d2 / (d1 + d2)", "dk + 0.2"],
    text: {
      tr: "Özkütlesi {d1} g/cm³ olan X sıvısından {V1} cm³ ve özkütlesi {d2} g/cm³ olan Y sıvısından {V2} cm³ alınarak şekildeki gibi türdeş bir karışım hazırlanıyor. Karışımın özkütlesi kaç g/cm³'tür? (Sıvılar karışınca toplam hacim değişmiyor.)",
      en: "{V1} cm³ of liquid X (density {d1} g/cm³) and {V2} cm³ of liquid Y (density {d2} g/cm³) are mixed into a uniform mixture as shown. What is the density of the mixture in g/cm³? (The total volume does not change on mixing.)",
      de: "{V1} cm³ der Flüssigkeit X (Dichte {d1} g/cm³) und {V2} cm³ der Flüssigkeit Y (Dichte {d2} g/cm³) werden wie abgebildet zu einer homogenen Mischung vermischt. Wie groß ist die Dichte der Mischung in g/cm³? (Das Gesamtvolumen ändert sich beim Mischen nicht.)",
    },
    figure: (v, f) => {
      const s = f.svg(340, 150);
      const k = 0.1, H = 90, y = 20;
      s.add(
        f.vessel(20, y, 70, H, v.V1 * k, "liq"), L(f, 55, 128, "X"), L(f, 55, 144, f.$("V1") + " cm³", { cls: "mut" }),
        L(f, 112, y + H / 2, "+", { size: 20 }),
        f.vessel(135, y, 70, H, v.V2 * k, "liq2"), L(f, 170, 128, "Y"), L(f, 170, 144, f.$("V2") + " cm³", { cls: "mut" }),
        f.arrow(215, y + H / 2, 245, y + H / 2),
        f.vessel(255, y, 70, H, (v.V1 + v.V2) * k, "liq3"), L(f, 290, 128, "X + Y"),
      );
      return s;
    },
  });

  QB.add({
    id: "fiz-madde-karisim-kutle",
    subject: "fizik",
    topic: "madde",
    grade: 9,
    level: 3,
    vars: {
      d1: { values: [1, 1.5, 2, 3, 4] },
      d2: { values: [2, 3, 4, 6, 8] },
      dk: "2 * d1 * d2 / (d1 + d2)",
    },
    where: ["d1 < d2", "abs(dk * 10 - round(dk * 10)) < 0.000001"],
    answer: "dk",
    decimals: 2,
    unit: "g/cm³",
    distractors: ["(d1 + d2) / 2", "d1 * d2 / (d1 + d2)", "sqrt(d1 * d2)", "d2 - d1"],
    text: {
      tr: "Özkütleleri {d1} g/cm³ ve {d2} g/cm³ olan iki sıvıdan <b>eşit kütlelerde</b> alınarak türdeş bir karışım hazırlanıyor. Karışımın özkütlesi kaç g/cm³'tür? (Sıvılar karışınca toplam hacim değişmiyor.)",
      en: "<b>Equal masses</b> of two liquids with densities {d1} g/cm³ and {d2} g/cm³ are mixed into a uniform mixture. What is the density of the mixture in g/cm³? (The total volume does not change on mixing.)",
      de: "Von zwei Flüssigkeiten mit den Dichten {d1} g/cm³ und {d2} g/cm³ werden <b>gleiche Massen</b> zu einer homogenen Mischung vermischt. Wie groß ist die Dichte der Mischung in g/cm³? (Das Gesamtvolumen ändert sich beim Mischen nicht.)",
    },
  });

  QB.add({
    id: "fiz-madde-kup-siralama",
    subject: "fizik",
    topic: "madde",
    grade: 9,
    level: 2,
    vars: {
      aK: { values: [1, 2, 3] },
      aL: { values: [1, 2, 3] },
      aM: { values: [1, 2, 3] },
      dK: { values: [1, 2, 3, 4, 8] },
      dL: { values: [1, 2, 3, 4, 8] },
      dM: { values: [1, 2, 3, 4, 8] },
      mK: "dK * aK^3",
      mL: "dL * aL^3",
      mM: "dM * aM^3",
    },
    where: ["!(aK == aL and aL == aM)", "!(dK == dL and dL == dM)", "!(mK > mL and mL > mM and dK > dL and dL > dM)"],
    items: { K: "dK", L: "dL", M: "dM" },
    symbol: "d",
    text: {
      tr: "Türdeş K, L, M küplerinin kenar uzunlukları şekildeki gibi sırasıyla {aK} cm, {aL} cm, {aM} cm; kütleleri ise {mK} g, {mL} g ve {mM} g'dır. Küplerin özkütleleri d<sub>K</sub>, d<sub>L</sub>, d<sub>M</sub> arasındaki ilişki nedir?",
      en: "Uniform cubes K, L, M have edge lengths {aK} cm, {aL} cm and {aM} cm as shown, and masses {mK} g, {mL} g and {mM} g. How do their densities d<sub>K</sub>, d<sub>L</sub>, d<sub>M</sub> compare?",
      de: "Die homogenen Würfel K, L, M haben wie abgebildet die Kantenlängen {aK} cm, {aL} cm und {aM} cm sowie die Massen {mK} g, {mL} g und {mM} g. Wie verhalten sich ihre Dichten d<sub>K</sub>, d<sub>L</sub>, d<sub>M</sub> zueinander?",
    },
    figure: (v, f) => {
      const s = f.svg(340, 150);
      const base = 112, u = 26;
      [["K", v.aK, v.mK, 20], ["L", v.aL, v.mL, 130], ["M", v.aM, v.mM, 240]].forEach(([n, a, m, x]) => {
        const w = a * u, dz = w * 0.3;
        s.add(
          f.poly([[x, base - w], [x + dz, base - w - dz], [x + w + dz, base - w - dz], [x + w, base - w]], "obj"),
          f.poly([[x + w, base - w], [x + w + dz, base - w - dz], [x + w + dz, base - dz], [x + w, base]], "obj"),
          f.rect(x, base - w, w, w, "obj"),
          f.text(x + w / 2, base - w / 2, n),
          f.text(x + w / 2, base + 14, f.n(a) + " cm", { cls: "mut" }),
          f.text(x + w / 2, base + 30, f.n(m) + " g", { cls: "mut" }),
        );
      });
      s.add(f.line(10, base, 330, base, "thin"));
      return s;
    },
  });

  // --- Basınç ------------------------------------------------------------------

  QB.add({
    id: "fiz-basinc-kaplar-siralama",
    subject: "fizik",
    topic: "basinc",
    grade: 10,
    level: 2,
    vars: {
      hK: { values: [10, 20, 30, 40] },
      hL: { values: [10, 20, 30, 40] },
      hM: { values: [10, 20, 30, 40] },
      dK: { values: [1, 2, 3] },
      dL: { values: [1, 2, 3] },
      dM: { values: [1, 2, 3] },
      wK: { values: [40, 60, 80] },
      wL: { values: [40, 60, 80] },
      wM: { values: [40, 60, 80] },
    },
    where: ["!(hK*dK == hL*dL and hL*dL == hM*dM)", "!(hK == hL and hL == hM)"],
    items: { K: "hK * dK", L: "hL * dL", M: "hM * dM" },
    symbol: "P",
    text: {
      tr: "Taban alanları farklı K, L, M kaplarında, özkütleleri sırasıyla {dK} g/cm³, {dL} g/cm³ ve {dM} g/cm³ olan sıvılar vardır. Sıvı yükseklikleri şekildeki gibi {hK} cm, {hL} cm ve {hM} cm'dir. Kapların tabanlarındaki sıvı basınçları P<sub>K</sub>, P<sub>L</sub>, P<sub>M</sub> arasındaki ilişki nedir?",
      en: "Containers K, L, M with different base areas hold liquids of densities {dK} g/cm³, {dL} g/cm³ and {dM} g/cm³. The liquid heights are {hK} cm, {hL} cm and {hM} cm as shown. How do the liquid pressures at the bottoms, P<sub>K</sub>, P<sub>L</sub>, P<sub>M</sub>, compare?",
      de: "In den Gefäßen K, L, M mit unterschiedlichen Grundflächen befinden sich Flüssigkeiten der Dichten {dK} g/cm³, {dL} g/cm³ und {dM} g/cm³. Die Füllhöhen betragen wie abgebildet {hK} cm, {hL} cm und {hM} cm. Wie verhalten sich die Bodendrücke P<sub>K</sub>, P<sub>L</sub>, P<sub>M</sub> zueinander?",
    },
    figure: (v, f) => {
      const s = f.svg(360, 175);
      const bottom = 125, px = 2.2, H = 100;
      for (let h = 10; h <= 40; h += 10) {
        s.add(f.dashed(30, bottom - h * px, 350, bottom - h * px), f.text(26, bottom - h * px, f.n(h), { cls: "mut", a: "end" }));
      }
      s.add(f.text(26, bottom - H - 8, "cm", { cls: "mut", a: "end" }));
      [["K", v.hK, v.dK, v.wK, 50], ["L", v.hL, v.dL, v.wL, 160], ["M", v.hM, v.dM, v.wM, 270]].forEach(([n, h, d, w, x], i) => {
        s.add(
          f.vessel(x + (80 - w) / 2, bottom - H, w, H, h * px, ["liq", "liq2", "liq3"][d - 1]),
          f.text(x + 40, bottom + 16, n),
          f.text(x + 40, bottom + 34, f.n(d) + " g/cm³", { cls: "mut" }),
        );
      });
      return s;
    },
  });

  QB.add({
    id: "fiz-basinc-u-borusu",
    subject: "fizik",
    topic: "basinc",
    grade: 10,
    level: 3,
    vars: {
      dY: { values: [0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] },
      hY: { values: [8, 10, 12, 16, 20, 24] },
      hS: "dY * hY",
    },
    where: "hS == round(hS)",
    answer: "dY",
    decimals: 2,
    unit: "g/cm³",
    distractors: ["hY / hS", "hS / (hY + hS)", "(hY - hS) / hY", "dY + 0.25"],
    text: {
      tr: "Düşey kesiti şekildeki gibi olan U borusunda su ile suyla karışmayan Y sıvısı dengededir. Y sıvısı sütununun yüksekliği {hY} cm'dir; sol koldaki su yüzeyi ise iki sıvının ayrılma yüzeyinden {hS} cm yukarıdadır. Y sıvısının özkütlesi kaç g/cm³'tür? (d<sub>su</sub> = 1 g/cm³)",
      en: "Water and liquid Y, which does not mix with water, are in equilibrium in the U-tube shown. The column of Y is {hY} cm high, and the water surface in the left arm is {hS} cm above the boundary between the two liquids. What is the density of Y in g/cm³? (ρ<sub>water</sub> = 1 g/cm³)",
      de: "Im abgebildeten U-Rohr befinden sich Wasser und eine mit Wasser nicht mischbare Flüssigkeit Y im Gleichgewicht. Die Säule von Y ist {hY} cm hoch, die Wasseroberfläche im linken Schenkel liegt {hS} cm über der Grenzfläche der beiden Flüssigkeiten. Wie groß ist die Dichte von Y in g/cm³? (ρ<sub>Wasser</sub> = 1 g/cm³)",
    },
    figure: (v, f) => {
      const s = f.svg(290, 235);
      const px = 4.5, yI = 165, top = 40;
      const yL = yI - v.hS * px, yT = yI - v.hY * px;
      s.add(
        f.path(`M83,${yL} L83,170 A50,50 0 0 0 183,170 L183,${yI}`, "liq-stroke"),
        f.path(`M183,${yI} L183,${yT}`, "liq2-stroke"),
        f.path(`M70,${top} L70,170 A63,63 0 0 0 196,170 L196,${top}`),
        f.path(`M96,${top} L96,170 A37,37 0 0 0 170,170 L170,${top}`),
        f.dashed(40, yI, 240, yI),
        f.dimV(214, yT, yI, f.$("hY") + " cm"),
        f.dimV(52, yL, yI, f.$("hS") + " cm", true),
        f.text(183, (yT + yI) / 2, "Y"),
        f.text(133, 220, f.t({ tr: "su", en: "water", de: "Wasser" }), { size: 12 }),
      );
      return s;
    },
  });

  QB.add({
    id: "fiz-basinc-tugla",
    subject: "fizik",
    topic: "basinc",
    grade: 10,
    level: 2,
    vars: {
      a: { values: [16, 20, 24, 30] },
      b: { values: [8, 10, 12, 15] },
      c: { values: [4, 5, 6] },
    },
    where: ["a > b", "b > c"],
    answer: "a / c",
    decimals: 2,
    distractors: ["b / c", "a / b", "a * b / (c * c)", "(a + b) / c"],
    text: {
      tr: "Boyutları {a} cm, {b} cm ve {c} cm olan dikdörtgenler prizması biçimindeki türdeş tuğla, yatay zemine farklı yüzeyleri üzerine konulabiliyor. Tuğlanın zemine uyguladığı <b>en büyük</b> basıncın <b>en küçük</b> basınca oranı kaçtır?",
      en: "A uniform brick in the shape of a rectangular box measures {a} cm × {b} cm × {c} cm and can be placed on the floor on any of its faces. What is the ratio of the <b>largest</b> to the <b>smallest</b> pressure the brick can exert on the floor?",
      de: "Ein homogener quaderförmiger Ziegel hat die Maße {a} cm × {b} cm × {c} cm und kann auf jede seiner Flächen auf den Boden gelegt werden. Wie groß ist das Verhältnis des <b>größten</b> zum <b>kleinsten</b> Druck, den der Ziegel auf den Boden ausüben kann?",
    },
    figure: (v, f) => {
      const s = f.svg(320, 150);
      const k = 6, x = 50, y = 118, w = v.a * k, h = v.c * k, dz = v.b * k * 0.45;
      s.add(
        f.poly([[x, y - h], [x + dz, y - h - dz * 0.6], [x + w + dz, y - h - dz * 0.6], [x + w, y - h]], "obj"),
        f.poly([[x + w, y - h], [x + w + dz, y - h - dz * 0.6], [x + w + dz, y - dz * 0.6], [x + w, y]], "obj"),
        f.rect(x, y - h, w, h, "obj"),
        f.text(x + w / 2, y + 14, f.$("a") + " cm", { cls: "mut" }),
        f.text(x - 8, y - h / 2, f.$("c") + " cm", { cls: "mut", a: "end" }),
        f.text(x + w + dz + 6, y - dz * 0.6 - h / 2, f.$("b") + " cm", { cls: "mut", a: "start" }),
        f.ground(10, 310, y),
      );
      return s;
    },
  });

  // --- Kaldırma kuvveti -------------------------------------------------------

  QB.add({
    id: "fiz-kaldirma-yuzen",
    subject: "fizik",
    topic: "kaldirma",
    grade: 10,
    level: 2,
    vars: {
      n: { values: [3, 4, 5, 6] },
      k: { min: 1, max: "n - 1" },
      dS: { values: [0.8, 1, 1.2, 1.5] },
      dC: "dS * k / n",
    },
    where: "abs(dC * 100 - round(dC * 100)) < 0.000001",
    answer: "dC",
    decimals: 2,
    unit: "g/cm³",
    distractors: ["dS * (n - k) / n", "dS * n / k", "k / n", "dS"],
    text: {
      tr: "Eşit bölmeli türdeş bir cisim, özkütlesi {dS} g/cm³ olan sıvıda şekildeki gibi dengededir. Cismin {n} eşit bölmesinden {k} tanesi sıvının içindedir. Cismin özkütlesi kaç g/cm³'tür?",
      en: "A uniform object divided into equal sections floats in equilibrium in a liquid of density {dS} g/cm³ as shown. {k} of its {n} equal sections are below the surface. What is the density of the object in g/cm³?",
      de: "Ein homogener, in gleiche Abschnitte geteilter Körper schwimmt wie abgebildet im Gleichgewicht in einer Flüssigkeit der Dichte {dS} g/cm³. {k} seiner {n} gleichen Abschnitte befinden sich unter der Oberfläche. Wie groß ist die Dichte des Körpers in g/cm³?",
    },
    figure: (v, f) => {
      const s = f.svg(260, 190);
      const yS = 80, part = 18, w = 60, x = 100;
      const yB = yS + v.k * part;
      s.add(f.vessel(30, 30, 200, 140, 170 - yS, "liq"));
      for (let i = 0; i < v.n; i++) s.add(f.rect(x, yB - (i + 1) * part, w, part, "obj"));
      s.add(f.line(30, yS, 230, yS, "liq-edge"), f.text(215, 150, f.$("dS") + " g/cm³", { cls: "mut", a: "end" }));
      return s;
    },
  });

  QB.add({
    id: "fiz-kaldirma-dinamometre",
    subject: "fizik",
    topic: "kaldirma",
    grade: 10,
    level: 3,
    vars: {
      Fk: { min: 2, max: 10 },
      dC: { values: [2, 2.5, 3, 4, 5] },
      G1: "Fk * dC",
      G2: "G1 - Fk",
    },
    where: "G1 == round(G1)",
    answer: "dC",
    decimals: 1,
    unit: "g/cm³",
    distractors: ["G2 / Fk", "G1 / G2", "Fk / G1 * 10", "dC + 1"],
    text: {
      tr: "Bir cisim havada dinamometreye asıldığında dinamometre {G1} N, cisim tamamen suya batırıldığında ise {G2} N gösteriyor. Cismin özkütlesi kaç g/cm³'tür? (d<sub>su</sub> = 1 g/cm³)",
      en: "When an object hangs from a spring scale in air, the scale reads {G1} N; when the object is fully submerged in water, it reads {G2} N. What is the density of the object in g/cm³? (ρ<sub>water</sub> = 1 g/cm³)",
      de: "Hängt ein Körper an einem Kraftmesser in Luft, zeigt dieser {G1} N an; taucht der Körper vollständig in Wasser ein, zeigt er {G2} N an. Wie groß ist die Dichte des Körpers in g/cm³? (ρ<sub>Wasser</sub> = 1 g/cm³)",
    },
    figure: (v, f) => {
      const s = f.svg(320, 210);
      const meter = (x, reading) => f.line(x, 10, x, 22) + f.rect(x - 14, 22, 28, 54, "obj", 4) +
        f.line(x - 6, 32, x + 6, 32, "thin") + f.line(x - 6, 44, x + 6, 44, "thin") + f.line(x - 6, 56, x + 6, 56, "thin") +
        f.text(x + 22, 49, reading + " N", { a: "start" }) + f.line(x, 76, x, 104);
      s.add(f.line(20, 10, 300, 10), meter(80, f.$("G1")), f.rect(62, 104, 36, 32, "obj"));
      s.add(f.vessel(170, 90, 110, 110, 92, "liq"), meter(225, f.$("G2")), f.line(225, 104, 225, 140), f.rect(207, 140, 36, 32, "obj"));
      s.add(f.text(80, 160, f.t({ tr: "havada", en: "in air", de: "in Luft" }), { cls: "mut" }),
        f.text(225, 192, f.t({ tr: "suda", en: "in water", de: "in Wasser" }), { cls: "mut" }));
      return s;
    },
  });

  QB.add({
    id: "fiz-kaldirma-yargi",
    subject: "fizik",
    topic: "kaldirma",
    grade: 10,
    level: 3,
    vars: {
      dS: { values: [0.8, 1, 1.25] },
      dK: { values: [0.5, 0.8, 1, 1.25, 2] },
      dL: { values: [0.8, 1, 1.25, 2] },
      dM: { values: [0.5, 0.8, 1, 1.25, 2.5] },
    },
    statements: [
      {
        text: {
          tr: "K cismi sıvıda yüzer.",
          en: "Object K floats on the liquid.",
          de: "Körper K schwimmt auf der Flüssigkeit.",
        },
        truth: "dK < dS",
      },
      {
        text: {
          tr: "L cismi sıvının içinde askıda kalır.",
          en: "Object L stays suspended inside the liquid.",
          de: "Körper L schwebt in der Flüssigkeit.",
        },
        truth: "dL == dS",
      },
      {
        text: {
          tr: "M cismine etki eden kaldırma kuvveti, M'nin ağırlığına eşittir.",
          en: "The buoyant force on M equals the weight of M.",
          de: "Die Auftriebskraft auf M ist gleich der Gewichtskraft von M.",
        },
        truth: "dM <= dS",
      },
    ],
    text: {
      tr: "Özkütleleri sırasıyla {dK} g/cm³, {dL} g/cm³ ve {dM} g/cm³ olan türdeş K, L, M cisimleri, özkütlesi {dS} g/cm³ olan sıvının bulunduğu derin bir kaba bırakılıyor. Buna göre,",
      en: "Uniform objects K, L and M with densities {dK} g/cm³, {dL} g/cm³ and {dM} g/cm³ are released into a deep container of liquid with density {dS} g/cm³.",
      de: "Die homogenen Körper K, L und M mit den Dichten {dK} g/cm³, {dL} g/cm³ und {dM} g/cm³ werden in ein tiefes Gefäß mit einer Flüssigkeit der Dichte {dS} g/cm³ gegeben.",
    },
  });

  QB.add({
    id: "fiz-kaldirma-tuz",
    subject: "fizik",
    topic: "kaldirma",
    grade: 10,
    level: 3,
    vars: {
      dC: { values: [0.8, 1, 1.1, 1.2, 1.5] },
      d1: { values: [1, 1.1] },
      d2: { values: [1.2, 1.3] },
    },
    changes: [
      {
        label: { tr: "Kaldırma kuvveti", en: "Buoyant force", de: "Auftriebskraft" },
        before: "min(dC, d1)",
        after: "min(dC, d2)",
      },
      {
        label: { tr: "Batan hacim", en: "Submerged volume", de: "Eingetauchtes Volumen" },
        before: "if(dC <= d1, dC / d1, 1)",
        after: "if(dC <= d2, dC / d2, 1)",
      },
    ],
    text: {
      tr: "Özkütlesi {dC} g/cm³ olan türdeş bir cisim, özkütlesi {d1} g/cm³ olan sıvının bulunduğu derin bir kaba bırakılıyor. Sıvıya tuz eklenerek özkütlesi {d2} g/cm³'e çıkarılırsa cisme etki eden kaldırma kuvveti ve cismin sıvı içindeki hacmi nasıl değişir?",
      en: "A uniform object of density {dC} g/cm³ is placed in a deep container of liquid with density {d1} g/cm³. If salt is added so that the liquid's density rises to {d2} g/cm³, how do the buoyant force on the object and its submerged volume change?",
      de: "Ein homogener Körper der Dichte {dC} g/cm³ wird in ein tiefes Gefäß mit einer Flüssigkeit der Dichte {d1} g/cm³ gegeben. Wie ändern sich die Auftriebskraft auf den Körper und sein eingetauchtes Volumen, wenn durch Zugabe von Salz die Dichte der Flüssigkeit auf {d2} g/cm³ steigt?",
    },
  });

  // --- Isı ve sıcaklık ---------------------------------------------------------

  QB.add({
    id: "fiz-isi-q",
    subject: "fizik",
    topic: "isi",
    grade: 9,
    level: 1,
    vars: {
      m: { min: 50, max: 500, step: 50 },
      T1: { min: 10, max: 40, step: 5 },
      T2: { min: 50, max: 90, step: 10 },
    },
    answer: "m * (T2 - T1)",
    unit: "cal",
    distractors: ["m * T2", "m * (T2 + T1)", "m * (T2 - T1) / 2", "m * (T2 - T1) * 2"],
    text: {
      tr: "{m} g suyun sıcaklığını {T1} °C'den {T2} °C'ye çıkarmak için kaç kalori ısı gerekir? (c<sub>su</sub> = 1 cal/g·°C)",
      en: "How many calories of heat are needed to raise the temperature of {m} g of water from {T1} °C to {T2} °C? (c<sub>water</sub> = 1 cal/g·°C)",
      de: "Wie viele Kalorien Wärme sind nötig, um die Temperatur von {m} g Wasser von {T1} °C auf {T2} °C zu erhöhen? (c<sub>Wasser</sub> = 1 cal/g·°C)",
    },
  });

  QB.add({
    id: "fiz-isi-karisim",
    subject: "fizik",
    topic: "isi",
    grade: 9,
    level: 2,
    vars: {
      m1: { min: 100, max: 500, step: 100 },
      m2: { min: 100, max: 500, step: 100 },
      T1: { min: 10, max: 30, step: 10 },
      T2: { min: 50, max: 90, step: 10 },
      T: "(m1 * T1 + m2 * T2) / (m1 + m2)",
    },
    where: ["T == round(T)", "m1 != m2"],
    answer: "T",
    unit: "°C",
    distractors: ["(T1 + T2) / 2", "(m1 * T2 + m2 * T1) / (m1 + m2)", "T2 - T1", "T + 5"],
    text: {
      tr: "Sıcaklığı {T1} °C olan {m1} g su ile sıcaklığı {T2} °C olan {m2} g su, ısıca yalıtılmış bir kapta karıştırılıyor. Isıl denge sağlandığında karışımın sıcaklığı kaç °C olur?",
      en: "{m1} g of water at {T1} °C is mixed with {m2} g of water at {T2} °C in a thermally insulated container. What is the temperature of the mixture at thermal equilibrium in °C?",
      de: "{m1} g Wasser mit {T1} °C werden in einem wärmeisolierten Gefäß mit {m2} g Wasser mit {T2} °C gemischt. Welche Temperatur in °C hat die Mischung im thermischen Gleichgewicht?",
    },
  });

  QB.add({
    id: "fiz-isi-grafik-erime",
    subject: "fizik",
    topic: "isi",
    grade: 9,
    level: 3,
    vars: {
      P: { values: [100, 200, 400, 500] },
      m: { values: [20, 40, 50, 100] },
      Lh: { values: [40, 60, 80, 100, 120] },
      t1: { min: 2, max: 5 },
      dur: "Lh * m / P",
      t2: "t1 + dur",
      t3: "t2 + 3",
      T0: { values: [-20, -10, 0] },
      Te: { values: [20, 40, 60] },
      T3: "Te + 30",
    },
    where: ["dur == round(dur)", "dur >= 2", "dur <= 12"],
    answer: "Lh",
    unit: "cal/g",
    distractors: ["P * t1 / m", "P * t2 / m", "P * dur / (2 * m)", "Lh + 20"],
    text: {
      tr: "Kütlesi {m} g olan saf bir katı, dakikada {P} cal ısı veren bir ısıtıcıyla ısıtılıyor. Maddenin sıcaklık–zaman grafiği şekildeki gibidir. Maddenin erime ısısı kaç cal/g'dır? (Isı kayıpları önemsizdir.)",
      en: "A {m} g sample of a pure solid is heated by a heater that supplies {P} cal per minute. The temperature–time graph of the substance is shown. What is its latent heat of fusion in cal/g? (Heat losses are negligible.)",
      de: "Eine Probe von {m} g eines reinen Feststoffs wird mit einer Heizung erwärmt, die pro Minute {P} cal abgibt. Das Temperatur-Zeit-Diagramm des Stoffes ist abgebildet. Wie groß ist seine spezifische Schmelzwärme in cal/g? (Wärmeverluste sind vernachlässigbar.)",
    },
    figure: (v, f) => {
      const s = f.svg(340, 220);
      const ymin = Math.min(v.T0, 0) - 10;
      s.add(f.graph({
        x: 60, y: 28, w: 205, h: 150, xmax: v.t3 + 1, ymin, ymax: v.T3 + 10,
        xticks: [v.t1, v.t2, v.t3], yticks: [v.T0, v.Te, v.T3].filter((x) => x !== 0),
        fx: (x) => f.n(x), fy: (y) => f.n(y),
        xLabel: f.t({ tr: "t (dk)", en: "t (min)", de: "t (min)" }), yLabel: f.t({ tr: "Sıcaklık (°C)", en: "Temperature (°C)", de: "Temperatur (°C)" }),
        pts: [[0, v.T0], [v.t1, v.Te], [v.t2, v.Te], [v.t3, v.T3]],
      }));
      return s;
    },
  });
})();
