// Deney 2-A – Kuvvetlerin bileşkesi: kuvvet masası, makaralar ve halka
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const R = 20;          // masa yarıçapı (cm)
  const PIN = 0.45, RING = 1.25; // merkez çubuğu ve halka yarıçapı
  const FREE = RING - 0.25 - PIN; // halkanın çubuğa değmeden kayabileceği yol
  const HANGER = 50;
  const rad = (d) => (d * Math.PI) / 180;
  const gN = 9.81;

  const PRESETS = {
    p120: { th: [0, 120, 240], m: [150, 150, 150] },
    pAng: { th: [20, 125, 250], m: [100, 100, 100] },
    pF: { th: [0, 90, 200], m: [100, 150, 200] },
  };

  const text = {
    tr: {
      kicker: "Deney 2-A",
      title: "Kuvvetlerin bileşkesi (kuvvet masası)",
      short: "Makaralara kütleler asıp halkayı dengeye getir; kuvvetlerin bileşenlerini ve sinüs teoremini sına.",
      tools: "Kuvvet masası · makaralar · kütle takımı",
      aim: "Newton'un birinci yasasını ve denge kavramını incelemek; aynı noktaya etki eden kuvvetlerin bileşkesini ve kuvvet–açı ilişkisini bulmak.",
      theory: `<p>Bir cisme etki eden kuvvetlerin bileşkesi sıfırsa cisim dengededir (Newton'un birinci yasası): duruyorsa durur. Kuvvet vektörel bir büyüklüktür; iki boyutta denge için her eksende ayrı ayrı</p>
<p class="eq">ΣFx = Σ Fᵢ · cos θᵢ = 0      ΣFy = Σ Fᵢ · sin θᵢ = 0</p>
<p>olmalıdır. Kuvvet masasında her ip bir makaradan geçip bir ağırlık taşır; ipteki gerilme Fᵢ = mᵢ · g'dir ve açı θᵢ masanın kenarındaki açı ölçeğinden okunur. Halka, merkezdeki çubuğa değmeden tam ortada kalıyorsa kuvvetler dengededir.</p>
<p>Üç kuvvet dengedeyse kuvvetler bir kapalı üçgen oluşturur ve sinüs teoremi (Lami teoremi) geçerlidir:</p>
<p class="eq">F₁ / sin θ₂₃ = F₂ / sin θ₃₁ = F₃ / sin θ₁₂</p>
<p>Burada θ₂₃, F₂ ile F₃ arasındaki açıdır. Makaralardaki sürtünme yüzünden halka, tam dengeden birkaç gram ya da birkaç derece farkta da ortada kalabilir; bu, deneyin başlıca hata kaynağıdır.</p>`,
      steps: {
        p120: [
          "Makaralar 0°, 120° ve 240°'de, askılarda eşit kütleler var. <b>Halkayı ortala</b> ve bırak: halka ortada kalıyor mu?",
          "Her makaranın açısını kenardaki ölçekten büyüteçle oku. <b>Kütleleri tabloya yaz</b> ile yeni satırı oluştur ve açıları gir.",
          "ΣFx ve ΣFy değerlerinin sıfıra yakın olduğunu ve sinüs teoreminin sağlandığını kontrol et.",
        ],
        pAng: [
          "Makaraları istediğin açılara getir (sürükle ya da ince ayar düğmeleriyle) ve sabit bırak.",
          "Askılara kütle ekleyip çıkararak halkayı ortada kalacak hâle getir. Her denemede <b>Halkayı ortala</b> ile halkayı ortaya al.",
          "Dengeyi bulunca kütleleri tabloya yaz, açıları ölçekten okuyup gir. Farklı açılarla tekrarla.",
        ],
        pF: [
          "Askılara istediğin kütleleri as ve değiştirme.",
          "Bir makarayı sabit tut, diğer ikisinin yerini değiştirerek halkayı dengeye getir.",
          "Dengeyi bulunca kütleleri tabloya yaz, açıları ölçekten okuyup gir. Farklı kütlelerle tekrarla.",
        ],
      },
      p120: "120° denge",
      pAng: "Sabit açılar",
      pF: "Sabit kuvvetler",
      pulley: "Makara",
      pulleyN: "Makara {n}",
      masses: "Askıdaki kütle (askı dahil): {m} g",
      angle: "Makarayı kaydır",
      center: "Halkayı ortala",
      tap: "Masaya hafifçe vur",
      toTable: "Kütleleri tabloya yaz",
      balanced: "Halka ortada duruyor: kuvvetler dengede görünüyor.",
      notBalanced: "Halka çubuğa dayandı: kuvvetler dengede değil.",
      drag: "Makaraları masanın kenarında sürükleyerek de kaydırabilirsin.",
      gPoly: "Kuvvet çokgeni (seçili satır)",
      resR: "Bileşkenin büyüklüğü |ΣF| (satır {n})",
      resRel: "Ortalama |ΣF| / ΣFᵢ",
      resLami: "Sinüs teoremi oranları (satır {n}): {a} N, {b} N, {c} N",
      resLamiSpread: "Sinüs teoremi oranlarının bağıl farkı (satır {n})",
      polyNote: "Kuvvetler uç uca eklenir; denge durumunda çokgen kapanır. Kırmızı ok bileşkeyi gösterir.",
    },
    en: {
      kicker: "Experiment 2-A",
      title: "Resultant of forces (force table)",
      short: "Hang masses over pulleys and bring the ring to equilibrium; test the force components and the sine rule.",
      tools: "Force table · pulleys · set of masses",
      aim: "To study Newton's first law and the idea of equilibrium; to find the resultant of forces acting at one point and the relation between force and angle.",
      theory: `<p>If the resultant of the forces on a body is zero, the body is in equilibrium (Newton's first law): at rest it stays at rest. Force is a vector; in two dimensions equilibrium requires, for each axis separately,</p>
<p class="eq">ΣFx = Σ Fᵢ · cos θᵢ = 0      ΣFy = Σ Fᵢ · sin θᵢ = 0</p>
<p>On the force table each string runs over a pulley and carries a weight; the tension is Fᵢ = mᵢ · g and the angle θᵢ is read on the scale at the edge of the table. If the ring stays exactly in the centre without touching the pin, the forces are in equilibrium.</p>
<p>When three forces are in equilibrium they form a closed triangle and the sine rule (Lami's theorem) holds:</p>
<p class="eq">F₁ / sin θ₂₃ = F₂ / sin θ₃₁ = F₃ / sin θ₁₂</p>
<p>Here θ₂₃ is the angle between F₂ and F₃. Because of friction in the pulleys the ring may stay centred even when the balance is off by a few grams or a few degrees; this is the main source of error.</p>`,
      steps: {
        p120: [
          "The pulleys are at 0°, 120° and 240° with equal masses on the hangers. <b>Centre the ring</b> and let go: does it stay in the middle?",
          "Read the angle of each pulley on the edge scale with the magnifier. Create a new row with <b>Write masses to table</b> and enter the angles.",
          "Check that ΣFx and ΣFy are close to zero and that the sine rule holds.",
        ],
        pAng: [
          "Move the pulleys to angles of your choice (drag them or use the fine buttons) and keep them there.",
          "Add or remove masses until the ring stays in the middle. Use <b>Centre the ring</b> before each try.",
          "When balanced, write the masses to the table and enter the angles read on the scale. Repeat with other angles.",
        ],
        pF: [
          "Hang masses of your choice and do not change them.",
          "Keep one pulley fixed and move the other two until the ring is balanced.",
          "When balanced, write the masses to the table and enter the angles read on the scale. Repeat with other masses.",
        ],
      },
      p120: "Balance at 120°",
      pAng: "Fixed angles",
      pF: "Fixed forces",
      pulley: "Pulley",
      pulleyN: "Pulley {n}",
      masses: "Mass on the hanger (with hanger): {m} g",
      angle: "Move the pulley",
      center: "Centre the ring",
      tap: "Tap the table gently",
      toTable: "Write masses to table",
      balanced: "The ring stays in the centre: the forces appear balanced.",
      notBalanced: "The ring rests against the pin: the forces are not balanced.",
      drag: "You can also drag the pulleys along the edge of the table.",
      gPoly: "Force polygon (selected row)",
      resR: "Magnitude of the resultant |ΣF| (row {n})",
      resRel: "Mean |ΣF| / ΣFᵢ",
      resLami: "Sine-rule ratios (row {n}): {a} N, {b} N, {c} N",
      resLamiSpread: "Relative spread of the sine-rule ratios (row {n})",
      polyNote: "The forces are added tip to tail; in equilibrium the polygon closes. The red arrow shows the resultant.",
    },
    de: {
      kicker: "Versuch 2-A",
      title: "Resultierende von Kräften (Kräftetisch)",
      short: "Hänge Massen über Rollen und bringe den Ring ins Gleichgewicht; prüfe Kraftkomponenten und Sinussatz.",
      tools: "Kräftetisch · Rollen · Massensatz",
      aim: "Das erste newtonsche Gesetz und das Gleichgewicht untersuchen; die Resultierende von Kräften an einem Punkt und den Zusammenhang zwischen Kraft und Winkel bestimmen.",
      theory: `<p>Ist die Resultierende aller Kräfte auf einen Körper null, so ist er im Gleichgewicht (erstes newtonsches Gesetz): Ruht er, so bleibt er in Ruhe. Kraft ist ein Vektor; in zwei Dimensionen muss für jede Achse gelten</p>
<p class="eq">ΣFx = Σ Fᵢ · cos θᵢ = 0      ΣFy = Σ Fᵢ · sin θᵢ = 0</p>
<p>Auf dem Kräftetisch läuft jeder Faden über eine Rolle und trägt ein Gewicht; die Fadenkraft ist Fᵢ = mᵢ · g, der Winkel θᵢ wird an der Skala am Tischrand abgelesen. Bleibt der Ring genau in der Mitte, ohne den Stift zu berühren, sind die Kräfte im Gleichgewicht.</p>
<p>Drei Kräfte im Gleichgewicht bilden ein geschlossenes Dreieck; es gilt der Sinussatz (Satz von Lami):</p>
<p class="eq">F₁ / sin θ₂₃ = F₂ / sin θ₃₁ = F₃ / sin θ₁₂</p>
<p>θ₂₃ ist der Winkel zwischen F₂ und F₃. Wegen der Reibung in den Rollen bleibt der Ring auch bei einigen Gramm oder Grad Abweichung in der Mitte; das ist die Hauptfehlerquelle.</p>`,
      steps: {
        p120: [
          "Die Rollen stehen bei 0°, 120° und 240°, an den Haltern hängen gleiche Massen. <b>Ring zentrieren</b> und loslassen: Bleibt er in der Mitte?",
          "Lies den Winkel jeder Rolle mit der Lupe an der Randskala ab. Mit <b>Massen in Tabelle</b> eine neue Zeile anlegen und die Winkel eintragen.",
          "Prüfe, dass ΣFx und ΣFy nahezu null sind und der Sinussatz erfüllt ist.",
        ],
        pAng: [
          "Stelle die Rollen auf Winkel deiner Wahl (ziehen oder Feineinstellung) und lass sie dort.",
          "Lege Massen auf oder nimm sie ab, bis der Ring in der Mitte bleibt. Vor jedem Versuch <b>Ring zentrieren</b>.",
          "Bei Gleichgewicht Massen in die Tabelle schreiben und die abgelesenen Winkel eintragen. Mit anderen Winkeln wiederholen.",
        ],
        pF: [
          "Hänge Massen deiner Wahl an und ändere sie nicht mehr.",
          "Halte eine Rolle fest und verschiebe die beiden anderen, bis der Ring im Gleichgewicht ist.",
          "Bei Gleichgewicht Massen in die Tabelle schreiben und die abgelesenen Winkel eintragen. Mit anderen Massen wiederholen.",
        ],
      },
      p120: "Gleichgewicht bei 120°",
      pAng: "Feste Winkel",
      pF: "Feste Kräfte",
      pulley: "Rolle",
      pulleyN: "Rolle {n}",
      masses: "Masse am Halter (mit Halter): {m} g",
      angle: "Rolle verschieben",
      center: "Ring zentrieren",
      tap: "Leicht an den Tisch klopfen",
      toTable: "Massen in Tabelle",
      balanced: "Der Ring bleibt in der Mitte: Die Kräfte scheinen im Gleichgewicht.",
      notBalanced: "Der Ring liegt am Stift an: Die Kräfte sind nicht im Gleichgewicht.",
      drag: "Die Rollen lassen sich auch am Tischrand ziehen.",
      gPoly: "Krafteck (gewählte Zeile)",
      resR: "Betrag der Resultierenden |ΣF| (Zeile {n})",
      resRel: "Mittleres |ΣF| / ΣFᵢ",
      resLami: "Sinussatz-Verhältnisse (Zeile {n}): {a} N, {b} N, {c} N",
      resLamiSpread: "Relative Streuung der Sinussatz-Verhältnisse (Zeile {n})",
      polyNote: "Die Kräfte werden aneinandergehängt; im Gleichgewicht schließt sich das Vieleck. Der rote Pfeil zeigt die Resultierende.",
    },
  };

  const cols = () => [
    { key: "m1", label: "m₁ (g)", input: true }, { key: "a1", label: "θ₁ (°)", input: true },
    { key: "m2", label: "m₂ (g)", input: true }, { key: "a2", label: "θ₂ (°)", input: true },
    { key: "m3", label: "m₃ (g)", input: true }, { key: "a3", label: "θ₃ (°)", input: true },
    { key: "Fx", label: "ΣFx (N)", calc: (r) => comp(r, Math.cos), digits: 3 },
    { key: "Fy", label: "ΣFy (N)", calc: (r) => comp(r, Math.sin), digits: 3 },
    { key: "FR", label: "|ΣF| (N)", calc: (r) => { const a = comp(r, Math.cos), b = comp(r, Math.sin); return a == null || b == null ? null : Math.hypot(a, b); }, digits: 3 },
  ];
  function comp(r, fn) {
    let s = 0;
    for (const i of [1, 2, 3]) {
      if (r["m" + i] == null || r["a" + i] == null) return null;
      s += (r["m" + i] / 1000) * gN * fn(rad(r["a" + i]));
    }
    return s;
  }
  const full = (r) => [1, 2, 3].every((i) => r["m" + i] != null && r["a" + i] != null);
  function lami(r) {
    const F = [1, 2, 3].map((i) => (r["m" + i] / 1000) * gN);
    const a = [1, 2, 3].map((i) => r["a" + i]);
    const between = (x, y) => { let d = Math.abs(a[x] - a[y]) % 360; if (d > 180) d = 360 - d; return rad(d); };
    return [F[0] / Math.sin(between(1, 2)), F[1] / Math.sin(between(2, 0)), F[2] / Math.sin(between(0, 1))];
  }
  function resultsFor(c, tid) {
    const tb = c.table(tid);
    const out = [];
    const rel = [];
    tb.rows.forEach((r, i) => {
      if (!full(r)) return;
      const FR = tb.get(r, "FR");
      const sum = [1, 2, 3].reduce((s, k) => s + (r["m" + k] / 1000) * gN, 0);
      rel.push(FR / sum);
      out.push({ label: c.t("resR", { n: i + 1 }), value: FR, unit: "N", digits: 3 });
    });
    if (rel.length) out.push({ label: c.t("resRel"), value: QBL.mean(rel) * 100, unit: "%", digits: 1, ref: 0, refText: "0 %" });
    const lastI = tb.rows.map((r, i) => (full(r) ? i : -1)).filter((i) => i >= 0).pop();
    if (lastI != null) {
      const L = lami(tb.rows[lastI]);
      out.push({ text: c.t("resLami", { n: lastI + 1, a: QBL.fixed(L[0], 3), b: QBL.fixed(L[1], 3), c: QBL.fixed(L[2], 3) }) });
      const m = QBL.mean(L);
      out.push({ label: c.t("resLamiSpread", { n: lastI + 1 }), value: ((Math.max(...L) - Math.min(...L)) / m) * 100, unit: "%", digits: 1, ref: 0, refText: "0 %" });
    }
    return out;
  }

  const def = {
    id: "kuvvet-masasi",
    order: 20,
    text,
    parts: ["p120", "pAng", "pF"].map((id) => ({
      id, title: id,
      tables: [{ id: "t" + id, columns: cols(), minRows: 0 }],
      results: (c) => resultsFor(c, "t" + id),
    })),

    mount(api) {
      const { C, t, mem } = api;
      mem.cfg = mem.cfg || {};
      const cfgFor = (p) => (mem.cfg[p] = mem.cfg[p] || JSON.parse(JSON.stringify(PRESETS[p])));
      const st = { cfg: cfgFor(api.part), sel: mem.sel || 0, ring: { x: 0, y: 0 }, drag: null, msg: null };
      // makara sürtünmesi (düzenekten düzeneğe biraz farklı)
      const fric0 = QBL.between(api.rng, 0.012, 0.022), fricRel = QBL.between(api.rng, 0.003, 0.006);

      const pos = (deg, r) => ({ x: r * Math.cos(rad(deg)), y: -r * Math.sin(rad(deg)) });
      function forces() {
        let fx = 0, fy = 0, sum = 0;
        st.cfg.th.forEach((th, i) => {
          const P = pos(th, R + 1.4);
          const dx = P.x - st.ring.x, dy = P.y - st.ring.y, L = Math.hypot(dx, dy);
          const T = (st.cfg.m[i] / 1000) * G;
          fx += (T * dx) / L; fy += (T * dy) / L; sum += T;
        });
        return { fx, fy, sum };
      }
      function step(dt) {
        if (st.drag && st.drag.k === "ring") return;
        const F = forces();
        const mag = Math.hypot(F.fx, F.fy);
        const lim = fric0 + fricRel * F.sum;
        const d = Math.hypot(st.ring.x, st.ring.y);
        if (mag > lim) {
          const k = (mag - lim) / mag;
          let vx = 30 * F.fx * k, vy = 30 * F.fy * k; // cm/s
          // çubuğa dayanınca normal bileşen yok olur
          if (d >= FREE - 1e-6) {
            const nx = st.ring.x / d, ny = st.ring.y / d;
            const vn = vx * nx + vy * ny;
            if (vn > 0) { vx -= vn * nx; vy -= vn * ny; }
          }
          st.ring.x += vx * dt; st.ring.y += vy * dt;
          const d2 = Math.hypot(st.ring.x, st.ring.y);
          if (d2 > FREE) { st.ring.x *= FREE / d2; st.ring.y *= FREE / d2; }
        }
      }

      function draw(c, S) {
        D.wall(c, S);
        // masa
        c.fillStyle = D.metal(c, -R, -R, R, R, "alu");
        c.beginPath();
        c.arc(0, 0, R, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = "rgba(0,0,0,0.4)";
        c.lineWidth = S.px * 1.5;
        c.stroke();
        c.fillStyle = "#f4f1e6";
        c.beginPath();
        c.arc(0, 0, R - 0.3, 0, Math.PI * 2);
        c.arc(0, 0, R - 4.2, 0, Math.PI * 2, true);
        c.fill();
        c.strokeStyle = "#1a1a1a";
        for (let d = 0; d < 360; d++) {
          const L = d % 10 === 0 ? 1.5 : d % 5 === 0 ? 1.0 : 0.6;
          const a = rad(d);
          c.lineWidth = d % 10 === 0 ? Math.max(S.px, 0.06) : Math.max(S.px * 0.8, 0.035);
          c.beginPath();
          c.moveTo((R - 0.3) * Math.cos(a), -(R - 0.3) * Math.sin(a));
          c.lineTo((R - 0.3 - L) * Math.cos(a), -(R - 0.3 - L) * Math.sin(a));
          c.stroke();
        }
        c.fillStyle = "#1a1a1a";
        c.font = D.font(0.95, 500);
        c.textAlign = "center";
        c.textBaseline = "middle";
        for (let d = 0; d < 360; d += 10) {
          const a = rad(d);
          c.save();
          c.translate((R - 3.1) * Math.cos(a), -(R - 3.1) * Math.sin(a));
          c.rotate(-a + Math.PI / 2 + (Math.sin(a) < -0.01 ? Math.PI : 0));
          c.fillText(String(d), 0, 0);
          c.restore();
        }
        // ipler
        st.cfg.th.forEach((th) => {
          const P = pos(th, R + 1.4);
          const dx = P.x - st.ring.x, dy = P.y - st.ring.y, L = Math.hypot(dx, dy);
          D.string(c, [[st.ring.x + (dx / L) * RING, st.ring.y + (dy / L) * RING], [P.x, P.y]], "#3b4148", 0.09);
        });
        // merkez çubuğu ve halka
        D.ball(c, 0, 0, PIN, "black");
        c.strokeStyle = D.metal(c, st.ring.x - RING, 0, st.ring.x + RING, 0);
        c.lineWidth = 0.32;
        c.beginPath();
        c.arc(st.ring.x, st.ring.y, RING - 0.16, 0, Math.PI * 2);
        c.stroke();
        // makaralar ve askılar
        st.cfg.th.forEach((th, i) => {
          const a = rad(th);
          c.save();
          c.rotate(-a);
          // kıskaç
          c.fillStyle = D.metal(c, 0, -1.3, 0, 1.3, "dark");
          D.rr(c, R - 0.6, -1.3, 3.6, 2.6, 0.3);
          c.fill();
          // makara (yandan)
          c.fillStyle = D.metal(c, 0, -1.2, 0, 1.2, "alu");
          D.rr(c, R + 0.7, -0.35, 2.4, 0.7, 0.2);
          c.fill();
          // okuma çizgisi
          c.strokeStyle = i === st.sel ? "#e53935" : "#c62828";
          c.lineWidth = Math.max(S.px * 1.2, 0.07);
          c.beginPath();
          c.moveTo(R - 4.2, 0);
          c.lineTo(R + 0.4, 0);
          c.stroke();
          c.restore();
          // askı etiketi
          const P = pos(th, R + 5.6);
          c.fillStyle = i === st.sel ? S.colors.accent : (S.colors.dark ? "#2a3440" : "#ffffff");
          D.rr(c, P.x - 3.1, P.y - 1.5, 6.2, 3, 0.7);
          c.fill();
          c.strokeStyle = S.colors.line;
          c.lineWidth = S.px;
          c.stroke();
          D.text(c, `${i + 1}: ${st.cfg.m[i]} g`, P.x, P.y + 0.05, { size: 1.05, color: i === st.sel ? "#fff" : S.colors.ink, align: "center", base: "middle", weight: 600 });
        });
      }

      const angOf = (p) => ((Math.atan2(-p.y, p.x) * 180) / Math.PI + 360) % 360;
      function pulleyAt(p) {
        const r = Math.hypot(p.x, p.y);
        if (r < R - 4.5 || r > R + 8) return -1;
        const a = angOf(p);
        let best = -1, bd = 9;
        st.cfg.th.forEach((th, i) => { let d = Math.abs(((a - th + 540) % 360) - 180); if (d < bd) { bd = d; best = i; } });
        return best;
      }
      const stage = api.stage({
        world: [-28, -28, 28, 28], maxH: 640, lensZoom: 5, label: t("title"), draw, step,
        pointer: {
          down(p) {
            const i = pulleyAt(p);
            if (i >= 0) { st.drag = { k: "pul", i }; select(i); return true; }
            if (Math.hypot(p.x - st.ring.x, p.y - st.ring.y) < RING + 0.8) { st.drag = { k: "ring" }; return true; }
            return false;
          },
          move(p) {
            if (!st.drag) return;
            if (st.drag.k === "pul") st.cfg.th[st.drag.i] = Math.round(angOf(p) * 10) / 10;
            else {
              let x = p.x, y = p.y;
              const d = Math.hypot(x, y);
              if (d > FREE) { x *= FREE / d; y *= FREE / d; }
              st.ring = { x, y };
            }
          },
          up() { st.drag = null; },
          cursor: (p) => (pulleyAt(p) >= 0 ? "grab" : Math.hypot(p.x - st.ring.x, p.y - st.ring.y) < RING + 0.8 ? "move" : ""),
        },
      });

      // --- denetimler
      const massLbl = api.el("p", { class: "lab-note" });
      const balLbl = api.el("p", { class: "lab-note", role: "status" });
      let pSeg;
      function select(i) { st.sel = i; mem.sel = i; if (pSeg) pSeg.value = i; massLbl.textContent = t("masses", { m: st.cfg.m[i] }); }
      pSeg = C.segment({ label: t("pulley"), value: st.sel, options: [0, 1, 2].map((i) => ({ value: i, label: t("pulleyN", { n: i + 1 }) })), onChange: (v) => select(Number(v)) });
      const addM = (d) => () => {
        const m = st.cfg.m[st.sel] + d;
        st.cfg.m[st.sel] = QBL.clamp(m, HANGER, 1000);
        select(st.sel);
      };
      const nudge = (d) => () => { st.cfg.th[st.sel] = (Math.round((st.cfg.th[st.sel] + d + 360) * 10) / 10) % 360; };
      api.panel.append(
        C.group(t("pulley"), pSeg.el, massLbl,
          C.buttons([{ label: "−50", onClick: addM(-50) }, { label: "−10", onClick: addM(-10) }, { label: "−5", onClick: addM(-5) }, { label: "+5", onClick: addM(5) }, { label: "+10", onClick: addM(10) }, { label: "+50", onClick: addM(50) }]),
          api.el("div", { class: "lab-ctl" }, api.el("span", { class: "lab-ctl-head" }, t("angle")),
            C.buttons([{ label: "−5°", onClick: nudge(-5) }, { label: "−1°", onClick: nudge(-1) }, { label: "−0,2°", onClick: nudge(-0.2) }, { label: "+0,2°", onClick: nudge(0.2) }, { label: "+1°", onClick: nudge(1) }, { label: "+5°", onClick: nudge(5) }])),
          C.note(t("drag"), "small")),
        C.group("",
          C.buttons([
            { label: t("center"), onClick: () => { st.ring = { x: 0, y: 0 }; } },
            { label: t("tap"), onClick: () => { st.ring.x += 0.25 * QBL.gauss(); st.ring.y += 0.25 * QBL.gauss(); } },
          ]),
          balLbl,
          C.buttons([{ label: t("toTable"), primary: true, onClick: () => {
            const v = {}, raw = {};
            [0, 1, 2].forEach((i) => { v["m" + (i + 1)] = st.cfg.m[i]; raw["m" + (i + 1)] = String(st.cfg.m[i]); });
            api.table("t" + api.part).addRow(v, raw);
            api.status(api.tg("labRecorded"), "ok");
          } }])));
      select(st.sel);
      const timer = setInterval(() => {
        const d = Math.hypot(st.ring.x, st.ring.y);
        const txt = d < 0.15 ? t("balanced") : d >= FREE - 0.02 ? t("notBalanced") : "";
        if (balLbl.textContent !== txt) balLbl.textContent = txt;
      }, 300);
      api.onDestroy(() => clearInterval(timer));
      api.onPart((p) => { st.cfg = cfgFor(p); st.ring = { x: 0, y: 0 }; select(st.sel); });

      // kuvvet çokgeni (seçili satır)
      const cv = api.el("canvas", { class: "lab-graph-canvas", role: "img", "aria-label": t("gPoly") });
      const box = api.el("div", { class: "lab-graph" }, api.el("div", { class: "lab-graph-head" }, api.el("h3", {}, t("gPoly"))), api.el("div", { class: "lab-graph-wrap" }, cv), C.note(t("polyNote"), "small"));
      api.extra.append(box);
      function poly() {
        const tb = api.table("t" + api.part);
        const r = tb.rows[tb.active] || tb.rows.slice().reverse().find(full);
        const W = cv.parentNode.clientWidth || 500, H = Math.round(Math.min(320, W * 0.6));
        const dpr = Math.min(2.5, window.devicePixelRatio || 1);
        cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px";
        const g = cv.getContext("2d");
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        const pal = QBL.theme();
        g.fillStyle = pal.surface;
        g.fillRect(0, 0, W, H);
        if (!r || !full(r)) { g.fillStyle = pal.muted; g.font = "13px Lexend, sans-serif"; g.textAlign = "center"; g.fillText(api.tg("labNoResults"), W / 2, H / 2); return; }
        const vec = [1, 2, 3].map((i) => { const F = (r["m" + i] / 1000) * gN, a = rad(r["a" + i]); return [F * Math.cos(a), F * Math.sin(a)]; });
        const pts = [[0, 0]];
        vec.forEach((v) => { const p = pts[pts.length - 1]; pts.push([p[0] + v[0], p[1] + v[1]]); });
        const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
        const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), 0.5);
        const sc = (Math.min(W, H) * 0.75) / span;
        const cx = W / 2 - ((Math.max(...xs) + Math.min(...xs)) / 2) * sc, cy = H / 2 + ((Math.max(...ys) + Math.min(...ys)) / 2) * sc;
        g.save();
        g.translate(cx, cy);
        pts.slice(1).forEach((p, i) => {
          const q = pts[i];
          D.arrow(g, q[0] * sc, -q[1] * sc, p[0] * sc, -p[1] * sc, { color: pal.series[i], w: 2.4, head: 11 });
          g.fillStyle = pal.series[i];
          g.font = "600 13px Lexend, sans-serif";
          g.fillText("F" + "₁₂₃"[i], ((q[0] + p[0]) / 2) * sc + 6, (-(q[1] + p[1]) / 2) * sc - 6);
        });
        const last = pts[3];
        if (Math.hypot(last[0], last[1]) * sc > 3) D.arrow(g, 0, 0, last[0] * sc, -last[1] * sc, { color: pal.bad, w: 2, head: 9 });
        g.restore();
      }
      return { onData: poly, onClear: poly };
    },

    selfTest() {
      // dengedeki üç kuvvet: sinüs teoremi
      const r = { m1: 150, a1: 0, m2: 150, a2: 120, m3: 150, a3: 240 };
      const L = lami(r);
      return [
        { name: "ΣFx", value: comp(r, Math.cos), expected: 0, tol: 1e-9, abs: true },
        { name: "Lami", value: L[0] / L[1], expected: 1, tol: 1e-9 },
      ];
    },
  };
  QBL.register(def);
})();
