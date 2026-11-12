// Deney 3 – Serbest düşme: elektromıknatıs, ışık kapısı ve dijital sayaç
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const RHO = 1.2, CD = 0.47;
  // r: yarıçap (cm), m: kütle (kg), hold: mıknatısın bilyeyi tutabildiği en düşük gerilim (V)
  const BALLS = { s: { r: 0.8, m: 0.0167, hold: 3.0 }, l: { r: 1.25, m: 0.0638, hold: 4.6 } };
  const T5 = ["a1", "a2", "a3", "a4", "a5"];

  // --- Model ---------------------------------------------------------------
  function delay(U, b, rnd) {
    const x = Math.max(0, U / b.hold - 1);
    return 0.0018 + 0.0085 * Math.pow(x, 0.8) + 0.00025 * QBL.gauss(rnd);
  }
  function vTerm(b) {
    const A = Math.PI * (b.r / 100) ** 2;
    return Math.sqrt((G * b.m) / (0.5 * RHO * CD * A));
  }
  const drop = (t, b) => { const v = vTerm(b); return ((v * v) / G) * Math.log(Math.cosh((G * t) / v)); }; // m
  const timeFor = (hm, b) => { const v = vTerm(b); return (v / G) * Math.acosh(Math.exp((G * hm) / (v * v))); };

  const text = {
    tr: {
      kicker: "Deney 3",
      title: "Serbest düşme",
      short: "Elektromıknatısla bırakılan bilyenin düşme süresini ışık kapısı ve sayaçla ölç; h–t² grafiğinden g'yi bul.",
      tools: "Elektromıknatıs · ışık kapısı · dijital sayaç",
      aim: "Serbest düşen bir bilyenin düşme süresini düşme yüksekliğine bağlı olarak ölçmek ve yer çekimi ivmesi g'yi bulmak.",
      theory: `<p>Hava direnci ihmal edilebildiğinde, durgun hâlden bırakılan bir cisim sabit g ivmesiyle düşer. t sürede aldığı yol:</p>
<p class="eq">h = ½ · g · t²</p>
<p>Bu nedenle h–t grafiği bir parabol, h–t² grafiği ise doğrudur. Doğrunun eğimi g/2'ye eşittir: <b>g = 2 × eğim</b>.</p>
<p>Sayaç, mıknatısın akımı kesildiği anda başlar; bilye ışık kapısının ışınını kestiğinde durur. Mıknatıs, akım kesildikten kısa bir süre sonra bilyeyi bırakır (artık mıknatıslanma). Bu gecikme gerilim büyüdükçe artar ve tüm sürelere neredeyse sabit bir ekleme yapar. Bu yüzden bilyeyi tutabilen en düşük gerilimi kullanın.</p>
<p>Ağır ve hafif bilyelerin düşme süreleri neredeyse aynıdır; düşme ivmesi kütleye bağlı değildir. Küçük farkların kaynağı hava direnci ve bırakma gecikmesidir.</p>`,
      steps: [
        "Bilyeyi seç ve <b>Bilyeyi tak</b> ile mıknatısa tak. Gerilimi, bilyeyi tutabilen en düşük değere indir.",
        "Cetveli kaydırarak sıfır çizgisini bilyenin alt ucuna hizala. Hizalamayı büyüteçle kontrol et.",
        "Işık kapısını tablodaki ilk yüksekliğe getir. Kapının okunu cetvelde büyüteçle oku.",
        "Tabloda o satırı seç, <b>Bırak</b> düğmesine bas ve sayacın gösterdiği süreyi <b>Tabloya yaz</b> ile kaydet.",
        "Her yükseklik için ölçümü beş kez tekrarla, sonra diğer yüksekliklere ve öbür bilyeye geç.",
        "h–t² grafiğinin eğiminden g'yi bul ve iki bilyenin sonuçlarını karşılaştır.",
      ],
      partMain: "Serbest düşme",
      ball: "Bilye",
      ballS: "Küçük (Ø 16 mm)",
      ballL: "Büyük (Ø 25 mm)",
      ballSShort: "küçük bilye",
      ballLShort: "büyük bilye",
      tableS: "Küçük bilye (Ø 16 mm, 16,7 g)",
      tableL: "Büyük bilye (Ø 25 mm, 63,8 g)",
      setup: "Düzenek",
      volt: "Mıknatıs gerilimi",
      gate: "Işık kapısını kaydır",
      ruler: "Cetveli kaydır",
      measure: "Ölçüm",
      attach: "Bilyeyi tak",
      release: "Bırak",
      counter: "Sayaç",
      counterNote: "Sayaç, mıknatısın akımı kesilince başlar ve bilye ışını kesince durur.",
      noHold: "Mıknatıs bu gerilimde bilyeyi tutamıyor; gerilimi artır.",
      dropped: "Gerilim çok düştü, bilye mıknatıstan kurtuldu.",
      attached: "Bilye mıknatısa takıldı.",
      notReady: "Önce bilyeyi mıknatısa tak.",
      noTime: "Sayaçta henüz ölçülmüş bir süre yok.",
      mismatch: "Dikkat: seçili satırdaki h değeri ışık kapısının konumuyla uyuşmuyor olabilir.",
      gHT: "h = f(t)",
      gHT2: "h = f(t²)",
      resG: "g ({b})",
      resDelay: "Bırakma gecikmesi t₀ ({b})",
      resDelayNote: "t₀, t̄ = t₀ + √(2h/g) doğrusunun (t̄–√h) kesiminden bulunur.",
    },
    en: {
      kicker: "Experiment 3",
      title: "Free fall",
      short: "Measure the fall time of a ball released by an electromagnet with a light gate and a counter; find g from the h–t² graph.",
      tools: "Electromagnet · light gate · digital counter",
      aim: "To measure the fall time of a freely falling ball as a function of the fall height and to determine the gravitational acceleration g.",
      theory: `<p>If air resistance can be neglected, an object released from rest falls with constant acceleration g. The distance fallen in time t is</p>
<p class="eq">h = ½ · g · t²</p>
<p>So the h–t graph is a parabola and the h–t² graph is a straight line whose slope equals g/2: <b>g = 2 × slope</b>.</p>
<p>The counter starts when the magnet current is switched off and stops when the ball interrupts the light beam. The magnet lets go of the ball a little after the current is cut (residual magnetism). This delay grows with the voltage and adds an almost constant amount to every time, so use the lowest voltage that still holds the ball.</p>
<p>Heavy and light balls take almost the same time: the acceleration of free fall does not depend on mass. Small differences come from air resistance and the release delay.</p>`,
      steps: [
        "Choose a ball and attach it to the magnet with <b>Attach ball</b>. Lower the voltage to the smallest value that still holds the ball.",
        "Slide the ruler so that its zero line is level with the bottom of the ball. Check with the magnifier.",
        "Move the light gate to the first height in the table. Read the gate's pointer on the ruler with the magnifier.",
        "Select that row in the table, press <b>Release</b> and save the time on the counter with <b>Write to table</b>.",
        "Repeat each height five times, then go on to the other heights and the other ball.",
        "Find g from the slope of the h–t² graph and compare the two balls.",
      ],
      partMain: "Free fall",
      ball: "Ball",
      ballS: "Small (Ø 16 mm)",
      ballL: "Large (Ø 25 mm)",
      ballSShort: "small ball",
      ballLShort: "large ball",
      tableS: "Small ball (Ø 16 mm, 16.7 g)",
      tableL: "Large ball (Ø 25 mm, 63.8 g)",
      setup: "Apparatus",
      volt: "Magnet voltage",
      gate: "Move the light gate",
      ruler: "Move the ruler",
      measure: "Measurement",
      attach: "Attach ball",
      release: "Release",
      counter: "Counter",
      counterNote: "The counter starts when the magnet current is cut and stops when the ball interrupts the beam.",
      noHold: "The magnet cannot hold the ball at this voltage; increase the voltage.",
      dropped: "The voltage dropped too far and the ball came off the magnet.",
      attached: "The ball is on the magnet.",
      notReady: "Attach the ball to the magnet first.",
      noTime: "There is no measured time on the counter yet.",
      mismatch: "Careful: the h value in the selected row may not match the position of the light gate.",
      gHT: "h = f(t)",
      gHT2: "h = f(t²)",
      resG: "g ({b})",
      resDelay: "Release delay t₀ ({b})",
      resDelayNote: "t₀ is the intercept of the line t̄ = t₀ + √(2h/g) (t̄ against √h).",
    },
    de: {
      kicker: "Versuch 3",
      title: "Freier Fall",
      short: "Miss die Fallzeit einer vom Elektromagneten losgelassenen Kugel mit Lichtschranke und Zähler; bestimme g aus dem h–t²-Diagramm.",
      tools: "Elektromagnet · Lichtschranke · Digitalzähler",
      aim: "Die Fallzeit einer frei fallenden Kugel in Abhängigkeit von der Fallhöhe messen und die Fallbeschleunigung g bestimmen.",
      theory: `<p>Wenn der Luftwiderstand vernachlässigbar ist, fällt ein aus der Ruhe losgelassener Körper mit konstanter Beschleunigung g. Der in der Zeit t zurückgelegte Weg ist</p>
<p class="eq">h = ½ · g · t²</p>
<p>Das h–t-Diagramm ist daher eine Parabel, das h–t²-Diagramm eine Gerade mit der Steigung g/2: <b>g = 2 × Steigung</b>.</p>
<p>Der Zähler startet, wenn der Magnetstrom abgeschaltet wird, und stoppt, wenn die Kugel den Lichtstrahl unterbricht. Der Magnet gibt die Kugel erst kurz nach dem Abschalten frei (Restmagnetismus). Diese Verzögerung wächst mit der Spannung und verlängert alle Zeiten um einen fast konstanten Betrag. Verwende daher die kleinste Spannung, die die Kugel noch hält.</p>
<p>Schwere und leichte Kugeln fallen fast gleich lange: Die Fallbeschleunigung hängt nicht von der Masse ab. Kleine Unterschiede entstehen durch Luftwiderstand und Auslöseverzögerung.</p>`,
      steps: [
        "Wähle eine Kugel und hänge sie mit <b>Kugel anhängen</b> an den Magneten. Senke die Spannung auf den kleinsten Wert, der die Kugel noch hält.",
        "Verschiebe das Lineal so, dass sein Nullstrich auf Höhe der Kugelunterkante liegt. Prüfe mit der Lupe.",
        "Stelle die Lichtschranke auf die erste Höhe der Tabelle. Lies ihren Zeiger am Lineal mit der Lupe ab.",
        "Wähle diese Tabellenzeile, drücke <b>Loslassen</b> und speichere die Zeit mit <b>In Tabelle eintragen</b>.",
        "Miss jede Höhe fünfmal, dann die übrigen Höhen und die andere Kugel.",
        "Bestimme g aus der Steigung des h–t²-Diagramms und vergleiche beide Kugeln.",
      ],
      partMain: "Freier Fall",
      ball: "Kugel",
      ballS: "Klein (Ø 16 mm)",
      ballL: "Groß (Ø 25 mm)",
      ballSShort: "kleine Kugel",
      ballLShort: "große Kugel",
      tableS: "Kleine Kugel (Ø 16 mm, 16,7 g)",
      tableL: "Große Kugel (Ø 25 mm, 63,8 g)",
      setup: "Aufbau",
      volt: "Magnetspannung",
      gate: "Lichtschranke verschieben",
      ruler: "Lineal verschieben",
      measure: "Messung",
      attach: "Kugel anhängen",
      release: "Loslassen",
      counter: "Zähler",
      counterNote: "Der Zähler startet beim Abschalten des Magnetstroms und stoppt, wenn die Kugel den Strahl unterbricht.",
      noHold: "Der Magnet kann die Kugel bei dieser Spannung nicht halten; erhöhe die Spannung.",
      dropped: "Die Spannung ist zu weit gesunken, die Kugel hat sich gelöst.",
      attached: "Die Kugel hängt am Magneten.",
      notReady: "Hänge zuerst die Kugel an den Magneten.",
      noTime: "Auf dem Zähler steht noch keine gemessene Zeit.",
      mismatch: "Achtung: Der h-Wert der gewählten Zeile passt womöglich nicht zur Lage der Lichtschranke.",
      gHT: "h = f(t)",
      gHT2: "h = f(t²)",
      resG: "g ({b})",
      resDelay: "Auslöseverzögerung t₀ ({b})",
      resDelayNote: "t₀ ist der Achsenabschnitt der Geraden t̄ = t₀ + √(2h/g) (t̄ gegen √h).",
    },
  };

  const cols = () => [
    { key: "h", label: "h (cm)", input: true },
    ...T5.map((k, i) => ({ key: k, label: `t${"₁₂₃₄₅"[i]} (s)`, input: true })),
    { key: "tm", label: "t̄ (s)", calc: (r, tb) => tb.avg(r, T5), digits: 4 },
    { key: "tq", label: "t̄² (s²)", calc: (r, tb) => { const m = tb.avg(r, T5); return m == null ? null : m * m; }, digits: 5 },
  ];
  const presetRows = [40, 35, 30, 25, 20, 15, 10, 5].map((h) => ({ h, $h: String(h) }));

  function delayFit(tb) {
    const xs = [], ys = [];
    for (const r of tb.rows) {
      const h = tb.get(r, "h"), tm = tb.get(r, "tm");
      if (h > 0 && tm != null) { xs.push(Math.sqrt(h / 100)); ys.push(tm); }
    }
    return xs.length >= 3 ? QBL.fitLine(xs, ys) : null;
  }

  const def = {
    id: "serbest-dusme",
    order: 30,
    text,
    parts: [{
      id: "main",
      title: "partMain",
      tables: [
        { id: "s", title: () => QBL.tx(def, "tableS"), columns: cols(), rows: presetRows },
        { id: "l", title: () => QBL.tx(def, "tableL"), columns: cols(), rows: presetRows },
      ],
      graphs: [
        { id: "ht", title: () => QBL.tx(def, "gHT"), x: { key: "tm", label: "t̄ (s)" }, y: { key: "h", label: "h (cm)" }, series: [{ table: "s", name: () => QBL.tx(def, "ballSShort") }, { table: "l", name: () => QBL.tx(def, "ballLShort") }], fit: "quad", fits: ["quad", "none"], zeroX: true, zeroY: true },
        { id: "ht2", title: () => QBL.tx(def, "gHT2"), x: { key: "tq", label: "t̄² (s²)" }, y: { key: "h", label: "h (cm)" }, series: [{ table: "s", name: () => QBL.tx(def, "ballSShort") }, { table: "l", name: () => QBL.tx(def, "ballLShort") }], fit: "line", fits: ["line", "prop"], zeroX: true, zeroY: true, slopeUnit: "cm/s²", interceptUnit: "cm" },
      ],
      results(c) {
        const out = [];
        [["s", 0, "ballSShort"], ["l", 1, "ballLShort"]].forEach(([tid, i, nk]) => {
          const f = c.fit("ht2", i);
          if (f) out.push({ label: c.t("resG", { b: c.t(nk) }), value: (2 * f.a) / 100, err: (2 * f.sa) / 100, unit: "m/s²", ref: 9.81, refText: "9,81" });
        });
        [["s", "ballSShort"], ["l", "ballLShort"]].forEach(([tid, nk]) => {
          const f = delayFit(c.table(tid));
          if (f) out.push({ label: c.t("resDelay", { b: c.t(nk) }), value: f.b * 1000, err: f.sb * 1000, unit: "ms" });
        });
        if (out.length > 2) out.push({ text: c.t("resDelayNote") });
        return out;
      },
    }],
    model: { delay, drop, timeFor, BALLS },

    mount(api) {
      const { C, t, mem } = api;
      const st = {
        ball: mem.ball || "s",
        U: mem.U ?? 7.5,
        gateY: mem.gateY ?? 54,
        rulerY: mem.rulerY ?? 11.6,
        state: "held",
        tt: 0, td: 0, tStop: 0,
        y: 0, // bilye merkezinin düşüşü (cm)
        counter: { t: 0, run: false, done: false },
        drag: null,
      };
      const MAG_Y = 13; // mıknatısın alt yüzü
      const BALL_X = 30;
      const FOAM = 69.5;
      const b = () => BALLS[st.ball];
      const bottom0 = () => MAG_Y + 2 * b().r;
      const save = () => { Object.assign(mem, { ball: st.ball, U: st.U, gateY: st.gateY, rulerY: st.rulerY }); };
      if (st.U < b().hold) st.state = "off";

      function draw(c, S) {
        D.wall(c, S, -2, -2, 66, 80);
        D.bench(c, S, -2, 66, 74, 4);
        // sehpa
        D.stand(c, 14, 74, 70, { baseW: 18, baseLeft: 0.45 });
        // mıknatıs kolu
        D.rodH(c, 14, 31, 9, 0.9);
        D.boss(c, 14, 9, 2.2);
        // mıknatıs
        c.fillStyle = D.metal(c, 28.2, 0, 31.8, 0, "dark");
        D.rr(c, 28.2, 9.4, 3.6, MAG_Y - 9.4, 0.3);
        c.fill();
        c.fillStyle = "#8b2a1f";
        c.fillRect(28.4, 10.1, 3.2, 1.9);
        c.fillStyle = D.metal(c, 28.6, 0, 31.4, 0);
        c.fillRect(28.6, MAG_Y - 0.5, 2.8, 0.5);
        // güç kaynağı ve kablolar
        drawSupply(c, S);
        c.strokeStyle = "#a12c22";
        c.lineWidth = 0.28;
        c.beginPath();
        c.moveTo(31.8, 10.6);
        c.bezierCurveTo(38, 10, 36, 50, 41, 62.5);
        c.stroke();
        c.strokeStyle = "#1d1f22";
        c.beginPath();
        c.moveTo(33, st.gateY + 0.4);
        c.bezierCurveTo(37, st.gateY + 2, 36, 46, 41, 41.5);
        c.stroke();
        // cetvel ve kıskaçları
        for (const k of [6, 46]) {
          D.rodH(c, 14.5, 24, st.rulerY + k, 0.6);
          D.boss(c, 14, st.rulerY + k, 1.6);
        }
        D.ruler(c, { x: 26, y: st.rulerY, len: 60, dir: "v", side: "right", w: 2.6, px: S.px, every: 1, fontSize: 0.85 });
        // ışık kapısı kolu (cetvelin arkasından geçer)
        D.boss(c, 14, st.gateY, 1.8);
        // kapı arka bağlantısı
        c.fillStyle = "#30353b";
        c.fillRect(27.4, st.gateY + 1.0, 5.6, 0.45);
        // yakalama kutusu (arka)
        c.fillStyle = "#3b3f45";
        c.fillRect(26.5, FOAM, 7, 74 - FOAM);
        c.fillStyle = "#1f6b45";
        c.fillRect(26.9, FOAM, 6.2, 0.9);
        // bilye
        const r = b().r;
        let by = MAG_Y + r + st.y;
        if (st.state === "off" || st.state === "landed") by = FOAM - r + 0.3;
        D.ball(c, BALL_X, by, r, "steel");
        // ışık kapısı (önde)
        const gy = st.gateY;
        const blocked = Math.abs(by - gy) < r && st.state !== "held";
        c.fillStyle = "#2b3138";
        D.rr(c, 27.1, gy - 1.0, 1.2, 2.4, 0.2);
        c.fill();
        D.rr(c, 31.7, gy - 1.0, 1.2, 2.4, 0.2);
        c.fill();
        D.rodH(c, 14.6, 27.1, gy + 0.2, 0.55);
        c.strokeStyle = blocked ? "rgba(255,40,30,0.25)" : "rgba(255,40,30,0.85)";
        c.lineWidth = 0.09;
        c.setLineDash([0.25, 0.2]);
        c.beginPath();
        c.moveTo(28.3, gy);
        c.lineTo(31.7, gy);
        c.stroke();
        c.setLineDash([]);
        D.led(c, 27.7, gy - 0.5, 0.18, blocked || st.counter.run, "#ff3b2f");
        // okuma oku (ışın yüksekliğinde)
        c.fillStyle = "#c62828";
        c.beginPath();
        c.moveTo(26.05, gy);
        c.lineTo(27.1, gy - 0.35);
        c.lineTo(27.1, gy + 0.35);
        c.closePath();
        c.fill();
        // sayaç
        const ms = st.counter.t * 1000;
        D.counter(c, 38, 30, 23, 12, ms >= 10000 ? "9999.9" : ms.toFixed(1), { cells: 5, label: "COUNTER  E→F", unit: "ms" });
      }
      function drawSupply(c, S) {
        const x = 39, y = 60, w = 17, h = 14;
        const g = c.createLinearGradient(0, y, 0, y + h);
        g.addColorStop(0, "#d9dde2");
        g.addColorStop(1, "#aab1b9");
        c.fillStyle = g;
        D.rr(c, x, y, w, h, 0.6);
        c.fill();
        c.fillStyle = "#c8322b";
        c.fillRect(x, y, w, 1.4);
        // kadran
        const cx = x + 6, cy = y + 7.6, R = 3.6;
        c.fillStyle = "#f6f4ec";
        c.beginPath();
        c.arc(cx, cy, R + 1.2, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = "#222";
        c.lineWidth = 0.08;
        c.font = D.font(0.75, 500);
        c.fillStyle = "#222";
        c.textAlign = "center";
        c.textBaseline = "middle";
        for (let v = 0; v <= 12; v++) {
          const a = (-225 + (v / 12) * 270) * (Math.PI / 180);
          c.beginPath();
          c.moveTo(cx + Math.cos(a) * (R + 0.2), cy + Math.sin(a) * (R + 0.2));
          c.lineTo(cx + Math.cos(a) * (R + (v % 2 ? 0.55 : 0.9)), cy + Math.sin(a) * (R + (v % 2 ? 0.55 : 0.9)));
          c.stroke();
          if (v % 2 === 0) c.fillText(String(v), cx + Math.cos(a) * (R - 0.8), cy + Math.sin(a) * (R - 0.8));
        }
        const a = (-225 + (st.U / 12) * 270) * (Math.PI / 180);
        D.knob(c, cx, cy, 1.6, a + Math.PI / 2);
        D.text(c, "U / V", cx, y + h - 0.9, { size: 0.8, color: "#333", align: "center", base: "middle" });
        // çıkış soketleri
        for (const [sx, colr] of [[x + 12.5, "#c62828"], [x + 14.6, "#222"]]) {
          c.fillStyle = colr;
          c.beginPath();
          c.arc(sx, y + 4.5, 0.65, 0, Math.PI * 2);
          c.fill();
        }
        D.led(c, x + 13.5, y + 9, 0.3, st.state === "held", "#2ecc40");
      }

      function step(dt) {
        if (st.state !== "fall") return;
        st.tt += dt;
        if (st.counter.run) {
          if (st.tt >= st.tStop) { st.counter.t = st.tStop; st.counter.run = false; st.counter.done = true; lcd.set(fmtMs(st.tStop)); }
          else { st.counter.t = st.tt; lcd.set(fmtMs(st.tt)); }
        }
        const tf = Math.max(0, st.tt - st.td);
        st.y = drop(tf, b()) * 100;
        if (MAG_Y + 2 * b().r + st.y >= FOAM + 0.3) { st.state = "landed"; st.y = 0; }
      }
      const fmtMs = (s) => (s * 1000).toFixed(1);

      // --- etkileşim
      const nearGate = (p) => p.x > 25 && p.x < 34 && Math.abs(p.y - st.gateY) < 1.8;
      const nearRuler = (p) => p.x > 23 && p.x < 26.4 && p.y > st.rulerY - 1 && p.y < st.rulerY + 61;
      const stage = api.stage({
        world: [-1, 2, 63, 78], maxH: 700, lensZoom: 6, label: t("title"),
        draw, step,
        pointer: {
          down(p) {
            if (nearGate(p)) { st.drag = { k: "gate", dy: p.y - st.gateY }; return true; }
            if (nearRuler(p)) { st.drag = { k: "ruler", dy: p.y - st.rulerY }; return true; }
            return false;
          },
          move(p) {
            if (!st.drag) return;
            if (st.drag.k === "gate") setGate(p.y - st.drag.dy);
            else setRuler(p.y - st.drag.dy);
          },
          up() { st.drag = null; save(); },
          cursor: (p) => (nearGate(p) || nearRuler(p) ? "ns-resize" : ""),
        },
      });

      function setGate(y) {
        st.gateY = QBL.clamp(y, bottom0() + 2, 67);
        gateSl.value = st.gateY;
        save();
      }
      function setRuler(y) {
        st.rulerY = QBL.clamp(y, 8, 20);
        rulerSl.value = st.rulerY;
        save();
      }

      // --- denetimler
      const ballSeg = C.segment({
        label: t("ball"), value: st.ball,
        options: [{ value: "s", label: t("ballS") }, { value: "l", label: t("ballL") }],
        onChange(v) {
          st.ball = v;
          st.state = st.U >= b().hold ? "held" : "off";
          st.y = 0;
          if (st.gateY < bottom0() + 2) setGate(bottom0() + 2);
          api.status(st.state === "held" ? t("attached") : t("noHold"), st.state === "held" ? "ok" : "bad");
          save();
        },
      });
      const voltSl = C.slider({
        label: t("volt"), min: 2, max: 12, step: 0.1, value: st.U, digits: 1, unit: "V", fine: [-0.1, 0.1],
        onInput(v) {
          st.U = v;
          if (st.state === "held" && v < b().hold) {
            st.state = "fall"; st.tt = 0; st.td = 0; st.counter.run = false; st.y = 0;
            api.status(t("dropped"), "bad");
          }
          save();
        },
      });
      const gateSl = C.slider({ label: t("gate"), min: 16, max: 67, step: 0.01, value: st.gateY, show: false, fine: [-1, -0.1, 0.1, 1], fineLabel: (d) => (d >= 1 ? "1 cm" : "1 mm"), onInput: (v) => setGate(v) });
      const rulerSl = C.slider({ label: t("ruler"), min: 8, max: 20, step: 0.01, value: st.rulerY, show: false, fine: [-0.1, 0.1], fineLabel: () => "1 mm", onInput: (v) => setRuler(v) });
      const lcd = C.lcd({ label: t("counter"), cells: 6, unit: "ms", value: fmtMs(st.counter.t) });
      lcd.set(fmtMs(st.counter.t));

      function attach() {
        if (st.U < b().hold) { st.state = "off"; api.status(t("noHold"), "bad"); return; }
        st.state = "held"; st.y = 0;
        api.status(t("attached"), "ok");
      }
      function release() {
        if (st.state !== "held") { api.status(t("notReady"), "bad"); return; }
        const h = (st.gateY - bottom0()) / 100;
        st.td = Math.max(0.0005, delay(st.U, b(), Math.random));
        const tf = timeFor(h, b());
        st.tStop = Math.round((st.td + tf + 0.00004 * QBL.gauss()) * 1e4) / 1e4;
        st.tt = 0; st.y = 0;
        st.counter = { t: 0, run: true, done: false };
        st.state = "fall";
        api.status("");
      }
      function record() {
        if (!st.counter.done) { api.status(t("noTime"), "bad"); return; }
        const tb = api.table(st.ball);
        const row = tb.rows[tb.active];
        const hTrue = st.gateY - bottom0();
        const sec = st.tStop;
        if (api.record(st.ball, sec, { group: T5, raw: sec.toFixed(4) })) {
          if (row && row.h != null && Math.abs(row.h - hTrue) > 1.2) api.status(t("mismatch"), "bad");
        }
      }

      api.panel.append(
        C.group(t("setup"), ballSeg.el, voltSl.el, gateSl.el, rulerSl.el),
        C.group(t("measure"),
          C.buttons([{ label: t("attach"), onClick: attach }, { label: t("release"), onClick: release, primary: true }]),
          lcd.el,
          C.buttons([{ label: api.tg("labRecord"), onClick: record }]),
          C.note(t("counterNote"), "small")));
      return {};
    },

    // Fizik doğrulaması (tools/lab-test.js)
    selfTest() {
      const r = QBL.rng("sd-test");
      const res = [];
      for (const key of ["s", "l"]) {
        const bb = BALLS[key];
        const xs = [], ys = [];
        for (const h of [40, 35, 30, 25, 20, 15, 10, 5]) {
          const ts = [];
          for (let k = 0; k < 5; k++) ts.push(delay(bb.hold * 1.05, bb, r) + timeFor(h / 100, bb));
          const tm = QBL.mean(ts);
          xs.push(tm * tm); ys.push(h);
        }
        const f = QBL.fitLine(xs, ys);
        res.push({ name: "g (" + key + ")", value: (2 * f.a) / 100, expected: 9.81, tol: 0.03 });
      }
      return res;
    },
  };
  QBL.register(def);
})();
