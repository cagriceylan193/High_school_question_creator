// FİZİK · 11. ve 12. sınıf (AYT) çoktan seçmeli sorular
// Tüm sorular ve çözümler bu proje için özgün olarak yazılmıştır.
// level: 1 = kolay, 2 = orta, 3 = zor.  g = 10 m/s².  Gerekli yerlerde π = 3 alınır.
(function () {
  "use strict";
  const T = (tr, en, de) => ({ tr, en, de });
  const SINCOS = T(
    "(sin 37° = cos 53° = 0,6; sin 53° = cos 37° = 0,8; g = 10 m/s²)",
    "(sin 37° = cos 53° = 0.6; sin 53° = cos 37° = 0.8; g = 10 m/s²)",
    "(sin 37° = cos 53° = 0,6; sin 53° = cos 37° = 0,8; g = 10 m/s²)",
  );
  const add = (t) => QB.add({ subject: "fizik", ...t });

  // ===================== 11. sınıf: Kuvvet ve hareket =====================

  add({
    id: "fiz11-vektor-bileske", topic: "vektor", grade: 11, level: 1,
    vars: { k: { min: 1, max: 4 }, s: { values: [1, 2] }, a: "k * pick(s, 3, 5)", b: "k * pick(s, 4, 12)", c: "k * pick(s, 5, 13)" },
    answer: "c", unit: "N",
    distractors: ["a + b", "b - a", "(a + b) / 2", "c + k"],
    text: T(
      "Aynı noktaya etki eden F<sub>1</sub> = {a} N ve F<sub>2</sub> = {b} N büyüklüğündeki iki kuvvet arasındaki açı 90°'dir. Bu kuvvetlerin bileşkesinin büyüklüğü kaç N'dir?",
      "Two forces F<sub>1</sub> = {a} N and F<sub>2</sub> = {b} N act on the same point at 90° to each other. What is the magnitude of their resultant in newtons?",
      "Zwei Kräfte F<sub>1</sub> = {a} N und F<sub>2</sub> = {b} N greifen im selben Punkt unter 90° zueinander an. Wie groß ist der Betrag der resultierenden Kraft in Newton?"),
  });

  add({
    id: "fiz11-bagil-hiz", topic: "vektor", grade: 11, level: 1,
    vars: { vK: { values: [10, 15, 20, 25] }, vL: { values: [5, 10, 15, 20, 30] }, same: { values: [0, 1] } },
    where: "vK != vL",
    answer: "if(same, abs(vL - vK), vL + vK)", unit: "m/s",
    distractors: ["if(same, vL + vK, abs(vL - vK))", "vL", "vK", "(vK + vL) / 2"],
    text: T(
      "Doğrusal bir yolda K aracı {vK} m/s, L aracı {vL} m/s sabit hızlarla {if:same|aynı yönde|zıt yönlerde} gidiyor. K aracındaki bir gözlemci, L aracının hızının büyüklüğünü kaç m/s olarak ölçer?",
      "On a straight road car K moves at {vK} m/s and car L at {vL} m/s, {if:same|in the same direction|in opposite directions}. What speed does an observer in K measure for L, in m/s?",
      "Auf einer geraden Straße fährt Auto K mit {vK} m/s und Auto L mit {vL} m/s {if:same|in dieselbe Richtung|in entgegengesetzte Richtungen}. Welchen Geschwindigkeitsbetrag misst ein Beobachter in K für L, in m/s?"),
  });

  add({
    id: "fiz11-bagil-nehir", topic: "vektor", grade: 11, level: 2,
    vars: { vb: { values: [2, 3, 4, 5] }, va: { values: [1, 2, 3] }, L: { values: [60, 120, 180, 240] }, x: "va * L / vb" },
    where: "x == round(x)",
    answer: "x", unit: "m",
    distractors: ["L", "vb * L / va", "(va + vb) * L / vb", "x / 2"],
    text: T(
      "Genişliği {L} m olan bir nehirde akıntının hızı {va} m/s'dir. Suya göre hızı {vb} m/s olan bir yüzücü, kıyıya dik doğrultuda yüzmeye başlıyor. Yüzücü karşı kıyıya, tam karşısındaki noktadan kaç m uzağa çıkar?",
      "A river is {L} m wide and its current flows at {va} m/s. A swimmer whose speed relative to the water is {vb} m/s heads straight across, perpendicular to the bank. How far downstream from the point directly opposite does the swimmer land, in metres?",
      "Ein Fluss ist {L} m breit, die Strömung hat {va} m/s. Ein Schwimmer mit {vb} m/s relativ zum Wasser schwimmt senkrecht zum Ufer los. Wie viele Meter flussabwärts vom gegenüberliegenden Punkt kommt er an?"),
  });

  add({
    id: "fiz11-egik-duzlem", topic: "kuvvet", grade: 11, level: 3,
    vars: { s: { values: [1, 2] }, ang: "pick(s, 37, 53)", sn: "pick(s, 0.6, 0.8)", cs: "pick(s, 0.8, 0.6)", k: { values: [0.1, 0.2, 0.25, 0.5] }, a: "10 * (sn - k * cs)" },
    where: ["a > 0", "abs(a * 10 - round(a * 10)) < 0.000001"],
    answer: "a", unit: "m/s²",
    distractors: ["10 * sn", "10 * (sn + k * cs)", "10 * (cs - k * sn)", "10 * k * cs"],
    text: T(
      "Eğim açısı {ang}° olan bir eğik düzlemin üzerinde serbest bırakılan blok aşağı doğru kayıyor. Blok ile düzlem arasındaki kinetik sürtünme katsayısı {k} olduğuna göre bloğun ivmesi kaç m/s²'dir? " + SINCOS.tr,
      "A block released on an incline of {ang}° slides down. The coefficient of kinetic friction between block and incline is {k}. What is the block's acceleration in m/s²? " + SINCOS.en,
      "Ein auf einer schiefen Ebene mit {ang}° Neigung losgelassener Klotz gleitet hinab. Die Gleitreibungszahl beträgt {k}. Wie groß ist seine Beschleunigung in m/s²? " + SINCOS.de),
  });

  add({
    id: "fiz11-atwood", topic: "kuvvet", grade: 11, level: 2,
    vars: { m1: { min: 2, max: 8 }, m2: { min: 1, max: 7 }, a: "10 * (m1 - m2) / (m1 + m2)" },
    where: ["m1 > m2", "abs(a * 10 - round(a * 10)) < 0.000001"],
    answer: "a", unit: "m/s²",
    distractors: ["10 * (m1 - m2) / m1", "10 * (m1 - m2) / m2", "10 * m2 / (m1 + m2)", "10"],
    text: T(
      "Ağırlığı ve sürtünmesi önemsiz bir makaradan geçen ipin uçlarına {m1} kg ve {m2} kg kütleli cisimler asılıp serbest bırakılıyor. Cisimlerin ivmesinin büyüklüğü kaç m/s²'dir? (g = 10 m/s²)",
      "Masses of {m1} kg and {m2} kg hang from the ends of a string over a light, frictionless pulley and are released. What is the magnitude of their acceleration in m/s²? (g = 10 m/s²)",
      "An den Enden eines Fadens über einer leichten, reibungsfreien Rolle hängen Massen von {m1} kg und {m2} kg und werden losgelassen. Wie groß ist der Betrag ihrer Beschleunigung in m/s²? (g = 10 m/s²)"),
  });

  add({
    id: "fiz11-yatay-atis", topic: "atis", grade: 11, level: 2,
    vars: { t: { values: [1, 2, 3, 4] }, h: "5 * t * t", v0: { values: [5, 10, 15, 20, 25] } },
    answer: "v0 * t", unit: "m",
    distractors: ["v0 * h / 10", "2 * v0 * t", "h", "v0 * t / 2"],
    text: T(
      "Yerden {h} m yükseklikten {v0} m/s hızla yatay olarak atılan bir cisim, atıldığı noktanın tam altındaki yer noktasından kaç m uzağa düşer? (Hava direnci önemsiz, g = 10 m/s²)",
      "An object is thrown horizontally at {v0} m/s from a height of {h} m. How far from the point directly below the launch point does it land, in metres? (Air resistance negligible, g = 10 m/s²)",
      "Ein Körper wird aus {h} m Höhe mit {v0} m/s waagerecht geworfen. Wie weit vom Fußpunkt unter der Abwurfstelle landet er, in Metern? (Luftwiderstand vernachlässigbar, g = 10 m/s²)"),
  });

  add({
    id: "fiz11-dusey-atis", topic: "atis", grade: 11, level: 1,
    vars: { v0: { values: [10, 15, 20, 25, 30, 40] } },
    answer: "2 * v0 / 10", unit: "s",
    distractors: ["v0 / 10", "v0 / 20", "v0 * v0 / 20", "4 * v0 / 10"],
    text: T(
      "Yerden düşey yukarı doğru {v0} m/s hızla atılan bir top kaç saniye sonra yere geri düşer? (Hava direnci önemsiz, g = 10 m/s²)",
      "A ball is thrown vertically upwards from the ground at {v0} m/s. After how many seconds does it land again? (Air resistance negligible, g = 10 m/s²)",
      "Ein Ball wird vom Boden mit {v0} m/s senkrecht nach oben geworfen. Nach wie vielen Sekunden landet er wieder? (Luftwiderstand vernachlässigbar, g = 10 m/s²)"),
  });

  add({
    id: "fiz11-egik-atis-hmax", topic: "atis", grade: 11, level: 2,
    vars: { s: { values: [1, 2] }, ang: "pick(s, 37, 53)", sn: "pick(s, 0.6, 0.8)", cs: "pick(s, 0.8, 0.6)", v0: { values: [10, 20, 30, 40, 50] }, vy: "v0 * sn", h: "vy * vy / 20" },
    answer: "h", unit: "m",
    distractors: ["v0 * v0 / 20", "vy * vy / 10", "(v0 * cs) ^ 2 / 20", "vy * vy / 40"],
    text: T(
      "Yerden, yatayla {ang}° açı yapacak biçimde {v0} m/s hızla atılan bir cisim en fazla kaç m yüksekliğe çıkar? (Hava direnci önemsiz) " + SINCOS.tr,
      "An object is launched from the ground at {v0} m/s at {ang}° above the horizontal. What is its maximum height in metres? (Air resistance negligible) " + SINCOS.en,
      "Ein Körper wird vom Boden mit {v0} m/s unter {ang}° zur Waagerechten abgeworfen. Welche maximale Höhe in Metern erreicht er? (Luftwiderstand vernachlässigbar) " + SINCOS.de),
  });

  add({
    id: "fiz11-egik-atis-menzil", topic: "atis", grade: 11, level: 3,
    vars: { s: { values: [1, 2] }, ang: "pick(s, 37, 53)", sn: "pick(s, 0.6, 0.8)", cs: "pick(s, 0.8, 0.6)", v0: { values: [10, 20, 25, 30, 40, 50] }, vx: "v0 * cs", vy: "v0 * sn", R: "2 * vx * vy / 10" },
    answer: "R", unit: "m",
    distractors: ["vx * vy / 10", "v0 * v0 / 10", "4 * vx * vy / 10", "2 * vy * vy / 10"],
    text: T(
      "Yatay zeminden, yatayla {ang}° açı yapacak biçimde {v0} m/s hızla atılan bir cisim, atıldığı noktadan kaç m uzağa düşer? (Hava direnci önemsiz) " + SINCOS.tr,
      "An object is launched from level ground at {v0} m/s at {ang}° above the horizontal. How far from the launch point does it land, in metres? (Air resistance negligible) " + SINCOS.en,
      "Ein Körper wird vom ebenen Boden mit {v0} m/s unter {ang}° zur Waagerechten abgeworfen. In welcher Entfernung in Metern landet er? (Luftwiderstand vernachlässigbar) " + SINCOS.de),
  });

  add({
    id: "fiz11-surtunme-durma", topic: "enerji", grade: 11, level: 2,
    vars: { v0: { values: [4, 6, 8, 10, 12] }, k: { values: [0.2, 0.25, 0.4, 0.5] }, x: "v0 * v0 / (20 * k)" },
    where: "abs(x * 10 - round(x * 10)) < 0.000001",
    answer: "x", unit: "m",
    distractors: ["v0 * v0 / (10 * k)", "v0 / (10 * k)", "v0 * v0 * k / 20", "v0 * v0 / 20"],
    text: T(
      "Yatay zeminde {v0} m/s hızla kaymakta olan bir kutu ile zemin arasındaki kinetik sürtünme katsayısı {k}'dir. Kutu durana kadar kaç m yol alır? (g = 10 m/s²)",
      "A box slides across a horizontal floor at {v0} m/s; the coefficient of kinetic friction is {k}. How far does it slide before stopping, in metres? (g = 10 m/s²)",
      "Eine Kiste gleitet mit {v0} m/s über einen waagerechten Boden; die Gleitreibungszahl beträgt {k}. Welche Strecke in Metern legt sie bis zum Stillstand zurück? (g = 10 m/s²)"),
  });

  add({
    id: "fiz11-yay-hiz", topic: "enerji", grade: 11, level: 2,
    vars: { m: { values: [0.5, 1, 2] }, v: { values: [2, 3, 4, 5, 6, 8] }, x: { values: [0.1, 0.2, 0.4] }, k: "m * v * v / (x * x)" },
    where: "k == round(k)",
    answer: "v", unit: "m/s",
    distractors: ["v * v", "v / 2", "2 * v", "x * k / (10 * m)"],
    text: T(
      "Yay sabiti {k} N/m olan bir yay {x} m sıkıştırılıyor ve önüne {m} kg kütleli bir cisim konup serbest bırakılıyor. Sürtünmeler önemsiz olduğuna göre cisim yaydan kaç m/s hızla ayrılır?",
      "A spring with spring constant {k} N/m is compressed by {x} m, a {m} kg object is placed in front of it and released. Ignoring friction, with what speed does the object leave the spring, in m/s?",
      "Eine Feder mit der Federkonstante {k} N/m wird um {x} m zusammengedrückt; davor liegt ein Körper der Masse {m} kg, der losgelassen wird. Mit welcher Geschwindigkeit in m/s verlässt er die Feder (ohne Reibung)?"),
  });

  add({
    id: "fiz11-momentum-yapisma", topic: "momentum", grade: 11, level: 2,
    vars: { m1: { min: 1, max: 6 }, m2: { min: 1, max: 6 }, v1: { values: [4, 6, 8, 10, 12] }, v: "m1 * v1 / (m1 + m2)" },
    where: "abs(v * 10 - round(v * 10)) < 0.000001",
    answer: "v", unit: "m/s",
    distractors: ["v1 / 2", "m2 * v1 / (m1 + m2)", "v1", "m1 * v1 / m2"],
    text: T(
      "Sürtünmesiz yatay düzlemde {v1} m/s hızla giden {m1} kg kütleli K cismi, durmakta olan {m2} kg kütleli L cismine çarpıp ona yapışıyor. Çarpışmadan sonra cisimlerin ortak hızı kaç m/s olur?",
      "On a frictionless horizontal surface, object K ({m1} kg) moving at {v1} m/s hits object L ({m2} kg) at rest and sticks to it. What is their common speed after the collision, in m/s?",
      "Auf einer reibungsfreien waagerechten Fläche stößt Körper K ({m1} kg) mit {v1} m/s auf den ruhenden Körper L ({m2} kg) und bleibt an ihm haften. Wie groß ist ihre gemeinsame Geschwindigkeit danach in m/s?"),
  });

  add({
    id: "fiz11-itme-kuvvet", topic: "momentum", grade: 11, level: 3,
    vars: { m: { values: [0.2, 0.4, 0.5] }, v1: { values: [10, 15, 20] }, v2: { values: [5, 10, 15] }, dt: { values: [0.01, 0.02, 0.05, 0.1] }, F: "m * (v1 + v2) / dt" },
    where: "F == round(F)",
    answer: "F", unit: "N",
    distractors: ["m * abs(v1 - v2) / dt", "m * v1 / dt", "m * (v1 + v2) / (2 * dt)", "2 * m * (v1 + v2) / dt"],
    text: T(
      "Kütlesi {m} kg olan bir top duvara {v1} m/s hızla dik olarak çarpıyor ve {v2} m/s hızla geri dönüyor. Top duvara {dt} s değdiğine göre duvarın topa uyguladığı ortalama kuvvetin büyüklüğü kaç N'dir?",
      "A {m} kg ball hits a wall head-on at {v1} m/s and bounces back at {v2} m/s. The contact lasts {dt} s. What is the magnitude of the average force of the wall on the ball, in newtons?",
      "Ein Ball der Masse {m} kg trifft senkrecht mit {v1} m/s auf eine Wand und prallt mit {v2} m/s zurück. Die Berührung dauert {dt} s. Wie groß ist der Betrag der mittleren Kraft der Wand auf den Ball in Newton?"),
  });

  add({
    id: "fiz11-tork-tahterevalli", topic: "tork", grade: 11, level: 2,
    vars: { G1: { values: [200, 300, 400, 600] }, d1: { values: [1, 1.5, 2, 3] }, G2: { values: [200, 300, 400, 600] }, d2: "G1 * d1 / G2" },
    where: ["G1 != G2", "d2 <= 6", "abs(d2 * 100 - round(d2 * 100)) < 0.000001"],
    answer: "d2", decimals: 2, unit: "m",
    distractors: ["G2 * d1 / G1", "d1", "2 * d1", "(G1 + G2) * d1 / G2"],
    text: T(
      "Ağırlığı önemsiz bir tahterevallide, destek noktasının solunda ve desteğe {d1} m uzakta {G1} N ağırlığında bir çocuk oturuyor. {G2} N ağırlığındaki ikinci çocuk, tahterevallinin yatay dengede kalması için desteğin sağında, desteğe kaç m uzağa oturmalıdır?",
      "On a seesaw of negligible weight, a child weighing {G1} N sits {d1} m to the left of the pivot. How far to the right of the pivot must a second child weighing {G2} N sit for the seesaw to balance horizontally, in metres?",
      "Auf einer Wippe mit vernachlässigbarem Gewicht sitzt ein Kind mit {G1} N Gewichtskraft {d1} m links vom Drehpunkt. Wie weit rechts vom Drehpunkt in Metern muss ein zweites Kind mit {G2} N sitzen, damit die Wippe waagerecht im Gleichgewicht ist?"),
  });

  add({
    id: "fiz11-tork-anahtar", topic: "tork", grade: 11, level: 1,
    vars: { F: { values: [20, 40, 50, 80, 100] }, d: { values: [0.2, 0.25, 0.3, 0.4, 0.5] }, s: { values: [0, 1] }, ang: "if(s, 30, 90)", tau: "F * d * if(s, 0.5, 1)" },
    answer: "tau", unit: "N·m",
    distractors: ["F * d * if(s, 1, 0.5)", "F / d", "F * d / 4", "2 * F * d"],
    text: T(
      "Bir somun anahtarına, somunun merkezinden {d} m uzaktaki bir noktada, anahtarla {ang}° açı yapan {F} N büyüklüğünde bir kuvvet uygulanıyor. Kuvvetin somunun merkezine göre torkunun büyüklüğü kaç N·m'dir? (sin 30° = 0,5)",
      "A force of {F} N is applied to a spanner at a point {d} m from the centre of the nut, at {ang}° to the spanner. What is the magnitude of the torque about the centre of the nut, in N·m? (sin 30° = 0.5)",
      "Auf einen Schraubenschlüssel wirkt {d} m von der Mutternmitte entfernt eine Kraft von {F} N unter {ang}° zum Schlüssel. Wie groß ist der Betrag des Drehmoments bezüglich der Mutternmitte in N·m? (sin 30° = 0,5)"),
  });

  // ===================== 11. sınıf: Elektrik ve manyetizma =====================

  add({
    id: "fiz11-coulomb-oran", topic: "elektrikalan", grade: 11, level: 2,
    vars: { F: { values: [8, 12, 16, 24, 36, 48] }, a: { values: [2, 3] }, b: { values: [2, 4] }, n: { values: [2, 3, 4] }, F2: "F * a * b / (n * n)" },
    where: "abs(F2 * 10 - round(F2 * 10)) < 0.000001",
    answer: "F2", unit: "N",
    distractors: ["F * a * b / n", "F * a * b", "F * (a + b) / (n * n)", "F * a * b * n * n"],
    text: T(
      "Aralarında r uzaklığı bulunan q<sub>1</sub> ve q<sub>2</sub> noktasal yükleri birbirine {F} N büyüklüğünde elektriksel kuvvet uyguluyor. q<sub>1</sub> yükü {a} katına, q<sub>2</sub> yükü {b} katına ve aradaki uzaklık {n} katına çıkarılırsa yükler arasındaki kuvvetin büyüklüğü kaç N olur?",
      "Point charges q<sub>1</sub> and q<sub>2</sub> a distance r apart exert an electric force of {F} N on each other. If q<sub>1</sub> is multiplied by {a}, q<sub>2</sub> by {b} and the distance by {n}, what is the new force in newtons?",
      "Zwei Punktladungen q<sub>1</sub> und q<sub>2</sub> im Abstand r üben aufeinander eine Kraft von {F} N aus. Wie groß ist die Kraft in Newton, wenn q<sub>1</sub> mit {a}, q<sub>2</sub> mit {b} und der Abstand mit {n} multipliziert werden?"),
  });

  add({
    id: "fiz11-elektrik-alan", topic: "elektrikalan", grade: 11, level: 2,
    vars: { q: { values: [1, 2, 3, 4, 5, 6] }, r: { values: [1, 2, 3] }, E: "9000 * q / (r * r)" },
    where: "E == round(E)",
    answer: "E", unit: "N/C",
    distractors: ["9000 * q / r", "9000 * q", "4500 * q / (r * r)", "9000 * q / (2 * r)"],
    text: T(
      "{q} μC'lük noktasal bir yükün kendisinden {r} m uzaktaki bir noktada oluşturduğu elektrik alanın büyüklüğü kaç N/C'dir? (k = 9·10<sup>9</sup> N·m²/C²)",
      "What is the magnitude of the electric field produced by a {q} μC point charge at a distance of {r} m, in N/C? (k = 9·10<sup>9</sup> N·m²/C²)",
      "Wie groß ist der Betrag des elektrischen Feldes einer Punktladung von {q} μC im Abstand {r} m, in N/C? (k = 9·10<sup>9</sup> N·m²/C²)"),
  });

  add({
    id: "fiz11-potansiyel-is", topic: "elektrikalan", grade: 11, level: 2,
    vars: { q: { values: [2, 3, 4, 5, 6] }, VA: { values: [10, 20, 30, 40, 50] }, VB: { values: [-10, 0, 5, 15, 60] }, W: "q * (VA - VB)" },
    where: "VA != VB",
    answer: "W", unit: "μJ",
    distractors: ["q * (VB - VA)", "q * (VA + VB)", "q * VA", "q * VB"],
    text: T(
      "Bir elektrik alanda A noktasının potansiyeli {VA} V, B noktasının potansiyeli {VB} V'tur. +{q} μC'lük yük A'dan B'ye götürülürken elektriksel kuvvetin yaptığı iş kaç μJ'dür?",
      "In an electric field, point A is at {VA} V and point B at {VB} V. How much work in μJ does the electric force do when a +{q} μC charge moves from A to B?",
      "In einem elektrischen Feld hat Punkt A das Potenzial {VA} V und Punkt B {VB} V. Welche Arbeit in μJ verrichtet die elektrische Kraft, wenn eine Ladung von +{q} μC von A nach B gebracht wird?"),
  });

  add({
    id: "fiz11-sigac-enerji", topic: "elektrikalan", grade: 11, level: 2,
    vars: { C: { values: [2, 4, 5, 10] }, V: { values: [6, 10, 12, 20] } },
    answer: "C * V * V / 2", unit: "μJ",
    distractors: ["C * V * V", "C * V", "C * V / 2", "C * C * V / 2"],
    text: T(
      "Sığası {C} μF olan bir sığaç (kondansatör), {V} V'luk bir üretece bağlanarak tamamen yükleniyor. Sığaçta depolanan enerji kaç μJ'dür?",
      "A {C} μF capacitor is fully charged by connecting it to a {V} V source. How much energy is stored in it, in μJ?",
      "Ein Kondensator mit der Kapazität {C} μF wird an einer Spannungsquelle von {V} V vollständig geladen. Wie viel Energie in μJ ist darin gespeichert?"),
  });

  add({
    id: "fiz11-manyetik-kuvvet", topic: "manyetizma", grade: 11, level: 1,
    vars: { B: { values: [0.2, 0.4, 0.5, 0.8] }, I: { values: [2, 4, 5, 10] }, L: { values: [0.5, 1, 2] } },
    answer: "B * I * L", unit: "N",
    distractors: ["B * I / L", "I * L / B", "B * L", "2 * B * I * L"],
    text: T(
      "Büyüklüğü {B} T olan düzgün bir manyetik alana dik olarak yerleştirilmiş {L} m uzunluğundaki düz bir telden {I} A akım geçiyor. Tele etki eden manyetik kuvvetin büyüklüğü kaç N'dir?",
      "A straight wire {L} m long, perpendicular to a uniform magnetic field of {B} T, carries a current of {I} A. What is the magnitude of the magnetic force on the wire, in newtons?",
      "Ein gerader Draht der Länge {L} m liegt senkrecht in einem homogenen Magnetfeld von {B} T und führt einen Strom von {I} A. Wie groß ist der Betrag der magnetischen Kraft auf den Draht in Newton?"),
  });

  add({
    id: "fiz11-induksiyon", topic: "manyetizma", grade: 11, level: 3,
    vars: { B: { values: [0.2, 0.5, 1] }, L: { values: [0.5, 1, 2] }, v: { values: [2, 4, 5, 10] }, R: { values: [1, 2, 4, 5] }, I: "B * L * v / R" },
    where: "abs(I * 100 - round(I * 100)) < 0.000001",
    answer: "I", unit: "A",
    distractors: ["B * L * v", "B * L * v * R", "B * v / R", "B * L / R"],
    text: T(
      "Büyüklüğü {B} T olan düzgün manyetik alana dik konumdaki raylar üzerinde, {L} m uzunluğundaki iletken bir çubuk {v} m/s sabit hızla kaydırılıyor. Rayların uçları {R} Ω'luk bir dirençle birleştirildiğine göre devreden geçen akım kaç A'dir? (Çubuğun ve rayların direnci önemsiz)",
      "A conducting rod {L} m long slides at a constant {v} m/s on rails perpendicular to a uniform magnetic field of {B} T. The rails are connected by a {R} Ω resistor. What current flows in the circuit, in amperes? (Rod and rails have negligible resistance)",
      "Ein leitender Stab der Länge {L} m gleitet mit konstant {v} m/s auf Schienen senkrecht zu einem homogenen Magnetfeld von {B} T. Die Schienen sind über einen Widerstand von {R} Ω verbunden. Welcher Strom in Ampere fließt? (Widerstand von Stab und Schienen vernachlässigbar)"),
  });

  // ===================== 12. sınıf (yalnız AYT) =====================

  add({
    id: "fiz12-cembersel-kuvvet", topic: "cembersel", grade: 12, level: 1,
    vars: { m: { values: [0.5, 1, 2, 4] }, v: { values: [2, 3, 4, 6] }, r: { values: [0.5, 1, 2] } },
    answer: "m * v * v / r", unit: "N",
    distractors: ["m * v / r", "m * v * v * r", "m * v * v / (2 * r)", "m * v * v"],
    text: T(
      "Kütlesi {m} kg olan bir cisim, yarıçapı {r} m olan yatay bir çembersel yörüngede {v} m/s sabit süratle dolanıyor. Cisme etki eden merkezcil kuvvetin büyüklüğü kaç N'dir?",
      "A {m} kg object moves at a constant speed of {v} m/s on a horizontal circle of radius {r} m. What is the magnitude of the centripetal force on it, in newtons?",
      "Ein Körper der Masse {m} kg bewegt sich mit konstant {v} m/s auf einer waagerechten Kreisbahn mit dem Radius {r} m. Wie groß ist der Betrag der Zentripetalkraft in Newton?"),
  });

  add({
    id: "fiz12-cembersel-ivme", topic: "cembersel", grade: 12, level: 2,
    vars: { r: { values: [0.5, 1, 2, 3] }, T: { values: [1, 2, 3, 4] }, a: "36 * r / (T * T)" },
    where: "abs(a * 100 - round(a * 100)) < 0.000001",
    answer: "a", unit: "m/s²",
    distractors: ["6 * r / T", "36 * r / T", "6 * r / (T * T)", "36 * r * r / (T * T)"],
    text: T(
      "Yarıçapı {r} m olan çembersel yörüngede düzgün çembersel hareket yapan bir cismin periyodu {T} s'dir. Cismin merkezcil ivmesinin büyüklüğü kaç m/s²'dir? (π = 3)",
      "An object in uniform circular motion on a circle of radius {r} m has a period of {T} s. What is the magnitude of its centripetal acceleration in m/s²? (π = 3)",
      "Ein Körper bewegt sich gleichförmig auf einem Kreis mit dem Radius {r} m; die Umlaufdauer beträgt {T} s. Wie groß ist der Betrag seiner Zentripetalbeschleunigung in m/s²? (π = 3)"),
  });

  add({
    id: "fiz12-bhh-yay", topic: "bhh", grade: 12, level: 2,
    vars: { q: { values: [1, 2, 3, 4, 5] }, k: { values: [10, 20, 40, 100] }, m: "k * q * q / 100" },
    where: "m <= 10",
    answer: "6 * q / 10", unit: "s",
    distractors: ["3 * q / 10", "12 * q / 10", "6 * q * q / 100", "q / 10"],
    text: T(
      "Yay sabiti {k} N/m olan bir yayın ucuna {m} kg kütleli bir cisim bağlanıyor ve cisme sürtünmesiz yatay düzlemde basit harmonik hareket yaptırılıyor. Hareketin periyodu kaç s'dir? (π = 3)",
      "A {m} kg object attached to a spring with spring constant {k} N/m performs simple harmonic motion on a frictionless horizontal surface. What is the period in seconds? (π = 3)",
      "Ein Körper der Masse {m} kg schwingt an einer Feder mit der Federkonstante {k} N/m harmonisch auf einer reibungsfreien waagerechten Fläche. Wie groß ist die Periodendauer in Sekunden? (π = 3)"),
  });

  add({
    id: "fiz12-sarkac", topic: "bhh", grade: 12, level: 2,
    vars: { q: { values: [1, 2, 3, 4, 5] }, L: "q * q / 10" },
    answer: "6 * q / 10", unit: "s",
    distractors: ["3 * q / 10", "12 * q / 10", "6 * q * q / 100", "6 * q / 100"],
    text: T(
      "Boyu {L} m olan basit bir sarkaç küçük açılarla salınıyor. Sarkacın periyodu kaç s'dir? (g = 10 m/s², π = 3)",
      "A simple pendulum of length {L} m swings through small angles. What is its period in seconds? (g = 10 m/s², π = 3)",
      "Ein Fadenpendel der Länge {L} m schwingt mit kleinen Auslenkungen. Wie groß ist seine Periodendauer in Sekunden? (g = 10 m/s², π = 3)"),
  });

  add({
    id: "fiz12-fotoelektrik", topic: "modern", grade: 12, level: 2,
    vars: { Ef: { values: [4, 5, 6, 8, 10] }, W0: { values: [2, 2.5, 3, 3.5, 4.5] } },
    where: "Ef > W0",
    answer: "Ef - W0", decimals: 1, unit: "V",
    distractors: ["Ef + W0", "Ef", "W0", "(Ef - W0) / 2"],
    text: T(
      "Bağlanma enerjisi (eşik enerjisi) {W0} eV olan bir metal yüzeye, enerjisi {Ef} eV olan fotonlar düşürülüyor. Sökülen elektronları durdurmak için gereken kesme (durdurma) potansiyeli kaç V'tur?",
      "Photons of energy {Ef} eV fall on a metal surface whose work function is {W0} eV. What stopping potential, in volts, is needed to stop the emitted electrons?",
      "Photonen mit der Energie {Ef} eV treffen auf eine Metalloberfläche mit der Austrittsarbeit {W0} eV. Welche Gegenspannung in Volt ist nötig, um die herausgelösten Elektronen abzubremsen?"),
  });

  add({
    id: "fiz12-foton-enerji", topic: "modern", grade: 12, level: 1,
    vars: { lam: { values: [124, 155, 248, 310, 620] } },
    answer: "1240 / lam", unit: "eV",
    distractors: ["620 / lam", "2480 / lam", "1240 / lam + 1", "lam / 124"],
    text: T(
      "Dalga boyu {lam} nm olan bir fotonun enerjisi kaç eV'tur? (h·c = 1240 eV·nm)",
      "What is the energy, in eV, of a photon with a wavelength of {lam} nm? (h·c = 1240 eV·nm)",
      "Welche Energie in eV hat ein Photon mit der Wellenlänge {lam} nm? (h·c = 1240 eV·nm)"),
  });

  // ===================== Adım adım çözümler =====================
  QB.solve({
    "fiz11-vektor-bileske": {
      tr: ["Aralarındaki açı 90° olan iki vektörün bileşkesi Pisagor bağıntısıyla bulunur: R = √(F₁² + F₂²).", "R = √({a}² + {b}²) = √({=a*a} + {=b*b}) = √{=a*a+b*b}.", "R = {c} N.", "Dikkat: kuvvetler aynı yönde olsaydı {=a+b} N, zıt yönde olsaydı {=b-a} N olurdu; dik kuvvetlerde bileşke bu ikisinin arasındadır."],
      en: ["Two vectors at 90° add by Pythagoras: R = √(F₁² + F₂²).", "R = √({a}² + {b}²) = √({=a*a} + {=b*b}) = √{=a*a+b*b}.", "R = {c} N.", "Note: in the same direction it would be {=a+b} N, opposite {=b-a} N; perpendicular forces give a value in between."],
      de: ["Zwei Vektoren unter 90° addiert man mit dem Satz des Pythagoras: R = √(F₁² + F₂²).", "R = √({a}² + {b}²) = √({=a*a} + {=b*b}) = √{=a*a+b*b}.", "R = {c} N.", "Hinweis: Gleichgerichtet wären es {=a+b} N, entgegengesetzt {=b-a} N; senkrechte Kräfte liegen dazwischen."],
    },
    "fiz11-bagil-hiz": {
      tr: ["Bağıl hız: K'ye göre L'nin hızı v<sub>KL</sub> = v<sub>L</sub> − v<sub>K</sub> (vektörel çıkarma).", "{if:same|Araçlar aynı yönde gittiği için hızlar aynı işaretlidir; büyüklük {vL} ile {vK} farkıdır: {=abs(vL-vK)} m/s.|Araçlar zıt yönlerde gittiği için hızlar zıt işaretlidir: {vL} − (−{vK}) = {vL} + {vK} = {=vL+vK} m/s.}", "Gözlemcinin ölçtüğü hızın büyüklüğü {=if(same, abs(vL - vK), vL + vK)} m/s'dir."],
      en: ["Relative velocity: the velocity of L relative to K is v<sub>KL</sub> = v<sub>L</sub> − v<sub>K</sub> (vector subtraction).", "{if:same|They move in the same direction, so the velocities have the same sign; the magnitude is the difference of {vL} and {vK}: {=abs(vL-vK)} m/s.|They move in opposite directions, so the velocities have opposite signs: {vL} − (−{vK}) = {vL} + {vK} = {=vL+vK} m/s.}", "The observer measures a speed of {=if(same, abs(vL - vK), vL + vK)} m/s."],
      de: ["Relativgeschwindigkeit: Geschwindigkeit von L relativ zu K ist v<sub>KL</sub> = v<sub>L</sub> − v<sub>K</sub> (vektorielle Subtraktion).", "{if:same|Gleiche Richtung, also gleiche Vorzeichen; der Betrag ist die Differenz von {vL} und {vK}: {=abs(vL-vK)} m/s.|Entgegengesetzte Richtungen, also entgegengesetzte Vorzeichen: {vL} − (−{vK}) = {vL} + {vK} = {=vL+vK} m/s.}", "Der Beobachter misst {=if(same, abs(vL - vK), vL + vK)} m/s."],
    },
    "fiz11-bagil-nehir": {
      tr: ["Yüzücünün hareketi iki bağımsız hareketin birleşimidir: kıyıya dik {vb} m/s (suya göre) ve akıntı yönünde {va} m/s.", "Karşıya geçme süresi yalnız dik bileşene bağlıdır: t = {L} / {vb} = {=L/vb} s.", "Bu sürede akıntı yüzücüyü sürükler: x = v<sub>akıntı</sub> · t = {va} · {=L/vb} = {x} m."],
      en: ["The motion combines two independent motions: {vb} m/s across (relative to the water) and {va} m/s downstream.", "The crossing time depends only on the perpendicular component: t = {L} / {vb} = {=L/vb} s.", "Meanwhile the current carries the swimmer: x = v<sub>current</sub> · t = {va} · {=L/vb} = {x} m."],
      de: ["Die Bewegung setzt sich aus zwei unabhängigen Bewegungen zusammen: {vb} m/s quer (relativ zum Wasser) und {va} m/s flussabwärts.", "Die Überquerungszeit hängt nur von der Querkomponente ab: t = {L} / {vb} = {=L/vb} s.", "In dieser Zeit treibt die Strömung den Schwimmer ab: x = v<sub>Strömung</sub> · t = {va} · {=L/vb} = {x} m."],
    },
    "fiz11-egik-duzlem": {
      tr: ["Ağırlığı bileşenlerine ayıralım: düzleme paralel m·g·sin{ang}° (aşağı), düzleme dik m·g·cos{ang}°.", "Normal kuvvet N = m·g·cos{ang}° olduğundan sürtünme f<sub>s</sub> = k·m·g·cos{ang}° (yukarı, harekete zıt).", "Newton'un 2. yasası: m·a = m·g·sin{ang}° − k·m·g·cos{ang}° → a = g·(sin{ang}° − k·cos{ang}°) (kütle sadeleşir).", "a = 10 · ({sn} − {k} · {cs}) = 10 · {=sn-k*cs:3} = {a} m/s²."],
      en: ["Resolve the weight: parallel to the incline m·g·sin{ang}° (down the slope), perpendicular m·g·cos{ang}°.", "Normal force N = m·g·cos{ang}°, so friction f<sub>k</sub> = μ·m·g·cos{ang}° (up the slope, opposing motion).", "Newton's second law: m·a = m·g·sin{ang}° − μ·m·g·cos{ang}° → a = g·(sin{ang}° − μ·cos{ang}°) (mass cancels).", "a = 10 · ({sn} − {k} · {cs}) = 10 · {=sn-k*cs:3} = {a} m/s²."],
      de: ["Gewichtskraft zerlegen: hangabwärts m·g·sin{ang}°, senkrecht zur Ebene m·g·cos{ang}°.", "Normalkraft F<sub>N</sub> = m·g·cos{ang}°, also Reibung F<sub>R</sub> = μ·m·g·cos{ang}° (hangaufwärts, gegen die Bewegung).", "Zweites newtonsches Gesetz: m·a = m·g·sin{ang}° − μ·m·g·cos{ang}° → a = g·(sin{ang}° − μ·cos{ang}°) (Masse kürzt sich).", "a = 10 · ({sn} − {k} · {cs}) = 10 · {=sn-k*cs:3} = {a} m/s²."],
    },
    "fiz11-atwood": {
      tr: ["Sistemi hareket ettiren net kuvvet, ağırlıklar farkıdır: F<sub>net</sub> = ({m1} − {m2}) · 10 = {=(m1-m2)*10} N.", "Bu kuvvet iki kütleyi birlikte hızlandırır: toplam kütle {m1} + {m2} = {=m1+m2} kg.", "a = F<sub>net</sub> / m<sub>toplam</sub> = {=(m1-m2)*10} / {=m1+m2} = {a} m/s².", "Ek bilgi: ipteki gerilme T = {m2} · (10 + {a}) = {=m2*(10+a):2} N olur."],
      en: ["The net driving force is the difference of the weights: F<sub>net</sub> = ({m1} − {m2}) · 10 = {=(m1-m2)*10} N.", "It accelerates both masses together: total mass {m1} + {m2} = {=m1+m2} kg.", "a = F<sub>net</sub> / m<sub>total</sub> = {=(m1-m2)*10} / {=m1+m2} = {a} m/s².", "Extra: the string tension is T = {m2} · (10 + {a}) = {=m2*(10+a):2} N."],
      de: ["Die antreibende resultierende Kraft ist die Differenz der Gewichtskräfte: F<sub>res</sub> = ({m1} − {m2}) · 10 = {=(m1-m2)*10} N.", "Sie beschleunigt beide Massen gemeinsam: Gesamtmasse {m1} + {m2} = {=m1+m2} kg.", "a = F<sub>res</sub> / m<sub>ges</sub> = {=(m1-m2)*10} / {=m1+m2} = {a} m/s².", "Zusatz: Fadenkraft F<sub>S</sub> = {m2} · (10 + {a}) = {=m2*(10+a):2} N."],
    },
    "fiz11-yatay-atis": {
      tr: ["Yatay atışta düşey hareket serbest düşmedir, yatay hareket sabit hızlıdır; ikisi aynı sürede olur.", "Düşme süresi: h = ½·g·t² → t = √(2h/g) = √(2 · {h} / 10) = √{=h/5} = {t} s.", "Yatay uzaklık: x = v<sub>0</sub> · t = {v0} · {t} = {=v0*t} m."],
      en: ["In horizontal projection the vertical motion is free fall and the horizontal motion has constant velocity; both last the same time.", "Fall time: h = ½·g·t² → t = √(2h/g) = √(2 · {h} / 10) = √{=h/5} = {t} s.", "Horizontal distance: x = v<sub>0</sub> · t = {v0} · {t} = {=v0*t} m."],
      de: ["Beim waagerechten Wurf ist die senkrechte Bewegung ein freier Fall, die waagerechte gleichförmig; beide dauern gleich lang.", "Fallzeit: h = ½·g·t² → t = √(2h/g) = √(2 · {h} / 10) = √{=h/5} = {t} s.", "Wurfweite: x = v<sub>0</sub> · t = {v0} · {t} = {=v0*t} m."],
    },
    "fiz11-dusey-atis": {
      tr: ["Yukarı çıkarken hız her saniye 10 m/s azalır: v = v<sub>0</sub> − g·t.", "Tepe noktasında v = 0: t<sub>çıkış</sub> = {v0} / 10 = {=v0/10} s.", "Hava direnci yokken iniş süresi çıkış süresine eşittir; toplam süre t = 2 · {=v0/10} = {=2*v0/10} s.", "Ek bilgi: çıkabileceği en büyük yükseklik h = v<sub>0</sub>² / 2g = {=v0*v0/20} m."],
      en: ["Going up, the speed drops by 10 m/s every second: v = v<sub>0</sub> − g·t.", "At the top v = 0: t<sub>up</sub> = {v0} / 10 = {=v0/10} s.", "Without air resistance the fall takes as long as the rise; total time t = 2 · {=v0/10} = {=2*v0/10} s.", "Extra: maximum height h = v<sub>0</sub>² / 2g = {=v0*v0/20} m."],
      de: ["Beim Steigen nimmt die Geschwindigkeit pro Sekunde um 10 m/s ab: v = v<sub>0</sub> − g·t.", "Im höchsten Punkt v = 0: t<sub>Steig</sub> = {v0} / 10 = {=v0/10} s.", "Ohne Luftwiderstand dauert der Fall so lange wie der Aufstieg; Gesamtzeit t = 2 · {=v0/10} = {=2*v0/10} s.", "Zusatz: maximale Höhe h = v<sub>0</sub>² / 2g = {=v0*v0/20} m."],
    },
    "fiz11-egik-atis-hmax": {
      tr: ["İlk hızı bileşenlerine ayıralım: düşey v<sub>y</sub> = v<sub>0</sub>·sin{ang}° = {v0} · {sn} = {vy} m/s, yatay v<sub>x</sub> = {v0} · {cs} = {=v0*cs} m/s.", "Yüksekliği yalnız düşey bileşen belirler; tepe noktasında v<sub>y</sub> = 0 olur.", "h<sub>max</sub> = v<sub>y</sub>² / 2g = {vy}² / 20 = {=vy*vy} / 20 = {h} m."],
      en: ["Resolve the initial velocity: vertical v<sub>y</sub> = v<sub>0</sub>·sin{ang}° = {v0} · {sn} = {vy} m/s, horizontal v<sub>x</sub> = {v0} · {cs} = {=v0*cs} m/s.", "Only the vertical component determines the height; at the top v<sub>y</sub> = 0.", "h<sub>max</sub> = v<sub>y</sub>² / 2g = {vy}² / 20 = {=vy*vy} / 20 = {h} m."],
      de: ["Anfangsgeschwindigkeit zerlegen: senkrecht v<sub>y</sub> = v<sub>0</sub>·sin{ang}° = {v0} · {sn} = {vy} m/s, waagerecht v<sub>x</sub> = {v0} · {cs} = {=v0*cs} m/s.", "Die Höhe hängt nur von der senkrechten Komponente ab; im Scheitel ist v<sub>y</sub> = 0.", "h<sub>max</sub> = v<sub>y</sub>² / 2g = {vy}² / 20 = {=vy*vy} / 20 = {h} m."],
    },
    "fiz11-egik-atis-menzil": {
      tr: ["Bileşenler: v<sub>x</sub> = {v0} · {cs} = {vx} m/s, v<sub>y</sub> = {v0} · {sn} = {vy} m/s.", "Uçuş süresi (çıkış + iniş): t = 2·v<sub>y</sub> / g = 2 · {vy} / 10 = {=2*vy/10} s.", "Yatayda hız sabittir: menzil R = v<sub>x</sub> · t = {vx} · {=2*vy/10} = {R} m."],
      en: ["Components: v<sub>x</sub> = {v0} · {cs} = {vx} m/s, v<sub>y</sub> = {v0} · {sn} = {vy} m/s.", "Flight time (up + down): t = 2·v<sub>y</sub> / g = 2 · {vy} / 10 = {=2*vy/10} s.", "Horizontal velocity is constant: range R = v<sub>x</sub> · t = {vx} · {=2*vy/10} = {R} m."],
      de: ["Komponenten: v<sub>x</sub> = {v0} · {cs} = {vx} m/s, v<sub>y</sub> = {v0} · {sn} = {vy} m/s.", "Flugzeit (Steigen + Fallen): t = 2·v<sub>y</sub> / g = 2 · {vy} / 10 = {=2*vy/10} s.", "Waagerecht ist die Geschwindigkeit konstant: Wurfweite R = v<sub>x</sub> · t = {vx} · {=2*vy/10} = {R} m."],
    },
    "fiz11-surtunme-durma": {
      tr: ["İş–enerji teoremi: sürtünme kuvvetinin yaptığı iş, kinetik enerjideki değişime eşittir.", "Sürtünme kuvveti f = k·m·g; durana kadar yaptığı iş −f·x, kinetik enerji ½·m·v<sub>0</sub>²'den 0'a iner.", "k·m·g·x = ½·m·v<sub>0</sub>² → x = v<sub>0</sub>² / (2·k·g) (kütle sadeleşir).", "x = {v0}² / (2 · {k} · 10) = {=v0*v0} / {=20*k} = {x} m."],
      en: ["Work–energy theorem: the work done by friction equals the change in kinetic energy.", "Friction f = μ·m·g does work −f·x until the box stops; kinetic energy goes from ½·m·v<sub>0</sub>² to 0.", "μ·m·g·x = ½·m·v<sub>0</sub>² → x = v<sub>0</sub>² / (2·μ·g) (mass cancels).", "x = {v0}² / (2 · {k} · 10) = {=v0*v0} / {=20*k} = {x} m."],
      de: ["Arbeitssatz: Die Arbeit der Reibung ist gleich der Änderung der kinetischen Energie.", "Die Reibung F<sub>R</sub> = μ·m·g verrichtet bis zum Stillstand die Arbeit −F<sub>R</sub>·x; E<sub>kin</sub> sinkt von ½·m·v<sub>0</sub>² auf 0.", "μ·m·g·x = ½·m·v<sub>0</sub>² → x = v<sub>0</sub>² / (2·μ·g) (Masse kürzt sich).", "x = {v0}² / (2 · {k} · 10) = {=v0*v0} / {=20*k} = {x} m."],
    },
    "fiz11-yay-hiz": {
      tr: ["Sürtünme olmadığı için yayın esneklik potansiyel enerjisi tamamen kinetik enerjiye dönüşür.", "½·k·x² = ½·m·v² → v = x·√(k/m).", "Yay enerjisi: ½ · {k} · {x}² = {=k*x*x/2} J.", "v = {x} · √({k} / {m}) = {x} · √{=k/m} = {v} m/s."],
      en: ["Without friction the elastic potential energy of the spring turns completely into kinetic energy.", "½·k·x² = ½·m·v² → v = x·√(k/m).", "Spring energy: ½ · {k} · {x}² = {=k*x*x/2} J.", "v = {x} · √({k} / {m}) = {x} · √{=k/m} = {v} m/s."],
      de: ["Ohne Reibung wird die Spannenergie der Feder vollständig zu Bewegungsenergie.", "½·k·x² = ½·m·v² → v = x·√(k/m).", "Spannenergie: ½ · {k} · {x}² = {=k*x*x/2} J.", "v = {x} · √({k} / {m}) = {x} · √{=k/m} = {v} m/s."],
    },
    "fiz11-momentum-yapisma": {
      tr: ["Dış kuvvet olmadığı için çarpışmada çizgisel momentum korunur.", "Önce: p = {m1} · {v1} + {m2} · 0 = {=m1*v1} kg·m/s.", "Sonra cisimler yapışık hareket eder: p = ({m1} + {m2}) · v.", "v = {=m1*v1} / {=m1+m2} = {v} m/s.", "Not: Bu esnek olmayan bir çarpışmadır; kinetik enerji {=m1*v1*v1/2} J'den {=(m1+m2)*v*v/2:2} J'e düşer, momentum ise korunur."],
      en: ["No external force acts, so linear momentum is conserved in the collision.", "Before: p = {m1} · {v1} + {m2} · 0 = {=m1*v1} kg·m/s.", "After, the objects move together: p = ({m1} + {m2}) · v.", "v = {=m1*v1} / {=m1+m2} = {v} m/s.", "Note: this collision is inelastic; kinetic energy drops from {=m1*v1*v1/2} J to {=(m1+m2)*v*v/2:2} J, while momentum is conserved."],
      de: ["Es wirkt keine äußere Kraft, also bleibt der Impuls erhalten.", "Vorher: p = {m1} · {v1} + {m2} · 0 = {=m1*v1} kg·m/s.", "Nachher bewegen sich die Körper gemeinsam: p = ({m1} + {m2}) · v.", "v = {=m1*v1} / {=m1+m2} = {v} m/s.", "Hinweis: Der Stoß ist unelastisch; die kinetische Energie sinkt von {=m1*v1*v1/2} J auf {=(m1+m2)*v*v/2:2} J, der Impuls bleibt erhalten."],
    },
    "fiz11-itme-kuvvet": {
      tr: ["Duvara doğru yönü pozitif alalım: ilk hız +{v1} m/s, son hız −{v2} m/s (yön değişti!).", "Momentum değişimi: Δp = m·(v<sub>son</sub> − v<sub>ilk</sub>) = {m} · (−{v2} − {v1}) = −{=m*(v1+v2)} kg·m/s; büyüklüğü {=m*(v1+v2)} kg·m/s.", "İtme = momentum değişimi: F<sub>ort</sub> · Δt = |Δp|.", "F<sub>ort</sub> = {=m*(v1+v2)} / {dt} = {F} N.", "Sık hata: hızları çıkarmak ({=abs(v1-v2)}) yanlıştır; top geri döndüğü için hızların büyüklükleri toplanır."],
      en: ["Take the direction towards the wall as positive: initial velocity +{v1} m/s, final −{v2} m/s (the direction reversed!).", "Change in momentum: Δp = m·(v<sub>final</sub> − v<sub>initial</sub>) = {m} · (−{v2} − {v1}) = −{=m*(v1+v2)} kg·m/s; magnitude {=m*(v1+v2)} kg·m/s.", "Impulse = change in momentum: F<sub>avg</sub> · Δt = |Δp|.", "F<sub>avg</sub> = {=m*(v1+v2)} / {dt} = {F} N.", "Common mistake: subtracting the speeds ({=abs(v1-v2)}) is wrong; the ball reverses, so the magnitudes add."],
      de: ["Richtung zur Wand positiv: Anfangsgeschwindigkeit +{v1} m/s, Endgeschwindigkeit −{v2} m/s (Richtungsumkehr!).", "Impulsänderung: Δp = m·(v<sub>end</sub> − v<sub>anf</sub>) = {m} · (−{v2} − {v1}) = −{=m*(v1+v2)} kg·m/s; Betrag {=m*(v1+v2)} kg·m/s.", "Kraftstoß = Impulsänderung: F<sub>m</sub> · Δt = |Δp|.", "F<sub>m</sub> = {=m*(v1+v2)} / {dt} = {F} N.", "Typischer Fehler: Die Geschwindigkeiten zu subtrahieren ({=abs(v1-v2)}) ist falsch; der Ball kehrt um, die Beträge addieren sich."],
    },
    "fiz11-tork-tahterevalli": {
      tr: ["Dönme dengesi için destek noktasına göre torkların toplamı sıfır olmalıdır.", "Soldaki çocuğun torku: {G1} · {d1} = {=G1*d1} N·m (bir yönde); sağdaki: {G2} · d<sub>2</sub> (öbür yönde).", "{G1} · {d1} = {G2} · d<sub>2</sub> → d<sub>2</sub> = {=G1*d1} / {G2} = {d2:2} m.", "Yorum: ağır olan çocuk desteğe daha yakın oturur."],
      en: ["For rotational equilibrium the torques about the pivot must add to zero.", "Left child's torque: {G1} · {d1} = {=G1*d1} N·m (one way); right child's: {G2} · d<sub>2</sub> (the other way).", "{G1} · {d1} = {G2} · d<sub>2</sub> → d<sub>2</sub> = {=G1*d1} / {G2} = {d2:2} m.", "Interpretation: the heavier child sits closer to the pivot."],
      de: ["Für das Drehgleichgewicht muss die Summe der Drehmomente um den Drehpunkt null sein.", "Linkes Kind: {G1} · {d1} = {=G1*d1} N·m (eine Richtung); rechtes Kind: {G2} · d<sub>2</sub> (andere Richtung).", "{G1} · {d1} = {G2} · d<sub>2</sub> → d<sub>2</sub> = {=G1*d1} / {G2} = {d2:2} m.", "Deutung: Das schwerere Kind sitzt näher am Drehpunkt."],
    },
    "fiz11-tork-anahtar": {
      tr: ["Tork, kuvvetin döndürme etkisidir: τ = F · d · sinθ (θ: kuvvet ile kol arasındaki açı).", "{if:s|θ = 30° → sin 30° = 0,5.|θ = 90° → sin 90° = 1 (kuvvet kola dik; tork en büyük).}", "τ = {F} · {d} · {=if(s, 0.5, 1)} = {tau} N·m."],
      en: ["Torque is the turning effect of a force: τ = F · d · sinθ (θ: angle between force and lever arm).", "{if:s|θ = 30° → sin 30° = 0.5.|θ = 90° → sin 90° = 1 (force perpendicular to the arm; maximum torque).}", "τ = {F} · {d} · {=if(s, 0.5, 1)} = {tau} N·m."],
      de: ["Das Drehmoment ist die Drehwirkung einer Kraft: M = F · d · sinθ (θ: Winkel zwischen Kraft und Hebelarm).", "{if:s|θ = 30° → sin 30° = 0,5.|θ = 90° → sin 90° = 1 (Kraft senkrecht zum Hebel; größtes Drehmoment).}", "M = {F} · {d} · {=if(s, 0.5, 1)} = {tau} N·m."],
    },
    "fiz11-coulomb-oran": {
      tr: ["Coulomb yasası: F = k · q₁ · q₂ / r². Kuvvet yüklerin çarpımıyla doğru, uzaklığın karesiyle ters orantılıdır.", "Yükler {a} ve {b} katına çıkınca kuvvet {a} · {b} = {=a*b} katına çıkar.", "Uzaklık {n} katına çıkınca kuvvet {n}² = {=n*n} katına iner.", "F' = {F} · {=a*b} / {=n*n} = {F2} N."],
      en: ["Coulomb's law: F = k · q₁ · q₂ / r². The force is proportional to the product of the charges and inversely proportional to the square of the distance.", "Multiplying the charges by {a} and {b} multiplies the force by {a} · {b} = {=a*b}.", "Multiplying the distance by {n} divides the force by {n}² = {=n*n}.", "F' = {F} · {=a*b} / {=n*n} = {F2} N."],
      de: ["Coulomb-Gesetz: F = k · q₁ · q₂ / r². Die Kraft ist proportional zum Produkt der Ladungen und umgekehrt proportional zum Quadrat des Abstands.", "Faktoren {a} und {b} bei den Ladungen vervielfachen die Kraft mit {a} · {b} = {=a*b}.", "Der {n}-fache Abstand teilt die Kraft durch {n}² = {=n*n}.", "F' = {F} · {=a*b} / {=n*n} = {F2} N."],
    },
    "fiz11-elektrik-alan": {
      tr: ["Noktasal yükün elektrik alanı: E = k · q / r².", "q = {q} μC = {q}·10<sup>−6</sup> C.", "E = 9·10<sup>9</sup> · {q}·10<sup>−6</sup> / {r}² = {=9000*q} / {=r*r} = {E} N/C.", "Not: Uzaklık iki katına çıksaydı alan dörtte birine düşerdi (1/r²)."],
      en: ["Field of a point charge: E = k · q / r².", "q = {q} μC = {q}·10<sup>−6</sup> C.", "E = 9·10<sup>9</sup> · {q}·10<sup>−6</sup> / {r}² = {=9000*q} / {=r*r} = {E} N/C.", "Note: doubling the distance would reduce the field to a quarter (1/r²)."],
      de: ["Feld einer Punktladung: E = k · q / r².", "q = {q} μC = {q}·10<sup>−6</sup> C.", "E = 9·10<sup>9</sup> · {q}·10<sup>−6</sup> / {r}² = {=9000*q} / {=r*r} = {E} N/C.", "Hinweis: Bei doppeltem Abstand sänke das Feld auf ein Viertel (1/r²)."],
    },
    "fiz11-potansiyel-is": {
      tr: ["Elektriksel kuvvetin yaptığı iş: W = q · (V<sub>A</sub> − V<sub>B</sub>) (yük A'dan B'ye giderken).", "Potansiyel farkı: {VA} − ({VB}) = {=VA-VB} V.", "W = {q} μC · {=VA-VB} V = {W} μJ.", "{if:W > 0|İş pozitiftir: pozitif yük yüksek potansiyelden düşük potansiyele kendiliğinden gider.|İş negatiftir: pozitif yükü düşük potansiyelden yüksek potansiyele götürmek için dışarıdan iş yapmak gerekir.}"],
      en: ["Work done by the electric force: W = q · (V<sub>A</sub> − V<sub>B</sub>) (charge moving from A to B).", "Potential difference: {VA} − ({VB}) = {=VA-VB} V.", "W = {q} μC · {=VA-VB} V = {W} μJ.", "{if:W > 0|The work is positive: a positive charge moves by itself from high to low potential.|The work is negative: external work is needed to move a positive charge from low to high potential.}"],
      de: ["Arbeit der elektrischen Kraft: W = q · (φ<sub>A</sub> − φ<sub>B</sub>) (Ladung von A nach B).", "Potenzialdifferenz: {VA} − ({VB}) = {=VA-VB} V.", "W = {q} μC · {=VA-VB} V = {W} μJ.", "{if:W > 0|Die Arbeit ist positiv: Eine positive Ladung bewegt sich von selbst vom höheren zum niedrigeren Potenzial.|Die Arbeit ist negativ: Um eine positive Ladung zum höheren Potenzial zu bringen, muss von außen Arbeit verrichtet werden.}"],
    },
    "fiz11-sigac-enerji": {
      tr: ["Sığaçtaki yük: Q = C · V = {C} μF · {V} V = {=C*V} μC.", "Depolanan enerji: E = ½ · C · V² (ya da ½ · Q · V).", "E = ½ · {C} · {V}² = ½ · {C} · {=V*V} = {=C*V*V/2} μJ."],
      en: ["Charge on the capacitor: Q = C · V = {C} μF · {V} V = {=C*V} μC.", "Stored energy: E = ½ · C · V² (or ½ · Q · V).", "E = ½ · {C} · {V}² = ½ · {C} · {=V*V} = {=C*V*V/2} μJ."],
      de: ["Ladung des Kondensators: Q = C · U = {C} μF · {V} V = {=C*V} μC.", "Gespeicherte Energie: E = ½ · C · U² (oder ½ · Q · U).", "E = ½ · {C} · {V}² = ½ · {C} · {=V*V} = {=C*V*V/2} μJ."],
    },
    "fiz11-manyetik-kuvvet": {
      tr: ["Manyetik alandaki akım taşıyan tele etki eden kuvvet: F = B · I · L · sinθ.", "Tel alana dik olduğundan θ = 90°, sinθ = 1.", "F = {B} · {I} · {L} = {=B*I*L} N.", "Kuvvetin yönü sağ el kuralıyla bulunur; hem alana hem akıma diktir."],
      en: ["Force on a current-carrying wire in a magnetic field: F = B · I · L · sinθ.", "The wire is perpendicular to the field, so θ = 90° and sinθ = 1.", "F = {B} · {I} · {L} = {=B*I*L} N.", "The direction follows from the right-hand rule; it is perpendicular to both field and current."],
      de: ["Kraft auf einen stromdurchflossenen Leiter im Magnetfeld: F = B · I · L · sinθ.", "Der Draht steht senkrecht zum Feld, also θ = 90°, sinθ = 1.", "F = {B} · {I} · {L} = {=B*I*L} N.", "Die Richtung ergibt sich aus der Rechte-Hand-Regel; sie steht senkrecht auf Feld und Strom."],
    },
    "fiz11-induksiyon": {
      tr: ["Manyetik alanda hareket eden çubukta indüksiyon emk'sı oluşur: ε = B · L · v.", "ε = {B} · {L} · {v} = {=B*L*v} V.", "Devre akımı Ohm yasasıyla: I = ε / R = {=B*L*v} / {R} = {I} A."],
      en: ["A rod moving through a magnetic field has an induced emf: ε = B · L · v.", "ε = {B} · {L} · {v} = {=B*L*v} V.", "Current from Ohm's law: I = ε / R = {=B*L*v} / {R} = {I} A."],
      de: ["In einem bewegten Stab im Magnetfeld wird eine Spannung induziert: U<sub>ind</sub> = B · L · v.", "U<sub>ind</sub> = {B} · {L} · {v} = {=B*L*v} V.", "Strom nach dem ohmschen Gesetz: I = U<sub>ind</sub> / R = {=B*L*v} / {R} = {I} A."],
    },
    "fiz12-cembersel-kuvvet": {
      tr: ["Düzgün çembersel harekette hızın yönü sürekli değişir; bunu sağlayan merkeze doğru kuvvet F<sub>m</sub> = m · v² / r'dir.", "v² = {v}² = {=v*v} m²/s².", "F<sub>m</sub> = {m} · {=v*v} / {r} = {=m*v*v/r} N."],
      en: ["In uniform circular motion the direction of the velocity keeps changing; the inward force causing this is F<sub>c</sub> = m · v² / r.", "v² = {v}² = {=v*v} m²/s².", "F<sub>c</sub> = {m} · {=v*v} / {r} = {=m*v*v/r} N."],
      de: ["Bei gleichförmiger Kreisbewegung ändert sich ständig die Richtung der Geschwindigkeit; die dazu nötige Kraft zum Mittelpunkt ist F<sub>Z</sub> = m · v² / r.", "v² = {v}² = {=v*v} m²/s².", "F<sub>Z</sub> = {m} · {=v*v} / {r} = {=m*v*v/r} N."],
    },
    "fiz12-cembersel-ivme": {
      tr: ["Çizgisel hız: v = 2πr / T = 2 · 3 · {r} / {T} = {=6*r/T:2} m/s.", "Merkezcil ivme: a<sub>m</sub> = v² / r (ya da 4π²r / T²).", "a<sub>m</sub> = 4 · 9 · {r} / {T}² = {=36*r} / {=T*T} = {a} m/s²."],
      en: ["Linear speed: v = 2πr / T = 2 · 3 · {r} / {T} = {=6*r/T:2} m/s.", "Centripetal acceleration: a<sub>c</sub> = v² / r (or 4π²r / T²).", "a<sub>c</sub> = 4 · 9 · {r} / {T}² = {=36*r} / {=T*T} = {a} m/s²."],
      de: ["Bahngeschwindigkeit: v = 2πr / T = 2 · 3 · {r} / {T} = {=6*r/T:2} m/s.", "Zentripetalbeschleunigung: a<sub>Z</sub> = v² / r (oder 4π²r / T²).", "a<sub>Z</sub> = 4 · 9 · {r} / {T}² = {=36*r} / {=T*T} = {a} m/s²."],
    },
    "fiz12-bhh-yay": {
      tr: ["Yay–kütle sisteminin periyodu: T = 2π · √(m / k); genliğe bağlı değildir.", "m / k = {m} / {k} = {=m/k:4}; √{=m/k:4} = {=q/10}.", "T = 2 · 3 · {=q/10} = {=6*q/10} s."],
      en: ["Period of a mass–spring system: T = 2π · √(m / k); it does not depend on the amplitude.", "m / k = {m} / {k} = {=m/k:4}; √{=m/k:4} = {=q/10}.", "T = 2 · 3 · {=q/10} = {=6*q/10} s."],
      de: ["Periodendauer eines Federpendels: T = 2π · √(m / k); sie hängt nicht von der Amplitude ab.", "m / k = {m} / {k} = {=m/k:4}; √{=m/k:4} = {=q/10}.", "T = 2 · 3 · {=q/10} = {=6*q/10} s."],
    },
    "fiz12-sarkac": {
      tr: ["Basit sarkacın periyodu (küçük açılarda): T = 2π · √(L / g); kütleye ve genliğe bağlı değildir.", "L / g = {L} / 10 = {=L/10:4}; √{=L/10:4} = {=q/10}.", "T = 2 · 3 · {=q/10} = {=6*q/10} s."],
      en: ["Period of a simple pendulum (small angles): T = 2π · √(L / g); it does not depend on the mass or amplitude.", "L / g = {L} / 10 = {=L/10:4}; √{=L/10:4} = {=q/10}.", "T = 2 · 3 · {=q/10} = {=6*q/10} s."],
      de: ["Periodendauer eines Fadenpendels (kleine Winkel): T = 2π · √(L / g); unabhängig von Masse und Amplitude.", "L / g = {L} / 10 = {=L/10:4}; √{=L/10:4} = {=q/10}.", "T = 2 · 3 · {=q/10} = {=6*q/10} s."],
    },
    "fiz12-fotoelektrik": {
      tr: ["Einstein'ın fotoelektrik denklemi: E<sub>foton</sub> = W<sub>0</sub> + E<sub>k,max</sub>.", "E<sub>k,max</sub> = {Ef} − {W0} = {=Ef-W0} eV.", "Kesme potansiyeli elektronların en büyük kinetik enerjisini sıfırlar: e · V<sub>k</sub> = E<sub>k,max</sub> → V<sub>k</sub> = {=Ef-W0} V."],
      en: ["Einstein's photoelectric equation: E<sub>photon</sub> = W<sub>0</sub> + E<sub>k,max</sub>.", "E<sub>k,max</sub> = {Ef} − {W0} = {=Ef-W0} eV.", "The stopping potential removes the maximum kinetic energy: e · V<sub>s</sub> = E<sub>k,max</sub> → V<sub>s</sub> = {=Ef-W0} V."],
      de: ["Einsteins Gleichung des Photoeffekts: E<sub>Photon</sub> = W<sub>A</sub> + E<sub>kin,max</sub>.", "E<sub>kin,max</sub> = {Ef} − {W0} = {=Ef-W0} eV.", "Die Gegenspannung bremst die schnellsten Elektronen ab: e · U = E<sub>kin,max</sub> → U = {=Ef-W0} V."],
    },
    "fiz12-foton-enerji": {
      tr: ["Fotonun enerjisi: E = h · f = h · c / λ.", "h · c = 1240 eV·nm verildiğinden λ'yı nm cinsinden yazmak yeterlidir.", "E = 1240 / {lam} = {=1240/lam:2} eV.", "Yorum: dalga boyu kısaldıkça foton enerjisi artar."],
      en: ["Photon energy: E = h · f = h · c / λ.", "Since h · c = 1240 eV·nm, use λ in nm.", "E = 1240 / {lam} = {=1240/lam:2} eV.", "Interpretation: the shorter the wavelength, the higher the photon energy."],
      de: ["Photonenenergie: E = h · f = h · c / λ.", "Da h · c = 1240 eV·nm, setzt man λ in nm ein.", "E = 1240 / {lam} = {=1240/lam:2} eV.", "Deutung: Je kürzer die Wellenlänge, desto größer die Photonenenergie."],
    },
  });
})();
