// FİZİK · Temel şablonlar
// level: 1 = kolay, 2 = orta, 3 = zor.
// Yer çekimi ivmesi g = 10 m/s² alınmıştır (lise konvansiyonu).
// Konu anahtarları (topic) i18n.js içindeki "topics" listesinde tanımlıdır.

// --- Madde ve özellikleri -----------------------------------------------------

QB.add({
  id: "fiz-madde-yogunluk",
  subject: "fizik",
  topic: "madde",
  grade: 9,
  level: 1,
  vars: {
    V: { min: 10, max: 50, step: 5 },
    d: { values: [0.8, 1.5, 2, 2.5, 2.7, 4, 7.8, 8.9] },
    m: "d * V",
  },
  answer: "d",
  decimals: 1,
  unit: "g/cm³",
  distractors: ["V / m", "d * 2", "d + 1", "m / (2 * V)"],
  text: {
    tr: "Kütlesi {m} g olan bir cismin hacmi {V} cm³'tür. Cismin yoğunluğu kaç g/cm³'tür?",
    en: "An object has a mass of {m} g and a volume of {V} cm³. What is its density in g/cm³?",
    de: "Ein Körper hat die Masse {m} g und das Volumen {V} cm³. Wie groß ist seine Dichte in g/cm³?",
  },
});

// --- Hareket ------------------------------------------------------------------

QB.add({
  id: "fiz-hareket-yol",
  subject: "fizik",
  topic: "hareket",
  grade: 9,
  level: 1,
  type: "open",
  vars: {
    ad: { type: "name" },
    v: { min: 40, max: 120, step: 20 },
    t: { min: 1, max: 5, step: 0.5 },
  },
  answer: "v * t",
  unit: "km",
  text: {
    tr: "{ad}, otomobiliyle {v} km/sa sabit hızla {t} saat yol alıyor. Bu sürede kaç km yol alır?",
    en: "{ad} drives at a constant {v} km/h for {t} hours. How many kilometres does {ad} travel?",
    de: "{ad} fährt {t} Stunden lang mit konstant {v} km/h. Wie viele Kilometer legt {ad} zurück?",
  },
});

QB.add({
  id: "fiz-hareket-ortalama-hiz",
  subject: "fizik",
  topic: "hareket",
  grade: 9,
  level: 2,
  vars: {
    x1: { min: 20, max: 120, step: 20 },
    x2: { min: 20, max: 120, step: 20 },
    t1: { min: 1, max: 4 },
    t2: { min: 1, max: 4 },
  },
  where: "(x1 + x2) % (t1 + t2) == 0",
  answer: "(x1 + x2) / (t1 + t2)",
  unit: { tr: "km/sa", en: "km/h", de: "km/h" },
  distractors: ["(x1 / t1 + x2 / t2) / 2", "x1 + x2", "(x1 + x2) / 2", "x1 / t1"],
  text: {
    tr: "Bir araç önce {x1} km yolu {t1} saatte, ardından {x2} km yolu {t2} saatte alıyor. Aracın tüm yolculuk boyunca ortalama hızı kaç km/sa'tir?",
    en: "A car first covers {x1} km in {t1} h, then {x2} km in {t2} h. What is its average speed for the whole trip in km/h?",
    de: "Ein Auto fährt zuerst {x1} km in {t1} h und danach {x2} km in {t2} h. Wie groß ist seine Durchschnittsgeschwindigkeit für die ganze Fahrt in km/h?",
  },
});

QB.add({
  id: "fiz-hareket-ivme",
  subject: "fizik",
  topic: "hareket",
  grade: 10,
  level: 1,
  vars: {
    a: { min: 1, max: 5 },
    t: { min: 2, max: 10 },
  },
  answer: "a * t",
  unit: "m/s",
  distractors: ["a * t * t / 2", "a + t", "a * t * t", "t / a"],
  text: {
    tr: "Durgun hâlden harekete geçen bir araç {a} m/s² sabit ivmeyle hızlanıyor. {t} saniye sonra aracın hızı kaç m/s olur?",
    en: "A car starts from rest and accelerates uniformly at {a} m/s². What is its speed after {t} seconds?",
    de: "Ein Auto fährt aus dem Stand los und beschleunigt gleichmäßig mit {a} m/s². Wie groß ist seine Geschwindigkeit nach {t} Sekunden?",
  },
});

QB.add({
  id: "fiz-hareket-ivmeli-yol",
  subject: "fizik",
  topic: "hareket",
  grade: 10,
  level: 2,
  vars: {
    a: { values: [2, 4, 6, 8] },
    t: { min: 2, max: 8 },
  },
  answer: "a * t^2 / 2",
  unit: "m",
  distractors: ["a * t^2", "a * t", "a * t / 2", "a * t^2 / 4"],
  text: {
    tr: "Durgun hâlden harekete geçen bir cisim {a} m/s² sabit ivmeyle {t} saniye hareket ediyor. Cisim bu sürede kaç metre yol alır?",
    en: "An object starts from rest and moves with a constant acceleration of {a} m/s² for {t} seconds. How far does it travel in metres?",
    de: "Ein Körper startet aus der Ruhe und bewegt sich {t} Sekunden lang mit der konstanten Beschleunigung {a} m/s². Welche Strecke legt er in Metern zurück?",
  },
});

// --- Kuvvet ve Newton yasaları -----------------------------------------------

QB.add({
  id: "fiz-kuvvet-agirlik",
  subject: "fizik",
  topic: "kuvvet",
  grade: 9,
  level: 1,
  vars: {
    m: { min: 10, max: 100, step: 10 },
  },
  answer: "m * 10",
  unit: "N",
  distractors: ["m", "m / 10", "m + 10", "m * 100"],
  text: {
    tr: "Kütlesi {m} kg olan bir cismin Dünya üzerindeki ağırlığı kaç N'dir? (g = 10 m/s²)",
    en: "What is the weight on Earth of an object with a mass of {m} kg? (g = 10 m/s²)",
    de: "Wie groß ist die Gewichtskraft eines Körpers mit der Masse {m} kg auf der Erde? (g = 10 m/s²)",
  },
});

QB.add({
  id: "fiz-kuvvet-newton2",
  subject: "fizik",
  topic: "kuvvet",
  grade: 9,
  level: 1,
  vars: {
    m: { min: 2, max: 10 },
    a: { min: 1, max: 8 },
    F: "m * a",
  },
  answer: "a",
  unit: "m/s²",
  distractors: ["F * m", "F - m", "2 * a", "a + 1"],
  text: {
    tr: "Sürtünmesiz yatay bir düzlemde duran {m} kg kütleli bir cisme {F} N'luk yatay bir kuvvet uygulanıyor. Cismin ivmesi kaç m/s²'dir?",
    en: "A horizontal force of {F} N acts on a {m} kg object resting on a frictionless horizontal surface. What is the object's acceleration in m/s²?",
    de: "Auf einen Körper mit der Masse {m} kg, der auf einer reibungsfreien waagerechten Fläche liegt, wirkt eine waagerechte Kraft von {F} N. Wie groß ist seine Beschleunigung in m/s²?",
  },
});

QB.add({
  id: "fiz-kuvvet-net",
  subject: "fizik",
  topic: "kuvvet",
  grade: 9,
  level: 1,
  vars: {
    F1: { min: 10, max: 60, step: 5 },
    F2: { min: 5, max: 40, step: 5 },
  },
  where: "F1 > F2",
  answer: "F1 - F2",
  unit: "N",
  distractors: ["F1 + F2", "F1", "F2", "(F1 + F2) / 2"],
  text: {
    tr: "Bir kutu sağa doğru {F1} N, sola doğru {F2} N'luk iki kuvvetle çekiliyor. Kutuya etki eden net kuvvetin büyüklüğü kaç N'dir?",
    en: "A box is pulled to the right with a force of {F1} N and to the left with a force of {F2} N. What is the magnitude of the net force on the box?",
    de: "Eine Kiste wird mit {F1} N nach rechts und mit {F2} N nach links gezogen. Wie groß ist der Betrag der resultierenden Kraft auf die Kiste?",
  },
});

// --- İş ve enerji --------------------------------------------------------------

QB.add({
  id: "fiz-enerji-kinetik",
  subject: "fizik",
  topic: "enerji",
  grade: 9,
  level: 1,
  vars: {
    m: { min: 1, max: 10 },
    v: { min: 2, max: 10, step: 2 },
  },
  answer: "m * v^2 / 2",
  unit: "J",
  distractors: ["m * v", "m * v^2", "m * v / 2", "m * v^2 / 4"],
  text: {
    tr: "Kütlesi {m} kg olan bir cisim {v} m/s hızla hareket ediyor. Cismin kinetik enerjisi kaç J'dür?",
    en: "An object with a mass of {m} kg moves at {v} m/s. What is its kinetic energy in joules?",
    de: "Ein Körper mit der Masse {m} kg bewegt sich mit {v} m/s. Wie groß ist seine kinetische Energie in Joule?",
  },
});

QB.add({
  id: "fiz-enerji-potansiyel",
  subject: "fizik",
  topic: "enerji",
  grade: 9,
  level: 1,
  type: "open",
  vars: {
    m: { min: 1, max: 20 },
    h: { min: 2, max: 30 },
  },
  answer: "m * 10 * h",
  unit: "J",
  text: {
    tr: "Kütlesi {m} kg olan bir cisim yerden {h} m yüksekliğe çıkarılıyor. Cismin yere göre çekim potansiyel enerjisi kaç J olur? (g = 10 m/s²)",
    en: "An object with a mass of {m} kg is lifted {h} m above the ground. What is its gravitational potential energy relative to the ground in joules? (g = 10 m/s²)",
    de: "Ein Körper mit der Masse {m} kg wird {h} m über den Boden gehoben. Wie groß ist seine Lageenergie bezogen auf den Boden in Joule? (g = 10 m/s²)",
  },
});

QB.add({
  id: "fiz-enerji-is",
  subject: "fizik",
  topic: "enerji",
  grade: 9,
  level: 1,
  vars: {
    F: { min: 10, max: 100, step: 10 },
    x: { min: 2, max: 15 },
  },
  answer: "F * x",
  unit: "J",
  distractors: ["F + x", "F / x", "F * x / 2", "F * x * 10"],
  text: {
    tr: "Bir kutu, hareket yönünde uygulanan {F} N'luk sabit bir kuvvetle {x} m çekiliyor. Kuvvetin yaptığı iş kaç J'dür?",
    en: "A box is pulled {x} m by a constant force of {F} N acting in the direction of motion. How much work does the force do in joules?",
    de: "Eine Kiste wird mit einer konstanten Kraft von {F} N in Bewegungsrichtung {x} m weit gezogen. Wie viel Arbeit verrichtet die Kraft in Joule?",
  },
});

// --- Basınç ----------------------------------------------------------------------

QB.add({
  id: "fiz-basinc-kati",
  subject: "fizik",
  topic: "basinc",
  grade: 10,
  level: 1,
  vars: {
    A: { values: [0.5, 1, 2, 4] },
    P: { min: 100, max: 2000, step: 100 },
    F: "P * A",
  },
  answer: "P",
  unit: "Pa",
  distractors: ["F * A", "2 * P", "P / 2", "P + 100"],
  text: {
    tr: "Ağırlığı {F} N olan bir kutu, yere {A} m²'lik yüzeyiyle oturuyor. Kutunun yere uyguladığı basınç kaç Pa'dır?",
    en: "A box weighing {F} N rests on the floor on a face with an area of {A} m². What pressure does it exert on the floor in pascals?",
    de: "Eine Kiste mit der Gewichtskraft {F} N steht mit einer Fläche von {A} m² auf dem Boden. Welchen Druck übt sie in Pascal auf den Boden aus?",
  },
});

QB.add({
  id: "fiz-basinc-sivi",
  subject: "fizik",
  topic: "basinc",
  grade: 10,
  level: 1,
  vars: {
    h: { min: 1, max: 20 },
  },
  answer: "h * 10",
  unit: "kPa",
  distractors: ["h", "h * 100", "h * 5", "h * 20"],
  text: {
    tr: "Bir havuzda su yüzeyinden {h} m derinlikteki noktada suyun oluşturduğu basınç kaç kPa'dır? (d<sub>su</sub> = 1000 kg/m³, g = 10 m/s²)",
    en: "What pressure in kPa does the water exert at a depth of {h} m below the surface of a pool? (ρ<sub>water</sub> = 1000 kg/m³, g = 10 m/s²)",
    de: "Welchen Druck in kPa erzeugt das Wasser in einem Becken in {h} m Tiefe unter der Oberfläche? (ρ<sub>Wasser</sub> = 1000 kg/m³, g = 10 m/s²)",
  },
});

// --- Elektrik --------------------------------------------------------------------

QB.add({
  id: "fiz-elektrik-ohm",
  subject: "fizik",
  topic: "elektrik",
  grade: 10,
  level: 1,
  vars: {
    R: { min: 2, max: 20 },
    I: { values: [0.5, 1, 1.5, 2, 2.5, 3] },
  },
  answer: "I * R",
  decimals: 1,
  unit: "V",
  distractors: ["R / I", "I + R", "2 * I * R", "I * R / 2"],
  text: {
    tr: "Direnci {R} Ω olan bir iletkenden {I} A akım geçiyor. İletkenin uçları arasındaki potansiyel farkı kaç V'tur?",
    en: "A current of {I} A flows through a conductor with a resistance of {R} Ω. What is the potential difference across it in volts?",
    de: "Durch einen Leiter mit dem Widerstand {R} Ω fließt ein Strom von {I} A. Wie groß ist die Spannung zwischen seinen Enden in Volt?",
  },
});

QB.add({
  id: "fiz-elektrik-seri",
  subject: "fizik",
  topic: "elektrik",
  grade: 10,
  level: 2,
  vars: {
    R1: { min: 2, max: 10 },
    R2: { min: 2, max: 10 },
    I: { values: [0.5, 1, 1.5, 2, 2.5, 3, 4] },
    V: "I * (R1 + R2)",
  },
  answer: "I",
  decimals: 1,
  unit: "A",
  distractors: ["V / R1", "V / R2", "2 * I", "I + 1"],
  text: {
    tr: "{R1} Ω ve {R2} Ω'luk iki direnç seri bağlanıp {V} V'luk bir üretece bağlanıyor. Devreden geçen akım kaç A'dir?",
    en: "Two resistors of {R1} Ω and {R2} Ω are connected in series to a {V} V source. What current flows in the circuit in amperes?",
    de: "Zwei Widerstände von {R1} Ω und {R2} Ω sind in Reihe an eine Spannungsquelle mit {V} V angeschlossen. Wie groß ist die Stromstärke im Stromkreis in Ampere?",
  },
});
