// FİZİK · Yazılı sınav soruları (MEB "Yazılıya Hazırlanıyorum" biçiminde)
// Her soru: bağlam metni + 1.1, 1.2 … maddeler; öğrenme çıktısı ve beceri; çözüm ve
// TAM / KISMİ / SIFIR PUAN ölçütleri. Sorular bu proje için özgün olarak yazılmıştır. g = 10 m/s².
(function () {
  "use strict";
  const T = (tr, en, de) => ({ tr, en, de });

  // --- 10.1.1 Sabit hızlı hareket: yetişme -----------------------------------------
  QB.add({
    id: "yazili-hareket-yetisme",
    subject: "fizik", topic: "hareket", grade: 10, level: 2,
    outcome: "FİZ.10.1.1",
    vars: {
      d: { values: [60, 80, 90, 120, 150] },
      vA: { values: [15, 16, 18, 20, 24] },
      vB: { values: [6, 8, 9, 10, 12] },
      t: "d / (vA - vB)",
    },
    where: ["vA > vB", "d % (vA - vB) == 0", "t <= 20"],
    text: T(
      "Düz ve yatay bir yolda aynı yönde sabit hızlarla giden bir otobüs ile bir kamyon arasında t = 0 anında {d} m mesafe vardır. Arkadaki otobüsün hızı {vA} m/s, öndeki kamyonun hızı {vB} m/s'dir. Buna göre aşağıdaki soruları cevaplayınız.",
      "A bus and a lorry travel in the same direction at constant speeds on a straight, level road. At t = 0 they are {d} m apart. The bus behind moves at {vA} m/s and the lorry in front at {vB} m/s. Answer the following questions.",
      "Ein Bus und ein Lkw fahren auf einer geraden, ebenen Straße mit konstanten Geschwindigkeiten in dieselbe Richtung. Bei t = 0 sind sie {d} m voneinander entfernt. Der hintere Bus fährt mit {vA} m/s, der vordere Lkw mit {vB} m/s. Beantworte die folgenden Fragen.",
    ),
    parts: [
      {
        kind: "number", points: 4, unit: "s", answer: "t",
        text: T("Otobüs kamyona kaç saniye sonra yetişir?", "After how many seconds does the bus catch up with the lorry?", "Nach wie vielen Sekunden holt der Bus den Lkw ein?"),
        partial: [{ points: 2, text: T("Otobüsün kamyona göre bağıl hızını ({=vA-vB} m/s) doğru bulur.", "Finds the speed of the bus relative to the lorry ({=vA-vB} m/s).", "Bestimmt die Relativgeschwindigkeit des Busses zum Lkw ({=vA-vB} m/s).") }],
        solution: T("Bağıl hız {vA} − {vB} = {=vA-vB} m/s; t = {d} / {=vA-vB} = {t} s.", "Relative speed {vA} − {vB} = {=vA-vB} m/s; t = {d} / {=vA-vB} = {t} s.", "Relativgeschwindigkeit {vA} − {vB} = {=vA-vB} m/s; t = {d} / {=vA-vB} = {t} s."),
      },
      {
        kind: "number", points: 3, unit: "m", answer: "vA * t",
        text: T("Otobüs, kamyona yetişene kadar kaç metre yol alır?", "How far does the bus travel until it catches up?", "Welche Strecke legt der Bus bis zum Einholen zurück?"),
        solution: T("x = {vA} · {t} = {=vA*t} m", "x = {vA} · {t} = {=vA*t} m", "x = {vA} · {t} = {=vA*t} m"),
      },
      {
        kind: "number", points: 3, unit: "m", answer: "vB * t",
        text: T("Aynı sürede kamyon kaç metre yol alır?", "How far does the lorry travel in the same time?", "Welche Strecke legt der Lkw in derselben Zeit zurück?"),
        solution: T("x = {vB} · {t} = {=vB*t} m (ya da {=vA*t} − {d})", "x = {vB} · {t} = {=vB*t} m (or {=vA*t} − {d})", "x = {vB} · {t} = {=vB*t} m (oder {=vA*t} − {d})"),
      },
      {
        kind: "text",
        text: T("Otobüs kamyona yetişene kadar geçen süre için iki aracın konum–zaman grafiklerini (otobüsün t = 0 anındaki konumu başlangıç noktası olmak üzere) nasıl çizersiniz? Grafiklerin biçimini, eğimlerini ve kesişme noktasını açıklayınız.",
          "How would you draw the position–time graphs of both vehicles until the bus catches up (taking the bus's position at t = 0 as the origin)? Describe the shape and slopes of the graphs and their point of intersection.",
          "Wie würdest du die Ort-Zeit-Diagramme beider Fahrzeuge bis zum Einholen zeichnen (Ort des Busses bei t = 0 als Nullpunkt)? Beschreibe Form, Steigungen und Schnittpunkt der Graphen."),
        model: T("İki grafik de eğik doğrudur, çünkü hızlar sabittir. Otobüsün doğrusu 0 m'den, kamyonunki {d} m'den başlar. Doğruların eğimleri hızlara eşittir: otobüsünki {vA} m/s, kamyonunki {vB} m/s; otobüsün doğrusu daha diktir. Doğrular t = {t} s anında {=vA*t} m konumunda kesişir; bu nokta yetişme anını ve yerini gösterir.",
          "Both graphs are straight sloping lines because the speeds are constant. The bus's line starts at 0 m, the lorry's at {d} m. The slopes equal the speeds: {vA} m/s for the bus and {vB} m/s for the lorry, so the bus's line is steeper. The lines meet at t = {t} s at {=vA*t} m; this point shows when and where the bus catches up.",
          "Beide Graphen sind Geraden, weil die Geschwindigkeiten konstant sind. Die Gerade des Busses beginnt bei 0 m, die des Lkw bei {d} m. Die Steigungen sind die Geschwindigkeiten: {vA} m/s für den Bus, {vB} m/s für den Lkw; die Gerade des Busses ist steiler. Die Geraden schneiden sich bei t = {t} s im Ort {=vA*t} m; dort holt der Bus den Lkw ein."),
        rubric: [
          { points: 2, text: T("Grafiklerin doğrusal olduğunu (sabit hız) belirtir.", "States that the graphs are straight lines (constant speed).", "Gibt an, dass die Graphen Geraden sind (konstante Geschwindigkeit).") },
          { points: 2, text: T("Başlangıç konumlarını 0 m ve {d} m olarak doğru verir.", "Gives the starting positions 0 m and {d} m correctly.", "Gibt die Anfangsorte 0 m und {d} m richtig an.") },
          { points: 2, text: T("Eğimlerin hızlara eşit olduğunu ve otobüsün grafiğinin daha dik olduğunu belirtir.", "States that the slopes equal the speeds and that the bus's graph is steeper.", "Gibt an, dass die Steigungen den Geschwindigkeiten entsprechen und der Graph des Busses steiler ist.") },
          { points: 2, text: T("Kesişme noktasının yetişme anını ({t} s) ve konumunu ({=vA*t} m) gösterdiğini açıklar.", "Explains that the intersection gives the time ({t} s) and place ({=vA*t} m) of catching up.", "Erklärt, dass der Schnittpunkt Zeit ({t} s) und Ort ({=vA*t} m) des Einholens angibt.") },
        ],
      },
    ],
  });

  // --- 10.1.2 İvme ve hız değişimi: hız göstergesi tablosu ----------------------------
  QB.add({
    id: "yazili-hareket-ivme-tablo",
    subject: "fizik", topic: "hareket", grade: 10, level: 2,
    outcome: "FİZ.10.1.2",
    vars: {
      v0: { values: [2, 4, 5, 6, 8] },
      a: { values: [1.5, 2, 2.5, 3] },
      dt: { values: [2] },
    },
    text: T(
      "Bir sürücü, düz bir yolda hızlanırken aracın hız göstergesini her 2 saniyede bir okuyup tabloya yazıyor. Buna göre aşağıdaki soruları cevaplayınız.",
      "A driver speeding up on a straight road reads the speedometer every 2 seconds and records the readings in the table. Answer the following questions.",
      "Eine Fahrerin beschleunigt auf einer geraden Straße und liest alle 2 Sekunden den Tacho ab. Beantworte die folgenden Fragen.",
    ),
    figure: (v, f) => {
      const s = f.svg(400, 82);
      s.add(f.table(10, 8, [120, 65, 65, 65, 65], 32, [
        [f.t({ tr: "Zaman (s)", en: "Time (s)", de: "Zeit (s)" }), "0", "2", "4", "6"],
        [f.t({ tr: "Hız (m/s)", en: "Speed (m/s)", de: "Geschw. (m/s)" }), f.n(v.v0), f.n(v.v0 + 2 * v.a), f.n(v.v0 + 4 * v.a), f.n(v.v0 + 6 * v.a)],
      ]));
      return s;
    },
    parts: [
      {
        kind: "number", points: 4, unit: "m/s²", answer: "a", decimals: 1,
        text: T("Aracın ivmesi kaç m/s²'dir?", "What is the car's acceleration in m/s²?", "Wie groß ist die Beschleunigung in m/s²?"),
        partial: [{ points: 2, text: T("Her 2 s'deki hız değişimini ({=2*a} m/s) doğru bulur.", "Finds the change of speed in each 2 s ({=2*a} m/s).", "Bestimmt die Geschwindigkeitsänderung je 2 s ({=2*a} m/s).") }],
        solution: T("a = Δv / Δt = {=2*a} / 2 = {a} m/s²", "a = Δv / Δt = {=2*a} / 2 = {a} m/s²", "a = Δv / Δt = {=2*a} / 2 = {a} m/s²"),
      },
      {
        kind: "select", points: 3,
        text: T("Aracın ivmesi bu 6 saniye boyunca nasıldır?", "How does the acceleration behave during these 6 seconds?", "Wie verhält sich die Beschleunigung in diesen 6 Sekunden?"),
        options: [T("Sabittir", "Constant", "Konstant"), T("Artmaktadır", "Increasing", "Zunehmend"), T("Azalmaktadır", "Decreasing", "Abnehmend")],
        answer: "1",
        solution: T("Eşit zaman aralıklarında hız eşit miktarda ({=2*a} m/s) arttığı için ivme sabittir.", "The speed increases by the same amount ({=2*a} m/s) in equal time intervals, so the acceleration is constant.", "Die Geschwindigkeit nimmt in gleichen Zeitabschnitten um denselben Betrag ({=2*a} m/s) zu; die Beschleunigung ist konstant."),
      },
      {
        kind: "number", points: 4, unit: "m/s", answer: "v0 + 10 * a",
        text: T("Araç aynı ivmeyle hızlanmaya devam ederse t = 10 s anında hızı kaç m/s olur?", "If the car keeps the same acceleration, what is its speed at t = 10 s?", "Welche Geschwindigkeit hat das Auto bei t = 10 s, wenn es gleichmäßig weiter beschleunigt?"),
        partial: [{ points: 2, text: T("v = v₀ + a·t bağıntısını doğru yazar.", "Writes v = v₀ + a·t correctly.", "Schreibt v = v₀ + a·t richtig auf.") }],
        solution: T("v = {v0} + {a} · 10 = {=v0+10*a} m/s", "v = {v0} + {a} · 10 = {=v0+10*a} m/s", "v = {v0} + {a} · 10 = {=v0+10*a} m/s"),
      },
      {
        kind: "text",
        text: T("İvme kavramını bu tablodaki verileri kullanarak kendi cümlelerinizle açıklayınız.", "Explain the concept of acceleration in your own words using the data in this table.", "Erkläre den Begriff Beschleunigung mit eigenen Worten anhand der Tabellenwerte."),
        model: T("İvme, hızın birim zamandaki değişimidir. Bu araçta hız her 2 saniyede {=2*a} m/s, yani her saniyede {a} m/s artmaktadır; bu yüzden ivme {a} m/s²'dir. Hız eşit zamanlarda eşit miktar arttığı için ivme sabittir.",
          "Acceleration is the change of velocity per unit time. Here the speed increases by {=2*a} m/s every 2 seconds, i.e. by {a} m/s every second, so the acceleration is {a} m/s². Because the speed grows by equal amounts in equal times, the acceleration is constant.",
          "Beschleunigung ist die Änderung der Geschwindigkeit pro Zeiteinheit. Hier steigt die Geschwindigkeit alle 2 Sekunden um {=2*a} m/s, also pro Sekunde um {a} m/s; die Beschleunigung beträgt {a} m/s². Da sie in gleichen Zeiten gleich stark zunimmt, ist die Beschleunigung konstant."),
        rubric: [
          { points: 2, text: T("İvmeyi hızın birim zamandaki değişimi olarak tanımlar.", "Defines acceleration as the change of velocity per unit time.", "Definiert Beschleunigung als Geschwindigkeitsänderung pro Zeit.") },
          { points: 2, text: T("Tablodan saniyedeki hız artışını ({a} m/s) gösterir.", "Shows from the table the increase of speed per second ({a} m/s).", "Zeigt mit der Tabelle die Zunahme pro Sekunde ({a} m/s).") },
          { points: 1, text: T("Eşit zamanda eşit hız değişimini sabit ivmeyle ilişkilendirir.", "Links equal changes in equal times to constant acceleration.", "Verknüpft gleiche Änderungen in gleichen Zeiten mit konstanter Beschleunigung.") },
        ],
      },
    ],
  });

  // --- 10.1.3 Hareket grafiğinden matematiksel model ---------------------------------
  QB.add({
    id: "yazili-hareket-grafik-model",
    subject: "fizik", topic: "hareket", grade: 10, level: 3,
    outcome: "FİZ.10.1.3",
    vars: {
      v1: { values: [10, 12, 15, 20] },
      t1: { values: [4, 5] },
      t2: { values: [10, 12] },
      ad: { type: "name" },
    },
    text: T(
      "{ad}, bir bisiklet yarışında durgun hâlden başlayarak düz bir yolda ilk {t1} s boyunca düzgün hızlanıyor ve {v1} m/s hıza ulaşıyor; ardından t = {t2} s anına kadar bu hızla gidiyor. Aşağıdaki tabloda bisikletin hızı verilmiştir. Buna göre aşağıdaki soruları cevaplayınız.",
      "In a cycle race, {ad} starts from rest on a straight road, speeds up uniformly for the first {t1} s to {v1} m/s and then rides at this speed until t = {t2} s. The table gives the bicycle's speed. Answer the following questions.",
      "Bei einem Radrennen startet {ad} aus der Ruhe auf gerader Strecke, beschleunigt in den ersten {t1} s gleichmäßig auf {v1} m/s und fährt dann bis t = {t2} s mit dieser Geschwindigkeit. Die Tabelle zeigt die Geschwindigkeit. Beantworte die folgenden Fragen.",
    ),
    figure: (v, f) => {
      const s = f.svg(330, 82);
      s.add(f.table(10, 8, [120, 65, 65, 65], 32, [
        [f.t({ tr: "Zaman (s)", en: "Time (s)", de: "Zeit (s)" }), "0", f.n(v.t1), f.n(v.t2)],
        [f.t({ tr: "Hız (m/s)", en: "Speed (m/s)", de: "Geschw. (m/s)" }), "0", f.n(v.v1), f.n(v.v1)],
      ]));
      return s;
    },
    parts: [
      {
        kind: "number", points: 3, unit: "m/s²", answer: "v1 / t1", decimals: 2,
        text: T("İlk {t1} saniyedeki ivme kaç m/s²'dir?", "What is the acceleration during the first {t1} s?", "Wie groß ist die Beschleunigung in den ersten {t1} s?"),
        solution: T("a = {v1} / {t1} = {=v1/t1:2} m/s²", "a = {v1} / {t1} = {=v1/t1:2} m/s²", "a = {v1} / {t1} = {=v1/t1:2} m/s²"),
      },
      {
        kind: "number", points: 4, unit: "m", answer: "v1 * t1 / 2",
        text: T("İlk {t1} saniyede alınan yol kaç metredir?", "How far does the bicycle travel in the first {t1} s?", "Welche Strecke wird in den ersten {t1} s zurückgelegt?"),
        partial: [{ points: 2, text: T("Yolun hız–zaman grafiğinin altındaki alan (üçgen) olduğunu kullanır.", "Uses the area under the speed–time graph (a triangle).", "Nutzt die Fläche unter dem Geschwindigkeit-Zeit-Graphen (Dreieck).") }],
        solution: T("x = ½ · {v1} · {t1} = {=v1*t1/2} m", "x = ½ · {v1} · {t1} = {=v1*t1/2} m", "x = ½ · {v1} · {t1} = {=v1*t1/2} m"),
      },
      {
        kind: "number", points: 4, unit: "m", answer: "v1 * t1 / 2 + v1 * (t2 - t1)",
        text: T("0–{t2} s aralığında toplam yer değiştirme kaç metredir?", "What is the total displacement between 0 and {t2} s?", "Wie groß ist die gesamte Verschiebung zwischen 0 und {t2} s?"),
        solution: T("x = {=v1*t1/2} + {v1} · ({t2} − {t1}) = {=v1*t1/2+v1*(t2-t1)} m", "x = {=v1*t1/2} + {v1} · ({t2} − {t1}) = {=v1*t1/2+v1*(t2-t1)} m", "x = {=v1*t1/2} + {v1} · ({t2} − {t1}) = {=v1*t1/2+v1*(t2-t1)} m"),
      },
      {
        kind: "text",
        text: T("Hızlanma bölümü için konum–zaman grafiği nasıl bir eğridir? Bu grafikten elde edilen matematiksel modeli yazarak yorumlayınız.", "What kind of curve is the position–time graph during the speeding-up phase? Write the mathematical model obtained from it and interpret it.", "Welche Form hat das Ort-Zeit-Diagramm in der Beschleunigungsphase? Gib das mathematische Modell an und deute es."),
        model: T("Hızlanma bölümünde konum–zaman grafiği yukarı doğru eğilen bir parabol koludur; eğimi (hız) giderek artar. Model x = ½·a·t² = ½·{=v1/t1:2}·t² biçimindedir: yer değiştirme zamanın karesiyle orantılıdır. Sabit hız bölümünde grafik, eğimi {v1} m/s olan bir doğruya dönüşür.",
          "During speeding up the position–time graph is an upward-curving branch of a parabola; its slope (the speed) keeps increasing. The model is x = ½·a·t² = ½·{=v1/t1:2}·t²: displacement is proportional to the square of time. In the constant-speed phase the graph becomes a straight line of slope {v1} m/s.",
          "In der Beschleunigungsphase ist das Ort-Zeit-Diagramm ein nach oben gekrümmter Parabelast; seine Steigung (die Geschwindigkeit) wächst. Das Modell lautet x = ½·a·t² = ½·{=v1/t1:2}·t²: Die Verschiebung ist proportional zum Quadrat der Zeit. In der Phase konstanter Geschwindigkeit wird der Graph zu einer Geraden mit Steigung {v1} m/s."),
        rubric: [
          { points: 2, text: T("Grafiğin parabol (eğimi artan eğri) olduğunu belirtir.", "States that the graph is a parabola (a curve with increasing slope).", "Gibt an, dass der Graph eine Parabel ist (Kurve mit zunehmender Steigung).") },
          { points: 2, text: T("x = ½·a·t² modelini yazar.", "Writes the model x = ½·a·t².", "Gibt das Modell x = ½·a·t² an.") },
          { points: 1, text: T("Sabit hız bölümünde grafiğin doğruya dönüştüğünü belirtir.", "States that the graph becomes a straight line in the constant-speed phase.", "Gibt an, dass der Graph in der Phase konstanter Geschwindigkeit eine Gerade wird.") },
        ],
      },
    ],
  });

  // --- 10.4.1 / 10.4.3 Dalgalar: ipteki dalga üreteci ---------------------------------
  QB.add({
    id: "yazili-dalga-ip",
    subject: "fizik", topic: "dalga", grade: 10, level: 2,
    outcome: "FİZ.10.4.4",
    vars: {
      f: { values: [2, 4, 5, 8] },
      L: { values: [3, 4, 6, 8] },
      tt: { values: [0.5, 1, 2] },
      v: "L / tt",
    },
    where: ["v >= 3", "v <= 12"],
    text: T(
      "Bir fizik kulübünde gergin bir ipin ucu, saniyede {f} titreşim yapan bir dalga üretecine bağlanmıştır. Öğrenciler, ip üzerindeki bir dalga tepesinin {L} m'yi {tt} s'de aldığını ölçüyor. Buna göre aşağıdaki soruları cevaplayınız.",
      "In a physics club one end of a taut rope is attached to a wave generator vibrating {f} times per second. The students measure that a crest on the rope travels {L} m in {tt} s. Answer the following questions.",
      "In einer Physik-AG ist ein Ende eines gespannten Seils an einen Wellenerzeuger angeschlossen, der {f}-mal pro Sekunde schwingt. Die Schüler messen, dass ein Wellenberg {L} m in {tt} s zurücklegt. Beantworte die folgenden Fragen.",
    ),
    parts: [
      {
        kind: "number", points: 3, unit: "m/s", answer: "v", decimals: 1,
        text: T("Dalganın yayılma sürati kaç m/s'dir?", "What is the speed of the wave in m/s?", "Wie groß ist die Ausbreitungsgeschwindigkeit in m/s?"),
        solution: T("υ = {L} / {tt} = {=v:1} m/s", "υ = {L} / {tt} = {=v:1} m/s", "υ = {L} / {tt} = {=v:1} m/s"),
      },
      {
        kind: "number", points: 4, unit: "m", answer: "v / f", decimals: 2,
        text: T("Dalganın dalga boyu kaç metredir?", "What is the wavelength in metres?", "Wie groß ist die Wellenlänge in Metern?"),
        partial: [{ points: 2, text: T("υ = λ·f bağıntısını doğru yazar.", "Writes υ = λ·f correctly.", "Schreibt υ = λ·f richtig auf.") }],
        solution: T("λ = υ / f = {=v:1} / {f} = {=v/f:2} m", "λ = υ / f = {=v:1} / {f} = {=v/f:2} m", "λ = υ / f = {=v:1} / {f} = {=v/f:2} m"),
      },
      {
        kind: "select", points: 3,
        text: T("İpin gerginliği değiştirilmeden üretecin frekansı iki katına çıkarılırsa dalganın yayılma sürati nasıl değişir?", "If the frequency of the generator is doubled without changing the tension of the rope, how does the wave speed change?", "Wie ändert sich die Ausbreitungsgeschwindigkeit, wenn die Frequenz verdoppelt wird und die Seilspannung gleich bleibt?"),
        change: { before: "v", after: "v" },
        solution: T("Yayılma sürati yalnızca ortama (ipin gerginliği ve birim uzunluğunun kütlesi) bağlıdır; değişmez.", "The wave speed depends only on the medium (tension and mass per unit length of the rope); it stays the same.", "Die Ausbreitungsgeschwindigkeit hängt nur vom Medium ab (Spannung und Masse pro Länge); sie bleibt gleich."),
      },
      {
        kind: "text",
        text: T("Frekans iki katına çıkarıldığında dalga boyuna ne olur? Gözlemlerinize dayanarak tahmin edip gerekçelendiriniz.", "What happens to the wavelength when the frequency is doubled? Predict and justify based on your observations.", "Was passiert mit der Wellenlänge, wenn die Frequenz verdoppelt wird? Sage es voraus und begründe."),
        model: T("Yayılma sürati değişmediğinden ve υ = λ·f olduğundan, frekans iki katına çıkınca dalga boyu yarıya iner: {=v/f:2} m'den {=v/(2*f):2} m'ye düşer. İp üzerinde aynı uzunlukta iki kat fazla dalga görülür.",
          "As the speed does not change and υ = λ·f, doubling the frequency halves the wavelength: from {=v/f:2} m to {=v/(2*f):2} m. Twice as many waves fit on the same length of rope.",
          "Da die Geschwindigkeit gleich bleibt und υ = λ·f gilt, halbiert sich die Wellenlänge: von {=v/f:2} m auf {=v/(2*f):2} m. Auf derselben Seillänge sind doppelt so viele Wellen zu sehen."),
        rubric: [
          { points: 2, text: T("Dalga boyunun yarıya ineceğini belirtir.", "States that the wavelength is halved.", "Gibt an, dass sich die Wellenlänge halbiert.") },
          { points: 2, text: T("Yayılma süratinin sabit kaldığını ve υ = λ·f bağıntısını gerekçe olarak kullanır.", "Uses the constant wave speed and υ = λ·f as the reason.", "Begründet mit der gleichbleibenden Geschwindigkeit und υ = λ·f.") },
          { points: 1, text: T("Yeni dalga boyunu ({=v/(2*f):2} m) hesaplar.", "Calculates the new wavelength ({=v/(2*f):2} m).", "Berechnet die neue Wellenlänge ({=v/(2*f):2} m).") },
        ],
      },
    ],
  });

  // --- 10.4.4 Periyodik hareket: sarkaç deneyi ---------------------------------------
  QB.add({
    id: "yazili-periyodik-sarkac",
    subject: "fizik", topic: "dalga", grade: 10, level: 2,
    outcome: "FİZ.10.4.1",
    vars: {
      ad: { type: "name" },
      n: { values: [10, 20] },
      T0: { values: [0.8, 1, 1.2, 1.4] },
    },
    text: T(
      "{ad}, laboratuvarda ipe bağlı bir küreyi küçük bir açıyla saptırıp serbest bırakıyor ve kronometreyle {n} tam salınımın süresini {=n*T0:1} s olarak ölçüyor. Buna göre aşağıdaki soruları cevaplayınız.",
      "In the lab, {ad} pulls a ball hanging on a string aside through a small angle, releases it and times {n} full swings with a stopwatch: {=n*T0:1} s. Answer the following questions.",
      "Im Labor lenkt {ad} eine an einem Faden hängende Kugel um einen kleinen Winkel aus, lässt sie los und misst mit der Stoppuhr die Dauer von {n} vollen Schwingungen: {=n*T0:1} s. Beantworte die folgenden Fragen.",
    ),
    parts: [
      {
        kind: "number", points: 3, unit: "s", answer: "T0", decimals: 2,
        text: T("Sarkacın periyodu kaç saniyedir?", "What is the period of the pendulum?", "Wie groß ist die Schwingungsdauer des Pendels?"),
        solution: T("T = {=n*T0:1} / {n} = {T0} s", "T = {=n*T0:1} / {n} = {T0} s", "T = {=n*T0:1} / {n} = {T0} s"),
      },
      {
        kind: "number", points: 3, unit: "Hz", answer: "1 / T0", decimals: 2,
        text: T("Sarkacın frekansı kaç Hz'dir?", "What is the frequency of the pendulum?", "Wie groß ist die Frequenz des Pendels?"),
        solution: T("f = 1 / T = 1 / {T0} = {=1/T0:2} Hz", "f = 1 / T = 1 / {T0} = {=1/T0:2} Hz", "f = 1 / T = 1 / {T0} = {=1/T0:2} Hz"),
      },
      {
        kind: "select", points: 3,
        text: T("İpin boyu dört katına çıkarılırsa periyot nasıl değişir?", "How does the period change if the string is made four times as long?", "Wie ändert sich die Periode, wenn der Faden viermal so lang wird?"),
        change: { before: "T0", after: "2 * T0" },
        solution: T("T = 2π√(L/g) olduğundan periyot iki katına ({=2*T0:1} s) çıkar.", "Since T = 2π√(L/g), the period doubles (to {=2*T0:1} s).", "Wegen T = 2π√(L/g) verdoppelt sich die Periode (auf {=2*T0:1} s)."),
      },
      {
        kind: "text",
        text: T("{ad} neden tek bir salınım yerine {n} salınımın süresini ölçmüştür? Ölçümün güvenilirliğini artırmak için başka neler yapılabileceğini deneyiminize dayanarak açıklayınız.", "Why did {ad} time {n} swings instead of one? From your own experience, explain what else could be done to make the measurement more reliable.", "Warum hat {ad} die Dauer von {n} Schwingungen statt einer gemessen? Erkläre aus deiner Erfahrung, wie die Messung noch zuverlässiger werden kann."),
        model: T("Kronometreyi başlatıp durdururken yapılan tepki hatası (yaklaşık 0,1–0,2 s) her ölçümde aynıdır; {n} salınımın süresi ölçülüp {n}'e bölündüğünde bu hatanın bir periyoda düşen payı {n} kat azalır. Ayrıca ölçüm birkaç kez tekrarlanıp ortalaması alınabilir, sarkaç denge konumundan geçerken sayılabilir ve açı küçük tutulabilir.",
          "The reaction error in starting and stopping the stopwatch (about 0.1–0.2 s) is the same in each measurement; timing {n} swings and dividing by {n} makes its share per period {n} times smaller. The measurement can also be repeated and averaged, counted as the bob passes the lowest point, and the angle kept small.",
          "Der Reaktionsfehler beim Starten und Stoppen (etwa 0,1–0,2 s) ist bei jeder Messung gleich; misst man {n} Schwingungen und teilt durch {n}, wird sein Anteil an einer Periode {n}-mal kleiner. Außerdem kann man mehrmals messen und mitteln, beim Durchgang durch die Ruhelage zählen und den Winkel klein halten."),
        rubric: [
          { points: 2, text: T("Tepki süresi hatasının çok salınım ölçülünce bir periyoda düşen payının azaldığını açıklar.", "Explains that timing many swings reduces the reaction-time error per period.", "Erklärt, dass sich der Reaktionszeitfehler pro Periode bei vielen Schwingungen verringert.") },
          { points: 2, text: T("Ölçümü tekrarlayıp ortalama almayı önerir.", "Suggests repeating the measurement and averaging.", "Schlägt vor, mehrmals zu messen und zu mitteln.") },
          { points: 1, text: T("Denge konumundan geçişte saymak ya da küçük açı kullanmak gibi bir öneri daha verir.", "Gives a further suggestion such as counting at the lowest point or using a small angle.", "Nennt einen weiteren Vorschlag, z. B. beim Durchgang durch die Ruhelage zählen oder kleine Winkel.") },
        ],
      },
    ],
  });

  // --- 11.1.2 Serbest düşme: kanıt kullanma -------------------------------------------
  QB.add({
    id: "yazili-serbest-dusme-kanit",
    subject: "fizik", topic: "hareket", grade: 11, level: 2,
    outcome: "FİZ.11.1.2",
    vars: {
      k: { values: [1, 2] },
      t1: "0.2 * k", t2: "0.3 * k", t3: "0.4 * k", t4: "0.5 * k",
    },
    text: T(
      "Bir deney düzeneğinde elektromıknatısla tutulan demir bilye, akım kesilince serbest düşmeye başlıyor ve aynı anda dijital sayaç çalışıyor. Bilye, cetvelle ayarlanan h yüksekliğindeki ışık kapısından geçince sayaç duruyor. Farklı yükseklikler için ölçülen süreler tabloda verilmiştir (hava direnci önemsizdir). Buna göre aşağıdaki soruları cevaplayınız.",
      "In an experiment an iron ball held by an electromagnet starts to fall when the current is cut, and a digital counter starts at the same moment. The counter stops when the ball passes a light gate at height h set with a ruler. The table gives the times measured for different heights (air resistance is negligible). Answer the following questions.",
      "In einem Versuch fällt eine Eisenkugel los, sobald der Strom des Haltemagneten abgeschaltet wird; gleichzeitig startet ein Digitalzähler. Er stoppt, wenn die Kugel die Lichtschranke in der Höhe h passiert. Die Tabelle zeigt die gemessenen Zeiten (Luftwiderstand vernachlässigbar). Beantworte die folgenden Fragen.",
    ),
    figure: (v, f) => {
      const s = f.svg(400, 82);
      const h = (t) => f.n(Math.round(5 * t * t * 1000) / 1000, 3);
      s.add(f.table(10, 8, [120, 65, 65, 65, 65], 32, [
        ["h (m)", h(v.t1), h(v.t2), h(v.t3), h(v.t4)],
        ["t (s)", f.n(v.t1, 1), f.n(v.t2, 1), f.n(v.t3, 1), f.n(v.t4, 1)],
      ]));
      return s;
    },
    parts: [
      {
        kind: "number", points: 4, unit: "m/s²", answer: "2 * 5 * t1 * t1 / (t1 * t1)",
        text: T("Tablodaki ilk ölçümü kullanarak yer çekimi ivmesini hesaplayınız (m/s²).", "Calculate the gravitational acceleration from the first measurement in the table (m/s²).", "Berechne die Fallbeschleunigung aus der ersten Messung der Tabelle (m/s²)."),
        partial: [{ points: 2, text: T("h = ½·g·t² bağıntısını doğru yazar.", "Writes h = ½·g·t² correctly.", "Schreibt h = ½·g·t² richtig auf.") }],
        solution: T("g = 2h / t² = 2 · {=5*t1*t1:3} / {=t1*t1:2} = 10 m/s²", "g = 2h / t² = 2 · {=5*t1*t1:3} / {=t1*t1:2} = 10 m/s²", "g = 2h / t² = 2 · {=5*t1*t1:3} / {=t1*t1:2} = 10 m/s²"),
      },
      {
        kind: "number", points: 3, unit: "m/s", answer: "10 * t4",
        text: T("Bilyenin son ölçümde ışık kapısından geçerken hızı kaç m/s'dir?", "What is the ball's speed when it passes the light gate in the last measurement?", "Wie schnell ist die Kugel bei der letzten Messung an der Lichtschranke?"),
        solution: T("υ = g·t = 10 · {=t4:1} = {=10*t4} m/s", "υ = g·t = 10 · {=t4:1} = {=10*t4} m/s", "υ = g·t = 10 · {=t4:1} = {=10*t4} m/s"),
      },
      {
        kind: "text",
        text: T("Tablodaki verileri kanıt olarak kullanarak serbest düşmenin sabit ivmeli bir hareket olduğunu gösteriniz.", "Using the data in the table as evidence, show that free fall is motion with constant acceleration.", "Zeige mit den Tabellenwerten als Beleg, dass der freie Fall eine gleichmäßig beschleunigte Bewegung ist."),
        model: T("Sabit ivmeli harekette h = ½·g·t² olduğundan h / t² oranı sabit olmalıdır. Tablodaki her ölçüm için h / t² = 5 m/s² bulunur (ör. {=5*t1*t1:3} / {=t1*t1:2} = 5, {=5*t4*t4:3} / {=t4*t4:2} = 5). Oran değişmediği için ivme sabittir ve g = 2 · 5 = 10 m/s²'dir.",
          "For constant acceleration h = ½·g·t², so the ratio h / t² must be constant. Every measurement in the table gives h / t² = 5 m/s² (e.g. {=5*t1*t1:3} / {=t1*t1:2} = 5, {=5*t4*t4:3} / {=t4*t4:2} = 5). As the ratio does not change, the acceleration is constant and g = 2 · 5 = 10 m/s².",
          "Bei konstanter Beschleunigung gilt h = ½·g·t², also muss h / t² konstant sein. Jede Messung ergibt h / t² = 5 m/s² (z. B. {=5*t1*t1:3} / {=t1*t1:2} = 5, {=5*t4*t4:3} / {=t4*t4:2} = 5). Da das Verhältnis gleich bleibt, ist die Beschleunigung konstant und g = 2 · 5 = 10 m/s²."),
        rubric: [
          { points: 2, text: T("h = ½·g·t² bağıntısından h / t² oranının sabit olması gerektiğini belirtir.", "States from h = ½·g·t² that h / t² must be constant.", "Folgert aus h = ½·g·t², dass h / t² konstant sein muss.") },
          { points: 3, text: T("En az iki ölçüm için h / t² oranını hesaplayıp eşit olduğunu gösterir.", "Calculates h / t² for at least two measurements and shows they are equal.", "Berechnet h / t² für mindestens zwei Messungen und zeigt die Gleichheit.") },
          { points: 1, text: T("Sonucu sabit ivme (g = 10 m/s²) olarak yorumlar.", "Interprets the result as constant acceleration (g = 10 m/s²).", "Deutet das Ergebnis als konstante Beschleunigung (g = 10 m/s²).") },
        ],
      },
    ],
  });

  // --- 11.1.3 İki boyutta hareket: masadan yuvarlanan bilye ----------------------------
  QB.add({
    id: "yazili-yatay-atis-masa",
    subject: "fizik", topic: "hareket", grade: 11, level: 3,
    outcome: "FİZ.11.1.3",
    vars: {
      h: { values: [0.45, 0.8, 1.25] },
      v0: { values: [1, 1.5, 2, 3] },
      tf: "sqrt(2 * h / 10)",
    },
    text: T(
      "Yatay bir masanın üzerinde yuvarlanan bir bilye, {v0} m/s hızla masanın kenarından çıkıyor ve masa yüksekliği {h} m olan zemine düşüyor (hava direnci önemsizdir, g = 10 m/s²). Buna göre aşağıdaki soruları cevaplayınız.",
      "A ball rolling on a horizontal table leaves the edge at {v0} m/s and falls to the floor, {h} m below the table top (air resistance is negligible, g = 10 m/s²). Answer the following questions.",
      "Eine Kugel rollt auf einem waagerechten Tisch, verlässt die Kante mit {v0} m/s und fällt auf den {h} m tiefer liegenden Boden (Luftwiderstand vernachlässigbar, g = 10 m/s²). Beantworte die folgenden Fragen.",
    ),
    parts: [
      {
        kind: "number", points: 4, unit: "s", answer: "tf", decimals: 1,
        text: T("Bilye masanın kenarından çıktıktan kaç saniye sonra yere çarpar?", "How many seconds after leaving the edge does the ball hit the floor?", "Nach wie vielen Sekunden trifft die Kugel auf den Boden?"),
        partial: [{ points: 2, text: T("Düşey hareket için h = ½·g·t² bağıntısını kullanır.", "Uses h = ½·g·t² for the vertical motion.", "Nutzt h = ½·g·t² für die senkrechte Bewegung.") }],
        solution: T("{h} = ½ · 10 · t² → t = {=tf:1} s", "{h} = ½ · 10 · t² → t = {=tf:1} s", "{h} = ½ · 10 · t² → t = {=tf:1} s"),
      },
      {
        kind: "number", points: 4, unit: "m", answer: "v0 * tf", decimals: 2,
        text: T("Bilye masanın kenarından yatayda kaç metre uzağa düşer?", "How far from the edge of the table (horizontally) does the ball land?", "Wie weit von der Tischkante (waagerecht) landet die Kugel?"),
        solution: T("x = {v0} · {=tf:1} = {=v0*tf:2} m", "x = {v0} · {=tf:1} = {=v0*tf:2} m", "x = {v0} · {=tf:1} = {=v0*tf:2} m"),
      },
      {
        kind: "number", points: 3, unit: "m/s", answer: "10 * tf", decimals: 1,
        text: T("Bilye yere çarptığı anda hızının düşey bileşeni kaç m/s'dir?", "What is the vertical component of the ball's velocity when it hits the floor?", "Wie groß ist die senkrechte Geschwindigkeitskomponente beim Aufprall?"),
        solution: T("υy = g·t = 10 · {=tf:1} = {=10*tf:1} m/s", "υy = g·t = 10 · {=tf:1} = {=10*tf:1} m/s", "υy = g·t = 10 · {=tf:1} = {=10*tf:1} m/s"),
      },
      {
        kind: "text",
        text: T("Aynı masadan iki kat hızla çıkan bir bilyenin uçuş süresi ve yatay menzili nasıl değişir? Yatay ve düşey hareketlerin birbirinden bağımsız olduğunu kullanarak açıklayınız.", "How do the flight time and the horizontal range change for a ball leaving the same table at twice the speed? Explain using the independence of horizontal and vertical motion.", "Wie ändern sich Flugzeit und Wurfweite einer Kugel, die denselben Tisch mit doppelter Geschwindigkeit verlässt? Erkläre mit der Unabhängigkeit von waagerechter und senkrechter Bewegung."),
        model: T("Düşey hareket yatay hızdan bağımsızdır: iki bilye de durgun hâldeki gibi {h} m düşer, bu yüzden uçuş süresi değişmez ({=tf:1} s). Yatayda bilye sabit hızla gider; hız iki katına çıkınca aynı sürede iki kat yol alır, menzil {=2*v0*tf:2} m olur.",
          "The vertical motion does not depend on the horizontal speed: both balls fall {h} m as if starting from rest, so the flight time is the same ({=tf:1} s). Horizontally the ball moves at constant speed; at twice the speed it covers twice the distance in the same time, so the range becomes {=2*v0*tf:2} m.",
          "Die senkrechte Bewegung hängt nicht von der waagerechten Geschwindigkeit ab: Beide Kugeln fallen {h} m wie aus der Ruhe, die Flugzeit bleibt gleich ({=tf:1} s). Waagerecht bewegt sich die Kugel gleichförmig; bei doppelter Geschwindigkeit legt sie in derselben Zeit die doppelte Strecke zurück, die Wurfweite wird {=2*v0*tf:2} m."),
        rubric: [
          { points: 2, text: T("Uçuş süresinin değişmediğini düşey hareketin bağımsızlığıyla açıklar.", "Explains that the flight time is unchanged because the vertical motion is independent.", "Erklärt die gleiche Flugzeit mit der Unabhängigkeit der senkrechten Bewegung.") },
          { points: 2, text: T("Menzilin iki katına çıktığını yatayda sabit hızla gerekçelendirir.", "Justifies that the range doubles because the horizontal speed is constant.", "Begründet die doppelte Wurfweite mit der konstanten waagerechten Geschwindigkeit.") },
          { points: 1, text: T("Yeni menzili ({=2*v0*tf:2} m) hesaplar.", "Calculates the new range ({=2*v0*tf:2} m).", "Berechnet die neue Wurfweite ({=2*v0*tf:2} m).") },
        ],
      },
    ],
  });

  // --- 11.1.4 / 11.1.5 Newton yasaları: buz pistinde kızak ------------------------------
  QB.add({
    id: "yazili-newton-kizak",
    subject: "fizik", topic: "kuvvet", grade: 11, level: 2,
    outcome: "FİZ.11.1.5",
    vars: {
      m: { values: [20, 25, 40, 50] },
      F: { values: [40, 50, 60, 80, 100] },
      t: { values: [2, 3, 4] },
      a: "F / m",
    },
    where: ["a >= 1", "a <= 4"],
    text: T(
      "Sürtünmenin önemsiz olduğu bir buz pistinde durmakta olan {m} kg kütleli kızak, bir sporcu tarafından yatay ve sabit {F} N'luk kuvvetle {t} s boyunca itiliyor; ardından sporcu kızağı bırakıyor (g = 10 m/s²). Buna göre aşağıdaki soruları cevaplayınız.",
      "On an ice rink where friction is negligible, a sled of mass {m} kg at rest is pushed by an athlete with a constant horizontal force of {F} N for {t} s; then the athlete lets go (g = 10 m/s²). Answer the following questions.",
      "Auf einer Eisbahn mit vernachlässigbarer Reibung wird ein ruhender Schlitten der Masse {m} kg von einer Sportlerin {t} s lang mit einer konstanten waagerechten Kraft von {F} N geschoben; dann lässt sie los (g = 10 m/s²). Beantworte die folgenden Fragen.",
    ),
    parts: [
      {
        kind: "number", points: 3, unit: "m/s²", answer: "a", decimals: 2,
        text: T("İtme sırasında kızağın ivmesi kaç m/s²'dir?", "What is the sled's acceleration while it is being pushed?", "Wie groß ist die Beschleunigung des Schlittens beim Schieben?"),
        solution: T("a = F / m = {F} / {m} = {=a:2} m/s²", "a = F / m = {F} / {m} = {=a:2} m/s²", "a = F / m = {F} / {m} = {=a:2} m/s²"),
      },
      {
        kind: "number", points: 3, unit: "m/s", answer: "a * t", decimals: 1,
        text: T("Sporcu kızağı bıraktığı anda kızağın hızı kaç m/s'dir?", "What is the sled's speed when the athlete lets go?", "Wie schnell ist der Schlitten, wenn die Sportlerin loslässt?"),
        solution: T("υ = a·t = {=a:2} · {t} = {=a*t:1} m/s", "υ = a·t = {=a:2} · {t} = {=a*t:1} m/s", "υ = a·t = {=a:2} · {t} = {=a*t:1} m/s"),
      },
      {
        kind: "select", points: 3,
        text: T("Sporcu kızağı bıraktıktan sonra kızak nasıl hareket eder?", "How does the sled move after the athlete lets go?", "Wie bewegt sich der Schlitten, nachdem die Sportlerin losgelassen hat?"),
        options: [T("Sabit hızla gitmeye devam eder", "It keeps moving at constant speed", "Er gleitet mit konstanter Geschwindigkeit weiter"), T("Yavaşlayarak durur", "It slows down and stops", "Er wird langsamer und hält an"), T("Hızlanmaya devam eder", "It keeps speeding up", "Er wird weiter schneller")],
        answer: "1",
        solution: T("Bırakıldıktan sonra kızağa etki eden net kuvvet sıfırdır (ağırlık ile normal kuvvet dengededir); eylemsizlik ilkesine göre sabit hızla gider.", "After release the net force on the sled is zero (weight and normal force balance); by the law of inertia it moves at constant speed.", "Nach dem Loslassen ist die resultierende Kraft null (Gewicht und Normalkraft heben sich auf); nach dem Trägheitsgesetz gleitet er gleichförmig weiter."),
      },
      {
        kind: "text",
        text: T("İtme sırasında kızağın serbest cisim diyagramını kelimelerle betimleyiniz: hangi kuvvetler, hangi cisim tarafından, hangi yönde ve kaç N büyüklüğünde etki eder? Bileşke kuvveti yazınız.", "Describe in words the free-body diagram of the sled while it is being pushed: which forces act, exerted by which body, in which direction and how large? State the net force.", "Beschreibe den Kräfteplan des Schlittens beim Schieben in Worten: Welche Kräfte wirken, von welchem Körper ausgeübt, in welche Richtung und wie groß? Gib die resultierende Kraft an."),
        model: T("Kızağa üç kuvvet etki eder: Dünya'nın uyguladığı aşağı yönlü ağırlık ({=10*m} N), buzun uyguladığı yukarı yönlü normal kuvvet ({=10*m} N) ve sporcunun uyguladığı yatay itme kuvveti ({F} N). Düşeydeki kuvvetler birbirini dengeler; bileşke kuvvet itme yönünde {F} N'dur.",
          "Three forces act on the sled: its weight downwards exerted by the Earth ({=10*m} N), the normal force upwards exerted by the ice ({=10*m} N) and the horizontal push of the athlete ({F} N). The vertical forces balance; the net force is {F} N in the direction of the push.",
          "Auf den Schlitten wirken drei Kräfte: die Gewichtskraft nach unten, ausgeübt von der Erde ({=10*m} N), die Normalkraft nach oben, ausgeübt vom Eis ({=10*m} N), und die waagerechte Schubkraft der Sportlerin ({F} N). Die senkrechten Kräfte heben sich auf; die resultierende Kraft beträgt {F} N in Schubrichtung."),
        rubric: [
          { points: 2, text: T("Ağırlığı (Dünya, aşağı, {=10*m} N) doğru betimler.", "Describes the weight correctly (Earth, downwards, {=10*m} N).", "Beschreibt die Gewichtskraft richtig (Erde, nach unten, {=10*m} N).") },
          { points: 2, text: T("Normal kuvveti (buz, yukarı, {=10*m} N) doğru betimler.", "Describes the normal force correctly (ice, upwards, {=10*m} N).", "Beschreibt die Normalkraft richtig (Eis, nach oben, {=10*m} N).") },
          { points: 1, text: T("İtme kuvvetini (sporcu, yatay, {F} N) doğru betimler.", "Describes the pushing force correctly (athlete, horizontal, {F} N).", "Beschreibt die Schubkraft richtig (Sportlerin, waagerecht, {F} N).") },
          { points: 1, text: T("Bileşke kuvvetin itme yönünde {F} N olduğunu belirtir.", "States that the net force is {F} N in the direction of the push.", "Gibt an, dass die resultierende Kraft {F} N in Schubrichtung beträgt.") },
        ],
      },
    ],
  });
})();
