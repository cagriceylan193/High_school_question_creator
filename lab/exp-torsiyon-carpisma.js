// Deney 7-B – Açısal momentumun ve enerjinin korunumu: iki diskin torsiyonel çarpışması
(function () {
  "use strict";
  const D = QBL.D;
  const R = 15, K = 0.42, CX = 34, CY = 34;
  const ZU = 7;                 // üst diskin yüksekliği
  const FW = 0.9 / 14;          // flama açısal genişliği (rad): 9 mm genişlik, 14 cm yarıçap
  const deg = (r) => (r * 180) / Math.PI, rad = (d) => (d * Math.PI) / 180;
  const wrap = (a) => { a = (a + Math.PI) % (2 * Math.PI); if (a < 0) a += 2 * Math.PI; return a - Math.PI; };

  const text = {
    tr: {
      kicker: "Deney 7-B",
      title: "Açısal momentumun ve enerjinin korunumu",
      short: "Aynı eksendeki iki diski birbirine doğru döndürüp çarpıştır; fotosellerle açısal hızları ölç, momentum ve enerjiyi karşılaştır.",
      tools: "Dönme modülü (iki disk) · mıknatıslı ve yapışkan çarpışma parçaları · iki fotosel",
      aim: "Esnek ve esnek olmayan torsiyonel çarpışmada açısal momentumun ve kinetik enerjinin korunup korunmadığını incelemek.",
      theory: `<p>Sabit bir eksen çevresinde dönen katı cismin açısal momentumu L = I·ω'dır (I: eylemsizlik momenti). Sisteme etki eden net dış tork sıfırsa toplam açısal momentum korunur:</p>
<p class="eq">I₁·ω₁ + I₂·ω₂ = I₁·ω₁′ + I₂·ω₂′</p>
<p>Aynı eksende dönen iki disk çarpıştığında aralarındaki kuvvetler iç kuvvettir; yatak sürtünmesi çok küçükse açısal momentum korunur. Dönme kinetik enerjisi E = ½·I·ω²'dir.</p>
<p><b>Esnek çarpışmada</b> (mıknatıslı parçalar birbirine değmeden iter) kinetik enerji de korunur. Eşit eylemsizlik momentli disklerde açısal hızlar yer değiştirir: ω₁′ = ω₂, ω₂′ = ω₁.</p>
<p><b>Esnek olmayan çarpışmada</b> (parçalar birbirine yapışır) diskler birlikte döner:</p>
<p class="eq">ω′ = (I₁·ω₁ + I₂·ω₂) / (I₁ + I₂)</p>
<p>Bu durumda kinetik enerjinin bir kısmı ısıya dönüşür. Açısal hız, flamanın fotoselin ışığını kestiği sürenin ölçülmesiyle bulunur: ω = (flama genişliği / yarıçap) / t.</p>`,
      steps: {
        el: [
          "Mıknatıslı çarpışma parçaları takılı. İsteğe bağlı olarak üst diske ek halka koyarak eylemsizlik momentini artırabilirsin.",
          "İki diskin başlangıç açısal hızlarını ayarla (zıt işaretler zıt yönlerde dönmek demektir) ve <b>Diskleri it</b>.",
          "Diskler çarpıştıktan ve flamalar fotosellerden yeniden geçtikten sonra ölçüm ekranındaki ω₁, ω₂, ω₁′, ω₂′ değerlerini <b>Tabloya yaz</b>.",
          "Farklı hızlarla ve bir disk dururken tekrarla. Açısal momentum ve enerji oranlarını incele.",
        ],
        inel: [
          "Yapışkan çarpışma parçalarıyla aynı ölçümleri yap: diskler çarpışınca birbirine kenetlenir.",
          "Ölçülen değerleri tabloya yaz; açısal momentumun korunduğunu, kinetik enerjinin ise azaldığını göster.",
          "Kaybolan enerji oranını kuramsal (I₁ω₁ + I₂ω₂)² / [(I₁ + I₂)(I₁ω₁² + I₂ω₂²)] değeriyle karşılaştır.",
        ],
      },
      el: "Esnek çarpışma",
      inel: "Esnek olmayan çarpışma",
      setup: "Düzenek",
      w1: "Alt disk ω₁ (it)",
      w2: "Üst disk ω₂ (it)",
      ring: "Üst diske ek halka",
      push: "Diskleri it",
      stop: "Diskleri durdur",
      readout: "Ölçüm ekranı",
      before: "Önce",
      after: "Sonra",
      wait: "Ölçüm bekleniyor: flamalar fotosellerden geçmeli.",
      done: "Önce ve sonra hızları ölçüldü.",
      noData: "Önce ve sonra hızlarının ikisi de ölçülmeli.",
      log: "Ölçülen açısal hızlar",
      lower: "alt disk", upper: "üst disk",
      inertia: "Kataloğa göre: I₁ = {a} ×10⁻⁴ kg·m², I₂ = {b} ×10⁻⁴ kg·m²",
      gL: "L′ = f(L)",
      resL: "Ortalama L′ / L",
      resE: "Ortalama E′ / E",
      resEth: "Kuramsal E′ / E (son satır)",
    },
    en: {
      kicker: "Experiment 7-B",
      title: "Conservation of angular momentum and energy",
      short: "Spin two discs on the same axis towards each other and let them collide; measure the angular velocities with light gates and compare momentum and energy.",
      tools: "Rotation module (two discs) · magnetic and sticky collision pieces · two light gates",
      aim: "To find out whether angular momentum and kinetic energy are conserved in elastic and inelastic torsional collisions.",
      theory: `<p>The angular momentum of a rigid body rotating about a fixed axis is L = I·ω (I: moment of inertia). If the net external torque on a system is zero, its total angular momentum is conserved:</p>
<p class="eq">I₁·ω₁ + I₂·ω₂ = I₁·ω₁′ + I₂·ω₂′</p>
<p>When two discs on the same axis collide, the forces between them are internal; if bearing friction is very small, angular momentum is conserved. The rotational kinetic energy is E = ½·I·ω².</p>
<p>In an <b>elastic collision</b> (magnetic pieces repel without touching) kinetic energy is conserved too. For equal moments of inertia the angular velocities are exchanged: ω₁′ = ω₂, ω₂′ = ω₁.</p>
<p>In an <b>inelastic collision</b> (the pieces stick together) the discs turn together:</p>
<p class="eq">ω′ = (I₁·ω₁ + I₂·ω₂) / (I₁ + I₂)</p>
<p>Part of the kinetic energy turns into heat. The angular velocity is found from the time the flag blocks the light gate: ω = (flag width / radius) / t.</p>`,
      steps: {
        el: [
          "The magnetic collision pieces are fitted. If you like, put an extra ring on the upper disc to increase its moment of inertia.",
          "Set the initial angular velocities of the two discs (opposite signs mean opposite directions) and press <b>Push the discs</b>.",
          "After the collision, when both flags have passed the light gates again, use <b>Write to table</b> to record ω₁, ω₂, ω₁′, ω₂′ from the display.",
          "Repeat with other speeds and with one disc at rest. Study the ratios of angular momentum and energy.",
        ],
        inel: [
          "Make the same measurements with the sticky collision pieces: the discs lock together when they collide.",
          "Write the values to the table; show that angular momentum is conserved but kinetic energy decreases.",
          "Compare the fraction of energy kept with the theoretical value (I₁ω₁ + I₂ω₂)² / [(I₁ + I₂)(I₁ω₁² + I₂ω₂²)].",
        ],
      },
      el: "Elastic collision",
      inel: "Inelastic collision",
      setup: "Apparatus",
      w1: "Lower disc ω₁ (push)",
      w2: "Upper disc ω₂ (push)",
      ring: "Extra ring on the upper disc",
      push: "Push the discs",
      stop: "Stop the discs",
      readout: "Display",
      before: "Before",
      after: "After",
      wait: "Waiting for measurements: the flags must pass the light gates.",
      done: "Speeds before and after have been measured.",
      noData: "Both the speeds before and after must be measured.",
      log: "Measured angular velocities",
      lower: "lower disc", upper: "upper disc",
      inertia: "Catalogue: I₁ = {a} ×10⁻⁴ kg·m², I₂ = {b} ×10⁻⁴ kg·m²",
      gL: "L′ = f(L)",
      resL: "Mean L′ / L",
      resE: "Mean E′ / E",
      resEth: "Theoretical E′ / E (last row)",
    },
    de: {
      kicker: "Versuch 7-B",
      title: "Erhaltung von Drehimpuls und Energie",
      short: "Drehe zwei Scheiben auf derselben Achse gegeneinander und lass sie stoßen; miss die Winkelgeschwindigkeiten mit Lichtschranken und vergleiche Drehimpuls und Energie.",
      tools: "Drehmodul (zwei Scheiben) · magnetische und haftende Stoßteile · zwei Lichtschranken",
      aim: "Untersuchen, ob Drehimpuls und kinetische Energie beim elastischen und unelastischen Drehstoß erhalten bleiben.",
      theory: `<p>Der Drehimpuls eines um eine feste Achse rotierenden starren Körpers ist L = I·ω (I: Trägheitsmoment). Ist das äußere Gesamtdrehmoment null, bleibt der Gesamtdrehimpuls erhalten:</p>
<p class="eq">I₁·ω₁ + I₂·ω₂ = I₁·ω₁′ + I₂·ω₂′</p>
<p>Stoßen zwei Scheiben auf derselben Achse, sind die Kräfte zwischen ihnen innere Kräfte; bei sehr kleiner Lagerreibung bleibt der Drehimpuls erhalten. Die Rotationsenergie ist E = ½·I·ω².</p>
<p>Beim <b>elastischen Stoß</b> (magnetische Teile stoßen sich ohne Berührung ab) bleibt auch die Energie erhalten. Bei gleichen Trägheitsmomenten werden die Winkelgeschwindigkeiten vertauscht: ω₁′ = ω₂, ω₂′ = ω₁.</p>
<p>Beim <b>unelastischen Stoß</b> (die Teile haften aneinander) drehen sich die Scheiben gemeinsam:</p>
<p class="eq">ω′ = (I₁·ω₁ + I₂·ω₂) / (I₁ + I₂)</p>
<p>Ein Teil der Energie wird in Wärme umgewandelt. Die Winkelgeschwindigkeit folgt aus der Dunkelzeit der Fahne in der Lichtschranke: ω = (Fahnenbreite / Radius) / t.</p>`,
      steps: {
        el: [
          "Die magnetischen Stoßteile sind montiert. Optional einen Zusatzring auf die obere Scheibe legen, um ihr Trägheitsmoment zu erhöhen.",
          "Anfangswinkelgeschwindigkeiten beider Scheiben einstellen (entgegengesetzte Vorzeichen = entgegengesetzte Richtungen) und <b>Scheiben anstoßen</b>.",
          "Nach dem Stoß, wenn beide Fahnen die Lichtschranken erneut passiert haben, mit <b>In Tabelle eintragen</b> ω₁, ω₂, ω₁′, ω₂′ übernehmen.",
          "Mit anderen Geschwindigkeiten und mit einer ruhenden Scheibe wiederholen. Verhältnisse von Drehimpuls und Energie untersuchen.",
        ],
        inel: [
          "Dieselben Messungen mit den haftenden Stoßteilen: Die Scheiben verbinden sich beim Stoß.",
          "Werte eintragen; zeigen, dass der Drehimpuls erhalten bleibt, die Energie aber abnimmt.",
          "Den erhaltenen Energieanteil mit dem theoretischen Wert (I₁ω₁ + I₂ω₂)² / [(I₁ + I₂)(I₁ω₁² + I₂ω₂²)] vergleichen.",
        ],
      },
      el: "Elastischer Stoß",
      inel: "Unelastischer Stoß",
      setup: "Aufbau",
      w1: "Untere Scheibe ω₁ (Anstoß)",
      w2: "Obere Scheibe ω₂ (Anstoß)",
      ring: "Zusatzring auf der oberen Scheibe",
      push: "Scheiben anstoßen",
      stop: "Scheiben anhalten",
      readout: "Anzeige",
      before: "Vorher",
      after: "Nachher",
      wait: "Warte auf Messwerte: Die Fahnen müssen die Lichtschranken passieren.",
      done: "Geschwindigkeiten vorher und nachher sind gemessen.",
      noData: "Es müssen die Geschwindigkeiten vorher und nachher gemessen sein.",
      log: "Gemessene Winkelgeschwindigkeiten",
      lower: "untere Scheibe", upper: "obere Scheibe",
      inertia: "Katalog: I₁ = {a} ×10⁻⁴ kg·m², I₂ = {b} ×10⁻⁴ kg·m²",
      gL: "L′ = f(L)",
      resL: "Mittleres L′ / L",
      resE: "Mittleres E′ / E",
      resEth: "Theoretisches E′ / E (letzte Zeile)",
    },
  };

  const cols = () => [
    { key: "i1", label: "I₁ (10⁻⁴ kg·m²)", input: true },
    { key: "i2", label: "I₂ (10⁻⁴ kg·m²)", input: true },
    { key: "w1", label: "ω₁ (rad/s)", input: true },
    { key: "w2", label: "ω₂ (rad/s)", input: true },
    { key: "u1", label: "ω₁′ (rad/s)", input: true },
    { key: "u2", label: "ω₂′ (rad/s)", input: true },
    { key: "L", label: "L (10⁻⁴ kg·m²/s)", calc: (r) => (full(r) ? r.i1 * r.w1 + r.i2 * r.w2 : null), digits: 2 },
    { key: "L2", label: "L′ (10⁻⁴ kg·m²/s)", calc: (r) => (full(r) ? r.i1 * r.u1 + r.i2 * r.u2 : null), digits: 2 },
    { key: "E", label: "E (mJ)", calc: (r) => (full(r) ? 0.05 * (r.i1 * r.w1 ** 2 + r.i2 * r.w2 ** 2) : null), digits: 2 },
    { key: "E2", label: "E′ (mJ)", calc: (r) => (full(r) ? 0.05 * (r.i1 * r.u1 ** 2 + r.i2 * r.u2 ** 2) : null), digits: 2 },
  ];
  const full = (r) => ["i1", "i2", "w1", "w2", "u1", "u2"].every((k) => typeof r[k] === "number");
  function res(c, tid, inel) {
    const tb = c.table(tid);
    const rows = tb.rows.filter(full);
    const out = [];
    const lr = rows.map((r) => tb.get(r, "L2") / tb.get(r, "L")).filter((v) => Number.isFinite(v));
    const er = rows.map((r) => tb.get(r, "E2") / tb.get(r, "E")).filter((v) => Number.isFinite(v));
    if (lr.length) out.push({ label: c.t("resL"), value: QBL.mean(lr), err: lr.length > 1 ? QBL.sem(lr) : null, ref: 1, refText: "1" });
    if (er.length) {
      let ref = 1, refText = "1";
      if (inel) {
        const r = rows[rows.length - 1];
        ref = (r.i1 * r.w1 + r.i2 * r.w2) ** 2 / ((r.i1 + r.i2) * (r.i1 * r.w1 ** 2 + r.i2 * r.w2 ** 2));
        refText = QBL.fixed(ref, 3);
        out.push({ label: c.t("resEth"), value: ref, digits: 3 });
      }
      out.push({ label: c.t("resE"), value: QBL.mean(er), err: er.length > 1 ? QBL.sem(er) : null, ref, refText });
    }
    return out;
  }

  const def = {
    id: "acisal-momentum",
    order: 75,
    text,
    parts: [
      {
        id: "el", title: "el", tables: [{ id: "EL", columns: cols(), minRows: 0 }],
        graphs: [{ id: "gl", title: () => QBL.tx(def, "gL"), x: { key: "L", label: "L (10⁻⁴ kg·m²/s)" }, y: { key: "L2", label: "L′ (10⁻⁴ kg·m²/s)" }, series: [{ table: "EL", name: "" }], fit: "prop", fits: ["prop", "line"], zeroX: true, zeroY: true }],
        results: (c) => res(c, "EL", false),
      },
      {
        id: "inel", title: "inel", tables: [{ id: "IN", columns: cols(), minRows: 0 }],
        graphs: [{ id: "gi", title: () => QBL.tx(def, "gL"), x: { key: "L", label: "L (10⁻⁴ kg·m²/s)" }, y: { key: "L2", label: "L′ (10⁻⁴ kg·m²/s)" }, series: [{ table: "IN", name: "" }], fit: "prop", fits: ["prop", "line"], zeroX: true, zeroY: true }],
        results: (c) => res(c, "IN", true),
      },
    ],

    mount(api) {
      const { C, t, mem } = api;
      const I0 = QBL.between(api.rng, 5.0e-3, 5.6e-3);   // disk (kg·m²)
      const Iring = QBL.between(api.rng, 4.6e-3, 5.2e-3);
      const fr = QBL.between(api.rng, 1.5e-5, 3.5e-5);
      const st = {
        part: api.part, ring: !!mem.ring, w1: mem.w1 ?? 4, w2: mem.w2 ?? -3,
        p1: 0, p2: 0, v1: 0, v2: 0, locked: false, time: 0,
        meas: [[], []], inter: null, blk: [null, null],
      };
      const I1 = () => I0, I2 = () => I0 + (st.ring ? Iring : 0);
      const GATE = rad(-35); // fotosellerin açısal konumu (ön sağ)
      const save = () => Object.assign(mem, { ring: st.ring, w1: st.w1, w2: st.w2 });

      function push() {
        // flamalar fotosellerin biraz gerisinde; çarpışma parçaları arasında 180°
        // flamalar fotosellerin 20° gerisinde; üst diskin çarpışma parçası flamasının tam karşısında
        st.p1 = GATE - rad(20) * Math.sign(st.w1 || 1);
        st.p2 = GATE - rad(20) * Math.sign(st.w2 || 1);
        st.v1 = st.w1 * (1 + 0.02 * QBL.gauss());
        st.v2 = st.w2 * (1 + 0.02 * QBL.gauss());
        st.locked = false; st.time = 0;
        st.meas = [[], []]; st.inter = null; st.blk = [null, null];
        log.clear();
        show();
      }
      function stop() { st.v1 = st.v2 = 0; st.locked = false; }

      function step(dt) {
        const n = Math.max(1, Math.ceil(dt / 0.0002));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          const prev = [st.p1, st.p2];
          let t1 = -Math.sign(st.v1) * fr, t2 = -Math.sign(st.v2) * fr;
          const d = wrap(st.p1 - (st.p2 + Math.PI));
          if (!st.locked) {
            if (st.part === "el") {
              // manyetik itme: τ = k (1/Δ² − 1/Δr²), Δr = 35° (yumuşak, sınırda sıfır)
              const Dr = rad(35), ad = Math.abs(d);
              if (ad < Dr) {
                const kk = 8e-3;
                const tau = kk * (1 / Math.max(rad(1), ad) ** 2 - 1 / (Dr * Dr)) * Math.sign(d || 1);
                t1 += tau; t2 -= tau;
                // ilk karşılaşma [t0, t1]; sonraki karşılaşmanın başlangıcı "next"
                if (!st.inter) st.inter = { t0: st.time, t1: st.time, done: false };
                else if (!st.inter.done) st.inter.t1 = st.time;
                else if (st.inter.next == null) st.inter.next = st.time;
                // parçalar yine de değerse esnek sekme (e ≈ 0,95)
                if (ad < rad(1.5) && (st.v1 - st.v2) * d < 0) {
                  const m1 = I1(), m2 = I2(), e = 0.95;
                  const v1 = st.v1, v2 = st.v2;
                  st.v1 = (m1 * v1 + m2 * v2 - m2 * e * (v1 - v2)) / (m1 + m2);
                  st.v2 = (m1 * v1 + m2 * v2 + m1 * e * (v1 - v2)) / (m1 + m2);
                }
              } else if (st.inter && !st.inter.done) st.inter.done = true;
            } else if (Math.abs(d) < rad(3) && (st.v1 - st.v2) * d < 0) {
              const w = (I1() * st.v1 + I2() * st.v2) / (I1() + I2());
              st.v1 = st.v2 = w;
              st.locked = true;
              st.inter = { t0: st.time, t1: st.time, done: true };
            }
          }
          if (st.locked) {
            const w = st.v1 + ((t1 + t2) / (I1() + I2())) * h;
            st.v1 = st.v2 = Math.abs(w) < 1e-3 ? 0 : w;
          } else {
            st.v1 += (t1 / I1()) * h; st.v2 += (t2 / I2()) * h;
            if (Math.abs(st.v1) < 2e-3 && !st.inter) st.v1 = 0;
          }
          st.p1 += st.v1 * h; st.p2 += st.v2 * h;
          st.time += h;
          // fotoseller: flamanın ışığı kestiği süre
          [st.p1, st.p2].forEach((p, k) => {
            const inside = Math.abs(wrap(p - GATE)) < FW / 2;
            if (inside && st.blk[k] == null) st.blk[k] = st.time;
            if (!inside && st.blk[k] != null) {
              const tb = st.time - st.blk[k];
              st.blk[k] = null;
              if (tb > 0) {
                const sgn = Math.sign(k ? st.v2 : st.v1) || 1;
                const w = (sgn * FW) / (Math.round(tb * 1e4) / 1e4);
                st.meas[k].push({ t: st.time, w });
                log.push(k, st.time, w);
              }
            }
          });
        }
        show();
      }
      function phase() {
        const out = { b: [null, null], a: [null, null] };
        const ti = st.inter;
        [0, 1].forEach((k) => {
          const ms = st.meas[k];
          if (!ti) { if (ms.length) out.b[k] = ms[ms.length - 1].w; return; }
          const pre = ms.filter((m) => m.t < ti.t0);
          out.b[k] = pre.length ? pre[pre.length - 1].w : 0;
          if (!ti.done) return;
          // çarpışmadan sonraki ilk geçiş (bir sonraki karşılaşmadan önce)
          const post = ms.filter((m) => m.t > ti.t1 + 0.05 && (ti.next == null || m.t < ti.next));
          const vk = k ? st.v2 : st.v1;
          out.a[k] = post.length ? post[0].w : st.time > ti.t1 + 1.5 && Math.abs(vk) < 0.06 ? 0 : null;
        });
        return out;
      }
      const f3 = (v) => (v == null ? "----" : v.toFixed(2));
      function show() {
        const ph = phase();
        l1.set(f3(ph.b[0])); l2.set(f3(ph.b[1])); l3.set(f3(ph.a[0])); l4.set(f3(ph.a[1]));
      }

      const P = (x, y, z = 0) => [CX + x, CY + K * y - z];
      function disc(c, z, phi, S, tone) {
        c.fillStyle = D.metal(c, CX - R, 0, CX + R, 0, tone);
        c.beginPath();
        c.ellipse(CX, CY - z + 1.2, R, R * K, 0, 0, Math.PI);
        c.lineTo(CX - R, CY - z);
        c.ellipse(CX, CY - z, R, R * K, 0, Math.PI, 0, true);
        c.closePath();
        c.fill();
        const g = c.createRadialGradient(CX - 4, CY - z - 3, 1, CX, CY - z, R);
        g.addColorStop(0, "#f4f6f8"); g.addColorStop(1, tone === "brass" ? "#c9a24a" : "#aab2ba");
        c.fillStyle = g;
        c.beginPath();
        c.ellipse(CX, CY - z, R, R * K, 0, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = "rgba(0,0,0,0.22)";
        c.lineWidth = S.px;
        for (let k = 0; k < 12; k++) {
          const a = phi + (k * Math.PI) / 6;
          const [x1, y1] = P(R * 0.6 * Math.cos(a), -R * 0.6 * Math.sin(a), z);
          const [x2, y2] = P(R * 0.95 * Math.cos(a), -R * 0.95 * Math.sin(a), z);
          c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
        }
      }
      function draw(c, S) {
        D.wall(c, S);
        D.bench(c, S, -5, 80, CY + 10, 4);
        c.fillStyle = D.metal(c, CX - 10, 0, CX + 10, 0, "dark");
        D.rr(c, CX - 10, CY + 1.5, 20, 8.5, 1);
        c.fill();
        // fotoseller (alt diskin altında E, üst diskin üstünde F)
        const [gx, gy] = P((R + 0.8) * Math.cos(GATE), -(R + 0.8) * Math.sin(GATE));
        c.fillStyle = "#2b3138";
        D.rr(c, gx - 1, gy - 2.5, 2, 5.5, 0.3); c.fill();
        D.rr(c, gx - 1, gy - ZU - 6, 2, 5.5, 0.3); c.fill();
        D.led(c, gx, gy + 2.2, 0.28, st.blk[0] != null, "#ff3b2f");
        D.led(c, gx, gy - ZU - 5.4, 0.28, st.blk[1] != null, "#ff3b2f");
        D.text(c, "E", gx + 1.6, gy + 1.5, { size: 1.5, color: S.colors.ink, weight: 600, base: "middle" });
        D.text(c, "F", gx + 1.6, gy - ZU - 4, { size: 1.5, color: S.colors.ink, weight: 600, base: "middle" });
        // alt disk, flaması (aşağı)
        disc(c, 0, st.p1, S, "alu");
        const [f1x, f1y] = P(R * 0.97 * Math.cos(st.p1), -R * 0.97 * Math.sin(st.p1), 0);
        c.fillStyle = "#16191c";
        c.fillRect(f1x - 0.35, f1y + 1.2, 0.7, 2.6);
        // çarpışma parçaları
        const piece = (phi, z0, z1, col) => {
          const [x, y] = P(12 * Math.cos(phi), -12 * Math.sin(phi), 0);
          c.fillStyle = col;
          c.fillRect(x - 0.9, y - z1, 1.8, z1 - z0);
        };
        const col = st.part === "el" ? "#b3312a" : "#3b4a5a";
        piece(st.p1, 0, 3.2, col);
        // eksen
        D.rodV(c, CX, CY - ZU - 2, CY, 1.2);
        piece(st.p2 + Math.PI, 3.6, ZU - 0.4, col);
        // üst disk ve flaması (yukarı)
        disc(c, ZU, st.p2, S, st.ring ? "brass" : "alu");
        const [f2x, f2y] = P(R * 0.97 * Math.cos(st.p2), -R * 0.97 * Math.sin(st.p2), ZU);
        c.fillStyle = "#16191c";
        c.fillRect(f2x - 0.35, f2y - 2.6, 0.7, 2.6);
      }
      api.stage({ world: [0, 4, 72, 52], maxH: 520, lensZoom: 4, label: t("title"), draw, step });

      // --- denetimler
      const l1 = C.lcd({ label: "ω₁ (" + t("before") + ")", cells: 5, unit: "rad/s" });
      const l2 = C.lcd({ label: "ω₂ (" + t("before") + ")", cells: 5, unit: "rad/s" });
      const l3 = C.lcd({ label: "ω₁′ (" + t("after") + ")", cells: 5, unit: "rad/s" });
      const l4 = C.lcd({ label: "ω₂′ (" + t("after") + ")", cells: 5, unit: "rad/s" });
      const s1 = C.slider({ label: t("w1"), min: -6, max: 6, step: 0.5, value: st.w1, digits: 1, unit: "rad/s", onInput(v) { st.w1 = v; save(); } });
      const s2 = C.slider({ label: t("w2"), min: -6, max: 6, step: 0.5, value: st.w2, digits: 1, unit: "rad/s", onInput(v) { st.w2 = v; save(); } });
      const ringChk = C.check({ label: t("ring"), value: st.ring, onChange(v) { st.ring = v; save(); iNote.textContent = inertiaTxt(); } });
      const inertiaTxt = () => t("inertia", { a: QBL.fixed(I1() * 1e4, 1), b: QBL.fixed(I2() * 1e4, 1) });
      const iNote = C.note(inertiaTxt(), "small");
      function record() {
        const ph = phase();
        if (ph.b.some((v) => v == null) || ph.a.some((v) => v == null)) { api.status(t("noData"), "bad"); return; }
        const r2 = (v) => Math.round(v * 100) / 100;
        const vals = { i1: Math.round(I1() * 1e5) / 10, i2: Math.round(I2() * 1e5) / 10, w1: r2(ph.b[0]), w2: r2(ph.b[1]), u1: r2(ph.a[0]), u2: r2(ph.a[1]) };
        const raws = Object.fromEntries(Object.entries(vals).map(([k, v]) => [k, String(v)]));
        api.table(st.part === "el" ? "EL" : "IN").addRow(vals, raws);
        api.status(api.tg("labRecorded"), "ok");
      }
      const log = new QBL.LogChart({ title: t("log"), xLabel: "t (s)", yLabel: "ω (rad/s)", xName: "t", yName: "ω", series: [{ name: t("lower") }, { name: t("upper") }], dots: true, select: false, height: 220 });
      api.panel.append(
        C.group(t("setup"), s1.el, s2.el, ringChk.el, iNote, C.buttons([{ label: t("push"), primary: true, onClick: push }, { label: t("stop"), onClick: stop }])),
        C.group(t("readout"), l1.el, l2.el, l3.el, l4.el, C.buttons([{ label: api.tg("labRecord"), onClick: record }])));
      api.extra.append(log.el);
      api.onPart((p) => { st.part = p; stop(); });
      show();
      return {};
    },

    selfTest() {
      // esnek olmayan: ω′ ve enerji oranı
      const I1 = 5e-3, I2 = 1e-2, w1 = 4, w2 = -2;
      const w = (I1 * w1 + I2 * w2) / (I1 + I2);
      const r = (0.5 * (I1 + I2) * w * w) / (0.5 * (I1 * w1 * w1 + I2 * w2 * w2));
      const th = (I1 * w1 + I2 * w2) ** 2 / ((I1 + I2) * (I1 * w1 ** 2 + I2 * w2 ** 2));
      return [{ name: "E′/E (esnek olmayan)", value: r, expected: th, tol: 1e-9 }];
    },
  };
  QBL.register(def);
})();
