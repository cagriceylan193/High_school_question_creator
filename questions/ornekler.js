// ÖRNEK ŞABLONLAR
// Bu dosya sistemin nasıl çalıştığını göstermek için var. Kendi sorularınız
// eklendikçe silinebilir. Şablon yazımı için README.md dosyasına bakın.

QB.add({
  id: "ornek-mat-denklem",
  subject: "matematik",
  grade: 9,
  vars: {
    a: { min: 2, max: 9 },
    x: { min: -10, max: 10 },
    b: { min: 1, max: 20 },
    c: "a*x + b",
  },
  where: "x != 0",
  answer: "x",
  distractors: ["-x", "x + 1", "x - 1", "c - b"],
  text: {
    tr: "{a}<i>x</i> + {b} = {c} denkleminde <i>x</i> kaçtır?",
    en: "Solve {a}<i>x</i> + {b} = {c} for <i>x</i>.",
    de: "Löse die Gleichung {a}<i>x</i> + {b} = {c} nach <i>x</i> auf.",
  },
});

QB.add({
  id: "ornek-fiz-yol",
  subject: "fizik",
  grade: 9,
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
  id: "ornek-kim-mol",
  subject: "kimya",
  grade: 10,
  vars: {
    m: { min: 4, max: 80, step: 4 },
  },
  answer: "m / 40",
  decimals: 1,
  unit: "mol",
  distractors: ["40 / m", "m / 20", "m / 80", "m / 23"],
  text: {
    tr: "{m} g NaOH kaç moldür? (Na = 23, O = 16, H = 1 g/mol)",
    en: "How many moles are in {m} g of NaOH? (Na = 23, O = 16, H = 1 g/mol)",
    de: "Wie viel Mol sind {m} g NaOH? (Na = 23, O = 16, H = 1 g/mol)",
  },
});

QB.add({
  id: "ornek-geo-pisagor",
  subject: "geometri",
  grade: 9,
  vars: {
    k: { min: 1, max: 5 },
    s: { values: [1, 2, 3, 4] },
    a: "k * pick(s, 3, 5, 8, 7)",
    b: "k * pick(s, 4, 12, 15, 24)",
    c: "k * pick(s, 5, 13, 17, 25)",
  },
  where: "c <= 75",
  answer: "c",
  unit: "cm",
  distractors: ["a + b", "c + k", "c - k", "b + k"],
  text: {
    tr: "Dik kenarları {a} cm ve {b} cm olan bir dik üçgenin hipotenüsü kaç cm'dir?",
    en: "A right triangle has legs of {a} cm and {b} cm. How long is its hypotenuse?",
    de: "Ein rechtwinkliges Dreieck hat Katheten von {a} cm und {b} cm. Wie lang ist die Hypotenuse?",
  },
});
