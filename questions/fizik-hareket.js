// FİZİK · Hareket, kuvvet, enerji
// Tüm sorular ve şekiller bu proje için özgün olarak yazılmıştır.
// level: 1 = kolay, 2 = orta, 3 = zor.  g = 10 m/s².
(function () {
  "use strict";

  const T = {
    t: { tr: "t (s)", en: "t (s)", de: "t (s)" },
    x: { tr: "Konum (m)", en: "Position (m)", de: "Ort (m)" },
    v: { tr: "Hız (m/s)", en: "Velocity (m/s)", de: "Geschwindigkeit (m/s)" },
  };

  // Yol üzerinde iki araç ve aradaki uzaklık
  function twoCars(v, f, sameDir) {
    const s = f.svg(360, 132);
    s.add(f.line(10, 90, 350, 90, "thin"));
    s.add(f.car(30, 88, 46, "K"), f.arrow(80, 50, 120, 50, "acc"), f.text(100, 36, f.$("vK") + " m/s", { cls: "mut" }));
    if (sameDir) s.add(f.car(270, 88, 46, "L"), f.arrow(320, 50, 352, 50, "acc"), f.text(330, 36, f.$("vL") + " m/s", { cls: "mut" }));
    else s.add(f.car(280, 88, 46, "L"), f.arrow(276, 50, 236, 50, "acc"), f.text(256, 36, f.$("vL") + " m/s", { cls: "mut" }));
    s.add(f.dimH(53, sameDir ? 293 : 303, 108, f.$("d") + " m", true));
    return s;
  }

  // --- Hareket -----------------------------------------------------------------

  QB.add({
    id: "fiz-hareket-xt-hiz",
    subject: "fizik",
    topic: "hareket",
    grade: 9,
    level: 1,
    vars: {
      x0: { values: [10, 20, 30] },
      v: { values: [1, 2, 3, 4, 5, 6, 8, 10] },
      t: { values: [2, 4, 5, 8, 10] },
      x1: "x0 + v * t",
    },
    where: "v * t >= x0",
    answer: "v",
    unit: "m/s",
    distractors: ["x1 / t", "x0 / t", "(x1 - x0) / (2 * t)", "x1 - x0"],
    text: {
      tr: "Doğrusal bir yolda sabit hızla hareket eden bir aracın konum–zaman grafiği şekildeki gibidir. Aracın hızı kaç m/s'dir?",
      en: "The position–time graph of a car moving at constant velocity along a straight road is shown. What is the car's velocity in m/s?",
      de: "Das Ort-Zeit-Diagramm eines Autos, das sich mit konstanter Geschwindigkeit auf einer geraden Straße bewegt, ist abgebildet. Wie groß ist die Geschwindigkeit des Autos in m/s?",
    },
    figure: (v, f) => {
      const s = f.svg(320, 210);
      s.add(f.graph({
        x: 50, y: 30, w: 220, h: 140, xmax: v.t * 1.2, ymax: v.x1 * 1.15,
        xticks: [v.t], yticks: [v.x0, v.x1], fx: (x) => f.n(x), fy: (y) => f.n(y),
        xLabel: f.t(T.t), yLabel: f.t(T.x), pts: [[0, v.x0], [v.t, v.x1]],
      }));
      return s;
    },
  });

  QB.add({
    id: "fiz-hareket-vt-alan",
    subject: "fizik",
    topic: "hareket",
    grade: 9,
    level: 2,
    vars: {
      v0: { values: [0, 5, 10] },
      v1: { values: [10, 15, 20, 30] },
      t1: { values: [2, 4] },
      d2: { values: [2, 3, 4, 6] },
      d3: { values: [2, 4] },
      t2: "t1 + d2",
      t3: "t2 + d3",
      x: "(v0 + v1) / 2 * t1 + v1 * d2 + v1 * d3 / 2",
    },
    where: ["v1 > v0", "x == round(x)"],
    answer: "x",
    unit: "m",
    distractors: ["v1 * t3", "v1 * d2", "(v0 + v1) * t3 / 2", "v1 * t3 / 2"],
    text: {
      tr: "Doğrusal bir yolda hareket eden bir aracın hız–zaman grafiği şekildeki gibidir. Araç 0–{t3} s aralığında kaç metre yer değiştirir?",
      en: "The velocity–time graph of a car moving along a straight road is shown. What is the car's displacement in metres between 0 and {t3} s?",
      de: "Das Geschwindigkeit-Zeit-Diagramm eines Autos auf einer geraden Straße ist abgebildet. Wie groß ist seine Verschiebung in Metern zwischen 0 und {t3} s?",
    },
    figure: (v, f) => {
      const s = f.svg(340, 210);
      s.add(f.graph({
        x: 50, y: 30, w: 240, h: 140, xmax: v.t3 + 1, ymax: v.v1 * 1.2,
        xticks: [v.t1, v.t2, v.t3], yticks: [v.v0, v.v1].filter((y) => y), fx: (x) => f.n(x), fy: (y) => f.n(y),
        xLabel: f.t(T.t), yLabel: f.t(T.v), pts: [[0, v.v0], [v.t1, v.v1], [v.t2, v.v1], [v.t3, 0]],
      }));
      return s;
    },
  });

  QB.add({
    id: "fiz-hareket-vt-ortalama",
    subject: "fizik",
    topic: "hareket",
    grade: 9,
    level: 3,
    vars: {
      v1: { values: [10, 20, 30] },
      v2: { values: [10, 20] },
      t1: { values: [2, 4, 6] },
      dt: { values: [2, 4] },
      t2: "t1 + dt",
      disp: "v1 * t1 - v2 * dt",
    },
    where: ["disp > 0", "disp % t2 == 0"],
    answer: "disp / t2",
    unit: "m/s",
    distractors: ["(v1 * t1 + v2 * dt) / t2", "(v1 - v2) / 2", "(v1 + v2) / 2", "disp / t1"],
    text: {
      tr: "Doğrusal bir yolda hareket eden bir aracın hız–zaman grafiği şekildeki gibidir. Aracın 0–{t2} s aralığındaki <b>ortalama hızının</b> büyüklüğü kaç m/s'dir?",
      en: "The velocity–time graph of a car moving along a straight road is shown. What is the magnitude of the car's <b>average velocity</b> between 0 and {t2} s in m/s?",
      de: "Das Geschwindigkeit-Zeit-Diagramm eines Autos auf einer geraden Straße ist abgebildet. Wie groß ist der Betrag seiner <b>Durchschnittsgeschwindigkeit</b> zwischen 0 und {t2} s in m/s?",
    },
    figure: (v, f) => {
      const s = f.svg(340, 230);
      s.add(f.graph({
        x: 50, y: 30, w: 240, h: 160, xmax: v.t2 + 1, ymin: -v.v2 * 1.4, ymax: v.v1 * 1.3,
        xticks: [v.t1, v.t2], yticks: [v.v1, -v.v2], fx: (x) => f.n(x), fy: (y) => f.n(y),
        xLabel: f.t(T.t), yLabel: f.t(T.v), pts: [[0, v.v1], [v.t1, v.v1], [v.t1, -v.v2], [v.t2, -v.v2]],
      }));
      return s;
    },
  });

  QB.add({
    id: "fiz-hareket-karsilasma",
    subject: "fizik",
    topic: "hareket",
    grade: 9,
    level: 2,
    vars: {
      vK: { values: [10, 15, 20, 25] },
      vL: { values: [5, 10, 15, 20] },
      t: { min: 2, max: 12 },
      d: "(vK + vL) * t",
    },
    answer: "t",
    unit: "s",
    distractors: ["d / vK", "d / vL", "2 * t", "d / (vK + vL) / 2"],
    text: {
      tr: "Aralarında {d} m uzaklık bulunan K ve L araçları, aynı anda birbirlerine doğru sırasıyla {vK} m/s ve {vL} m/s sabit hızlarla harekete başlıyor. Araçlar kaç saniye sonra karşılaşır?",
      en: "Cars K and L, {d} m apart, start moving towards each other at the same moment with constant speeds of {vK} m/s and {vL} m/s. After how many seconds do they meet?",
      de: "Die Autos K und L sind {d} m voneinander entfernt und fahren gleichzeitig mit den konstanten Geschwindigkeiten {vK} m/s und {vL} m/s aufeinander zu. Nach wie vielen Sekunden treffen sie sich?",
    },
    figure: (v, f) => twoCars(v, f, false),
  });

  QB.add({
    id: "fiz-hareket-yetisme",
    subject: "fizik",
    topic: "hareket",
    grade: 9,
    level: 3,
    vars: {
      vK: { values: [15, 20, 25, 30] },
      vL: { values: [5, 10, 15] },
      t: { min: 2, max: 10 },
      d: "(vK - vL) * t",
    },
    where: "vK > vL",
    answer: "vK * t",
    unit: "m",
    distractors: ["d", "vL * t", "(vK + vL) * t", "d + vL * t * 2"],
    text: {
      tr: "Doğrusal bir yolda aynı yönde sabit hızlarla giden K ve L araçlarının hızları sırasıyla {vK} m/s ve {vL} m/s'dir. Şekildeki anda K aracı, L aracının {d} m gerisindedir. K aracı L'ye yetişene kadar kaç metre yol alır?",
      en: "Cars K and L travel in the same direction along a straight road at constant speeds of {vK} m/s and {vL} m/s. At the moment shown, K is {d} m behind L. How many metres does K travel until it catches up with L?",
      de: "Die Autos K und L fahren auf einer geraden Straße in dieselbe Richtung mit den konstanten Geschwindigkeiten {vK} m/s und {vL} m/s. Im abgebildeten Moment ist K {d} m hinter L. Wie viele Meter legt K zurück, bis es L einholt?",
    },
    figure: (v, f) => twoCars(v, f, true),
  });

  // --- Kuvvet ve Newton yasaları --------------------------------------------------

  QB.add({
    id: "fiz-kuvvet-iki-blok",
    subject: "fizik",
    topic: "kuvvet",
    grade: 9,
    level: 3,
    vars: {
      m1: { min: 1, max: 6 },
      m2: { min: 1, max: 6 },
      a: { min: 1, max: 5 },
      F: "(m1 + m2) * a",
    },
    answer: "m2 * a",
    unit: "N",
    distractors: ["F", "m1 * a", "F / 2", "F - m1"],
    text: {
      tr: "Sürtünmesiz yatay düzlemdeki {m1} kg kütleli K ve {m2} kg kütleli L blokları, K'ye uygulanan {F} N'luk yatay kuvvetle şekildeki gibi birlikte itiliyor. K bloğunun L bloğuna uyguladığı kuvvet kaç N'dir?",
      en: "Blocks K ({m1} kg) and L ({m2} kg) on a frictionless horizontal surface are pushed together by a horizontal force of {F} N applied to K, as shown. What force does block K exert on block L in newtons?",
      de: "Die Klötze K ({m1} kg) und L ({m2} kg) auf einer reibungsfreien waagerechten Fläche werden wie abgebildet durch eine waagerechte Kraft von {F} N auf K gemeinsam geschoben. Welche Kraft in Newton übt K auf L aus?",
    },
    figure: (v, f) => {
      const s = f.svg(330, 120);
      const w1 = 40 + v.m1 * 8, w2 = 40 + v.m2 * 8, h = 50, y = 90, x1 = 110;
      s.add(
        f.ground(10, 320, y),
        f.box(x1, y - h, w1, h, "K"), f.box(x1 + w1, y - h, w2, h, "L"),
        f.text(x1 + w1 / 2, y - h - 12, f.$("m1") + " kg", { cls: "mut" }),
        f.text(x1 + w1 + w2 / 2, y - h - 12, f.$("m2") + " kg", { cls: "mut" }),
        f.arrow(30, y - h / 2, x1 - 2, y - h / 2, "acc"), f.text(60, y - h / 2 - 14, "F = " + f.$("F") + " N"),
      );
      return s;
    },
  });

  QB.add({
    id: "fiz-kuvvet-surtunme",
    subject: "fizik",
    topic: "kuvvet",
    grade: 9,
    level: 2,
    vars: {
      m: { values: [2, 4, 5, 10] },
      mu: { values: [0.1, 0.2, 0.25, 0.4, 0.5] },
      a: { min: 1, max: 6 },
      F: "m * a + mu * m * 10",
    },
    where: "F == round(F)",
    answer: "a",
    unit: "m/s²",
    distractors: ["F / m", "(F + mu * m * 10) / m", "mu * 10", "a + 2"],
    text: {
      tr: "Kütlesi {m} kg olan blok, yatay zeminde {F} N'luk yatay kuvvetle şekildeki gibi çekiliyor. Blok ile zemin arasındaki kinetik sürtünme katsayısı {mu} olduğuna göre bloğun ivmesi kaç m/s²'dir? (g = 10 m/s²)",
      en: "A {m} kg block is pulled along a horizontal floor by a horizontal force of {F} N, as shown. The coefficient of kinetic friction between the block and the floor is {mu}. What is the block's acceleration in m/s²? (g = 10 m/s²)",
      de: "Ein Klotz der Masse {m} kg wird wie abgebildet mit einer waagerechten Kraft von {F} N über einen waagerechten Boden gezogen. Die Gleitreibungszahl zwischen Klotz und Boden beträgt {mu}. Wie groß ist die Beschleunigung des Klotzes in m/s²? (g = 10 m/s²)",
    },
    figure: (v, f) => {
      const s = f.svg(330, 130);
      const y = 95, x = 120, w = 70, h = 46;
      s.add(
        f.ground(10, 320, y),
        f.box(x, y - h, w, h, f.$("m") + " kg"),
        f.arrow(x + w, y - h / 2, x + w + 80, y - h / 2, "acc"), f.text(x + w + 50, y - h / 2 - 14, "F = " + f.$("F") + " N"),
        f.arrow(x, y - 6, x - 50, y - 6), f.text(x - 30, y - 20, f.t({ tr: "f_s", en: "f_k", de: "F_R" })),
        f.text(320, y + 22, f.t({ tr: "k = ", en: "μ = ", de: "μ = " }) + f.$("mu"), { cls: "mut", a: "end" }),
      );
      return s;
    },
  });

  QB.add({
    id: "fiz-kuvvet-yargi",
    subject: "fizik",
    topic: "kuvvet",
    grade: 9,
    level: 3,
    vars: {
      m: { values: [2, 4, 5] },
      F1: { min: 10, max: 40, step: 5 },
      F2: { min: 5, max: 40, step: 5 },
      s2: { values: [0, 1] },
      s3: { values: [0, 1] },
      a: "abs(F1 - F2) / m",
    },
    where: ["F1 != F2", "abs(F1 - F2) % m == 0", "F1 % m == 0"],
    statements: [
      {
        text: {
          tr: "Cisim sağa doğru hızlanır.",
          en: "The object speeds up to the right.",
          de: "Der Körper wird nach rechts beschleunigt.",
        },
        truth: "F1 > F2",
      },
      {
        text: {
          tr: "Cismin ivmesinin büyüklüğü {=if(s2, a, a + 1)} m/s²'dir.",
          en: "The magnitude of the object's acceleration is {=if(s2, a, a + 1)} m/s².",
          de: "Der Betrag der Beschleunigung beträgt {=if(s2, a, a + 1)} m/s².",
        },
        truth: "s2",
      },
      {
        text: {
          tr: "F<sub>2</sub> kuvveti kaldırılırsa cismin ivmesinin büyüklüğü {=if(s3, F1 / m, (F1 + F2) / m)} m/s² olur.",
          en: "If force F<sub>2</sub> is removed, the magnitude of the acceleration becomes {=if(s3, F1 / m, (F1 + F2) / m)} m/s².",
          de: "Wird die Kraft F<sub>2</sub> entfernt, beträgt der Betrag der Beschleunigung {=if(s3, F1 / m, (F1 + F2) / m)} m/s².",
        },
        truth: "s3",
      },
    ],
    text: {
      tr: "Sürtünmesiz yatay düzlemde durmakta olan {m} kg kütleli cisme, şekildeki gibi zıt yönlü F<sub>1</sub> = {F1} N ve F<sub>2</sub> = {F2} N büyüklüğünde iki yatay kuvvet aynı anda uygulanıyor. Buna göre,",
      en: "Two opposite horizontal forces, F<sub>1</sub> = {F1} N and F<sub>2</sub> = {F2} N, are applied at the same moment to a {m} kg object at rest on a frictionless horizontal surface, as shown.",
      de: "Auf einen ruhenden Körper der Masse {m} kg auf einer reibungsfreien waagerechten Fläche wirken wie abgebildet gleichzeitig zwei entgegengesetzte waagerechte Kräfte F<sub>1</sub> = {F1} N und F<sub>2</sub> = {F2} N.",
    },
    figure: (v, f) => {
      const s = f.svg(330, 110);
      const y = 80, x = 130, w = 70, h = 44;
      s.add(
        f.ground(10, 320, y),
        f.box(x, y - h, w, h, f.$("m") + " kg"),
        f.arrow(x + w, y - h / 2, x + w + 70, y - h / 2, "acc"), f.text(x + w + 40, y - h / 2 - 14, "F_1 = " + f.$("F1") + " N"),
        f.arrow(x, y - h / 2, x - 70, y - h / 2, "acc"), f.text(x - 40, y - h / 2 - 14, "F_2 = " + f.$("F2") + " N"),
      );
      return s;
    },
  });

  // --- İş ve enerji ---------------------------------------------------------------

  QB.add({
    id: "fiz-enerji-serbest-dusme",
    subject: "fizik",
    topic: "enerji",
    grade: 9,
    level: 2,
    vars: {
      v: { values: [10, 20, 30, 40, 50, 60] },
      h: "v * v / 20",
    },
    answer: "v",
    unit: "m/s",
    distractors: ["2 * h", "h", "v / 2", "sqrt(10 * h)"],
    text: {
      tr: "Yerden {h} m yükseklikten serbest bırakılan bir cisim yere kaç m/s hızla çarpar? (Hava direnci önemsiz, g = 10 m/s²)",
      en: "An object is dropped from rest {h} m above the ground. At what speed in m/s does it hit the ground? (Air resistance is negligible, g = 10 m/s²)",
      de: "Ein Körper wird aus {h} m Höhe aus der Ruhe fallen gelassen. Mit welcher Geschwindigkeit in m/s trifft er auf den Boden? (Luftwiderstand vernachlässigbar, g = 10 m/s²)",
    },
  });

  QB.add({
    id: "fiz-enerji-verim",
    subject: "fizik",
    topic: "enerji",
    grade: 9,
    level: 2,
    vars: {
      m: { values: [20, 40, 50, 100] },
      h: { values: [5, 10, 12, 20] },
      t: { values: [5, 10, 20] },
      eta: { values: [50, 75, 80] },
      Pin: "m * 10 * h / t * 100 / eta",
    },
    where: "Pin == round(Pin)",
    answer: "Pin",
    unit: "W",
    distractors: ["m * 10 * h / t", "m * 10 * h / t * eta / 100", "m * 10 * h", "Pin * 2"],
    text: {
      tr: "Verimi %{eta} olan bir motor, {m} kg kütleli bir yükü {t} saniyede sabit hızla {h} m yükseğe çıkarıyor. Motorun harcadığı güç kaç W'tır? (g = 10 m/s²)",
      en: "A motor with an efficiency of {eta}% lifts a {m} kg load at constant speed through a height of {h} m in {t} seconds. How much power in watts does the motor consume? (g = 10 m/s²)",
      de: "Ein Motor mit einem Wirkungsgrad von {eta} % hebt eine Last von {m} kg in {t} Sekunden mit konstanter Geschwindigkeit {h} m hoch. Welche Leistung in Watt nimmt der Motor auf? (g = 10 m/s²)",
    },
  });

  QB.add({
    id: "fiz-enerji-ray-siralama",
    subject: "fizik",
    topic: "enerji",
    grade: 9,
    level: 3,
    vars: {
      hK: { values: [5, 6] },
      hL: { min: 0, max: 4 },
      hM: { min: 0, max: 4 },
      hN: { min: 0, max: 4 },
    },
    where: "!(hL == hM and hM == hN)",
    items: { L: "hK - hL", M: "hK - hM", N: "hK - hN" },
    symbol: "E",
    text: {
      tr: "Sürtünmesi önemsenmeyen bir rayın K noktasından serbest bırakılan cisim, L, M ve N noktalarından geçiyor. K, L, M, N noktalarının yerden yükseklikleri sırasıyla {hK} m, {hL} m, {hM} m ve {hN} m'dir. Cismin L, M, N noktalarındaki kinetik enerjileri E<sub>L</sub>, E<sub>M</sub>, E<sub>N</sub> arasındaki ilişki nedir?",
      en: "An object is released from rest at point K of a frictionless track and passes points L, M and N. The heights of K, L, M and N above the ground are {hK} m, {hL} m, {hM} m and {hN} m. How do its kinetic energies at L, M and N, E<sub>L</sub>, E<sub>M</sub>, E<sub>N</sub>, compare?",
      de: "Ein Körper wird im Punkt K einer reibungsfreien Bahn aus der Ruhe losgelassen und durchläuft die Punkte L, M und N. Die Höhen von K, L, M und N über dem Boden betragen {hK} m, {hL} m, {hM} m und {hN} m. Wie verhalten sich seine kinetischen Energien E<sub>L</sub>, E<sub>M</sub>, E<sub>N</sub> in L, M und N zueinander?",
    },
    figure: (v, f) => {
      const s = f.svg(360, 200);
      const base = 165, u = 22;
      const P = [["K", 30, v.hK], ["L", 115, v.hL], ["M", 200, v.hM], ["N", 285, v.hN]].map(([n, x, h]) => [n, x, base - h * u]);
      s.add(f.grid(20, base - 6 * u, 15, 6, u));
      s.add(f.curve([[10, base - v.hK * u - 6], ...P.map(([, x, y]) => [x, y]), [345, base - 2 * u]], "track"));
      for (const [n, x, y] of P) s.add(f.dot(x, y, 4), f.text(x, y - 14, n));
      s.add(f.line(10, base, 350, base), f.text(350, base + 14, "1 m", { cls: "mut", a: "end" }));
      return s;
    },
  });
})();
