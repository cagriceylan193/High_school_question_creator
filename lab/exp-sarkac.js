// Deney 5 – Basit ve tersinir sarkaç: g'nin bulunması (kronometre ya da fotosel)
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const PX = 40, PY = 8;        // asılma noktası (cm)
  const BAR = { L: 100, W: 3.2, M: 1.2 };
  const HOLES = [5, 10, 15, 20, 25, 30, 35, 40, 45];

  const text = {
    tr: {
      kicker: "Deney 5",
      title: "Basit ve tersinir sarkaç",
      short: "Farklı uzunluktaki sarkaçların periyodunu kronometreyle ölç; l–τ² grafiğinden ve tersinir sarkaçtan g'yi bul.",
      tools: "Sarkaç · metre · kumpas · kronometre · fotosel",
      aim: "Basit ve tersinir (fiziksel) sarkaç yardımıyla yer çekimi ivmesi g'yi bulmak.",
      theory: `<p>Hafif bir ipe asılı küçük bir kütle, denge konumundan küçük bir açıyla (≈ 5°) saptırılıp bırakılırsa basit harmonik hareket yapar. Küçük açılar için sin θ ≈ θ olduğundan periyot</p>
<p class="eq">τ = 2π · √(l / g)    →    g = 4π² · l / τ²</p>
<p>Burada l, asılma noktasından kütlenin merkezine olan uzaklıktır: ipin ölçülen boyu L'ye kürenin yarıçapı r eklenir (l = L + r). l–τ² grafiğinin eğimi g/(4π²)'dir. Bağıl hata: Δg/g = Δl/l + 2·Δτ/τ. Hatayı azaltmak için tek periyot yerine 10 periyotluk süre ölçülür.</p>
<p><b>Tersinir sarkaç</b>, ağırlık merkezinden (G) geçmeyen bir eksenden asılan katı bir cisimdir. G'den h uzaklıktaki bir delikten asılan çubuğun periyodu</p>
<p class="eq">τ = 2π · √((k² + h²) / (g · h))</p>
<p>k, çubuğun G'ye göre jirasyon yarıçapıdır. τ–h grafiği bir minimumu olan iki kollu bir eğridir. Aynı τ periyodunu veren iki uzaklık h₁ ve h₂ ise, bu periyot l = h₁ + h₂ uzunluğundaki basit sarkacın periyoduna eşittir: g = 4π² · (h₁ + h₂) / τ².</p>
<p>Büyük genliklerde periyot biraz uzar (sin θ ≈ θ yaklaşımı bozulur); kronometrede ise tepki süresinden kaynaklanan hata vardır.</p>`,
      steps: {
        basit: [
          "<b>Kumpas</b> görünümünde sarkaç kütlesinin çapını üç yerden ölç ve tabloya yaz.",
          "Düzenekte ipin boyunu ayarla. Asılma noktasından kürenin üst yüzeyine kadar olan L uzunluğunu metreden büyüteçle oku ve tablonun yeni satırına yaz.",
          "Başlangıç açısını yaklaşık 5° yapıp <b>Bırak</b>. Sarkaç denge konumundan aynı yönde geçerken kronometreyi başlat, 10 tam salınım sonra durdur ve tabloya yaz. Üç kez ölç.",
          "Beş farklı ip boyu için tekrarla. l–τ² grafiğinin eğiminden g'yi bul.",
          "İstersen fotoseli aç: sayaç 10 periyodun süresini kendisi ölçer; kronometre sonuçlarıyla karşılaştır.",
        ],
        tersinir: [
          "Çubuğun ağırlık merkezi (G) işaretlidir; delikler G'den 5 cm aralıklıdır. Bir taraf ve delik seç: çubuk o delikten bıçak ağzına asılır.",
          "Çubuğu küçük bir açıyla salındır; 10 periyodun süresini kronometreyle (ya da fotoselle) ölç ve tabloda o deliğin satırına yaz.",
          "Her iki taraftaki bütün delikler için tekrarla.",
          "τ–h grafiğinde yatay çizgiyi sürükle: aynı taraftaki iki kesişim h₁ ve h₂'yi verir. L = h₁ + h₂ ve g = 4π²L/τ² hesaplanır.",
        ],
      },
      basit: "Basit sarkaç",
      tersinir: "Tersinir sarkaç",
      view: "Görünüm",
      viewSetup: "Düzenek",
      viewCal: "Kumpas",
      len: "İpin boyunu ayarla",
      amp: "Başlangıç açısı",
      release: "Bırak",
      stop: "Durdur",
      gate: "Fotosel (10 periyot sayacı)",
      gateOn: "Fotoseli kullan",
      speed: "Zaman akışı (yalnız fotoselle)",
      side: "Taraf",
      left: "Sol", right: "Sağ",
      hole: "Delik (G'den uzaklık)",
      gateArm: "Sayacı kur",
      gateNote: "Sayaç kurulunca sarkaç ışından ilk geçişinde başlar, 10 periyot sonra durur.",
      tableR: "Sarkaç kütlesinin çapı (kumpas)",
      tableL: "Periyot ölçümleri",
      tableK: "Tersinir sarkaç",
      colPos: "Yer",
      gL: "l = f(τ²)",
      gK: "τ = f(h)",
      resR: "Kütlenin yarıçapı r",
      resG: "g (l–τ² eğiminden)",
      resGrow: "g (satır {n}: l = {l} cm)",
      resDg: "Satır {n} için bağıl hata Δg/g = Δl/l + 2Δτ/τ",
      resL: "Eşdeğer uzunluk L = h₁ + h₂ ({s})",
      resGk: "g (tersinir sarkaç, {s})",
      needR: "l = L + r için önce kütlenin çapını ölç.",
      needLine: "Yatay çizgiyi, aynı taraftaki eğriyi iki noktada kesecek biçimde sürükle.",
      recorded: "Çap: {v} mm kaydedildi.",
      close: "Kapat", open: "Aç", slideCal: "Sürgüyü kaydır",
      sideL: "sol", sideR: "sağ",
      notSwinging: "Önce sarkacı salındır.",
    },
    en: {
      kicker: "Experiment 5",
      title: "Simple and reversible pendulum",
      short: "Time pendulums of different lengths with a stopwatch; find g from the l–τ² graph and with a reversible pendulum.",
      tools: "Pendulum · metre stick · caliper · stopwatch · light gate",
      aim: "To determine the gravitational acceleration g with a simple pendulum and a reversible (physical) pendulum.",
      theory: `<p>A small mass on a light string, displaced by a small angle (≈ 5°) and released, performs simple harmonic motion. For small angles sin θ ≈ θ, so the period is</p>
<p class="eq">τ = 2π · √(l / g)    →    g = 4π² · l / τ²</p>
<p>Here l is the distance from the pivot to the centre of the mass: the measured string length L plus the radius r of the sphere (l = L + r). The slope of the l–τ² graph is g/(4π²). Relative error: Δg/g = Δl/l + 2·Δτ/τ. To reduce the error, time 10 periods instead of one.</p>
<p>A <b>reversible pendulum</b> is a rigid body hung from an axis that does not pass through its centre of mass G. Hung from a hole at distance h from G, a bar swings with period</p>
<p class="eq">τ = 2π · √((k² + h²) / (g · h))</p>
<p>k is the radius of gyration about G. The τ–h graph is a two-branched curve with a minimum. If two distances h₁ and h₂ give the same period τ, this period equals that of a simple pendulum of length l = h₁ + h₂: g = 4π² · (h₁ + h₂) / τ².</p>
<p>At large amplitudes the period gets slightly longer (sin θ ≈ θ no longer holds); the stopwatch adds an error due to reaction time.</p>`,
      steps: {
        basit: [
          "In the <b>Caliper</b> view, measure the diameter of the bob at three places and enter it.",
          "In the apparatus, set the string length. Read the length L from the pivot to the top of the sphere on the metre stick with the magnifier and enter it in a new row.",
          "Set the starting angle to about 5° and press <b>Release</b>. Start the stopwatch as the bob passes the centre in one direction, stop it after 10 full swings and write it to the table. Measure three times.",
          "Repeat for five string lengths. Find g from the slope of the l–τ² graph.",
          "If you like, switch on the light gate: the counter times 10 periods itself; compare with your stopwatch results.",
        ],
        tersinir: [
          "The centre of mass G of the bar is marked; the holes are 5 cm apart from G. Choose a side and a hole: the bar hangs from that hole on a knife edge.",
          "Let the bar swing through a small angle; time 10 periods with the stopwatch (or the light gate) and enter it in that hole's row.",
          "Repeat for all holes on both sides.",
          "Drag the horizontal line on the τ–h graph: the two crossings on one side give h₁ and h₂. Then L = h₁ + h₂ and g = 4π²L/τ².",
        ],
      },
      basit: "Simple pendulum",
      tersinir: "Reversible pendulum",
      view: "View",
      viewSetup: "Apparatus",
      viewCal: "Caliper",
      len: "Set the string length",
      amp: "Starting angle",
      release: "Release",
      stop: "Stop",
      gate: "Light gate (10-period counter)",
      gateOn: "Use the light gate",
      speed: "Time speed (light gate only)",
      side: "Side",
      left: "Left", right: "Right",
      hole: "Hole (distance from G)",
      gateArm: "Arm counter",
      gateNote: "Once armed, the counter starts when the pendulum first crosses the beam and stops after 10 periods.",
      tableR: "Diameter of the bob (caliper)",
      tableL: "Period measurements",
      tableK: "Reversible pendulum",
      colPos: "Place",
      gL: "l = f(τ²)",
      gK: "τ = f(h)",
      resR: "Radius of the bob r",
      resG: "g (from the l–τ² slope)",
      resGrow: "g (row {n}: l = {l} cm)",
      resDg: "Relative error for row {n}: Δg/g = Δl/l + 2Δτ/τ",
      resL: "Equivalent length L = h₁ + h₂ ({s})",
      resGk: "g (reversible pendulum, {s})",
      needR: "For l = L + r, measure the diameter of the bob first.",
      needLine: "Drag the horizontal line so that it crosses the curve of one side twice.",
      recorded: "Diameter: {v} mm saved.",
      close: "Close", open: "Open", slideCal: "Slide the jaw",
      sideL: "left", sideR: "right",
      notSwinging: "Set the pendulum swinging first.",
    },
    de: {
      kicker: "Versuch 5",
      title: "Faden- und Reversionspendel",
      short: "Miss die Periode verschieden langer Pendel mit der Stoppuhr; bestimme g aus dem l–τ²-Diagramm und mit dem Reversionspendel.",
      tools: "Pendel · Maßstab · Messschieber · Stoppuhr · Lichtschranke",
      aim: "Die Fallbeschleunigung g mit einem Fadenpendel und einem Reversionspendel (physischen Pendel) bestimmen.",
      theory: `<p>Eine kleine Masse an einem leichten Faden, um einen kleinen Winkel (≈ 5°) ausgelenkt und losgelassen, schwingt harmonisch. Für kleine Winkel gilt sin θ ≈ θ, daher</p>
<p class="eq">τ = 2π · √(l / g)    →    g = 4π² · l / τ²</p>
<p>l ist der Abstand vom Aufhängepunkt zum Mittelpunkt der Masse: gemessene Fadenlänge L plus Kugelradius r (l = L + r). Die Steigung des l–τ²-Diagramms ist g/(4π²). Relativer Fehler: Δg/g = Δl/l + 2·Δτ/τ. Um den Fehler zu verringern, misst man 10 Perioden statt einer.</p>
<p>Ein <b>Reversionspendel</b> ist ein starrer Körper, der an einer Achse hängt, die nicht durch seinen Schwerpunkt G geht. Hängt ein Stab an einem Loch im Abstand h von G, schwingt er mit</p>
<p class="eq">τ = 2π · √((k² + h²) / (g · h))</p>
<p>k ist der Trägheitsradius bezüglich G. Das τ–h-Diagramm ist eine zweiästige Kurve mit Minimum. Liefern zwei Abstände h₁ und h₂ dieselbe Periode τ, so ist sie gleich der eines Fadenpendels der Länge l = h₁ + h₂: g = 4π² · (h₁ + h₂) / τ².</p>
<p>Bei großen Amplituden wird die Periode etwas länger (sin θ ≈ θ gilt nicht mehr); die Stoppuhr bringt einen Reaktionszeitfehler mit sich.</p>`,
      steps: {
        basit: [
          "In der Ansicht <b>Messschieber</b> den Kugeldurchmesser an drei Stellen messen und eintragen.",
          "Im Aufbau die Fadenlänge einstellen. Die Länge L vom Aufhängepunkt bis zur Kugeloberkante mit der Lupe am Maßstab ablesen und in eine neue Zeile eintragen.",
          "Startwinkel etwa 5° wählen und <b>Loslassen</b>. Stoppuhr beim Durchgang durch die Ruhelage in einer Richtung starten, nach 10 vollen Schwingungen stoppen und eintragen. Dreimal messen.",
          "Für fünf Fadenlängen wiederholen. g aus der Steigung des l–τ²-Diagramms bestimmen.",
          "Optional die Lichtschranke einschalten: Der Zähler misst 10 Perioden selbst; vergleiche mit der Stoppuhr.",
        ],
        tersinir: [
          "Der Schwerpunkt G des Stabes ist markiert; die Löcher liegen in 5-cm-Abständen von G. Wähle Seite und Loch: Der Stab hängt mit diesem Loch auf einer Schneide.",
          "Lass den Stab mit kleinem Winkel schwingen; miss 10 Perioden mit der Stoppuhr (oder Lichtschranke) und trage sie in die Zeile dieses Lochs ein.",
          "Für alle Löcher beider Seiten wiederholen.",
          "Ziehe die waagerechte Linie im τ–h-Diagramm: Die beiden Schnittpunkte einer Seite liefern h₁ und h₂. Dann L = h₁ + h₂ und g = 4π²L/τ².",
        ],
      },
      basit: "Fadenpendel",
      tersinir: "Reversionspendel",
      view: "Ansicht",
      viewSetup: "Aufbau",
      viewCal: "Messschieber",
      len: "Fadenlänge einstellen",
      amp: "Startwinkel",
      release: "Loslassen",
      stop: "Anhalten",
      gate: "Lichtschranke (Zähler für 10 Perioden)",
      gateOn: "Lichtschranke verwenden",
      speed: "Zeitablauf (nur mit Lichtschranke)",
      side: "Seite",
      left: "Links", right: "Rechts",
      hole: "Loch (Abstand von G)",
      gateArm: "Zähler scharf schalten",
      gateNote: "Scharf geschaltet startet der Zähler beim ersten Durchgang durch den Strahl und stoppt nach 10 Perioden.",
      tableR: "Kugeldurchmesser (Messschieber)",
      tableL: "Periodenmessungen",
      tableK: "Reversionspendel",
      colPos: "Stelle",
      gL: "l = f(τ²)",
      gK: "τ = f(h)",
      resR: "Kugelradius r",
      resG: "g (aus der l–τ²-Steigung)",
      resGrow: "g (Zeile {n}: l = {l} cm)",
      resDg: "Relativer Fehler für Zeile {n}: Δg/g = Δl/l + 2Δτ/τ",
      resL: "Äquivalente Länge L = h₁ + h₂ ({s})",
      resGk: "g (Reversionspendel, {s})",
      needR: "Für l = L + r zuerst den Kugeldurchmesser messen.",
      needLine: "Ziehe die waagerechte Linie so, dass sie die Kurve einer Seite zweimal schneidet.",
      recorded: "Durchmesser: {v} mm gespeichert.",
      close: "Schließen", open: "Öffnen", slideCal: "Schieber bewegen",
      sideL: "links", sideR: "rechts",
      notSwinging: "Bring das Pendel zuerst zum Schwingen.",
    },
  };

  const rOf = (api) => { const v = api.table("r").values("d"); return v.length ? QBL.mean(v) / 20 : null; }; // cm
  const T3 = ["n1", "n2", "n3"];
  const def = {
    id: "sarkac",
    order: 50,
    text,
    parts: [
      {
        id: "basit", title: "basit",
        tables: [
          { id: "r", title: () => QBL.tx(def, "tableR"), columns: [{ key: "p", label: () => QBL.tx(def, "colPos"), fixed: true }, { key: "d", label: "2r (mm)", input: true }], rows: [1, 2, 3].map((p) => ({ p, $p: String(p) })), fixedRows: true },
          {
            id: "L", title: () => QBL.tx(def, "tableL"),
            columns: [
              { key: "L", label: "L (cm)", input: true },
              { key: "l", label: "l = L + r (cm)", calc: (r, tb) => { const rr = rOf(tb.ctx.api); return r.L == null || rr == null ? null : r.L + rr; }, digits: 2 },
              ...T3.map((k, i) => ({ key: k, label: `10τ${"₁₂₃"[i]} (s)`, input: true })),
              { key: "tau", label: "τ̄ (s)", calc: (r, tb) => { const a = tb.avg(r, T3); return a == null ? null : a / 10; }, digits: 3 },
              { key: "tau2", label: "τ̄² (s²)", calc: (r, tb) => { const a = tb.avg(r, T3); return a == null ? null : (a / 10) ** 2; }, digits: 4 },
            ],
            minRows: 1,
          },
        ],
        graphs: [{ id: "gl", title: () => QBL.tx(def, "gL"), x: { key: "tau2", label: "τ̄² (s²)" }, y: { key: "l", label: "l (cm)" }, series: [{ table: "L", name: "" }], fit: "prop", fits: ["prop", "line"], slopeUnit: "cm/s²" }],
        results(c) {
          const out = [];
          const rr = rOf(c.api);
          if (rr != null) out.push({ label: c.t("resR"), value: rr * 10, err: 0.025, unit: "mm" });
          else out.push({ text: c.t("needR") });
          const f = c.fit("gl");
          if (f) out.push({ label: c.t("resG"), value: (4 * Math.PI ** 2 * f.a) / 100, err: (4 * Math.PI ** 2 * f.sa) / 100, unit: "m/s²", ref: 9.81 });
          const tb = c.table("L");
          tb.rows.forEach((r, i) => {
            const l = tb.get(r, "l"), vals = T3.map((k) => tb.get(r, k)).filter((v) => v != null);
            if (l == null || !vals.length) return;
            const tau = QBL.mean(vals) / 10;
            const g = (4 * Math.PI ** 2 * (l / 100)) / tau ** 2;
            const dtau = Math.max(vals.length > 1 ? QBL.meanDev(vals) : 0, 0.2) / 10; // 10τ'da en az 0,2 s tepki hatası
            const rel = 0.2 / l + (2 * dtau) / tau;
            out.push({ label: c.t("resGrow", { n: i + 1, l: QBL.fixed(l, 1) }), value: g, err: g * rel, unit: "m/s²" });
          });
          return out;
        },
      },
      {
        id: "tersinir", title: "tersinir",
        tables: [{
          id: "K", title: () => QBL.tx(def, "tableK"),
          columns: [
            { key: "h", label: "h (cm)", input: true },
            { key: "Ls", label: "10τ sol (s)", input: true },
            { key: "tL", label: "τ sol (s)", calc: (r) => (r.Ls != null ? r.Ls / 10 : null), digits: 3 },
            { key: "Rs", label: "10τ sağ (s)", input: true },
            { key: "tR", label: "τ sağ (s)", calc: (r) => (r.Rs != null ? r.Rs / 10 : null), digits: 3 },
          ],
          rows: HOLES.map((h) => ({ h, $h: String(h) })),
        }],
        graphs: [{
          id: "gk", title: () => QBL.tx(def, "gK"), x: { key: "h", label: "h (cm)" }, y: { key: "tL", label: "τ (s)" },
          series: [
            { table: "K", name: () => QBL.tx(def, "left"), x: { get: (r) => (r.h != null ? -r.h : null) }, y: { key: "tL" } },
            { table: "K", name: () => QBL.tx(def, "right"), x: { key: "h" }, y: { key: "tR" } },
          ],
          fit: "none", fits: ["none"], connect: true, hline: true,
        }],
        results(c) {
          const g = c.graph("gk");
          const out = [];
          const tau = g.hy;
          [[0, "sideL"], [1, "sideR"]].forEach(([i, sk]) => {
            const xs = g.crossings(i).map(Math.abs);
            if (xs.length >= 2 && tau) {
              const L = xs[0] + xs[1];
              out.push({ label: c.t("resL", { s: c.t(sk) }), value: L, unit: "cm", digits: 1 });
              out.push({ label: c.t("resGk", { s: c.t(sk) }), value: (4 * Math.PI ** 2 * (L / 100)) / tau ** 2, unit: "m/s²", digits: 3, ref: 9.81 });
            }
          });
          if (!out.length) out.push({ text: c.t("needLine") });
          return out;
        },
      },
    ],

    mount(api) {
      const { C, t, mem } = api;
      const bobD = QBL.between(api.rng, 2.4, 3.0);           // cm
      const bobDs = [0, 1, 2].map(() => bobD * 10 + 0.01 * QBL.gauss(api.rng)); // mm
      const asym = QBL.between(api.rng, 0.15, 0.4);           // çubuktaki küçük bakışımsızlık (cm, G kayması)
      const st = {
        part: api.part, view: mem.view || "setup",
        L: mem.L ?? QBL.between(api.rng, 55, 70),             // ip boyu (cm, küre üstüne kadar)
        th: 0, w: 0, amp: mem.amp ?? 5, hold: null,
        side: mem.side || "R", hole: mem.hole || 5,
        gate: !!mem.gate, speed: 1, ctr: { armed: false, run: false, n: 0, t0: 0, val: null, lastSign: 0, tLast: 0 },
        drag: false, time: 0,
      };
      const cal = QBL.Gauge.caliper({ s: 40 });
      const save = () => Object.assign(mem, { view: st.view, L: st.L, amp: st.amp, side: st.side, hole: st.hole, gate: st.gate });

      // fiziksel model
      function params() {
        if (st.part === "basit") {
          const r = bobD / 200, l = st.L / 100 + r, m = 0.25;
          return { d: l, I: m * l * l + 0.4 * m * r * r, m };
        }
        // çubuk: G'den hole (nominal) + bakışımsızlık
        const h = (st.hole + (st.side === "R" ? asym : -asym)) / 100;
        const Icm = (BAR.M * ((BAR.L / 100) ** 2 + (BAR.W / 100) ** 2)) / 12;
        return { d: h, I: Icm + BAR.M * h * h, m: BAR.M };
      }
      function step(dt0) {
        const dt = dt0 * (st.gate ? st.speed : 1);
        if (st.hold != null) { st.th = st.hold; st.w = 0; return; }
        const p = params();
        const k = (p.m * G * p.d) / p.I, gam = 1 / 150;
        const n = Math.max(1, Math.ceil(dt / 0.002));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          const prev = st.th;
          st.w += (-k * Math.sin(st.th) - 2 * gam * st.w) * h;
          st.th += st.w * h;
          st.time += h;
          // fotosel: denge konumundan soldan sağa geçiş (bir periyotta bir kez)
          if (prev < 0 && st.th >= 0) {
            const tc = st.time - h + (h * -prev) / (st.th - prev);
            const ctr = st.ctr;
            if (ctr.armed && !ctr.run) { ctr.run = true; ctr.t0 = tc; ctr.n = 0; }
            else if (ctr.run) {
              ctr.n++;
              if (ctr.n >= 10) { ctr.run = false; ctr.armed = false; ctr.val = Math.round((tc - ctr.t0) * 1e3) / 1e3; lcd.set(ctr.val.toFixed(3)); }
            }
          }
        }
        if (st.ctr.run) lcd.set((st.time - st.ctr.t0).toFixed(3));
      }

      function drawSetup(c, S) {
        D.wall(c, S);
        // tavan kirişi ve sehpa
        c.fillStyle = D.metal(c, 0, 2, 0, 6, "dark");
        c.fillRect(8, 3.6, 64, 3.2);
        D.rodV(c, 70, 6.8, S.view.y1, 1.4);
        // metre (sol)
        D.ruler(c, { x: 33.5, y: PY, len: 120, dir: "v", side: "right", w: 2.6, px: S.px, every: 1, fontSize: 0.75 });
        if (st.part === "basit") {
          const p = params();
          const l = p.d * 100;
          const bx = PX + l * Math.sin(st.th), by = PY + l * Math.cos(st.th);
          const rr = bobD / 2;
          // asılma kıskacı
          c.fillStyle = "#30363d";
          c.fillRect(PX - 1.2, PY - 1.2, 2.4, 1.4);
          D.string(c, [[PX, PY], [bx - rr * Math.sin(st.th), by - rr * Math.cos(st.th)]], S.colors.string, 0.07);
          D.ball(c, bx, by, rr, "brass");
          // fotosel
          if (st.gate) D.photogate(c, PX, PY + l, { s: 0.9, gap: 6, arm: 4, blocked: Math.abs(bx - PX) < rr, dir: "v" });
        } else {
          // tersinir sarkaç çubuğu
          const h = params().d * 100;
          c.save();
          c.translate(PX, PY);
          c.rotate(-st.th);
          // asıldığı delik pivotta; geometrik merkez C pivotun 'hole' cm altında, G ise h kadar altında
          const C0 = st.hole, top = C0 - BAR.L / 2, gY = h;
          c.fillStyle = D.metal(c, -BAR.W / 2, 0, BAR.W / 2, 0, "alu");
          D.rr(c, -BAR.W / 2, top, BAR.W, BAR.L, 0.6);
          c.fill();
          c.strokeStyle = "rgba(0,0,0,0.35)";
          c.lineWidth = S.px;
          c.stroke();
          for (const k of HOLES) for (const sgn of [-1, 1]) {
            c.fillStyle = "#1c2025";
            c.beginPath();
            c.arc(0, C0 + sgn * k, 0.55, 0, Math.PI * 2);
            c.fill();
          }
          // G işareti
          c.strokeStyle = "#c62828";
          c.lineWidth = 0.12;
          c.beginPath();
          c.moveTo(-BAR.W / 2, gY); c.lineTo(BAR.W / 2, gY);
          c.stroke();
          D.text(c, "G", BAR.W / 2 + 0.6, gY, { size: 1.4, color: "#c62828", base: "middle", weight: 600 });
          c.restore();
          // bıçak ağzı
          c.fillStyle = "#2a2f35";
          c.beginPath();
          c.moveTo(PX - 2, PY - 1.5); c.lineTo(PX + 2, PY - 1.5); c.lineTo(PX, PY + 0.3);
          c.closePath();
          c.fill();
          if (st.gate) D.photogate(c, PX, PY + st.hole + BAR.L / 2 - 1.5, { s: 0.9, gap: 7, arm: 4, dir: "v", blocked: Math.abs(st.th) < 0.02 });
        }
        if (st.hold != null && st.part === "basit") D.text(c, QBL.fixed(Math.abs(st.hold * 180 / Math.PI), 0) + "°", PX + 3, PY + 6, { size: 1.6, color: S.colors.muted });
      }
      function drawCal(c, S) {
        D.wall(c, S);
        const v = S.view;
        c.fillStyle = S.colors.dark ? "#22302a" : "#dfe7e0";
        c.fillRect(v.x0, v.y0, v.x1 - v.x0, v.y1 - v.y0);
        cal.draw(c, S);
      }
      const draw = (c, S) => (st.view === "cal" ? drawCal(c, S) : drawSetup(c, S));
      const WB = [10, 0, 80, 132], WT = [-6, -50, 86, 104];
      const WS = () => (st.part === "basit" ? WB : WT);
      const bobPos = () => { const l = params().d * 100; return { x: PX + l * Math.sin(st.th), y: PY + l * Math.cos(st.th) }; };
      const stage = api.stage({
        world: st.view === "cal" ? cal.world : WS(), maxH: 700, lensZoom: 6, label: t("title"), draw, step,
        pointer: {
          down(p) {
            if (st.view === "cal") { if (cal.hit(p)) { cal.drag(p, true); st.drag = "cal"; return true; } return false; }
            const b = bobPos();
            if (st.part === "basit" ? Math.hypot(p.x - b.x, p.y - b.y) < 3 : Math.abs(p.x - b.x) < 6 && p.y > PY + 10) { st.drag = "bob"; st.hold = st.th; return true; }
            return false;
          },
          move(p) {
            if (st.drag === "cal") { cal.drag(p, false); gp.sync(); return; }
            if (st.drag === "bob") st.hold = QBL.clamp(Math.atan2(p.x - PX, p.y - PY), -0.45, 0.45);
          },
          up() { if (st.drag === "bob") { st.hold = null; st.w = 0; } st.drag = false; },
          cursor: (p) => { if (st.view === "cal") return cal.hit(p) ? "ew-resize" : ""; const b = bobPos(); return Math.hypot(p.x - b.x, p.y - b.y) < 3 ? "grab" : ""; },
        },
      });

      // --- denetimler
      const lcd = C.lcd({ label: t("gate"), cells: 6, unit: "s", value: "0.000" });
      lcd.set("0.000");
      const sw = api.stopwatch({ onRecord: (sec) => recordTime(sec, sec.toFixed(2)) });
      function recordTime(v, raw) {
        if (st.part === "basit") api.record("L", v, { group: T3, raw });
        else api.record("K", v, { match: { h: st.hole }, group: [st.side === "R" ? "Rs" : "Ls"], raw });
      }
      const ampSl = C.slider({ label: t("amp"), min: 2, max: 25, step: 1, value: st.amp, digits: 0, unit: "°", onInput(v) { st.amp = v; save(); } });
      const lenSl = C.slider({ label: t("len"), min: 25, max: 110, step: 0.1, value: st.L, show: false, fine: [-1, -0.1, 0.1, 1], fineLabel: (d) => (d >= 1 ? "1 cm" : "1 mm"), onInput(v) { st.L = v; st.th = 0; st.w = 0; save(); } });
      const relBtns = C.buttons([
        { label: t("release"), primary: true, onClick: () => { st.hold = null; st.th = (st.amp * Math.PI) / 180; st.w = 0; } },
        { label: t("stop"), onClick: () => { st.hold = null; st.th = 0; st.w = 0; } },
      ]);
      const gateChk = C.check({ label: t("gateOn"), value: st.gate, onChange(v) { st.gate = v; save(); gateBox.hidden = !v; } });
      const speedSeg = C.segment({ label: t("speed"), value: 1, options: [{ value: 1, label: "×1" }, { value: 5, label: "×5" }], onChange(v) { st.speed = Number(v); } });
      const gateBox = api.el("div", { class: "lab-side" }, lcd.el,
        C.buttons([{ label: t("gateArm"), onClick: () => { st.ctr = { armed: true, run: false, n: 0, t0: 0, val: null }; lcd.set("0.000"); } }, { label: api.tg("labRecord"), onClick: () => { if (st.ctr.val) recordTime(st.ctr.val, st.ctr.val.toFixed(3)); } }]),
        speedSeg.el, C.note(t("gateNote"), "small"));
      gateBox.hidden = !st.gate;

      const sideSeg = C.segment({ label: t("side"), value: st.side, options: [{ value: "L", label: t("left") }, { value: "R", label: t("right") }], onChange(v) { st.side = v; st.th = 0; st.w = 0; save(); } });
      const holeSeg = C.segment({ label: t("hole"), value: st.hole, options: HOLES.map((h) => ({ value: h, label: h + " cm" })), onChange(v) { st.hole = Number(v); st.th = 0; st.w = 0; save(); } });

      const gp = QBL.Gauge.panel(api, cal, {
        title: t("viewCal"), slideLabel: t("slideCal"), closeLabel: t("close"), openLabel: t("open"),
        onRecord(v, raw) {
          const tb = api.table("r");
          const i = tb.rows.findIndex((r) => r.d == null);
          tb.set(i < 0 ? 2 : i, { d: v }, { d: String(raw).trim().replace(",", ".") });
          api.status(t("recorded", { v: QBL.fixed(v, 2) }), "ok");
        },
      });
      cal.setObject({ shape: "circle", size: bobDs[0], tone: "brass" }, "outer");
      cal.open();
      gp.sync();

      const viewSeg = C.segment({
        label: t("view"), value: st.view, options: [{ value: "setup", label: t("viewSetup") }, { value: "cal", label: t("viewCal") }],
        onChange(v) { st.view = v; save(); stage.setWorld(v === "cal" ? cal.world : WS()); layout(); },
      });
      const viewBox = C.group("", viewSeg.el);
      const setupBox = C.group(t("viewSetup"), lenSl.el, ampSl.el, relBtns);
      const barBox = C.group(t("tersinir"), sideSeg.el, holeSeg.el);
      const timeBox = api.el("div", { class: "lab-side" }, sw.el, C.group(t("gate"), gateChk.el, gateBox));
      api.panel.append(viewBox, setupBox, barBox, gp.el, timeBox);
      function layout() {
        const basit = st.part === "basit";
        viewBox.hidden = !basit;
        if (!basit && st.view === "cal") st.view = "setup";
        stage.setWorld(st.view === "cal" ? cal.world : WS());
        const calV = basit && st.view === "cal";
        gp.el.hidden = !calV;
        setupBox.hidden = calV;
        timeBox.hidden = calV;
        lenSl.el.hidden = !basit;
        barBox.hidden = basit || calV;
        if (!basit) barBox.append(ampSl.el, relBtns);
        else setupBox.append(ampSl.el, relBtns);
      }
      api.onPart((p) => { st.part = p; st.th = 0; st.w = 0; st.hold = null; layout(); });
      layout();
      return {};
    },

    selfTest() {
      // küçük açıda fiziksel sarkaç periyodu ve tersinir sarkaçtan g
      const k2 = (1 + 0.032 ** 2) / 12;
      const T = (h) => 2 * Math.PI * Math.sqrt((k2 + h * h) / (G * h));
      // aynı periyodu veren iki h: h1·h2 = k² → L = h1 + h2
      const h1 = 0.15, h2 = k2 / h1;
      const tau = T(h1);
      return [
        { name: "tersinir: T(h1) = T(h2)", value: T(h2), expected: tau, tol: 1e-9 },
        { name: "tersinir g", value: (4 * Math.PI ** 2 * (h1 + h2)) / tau ** 2, expected: G, tol: 1e-9 },
      ];
    },
  };
  QBL.register(def);
})();
