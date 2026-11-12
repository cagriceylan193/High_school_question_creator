// Deney 9 – Çarpışmalar: hava masası, diskler, kıvılcım (nokta) zamanlayıcısı, cetvel ve iletki
(function () {
  "use strict";
  const D = QBL.D;
  const HALF = 34;        // masanın yarı genişliği (cm)
  const PAPER = 30;       // kâğıdın yarı genişliği
  const TYPES = {
    heavy: { m: 538, r: 5.0, tone: "dark" },
    light: { m: 207, r: 4.4, tone: "alu" },
    mag: { m: 240, r: 4.6, tone: "mag" },
  };
  const SCN = {
    s1: { d: ["heavy", "heavy"], mode: "elastic", pos: [[-22, 0], [0, 0]], v: [[34, 0], null], T: 60 },
    s2: { d: ["heavy", "light"], mode: "elastic", pos: [[-22, 0], [0, 0]], v: [[34, 0], null], T: 60 },
    s3: { d: ["heavy", "light"], mode: "elastic", pos: [[-22, -5], [0, 0]], v: [[34, 7], null], T: 60 },
    s4: { d: ["heavy", "heavy"], mode: "sticky", pos: [[-22, 0], [22, 0]], v: [[26, 0], [-22, 0]], T: 60 },
    s5: { d: ["mag", "mag"], mode: "magnetic", pos: [[-22, -16], [22, 16]], v: [[22, 15], [-22, -15]], T: 100 },
    s6: { d: ["mag", "mag"], mode: "magnetic", pos: [[-24, -7], [0, 0]], v: [[24, 0], null], T: 100, fixed: 1 },
  };
  const PARTS = Object.keys(SCN);

  const text = {
    tr: {
      kicker: "Deney 9",
      title: "Çarpışmalar (hava masası)",
      short: "Hava masasında diskleri çarpıştır; kıvılcım zamanlayıcısının noktalarından hızları ölç, momentumu ve kinetik enerjiyi karşılaştır.",
      tools: "Hava masası · diskler · nokta zamanlayıcısı · cetvel · iletki",
      aim: "Çeşitli çarpışma türlerinde momentumun ve kinetik enerjinin korunumunu incelemek.",
      theory: `<p>Dış kuvvet etkisinde olmayan iki cismin çarpışmasında toplam momentum korunur (vektörel olarak):</p>
<p class="eq">M₁·V⃗₁ + M₂·V⃗₂ = M₁·U⃗₁ + M₂·U⃗₂</p>
<p>Kinetik enerji de korunuyorsa çarpışma <b>esnektir</b>; korunmuyorsa <b>esnek olmayan</b> çarpışmadır. Cisimler çarpıştıktan sonra yapışıp birlikte hareket ederse çarpışma <b>tamamen esnek olmayan</b> çarpışmadır; ortak hız V = (M₁V⃗₁ + M₂V⃗₂)/(M₁ + M₂) olur ve kinetik enerji her zaman azalır. Eşit kütleli diskler için önceki noktalar arasındaki uzaklık, sonraki noktalar arasındaki uzaklığın iki katıdır.</p>
<p>Hava masasında diskler hava yastığı üzerinde kayar; sürtünme çok küçüktür. Nokta zamanlayıcısı her T sürede (60 ms ya da 100 ms) disklerin merkezinin altındaki kâğıda bir kıvılcım noktası bırakır. n aralıklık d uzaklığından hız υ = d / (n·T) bulunur; hareketin yönü kâğıdın x eksenine göre θ açısıyla ölçülür. Momentum bileşenleri:</p>
<p class="eq">pₓ = m·υ·cos θ      p_y = m·υ·sin θ      K = ½·m·υ²</p>
<p>Mıknatıslı diskler birbirine değmeden iter; bu yüzden enerji kaybı çok azdır ve çarpışma neredeyse tam esnektir.</p>`,
      steps: {
        _: [
          "Çarpışma türünü sekmelerden seç. Fırlatılacak diskin üzerinden istediğin yöne sürükleyerek hız okunu ayarla (ok ne kadar uzunsa hız o kadar büyük).",
          "<b>Fırlat</b>: zamanlayıcı pedalı kendiliğinden basılır ve kâğıda noktalar düşer. Gerekirse <b>Diskleri yerine koy</b> ile tekrar dene.",
          "<b>Kâğıt</b> görünümüne geç. Cetveli bir izdeki bir noktadan aynı izde birkaç aralık ilerideki noktaya sürükle: uzunluk d ve kâğıdın x eksenine göre açı θ okunur.",
          "Tabloda ilgili satırı (ör. Disk 1 – önce) seç ve <b>Seçili satıra yaz</b>. Ölçtüğün aralık sayısını n sütununa kendin yaz.",
          "Dört satırı da doldur. Sonuçlarda toplam momentumu ve kinetik enerjiyi çarpışmadan önce ve sonra karşılaştır.",
        ],
      },
      s1: "1 · Eşit kütle, kafa kafaya",
      s2: "2 · Farklı kütle, kafa kafaya",
      s3: "3 · Farklı kütle, açılı",
      s4: "4 · Yapışkan, ikisi hareketli",
      s5: "5 · Mıknatıslı, ikisi hareketli",
      s6: "6 · Mıknatıslı, biri sabit",
      view: "Görünüm",
      viewTable: "Hava masası",
      viewPaper: "Kâğıt",
      timer: "Nokta zamanlayıcısı",
      period: "Periyot T",
      launch: "Fırlat",
      reset: "Diskleri yerine koy",
      arrowNote: "Hız okunu ayarlamak için diskin üzerinden sürükle.",
      ruler: "Cetvel ve iletki",
      reading: "d = {d} cm   θ = {a}°",
      noReading: "Kâğıtta bir noktadan başlayıp başka bir noktaya sürükle.",
      write: "Seçili satıra yaz",
      noRow: "Önce tabloda bir satır seç.",
      running: "Diskler kayıyor; zamanlayıcı çalışıyor…",
      doneRun: "Kayıt bitti: kâğıtta {n} nokta var. Ölçüm için Kâğıt görünümüne geç.",
      fixedNote: "Bu çarpışmada ikinci disk masanın ortasına sabitlenmiştir.",
      rowB1: "Disk 1 – önce", rowB2: "Disk 2 – önce", rowA1: "Disk 1 – sonra", rowA2: "Disk 2 – sonra",
      colRow: "Disk",
      gP: "Momentum vektörleri",
      pNote: "Mavi: çarpışmadan önceki toplam momentum, kırmızı: sonraki. İnce oklar disklerin momentumlarıdır.",
      resPb: "Toplam momentum önce |P|",
      resPa: "Toplam momentum sonra |P′|",
      resAng: "Momentumun yön farkı",
      resPr: "|P′| / |P|",
      resK: "Kinetik enerji önce / sonra",
      resKr: "K′ / K",
      resKval: "{a} mJ → {b} mJ",
    },
    en: {
      kicker: "Experiment 9",
      title: "Collisions (air table)",
      short: "Make pucks collide on an air table; measure the speeds from the spark-timer dots and compare momentum and kinetic energy.",
      tools: "Air table · pucks · spark timer · ruler · protractor",
      aim: "To study the conservation of momentum and kinetic energy in various kinds of collisions.",
      theory: `<p>When two bodies collide without external forces, the total momentum is conserved (as a vector):</p>
<p class="eq">M₁·V⃗₁ + M₂·V⃗₂ = M₁·U⃗₁ + M₂·U⃗₂</p>
<p>If kinetic energy is also conserved the collision is <b>elastic</b>; otherwise it is <b>inelastic</b>. If the bodies stick together and move on as one, the collision is <b>completely inelastic</b>: the common velocity is V = (M₁V⃗₁ + M₂V⃗₂)/(M₁ + M₂) and kinetic energy always decreases. For equal masses the dot spacing before is twice the spacing after.</p>
<p>On the air table the pucks glide on an air cushion with very little friction. Every T (60 ms or 100 ms) the spark timer leaves a dot on the paper under each puck's centre. From the distance d spanning n intervals the speed is υ = d / (n·T); the direction is the angle θ to the x axis of the paper. The momentum components are</p>
<p class="eq">pₓ = m·υ·cos θ      p_y = m·υ·sin θ      K = ½·m·υ²</p>
<p>Magnetic pucks repel without touching, so very little energy is lost and the collision is almost perfectly elastic.</p>`,
      steps: {
        _: [
          "Choose the kind of collision in the tabs. Drag from a puck that will be launched in the direction you want to set its velocity arrow (a longer arrow means a higher speed).",
          "<b>Launch</b>: the timer pedal is pressed automatically and dots fall on the paper. If needed, try again with <b>Reset pucks</b>.",
          "Switch to the <b>Paper</b> view. Drag the ruler from a dot on one track to a dot a few intervals further on the same track: the length d and the angle θ to the paper's x axis are read.",
          "Select the matching row in the table (e.g. Puck 1 – before) and press <b>Write to selected row</b>. Type the number of intervals n yourself.",
          "Fill in all four rows. In the results compare total momentum and kinetic energy before and after the collision.",
        ],
      },
      s1: "1 · Equal masses, head-on",
      s2: "2 · Different masses, head-on",
      s3: "3 · Different masses, at an angle",
      s4: "4 · Sticky, both moving",
      s5: "5 · Magnetic, both moving",
      s6: "6 · Magnetic, one fixed",
      view: "View",
      viewTable: "Air table",
      viewPaper: "Paper",
      timer: "Spark timer",
      period: "Period T",
      launch: "Launch",
      reset: "Reset pucks",
      arrowNote: "Drag from a puck to set its velocity arrow.",
      ruler: "Ruler and protractor",
      reading: "d = {d} cm   θ = {a}°",
      noReading: "Drag on the paper from one dot to another.",
      write: "Write to selected row",
      noRow: "Select a row in the table first.",
      running: "The pucks are moving; the timer is running…",
      doneRun: "Recording finished: {n} dots on the paper. Switch to the Paper view to measure.",
      fixedNote: "In this collision the second puck is fixed in the middle of the table.",
      rowB1: "Puck 1 – before", rowB2: "Puck 2 – before", rowA1: "Puck 1 – after", rowA2: "Puck 2 – after",
      colRow: "Puck",
      gP: "Momentum vectors",
      pNote: "Blue: total momentum before the collision, red: after. Thin arrows are the momenta of the pucks.",
      resPb: "Total momentum before |P|",
      resPa: "Total momentum after |P′|",
      resAng: "Change in direction of the momentum",
      resPr: "|P′| / |P|",
      resK: "Kinetic energy before / after",
      resKr: "K′ / K",
      resKval: "{a} mJ → {b} mJ",
    },
    de: {
      kicker: "Versuch 9",
      title: "Stöße (Lufttisch)",
      short: "Lass Gleitscheiben auf dem Lufttisch stoßen; miss die Geschwindigkeiten aus den Funkenpunkten und vergleiche Impuls und kinetische Energie.",
      tools: "Lufttisch · Gleitscheiben · Funkenzeitgeber · Lineal · Winkelmesser",
      aim: "Die Erhaltung von Impuls und kinetischer Energie bei verschiedenen Stoßarten untersuchen.",
      theory: `<p>Stoßen zwei Körper ohne äußere Kräfte zusammen, bleibt der Gesamtimpuls (vektoriell) erhalten:</p>
<p class="eq">M₁·V⃗₁ + M₂·V⃗₂ = M₁·U⃗₁ + M₂·U⃗₂</p>
<p>Bleibt auch die kinetische Energie erhalten, ist der Stoß <b>elastisch</b>, sonst <b>unelastisch</b>. Haften die Körper nach dem Stoß aneinander, ist er <b>vollständig unelastisch</b>: Die gemeinsame Geschwindigkeit ist V = (M₁V⃗₁ + M₂V⃗₂)/(M₁ + M₂), die kinetische Energie nimmt immer ab. Bei gleichen Massen ist der Punktabstand vorher doppelt so groß wie nachher.</p>
<p>Auf dem Lufttisch gleiten die Scheiben auf einem Luftpolster nahezu reibungsfrei. Alle T (60 ms oder 100 ms) setzt der Funkenzeitgeber unter jedem Scheibenmittelpunkt einen Punkt aufs Papier. Aus der Strecke d über n Intervalle folgt υ = d / (n·T); die Richtung ist der Winkel θ zur x-Achse des Papiers. Die Impulskomponenten sind</p>
<p class="eq">pₓ = m·υ·cos θ      p_y = m·υ·sin θ      K = ½·m·υ²</p>
<p>Magnetische Scheiben stoßen sich ohne Berührung ab; der Energieverlust ist sehr klein, der Stoß fast vollständig elastisch.</p>`,
      steps: {
        _: [
          "Wähle die Stoßart über die Reiter. Ziehe von einer abzuschießenden Scheibe in die gewünschte Richtung, um ihren Geschwindigkeitspfeil einzustellen (längerer Pfeil = größere Geschwindigkeit).",
          "<b>Abschießen</b>: Das Pedal des Zeitgebers wird automatisch gedrückt, Punkte fallen aufs Papier. Bei Bedarf mit <b>Scheiben zurücksetzen</b> wiederholen.",
          "Zur Ansicht <b>Papier</b> wechseln. Das Lineal von einem Punkt einer Spur zu einem einige Intervalle entfernten Punkt derselben Spur ziehen: Länge d und Winkel θ zur x-Achse des Papiers werden abgelesen.",
          "Die passende Tabellenzeile wählen (z. B. Scheibe 1 – vorher) und <b>In gewählte Zeile</b> drücken. Die Zahl der Intervalle n selbst eintragen.",
          "Alle vier Zeilen ausfüllen. In den Ergebnissen Gesamtimpuls und kinetische Energie vor und nach dem Stoß vergleichen.",
        ],
      },
      s1: "1 · Gleiche Massen, zentral",
      s2: "2 · Verschiedene Massen, zentral",
      s3: "3 · Verschiedene Massen, schräg",
      s4: "4 · Haftend, beide bewegt",
      s5: "5 · Magnetisch, beide bewegt",
      s6: "6 · Magnetisch, eine fest",
      view: "Ansicht",
      viewTable: "Lufttisch",
      viewPaper: "Papier",
      timer: "Funkenzeitgeber",
      period: "Periode T",
      launch: "Abschießen",
      reset: "Scheiben zurücksetzen",
      arrowNote: "Von einer Scheibe ziehen, um ihren Geschwindigkeitspfeil einzustellen.",
      ruler: "Lineal und Winkelmesser",
      reading: "d = {d} cm   θ = {a}°",
      noReading: "Auf dem Papier von einem Punkt zu einem anderen ziehen.",
      write: "In gewählte Zeile",
      noRow: "Wähle zuerst eine Tabellenzeile.",
      running: "Die Scheiben gleiten; der Zeitgeber läuft …",
      doneRun: "Aufzeichnung beendet: {n} Punkte auf dem Papier. Zum Messen in die Ansicht Papier wechseln.",
      fixedNote: "Bei diesem Stoß ist die zweite Scheibe in der Tischmitte befestigt.",
      rowB1: "Scheibe 1 – vorher", rowB2: "Scheibe 2 – vorher", rowA1: "Scheibe 1 – nachher", rowA2: "Scheibe 2 – nachher",
      colRow: "Scheibe",
      gP: "Impulsvektoren",
      pNote: "Blau: Gesamtimpuls vor dem Stoß, rot: danach. Dünne Pfeile sind die Impulse der Scheiben.",
      resPb: "Gesamtimpuls vorher |P|",
      resPa: "Gesamtimpuls nachher |P′|",
      resAng: "Richtungsänderung des Impulses",
      resPr: "|P′| / |P|",
      resK: "Kinetische Energie vorher / nachher",
      resKr: "K′ / K",
      resKval: "{a} mJ → {b} mJ",
    },
  };

  const ROWS = ["rowB1", "rowB2", "rowA1", "rowA2"];
  const vel = (r) => (r.d > 0 && r.n > 0 && r.T > 0 ? r.d / (r.n * (r.T / 1000)) : null);
  const cols = () => [
    { key: "lab", label: () => QBL.tx(def, "colRow"), fixed: true, text: true },
    { key: "m", label: "m (g)", fixed: true },
    { key: "T", label: "T (ms)", input: true },
    { key: "d", label: "d (cm)", input: true },
    { key: "n", label: "n", input: true, w: 3 },
    { key: "th", label: "θ (°)", input: true },
    { key: "v", label: "υ (cm/s)", calc: vel, digits: 1 },
    { key: "px", label: "pₓ (kg·m/s)", calc: (r) => { const v = vel(r); return v == null || r.th == null ? null : (r.m / 1000) * (v / 100) * Math.cos((r.th * Math.PI) / 180); }, digits: 4 },
    { key: "py", label: "p_y (kg·m/s)", calc: (r) => { const v = vel(r); return v == null || r.th == null ? null : (r.m / 1000) * (v / 100) * Math.sin((r.th * Math.PI) / 180); }, digits: 4 },
    { key: "K", label: "K (mJ)", calc: (r) => { const v = vel(r); return v == null ? null : 0.5 * (r.m / 1000) * (v / 100) ** 2 * 1000; }, digits: 2 },
  ];
  const tableFor = (p) => ({
    id: "T" + p,
    columns: cols(),
    rows: ROWS.map((k, i) => ({ lab: null, k, i, m: TYPES[SCN[p].d[i % 2]].m, $m: String(TYPES[SCN[p].d[i % 2]].m), T: SCN[p].T, $T: String(SCN[p].T) })),
    fixedRows: true,
  });
  function sums(tb) {
    const s = { b: [0, 0, 0, 0], a: [0, 0, 0, 0] }; // px, py, K, adet
    tb.rows.forEach((r, i) => {
      const px = tb.get(r, "px"), py = tb.get(r, "py"), K = tb.get(r, "K");
      if (px == null || py == null) return;
      const k = i < 2 ? "b" : "a";
      s[k][0] += px; s[k][1] += py; s[k][2] += K; s[k][3]++;
    });
    return s;
  }
  function results(p) {
    return (c) => {
      const tb = c.table("T" + p);
      const s = sums(tb);
      const out = [];
      const need = SCN[p].fixed ? 1 : 2;
      const okB = s.b[3] >= (SCN[p].v[1] ? 2 : 1), okA = s.a[3] >= need;
      if (okB) out.push({ label: c.t("resPb"), value: Math.hypot(s.b[0], s.b[1]), unit: "kg·m/s", digits: 4 });
      if (okA) out.push({ label: c.t("resPa"), value: Math.hypot(s.a[0], s.a[1]), unit: "kg·m/s", digits: 4 });
      if (okB && okA && !SCN[p].fixed) {
        const Pb = Math.hypot(s.b[0], s.b[1]), Pa = Math.hypot(s.a[0], s.a[1]);
        out.push({ label: c.t("resPr"), value: Pa / Pb, digits: 3, ref: 1, refText: "1" });
        let dA = (Math.atan2(s.a[1], s.a[0]) - Math.atan2(s.b[1], s.b[0])) * 180 / Math.PI;
        dA = ((dA + 540) % 360) - 180;
        out.push({ label: c.t("resAng"), value: Math.abs(dA), unit: "°", digits: 1, ref: 0, refText: "0°" });
      }
      if (okB && okA) {
        out.push({ text: c.t("resK") + ": " + c.t("resKval", { a: QBL.fixed(s.b[2], 1), b: QBL.fixed(s.a[2], 1) }) });
        const ref = SCN[p].mode === "sticky" ? null : 1;
        out.push({ label: c.t("resKr"), value: s.a[2] / s.b[2], digits: 3, ref, refText: ref ? "1" : null });
      }
      return out;
    };
  }

  const def = {
    id: "carpisma",
    order: 90,
    text,
    parts: PARTS.map((p) => ({ id: p, title: p, tables: [tableFor(p)], results: results(p) })),

    mount(api) {
      const { C, t, mem } = api;
      const tilt = [QBL.between(api.rng, -0.25, 0.25), QBL.between(api.rng, -0.25, 0.25)]; // cm/s²
      mem.arrows = mem.arrows || {};
      api.store.extra.paper = api.store.extra.paper || {};
      const st = { part: api.part, view: mem.view || "table", discs: [], run: null, drag: null, meas: null, pair: null };
      const scn = () => SCN[st.part];
      const paper = () => (api.store.extra.paper[st.part] = api.store.extra.paper[st.part] || { dots: [], T: scn().T });
      const arrows = () => (mem.arrows[st.part] = mem.arrows[st.part] || scn().v.map((v) => (v ? v.slice() : null)));

      // tablo satır etiketleri (dile göre)
      for (const p of PARTS) {
        const tb = api.table("T" + p);
        tb.rows.forEach((r, i) => { r.lab = t(ROWS[i]); });
      }

      function place() {
        const s = scn();
        st.discs = s.d.map((k, i) => ({ ...TYPES[k], x: s.pos[i][0], y: s.pos[i][1], vx: 0, vy: 0, fixed: s.fixed === i }));
        st.pair = null;
        st.run = null;
      }
      function launch() {
        if (st.run) return;
        place();
        const ar = arrows();
        st.discs.forEach((d, i) => {
          const a = ar[i];
          if (!a || d.fixed) return;
          const ang = Math.atan2(a[1], a[0]) + ((0.6 * Math.PI) / 180) * QBL.gauss();
          const sp = Math.hypot(a[0], a[1]) * (1 + 0.02 * QBL.gauss());
          d.vx = sp * Math.cos(ang); d.vy = sp * Math.sin(ang);
        });
        const pp = paper();
        pp.dots = []; pp.T = Number(perSeg.value);
        st.run = { t: 0, next: 0.05 + Math.random() * 0.02, T: pp.T / 1000 };
        st.meas = null;
        api.status(t("running"));
      }

      function collide(a, b, e) {
        const dx = b.x - a.x, dy = b.y - a.y, dist = Math.hypot(dx, dy);
        const nx = dx / dist, ny = dy / dist;
        const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (rv >= 0) return false;
        const ia = a.fixed ? 0 : 1 / a.m, ib = b.fixed ? 0 : 1 / b.m;
        const j = (-(1 + e) * rv) / (ia + ib);
        a.vx -= j * ia * nx; a.vy -= j * ia * ny;
        b.vx += j * ib * nx; b.vy += j * ib * ny;
        return true;
      }
      function step(dt) {
        if (!st.run) return;
        const n = Math.max(1, Math.ceil(dt / 0.001));
        const h = dt / n;
        const s = scn();
        for (let k = 0; k < n; k++) {
          const [a, b] = st.discs;
          if (st.pair) {
            const P = st.pair;
            P.vx *= 1 - h / 20; P.vy *= 1 - h / 20;
            P.vx += tilt[0] * h; P.vy += tilt[1] * h;
            P.x += P.vx * h; P.y += P.vy * h; P.ang += P.w * h;
            [a, b].forEach((d, i) => {
              const ox = P.off[i][0], oy = P.off[i][1], c0 = Math.cos(P.ang), s0 = Math.sin(P.ang);
              d.x = P.x + ox * c0 - oy * s0; d.y = P.y + ox * s0 + oy * c0;
              d.vx = P.vx - P.w * (ox * s0 + oy * c0); d.vy = P.vy + P.w * (ox * c0 - oy * s0);
            });
          } else {
            if (s.mode === "magnetic") {
              const dx = b.x - a.x, dy = b.y - a.y, dist = Math.max(Math.hypot(dx, dy), a.r + b.r);
              if (dist < 40) {
                const F = 2.8e-5 / (dist / 100) ** 4 - 2.8e-5 / 0.4 ** 4; // N
                const nx = dx / dist, ny = dy / dist;
                const accA = (F / (a.m / 1000)) * 100, accB = (F / (b.m / 1000)) * 100; // cm/s²
                if (!a.fixed) { a.vx -= accA * nx * h; a.vy -= accA * ny * h; }
                if (!b.fixed) { b.vx += accB * nx * h; b.vy += accB * ny * h; }
              }
            }
            for (const d of [a, b]) {
              if (d.fixed) continue;
              d.vx *= 1 - h / 20; d.vy *= 1 - h / 20;
              d.vx += tilt[0] * h; d.vy += tilt[1] * h;
              d.x += d.vx * h; d.y += d.vy * h;
            }
            const dist = Math.hypot(b.x - a.x, b.y - a.y);
            if (dist < a.r + b.r) {
              if (s.mode === "sticky") {
                const M = a.m + b.m;
                const cx = (a.m * a.x + b.m * b.x) / M, cy = (a.m * a.y + b.m * b.y) / M;
                const vx = (a.m * a.vx + b.m * b.vx) / M, vy = (a.m * a.vy + b.m * b.vy) / M;
                let L = 0, I = 0;
                for (const d of [a, b]) {
                  const rx = d.x - cx, ry = d.y - cy;
                  L += d.m * (rx * (d.vy - vy) - ry * (d.vx - vx));
                  I += d.m * (rx * rx + ry * ry) + 0.5 * d.m * d.r * d.r;
                }
                st.pair = { x: cx, y: cy, vx, vy, w: L / I, ang: 0, off: [[a.x - cx, a.y - cy], [b.x - cx, b.y - cy]] };
              } else collide(a, b, s.mode === "magnetic" ? 0.98 : 0.92);
            }
          }
          // kenar tamponları: bir disk kenara çarpınca pedal bırakılır ve diskler elle tutulur
          let edge = false;
          for (const d of st.discs) {
            if (d.fixed) continue;
            if (Math.abs(d.x) > HALF - d.r) { d.x = Math.sign(d.x) * (HALF - d.r); d.vx *= -0.7; edge = true; }
            if (Math.abs(d.y) > HALF - d.r) { d.y = Math.sign(d.y) * (HALF - d.r); d.vy *= -0.7; edge = true; }
          }
          if (edge) {
            st.run = null;
            st.pair = null;
            st.discs.forEach((d) => { d.vx = 0; d.vy = 0; });
            api.persist();
            api.status(t("doneRun", { n: paper().dots.length }), "ok");
            break;
          }
          // kıvılcım noktaları
          const run = st.run;
          run.t += h;
          if (run.t >= run.next) {
            run.next += run.T;
            const pp = paper();
            st.discs.forEach((d, i) => { if (Math.abs(d.x) < PAPER && Math.abs(d.y) < PAPER) pp.dots.push([Math.round(d.x * 100) / 100, Math.round(d.y * 100) / 100, i]); });
          }
          const moving = st.discs.some((d) => !d.fixed && Math.hypot(d.vx, d.vy) > 3 && Math.abs(d.x) < PAPER + 2 && Math.abs(d.y) < PAPER + 2);
          if (run.t > 6 || (!moving && run.t > 0.3)) {
            st.run = null;
            api.persist();
            api.status(t("doneRun", { n: paper().dots.length }), "ok");
            break;
          }
        }
      }

      function puck(c, d, S) {
        const cols = { dark: ["#8d969f", "#3c444c"], alu: ["#f2f4f6", "#9aa3ab"], mag: ["#7d9cd6", "#223a6a"] }[d.tone];
        const g = c.createRadialGradient(d.x - d.r * 0.3, d.y - d.r * 0.3, d.r * 0.1, d.x, d.y, d.r);
        g.addColorStop(0, cols[0]); g.addColorStop(1, cols[1]);
        c.fillStyle = g;
        c.beginPath(); c.arc(d.x, d.y, d.r, 0, Math.PI * 2); c.fill();
        c.strokeStyle = scn().mode === "sticky" ? "#c9a24a" : "#1d2228";
        c.lineWidth = scn().mode === "sticky" ? 0.5 : 0.25;
        c.stroke();
        c.fillStyle = "#c62828";
        c.beginPath(); c.arc(d.x, d.y, 0.35, 0, Math.PI * 2); c.fill();
        if (d.fixed) { c.strokeStyle = "#111"; c.lineWidth = 0.2; c.beginPath(); c.moveTo(d.x - 1.2, d.y - 1.2); c.lineTo(d.x + 1.2, d.y + 1.2); c.moveTo(d.x + 1.2, d.y - 1.2); c.lineTo(d.x - 1.2, d.y + 1.2); c.stroke(); }
        D.text(c, (d.m) + " g", d.x, d.y + d.r * 0.55, { size: 1.2, color: "#fff", align: "center", base: "middle", weight: 600 });
      }
      function drawTable(c, S) {
        D.wall(c, S);
        // masa çerçevesi ve delikli yüzey
        c.fillStyle = "#2f3a45";
        D.rr(c, -HALF - 2.5, -HALF - 2.5, 2 * HALF + 5, 2 * HALF + 5, 1.5);
        c.fill();
        c.fillStyle = S.colors.dark ? "#3b4652" : "#c9d1d8";
        c.fillRect(-HALF, -HALF, 2 * HALF, 2 * HALF);
        c.fillStyle = "#f8f8f3";
        c.fillRect(-PAPER, -PAPER, 2 * PAPER, 2 * PAPER);
        // noktalar
        c.fillStyle = "rgba(20,20,30,0.85)";
        for (const [x, y] of paper().dots) { c.beginPath(); c.arc(x, y, 0.22, 0, Math.PI * 2); c.fill(); }
        st.discs.forEach((d) => puck(c, d, S));
        // hız okları
        if (!st.run) {
          const ar = arrows();
          st.discs.forEach((d, i) => {
            const a = ar[i];
            if (!a || d.fixed) return;
            D.arrow(c, d.x, d.y, d.x + a[0] * 0.35, d.y + a[1] * 0.35, { color: S.colors.accent, w: 0.35, head: 1.6 });
            D.text(c, QBL.fixed(Math.hypot(a[0], a[1]), 0) + " cm/s", d.x + a[0] * 0.35, d.y + a[1] * 0.35 - 1.2, { size: 1.3, color: S.colors.accent, align: "center", base: "bottom" });
          });
        }
      }
      function drawPaper(c, S) {
        D.wall(c, S);
        c.fillStyle = "#fbfbf7";
        c.fillRect(-PAPER, -PAPER, 2 * PAPER, 2 * PAPER);
        c.strokeStyle = "rgba(0,0,0,0.25)";
        c.lineWidth = S.px;
        c.strokeRect(-PAPER, -PAPER, 2 * PAPER, 2 * PAPER);
        // x ekseni (kâğıdın kenarına paralel başvuru)
        c.strokeStyle = "rgba(30,60,120,0.5)";
        c.setLineDash([0.6, 0.5]);
        c.lineWidth = 0.08;
        c.beginPath(); c.moveTo(-PAPER, PAPER - 3); c.lineTo(PAPER, PAPER - 3); c.stroke();
        c.setLineDash([]);
        D.arrow(c, PAPER - 6, PAPER - 3, PAPER - 1, PAPER - 3, { color: "rgba(30,60,120,0.7)", w: 0.12, head: 0.8 });
        D.text(c, "x", PAPER - 1.2, PAPER - 4, { size: 1.4, color: "rgba(30,60,120,0.9)" });
        c.fillStyle = "rgba(20,20,30,0.9)";
        for (const [x, y] of paper().dots) { c.beginPath(); c.arc(x, y, 0.2, 0, Math.PI * 2); c.fill(); }
        // cetvel + iletki
        const m = st.meas;
        if (m) {
          const dx = m.x2 - m.x1, dy = m.y2 - m.y1, L = Math.hypot(dx, dy);
          if (L > 0.05) {
            const ang = Math.atan2(dy, dx);
            c.save();
            c.translate(m.x1, m.y1);
            c.rotate(ang);
            c.fillStyle = "rgba(250,245,215,0.78)";
            c.fillRect(-1, 0.3, L + 2, 2.2);
            c.strokeStyle = "#222";
            c.lineWidth = Math.max(S.px * 0.8, 0.02);
            c.beginPath();
            for (let k = 0; k <= Math.floor((L + 1) * 10); k++) {
              const x = k / 10;
              const ln = k % 10 === 0 ? 0.9 : k % 5 === 0 ? 0.6 : 0.35;
              c.moveTo(x, 0.3); c.lineTo(x, 0.3 + ln);
            }
            c.stroke();
            c.fillStyle = "#222";
            c.font = D.font(0.55, 500);
            c.textAlign = "center";
            for (let k = 0; k <= Math.floor(L + 1); k++) c.fillText(String(k), k, 1.9);
            c.restore();
            c.strokeStyle = "#c62828";
            c.lineWidth = Math.max(S.px * 1.4, 0.05);
            c.beginPath(); c.moveTo(m.x1, m.y1); c.lineTo(m.x2, m.y2); c.stroke();
            // iletki (x eksenine göre açı)
            c.strokeStyle = "rgba(30,60,120,0.6)";
            c.lineWidth = 0.06;
            c.beginPath(); c.moveTo(m.x1, m.y1); c.lineTo(m.x1 + 5, m.y1); c.stroke();
            c.beginPath(); c.arc(m.x1, m.y1, 3.2, 0, ang, ang < 0); c.stroke();
          }
          for (const [x, y] of [[m.x1, m.y1], [m.x2, m.y2]]) { c.strokeStyle = "#c62828"; c.lineWidth = 0.08; c.beginPath(); c.arc(x, y, 0.55, 0, Math.PI * 2); c.stroke(); }
        }
      }
      const draw = (c, S) => (st.view === "paper" ? drawPaper(c, S) : drawTable(c, S));
      const nearDot = (p, tol) => {
        let best = null, bd = tol;
        for (const [x, y] of paper().dots) { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = [x, y]; } }
        return best;
      };
      const stage = api.stage({
        world: [-HALF - 3, -HALF - 3, HALF + 3, HALF + 3], maxH: 620, lensZoom: 4, label: t("title"), draw, step,
        pointer: {
          down(p) {
            if (st.view === "paper") {
              const d0 = nearDot(p, 1.2) || [p.x, p.y];
              st.meas = { x1: d0[0], y1: d0[1], x2: d0[0], y2: d0[1] };
              st.drag = "meas";
              showReading();
              return true;
            }
            if (st.run) return false;
            const i = st.discs.findIndex((d, k) => !d.fixed && arrows()[k] && Math.hypot(p.x - d.x, p.y - d.y) < d.r + 1.5);
            if (i >= 0) { st.drag = i; return true; }
            return false;
          },
          move(p) {
            if (st.drag === "meas") {
              const d1 = nearDot(p, 0.8) || [p.x, p.y];
              st.meas.x2 = d1[0]; st.meas.y2 = d1[1];
              showReading();
            } else if (typeof st.drag === "number") {
              const d = st.discs[st.drag];
              let vx = (p.x - d.x) / 0.35, vy = (p.y - d.y) / 0.35;
              const sp = Math.hypot(vx, vy);
              if (sp > 60) { vx *= 60 / sp; vy *= 60 / sp; }
              arrows()[st.drag] = [Math.round(vx), Math.round(vy)];
            }
          },
          up() { st.drag = null; },
          cursor: (p) => (st.view === "paper" ? "crosshair" : st.discs.some((d, k) => !d.fixed && arrows()[k] && Math.hypot(p.x - d.x, p.y - d.y) < d.r + 1.5) ? "grab" : ""),
        },
      });

      // --- denetimler
      const readOut = api.el("p", { class: "lab-val", role: "status" });
      function reading() {
        const m = st.meas;
        if (!m) return null;
        const dx = m.x2 - m.x1, dy = m.y2 - m.y1, L = Math.hypot(dx, dy);
        if (L < 0.1) return null;
        const d = Math.round(L * 20) / 20;
        const a = Math.round(((Math.atan2(-dy, dx) * 180) / Math.PI) * 2) / 2;
        return { d, a };
      }
      function showReading() {
        const r = reading();
        readOut.textContent = r ? t("reading", { d: QBL.fixed(r.d, 2), a: QBL.fixed(r.a, 1) }) : t("noReading");
      }
      const perSeg = C.segment({ label: t("period"), value: scn().T, options: [{ value: 60, label: "60 ms" }, { value: 100, label: "100 ms" }] });
      const tableBox = C.group(t("viewTable"), C.note(t("arrowNote"), "small"), perSeg.el,
        C.buttons([{ label: t("launch"), primary: true, onClick: launch }, { label: t("reset"), onClick: () => { place(); api.status(""); } }]));
      const fixedNote = C.note(t("fixedNote"), "small");
      tableBox.append(fixedNote);
      const paperBox = C.group(t("ruler"), C.note(t("noReading"), "small"), readOut,
        C.buttons([{ label: t("write"), primary: true, onClick: () => {
          const r = reading();
          if (!r) { api.status(t("noReading"), "bad"); return; }
          const tb = api.table("T" + st.part);
          if (tb.active < 0) { api.status(t("noRow"), "bad"); return; }
          tb.set(tb.active, { d: r.d, th: r.a, T: paper().T }, { d: r.d.toFixed(2), th: String(r.a), T: String(paper().T) });
          api.status(api.tg("labRecorded"), "ok");
        } }]));
      const viewSeg = C.segment({
        label: t("view"), value: st.view, options: [{ value: "table", label: t("viewTable") }, { value: "paper", label: t("viewPaper") }],
        onChange(v) { st.view = v; mem.view = v; tableBox.hidden = v === "paper"; paperBox.hidden = v !== "paper"; },
      });
      api.panel.append(C.group("", viewSeg.el), tableBox, paperBox);
      tableBox.hidden = st.view === "paper";
      paperBox.hidden = st.view !== "paper";
      showReading();

      // momentum vektör çizimi
      const cv = api.el("canvas", { class: "lab-graph-canvas", role: "img", "aria-label": t("gP") });
      api.extra.append(api.el("div", { class: "lab-graph" }, api.el("div", { class: "lab-graph-head" }, api.el("h3", {}, t("gP"))), api.el("div", { class: "lab-graph-wrap" }, cv), C.note(t("pNote"), "small")));
      function vectors() {
        if (!cv.isConnected) return;
        const tb = api.table("T" + st.part);
        const W = cv.parentNode.clientWidth || 500, H = Math.round(Math.min(300, W * 0.55));
        const dpr = Math.min(2.5, window.devicePixelRatio || 1);
        cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px";
        const g = cv.getContext("2d");
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        const pal = QBL.theme();
        g.fillStyle = pal.surface; g.fillRect(0, 0, W, H);
        const vecs = tb.rows.map((r) => { const px = tb.get(r, "px"), py = tb.get(r, "py"); return px == null ? null : [px, py]; });
        const s = sums(tb);
        const all = vecs.filter(Boolean).concat([[s.b[0], s.b[1]], [s.a[0], s.a[1]]]);
        const mx = Math.max(0.01, ...all.map((v) => Math.hypot(v[0], v[1])));
        const sc = (Math.min(W, H) * 0.42) / mx;
        const ox = W / 2, oy = H / 2;
        g.strokeStyle = pal.grid; g.beginPath(); g.moveTo(0, oy); g.lineTo(W, oy); g.moveTo(ox, 0); g.lineTo(ox, H); g.stroke();
        vecs.forEach((v, i) => { if (v) D.arrow(g, ox, oy, ox + v[0] * sc, oy - v[1] * sc, { color: i < 2 ? "rgba(35,86,196,0.55)" : "rgba(179,49,42,0.55)", w: 1.4, head: 7 }); });
        if (s.b[3]) D.arrow(g, ox, oy, ox + s.b[0] * sc, oy - s.b[1] * sc, { color: pal.accent, w: 3, head: 11 });
        if (s.a[3]) D.arrow(g, ox, oy, ox + s.a[0] * sc, oy - s.a[1] * sc, { color: pal.bad, w: 3, head: 11 });
      }

      function onPart(p) {
        st.part = p;
        perSeg.value = scn().T;
        fixedNote.hidden = !scn().fixed;
        place();
        st.meas = null;
        showReading();
        vectors();
      }
      api.onPart(onPart);
      onPart(st.part);
      return { onData: vectors, onClear() { api.store.extra.paper = {}; api.persist(); } };
    },

    selfTest() {
      // eşit kütleler, tamamen esnek olmayan: hız yarıya iner, momentum korunur
      const m = 0.538, v = 0.34;
      const pb = m * v, pa = 2 * m * (v / 2);
      return [{ name: "momentum (yapışkan)", value: pa, expected: pb, tol: 1e-12 }];
    },
  };
  QBL.register(def);
})();
