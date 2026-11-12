// ADIM ADIM ÇÖZÜMLER
// Her şablon için öğrencinin "Kontrol et"ten sonra gördüğü ayrıntılı çözüm.
// Biçim: "şablon-id": { tr: [adım, adım, …], en: […], de: […] }
// Adımlarda soru metnindeki gibi {x}, {=ifade}, {=ifade:ondalık} ve
// {if:koşul|doğruysa|yanlışsa} yer tutucuları kullanılabilir.
// Son satırdaki "Cevap" bilgisini site kendisi ekler.
// Yazılı (açık uçlu) şablonlarda çözümü olmayan maddeler için: { parts: { 0: {tr,en,de}, … } }
// Tüm çözümler bu proje için özgün olarak yazılmıştır.

QB.solve({
  // ===================== Temel şablonlar (fizik.js) =====================
  "fiz-madde-yogunluk": {
    tr: ["Verilenler: kütle m = {m} g, hacim V = {V} cm³.", "Özkütle (yoğunluk), birim hacmin kütlesidir: d = m / V.", "d = {m} / {V} = {d} g/cm³."],
    en: ["Given: mass m = {m} g, volume V = {V} cm³.", "Density is mass per unit volume: ρ = m / V.", "ρ = {m} / {V} = {d} g/cm³."],
    de: ["Gegeben: Masse m = {m} g, Volumen V = {V} cm³.", "Die Dichte ist die Masse pro Volumeneinheit: ρ = m / V.", "ρ = {m} / {V} = {d} g/cm³."],
  },
  "fiz-hareket-yol": {
    tr: ["Verilenler: hız v = {v} km/sa (sabit), süre t = {t} sa.", "Sabit hızlı harekette alınan yol: x = v · t.", "x = {v} · {t} = {=v*t} km."],
    en: ["Given: speed v = {v} km/h (constant), time t = {t} h.", "For constant speed the distance is x = v · t.", "x = {v} · {t} = {=v*t} km."],
    de: ["Gegeben: Geschwindigkeit v = {v} km/h (konstant), Zeit t = {t} h.", "Bei konstanter Geschwindigkeit gilt für die Strecke: s = v · t.", "s = {v} · {t} = {=v*t} km."],
  },
  "fiz-hareket-ortalama-hiz": {
    tr: ["Ortalama hız = toplam yol / toplam süre. (İki hızın ortalaması alınmaz; süreler farklıysa yanlış sonuç verir.)", "Toplam yol: {x1} + {x2} = {=x1+x2} km.", "Toplam süre: {t1} + {t2} = {=t1+t2} sa.", "v<sub>ort</sub> = {=x1+x2} / {=t1+t2} = {=(x1+x2)/(t1+t2)} km/sa."],
    en: ["Average speed = total distance / total time. (Do not average the two speeds; that is wrong when the times differ.)", "Total distance: {x1} + {x2} = {=x1+x2} km.", "Total time: {t1} + {t2} = {=t1+t2} h.", "v<sub>avg</sub> = {=x1+x2} / {=t1+t2} = {=(x1+x2)/(t1+t2)} km/h."],
    de: ["Durchschnittsgeschwindigkeit = Gesamtstrecke / Gesamtzeit. (Nicht die beiden Geschwindigkeiten mitteln – bei unterschiedlichen Zeiten ist das falsch.)", "Gesamtstrecke: {x1} + {x2} = {=x1+x2} km.", "Gesamtzeit: {t1} + {t2} = {=t1+t2} h.", "v<sub>m</sub> = {=x1+x2} / {=t1+t2} = {=(x1+x2)/(t1+t2)} km/h."],
  },
  "fiz-hareket-ivme": {
    tr: ["Araç durgun hâlden başladığı için ilk hız v₀ = 0.", "Sabit ivmeli harekette hız: v = v₀ + a · t.", "v = 0 + {a} · {t} = {=a*t} m/s."],
    en: ["The car starts from rest, so the initial speed is v₀ = 0.", "With constant acceleration: v = v₀ + a · t.", "v = 0 + {a} · {t} = {=a*t} m/s."],
    de: ["Das Auto startet aus dem Stand, also v₀ = 0.", "Bei konstanter Beschleunigung gilt: v = v₀ + a · t.", "v = 0 + {a} · {t} = {=a*t} m/s."],
  },
  "fiz-hareket-ivmeli-yol": {
    tr: ["Cisim durgun hâlden başladığı için v₀ = 0.", "Sabit ivmeli harekette yol: x = v₀ · t + ½ · a · t².", "x = ½ · {a} · {t}² = ½ · {a} · {=t*t} = {=a*t*t/2} m."],
    en: ["The object starts from rest, so v₀ = 0.", "With constant acceleration: x = v₀ · t + ½ · a · t².", "x = ½ · {a} · {t}² = ½ · {a} · {=t*t} = {=a*t*t/2} m."],
    de: ["Der Körper startet aus der Ruhe, also v₀ = 0.", "Bei konstanter Beschleunigung gilt: s = v₀ · t + ½ · a · t².", "s = ½ · {a} · {t}² = ½ · {a} · {=t*t} = {=a*t*t/2} m."],
  },
  "fiz-kuvvet-agirlik": {
    tr: ["Ağırlık, cisme etki eden kütle çekim kuvvetidir: G = m · g.", "G = {m} kg · 10 m/s² = {=m*10} N.", "Dikkat: kütle (kg) her yerde aynıdır; ağırlık (N) ise g'ye bağlıdır."],
    en: ["Weight is the gravitational force on the object: W = m · g.", "W = {m} kg · 10 m/s² = {=m*10} N.", "Note: mass (kg) is the same everywhere; weight (N) depends on g."],
    de: ["Die Gewichtskraft ist die Schwerkraft auf den Körper: F<sub>G</sub> = m · g.", "F<sub>G</sub> = {m} kg · 10 m/s² = {=m*10} N.", "Hinweis: Die Masse (kg) ist überall gleich, die Gewichtskraft (N) hängt von g ab."],
  },
  "fiz-kuvvet-newton2": {
    tr: ["Sürtünme olmadığı için net kuvvet uygulanan kuvvettir: F<sub>net</sub> = {F} N.", "Newton'un 2. yasası: F<sub>net</sub> = m · a → a = F<sub>net</sub> / m.", "a = {F} / {m} = {a} m/s²."],
    en: ["There is no friction, so the net force is the applied force: F<sub>net</sub> = {F} N.", "Newton's second law: F<sub>net</sub> = m · a → a = F<sub>net</sub> / m.", "a = {F} / {m} = {a} m/s²."],
    de: ["Ohne Reibung ist die resultierende Kraft die angreifende Kraft: F<sub>res</sub> = {F} N.", "Zweites newtonsches Gesetz: F<sub>res</sub> = m · a → a = F<sub>res</sub> / m.", "a = {F} / {m} = {a} m/s²."],
  },
  "fiz-kuvvet-net": {
    tr: ["Aynı doğrultuda zıt yönlü iki kuvvetin bileşkesi, büyük kuvvetten küçük kuvvet çıkarılarak bulunur.", "F<sub>net</sub> = {F1} − {F2} = {=F1-F2} N.", "Net kuvvetin yönü büyük kuvvetin yönündedir (sağa)."],
    en: ["Two forces along the same line in opposite directions: subtract the smaller from the larger.", "F<sub>net</sub> = {F1} − {F2} = {=F1-F2} N.", "The net force points in the direction of the larger force (to the right)."],
    de: ["Zwei entgegengesetzte Kräfte auf derselben Wirkungslinie: kleinere von der größeren abziehen.", "F<sub>res</sub> = {F1} − {F2} = {=F1-F2} N.", "Die resultierende Kraft zeigt in Richtung der größeren Kraft (nach rechts)."],
  },
  "fiz-enerji-kinetik": {
    tr: ["Kinetik enerji: E<sub>k</sub> = ½ · m · v².", "v² = {v}² = {=v*v} m²/s².", "E<sub>k</sub> = ½ · {m} · {=v*v} = {=m*v*v/2} J."],
    en: ["Kinetic energy: E<sub>k</sub> = ½ · m · v².", "v² = {v}² = {=v*v} m²/s².", "E<sub>k</sub> = ½ · {m} · {=v*v} = {=m*v*v/2} J."],
    de: ["Kinetische Energie: E<sub>kin</sub> = ½ · m · v².", "v² = {v}² = {=v*v} m²/s².", "E<sub>kin</sub> = ½ · {m} · {=v*v} = {=m*v*v/2} J."],
  },
  "fiz-enerji-potansiyel": {
    tr: ["Yere göre çekim potansiyel enerjisi: E<sub>p</sub> = m · g · h.", "E<sub>p</sub> = {m} · 10 · {h} = {=m*10*h} J."],
    en: ["Gravitational potential energy relative to the ground: E<sub>p</sub> = m · g · h.", "E<sub>p</sub> = {m} · 10 · {h} = {=m*10*h} J."],
    de: ["Lageenergie bezogen auf den Boden: E<sub>pot</sub> = m · g · h.", "E<sub>pot</sub> = {m} · 10 · {h} = {=m*10*h} J."],
  },
  "fiz-enerji-is": {
    tr: ["Kuvvet hareket yönünde olduğu için iş: W = F · x.", "W = {F} N · {x} m = {=F*x} J."],
    en: ["The force acts along the motion, so the work is W = F · s.", "W = {F} N · {x} m = {=F*x} J."],
    de: ["Die Kraft wirkt in Bewegungsrichtung, also W = F · s.", "W = {F} N · {x} m = {=F*x} J."],
  },
  "fiz-basinc-kati": {
    tr: ["Katıların basıncı: P = F / A (dik kuvvet / yüzey alanı).", "Kutunun yere uyguladığı dik kuvvet ağırlığıdır: F = {F} N.", "P = {F} / {A} = {P} Pa."],
    en: ["Pressure of a solid: p = F / A (perpendicular force / area).", "The perpendicular force on the floor is the box's weight: F = {F} N.", "p = {F} / {A} = {P} Pa."],
    de: ["Druck eines Festkörpers: p = F / A (senkrechte Kraft / Fläche).", "Die senkrechte Kraft auf den Boden ist die Gewichtskraft: F = {F} N.", "p = {F} / {A} = {P} Pa."],
  },
  "fiz-basinc-sivi": {
    tr: ["Sıvı basıncı derinliğe ve sıvının özkütlesine bağlıdır: P = h · d · g.", "P = {h} m · 1000 kg/m³ · 10 m/s² = {=h*10000} Pa.", "1 kPa = 1000 Pa olduğundan P = {=h*10} kPa."],
    en: ["Liquid pressure depends on depth and density: p = h · ρ · g.", "p = {h} m · 1000 kg/m³ · 10 m/s² = {=h*10000} Pa.", "Since 1 kPa = 1000 Pa, p = {=h*10} kPa."],
    de: ["Der Schweredruck hängt von Tiefe und Dichte ab: p = h · ρ · g.", "p = {h} m · 1000 kg/m³ · 10 m/s² = {=h*10000} Pa.", "Wegen 1 kPa = 1000 Pa ist p = {=h*10} kPa."],
  },
  "fiz-elektrik-ohm": {
    tr: ["Ohm yasası: V = I · R.", "V = {I} A · {R} Ω = {=I*R:1} V."],
    en: ["Ohm's law: V = I · R.", "V = {I} A · {R} Ω = {=I*R:1} V."],
    de: ["Ohmsches Gesetz: U = I · R.", "U = {I} A · {R} Ω = {=I*R:1} V."],
  },
  "fiz-elektrik-seri": {
    tr: ["Seri bağlı dirençlerde eşdeğer direnç toplanır: R<sub>eş</sub> = R₁ + R₂ = {R1} + {R2} = {=R1+R2} Ω.", "Seri devrede her dirençten aynı akım geçer: I = V / R<sub>eş</sub>.", "I = {V} / {=R1+R2} = {I} A."],
    en: ["In series the resistances add: R<sub>eq</sub> = R₁ + R₂ = {R1} + {R2} = {=R1+R2} Ω.", "The same current flows through every resistor: I = V / R<sub>eq</sub>.", "I = {V} / {=R1+R2} = {I} A."],
    de: ["In Reihe addieren sich die Widerstände: R<sub>ges</sub> = R₁ + R₂ = {R1} + {R2} = {=R1+R2} Ω.", "Durch jeden Widerstand fließt derselbe Strom: I = U / R<sub>ges</sub>.", "I = {V} / {=R1+R2} = {I} A."],
  },

  // ===================== Hareket, kuvvet, enerji (fizik-hareket.js) =====================
  "fiz-hareket-xt-hiz": {
    tr: ["Grafikten: t = 0 anında x = {x0} m, t = {t} s anında x = {x1} m.", "Yer değiştirme: Δx = {x1} − {x0} = {=x1-x0} m.", "Konum–zaman grafiğinin eğimi hızı verir: v = Δx / Δt = {=x1-x0} / {t} = {v} m/s.", "Dikkat: {x1} / {t} yapmak yanlıştır; çünkü araç x = 0'dan değil, x = {x0} m'den başlamıştır."],
    en: ["From the graph: x = {x0} m at t = 0 and x = {x1} m at t = {t} s.", "Displacement: Δx = {x1} − {x0} = {=x1-x0} m.", "The slope of a position–time graph is the velocity: v = Δx / Δt = {=x1-x0} / {t} = {v} m/s.", "Careful: {x1} / {t} is wrong, because the car starts at x = {x0} m, not at x = 0."],
    de: ["Aus dem Diagramm: x = {x0} m bei t = 0 und x = {x1} m bei t = {t} s.", "Verschiebung: Δx = {x1} − {x0} = {=x1-x0} m.", "Die Steigung im Ort-Zeit-Diagramm ist die Geschwindigkeit: v = Δx / Δt = {=x1-x0} / {t} = {v} m/s.", "Achtung: {x1} / {t} ist falsch, denn das Auto startet bei x = {x0} m, nicht bei x = 0."],
  },
  "fiz-hareket-vt-alan": {
    tr: ["Hız–zaman grafiğinin altında kalan alan yer değiştirmeyi verir. Alanı üç parçaya ayıralım.", "0–{t1} s (yamuk): ({v0} + {v1}) / 2 · {t1} = {=(v0+v1)/2*t1} m.", "{t1}–{t2} s (dikdörtgen): {v1} · {d2} = {=v1*d2} m.", "{t2}–{t3} s (üçgen): ½ · {v1} · {d3} = {=v1*d3/2} m.", "Toplam: {=(v0+v1)/2*t1} + {=v1*d2} + {=v1*d3/2} = {x} m."],
    en: ["The area under a velocity–time graph is the displacement. Split it into three parts.", "0–{t1} s (trapezium): ({v0} + {v1}) / 2 · {t1} = {=(v0+v1)/2*t1} m.", "{t1}–{t2} s (rectangle): {v1} · {d2} = {=v1*d2} m.", "{t2}–{t3} s (triangle): ½ · {v1} · {d3} = {=v1*d3/2} m.", "Total: {=(v0+v1)/2*t1} + {=v1*d2} + {=v1*d3/2} = {x} m."],
    de: ["Die Fläche unter dem Geschwindigkeit-Zeit-Graphen ist die Verschiebung. Teile sie in drei Teile.", "0–{t1} s (Trapez): ({v0} + {v1}) / 2 · {t1} = {=(v0+v1)/2*t1} m.", "{t1}–{t2} s (Rechteck): {v1} · {d2} = {=v1*d2} m.", "{t2}–{t3} s (Dreieck): ½ · {v1} · {d3} = {=v1*d3/2} m.", "Summe: {=(v0+v1)/2*t1} + {=v1*d2} + {=v1*d3/2} = {x} m."],
  },
  "fiz-hareket-vt-ortalama": {
    tr: ["0–{t1} s: hız +{v1} m/s → Δx₁ = {v1} · {t1} = +{=v1*t1} m (ileri).", "{t1}–{t2} s: hız −{v2} m/s → Δx₂ = −{v2} · {dt} = −{=v2*dt} m (geri; alan eksenin altında).", "Toplam yer değiştirme: {=v1*t1} − {=v2*dt} = {disp} m.", "Ortalama hız = yer değiştirme / süre = {disp} / {t2} = {=disp/t2} m/s.", "Not: Alanları toplarsanız ({=v1*t1+v2*dt} m) alınan yolu bulursunuz; bu ortalama hızı değil, ortalama sürati verir."],
    en: ["0–{t1} s: velocity +{v1} m/s → Δx₁ = {v1} · {t1} = +{=v1*t1} m (forwards).", "{t1}–{t2} s: velocity −{v2} m/s → Δx₂ = −{v2} · {dt} = −{=v2*dt} m (backwards; area below the axis).", "Total displacement: {=v1*t1} − {=v2*dt} = {disp} m.", "Average velocity = displacement / time = {disp} / {t2} = {=disp/t2} m/s.", "Note: adding the areas ({=v1*t1+v2*dt} m) gives the distance travelled, i.e. the average speed, not the average velocity."],
    de: ["0–{t1} s: Geschwindigkeit +{v1} m/s → Δx₁ = {v1} · {t1} = +{=v1*t1} m (vorwärts).", "{t1}–{t2} s: Geschwindigkeit −{v2} m/s → Δx₂ = −{v2} · {dt} = −{=v2*dt} m (rückwärts; Fläche unter der Achse).", "Gesamtverschiebung: {=v1*t1} − {=v2*dt} = {disp} m.", "Mittlere Geschwindigkeit = Verschiebung / Zeit = {disp} / {t2} = {=disp/t2} m/s.", "Hinweis: Die Summe der Flächen ({=v1*t1+v2*dt} m) ist der zurückgelegte Weg – das ergäbe die mittlere Bahngeschwindigkeit, nicht die mittlere Geschwindigkeit."],
  },
  "fiz-hareket-karsilasma": {
    tr: ["Araçlar birbirine doğru gittiği için aradaki uzaklık her saniye {vK} + {vL} = {=vK+vL} m azalır (yaklaşma hızı).", "Karşılaşma süresi: t = d / (v<sub>K</sub> + v<sub>L</sub>) = {d} / {=vK+vL} = {t} s.", "Kontrol: K {=vK*t} m, L {=vL*t} m yol alır; toplam {d} m."],
    en: ["They move towards each other, so the gap shrinks by {vK} + {vL} = {=vK+vL} m every second (closing speed).", "Meeting time: t = d / (v<sub>K</sub> + v<sub>L</sub>) = {d} / {=vK+vL} = {t} s.", "Check: K travels {=vK*t} m and L {=vL*t} m; together {d} m."],
    de: ["Sie fahren aufeinander zu, der Abstand nimmt also pro Sekunde um {vK} + {vL} = {=vK+vL} m ab.", "Zeit bis zum Treffen: t = d / (v<sub>K</sub> + v<sub>L</sub>) = {d} / {=vK+vL} = {t} s.", "Probe: K fährt {=vK*t} m, L {=vL*t} m; zusammen {d} m."],
  },
  "fiz-hareket-yetisme": {
    tr: ["Aynı yönde giderken K, L'ye göre {vK} − {vL} = {=vK-vL} m/s hızla yaklaşır (bağıl hız).", "Yetişme süresi: t = {d} / {=vK-vL} = {t} s.", "Bu sürede K'nin aldığı yol: x<sub>K</sub> = {vK} · {t} = {=vK*t} m.", "Kontrol: L {vL} · {t} = {=vL*t} m gider; {=vK*t} − {=vL*t} = {d} m (aradaki fark kapanmıştır)."],
    en: ["Moving in the same direction, K approaches L at {vK} − {vL} = {=vK-vL} m/s (relative speed).", "Time to catch up: t = {d} / {=vK-vL} = {t} s.", "Distance travelled by K: x<sub>K</sub> = {vK} · {t} = {=vK*t} m.", "Check: L travels {vL} · {t} = {=vL*t} m; {=vK*t} − {=vL*t} = {d} m (the gap is closed)."],
    de: ["In gleicher Richtung nähert sich K dem L mit {vK} − {vL} = {=vK-vL} m/s (Relativgeschwindigkeit).", "Zeit bis zum Einholen: t = {d} / {=vK-vL} = {t} s.", "Strecke von K: s<sub>K</sub> = {vK} · {t} = {=vK*t} m.", "Probe: L fährt {vL} · {t} = {=vL*t} m; {=vK*t} − {=vL*t} = {d} m (der Abstand ist aufgeholt)."],
  },
  "fiz-kuvvet-iki-blok": {
    tr: ["Bloklar birlikte hareket eder; sistemin ivmesi: a = F / (m<sub>K</sub> + m<sub>L</sub>) = {F} / {=m1+m2} = {a} m/s².", "L bloğunu yatayda hızlandıran tek kuvvet, K'nin ona uyguladığı kuvvettir.", "L için Newton'un 2. yasası: F<sub>KL</sub> = m<sub>L</sub> · a = {m2} · {a} = {=m2*a} N.", "Kontrol: K için F − F<sub>LK</sub> = m<sub>K</sub> · a → {F} − {=m2*a} = {=m1*a} = {m1} · {a} ✓."],
    en: ["The blocks move together; the system's acceleration is a = F / (m<sub>K</sub> + m<sub>L</sub>) = {F} / {=m1+m2} = {a} m/s².", "The only horizontal force accelerating L is the push from K.", "Newton's second law for L: F<sub>KL</sub> = m<sub>L</sub> · a = {m2} · {a} = {=m2*a} N.", "Check for K: F − F<sub>LK</sub> = m<sub>K</sub> · a → {F} − {=m2*a} = {=m1*a} = {m1} · {a} ✓."],
    de: ["Die Klötze bewegen sich gemeinsam; Beschleunigung des Systems: a = F / (m<sub>K</sub> + m<sub>L</sub>) = {F} / {=m1+m2} = {a} m/s².", "Die einzige waagerechte Kraft, die L beschleunigt, ist die Kraft von K.", "Zweites newtonsches Gesetz für L: F<sub>KL</sub> = m<sub>L</sub> · a = {m2} · {a} = {=m2*a} N.", "Probe für K: F − F<sub>LK</sub> = m<sub>K</sub> · a → {F} − {=m2*a} = {=m1*a} = {m1} · {a} ✓."],
  },
  "fiz-kuvvet-surtunme": {
    tr: ["Yatay zeminde normal kuvvet ağırlığa eşittir: N = m · g = {m} · 10 = {=m*10} N.", "Kinetik sürtünme kuvveti: f<sub>s</sub> = k · N = {mu} · {=m*10} = {=mu*m*10} N (harekete zıt yönde).", "Net kuvvet: F<sub>net</sub> = F − f<sub>s</sub> = {F} − {=mu*m*10} = {=F-mu*m*10} N.", "İvme: a = F<sub>net</sub> / m = {=F-mu*m*10} / {m} = {a} m/s²."],
    en: ["On a horizontal floor the normal force equals the weight: N = m · g = {m} · 10 = {=m*10} N.", "Kinetic friction: f<sub>k</sub> = μ · N = {mu} · {=m*10} = {=mu*m*10} N (opposite to the motion).", "Net force: F<sub>net</sub> = F − f<sub>k</sub> = {F} − {=mu*m*10} = {=F-mu*m*10} N.", "Acceleration: a = F<sub>net</sub> / m = {=F-mu*m*10} / {m} = {a} m/s²."],
    de: ["Auf waagerechtem Boden ist die Normalkraft gleich der Gewichtskraft: F<sub>N</sub> = m · g = {m} · 10 = {=m*10} N.", "Gleitreibungskraft: F<sub>R</sub> = μ · F<sub>N</sub> = {mu} · {=m*10} = {=mu*m*10} N (entgegen der Bewegung).", "Resultierende Kraft: F<sub>res</sub> = F − F<sub>R</sub> = {F} − {=mu*m*10} = {=F-mu*m*10} N.", "Beschleunigung: a = F<sub>res</sub> / m = {=F-mu*m*10} / {m} = {a} m/s²."],
  },
  "fiz-kuvvet-yargi": {
    tr: ["Net kuvvet: |{F1} − {F2}| = {=abs(F1-F2)} N; yönü büyük kuvvetin yönünde, yani {if:F1 > F2|sağa (F₁ yönünde)|sola (F₂ yönünde)}.", "İvme: a = F<sub>net</sub> / m = {=abs(F1-F2)} / {m} = {a} m/s².", "I. yargı: {if:F1 > F2|Doğru. Net kuvvet sağa olduğundan durgun cisim sağa doğru hızlanır.|Yanlış. Net kuvvet sola olduğundan cisim sola doğru hızlanır.}", "II. yargı: İvmenin büyüklüğü {a} m/s² olduğundan yargı {if:s2|doğrudur|yanlıştır}.", "III. yargı: F₂ kaldırılınca yalnız F₁ kalır: a' = {F1} / {m} = {=F1/m} m/s². Yargı {if:s3|doğrudur|yanlıştır}."],
    en: ["Net force: |{F1} − {F2}| = {=abs(F1-F2)} N, pointing like the larger force, i.e. {if:F1 > F2|to the right (along F₁)|to the left (along F₂)}.", "Acceleration: a = F<sub>net</sub> / m = {=abs(F1-F2)} / {m} = {a} m/s².", "Statement I: {if:F1 > F2|True. The net force points right, so the object speeds up to the right.|False. The net force points left, so the object speeds up to the left.}", "Statement II: the acceleration is {a} m/s², so the statement is {if:s2|true|false}.", "Statement III: without F₂ only F₁ acts: a' = {F1} / {m} = {=F1/m} m/s². The statement is {if:s3|true|false}."],
    de: ["Resultierende Kraft: |{F1} − {F2}| = {=abs(F1-F2)} N, in Richtung der größeren Kraft, also {if:F1 > F2|nach rechts (wie F₁)|nach links (wie F₂)}.", "Beschleunigung: a = F<sub>res</sub> / m = {=abs(F1-F2)} / {m} = {a} m/s².", "Aussage I: {if:F1 > F2|Richtig. Die resultierende Kraft zeigt nach rechts, der Körper wird nach rechts schneller.|Falsch. Die resultierende Kraft zeigt nach links, der Körper wird nach links schneller.}", "Aussage II: Die Beschleunigung beträgt {a} m/s², die Aussage ist also {if:s2|richtig|falsch}.", "Aussage III: Ohne F₂ wirkt nur F₁: a' = {F1} / {m} = {=F1/m} m/s². Die Aussage ist {if:s3|richtig|falsch}."],
  },
  "fiz-enerji-serbest-dusme": {
    tr: ["Hava direnci olmadığı için mekanik enerji korunur: yükseklikteki potansiyel enerji, yere çarparken kinetik enerjiye dönüşür.", "m · g · h = ½ · m · v² → v = √(2 · g · h) (kütle sadeleşir).", "v = √(2 · 10 · {h}) = √{=20*h} = {v} m/s."],
    en: ["Without air resistance mechanical energy is conserved: the potential energy at the top becomes kinetic energy at the ground.", "m · g · h = ½ · m · v² → v = √(2 · g · h) (the mass cancels).", "v = √(2 · 10 · {h}) = √{=20*h} = {v} m/s."],
    de: ["Ohne Luftwiderstand bleibt die mechanische Energie erhalten: Die Lageenergie oben wird am Boden zu Bewegungsenergie.", "m · g · h = ½ · m · v² → v = √(2 · g · h) (die Masse kürzt sich).", "v = √(2 · 10 · {h}) = √{=20*h} = {v} m/s."],
  },
  "fiz-enerji-verim": {
    tr: ["Yükün kazandığı potansiyel enerji (yararlı iş): E = m · g · h = {m} · 10 · {h} = {=m*10*h} J.", "Yararlı güç: P<sub>yararlı</sub> = E / t = {=m*10*h} / {t} = {=m*10*h/t} W.", "Verim = P<sub>yararlı</sub> / P<sub>harcanan</sub> → P<sub>harcanan</sub> = P<sub>yararlı</sub> / verim.", "P<sub>harcanan</sub> = {=m*10*h/t} / {=eta/100} = {Pin} W."],
    en: ["Potential energy gained by the load (useful work): E = m · g · h = {m} · 10 · {h} = {=m*10*h} J.", "Useful power: P<sub>useful</sub> = E / t = {=m*10*h} / {t} = {=m*10*h/t} W.", "Efficiency = P<sub>useful</sub> / P<sub>input</sub> → P<sub>input</sub> = P<sub>useful</sub> / efficiency.", "P<sub>input</sub> = {=m*10*h/t} / {=eta/100} = {Pin} W."],
    de: ["Lageenergie, die die Last gewinnt (Nutzarbeit): E = m · g · h = {m} · 10 · {h} = {=m*10*h} J.", "Nutzleistung: P<sub>nutz</sub> = E / t = {=m*10*h} / {t} = {=m*10*h/t} W.", "Wirkungsgrad = P<sub>nutz</sub> / P<sub>auf</sub> → P<sub>auf</sub> = P<sub>nutz</sub> / Wirkungsgrad.", "P<sub>auf</sub> = {=m*10*h/t} / {=eta/100} = {Pin} W."],
  },
  "fiz-enerji-ray-siralama": {
    tr: ["Sürtünme olmadığı için mekanik enerji korunur.", "Cisim K'den ilk hızsız bırakıldığından bir noktadaki kinetik enerjisi, K'ye göre kaybettiği potansiyel enerjiye eşittir: E = m · g · (h<sub>K</sub> − h).", "E<sub>L</sub> ∝ {hK} − {hL} = {=hK-hL}, E<sub>M</sub> ∝ {hK} − {hM} = {=hK-hM}, E<sub>N</sub> ∝ {hK} − {hN} = {=hK-hN}.", "Kısacası nokta ne kadar alçaktaysa kinetik enerji o kadar büyüktür; eşit yükseklikteki noktalarda eşittir."],
    en: ["There is no friction, so mechanical energy is conserved.", "The object is released from rest at K, so its kinetic energy at a point equals the potential energy lost since K: E = m · g · (h<sub>K</sub> − h).", "E<sub>L</sub> ∝ {hK} − {hL} = {=hK-hL}, E<sub>M</sub> ∝ {hK} − {hM} = {=hK-hM}, E<sub>N</sub> ∝ {hK} − {hN} = {=hK-hN}.", "In short: the lower the point, the larger the kinetic energy; points at equal heights have equal kinetic energy."],
    de: ["Ohne Reibung bleibt die mechanische Energie erhalten.", "Der Körper startet in K aus der Ruhe; seine kinetische Energie in einem Punkt ist die seit K verlorene Lageenergie: E = m · g · (h<sub>K</sub> − h).", "E<sub>L</sub> ∝ {hK} − {hL} = {=hK-hL}, E<sub>M</sub> ∝ {hK} − {hM} = {=hK-hM}, E<sub>N</sub> ∝ {hK} − {hN} = {=hK-hN}.", "Kurz: Je tiefer der Punkt, desto größer die kinetische Energie; gleich hohe Punkte haben gleiche kinetische Energie."],
  },

  // ===================== Madde, basınç, kaldırma, ısı (fizik-madde.js) =====================
  "fiz-madde-karisim-hacim": {
    tr: ["Karışımın özkütlesi = toplam kütle / toplam hacim.", "Kütleler: m<sub>X</sub> = {d1} · {V1} = {=d1*V1} g, m<sub>Y</sub> = {d2} · {V2} = {=d2*V2} g.", "Toplam kütle: {=d1*V1+d2*V2} g; toplam hacim: {V1} + {V2} = {=V1+V2} cm³.", "d<sub>karışım</sub> = {=d1*V1+d2*V2} / {=V1+V2} = {dk:2} g/cm³.", "Not: Hacimler farklı olduğu için özkütlelerin basit ortalaması ({=(d1+d2)/2:2}) doğru sonucu vermez."],
    en: ["Density of the mixture = total mass / total volume.", "Masses: m<sub>X</sub> = {d1} · {V1} = {=d1*V1} g, m<sub>Y</sub> = {d2} · {V2} = {=d2*V2} g.", "Total mass: {=d1*V1+d2*V2} g; total volume: {V1} + {V2} = {=V1+V2} cm³.", "ρ<sub>mix</sub> = {=d1*V1+d2*V2} / {=V1+V2} = {dk:2} g/cm³.", "Note: the volumes differ, so the simple average of the densities ({=(d1+d2)/2:2}) is not correct."],
    de: ["Dichte der Mischung = Gesamtmasse / Gesamtvolumen.", "Massen: m<sub>X</sub> = {d1} · {V1} = {=d1*V1} g, m<sub>Y</sub> = {d2} · {V2} = {=d2*V2} g.", "Gesamtmasse: {=d1*V1+d2*V2} g; Gesamtvolumen: {V1} + {V2} = {=V1+V2} cm³.", "ρ<sub>Mischung</sub> = {=d1*V1+d2*V2} / {=V1+V2} = {dk:2} g/cm³.", "Hinweis: Da die Volumina verschieden sind, stimmt der einfache Mittelwert der Dichten ({=(d1+d2)/2:2}) nicht."],
  },
  "fiz-madde-karisim-kutle": {
    tr: ["Her sıvıdan m gram alınsın. Hacimler: V₁ = m / {d1}, V₂ = m / {d2}.", "d<sub>karışım</sub> = toplam kütle / toplam hacim = 2m / (m/d₁ + m/d₂) = 2 · d₁ · d₂ / (d₁ + d₂).", "d<sub>karışım</sub> = 2 · {d1} · {d2} / ({d1} + {d2}) = {=2*d1*d2} / {=d1+d2} = {dk:2} g/cm³.", "Yorum: Eşit kütlede, özkütlesi küçük olan sıvının hacmi daha büyüktür; bu yüzden sonuç basit ortalamadan ({=(d1+d2)/2:2}) küçüktür."],
    en: ["Take m grams of each liquid. Volumes: V₁ = m / {d1}, V₂ = m / {d2}.", "ρ<sub>mix</sub> = total mass / total volume = 2m / (m/ρ₁ + m/ρ₂) = 2 · ρ₁ · ρ₂ / (ρ₁ + ρ₂).", "ρ<sub>mix</sub> = 2 · {d1} · {d2} / ({d1} + {d2}) = {=2*d1*d2} / {=d1+d2} = {dk:2} g/cm³.", "Interpretation: for equal masses the less dense liquid has the larger volume, so the result is below the simple average ({=(d1+d2)/2:2})."],
    de: ["Nimm von jeder Flüssigkeit m Gramm. Volumina: V₁ = m / {d1}, V₂ = m / {d2}.", "ρ<sub>Mischung</sub> = Gesamtmasse / Gesamtvolumen = 2m / (m/ρ₁ + m/ρ₂) = 2 · ρ₁ · ρ₂ / (ρ₁ + ρ₂).", "ρ<sub>Mischung</sub> = 2 · {d1} · {d2} / ({d1} + {d2}) = {=2*d1*d2} / {=d1+d2} = {dk:2} g/cm³.", "Deutung: Bei gleichen Massen hat die weniger dichte Flüssigkeit das größere Volumen; daher liegt das Ergebnis unter dem einfachen Mittelwert ({=(d1+d2)/2:2})."],
  },
  "fiz-madde-kup-siralama": {
    tr: ["Küpün hacmi V = a³: V<sub>K</sub> = {aK}³ = {=aK^3} cm³, V<sub>L</sub> = {aL}³ = {=aL^3} cm³, V<sub>M</sub> = {aM}³ = {=aM^3} cm³.", "Özkütle d = m / V:", "d<sub>K</sub> = {mK} / {=aK^3} = {dK} g/cm³, d<sub>L</sub> = {mL} / {=aL^3} = {dL} g/cm³, d<sub>M</sub> = {mM} / {=aM^3} = {dM} g/cm³.", "Dikkat: Kütlesi büyük olanın özkütlesi büyük olmak zorunda değildir; hacme de bakmak gerekir."],
    en: ["Volume of a cube V = a³: V<sub>K</sub> = {aK}³ = {=aK^3} cm³, V<sub>L</sub> = {aL}³ = {=aL^3} cm³, V<sub>M</sub> = {aM}³ = {=aM^3} cm³.", "Density ρ = m / V:", "ρ<sub>K</sub> = {mK} / {=aK^3} = {dK} g/cm³, ρ<sub>L</sub> = {mL} / {=aL^3} = {dL} g/cm³, ρ<sub>M</sub> = {mM} / {=aM^3} = {dM} g/cm³.", "Careful: the heaviest cube is not necessarily the densest; the volume matters too."],
    de: ["Volumen eines Würfels V = a³: V<sub>K</sub> = {aK}³ = {=aK^3} cm³, V<sub>L</sub> = {aL}³ = {=aL^3} cm³, V<sub>M</sub> = {aM}³ = {=aM^3} cm³.", "Dichte ρ = m / V:", "ρ<sub>K</sub> = {mK} / {=aK^3} = {dK} g/cm³, ρ<sub>L</sub> = {mL} / {=aL^3} = {dL} g/cm³, ρ<sub>M</sub> = {mM} / {=aM^3} = {dM} g/cm³.", "Achtung: Der schwerste Würfel ist nicht unbedingt der dichteste; auch das Volumen zählt."],
  },
  "fiz-basinc-kaplar-siralama": {
    tr: ["Kap tabanındaki sıvı basıncı P = h · d · g'dir; kabın taban alanına ve biçimine bağlı değildir.", "g ortak olduğu için yalnız h · d çarpımlarını karşılaştırmak yeter.", "P<sub>K</sub> ∝ {hK} · {dK} = {=hK*dK}, P<sub>L</sub> ∝ {hL} · {dL} = {=hL*dL}, P<sub>M</sub> ∝ {hM} · {dM} = {=hM*dM}."],
    en: ["The liquid pressure at the bottom is p = h · ρ · g; it does not depend on the base area or the shape of the container.", "g is the same, so just compare the products h · ρ.", "p<sub>K</sub> ∝ {hK} · {dK} = {=hK*dK}, p<sub>L</sub> ∝ {hL} · {dL} = {=hL*dL}, p<sub>M</sub> ∝ {hM} · {dM} = {=hM*dM}."],
    de: ["Der Schweredruck am Boden ist p = h · ρ · g; er hängt nicht von der Grundfläche oder der Form des Gefäßes ab.", "g ist gleich, also genügt es, die Produkte h · ρ zu vergleichen.", "p<sub>K</sub> ∝ {hK} · {dK} = {=hK*dK}, p<sub>L</sub> ∝ {hL} · {dL} = {=hL*dL}, p<sub>M</sub> ∝ {hM} · {dM} = {=hM*dM}."],
  },
  "fiz-basinc-u-borusu": {
    tr: ["Aynı sıvı içinde ve aynı yatay düzlemdeki noktalarda basınç eşittir. İki sıvının ayrılma yüzeyinden geçen yatay düzlemi seçelim.", "Sol kolda bu düzlemin üstünde {hS} cm su, sağ kolda {hY} cm Y sıvısı vardır.", "h<sub>su</sub> · d<sub>su</sub> = h<sub>Y</sub> · d<sub>Y</sub> → {hS} · 1 = {hY} · d<sub>Y</sub>.", "d<sub>Y</sub> = {hS} / {hY} = {dY:2} g/cm³.", "Yorum: Y sıvısının sütunu daha uzun olduğuna göre Y, sudan daha az yoğundur."],
    en: ["Points at the same level in the same liquid have equal pressure. Choose the horizontal level through the boundary between the liquids.", "Above that level there is {hS} cm of water in the left arm and {hY} cm of liquid Y in the right arm.", "h<sub>water</sub> · ρ<sub>water</sub> = h<sub>Y</sub> · ρ<sub>Y</sub> → {hS} · 1 = {hY} · ρ<sub>Y</sub>.", "ρ<sub>Y</sub> = {hS} / {hY} = {dY:2} g/cm³.", "Interpretation: liquid Y needs a taller column, so it is less dense than water."],
    de: ["In derselben Flüssigkeit herrscht auf gleicher Höhe gleicher Druck. Wähle die waagerechte Ebene durch die Grenzfläche der Flüssigkeiten.", "Darüber stehen links {hS} cm Wasser und rechts {hY} cm Flüssigkeit Y.", "h<sub>W</sub> · ρ<sub>W</sub> = h<sub>Y</sub> · ρ<sub>Y</sub> → {hS} · 1 = {hY} · ρ<sub>Y</sub>.", "ρ<sub>Y</sub> = {hS} / {hY} = {dY:2} g/cm³.", "Deutung: Y braucht eine höhere Säule, ist also weniger dicht als Wasser."],
  },
  "fiz-basinc-tugla": {
    tr: ["Katı basıncı P = G / A; ağırlık G her durumda aynıdır, bu yüzden basınç yüzey alanıyla ters orantılıdır.", "En büyük basınç en küçük yüzeyde oluşur: A<sub>min</sub> = {b} · {c} = {=b*c} cm².", "En küçük basınç en büyük yüzeyde oluşur: A<sub>max</sub> = {a} · {b} = {=a*b} cm².", "P<sub>max</sub> / P<sub>min</sub> = A<sub>max</sub> / A<sub>min</sub> = {=a*b} / {=b*c} = {=a/c:2}."],
    en: ["Pressure p = W / A; the weight W is always the same, so the pressure is inversely proportional to the contact area.", "Largest pressure on the smallest face: A<sub>min</sub> = {b} · {c} = {=b*c} cm².", "Smallest pressure on the largest face: A<sub>max</sub> = {a} · {b} = {=a*b} cm².", "p<sub>max</sub> / p<sub>min</sub> = A<sub>max</sub> / A<sub>min</sub> = {=a*b} / {=b*c} = {=a/c:2}."],
    de: ["Druck p = F<sub>G</sub> / A; die Gewichtskraft ist immer gleich, der Druck ist also umgekehrt proportional zur Auflagefläche.", "Größter Druck auf der kleinsten Fläche: A<sub>min</sub> = {b} · {c} = {=b*c} cm².", "Kleinster Druck auf der größten Fläche: A<sub>max</sub> = {a} · {b} = {=a*b} cm².", "p<sub>max</sub> / p<sub>min</sub> = A<sub>max</sub> / A<sub>min</sub> = {=a*b} / {=b*c} = {=a/c:2}."],
  },
  "fiz-kaldirma-yuzen": {
    tr: ["Cisim dengede (yüzüyor) olduğu için kaldırma kuvveti ağırlığa eşittir: F<sub>k</sub> = G.", "V<sub>batan</sub> · d<sub>sıvı</sub> · g = V · d<sub>cisim</sub> · g → d<sub>cisim</sub> = d<sub>sıvı</sub> · V<sub>batan</sub> / V.", "Batan hacim oranı: {k} / {n}.", "d<sub>cisim</sub> = {dS} · {k} / {n} = {dC:2} g/cm³."],
    en: ["The object floats in equilibrium, so the buoyant force equals its weight: F<sub>b</sub> = W.", "V<sub>sub</sub> · ρ<sub>liquid</sub> · g = V · ρ<sub>object</sub> · g → ρ<sub>object</sub> = ρ<sub>liquid</sub> · V<sub>sub</sub> / V.", "Submerged fraction: {k} / {n}.", "ρ<sub>object</sub> = {dS} · {k} / {n} = {dC:2} g/cm³."],
    de: ["Der Körper schwimmt im Gleichgewicht, also Auftriebskraft = Gewichtskraft: F<sub>A</sub> = F<sub>G</sub>.", "V<sub>ein</sub> · ρ<sub>Fl</sub> · g = V · ρ<sub>K</sub> · g → ρ<sub>K</sub> = ρ<sub>Fl</sub> · V<sub>ein</sub> / V.", "Eingetauchter Anteil: {k} / {n}.", "ρ<sub>K</sub> = {dS} · {k} / {n} = {dC:2} g/cm³."],
  },
  "fiz-kaldirma-dinamometre": {
    tr: ["Kaldırma kuvveti = havadaki okuma − sudaki okuma: F<sub>k</sub> = {G1} − {G2} = {Fk} N.", "Cisim tamamen battığı için F<sub>k</sub> = V · d<sub>su</sub> · g, ağırlık ise G = V · d<sub>cisim</sub> · g.", "Oranlarsak: G / F<sub>k</sub> = d<sub>cisim</sub> / d<sub>su</sub>.", "d<sub>cisim</sub> = 1 · {G1} / {Fk} = {dC:1} g/cm³."],
    en: ["Buoyant force = reading in air − reading in water: F<sub>b</sub> = {G1} − {G2} = {Fk} N.", "Fully submerged: F<sub>b</sub> = V · ρ<sub>water</sub> · g, and the weight is W = V · ρ<sub>object</sub> · g.", "Dividing: W / F<sub>b</sub> = ρ<sub>object</sub> / ρ<sub>water</sub>.", "ρ<sub>object</sub> = 1 · {G1} / {Fk} = {dC:1} g/cm³."],
    de: ["Auftriebskraft = Anzeige in Luft − Anzeige in Wasser: F<sub>A</sub> = {G1} − {G2} = {Fk} N.", "Vollständig eingetaucht: F<sub>A</sub> = V · ρ<sub>W</sub> · g, Gewichtskraft F<sub>G</sub> = V · ρ<sub>K</sub> · g.", "Division: F<sub>G</sub> / F<sub>A</sub> = ρ<sub>K</sub> / ρ<sub>W</sub>.", "ρ<sub>K</sub> = 1 · {G1} / {Fk} = {dC:1} g/cm³."],
  },
  "fiz-kaldirma-yargi": {
    tr: ["Kural: d<sub>cisim</sub> < d<sub>sıvı</sub> ise cisim yüzer; eşitse askıda kalır; büyükse batar. Yüzen ve askıda kalan cisimde kaldırma kuvveti ağırlığa eşittir, batan cisimde ağırlıktan küçüktür.", "I. yargı: d<sub>K</sub> = {dK}, d<sub>sıvı</sub> = {dS}. {if:dK < dS|K'nin özkütlesi küçük olduğundan K yüzer; yargı doğrudur.|K'nin özkütlesi küçük olmadığından K yüzmez; yargı yanlıştır.}", "II. yargı: d<sub>L</sub> = {dL}. {if:dL == dS|Özkütleler eşit olduğundan L askıda kalır; yargı doğrudur.|Özkütleler eşit olmadığından L askıda kalmaz; yargı yanlıştır.}", "III. yargı: d<sub>M</sub> = {dM}. {if:dM <= dS|M yüzer ya da askıda kalır, bu yüzden F<sub>k</sub> = G; yargı doğrudur.|M batar ve kabın tabanına oturur, bu yüzden F<sub>k</sub> < G; yargı yanlıştır.}"],
    en: ["Rule: if ρ<sub>object</sub> < ρ<sub>liquid</sub> the object floats; if equal it is suspended; if greater it sinks. For floating and suspended objects the buoyant force equals the weight; for a sunk object it is smaller.", "Statement I: ρ<sub>K</sub> = {dK}, ρ<sub>liquid</sub> = {dS}. {if:dK < dS|K is less dense, so it floats; the statement is true.|K is not less dense, so it does not float; the statement is false.}", "Statement II: ρ<sub>L</sub> = {dL}. {if:dL == dS|The densities are equal, so L is suspended; the statement is true.|The densities differ, so L is not suspended; the statement is false.}", "Statement III: ρ<sub>M</sub> = {dM}. {if:dM <= dS|M floats or is suspended, so F<sub>b</sub> = W; the statement is true.|M sinks to the bottom, so F<sub>b</sub> < W; the statement is false.}"],
    de: ["Regel: Ist ρ<sub>K</sub> < ρ<sub>Fl</sub>, schwimmt der Körper; bei Gleichheit schwebt er; ist sie größer, sinkt er. Beim Schwimmen und Schweben ist die Auftriebskraft gleich der Gewichtskraft, beim Sinken kleiner.", "Aussage I: ρ<sub>K</sub> = {dK}, ρ<sub>Fl</sub> = {dS}. {if:dK < dS|K ist weniger dicht und schwimmt; die Aussage ist richtig.|K ist nicht weniger dicht und schwimmt nicht; die Aussage ist falsch.}", "Aussage II: ρ<sub>L</sub> = {dL}. {if:dL == dS|Die Dichten sind gleich, L schwebt; die Aussage ist richtig.|Die Dichten sind verschieden, L schwebt nicht; die Aussage ist falsch.}", "Aussage III: ρ<sub>M</sub> = {dM}. {if:dM <= dS|M schwimmt oder schwebt, also F<sub>A</sub> = F<sub>G</sub>; die Aussage ist richtig.|M sinkt auf den Boden, also F<sub>A</sub> < F<sub>G</sub>; die Aussage ist falsch.}"],
  },
  "fiz-kaldirma-tuz": {
    tr: ["Yüzen ya da askıda kalan cisimde kaldırma kuvveti ağırlığa eşittir (F<sub>k</sub> = G, sabit). Batan cisimde F<sub>k</sub> = V · d<sub>sıvı</sub> · g olur ve sıvının özkütlesiyle artar.", "Başlangıçta d<sub>cisim</sub> = {dC}, d<sub>sıvı</sub> = {d1}: cisim {if:dC < d1|yüzer|{if:dC == d1|askıda kalır|batar}}.", "Tuzdan sonra d<sub>sıvı</sub> = {d2}: cisim {if:dC < d2|yüzer|{if:dC == d2|askıda kalır|batar}}.", "Kaldırma kuvveti V · g · min(d<sub>cisim</sub>, d<sub>sıvı</sub>) ile orantılıdır: önce {=min(dC,d1)}, sonra {=min(dC,d2)}.", "Sıvı içindeki hacim oranı (yüzende d<sub>cisim</sub> / d<sub>sıvı</sub>, batanda 1): önce {=if(dC <= d1, dC / d1, 1):2}, sonra {=if(dC <= d2, dC / d2, 1):2}."],
    en: ["For a floating or suspended object the buoyant force equals the weight (F<sub>b</sub> = W, constant). For a sunk object F<sub>b</sub> = V · ρ<sub>liquid</sub> · g, which grows with the liquid's density.", "At first ρ<sub>object</sub> = {dC}, ρ<sub>liquid</sub> = {d1}: the object {if:dC < d1|floats|{if:dC == d1|is suspended|sinks}}.", "After adding salt ρ<sub>liquid</sub> = {d2}: the object {if:dC < d2|floats|{if:dC == d2|is suspended|sinks}}.", "The buoyant force is proportional to min(ρ<sub>object</sub>, ρ<sub>liquid</sub>): first {=min(dC,d1)}, then {=min(dC,d2)}.", "Submerged fraction (ρ<sub>object</sub> / ρ<sub>liquid</sub> when floating, 1 when sunk): first {=if(dC <= d1, dC / d1, 1):2}, then {=if(dC <= d2, dC / d2, 1):2}."],
    de: ["Beim Schwimmen oder Schweben ist die Auftriebskraft gleich der Gewichtskraft (F<sub>A</sub> = F<sub>G</sub>, konstant). Beim Sinken ist F<sub>A</sub> = V · ρ<sub>Fl</sub> · g und wächst mit der Dichte der Flüssigkeit.", "Am Anfang ρ<sub>K</sub> = {dC}, ρ<sub>Fl</sub> = {d1}: der Körper {if:dC < d1|schwimmt|{if:dC == d1|schwebt|sinkt}}.", "Nach dem Salzen ρ<sub>Fl</sub> = {d2}: der Körper {if:dC < d2|schwimmt|{if:dC == d2|schwebt|sinkt}}.", "Die Auftriebskraft ist proportional zu min(ρ<sub>K</sub>, ρ<sub>Fl</sub>): zuerst {=min(dC,d1)}, dann {=min(dC,d2)}.", "Eingetauchter Anteil (beim Schwimmen ρ<sub>K</sub> / ρ<sub>Fl</sub>, beim Sinken 1): zuerst {=if(dC <= d1, dC / d1, 1):2}, dann {=if(dC <= d2, dC / d2, 1):2}."],
  },
  "fiz-isi-q": {
    tr: ["Isı miktarı: Q = m · c · ΔT.", "Sıcaklık değişimi: ΔT = {T2} − {T1} = {=T2-T1} °C.", "Q = {m} · 1 · {=T2-T1} = {=m*(T2-T1)} cal."],
    en: ["Heat: Q = m · c · ΔT.", "Temperature change: ΔT = {T2} − {T1} = {=T2-T1} °C.", "Q = {m} · 1 · {=T2-T1} = {=m*(T2-T1)} cal."],
    de: ["Wärmemenge: Q = m · c · ΔT.", "Temperaturänderung: ΔT = {T2} − {T1} = {=T2-T1} °C.", "Q = {m} · 1 · {=T2-T1} = {=m*(T2-T1)} cal."],
  },
  "fiz-isi-karisim": {
    tr: ["Kap ısıca yalıtılmış olduğu için soğuk suyun aldığı ısı = sıcak suyun verdiği ısı.", "{m1} · 1 · (T − {T1}) = {m2} · 1 · ({T2} − T).", "T = ({m1} · {T1} + {m2} · {T2}) / ({m1} + {m2}) = {=m1*T1+m2*T2} / {=m1+m2} = {T} °C.", "Kontrol: alınan ısı {=m1*(T-T1)} cal, verilen ısı {=m2*(T2-T)} cal — eşit. Denge sıcaklığı, kütlesi büyük olan suyun sıcaklığına daha yakındır."],
    en: ["The container is insulated, so heat gained by the cold water = heat lost by the hot water.", "{m1} · 1 · (T − {T1}) = {m2} · 1 · ({T2} − T).", "T = ({m1} · {T1} + {m2} · {T2}) / ({m1} + {m2}) = {=m1*T1+m2*T2} / {=m1+m2} = {T} °C.", "Check: heat gained {=m1*(T-T1)} cal, heat lost {=m2*(T2-T)} cal — equal. The final temperature is closer to that of the larger mass."],
    de: ["Das Gefäß ist isoliert: aufgenommene Wärme des kalten Wassers = abgegebene Wärme des warmen Wassers.", "{m1} · 1 · (T − {T1}) = {m2} · 1 · ({T2} − T).", "T = ({m1} · {T1} + {m2} · {T2}) / ({m1} + {m2}) = {=m1*T1+m2*T2} / {=m1+m2} = {T} °C.", "Probe: aufgenommen {=m1*(T-T1)} cal, abgegeben {=m2*(T2-T)} cal – gleich. Die Mischtemperatur liegt näher an der Temperatur der größeren Masse."],
  },
  "fiz-isi-grafik-erime": {
    tr: ["Grafikte sıcaklığın sabit kaldığı bölüm ({t1}–{t2} dk, {Te} °C) hâl değişimidir, yani erimedir.", "Erime süresi: {t2} − {t1} = {dur} dk.", "Bu sürede verilen ısı: Q = {P} cal/dk · {dur} dk = {=P*dur} cal.", "Erime ısısı: Q = m · L → L = Q / m = {=P*dur} / {m} = {Lh} cal/g."],
    en: ["The flat part of the graph ({t1}–{t2} min at {Te} °C) is the change of state, i.e. melting.", "Melting time: {t2} − {t1} = {dur} min.", "Heat supplied in that time: Q = {P} cal/min · {dur} min = {=P*dur} cal.", "Latent heat of fusion: Q = m · L → L = Q / m = {=P*dur} / {m} = {Lh} cal/g."],
    de: ["Der waagerechte Abschnitt ({t1}–{t2} min bei {Te} °C) ist die Zustandsänderung, also das Schmelzen.", "Schmelzdauer: {t2} − {t1} = {dur} min.", "In dieser Zeit zugeführte Wärme: Q = {P} cal/min · {dur} min = {=P*dur} cal.", "Schmelzwärme: Q = m · L → L = Q / m = {=P*dur} / {m} = {Lh} cal/g."],
  },

  // ===================== Elektrik, optik, dalgalar (fizik-elektrik-optik.js) =====================
  "fiz-elektrostatik-dokunma": {
    tr: ["Özdeş iletken küreler dokundurulunca toplam yük aralarında eşit paylaşılır (yük korunur).", "K ile L: ({qK} + {qL}) / 2 = {=(qK+qL)/2} μC; dokunmadan sonra L'nin yükü {=(qK+qL)/2} μC olur.", "L ile M: ({=(qK+qL)/2} + {qM}) / 2 = {q} μC.", "Son durumda M'nin yükü {q} μC'dir."],
    en: ["When identical conducting spheres touch, the total charge is shared equally (charge is conserved).", "K and L: ({qK} + {qL}) / 2 = {=(qK+qL)/2} μC; afterwards L carries {=(qK+qL)/2} μC.", "L and M: ({=(qK+qL)/2} + {qM}) / 2 = {q} μC.", "Finally M carries {q} μC."],
    de: ["Berühren sich gleiche leitende Kugeln, teilt sich die Gesamtladung gleichmäßig auf (Ladungserhaltung).", "K und L: ({qK} + {qL}) / 2 = {=(qK+qL)/2} μC; danach trägt L {=(qK+qL)/2} μC.", "L und M: ({=(qK+qL)/2} + {qM}) / 2 = {q} μC.", "Am Ende trägt M {q} μC."],
  },
  "fiz-elektrik-paralel": {
    tr: ["Paralel bağlı dirençlerin her birinin uçları arasındaki gerilim üretecin gerilimine eşittir: {V} V.", "I₁ = {V} / {R1} = {=V/R1} A, I₂ = {V} / {R2} = {=V/R2} A.", "Ana koldaki akım kol akımlarının toplamıdır: I = {=V/R1} + {=V/R2} = {=V/R1+V/R2} A.", "Kontrol: R<sub>eş</sub> = {R1} · {R2} / ({R1} + {R2}) = {=R1*R2/(R1+R2):2} Ω, I = {V} / R<sub>eş</sub> ✓."],
    en: ["Each resistor in parallel has the source voltage across it: {V} V.", "I₁ = {V} / {R1} = {=V/R1} A, I₂ = {V} / {R2} = {=V/R2} A.", "The main current is the sum of the branch currents: I = {=V/R1} + {=V/R2} = {=V/R1+V/R2} A.", "Check: R<sub>eq</sub> = {R1} · {R2} / ({R1} + {R2}) = {=R1*R2/(R1+R2):2} Ω, I = {V} / R<sub>eq</sub> ✓."],
    de: ["An jedem parallelen Widerstand liegt die Quellenspannung: {V} V.", "I₁ = {V} / {R1} = {=V/R1} A, I₂ = {V} / {R2} = {=V/R2} A.", "Der Gesamtstrom ist die Summe der Zweigströme: I = {=V/R1} + {=V/R2} = {=V/R1+V/R2} A.", "Probe: R<sub>ges</sub> = {R1} · {R2} / ({R1} + {R2}) = {=R1*R2/(R1+R2):2} Ω, I = {V} / R<sub>ges</sub> ✓."],
  },
  "fiz-elektrik-karisik": {
    tr: ["R₂ ile R₃ paraleldir: R<sub>p</sub> = R₂ · R₃ / (R₂ + R₃) = {R2} · {R3} / {=R2+R3} = {Rp} Ω.", "R₁ bu gruba seri bağlıdır: R<sub>eş</sub> = {R1} + {Rp} = {=R1+Rp} Ω.", "Ana kol akımı: I = V / R<sub>eş</sub> = {V} / {=R1+Rp} = {I} A.", "Paralel grubun (dolayısıyla R₃'ün) gerilimi: V₃ = I · R<sub>p</sub> = {I} · {Rp} = {=I*Rp} V.", "Kontrol: V₁ = {I} · {R1} = {=I*R1} V; {=I*R1} + {=I*Rp} = {V} V ✓."],
    en: ["R₂ and R₃ are in parallel: R<sub>p</sub> = R₂ · R₃ / (R₂ + R₃) = {R2} · {R3} / {=R2+R3} = {Rp} Ω.", "R₁ is in series with this group: R<sub>eq</sub> = {R1} + {Rp} = {=R1+Rp} Ω.", "Main current: I = V / R<sub>eq</sub> = {V} / {=R1+Rp} = {I} A.", "Voltage across the parallel group (and so across R₃): V₃ = I · R<sub>p</sub> = {I} · {Rp} = {=I*Rp} V.", "Check: V₁ = {I} · {R1} = {=I*R1} V; {=I*R1} + {=I*Rp} = {V} V ✓."],
    de: ["R₂ und R₃ sind parallel: R<sub>p</sub> = R₂ · R₃ / (R₂ + R₃) = {R2} · {R3} / {=R2+R3} = {Rp} Ω.", "R₁ liegt dazu in Reihe: R<sub>ges</sub> = {R1} + {Rp} = {=R1+Rp} Ω.", "Gesamtstrom: I = U / R<sub>ges</sub> = {V} / {=R1+Rp} = {I} A.", "Spannung an der Parallelgruppe (also an R₃): U₃ = I · R<sub>p</sub> = {I} · {Rp} = {=I*Rp} V.", "Probe: U₁ = {I} · {R1} = {=I*R1} V; {=I*R1} + {=I*Rp} = {V} V ✓."],
  },
  "fiz-elektrik-anahtar": {
    tr: ["S açıkken R₃'ten akım geçmez; R₁ ile R₂ seridir: I = {V} / ({R1} + {R2}) = {=Iopen:2} A (R₁ ve R₂'den aynı akım geçer).", "S kapalıyken R₂ ∥ R₃ = {=R2*R3/(R2+R3):2} Ω olur; R<sub>eş</sub> = {R1} + {=R2*R3/(R2+R3):2} = {=R1+R2*R3/(R2+R3):2} Ω.", "S kapalıyken R₁'in akımı {V} / {=R1+R2*R3/(R2+R3):2} = {=Iclosed:2} A; bu akım R₂ ve R₃ arasında paylaşılır: I₂ = {=Iclosed:2} · {R3} / ({R2} + {R3}) = {=I2closed:2} A.", "S {if:closed|açılınca|kapatılınca}: R₁'in akımı {=if(closed, Iclosed, Iopen):2} A → {=if(closed, Iopen, Iclosed):2} A; R₂'nin akımı {=if(closed, I2closed, Iopen):2} A → {=if(closed, Iopen, I2closed):2} A.", "Akıl yürütme: Anahtarı kapatmak paralel bir kol ekler, eşdeğer direnç azalır ve ana kol (R₁) akımı artar. R₁'in gerilimi arttığı için paralel kolun gerilimi azalır; bu yüzden R₂'nin akımı azalır. Açmak bunun tersini yapar."],
    en: ["With S open no current flows through R₃; R₁ and R₂ are in series: I = {V} / ({R1} + {R2}) = {=Iopen:2} A (the same in R₁ and R₂).", "With S closed R₂ ∥ R₃ = {=R2*R3/(R2+R3):2} Ω; R<sub>eq</sub> = {R1} + {=R2*R3/(R2+R3):2} = {=R1+R2*R3/(R2+R3):2} Ω.", "With S closed the current in R₁ is {V} / {=R1+R2*R3/(R2+R3):2} = {=Iclosed:2} A; it splits between R₂ and R₃: I₂ = {=Iclosed:2} · {R3} / ({R2} + {R3}) = {=I2closed:2} A.", "When S is {if:closed|opened|closed}: current in R₁ {=if(closed, Iclosed, Iopen):2} A → {=if(closed, Iopen, Iclosed):2} A; current in R₂ {=if(closed, I2closed, Iopen):2} A → {=if(closed, Iopen, I2closed):2} A.", "Reasoning: closing the switch adds a parallel branch, so the equivalent resistance falls and the main current (R₁) rises. The voltage across R₁ rises, so the voltage across the parallel part falls and the current in R₂ decreases. Opening does the opposite."],
    de: ["Bei offenem S fließt durch R₃ kein Strom; R₁ und R₂ liegen in Reihe: I = {V} / ({R1} + {R2}) = {=Iopen:2} A (in R₁ und R₂ gleich).", "Bei geschlossenem S gilt R₂ ∥ R₃ = {=R2*R3/(R2+R3):2} Ω; R<sub>ges</sub> = {R1} + {=R2*R3/(R2+R3):2} = {=R1+R2*R3/(R2+R3):2} Ω.", "Bei geschlossenem S fließt durch R₁ {V} / {=R1+R2*R3/(R2+R3):2} = {=Iclosed:2} A; der Strom teilt sich auf: I₂ = {=Iclosed:2} · {R3} / ({R2} + {R3}) = {=I2closed:2} A.", "Wenn S {if:closed|geöffnet|geschlossen} wird: Strom in R₁ {=if(closed, Iclosed, Iopen):2} A → {=if(closed, Iopen, Iclosed):2} A; Strom in R₂ {=if(closed, I2closed, Iopen):2} A → {=if(closed, Iopen, I2closed):2} A.", "Überlegung: Schließen fügt einen Parallelzweig hinzu, der Gesamtwiderstand sinkt und der Hauptstrom (R₁) steigt. Die Spannung an R₁ steigt, also sinkt die Spannung an der Parallelschaltung und der Strom in R₂ nimmt ab. Öffnen bewirkt das Gegenteil."],
  },
  "fiz-elektrik-seri-yargi": {
    tr: ["Seri devrede R<sub>eş</sub> = {R1} + {R2} = {=R1+R2} Ω ve her dirençten aynı akım geçer: I = {V} / {=R1+R2} = {I} A.", "Gerilimler: V₁ = I · R₁ = {I} · {R1} = {=I*R1} V, V₂ = I · R₂ = {I} · {R2} = {=I*R2} V.", "I. yargı: Aynı akımda gerilim dirençle orantılıdır. {if:R1 > R2|R₁ > R₂ olduğundan V₁ > V₂; yargı doğrudur.|R₁ < R₂ olduğundan V₁ < V₂; yargı yanlıştır.}", "II. yargı: Devre akımı {I} A olduğundan yargı {if:s2|doğrudur|yanlıştır}.", "III. yargı: P₂ = I² · R₂ = {I}² · {R2} = {=I*I*R2} W olduğundan yargı {if:s3|doğrudur|yanlıştır}."],
    en: ["In series R<sub>eq</sub> = {R1} + {R2} = {=R1+R2} Ω and the same current flows everywhere: I = {V} / {=R1+R2} = {I} A.", "Voltages: V₁ = I · R₁ = {I} · {R1} = {=I*R1} V, V₂ = I · R₂ = {I} · {R2} = {=I*R2} V.", "Statement I: with equal current, voltage is proportional to resistance. {if:R1 > R2|R₁ > R₂, so V₁ > V₂; the statement is true.|R₁ < R₂, so V₁ < V₂; the statement is false.}", "Statement II: the current is {I} A, so the statement is {if:s2|true|false}.", "Statement III: P₂ = I² · R₂ = {I}² · {R2} = {=I*I*R2} W, so the statement is {if:s3|true|false}."],
    de: ["In Reihe gilt R<sub>ges</sub> = {R1} + {R2} = {=R1+R2} Ω und überall fließt derselbe Strom: I = {V} / {=R1+R2} = {I} A.", "Spannungen: U₁ = I · R₁ = {I} · {R1} = {=I*R1} V, U₂ = I · R₂ = {I} · {R2} = {=I*R2} V.", "Aussage I: Bei gleichem Strom ist die Spannung proportional zum Widerstand. {if:R1 > R2|R₁ > R₂, also U₁ > U₂; die Aussage ist richtig.|R₁ < R₂, also U₁ < U₂; die Aussage ist falsch.}", "Aussage II: Der Strom beträgt {I} A, die Aussage ist also {if:s2|richtig|falsch}.", "Aussage III: P₂ = I² · R₂ = {I}² · {R2} = {=I*I*R2} W, die Aussage ist also {if:s3|richtig|falsch}."],
  },
  "fiz-elektrik-tel-siralama": {
    tr: ["Bir telin direnci R = ρ · L / A'dır. Teller aynı maddeden olduğu için ρ ortaktır; R, L / A ile orantılıdır.", "R<sub>K</sub> ∝ {lK} / {sK} = {=lK/sK:2}, R<sub>L</sub> ∝ {lL} / {sL} = {=lL/sL:2}, R<sub>M</sub> ∝ {lM} / {sM} = {=lM/sM:2}.", "Uzun ve ince tel daha büyük direnç gösterir."],
    en: ["A wire's resistance is R = ρ · L / A. Same material, so ρ is the same and R is proportional to L / A.", "R<sub>K</sub> ∝ {lK} / {sK} = {=lK/sK:2}, R<sub>L</sub> ∝ {lL} / {sL} = {=lL/sL:2}, R<sub>M</sub> ∝ {lM} / {sM} = {=lM/sM:2}.", "A long, thin wire has a larger resistance."],
    de: ["Der Widerstand eines Drahtes ist R = ρ · l / A. Gleiches Material, also gleiches ρ; R ist proportional zu l / A.", "R<sub>K</sub> ∝ {lK} / {sK} = {=lK/sK:2}, R<sub>L</sub> ∝ {lL} / {sL} = {=lL/sL:2}, R<sub>M</sub> ∝ {lM} / {sM} = {=lM/sM:2}.", "Ein langer, dünner Draht hat einen größeren Widerstand."],
  },
  "fiz-elektrik-kwh": {
    tr: ["Elektrik enerjisi: E = P · t. kWh bulmak için gücü kW'a, süreyi saate çevirelim.", "P = {P} W = {=P/1000} kW.", "Toplam süre: {t} sa/gün · {n} gün = {=t*n} sa.", "E = {=P/1000} kW · {=t*n} sa = {=P*t*n/1000} kWh."],
    en: ["Electrical energy: E = P · t. For kWh, use power in kW and time in hours.", "P = {P} W = {=P/1000} kW.", "Total time: {t} h/day · {n} days = {=t*n} h.", "E = {=P/1000} kW · {=t*n} h = {=P*t*n/1000} kWh."],
    de: ["Elektrische Energie: E = P · t. Für kWh die Leistung in kW und die Zeit in Stunden einsetzen.", "P = {P} W = {=P/1000} kW.", "Gesamtzeit: {t} h/Tag · {n} Tage = {=t*n} h.", "E = {=P/1000} kW · {=t*n} h = {=P*t*n/1000} kWh."],
  },
  "fiz-optik-golge": {
    tr: ["Işık doğrusal yayıldığı için kaynak, diskin kenarları ve gölgenin kenarları aynı doğrular üzerindedir; benzer üçgenler oluşur.", "Gölge çapı / disk çapı = kaynağın perdeye uzaklığı / kaynağın diske uzaklığı.", "D<sub>gölge</sub> / {D} = {y} / {x} = {k}.", "D<sub>gölge</sub> = {D} · {k} = {=D*k} cm."],
    en: ["Light travels in straight lines, so the source, the edges of the disc and the edges of the shadow lie on the same lines; we get similar triangles.", "Shadow diameter / disc diameter = source-to-screen distance / source-to-disc distance.", "D<sub>shadow</sub> / {D} = {y} / {x} = {k}.", "D<sub>shadow</sub> = {D} · {k} = {=D*k} cm."],
    de: ["Licht breitet sich geradlinig aus; Quelle, Scheibenrand und Schattenrand liegen auf denselben Geraden – es entstehen ähnliche Dreiecke.", "Schattendurchmesser / Scheibendurchmesser = Abstand Quelle–Schirm / Abstand Quelle–Scheibe.", "D<sub>Schatten</sub> / {D} = {y} / {x} = {k}.", "D<sub>Schatten</sub> = {D} · {k} = {=D*k} cm."],
  },
  "fiz-optik-ayna": {
    tr: ["{t} saniyede öğrenci {v} · {t} = {=v*t} m yürür; aynaya uzaklığı {x} − {=v*t} = {=x-v*t} m olur.", "Düz aynada görüntü, aynanın arkasında cisimle aynı uzaklıktadır: {=x-v*t} m.", "Öğrenci ile görüntüsü arasındaki uzaklık: 2 · {=x-v*t} = {d} m."],
    en: ["In {t} s the student walks {v} · {t} = {=v*t} m, so the distance to the mirror becomes {x} − {=v*t} = {=x-v*t} m.", "In a plane mirror the image is as far behind the mirror as the object is in front: {=x-v*t} m.", "Distance between student and image: 2 · {=x-v*t} = {d} m."],
    de: ["In {t} s geht die Person {v} · {t} = {=v*t} m; ihr Abstand zum Spiegel ist dann {x} − {=v*t} = {=x-v*t} m.", "Beim ebenen Spiegel liegt das Bild genauso weit hinter dem Spiegel wie der Gegenstand davor: {=x-v*t} m.", "Abstand zwischen Person und Bild: 2 · {=x-v*t} = {d} m."],
  },
  "fiz-dalga-yay": {
    tr: ["Dalga boyu λ, iki ardışık tepe (ya da çukur) arasındaki uzaklıktır. Şekilde bir tam dalga {n} kare uzunluğundadır.", "λ = {n} · {c} = {=n*c} cm.", "Dalganın yayılma hızı: v = λ · f = {=n*c} · {fr} = {=n*c*fr} cm/s."],
    en: ["The wavelength λ is the distance between two neighbouring crests (or troughs). In the figure one full wave spans {n} squares.", "λ = {n} · {c} = {=n*c} cm.", "Wave speed: v = λ · f = {=n*c} · {fr} = {=n*c*fr} cm/s."],
    de: ["Die Wellenlänge λ ist der Abstand zweier benachbarter Wellenberge (oder -täler). In der Abbildung ist eine ganze Welle {n} Kästchen lang.", "λ = {n} · {c} = {=n*c} cm.", "Ausbreitungsgeschwindigkeit: v = λ · f = {=n*c} · {fr} = {=n*c*fr} cm/s."],
  },
  "fiz-dalga-yanki": {
    tr: ["Ses kayalığa gidip geri döner; {t} saniyede alınan yol, uzaklığın iki katıdır: 2x = v · t.", "2x = 340 · {t} = {=340*t} m.", "x = {=340*t} / 2 = {=170*t} m."],
    en: ["The sound travels to the cliff and back, so in {t} s it covers twice the distance: 2x = v · t.", "2x = 340 · {t} = {=340*t} m.", "x = {=340*t} / 2 = {=170*t} m."],
    de: ["Der Schall läuft zur Felswand und zurück; in {t} s legt er den doppelten Abstand zurück: 2x = v · t.", "2x = 340 · {t} = {=340*t} m.", "x = {=340*t} / 2 = {=170*t} m."],
  },

  // ===================== Örnek şablonlar (ornekler.js) =====================
  "ornek-mat-denklem": {
    tr: ["{b}'yi eşitliğin diğer tarafına atalım: {a}<i>x</i> = {c} − {b} = {=c-b}.", "Her iki tarafı {a}'ya bölelim: <i>x</i> = {=c-b} / {a} = {x}.", "Kontrol: {a} · ({x}) + {b} = {c} ✓."],
    en: ["Subtract {b} from both sides: {a}<i>x</i> = {c} − {b} = {=c-b}.", "Divide both sides by {a}: <i>x</i> = {=c-b} / {a} = {x}.", "Check: {a} · ({x}) + {b} = {c} ✓."],
    de: ["Auf beiden Seiten {b} abziehen: {a}<i>x</i> = {c} − {b} = {=c-b}.", "Beide Seiten durch {a} teilen: <i>x</i> = {=c-b} / {a} = {x}.", "Probe: {a} · ({x}) + {b} = {c} ✓."],
  },
  "ornek-kim-mol": {
    tr: ["NaOH'ın mol kütlesi: 23 + 16 + 1 = 40 g/mol.", "Mol sayısı: n = m / M = {m} / 40 = {=m/40:1} mol."],
    en: ["Molar mass of NaOH: 23 + 16 + 1 = 40 g/mol.", "Amount: n = m / M = {m} / 40 = {=m/40:1} mol."],
    de: ["Molare Masse von NaOH: 23 + 16 + 1 = 40 g/mol.", "Stoffmenge: n = m / M = {m} / 40 = {=m/40:1} mol."],
  },
  "ornek-geo-pisagor": {
    tr: ["Pisagor bağıntısı: c² = a² + b².", "c² = {a}² + {b}² = {=a*a} + {=b*b} = {=a*a+b*b}.", "c = √{=a*a+b*b} = {c} cm."],
    en: ["Pythagoras: c² = a² + b².", "c² = {a}² + {b}² = {=a*a} + {=b*b} = {=a*a+b*b}.", "c = √{=a*a+b*b} = {c} cm."],
    de: ["Satz des Pythagoras: c² = a² + b².", "c² = {a}² + {b}² = {=a*a} + {=b*b} = {=a*a+b*b}.", "c = √{=a*a+b*b} = {c} cm."],
  },

  // ===================== Maarif yazılı şablonlarının eksik madde çözümleri =====================
  "maarif-hareket-bisiklet": {
    parts: {
      0: {
        tr: "Ortalama hız = toplam yer değiştirme / toplam süre. 180 s'de konum {x3} m olduğundan v<sub>ort</sub> = {x3} / 180 = {=x3/180:2} m/s.",
        en: "Average velocity = total displacement / total time. At 180 s the position is {x3} m, so v<sub>avg</sub> = {x3} / 180 = {=x3/180:2} m/s.",
        de: "Mittlere Geschwindigkeit = Gesamtverschiebung / Gesamtzeit. Bei 180 s ist der Ort {x3} m, also v<sub>m</sub> = {x3} / 180 = {=x3/180:2} m/s.",
      },
      1: {
        tr: "Her 60 s'lik aralıkta hız = Δx / 60: 0–60 s: {=60*v1} / 60 = {v1} m/s; 60–120 s: {=60*v2} / 60 = {v2} m/s; 120–180 s: {=60*v3} / 60 = {v3} m/s. En büyük hız {vmax} m/s'dir.",
        en: "Speed in each 60 s interval = Δx / 60: 0–60 s: {=60*v1} / 60 = {v1} m/s; 60–120 s: {=60*v2} / 60 = {v2} m/s; 120–180 s: {=60*v3} / 60 = {v3} m/s. The largest is {vmax} m/s.",
        de: "Geschwindigkeit in jedem 60-s-Abschnitt = Δx / 60: 0–60 s: {=60*v1} / 60 = {v1} m/s; 60–120 s: {=60*v2} / 60 = {v2} m/s; 120–180 s: {=60*v3} / 60 = {v3} m/s. Die größte ist {vmax} m/s.",
      },
    },
  },
  "maarif-kuvvet-asansor": {
    parts: {
      0: {
        tr: "Öğrenciye ağırlığı G = m · g = {m} · 10 = {=m*10} N (aşağı) ve baskülün tepki kuvveti N (yukarı) etki eder. {if:d > 0|İvme yukarı yönde: N − G = m · a → N = {=m*10} + {m} · {a} = {N} N.|İvme aşağı yönde: G − N = m · a → N = {=m*10} − {m} · {a} = {N} N.}",
        en: "Two forces act on {ad}: weight W = m · g = {m} · 10 = {=m*10} N (down) and the normal force N from the scale (up). {if:d > 0|The acceleration is upwards: N − W = m · a → N = {=m*10} + {m} · {a} = {N} N.|The acceleration is downwards: W − N = m · a → N = {=m*10} − {m} · {a} = {N} N.}",
        de: "Auf {ad} wirken die Gewichtskraft F<sub>G</sub> = m · g = {m} · 10 = {=m*10} N (nach unten) und die Normalkraft F<sub>N</sub> der Waage (nach oben). {if:d > 0|Beschleunigung nach oben: F<sub>N</sub> − F<sub>G</sub> = m · a → F<sub>N</sub> = {=m*10} + {m} · {a} = {N} N.|Beschleunigung nach unten: F<sub>G</sub> − F<sub>N</sub> = m · a → F<sub>N</sub> = {=m*10} − {m} · {a} = {N} N.}",
      },
      1: {
        tr: "Sabit hızda ivme sıfırdır; net kuvvet sıfır olur ve N = G = {=m*10} N. Önceki değer {N} N olduğundan okunan değer {if:d > 0|azalır|artar}.",
        en: "At constant velocity the acceleration is zero, so the net force is zero and N = W = {=m*10} N. The reading was {N} N, so it {if:d > 0|decreases|increases}.",
        de: "Bei konstanter Geschwindigkeit ist die Beschleunigung null, also F<sub>N</sub> = F<sub>G</sub> = {=m*10} N. Vorher zeigte die Waage {N} N, die Anzeige {if:d > 0|nimmt also ab|nimmt also zu}.",
      },
    },
  },
  "maarif-kuvvet-surtunme-deneyi": {
    parts: {
      0: {
        tr: "Blok sabit hızla çekildiği için net kuvvet sıfırdır: çekme kuvveti = sürtünme kuvveti = {=F2:2} N. Normal kuvvet N = m · g = {m} · 10 = {=m*10} N. k = f / N = {=F2:2} / {=m*10} = {k2:2}.",
        en: "The block moves at constant velocity, so the net force is zero: pulling force = friction force = {=F2:2} N. Normal force N = m · g = {m} · 10 = {=m*10} N. μ = f / N = {=F2:2} / {=m*10} = {k2:2}.",
        de: "Der Klotz bewegt sich mit konstanter Geschwindigkeit, also ist die resultierende Kraft null: Zugkraft = Reibungskraft = {=F2:2} N. Normalkraft F<sub>N</sub> = m · g = {m} · 10 = {=m*10} N. μ = F<sub>R</sub> / F<sub>N</sub> = {=F2:2} / {=m*10} = {k2:2}.",
      },
      1: {
        tr: "Sürtünme kuvveti f = k · N'dir. İkinci blokla normal kuvvet iki katına çıkar, k (yüzeyler aynı) değişmez. Okunan değer {=F2:2} N'dan {=2*F2:2} N'a çıkar, yani artar.",
        en: "Friction is f = μ · N. The second block doubles the normal force while μ (same surfaces) stays the same. The reading goes from {=F2:2} N to {=2*F2:2} N, so it increases.",
        de: "Für die Reibung gilt F<sub>R</sub> = μ · F<sub>N</sub>. Der zweite Klotz verdoppelt die Normalkraft, μ (gleiche Oberflächen) bleibt gleich. Die Anzeige steigt von {=F2:2} N auf {=2*F2:2} N, nimmt also zu.",
      },
    },
  },
  "maarif-basinc-kriko": {
    parts: {
      0: {
        tr: "Pascal ilkesine göre iki pistonun altındaki basınç eşittir: F<sub>1</sub> / A<sub>1</sub> = G / A<sub>2</sub>. F<sub>1</sub> = G · A<sub>1</sub> / A<sub>2</sub> = {G} · {A1} / {A2} = {F1} N.",
        en: "By Pascal's principle the pressure under both pistons is the same: F<sub>1</sub> / A<sub>1</sub> = W / A<sub>2</sub>. F<sub>1</sub> = W · A<sub>1</sub> / A<sub>2</sub> = {G} · {A1} / {A2} = {F1} N.",
        de: "Nach dem Pascal-Prinzip ist der Druck unter beiden Kolben gleich: F<sub>1</sub> / A<sub>1</sub> = F<sub>G</sub> / A<sub>2</sub>. F<sub>1</sub> = F<sub>G</sub> · A<sub>1</sub> / A<sub>2</sub> = {G} · {A1} / {A2} = {F1} N.",
      },
      1: {
        tr: "F<sub>1</sub> = G · A<sub>1</sub> / A<sub>2</sub> olduğundan F<sub>1</sub>, A<sub>1</sub> ile doğru orantılıdır. A<sub>1</sub> iki katına çıkarsa F<sub>1</sub> de {F1} N'dan {=2*F1} N'a çıkar, yani artar.",
        en: "Since F<sub>1</sub> = W · A<sub>1</sub> / A<sub>2</sub>, F<sub>1</sub> is proportional to A<sub>1</sub>. Doubling A<sub>1</sub> raises F<sub>1</sub> from {F1} N to {=2*F1} N, so it increases.",
        de: "Wegen F<sub>1</sub> = F<sub>G</sub> · A<sub>1</sub> / A<sub>2</sub> ist F<sub>1</sub> proportional zu A<sub>1</sub>. Bei doppeltem A<sub>1</sub> steigt F<sub>1</sub> von {F1} N auf {=2*F1} N, nimmt also zu.",
      },
    },
  },
  "maarif-enerji-kaykay": {
    parts: {
      0: {
        tr: "Sürtünme yokken mekanik enerji korunur: m · g · h = ½ · m · v². Kütle sadeleşir: v = √(2 · g · h) = √(2 · 10 · {h}) = √{=20*h} = {v} m/s.",
        en: "Without friction mechanical energy is conserved: m · g · h = ½ · m · v². The mass cancels: v = √(2 · g · h) = √(2 · 10 · {h}) = √{=20*h} = {v} m/s.",
        de: "Ohne Reibung bleibt die mechanische Energie erhalten: m · g · h = ½ · m · v². Die Masse kürzt sich: v = √(2 · g · h) = √(2 · 10 · {h}) = √{=20*h} = {v} m/s.",
      },
      1: {
        tr: "v = √(2 · g · h) bağıntısında kütle yoktur; kütle artınca hem potansiyel hem kinetik enerji aynı oranda artar. En alt noktadaki hız değişmez ({v} m/s).",
        en: "The formula v = √(2 · g · h) does not contain the mass; a larger mass increases potential and kinetic energy in the same ratio. The speed at the bottom does not change ({v} m/s).",
        de: "In v = √(2 · g · h) kommt die Masse nicht vor; bei größerer Masse wachsen Lage- und Bewegungsenergie im selben Verhältnis. Die Geschwindigkeit unten bleibt gleich ({v} m/s).",
      },
    },
  },
  "maarif-elektrik-tasarruf": {
    parts: {
      0: {
        tr: "E = P · t. Günlük: {=P1/1000} kW · {t1} sa = {=e1/1000} kWh. 30 günde: {=e1/1000} · 30 = {kwh} kWh.",
        en: "E = P · t. Per day: {=P1/1000} kW · {t1} h = {=e1/1000} kWh. In 30 days: {=e1/1000} · 30 = {kwh} kWh.",
        de: "E = P · t. Pro Tag: {=P1/1000} kW · {t1} h = {=e1/1000} kWh. In 30 Tagen: {=e1/1000} · 30 = {kwh} kWh.",
      },
      1: {
        tr: "Her cihazın günlük enerjisi E = P · t: ısıtıcı {=e1/1000} kWh, televizyon {=e2/1000} kWh, çamaşır makinesi {=e3/1000} kWh, LED lamba {=e4/1000} kWh. En büyüğü {=emax/1000} kWh'tir. (En çok enerjiyi yalnız gücü değil, güç × süreyi büyük olan cihaz harcar.)",
        en: "Daily energy of each appliance E = P · t: heater {=e1/1000} kWh, TV {=e2/1000} kWh, washing machine {=e3/1000} kWh, LED lamp {=e4/1000} kWh. The largest is {=emax/1000} kWh. (What matters is power × time, not power alone.)",
        de: "Tägliche Energie jedes Geräts E = P · t: Heizlüfter {=e1/1000} kWh, Fernseher {=e2/1000} kWh, Waschmaschine {=e3/1000} kWh, LED-Lampe {=e4/1000} kWh. Am größten: {=emax/1000} kWh. (Entscheidend ist Leistung × Zeit, nicht die Leistung allein.)",
      },
    },
  },
  "maarif-bilim-sarkac": {
    parts: {
      0: {
        tr: "Üç ölçümün ortalaması: ({s1:1} + {s2:1} + {s3:1}) / 3 = {=(s1+s2+s3)/3:2} s. Bu süre 10 salınıma aittir; periyot T = {=(s1+s2+s3)/3:2} / 10 = {T:2} s.",
        en: "Mean of the three trials: ({s1:1} + {s2:1} + {s3:1}) / 3 = {=(s1+s2+s3)/3:2} s. This is for 10 swings, so the period is T = {=(s1+s2+s3)/3:2} / 10 = {T:2} s.",
        de: "Mittelwert der drei Messungen: ({s1:1} + {s2:1} + {s3:1}) / 3 = {=(s1+s2+s3)/3:2} s. Das gilt für 10 Schwingungen, also T = {=(s1+s2+s3)/3:2} / 10 = {T:2} s.",
      },
    },
  },
});
