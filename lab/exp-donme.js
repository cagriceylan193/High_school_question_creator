// Deney 7-A – Dairesel hareket: dönme modülü, flama, E/F fotoselleri, sayaç
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const R = 15;            // disk yarıçapı (cm)
  const K = 0.42;          // eğik görünüm basıklığı
  const CX = 34, CY = 30;  // diskin ekrandaki merkezi
  const deg = (r) => (r * 180) / Math.PI, rad = (d) => (d * Math.PI) / 180;

  const text = {
    tr: {
      kicker: "Deney 7-A",
      title: "Dairesel hareket (dönme modülü)",
      short: "Hava yastıklı diski asılı kütleyle döndür; flamanın fotosellerden geçiş sürelerinden açısal hızı ve açısal ivmeyi bul.",
      tools: "Dönme modülü · flama · iki fotosel · sayaç · 1 g'lık kütleler",
      aim: "Açısal yer değiştirmeyi, ortalama açısal hızı ve açısal ivmeyi belirlemek; dönme hareketini öteleme hareketiyle karşılaştırmak.",
      theory: `<p>Dönme hareketi öteleme hareketine benzer biçimde açısal yer değiştirme φ, açısal hız ω ve açısal ivme α ile anlatılır:</p>
<p class="eq">ω = Δφ / Δt      α = Δω / Δt</p>
<p>Açısal ivme sabitse ve başlangıçta φ₀ = 0 ise</p>
<p class="eq">φ = ω₀ · t + ½ · α · t²</p>
<p><b>Düzgün dairesel harekette</b> (α = 0) φ–t grafiği eğimi ω olan bir doğrudur. <b>Durgun hâlden başlayan ivmeli harekette</b> (ω₀ = 0) φ = ½·α·t² olduğundan φ–t² grafiğinin eğimi α/2'dir.</p>
<p>Diske sarılı ip r yarıçaplı makaradan geçip m kütlesini taşır. Dönmeyi sağlayan tork τ = m·g·r'dir (ipteki gerilme ağırlıktan biraz küçüktür). Sürtünme ihmal edilirse</p>
<p class="eq">m·g·r = (I + m·r²) · α    →    I = m·r·(g − α·r) / α</p>
<p>Böylece ölçülen α'dan diskin eylemsizlik momenti I bulunur. Hava yastığı sürtünmeyi çok azaltır ama sıfırlamaz; bu yüzden düzgün harekette bile ω çok yavaş azalır.</p>`,
      steps: {
        u: [
          "Makara yarıçapını (5 cm) ve sarım sayısını seç; <b>İpi sar</b> ile ağırlıkları yukarı çek. Ağırlıklar düşüp ip çözüldükten sonra disk düzgün döner.",
          "Sayacı E→F konumuna al. F fotoselini E'den φ kadar ileri yerleştir.",
          "<b>Bırak</b>: flama E'den geçince sayaç başlar, F'den geçince durur. Süreyi tabloya yaz; her açı için üç kez ölç.",
          "Farklı açılar için tekrarla. φ–t grafiğinin eğiminden ω'yı bul.",
          "İstersen sayacı <b>Elle</b> konumuna al ve bir tam turun süresini Start/Stop ile kendin ölç; sonuçları karşılaştır.",
        ],
        a: [
          "Makara yarıçapını (2,5 cm) seç ve ipi diske 2 tur sar. E fotoseli flamanın başlangıç yerindedir: flama harekete geçer geçmez sayacı başlatır.",
          "F fotoselini E'den φ kadar ileri yerleştir, <b>Bırak</b> ile diski serbest bırak ve süreyi tabloya yaz. Her açı için üç kez ölç.",
          "Farklı açılar için tekrarla. φ–t² grafiğinin eğimi α/2'dir; α'yı ve diskin eylemsizlik momentini bul.",
        ],
      },
      u: "Düzgün dönme",
      a: "İvmeli dönme",
      setup: "Düzenek",
      radius: "Makara yarıçapı r",
      turns: "Sarım (tur)",
      mass: "Asılı kütle",
      angleF: "F fotoselinin E'ye göre açısı φ",
      wind: "İpi sar",
      release: "Bırak",
      counter: "Sayaç (Counter S)",
      mode: "Mod",
      modeEF: "E → F",
      modeMan: "Elle (Start/Stop)",
      start: "Start", stop: "Stop", reset: "Sıfırla",
      arm: "Sayacı kur",
      armed: "Sayaç kuruldu: flama E'den geçince başlayacak.",
      notWound: "Önce ipi sar.",
      noTime: "Sayaçta ölçülmüş bir süre yok.",
      colPhi: "φ (°)",
      gU: "φ = f(t)",
      gA: "φ = f(t²)",
      resW: "Açısal hız ω (φ–t eğimi)",
      resAlpha: "Açısal ivme α (2 × φ–t² eğimi)",
      resI: "Eylemsizlik momenti I = m·r·(g − α·r)/α",
      resIcat: "Kataloğa göre disk + makara",
      resNote: "Hesapta m = {m} g ve r = {r} cm kullanıldı.",
    },
    en: {
      kicker: "Experiment 7-A",
      title: "Circular motion (rotation module)",
      short: "Turn an air-bearing disc with a hanging mass; find angular velocity and angular acceleration from the times the flag passes light gates.",
      tools: "Rotation module · flag · two light gates · counter · 1 g masses",
      aim: "To determine angular displacement, mean angular velocity and angular acceleration, comparing rotation with translation.",
      theory: `<p>Rotation is described, by analogy with translation, with angular displacement φ, angular velocity ω and angular acceleration α:</p>
<p class="eq">ω = Δφ / Δt      α = Δω / Δt</p>
<p>For constant angular acceleration and φ₀ = 0:</p>
<p class="eq">φ = ω₀ · t + ½ · α · t²</p>
<p>For <b>uniform circular motion</b> (α = 0) the φ–t graph is a straight line of slope ω. For <b>accelerated motion from rest</b> (ω₀ = 0), φ = ½·α·t², so the slope of the φ–t² graph is α/2.</p>
<p>A string wound on a pulley of radius r carries the mass m. The driving torque is τ = m·g·r (the tension is slightly less than the weight). Neglecting friction</p>
<p class="eq">m·g·r = (I + m·r²) · α    →    I = m·r·(g − α·r) / α</p>
<p>So the moment of inertia I of the disc follows from the measured α. The air bearing makes friction very small but not zero, so even in uniform motion ω decreases very slowly.</p>`,
      steps: {
        u: [
          "Choose the pulley radius (5 cm) and the number of turns; <b>Wind the string</b> to lift the masses. After the masses have fallen and the string has come off, the disc turns uniformly.",
          "Set the counter to E→F. Place light gate F at an angle φ after E.",
          "<b>Release</b>: the counter starts when the flag passes E and stops at F. Write the time to the table; measure each angle three times.",
          "Repeat for different angles. Find ω from the slope of the φ–t graph.",
          "If you like, set the counter to <b>Manual</b> and time one full turn yourself with Start/Stop; compare the results.",
        ],
        a: [
          "Choose the pulley radius (2.5 cm) and wind the string 2 turns. Gate E is at the starting position of the flag: it starts the counter as soon as the flag moves.",
          "Place gate F at an angle φ after E, release the disc with <b>Release</b> and write the time to the table. Measure each angle three times.",
          "Repeat for different angles. The slope of the φ–t² graph is α/2; find α and the moment of inertia of the disc.",
        ],
      },
      u: "Uniform rotation",
      a: "Accelerated rotation",
      setup: "Apparatus",
      radius: "Pulley radius r",
      turns: "Turns wound",
      mass: "Hanging mass",
      angleF: "Angle φ of gate F after E",
      wind: "Wind the string",
      release: "Release",
      counter: "Counter",
      mode: "Mode",
      modeEF: "E → F",
      modeMan: "Manual (Start/Stop)",
      start: "Start", stop: "Stop", reset: "Reset",
      arm: "Arm counter",
      armed: "Counter armed: it starts when the flag passes E.",
      notWound: "Wind the string first.",
      noTime: "The counter has no measured time.",
      colPhi: "φ (°)",
      gU: "φ = f(t)",
      gA: "φ = f(t²)",
      resW: "Angular velocity ω (φ–t slope)",
      resAlpha: "Angular acceleration α (2 × φ–t² slope)",
      resI: "Moment of inertia I = m·r·(g − α·r)/α",
      resIcat: "Catalogue value for disc + pulley",
      resNote: "m = {m} g and r = {r} cm were used.",
    },
    de: {
      kicker: "Versuch 7-A",
      title: "Kreisbewegung (Drehmodul)",
      short: "Drehe eine luftgelagerte Scheibe mit einer Hängemasse; bestimme Winkelgeschwindigkeit und Winkelbeschleunigung aus den Durchgangszeiten der Fahne.",
      tools: "Drehmodul · Fahne · zwei Lichtschranken · Zähler · 1-g-Massen",
      aim: "Winkel, mittlere Winkelgeschwindigkeit und Winkelbeschleunigung bestimmen und die Drehung mit der Translation vergleichen.",
      theory: `<p>Die Drehbewegung wird analog zur Translation mit Drehwinkel φ, Winkelgeschwindigkeit ω und Winkelbeschleunigung α beschrieben:</p>
<p class="eq">ω = Δφ / Δt      α = Δω / Δt</p>
<p>Bei konstanter Winkelbeschleunigung und φ₀ = 0 gilt</p>
<p class="eq">φ = ω₀ · t + ½ · α · t²</p>
<p>Bei <b>gleichförmiger Kreisbewegung</b> (α = 0) ist das φ–t-Diagramm eine Gerade mit Steigung ω. Bei <b>beschleunigter Bewegung aus der Ruhe</b> (ω₀ = 0) gilt φ = ½·α·t², die Steigung des φ–t²-Diagramms ist α/2.</p>
<p>Ein auf die Rolle (Radius r) gewickelter Faden trägt die Masse m. Das antreibende Drehmoment ist τ = m·g·r (die Fadenkraft ist etwas kleiner als das Gewicht). Ohne Reibung gilt</p>
<p class="eq">m·g·r = (I + m·r²) · α    →    I = m·r·(g − α·r) / α</p>
<p>So folgt aus dem gemessenen α das Trägheitsmoment I der Scheibe. Das Luftlager verringert die Reibung stark, aber nicht auf null; daher nimmt ω auch bei gleichförmiger Drehung sehr langsam ab.</p>`,
      steps: {
        u: [
          "Wähle den Rollenradius (5 cm) und die Windungszahl; mit <b>Faden aufwickeln</b> die Massen hochziehen. Nachdem die Massen gefallen sind und der Faden abgefallen ist, dreht sich die Scheibe gleichförmig.",
          "Zähler auf E→F. Lichtschranke F um den Winkel φ hinter E stellen.",
          "<b>Loslassen</b>: Der Zähler startet beim Durchgang der Fahne durch E und stoppt bei F. Zeit eintragen; jeden Winkel dreimal messen.",
          "Für verschiedene Winkel wiederholen. ω aus der Steigung des φ–t-Diagramms bestimmen.",
          "Optional den Zähler auf <b>Manuell</b> stellen und eine volle Umdrehung selbst mit Start/Stop messen; Ergebnisse vergleichen.",
        ],
        a: [
          "Rollenradius 2,5 cm wählen und den Faden 2 Umdrehungen aufwickeln. Lichtschranke E steht an der Startlage der Fahne: Sie startet den Zähler, sobald sich die Fahne bewegt.",
          "Lichtschranke F um φ hinter E stellen, die Scheibe mit <b>Loslassen</b> freigeben und die Zeit eintragen. Jeden Winkel dreimal messen.",
          "Für verschiedene Winkel wiederholen. Die Steigung des φ–t²-Diagramms ist α/2; bestimme α und das Trägheitsmoment der Scheibe.",
        ],
      },
      u: "Gleichförmige Drehung",
      a: "Beschleunigte Drehung",
      setup: "Aufbau",
      radius: "Rollenradius r",
      turns: "Windungen",
      mass: "Hängemasse",
      angleF: "Winkel φ der Schranke F hinter E",
      wind: "Faden aufwickeln",
      release: "Loslassen",
      counter: "Zähler",
      mode: "Modus",
      modeEF: "E → F",
      modeMan: "Manuell (Start/Stop)",
      start: "Start", stop: "Stopp", reset: "Zurücksetzen",
      arm: "Zähler scharf",
      armed: "Zähler scharf: Er startet, wenn die Fahne E passiert.",
      notWound: "Wickle zuerst den Faden auf.",
      noTime: "Der Zähler hat keine gemessene Zeit.",
      colPhi: "φ (°)",
      gU: "φ = f(t)",
      gA: "φ = f(t²)",
      resW: "Winkelgeschwindigkeit ω (φ–t-Steigung)",
      resAlpha: "Winkelbeschleunigung α (2 × φ–t²-Steigung)",
      resI: "Trägheitsmoment I = m·r·(g − α·r)/α",
      resIcat: "Katalogwert Scheibe + Rolle",
      resNote: "Verwendet: m = {m} g und r = {r} cm.",
    },
  };

  const T3 = ["n1", "n2", "n3"];
  const tbl = (id) => ({
    id,
    columns: [
      { key: "phi", label: () => QBL.tx(def, "colPhi"), input: true },
      ...T3.map((k, i) => ({ key: k, label: `t${"₁₂₃"[i]} (s)`, input: true })),
      { key: "tm", label: "t̄ (s)", calc: (r, tb) => tb.avg(r, T3), digits: 3 },
      { key: "tq", label: "t̄² (s²)", calc: (r, tb) => { const m = tb.avg(r, T3); return m == null ? null : m * m; }, digits: 3 },
      { key: "rad", label: "φ (rad)", calc: (r) => (r.phi != null ? rad(r.phi) : null), digits: 3 },
    ],
    minRows: 0,
  });

  const def = {
    id: "donme",
    order: 70,
    text,
    parts: [
      {
        id: "u", title: "u", tables: [tbl("U")],
        graphs: [{ id: "gu", title: () => QBL.tx(def, "gU"), x: { key: "tm", label: "t̄ (s)" }, y: { key: "rad", label: "φ (rad)" }, series: [{ table: "U", name: "" }], fit: "line", fits: ["line", "prop"], zeroX: true, zeroY: true, slopeUnit: "rad/s" }],
        results(c) {
          const f = c.fit("gu");
          return f ? [{ label: c.t("resW"), value: f.a, err: f.sa, unit: "rad/s" }] : [];
        },
      },
      {
        id: "a", title: "a", tables: [tbl("A")],
        graphs: [{ id: "ga", title: () => QBL.tx(def, "gA"), x: { key: "tq", label: "t̄² (s²)" }, y: { key: "rad", label: "φ (rad)" }, series: [{ table: "A", name: "" }], fit: "prop", fits: ["prop", "line"], zeroX: true, zeroY: true, slopeUnit: "rad/s²" }],
        results(c) {
          const f = c.fit("ga");
          if (!f) return [];
          const alpha = 2 * f.a, da = 2 * f.sa;
          const mem = c.api.mem;
          const m = (mem.mass || 3) / 1000, r = (mem.rA || 2.5) / 100;
          const I = (m * r * (G - alpha * r)) / alpha;
          return [
            { label: c.t("resAlpha"), value: alpha, err: da, unit: "rad/s²" },
            { label: c.t("resI"), value: I * 1e4, err: (I * da) / alpha * 1e4, unit: "×10⁻⁴ kg·m²", ref: mem.Icat ? mem.Icat * 1e4 : null, refText: mem.Icat ? QBL.fixed(mem.Icat * 1e4, 1) + " ×10⁻⁴ kg·m²" : null },
            { text: c.t("resNote", { m: mem.mass || 3, r: QBL.fixed((mem.rA || 2.5), 1) }) },
          ];
        },
      },
    ],

    mount(api) {
      const { C, t, mem } = api;
      const Idisk = QBL.between(api.rng, 4.6e-3, 5.4e-3);
      mem.Icat = Math.round(Idisk * 1e5) / 1e5;
      const fr = QBL.between(api.rng, 1.2e-5, 3.0e-5);  // sürtünme torku (N·m)
      const st = {
        part: api.part,
        r: api.part === "a" ? 2.5 : 5, turns: api.part === "a" ? 2 : 0.5, mass: mem.mass || 3,
        phiF: mem.phiF ?? 90,
        phi: 0, w: 0, wound: false, string: 0, held: true, ePos: 0,
        mode: "EF", ctr: { armed: false, run: false, t: 0, val: null, startPhi: 0 },
        man: { run: false, t0: 0, val: 0 },
        time: 0,
      };
      const save = () => { mem.mass = st.mass; mem.phiF = st.phiF; mem.rA = st.part === "a" ? st.r : mem.rA; };
      // flama başlangıçta E'de (ivmeli) ya da E'nin gerisinde (düzgün) durur
      const ePos = () => (st.part === "a" ? 0 : rad(200));
      const fPos = () => ePos() + rad(st.phiF);

      function wind() {
        st.held = true; st.w = 0;
        st.string = st.turns * 2 * Math.PI;           // sarılı açı
        st.phi = st.part === "a" ? ePos() : ePos() - st.string - rad(25);
        st.wound = true;
        st.ctr = { armed: st.mode === "EF", run: false, t: 0, val: null };
        lcd.set("0.000");
      }
      function release() {
        if (!st.wound) { api.status(t("notWound"), "bad"); return; }
        st.held = false;
        // ivmeli bölümde E fotoseli flamanın tam önündedir: sayaç bırakma anında başlar
        if (st.part === "a" && st.mode === "EF") { st.ctr = { armed: false, run: true, t: 0, val: null }; }
        api.status("");
      }
      function step(dt) {
        if (st.man.run) lcd.set(((performance.now() - st.man.t0) / 1000).toFixed(3));
        if (st.held) return;
        const n = Math.max(1, Math.ceil(dt / 0.001));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          const m = st.mass / 1000, r = st.r / 100;
          const pulling = st.string > 0;
          const I = Idisk + (pulling ? m * r * r : 0);
          let tau = -Math.sign(st.w || 1) * fr;
          if (pulling) tau += m * G * r;
          const prev = st.phi;
          st.w += (tau / I) * h;
          if (!pulling && st.w < 0) st.w = 0;
          st.phi += st.w * h;
          if (pulling) st.string = Math.max(0, st.string - (st.phi - prev));
          st.time += h;
          // fotoseller (flama E/F açısından geçiş)
          const cross = (a) => { const k = Math.floor((prev - a) / (2 * Math.PI)); const tgt = a + (k + 1) * 2 * Math.PI; return prev < tgt && st.phi >= tgt; };
          const ctr = st.ctr;
          if (st.mode === "EF") {
            if (ctr.armed && !ctr.run && cross(ePos())) { ctr.run = true; ctr.t = 0; ctr.armed = false; }
            else if (ctr.run) {
              ctr.t += h;
              if (cross(fPos())) { ctr.run = false; ctr.val = Math.round(ctr.t * 1000) / 1000; lcd.set(ctr.val.toFixed(3)); }
            }
          }
        }
        if (st.ctr.run) lcd.set(st.ctr.t.toFixed(3));
      }

      // --- çizim (eğik görünüm)
      const P = (x, y, z = 0) => [CX + x, CY + K * y - z];
      function drawGate(c, a, label, active, S) {
        const [x, y] = P((R + 0.6) * Math.cos(a), -(R + 0.6) * Math.sin(a), 0);
        c.fillStyle = "#2b3138";
        D.rr(c, x - 1.1, y - 4.2, 2.2, 5.4, 0.3);
        c.fill();
        D.led(c, x, y - 3.5, 0.3, active, "#ff3b2f");
        D.text(c, label, x, y - 5, { size: 1.6, color: S.colors.ink, align: "center", base: "bottom", weight: 600 });
      }
      function draw(c, S) {
        D.wall(c, S);
        D.bench(c, S, -5, 80, CY + 12, 4);
        // gövde
        c.fillStyle = D.metal(c, CX - 12, 0, CX + 12, 0, "dark");
        D.rr(c, CX - 12, CY + 2, 24, 9, 1);
        c.fill();
        // disk yan yüzü
        c.fillStyle = D.metal(c, CX - R, 0, CX + R, 0, "alu");
        c.beginPath();
        c.ellipse(CX, CY + 1.4, R, R * K, 0, 0, Math.PI);
        c.lineTo(CX - R, CY);
        c.ellipse(CX, CY, R, R * K, 0, Math.PI, 0, true);
        c.closePath();
        c.fill();
        // disk üst yüzü
        const g = c.createRadialGradient(CX - 4, CY - 3, 1, CX, CY, R);
        g.addColorStop(0, "#f4f6f8"); g.addColorStop(1, "#aab2ba");
        c.fillStyle = g;
        c.beginPath();
        c.ellipse(CX, CY, R, R * K, 0, 0, Math.PI * 2);
        c.fill();
        // açı çizgileri (diskle döner)
        c.strokeStyle = "rgba(0,0,0,0.25)";
        c.lineWidth = S.px;
        for (let k = 0; k < 36; k++) {
          const a = st.phi + rad(k * 10);
          const [x1, y1] = P(R * 0.86 * Math.cos(a), -R * 0.86 * Math.sin(a));
          const [x2, y2] = P(R * Math.cos(a), -R * Math.sin(a));
          c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
        }
        // basamaklı makara
        for (const [rr, z] of [[5, 0.8], [2.5, 2.0]]) {
          c.fillStyle = D.metal(c, CX - rr, 0, CX + rr, 0, "dark");
          c.beginPath();
          c.ellipse(CX, CY - z, rr, rr * K, 0, 0, Math.PI * 2);
          c.fill();
          c.strokeStyle = rr === st.r ? "#c9a24a" : "rgba(255,255,255,0.2)";
          c.lineWidth = rr === st.r && st.string > 0 ? 0.35 : 0.08;
          c.stroke();
        }
        // ip: makaradan saptırma makarasına, oradan aşağı kütleye
        const zr = st.r === 5 ? 0.8 : 2.0;
        const pul = P(R + 14, 0, zr);
        const top = pul[1] + 2;
        const room = CY + 27 - (top + 4) - st.mass * 0.7;
        const frac = st.wound ? 1 - st.string / (st.turns * 2 * Math.PI) : 1;
        const massY = top + 4 + room * frac;
        if (st.string > 0 || !st.wound) {
          const [sx, sy] = P(0, st.r, zr);
          D.string(c, [[sx, sy], [pul[0], pul[1]], [pul[0] + 0.9, pul[1] + 0.9], [pul[0] + 0.9, massY]], S.colors.string, 0.08);
        }
        D.pulley(c, pul[0], pul[1] + 0.9, 0.9, st.phi * 3);
        // tabure ve kütleler
        c.fillStyle = "#7a5a3a";
        c.fillRect(pul[0] - 2.5, CY + 27, 6.8, 1.2);
        c.fillRect(pul[0] - 2, CY + 28.2, 0.8, 3.8);
        c.fillRect(pul[0] + 3, CY + 28.2, 0.8, 3.8);
        const my = massY;
        for (let k = 0; k < st.mass; k++) {
          c.fillStyle = D.metal(c, pul[0], 0, pul[0] + 2, 0, "brass");
          c.fillRect(pul[0] + 0.2, my + k * 0.7, 1.4, 0.6);
        }
        // fotoseller (arkadakiler önce)
        drawGate(c, ePos(), "E", st.ctr.run, S);
        drawGate(c, fPos(), "F", false, S);
        // flama
        const a = st.phi;
        const [fx, fy] = P(R * 0.94 * Math.cos(a), -R * 0.94 * Math.sin(a), 0);
        c.fillStyle = "#16191c";
        c.fillRect(fx - 0.35, fy - 3.2, 0.7, 3.2);
        // sayaç
        const shown = st.mode === "EF" ? (st.ctr.run ? st.ctr.t : st.ctr.val || 0) : st.man.run ? (performance.now() - st.man.t0) / 1000 : st.man.val;
        D.counter(c, 58, 4, 20, 9, shown.toFixed(3), { cells: 5, unit: "s", label: "COUNTER S", body: "#2f6db3" });
      }
      const stage = api.stage({ world: [0, 2, 80, 64], maxH: 560, lensZoom: 4, label: t("title"), draw, step });

      // --- denetimler
      const lcd = C.lcd({ label: t("counter"), cells: 6, unit: "s", value: "0.000" });
      lcd.set("0.000");
      const rSeg = C.segment({ label: t("radius"), value: st.r, options: [{ value: 2.5, label: "2,5 cm" }, { value: 5, label: "5 cm" }], onChange(v) { st.r = Number(v); st.wound = false; st.string = 0; save(); } });
      const turnSeg = C.segment({ label: t("turns"), value: st.turns, options: [0.5, 1, 2].map((n) => ({ value: n, label: String(n).replace(".", api.lang === "en" ? "." : ",") })), onChange(v) { st.turns = Number(v); st.wound = false; st.string = 0; } });
      const mSeg = C.segment({ label: t("mass"), value: st.mass, options: [2, 3, 4].map((n) => ({ value: n, label: n + " g" })), onChange(v) { st.mass = Number(v); save(); } });
      const fSl = C.slider({ label: t("angleF"), min: 30, max: 330, step: 5, value: st.phiF, digits: 0, unit: "°", fine: [-5, 5], onInput(v) { st.phiF = v; save(); } });
      const modeSeg = C.segment({ label: t("mode"), value: "EF", options: [{ value: "EF", label: t("modeEF") }, { value: "MAN", label: t("modeMan") }], onChange(v) { st.mode = v; manBtns.hidden = v !== "MAN"; } });
      const manBtns = C.buttons([
        { label: t("start"), onClick: () => { st.man = { run: true, t0: performance.now(), val: 0 }; } },
        { label: t("stop"), onClick: () => { if (st.man.run) { st.man.val = Math.round((performance.now() - st.man.t0) / 10) / 100; st.man.run = false; lcd.set(st.man.val.toFixed(3)); } } },
      ]);
      manBtns.hidden = true;
      function record() {
        const val = st.mode === "EF" ? st.ctr.val : st.man.val;
        if (!val) { api.status(t("noTime"), "bad"); return; }
        const tid = st.part === "a" ? "A" : "U";
        const phi = st.mode === "EF" ? st.phiF : 360;
        api.record(tid, val, { match: { phi }, group: T3, raw: val.toFixed(3) });
      }
      api.panel.append(
        C.group(t("setup"), rSeg.el, turnSeg.el, mSeg.el, fSl.el,
          C.buttons([{ label: t("wind"), onClick: wind }, { label: t("release"), primary: true, onClick: release }])),
        C.group(t("counter"), modeSeg.el, lcd.el, manBtns, C.buttons([{ label: api.tg("labRecord"), onClick: record }])));
      api.onPart((p) => {
        st.part = p;
        st.r = p === "a" ? 2.5 : 5; rSeg.value = st.r;
        st.turns = p === "a" ? 2 : 0.5; turnSeg.value = st.turns;
        st.wound = false; st.string = 0; st.held = true; st.w = 0; st.phi = ePos() - rad(30);
        save();
      });
      st.phi = ePos() - rad(30);
      return {};
    },

    selfTest() {
      // ivmeli: φ = ½αt² → 2·eğim = α; I'nın geri bulunması
      const I = 5e-3, m = 0.003, r = 0.025;
      const alpha = (m * G * r) / (I + m * r * r);
      const xs = [], ys = [];
      for (const d of [30, 60, 90, 120, 180, 270]) { const ph = rad(d); const tt = Math.sqrt((2 * ph) / alpha); xs.push(tt * tt); ys.push(ph); }
      const f = QBL.fitProp(xs, ys);
      const a2 = 2 * f.a;
      return [{ name: "I (dönme)", value: (m * r * (G - a2 * r)) / a2, expected: I, tol: 1e-6 }];
    },
  };
  QBL.register(def);
})();
