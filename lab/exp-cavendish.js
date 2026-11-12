// Deney 10-A – Yer çekimi sabiti G: Cavendish burulma terazisi, ışık izi ve konum algılayıcı
(function () {
  "use strict";
  const D = QBL.D;
  const GC = 6.674e-11;
  const P = { m1: 1.5, m2: 0.015, d: 0.05, b: 0.047, L: 0.70 };

  const text = {
    tr: {
      kicker: "Deney 10-A",
      title: "Yer çekimi sabitinin belirlenmesi (Cavendish)",
      short: "Burulma terazisinin büyük kürelerle sapmasını ışık iziyle kaydet; son sapma ve ivmelenme yöntemleriyle G'yi bul.",
      tools: "Cavendish burulma terazisi · kurşun küreler · ayna · konum algılayıcı",
      aim: "Burulma sarkacının denge konumları çevresindeki sönümlü salınımlarını kaydetmek ve G evrensel çekim sabitini son sapma ve ivmelenme yöntemleriyle bulmak.",
      theory: `<p>İki kütle arasındaki çekim kuvveti F = G · m₁ · m₂ / b²'dir. Laboratuvardaki kütleler için bu kuvvet çok küçüktür; bu yüzden bir <b>burulma terazisi</b> kullanılır: ince bir telle asılı hafif çubuğun uçlarında m₂ kütleli iki küçük kurşun küre vardır. Yanlarına m₁ kütleli büyük küreler getirilince çubuğa bir tork etki eder ve tel burulur.</p>
<p>Çubuğa bağlı aynadan yansıyan ışık, L uzaklıktaki ölçeğe düşer. Büyük küreler I konumundan II konumuna çevrilince tork yön değiştirir ve sarkaç yeni denge konumu çevresinde sönümlü salınım yapar. Işık izinin iki denge konumu arasındaki fark ΔS = S_I − S_II ise (ayna açıyı iki katına çıkarır):</p>
<p class="eq">G = π² · b² · d · ΔS / (m₁ · T² · L)      (son sapma yöntemi)</p>
<p>T salınım periyodu, d küçük kürelerin dönme eksenine uzaklığıdır. <b>İvmelenme yönteminde</b> küreler çevrildikten hemen sonraki ilk dakikalarda ışık izi parabol çizer: S = A + B·t + C·t². Bu parabolün C katsayısından</p>
<p class="eq">G = C · b² · d / (2 · m₁ · L)</p>
<p>bulunur. Uzaktaki büyük küre de küçük küreyi ters yönde çeker; bu etki ölçülen G'yi birkaç yüzde azaltır. Düzeltme çarpanı 1/(1 − β), β = b³ / (b² + 4d²)^{3/2}. Sarsıntı, hava akımları ve telin yavaş gevşemesi ölçümü bozar; denge için uzun süre beklemek gerekir.</p>`,
      steps: [
        "Büyük kürelerin <b>Nötr</b> konumunda sarkacın durulmasını bekle. Zamanı hızlandırabilirsin (×60 ile 1 dakika ≈ 1 saniye).",
        "<b>Kaydı başlat</b>, sonra büyük küreleri <b>I</b> konumuna çevir. Salınımlar sönene kadar (yaklaşık 60–90 dakika) bekle.",
        "Küreleri <b>II</b> konumuna çevir ve yeniden sönmesini bekle.",
        "Grafikte imleci kullanarak iki denge konumunu S_I, S_II ve ardışık iki tepe arasından T periyodunu oku; tabloya yaz.",
        "İvmelenme yöntemi için çevirme anından sonraki ilk 1–2 dakikayı grafikte sürükleyerek seç; parabolün C katsayısını tabloya yaz.",
      ],
      partMain: "Ölçüm",
      pos: "Büyük kürelerin konumu",
      posN: "Nötr", posI: "I", posII: "II",
      speed: "Zaman akışı",
      rec: "Kaydı başlat",
      recStop: "Kaydı durdur",
      recClear: "Kaydı temizle",
      spot: "Işık izinin konumu S",
      clock: "Kayıt süresi",
      log: "Işık izi S(t)",
      tableEnd: "Son sapma yöntemi",
      tableAcc: "İvmelenme yöntemi",
      colC: "C (mm/dk²)",
      resGend: "G (son sapma)",
      resGacc: "G (ivmelenme)",
      resCorr: "Uzak küre düzeltmesiyle G (son sapma) · 1/(1 − β), β = {b}",
      constants: "m₁ = 1,5 kg, b = 47 mm, d = 50 mm, L = 0,70 m",
      noLog: "Önce kayıt yap.",
    },
    en: {
      kicker: "Experiment 10-A",
      title: "Determining the gravitational constant (Cavendish)",
      short: "Record the deflection of a torsion balance caused by large spheres with a light spot; find G with the end-deflection and acceleration methods.",
      tools: "Cavendish torsion balance · lead spheres · mirror · position detector",
      aim: "To record the damped oscillations of a torsion pendulum about its equilibrium positions and to determine the gravitational constant G with the end-deflection and acceleration methods.",
      theory: `<p>The attraction between two masses is F = G · m₁ · m₂ / b². For laboratory masses this force is tiny, so a <b>torsion balance</b> is used: a light beam hanging on a thin fibre carries two small lead spheres of mass m₂. When large spheres of mass m₁ are brought next to them, a torque acts on the beam and the fibre twists.</p>
<p>Light reflected from a mirror on the beam falls on a scale at distance L. When the large spheres are swung from position I to position II, the torque reverses and the pendulum performs damped oscillations about a new equilibrium. If the difference of the light-spot equilibria is ΔS = S_I − S_II (the mirror doubles the angle):</p>
<p class="eq">G = π² · b² · d · ΔS / (m₁ · T² · L)      (end-deflection method)</p>
<p>T is the period and d the distance of the small spheres from the axis. In the <b>acceleration method</b> the light spot follows a parabola in the first minutes after the swing: S = A + B·t + C·t². From the coefficient C</p>
<p class="eq">G = C · b² · d / (2 · m₁ · L)</p>
<p>The far large sphere also pulls the small sphere the other way; this lowers the measured G by a few per cent. The correction factor is 1/(1 − β) with β = b³ / (b² + 4d²)^{3/2}. Vibrations, air currents and the slow relaxation of the fibre disturb the measurement; you must wait a long time for equilibrium.</p>`,
      steps: [
        "With the large spheres in the <b>Neutral</b> position, wait for the pendulum to settle. You can speed up time (at ×60, 1 minute ≈ 1 second).",
        "<b>Start recording</b>, then swing the large spheres to position <b>I</b>. Wait until the oscillations have died away (about 60–90 minutes).",
        "Swing the spheres to position <b>II</b> and wait again.",
        "Use the cursor on the graph to read the two equilibrium positions S_I, S_II and the period T between two successive peaks; enter them in the table.",
        "For the acceleration method, drag over the first 1–2 minutes after the swing to select them; enter the coefficient C of the parabola in the table.",
      ],
      partMain: "Measurement",
      pos: "Position of the large spheres",
      posN: "Neutral", posI: "I", posII: "II",
      speed: "Time speed",
      rec: "Start recording",
      recStop: "Stop recording",
      recClear: "Clear recording",
      spot: "Position of the light spot S",
      clock: "Recording time",
      log: "Light spot S(t)",
      tableEnd: "End-deflection method",
      tableAcc: "Acceleration method",
      colC: "C (mm/min²)",
      resGend: "G (end deflection)",
      resGacc: "G (acceleration)",
      resCorr: "G (end deflection) corrected for the far sphere · 1/(1 − β), β = {b}",
      constants: "m₁ = 1.5 kg, b = 47 mm, d = 50 mm, L = 0.70 m",
      noLog: "Record first.",
    },
    de: {
      kicker: "Versuch 10-A",
      title: "Bestimmung der Gravitationskonstante (Cavendish)",
      short: "Zeichne die Auslenkung einer Gravitationsdrehwaage durch große Kugeln mit einem Lichtzeiger auf; bestimme G mit Endausschlag- und Beschleunigungsmethode.",
      tools: "Gravitationsdrehwaage · Bleikugeln · Spiegel · Positionsdetektor",
      aim: "Die gedämpften Schwingungen einer Drehwaage um ihre Ruhelagen aufzeichnen und die Gravitationskonstante G mit Endausschlag- und Beschleunigungsmethode bestimmen.",
      theory: `<p>Zwei Massen ziehen sich mit F = G · m₁ · m₂ / b² an. Für Labormassen ist diese Kraft winzig, daher verwendet man eine <b>Drehwaage</b>: Ein leichter Balken an einem dünnen Torsionsfaden trägt zwei kleine Bleikugeln der Masse m₂. Bringt man große Kugeln der Masse m₁ daneben, wirkt ein Drehmoment und der Faden verdrillt sich.</p>
<p>Licht, das ein Spiegel am Balken reflektiert, fällt auf eine Skala im Abstand L. Schwenkt man die großen Kugeln von Stellung I nach II, kehrt sich das Drehmoment um und das Pendel schwingt gedämpft um eine neue Ruhelage. Ist ΔS = S_I − S_II die Differenz der Ruhelagen des Lichtzeigers (der Spiegel verdoppelt den Winkel):</p>
<p class="eq">G = π² · b² · d · ΔS / (m₁ · T² · L)      (Endausschlagmethode)</p>
<p>T ist die Schwingungsdauer, d der Abstand der kleinen Kugeln von der Achse. Bei der <b>Beschleunigungsmethode</b> beschreibt der Lichtzeiger in den ersten Minuten nach dem Schwenken eine Parabel: S = A + B·t + C·t². Aus dem Koeffizienten C folgt</p>
<p class="eq">G = C · b² · d / (2 · m₁ · L)</p>
<p>Die entferntere große Kugel zieht die kleine in Gegenrichtung; das verkleinert das gemessene G um einige Prozent. Korrekturfaktor 1/(1 − β) mit β = b³ / (b² + 4d²)^{3/2}. Erschütterungen, Luftströmungen und das langsame Nachgeben des Fadens stören; man muss lange auf das Gleichgewicht warten.</p>`,
      steps: [
        "In der Stellung <b>Neutral</b> der großen Kugeln warten, bis das Pendel ruht. Die Zeit lässt sich beschleunigen (bei ×60 ist 1 Minute ≈ 1 Sekunde).",
        "<b>Aufzeichnung starten</b>, dann die großen Kugeln in Stellung <b>I</b> schwenken. Warten, bis die Schwingungen abgeklungen sind (etwa 60–90 Minuten).",
        "Die Kugeln in Stellung <b>II</b> schwenken und erneut warten.",
        "Mit dem Cursor im Diagramm die beiden Ruhelagen S_I, S_II und die Periode T zwischen zwei aufeinanderfolgenden Maxima ablesen und eintragen.",
        "Für die Beschleunigungsmethode die ersten 1–2 Minuten nach dem Schwenken durch Ziehen auswählen; den Koeffizienten C der Parabel eintragen.",
      ],
      partMain: "Messung",
      pos: "Stellung der großen Kugeln",
      posN: "Neutral", posI: "I", posII: "II",
      speed: "Zeitablauf",
      rec: "Aufzeichnung starten",
      recStop: "Aufzeichnung stoppen",
      recClear: "Aufzeichnung löschen",
      spot: "Lage des Lichtzeigers S",
      clock: "Aufzeichnungsdauer",
      log: "Lichtzeiger S(t)",
      tableEnd: "Endausschlagmethode",
      tableAcc: "Beschleunigungsmethode",
      colC: "C (mm/min²)",
      resGend: "G (Endausschlag)",
      resGacc: "G (Beschleunigung)",
      resCorr: "G (Endausschlag) mit Korrektur der fernen Kugel · 1/(1 − β), β = {b}",
      constants: "m₁ = 1,5 kg, b = 47 mm, d = 50 mm, L = 0,70 m",
      noLog: "Zuerst aufzeichnen.",
    },
  };

  const beta = P.b ** 3 / (P.b ** 2 + 4 * P.d ** 2) ** 1.5;
  const Gend = (r) => (r.T > 0 && r.S1 != null && r.S2 != null ? (Math.PI ** 2 * P.b ** 2 * P.d * (Math.abs(r.S1 - r.S2) / 1000)) / (P.m1 * r.T ** 2 * P.L) : null);
  const Gacc = (r) => (r.C != null ? ((Math.abs(r.C) / 1000 / 3600) * P.b ** 2 * P.d) / (2 * P.m1 * P.L) : null);

  // Burulma sarkacı modeli: açı θ (rad), küreler konumu pos ∈ {0, 1, -1}
  function torque(theta, pos) {
    if (!pos) return 0;
    let tq = 0;
    const smalls = [[P.d * Math.cos(theta), P.d * Math.sin(theta)], [-P.d * Math.cos(theta), -P.d * Math.sin(theta)]];
    // büyük kürelerin merkezleri: küçük kürelerin dengedeki yerlerinin b kadar yanında, zıt taraflarda
    const bigs = [[P.d, pos * P.b], [-P.d, -pos * P.b]];
    for (const s of smalls) for (const B of bigs) {
      const dx = B[0] - s[0], dy = B[1] - s[1], r = Math.hypot(dx, dy);
      const f = (GC * P.m1 * P.m2) / (r * r * r);
      tq += s[0] * f * dy - s[1] * f * dx;
    }
    return tq;
  }

  const def = {
    id: "cavendish",
    order: 100,
    text,
    parts: [{
      id: "main", title: "partMain",
      tables: [
        { id: "end", title: () => QBL.tx(def, "tableEnd"), columns: [{ key: "T", label: "T (s)", input: true }, { key: "S1", label: "S_I (mm)", input: true }, { key: "S2", label: "S_II (mm)", input: true }, { key: "dS", label: "ΔS (mm)", calc: (r) => (r.S1 != null && r.S2 != null ? Math.abs(r.S1 - r.S2) : null), digits: 1 }, { key: "G", label: "G (10⁻¹¹ N·m²/kg²)", calc: (r) => { const g = Gend(r); return g == null ? null : g * 1e11; }, digits: 2 }], minRows: 1 },
        { id: "acc", title: () => QBL.tx(def, "tableAcc"), columns: [{ key: "C", label: () => QBL.tx(def, "colC"), input: true }, { key: "G", label: "G (10⁻¹¹ N·m²/kg²)", calc: (r) => { const g = Gacc(r); return g == null ? null : g * 1e11; }, digits: 2 }], minRows: 1 },
      ],
      results(c) {
        const out = [];
        const e = c.table("end").rows.map(Gend).filter((v) => v != null);
        const a = c.table("acc").rows.map(Gacc).filter((v) => v != null);
        if (e.length) {
          const m = QBL.mean(e);
          out.push({ label: c.t("resGend"), value: m * 1e11, err: e.length > 1 ? QBL.sem(e) * 1e11 : null, unit: "×10⁻¹¹ N·m²/kg²", ref: 6.674, refText: "6,674 ×10⁻¹¹" });
          out.push({ label: c.t("resCorr", { b: QBL.fixed(beta, 3) }), value: (m / (1 - beta)) * 1e11, unit: "×10⁻¹¹ N·m²/kg²", digits: 2, ref: 6.674, refText: "6,674 ×10⁻¹¹" });
        }
        if (a.length) out.push({ label: c.t("resGacc"), value: QBL.mean(a) * 1e11, err: a.length > 1 ? QBL.sem(a) * 1e11 : null, unit: "×10⁻¹¹ N·m²/kg²", ref: 6.674, refText: "6,674 ×10⁻¹¹" });
        out.push({ text: c.t("constants") });
        return out;
      },
    }],
    model: { torque },

    mount(api) {
      const { C, t, mem } = api;
      const T0 = QBL.between(api.rng, 470, 580);                  // s
      const tau = QBL.between(api.rng, 1100, 1500);               // sönüm zamanı (s)
      const J = 2 * P.m2 * P.d ** 2 + 1.6e-6;                     // kg·m² (çubuk dahil)
      const Dk = J * ((2 * Math.PI) / T0) ** 2;                   // burulma sabiti
      const S0 = QBL.between(api.rng, 480, 520);                  // mm, sıfır konumu
      const ex = api.store.extra;
      ex.log = ex.log || { t: [], S: [] };
      const st = mem.st || (mem.st = { th: 0.0004 * QBL.gauss(), w: 0, pos: 0, time: 0, rec: false, recT0: 0, drift: 0, speed: 60, nextLog: 0 });
      const spot = () => S0 + st.drift + P.L * 1000 * Math.tan(2 * st.th);

      function step(dt) {
        const h0 = dt * st.speed;
        const n = Math.max(1, Math.ceil(h0 / 0.5));
        const h = h0 / n;
        for (let i = 0; i < n; i++) {
          const a = (-Dk * st.th + torque(st.th, st.pos) + 3e-14 * QBL.gauss() / Math.sqrt(h)) / J - (2 / tau) * st.w;
          st.w += a * h;
          st.th += st.w * h;
          st.time += h;
          st.drift += 0.0002 * h / 60; // telin yavaş gevşemesi: dakikada ~0,0002 mm
          if (st.rec && st.time >= st.nextLog) {
            st.nextLog = st.time + 5;
            ex.log.t.push(Math.round(((st.time - st.recT0) / 60) * 1000) / 1000);
            ex.log.S.push(Math.round((spot() + 0.08 * QBL.gauss()) * 100) / 100);
            chart.setData(0, ex.log.t, ex.log.S);
          }
        }
        if (++tick % 8 === 0) {
          lS.set(spot().toFixed(1));
          const m = st.rec ? (st.time - st.recT0) / 60 : 0;
          lT.set(Math.floor(m / 60) + ":" + String(Math.floor(m % 60)).padStart(2, "0"));
        }
      }
      let tick = 0;

      function draw(c, S) {
        D.wall(c, S);
        // üstten şematik: çubuk, küçük ve büyük küreler (ölçek: 1 birim = 1 mm)
        const cx = 0, cy = 0, k = 1;
        c.fillStyle = S.colors.dark ? "#22303d" : "#e8eef4";
        c.beginPath(); c.arc(cx, cy, 92, 0, Math.PI * 2); c.fill();
        c.strokeStyle = S.colors.line; c.lineWidth = S.px; c.stroke();
        // döner kol ve büyük küreler
        const pos = st.pos;
        const ang = pos === 0 ? Math.PI / 2 : Math.atan2(pos * P.b, P.d);
        c.strokeStyle = "#5b6168"; c.lineWidth = 3;
        const R = Math.hypot(P.d, P.b) * 1000;
        c.beginPath(); c.moveTo(cx - R * Math.cos(ang), cy + R * Math.sin(ang)); c.lineTo(cx + R * Math.cos(ang), cy - R * Math.sin(ang)); c.stroke();
        for (const s of [1, -1]) D.ball(c, cx + s * R * Math.cos(ang), cy - s * R * Math.sin(ang), 34, "lead");
        // camlı gövde
        c.strokeStyle = "rgba(120,160,200,0.6)"; c.lineWidth = 2;
        c.strokeRect(-72, -16, 144, 32);
        // çubuk ve küçük küreler (abartılmış açıyla değil, gerçek açıyla)
        const th = st.th;
        const x1 = P.d * 1000 * Math.cos(th), y1 = -P.d * 1000 * Math.sin(th);
        c.strokeStyle = "#8a9096"; c.lineWidth = 1.4;
        c.beginPath(); c.moveTo(-x1, -y1); c.lineTo(x1, y1); c.stroke();
        D.ball(c, x1, y1, 7.5, "lead");
        D.ball(c, -x1, -y1, 7.5, "lead");
        // ayna ve ışık yolu
        c.fillStyle = "#b8d4ea"; c.fillRect(-4, -2, 8, 4);
        c.strokeStyle = "rgba(220,40,30,0.5)"; c.lineWidth = 0.8;
        c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 120); c.stroke();
        // ölçek ve ışık izi (ayrı ölçekte: 1 birim = 1 mm, ölçek ekseni yatay)
        const sy = 140;
        c.fillStyle = "#f3ead0"; c.fillRect(-110, sy - 8, 220, 16);
        c.strokeStyle = "#1a1a1a"; c.lineWidth = Math.max(S.px, 0.3);
        c.beginPath();
        for (let mm = 400; mm <= 600; mm += 2) { const x = mm - 500; const L = mm % 10 === 0 ? 6 : 3.5; c.moveTo(x, sy - 8); c.lineTo(x, sy - 8 + L); }
        c.stroke();
        c.fillStyle = "#1a1a1a"; c.font = D.font(5, 500); c.textAlign = "center";
        for (let mm = 400; mm <= 600; mm += 20) c.fillText(String(mm), mm - 500, sy + 6);
        const sx = QBL.clamp(spot() - 500, -108, 108);
        const g = c.createRadialGradient(sx, sy - 3, 0, sx, sy - 3, 6);
        g.addColorStop(0, "rgba(255,40,30,0.95)"); g.addColorStop(1, "rgba(255,40,30,0)");
        c.fillStyle = g; c.beginPath(); c.arc(sx, sy - 3, 6, 0, Math.PI * 2); c.fill();
        D.text(c, "S (mm)", 112, sy + 6, { size: 5, color: S.colors.muted, align: "right" });
        const lbl = pos === 0 ? t("posN") : pos > 0 ? "I" : "II";
        D.text(c, lbl, cx + R * Math.cos(ang) + 40, cy - R * Math.sin(ang), { size: 12, color: S.colors.ink, weight: 600, base: "middle" });
      }
      api.stage({ world: [-125, -100, 125, 158], maxH: 520, lensZoom: 4, label: t("title"), draw, step });

      // --- denetimler
      const lS = C.lcd({ label: t("spot"), cells: 6, unit: "mm" });
      const lT = C.lcd({ label: t("clock"), cells: 5, unit: "h:min" });
      const chart = new QBL.LogChart({ title: t("log"), xLabel: "t (min)", yLabel: "S (mm)", xName: "t", yName: "S", xDigits: 2, yDigits: 1, fits: ["quad", "line"], fit: "quad" });
      chart.setData(0, ex.log.t, ex.log.S);
      const posSeg = C.segment({ label: t("pos"), value: st.pos, options: [{ value: 0, label: t("posN") }, { value: 1, label: "I" }, { value: -1, label: "II" }], onChange(v) { st.pos = Number(v); } });
      const spSeg = C.segment({ label: t("speed"), value: st.speed, options: [1, 10, 60, 120, 300].map((v) => ({ value: v, label: "×" + v })), onChange(v) { st.speed = Number(v); } });
      const recBtn = C.button(st.rec ? t("recStop") : t("rec"), () => {
        if (!st.rec) { st.rec = true; st.recT0 = st.time - (ex.log.t.length ? ex.log.t[ex.log.t.length - 1] * 60 : 0); st.nextLog = st.time; recBtn.textContent = t("recStop"); }
        else { st.rec = false; recBtn.textContent = t("rec"); api.persist(); }
      }, { primary: true });
      api.panel.append(
        C.group("", posSeg.el, spSeg.el, lS.el, lT.el,
          C.buttons([recBtn, { label: t("recClear"), onClick: () => { ex.log = { t: [], S: [] }; st.recT0 = st.time; chart.clear(); api.persist(); } }]),
          C.note(t("constants"), "small")));
      api.extra.append(chart.el);
      const saver = setInterval(() => { if (st.rec) api.persist(); }, 5000);
      api.onDestroy(() => clearInterval(saver));
      return { onClear() { ex.log = { t: [], S: [] }; chart.clear(); api.persist(); } };
    },

    selfTest() {
      // son sapma: ΔS = 4 L θ, θ = τ/D  (uzak küre etkisi dahil → G·(1−β))
      const T = 500, J = 2 * P.m2 * P.d ** 2, Dk = J * ((2 * Math.PI) / T) ** 2;
      const th = torque(0, 1) / Dk;
      const dS = 4 * P.L * th * 1000;
      const g = Gend({ T, S1: dS, S2: 0 });
      return [{ name: "G (son sapma, düzeltmeli)", value: g / (1 - beta), expected: GC, tol: 0.01 }];
    },
  };
  QBL.register(def);
})();
