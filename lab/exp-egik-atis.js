// Deney 4 – Eğik atış: yaylı fırlatıcı, karbon kâğıtlı düşey ekran, namlu fotoseli
(function () {
  "use strict";
  const D = QBL.D;
  const G = QBL.G;
  const BALL = { r: 0.8, m: 0.0167 }; // cm, kg
  const PIV = { x: 9, y: 40 };         // namlu pivotu
  const BARREL = 9;                    // pivot → namlu ağzı (cm)
  const FLOOR = 70;
  const POWER = [2.55, 3.05, 3.55];    // kademe hızları (m/s), düzenekle biraz değişir

  function muzzle(alpha) {
    const a = (alpha * Math.PI) / 180;
    return { x: PIV.x + BARREL * Math.cos(a), y: PIV.y - BARREL * Math.sin(a) };
  }
  // Hava dirençli yörünge; ekran düzlemine (x = X cm) ulaşınca ya da yere düşünce durur
  function flight(v0, alpha, X) {
    const a = (alpha * Math.PI) / 180;
    const k = (0.5 * 1.2 * 0.47 * Math.PI * (BALL.r / 100) ** 2) / BALL.m;
    let x = 0, y = 0, vx = v0 * Math.cos(a), vy = v0 * Math.sin(a), t = 0; // m, yukarı +
    const path = [[0, 0, 0]];
    const h = 0.0005;
    const m0 = muzzle(alpha);
    const floorY = (FLOOR - m0.y) / 100; // namlunun altındaki zemin (m)
    for (let i = 0; i < 20000; i++) {
      const v = Math.hypot(vx, vy);
      const ax = -k * v * vx, ay = -G - k * v * vy;
      vx += ax * h; vy += ay * h; x += vx * h; y += vy * h; t += h;
      if (i % 6 === 0) path.push([x * 100, y * 100, t]);
      if (X != null && x * 100 >= X - BALL.r) {
        const f = (X - BALL.r - (x - vx * h) * 100) / (vx * h * 100);
        const yh = (y - vy * h + vy * h * f) * 100;
        path.push([X - BALL.r, yh, t]);
        return { hit: true, y: yh, t, path };
      }
      if (-y * 100 > floorY * 100 - BALL.r) return { hit: false, t, path };
    }
    return { hit: false, t, path };
  }

  const text = {
    tr: {
      kicker: "Deney 4",
      title: "Eğik atış",
      short: "Bilyeyi bir açıyla fırlat, karbon kâğıtlı ekrandaki izlerden yörüngeyi çiz; ilk hızı ve menzili bul.",
      tools: "Yaylı fırlatıcı · karbon kâğıtlı ekran · namlu fotoseli · cetvel",
      aim: "Eğik atışın düşey atış ile düzgün doğrusal hareketin bileşkesi olduğunu göstermek ve yörüngeyi incelemek.",
      theory: `<p>Bilye t = 0'da υ₀ hızıyla, yatayla α açısı yaparak atılsın. Hava direnci ihmal edilirse yatayda düzgün doğrusal, düşeyde düşey atış hareketi yapar:</p>
<p class="eq">x = υ₀ · cos α · t      y = υ₀ · sin α · t − ½ · g · t²</p>
<p>t yok edilirse yörünge denklemi bir paraboldür:</p>
<p class="eq">y = tan α · x − g · x² / (2 · υ₀² · cos² α)</p>
<p>Ölçülen (x, y) noktalarına y = a + b·x + c·x² parabolü uydurulursa b = tan α ve c = −g / (2 υ₀² cos² α) olur; buradan υ₀ bulunur. Atış noktasıyla aynı yüksekliğe dönüş için menzil, uçuş süresi, tepe yüksekliği ve tepeye çıkış süresi:</p>
<p class="eq">s = υ₀² · sin 2α / g    t_s = 2 υ₀ sin α / g    h = υ₀² sin² α / (2g)    t_h = υ₀ sin α / g</p>
<p>Hava direnci yörüngeyi biraz kısaltır ve tepe noktasından sonra eğriyi dikleştirir (balistik eğri).</p>`,
      steps: [
        "Atış açısını ve fırlatıcının kademesini seç. Ekranı atış noktasından x = 5 cm uzağa koy.",
        "<b>Ateşle</b>: bilye ekrana çarpar ve karbon kâğıt beyaz kâğıtta bir iz bırakır. Namlu fotoselinin gösterdiği ilk hızı not et.",
        "Ekranı 5 cm uzaklaştırıp (ve 5 cm yana kaydırıp) yeniden ateşle. Böylece kâğıttaki izler 5 cm aralıkla yörüngeyi çizer.",
        "Bilye ekranı ıskalayıp yere düşene kadar devam et. Açıyı ve kademeyi bu sırada değiştirme.",
        "<b>Kâğıt</b> görünümünde cetveli her izin üzerine getir; izin atış yüksekliği çizgisine göre yüksekliğini (aşağıdaysa eksi) oku ve tabloya yaz.",
        "y–x grafiğine parabol uydur; α'yı, υ₀'ı, menzili ve tepe yüksekliğini hesapla ve kuramsal değerlerle karşılaştır.",
      ],
      partMain: "Yörünge",
      view: "Görünüm",
      viewSetup: "Düzenek",
      viewPaper: "Kâğıt",
      angle: "Atış açısı α",
      power: "Fırlatıcı kademesi",
      powerN: "{n}. kademe",
      screen: "Ekranın uzaklığı x",
      fire: "Ateşle",
      next: "Ekranı 5 cm uzaklaştır",
      prev: "5 cm yaklaştır",
      newPaper: "Yeni kâğıt",
      muzzle: "Namlu fotoseli: υ₀",
      missed: "Bilye ekrana ulaşamadan yere düştü.",
      marked: "İz bırakıldı: x = {x} cm.",
      busy: "Bilye hâlâ havada.",
      paperNote: "Cetveli sürükleyerek bir izin üzerine getir; büyüteçle izin merkezini oku. Kesik çizgi atış noktasının yüksekliğidir.",
      gY: "y = f(x)",
      resAlpha: "Atış açısı α (eğriden, tan α = b)",
      resAlphaSet: "Ayarlanan atış açısı",
      resV0: "İlk hız υ₀ (eğriden)",
      resV0m: "İlk hız υ₀ (namlu fotoseli, ortalama)",
      resS: "Menzil s (eğrinin y = 0 kesişimi)",
      resSth: "Menzil s (kuramsal, fotoseldeki υ₀ ile)",
      resH: "Tepe yüksekliği h (eğriden)",
      resHth: "Tepe yüksekliği h (kuramsal)",
      resT: "Uçuş süresi t_s ve tepeye çıkış süresi t_h (kuramsal)",
      resTval: "t_s = {ts} s, t_h = {th} s",
      colV: "υ₀ (m/s)",
    },
    en: {
      kicker: "Experiment 4",
      title: "Projectile motion",
      short: "Launch a ball at an angle, plot the trajectory from the marks on a carbon-paper screen and find the launch speed and the range.",
      tools: "Spring launcher · carbon-paper screen · muzzle light gate · ruler",
      aim: "To show that projectile motion is the combination of a vertical throw and uniform linear motion, and to study the trajectory.",
      theory: `<p>Let a ball be launched at t = 0 with speed υ₀ at an angle α to the horizontal. Neglecting air resistance, it moves uniformly in the horizontal direction and as a vertical throw in the vertical direction:</p>
<p class="eq">x = υ₀ · cos α · t      y = υ₀ · sin α · t − ½ · g · t²</p>
<p>Eliminating t gives a parabola:</p>
<p class="eq">y = tan α · x − g · x² / (2 · υ₀² · cos² α)</p>
<p>Fitting y = a + b·x + c·x² to the measured (x, y) points gives b = tan α and c = −g / (2 υ₀² cos² α), from which υ₀ follows. For a return to the launch height, the range, flight time, maximum height and time to the top are</p>
<p class="eq">s = υ₀² · sin 2α / g    t_s = 2 υ₀ sin α / g    h = υ₀² sin² α / (2g)    t_h = υ₀ sin α / g</p>
<p>Air resistance shortens the trajectory slightly and makes it steeper after the top (ballistic curve).</p>`,
      steps: [
        "Choose the launch angle and the launcher setting. Place the screen x = 5 cm from the launch point.",
        "<b>Fire</b>: the ball hits the screen and the carbon paper leaves a mark on the white paper. Note the launch speed shown by the muzzle light gate.",
        "Move the screen 5 cm further away (and 5 cm sideways) and fire again. The marks on the paper then trace the trajectory at 5 cm intervals.",
        "Continue until the ball misses the screen and lands on the floor. Do not change the angle or the setting in between.",
        "In the <b>Paper</b> view, move the ruler onto each mark; read the height of the mark above the launch-height line (negative if below) and enter it.",
        "Fit a parabola to the y–x graph; calculate α, υ₀, the range and the maximum height and compare with theory.",
      ],
      partMain: "Trajectory",
      view: "View",
      viewSetup: "Apparatus",
      viewPaper: "Paper",
      angle: "Launch angle α",
      power: "Launcher setting",
      powerN: "setting {n}",
      screen: "Distance of the screen x",
      fire: "Fire",
      next: "Move screen 5 cm away",
      prev: "5 cm closer",
      newPaper: "New paper",
      muzzle: "Muzzle light gate: υ₀",
      missed: "The ball landed on the floor before reaching the screen.",
      marked: "Mark made: x = {x} cm.",
      busy: "The ball is still in the air.",
      paperNote: "Drag the ruler onto a mark and read the centre of the mark with the magnifier. The dashed line is the launch height.",
      gY: "y = f(x)",
      resAlpha: "Launch angle α (from the curve, tan α = b)",
      resAlphaSet: "Launch angle set",
      resV0: "Launch speed υ₀ (from the curve)",
      resV0m: "Launch speed υ₀ (muzzle light gate, mean)",
      resS: "Range s (curve crosses y = 0)",
      resSth: "Range s (theory, with υ₀ from the light gate)",
      resH: "Maximum height h (from the curve)",
      resHth: "Maximum height h (theory)",
      resT: "Flight time t_s and time to the top t_h (theory)",
      resTval: "t_s = {ts} s, t_h = {th} s",
      colV: "υ₀ (m/s)",
    },
    de: {
      kicker: "Versuch 4",
      title: "Schiefer Wurf",
      short: "Schieße eine Kugel schräg ab, zeichne die Bahn aus den Spuren auf einem Kohlepapier-Schirm und bestimme Abwurfgeschwindigkeit und Wurfweite.",
      tools: "Federkatapult · Schirm mit Kohlepapier · Mündungslichtschranke · Lineal",
      aim: "Zeigen, dass der schiefe Wurf aus einem senkrechten Wurf und einer gleichförmigen Bewegung zusammengesetzt ist, und die Wurfbahn untersuchen.",
      theory: `<p>Eine Kugel wird bei t = 0 mit υ₀ unter dem Winkel α zur Horizontalen abgeschossen. Ohne Luftwiderstand bewegt sie sich waagerecht gleichförmig und senkrecht wie beim senkrechten Wurf:</p>
<p class="eq">x = υ₀ · cos α · t      y = υ₀ · sin α · t − ½ · g · t²</p>
<p>Eliminiert man t, ergibt sich eine Parabel:</p>
<p class="eq">y = tan α · x − g · x² / (2 · υ₀² · cos² α)</p>
<p>Passt man y = a + b·x + c·x² an die Messpunkte an, gilt b = tan α und c = −g / (2 υ₀² cos² α); daraus folgt υ₀. Für die Rückkehr auf Abwurfhöhe gelten Wurfweite, Flugzeit, Wurfhöhe und Steigzeit</p>
<p class="eq">s = υ₀² · sin 2α / g    t_s = 2 υ₀ sin α / g    h = υ₀² sin² α / (2g)    t_h = υ₀ sin α / g</p>
<p>Der Luftwiderstand verkürzt die Bahn etwas und macht sie nach dem Scheitel steiler (ballistische Kurve).</p>`,
      steps: [
        "Wähle Abwurfwinkel und Stufe des Katapults. Stelle den Schirm x = 5 cm vor den Abwurfpunkt.",
        "<b>Abschießen</b>: Die Kugel trifft den Schirm, das Kohlepapier hinterlässt eine Spur auf dem weißen Papier. Notiere die Geschwindigkeit der Mündungslichtschranke.",
        "Rücke den Schirm 5 cm weiter (und 5 cm seitlich) und schieße erneut. So zeichnen die Spuren die Bahn in 5-cm-Abständen nach.",
        "Fahre fort, bis die Kugel den Schirm verfehlt und am Boden landet. Winkel und Stufe dabei nicht ändern.",
        "In der Ansicht <b>Papier</b> das Lineal auf jede Spur schieben; die Höhe über der Abwurflinie ablesen (darunter negativ) und eintragen.",
        "Passe an das y–x-Diagramm eine Parabel an; berechne α, υ₀, Wurfweite und Wurfhöhe und vergleiche mit der Theorie.",
      ],
      partMain: "Wurfbahn",
      view: "Ansicht",
      viewSetup: "Aufbau",
      viewPaper: "Papier",
      angle: "Abwurfwinkel α",
      power: "Katapultstufe",
      powerN: "Stufe {n}",
      screen: "Abstand des Schirms x",
      fire: "Abschießen",
      next: "Schirm 5 cm weiter",
      prev: "5 cm näher",
      newPaper: "Neues Papier",
      muzzle: "Mündungslichtschranke: υ₀",
      missed: "Die Kugel landete vor dem Schirm am Boden.",
      marked: "Spur erzeugt: x = {x} cm.",
      busy: "Die Kugel ist noch in der Luft.",
      paperNote: "Ziehe das Lineal auf eine Spur und lies ihre Mitte mit der Lupe ab. Die gestrichelte Linie ist die Abwurfhöhe.",
      gY: "y = f(x)",
      resAlpha: "Abwurfwinkel α (aus der Kurve, tan α = b)",
      resAlphaSet: "Eingestellter Abwurfwinkel",
      resV0: "Abwurfgeschwindigkeit υ₀ (aus der Kurve)",
      resV0m: "Abwurfgeschwindigkeit υ₀ (Mündungslichtschranke, Mittel)",
      resS: "Wurfweite s (Kurve schneidet y = 0)",
      resSth: "Wurfweite s (Theorie, mit υ₀ der Lichtschranke)",
      resH: "Wurfhöhe h (aus der Kurve)",
      resHth: "Wurfhöhe h (Theorie)",
      resT: "Flugzeit t_s und Steigzeit t_h (Theorie)",
      resTval: "t_s = {ts} s, t_h = {th} s",
      colV: "υ₀ (m/s)",
    },
  };

  const gC = 981; // cm/s²
  const def = {
    id: "egik-atis",
    order: 40,
    text,
    parts: [{
      id: "main", title: "partMain",
      tables: [
        { id: "y", columns: [{ key: "x", label: "x (cm)", input: true }, { key: "y", label: "y (cm)", input: true }], rows: Array.from({ length: 18 }, (_, i) => ({ x: 5 * (i + 1), $x: String(5 * (i + 1)) })) },
        { id: "v", title: () => QBL.tx(def, "muzzle"), columns: [{ key: "v", label: () => QBL.tx(def, "colV"), input: true }], minRows: 0 },
      ],
      graphs: [{ id: "gy", title: () => QBL.tx(def, "gY"), x: { key: "x", label: "x (cm)" }, y: { key: "y", label: "y (cm)" }, series: [{ table: "y", name: "" }], fit: "quad", fits: ["quad"], zeroX: true, zeroY: true }],
      results(c) {
        const out = [];
        const f = c.fit("gy");
        const alphaSet = c.api.mem.alpha;
        const vs = c.table("v").values("v");
        if (alphaSet != null) out.push({ label: c.t("resAlphaSet"), value: alphaSet, unit: "°", digits: 0 });
        if (f && f.c[2] < 0) {
          const [a0, b, cc] = f.c;
          const alpha = Math.atan(b);
          out.push({ label: c.t("resAlpha"), value: (alpha * 180) / Math.PI, err: ((f.se[1] / (1 + b * b)) * 180) / Math.PI, unit: "°", ref: alphaSet });
          const v0 = Math.sqrt(-gC / (2 * cc * Math.cos(alpha) ** 2)) / 100;
          const dv = v0 * 0.5 * (f.se[2] / Math.abs(cc));
          out.push({ label: c.t("resV0"), value: v0, err: dv, unit: "m/s", ref: vs.length ? QBL.mean(vs) : null });
          const disc = b * b - 4 * cc * a0;
          if (disc >= 0) out.push({ label: c.t("resS"), value: (-b - Math.sqrt(disc)) / (2 * cc), unit: "cm", digits: 1 });
          out.push({ label: c.t("resH"), value: a0 - (b * b) / (4 * cc), unit: "cm", digits: 1 });
        }
        if (vs.length && alphaSet != null) {
          const v = QBL.mean(vs), a = (alphaSet * Math.PI) / 180;
          out.push({ label: c.t("resV0m"), value: v, err: vs.length > 1 ? QBL.sem(vs) : null, unit: "m/s", digits: 2 });
          out.push({ label: c.t("resSth"), value: ((v * v * Math.sin(2 * a)) / G) * 100, unit: "cm", digits: 1 });
          out.push({ label: c.t("resHth"), value: ((v * v * Math.sin(a) ** 2) / (2 * G)) * 100, unit: "cm", digits: 1 });
          out.push({ text: c.t("resT") + ": " + c.t("resTval", { ts: QBL.fixed((2 * v * Math.sin(a)) / G, 3), th: QBL.fixed((v * Math.sin(a)) / G, 3) }) });
        }
        return out;
      },
    }],
    model: { flight, muzzle },

    mount(api) {
      const { C, t, mem } = api;
      const ex = api.store.extra;
      ex.marks = ex.marks || [];
      const vset = POWER.map((v) => v * QBL.between(api.rng, 0.97, 1.03));
      const st = {
        alpha: mem.alpha ?? 40, pow: mem.pow ?? 1, X: mem.X ?? 5, view: mem.view || "setup",
        shot: null, ruler: mem.ruler ?? 20, drag: null, last: null,
      };
      mem.alpha = st.alpha;
      const save = () => { Object.assign(mem, { alpha: st.alpha, pow: st.pow, X: st.X, view: st.view, ruler: st.ruler }); api.persist(); };

      function step(dt) {
        const s = st.shot;
        if (!s) return;
        s.t += dt;
        if (s.t >= s.res.t + 0.4) {
          if (s.res.hit) {
            ex.marks.push({ x: s.X, y: Math.round(s.res.y * 100) / 100 });
            api.persist();
            api.status(t("marked", { x: s.X }), "ok");
          } else api.status(t("missed"), "bad");
          st.shot = null;
        }
      }
      const boardX = () => muzzle(st.alpha).x + st.X;

      function drawSetup(c, S) {
        D.wall(c, S);
        // zemin ve masa
        c.fillStyle = S.colors.dark ? "#2a2f36" : "#c9ced4";
        c.fillRect(S.view.x0, FLOOR, S.view.x1 - S.view.x0, S.view.y1 - FLOOR);
        D.bench(c, S, -10, 22, 44, 3, 0, false);
        c.fillStyle = "#6b4a2e";
        c.fillRect(1, 47, 2, FLOOR - 47);
        c.fillRect(18, 47, 2, FLOOR - 47);
        // fırlatıcı gövdesi
        c.fillStyle = D.metal(c, 0, 40, 0, 44, "dark");
        D.rr(c, 4, 41, 12, 3, 0.5);
        c.fill();
        // açı ölçer
        D.protractor(c, PIV.x, PIV.y, 6.5, { from: 0, to: 90, every: 10, px: S.px, face: "rgba(240,246,250,0.9)" });
        // şakul
        D.line(c, PIV.x, PIV.y, PIV.x, PIV.y + 4.5, "#333", 0.05);
        // namlu
        const a = (st.alpha * Math.PI) / 180;
        c.save();
        c.translate(PIV.x, PIV.y);
        c.rotate(-a);
        c.fillStyle = D.metal(c, 0, -1.3, 0, 1.3, "dark");
        D.rr(c, -2.5, -1.3, BARREL + 2.5, 2.6, 0.5);
        c.fill();
        c.fillStyle = "#e53935";
        c.fillRect(BARREL - 2.6, -1.35, 0.5, 2.7);
        c.restore();
        D.knob(c, PIV.x, PIV.y, 0.8, 0);
        // namlu fotoseli göstergesi
        const vtxt = st.last ? st.last.toFixed(2) : "0.00";
        D.counter(c, 1, 8, 15, 8, vtxt, { cells: 4, unit: "m/s", label: "υ₀" });
        D.string(c, [[PIV.x + 4, PIV.y - 1], [6, 22], [8, 16]], "#222", 0.15);
        // ekran
        const bx = boardX();
        c.fillStyle = "#e9e3d2";
        c.fillRect(bx, 6, 1.2, FLOOR - 6);
        c.fillStyle = "#ffffff";
        c.fillRect(bx - 0.25, 8, 0.35, FLOOR - 10);
        c.fillStyle = D.metal(c, 0, FLOOR - 2, 0, FLOOR, "dark");
        c.fillRect(bx - 5, FLOOR - 1.2, 11, 1.2);
        // atış yüksekliği çizgisi
        const m0 = muzzle(st.alpha);
        c.strokeStyle = "rgba(60,60,60,0.6)";
        c.setLineDash([0.6, 0.5]);
        c.lineWidth = 0.08;
        c.beginPath();
        c.moveTo(m0.x, m0.y); c.lineTo(bx, m0.y);
        c.stroke();
        c.setLineDash([]);
        // uçuş
        const s = st.shot;
        if (s) {
          const p = s.res.path;
          let k = 0;
          while (k + 1 < p.length && p[k + 1][2] <= s.t) k++;
          c.strokeStyle = "rgba(198,40,40,0.35)";
          c.lineWidth = 0.15;
          c.beginPath();
          for (let i = 0; i <= k; i++) c.lineTo(s.m0.x + p[i][0], s.m0.y - p[i][1]);
          c.stroke();
          const q = p[Math.min(k, p.length - 1)];
          D.ball(c, s.m0.x + q[0], s.m0.y - q[1], BALL.r, "steel");
        }
        D.dim(c, m0.x, FLOOR + 1.8, bx, FLOOR + 1.8, "x = " + st.X + " cm", { color: S.colors.muted, size: 1.3, w: 0.08, head: 0.8, base: "top", dy: 0.4 });
      }
      function drawPaper(c, S) {
        D.wall(c, S);
        c.fillStyle = "#fbfbf7";
        c.fillRect(-2, -32, 100, 64);
        c.strokeStyle = "rgba(0,0,0,0.15)";
        c.lineWidth = S.px;
        c.strokeRect(-2, -32, 100, 64);
        c.strokeStyle = "rgba(60,60,60,0.55)";
        c.setLineDash([0.8, 0.6]);
        c.lineWidth = 0.08;
        c.beginPath();
        c.moveTo(-2, 0); c.lineTo(98, 0);
        c.stroke();
        c.setLineDash([]);
        for (const m of ex.marks) {
          c.fillStyle = "rgba(30,30,40,0.85)";
          c.beginPath();
          c.ellipse(m.x, -m.y, 0.45, 0.42, 0.3, 0, Math.PI * 2);
          c.fill();
        }
        D.ruler(c, { x: st.ruler + 1.4, y: -30, len: 60, dir: "v", side: "left", w: 2.8, px: S.px, from: -30, reverse: true, every: 2, fontSize: 0.85 });
      }
      const draw = (c, S) => (st.view === "paper" ? drawPaper(c, S) : drawSetup(c, S));
      const WS = [-3, 0, 120, 76], WP = [-4, -34, 100, 34];
      const nearRuler = (p) => st.view === "paper" && p.x > st.ruler - 2.5 && p.x < st.ruler + 2.5 && p.y > -31 && p.y < 31;
      const stage = api.stage({
        world: st.view === "paper" ? WP : WS, maxH: 600, lensZoom: 5, label: t("title"), draw, step,
        pointer: {
          down(p) { if (nearRuler(p)) { st.drag = { dx: p.x - st.ruler }; return true; } return false; },
          move(p) { if (st.drag) st.ruler = QBL.clamp(p.x - st.drag.dx, 0, 96); },
          up() { st.drag = null; save(); },
          cursor: (p) => (nearRuler(p) ? "ew-resize" : ""),
        },
      });

      // --- denetimler
      const aSl = C.slider({ label: t("angle"), min: 10, max: 75, step: 1, value: st.alpha, digits: 0, unit: "°", fine: [-1, 1], onInput(v) { st.alpha = v; save(); } });
      const pSeg = C.segment({ label: t("power"), value: st.pow, options: [0, 1, 2].map((i) => ({ value: i, label: t("powerN", { n: i + 1 }) })), onChange(v) { st.pow = Number(v); save(); } });
      const xLbl = api.el("p", { class: "lab-note" });
      const showX = () => { xLbl.textContent = t("screen") + ": " + st.X + " cm"; };
      showX();
      const moveX = (d) => { st.X = QBL.clamp(st.X + d, 5, 95); showX(); save(); };
      function fire() {
        if (st.shot) { api.status(t("busy"), "bad"); return; }
        const v0 = vset[st.pow] * (1 + 0.008 * QBL.gauss());
        const res = flight(v0, st.alpha, st.X);
        st.shot = { t: 0, res, X: st.X, m0: muzzle(st.alpha) };
        // fotosel: 16 mm'lik bilyenin perdeleme süresinden (0,1 ms çözünürlük)
        const tb = Math.round((0.016 / v0) * 1e4) / 1e4;
        st.last = 0.016 / tb;
        api.status("");
      }
      const setupBox = C.group(t("viewSetup"), aSl.el, pSeg.el, xLbl,
        C.buttons([{ label: t("prev"), onClick: () => moveX(-5) }, { label: t("next"), onClick: () => moveX(5) }]),
        C.buttons([{ label: t("fire"), primary: true, onClick: fire }, { label: t("newPaper"), onClick: () => { ex.marks = []; api.persist(); } }]),
        C.buttons([{ label: t("muzzle") + " → " + api.tg("labRecord"), onClick: () => { if (st.last) api.record("v", Math.round(st.last * 100) / 100, { key: "v", raw: st.last.toFixed(2) }); } }]));
      const paperBox = C.group(t("viewPaper"), C.note(t("paperNote"), "small"),
        C.buttons([{ label: "◀ 5 cm", onClick: () => { st.ruler = QBL.clamp(st.ruler - 5, 0, 96); save(); } }, { label: "◀ 1 mm", onClick: () => { st.ruler = QBL.clamp(st.ruler - 0.1, 0, 96); save(); } }, { label: "1 mm ▶", onClick: () => { st.ruler = QBL.clamp(st.ruler + 0.1, 0, 96); save(); } }, { label: "5 cm ▶", onClick: () => { st.ruler = QBL.clamp(st.ruler + 5, 0, 96); save(); } }]));
      const viewSeg = C.segment({
        label: t("view"), value: st.view,
        options: [{ value: "setup", label: t("viewSetup") }, { value: "paper", label: t("viewPaper") }],
        onChange(v) { st.view = v; save(); stage.setWorld(v === "paper" ? WP : WS); setupBox.hidden = v === "paper"; paperBox.hidden = v !== "paper"; },
      });
      api.panel.append(C.group("", viewSeg.el), setupBox, paperBox);
      setupBox.hidden = st.view === "paper";
      paperBox.hidden = st.view !== "paper";
      // kayıt tablosuna tek değerli "v" sütunu: her atışta yeni satır
      const vt = api.table("v");
      vt.record = function (value, o) { this.addRow({ v: value }, { v: o.raw }); return { ok: true }; };
      return { onClear() { ex.marks = []; api.persist(); } };
    },

    selfTest() {
      const v0 = 3.0, alpha = 40;
      const xs = [], ys = [];
      for (let X = 5; X <= 85; X += 5) { const r = flight(v0, alpha, X); if (r.hit) { xs.push(X); ys.push(r.y); } }
      const f = QBL.fitQuad(xs, ys);
      const a = Math.atan(f.c[1]);
      const v = Math.sqrt(-gC / (2 * f.c[2] * Math.cos(a) ** 2)) / 100;
      return [
        { name: "α (eğriden)", value: (a * 180) / Math.PI, expected: alpha, tol: 0.03 },
        { name: "υ₀ (eğriden)", value: v, expected: v0, tol: 0.03 },
      ];
    },
  };
  QBL.register(def);
})();
