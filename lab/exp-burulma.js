// Deney 10-B – Burulma modülü: burulma sarkacı (tel + çubuk + diskler), mikrometre, kronometre
(function () {
  "use strict";
  const D = QBL.D;
  const MAT = {
    steel: { phi: [78e9, 82e9], ref: 80, d: 0.8 },
    brass: { phi: [34e9, 38e9], ref: 36, d: 1.0 },
    copper: { phi: [43e9, 47e9], ref: 45, d: 1.0 },
  };
  const TOP = 6, K = 0.35;

  const text = {
    tr: {
      kicker: "Deney 10-B",
      title: "Burulma (torsiyon) modülü",
      short: "Tele asılı çubuğu burup bırak, periyodunu ölç; disk ekleyerek telin burulma sabitini, burulma modülünü ve düzensiz bir cismin eylemsizlik momentini bul.",
      tools: "Burulma sarkacı · çubuk ve diskler · mikrometre · metre · kronometre",
      aim: "Metal bir telin burulma sabitini ve burulma modülünü, düzgün olmayan bir cismin eylemsizlik momentini ölçmek.",
      theory: `<p>Kütle merkezinden geçen bir tele asılmış bir cisim tel ekseni çevresinde biraz burulup bırakılırsa açısal harmonik hareket yapar (burulma sarkacı). Periyot</p>
<p class="eq">T = 2π · √(I / D₀)</p>
<p>I cismin dönme eksenine göre eylemsizlik momenti, D₀ telin burulma sabitidir (birim açı başına geri çağırıcı tork). D₀ ile telin burulma modülü Φ arasında</p>
<p class="eq">Φ = 2 · L · D₀ / (π · r⁴)</p>
<p>ilişkisi vardır; L telin boyu, r yarıçapıdır. Önce yalnız çubukla T, sonra çubuğun uçlarına kütlesi m olan iki disk takılarak T′ ölçülür. Disklerin eklediği eylemsizlik momenti (Steiner teoremiyle) ΔI = 2·[m·(d/2)² + ½·m·R²]'dir (d: diskler arası uzaklık, R: disk yarıçapı). İki ölçümden</p>
<p class="eq">D₀ = 4π² · ΔI / (T′² − T²)       I_çubuk = D₀ · T² / (4π²)</p>
<p>bulunur. Böylece çubuğun eylemsizlik momenti hesap gerektirmeden ölçülmüş olur; M·a²/12 değeriyle karşılaştırılabilir. Düzensiz bir cisim takılınca ölçülen T″'dan I_cisim = D₀·T″²/(4π²) − I_çubuk bulunur. r dördüncü kuvvetle girdiği için telin çapı çok dikkatli ölçülmelidir.</p>`,
      steps: [
        "<b>Mikrometre</b> görünümünde telin çapını üç farklı yerden ölç ve tabloya yaz. Telin boyunu düzenekteki metreden oku.",
        "Yalnız çubuk takılıyken çubuğu küçük bir açıyla bur ve bırak (sürükle ya da <b>Bur ve bırak</b>). Kronometreyle 10 periyodun süresini ölç; üç kez tekrarla.",
        "Diskleri tak ve aynı ölçümü yap (T′). Disklerin kütlesi ve aralarındaki uzaklık etiketlerde yazılıdır.",
        "Diskleri çıkarıp düzensiz cismi tak ve T″'yü ölç.",
        "Sonuçlarda D₀'ı, Φ'yi ve cismin eylemsizlik momentini bul; çubuğun ölçülen eylemsizlik momentini M·a²/12 ile karşılaştır.",
      ],
      partMain: "Burulma sarkacı",
      view: "Görünüm",
      viewSetup: "Düzenek",
      viewMic: "Mikrometre",
      load: "Tele takılı olan",
      loadBar: "Yalnız çubuk",
      loadDisks: "Çubuk + diskler",
      loadObj: "Çubuk + düzensiz cisim",
      amp: "Burma açısı",
      twist: "Bur ve bırak",
      stop: "Durdur",
      wire: "Tel: {m}",
      steel: "çelik", brass: "pirinç", copper: "bakır",
      labels: "Etiketler: çubuk M = {M} g, a = {a} cm; her disk m = {m} g, R = {R} cm; diskler arası d = {d} cm",
      where: "Ölçüm yeri", pos: "{n}. yer", close: "Kapat", open: "Aç", slideMic: "Tamburu çevir",
      tableW: "Telin çapı (mikrometre) ve boyu",
      tableT: "Periyotlar (10 salınım)",
      colLoad: "Durum",
      rowBar: "Çubuk (T)", rowDisks: "Çubuk + diskler (T′)", rowObj: "Çubuk + cisim (T″)",
      colPos: "Yer",
      resD0: "Burulma sabiti D₀",
      resIbar: "Çubuğun eylemsizlik momenti (ölçülen)",
      resIbarTh: "Çubuğun eylemsizlik momenti M·a²/12",
      resPhi: "Burulma modülü Φ",
      resIobj: "Düzensiz cismin eylemsizlik momenti",
      need: "Hesap için T ve T′ periyotları ile telin çapı ve boyu gerekli.",
      recorded: "Çap: {v} mm kaydedildi.",
    },
    en: {
      kicker: "Experiment 10-B",
      title: "Torsion modulus",
      short: "Twist a bar hanging on a wire and time its oscillations; add discs to find the torsion constant and modulus of the wire and the moment of inertia of an irregular body.",
      tools: "Torsion pendulum · bar and discs · micrometer · metre stick · stopwatch",
      aim: "To measure the torsion constant and the torsion (shear) modulus of a metal wire and the moment of inertia of an irregular body.",
      theory: `<p>A body hanging on a wire through its centre of mass, twisted a little about the wire and released, performs angular harmonic motion (torsion pendulum). The period is</p>
<p class="eq">T = 2π · √(I / D₀)</p>
<p>I is the moment of inertia about the axis and D₀ the torsion constant of the wire (restoring torque per unit angle). D₀ is related to the torsion modulus Φ of the wire by</p>
<p class="eq">Φ = 2 · L · D₀ / (π · r⁴)</p>
<p>L is the length and r the radius of the wire. First T is measured with the bar alone, then T′ with two discs of mass m on the ends of the bar. The discs add (by the parallel-axis theorem) ΔI = 2·[m·(d/2)² + ½·m·R²] (d: distance between the discs, R: disc radius). From the two measurements</p>
<p class="eq">D₀ = 4π² · ΔI / (T′² − T²)       I_bar = D₀ · T² / (4π²)</p>
<p>So the moment of inertia of the bar is measured without calculation and can be compared with M·a²/12. With an irregular body attached, the measured T″ gives I_body = D₀·T″²/(4π²) − I_bar. As r enters to the fourth power, the wire diameter must be measured very carefully.</p>`,
      steps: [
        "In the <b>Micrometer</b> view, measure the wire diameter at three places and enter it. Read the wire length on the metre stick in the apparatus.",
        "With only the bar attached, twist it through a small angle and release (drag it or use <b>Twist and release</b>). Time 10 periods with the stopwatch; repeat three times.",
        "Attach the discs and make the same measurement (T′). The mass of the discs and their separation are written on the labels.",
        "Remove the discs, attach the irregular body and measure T″.",
        "In the results find D₀, Φ and the moment of inertia of the body; compare the measured moment of inertia of the bar with M·a²/12.",
      ],
      partMain: "Torsion pendulum",
      view: "View",
      viewSetup: "Apparatus",
      viewMic: "Micrometer",
      load: "Attached to the wire",
      loadBar: "Bar only",
      loadDisks: "Bar + discs",
      loadObj: "Bar + irregular body",
      amp: "Twist angle",
      twist: "Twist and release",
      stop: "Stop",
      wire: "Wire: {m}",
      steel: "steel", brass: "brass", copper: "copper",
      labels: "Labels: bar M = {M} g, a = {a} cm; each disc m = {m} g, R = {R} cm; discs d = {d} cm apart",
      where: "Place", pos: "place {n}", close: "Close", open: "Open", slideMic: "Turn the thimble",
      tableW: "Wire diameter (micrometer) and length",
      tableT: "Periods (10 oscillations)",
      colLoad: "Setup",
      rowBar: "Bar (T)", rowDisks: "Bar + discs (T′)", rowObj: "Bar + body (T″)",
      colPos: "Place",
      resD0: "Torsion constant D₀",
      resIbar: "Moment of inertia of the bar (measured)",
      resIbarTh: "Moment of inertia of the bar M·a²/12",
      resPhi: "Torsion modulus Φ",
      resIobj: "Moment of inertia of the irregular body",
      need: "The calculation needs the periods T and T′ and the wire diameter and length.",
      recorded: "Diameter: {v} mm saved.",
    },
    de: {
      kicker: "Versuch 10-B",
      title: "Torsionsmodul",
      short: "Verdrille einen an einem Draht hängenden Stab und miss die Schwingungsdauer; mit Zusatzscheiben bestimmst du Richtgröße und Torsionsmodul des Drahtes sowie das Trägheitsmoment eines unregelmäßigen Körpers.",
      tools: "Torsionspendel · Stab und Scheiben · Bügelmessschraube · Maßstab · Stoppuhr",
      aim: "Richtgröße und Torsionsmodul (Schubmodul) eines Metalldrahtes sowie das Trägheitsmoment eines unregelmäßigen Körpers messen.",
      theory: `<p>Ein Körper, der an einem Draht durch seinen Schwerpunkt hängt und etwas verdrillt losgelassen wird, führt Drehschwingungen aus (Torsionspendel). Die Periode ist</p>
<p class="eq">T = 2π · √(I / D₀)</p>
<p>I ist das Trägheitsmoment bezüglich der Achse, D₀ die Richtgröße des Drahtes (rücktreibendes Drehmoment je Winkel). D₀ hängt mit dem Torsionsmodul Φ zusammen:</p>
<p class="eq">Φ = 2 · L · D₀ / (π · r⁴)</p>
<p>L ist die Länge, r der Radius des Drahtes. Zuerst wird T mit dem Stab allein gemessen, dann T′ mit zwei Scheiben der Masse m an den Stabenden. Die Scheiben fügen (Satz von Steiner) ΔI = 2·[m·(d/2)² + ½·m·R²] hinzu (d: Scheibenabstand, R: Scheibenradius). Aus beiden Messungen folgt</p>
<p class="eq">D₀ = 4π² · ΔI / (T′² − T²)       I_Stab = D₀ · T² / (4π²)</p>
<p>So wird das Trägheitsmoment des Stabes gemessen statt berechnet und kann mit M·a²/12 verglichen werden. Mit einem unregelmäßigen Körper liefert T″ das Trägheitsmoment I_Körper = D₀·T″²/(4π²) − I_Stab. Da r in vierter Potenz eingeht, muss der Drahtdurchmesser sehr sorgfältig gemessen werden.</p>`,
      steps: [
        "In der Ansicht <b>Messschraube</b> den Drahtdurchmesser an drei Stellen messen und eintragen. Die Drahtlänge am Maßstab im Aufbau ablesen.",
        "Mit dem Stab allein diesen um einen kleinen Winkel verdrillen und loslassen (ziehen oder <b>Verdrillen und loslassen</b>). 10 Perioden mit der Stoppuhr messen; dreimal wiederholen.",
        "Scheiben anbringen und dieselbe Messung durchführen (T′). Masse und Abstand der Scheiben stehen auf den Etiketten.",
        "Scheiben abnehmen, den unregelmäßigen Körper anbringen und T″ messen.",
        "In den Ergebnissen D₀, Φ und das Trägheitsmoment des Körpers bestimmen; das gemessene Trägheitsmoment des Stabes mit M·a²/12 vergleichen.",
      ],
      partMain: "Torsionspendel",
      view: "Ansicht",
      viewSetup: "Aufbau",
      viewMic: "Messschraube",
      load: "Am Draht",
      loadBar: "Nur Stab",
      loadDisks: "Stab + Scheiben",
      loadObj: "Stab + unregelmäßiger Körper",
      amp: "Verdrillwinkel",
      twist: "Verdrillen und loslassen",
      stop: "Anhalten",
      wire: "Draht: {m}",
      steel: "Stahl", brass: "Messing", copper: "Kupfer",
      labels: "Etiketten: Stab M = {M} g, a = {a} cm; jede Scheibe m = {m} g, R = {R} cm; Scheibenabstand d = {d} cm",
      where: "Messstelle", pos: "Stelle {n}", close: "Schließen", open: "Öffnen", slideMic: "Trommel drehen",
      tableW: "Drahtdurchmesser (Messschraube) und Länge",
      tableT: "Perioden (10 Schwingungen)",
      colLoad: "Aufbau",
      rowBar: "Stab (T)", rowDisks: "Stab + Scheiben (T′)", rowObj: "Stab + Körper (T″)",
      colPos: "Stelle",
      resD0: "Richtgröße D₀",
      resIbar: "Trägheitsmoment des Stabes (gemessen)",
      resIbarTh: "Trägheitsmoment des Stabes M·a²/12",
      resPhi: "Torsionsmodul Φ",
      resIobj: "Trägheitsmoment des unregelmäßigen Körpers",
      need: "Für die Rechnung werden T, T′ sowie Durchmesser und Länge des Drahtes benötigt.",
      recorded: "Durchmesser: {v} mm gespeichert.",
    },
  };

  const N3 = ["n1", "n2", "n3"];
  const tauOf = (tb, i) => { const r = tb.rows[i]; const a = r ? tb.avg(r, N3) : null; return a == null ? null : a / 10; };
  const def = {
    id: "burulma",
    order: 105,
    text,
    parts: [{
      id: "main", title: "partMain",
      tables: [
        {
          id: "w", title: () => QBL.tx(def, "tableW"),
          columns: [{ key: "p", label: () => QBL.tx(def, "colPos"), fixed: true }, { key: "d", label: "2r (mm)", input: true }, { key: "L", label: "L (cm)", input: true }],
          rows: [1, 2, 3].map((p) => ({ p, $p: String(p) })), fixedRows: true,
        },
        {
          id: "T", title: () => QBL.tx(def, "tableT"),
          columns: [
            { key: "lab", label: () => QBL.tx(def, "colLoad"), fixed: true, text: true },
            ...N3.map((k, i) => ({ key: k, label: `10T${"₁₂₃"[i]} (s)`, input: true })),
            { key: "T", label: "T̄ (s)", calc: (r, tb) => { const a = tb.avg(r, N3); return a == null ? null : a / 10; }, digits: 3 },
          ],
          rows: [{ k: "bar" }, { k: "disks" }, { k: "obj" }], fixedRows: true,
        },
      ],
      results(c) {
        const out = [];
        const mem = c.api.mem, P = mem.P;
        if (!P) return out;
        const tw = c.table("w"), tt = c.table("T");
        const ds = tw.values("d"), Ls = tw.values("L");
        const T = tauOf(tt, 0), T2 = tauOf(tt, 1), T3 = tauOf(tt, 2);
        const dI = 2 * ((P.m / 1000) * (P.d / 200) ** 2 + 0.5 * (P.m / 1000) * (P.R / 100) ** 2);
        out.push({ label: c.t("resIbarTh"), value: ((P.M / 1000) * (P.a / 100) ** 2) / 12 * 1e4, unit: "×10⁻⁴ kg·m²", digits: 2 });
        if (!(T && T2 && T2 > T)) { out.push({ text: c.t("need") }); return out; }
        const D0 = (4 * Math.PI ** 2 * dI) / (T2 * T2 - T * T);
        out.push({ label: c.t("resD0"), value: D0 * 1e3, unit: "×10⁻³ N·m/rad", digits: 3 });
        const Ib = (D0 * T * T) / (4 * Math.PI ** 2);
        out.push({ label: c.t("resIbar"), value: Ib * 1e4, unit: "×10⁻⁴ kg·m²", digits: 2, ref: ((P.M / 1000) * (P.a / 100) ** 2) / 12 * 1e4, refText: QBL.fixed(((P.M / 1000) * (P.a / 100) ** 2) / 12 * 1e4, 2) });
        if (ds.length && Ls.length) {
          const r = QBL.mean(ds) / 2000, L = QBL.mean(Ls) / 100;
          const phi = (2 * L * D0) / (Math.PI * r ** 4);
          const rel = 4 * (Math.max(QBL.meanDev(ds), 0.01) / QBL.mean(ds)) + 0.002 / L + 2 * (0.02 / T2);
          out.push({ label: c.t("resPhi"), value: phi / 1e9, err: (phi / 1e9) * rel, unit: "GPa", ref: MAT[mem.mat].ref });
        } else out.push({ text: c.t("need") });
        if (T3) out.push({ label: c.t("resIobj"), value: ((D0 * T3 * T3) / (4 * Math.PI ** 2) - Ib) * 1e4, unit: "×10⁻⁴ kg·m²", digits: 2, ref: mem.Iobj * 1e4, refText: QBL.fixed(mem.Iobj * 1e4, 2) });
        return out;
      },
    }],

    mount(api) {
      const { C, t, mem } = api;
      const mat = (mem.mat = mem.mat || ["steel", "brass", "copper"][Math.floor(api.rng() * 3)]);
      const phi = QBL.between(api.rng, MAT[mat].phi[0], MAT[mat].phi[1]);
      const dW = MAT[mat].d * QBL.between(api.rng, 0.92, 1.05);            // mm
      const dWs = [0, 1, 2].map(() => dW + 0.004 * QBL.gauss(api.rng));
      const Lw = QBL.between(api.rng, 52, 70);                              // cm
      const P = (mem.P = mem.P || {
        M: Math.round(QBL.between(api.rng, 160, 240)), a: 30, m: Math.round(QBL.between(api.rng, 110, 150)), R: 2.0, d: 26,
      });
      mem.Iobj = mem.Iobj || QBL.between(api.rng, 1.6e-3, 3.2e-3);
      const D0 = (Math.PI * (QBL.mean(dWs) / 2000) ** 4 * phi) / (2 * (Lw / 100));
      const Ibar = ((P.M / 1000) * ((P.a / 100) ** 2 + 0.012 ** 2)) / 12;
      const dI = 2 * ((P.m / 1000) * (P.d / 200) ** 2 + 0.5 * (P.m / 1000) * (P.R / 100) ** 2);
      const st = { view: mem.view || "setup", load: mem.load || "bar", th: 0, w: 0, amp: 20, hold: null, pos: 1, drag: false };
      const I = () => Ibar + (st.load === "disks" ? dI : st.load === "obj" ? mem.Iobj : 0);
      const save = () => Object.assign(mem, { view: st.view, load: st.load });
      const mic = QBL.Gauge.micrometer({ s: 4, zero: 0 });

      // tablo satır etiketleri
      api.table("T").rows.forEach((r, i) => { r.lab = t(["rowBar", "rowDisks", "rowObj"][i]); });

      function step(dt) {
        if (st.hold != null) { st.th = st.hold; st.w = 0; return; }
        const n = Math.max(1, Math.ceil(dt / 0.002));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          st.w += ((-D0 * st.th) / I() - (2 / 400) * st.w) * h;
          st.th += st.w * h;
        }
      }
      const BY = TOP + Lw; // çubuğun yüksekliği (dünya, cm)
      function drawSetup(c, S) {
        D.wall(c, S);
        // tavan desteği
        c.fillStyle = D.metal(c, 0, 0, 0, TOP, "dark");
        c.fillRect(10, TOP - 3.5, 40, 3.5);
        // metre (solda)
        D.ruler(c, { x: 17.5, y: TOP, len: 75, dir: "v", side: "right", w: 2.4, px: S.px, fontSize: 0.75 });
        // tel
        c.strokeStyle = mat === "steel" ? "#7d868f" : mat === "brass" ? "#b38a2f" : "#b8673a";
        c.lineWidth = 0.12;
        c.beginPath(); c.moveTo(30, TOP); c.lineTo(30, BY); c.stroke();
        // açı ölçer (altta)
        c.fillStyle = "rgba(240,246,250,0.75)";
        c.beginPath(); c.ellipse(30, BY + 6, 18, 18 * K, 0, 0, Math.PI * 2); c.fill();
        c.strokeStyle = "rgba(20,40,60,0.5)"; c.lineWidth = S.px;
        for (let d = 0; d < 360; d += 10) {
          const a = (d * Math.PI) / 180;
          const r1 = d % 30 === 0 ? 15.5 : 16.8;
          c.beginPath(); c.moveTo(30 + r1 * Math.cos(a), BY + 6 + r1 * Math.sin(a) * K); c.lineTo(30 + 18 * Math.cos(a), BY + 6 + 18 * Math.sin(a) * K); c.stroke();
        }
        // çubuk (eğik görünümde döner)
        const a = st.th;
        const half = P.a / 2;
        const ex = half * Math.cos(a), ey = half * Math.sin(a) * K;
        c.strokeStyle = D.metal(c, 30 - ex, BY - 1, 30 + ex, BY + 1, "alu");
        c.lineWidth = 1.2;
        c.lineCap = "round";
        c.beginPath(); c.moveTo(30 - ex, BY - ey); c.lineTo(30 + ex, BY + ey); c.stroke();
        c.lineCap = "butt";
        c.fillStyle = "#2a2f35";
        c.fillRect(29.3, BY - 1.6, 1.4, 1.8);
        // ibre
        c.strokeStyle = "#c62828"; c.lineWidth = 0.15;
        c.beginPath(); c.moveTo(30, BY + 0.4); c.lineTo(30 + 16 * Math.cos(a + Math.PI / 2), BY + 0.4 + 16 * Math.sin(a + Math.PI / 2) * K); c.stroke();
        // diskler ya da cisim
        if (st.load === "disks") {
          for (const s of [1, -1]) {
            const dx = (s * P.d) / 2 * Math.cos(a), dy = (s * P.d) / 2 * Math.sin(a) * K;
            c.fillStyle = D.metal(c, 30 + dx - 2, 0, 30 + dx + 2, 0, "brass");
            c.beginPath(); c.ellipse(30 + dx, BY + dy - 0.4, P.R, P.R * K, 0, 0, Math.PI * 2); c.fill();
            c.fillRect(30 + dx - P.R, BY + dy - 1.4, 2 * P.R, 1);
          }
        } else if (st.load === "obj") {
          c.fillStyle = "#8b5a2b";
          c.save();
          c.translate(30, BY - 1.2);
          c.scale(1, K * 2.2);
          c.rotate(a);
          c.beginPath();
          c.moveTo(-11, -1.5); c.quadraticCurveTo(-4, -4, 0, -1); c.quadraticCurveTo(6, 3, 13, 1.2); c.lineTo(12, 2.8); c.quadraticCurveTo(4, 4, 0, 1); c.quadraticCurveTo(-5, -1, -11, 0.5);
          c.closePath();
          c.fill();
          c.restore();
        }
      }
      function drawMic(c, S) {
        D.wall(c, S);
        const v = S.view;
        c.fillStyle = S.colors.dark ? "#22302a" : "#dfe7e0";
        c.fillRect(v.x0, v.y0, v.x1 - v.x0, v.y1 - v.y0);
        mic.draw(c, S);
      }
      const draw = (c, S) => (st.view === "mic" ? drawMic(c, S) : drawSetup(c, S));
      const WS = [4, 0, 56, BY + 14];
      const stage = api.stage({
        world: st.view === "mic" ? mic.world : WS, maxH: 620, lensZoom: 5, label: t("title"), draw, step,
        pointer: {
          down(p) {
            if (st.view === "mic") { if (mic.hit(p)) { mic.drag(p, true); st.drag = "mic"; return true; } return false; }
            if (Math.abs(p.y - BY) < 5 && Math.abs(p.x - 30) < P.a / 2 + 2) { st.drag = "bar"; st.hold = st.th; st.x0 = p.x; return true; }
            return false;
          },
          move(p) {
            if (st.drag === "mic") { mic.drag(p, false); gp.sync(); }
            else if (st.drag === "bar") st.hold = QBL.clamp((p.x - st.x0) / 12, -0.7, 0.7);
          },
          up() { if (st.drag === "bar") { st.hold = null; st.w = 0; } st.drag = false; },
          cursor: (p) => (st.view === "mic" ? (mic.hit(p) ? "ew-resize" : "") : Math.abs(p.y - BY) < 5 && Math.abs(p.x - 30) < P.a / 2 + 2 ? "grab" : ""),
        },
      });

      // --- denetimler
      const sw = api.stopwatch({ onRecord: (sec) => {
        const i = st.load === "bar" ? 0 : st.load === "disks" ? 1 : 2;
        const tb = api.table("T");
        tb.setActive(i);
        api.record("T", sec, { group: N3, raw: sec.toFixed(2) });
      } });
      const loadSeg = C.segment({ label: t("load"), value: st.load, options: [{ value: "bar", label: t("loadBar") }, { value: "disks", label: t("loadDisks") }, { value: "obj", label: t("loadObj") }], onChange(v) { st.load = v; st.th = 0; st.w = 0; st.hold = null; save(); } });
      const ampSl = C.slider({ label: t("amp"), min: 5, max: 40, step: 1, value: st.amp, digits: 0, unit: "°", onInput(v) { st.amp = v; } });
      const setupBox = api.el("div", { class: "lab-side" },
        C.group(t("viewSetup"), loadSeg.el, ampSl.el,
          C.buttons([{ label: t("twist"), primary: true, onClick: () => { st.hold = null; st.th = (st.amp * Math.PI) / 180; st.w = 0; } }, { label: t("stop"), onClick: () => { st.hold = null; st.th = 0; st.w = 0; } }]),
          C.note(t("wire", { m: t(mat) }), "small"),
          C.note(t("labels", { M: P.M, a: QBL.fixed(P.a, 1), m: P.m, R: QBL.fixed(P.R, 1), d: QBL.fixed(P.d, 1) }), "small")),
        sw.el);
      const posSeg = C.segment({ label: t("where"), value: 1, options: [1, 2, 3].map((n) => ({ value: n, label: t("pos", { n }) })), onChange(v) { st.pos = Number(v); mic.setObject({ shape: "wire", size: dWs[st.pos - 1], tone: "steel" }); mic.open(); gp.sync(); } });
      const gp = QBL.Gauge.panel(api, mic, {
        title: t("viewMic"), slideLabel: t("slideMic"), closeLabel: t("close"), openLabel: t("open"),
        onRecord(v, raw) {
          const tb = api.table("w");
          tb.set(st.pos - 1, { d: v }, { d: String(raw).trim().replace(",", ".") });
          api.status(t("recorded", { v: QBL.fixed(v, 3) }), "ok");
        },
      });
      mic.setObject({ shape: "wire", size: dWs[0], tone: "steel" });
      mic.open();
      gp.sync();
      const micBox = api.el("div", { class: "lab-side" }, C.group("", posSeg.el), gp.el);
      const viewSeg = C.segment({
        label: t("view"), value: st.view, options: [{ value: "setup", label: t("viewSetup") }, { value: "mic", label: t("viewMic") }],
        onChange(v) { st.view = v; save(); stage.setWorld(v === "mic" ? mic.world : WS); setupBox.hidden = v === "mic"; micBox.hidden = v !== "mic"; },
      });
      api.panel.append(C.group("", viewSeg.el), setupBox, micBox);
      setupBox.hidden = st.view === "mic";
      micBox.hidden = st.view !== "mic";
      return {};
    },

    selfTest() {
      const D0 = 4e-3, Ib = 1.6e-3, dI = 2 * (0.13 * 0.13 ** 2 + 0.5 * 0.13 * 0.02 ** 2);
      const T = 2 * Math.PI * Math.sqrt(Ib / D0), T2 = 2 * Math.PI * Math.sqrt((Ib + dI) / D0);
      const d0 = (4 * Math.PI ** 2 * dI) / (T2 * T2 - T * T);
      return [{ name: "D₀ (iki periyottan)", value: d0, expected: D0, tol: 1e-9 }];
    },
  };
  QBL.register(def);
})();
