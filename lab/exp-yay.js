// Deney 1 – Basit harmonik hareket: Hooke yasası, yay–kütle periyodu, yayın potansiyel enerjisi
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const TOP = 9;        // yayın asıldığı nokta (cm)
  const RULER0 = 6;     // cetvelin sıfır çizgisi (cm)
  const HANGER = 50;    // askı kütlesi (g)

  const SPRINGS = [
    { k: [12, 16], ms: 0.030, L0: 8, r: 1.15, wire: 0.12, coils: 30 },
    { k: [22, 30], ms: 0.045, L0: 9, r: 1.0, wire: 0.16, coils: 24 },
    { k: [40, 55], ms: 0.060, L0: 10, r: 1.0, wire: 0.22, coils: 18 },
  ];

  const text = {
    tr: {
      kicker: "Deney 1",
      title: "Basit harmonik hareket ve Hooke yasası",
      short: "Yaylara kütle asıp uzamaları cetvelden oku, yay sabitini bul; salınım periyodunu ve yayın potansiyel enerjisini incele.",
      tools: "Yaylar · kütle takımı · cetvel · kronometre",
      aim: "Hooke yasasını ve yay–kütle sisteminin basit harmonik hareketini incelemek; yay sabitini ve yayın potansiyel enerji değişimini bulmak.",
      theory: `<p>Esneklik sınırı içinde gerilen bir yay, uzamayla orantılı ve uzamaya zıt yönde bir kuvvet uygular (Hooke yasası):</p>
<p class="eq">F = −k · x</p>
<p>Yaya m kütlesi asıldığında denge konumunda yay kuvveti ağırlığı dengeler: m·g = k·Δx. Bu yüzden F = m·g kuvveti Δx uzamasına karşı çizilirse bir doğru elde edilir ve <b>eğim k</b>'yı verir.</p>
<p>Denge konumundan çekilip bırakılan kütle basit harmonik hareket yapar. Periyot</p>
<p class="eq">T = 2π · √(m_etkin / k),  m_etkin ≈ m + m_yay / 3</p>
<p>T² = (4π²/k)·m + (4π²/k)·m_yay/3 olduğundan T²–m grafiği de doğrudur; eğimden k, kesimden yayın etkin kütlesi bulunur.</p>
<p>Yayın potansiyel enerjisi U = ½·k·x²'dir (x: yayın gerilmemiş boyuna göre uzaması). Kütle x₁ konumundan serbest bırakılıp en alt x₂ noktasına inerse, kütlenin kaybettiği yer çekimi potansiyel enerjisi m·g·(x₂ − x₁), yayın kazandığı enerjiye ½·k·(x₂² − x₁²) eşit olmalıdır.</p>`,
      steps: {
        k: [
          "Yay 1'i seç. Kütle asılı değilken ibrenin cetvelde gösterdiği değeri büyüteçle oku ve m = 0 satırına x olarak yaz.",
          "Askıya kütle ekleyerek 100, 200, …, 500 g'lık yükleri as. Her yükte salınım durunca ibreyi oku ve tabloya yaz.",
          "Aynı işlemleri Yay 2 ve Yay 3 için tekrarla.",
          "F–Δx grafiğinin eğiminden her yayın k sabitini bul.",
        ],
        T: [
          "Bir yay ve bir kütle seç. <b>Çek ve bırak</b> ile kütleyi birkaç santimetre aşağı çekip bırak.",
          "Kütle en alt noktadan her geçtiğinde say; kronometreyle 10 tam salınımın süresini ölç ve <b>Tabloya yaz</b>. Her kütle için üç kez ölç.",
          "En az dört farklı kütle için tekrarla. T²–m grafiğinin eğiminden k'yı, kesiminden yayın etkin kütlesini bul.",
        ],
        E: [
          "Yay sabiti bölümünde ölçtüğün bir yay seç ve bir kütle as. <b>Yeni satır</b> ile yayı ve kütleyi tabloya ekle.",
          "Kütleyi destekleyerek yukarı kaldır (kaydırıcı). İbrenin gösterdiği x₁ değerini oku.",
          "<b>İşaretçiyi sıfırla</b>, sonra <b>Bırak</b>. Kütle inerken ibre kâğıt işaretçiyi en alt noktaya iter; işaretçinin gösterdiği x₂'yi oku.",
          "Farklı kaldırma yükseklikleri için tekrarla; yer çekimi enerjisindeki azalmayı yayın enerjisindeki artışla karşılaştır.",
        ],
      },
      partK: "Yay sabiti (Hooke)",
      partT: "Salınım periyodu",
      partE: "Potansiyel enerji",
      setup: "Düzenek",
      spring: "Yay",
      springN: "Yay {n}",
      mass: "Asılı kütle (askı dahil): {m} g",
      add50: "+50 g", add100: "+100 g", rem50: "−50 g", remAll: "Kütleleri al",
      pull: "Çekme genliği",
      pullGo: "Çek ve bırak",
      lift: "Kütleyi yukarı kaldır",
      release: "Bırak",
      rider: "İşaretçiyi sıfırla",
      newRow: "Yeni satır (yay ve kütle)",
      readNote: "İbrenin (kırmızı ok) cetveldeki yerini büyüteçle oku. Salınım durmadan okuma yapma.",
      riderNote: "Kâğıt işaretçi (yeşil) ibreyle birlikte aşağı itilir ve en alt noktada kalır.",
      tableK: "Yay {n}",
      colS: "Yay",
      gFx: "F = f(Δx)",
      gT2: "T̄² = f(m)",
      gE: "ΔU_yay = f(ΔU_yer çekimi)",
      resK: "k<sub>{n}</sub> (F–Δx eğiminden)",
      resKT: "k<sub>{n}</sub> (T²–m eğiminden)",
      resMs: "Yay {n}: etkin yay kütlesi (kesimden ×3)",
      resRatio: "Ortalama ΔU_yay / ΔU_yer çekimi",
      resNeedK: "ΔU_yay için önce Yay sabiti bölümünde bu yayın k değerini ve x₀ okumasını ölç.",
      noMass: "Önce bir kütle as.",
      needK: "Bu yayın k değeri ve x₀ okuması henüz yok.",
      noTime: "Önce kronometreyle bir süre ölç.",
    },
    en: {
      kicker: "Experiment 1",
      title: "Simple harmonic motion and Hooke's law",
      short: "Hang masses on springs, read the extensions on a ruler and find the spring constant; study the period and the spring's potential energy.",
      tools: "Springs · set of masses · ruler · stopwatch",
      aim: "To study Hooke's law and the simple harmonic motion of a mass–spring system, and to determine the spring constant and the change of the spring's potential energy.",
      theory: `<p>A spring stretched within its elastic limit exerts a force proportional to the extension and opposite to it (Hooke's law):</p>
<p class="eq">F = −k · x</p>
<p>With a mass m hanging at rest, the spring force balances the weight: m·g = k·Δx. Plotting F = m·g against the extension Δx gives a straight line whose <b>slope is k</b>.</p>
<p>Pulled down and released, the mass performs simple harmonic motion with period</p>
<p class="eq">T = 2π · √(m_eff / k),  m_eff ≈ m + m_spring / 3</p>
<p>Since T² = (4π²/k)·m + (4π²/k)·m_spring/3, the T²–m graph is a straight line too: its slope gives k and its intercept the effective mass of the spring.</p>
<p>The potential energy of the spring is U = ½·k·x² (x: extension from the unstretched length). If the mass is released from x₁ and comes down to its lowest point x₂, the gravitational energy it loses, m·g·(x₂ − x₁), should equal the energy gained by the spring, ½·k·(x₂² − x₁²).</p>`,
      steps: {
        k: [
          "Choose spring 1. With no mass hanging, read the pointer on the ruler with the magnifier and enter it as x in the m = 0 row.",
          "Add masses to the hanger to hang 100, 200, …, 500 g. When the oscillation has stopped, read the pointer and enter it.",
          "Repeat for springs 2 and 3.",
          "Find each spring constant k from the slope of the F–Δx graph.",
        ],
        T: [
          "Choose a spring and a mass. Use <b>Pull and release</b> to pull the mass down a few centimetres and let go.",
          "Count every time the mass passes the lowest point; time 10 full oscillations with the stopwatch and use <b>Write to table</b>. Measure each mass three times.",
          "Repeat for at least four masses. Find k from the slope of the T²–m graph and the spring's effective mass from the intercept.",
        ],
        E: [
          "Choose a spring you measured in the spring-constant part and hang a mass. Add the spring and the mass to the table with <b>New row</b>.",
          "Support the mass and lift it (slider). Read x₁ at the pointer.",
          "Press <b>Reset marker</b>, then <b>Release</b>. As the mass falls, the pointer pushes the paper marker to the lowest point; read x₂ at the marker.",
          "Repeat for different lifting heights; compare the loss of gravitational energy with the gain of spring energy.",
        ],
      },
      partK: "Spring constant (Hooke)",
      partT: "Period of oscillation",
      partE: "Potential energy",
      setup: "Apparatus",
      spring: "Spring",
      springN: "Spring {n}",
      mass: "Hanging mass (with hanger): {m} g",
      add50: "+50 g", add100: "+100 g", rem50: "−50 g", remAll: "Remove masses",
      pull: "Pull amplitude",
      pullGo: "Pull and release",
      lift: "Lift the mass",
      release: "Release",
      rider: "Reset marker",
      newRow: "New row (spring and mass)",
      readNote: "Read the pointer (red arrow) on the ruler with the magnifier. Do not read while it is still oscillating.",
      riderNote: "The paper marker (green) is pushed down by the pointer and stays at the lowest point.",
      tableK: "Spring {n}",
      colS: "Spring",
      gFx: "F = f(Δx)",
      gT2: "T̄² = f(m)",
      gE: "ΔU_spring = f(ΔU_gravity)",
      resK: "k<sub>{n}</sub> (from F–Δx slope)",
      resKT: "k<sub>{n}</sub> (from T²–m slope)",
      resMs: "Spring {n}: effective spring mass (intercept ×3)",
      resRatio: "Mean ΔU_spring / ΔU_gravity",
      resNeedK: "For ΔU_spring, first measure k and the x₀ reading of this spring in the spring-constant part.",
      noMass: "Hang a mass first.",
      needK: "k and the x₀ reading of this spring are not available yet.",
      noTime: "Time something with the stopwatch first.",
    },
    de: {
      kicker: "Versuch 1",
      title: "Harmonische Schwingung und hookesches Gesetz",
      short: "Hänge Massen an Federn, lies die Verlängerungen am Lineal ab und bestimme die Federkonstante; untersuche Periode und Spannenergie.",
      tools: "Federn · Massensatz · Lineal · Stoppuhr",
      aim: "Das hookesche Gesetz und die harmonische Schwingung eines Feder-Masse-Systems untersuchen sowie Federkonstante und Änderung der Spannenergie bestimmen.",
      theory: `<p>Eine im elastischen Bereich gedehnte Feder übt eine zur Verlängerung proportionale, entgegengesetzte Kraft aus (hookesches Gesetz):</p>
<p class="eq">F = −k · x</p>
<p>Hängt die Masse m in Ruhe, gleicht die Federkraft das Gewicht aus: m·g = k·Δx. Trägt man F = m·g gegen Δx auf, erhält man eine Gerade mit der <b>Steigung k</b>.</p>
<p>Ausgelenkt und losgelassen schwingt die Masse harmonisch mit der Periode</p>
<p class="eq">T = 2π · √(m_eff / k),  m_eff ≈ m + m_Feder / 3</p>
<p>Wegen T² = (4π²/k)·m + (4π²/k)·m_Feder/3 ist auch das T²–m-Diagramm eine Gerade: Die Steigung liefert k, der Achsenabschnitt die wirksame Federmasse.</p>
<p>Die Spannenergie der Feder ist U = ½·k·x² (x: Verlängerung gegenüber der ungespannten Länge). Wird die Masse bei x₁ losgelassen und erreicht den tiefsten Punkt x₂, so muss die verlorene Lageenergie m·g·(x₂ − x₁) gleich dem Zuwachs der Spannenergie ½·k·(x₂² − x₁²) sein.</p>`,
      steps: {
        k: [
          "Wähle Feder 1. Ohne angehängte Masse den Zeiger am Lineal mit der Lupe ablesen und als x in die Zeile m = 0 eintragen.",
          "Hänge durch Auflegen von Massen 100, 200, …, 500 g an. Wenn die Schwingung abgeklungen ist, Zeiger ablesen und eintragen.",
          "Wiederhole dies für Feder 2 und 3.",
          "Bestimme k jeder Feder aus der Steigung des F–Δx-Diagramms.",
        ],
        T: [
          "Wähle Feder und Masse. Mit <b>Auslenken und loslassen</b> die Masse einige Zentimeter nach unten ziehen und loslassen.",
          "Zähle jeden Durchgang durch den tiefsten Punkt; miss die Zeit für 10 volle Schwingungen und nutze <b>In Tabelle eintragen</b>. Jede Masse dreimal messen.",
          "Mindestens vier Massen messen. k aus der Steigung des T²–m-Diagramms, die wirksame Federmasse aus dem Achsenabschnitt bestimmen.",
        ],
        E: [
          "Wähle eine im Teil Federkonstante gemessene Feder und hänge eine Masse an. Mit <b>Neue Zeile</b> Feder und Masse in die Tabelle übernehmen.",
          "Masse stützen und anheben (Schieberegler). Den Wert x₁ am Zeiger ablesen.",
          "<b>Marke zurücksetzen</b>, dann <b>Loslassen</b>. Beim Herabfallen schiebt der Zeiger die Papiermarke zum tiefsten Punkt; x₂ an der Marke ablesen.",
          "Für verschiedene Hubhöhen wiederholen; Abnahme der Lageenergie mit Zunahme der Spannenergie vergleichen.",
        ],
      },
      partK: "Federkonstante (Hooke)",
      partT: "Schwingungsdauer",
      partE: "Spannenergie",
      setup: "Aufbau",
      spring: "Feder",
      springN: "Feder {n}",
      mass: "Angehängte Masse (mit Halter): {m} g",
      add50: "+50 g", add100: "+100 g", rem50: "−50 g", remAll: "Massen abnehmen",
      pull: "Auslenkung",
      pullGo: "Auslenken und loslassen",
      lift: "Masse anheben",
      release: "Loslassen",
      rider: "Marke zurücksetzen",
      newRow: "Neue Zeile (Feder und Masse)",
      readNote: "Lies den Zeiger (roter Pfeil) mit der Lupe am Lineal ab. Nicht ablesen, solange er noch schwingt.",
      riderNote: "Die Papiermarke (grün) wird vom Zeiger nach unten geschoben und bleibt am tiefsten Punkt stehen.",
      tableK: "Feder {n}",
      colS: "Feder",
      gFx: "F = f(Δx)",
      gT2: "T̄² = f(m)",
      gE: "ΔU_Feder = f(ΔU_Lage)",
      resK: "k<sub>{n}</sub> (aus F–Δx-Steigung)",
      resKT: "k<sub>{n}</sub> (aus T²–m-Steigung)",
      resMs: "Feder {n}: wirksame Federmasse (Achsenabschnitt ×3)",
      resRatio: "Mittleres ΔU_Feder / ΔU_Lage",
      resNeedK: "Für ΔU_Feder zuerst k und die x₀-Ablesung dieser Feder im Teil Federkonstante messen.",
      noMass: "Hänge zuerst eine Masse an.",
      needK: "k und x₀ dieser Feder liegen noch nicht vor.",
      noTime: "Miss zuerst eine Zeit mit der Stoppuhr.",
    },
  };

  const gN = 9.81;
  // x0: m = 0 satırındaki okuma
  const x0Of = (tb) => { const r = tb.rows.find((q) => q.m === 0); return r ? tb.raw(r, "x") : null; };
  const kTable = (n) => ({
    id: "k" + n,
    title: () => QBL.tx(def, "tableK", { n }),
    columns: [
      { key: "m", label: "m (g)", input: true },
      { key: "F", label: "F (N)", calc: (r) => (r.m != null ? (r.m / 1000) * gN : null), digits: 3 },
      { key: "x", label: "x (cm)", input: true },
      { key: "dx", label: "Δx = x − x₀ (cm)", calc: (r, tb) => { const x0 = x0Of(tb); return x0 != null && r.x != null && r.m !== 0 ? r.x - x0 : null; }, digits: 2 },
    ],
    rows: [0, 100, 200, 300, 400, 500].map((m) => ({ m, $m: String(m) })),
  });
  const kFromGraph = (api, n) => {
    const g = api.graph("gk");
    const f = g && g.fit(n - 1);
    return f ? f.a * 100 : null; // N/cm → N/m
  };

  const def = {
    id: "yay",
    order: 10,
    text,
    parts: [
      {
        id: "k", title: "partK",
        tables: [kTable(1), kTable(2), kTable(3)],
        graphs: [{
          id: "gk", title: () => QBL.tx(def, "gFx"),
          x: { key: "dx", label: "Δx (cm)" }, y: { key: "F", label: "F (N)" },
          series: [1, 2, 3].map((n) => ({ table: "k" + n, name: () => QBL.tx(def, "springN", { n }) })),
          fit: "prop", fits: ["prop", "line"], slopeUnit: "N/cm",
        }],
        results(c) {
          const out = [];
          [1, 2, 3].forEach((n) => {
            const f = c.fit("gk", n - 1);
            if (f) out.push({ label: c.t("resK", { n }), value: f.a * 100, err: f.sa * 100, unit: "N/m" });
          });
          return out;
        },
      },
      {
        id: "T", title: "partT",
        tables: [{
          id: "T",
          columns: [
            { key: "s", label: () => QBL.tx(def, "colS"), input: true, w: 3 },
            { key: "m", label: "m (g)", input: true },
            { key: "n1", label: "10T₁ (s)", input: true },
            { key: "n2", label: "10T₂ (s)", input: true },
            { key: "n3", label: "10T₃ (s)", input: true },
            { key: "Tm", label: "T̄ (s)", calc: (r, tb) => { const a = tb.avg(r, ["n1", "n2", "n3"]); return a == null ? null : a / 10; }, digits: 3 },
            { key: "T2", label: "T̄² (s²)", calc: (r, tb) => { const a = tb.avg(r, ["n1", "n2", "n3"]); return a == null ? null : (a / 10) ** 2; }, digits: 4 },
          ],
          minRows: 0,
        }],
        graphs: [{
          id: "gT", title: () => QBL.tx(def, "gT2"),
          x: { get: (r) => (r.m != null ? r.m / 1000 : null), label: "m (kg)" }, y: { key: "T2", label: "T̄² (s²)" },
          series: [1, 2, 3].map((n) => ({ table: "T", filter: (r) => r.s === n, name: () => QBL.tx(def, "springN", { n }) })),
          fit: "line", fits: ["line"], zeroX: true, zeroY: true, slopeUnit: "s²/kg", interceptUnit: "s²",
        }],
        results(c) {
          const out = [];
          [1, 2, 3].forEach((n) => {
            const f = c.fit("gT", n - 1);
            if (!f) return;
            const k = (4 * Math.PI ** 2) / f.a;
            out.push({ label: c.t("resKT", { n }), value: k, err: (k * f.sa) / f.a, unit: "N/m" });
            const ms = (3 * f.b) / f.a;
            out.push({ label: c.t("resMs", { n }), value: ms * 1000, err: 3000 * Math.abs(ms / 3) * (f.sb / Math.abs(f.b || 1e-9) + f.sa / f.a), unit: "g" });
          });
          return out;
        },
      },
      {
        id: "E", title: "partE",
        tables: [{
          id: "E",
          columns: [
            { key: "s", label: () => QBL.tx(def, "colS"), input: true, w: 3 },
            { key: "m", label: "m (g)", input: true },
            { key: "x1", label: "x₁ (cm)", input: true },
            { key: "x2", label: "x₂ (cm)", input: true },
            { key: "Ug", label: "ΔU_g (mJ)", calc: (r) => (r.m != null && r.x1 != null && r.x2 != null ? (r.m / 1000) * gN * ((r.x2 - r.x1) / 100) * 1000 : null), digits: 1 },
            { key: "Us", label: "ΔU_yay (mJ)", calc: (r, tb) => {
              if (r.s == null || r.x1 == null || r.x2 == null) return null;
              const api = tb.ctx.api;
              const k = kFromGraph(api, r.s);
              const kt = api.table("k" + r.s);
              const x0 = kt ? x0Of(kt) : null;
              if (k == null || x0 == null) return null;
              const a = (r.x1 - x0) / 100, b = (r.x2 - x0) / 100;
              return 0.5 * k * (b * b - a * a) * 1000;
            }, digits: 1 },
          ],
          minRows: 0,
        }],
        graphs: [{
          id: "gE", title: () => QBL.tx(def, "gE"),
          x: { key: "Ug", label: "ΔU_g (mJ)" }, y: { key: "Us", label: "ΔU_yay (mJ)" },
          series: [{ table: "E", name: "" }], fit: "prop", fits: ["prop", "line"], zeroX: true, zeroY: true,
        }],
        results(c) {
          const tb = c.table("E");
          const ratios = tb.rows.map((r) => { const a = tb.get(r, "Ug"), b = tb.get(r, "Us"); return a && b != null ? b / a : null; }).filter((v) => v != null);
          const out = [];
          if (ratios.length) out.push({ label: c.t("resRatio"), value: QBL.mean(ratios), err: ratios.length > 1 ? QBL.sem(ratios) : null, ref: 1, refText: "1" });
          if (tb.rows.some((r) => r.x1 != null && tb.get(r, "Us") == null)) out.push({ text: c.t("resNeedK") });
          return out;
        },
      },
    ],

    mount(api) {
      const { C, t, mem } = api;
      // düzenek: yay sabitleri
      const springs = SPRINGS.map((s) => ({ ...s, kv: QBL.between(api.rng, s.k[0], s.k[1]) }));
      const st = {
        n: mem.n || 1,
        m: mem.m ?? 0,             // asılı kütle (g), 0 = askı yok
        x: 0, v: 0,                // uzama (m) ve hız
        hold: null,                // elle tutulan uzama (m) ya da null
        lift: 0,
        rider: null,               // kâğıt işaretçi (cm, dünya y)
        drag: null,
      };
      const sp = () => springs[st.n - 1];
      const load = () => (st.m / 1000 + sp().ms / 2) * G;
      const meff = () => st.m / 1000 + sp().ms / 3;
      const eq = () => load() / sp().kv;
      st.x = eq() + 0.002 * QBL.gauss();
      const save = () => { mem.n = st.n; mem.m = st.m; };

      const hookY = () => TOP + sp().L0 + st.x * 100;
      const ptrY = () => hookY() + (st.m > 0 ? 0.9 : 0.3);

      function step(dt) {
        if (st.hold != null) { st.x = st.hold; st.v = 0; }
        else {
          const tau = 30; // sönüm zamanı (s)
          const n = Math.max(1, Math.ceil(dt / 0.002));
          const h = dt / n;
          for (let i = 0; i < n; i++) {
            const a = (load() - sp().kv * st.x - (2 * meff() / tau) * st.v) / meff();
            st.v += a * h;
            st.x += st.v * h;
          }
        }
        if (st.rider != null && ptrY() > st.rider) st.rider = ptrY();
      }

      function draw(c, S) {
        D.wall(c, S);
        D.bench(c, S, -5, 70, 76, 4);
        D.stand(c, 10, 76, 72, { baseW: 22, baseLeft: 0.3 });
        D.rodH(c, 10, 31, TOP - 0.6, 0.9);
        D.boss(c, 10, TOP - 0.6, 2.2);
        // cetvel ve kıskaçları
        for (const y of [14, 60]) { D.rodH(c, 10.5, 19.6, y, 0.6); D.boss(c, 10, y, 1.6); }
        D.ruler(c, { x: 22, y: RULER0, len: 68, dir: "v", side: "right", w: 2.4, px: S.px, fontSize: 0.8 });
        // kâğıt işaretçi
        if (st.rider != null) {
          c.fillStyle = "#2f9e5b";
          c.fillRect(21.4, st.rider - 0.12, 2.6, 0.24);
          c.fillRect(23.6, st.rider - 0.9, 0.4, 0.9);
        }
        // yay
        const s = sp(), hy = hookY();
        c.fillStyle = "#5b6168";
        c.fillRect(27.6, TOP - 0.2, 0.8, 0.6);
        D.spring(c, 28, TOP + 0.3, hy, { r: s.r, coils: s.coils, wire: s.wire, lead: 0.6 });
        // askı ve kütleler
        const py = ptrY();
        if (st.m > 0) {
          const masses = [];
          let rest = st.m - HANGER;
          while (rest >= 100) { masses.push({ h: 1.15, label: "100 g", tone: "brass" }); rest -= 100; }
          while (rest >= 50) { masses.push({ h: 0.65, label: "50 g", tone: "steel" }); rest -= 50; }
          D.hanger(c, 28, hy + 0.9, { len: 8.5, w: 4.2, plate: 0.45, masses, px: S.px });
        } else {
          D.hook(c, 28, hy, 0.9, "#5b6168");
        }
        // ibre
        c.fillStyle = "#c62828";
        c.beginPath();
        c.moveTo(22.05, py);
        c.lineTo(23.3, py - 0.28);
        c.lineTo(27.4, py - 0.08);
        c.lineTo(27.4, py + 0.08);
        c.lineTo(23.3, py + 0.28);
        c.closePath();
        c.fill();
        // yay etiketi
        D.text(c, t("springN", { n: st.n }), 31.5, TOP + 0.5, { size: 1.1, color: S.colors.muted, base: "middle" });
        // elle tutma
        if (st.hold != null) {
          const yb = st.m > 0 ? hy + 0.9 + 8.5 + 0.4 : hy + 1;
          c.fillStyle = S.colors.dark ? "rgba(255,220,190,0.85)" : "rgba(214,160,120,0.95)";
          D.rr(c, 25.2, yb, 5.6, 2.2, 1);
          c.fill();
        }
      }

      const hit = (p) => Math.abs(p.x - 28) < 3.5 && p.y > hookY() && p.y < hookY() + (st.m > 0 ? 11 : 2);
      const stage = api.stage({
        world: [-2, 2, 50, 80], maxH: 660, lensZoom: 5.5, label: t("title"), draw, step,
        pointer: {
          down(p) {
            if (!hit(p) || st.m === 0) return false;
            st.drag = { dy: p.y - hookY() };
            st.hold = st.x;
            return true;
          },
          move(p) {
            if (!st.drag) return;
            const want = (p.y - st.drag.dy - TOP - sp().L0) / 100;
            st.hold = QBL.clamp(want, eq() - 0.06, eq() + 0.06);
          },
          up() { st.drag = null; st.hold = null; },
          cursor: (p) => (hit(p) && st.m > 0 ? "grab" : ""),
        },
      });

      // --- denetimler
      const massLbl = api.el("p", { class: "lab-note" });
      const showMass = () => { massLbl.textContent = t("mass", { m: st.m }); };
      function setMass(m) {
        m = QBL.clamp(m, 0, 500);
        if (m > 0 && m < HANGER) m = HANGER;
        if (m === st.m) return;
        st.m = m;
        st.hold = null;
        // kütle nazikçe eklenir: yeni dengeye yakın küçük bir salınımla başlar
        st.x = eq() + (0.003 + 0.002 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
        st.v = 0;
        showMass();
        save();
      }
      const springSeg = C.segment({
        label: t("spring"), value: st.n,
        options: [1, 2, 3].map((n) => ({ value: n, label: t("springN", { n }) })),
        onChange(v) { st.n = Number(v); st.hold = null; st.x = eq() + 0.002 * QBL.gauss(); st.v = 0; save(); },
      });
      showMass();
      const massBtns = C.buttons([
        { label: t("rem50"), onClick: () => setMass(st.m === HANGER ? 0 : st.m - 50) },
        { label: t("add50"), onClick: () => setMass(st.m === 0 ? HANGER : st.m + 50) },
        { label: t("add100"), onClick: () => setMass(st.m === 0 ? 100 : st.m + 100) },
        { label: t("remAll"), onClick: () => setMass(0) },
      ]);
      api.panel.append(C.group(t("setup"), springSeg.el, massLbl, massBtns, C.note(t("readNote"), "small")));

      const partBox = api.el("div", { class: "lab-side" });
      api.panel.append(partBox);
      const pullSl = C.slider({ label: t("pull"), min: 1, max: 5, step: 0.5, value: 3, digits: 1, unit: "cm" });
      const liftSl = C.slider({
        label: t("lift"), min: 0, max: 6, step: 0.1, value: 0, digits: 1, unit: "cm", show: false,
        onInput(v) { if (st.m === 0) return; st.hold = eq() - v / 100; st.lift = v; },
      });
      const sw = api.stopwatch({
        onRecord(sec) {
          if (st.m === 0) { api.status(t("noMass"), "bad"); return; }
          if (!(sec > 0)) { api.status(t("noTime"), "bad"); return; }
          api.record("T", sec, { match: { s: st.n, m: st.m }, group: ["n1", "n2", "n3"], raw: sec.toFixed(2) });
        },
      });
      function buildPart(p) {
        partBox.innerHTML = "";
        st.rider = p === "E" ? ptrY() : null;
        if (p === "T") {
          partBox.append(C.group(t("partT"), pullSl.el, C.buttons([{
            label: t("pullGo"), primary: true,
            onClick: () => { if (st.m === 0) { api.status(t("noMass"), "bad"); return; } st.hold = null; st.x = eq() + pullSl.value / 100; st.v = 0; },
          }])), sw.el);
        } else if (p === "E") {
          partBox.append(C.group(t("partE"), liftSl.el, C.buttons([
            { label: t("rider"), onClick: () => { st.rider = ptrY(); } },
            { label: t("release"), primary: true, onClick: () => { st.hold = null; st.v = 0; liftSl.value = 0; } },
            { label: t("newRow"), onClick: () => { if (st.m === 0) { api.status(t("noMass"), "bad"); return; } api.table("E").addRow({ s: st.n, m: st.m }, { s: String(st.n), m: String(st.m) }); } },
          ]), C.note(t("riderNote"), "small")));
        }
      }
      api.onPart(buildPart);
      return {};
    },

    selfTest() {
      const r = QBL.rng("yay-test");
      const k = 25, ms = 0.045;
      // Hooke: denge uzamaları + 0,5 mm okuma hatası
      const xs = [], ys = [];
      for (const m of [100, 200, 300, 400, 500]) {
        const dx = ((m / 1000) * G) / k * 100 + 0.05 * QBL.gauss(r);
        xs.push(dx); ys.push((m / 1000) * gN);
      }
      const f = QBL.fitProp(xs, ys);
      // periyot: T² = 4π²(m + ms/3)/k, 10T'de 0,15 s insan hatası
      const xm = [], yt = [];
      for (const m of [100, 200, 300, 400]) {
        const T = 2 * Math.PI * Math.sqrt((m / 1000 + ms / 3) / k);
        const T10 = 10 * T + 0.1 * QBL.gauss(r);
        xm.push(m / 1000); yt.push((T10 / 10) ** 2);
      }
      const ft = QBL.fitLine(xm, yt);
      return [
        { name: "k (Hooke)", value: f.a * 100, expected: k, tol: 0.03 },
        { name: "k (periyot)", value: (4 * Math.PI ** 2) / ft.a, expected: k, tol: 0.05 },
      ];
    },
  };
  QBL.register(def);
})();
