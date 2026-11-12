// FİZİK · Elektrostatik, elektrik akımı, optik, dalgalar
// Tüm sorular ve şekiller bu proje için özgün olarak yazılmıştır.
// level: 1 = kolay, 2 = orta, 3 = zor.
(function () {
  "use strict";

  const ohm = (f, name, key) => `${name} = ${f.$(key)} Ω`;

  // Seri devre: R1 ve R2 üstte, üreteç altta
  function seriesCircuit(v, f) {
    const s = f.svg(320, 175);
    s.add(
      f.resistor(40, 40, 160, 40, ohm(f, "R_1", "R1")),
      f.resistor(160, 40, 280, 40, ohm(f, "R_2", "R2")),
      f.line(40, 40, 40, 140), f.line(280, 40, 280, 140),
      f.battery(40, 140, 280, 140, f.$("V") + " V"),
    );
    return s;
  }

  // R1 seri, (R2 ∥ R3); withSwitch → R3 kolunda açık S anahtarı
  function mixedCircuit(v, f, withSwitch) {
    const s = f.svg(340, 210);
    s.add(
      f.resistor(30, 40, 170, 40, ohm(f, "R_1", "R1")),
      f.resistor(170, 40, 290, 40, ohm(f, "R_2", "R2")),
      f.line(170, 40, 170, 110), f.line(290, 40, 290, 170), f.line(30, 40, 30, 170),
      f.dot(170, 40), f.dot(290, 110),
      f.battery(30, 170, 290, 170, f.$("V") + " V"),
    );
    if (withSwitch) {
      const state = withSwitch === "closed"
        ? f.t({ tr: "S (kapalı)", en: "S (closed)", de: "S (geschlossen)" })
        : f.t({ tr: "S (açık)", en: "S (open)", de: "S (offen)" });
      s.add(withSwitch === "closed" ? f.switchClosed(170, 110, 215, state) : f.switchOpen(170, 110, 215, state));
      s.add(f.resistor(215, 110, 290, 110, ohm(f, "R_3", "R3")));
    } else s.add(f.resistor(170, 110, 290, 110, ohm(f, "R_3", "R3")));
    return s;
  }

  // --- Elektrostatik ---------------------------------------------------------------

  QB.add({
    id: "fiz-elektrostatik-dokunma",
    subject: "fizik",
    topic: "elektrostatik",
    grade: 10,
    level: 2,
    vars: {
      qK: { min: -12, max: 20, step: 4 },
      qL: { min: -12, max: 20, step: 4 },
      qM: { min: -12, max: 20, step: 4 },
      q: "((qK + qL) / 2 + qM) / 2",
    },
    where: ["q == round(q)", "qK != qL"],
    answer: "q",
    unit: "μC",
    distractors: ["(qK + qL + qM) / 3", "(qK + qL) / 2", "qM", "(qL + qM) / 2"],
    text: {
      tr: "Özdeş K, L, M iletken kürelerinin yükleri sırasıyla {qK} μC, {qL} μC ve {qM} μC'dir. Önce K ile L birbirine dokundurulup ayrılıyor, ardından L ile M dokundurulup ayrılıyor. Son durumda M küresinin yükü kaç μC olur?",
      en: "Identical conducting spheres K, L and M carry charges of {qK} μC, {qL} μC and {qM} μC. First K and L are touched together and separated, then L and M are touched together and separated. What is the final charge on sphere M in μC?",
      de: "Die gleichen leitenden Kugeln K, L und M tragen die Ladungen {qK} μC, {qL} μC und {qM} μC. Zuerst werden K und L in Kontakt gebracht und getrennt, danach L und M. Welche Ladung in μC trägt die Kugel M am Ende?",
    },
    figure: (v, f) => {
      const s = f.svg(340, 150);
      const sign = (x) => (x > 0 ? "+" : "") + f.n(x);
      [["K", v.qK, 70], ["L", v.qL, 170], ["M", v.qM, 270]].forEach(([n, q, x]) => {
        s.add(f.line(x, 98, x, 132, "thin"), f.line(x - 18, 132, x + 18, 132),
          f.circle(x, 66, 30), f.text(x, 66, sign(q) + " μC", { size: 12 }), f.text(x, 22, n));
      });
      return s;
    },
  });

  // --- Elektrik akımı ----------------------------------------------------------------

  QB.add({
    id: "fiz-elektrik-paralel",
    subject: "fizik",
    topic: "elektrik",
    grade: 10,
    level: 2,
    vars: {
      V: { values: [12, 24, 36, 60] },
      R1: { values: [2, 3, 4, 6, 12] },
      R2: { values: [3, 4, 6, 12] },
    },
    where: ["V % R1 == 0", "V % R2 == 0", "R1 != R2"],
    answer: "V / R1 + V / R2",
    unit: "A",
    distractors: ["V / (R1 + R2)", "V / R1", "V / R2", "2 * V / (R1 + R2)"],
    text: {
      tr: "Şekildeki devrede R<sub>1</sub> = {R1} Ω ve R<sub>2</sub> = {R2} Ω'luk dirençler, gerilimi {V} V olan üretece paralel bağlanmıştır. Üreteçten çekilen akım kaç A'dir? (Üretecin iç direnci önemsizdir.)",
      en: "In the circuit shown, resistors R<sub>1</sub> = {R1} Ω and R<sub>2</sub> = {R2} Ω are connected in parallel to a {V} V source. What current in amperes is drawn from the source? (The internal resistance is negligible.)",
      de: "In der abgebildeten Schaltung sind die Widerstände R<sub>1</sub> = {R1} Ω und R<sub>2</sub> = {R2} Ω parallel an eine Spannungsquelle mit {V} V angeschlossen. Welcher Strom in Ampere wird der Quelle entnommen? (Der Innenwiderstand ist vernachlässigbar.)",
    },
    figure: (v, f) => {
      const s = f.svg(320, 200);
      s.add(
        f.resistor(40, 40, 280, 40, ohm(f, "R_1", "R1")),
        f.resistor(40, 100, 280, 100, ohm(f, "R_2", "R2")),
        f.line(40, 40, 40, 160), f.line(280, 40, 280, 160), f.dot(40, 100), f.dot(280, 100),
        f.battery(40, 160, 280, 160, f.$("V") + " V"),
      );
      return s;
    },
  });

  QB.add({
    id: "fiz-elektrik-karisik",
    subject: "fizik",
    topic: "elektrik",
    grade: 10,
    level: 3,
    vars: {
      s: { values: [1, 2, 3, 4, 5, 6, 7, 8] },
      R2: "pick(s, 3, 4, 6, 10, 12, 6, 20, 4)",
      R3: "pick(s, 6, 12, 12, 15, 12, 6, 30, 4)",
      Rp: "R2 * R3 / (R2 + R3)",
      R1: { min: 1, max: 10 },
      I: { values: [1, 2, 3] },
      V: "I * (R1 + Rp)",
    },
    answer: "I * Rp",
    unit: "V",
    distractors: ["V", "I * R1", "V / 2", "I * R3"],
    text: {
      tr: "Şekildeki devrede üretecin gerilimi {V} V; R<sub>1</sub> = {R1} Ω, R<sub>2</sub> = {R2} Ω ve R<sub>3</sub> = {R3} Ω'dur. R<sub>3</sub> direncinin uçları arasındaki potansiyel farkı kaç V'tur? (Üretecin iç direnci önemsizdir.)",
      en: "In the circuit shown, the source voltage is {V} V, R<sub>1</sub> = {R1} Ω, R<sub>2</sub> = {R2} Ω and R<sub>3</sub> = {R3} Ω. What is the potential difference across R<sub>3</sub> in volts? (The internal resistance is negligible.)",
      de: "In der abgebildeten Schaltung beträgt die Quellenspannung {V} V, R<sub>1</sub> = {R1} Ω, R<sub>2</sub> = {R2} Ω und R<sub>3</sub> = {R3} Ω. Wie groß ist die Spannung an R<sub>3</sub> in Volt? (Der Innenwiderstand ist vernachlässigbar.)",
    },
    figure: (v, f) => mixedCircuit(v, f, false),
  });

  QB.add({
    id: "fiz-elektrik-anahtar",
    subject: "fizik",
    topic: "elektrik",
    grade: 10,
    level: 3,
    vars: {
      R1: { min: 2, max: 10 },
      R2: { values: [4, 6, 8, 12] },
      R3: { values: [4, 6, 8, 12] },
      V: { values: [12, 24, 36] },
      closed: { values: [0, 1] },
      Iopen: "V / (R1 + R2)",
      Iclosed: "V / (R1 + R2 * R3 / (R2 + R3))",
      I2closed: "Iclosed * R3 / (R2 + R3)",
    },
    changes: [
      {
        label: { tr: "R<sub>1</sub>'in akımı", en: "Current in R<sub>1</sub>", de: "Strom in R<sub>1</sub>" },
        before: "if(closed, Iclosed, Iopen)",
        after: "if(closed, Iopen, Iclosed)",
      },
      {
        label: { tr: "R<sub>2</sub>'nin akımı", en: "Current in R<sub>2</sub>", de: "Strom in R<sub>2</sub>" },
        before: "if(closed, I2closed, Iopen)",
        after: "if(closed, Iopen, I2closed)",
      },
    ],
    text: {
      tr: "Şekildeki devrede S anahtarı diğer konumuna getirilirse (açıksa kapatılır, kapalıysa açılırsa) R<sub>1</sub> ve R<sub>2</sub> dirençlerinden geçen akımlar nasıl değişir? (Üretecin iç direnci önemsizdir.)",
      en: "In the circuit shown, switch S is moved to its other position (closed if it is open, opened if it is closed). How do the currents through R<sub>1</sub> and R<sub>2</sub> change? (The internal resistance is negligible.)",
      de: "In der abgebildeten Schaltung wird der Schalter S umgelegt (geschlossen, wenn er offen ist, und geöffnet, wenn er geschlossen ist). Wie ändern sich die Ströme durch R<sub>1</sub> und R<sub>2</sub>? (Der Innenwiderstand ist vernachlässigbar.)",
    },
    figure: (v, f) => mixedCircuit(v, f, v.closed ? "closed" : "open"),
  });

  QB.add({
    id: "fiz-elektrik-seri-yargi",
    subject: "fizik",
    topic: "elektrik",
    grade: 10,
    level: 3,
    vars: {
      I: { values: [1, 2, 3] },
      R1: { min: 2, max: 10 },
      R2: { min: 2, max: 10 },
      V: "I * (R1 + R2)",
      s2: { values: [0, 1] },
      s3: { values: [0, 1] },
    },
    where: "R1 != R2",
    statements: [
      {
        text: {
          tr: "R<sub>1</sub>'in uçları arasındaki potansiyel farkı, R<sub>2</sub>'ninkinden büyüktür.",
          en: "The potential difference across R<sub>1</sub> is greater than that across R<sub>2</sub>.",
          de: "Die Spannung an R<sub>1</sub> ist größer als die an R<sub>2</sub>.",
        },
        truth: "R1 > R2",
      },
      {
        text: {
          tr: "Devreden geçen akım {=if(s2, I, V / R1):2} A'dir.",
          en: "The current in the circuit is {=if(s2, I, V / R1):2} A.",
          de: "Die Stromstärke im Stromkreis beträgt {=if(s2, I, V / R1):2} A.",
        },
        truth: "s2",
      },
      {
        text: {
          tr: "R<sub>2</sub>'de harcanan elektriksel güç {=if(s3, I * I * R2, I * I * R1)} W'tır.",
          en: "The electrical power dissipated in R<sub>2</sub> is {=if(s3, I * I * R2, I * I * R1)} W.",
          de: "Die in R<sub>2</sub> umgesetzte elektrische Leistung beträgt {=if(s3, I * I * R2, I * I * R1)} W.",
        },
        truth: "s3",
      },
    ],
    text: {
      tr: "R<sub>1</sub> = {R1} Ω ve R<sub>2</sub> = {R2} Ω'luk dirençler, gerilimi {V} V olan üretece şekildeki gibi seri bağlanmıştır. Buna göre,",
      en: "Resistors R<sub>1</sub> = {R1} Ω and R<sub>2</sub> = {R2} Ω are connected in series to a {V} V source, as shown.",
      de: "Die Widerstände R<sub>1</sub> = {R1} Ω und R<sub>2</sub> = {R2} Ω sind wie abgebildet in Reihe an eine Spannungsquelle mit {V} V angeschlossen.",
    },
    figure: seriesCircuit,
  });

  QB.add({
    id: "fiz-elektrik-tel-siralama",
    subject: "fizik",
    topic: "elektrik",
    grade: 10,
    level: 2,
    vars: {
      lK: { values: [1, 2, 3, 4] },
      lL: { values: [1, 2, 3, 4] },
      lM: { values: [1, 2, 3, 4] },
      sK: { values: [1, 2, 4] },
      sL: { values: [1, 2, 4] },
      sM: { values: [1, 2, 4] },
    },
    where: ["!(lK/sK == lL/sL and lL/sL == lM/sM)", "!(sK == sL and sL == sM)"],
    items: { K: "lK / sK", L: "lL / sL", M: "lM / sM" },
    symbol: "R",
    text: {
      tr: "Aynı maddeden yapılmış K, L, M tellerinin boyları sırasıyla {lK} m, {lL} m ve {lM} m; kesit alanları ise {sK} mm², {sL} mm² ve {sM} mm²'dir. Tellerin dirençleri R<sub>K</sub>, R<sub>L</sub>, R<sub>M</sub> arasındaki ilişki nedir?",
      en: "Wires K, L and M are made of the same material. Their lengths are {lK} m, {lL} m and {lM} m, and their cross-sectional areas are {sK} mm², {sL} mm² and {sM} mm². How do their resistances R<sub>K</sub>, R<sub>L</sub>, R<sub>M</sub> compare?",
      de: "Die Drähte K, L und M bestehen aus demselben Material. Ihre Längen betragen {lK} m, {lL} m und {lM} m, ihre Querschnittsflächen {sK} mm², {sL} mm² und {sM} mm². Wie verhalten sich ihre Widerstände R<sub>K</sub>, R<sub>L</sub>, R<sub>M</sub> zueinander?",
    },
    figure: (v, f) => {
      const s = f.svg(340, 150);
      [["K", v.lK, v.sK, 35], ["L", v.lL, v.sL, 80], ["M", v.lM, v.sM, 125]].forEach(([n, l, a, y]) => {
        const h = a * 4;
        s.add(f.text(20, y, n), f.rect(40, y - h / 2, l * 55, h, "wire", h / 2),
          f.text(50 + l * 55, y, `${f.n(l)} m · ${f.n(a)} mm²`, { cls: "mut", a: "start" }));
      });
      return s;
    },
  });

  QB.add({
    id: "fiz-elektrik-kwh",
    subject: "fizik",
    topic: "elektrik",
    grade: 10,
    level: 1,
    vars: {
      P: { values: [500, 1000, 1500, 2000, 2500] },
      t: { values: [1, 2, 3, 4] },
      n: { values: [10, 20, 30] },
    },
    answer: "P * t * n / 1000",
    unit: "kWh",
    distractors: ["P * t / 1000", "P * n / 1000", "P * t * n / 100", "P * t * n / 1000 * 2"],
    text: {
      tr: "Gücü {P} W olan bir elektrikli cihaz her gün {t} saat çalıştırılıyor. Cihaz {n} günde kaç kWh elektrik enerjisi harcar?",
      en: "An electrical appliance rated at {P} W runs for {t} hours every day. How many kWh of electrical energy does it use in {n} days?",
      de: "Ein Elektrogerät mit einer Leistung von {P} W läuft jeden Tag {t} Stunden. Wie viele kWh elektrische Energie verbraucht es in {n} Tagen?",
    },
  });

  // --- Optik -------------------------------------------------------------------------

  QB.add({
    id: "fiz-optik-golge",
    subject: "fizik",
    topic: "optik",
    grade: 10,
    level: 3,
    vars: {
      x: { values: [20, 30, 40, 50] },
      k: { values: [2, 3, 4] },
      y: "k * x",
      D: { values: [4, 6, 8, 10] },
    },
    answer: "D * k",
    unit: "cm",
    distractors: ["D * (k - 1)", "D * k * k", "D / k", "D * (k + 1)"],
    text: {
      tr: "Noktasal bir ışık kaynağından {x} cm uzakta, {D} cm çaplı opak bir disk bulunuyor. Disk, kaynaktan {y} cm uzaktaki perdeye paralel tutulmaktadır. Perdede oluşan tam gölgenin çapı kaç cm'dir?",
      en: "An opaque disc {D} cm in diameter is {x} cm from a point light source and is held parallel to a screen {y} cm from the source. What is the diameter of the shadow on the screen in cm?",
      de: "Eine undurchsichtige Scheibe mit {D} cm Durchmesser befindet sich {x} cm von einer punktförmigen Lichtquelle entfernt und wird parallel zu einem Schirm gehalten, der {y} cm von der Quelle entfernt ist. Welchen Durchmesser in cm hat der Schatten auf dem Schirm?",
    },
    figure: (v, f) => {
      const s = f.svg(370, 250);
      const x0 = 24, ym = 110, px = 316 / v.y, py = 2;
      const xd = x0 + v.x * px, xs = x0 + v.y * px;
      const hd = v.D * py, hs = v.D * v.k * py;
      s.add(
        f.dashed(x0, ym, xs, ym - hs), f.dashed(x0, ym, xs, ym + hs),
        f.line(xs, 20, xs, 200, "screen"), f.line(xs, ym - hs, xs, ym + hs, "shadow"),
        f.line(xd, ym - hd, xd, ym + hd, "opaque"),
        f.circle(x0, ym, 6, "lamp"),
        f.text(x0, ym - 18, f.t({ tr: "kaynak", en: "source", de: "Quelle" }), { cls: "mut" }),
        f.text(xs - 6, 14, f.t({ tr: "perde", en: "screen", de: "Schirm" }), { cls: "mut", a: "end" }),
        f.dimH(x0, xd, 206, f.$("x") + " cm", true),
        f.dimH(x0, xs, 230, f.$("y") + " cm", true),
      );
      return s;
    },
  });

  QB.add({
    id: "fiz-optik-ayna",
    subject: "fizik",
    topic: "optik",
    grade: 10,
    level: 2,
    vars: {
      x: { values: [6, 8, 10, 12] },
      v: { values: [0.5, 1, 1.5, 2] },
      t: { values: [2, 3, 4] },
      d: "2 * (x - v * t)",
    },
    where: "x - v * t >= 1",
    answer: "d",
    unit: "m",
    distractors: ["x - v * t", "2 * x", "2 * x - v * t", "2 * (x + v * t)"],
    text: {
      tr: "Düz bir aynadan {x} m uzakta duran bir öğrenci, aynaya doğru {v} m/s sabit hızla yürümeye başlıyor. {t} saniye sonra öğrenci ile aynadaki görüntüsü arasındaki uzaklık kaç m olur?",
      en: "A student standing {x} m from a plane mirror starts walking towards it at a constant {v} m/s. After {t} seconds, how far apart in metres are the student and their image?",
      de: "Eine Schülerin steht {x} m vor einem ebenen Spiegel und geht mit konstant {v} m/s auf ihn zu. Wie weit in Metern sind sie und ihr Spiegelbild nach {t} Sekunden voneinander entfernt?",
    },
    figure: (v, f) => {
      const s = f.svg(340, 150);
      const xm = 170, k = 12, px = xm - v.x * k, ix = xm + v.x * k;
      const person = (x, cls) => f.circle(x, 44, 7, cls === "dash" ? "ghost" : "obj") + f.line(x, 51, x, 82, cls) +
        f.line(x - 12, 62, x + 12, 62, cls) + f.line(x, 82, x - 9, 108, cls) + f.line(x, 82, x + 9, 108, cls);
      s.add(f.line(xm, 20, xm, 118, "mirror"));
      for (let y = 24; y <= 116; y += 10) s.add(f.line(xm + 1, y, xm + 8, y - 6, "thin"));
      s.add(person(px, "ln"), person(ix, "dash"), f.arrow(px + 10, 30, px + 46, 30, "acc"), f.text(px + 28, 18, f.$("v") + " m/s", { cls: "mut" }));
      s.add(f.dimH(px, xm, 130, f.$("x") + " m", true));
      return s;
    },
  });

  // --- Dalgalar ------------------------------------------------------------------------

  QB.add({
    id: "fiz-dalga-yay",
    subject: "fizik",
    topic: "dalga",
    grade: 10,
    level: 2,
    vars: {
      n: { values: [2, 4, 6] },
      c: { values: [2, 5, 10] },
      fr: { values: [2, 4, 5, 10] },
    },
    answer: "n * c * fr",
    unit: "cm/s",
    distractors: ["n * c / fr", "2 * n * c * fr", "n * c * fr / 2", "c * fr"],
    text: {
      tr: "Bir yayda oluşturulan periyodik dalganın belirli bir andaki görünümü şekildeki gibidir. Kare kenarı {c} cm ve dalga kaynağının frekansı {fr} Hz olduğuna göre dalganın yayılma hızı kaç cm/s'dir?",
      en: "The shape of a periodic wave on a spring at one instant is shown. Each grid square is {c} cm wide and the source frequency is {fr} Hz. What is the wave speed in cm/s?",
      de: "Die Form einer periodischen Welle auf einer Feder zu einem Zeitpunkt ist abgebildet. Eine Kästchenseite ist {c} cm lang und die Frequenz der Quelle beträgt {fr} Hz. Wie groß ist die Ausbreitungsgeschwindigkeit in cm/s?",
    },
    figure: (v, f) => {
      const s = f.svg(320, 170);
      const cell = 20, x = 20, y = 20, ymid = y + 3 * cell;
      s.add(f.grid(x, y, 14, 6, cell), f.line(x, ymid, x + 14 * cell, ymid, "thin"));
      s.add(f.wave(x, ymid, v.n * cell, 2 * cell, 2 * v.n * cell));
      s.add(f.text(x, y + 6 * cell + 18, f.t({ tr: "1 kare = ", en: "1 square = ", de: "1 Kästchen = " }) + f.$("c") + " cm", { cls: "mut", a: "start" }));
      return s;
    },
  });

  QB.add({
    id: "fiz-dalga-yanki",
    subject: "fizik",
    topic: "dalga",
    grade: 10,
    level: 1,
    vars: {
      t: { min: 0.5, max: 4, step: 0.5 },
    },
    answer: "340 * t / 2",
    unit: "m",
    distractors: ["340 * t", "340 / t", "85 * t", "340 * t / 4"],
    text: {
      tr: "Bir öğrenci bir kayalığa doğru bağırdıktan {t} saniye sonra sesinin yankısını duyuyor. Öğrenci ile kayalık arasındaki uzaklık kaç m'dir? (Sesin havadaki hızı 340 m/s'dir.)",
      en: "A student shouts towards a cliff and hears the echo {t} seconds later. How far is the student from the cliff in metres? (Speed of sound in air: 340 m/s)",
      de: "Eine Schülerin ruft gegen eine Felswand und hört das Echo nach {t} Sekunden. Wie weit in Metern ist sie von der Felswand entfernt? (Schallgeschwindigkeit in Luft: 340 m/s)",
    },
  });
})();
