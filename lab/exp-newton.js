// Deney 6 – Newton'un II. yasası: hava rayı, kızak, iki ışık kapısı, asılı kütle
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const TR0 = 5, TR1 = 155;     // ray uçları (cm)
  const RY = 30;                // ray üst yüzeyi
  const TABLE = 36;             // masa üst yüzeyi
  const FLOOR = 124;            // asılı kütlenin çarptığı zemin
  const GL = 20;                // kızak boyu (cm)
  const FLAG = 10;              // bayrağın etkin uzunluğu (cm)
  const PULLEY = { x: 158, y: RY - 1.2, r: 1.8 };

  const text = {
    tr: {
      kicker: "Deney 6",
      title: "Newton'un II. yasası (hava rayı)",
      short: "Hava rayındaki kızağı asılı bir kütleyle çek, iki ışık kapısıyla hızları ve ivmeyi ölç; F = m·a'yı sına.",
      tools: "Hava rayı · kızak · iki ışık kapısı · sayaç · kütleler",
      aim: "Newton'un ikinci yasasını sınamak: ivmenin kuvvetle doğru, kütleyle ters orantılı olduğunu göstermek.",
      theory: `<p>Hava rayında kızak ince bir hava yastığı üzerinde kayar; sürtünme çok küçüktür. Kızağa bağlı ip bir makaradan geçip m_a kütlesini taşır. Sistemin tamamı (kızak m + asılı kütle m_a) aynı ivmeyle hareket eder:</p>
<p class="eq">F_a = m_a · g = (m + m_a) · a</p>
<p>Bayrağın etkin uzunluğu L olmak üzere, kızağın ışık kapısından geçiş süresi t ise kapıdaki hız yaklaşık υ = L / t'dir (geçiş sırasındaki ortalama hız). İki kapıdaki hızlar υ₁ = L/t₁ ve υ₂ = L/t₂'dir. Sayaç PULSE konumunda, bayrağın birinci kapıya girişinden ikinci kapıya girişine kadar geçen t₃ süresini ölçer. υ₁ ve υ₂ geçişlerin ortalarındaki hızlar olduğundan, aradaki süre t₃ + (t₂ − t₁)/2 alınır:</p>
<p class="eq">a = (υ₂ − υ₁) / (t₃ + (t₂ − t₁)/2)</p>
<p>Toplam kütle sabit tutulup m_a değiştirilirse a–F_a grafiği eğimi 1/(m + m_a) olan bir doğrudur. m_a sabit tutulup kızağın kütlesi değiştirilirse a–1/(m + m_a) grafiği eğimi F_a olan bir doğrudur. Makaranın eylemsizliği ve havanın küçük direnci ivmeyi biraz azaltır.</p>`,
      steps: {
        p1: [
          "Hava pompasını aç. Asılı kütleyi çıkar ve ayar vidasıyla rayı yatay yap: bıraktığında kızak iki yöne de kendi kendine ivmelenmemeli.",
          "Asılı kütleyi tak. Kızağa 10 g'lık kütleler ekle; bunları sonra askıya aktaracaksın (toplam kütle değişmez). <b>Yeni satır</b> ile kütleleri tabloya yaz.",
          "Sayacı GATE konumuna al, RESET'e bas, kızağı başlangıç konumundan bırak ve t₁, t₂'yi tabloya yaz.",
          "Kızağı geri getir, sayacı PULSE konumuna al, RESET'e bas, yeniden bırak ve t₃'ü tabloya yaz.",
          "Kızaktan askıya 10 g aktararak m_a'nın beş farklı değeri için tekrarla. a–F_a grafiğini incele.",
        ],
        p2: [
          "Asılı kütleyi sabit tut. Kızağa çift çift kütle ekleyerek ya da çıkararak m'yi değiştir.",
          "Her kütle için GATE ve PULSE ölçümlerini yap ve tabloya yaz.",
          "a–1/(m + m_a) grafiğinin eğimini asılı kütlenin ağırlığıyla karşılaştır.",
        ],
      },
      p1: "Kuvvet değişiyor",
      p2: "Kütle değişiyor",
      air: "Hava pompası",
      airOn: "Hava açık",
      level: "Ayar vidası (rayın eğimi)",
      masses: "Kütleler",
      glider: "Kızak: m = {m} g",
      hang: "Asılı: m_a = {m} g",
      gAdd: "Kızağa +20 g", gRem: "Kızaktan −20 g",
      hAdd: "Askıya +5 g", hRem: "Askıdan −5 g", hOff: "Askıyı çıkar",
      move: "10 g: kızak → askı", moveBack: "10 g: askı → kızak",
      gates: "Işık kapıları",
      gate1: "1. kapının yeri", gate2: "2. kapının yeri",
      timer: "Sayaç",
      mode: "Mod",
      reset: "RESET",
      start: "Başlangıca getir",
      release: "Bırak",
      newRow: "Yeni satır (kütleler)",
      noAir: "Hava kapalıyken kızak raya sürtünür ve hareket etmez.",
      held: "Kızak başlangıç konumunda tutuluyor.",
      noData: "Sayaçta henüz ölçüm yok.",
      tableA: "Toplam kütle sabit",
      tableB: "Asılı kütle sabit",
      gA: "a = f(F_a)",
      gB: "a = f(1 / (m + m_a))",
      resM: "Toplam kütle 1/eğim",
      resMtrue: "Tartılan toplam kütle (son satır)",
      resF: "Etkin çekme kuvveti (eğim)",
      resFtrue: "m_a · g (son satır)",
      resRow: "Satır {n}: a / (F_a / (m + m_a))",
    },
    en: {
      kicker: "Experiment 6",
      title: "Newton's second law (air track)",
      short: "Pull a glider on an air track with a hanging mass, measure speeds and acceleration with two light gates and test F = m·a.",
      tools: "Air track · glider · two light gates · timer · masses",
      aim: "To test Newton's second law: to show that the acceleration is proportional to the force and inversely proportional to the mass.",
      theory: `<p>On an air track the glider rides on a thin cushion of air, so friction is very small. A string from the glider runs over a pulley and carries the mass m_a. The whole system (glider m plus hanging mass m_a) moves with the same acceleration:</p>
<p class="eq">F_a = m_a · g = (m + m_a) · a</p>
<p>If the effective length of the flag is L and the glider takes a time t to pass a light gate, its speed there is about υ = L / t (the mean speed during the passage). At the two gates υ₁ = L/t₁ and υ₂ = L/t₂. In PULSE mode the timer measures the time t₃ from the flag entering the first gate to it entering the second. As υ₁ and υ₂ belong to the middles of the passages, the time between them is t₃ + (t₂ − t₁)/2:</p>
<p class="eq">a = (υ₂ − υ₁) / (t₃ + (t₂ − t₁)/2)</p>
<p>Keeping the total mass constant and changing m_a, the a–F_a graph is a straight line of slope 1/(m + m_a). Keeping m_a constant and changing the glider mass, the a–1/(m + m_a) graph is a straight line of slope F_a. The inertia of the pulley and the slight air drag reduce the acceleration a little.</p>`,
      steps: {
        p1: [
          "Switch on the air. Remove the hanging mass and level the track with the adjusting screw: released, the glider should not accelerate in either direction.",
          "Attach the hanging mass. Put 10 g masses on the glider; you will move them to the hanger later (the total mass stays the same). Write the masses to the table with <b>New row</b>.",
          "Set the timer to GATE, press RESET, release the glider from the start position and write t₁, t₂ to the table.",
          "Bring the glider back, set the timer to PULSE, press RESET, release again and write t₃ to the table.",
          "Move 10 g from the glider to the hanger and repeat for five values of m_a. Study the a–F_a graph.",
        ],
        p2: [
          "Keep the hanging mass constant. Change m by adding or removing masses on the glider in pairs.",
          "For each mass make the GATE and PULSE measurements and write them to the table.",
          "Compare the slope of the a–1/(m + m_a) graph with the weight of the hanging mass.",
        ],
      },
      p1: "Changing force",
      p2: "Changing mass",
      air: "Air supply",
      airOn: "Air on",
      level: "Adjusting screw (track slope)",
      masses: "Masses",
      glider: "Glider: m = {m} g",
      hang: "Hanging: m_a = {m} g",
      gAdd: "Glider +20 g", gRem: "Glider −20 g",
      hAdd: "Hanger +5 g", hRem: "Hanger −5 g", hOff: "Remove hanger",
      move: "10 g: glider → hanger", moveBack: "10 g: hanger → glider",
      gates: "Light gates",
      gate1: "Position of gate 1", gate2: "Position of gate 2",
      timer: "Timer",
      mode: "Mode",
      reset: "RESET",
      start: "Back to start",
      release: "Release",
      newRow: "New row (masses)",
      noAir: "With the air off the glider rubs on the track and does not move.",
      held: "The glider is held at the start position.",
      noData: "The timer has no measurement yet.",
      tableA: "Total mass constant",
      tableB: "Hanging mass constant",
      gA: "a = f(F_a)",
      gB: "a = f(1 / (m + m_a))",
      resM: "Total mass 1/slope",
      resMtrue: "Weighed total mass (last row)",
      resF: "Effective pulling force (slope)",
      resFtrue: "m_a · g (last row)",
      resRow: "Row {n}: a / (F_a / (m + m_a))",
    },
    de: {
      kicker: "Versuch 6",
      title: "Zweites newtonsches Gesetz (Luftkissenbahn)",
      short: "Ziehe einen Gleiter auf der Luftkissenbahn mit einer hängenden Masse, miss Geschwindigkeiten und Beschleunigung mit zwei Lichtschranken und prüfe F = m·a.",
      tools: "Luftkissenbahn · Gleiter · zwei Lichtschranken · Zähler · Massen",
      aim: "Das zweite newtonsche Gesetz prüfen: Die Beschleunigung ist proportional zur Kraft und umgekehrt proportional zur Masse.",
      theory: `<p>Auf der Luftkissenbahn gleitet der Gleiter auf einem dünnen Luftpolster; die Reibung ist sehr klein. Ein Faden vom Gleiter läuft über eine Rolle und trägt die Masse m_a. Das ganze System (Gleiter m plus Hängemasse m_a) bewegt sich mit derselben Beschleunigung:</p>
<p class="eq">F_a = m_a · g = (m + m_a) · a</p>
<p>Ist L die wirksame Fahnenlänge und t die Durchgangszeit an einer Lichtschranke, so ist die Geschwindigkeit dort etwa υ = L / t (mittlere Geschwindigkeit beim Durchgang). An den beiden Schranken gilt υ₁ = L/t₁ und υ₂ = L/t₂. Im Modus PULSE misst der Zähler die Zeit t₃ vom Eintritt der Fahne in die erste bis zum Eintritt in die zweite Schranke. Da υ₁ und υ₂ zu den Mitten der Durchgänge gehören, liegt zwischen ihnen die Zeit t₃ + (t₂ − t₁)/2:</p>
<p class="eq">a = (υ₂ − υ₁) / (t₃ + (t₂ − t₁)/2)</p>
<p>Bei konstanter Gesamtmasse und veränderlichem m_a ist das a–F_a-Diagramm eine Gerade mit Steigung 1/(m + m_a). Bei konstantem m_a und veränderlicher Gleitermasse ist das a–1/(m + m_a)-Diagramm eine Gerade mit Steigung F_a. Trägheit der Rolle und der kleine Luftwiderstand verringern die Beschleunigung etwas.</p>`,
      steps: {
        p1: [
          "Schalte die Luft ein. Nimm die Hängemasse ab und richte die Bahn mit der Stellschraube waagerecht aus: Losgelassen darf der Gleiter in keine Richtung beschleunigen.",
          "Hänge die Hängemasse an. Lege 10-g-Massen auf den Gleiter; sie werden später an den Halter umgehängt (die Gesamtmasse bleibt gleich). Mit <b>Neue Zeile</b> die Massen eintragen.",
          "Zähler auf GATE, RESET drücken, Gleiter an der Startposition loslassen und t₁, t₂ eintragen.",
          "Gleiter zurückholen, Zähler auf PULSE, RESET, erneut loslassen und t₃ eintragen.",
          "10 g vom Gleiter an den Halter umhängen und für fünf Werte von m_a wiederholen. Das a–F_a-Diagramm untersuchen.",
        ],
        p2: [
          "Halte die Hängemasse konstant. Ändere m, indem du paarweise Massen auf den Gleiter legst oder abnimmst.",
          "Für jede Masse GATE- und PULSE-Messung durchführen und eintragen.",
          "Vergleiche die Steigung des a–1/(m + m_a)-Diagramms mit der Gewichtskraft der Hängemasse.",
        ],
      },
      p1: "Kraft verändert",
      p2: "Masse verändert",
      air: "Gebläse",
      airOn: "Luft an",
      level: "Stellschraube (Neigung der Bahn)",
      masses: "Massen",
      glider: "Gleiter: m = {m} g",
      hang: "Hängend: m_a = {m} g",
      gAdd: "Gleiter +20 g", gRem: "Gleiter −20 g",
      hAdd: "Halter +5 g", hRem: "Halter −5 g", hOff: "Halter abnehmen",
      move: "10 g: Gleiter → Halter", moveBack: "10 g: Halter → Gleiter",
      gates: "Lichtschranken",
      gate1: "Lage der Schranke 1", gate2: "Lage der Schranke 2",
      timer: "Zähler",
      mode: "Modus",
      reset: "RESET",
      start: "Zur Startposition",
      release: "Loslassen",
      newRow: "Neue Zeile (Massen)",
      noAir: "Ohne Luft reibt der Gleiter auf der Bahn und bewegt sich nicht.",
      held: "Der Gleiter wird an der Startposition gehalten.",
      noData: "Der Zähler hat noch keine Messung.",
      tableA: "Gesamtmasse konstant",
      tableB: "Hängemasse konstant",
      gA: "a = f(F_a)",
      gB: "a = f(1 / (m + m_a))",
      resM: "Gesamtmasse 1/Steigung",
      resMtrue: "Gewogene Gesamtmasse (letzte Zeile)",
      resF: "Wirksame Zugkraft (Steigung)",
      resFtrue: "m_a · g (letzte Zeile)",
      resRow: "Zeile {n}: a / (F_a / (m + m_a))",
    },
  };

  const gN = 9.81;
  const Lm = FLAG / 100;
  const acc = (r) => {
    if (!(r.t1 > 0 && r.t2 > 0 && r.t3 > 0)) return null;
    return (Lm / r.t2 - Lm / r.t1) / (r.t3 + (r.t2 - r.t1) / 2);
  };
  const cols = () => [
    { key: "m", label: "m (g)", input: true },
    { key: "ma", label: "m_a (g)", input: true },
    { key: "t1", label: "t₁ (s)", input: true },
    { key: "t2", label: "t₂ (s)", input: true },
    { key: "t3", label: "t₃ (s)", input: true },
    { key: "v1", label: "υ₁ (m/s)", calc: (r) => (r.t1 > 0 ? Lm / r.t1 : null), digits: 3 },
    { key: "v2", label: "υ₂ (m/s)", calc: (r) => (r.t2 > 0 ? Lm / r.t2 : null), digits: 3 },
    { key: "a", label: "a (m/s²)", calc: acc, digits: 3 },
    { key: "F", label: "F_a (N)", calc: (r) => (r.ma != null ? (r.ma / 1000) * gN : null), digits: 4 },
    { key: "inv", label: "1/(m+m_a) (1/kg)", calc: (r) => (r.m != null && r.ma != null ? 1000 / (r.m + r.ma) : null), digits: 3 },
  ];
  function rowChecks(c, tid) {
    const tb = c.table(tid);
    const out = [];
    tb.rows.forEach((r, i) => {
      const a = acc(r);
      if (a == null || r.m == null || r.ma == null) return;
      const th = ((r.ma / 1000) * gN) / ((r.m + r.ma) / 1000);
      out.push({ label: c.t("resRow", { n: i + 1 }), value: a / th, digits: 3, ref: 1, refText: "1" });
    });
    return out;
  }
  const lastRow = (tb) => tb.rows.slice().reverse().find((r) => r.m != null && r.ma != null);

  const def = {
    id: "newton",
    order: 60,
    text,
    parts: [
      {
        id: "p1", title: "p1",
        tables: [{ id: "A", title: () => QBL.tx(def, "tableA"), columns: cols(), minRows: 0 }],
        graphs: [{ id: "gA", title: () => QBL.tx(def, "gA"), x: { key: "F", label: "F_a (N)" }, y: { key: "a", label: "a (m/s²)" }, series: [{ table: "A", name: "" }], fit: "line", fits: ["line", "prop"], zeroX: true, zeroY: true, slopeUnit: "1/kg" }],
        results(c) {
          const out = [];
          const f = c.fit("gA");
          if (f) out.push({ label: c.t("resM"), value: 1000 / f.a, err: (1000 * f.sa) / f.a ** 2, unit: "g" });
          const r = lastRow(c.table("A"));
          if (r) out.push({ label: c.t("resMtrue"), value: r.m + r.ma, unit: "g", digits: 0 });
          return out.concat(rowChecks(c, "A"));
        },
      },
      {
        id: "p2", title: "p2",
        tables: [{ id: "B", title: () => QBL.tx(def, "tableB"), columns: cols(), minRows: 0 }],
        graphs: [{ id: "gB", title: () => QBL.tx(def, "gB"), x: { key: "inv", label: "1/(m + m_a) (1/kg)" }, y: { key: "a", label: "a (m/s²)" }, series: [{ table: "B", name: "" }], fit: "prop", fits: ["prop", "line"], zeroX: true, zeroY: true, slopeUnit: "N" }],
        results(c) {
          const out = [];
          const f = c.fit("gB");
          if (f) out.push({ label: c.t("resF"), value: f.a, err: f.sa, unit: "N" });
          const r = lastRow(c.table("B"));
          if (r) out.push({ label: c.t("resFtrue"), value: (r.ma / 1000) * gN, unit: "N", digits: 4 });
          return out.concat(rowChecks(c, "B"));
        },
      },
    ],

    mount(api) {
      const { C, t, mem } = api;
      const tilt0 = QBL.between(api.rng, -0.004, 0.004);     // rayın başlangıç eğimi (rad)
      const drag = QBL.between(api.rng, 0.0008, 0.002);       // hava direnci (N·s/m)
      const Ip = 0.0018;                                      // makara eylemsizliği / r² (kg)
      const st = {
        air: mem.air ?? false, level: mem.level ?? 0,
        mg: mem.mg ?? 240, mh: mem.mh ?? 15,                  // kızak (g), asılı (g; 0 = askı yok)
        g1: mem.g1 ?? 60, g2: mem.g2 ?? 110,
        x: 22, v: 0, held: true, x0: 22,
        mode: mem.mode || "GATE",
        tm: { t: 0, gates: [{ in: null, out: null }, { in: null, out: null }], t1: null, t2: null, t3: null },
        landed: false,
      };
      const save = () => Object.assign(mem, { air: st.air, level: st.level, mg: st.mg, mh: st.mh, g1: st.g1, g2: st.g2, mode: st.mode });
      const tilt = () => tilt0 + st.level * 0.0008;            // vida turu başına 0,0008 rad
      // asılı kütlenin zemine uzaklığı: ip boyu sabit; kızak x arttıkça kütle iner
      const STR = 130;                                         // ip boyu (cm)
      const hangY = () => PULLEY.y + (STR - (PULLEY.x - (st.x + GL / 2)));

      function resetTimer() { st.tm = { t: 0, gates: [{ in: null, out: null }, { in: null, out: null }], t1: null, t2: null, t3: null }; showTimer(); }
      function step(dt) {
        if (!st.air || st.held) { st.v = 0; return; }
        const n = Math.max(1, Math.ceil(dt / 0.0004));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          const m = st.mg / 1000, ma = st.mh / 1000;
          const pulling = ma > 0 && hangY() < FLOOR - 1;
          const M = m + (pulling ? ma + Ip : 0);
          let F = -m * G * Math.sin(tilt()) - drag * st.v;
          if (pulling) F += ma * G;
          st.v += (F / M) * h;
          st.x += st.v * 100 * h;
          st.tm.t += h;
          // ışık kapıları: bayrağın ön kenarı (x + FLAG/2) / arka kenarı
          [st.g1, st.g2].forEach((gx, k) => {
            const blocked = Math.abs(st.x - gx) < FLAG / 2;
            const gs = st.tm.gates[k];
            if (blocked && gs.in == null) gs.in = st.tm.t;
            if (!blocked && gs.in != null && gs.out == null) gs.out = st.tm.t;
          });
          // tampon
          if (st.x > TR1 - GL / 2 - 1) { st.x = TR1 - GL / 2 - 1; st.v = -0.55 * Math.abs(st.v); }
          if (st.x < TR0 + GL / 2 + 1) { st.x = TR0 + GL / 2 + 1; st.v = 0.55 * Math.abs(st.v); }
        }
        const [a, b] = st.tm.gates;
        const q = (v) => (v == null ? null : Math.round(v * 1e4) / 1e4);
        if (a.in != null && a.out != null) st.tm.t1 = q(a.out - a.in);
        if (b.in != null && b.out != null) st.tm.t2 = q(b.out - b.in);
        if (a.in != null && b.in != null) st.tm.t3 = q(b.in - a.in);
        showTimer();
      }

      function draw(c, S) {
        D.wall(c, S);
        // zemin, masa
        c.fillStyle = S.colors.dark ? "#2a2f36" : "#c9ced4";
        c.fillRect(S.view.x0, FLOOR + 1, S.view.x1 - S.view.x0, S.view.y1 - FLOOR);
        D.bench(c, S, -12, 157, TABLE, 3, 0, false);
        c.fillStyle = "#6b4a2e";
        c.fillRect(-2, TABLE + 3, 2.4, FLOOR + 1 - TABLE - 3);
        c.fillRect(150, TABLE + 3, 2.4, FLOOR + 1 - TABLE - 3);
        // ray ayakları ve ayar vidası
        c.fillStyle = D.metal(c, 0, RY, 0, TABLE, "dark");
        c.fillRect(TR0 + 4, RY + 3, 2, TABLE - RY - 3);
        c.fillRect(TR1 - 6, RY + 3, 2, TABLE - RY - 3);
        D.knob(c, TR0 + 5, TABLE - 1.0, 1.0, st.level * 0.8);
        // ray (eğimi abartmadan çiz)
        c.fillStyle = D.metal(c, 0, RY, 0, RY + 3, "alu");
        c.beginPath();
        c.moveTo(TR0, RY + 3); c.lineTo(TR0 + 1, RY); c.lineTo(TR1 - 1, RY); c.lineTo(TR1, RY + 3);
        c.closePath();
        c.fill();
        c.fillStyle = "rgba(0,0,0,0.25)";
        for (let x = TR0 + 3; x < TR1 - 2; x += 2.5) { c.beginPath(); c.arc(x, RY + 0.35, 0.12, 0, Math.PI * 2); c.fill(); }
        // ölçek (ray kenarında)
        D.ruler(c, { x: TR0 + 2, y: RY + 3, len: 146, dir: "h", side: "top", w: 1.4, px: S.px, every: 10, fontSize: 0.7 });
        // hava hortumu
        c.strokeStyle = "#2b2f35";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(TR0, RY + 1.5);
        c.bezierCurveTo(-4, RY + 2, -6, TABLE - 6, -3, TABLE - 3);
        c.stroke();
        c.fillStyle = st.air ? "#2e7d32" : "#555";
        D.rr(c, -11, TABLE - 7, 9, 7, 0.6);
        c.fill();
        D.led(c, -6.5, TABLE - 5.2, 0.45, st.air, "#7CFC00");
        // ışık kapısı direkleri (rayın arkasında)
        [st.g1, st.g2].forEach((gx) => { D.rodV(c, gx + 1.6, RY - 9, TABLE, 0.7, "dark"); c.fillStyle = "#2b3138"; c.fillRect(gx - 1.1, RY - 9.6, 3.2, 0.9); });
        // makara ve ip
        D.pulley(c, PULLEY.x, PULLEY.y, PULLEY.r, -st.x / PULLEY.r);
        c.fillStyle = "#30353b";
        c.fillRect(PULLEY.x - 0.3, PULLEY.y, 0.6, TABLE - PULLEY.y);
        const hy = Math.min(hangY(), FLOOR - 1);
        if (st.mh > 0) {
          D.string(c, [[st.x + GL / 2, PULLEY.y - PULLEY.r], [PULLEY.x, PULLEY.y - PULLEY.r], [PULLEY.x + PULLEY.r, PULLEY.y], [PULLEY.x + PULLEY.r, hy]], S.colors.string, 0.08);
          const masses = [];
          for (let k = 0; k < Math.round((st.mh - 5) / 5); k++) masses.push({ h: 0.45, tone: "brass" });
          D.hanger(c, PULLEY.x + PULLEY.r, hy + 0.9, { len: Math.max(3, masses.length * 0.45 + 1), w: 2.2, plate: 0.3, masses, px: S.px });
        }
        // kızak
        const x = st.x;
        c.fillStyle = D.metal(c, 0, RY - 3, 0, RY, "alu");
        c.beginPath();
        c.moveTo(x - GL / 2, RY); c.lineTo(x - GL / 2 + 1, RY - 2.6); c.lineTo(x + GL / 2 - 1, RY - 2.6); c.lineTo(x + GL / 2, RY);
        c.closePath();
        c.fill();
        c.strokeStyle = "rgba(0,0,0,0.35)";
        c.lineWidth = S.px;
        c.stroke();
        // ek kütleler
        const extra = Math.round((st.mg - 200) / 20);
        for (let k = 0; k < extra; k++) {
          const side = k % 2 ? 1 : -1, row = Math.floor(k / 2);
          c.fillStyle = D.metal(c, 0, RY - 4, 0, RY - 2, "steel");
          c.fillRect(x + side * (5 + row * 1.0) - 0.45, RY - 4.4, 0.9, 1.8);
        }
        // bayrak
        c.fillStyle = "#1f2328";
        c.fillRect(x - FLAG / 2, RY - 6.5, FLAG, 3.9);
        // ışık kapıları (önden görünen alıcı başlığı; ışın bayrağın ortasından geçer)
        [st.g1, st.g2].forEach((gx) => {
          const blocked = Math.abs(st.x - gx) < FLAG / 2;
          c.fillStyle = "#2b3138";
          D.rr(c, gx - 1.1, RY - 9.5, 2.2, 3.2, 0.3);
          c.fill();
          c.fillRect(gx - 0.35, RY - 6.6, 0.7, 1.4);
          D.led(c, gx, RY - 8.6, 0.32, blocked, "#ff3b2f");
          c.fillStyle = blocked ? "rgba(255,60,40,0.35)" : "rgba(255,60,40,0.95)";
          c.beginPath();
          c.arc(gx, RY - 4.6, 0.28, 0, Math.PI * 2);
          c.fill();
        });
        if (st.held) { c.fillStyle = "rgba(214,160,120,0.9)"; D.rr(c, x - GL / 2 - 3.2, RY - 4, 3, 3, 1); c.fill(); }
        // sayaç kutusu
        const disp = st.mode === "GATE" ? (st.tm.t2 != null ? st.tm.t2 : st.tm.t1 ?? 0) : st.tm.t3 ?? 0;
        D.counter(c, 58, 4, 28, 12, disp.toFixed(4), { cells: 6, unit: "s", label: "TIMER  " + st.mode, body: "#1f5fa8" });
      }

      const stage = api.stage({
        world: [-12, 0, 168, 128], maxH: 620, lensZoom: 4, label: t("title"), draw, step,
        pointer: {
          down(p) {
            if (Math.abs(p.x - st.x) < GL / 2 && p.y > RY - 7 && p.y < RY + 1) { st.held = true; st.dragX = p.x - st.x; return true; }
            return false;
          },
          move(p) { if (st.held && st.dragX != null) st.x = QBL.clamp(p.x - st.dragX, TR0 + GL / 2 + 1, Math.min(st.g1 - FLAG / 2 - 0.5, TR1 - GL / 2 - 1)); },
          up() { st.dragX = null; },
          cursor: (p) => (Math.abs(p.x - st.x) < GL / 2 && p.y > RY - 7 && p.y < RY + 1 ? "grab" : ""),
        },
      });

      // --- denetimler
      const lt1 = C.lcd({ label: "t₁", cells: 6, unit: "s" }), lt2 = C.lcd({ label: "t₂", cells: 6, unit: "s" }), lt3 = C.lcd({ label: "t₃", cells: 6, unit: "s" });
      function showTimer() {
        const f = (v) => (v == null ? "0.0000" : v.toFixed(4));
        lt1.set(f(st.tm.t1)); lt2.set(f(st.tm.t2)); lt3.set(f(st.tm.t3));
        lt1.el.hidden = lt2.el.hidden = st.mode !== "GATE";
        lt3.el.hidden = st.mode !== "PULSE";
      }
      const mLbl = api.el("p", { class: "lab-note" }), hLbl = api.el("p", { class: "lab-note" });
      const showM = () => { mLbl.textContent = t("glider", { m: st.mg }); hLbl.textContent = t("hang", { m: st.mh }); save(); };
      const airChk = C.check({ label: t("airOn"), value: st.air, onChange(v) { st.air = v; save(); if (!v) st.v = 0; } });
      const lvl = C.slider({ label: t("level"), min: -8, max: 8, step: 0.05, value: st.level, show: false, fine: [-0.05, 0.05], fineLabel: () => "", onInput(v) { st.level = v; save(); } });
      const g1 = C.slider({ label: t("gate1"), min: 45, max: 95, step: 1, value: st.g1, digits: 0, unit: "cm", onInput(v) { st.g1 = v; save(); } });
      const g2 = C.slider({ label: t("gate2"), min: 80, max: 105, step: 1, value: st.g2, digits: 0, unit: "cm", onInput(v) { st.g2 = Math.max(v, st.g1 + 15); save(); } });
      const modeSeg = C.segment({ label: t("mode"), value: st.mode, options: [{ value: "GATE", label: "GATE" }, { value: "PULSE", label: "PULSE" }], onChange(v) { st.mode = v; save(); showTimer(); } });
      function release() {
        if (!st.air) { api.status(t("noAir"), "bad"); return; }
        st.held = false; st.dragX = null;
      }
      function toStart() { st.held = true; st.x = st.x0; st.v = 0; }
      function record() {
        const tb = api.table(api.part === "p1" ? "A" : "B");
        if (st.mode === "GATE") {
          if (st.tm.t1 == null || st.tm.t2 == null) { api.status(t("noData"), "bad"); return; }
          if (tb.active < 0 || !tb.rows[tb.active]) tb.addRow({ m: st.mg, ma: st.mh }, { m: String(st.mg), ma: String(st.mh) });
          tb.set(tb.active, { t1: st.tm.t1, t2: st.tm.t2 }, { t1: st.tm.t1.toFixed(4), t2: st.tm.t2.toFixed(4) });
        } else {
          if (st.tm.t3 == null) { api.status(t("noData"), "bad"); return; }
          if (tb.active < 0 || !tb.rows[tb.active]) tb.addRow({ m: st.mg, ma: st.mh }, { m: String(st.mg), ma: String(st.mh) });
          tb.set(tb.active, { t3: st.tm.t3 }, { t3: st.tm.t3.toFixed(4) });
        }
        api.status(api.tg("labRecorded"), "ok");
      }
      const setG = (m) => { st.mg = QBL.clamp(m, 200, 320); showM(); };
      const setH = (m) => { st.mh = QBL.clamp(m, 0, 60); if (st.mh > 0 && st.mh < 5) st.mh = 5; showM(); };
      api.panel.append(
        C.group(t("air"), airChk.el, lvl.el),
        C.group(t("masses"), mLbl, hLbl,
          C.buttons([{ label: t("gRem"), onClick: () => setG(st.mg - 20) }, { label: t("gAdd"), onClick: () => setG(st.mg + 20) }]),
          C.buttons([{ label: t("hRem"), onClick: () => setH(st.mh - 5) }, { label: t("hAdd"), onClick: () => setH(st.mh === 0 ? 5 : st.mh + 5) }, { label: t("hOff"), onClick: () => setH(0) }]),
          C.buttons([{ label: t("move"), onClick: () => { if (st.mg - 10 >= 200 && st.mh > 0) { st.mg -= 10; st.mh += 10; showM(); } } }, { label: t("moveBack"), onClick: () => { if (st.mh - 10 >= 5) { st.mg += 10; st.mh -= 10; showM(); } } }])),
        C.group(t("gates"), g1.el, g2.el),
        C.group(t("timer"), modeSeg.el, lt1.el, lt2.el, lt3.el,
          C.buttons([{ label: t("reset"), onClick: resetTimer }, { label: t("start"), onClick: toStart }, { label: t("release"), primary: true, onClick: release }]),
          C.buttons([{ label: api.tg("labRecord"), onClick: record }, { label: t("newRow"), onClick: () => { api.table(api.part === "p1" ? "A" : "B").addRow({ m: st.mg, ma: st.mh }, { m: String(st.mg), ma: String(st.mh) }); } }])));
      showM();
      showTimer();
      return {};
    },

    selfTest() {
      // ideal (sürtünmesiz) kızak: kapılardan geçiş süreleri ve a hesabı
      const m = 0.24, ma = 0.02, a = (ma * G) / (m + ma), x1 = 0.4, x2 = 0.9, L = FLAG / 100;
      const tAt = (x) => Math.sqrt((2 * x) / a);
      const r = { t1: tAt(x1 + L / 2) - tAt(x1 - L / 2), t2: tAt(x2 + L / 2) - tAt(x2 - L / 2), t3: tAt(x2 - L / 2) - tAt(x1 - L / 2) };
      return [{ name: "a (kapılardan)", value: acc(r), expected: a, tol: 0.002 }];
    },
  };
  QBL.register(def);
})();
