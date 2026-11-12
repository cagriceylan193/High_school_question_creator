// Deney 2-B – Eğilme elastikliği (Young modülü): iki ucundan desteklenen çubuk, aynalı cetvel, mikrometre
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const MATS = {
    steel: { E: [196e9, 210e9], d: 4.0, tone: "steel", ref: 200 },
    brass: { E: [96e9, 108e9], d: 5.0, tone: "brass", ref: 100 },
    alu: { E: [67e9, 72e9], d: 6.0, tone: "alu", ref: 69 },
  };
  const LOADS = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2];
  const Y0 = 28; // destek tepesi (cm)
  const X1 = 12;  // sol destek (cm)

  const text = {
    tr: {
      kicker: "Deney 2-B",
      title: "Eğilme elastikliği (Young modülü)",
      short: "İki ucundan desteklenen çubuğun ortasına yük as, aynalı cetvelden eğilmeyi oku; F–D grafiğinden Young modülünü bul.",
      tools: "Çubuk · bıçak destekler · aynalı cetvel · mikrometre",
      aim: "Çubuk biçimindeki bir malzemenin eğilme elastikliğini (Young modülünü) bulmak.",
      theory: `<p>İki ucundan desteklenen L uzunluğundaki bir çubuğun ortasına F kuvveti uygulanınca, çubuğun orta noktası D kadar aşağı iner. Esneklik sınırı içinde eğilme kuvvetle orantılıdır (D ∝ F). Dairesel kesitli (yarıçapı r) bir çubuk için:</p>
<p class="eq">D = F · L³ / (12 · π · E · r⁴)</p>
<p>E malzemenin Young modülüdür; birimi kuvvet/yüzey (Pa = N/m²) birimidir. Eğilme r'nin dördüncü kuvvetiyle ters orantılı olduğundan çapı çok dikkatli ölçmek gerekir: çaptaki %1'lik hata E'de %4'lük hataya yol açar.</p>
<p>F–D grafiği bir doğrudur. Eğimi kullanarak</p>
<p class="eq">E = (F / D) · L³ / (12 · π · r⁴)</p>
<p>bulunur. Destek noktalarındaki sürtünme yüzünden yük artarken ve azalırken okunan değerler biraz farklıdır; bu yüzden ikisinin ortalaması alınır. Bağıl hata: ΔE/E = Δ(eğim)/eğim + 3·ΔL/L + 4·Δr/r.</p>`,
      steps: [
        "<b>Mikrometre</b> görünümüne geç, çubuğun çapını üç farklı yerden ölç ve tabloya yaz.",
        "<b>Düzenek</b> görünümünde, destekler arasındaki L uzaklığını alttaki cetvelden oku (iki bıçak ağzının konumlarının farkı).",
        "Yük yokken ibrenin aynalı cetvelde gösterdiği D₀ değerini oku ve m = 0 satırına yaz (D↑ sütunu).",
        "Yükü 0,2 kg'lık adımlarla 1,2 kg'a kadar artır; her adımda okumayı D↑ sütununa yaz. Sonra yükü adım adım azaltarak D↓ sütununu doldur.",
        "F–D grafiğinin eğiminden Young modülünü bul ve malzemenin bilinen değeriyle karşılaştır.",
      ],
      partMain: "Eğilme",
      view: "Görünüm",
      viewBench: "Düzenek",
      viewMic: "Mikrometre",
      rod: "Çubuk",
      steel: "Çelik", brass: "Pirinç", alu: "Alüminyum",
      load: "Asılı yük: {m} kg",
      add: "+0,2 kg", rem: "−0,2 kg",
      readNote: "Okuma yaparken ibrenin aynadaki görüntüsünün ibrenin tam arkasında kalmasına dikkat et (paralaks).",
      where: "Ölçüm yeri",
      pos: "{n}. yer",
      close: "Kapat", open: "Aç",
      slideMic: "Tamburu çevir",
      tableD: "Çubuğun çapı (mikrometre)",
      tableL: "Destekler arası uzaklık",
      tableDef: "Eğilme okumaları",
      colPos: "Yer",
      gFD: "F = f(D)",
      resR: "Çubuğun yarıçapı r",
      resL: "Destekler arası L",
      resE: "Young modülü E",
      need: "E için çap, L ve en az iki yük okuması gerekli.",
      recorded: "Çap: {v} mm kaydedildi.",
    },
    en: {
      kicker: "Experiment 2-B",
      title: "Bending elasticity (Young's modulus)",
      short: "Load a bar supported at both ends in the middle, read the deflection on a mirror scale and find Young's modulus from the F–D graph.",
      tools: "Bar · knife-edge supports · mirror scale · micrometer",
      aim: "To determine the bending elasticity (Young's modulus) of a material in the form of a bar.",
      theory: `<p>When a force F is applied to the middle of a bar of length L supported at both ends, the middle of the bar moves down by D. Within the elastic limit the deflection is proportional to the force (D ∝ F). For a bar with a circular cross-section of radius r:</p>
<p class="eq">D = F · L³ / (12 · π · E · r⁴)</p>
<p>E is Young's modulus of the material; its unit is force per area (Pa = N/m²). As the deflection depends on the fourth power of r, the diameter must be measured very carefully: a 1% error in the diameter gives a 4% error in E.</p>
<p>The F–D graph is a straight line. From its slope</p>
<p class="eq">E = (F / D) · L³ / (12 · π · r⁴)</p>
<p>Because of friction at the supports the readings while loading and unloading differ slightly, so their mean is used. Relative error: ΔE/E = Δ(slope)/slope + 3·ΔL/L + 4·Δr/r.</p>`,
      steps: [
        "Switch to the <b>Micrometer</b> view, measure the diameter of the bar at three places and write it to the table.",
        "In the <b>Apparatus</b> view, read the distance L between the supports on the ruler below (difference of the two knife-edge positions).",
        "With no load, read D₀ at the pointer on the mirror scale and enter it in the m = 0 row (D↑ column).",
        "Increase the load in steps of 0.2 kg up to 1.2 kg and enter each reading in the D↑ column. Then decrease the load step by step and fill in the D↓ column.",
        "Find Young's modulus from the slope of the F–D graph and compare with the known value for the material.",
      ],
      partMain: "Bending",
      view: "View",
      viewBench: "Apparatus",
      viewMic: "Micrometer",
      rod: "Bar",
      steel: "Steel", brass: "Brass", alu: "Aluminium",
      load: "Load: {m} kg",
      add: "+0.2 kg", rem: "−0.2 kg",
      readNote: "When reading, keep the mirror image of the pointer exactly behind the pointer (parallax).",
      where: "Place",
      pos: "place {n}",
      close: "Close", open: "Open",
      slideMic: "Turn the thimble",
      tableD: "Diameter of the bar (micrometer)",
      tableL: "Distance between the supports",
      tableDef: "Deflection readings",
      colPos: "Place",
      gFD: "F = f(D)",
      resR: "Radius of the bar r",
      resL: "Distance between supports L",
      resE: "Young's modulus E",
      need: "E needs the diameter, L and at least two load readings.",
      recorded: "Diameter: {v} mm saved.",
    },
    de: {
      kicker: "Versuch 2-B",
      title: "Biegeelastizität (Elastizitätsmodul)",
      short: "Belaste einen beidseitig aufliegenden Stab in der Mitte, lies die Durchbiegung an der Spiegelskala ab und bestimme den E-Modul aus dem F–D-Diagramm.",
      tools: "Stab · Schneidenlager · Spiegelskala · Bügelmessschraube",
      aim: "Die Biegeelastizität (den Elastizitätsmodul) eines stabförmigen Werkstoffs bestimmen.",
      theory: `<p>Wirkt in der Mitte eines an beiden Enden aufliegenden Stabes der Länge L eine Kraft F, senkt sich die Stabmitte um D. Im elastischen Bereich ist die Durchbiegung proportional zur Kraft (D ∝ F). Für einen Stab mit kreisförmigem Querschnitt (Radius r) gilt:</p>
<p class="eq">D = F · L³ / (12 · π · E · r⁴)</p>
<p>E ist der Elastizitätsmodul des Werkstoffs, Einheit Kraft pro Fläche (Pa = N/m²). Da die Durchbiegung von der vierten Potenz von r abhängt, muss der Durchmesser sehr sorgfältig gemessen werden: 1 % Fehler im Durchmesser ergibt 4 % Fehler in E.</p>
<p>Das F–D-Diagramm ist eine Gerade. Aus der Steigung folgt</p>
<p class="eq">E = (F / D) · L³ / (12 · π · r⁴)</p>
<p>Wegen der Reibung an den Auflagern unterscheiden sich die Ablesungen beim Be- und Entlasten etwas; man nimmt den Mittelwert. Relativer Fehler: ΔE/E = Δ(Steigung)/Steigung + 3·ΔL/L + 4·Δr/r.</p>`,
      steps: [
        "Wechsle zur Ansicht <b>Messschraube</b>, miss den Stabdurchmesser an drei Stellen und trage ihn ein.",
        "In der Ansicht <b>Aufbau</b> den Abstand L der Auflager am unteren Lineal ablesen (Differenz der beiden Schneidenpositionen).",
        "Ohne Last D₀ am Zeiger der Spiegelskala ablesen und in die Zeile m = 0 (Spalte D↑) eintragen.",
        "Last in Schritten von 0,2 kg bis 1,2 kg erhöhen und jede Ablesung in D↑ eintragen. Danach schrittweise entlasten und D↓ ausfüllen.",
        "Bestimme den E-Modul aus der Steigung des F–D-Diagramms und vergleiche mit dem Literaturwert des Werkstoffs.",
      ],
      partMain: "Biegung",
      view: "Ansicht",
      viewBench: "Aufbau",
      viewMic: "Messschraube",
      rod: "Stab",
      steel: "Stahl", brass: "Messing", alu: "Aluminium",
      load: "Last: {m} kg",
      add: "+0,2 kg", rem: "−0,2 kg",
      readNote: "Beim Ablesen soll das Spiegelbild des Zeigers genau hinter dem Zeiger liegen (Parallaxe).",
      where: "Messstelle",
      pos: "Stelle {n}",
      close: "Schließen", open: "Öffnen",
      slideMic: "Trommel drehen",
      tableD: "Stabdurchmesser (Messschraube)",
      tableL: "Abstand der Auflager",
      tableDef: "Durchbiegung",
      colPos: "Stelle",
      gFD: "F = f(D)",
      resR: "Stabradius r",
      resL: "Auflagerabstand L",
      resE: "Elastizitätsmodul E",
      need: "Für E werden Durchmesser, L und mindestens zwei Lastablesungen benötigt.",
      recorded: "Durchmesser: {v} mm gespeichert.",
    },
  };

  const gN = 9.81;
  const d0Of = (tb) => { const r = tb.rows.find((q) => q.m === 0); return r ? tb.avg(r, ["up", "dn"]) : null; };
  const def = {
    id: "young",
    order: 25,
    text,
    parts: [{
      id: "main", title: "partMain",
      tables: [
        { id: "d", title: () => QBL.tx(def, "tableD"), columns: [{ key: "p", label: () => QBL.tx(def, "colPos"), fixed: true }, { key: "d", label: "2r (mm)", input: true }], rows: [1, 2, 3].map((p) => ({ p, $p: String(p) })), fixedRows: true },
        { id: "L", title: () => QBL.tx(def, "tableL"), columns: [{ key: "L", label: "L (cm)", input: true }], rows: [{}], fixedRows: true },
        {
          id: "def", title: () => QBL.tx(def, "tableDef"),
          columns: [
            { key: "m", label: "m (kg)", input: true },
            { key: "F", label: "F (N)", calc: (r) => (r.m != null ? r.m * gN : null), digits: 2 },
            { key: "up", label: "D↑ (cm)", input: true },
            { key: "dn", label: "D↓ (cm)", input: true },
            { key: "avg", label: "D̄ (cm)", calc: (r, tb) => tb.avg(r, ["up", "dn"]), digits: 3 },
            { key: "D", label: "D = D̄ − D₀ (mm)", calc: (r, tb) => { const a = tb.avg(r, ["up", "dn"]), z = d0Of(tb); return a == null || z == null || r.m === 0 ? null : (a - z) * 10; }, digits: 2 },
          ],
          rows: LOADS.map((m) => ({ m, $m: String(m).replace(".", ".") })),
        },
      ],
      graphs: [{ id: "gFD", title: () => QBL.tx(def, "gFD"), x: { key: "D", label: "D (mm)" }, y: { key: "F", label: "F (N)" }, series: [{ table: "def", name: "" }], fit: "prop", fits: ["prop", "line"], slopeUnit: "N/mm" }],
      results(c) {
        const out = [];
        const ds = c.table("d").values("d");
        const Ls = c.table("L").values("L");
        const f = c.fit("gFD");
        let r = null, dr = null;
        if (ds.length) {
          r = QBL.mean(ds) / 2000; // m
          dr = Math.max(QBL.meanDev(ds), 0.01) / 2000;
          out.push({ label: c.t("resR"), value: r * 1000, err: dr * 1000, unit: "mm" });
        }
        let L = null, dL = 0.001;
        if (Ls.length) { L = Ls[0] / 100; out.push({ label: c.t("resL"), value: L * 100, err: 0.1, unit: "cm" }); }
        if (f && r && L) {
          const slope = f.a * 1000; // N/m
          const E = (slope * L ** 3) / (12 * Math.PI * r ** 4);
          const rel = f.sa / f.a + (3 * dL) / L + (4 * dr) / r;
          const mat = c.api.mem.mat || "steel";
          out.push({ label: c.t("resE"), value: E / 1e9, err: (E * rel) / 1e9, unit: "GPa", ref: MATS[mat].ref });
        } else out.push({ text: c.t("need") });
        return out;
      },
    }],

    mount(api) {
      const { C, t, mem } = api;
      const mat = (mem.mat = mem.mat || ["steel", "brass", "alu"][Math.floor(api.rng() * 3)]);
      const M = MATS[mat];
      const E = QBL.between(api.rng, M.E[0], M.E[1]);
      const L = [50, 55, 60][Math.floor(api.rng() * 3)];             // cm
      const dTrue = [0, 1, 2].map(() => M.d + 0.006 * QBL.gauss(api.rng)); // mm
      const r = QBL.mean(dTrue) / 2000;
      const D0 = QBL.between(api.rng, 2.2, 3.6);                    // cm, yüksüz okuma
      const fric = QBL.between(api.rng, 0.012, 0.03);               // cm, destek sürtünmesi
      const st = { m: mem.m ?? 0, def: 0, v: 0, dir: 1, view: mem.view || "bench", pos: 1, drag: false };
      const target = () => (st.m * G * (L / 100) ** 3) / (12 * Math.PI * E * r ** 4) * 100; // cm
      st.def = target();
      const mic = QBL.Gauge.micrometer({ s: 8, zero: 0 });
      const X2 = X1 + L, XC = X1 + L / 2;

      function step(dt) {
        // hızlı sönümlü titreşimle yeni dengeye yerleşme
        const w = 2 * Math.PI * 3, z = 0.25;
        const n = Math.max(1, Math.ceil(dt / 0.002));
        for (let i = 0; i < n; i++) {
          const a = -w * w * (st.def - target()) - 2 * z * w * st.v;
          st.v += a * (dt / n);
          st.def += st.v * (dt / n);
        }
      }
      const eff = () => st.def - (st.m > 0 ? st.dir * fric * 0.5 : 0);

      function drawBench(c, S) {
        D.wall(c, S);
        D.bench(c, S, -5, 95, 44, 4);
        // alt cetvel
        D.ruler(c, { x: 4, y: 41.6, len: 80, dir: "h", side: "top", w: 2.4, px: S.px, fontSize: 0.85, every: 5 });
        // destekler
        for (const x of [X1, X2]) {
          c.fillStyle = D.metal(c, x - 2, 0, x + 2, 0, "dark");
          c.beginPath();
          c.moveTo(x, Y0 + 0.2); c.lineTo(x + 2.2, Y0 + 7); c.lineTo(x + 2.2, 41.4); c.lineTo(x - 2.2, 41.4); c.lineTo(x - 2.2, Y0 + 7); c.closePath();
          c.fill();
          c.strokeStyle = "#c62828";
          c.lineWidth = Math.max(S.px, 0.05);
          c.beginPath();
          c.moveTo(x, 41.4); c.lineTo(x, 41.6);
          c.stroke();
        }
        // çubuk (eğik)
        const thick = (M.d / 10) * 1.6;
        const dd = eff();
        const yAt = (x) => {
          if (x < X1) return Y0 - thick / 2 - ((X1 - x) * 3 * dd) / L;
          if (x > X2) return Y0 - thick / 2 - ((x - X2) * 3 * dd) / L;
          const u = x - X1 <= L / 2 ? x - X1 : X2 - x;
          return Y0 - thick / 2 + (dd * u * (3 * L * L - 4 * u * u)) / L ** 3;
        };
        c.fillStyle = D.metal(c, 0, Y0 - thick, 0, Y0, M.tone);
        c.beginPath();
        for (let x = X1 - 4; x <= X2 + 4; x += 0.5) c.lineTo(x, yAt(x) - thick / 2);
        for (let x = X2 + 4; x >= X1 - 4; x -= 0.5) c.lineTo(x, yAt(x) + thick / 2);
        c.closePath();
        c.fill();
        const yc = yAt(XC);
        // aynalı cetvel (orta noktanın arkasında): sıfırı yüksüz konumun D₀ kadar üstünde
        const sx = XC + 2.2, top = Y0 - thick / 2 - D0;
        c.fillStyle = "#f3ead0";
        c.fillRect(sx - 0.2, top - 0.6, 3.4, 9.2);
        c.fillStyle = "rgba(150,190,220,0.65)";
        c.fillRect(sx + 0.15, top - 0.6, 1.0, 9.2);
        D.ruler(c, { x: sx + 3.2, y: top, len: 8, dir: "v", side: "right", w: 1.9, px: S.px, fontSize: 0.6, face: "rgba(0,0,0,0)" });
        // askı (çubuğu saran halka + kanca + kefe)
        c.strokeStyle = "#4b525a";
        c.lineWidth = 0.18;
        c.beginPath();
        c.arc(XC, yc, thick / 2 + 0.25, 0, Math.PI * 2);
        c.stroke();
        const pan = yc + 9;
        D.string(c, [[XC, yc + thick / 2 + 0.3], [XC, pan - 0.6]], "#4b525a", 0.14);
        const masses = [];
        for (let k = 0; k < Math.round(st.m / 0.2); k++) masses.push({ h: 0.9, tone: "steel", label: "200 g" });
        D.hanger(c, XC, pan - 1.4, { len: 6, w: 4.6, plate: 0.45, masses, px: S.px });
        // ibre (orta noktaya bağlı, yatay) ve aynadaki görüntüsü
        c.fillStyle = "#c62828";
        c.beginPath();
        c.moveTo(XC, yc - 0.09); c.lineTo(sx + 2.2, yc - 0.05); c.lineTo(sx + 2.2, yc + 0.05); c.lineTo(XC, yc + 0.09);
        c.closePath();
        c.fill();
        c.fillStyle = "rgba(198,40,40,0.35)";
        c.fillRect(sx + 0.15, yc - 0.05, 1.0, 0.1);
      }
      function drawMic(c, S) {
        D.wall(c, S);
        const v = S.view;
        c.fillStyle = S.colors.dark ? "#22302a" : "#dfe7e0";
        c.fillRect(v.x0, v.y0, v.x1 - v.x0, v.y1 - v.y0);
        mic.draw(c, S);
      }
      const draw = (c, S) => (st.view === "mic" ? drawMic(c, S) : drawBench(c, S));
      const WB = [0, 2, 90, 47];
      const stage = api.stage({
        world: st.view === "mic" ? mic.world : WB, maxH: 560, lensZoom: 6, label: t("title"), draw, step,
        pointer: {
          down(p) { if (st.view === "mic" && mic.hit(p)) { mic.drag(p, true); st.drag = true; return true; } return false; },
          move(p) { if (st.drag) { mic.drag(p, false); gp.sync(); } },
          up() { st.drag = false; },
          cursor: (p) => (st.view === "mic" && mic.hit(p) ? "ew-resize" : ""),
        },
      });

      // --- denetimler
      const loadLbl = api.el("p", { class: "lab-note" });
      const setLoad = (m) => {
        m = Math.round(QBL.clamp(m, 0, 1.2) * 10) / 10;
        if (m === st.m) return;
        st.dir = m > st.m ? 1 : -1;
        st.m = m; mem.m = m;
        loadLbl.textContent = t("load", { m: QBL.fixed(m, 1) });
      };
      loadLbl.textContent = t("load", { m: QBL.fixed(st.m, 1) });
      const benchBox = C.group(t("rod") + ": " + t(mat), loadLbl, C.buttons([{ label: t("rem"), onClick: () => setLoad(st.m - 0.2) }, { label: t("add"), onClick: () => setLoad(st.m + 0.2) }]), C.note(t("readNote"), "small"));
      const posSeg = C.segment({ label: t("where"), value: 1, options: [1, 2, 3].map((n) => ({ value: n, label: t("pos", { n }) })), onChange(v) { st.pos = Number(v); setObj(); } });
      function setObj() { mic.setObject({ shape: "wire", size: dTrue[st.pos - 1], tone: "steel" }); mic.open(); gp.sync(); }
      const gp = QBL.Gauge.panel(api, mic, {
        title: t("viewMic"), slideLabel: t("slideMic"), closeLabel: t("close"), openLabel: t("open"),
        onRecord(v, raw) {
          const tb = api.table("d");
          tb.set(st.pos - 1, { d: v }, { d: String(raw).trim().replace(",", ".") });
          api.status(t("recorded", { v: QBL.fixed(v, 3) }), "ok");
        },
      });
      const micBox = api.el("div", { class: "lab-side" }, C.group("", posSeg.el), gp.el);
      const viewSeg = C.segment({
        label: t("view"), value: st.view,
        options: [{ value: "bench", label: t("viewBench") }, { value: "mic", label: t("viewMic") }],
        onChange(v) { st.view = v; mem.view = v; stage.setWorld(v === "mic" ? mic.world : WB); benchBox.hidden = v === "mic"; micBox.hidden = v !== "mic"; },
      });
      api.panel.append(C.group("", viewSeg.el), benchBox, micBox);
      benchBox.hidden = st.view === "mic";
      micBox.hidden = st.view !== "mic";
      setObj();
      return {};
    },

    selfTest() {
      const E = 2.0e11, L = 0.6, r = 0.002;
      const xs = [], ys = [];
      for (const m of LOADS.slice(1)) {
        const Dm = (m * G * L ** 3) / (12 * Math.PI * E * r ** 4);
        xs.push(Dm * 1000 + 0.03 * Math.sin(m * 7)); ys.push(m * gN);
      }
      const f = QBL.fitProp(xs, ys);
      const Ef = (f.a * 1000 * L ** 3) / (12 * Math.PI * r ** 4);
      return [{ name: "Young E", value: Ef / 1e9, expected: (E / 1e9) * (gN / G), tol: 0.02 }];
    },
  };
  QBL.register(def);
})();
