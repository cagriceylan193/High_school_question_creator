// Deney 8 – Merkezcil kuvvet: motorlu döner kol, kuvvet algılayıcı, çatal ışık bariyeri, veri kaydedici
(function () {
  "use strict";
  const D = QBL.D;
  const K = 0.36, CX = 40, CY = 26;
  const RS = [5, 10, 15, 20, 25];
  const MS = [50, 75, 100];

  const text = {
    tr: {
      kicker: "Deney 8",
      title: "Merkezcil kuvvet",
      short: "Dönen koldaki kütleye etki eden merkezcil kuvveti açısal hıza, kütleye ve yarıçapa bağlı olarak ölç; F = m·ω²·r'yi sına.",
      tools: "Merkezcil kuvvet aparatı · kuvvet algılayıcı · çatal ışık bariyeri · veri kaydedici",
      aim: "Merkezcil kuvvetin dönen cismin kütlesine, dönme merkezine uzaklığına ve açısal hızına bağlılığını ölçmek.",
      theory: `<p>Çembersel yörüngede dönen bir cismin hızının doğrultusu sürekli değişir; bu değişimi merkeze doğru yönelmiş bir ivme sağlar. Newton'un ikinci yasasına göre bu ivmeyi oluşturan merkezcil kuvvet</p>
<p class="eq">F = m · υ² / r = m · ω² · r</p>
<p>ω = 2π / T açısal hız, T bir tam dönüşün süresidir. Aparatta kütle, motorla döndürülen kolun r uzaklığındaki yuvaya konur. Merkezcil kuvvet kol üzerinden merkezdeki yaprak yaya aktarılır; yayın esnemesini bir gerinim ölçer (strain gauge) kuvvete çevirir. Çatal ışık bariyeri her turda periyodu ölçer.</p>
<p>Ölçüm boyunca motor gerilimi düzgün artırılır; veri kaydedici her 0,2 s'de F ve ω'yı kaydeder. F–ω² grafiği orijinden geçen bir doğrudur ve <b>eğimi m·r</b>'ye eşittir. Böylece r sabitken eğim m ile, m sabitken r ile orantılı çıkmalıdır.</p>
<p>Kuvvet göstergesi kol dururken bile sıfırdan farklı bir değer gösterebilir; ölçümden önce sıfırlanmalıdır. Hızlı dönüşte titreşim ölçümleri biraz saçar.</p>`,
      steps: {
        r: [
          "Yarıçapı seç (ör. 25 cm) ve kütleyi o yuvaya koy. Kol dururken <b>Kuvveti sıfırla</b>.",
          "<b>Ölçümü başlat</b>: gerilim 30 s boyunca artar ve noktalar grafiğe eklenir. Kola dokunma.",
          "Aynı yarıçapta 50 g, 75 g ve 100 g için tekrarla. Her ölçüm grafiğe ayrı renkle eklenir.",
          "F–ω² grafiğindeki her doğrunun eğimini m·r ile karşılaştır.",
        ],
        m: [
          "Bir kütle seç (ör. 100 g). Kütleyi sırayla 5, 10, 15, 20 ve 25 cm'lik yuvalara koy.",
          "Her yarıçap için kuvveti sıfırla ve ölçümü başlat.",
          "Eğimlerin r ile doğru orantılı olduğunu göster; eğim / r oranından kütleyi bul.",
        ],
      },
      r: "Yarıçap sabit",
      m: "Kütle sabit",
      setup: "Düzenek",
      mass: "Kütle m",
      radius: "Yarıçap r",
      tare: "Kuvveti sıfırla",
      start: "Ölçümü başlat (30 s)",
      stop: "Durdur",
      undo: "Son ölçümü sil",
      live: "Veri kaydedici",
      force: "F",
      period: "T",
      omega: "ω",
      running: "Ölçüm sürüyor… ({s} s)",
      runDone: "Ölçüm bitti: {n} nokta kaydedildi.",
      busy: "Önce süren ölçüm bitmeli.",
      safety: "Kol dönerken kütleyi değiştiremezsin.",
      runName: "m = {m} g, r = {r} cm",
      tRuns: "Ölçümler",
      colRun: "Ölçüm",
      gFw: "F = f(ω)",
      gFw2: "F = f(ω²)",
      resRun: "{name}: eğim / (m·r)",
      resM: "Kütle (eğim / r, ortalama)",
      resR: "Yarıçap (eğim / m, ortalama)",
    },
    en: {
      kicker: "Experiment 8",
      title: "Centripetal force",
      short: "Measure the centripetal force on a mass on a rotating arm as a function of angular velocity, mass and radius; test F = m·ω²·r.",
      tools: "Centripetal force apparatus · force sensor · fork light barrier · data logger",
      aim: "To measure how the centripetal force depends on the mass of the rotating body, its distance from the axis and its angular velocity.",
      theory: `<p>The direction of the velocity of a body moving on a circle changes continuously; an acceleration pointing to the centre causes this change. By Newton's second law the centripetal force producing it is</p>
<p class="eq">F = m · υ² / r = m · ω² · r</p>
<p>ω = 2π / T is the angular velocity, T the time of one revolution. In the apparatus the mass sits in a hole at distance r on an arm driven by a motor. The centripetal force is passed through the arm to a leaf spring at the centre; a strain gauge converts its bending into a force reading. A fork light barrier measures the period on every turn.</p>
<p>During a measurement the motor voltage is raised steadily, and the data logger records F and ω every 0.2 s. The F–ω² graph is a straight line through the origin whose <b>slope is m·r</b>. So with r fixed the slope must be proportional to m, and with m fixed to r.</p>
<p>The force display may show a value other than zero even when the arm is at rest; it must be zeroed before measuring. At high speed vibration scatters the readings a little.</p>`,
      steps: {
        r: [
          "Choose the radius (e.g. 25 cm) and put the mass in that hole. With the arm at rest, press <b>Zero the force</b>.",
          "<b>Start measurement</b>: the voltage rises for 30 s and points are added to the graph. Do not touch the arm.",
          "Repeat at the same radius for 50 g, 75 g and 100 g. Each run is added to the graph in its own colour.",
          "Compare the slope of each line in the F–ω² graph with m·r.",
        ],
        m: [
          "Choose a mass (e.g. 100 g). Put it in turn into the holes at 5, 10, 15, 20 and 25 cm.",
          "For each radius zero the force and start a measurement.",
          "Show that the slopes are proportional to r; find the mass from slope / r.",
        ],
      },
      r: "Radius constant",
      m: "Mass constant",
      setup: "Apparatus",
      mass: "Mass m",
      radius: "Radius r",
      tare: "Zero the force",
      start: "Start measurement (30 s)",
      stop: "Stop",
      undo: "Delete last run",
      live: "Data logger",
      force: "F",
      period: "T",
      omega: "ω",
      running: "Measuring… ({s} s)",
      runDone: "Measurement finished: {n} points recorded.",
      busy: "Wait for the running measurement to finish.",
      safety: "You cannot change the mass while the arm is turning.",
      runName: "m = {m} g, r = {r} cm",
      tRuns: "Runs",
      colRun: "Run",
      gFw: "F = f(ω)",
      gFw2: "F = f(ω²)",
      resRun: "{name}: slope / (m·r)",
      resM: "Mass (slope / r, mean)",
      resR: "Radius (slope / m, mean)",
    },
    de: {
      kicker: "Versuch 8",
      title: "Zentripetalkraft",
      short: "Miss die Zentripetalkraft auf eine Masse am rotierenden Arm in Abhängigkeit von Winkelgeschwindigkeit, Masse und Radius; prüfe F = m·ω²·r.",
      tools: "Zentripetalkraftgerät · Kraftsensor · Gabellichtschranke · Messwerterfassung",
      aim: "Messen, wie die Zentripetalkraft von der Masse des rotierenden Körpers, seinem Abstand zur Achse und der Winkelgeschwindigkeit abhängt.",
      theory: `<p>Bei einer Kreisbewegung ändert sich die Richtung der Geschwindigkeit ständig; diese Änderung bewirkt eine zum Mittelpunkt gerichtete Beschleunigung. Nach dem zweiten newtonschen Gesetz ist die dazu nötige Zentripetalkraft</p>
<p class="eq">F = m · υ² / r = m · ω² · r</p>
<p>ω = 2π / T ist die Winkelgeschwindigkeit, T die Umlaufdauer. Im Gerät sitzt die Masse in einer Bohrung im Abstand r auf einem motorgetriebenen Arm. Die Zentripetalkraft wird über den Arm auf eine Blattfeder in der Mitte übertragen; ein Dehnungsmessstreifen wandelt deren Biegung in einen Kraftwert um. Eine Gabellichtschranke misst bei jeder Umdrehung die Periode.</p>
<p>Während der Messung wird die Motorspannung gleichmäßig erhöht; die Messwerterfassung speichert alle 0,2 s F und ω. Das F–ω²-Diagramm ist eine Ursprungsgerade mit der <b>Steigung m·r</b>. Bei festem r muss die Steigung also proportional zu m sein, bei festem m proportional zu r.</p>
<p>Die Kraftanzeige kann auch bei ruhendem Arm von null abweichen; vor der Messung ist sie auf null zu setzen. Bei hoher Drehzahl streuen die Werte durch Vibrationen etwas.</p>`,
      steps: {
        r: [
          "Radius wählen (z. B. 25 cm) und die Masse in diese Bohrung setzen. Bei ruhendem Arm <b>Kraft nullen</b>.",
          "<b>Messung starten</b>: Die Spannung steigt 30 s lang, die Punkte erscheinen im Diagramm. Den Arm nicht berühren.",
          "Beim gleichen Radius für 50 g, 75 g und 100 g wiederholen. Jede Messung erhält eine eigene Farbe.",
          "Die Steigung jeder Geraden im F–ω²-Diagramm mit m·r vergleichen.",
        ],
        m: [
          "Eine Masse wählen (z. B. 100 g) und nacheinander in die Bohrungen bei 5, 10, 15, 20 und 25 cm setzen.",
          "Für jeden Radius die Kraft nullen und eine Messung starten.",
          "Zeigen, dass die Steigungen proportional zu r sind; die Masse aus Steigung / r bestimmen.",
        ],
      },
      r: "Radius konstant",
      m: "Masse konstant",
      setup: "Aufbau",
      mass: "Masse m",
      radius: "Radius r",
      tare: "Kraft nullen",
      start: "Messung starten (30 s)",
      stop: "Stopp",
      undo: "Letzte Messung löschen",
      live: "Messwerterfassung",
      force: "F",
      period: "T",
      omega: "ω",
      running: "Messung läuft … ({s} s)",
      runDone: "Messung beendet: {n} Punkte gespeichert.",
      busy: "Warte, bis die laufende Messung beendet ist.",
      safety: "Während der Arm dreht, kann die Masse nicht gewechselt werden.",
      runName: "m = {m} g, r = {r} cm",
      tRuns: "Messungen",
      colRun: "Messung",
      gFw: "F = f(ω)",
      gFw2: "F = f(ω²)",
      resRun: "{name}: Steigung / (m·r)",
      resM: "Masse (Steigung / r, Mittel)",
      resR: "Radius (Steigung / m, Mittel)",
    },
  };

  const runsOf = (api, part) => ((api.store.extra.runs = api.store.extra.runs || {})[part] = api.store.extra.runs[part] || []);
  const nameOf = (run) => QBL.tx(def, "runName", { m: run.m, r: run.r });
  const slopeOf = (run) => { const f = QBL.fitProp(run.pts.map((p) => p[0] * p[0]), run.pts.map((p) => p[1])); return f; };
  function seriesFor(part, sq) {
    return (api) => runsOf(api, part).map((run) => ({ name: nameOf(run), pts: run.pts.map((p) => ({ x: sq ? p[0] * p[0] : p[0], y: p[1] })) }));
  }
  function results(part) {
    return (c) => {
      const runs = runsOf(c.api, part);
      const out = [];
      const ms = [], rs = [];
      for (const run of runs) {
        const f = slopeOf(run);
        if (!f) continue;
        const mr = (run.m / 1000) * (run.r / 100);
        out.push({ label: c.t("resRun", { name: nameOf(run) }), value: f.a / mr, err: f.sa / mr, ref: 1, refText: "1" });
        ms.push(f.a / (run.r / 100));
        rs.push(f.a / (run.m / 1000));
      }
      if (part === "m" && ms.length) out.push({ label: c.t("resM"), value: QBL.mean(ms) * 1000, err: ms.length > 1 ? QBL.sem(ms) * 1000 : null, unit: "g", ref: runs[0].m });
      if (part === "r" && rs.length) out.push({ label: c.t("resR"), value: QBL.mean(rs) * 100, err: rs.length > 1 ? QBL.sem(rs) * 100 : null, unit: "cm", ref: runs[0].r });
      return out;
    };
  }
  const runTable = (part) => ({
    id: "runs_" + part,
    title: () => QBL.tx(def, "tRuns"),
    columns: [
      { key: "m", label: "m (g)", fixed: true },
      { key: "r", label: "r (cm)", fixed: true },
      { key: "n", label: "N", fixed: true },
      { key: "A", label: "A (N·s²)", calc: (row, tb) => { const run = runsOf(tb.ctx.api, part)[row.i]; const f = run && slopeOf(run); return f ? f.a : null; }, digits: 5 },
      { key: "mr", label: "m·r (kg·m)", calc: (row) => (row.m != null ? (row.m / 1000) * (row.r / 100) : null), digits: 5 },
    ],
    minRows: 0, fixedRows: true, allowAdd: false,
  });

  const def = {
    id: "merkezcil",
    order: 80,
    text,
    parts: ["r", "m"].map((id) => ({
      id, title: id,
      tables: [runTable(id)],
      graphs: [
        { id: "fw_" + id, title: () => QBL.tx(def, "gFw"), x: { label: "ω (rad/s)" }, y: { label: "F (N)" }, points: seriesFor(id, false), fit: "none", fits: ["none"], zeroX: true, zeroY: true },
        { id: "fw2_" + id, title: () => QBL.tx(def, "gFw2"), x: { label: "ω² (rad²/s²)" }, y: { label: "F (N)" }, points: seriesFor(id, true), fit: "prop", fits: ["prop", "line"], zeroX: true, zeroY: true, slopeUnit: "N·s²" },
      ],
      results: results(id),
      pdfAlways: (api) => runsOf(api, id).length > 0,
    })),

    mount(api) {
      const { C, t, mem } = api;
      const offset0 = QBL.between(api.rng, 0.06, 0.2);   // kuvvet algılayıcının kayması (N)
      const gain = QBL.between(api.rng, 0.985, 1.015);   // algılayıcı kazancı
      const wPerV = QBL.between(api.rng, 1.05, 1.15);    // rad/s başına V
      const st = {
        part: api.part, m: mem.m ?? 100, r: mem.r ?? 25, tare: 0,
        phi: 0, w: 0, U: 0, run: null, lastT: null, passT: null, time: 0, drift: 0,
      };
      const save = () => Object.assign(mem, { m: st.m, r: st.r });
      const Ftrue = () => (st.m / 1000) * st.w * st.w * (st.r / 100) * gain;
      const Fread = () => Ftrue() + offset0 + st.drift - st.tare + (0.012 + 0.003 * st.w) * QBL.gauss();

      function step(dt) {
        st.time += dt;
        st.drift += 0.0004 * QBL.gauss() * Math.sqrt(dt);
        if (st.run) {
          st.run.t += dt;
          st.U = Math.min(11, (st.run.t / 30) * 11);
          if (st.run.t >= 30) { finish(); }
        } else st.U = Math.max(0, st.U - dt * 4);
        const target = st.U * wPerV;
        st.w += (target - st.w) * Math.min(1, dt / 1.2);
        const prev = st.phi;
        st.phi += st.w * dt;
        // kuvvet, periyodun ölçüldüğü tur boyunca ortalanır (ikisi de aynı tura ait olsun)
        const acc = (st.fAcc = st.fAcc || { s: 0, t: 0 });
        acc.s += Fread() * dt;
        acc.t += dt;
        // çatal ışık bariyeri: kolun her geçişinde periyot
        if (Math.floor(st.phi / (2 * Math.PI)) > Math.floor(prev / (2 * Math.PI))) {
          if (st.passT != null) { st.lastT = Math.round((st.time - st.passT) * 1e4) / 1e4; st.lastF = acc.s / acc.t; }
          st.passT = st.time;
          st.fAcc = { s: 0, t: 0 };
        }
        if (st.w < 0.3) { st.lastT = null; st.lastF = null; }
        // veri kaydı (0,2 s)
        if (st.run && st.lastT && st.lastF != null) {
          st.run.acc += dt;
          if (st.run.acc >= 0.2) {
            st.run.acc -= 0.2;
            st.run.pts.push([Math.round(((2 * Math.PI) / st.lastT) * 1000) / 1000, Math.round(st.lastF * 1000) / 1000]);
            if (st.run.pts.length % 5 === 0) api.refresh();
          }
        }
        live();
      }
      let liveTick = 0;
      function live() {
        if (++liveTick % 6) return;
        lF.set(Fread().toFixed(2));
        lT.set(st.lastT ? st.lastT.toFixed(3) : "----");
        lW.set(st.lastT ? ((2 * Math.PI) / st.lastT).toFixed(2) : "0.00");
        if (st.run) api.status(t("running", { s: Math.ceil(30 - st.run.t) }));
      }
      function start() {
        if (st.run) { api.status(t("busy"), "bad"); return; }
        st.run = { t: 0, acc: 0, pts: [], m: st.m, r: st.r };
      }
      function finish() {
        const run = st.run;
        st.run = null;
        if (!run || run.pts.length < 3) return;
        const runs = runsOf(api, st.part);
        runs.push({ m: run.m, r: run.r, pts: run.pts });
        const tb = api.table("runs_" + st.part);
        tb.addRow({ i: runs.length - 1, m: run.m, r: run.r, n: run.pts.length });
        api.persist();
        api.status(t("runDone", { n: run.pts.length }), "ok");
        api.refresh();
      }

      // --- çizim (eğik üstten görünüm)
      const P = (x, y, z = 0) => [CX + x, CY + K * y - z];
      function draw(c, S) {
        D.wall(c, S);
        D.bench(c, S, -5, 85, CY + 16, 4);
        // gövde ve motor
        c.fillStyle = D.metal(c, CX - 14, 0, CX + 14, 0, "dark");
        D.rr(c, CX - 14, CY + 4, 28, 12, 1.2);
        c.fillStyle = "#1f2a35";
        D.rr(c, CX - 14, CY + 4, 28, 12, 1.2);
        c.fill();
        D.rodV(c, CX, CY - 2, CY + 4, 2.2);
        // kol: iki yarısı, kütle yuvaları
        const a = st.phi;
        const arm = (len) => P(len * Math.cos(a), len * Math.sin(a), 3);
        const [x1, y1] = arm(30), [x2, y2] = arm(-16);
        c.strokeStyle = D.metal(c, 0, CY - 4, 0, CY, "alu");
        c.lineWidth = 1.4;
        c.lineCap = "round";
        c.beginPath(); c.moveTo(x2, y2); c.lineTo(x1, y1); c.stroke();
        c.lineCap = "butt";
        for (const r of RS) { const [hx, hy] = arm(r); c.fillStyle = "#30353b"; c.beginPath(); c.ellipse(hx, hy, 0.5, 0.5 * K + 0.1, 0, 0, Math.PI * 2); c.fill(); }
        // karşı ağırlık
        const [cx2, cy2] = arm(-14);
        c.fillStyle = D.metal(c, cx2 - 2, 0, cx2 + 2, 0, "dark");
        c.fillRect(cx2 - 2, cy2 - 2.8, 4, 3.6);
        // kütle (silindir)
        const [mx, my] = arm(st.r);
        const h = 1.2 + st.m / 50;
        c.fillStyle = D.metal(c, mx - 1.8, 0, mx + 1.8, 0, "brass");
        c.fillRect(mx - 1.8, my - h, 3.6, h);
        c.beginPath(); c.ellipse(mx, my - h, 1.8, 1.8 * K, 0, 0, Math.PI * 2); c.fillStyle = "#e9cf86"; c.fill();
        // merkez: kuvvet algılayıcı
        c.fillStyle = "#c62828";
        c.beginPath(); c.ellipse(CX, CY - 3.2, 1.6, 1.6 * K, 0, 0, Math.PI * 2); c.fill();
        // çatal ışık bariyeri (kolun ucunun geçtiği yerde)
        const [bx, by] = P(31.5, 0, 3);
        c.fillStyle = "#2b3138";
        D.rr(c, bx - 0.8, by - 3.5, 4, 5.5, 0.3);
        c.fill();
        D.led(c, bx + 1.2, by - 2.6, 0.3, Math.abs(Math.sin(a)) < 0.05 && Math.cos(a) > 0, "#ff3b2f");
        // güç kaynağı ve kaydedici
        D.counter(c, 2, 4, 20, 8.5, st.U.toFixed(1), { cells: 4, unit: "V", label: "U", body: "#7b8590" });
        D.counter(c, 58, 4, 22, 8.5, st.lastT ? ((2 * Math.PI) / st.lastT).toFixed(2) : "0.00", { cells: 5, unit: "rad/s", label: "CASSY  ω", body: "#2f6db3" });
      }
      api.stage({ world: [0, 1, 82, 46], maxH: 460, lensZoom: 4, label: t("title"), draw, step });

      // --- denetimler
      const lF = C.lcd({ label: t("force"), cells: 5, unit: "N" });
      const lT = C.lcd({ label: t("period"), cells: 5, unit: "s" });
      const lW = C.lcd({ label: t("omega"), cells: 5, unit: "rad/s" });
      const guard = (fn) => (v) => { if (st.run || st.w > 0.3) { api.status(t("safety"), "bad"); mSeg.value = st.m; rSeg.value = st.r; return; } fn(v); save(); };
      const mSeg = C.segment({ label: t("mass"), value: st.m, options: MS.map((m) => ({ value: m, label: m + " g" })), onChange: guard((v) => { st.m = Number(v); }) });
      const rSeg = C.segment({ label: t("radius"), value: st.r, options: RS.map((r) => ({ value: r, label: r + " cm" })), onChange: guard((v) => { st.r = Number(v); }) });
      api.panel.append(
        C.group(t("setup"), mSeg.el, rSeg.el,
          C.buttons([{ label: t("tare"), onClick: () => { if (st.w > 0.3) { api.status(t("safety"), "bad"); return; } st.tare = offset0 + st.drift; } }])),
        C.group(t("live"), lF.el, lT.el, lW.el,
          C.buttons([{ label: t("start"), primary: true, onClick: start }, { label: t("stop"), onClick: () => { if (st.run) finish(); } }]),
          C.buttons([{ label: t("undo"), onClick: () => {
            const runs = runsOf(api, st.part);
            if (!runs.length) return;
            runs.pop();
            const tb = api.table("runs_" + st.part);
            tb.rows.pop();
            tb.changed(true);
            api.persist();
            api.refresh();
          } }])));
      api.onPart((p) => { st.part = p; });
      return {
        onClear() { api.store.extra.runs = {}; api.persist(); api.refresh(); },
      };
    },

    selfTest() {
      // F = m ω² r: ω² eğimi m·r
      const m = 0.1, r = 0.25, xs = [], ys = [];
      for (let w = 1; w <= 12; w += 0.5) { xs.push(w * w); ys.push(m * w * w * r); }
      const f = QBL.fitProp(xs, ys);
      return [{ name: "eğim = m·r", value: f.a, expected: m * r, tol: 1e-9 }];
    },
  };
  QBL.register(def);
})();
