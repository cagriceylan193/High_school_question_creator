// FİZİK · Açık uçlu, bağlamlı sorular (Türkiye Yüzyılı Maarif Modeli yaklaşımıyla)
// Her soru gerçek yaşamdan bir bağlam ve a), b), c) bölümlerinden oluşur:
//   number → sayısal cevap, otomatik puanlanır
//   select → seçmeli kısa cevap (ör. Artar / Azalır / Değişmez), otomatik puanlanır
//   text   → açıklama; örnek cevap + dereceli puanlama anahtarı (rubrik) ile puanlanır
// Tüm sorular bu proje için özgün olarak yazılmıştır. g = 10 m/s².
(function () {
  "use strict";

  // --- Hareket: bisikletle okula -------------------------------------------------------
  QB.add({
    id: "maarif-hareket-bisiklet",
    subject: "fizik",
    topic: "hareket",
    grade: 10,
    outcome: "FİZ.10.1.1",
    level: 2,
    skills: ["veri", "hesap", "gerekce"],
    vars: {
      ad: { type: "name" },
      v1: { values: [3, 4, 5, 6] },
      v2: { values: [3, 4, 5, 6, 7] },
      v3: { values: [2, 3, 4, 5] },
      x1: "60 * v1",
      x2: "x1 + 60 * v2",
      x3: "x2 + 60 * v3",
      vmax: "max(v1, v2, v3)",
    },
    where: ["v1 != v2", "v2 != v3", "v1 != v3"],
    text: {
      tr: "{ad}, bisikletiyle düz bir yolda okula gidiyor. Bir arkadaşı, bisikletlinin evden uzaklığını her dakika ölçüp tabloya yazıyor.",
      en: "{ad} cycles to school along a straight road. A friend measures {ad}'s distance from home every minute and records it in the table.",
      de: "{ad} fährt mit dem Fahrrad auf einer geraden Straße zur Schule. Eine Freundin misst jede Minute den Abstand von zu Hause und trägt ihn in die Tabelle ein.",
    },
    figure: (v, f) => {
      const s = f.svg(360, 82);
      s.add(f.table(10, 8, [110, 60, 60, 60, 60], 32, [
        [f.t({ tr: "Zaman (s)", en: "Time (s)", de: "Zeit (s)" }), "0", "60", "120", "180"],
        [f.t({ tr: "Konum (m)", en: "Position (m)", de: "Ort (m)" }), "0", f.n(v.x1), f.n(v.x2), f.n(v.x3)],
      ]));
      return s;
    },
    parts: [
      {
        kind: "number",
        points: 2,
        text: {
          tr: "Bisikletlinin 0–180 s aralığındaki ortalama hızı kaç m/s'dir?",
          en: "What is {ad}'s average speed between 0 and 180 s in m/s?",
          de: "Wie groß ist die Durchschnittsgeschwindigkeit zwischen 0 und 180 s in m/s?",
        },
        answer: "x3 / 180",
        decimals: 2,
        unit: "m/s",
      },
      {
        kind: "select",
        text: {
          tr: "Bisikletli hangi zaman aralığında en hızlı gitmiştir?",
          en: "In which time interval did {ad} ride fastest?",
          de: "In welchem Zeitabschnitt fuhr {ad} am schnellsten?",
        },
        options: ["0–60 s", "60–120 s", "120–180 s"],
        answer: "if(v1 == vmax, 1, if(v2 == vmax, 2, 3))",
      },
      {
        kind: "text",
        text: {
          tr: "Bisikletlinin hareketi düzgün doğrusal hareket midir? Tablodaki verileri kullanarak gerekçelendir.",
          en: "Is {ad}'s motion uniform (constant velocity)? Justify your answer using the data in the table.",
          de: "Ist die Bewegung gleichförmig (konstante Geschwindigkeit)? Begründe mit den Daten aus der Tabelle.",
        },
        model: {
          tr: "Hayır. Eşit zaman aralıklarında (her 60 s'de) aldığı yollar farklıdır: {=60*v1} m, {=60*v2} m ve {=60*v3} m. Düzgün doğrusal harekette eşit zaman aralıklarında eşit yollar alınır (hız sabittir).",
          en: "No. In equal time intervals (every 60 s) the distances covered are different: {=60*v1} m, {=60*v2} m and {=60*v3} m. In uniform motion equal distances are covered in equal time intervals (the velocity is constant).",
          de: "Nein. In gleichen Zeitabschnitten (je 60 s) werden unterschiedliche Strecken zurückgelegt: {=60*v1} m, {=60*v2} m und {=60*v3} m. Bei gleichförmiger Bewegung werden in gleichen Zeiten gleiche Strecken zurückgelegt (die Geschwindigkeit ist konstant).",
        },
        rubric: [
          { points: 1, text: { tr: "Hareketin düzgün doğrusal olmadığını belirtir.", en: "States that the motion is not uniform.", de: "Gibt an, dass die Bewegung nicht gleichförmig ist." } },
          { points: 2, text: { tr: "Her 60 s'de alınan yolları tablodan hesaplayıp karşılaştırır.", en: "Calculates and compares the distances covered in each 60 s from the table.", de: "Berechnet die Strecken je 60 s aus der Tabelle und vergleicht sie." } },
          { points: 1, text: { tr: "Düzgün doğrusal hareketin tanımını (eşit zamanda eşit yol, sabit hız) kullanır.", en: "Uses the definition of uniform motion (equal distances in equal times, constant velocity).", de: "Verwendet die Definition der gleichförmigen Bewegung (gleiche Strecken in gleichen Zeiten, konstante Geschwindigkeit)." } },
        ],
      },
    ],
  });

  // --- Kuvvet: asansörde tartı ----------------------------------------------------------
  QB.add({
    id: "maarif-kuvvet-asansor",
    subject: "fizik",
    topic: "kuvvet",
    grade: 11,
    outcome: "FİZ.11.1.4",
    level: 3,
    skills: ["hesap", "model", "gerekce"],
    vars: {
      ad: { type: "name" },
      m: { values: [40, 50, 60, 70] },
      a: { values: [1, 2, 2.5] },
      d: { values: [1, -1] },
      N: "m * (10 + d * a)",
    },
    text: {
      tr: "{ad}, kütlesi {m} kg olan bir öğrencidir ve asansörün içinde bir baskül (tartı) üzerinde duruyor. Asansör {a} m/s² büyüklüğündeki ivmeyle {if:d > 0|yukarı doğru hızlanarak çıkıyor|aşağı doğru hızlanarak iniyor}. (g = 10 m/s²)",
      en: "{ad}, a student with a mass of {m} kg, is standing on a bathroom scale inside a lift. The lift is {if:d > 0|moving upwards and speeding up|moving downwards and speeding up} with an acceleration of {a} m/s². (g = 10 m/s²)",
      de: "{ad}, eine Person mit der Masse {m} kg, steht in einem Aufzug auf einer Personenwaage. Der Aufzug {if:d > 0|fährt nach oben und wird schneller|fährt nach unten und wird schneller}, die Beschleunigung beträgt {a} m/s². (g = 10 m/s²)",
    },
    parts: [
      {
        kind: "number",
        points: 2,
        text: {
          tr: "Baskülün gösterdiği değer kaç N'dir?",
          en: "What does the scale read in newtons?",
          de: "Welchen Wert in Newton zeigt die Waage an?",
        },
        answer: "N",
        unit: "N",
      },
      {
        kind: "select",
        text: {
          tr: "Asansör daha sonra sabit hızla hareket etmeye başlarsa baskülün gösterdiği değer nasıl değişir?",
          en: "If the lift then moves at constant velocity, how does the scale reading change?",
          de: "Wie ändert sich die Anzeige der Waage, wenn der Aufzug danach mit konstanter Geschwindigkeit fährt?",
        },
        change: { before: "N", after: "m * 10" },
      },
      {
        kind: "text",
        text: {
          tr: "Hızlanma sırasında baskülün öğrencinin ağırlığından farklı bir değer göstermesinin nedenini Newton'un hareket yasalarıyla açıkla.",
          en: "Use Newton's laws of motion to explain why the scale shows a value different from {ad}'s weight while the lift is speeding up.",
          de: "Erkläre mit den newtonschen Gesetzen, warum die Waage während der Beschleunigung einen anderen Wert als die Gewichtskraft anzeigt.",
        },
        model: {
          tr: "Baskül, öğrenciye uyguladığı tepki (normal) kuvvetini gösterir. Asansör ivmeli hareket ettiği için öğrenciye etki eden net kuvvet sıfır değildir: F<sub>net</sub> = m·a. İvme {if:d > 0|yukarı|aşağı} yönde olduğundan tepki kuvveti ağırlıktan {if:d > 0|büyüktür|küçüktür}: N = m(g {if:d > 0|+|−} a) = {N} N. Ağırlık ise {=m*10} N'dir.",
          en: "The scale shows the normal (support) force it exerts on {ad}. Because the lift is accelerating, the net force on {ad} is not zero: F<sub>net</sub> = m·a. The acceleration points {if:d > 0|upwards|downwards}, so the normal force is {if:d > 0|greater|smaller} than the weight: N = m(g {if:d > 0|+|−} a) = {N} N, while the weight is {=m*10} N.",
          de: "Die Waage zeigt die Normalkraft (Stützkraft) an, die sie auf {ad} ausübt. Da der Aufzug beschleunigt, ist die resultierende Kraft auf {ad} nicht null: F<sub>res</sub> = m·a. Die Beschleunigung zeigt nach {if:d > 0|oben|unten}, daher ist die Normalkraft {if:d > 0|größer|kleiner} als die Gewichtskraft: N = m(g {if:d > 0|+|−} a) = {N} N; die Gewichtskraft beträgt {=m*10} N.",
        },
        rubric: [
          { points: 1, text: { tr: "Baskülün tepki (normal) kuvvetini ölçtüğünü belirtir.", en: "States that the scale measures the normal (support) force.", de: "Gibt an, dass die Waage die Normalkraft misst." } },
          { points: 1, text: { tr: "İvmeli harekette net kuvvetin sıfır olmadığını Newton'un 2. yasasıyla ilişkilendirir.", en: "Links the non-zero net force during acceleration to Newton's second law.", de: "Verknüpft die von null verschiedene resultierende Kraft mit dem zweiten newtonschen Gesetz." } },
          { points: 1, text: { tr: "Tepki kuvvetinin ağırlıktan neden büyük/küçük olduğunu ivmenin yönüyle açıklar.", en: "Explains why the normal force is greater/smaller than the weight using the direction of the acceleration.", de: "Erklärt mit der Richtung der Beschleunigung, warum die Normalkraft größer/kleiner als die Gewichtskraft ist." } },
        ],
      },
    ],
  });

  // --- Kuvvet: sürtünme deneyi (deney tasarlama) -----------------------------------------
  QB.add({
    id: "maarif-kuvvet-surtunme-deneyi",
    subject: "fizik",
    topic: "kuvvet",
    grade: 11,
    outcome: "FİZ.11.1.4",
    level: 3,
    skills: ["deney", "veri", "hesap"],
    vars: {
      m: { values: [0.5, 1, 2] },
      k1: { values: [0.1, 0.15, 0.2] },
      k2: { values: [0.3, 0.35, 0.4] },
      k3: { values: [0.5, 0.6, 0.7] },
      F1: "k1 * m * 10",
      F2: "k2 * m * 10",
      F3: "k3 * m * 10",
    },
    text: {
      tr: "Bir öğrenci grubu, {m} kg kütleli tahta bir bloğu dinamometreyle yatay olarak <b>sabit hızla</b> çekiyor ve üç farklı yüzeyde dinamometrede okunan değerleri tabloya yazıyor.",
      en: "A group of students pulls a {m} kg wooden block horizontally <b>at constant velocity</b> with a spring scale and records the readings on three different surfaces in the table.",
      de: "Eine Schülergruppe zieht einen Holzklotz der Masse {m} kg mit einem Kraftmesser waagerecht <b>mit konstanter Geschwindigkeit</b> und trägt die Messwerte für drei Oberflächen in die Tabelle ein.",
    },
    figure: (v, f) => {
      const s = f.svg(360, 82);
      s.add(f.table(10, 8, [140, 70, 70, 70], 32, [
        [f.t({ tr: "Yüzey", en: "Surface", de: "Oberfläche" }), f.t({ tr: "cam", en: "glass", de: "Glas" }), f.t({ tr: "tahta", en: "wood", de: "Holz" }), f.t({ tr: "halı", en: "carpet", de: "Teppich" })],
        [f.t({ tr: "Okunan değer (N)", en: "Reading (N)", de: "Anzeige (N)" }), f.n(v.F1, 2), f.n(v.F2, 2), f.n(v.F3, 2)],
      ]));
      return s;
    },
    parts: [
      {
        kind: "number",
        points: 2,
        text: {
          tr: "Blok ile tahta yüzey arasındaki kinetik sürtünme katsayısını hesapla.",
          en: "Calculate the coefficient of kinetic friction between the block and the wooden surface.",
          de: "Berechne die Gleitreibungszahl zwischen dem Klotz und der Holzoberfläche.",
        },
        answer: "k2",
        decimals: 2,
      },
      {
        kind: "select",
        text: {
          tr: "Bloğun üzerine özdeş ikinci bir blok konulup tahta yüzeyde aynı ölçüm yapılırsa okunan değer nasıl değişir?",
          en: "If an identical second block is placed on top and the measurement is repeated on wood, how does the reading change?",
          de: "Wie ändert sich die Anzeige auf Holz, wenn ein gleicher zweiter Klotz daraufgelegt und erneut gemessen wird?",
        },
        change: { before: "F2", after: "2 * F2" },
      },
      {
        kind: "text",
        text: {
          tr: "Bu deneyde bağımsız ve bağımlı değişken nedir? Sürtünme kuvvetinin yalnızca yüzeyin cinsine bağlı olarak değiştiğini gösterebilmek için hangi değişkenler sabit tutulmalıdır?",
          en: "What are the independent and dependent variables in this experiment? Which variables must be kept constant to show that the friction force changes only because of the type of surface?",
          de: "Was sind in diesem Versuch die unabhängige und die abhängige Variable? Welche Größen müssen konstant gehalten werden, um zu zeigen, dass sich die Reibungskraft nur wegen der Oberflächenart ändert?",
        },
        model: {
          tr: "Bağımsız değişken yüzeyin cinsidir (cam, tahta, halı). Bağımlı değişken dinamometrede okunan değerdir, yani sürtünme kuvvetidir (blok sabit hızla çekildiği için çekme kuvveti sürtünme kuvvetine eşittir). Sabit tutulması gerekenler: bloğun kütlesi ve yüzeye değen yüzü, çekme kuvvetinin yatay olması ve bloğun sabit hızla çekilmesi, aynı dinamometrenin kullanılması.",
          en: "The independent variable is the type of surface (glass, wood, carpet). The dependent variable is the scale reading, i.e. the friction force (since the block moves at constant velocity, the pulling force equals the friction force). Controlled variables: the block's mass and the face in contact with the surface, pulling horizontally at constant velocity, and using the same spring scale.",
          de: "Die unabhängige Variable ist die Oberflächenart (Glas, Holz, Teppich). Die abhängige Variable ist die Anzeige des Kraftmessers, also die Reibungskraft (bei konstanter Geschwindigkeit ist die Zugkraft gleich der Reibungskraft). Konstant zu halten sind: die Masse des Klotzes und die aufliegende Fläche, waagerechtes Ziehen mit konstanter Geschwindigkeit und derselbe Kraftmesser.",
        },
        rubric: [
          { points: 1, text: { tr: "Bağımsız değişkeni (yüzeyin cinsi) doğru belirtir.", en: "Correctly names the independent variable (type of surface).", de: "Nennt die unabhängige Variable (Oberflächenart) richtig." } },
          { points: 1, text: { tr: "Bağımlı değişkeni (okunan değer / sürtünme kuvveti) doğru belirtir.", en: "Correctly names the dependent variable (reading / friction force).", de: "Nennt die abhängige Variable (Anzeige / Reibungskraft) richtig." } },
          { points: 1, text: { tr: "En az bir uygun kontrol değişkeni belirtir (ör. bloğun kütlesi).", en: "Names at least one suitable controlled variable (e.g. the block's mass).", de: "Nennt mindestens eine geeignete Kontrollvariable (z. B. die Masse des Klotzes)." } },
          { points: 1, text: { tr: "İkinci bir uygun kontrol değişkeni belirtir (ör. sabit hız, yatay çekme, değen yüzey).", en: "Names a second suitable controlled variable (e.g. constant velocity, horizontal pull, contact face).", de: "Nennt eine zweite geeignete Kontrollvariable (z. B. konstante Geschwindigkeit, waagerechtes Ziehen, Auflagefläche)." } },
        ],
      },
    ],
  });

  // --- Basınç: hidrolik kriko -------------------------------------------------------------
  QB.add({
    id: "maarif-basinc-kriko",
    subject: "fizik",
    topic: "basinc",
    grade: 10,
    level: 2,
    skills: ["hesap", "model", "gerekce"],
    vars: {
      A1: { values: [2, 4, 5] },
      k: { values: [20, 25, 40, 50] },
      A2: "A1 * k",
      G: { values: [8000, 10000, 12000, 15000] },
      F1: "G * A1 / A2",
    },
    text: {
      tr: "Bir oto tamircisi, ağırlığı {G} N olan bir otomobili hidrolik krikoyla kaldırıyor. Krikonun küçük pistonunun kesit alanı {A1} cm², büyük pistonununki {A2} cm²'dir. (Pistonların ağırlığı ve sürtünmeler önemsizdir.)",
      en: "A mechanic lifts a car weighing {G} N with a hydraulic jack. The small piston has a cross-sectional area of {A1} cm² and the large piston {A2} cm². (Piston weights and friction are negligible.)",
      de: "Ein Mechaniker hebt ein Auto mit der Gewichtskraft {G} N mit einem hydraulischen Wagenheber an. Der kleine Kolben hat eine Querschnittsfläche von {A1} cm², der große von {A2} cm². (Kolbengewichte und Reibung sind vernachlässigbar.)",
    },
    figure: (v, f) => {
      const s = f.svg(320, 190);
      const base = 165;
      // sıvı: dar sol silindir + geniş sağ silindir + alt bağlantı
      s.add(f.rect(40, 70, 30, base - 70, "liq"), f.rect(150, 80, 120, base - 80, "liq"), f.rect(40, base - 25, 230, 25, "liq"));
      s.add(f.polyline([[40, 40], [40, base], [270, base], [270, 50]]), f.polyline([[70, 40], [70, base - 25], [150, base - 25], [150, 50]]));
      s.add(f.rect(38, 62, 34, 8, "obj"), f.rect(148, 72, 124, 8, "obj"), f.rect(170, 36, 80, 36, "obj", 4), f.text(210, 54, "G"));
      s.add(f.arrow(55, 20, 55, 58, "acc"), f.text(70, 22, "F_1", { a: "start" }));
      s.add(f.text(55, base + 14, f.$("A1") + " cm²", { cls: "mut" }), f.text(210, base + 14, f.$("A2") + " cm²", { cls: "mut" }));
      return s;
    },
    parts: [
      {
        kind: "number",
        points: 2,
        text: {
          tr: "Otomobili dengede tutmak için küçük pistona uygulanması gereken F<sub>1</sub> kuvveti kaç N'dir?",
          en: "What force F<sub>1</sub> in newtons must be applied to the small piston to hold the car in balance?",
          de: "Welche Kraft F<sub>1</sub> in Newton muss auf den kleinen Kolben wirken, um das Auto im Gleichgewicht zu halten?",
        },
        answer: "F1",
        unit: "N",
      },
      {
        kind: "select",
        text: {
          tr: "Küçük pistonun kesit alanı iki katına çıkarılırsa gereken F<sub>1</sub> kuvveti nasıl değişir?",
          en: "If the small piston's area is doubled, how does the required force F<sub>1</sub> change?",
          de: "Wie ändert sich die nötige Kraft F<sub>1</sub>, wenn die Fläche des kleinen Kolbens verdoppelt wird?",
        },
        change: { before: "F1", after: "2 * F1" },
      },
      {
        kind: "text",
        text: {
          tr: "Krikonun küçük bir kuvvetle büyük bir yükü nasıl kaldırabildiğini basıncın sıvılarda iletilmesiyle açıkla. Bu durumda neden enerjiden “kazanç” sağlanmadığını da belirt.",
          en: "Explain, using how pressure is transmitted in liquids, how the jack can lift a large load with a small force. Also state why no energy is “gained”.",
          de: "Erkläre mithilfe der Druckübertragung in Flüssigkeiten, wie der Wagenheber mit kleiner Kraft eine große Last heben kann. Gib auch an, warum dabei keine Energie „gewonnen“ wird.",
        },
        model: {
          tr: "Küçük pistona uygulanan kuvvet sıvıda P = F<sub>1</sub>/A<sub>1</sub> basıncını oluşturur ve bu basınç sıvı tarafından her yöne aynen iletilir (Pascal ilkesi). Aynı basınç büyük pistonun daha büyük alanına etki ettiğinden oluşan kuvvet alanlar oranında büyüktür: F<sub>2</sub> = P·A<sub>2</sub>. Enerji kazancı yoktur: küçük piston, büyük pistonun yükseldiği mesafenin {k} katı kadar yol almalıdır; yapılan iş (kuvvet × yol) iki tarafta eşittir.",
          en: "The force on the small piston creates a pressure P = F<sub>1</sub>/A<sub>1</sub> in the liquid, and the liquid transmits this pressure equally in all directions (Pascal's principle). The same pressure acts on the larger area of the big piston, so the force there is larger by the ratio of the areas: F<sub>2</sub> = P·A<sub>2</sub>. No energy is gained: the small piston must move {k} times as far as the large piston rises, so the work (force × distance) is the same on both sides.",
          de: "Die Kraft auf den kleinen Kolben erzeugt in der Flüssigkeit den Druck p = F<sub>1</sub>/A<sub>1</sub>, der sich in der Flüssigkeit nach allen Seiten gleichmäßig ausbreitet (Pascal-Prinzip). Derselbe Druck wirkt auf die größere Fläche des großen Kolbens, daher ist die Kraft dort im Verhältnis der Flächen größer: F<sub>2</sub> = p·A<sub>2</sub>. Es wird keine Energie gewonnen: Der kleine Kolben muss den {k}-fachen Weg zurücklegen, um den der große Kolben steigt; die Arbeit (Kraft × Weg) ist auf beiden Seiten gleich.",
        },
        rubric: [
          { points: 1, text: { tr: "Basıncın sıvılarda her yöne aynen iletildiğini (Pascal ilkesi) belirtir.", en: "States that pressure is transmitted equally in all directions in liquids (Pascal's principle).", de: "Gibt an, dass sich der Druck in Flüssigkeiten gleichmäßig ausbreitet (Pascal-Prinzip)." } },
          { points: 1, text: { tr: "P = F/A ilişkisiyle büyük pistondaki kuvvetin alanla orantılı olarak büyüdüğünü açıklar.", en: "Uses P = F/A to explain that the force on the large piston grows in proportion to its area.", de: "Erklärt mit p = F/A, dass die Kraft am großen Kolben proportional zur Fläche größer ist." } },
          { points: 1, text: { tr: "Kuvvet kazancının yoldan kayıpla dengelendiğini, yapılan işin eşit olduğunu belirtir.", en: "States that the gain in force is balanced by a longer distance, so the work is equal.", de: "Gibt an, dass der Kraftgewinn durch einen längeren Weg ausgeglichen wird und die Arbeit gleich ist." } },
        ],
      },
    ],
  });

  // --- Enerji: kaykay rampası ---------------------------------------------------------------
  QB.add({
    id: "maarif-enerji-kaykay",
    subject: "fizik",
    topic: "enerji",
    grade: 9,
    level: 2,
    skills: ["hesap", "model", "aciklama"],
    vars: {
      ad: { type: "name" },
      v: { values: [4, 6, 8, 10] },
      h: "v * v / 20",
      m: { values: [40, 50, 60] },
    },
    text: {
      tr: "Kütlesi {m} kg olan {ad}, kaykayıyla U biçimli bir rampanın {h} m yüksekliğindeki ucundan ilk hızsız harekete başlıyor. (Önce sürtünmeyi ve hava direncini önemsemeyin; g = 10 m/s².)",
      en: "{ad}, who has a mass of {m} kg, starts from rest on a skateboard at the top of a U-shaped ramp, {h} m above the bottom. (At first, ignore friction and air resistance; g = 10 m/s².)",
      de: "{ad} (Masse {m} kg) startet auf einem Skateboard aus der Ruhe am {h} m hohen Rand einer U-förmigen Rampe. (Reibung und Luftwiderstand zunächst vernachlässigen; g = 10 m/s².)",
    },
    figure: (v, f) => {
      const s = f.svg(370, 150);
      const base = 125, top = 25;
      s.add(f.curve([[30, top], [80, base - 15], [160, base], [240, base - 15], [290, top]], "track"));
      s.add(f.line(20, base, 300, base, "thin"), f.dashed(20, top, 300, top), f.dimV(310, top, base, f.$("h") + " m", false));
      s.add(f.circle(36, top - 6, 7, "obj"), f.text(52, top - 14, f.$("ad"), { a: "start" }));
      return s;
    },
    parts: [
      {
        kind: "number",
        points: 2,
        text: {
          tr: "Kaykaycının rampanın en alt noktasındaki hızı kaç m/s'dir?",
          en: "What is {ad}'s speed at the lowest point of the ramp in m/s?",
          de: "Wie groß ist die Geschwindigkeit am tiefsten Punkt der Rampe in m/s?",
        },
        answer: "v",
        unit: "m/s",
      },
      {
        kind: "select",
        text: {
          tr: "Kaykaycı aynı noktadan sırt çantasıyla (toplam kütlesi daha büyük olarak) başlasaydı en alt noktadaki hızı nasıl değişirdi? (Sürtünme yok.)",
          en: "If {ad} started from the same point carrying a backpack (greater total mass), how would the speed at the lowest point change? (No friction.)",
          de: "Wie würde sich die Geschwindigkeit am tiefsten Punkt ändern, wenn {ad} mit Rucksack (größere Gesamtmasse) am selben Punkt startete? (Keine Reibung.)",
        },
        change: { before: "v", after: "v" },
      },
      {
        kind: "text",
        text: {
          tr: "Gerçek bir rampada kaykaycı, karşı tarafta başladığı yüksekliğe çıkamaz. Bunun nedenini enerji dönüşümleri ve enerjinin korunumuyla açıkla.",
          en: "On a real ramp {ad} cannot reach the starting height on the other side. Explain why, using energy transformations and conservation of energy.",
          de: "Auf einer echten Rampe erreicht {ad} auf der anderen Seite nicht die Starthöhe. Erkläre den Grund mit Energieumwandlungen und der Energieerhaltung.",
        },
        model: {
          tr: "Başlangıçta kaykaycı yalnızca çekim potansiyel enerjisine sahiptir; inerken bu enerji kinetik enerjiye, çıkarken yeniden potansiyel enerjiye dönüşür. Gerçek rampada sürtünme ve hava direnci nedeniyle mekanik enerjinin bir kısmı ısıya (iç enerjiye) ve sese dönüşür. Mekanik enerji azaldığı için karşı tarafta daha düşük bir yüksekliğe çıkar; toplam enerji ise korunur, yalnızca başka biçimlere dönüşmüştür.",
          en: "At the start {ad} has only gravitational potential energy; going down it turns into kinetic energy and going up back into potential energy. On a real ramp friction and air resistance turn part of the mechanical energy into heat (internal energy) and sound. Because the mechanical energy decreases, {ad} reaches a lower height on the other side; the total energy is still conserved, it has only changed form.",
          de: "Am Anfang hat {ad} nur Lageenergie; beim Herunterfahren wird sie in Bewegungsenergie umgewandelt und beim Hochfahren wieder in Lageenergie. Auf einer echten Rampe wandeln Reibung und Luftwiderstand einen Teil der mechanischen Energie in Wärme (innere Energie) und Schall um. Da die mechanische Energie abnimmt, wird auf der anderen Seite eine geringere Höhe erreicht; die Gesamtenergie bleibt erhalten, sie hat nur ihre Form geändert.",
        },
        rubric: [
          { points: 1, text: { tr: "Potansiyel enerjinin kinetik enerjiye (ve tersine) dönüştüğünü belirtir.", en: "States that potential energy turns into kinetic energy (and back).", de: "Gibt an, dass Lageenergie in Bewegungsenergie umgewandelt wird (und umgekehrt)." } },
          { points: 1, text: { tr: "Sürtünme/hava direnciyle mekanik enerjinin bir kısmının ısıya veya sese dönüştüğünü belirtir.", en: "States that friction/air resistance turn part of the mechanical energy into heat or sound.", de: "Gibt an, dass Reibung/Luftwiderstand einen Teil der mechanischen Energie in Wärme oder Schall umwandeln." } },
          { points: 1, text: { tr: "Toplam enerjinin korunduğunu, azalanın mekanik enerji olduğunu ayırt eder.", en: "Distinguishes that total energy is conserved while mechanical energy decreases.", de: "Unterscheidet, dass die Gesamtenergie erhalten bleibt, die mechanische Energie aber abnimmt." } },
        ],
      },
    ],
  });

  // --- Elektrik: evde enerji tasarrufu -------------------------------------------------------
  QB.add({
    id: "maarif-elektrik-tasarruf",
    subject: "fizik",
    topic: "elektrik",
    grade: 10,
    level: 2,
    skills: ["veri", "hesap", "gerekce"],
    vars: {
      P1: { values: [1500, 2000] },
      t1: { values: [2, 3, 4] },
      P2: { values: [100, 150] },
      t2: { values: [4, 5, 6] },
      P3: { values: [2000, 2200] },
      t3: { values: [0.5, 1] },
      P4: { values: [10, 15] },
      t4: { values: [5, 6, 8] },
      e1: "P1 * t1",
      e2: "P2 * t2",
      e3: "P3 * t3",
      e4: "P4 * t4",
      emax: "max(e1, e2, e3, e4)",
      kwh: "P1 * t1 * 30 / 1000",
    },
    where: ["(e1 == emax) + (e2 == emax) + (e3 == emax) + (e4 == emax) == 1"],
    text: {
      tr: "Bir ailenin evindeki bazı elektrikli cihazların güçleri ve günlük ortalama kullanım süreleri tablodaki gibidir.",
      en: "The table shows the power of some appliances in a family's home and their average daily use.",
      de: "Die Tabelle zeigt die Leistung einiger Elektrogeräte im Haushalt einer Familie und ihre durchschnittliche tägliche Nutzungsdauer.",
    },
    figure: (v, f) => {
      const s = f.svg(370, 180);
      const T = (o) => f.t(o);
      s.add(f.table(10, 8, [150, 90, 110], 32, [
        [T({ tr: "Cihaz", en: "Appliance", de: "Gerät" }), T({ tr: "Güç (W)", en: "Power (W)", de: "Leistung (W)" }), T({ tr: "Süre (sa/gün)", en: "Use (h/day)", de: "Dauer (h/Tag)" })],
        [T({ tr: "Elektrikli ısıtıcı", en: "Electric heater", de: "Heizlüfter" }), f.n(v.P1), f.n(v.t1)],
        [T({ tr: "Televizyon", en: "Television", de: "Fernseher" }), f.n(v.P2), f.n(v.t2)],
        [T({ tr: "Çamaşır makinesi", en: "Washing machine", de: "Waschmaschine" }), f.n(v.P3), f.n(v.t3)],
        [T({ tr: "LED lamba", en: "LED lamp", de: "LED-Lampe" }), f.n(v.P4), f.n(v.t4)],
      ]));
      return s;
    },
    parts: [
      {
        kind: "number",
        points: 2,
        text: {
          tr: "Elektrikli ısıtıcı 30 günde kaç kWh enerji harcar?",
          en: "How many kWh does the electric heater use in 30 days?",
          de: "Wie viele kWh verbraucht der Heizlüfter in 30 Tagen?",
        },
        answer: "kwh",
        unit: "kWh",
      },
      {
        kind: "select",
        text: {
          tr: "Tabloya göre günde en çok elektrik enerjisi harcayan cihaz hangisidir?",
          en: "According to the table, which appliance uses the most electrical energy per day?",
          de: "Welches Gerät verbraucht laut Tabelle pro Tag die meiste elektrische Energie?",
        },
        options: [
          { tr: "Elektrikli ısıtıcı", en: "Electric heater", de: "Heizlüfter" },
          { tr: "Televizyon", en: "Television", de: "Fernseher" },
          { tr: "Çamaşır makinesi", en: "Washing machine", de: "Waschmaschine" },
          { tr: "LED lamba", en: "LED lamp", de: "LED-Lampe" },
        ],
        answer: "if(e1 == emax, 1, if(e2 == emax, 2, if(e3 == emax, 3, 4)))",
      },
      {
        kind: "text",
        text: {
          tr: "Aileye elektrik tasarrufu için iki öneride bulun. Her önerinin tüketimi neden azalttığını enerji, güç ve süre arasındaki ilişkiyle ve tablodaki verilerle açıkla.",
          en: "Give the family two suggestions for saving electricity. Explain why each suggestion reduces consumption, using the relationship between energy, power and time and the data in the table.",
          de: "Mache der Familie zwei Vorschläge zum Stromsparen. Erkläre mit dem Zusammenhang zwischen Energie, Leistung und Zeit sowie mit den Daten der Tabelle, warum jeder Vorschlag den Verbrauch senkt.",
        },
        model: {
          tr: "Harcanan enerji E = P·t'dir. 1) En çok enerjiyi gücü büyük olan ısıtıcı harcıyor ({=e1/1000} kWh/gün); günlük kullanımını 1 saat azaltmak günde {=P1/1000} kWh tasarruf sağlar. 2) Çamaşır makinesini tam dolu çalıştırıp kullanım sayısını azaltmak süreyi kısaltır; 3) Gücü küçük LED lambalar kullanmak aynı sürede daha az enerji harcar. Gücü veya süreyi azaltan her önlem tüketimi azaltır.",
          en: "Energy used is E = P·t. 1) The heater, with the highest power, uses the most energy ({=e1/1000} kWh/day); using it 1 hour less per day saves {=P1/1000} kWh daily. 2) Running the washing machine only when full reduces the time it runs. 3) Low-power LED lamps use less energy for the same time. Any measure that lowers the power or the time lowers consumption.",
          de: "Die verbrauchte Energie ist E = P·t. 1) Der Heizlüfter mit der größten Leistung verbraucht am meisten ({=e1/1000} kWh/Tag); eine Stunde weniger pro Tag spart täglich {=P1/1000} kWh. 2) Die Waschmaschine nur voll beladen laufen lassen verkürzt die Laufzeit. 3) LED-Lampen mit kleiner Leistung verbrauchen in derselben Zeit weniger Energie. Jede Maßnahme, die Leistung oder Zeit verringert, senkt den Verbrauch.",
        },
        rubric: [
          { points: 1, text: { tr: "Uygulanabilir birinci öneriyi yazar.", en: "Gives a first practical suggestion.", de: "Nennt einen ersten umsetzbaren Vorschlag." } },
          { points: 1, text: { tr: "Uygulanabilir ikinci öneriyi yazar.", en: "Gives a second practical suggestion.", de: "Nennt einen zweiten umsetzbaren Vorschlag." } },
          { points: 1, text: { tr: "Önerileri E = P·t ilişkisiyle (gücü veya süreyi azaltma) gerekçelendirir.", en: "Justifies the suggestions with E = P·t (reducing power or time).", de: "Begründet die Vorschläge mit E = P·t (Leistung oder Zeit verringern)." } },
          { points: 1, text: { tr: "Gerekçesinde tablodaki verileri kullanır.", en: "Uses data from the table in the justification.", de: "Verwendet in der Begründung Daten aus der Tabelle." } },
        ],
      },
    ],
  });

  // --- Fizik bilimi ve ölçme: sarkaç periyodu --------------------------------------------------
  QB.add({
    id: "maarif-bilim-sarkac",
    subject: "fizik",
    topic: "bilim",
    grade: 9,
    level: 2,
    skills: ["deney", "veri", "hesap"],
    vars: {
      T: { values: [1.2, 1.4, 1.6, 1.8, 2] },
      e1: { values: [-0.3, -0.2, -0.1] },
      e2: { values: [0.1, 0.2, 0.3] },
      e3: "-(e1 + e2)",
      s1: "10 * T + e1",
      s2: "10 * T + e2",
      s3: "10 * T + e3",
    },
    where: "e3 != 0",
    text: {
      tr: "Bir öğrenci, basit bir sarkacın periyodunu bulmak için sarkacın <b>10 tam salınımının</b> süresini kronometreyle üç kez ölçüyor. Ölçümler tablodaki gibidir.",
      en: "To find the period of a simple pendulum, a student uses a stopwatch to time <b>10 complete swings</b> three times. The measurements are shown in the table.",
      de: "Um die Periodendauer eines Fadenpendels zu bestimmen, misst eine Schülerin dreimal mit der Stoppuhr die Zeit für <b>10 vollständige Schwingungen</b>. Die Messwerte stehen in der Tabelle.",
    },
    figure: (v, f) => {
      const s = f.svg(360, 82);
      s.add(f.table(10, 8, [140, 70, 70, 70], 32, [
        [f.t({ tr: "Ölçüm", en: "Trial", de: "Messung" }), "1", "2", "3"],
        [f.t({ tr: "10 salınım (s)", en: "10 swings (s)", de: "10 Schwingungen (s)" }), f.n(v.s1, 1), f.n(v.s2, 1), f.n(v.s3, 1)],
      ]));
      return s;
    },
    parts: [
      {
        kind: "number",
        points: 2,
        text: {
          tr: "Ölçümlere göre sarkacın periyodu kaç saniyedir?",
          en: "Based on the measurements, what is the period of the pendulum in seconds?",
          de: "Wie groß ist nach den Messungen die Periodendauer des Pendels in Sekunden?",
        },
        answer: "T",
        decimals: 2,
        unit: "s",
      },
      {
        kind: "text",
        text: {
          tr: "Öğrenci neden tek bir salınım yerine 10 salınımın süresini ölçmüştür?",
          en: "Why did the student time 10 swings instead of a single swing?",
          de: "Warum hat die Schülerin die Zeit für 10 Schwingungen statt für eine einzige gemessen?",
        },
        model: {
          tr: "Kronometreyi başlatıp durdururken tepki süresinden kaynaklanan bir hata oluşur ve bu hata her ölçümde yaklaşık aynı büyüklüktedir. 10 salınımın süresi ölçülüp 10'a bölündüğünde bu hata periyoda yalnızca onda biri kadar yansır; böylece bağıl hata küçülür ve sonuç daha güvenilir olur.",
          en: "Starting and stopping the stopwatch introduces a reaction-time error of roughly the same size in every measurement. When the time for 10 swings is divided by 10, this error affects the period only one tenth as much, so the relative error is smaller and the result more reliable.",
          de: "Beim Starten und Stoppen der Stoppuhr entsteht durch die Reaktionszeit ein Fehler, der bei jeder Messung etwa gleich groß ist. Wird die Zeit für 10 Schwingungen durch 10 geteilt, wirkt sich dieser Fehler nur zu einem Zehntel auf die Periodendauer aus; der relative Fehler wird kleiner und das Ergebnis zuverlässiger.",
        },
        rubric: [
          { points: 1, text: { tr: "Kronometreyle ölçümde tepki süresinden kaynaklanan bir hata olduğunu belirtir.", en: "States that timing with a stopwatch has a reaction-time error.", de: "Gibt an, dass beim Messen mit der Stoppuhr ein Reaktionszeitfehler entsteht." } },
          { points: 1, text: { tr: "Toplam süre 10'a bölününce bu hatanın periyot üzerindeki etkisinin küçüldüğünü açıklar.", en: "Explains that dividing the total time by 10 makes this error's effect on the period smaller.", de: "Erklärt, dass sich der Fehler durch Teilen der Gesamtzeit durch 10 weniger auf die Periodendauer auswirkt." } },
        ],
      },
      {
        kind: "text",
        text: {
          tr: "Ölçümün üç kez tekrarlanmasının amacı nedir?",
          en: "What is the purpose of repeating the measurement three times?",
          de: "Welchen Zweck hat es, die Messung dreimal zu wiederholen?",
        },
        model: {
          tr: "Her ölçümde rastgele hatalar oluşur. Ölçümü tekrarlayıp ortalamasını almak bu rastgele hataların etkisini azaltır. Ölçümler arasındaki fark ({=max(s1,s2,s3)-min(s1,s2,s3):1} s) da ölçümün belirsizliği hakkında bilgi verir.",
          en: "Every measurement contains random errors. Repeating the measurement and taking the mean reduces the effect of these random errors. The spread between the measurements ({=max(s1,s2,s3)-min(s1,s2,s3):1} s) also tells us about the uncertainty.",
          de: "Jede Messung enthält zufällige Fehler. Durch Wiederholen und Mittelwertbildung wird ihr Einfluss verringert. Die Streuung der Messwerte ({=max(s1,s2,s3)-min(s1,s2,s3):1} s) gibt außerdem Auskunft über die Messunsicherheit.",
        },
        rubric: [
          { points: 1, text: { tr: "Tekrarlanan ölçümlerin ortalamasının rastgele hataların etkisini azalttığını belirtir.", en: "States that averaging repeated measurements reduces the effect of random errors.", de: "Gibt an, dass der Mittelwert wiederholter Messungen zufällige Fehler verringert." } },
          { points: 1, text: { tr: "Ölçümler arasındaki farkın belirsizliği (güvenilirliği) gösterdiğini belirtir.", en: "States that the spread between measurements indicates the uncertainty (reliability).", de: "Gibt an, dass die Streuung der Messwerte die Unsicherheit (Zuverlässigkeit) zeigt." } },
        ],
      },
    ],
  });
})();
