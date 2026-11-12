// FİZİK · 11. ve 12. sınıf (AYT) eksik konular: kavram soruları ve yeni hesap kalıpları
// Tüm sorular ve çözümler bu proje için özgün olarak yazılmıştır.  g = 10 m/s².
(function () {
  "use strict";
  const T = (tr, en, de) => ({ tr, en, de });
  const add = (t) => QB.add({ subject: "fizik", ...t });
  const V = (q, right, wrong, why) => ({ q, right, wrong, why });

  // ===================== KAVRAM SORULARI =====================

  add({
    id: "fiz11-kavram-mekanik", topic: "kuvvet", grade: 11, level: 2,
    bank: [
      V(T("Sürtünmesiz ortamda eğik atılan bir cisim yörüngesinin tepe noktasındayken aşağıdakilerden hangisi doğrudur?", "For an object launched at an angle without air resistance, which statement is true at the top of its path?", "Was gilt im höchsten Punkt eines schiefen Wurfs ohne Luftwiderstand?"),
        T("Hızının yalnızca yatay bileşeni vardır ve ivmesi g'dir", "Its velocity has only a horizontal component and its acceleration is g", "Die Geschwindigkeit hat nur eine waagerechte Komponente, die Beschleunigung ist g"),
        [T("Hızı ve ivmesi sıfırdır", "Its velocity and acceleration are zero", "Geschwindigkeit und Beschleunigung sind null"), T("Hızı sıfır, ivmesi g'dir", "Its velocity is zero and its acceleration is g", "Geschwindigkeit null, Beschleunigung g"), T("İvmesi sıfırdır", "Its acceleration is zero", "Die Beschleunigung ist null"), T("Hızı en büyük değerindedir", "Its speed is at its maximum", "Die Geschwindigkeit ist am größten"), T("Hızının yalnızca düşey bileşeni vardır", "Its velocity has only a vertical component", "Die Geschwindigkeit hat nur eine senkrechte Komponente")],
        T("Yatayda kuvvet olmadığından hızın yatay bileşeni sabit kalır; düşey bileşen tepe noktasında sıfırdır. Yer çekimi her an etki ettiği için ivme her noktada g'dir (aşağı yönde). Bu yüzden tepede sürat en küçüktür, sıfır değildir.",
          "There is no horizontal force, so the horizontal velocity stays constant; the vertical component is zero at the top. Gravity acts all the time, so the acceleration is g (downwards) everywhere. The speed is smallest at the top but not zero.",
          "Waagerecht wirkt keine Kraft, die waagerechte Komponente bleibt konstant; die senkrechte ist im Scheitel null. Die Schwerkraft wirkt immer, die Beschleunigung ist überall g (nach unten). Im Scheitel ist der Betrag am kleinsten, aber nicht null.")),
      V(T("Kendi ekseni etrafında dönen bir buz patencisi açık kollarını gövdesine çekiyor. Patencinin dönme hızı nasıl değişir?", "A spinning ice skater pulls in her outstretched arms. How does her rate of spin change?", "Eine sich drehende Eiskunstläuferin zieht die ausgestreckten Arme an. Wie ändert sich die Drehgeschwindigkeit?"),
        T("Artar, çünkü açısal momentum korunurken eylemsizlik momenti azalır", "It increases, because angular momentum is conserved while the moment of inertia decreases", "Sie nimmt zu, weil der Drehimpuls erhalten bleibt und das Trägheitsmoment sinkt"),
        [T("Azalır, çünkü kütlesi azalır", "It decreases, because her mass decreases", "Sie nimmt ab, weil die Masse sinkt"), T("Değişmez, çünkü dış kuvvet yoktur", "It stays the same, because there is no external force", "Sie bleibt gleich, weil keine äußere Kraft wirkt"), T("Azalır, çünkü açısal momentum azalır", "It decreases, because angular momentum decreases", "Sie nimmt ab, weil der Drehimpuls abnimmt"), T("Artar, çünkü kinetik enerji korunur", "It increases, because kinetic energy is conserved", "Sie nimmt zu, weil die kinetische Energie erhalten bleibt"), T("Önce artar sonra sıfıra iner", "It first increases and then drops to zero", "Sie steigt erst und fällt dann auf null")],
        T("Dış tork olmadığında açısal momentum L = I · ω korunur. Kollar gövdeye yaklaşınca kütle dönme eksenine yaklaşır, eylemsizlik momenti I azalır; L sabit kalması için ω artar. (Kinetik enerji ise artar; patenci kollarını çekerken iş yapar.)",
          "With no external torque, angular momentum L = I · ω is conserved. Pulling the arms in brings mass closer to the axis, reducing I, so ω must increase. (Kinetic energy actually increases; the skater does work pulling her arms in.)",
          "Ohne äußeres Drehmoment bleibt der Drehimpuls L = I · ω erhalten. Werden die Arme angezogen, sinkt das Trägheitsmoment I, also steigt ω. (Die kinetische Energie steigt sogar; die Läuferin verrichtet Arbeit.)")),
      V(T("Basit harmonik hareket yapan bir cisim denge noktasından geçerken aşağıdakilerden hangisi doğrudur?", "For an object in simple harmonic motion passing through the equilibrium position, which is true?", "Was gilt für einen harmonisch schwingenden Körper beim Durchgang durch die Ruhelage?"),
        T("Hızı en büyük, ivmesi sıfırdır", "Its speed is maximum and its acceleration is zero", "Die Geschwindigkeit ist maximal, die Beschleunigung null"),
        [T("Hızı sıfır, ivmesi en büyüktür", "Its speed is zero and its acceleration is maximum", "Geschwindigkeit null, Beschleunigung maximal"), T("Hızı ve ivmesi en büyüktür", "Both speed and acceleration are maximum", "Beide sind maximal"), T("Hızı ve ivmesi sıfırdır", "Both are zero", "Beide sind null"), T("Geri çağırıcı kuvvet en büyüktür", "The restoring force is maximum", "Die Rückstellkraft ist maximal"), T("Potansiyel enerjisi en büyüktür", "Its potential energy is maximum", "Die potenzielle Energie ist maximal")],
        T("BHH'de geri çağırıcı kuvvet ve ivme uzanımla orantılıdır (F = −k·x). Denge noktasında x = 0 olduğundan kuvvet ve ivme sıfırdır; potansiyel enerjinin tamamı kinetik enerjiye dönüşmüştür, hız en büyüktür. Uç noktalarda ise tersi olur.",
          "In SHM the restoring force and acceleration are proportional to displacement (F = −k·x). At equilibrium x = 0, so force and acceleration are zero; all the potential energy has turned into kinetic energy and the speed is maximum. At the end points it is the reverse.",
          "Bei der harmonischen Schwingung sind Rückstellkraft und Beschleunigung proportional zur Auslenkung (F = −k·x). In der Ruhelage ist x = 0: Kraft und Beschleunigung sind null, die Energie ist ganz kinetisch, die Geschwindigkeit maximal. In den Umkehrpunkten umgekehrt.")),
      V(T("Kepler'in ikinci yasasına göre bir gezegen için aşağıdakilerden hangisi doğrudur?", "According to Kepler's second law, which statement about a planet is true?", "Was gilt nach dem zweiten keplerschen Gesetz für einen Planeten?"),
        T("Güneş'e yakınken daha hızlı, uzakken daha yavaş hareket eder", "It moves faster when close to the Sun and slower when far away", "In Sonnennähe bewegt er sich schneller, in Sonnenferne langsamer"),
        [T("Yörüngesinin her yerinde aynı süratle hareket eder", "It moves at the same speed everywhere", "Er bewegt sich überall gleich schnell"), T("Güneş'e yakınken daha yavaş hareket eder", "It moves slower when close to the Sun", "In Sonnennähe ist er langsamer"), T("Yörüngesi tam bir çemberdir", "Its orbit is a perfect circle", "Seine Bahn ist ein genauer Kreis"), T("Periyodu yörünge yarıçapıyla doğru orantılıdır", "Its period is proportional to the orbit radius", "Die Umlaufzeit ist proportional zum Bahnradius"), T("Güneş yörüngenin merkezindedir", "The Sun is at the centre of the orbit", "Die Sonne steht im Mittelpunkt der Bahn")],
        T("İkinci yasa: Güneş'i gezegene birleştiren doğru eşit zamanlarda eşit alanlar tarar. Güneş'e yakınken yarıçap kısa olduğundan eşit alan taramak için gezegen daha hızlı gitmelidir. (Birinci yasa: yörünge elips, Güneş odaklardan birinde; üçüncü yasa: T² ∝ r³.)",
          "Second law: the line from the Sun to the planet sweeps out equal areas in equal times. Near the Sun the line is short, so the planet must move faster to sweep the same area. (First law: elliptical orbit with the Sun at one focus; third law: T² ∝ r³.)",
          "Zweites Gesetz: Der Fahrstrahl überstreicht in gleichen Zeiten gleiche Flächen. In Sonnennähe ist er kurz, also muss der Planet schneller sein. (Erstes Gesetz: Ellipse, Sonne in einem Brennpunkt; drittes Gesetz: T² ∝ r³.)")),
      V(T("Bir iletken çerçeveden geçen manyetik akı değiştiğinde oluşan indüksiyon akımının yönü için aşağıdakilerden hangisi doğrudur (Lenz yasası)?", "When the magnetic flux through a conducting loop changes, which statement about the direction of the induced current is true (Lenz's law)?", "Was gilt für die Richtung des Induktionsstroms, wenn sich der magnetische Fluss durch eine Leiterschleife ändert (lenzsche Regel)?"),
        T("Akım, kendisini oluşturan akı değişimine karşı koyacak yöndedir", "The current flows so as to oppose the change in flux that causes it", "Der Strom ist so gerichtet, dass er der Flussänderung entgegenwirkt"),
        [T("Akım, akı değişimini her zaman artıracak yöndedir", "The current always flows so as to increase the change in flux", "Der Strom verstärkt immer die Flussänderung"), T("Akı sabitken de akım oluşur", "A current flows even when the flux is constant", "Auch bei konstantem Fluss fließt Strom"), T("Akımın yönü yalnız telin cinsine bağlıdır", "The direction depends only on the wire material", "Die Richtung hängt nur vom Drahtmaterial ab"), T("İndüksiyon akımı her zaman saat yönündedir", "The induced current is always clockwise", "Der Induktionsstrom fließt immer im Uhrzeigersinn"), T("İndüksiyon akımı enerjiyi kendiliğinden artırır", "The induced current creates energy by itself", "Der Induktionsstrom erzeugt von selbst Energie")],
        T("Lenz yasası enerjinin korunumunun bir sonucudur: indüklenen akımın manyetik alanı, akıdaki artışa ya da azalışa karşı koyar. Akım değişime yardım etseydi kendi kendini besleyerek enerji yoktan var olurdu. Akı sabitse indüksiyon olmaz.",
          "Lenz's law follows from energy conservation: the induced current's field opposes the increase or decrease in flux. If it helped the change, it would feed itself and create energy from nothing. Constant flux induces nothing.",
          "Die lenzsche Regel folgt aus der Energieerhaltung: Das Feld des Induktionsstroms wirkt der Zu- oder Abnahme des Flusses entgegen. Würde es die Änderung unterstützen, entstünde Energie aus dem Nichts. Konstanter Fluss induziert nichts.")),
      V(T("Bir transformatör (trafo) doğru akım kaynağına bağlanırsa ne olur?", "What happens if a transformer is connected to a direct-current (DC) source?", "Was passiert, wenn ein Transformator an eine Gleichstromquelle angeschlossen wird?"),
        T("İkincil bobinde (açma–kapama anları dışında) gerilim oluşmaz", "No voltage appears in the secondary coil (except at the moments of switching on and off)", "In der Sekundärspule entsteht (außer beim Ein- und Ausschalten) keine Spannung"),
        [T("İkincil bobinde daha büyük bir doğru gerilim oluşur", "A larger DC voltage appears in the secondary", "In der Sekundärspule entsteht eine größere Gleichspannung"), T("Gerilim sarım sayılarıyla orantılı olarak dönüştürülür", "The voltage is transformed in proportion to the turns", "Die Spannung wird im Verhältnis der Windungszahlen übersetzt"), T("İkincil bobinde alternatif akım oluşur", "An alternating current appears in the secondary", "In der Sekundärspule entsteht Wechselstrom"), T("Transformatör daha verimli çalışır", "The transformer works more efficiently", "Der Transformator arbeitet effizienter"), T("Birincil bobinden akım geçmez", "No current flows in the primary", "In der Primärspule fließt kein Strom")],
        T("Transformatör indüksiyonla çalışır; ikincil bobinde gerilim oluşması için çekirdekteki manyetik akının değişmesi gerekir. Doğru akımda akı sabit kalır (yalnız devre açılıp kapanırken değişir), bu yüzden gerilim dönüştürülmez. Birincil bobinden ise doğru akım geçer ve bobin ısınır.",
          "A transformer works by induction: the flux in the core must change to induce a voltage in the secondary. With DC the flux is constant (it changes only when switching), so no voltage is transformed. A direct current does flow in the primary and heats it.",
          "Ein Transformator arbeitet mit Induktion; dafür muss sich der Fluss im Kern ändern. Bei Gleichstrom ist er konstant (nur beim Schalten ändert er sich), also wird keine Spannung übertragen. In der Primärspule fließt Gleichstrom und erwärmt sie.")),
    ],
  });

  add({
    id: "fiz12-kavram-modern", topic: "modern", grade: 12, level: 2,
    bank: [
      V(T("Fotoelektrik olayda metalden sökülen elektronların <b>en büyük kinetik enerjisi</b> neye bağlıdır?", "In the photoelectric effect, what does the <b>maximum kinetic energy</b> of the emitted electrons depend on?", "Wovon hängt beim Photoeffekt die <b>maximale kinetische Energie</b> der Elektronen ab?"),
        T("Gelen ışığın frekansına ve metalin eşik enerjisine", "The frequency of the light and the metal's work function", "Von der Frequenz des Lichts und der Austrittsarbeit des Metalls"),
        [T("Yalnızca ışığın şiddetine", "Only the intensity of the light", "Nur von der Lichtintensität"), T("Işığın aydınlatma süresine", "How long the light shines", "Von der Beleuchtungsdauer"), T("Metal levhanın büyüklüğüne", "The size of the metal plate", "Von der Größe der Metallplatte"), T("Işık kaynağının uzaklığına", "The distance of the light source", "Vom Abstand der Lichtquelle"), T("Devredeki direncin değerine", "The resistance in the circuit", "Vom Widerstand im Stromkreis")],
        T("Einstein: E<sub>k,max</sub> = h·f − W<sub>0</sub>. Bir foton enerjisini tek bir elektrona verir; foton enerjisi frekansa bağlıdır. Işık şiddeti foton sayısını, dolayısıyla sökülen elektron sayısını (akımı) artırır ama tek bir elektronun enerjisini değiştirmez.",
          "Einstein: E<sub>k,max</sub> = h·f − W<sub>0</sub>. One photon gives its energy to one electron, and photon energy depends on frequency. Intensity raises the number of photons and hence of electrons (the current), but not the energy of each electron.",
          "Einstein: E<sub>kin,max</sub> = h·f − W<sub>A</sub>. Ein Photon gibt seine Energie an ein Elektron ab; die Photonenenergie hängt von der Frequenz ab. Die Intensität erhöht die Anzahl der Photonen und Elektronen (den Strom), nicht aber die Energie eines Elektrons.")),
      V(T("Compton olayı ışığın hangi özelliğinin kanıtıdır?", "The Compton effect is evidence for which property of light?", "Wofür ist der Compton-Effekt ein Beleg?"),
        T("Tanecik (foton) özelliğinin; fotonun momentumu vardır", "Its particle (photon) nature; photons carry momentum", "Für die Teilchennatur des Lichts; Photonen haben Impuls"),
        [T("Yalnızca dalga özelliğinin", "Only its wave nature", "Nur für die Wellennatur"), T("Işığın kırılmasının", "Refraction of light", "Für die Lichtbrechung"), T("Işığın kutuplanmasının", "Polarisation of light", "Für die Polarisation"), T("Işığın girişim yapmasının", "Interference of light", "Für die Interferenz"), T("Işığın boşlukta yavaşlamasının", "Light slowing down in a vacuum", "Dafür, dass Licht im Vakuum langsamer wird")],
        T("Compton olayında X ışını fotonu bir elektrona çarpar; elektron enerji ve momentum kazanır, saçılan fotonun dalga boyu artar. Çarpışma, momentumu ve enerjisi olan tanecikler gibi çözümlenir. Girişim, kırınım ve kutuplanma ise dalga özelliğini gösterir.",
          "In the Compton effect an X-ray photon collides with an electron; the electron gains energy and momentum and the scattered photon's wavelength increases. The collision is analysed like one between particles with energy and momentum. Interference, diffraction and polarisation show the wave nature.",
          "Beim Compton-Effekt stößt ein Röntgenphoton mit einem Elektron zusammen; das Elektron erhält Energie und Impuls, die Wellenlänge des gestreuten Photons wächst. Der Stoß wird wie zwischen Teilchen berechnet. Interferenz, Beugung und Polarisation zeigen die Wellennatur.")),
      V(T("Bir çekirdek <b>alfa</b> bozunması yaptığında kütle numarası (A) ve atom numarası (Z) nasıl değişir?", "When a nucleus undergoes <b>alpha</b> decay, how do its mass number (A) and atomic number (Z) change?", "Wie ändern sich Massenzahl (A) und Ordnungszahl (Z) beim <b>Alpha</b>-Zerfall?"),
        T("A 4 azalır, Z 2 azalır", "A decreases by 4, Z by 2", "A sinkt um 4, Z um 2"),
        [T("A değişmez, Z 1 artar", "A unchanged, Z increases by 1", "A gleich, Z steigt um 1"), T("A ve Z değişmez", "A and Z unchanged", "A und Z bleiben gleich"), T("A 2 azalır, Z 4 azalır", "A decreases by 2, Z by 4", "A sinkt um 2, Z um 4"), T("A 4 artar, Z 2 artar", "A increases by 4, Z by 2", "A steigt um 4, Z um 2"), T("A değişmez, Z 1 azalır", "A unchanged, Z decreases by 1", "A gleich, Z sinkt um 1")],
        T("Alfa parçacığı bir helyum çekirdeğidir (2 proton + 2 nötron). Çekirdek bu parçacığı atınca 4 nükleon ve 2 proton kaybeder: A − 4, Z − 2. Beta eksi bozunmasında A değişmez, Z 1 artar; gama ışımasında ikisi de değişmez.",
          "An alpha particle is a helium nucleus (2 protons + 2 neutrons). Emitting it removes 4 nucleons and 2 protons: A − 4, Z − 2. In beta-minus decay A is unchanged and Z rises by 1; gamma emission changes neither.",
          "Ein Alphateilchen ist ein Heliumkern (2 Protonen + 2 Neutronen). Der Kern verliert 4 Nukleonen und 2 Protonen: A − 4, Z − 2. Beim Beta-minus-Zerfall bleibt A gleich und Z steigt um 1; Gammastrahlung ändert beides nicht.")),
      V(T("Aşağıdaki elektromanyetik dalgalardan hangisinin frekansı en büyüktür?", "Which of these electromagnetic waves has the highest frequency?", "Welche dieser elektromagnetischen Wellen hat die größte Frequenz?"),
        T("Gama ışınları", "Gamma rays", "Gammastrahlung"),
        [T("Radyo dalgaları", "Radio waves", "Radiowellen"), T("Mikrodalgalar", "Microwaves", "Mikrowellen"), T("Kızılötesi ışınlar", "Infrared", "Infrarot"), T("Görünür ışık", "Visible light", "Sichtbares Licht"), T("Morötesi ışınlar", "Ultraviolet", "Ultraviolett")],
        T("Elektromanyetik spektrum, frekansın artışına göre: radyo → mikrodalga → kızılötesi → görünür → morötesi → X ışınları → gama. Hepsi boşlukta ışık hızıyla yayılır; frekans arttıkça dalga boyu kısalır ve foton enerjisi (E = h·f) artar.",
          "The electromagnetic spectrum in order of increasing frequency: radio → microwave → infrared → visible → ultraviolet → X-rays → gamma. All travel at the speed of light in a vacuum; higher frequency means shorter wavelength and higher photon energy (E = h·f).",
          "Das elektromagnetische Spektrum nach steigender Frequenz: Radio → Mikrowelle → Infrarot → sichtbar → Ultraviolett → Röntgen → Gamma. Alle breiten sich im Vakuum mit Lichtgeschwindigkeit aus; höhere Frequenz bedeutet kürzere Wellenlänge und größere Photonenenergie (E = h·f).")),
      V(T("Güneş pillerinin elektrik üretmesi hangi olaya dayanır?", "What phenomenon do solar cells rely on to produce electricity?", "Auf welchem Effekt beruht die Stromerzeugung in Solarzellen?"),
        T("Fotovoltaik etkiye (ışığın yarı iletkende elektron–boşluk çifti oluşturmasına)", "The photovoltaic effect (light creating electron–hole pairs in a semiconductor)", "Auf dem photovoltaischen Effekt (Licht erzeugt Elektron-Loch-Paare im Halbleiter)"),
        [T("Elektromanyetik indüksiyona", "Electromagnetic induction", "Auf elektromagnetischer Induktion"), T("Sürtünmeyle elektriklenmeye", "Charging by friction", "Auf Reibungselektrizität"), T("Isının iletimine", "Heat conduction", "Auf Wärmeleitung"), T("Radyoaktif bozunmaya", "Radioactive decay", "Auf radioaktivem Zerfall"), T("Süper iletkenliğe", "Superconductivity", "Auf Supraleitung")],
        T("Yarı iletken eklemde (p–n) yeterli enerjili fotonlar elektronları serbest bırakır; eklemdeki elektrik alan bu yükleri ayırarak bir gerilim ve akım oluşturur. Bu, fotoelektrik olayla akraba bir kuantum etkidir; hareketli parça veya mıknatıs gerekmez.",
          "In a semiconductor p–n junction, photons with enough energy free electrons; the junction's electric field separates the charges and produces a voltage and current. It is a quantum effect related to the photoelectric effect, with no moving parts or magnets.",
          "Im p-n-Übergang eines Halbleiters setzen Photonen mit genügend Energie Elektronen frei; das elektrische Feld trennt die Ladungen und erzeugt Spannung und Strom. Ein dem Photoeffekt verwandter Quanteneffekt – ohne bewegte Teile oder Magnete.")),
      V(T("Aşağıdakilerden hangisi Büyük Patlama (Big Bang) modelini destekleyen gözlemsel kanıtlardan biridir?", "Which of the following is observational evidence supporting the Big Bang model?", "Welche Beobachtung stützt das Urknallmodell?"),
        T("Kozmik mikrodalga arka plan ışıması", "The cosmic microwave background radiation", "Die kosmische Mikrowellen-Hintergrundstrahlung"),
        [T("Ay'ın evreleri", "The phases of the Moon", "Die Mondphasen"), T("Mevsimlerin oluşması", "The seasons", "Die Jahreszeiten"), T("Gelgit olayları", "Tides", "Die Gezeiten"), T("Gökkuşağının oluşması", "Rainbows", "Regenbögen"), T("Kuzey ışıklarının oluşması", "The northern lights", "Polarlichter")],
        T("Evrenin her yönünden gelen, yaklaşık 2,7 K sıcaklığa karşılık gelen düzgün mikrodalga ışıması, erken evrenin sıcak ve yoğun döneminden kalan izdir. Galaksilerin birbirinden uzaklaşması (kırmızıya kayma) ve hafif elementlerin oranları da modeli destekler. Diğer seçenekler Güneş sistemi ve atmosfer olaylarıdır.",
          "Uniform microwave radiation from every direction, corresponding to about 2.7 K, is left over from the hot, dense early universe. Galaxies receding from each other (redshift) and the abundance of light elements also support the model. The other options are Solar-System or atmospheric phenomena.",
          "Die gleichmäßige Mikrowellenstrahlung aus allen Richtungen (etwa 2,7 K) ist ein Überbleibsel des heißen, dichten frühen Universums. Auch die Fluchtbewegung der Galaxien (Rotverschiebung) und die Häufigkeit leichter Elemente stützen das Modell. Die anderen Optionen sind Erscheinungen im Sonnensystem oder in der Atmosphäre.")),
      V(T("Lazer ışığını sıradan ampul ışığından ayıran özellik aşağıdakilerden hangisidir?", "What distinguishes laser light from the light of an ordinary bulb?", "Was unterscheidet Laserlicht vom Licht einer gewöhnlichen Glühlampe?"),
        T("Uyarılmış ışımayla üretilen, tek renkli ve eş fazlı (koherent) ışık olması", "It is produced by stimulated emission and is monochromatic and coherent", "Es entsteht durch stimulierte Emission und ist einfarbig und kohärent"),
        [T("Her renkten ışık içermesi", "It contains every colour", "Es enthält alle Farben"), T("Boşlukta ışık hızından hızlı gitmesi", "It travels faster than light in a vacuum", "Es ist im Vakuum schneller als das Licht"), T("Yalnızca ısıtılan telden yayılması", "It is emitted only by a heated filament", "Es wird nur von einem Glühdraht ausgesandt"), T("Ses dalgası olması", "It is a sound wave", "Es ist eine Schallwelle"), T("Kırılmaya uğramaması", "It cannot be refracted", "Es wird nicht gebrochen")],
        T("Lazerde uyarılmış atomlar, gelen bir fotonla aynı frekans, faz ve yönde yeni fotonlar salar (uyarılmış ışıma). Sonuç tek renkli, eş fazlı ve çok az dağılan bir ışın demetidir. Ampul ise ısıyla, birçok dalga boyunda ve rastgele fazlarda ışık yayar.",
          "In a laser, excited atoms release new photons with the same frequency, phase and direction as an incoming photon (stimulated emission). The result is a single-colour, coherent, narrow beam. A bulb emits by heating, at many wavelengths and random phases.",
          "Im Laser geben angeregte Atome Photonen gleicher Frequenz, Phase und Richtung wie ein einfallendes Photon ab (stimulierte Emission). Das ergibt einen einfarbigen, kohärenten, engen Strahl. Eine Glühlampe strahlt thermisch, mit vielen Wellenlängen und zufälligen Phasen.")),
    ],
  });

  // ===================== YENİ HESAP KALIPLARI =====================

  add({
    id: "fiz11-transformator", topic: "manyetizma", grade: 11, level: 1,
    vars: { Np: { values: [100, 200, 400, 500, 1000] }, Ns: { values: [50, 100, 200, 1000, 2000] }, Vp: { values: [12, 24, 110, 220] }, Vs: "Vp * Ns / Np" },
    where: ["Np != Ns", "abs(Vs * 10 - round(Vs * 10)) < 0.000001"],
    answer: "Vs", unit: "V",
    distractors: ["Vp * Np / Ns", "Vp", "Vp * Ns", "Vp + Ns - Np"],
    text: T(
      "İdeal bir transformatörün birincil bobininde {Np}, ikincil bobininde {Ns} sarım vardır. Birincil bobine {Vp} V'luk alternatif gerilim uygulanırsa ikincil bobinin uçları arasındaki gerilim kaç V olur?",
      "An ideal transformer has {Np} turns on the primary and {Ns} turns on the secondary. If {Vp} V AC is applied to the primary, what is the secondary voltage in volts?",
      "Ein idealer Transformator hat {Np} Windungen auf der Primär- und {Ns} auf der Sekundärseite. Welche Sekundärspannung in Volt ergibt sich bei {Vp} V Wechselspannung primär?"),
  });

  add({
    id: "fiz12-gezegen-g", topic: "kutlecekim", grade: 12, level: 2,
    vars: { k: { values: [2, 3, 4, 8, 9] }, n: { values: [2, 3] }, g: "10 * k / (n * n)" },
    where: "abs(g * 100 - round(g * 100)) < 0.000001",
    answer: "g", unit: "m/s²",
    distractors: ["10 * k / n", "10 * k * n * n", "10 * n * n / k", "10 * k"],
    text: T(
      "Bir gezegenin kütlesi Dünya'nınkinin {k} katı, yarıçapı ise Dünya'nınkinin {n} katıdır. Bu gezegenin yüzeyinde yer çekimi ivmesi kaç m/s²'dir? (Dünya'da g = 10 m/s²)",
      "A planet has {k} times Earth's mass and {n} times Earth's radius. What is the gravitational acceleration at its surface, in m/s²? (On Earth g = 10 m/s²)",
      "Ein Planet hat die {k}-fache Masse und den {n}-fachen Radius der Erde. Wie groß ist die Fallbeschleunigung an seiner Oberfläche in m/s²? (Auf der Erde g = 10 m/s²)"),
  });

  add({
    id: "fiz12-kepler", topic: "kutlecekim", grade: 12, level: 2,
    vars: { k: { values: [4, 9, 16, 25, 36, 49, 64, 100] } },
    answer: "k * sqrt(k)", unit: { tr: "yıl", en: "years", de: "Jahre" },
    distractors: ["k", "k * k", "sqrt(k)", "2 * k"],
    text: T(
      "Bir gezegenin Güneş çevresindeki yörüngesinin ortalama yarıçapı, Dünya'nınkinin {k} katıdır. Kepler'in üçüncü yasasına göre bu gezegenin dolanım periyodu kaç yıldır? (Dünya'nın periyodu 1 yıl)",
      "A planet's mean orbital radius around the Sun is {k} times Earth's. According to Kepler's third law, what is its orbital period in years? (Earth's period is 1 year)",
      "Der mittlere Bahnradius eines Planeten um die Sonne ist {k}-mal so groß wie der der Erde. Wie groß ist nach dem dritten keplerschen Gesetz seine Umlaufzeit in Jahren? (Erde: 1 Jahr)"),
  });

  add({
    id: "fiz12-young", topic: "dalga", grade: 12, level: 2,
    vars: { lam: { values: [400, 500, 600] }, L: { values: [1, 1.5, 2] }, d: { values: [0.2, 0.25, 0.5, 1] }, dx: "lam * L / d / 1000" },
    where: "abs(dx * 100 - round(dx * 100)) < 0.000001",
    answer: "dx", unit: "mm",
    distractors: ["lam * d / L / 1000", "lam * L * d / 1000", "2 * dx", "dx / 2"],
    text: T(
      "Young'ın çift yarık deneyinde dalga boyu {lam} nm olan tek renkli ışık kullanılıyor. Yarıklar arası uzaklık {d} mm, yarıklarla perde arası uzaklık {L} m'dir. Perdede ardışık iki aydınlık saçak arasındaki uzaklık kaç mm'dir?",
      "In Young's double-slit experiment, monochromatic light of wavelength {lam} nm is used. The slit separation is {d} mm and the screen is {L} m away. What is the spacing between neighbouring bright fringes, in mm?",
      "Im Doppelspaltversuch nach Young wird einfarbiges Licht der Wellenlänge {lam} nm verwendet. Spaltabstand {d} mm, Abstand zum Schirm {L} m. Wie groß ist der Abstand benachbarter heller Streifen in mm?"),
  });

  add({
    id: "fiz12-yari-omur", topic: "atom", grade: 12, level: 1,
    vars: { N0: { values: [64, 80, 160, 320, 480, 640] }, T: { values: [2, 5, 8, 10] }, n: { values: [1, 2, 3, 4] }, t: "n * T" },
    answer: "N0 / 2 ^ n", unit: "g",
    distractors: ["N0 / (2 * n)", "N0 - N0 / 2 ^ n", "N0 / n", "N0 / 2 ^ (n + 1)"],
    text: T(
      "Yarı ömrü {T} gün olan radyoaktif bir maddenin başlangıçta {N0} g'ı vardır. {t} gün sonra bozunmadan kalan madde miktarı kaç g'dır?",
      "A radioactive substance has a half-life of {T} days and there are initially {N0} g. How many grams remain undecayed after {t} days?",
      "Eine radioaktive Substanz hat eine Halbwertszeit von {T} Tagen; anfangs sind {N0} g vorhanden. Wie viel Gramm sind nach {t} Tagen noch nicht zerfallen?"),
  });

  add({
    id: "fiz12-bohr", topic: "atom", grade: 12, level: 2,
    vars: { s: { values: [1, 2, 3, 4, 5] }, n1: "pick(s, 1, 1, 2, 2, 3)", n2: "pick(s, 2, 3, 3, 4, 4)", E: "13.6 * (1 / (n1 * n1) - 1 / (n2 * n2))" },
    answer: "E", decimals: 2, unit: "eV",
    distractors: ["13.6 / (n2 * n2)", "13.6 / (n1 * n1)", "13.6 * (1 / n1 - 1 / n2)", "13.6 * (1 / (n1 * n1) + 1 / (n2 * n2))"],
    text: T(
      "Bohr atom modeline göre hidrojen atomunda n. enerji düzeyinin enerjisi E<sub>n</sub> = −13,6 / n² eV'tur. Elektron n = {n2} düzeyinden n = {n1} düzeyine geçerken yayımlanan fotonun enerjisi kaç eV'tur?",
      "In the Bohr model of hydrogen the energy of level n is E<sub>n</sub> = −13.6 / n² eV. What is the energy, in eV, of the photon emitted when the electron drops from n = {n2} to n = {n1}?",
      "Im bohrschen Atommodell des Wasserstoffs ist die Energie des n-ten Niveaus E<sub>n</sub> = −13,6 / n² eV. Welche Energie in eV hat das Photon, das beim Übergang von n = {n2} nach n = {n1} ausgesandt wird?"),
  });

  add({
    id: "fiz12-de-broglie", topic: "modern", grade: 12, level: 2,
    vars: { lam: { values: [12, 24, 36, 48, 60] }, k: { values: [2, 3, 4] }, n: { values: [2, 3] }, L2: "lam / (k * n)" },
    where: "abs(L2 * 10 - round(L2 * 10)) < 0.000001",
    answer: "L2", unit: "pm",
    distractors: ["lam * k * n", "lam * k / n", "lam * n / k", "lam / (k + n)"],
    text: T(
      "Bir parçacığın de Broglie dalga boyu {lam} pm'dir. Parçacığın kütlesi {k} katına ve hızı {n} katına çıkarılırsa (göreli olmayan durumda) de Broglie dalga boyu kaç pm olur?",
      "A particle's de Broglie wavelength is {lam} pm. If its mass is multiplied by {k} and its speed by {n} (non-relativistic), what is its new de Broglie wavelength in pm?",
      "Die De-Broglie-Wellenlänge eines Teilchens beträgt {lam} pm. Wie groß ist sie in pm, wenn die Masse mit {k} und die Geschwindigkeit mit {n} multipliziert wird (nichtrelativistisch)?"),
  });

  add({
    id: "fiz12-zaman-genislemesi", topic: "modern", grade: 12, level: 2,
    vars: { s: { values: [1, 2] }, b: "pick(s, 0.6, 0.8)", g: "pick(s, 1.25, 5 / 3)", t0: { values: [3, 6, 9, 12, 24] }, t: "t0 * g" },
    where: "abs(t * 100 - round(t * 100)) < 0.000001",
    answer: "t", decimals: 2, unit: { tr: "yıl", en: "years", de: "Jahre" },
    distractors: ["t0", "t0 / g", "t0 * b", "t0 * (1 + b)"],
    text: T(
      "Işık hızının {b} katı (v = {b}c) sabit hızla giden bir uzay aracındaki saate göre yolculuk {t0} yıl sürüyor. Dünya'daki bir gözlemciye göre bu yolculuk kaç yıl sürer? (Özel görelilik)",
      "A spacecraft travels at a constant {b}c. By the clock on board the journey takes {t0} years. How long does it take for an observer on Earth, in years? (Special relativity)",
      "Ein Raumschiff fliegt mit konstant {b}c. Nach der Bordzeit dauert die Reise {t0} Jahre. Wie lange dauert sie für einen Beobachter auf der Erde, in Jahren? (Spezielle Relativitätstheorie)"),
  });

  add({
    id: "fiz11-kaldirac", topic: "tork", grade: 11, level: 1,
    vars: { G: { values: [200, 300, 400, 600, 900] }, d1: { values: [1, 1.5, 2, 3] }, d2: { values: [0.25, 0.5, 0.75] }, F: "G * d2 / d1" },
    where: "F == round(F)",
    answer: "F", unit: "N",
    distractors: ["G * d1 / d2", "G", "G / 2", "G * d2"],
    text: T(
      "Ağırlığı önemsiz bir kaldıraçla {G} N ağırlığındaki bir taş kaldırılmak isteniyor. Taş destek noktasından {d2} m, kuvvet ise destekten {d1} m uzakta, kaldıraca dik olarak uygulanıyor. Taşı dengede tutmak için gereken kuvvet kaç N'dir?",
      "A lever of negligible weight is used to lift a {G} N stone. The stone is {d2} m from the pivot and the force is applied perpendicular to the lever {d1} m from the pivot. What force is needed to hold the stone in balance, in newtons?",
      "Mit einem Hebel vernachlässigbaren Gewichts soll ein Stein von {G} N gehoben werden. Der Stein ist {d2} m vom Drehpunkt entfernt, die Kraft greift senkrecht {d1} m vom Drehpunkt an. Welche Kraft in Newton hält den Stein im Gleichgewicht?"),
  });

  add({
    id: "fiz11-makara-verim", topic: "tork", grade: 11, level: 2,
    vars: { G: { values: [200, 300, 400, 600, 800] }, eta: { values: [50, 80, 100] }, F: "G / 2 * 100 / eta" },
    where: "F == round(F)",
    answer: "F", unit: "N",
    distractors: ["G / 2", "G * 100 / eta", "G / 2 * eta / 100", "G"],
    text: T(
      "Tek bir hareketli makarayla {G} N'luk yük sabit hızla yukarı çekiliyor. Makara sisteminin verimi %{eta} olduğuna göre ipe uygulanan kuvvet kaç N'dir?",
      "A {G} N load is raised at constant speed with a single movable pulley. The efficiency of the system is {eta}%. What force is applied to the rope, in newtons?",
      "Eine Last von {G} N wird mit einer einzelnen losen Rolle gleichförmig gehoben. Der Wirkungsgrad beträgt {eta} %. Welche Kraft in Newton wirkt am Seil?"),
  });

  add({
    id: "fiz11-kutle-merkezi", topic: "tork", grade: 11, level: 2,
    vars: { m1: { values: [1, 2, 3, 4] }, m2: { values: [1, 2, 3, 4, 6] }, L: { values: [60, 90, 120] }, x: "m2 * L / (m1 + m2)" },
    where: ["m1 != m2", "x == round(x)"],
    answer: "x", unit: "cm",
    distractors: ["m1 * L / (m1 + m2)", "L / 2", "m2 * L / m1", "L - m1 * L / (m1 + m2) + 10"],
    text: T(
      "Kütlesi önemsiz, {L} cm uzunluğundaki bir çubuğun sol ucunda {m1} kg, sağ ucunda {m2} kg kütleli küçük cisimler bulunuyor. Sistemin kütle merkezi çubuğun sol ucundan kaç cm uzaktadır?",
      "A massless rod {L} cm long has a small {m1} kg mass at its left end and a {m2} kg mass at its right end. How far from the left end is the centre of mass, in cm?",
      "Ein masseloser Stab der Länge {L} cm trägt am linken Ende eine kleine Masse von {m1} kg und am rechten Ende {m2} kg. Wie weit vom linken Ende liegt der Schwerpunkt, in cm?"),
  });

  add({
    id: "fiz11-paralel-levha", topic: "elektrikalan", grade: 11, level: 1,
    vars: { V: { values: [100, 200, 300, 600, 1200] }, d: { values: [0.02, 0.05, 0.1, 0.2] }, E: "V / d" },
    answer: "E", unit: "V/m",
    distractors: ["V * d", "V", "V / (2 * d)", "d / V"],
    text: T(
      "Aralarında {d} m uzaklık bulunan, birbirine paralel iki iletken levha arasına {V} V'luk potansiyel farkı uygulanıyor. Levhalar arasındaki düzgün elektrik alanın büyüklüğü kaç V/m'dir?",
      "Two parallel conducting plates {d} m apart have a potential difference of {V} V. What is the magnitude of the uniform electric field between them, in V/m?",
      "Zwischen zwei parallelen leitenden Platten im Abstand {d} m liegt eine Spannung von {V} V. Wie groß ist das homogene elektrische Feld in V/m?"),
  });

  QB.solve({
    "fiz11-transformator": {
      tr: ["İdeal transformatörde gerilimler sarım sayılarıyla orantılıdır: V<sub>s</sub> / V<sub>p</sub> = N<sub>s</sub> / N<sub>p</sub>.", "V<sub>s</sub> = {Vp} · {Ns} / {Np} = {Vs} V.", "{if:Ns > Np|Sarım sayısı arttığı için gerilim yükselir (yükseltici trafo).|Sarım sayısı azaldığı için gerilim düşer (düşürücü trafo).}"],
      en: ["In an ideal transformer the voltages are proportional to the turns: V<sub>s</sub> / V<sub>p</sub> = N<sub>s</sub> / N<sub>p</sub>.", "V<sub>s</sub> = {Vp} · {Ns} / {Np} = {Vs} V.", "{if:Ns > Np|More turns on the secondary, so the voltage rises (step-up).|Fewer turns on the secondary, so the voltage falls (step-down).}"],
      de: ["Beim idealen Transformator verhalten sich die Spannungen wie die Windungszahlen: U<sub>s</sub> / U<sub>p</sub> = N<sub>s</sub> / N<sub>p</sub>.", "U<sub>s</sub> = {Vp} · {Ns} / {Np} = {Vs} V.", "{if:Ns > Np|Mehr Windungen sekundär: Die Spannung steigt (Aufwärtstransformator).|Weniger Windungen sekundär: Die Spannung sinkt (Abwärtstransformator).}"],
    },
    "fiz12-gezegen-g": {
      tr: ["Yüzeydeki yer çekimi ivmesi: g = G · M / R².", "Kütle {k} katına çıkınca g {k} katına çıkar; yarıçap {n} katına çıkınca g, {n}² = {=n*n} katına iner.", "g<sub>gezegen</sub> = 10 · {k} / {=n*n} = {g} m/s²."],
      en: ["Surface gravity: g = G · M / R².", "{k} times the mass multiplies g by {k}; {n} times the radius divides g by {n}² = {=n*n}.", "g<sub>planet</sub> = 10 · {k} / {=n*n} = {g} m/s²."],
      de: ["Fallbeschleunigung an der Oberfläche: g = G · M / R².", "Die {k}-fache Masse vervielfacht g mit {k}; der {n}-fache Radius teilt g durch {n}² = {=n*n}.", "g<sub>Planet</sub> = 10 · {k} / {=n*n} = {g} m/s²."],
    },
    "fiz12-kepler": {
      tr: ["Kepler'in 3. yasası: T² / r³ aynı yıldızın çevresindeki tüm gezegenler için sabittir.", "T² = 1² · ({k})³ = {=k*k*k} → T = √{=k*k*k}.", "T = {=k*sqrt(k)} yıl."],
      en: ["Kepler's third law: T² / r³ is the same for all planets orbiting the same star.", "T² = 1² · ({k})³ = {=k*k*k} → T = √{=k*k*k}.", "T = {=k*sqrt(k)} years."],
      de: ["Drittes keplersches Gesetz: T² / r³ ist für alle Planeten desselben Sterns gleich.", "T² = 1² · ({k})³ = {=k*k*k} → T = √{=k*k*k}.", "T = {=k*sqrt(k)} Jahre."],
    },
    "fiz12-young": {
      tr: ["Ardışık iki aydınlık saçak arası: Δx = λ · L / d.", "Birimleri çevirelim: λ = {lam}·10<sup>−9</sup> m, d = {d}·10<sup>−3</sup> m.", "Δx = {lam}·10<sup>−9</sup> · {L} / ({d}·10<sup>−3</sup>) = {=lam*L/d/1000000:6} m = {dx} mm.", "Yorum: dalga boyu ya da perde uzaklığı arttıkça saçaklar açılır; yarıklar yaklaştıkça da açılır."],
      en: ["Spacing of neighbouring bright fringes: Δx = λ · L / d.", "Convert units: λ = {lam}·10<sup>−9</sup> m, d = {d}·10<sup>−3</sup> m.", "Δx = {lam}·10<sup>−9</sup> · {L} / ({d}·10<sup>−3</sup>) = {=lam*L/d/1000000:6} m = {dx} mm.", "Interpretation: a longer wavelength or a more distant screen spreads the fringes; so do slits that are closer together."],
      de: ["Abstand benachbarter heller Streifen: Δx = λ · L / d.", "Einheiten umrechnen: λ = {lam}·10<sup>−9</sup> m, d = {d}·10<sup>−3</sup> m.", "Δx = {lam}·10<sup>−9</sup> · {L} / ({d}·10<sup>−3</sup>) = {=lam*L/d/1000000:6} m = {dx} mm.", "Deutung: Größere Wellenlänge oder größerer Schirmabstand weiten die Streifen; ein kleinerer Spaltabstand ebenso."],
    },
    "fiz12-yari-omur": {
      tr: ["Her yarı ömürde bozunmamış madde miktarı yarıya iner.", "Geçen yarı ömür sayısı: n = {t} / {T} = {n}.", "N = N<sub>0</sub> / 2<sup>n</sup> = {N0} / {=2^n} = {=N0/2^n} g.", "Dikkat: Bozunan miktar ise {N0} − {=N0/2^n} = {=N0-N0/2^n} g'dır."],
      en: ["Every half-life, the amount of undecayed substance halves.", "Number of half-lives: n = {t} / {T} = {n}.", "N = N<sub>0</sub> / 2<sup>n</sup> = {N0} / {=2^n} = {=N0/2^n} g.", "Note: the decayed amount is {N0} − {=N0/2^n} = {=N0-N0/2^n} g."],
      de: ["Nach jeder Halbwertszeit halbiert sich die unzerfallene Menge.", "Anzahl der Halbwertszeiten: n = {t} / {T} = {n}.", "N = N<sub>0</sub> / 2<sup>n</sup> = {N0} / {=2^n} = {=N0/2^n} g.", "Achtung: Zerfallen sind {N0} − {=N0/2^n} = {=N0-N0/2^n} g."],
    },
    "fiz12-bohr": {
      tr: ["Yayımlanan fotonun enerjisi iki düzeyin enerji farkıdır: E = E<sub>{n2}</sub> − E<sub>{n1}</sub>.", "E<sub>{n2}</sub> = −13,6 / {=n2*n2} = {=-13.6/(n2*n2):2} eV; E<sub>{n1}</sub> = −13,6 / {=n1*n1} = {=-13.6/(n1*n1):2} eV.", "E = {=-13.6/(n2*n2):2} − ({=-13.6/(n1*n1):2}) = {E:2} eV.", "{if:n1 == 1|n = 1'e inen geçişler Lyman serisidir (morötesi).|n = {n1} düzeyine inen geçişler {if:n1 == 2|Balmer serisidir (çoğu görünür bölgede).|Paschen serisidir (kızılötesi).}}"],
      en: ["The photon energy is the difference of the two levels: E = E<sub>{n2}</sub> − E<sub>{n1}</sub>.", "E<sub>{n2}</sub> = −13.6 / {=n2*n2} = {=-13.6/(n2*n2):2} eV; E<sub>{n1}</sub> = −13.6 / {=n1*n1} = {=-13.6/(n1*n1):2} eV.", "E = {=-13.6/(n2*n2):2} − ({=-13.6/(n1*n1):2}) = {E:2} eV.", "{if:n1 == 1|Transitions down to n = 1 form the Lyman series (ultraviolet).|Transitions down to n = {n1} form the {if:n1 == 2|Balmer series (mostly visible).|Paschen series (infrared).}}"],
      de: ["Die Photonenenergie ist die Differenz der Niveaus: E = E<sub>{n2}</sub> − E<sub>{n1}</sub>.", "E<sub>{n2}</sub> = −13,6 / {=n2*n2} = {=-13.6/(n2*n2):2} eV; E<sub>{n1}</sub> = −13,6 / {=n1*n1} = {=-13.6/(n1*n1):2} eV.", "E = {=-13.6/(n2*n2):2} − ({=-13.6/(n1*n1):2}) = {E:2} eV.", "{if:n1 == 1|Übergänge nach n = 1 bilden die Lyman-Serie (Ultraviolett).|Übergänge nach n = {n1} bilden die {if:n1 == 2|Balmer-Serie (meist sichtbar).|Paschen-Serie (Infrarot).}}"],
    },
    "fiz12-de-broglie": {
      tr: ["de Broglie dalga boyu: λ = h / (m · v) = h / p.", "Kütle {k}, hız {n} katına çıkınca momentum {k} · {n} = {=k*n} katına çıkar; dalga boyu {=k*n} katına iner.", "λ' = {lam} / {=k*n} = {L2} pm."],
      en: ["de Broglie wavelength: λ = h / (m · v) = h / p.", "With mass × {k} and speed × {n}, the momentum is multiplied by {k} · {n} = {=k*n}, so the wavelength is divided by {=k*n}.", "λ' = {lam} / {=k*n} = {L2} pm."],
      de: ["De-Broglie-Wellenlänge: λ = h / (m · v) = h / p.", "Masse × {k} und Geschwindigkeit × {n}: Der Impuls wird mit {k} · {n} = {=k*n} multipliziert, die Wellenlänge durch {=k*n} geteilt.", "λ' = {lam} / {=k*n} = {L2} pm."],
    },
    "fiz12-zaman-genislemesi": {
      tr: ["Hareketli saatin ölçtüğü süre öz zamandır (t<sub>0</sub>); dışarıdaki gözlemci daha uzun süre ölçer: t = γ · t<sub>0</sub>.", "γ = 1 / √(1 − v²/c²) = 1 / √(1 − {b}²) = 1 / √{=1-b*b:2} = 1 / {=sqrt(1-b*b):2} = {=g:4}.", "t = {=g:4} · {t0} = {t:2} yıl."],
      en: ["The time measured by the moving clock is the proper time (t<sub>0</sub>); an outside observer measures a longer time: t = γ · t<sub>0</sub>.", "γ = 1 / √(1 − v²/c²) = 1 / √(1 − {b}²) = 1 / √{=1-b*b:2} = 1 / {=sqrt(1-b*b):2} = {=g:4}.", "t = {=g:4} · {t0} = {t:2} years."],
      de: ["Die Zeit der bewegten Uhr ist die Eigenzeit (t<sub>0</sub>); ein äußerer Beobachter misst länger: t = γ · t<sub>0</sub>.", "γ = 1 / √(1 − v²/c²) = 1 / √(1 − {b}²) = 1 / √{=1-b*b:2} = 1 / {=sqrt(1-b*b):2} = {=g:4}.", "t = {=g:4} · {t0} = {t:2} Jahre."],
    },
    "fiz11-kaldirac": {
      tr: ["Destek noktasına göre tork dengesi: F · d<sub>F</sub> = G · d<sub>G</sub>.", "F · {d1} = {G} · {d2} → F = {=G*d2} / {d1} = {F} N.", "Kuvvet kolu yük kolundan uzun olduğu için kuvvetten kazanç sağlanır (ama kuvvet daha uzun yol alır)."],
      en: ["Torque balance about the pivot: F · d<sub>F</sub> = W · d<sub>W</sub>.", "F · {d1} = {G} · {d2} → F = {=G*d2} / {d1} = {F} N.", "The effort arm is longer than the load arm, so force is gained (but the effort moves further)."],
      de: ["Drehmomentgleichgewicht um den Drehpunkt: F · d<sub>F</sub> = G · d<sub>G</sub>.", "F · {d1} = {G} · {d2} → F = {=G*d2} / {d1} = {F} N.", "Der Kraftarm ist länger als der Lastarm: Man spart Kraft, muss aber einen längeren Weg gehen."],
    },
    "fiz11-makara-verim": {
      tr: ["İdeal tek hareketli makarada yük iki ip kolu tarafından taşınır: F<sub>ideal</sub> = G / 2 = {=G/2} N.", "Verim = ideal kuvvet / gerçek kuvvet (sürtünme ve makara ağırlığı nedeniyle gerçek kuvvet daha büyüktür).", "F = F<sub>ideal</sub> / verim = {=G/2} / {=eta/100} = {F} N."],
      en: ["With an ideal single movable pulley two rope segments carry the load: F<sub>ideal</sub> = W / 2 = {=G/2} N.", "Efficiency = ideal force / actual force (friction and pulley weight make the actual force larger).", "F = F<sub>ideal</sub> / efficiency = {=G/2} / {=eta/100} = {F} N."],
      de: ["Bei einer idealen losen Rolle tragen zwei Seilstücke die Last: F<sub>ideal</sub> = G / 2 = {=G/2} N.", "Wirkungsgrad = ideale Kraft / tatsächliche Kraft (Reibung und Rollengewicht vergrößern die Kraft).", "F = F<sub>ideal</sub> / Wirkungsgrad = {=G/2} / {=eta/100} = {F} N."],
    },
    "fiz11-kutle-merkezi": {
      tr: ["Sol ucu başlangıç alalım: x₁ = 0, x₂ = {L} cm.", "x<sub>km</sub> = (m₁ · x₁ + m₂ · x₂) / (m₁ + m₂) = ({m1} · 0 + {m2} · {L}) / ({m1} + {m2}).", "x<sub>km</sub> = {=m2*L} / {=m1+m2} = {x} cm.", "Kütle merkezi her zaman ağır olan cisme daha yakındır."],
      en: ["Take the left end as the origin: x₁ = 0, x₂ = {L} cm.", "x<sub>cm</sub> = (m₁ · x₁ + m₂ · x₂) / (m₁ + m₂) = ({m1} · 0 + {m2} · {L}) / ({m1} + {m2}).", "x<sub>cm</sub> = {=m2*L} / {=m1+m2} = {x} cm.", "The centre of mass is always closer to the heavier mass."],
      de: ["Linkes Ende als Ursprung: x₁ = 0, x₂ = {L} cm.", "x<sub>S</sub> = (m₁ · x₁ + m₂ · x₂) / (m₁ + m₂) = ({m1} · 0 + {m2} · {L}) / ({m1} + {m2}).", "x<sub>S</sub> = {=m2*L} / {=m1+m2} = {x} cm.", "Der Schwerpunkt liegt immer näher an der größeren Masse."],
    },
    "fiz11-paralel-levha": {
      tr: ["Paralel levhalar arasında elektrik alan düzgündür: E = V / d.", "E = {V} / {d} = {E} V/m (= {E} N/C).", "Alan, (+) levhadan (−) levhaya doğrudur."],
      en: ["Between parallel plates the field is uniform: E = V / d.", "E = {V} / {d} = {E} V/m (= {E} N/C).", "It points from the positive plate to the negative plate."],
      de: ["Zwischen parallelen Platten ist das Feld homogen: E = U / d.", "E = {V} / {d} = {E} V/m (= {E} N/C).", "Es zeigt von der positiven zur negativen Platte."],
    },
  });
})();
