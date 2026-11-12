// Hazırlık – Ölçü aletleri: verniyeli kumpas ve mikrometre ile hacim ve yoğunluk
(function () {
  "use strict";
  const D = QBL.D;
  const RHO = { tel: 8.96, prizma: 2.70, boru: 8.50, bilye: 7.85 };
  const TONE = { tel: "copper", prizma: "alu", boru: "brass", bilye: "steel" };

  // Ölçülecek boyutlar: ins = alet, mode = kumpas çenesi
  const DIMS = {
    tel: [{ key: "d", ins: "mic", shape: "wire" }, { key: "L", ins: "cal", mode: "outer", shape: "wire" }],
    prizma: [{ key: "a", ins: "cal", mode: "outer", shape: "rect" }, { key: "b", ins: "cal", mode: "outer", shape: "rect" }, { key: "c", ins: "mic", shape: "rect" }],
    boru: [{ key: "D", ins: "cal", mode: "outer", shape: "tube" }, { key: "d", ins: "cal", mode: "inner", shape: "tube" }, { key: "H", ins: "cal", mode: "depth", shape: "tube" }],
    bilye: [{ key: "Dk", ins: "cal", mode: "outer", shape: "circle" }, { key: "Dm", ins: "mic", shape: "circle" }],
  };
  const ZERO = { key: "z", ins: "mic", shape: "none" };

  const text = {
    tr: {
      kicker: "Hazırlık",
      title: "Ölçü aletleri: kumpas ve mikrometre",
      short: "Verniyeli kumpas ve mikrometreyle boyut ölç; hacmi ve yoğunluğu hata payıyla hesapla.",
      tools: "Verniyeli kumpas · mikrometre · terazi",
      aim: "Verniyeli kumpas ve mikrometrenin kullanımını öğrenmek, cisimlerin hacmini ve yoğunluğunu hata hesabıyla birlikte bulmak.",
      theory: `<p><b>Verniyeli kumpas</b> milimetre bölmeli bir ana cetvel ile üzerinde kayan verniyeden oluşur. Bu kumpasta verniyenin 20 bölmesi 39 mm'dir; her bölme ana cetvelin 2 mm'sinden 0,05 mm kısadır. Bu yüzden kumpas 1/20 = 0,05 mm duyarlıkla ölçer. Okuma:</p>
<p class="eq">L = N + n · 0,05 mm</p>
<p>N, verniyenin sıfırından önceki son milimetre çizgisidir; n ise ana cetveldeki bir çizgiyle tam çakışan verniye çizgisinin numarasıdır (verniyedeki 1, 2, 3… yazıları 0,1 mm'yi gösterir). Dış çeneler kalınlık ve dış çap, iç çeneler iç çap, derinlik çubuğu derinlik ve boy ölçer.</p>
<p><b>Mikrometre</b> vida adımı 0,5 mm olan bir vidadır. Dönen tamburda 50 bölme vardır; tamburun bir bölmesi 0,01 mm'dir. Sabit tamburda çizginin üstü tam milimetreleri, altı yarım milimetreleri gösterir:</p>
<p class="eq">L = N + n · 0,01 mm</p>
<p>Çeneler boşken kapatıldığında mikrometre sıfır göstermeyebilir (sıfır hatası). Bu değer bütün okumalardan çıkarılmalıdır.</p>
<p><b>Hata hesabı:</b> her boyut üç farklı yerden ölçülür; ortalama x̄ ve ortalama sapma Δx bulunur (Δx aletin duyarlığından küçükse duyarlık alınır). Çarpım biçimindeki sonuçlarda bağıl hatalar üsleriyle toplanır; örneğin silindir için V = π d² L / 4 ise</p>
<p class="eq">ΔV / V = 2 · Δd / d + ΔL / L</p>`,
      steps: [
        "Ölçülecek boyutu ve ölçüm yerini seç; uygun alet kendiliğinden gelir.",
        "Kumpasta sürgüyü, mikrometrede tamburu kaydırarak çeneleri cisme değdir. <b>Kapat</b> düğmesi çeneleri nazikçe kapatır, mikrometrede cırcır gibi davranır.",
        "Büyüteçle oku: kumpasta önce ana cetvelden N'yi, sonra çakışan verniye çizgisinden n'yi; mikrometrede sabit tamburdan N'yi (yarım milimetre çizgilerine dikkat), dönen tamburdan n'yi.",
        "Okumanı kutuya yaz, istersen kontrol et ve <b>Tabloya yaz</b> ile kaydet. Her boyutu üç farklı yerden ölç.",
        "Mikrometreyi kullanan bölümlerde <b>Sıfır okuması</b>nı da ölç; sonuçta okumalardan çıkarılır.",
        "Hacmi ve yoğunluğu hata payıyla bul, malzemenin bilinen yoğunluğuyla karşılaştır.",
      ],
      tel: "Bakır tel",
      prizma: "Alüminyum prizma",
      boru: "Pirinç boru",
      bilye: "Çelik bilye",
      dim_tel_d: "Çap d (mikrometre)",
      dim_tel_L: "Boy L (kumpas)",
      dim_prizma_a: "Uzunluk a (kumpas)",
      dim_prizma_b: "Genişlik b (kumpas)",
      dim_prizma_c: "Kalınlık c (mikrometre)",
      dim_boru_D: "Dış çap D (dış çeneler)",
      dim_boru_d: "İç çap d (iç çeneler)",
      dim_boru_H: "Boy H (derinlik çubuğu)",
      dim_bilye_Dk: "Çap (kumpas)",
      dim_bilye_Dm: "Çap (mikrometre)",
      dim_z: "Sıfır okuması (mikrometre)",
      what: "Ölçülecek boyut",
      where: "Ölçüm yeri",
      pos: "{n}. yer",
      gaugeCal: "Kumpas",
      gaugeMic: "Mikrometre",
      slideCal: "Sürgüyü kaydır",
      slideMic: "Tamburu çevir",
      close: "Kapat",
      open: "Aç",
      scale: "Terazi: m = {m} g",
      tablePos: "Yer",
      zeroTable: "Mikrometre sıfır okuması (çeneler boşken kapalı)",
      zeroCol: "z (mm)",
      resMean: "{x} ortalaması",
      resV: "Hacim V",
      resRho: "Yoğunluk ρ = m / V",
      resZero: "Sıfır düzeltmesi z = {z} mm okumalardan çıkarıldı.",
      resNoZero: "Mikrometrenin sıfır okuması ölçülmedi; okumalar düzeltilmeden kullanıldı.",
      resCompare: "Kumpas ve mikrometre ölçümlerinin farkı",
      recorded: "{d}: {v} mm kaydedildi.",
    },
    en: {
      kicker: "Preparation",
      title: "Measuring instruments: vernier caliper and micrometer",
      short: "Measure dimensions with a vernier caliper and a micrometer; work out volume and density with their uncertainties.",
      tools: "Vernier caliper · micrometer · balance",
      aim: "To learn to use the vernier caliper and the micrometer and to determine the volume and density of objects together with their uncertainties.",
      theory: `<p>A <b>vernier caliper</b> has a main scale in millimetres and a sliding vernier. On this caliper 20 vernier divisions span 39 mm; each division is 0.05 mm shorter than 2 mm on the main scale, so the caliper reads to 1/20 = 0.05 mm:</p>
<p class="eq">L = N + n · 0.05 mm</p>
<p>N is the last millimetre line before the vernier zero; n is the number of the vernier line that lines up exactly with a main-scale line (the figures 1, 2, 3… on the vernier mean 0.1 mm). The outside jaws measure thickness and outer diameter, the inside jaws inner diameter, and the depth rod depth and length.</p>
<p>A <b>micrometer</b> is a screw with a pitch of 0.5 mm. The thimble has 50 divisions, so one division is 0.01 mm. On the sleeve, the marks above the line are whole millimetres and those below are half millimetres:</p>
<p class="eq">L = N + n · 0.01 mm</p>
<p>With the jaws closed and nothing between them, a micrometer may not read zero (zero error). This value must be subtracted from every reading.</p>
<p><b>Uncertainty:</b> measure every dimension at three different places, find the mean x̄ and the mean deviation Δx (if Δx is smaller than the instrument resolution, use the resolution). For results that are products, the relative errors add, multiplied by their powers; for a cylinder V = π d² L / 4:</p>
<p class="eq">ΔV / V = 2 · Δd / d + ΔL / L</p>`,
      steps: [
        "Choose the dimension and the place to measure; the right instrument appears automatically.",
        "Slide the caliper jaw or turn the micrometer thimble until the jaws touch the object. <b>Close</b> closes the jaws gently and acts like the ratchet on the micrometer.",
        "Read with the magnifier: on the caliper first N on the main scale, then n from the coinciding vernier line; on the micrometer N on the sleeve (watch the half-millimetre marks) and n on the thimble.",
        "Type your reading, check it if you like and save it with <b>Write to table</b>. Measure each dimension at three places.",
        "In the parts that use the micrometer, also measure the <b>zero reading</b>; it is subtracted from the readings.",
        "Find the volume and the density with their uncertainties and compare with the known density of the material.",
      ],
      tel: "Copper wire",
      prizma: "Aluminium block",
      boru: "Brass tube",
      bilye: "Steel ball",
      dim_tel_d: "Diameter d (micrometer)",
      dim_tel_L: "Length L (caliper)",
      dim_prizma_a: "Length a (caliper)",
      dim_prizma_b: "Width b (caliper)",
      dim_prizma_c: "Thickness c (micrometer)",
      dim_boru_D: "Outer diameter D (outside jaws)",
      dim_boru_d: "Inner diameter d (inside jaws)",
      dim_boru_H: "Length H (depth rod)",
      dim_bilye_Dk: "Diameter (caliper)",
      dim_bilye_Dm: "Diameter (micrometer)",
      dim_z: "Zero reading (micrometer)",
      what: "Dimension to measure",
      where: "Place",
      pos: "place {n}",
      gaugeCal: "Vernier caliper",
      gaugeMic: "Micrometer",
      slideCal: "Slide the jaw",
      slideMic: "Turn the thimble",
      close: "Close",
      open: "Open",
      scale: "Balance: m = {m} g",
      tablePos: "Place",
      zeroTable: "Micrometer zero reading (jaws closed, nothing between them)",
      zeroCol: "z (mm)",
      resMean: "mean {x}",
      resV: "Volume V",
      resRho: "Density ρ = m / V",
      resZero: "The zero correction z = {z} mm was subtracted from the readings.",
      resNoZero: "The micrometer zero reading was not measured; the readings were used uncorrected.",
      resCompare: "Difference between caliper and micrometer",
      recorded: "{d}: {v} mm saved.",
    },
    de: {
      kicker: "Vorbereitung",
      title: "Messgeräte: Messschieber und Bügelmessschraube",
      short: "Miss Abmessungen mit Messschieber und Bügelmessschraube; bestimme Volumen und Dichte mit Messunsicherheit.",
      tools: "Messschieber · Bügelmessschraube · Waage",
      aim: "Den Umgang mit Messschieber und Bügelmessschraube lernen und Volumen und Dichte von Körpern mit Fehlerrechnung bestimmen.",
      theory: `<p>Ein <b>Messschieber</b> besteht aus einer Millimeter-Hauptskala und einem verschiebbaren Nonius. Bei diesem Messschieber umfassen 20 Noniusteile 39 mm; jeder Teil ist 0,05 mm kürzer als 2 mm der Hauptskala. Er misst also auf 1/20 = 0,05 mm genau:</p>
<p class="eq">L = N + n · 0,05 mm</p>
<p>N ist der letzte Millimeterstrich vor der Nonius-Null, n die Nummer des Noniusstrichs, der genau mit einem Strich der Hauptskala übereinstimmt (die Ziffern 1, 2, 3 … auf dem Nonius bedeuten 0,1 mm). Außenschnäbel messen Dicken und Außendurchmesser, Innenschnäbel Innendurchmesser, die Tiefenstange Tiefen und Längen.</p>
<p>Eine <b>Bügelmessschraube</b> ist eine Schraube mit 0,5 mm Steigung. Die Messtrommel hat 50 Teilstriche; ein Teilstrich ist 0,01 mm. Auf der Skalenhülse zeigen die Striche oberhalb der Linie ganze, die unterhalb halbe Millimeter:</p>
<p class="eq">L = N + n · 0,01 mm</p>
<p>Ohne Messobjekt geschlossen zeigt die Messschraube eventuell nicht null (Nullpunktfehler). Dieser Wert ist von jeder Ablesung abzuziehen.</p>
<p><b>Fehlerrechnung:</b> Jede Abmessung wird an drei Stellen gemessen; man bildet Mittelwert x̄ und mittlere Abweichung Δx (ist Δx kleiner als die Auflösung des Geräts, nimmt man die Auflösung). Bei Produkten addieren sich die relativen Fehler mit ihren Exponenten; für einen Zylinder V = π d² L / 4 gilt</p>
<p class="eq">ΔV / V = 2 · Δd / d + ΔL / L</p>`,
      steps: [
        "Wähle die Abmessung und die Messstelle; das passende Gerät erscheint automatisch.",
        "Verschiebe den Schieber bzw. drehe die Messtrommel, bis die Messflächen das Objekt berühren. <b>Schließen</b> schließt sanft und wirkt bei der Messschraube wie die Ratsche.",
        "Lies mit der Lupe ab: beim Messschieber erst N auf der Hauptskala, dann n am übereinstimmenden Noniusstrich; bei der Messschraube N auf der Hülse (auf die Halbmillimeter achten) und n auf der Trommel.",
        "Gib den Wert ein, prüfe ihn bei Bedarf und speichere ihn mit <b>In Tabelle eintragen</b>. Miss jede Abmessung an drei Stellen.",
        "In den Teilen mit Messschraube auch die <b>Nullablesung</b> messen; sie wird von den Ablesungen abgezogen.",
        "Bestimme Volumen und Dichte mit Messunsicherheit und vergleiche mit der bekannten Dichte des Materials.",
      ],
      tel: "Kupferdraht",
      prizma: "Aluminiumquader",
      boru: "Messingrohr",
      bilye: "Stahlkugel",
      dim_tel_d: "Durchmesser d (Messschraube)",
      dim_tel_L: "Länge L (Messschieber)",
      dim_prizma_a: "Länge a (Messschieber)",
      dim_prizma_b: "Breite b (Messschieber)",
      dim_prizma_c: "Dicke c (Messschraube)",
      dim_boru_D: "Außendurchmesser D (Außenschnäbel)",
      dim_boru_d: "Innendurchmesser d (Innenschnäbel)",
      dim_boru_H: "Länge H (Tiefenstange)",
      dim_bilye_Dk: "Durchmesser (Messschieber)",
      dim_bilye_Dm: "Durchmesser (Messschraube)",
      dim_z: "Nullablesung (Messschraube)",
      what: "Zu messende Größe",
      where: "Messstelle",
      pos: "Stelle {n}",
      gaugeCal: "Messschieber",
      gaugeMic: "Bügelmessschraube",
      slideCal: "Schieber bewegen",
      slideMic: "Trommel drehen",
      close: "Schließen",
      open: "Öffnen",
      scale: "Waage: m = {m} g",
      tablePos: "Stelle",
      zeroTable: "Nullablesung der Messschraube (geschlossen, ohne Objekt)",
      zeroCol: "z (mm)",
      resMean: "Mittelwert {x}",
      resV: "Volumen V",
      resRho: "Dichte ρ = m / V",
      resZero: "Die Nullpunktkorrektur z = {z} mm wurde von den Ablesungen abgezogen.",
      resNoZero: "Die Nullablesung wurde nicht gemessen; die Ablesungen wurden unkorrigiert verwendet.",
      resCompare: "Unterschied Messschieber – Messschraube",
      recorded: "{d}: {v} mm gespeichert.",
    },
  };

  // --- Düzenek: her yerde biraz farklı gerçek boyutlar ------------------------
  function makeObjects(r) {
    const n = (sd) => sd * QBL.gauss(r);
    const tri = (base, sd, dig = 3) => [0, 1, 2].map(() => QBL.roundTo(base + n(sd), dig));
    const d0 = QBL.between(r, 1.75, 2.25), L0 = QBL.between(r, 44, 62);
    const a0 = QBL.between(r, 24, 36), b0 = QBL.between(r, 14, 22), c0 = QBL.between(r, 4.2, 8.8);
    const Do = QBL.between(r, 27, 33), di = Do - QBL.between(r, 4.5, 8), H0 = QBL.between(r, 26, 40);
    const B0 = QBL.between(r, 11, 20);
    const zeroList = [0, 0.01, 0.02, -0.01, 0.03, 0];
    const objs = {
      tel: { d: tri(d0, 0.008), L: tri(L0, 0.03, 2) },
      prizma: { a: tri(a0, 0.02, 2), b: tri(b0, 0.02, 2), c: tri(c0, 0.006) },
      boru: { D: tri(Do, 0.02, 2), d: tri(di, 0.025, 2), H: tri(H0, 0.03, 2) },
      bilye: { Dk: tri(B0, 0.002), Dm: null },
      zero: zeroList[Math.floor(r() * zeroList.length)],
    };
    objs.bilye.Dm = objs.bilye.Dk;
    const mean = QBL.mean;
    const V = {
      tel: (Math.PI * mean(objs.tel.d) ** 2 * mean(objs.tel.L)) / 4,
      prizma: mean(objs.prizma.a) * mean(objs.prizma.b) * mean(objs.prizma.c),
      boru: (Math.PI * (mean(objs.boru.D) ** 2 - mean(objs.boru.d) ** 2) * mean(objs.boru.H)) / 4,
      bilye: (Math.PI * mean(objs.bilye.Dk) ** 3) / 6,
    };
    objs.mass = {};
    for (const k of Object.keys(V)) objs.mass[k] = QBL.roundTo((RHO[k] * V[k]) / 1000 * (1 + 0.002 * QBL.gauss(r)), 2);
    return objs;
  }

  const posRows = [1, 2, 3].map((n) => ({ p: n, $p: String(n) }));
  const mk = (part, keys) => ({
    id: part,
    title: () => QBL.tx(def, part),
    columns: [{ key: "p", label: () => QBL.tx(def, "tablePos"), fixed: true }, ...keys.map((k) => ({ key: k, label: (k === "Dk" ? "D" + "ₖ" : k === "Dm" ? "D" + "ₘ" : k) + " (mm)", input: true }))],
    rows: posRows,
    fixedRows: true,
  });
  const zeroTable = { id: "zero", title: () => QBL.tx(def, "zeroTable"), columns: [{ key: "z", label: () => QBL.tx(def, "zeroCol"), input: true }], rows: [{}], fixedRows: true };

  // ortalama ve hata: ortalama sapma ile alet duyarlığından büyük olanı
  function stat(tb, key, res, z = 0) {
    const v = tb.values(key).map((x) => x - z);
    if (!v.length) return null;
    return { m: QBL.mean(v), e: Math.max(QBL.meanDev(v), res), n: v.length };
  }
  function zeroOf(c) {
    const z = c.table("zero").values("z");
    return z.length ? z[0] : null;
  }
  function common(c, part, parts, volFn, relErr) {
    const out = [];
    const all = parts.map(([k, res, mic]) => [k, stat(c.table(part), k, res, mic ? zeroOf(c) || 0 : 0)]);
    for (const [k, s] of all) if (s) out.push({ label: c.t("resMean", { x: k === "Dk" ? "Dₖ" : k === "Dm" ? "Dₘ" : k }), value: s.m, err: s.e, unit: "mm" });
    const S = Object.fromEntries(all);
    if (all.every(([, s]) => s)) {
      const V = volFn(S) / 1000; // cm³
      const dV = V * relErr(S);
      out.push({ label: c.t("resV"), value: V, err: dV, unit: "cm³" });
      const m = c.api.mem.objs.mass[part];
      const rho = m / V;
      const dr = rho * (dV / V + 0.01 / m);
      out.push({ label: c.t("resRho"), value: rho, err: dr, unit: "g/cm³", ref: RHO[part] });
    }
    if (parts.some(([, , mic]) => mic)) out.push({ text: zeroOf(c) != null ? c.t("resZero", { z: QBL.fixed(zeroOf(c), 3) }) : c.t("resNoZero") });
    return out;
  }

  const def = {
    id: "olcu-aletleri",
    order: 0,
    text,
    parts: [
      {
        id: "tel", title: "tel", tables: [mk("tel", ["d", "L"]), zeroTable],
        results: (c) => common(c, "tel", [["d", 0.01, true], ["L", 0.05]], (S) => (Math.PI * S.d.m ** 2 * S.L.m) / 4, (S) => (2 * S.d.e) / S.d.m + S.L.e / S.L.m),
      },
      {
        id: "prizma", title: "prizma", tables: [mk("prizma", ["a", "b", "c"]), zeroTable],
        results: (c) => common(c, "prizma", [["a", 0.05], ["b", 0.05], ["c", 0.01, true]], (S) => S.a.m * S.b.m * S.c.m, (S) => S.a.e / S.a.m + S.b.e / S.b.m + S.c.e / S.c.m),
      },
      {
        id: "boru", title: "boru", tables: [mk("boru", ["D", "d", "H"])],
        results: (c) => common(c, "boru", [["D", 0.05], ["d", 0.05], ["H", 0.05]], (S) => (Math.PI * (S.D.m ** 2 - S.d.m ** 2) * S.H.m) / 4,
          (S) => (2 * S.D.m * S.D.e + 2 * S.d.m * S.d.e) / (S.D.m ** 2 - S.d.m ** 2) + S.H.e / S.H.m),
      },
      {
        id: "bilye", title: "bilye", tables: [mk("bilye", ["Dk", "Dm"]), zeroTable],
        results(c) {
          const out = common(c, "bilye", [["Dm", 0.01, true]], (S) => (Math.PI * S.Dm.m ** 3) / 6, (S) => (3 * S.Dm.e) / S.Dm.m);
          const sk = stat(c.table("bilye"), "Dk", 0.05);
          const sm = stat(c.table("bilye"), "Dm", 0.01, zeroOf(c) || 0);
          if (sk) out.unshift({ label: c.t("resMean", { x: "Dₖ" }), value: sk.m, err: sk.e, unit: "mm" });
          if (sk && sm) out.push({ label: c.t("resCompare"), value: sk.m - sm.m, err: sk.e + sm.e, unit: "mm" });
          return out;
        },
      },
    ],

    mount(api) {
      const { C, t, mem } = api;
      if (!mem.objs || mem.seed !== api.store.seed) { mem.objs = makeObjects(api.rng); mem.seed = api.store.seed; }
      const objs = mem.objs;
      const cal = QBL.Gauge.caliper({ s: 12 });
      const mic = QBL.Gauge.micrometer({ s: 6, zero: objs.zero });
      const st = { dim: mem.dim || null, pos: mem.pos || 1, drag: false };
      const part = () => api.part;
      const dims = () => {
        const list = DIMS[part()].slice();
        if (list.some((d) => d.ins === "mic")) list.push(ZERO);
        return list;
      };
      const curDim = () => dims().find((d) => d.key === st.dim) || dims()[0];
      const gauge = () => (curDim().ins === "mic" ? mic : cal);

      function objectFor(dim) {
        if (dim.key === "z") return null;
        const p = part(), o = objs[p], i = st.pos - 1, tone = TONE[p];
        const size = o[dim.key][i];
        if (p === "tel") return dim.key === "d" ? { shape: "wire", size, tone } : { shape: "wire", size, thick: o.d[i], tone };
        if (p === "prizma") return { shape: "rect", size, h: dim.key === "a" ? o.b[i] : dim.key === "b" ? o.c[i] * 2 : 18, tone };
        if (p === "boru") return { shape: "tube", size, D: o.D[i], d: o.d[i], h: 18, tone };
        return { shape: "circle", size, tone };
      }
      function apply() {
        const dim = curDim();
        st.dim = dim.key;
        const g = gauge();
        g.setObject(objectFor(dim), dim.mode);
        g.open();
        stage.setWorld(g.world);
        title.textContent = g.kind === "caliper" ? t("gaugeCal") : t("gaugeMic");
        rebuildPanel();
        mem.dim = st.dim; mem.pos = st.pos;
      }

      function draw(c, S) {
        D.wall(c, S);
        // keçe altlık
        const v = S.view;
        c.fillStyle = S.colors.dark ? "#22302a" : "#dfe7e0";
        c.fillRect(v.x0, v.y0, v.x1 - v.x0, v.y1 - v.y0);
        gauge().draw(c, S);
      }
      const stage = api.stage({
        world: cal.world, maxH: 520, lensZoom: 5, label: t("title"), draw,
        pointer: {
          down(p) { const g = gauge(); if (g.hit(p)) { g.drag(p, true); st.drag = true; return true; } return false; },
          move(p) { if (st.drag) { gauge().drag(p, false); gp && gp.sync(); } },
          up() { st.drag = false; },
          cursor: (p) => (gauge().hit(p) ? "ew-resize" : ""),
        },
      });

      const title = api.el("span");
      let gp = null;
      const dimBox = api.el("div");
      const gaugeBox = api.el("div");
      const massNote = C.note("", "small");
      function rebuildPanel() {
        dimBox.innerHTML = "";
        const list = dims();
        const seg = C.segment({
          label: t("what"), value: st.dim,
          options: list.map((d) => ({ value: d.key, label: t(d.key === "z" ? "dim_z" : `dim_${part()}_${d.key}`) })),
          onChange(v) { st.dim = v; apply(); },
        });
        dimBox.append(seg.el);
        if (st.dim !== "z") {
          const pos = C.segment({ label: t("where"), value: st.pos, options: [1, 2, 3].map((n) => ({ value: n, label: t("pos", { n }) })), onChange(v) { st.pos = Number(v); apply(); } });
          dimBox.append(pos.el);
        }
        const g = gauge();
        gaugeBox.innerHTML = "";
        gp = QBL.Gauge.panel(api, g, {
          title: g.kind === "caliper" ? t("gaugeCal") : t("gaugeMic"),
          slideLabel: g.kind === "caliper" ? t("slideCal") : t("slideMic"),
          closeLabel: t("close"), openLabel: t("open"),
          onRecord(v, raw) {
            const dim = curDim();
            const tid = dim.key === "z" ? "zero" : part();
            const tb = api.table(tid);
            const row = dim.key === "z" ? 0 : st.pos - 1;
            tb.set(row, { [dim.key]: v }, { [dim.key]: String(raw).trim().replace(",", ".") });
            tb.setActive(row);
            api.status(t("recorded", { d: t(dim.key === "z" ? "dim_z" : `dim_${part()}_${dim.key}`), v: QBL.fixed(v, g.kind === "caliper" ? 2 : 3) }), "ok");
          },
        });
        gaugeBox.append(gp.el);
        massNote.textContent = t("scale", { m: QBL.fixed(objs.mass[part()], 2) });
      }
      const partGroup = C.group(t(part()), dimBox);
      api.panel.append(partGroup, gaugeBox, massNote);
      st.part = api.part;
      api.onPart((p) => {
        if (p !== st.part) { st.part = p; st.dim = null; st.pos = 1; }
        partGroup.querySelector("legend").textContent = t(p);
        apply();
      });
      apply();
      return {};
    },

    selfTest() {
      // gerçek okumayla kumpas/mikrometre ve hacim–yoğunluk zinciri
      const r = QBL.rng("olcu-test");
      const objs = makeObjects(r);
      const cal = QBL.Gauge.caliper();
      cal.setObject({ shape: "rect", size: 23.37 }, "outer");
      cal.close();
      const mic = QBL.Gauge.micrometer({ zero: 0.02 });
      mic.setObject({ shape: "wire", size: 1.987 });
      mic.close();
      const V = (Math.PI * QBL.mean(objs.tel.d) ** 2 * QBL.mean(objs.tel.L)) / 4 / 1000;
      return [
        { name: "kumpas okuması", value: cal.reading(), expected: 23.35, tol: 1e-9 },
        { name: "mikrometre okuması", value: mic.reading(), expected: 2.007, tol: 1e-9 },
        { name: "bakır yoğunluğu", value: objs.mass.tel / V, expected: 8.96, tol: 0.02 },
      ];
    },
  };
  QBL.register(def);
})();
