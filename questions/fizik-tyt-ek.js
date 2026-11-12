// FİZİK · 9. ve 10. sınıf (TYT) eksik konular: kavram soruları ve yeni hesap kalıpları
// Tüm sorular ve çözümler bu proje için özgün olarak yazılmıştır.  g = 10 m/s².
(function () {
  "use strict";
  const T = (tr, en, de) => ({ tr, en, de });
  const add = (t) => QB.add({ subject: "fizik", ...t });
  // Kavram varyantı: q (soru), right (doğru), wrong (yanlışlar), why (gerekçe)
  const V = (q, right, wrong, why) => ({ q, right, wrong, why });

  // ===================== KAVRAM SORULARI =====================

  add({
    id: "fiz9-kavram-buyuklukler", topic: "bilim", grade: 9, level: 1,
    bank: [
      V(T("Aşağıdakilerden hangisi SI birim sisteminde <b>temel</b> büyüklüklerden biridir?", "Which of the following is a <b>base</b> quantity in the SI system?", "Welche der folgenden Größen ist eine <b>Basisgröße</b> im SI?"),
        T("Kütle", "Mass", "Masse"),
        [T("Hız", "Velocity", "Geschwindigkeit"), T("Kuvvet", "Force", "Kraft"), T("Enerji", "Energy", "Energie"), T("Basınç", "Pressure", "Druck"), T("Özkütle", "Density", "Dichte")],
        T("SI'da yedi temel büyüklük vardır: uzunluk, kütle, zaman, elektrik akımı, sıcaklık, madde miktarı ve ışık şiddeti. Hız, kuvvet, enerji, basınç ve özkütle bunlardan türetilir (ör. hız = uzunluk / zaman).",
          "The SI has seven base quantities: length, mass, time, electric current, temperature, amount of substance and luminous intensity. Velocity, force, energy, pressure and density are derived from them (e.g. velocity = length / time).",
          "Das SI hat sieben Basisgrößen: Länge, Masse, Zeit, elektrische Stromstärke, Temperatur, Stoffmenge und Lichtstärke. Geschwindigkeit, Kraft, Energie, Druck und Dichte sind daraus abgeleitet (z. B. Geschwindigkeit = Länge / Zeit).")),
      V(T("Aşağıdakilerden hangisi <b>vektörel</b> bir büyüklüktür?", "Which of the following is a <b>vector</b> quantity?", "Welche der folgenden Größen ist eine <b>vektorielle</b> Größe?"),
        T("Kuvvet", "Force", "Kraft"),
        [T("Kütle", "Mass", "Masse"), T("Sıcaklık", "Temperature", "Temperatur"), T("Enerji", "Energy", "Energie"), T("Zaman", "Time", "Zeit"), T("Hacim", "Volume", "Volumen")],
        T("Vektörel büyüklüklerin büyüklüğü yanında yönü de vardır. Kuvvet, hız, ivme, yer değiştirme vektöreldir; kütle, sıcaklık, enerji, zaman ve hacim yalnızca sayı ve birimle ifade edilen skaler büyüklüklerdir.",
          "Vector quantities have a direction as well as a magnitude. Force, velocity, acceleration and displacement are vectors; mass, temperature, energy, time and volume are scalars, described by a number and a unit only.",
          "Vektorielle Größen haben neben dem Betrag eine Richtung. Kraft, Geschwindigkeit, Beschleunigung und Verschiebung sind Vektoren; Masse, Temperatur, Energie, Zeit und Volumen sind Skalare.")),
      V(T("Aşağıdakilerden hangisi <b>skaler</b> bir büyüklüktür?", "Which of the following is a <b>scalar</b> quantity?", "Welche der folgenden Größen ist eine <b>skalare</b> Größe?"),
        T("Enerji", "Energy", "Energie"),
        [T("Hız", "Velocity", "Geschwindigkeit"), T("İvme", "Acceleration", "Beschleunigung"), T("Kuvvet", "Force", "Kraft"), T("Yer değiştirme", "Displacement", "Verschiebung"), T("Momentum", "Momentum", "Impuls")],
        T("Enerjinin yönü yoktur; yalnızca büyüklüğü (ör. 50 J) vardır, bu yüzden skalerdir. Hız, ivme, kuvvet, yer değiştirme ve momentumun hem büyüklüğü hem yönü vardır.",
          "Energy has no direction, only a size (e.g. 50 J), so it is a scalar. Velocity, acceleration, force, displacement and momentum have both magnitude and direction.",
          "Energie hat keine Richtung, nur einen Betrag (z. B. 50 J), ist also skalar. Geschwindigkeit, Beschleunigung, Kraft, Verschiebung und Impuls haben Betrag und Richtung.")),
      V(T("Kuvvetin birimi olan newton (N), SI temel birimleri cinsinden aşağıdakilerden hangisine eşittir?", "The newton (N), the unit of force, is equal to which of the following in SI base units?", "Das Newton (N), die Einheit der Kraft, entspricht in SI-Basiseinheiten welchem Ausdruck?"),
        T("kg·m/s²", "kg·m/s²", "kg·m/s²"),
        [T("kg·m/s", "kg·m/s", "kg·m/s"), T("kg·m²/s²", "kg·m²/s²", "kg·m²/s²"), T("kg/(m·s²)", "kg/(m·s²)", "kg/(m·s²)"), T("kg·s/m", "kg·s/m", "kg·s/m"), T("g·cm/s²", "g·cm/s²", "g·cm/s²")],
        T("F = m · a olduğundan birim kg · (m/s²) = kg·m/s²'dir. kg·m/s momentumun, kg·m²/s² enerjinin (joule), kg/(m·s²) basıncın (pascal) birimidir; g·cm/s² ise CGS birimi olan dyn'dir.",
          "Since F = m · a, the unit is kg · (m/s²) = kg·m/s². kg·m/s is the unit of momentum, kg·m²/s² of energy (joule), kg/(m·s²) of pressure (pascal); g·cm/s² is the CGS unit dyne.",
          "Wegen F = m · a ist die Einheit kg · (m/s²) = kg·m/s². kg·m/s ist die Einheit des Impulses, kg·m²/s² der Energie (Joule), kg/(m·s²) des Drucks (Pascal); g·cm/s² ist die CGS-Einheit dyn.")),
      V(T("Aşağıdaki olaylardan hangisi fiziğin <b>mekanik</b> alt alanının inceleme konusudur?", "Which of the following is studied in the <b>mechanics</b> branch of physics?", "Welcher der folgenden Vorgänge gehört zum Teilgebiet <b>Mechanik</b>?"),
        T("Bir topun eğik olarak atılması", "A ball being thrown at an angle", "Ein schräg geworfener Ball"),
        [T("Gökkuşağının oluşması", "A rainbow forming", "Die Entstehung eines Regenbogens"), T("Bir mıknatısın demir tozlarını çekmesi", "A magnet attracting iron filings", "Ein Magnet zieht Eisenspäne an"), T("Buzun erimesi", "Ice melting", "Eis schmilzt"), T("Radyoaktif bir çekirdeğin bozunması", "A radioactive nucleus decaying", "Ein radioaktiver Kern zerfällt"), T("Bir lazerin ışık üretmesi", "A laser producing light", "Ein Laser erzeugt Licht")],
        T("Mekanik, cisimlerin hareketini ve kuvvetleri inceler; atış hareketi bu alandadır. Gökkuşağı optiğin, mıknatıs elektromanyetizmanın, erime termodinamiğin, bozunma nükleer fiziğin, lazer ise atom fiziği ve optiğin konusudur.",
          "Mechanics studies motion and forces, so projectile motion belongs here. A rainbow is optics, a magnet electromagnetism, melting thermodynamics, decay nuclear physics and a laser atomic physics and optics.",
          "Die Mechanik untersucht Bewegungen und Kräfte; der Wurf gehört dazu. Regenbogen = Optik, Magnet = Elektromagnetismus, Schmelzen = Thermodynamik, Zerfall = Kernphysik, Laser = Atomphysik und Optik.")),
    ],
  });

  add({
    id: "fiz9-kavram-madde", topic: "madde", grade: 9, level: 2,
    bank: [
      V(T("Suyun ince bir cam boruda kap içindeki seviyesinden yukarı yükselmesinin (kılcallık) nedeni aşağıdakilerden hangisidir?", "Why does water rise above its level in a narrow glass tube (capillarity)?", "Warum steigt Wasser in einem dünnen Glasrohr über den Wasserspiegel (Kapillarität)?"),
        T("Su ile cam arasındaki adezyonun, su tanecikleri arasındaki kohezyondan büyük olması", "The adhesion between water and glass is greater than the cohesion between water particles", "Die Adhäsion zwischen Wasser und Glas ist größer als die Kohäsion zwischen den Wasserteilchen"),
        [T("Kohezyonun adezyondan büyük olması", "Cohesion is greater than adhesion", "Die Kohäsion ist größer als die Adhäsion"), T("Suyun özkütlesinin camınkinden küçük olması", "Water is less dense than glass", "Wasser hat eine kleinere Dichte als Glas"), T("Boru içindeki açık hava basıncının artması", "The air pressure inside the tube increases", "Der Luftdruck im Rohr steigt"), T("Suyun yüzey geriliminin sıfır olması", "Water has zero surface tension", "Wasser hat keine Oberflächenspannung"), T("Borunun suyu ısıtması", "The tube heats the water", "Das Rohr erwärmt das Wasser")],
        T("Adezyon farklı maddelerin tanecikleri arasındaki, kohezyon aynı maddenin tanecikleri arasındaki çekimdir. Su–cam adezyonu daha büyük olduğu için su camı ıslatır, yüzeyi çukur olur ve boruda yükselir. Cıvada ise kohezyon büyüktür; cıva boruda alçalır.",
          "Adhesion is attraction between particles of different substances, cohesion between particles of the same substance. Water–glass adhesion is larger, so water wets the glass, forms a concave surface and rises. In mercury cohesion dominates and it drops in the tube.",
          "Adhäsion ist die Anziehung zwischen Teilchen verschiedener Stoffe, Kohäsion zwischen Teilchen desselben Stoffes. Die Adhäsion Wasser–Glas ist größer, also benetzt Wasser das Glas und steigt. Bei Quecksilber überwiegt die Kohäsion; es sinkt im Rohr.")),
      V(T("Aşağıdakilerden hangisi suyun yüzey gerilimini <b>azaltır</b>?", "Which of the following <b>reduces</b> the surface tension of water?", "Was <b>verringert</b> die Oberflächenspannung von Wasser?"),
        T("Suya deterjan eklemek", "Adding detergent to the water", "Spülmittel ins Wasser geben"),
        [T("Suyu soğutmak", "Cooling the water", "Das Wasser abkühlen"), T("Kabın genişliğini artırmak", "Using a wider container", "Ein breiteres Gefäß verwenden"), T("Su miktarını artırmak", "Adding more water", "Mehr Wasser nehmen"), T("Kabın ağzını kapatmak", "Closing the container", "Das Gefäß verschließen"), T("Suyu daha derin bir kaba koymak", "Putting the water in a deeper container", "Das Wasser in ein tieferes Gefäß füllen")],
        T("Deterjan (sabun) molekülleri su yüzeyine yerleşip yüzeydeki su tanecikleri arasındaki kohezyonu zayıflatır; yüzey gerilimi azalır. Sıcaklığı artırmak da azaltır, soğutmak ise artırır. Kabın boyutu ve su miktarı yüzey gerilimini değiştirmez.",
          "Detergent molecules settle at the surface and weaken the cohesion between surface water particles, lowering surface tension. Heating also lowers it, cooling raises it. Container size and amount of water do not change it.",
          "Spülmittelmoleküle lagern sich an der Oberfläche an und schwächen die Kohäsion; die Oberflächenspannung sinkt. Erwärmen senkt sie ebenfalls, Abkühlen erhöht sie. Gefäßgröße und Wassermenge ändern sie nicht.")),
      V(T("Aşağıdakilerden hangisi maddenin <b>plazma</b> hâline örnektir?", "Which of the following is an example of the <b>plasma</b> state?", "Welches Beispiel zeigt den Aggregatzustand <b>Plasma</b>?"),
        T("Şimşek", "Lightning", "Ein Blitz"),
        [T("Buz", "Ice", "Eis"), T("Su buharı", "Water vapour", "Wasserdampf"), T("Cam", "Glass", "Glas"), T("Sis", "Fog", "Nebel"), T("Kum", "Sand", "Sand")],
        T("Plazma, atomların bir kısmının elektronlarını kaybettiği (iyonlaştığı) çok yüksek enerjili hâldir; şimşek, yıldızlar ve floresan lambanın içi örnektir. Buz ve cam katı, su buharı gaz, sis gaz içinde sıvı damlacıkları, kum ise katıdır.",
          "Plasma is a very high-energy state in which some atoms have lost electrons (are ionised); lightning, stars and the inside of a fluorescent tube are examples. Ice and glass are solid, water vapour is a gas, fog is liquid droplets in air, sand is solid.",
          "Plasma ist ein sehr energiereicher Zustand, in dem Atome Elektronen verloren haben (ionisiert sind); Blitze, Sterne und Leuchtstoffröhren sind Beispiele. Eis und Glas sind fest, Wasserdampf gasförmig, Nebel sind Tröpfchen, Sand ist fest.")),
      V(T("Aynı maddeden yapılmış, kenar uzunlukları farklı iki küpten hangisinin <b>dayanıklılığı</b> daha büyüktür?", "Two cubes made of the same material have different edge lengths. Which one has the greater <b>strength (durability)</b>?", "Zwei Würfel aus demselben Material haben verschiedene Kantenlängen. Welcher hat die größere <b>Belastbarkeit</b>?"),
        T("Kenarı küçük olan küpün", "The smaller cube", "Der kleinere Würfel"),
        [T("Kenarı büyük olan küpün", "The larger cube", "Der größere Würfel"), T("İkisi eşittir", "They are equal", "Beide sind gleich"), T("Kütlesi büyük olanın", "The one with the greater mass", "Der mit der größeren Masse"), T("Hacmi büyük olanın", "The one with the greater volume", "Der mit dem größeren Volumen"), T("Bilgi yetersizdir; özkütleleri farklıdır", "Cannot be decided; their densities differ", "Nicht entscheidbar; ihre Dichten sind verschieden")],
        T("Dayanıklılık, kesit alanının hacme oranıyla orantılıdır: a² / a³ = 1/a. Kenar büyüdükçe dayanıklılık azalır; bu yüzden küçük canlılar kendi ağırlıklarına göre daha dayanıklıdır (karınca örneği). Aynı madde olduğu için özkütleler eşittir.",
          "Strength is proportional to cross-sectional area divided by volume: a² / a³ = 1/a. The larger the edge, the smaller the strength; that is why small animals are strong relative to their weight (e.g. ants). Same material, so the densities are equal.",
          "Die Belastbarkeit ist proportional zu Querschnitt / Volumen: a² / a³ = 1/a. Je größer die Kante, desto kleiner die Belastbarkeit; deshalb sind kleine Tiere im Verhältnis zu ihrem Gewicht stark (z. B. Ameisen). Gleiches Material, also gleiche Dichte.")),
      V(T("Cıva, ince bir cam boruda kaptaki seviyesinin altında kalır. Bunun nedeni aşağıdakilerden hangisidir?", "In a narrow glass tube, mercury stays below its level in the container. Why?", "In einem dünnen Glasrohr steht Quecksilber tiefer als im Gefäß. Warum?"),
        T("Cıva tanecikleri arasındaki kohezyonun, cıva ile cam arasındaki adezyondan büyük olması", "The cohesion between mercury particles is greater than the adhesion between mercury and glass", "Die Kohäsion zwischen Quecksilberteilchen ist größer als die Adhäsion zwischen Quecksilber und Glas"),
        [T("Adezyonun kohezyondan büyük olması", "Adhesion is greater than cohesion", "Die Adhäsion ist größer als die Kohäsion"), T("Cıvanın özkütlesinin çok küçük olması", "Mercury has a very small density", "Quecksilber hat eine sehr kleine Dichte"), T("Camın cıvayı ıslatması", "The glass is wetted by mercury", "Quecksilber benetzt das Glas"), T("Cıvanın yüzey geriliminin olmaması", "Mercury has no surface tension", "Quecksilber hat keine Oberflächenspannung"), T("Borudaki havanın cıvayı itmesi", "Air in the tube pushes the mercury", "Die Luft im Rohr drückt das Quecksilber")],
        T("Cıvada kohezyon adezyondan büyüktür; cıva camı ıslatmaz, yüzeyi tümsek olur ve boruda kaptaki seviyesinin altında kalır. Suda durum terstir.",
          "In mercury cohesion is greater than adhesion; it does not wet the glass, forms a convex surface and stays below the outside level. For water it is the other way round.",
          "Bei Quecksilber ist die Kohäsion größer als die Adhäsion; es benetzt das Glas nicht, bildet eine gewölbte Oberfläche und steht tiefer. Bei Wasser ist es umgekehrt.")),
    ],
  });

  add({
    id: "fiz9-kavram-isi", topic: "isi", grade: 9, level: 1,
    bank: [
      V(T("Aşağıdakilerden hangisi <b>ışıma</b> (radyasyon) yoluyla ısı aktarımına örnektir?", "Which of the following is heat transfer by <b>radiation</b>?", "Welches Beispiel ist Wärmeübertragung durch <b>Strahlung</b>?"),
        T("Güneş'in Dünya'yı ısıtması", "The Sun warming the Earth", "Die Sonne erwärmt die Erde"),
        [T("Sıcak çaydaki kaşığın ısınması", "A spoon warming up in hot tea", "Ein Löffel wird im heißen Tee warm"), T("Kalorifer peteğinin odadaki havayı dolaştırması", "A radiator circulating the air in a room", "Ein Heizkörper lässt die Raumluft zirkulieren"), T("Tencere sapının ısınması", "A pan handle getting hot", "Der Griff eines Topfes wird heiß"), T("Gündüz denizden karaya esen meltem", "A daytime breeze from sea to land", "Tagsüber weht eine Brise vom Meer zum Land"), T("Elimizdeki buzun erimesi", "Ice melting in our hand", "Eis schmilzt in der Hand")],
        T("Işıma, maddeye ihtiyaç duymadan elektromanyetik dalgalarla yapılan aktarımdır; Güneş'ten gelen enerji boşluktan bu yolla geçer. Kaşık, tencere sapı ve eldeki buz iletimle; kalorifer ve meltem ise akışkanın hareketiyle (konveksiyonla) ısı aktarır.",
          "Radiation is transfer by electromagnetic waves without needing matter; the Sun's energy crosses empty space this way. Spoon, pan handle and ice in the hand involve conduction; radiator air flow and sea breeze involve convection.",
          "Strahlung überträgt Energie durch elektromagnetische Wellen ohne Materie; so gelangt die Sonnenenergie durch den leeren Raum. Löffel, Topfgriff und Eis in der Hand = Wärmeleitung; Heizkörperluft und Seebrise = Konvektion.")),
      V(T("Saf bir maddenin hâl değiştirmesi (ör. erimesi) sırasında aşağıdakilerden hangisi doğrudur?", "Which statement is true while a pure substance changes state (e.g. melts)?", "Was gilt, während ein reiner Stoff seinen Aggregatzustand ändert (z. B. schmilzt)?"),
        T("Isı alır ama sıcaklığı değişmez", "It absorbs heat but its temperature stays constant", "Er nimmt Wärme auf, aber seine Temperatur bleibt konstant"),
        [T("Isı alır ve sıcaklığı artar", "It absorbs heat and its temperature rises", "Er nimmt Wärme auf und wird wärmer"), T("Isı vermeden erir", "It melts without any heat exchange", "Er schmilzt ohne Wärmeaustausch"), T("Sıcaklığı düzgün olarak azalır", "Its temperature decreases steadily", "Seine Temperatur sinkt gleichmäßig"), T("Kütlesi artar", "Its mass increases", "Seine Masse nimmt zu"), T("Özkütlesi her madde için artar", "Its density increases for every substance", "Seine Dichte nimmt bei jedem Stoff zu")],
        T("Hâl değişimi sırasında alınan ısı tanecikler arasındaki bağları zayıflatmakta (potansiyel enerji) kullanılır; ortalama kinetik enerji, yani sıcaklık sabit kalır. Grafikte bu bölüm yatay doğrudur. Kütle değişmez; özkütle ise maddeye göre artabilir ya da azalabilir (buz eriyince özkütle artar).",
          "During a change of state the heat goes into loosening the bonds between particles (potential energy); the average kinetic energy, i.e. the temperature, stays the same — a horizontal segment on the graph. Mass does not change; density may rise or fall depending on the substance (melting ice gets denser).",
          "Während der Zustandsänderung wird die Wärme zum Lösen der Bindungen genutzt (potenzielle Energie); die mittlere kinetische Energie, also die Temperatur, bleibt gleich – im Diagramm ein waagerechtes Stück. Die Masse ändert sich nicht; die Dichte kann je nach Stoff steigen oder sinken.")),
      V(T("Demiryolu raylarının ek yerlerinde boşluk bırakılmasının nedeni aşağıdakilerden hangisidir?", "Why are gaps left between railway rails?", "Warum lässt man zwischen Eisenbahnschienen Lücken?"),
        T("Sıcak havada rayların genleşerek eğilmesini önlemek", "To stop the rails from buckling when they expand in hot weather", "Damit sich die Schienen bei Hitze ausdehnen können, ohne sich zu verbiegen"),
        [T("Rayların daha hafif olması", "To make the rails lighter", "Damit die Schienen leichter sind"), T("Trenlerin daha az ses çıkarması", "To make trains quieter", "Damit Züge leiser fahren"), T("Yağmur suyunun akması", "To let rainwater drain away", "Damit Regenwasser abfließt"), T("Soğukta rayların uzaması için", "So that rails can lengthen in the cold", "Damit Schienen bei Kälte länger werden"), T("Rayların daha kolay paslanması için", "So that rails rust more easily", "Damit Schienen leichter rosten")],
        T("Katılar ısınınca genleşir: ΔL = L₀ · α · ΔT. Uzun raylar yazın birkaç milimetre ya da santimetre uzar; boşluk olmasa birbirini iterek eğilirler. Soğukta ise kısalırlar.",
          "Solids expand when heated: ΔL = L₀ · α · ΔT. Long rails grow by millimetres or centimetres in summer; without gaps they would push on each other and buckle. In the cold they contract.",
          "Feststoffe dehnen sich beim Erwärmen aus: ΔL = L₀ · α · ΔT. Lange Schienen werden im Sommer um Millimeter bis Zentimeter länger; ohne Lücken würden sie sich verbiegen. Bei Kälte ziehen sie sich zusammen.")),
      V(T("Isı ve sıcaklık için aşağıdakilerden hangisi doğrudur?", "Which statement about heat and temperature is correct?", "Welche Aussage über Wärme und Temperatur ist richtig?"),
        T("Isı, sıcaklık farkı nedeniyle aktarılan enerjidir; sıcaklık ise taneciklerin ortalama kinetik enerjisinin göstergesidir", "Heat is energy transferred because of a temperature difference; temperature indicates the average kinetic energy of the particles", "Wärme ist Energie, die wegen eines Temperaturunterschieds übertragen wird; die Temperatur zeigt die mittlere kinetische Energie der Teilchen an"),
        [T("Isı ve sıcaklık aynı şeydir", "Heat and temperature are the same thing", "Wärme und Temperatur sind dasselbe"), T("Sıcaklık joule ile ölçülür", "Temperature is measured in joules", "Temperatur wird in Joule gemessen"), T("Isı termometreyle ölçülür", "Heat is measured with a thermometer", "Wärme misst man mit dem Thermometer"), T("Kütlesi büyük olan cismin sıcaklığı her zaman büyüktür", "The heavier object always has the higher temperature", "Der schwerere Körper hat immer die höhere Temperatur"), T("Isı her zaman soğuk cisimden sıcak cisme akar", "Heat always flows from the cold object to the hot one", "Wärme fließt immer vom kalten zum warmen Körper")],
        T("Isı bir enerji aktarımıdır (birimi joule, kalori) ve kalorimetreyle ölçülür; kendiliğinden sıcaktan soğuğa akar. Sıcaklık ise termometreyle ölçülür (°C, K) ve kütleye bağlı değildir.",
          "Heat is a transfer of energy (unit joule, calorie), measured with a calorimeter, and flows by itself from hot to cold. Temperature is measured with a thermometer (°C, K) and does not depend on mass.",
          "Wärme ist Energieübertragung (Einheit Joule, Kalorie), wird mit dem Kalorimeter gemessen und fließt von selbst vom Warmen zum Kalten. Temperatur misst man mit dem Thermometer (°C, K); sie hängt nicht von der Masse ab.")),
    ],
  });

  add({
    id: "fiz10-kavram-elektrostatik", topic: "elektrostatik", grade: 10, level: 2,
    bank: [
      V(T("Nötr bir elektroskobun topuzuna, dokundurmadan (+) yüklü bir çubuk yaklaştırılıyor. Elektroskobun yaprakları için ne söylenebilir?", "A positively charged rod is brought near (without touching) the cap of a neutral electroscope. What happens to the leaves?", "Ein positiv geladener Stab wird dem Kopf eines neutralen Elektroskops genähert (ohne Berührung). Was passiert mit den Blättchen?"),
        T("Açılır; yapraklar (+) yüklenir", "They open; the leaves become positive", "Sie spreizen sich; die Blättchen werden positiv"),
        [T("Açılır; yapraklar (−) yüklenir", "They open; the leaves become negative", "Sie spreizen sich; die Blättchen werden negativ"), T("Kapalı kalır", "They stay closed", "Sie bleiben geschlossen"), T("Önce açılır, çubuk dururken kapanır", "They open and then close while the rod is held still", "Sie öffnen sich und schließen sich bei ruhendem Stab wieder"), T("Elektroskobun toplam yükü (+) olur", "The electroscope's total charge becomes positive", "Die Gesamtladung des Elektroskops wird positiv"), T("Topuz (+), yapraklar (−) yüklenir", "The cap becomes positive and the leaves negative", "Der Kopf wird positiv, die Blättchen negativ")],
        T("Etki ile elektriklenme: (+) çubuk elektronları topuza çeker; topuz (−), yapraklar elektron kaybettiği için (+) olur. Aynı cins yüklü yapraklar birbirini iterek açılır. Dokunma olmadığından toplam yük sıfır kalır.",
          "Charging by induction: the positive rod pulls electrons to the cap; the cap becomes negative and the leaves, having lost electrons, become positive. Like charges repel, so the leaves open. With no contact, the total charge stays zero.",
          "Influenz: Der positive Stab zieht Elektronen zum Kopf; der Kopf wird negativ, die Blättchen (Elektronenmangel) positiv. Gleichnamige Ladungen stoßen sich ab, die Blättchen spreizen sich. Ohne Berührung bleibt die Gesamtladung null.")),
      V(T("(+) yüklü iletken bir küre topraklanırsa ne olur?", "What happens when a positively charged conducting sphere is earthed (grounded)?", "Was passiert, wenn eine positiv geladene leitende Kugel geerdet wird?"),
        T("Topraktan elektron alarak nötr olur", "It gains electrons from the earth and becomes neutral", "Sie nimmt Elektronen aus der Erde auf und wird neutral"),
        [T("Toprağa proton vererek nötr olur", "It gives protons to the earth and becomes neutral", "Sie gibt Protonen an die Erde ab und wird neutral"), T("Yükü iki katına çıkar", "Its charge doubles", "Ihre Ladung verdoppelt sich"), T("(−) yüklenir", "It becomes negative", "Sie wird negativ"), T("Hiçbir değişiklik olmaz", "Nothing changes", "Nichts ändert sich"), T("Toprağa elektron verir", "It gives electrons to the earth", "Sie gibt Elektronen an die Erde ab")],
        T("Katılarda hareket eden yükler elektronlardır; protonlar çekirdekte sabittir. (+) yüklü kürede elektron eksiği vardır; topraklanınca topraktan elektron akar ve küre nötr olur.",
          "In solids the moving charges are electrons; protons stay in the nuclei. A positive sphere lacks electrons; when earthed, electrons flow in from the earth and the sphere becomes neutral.",
          "In Festkörpern bewegen sich Elektronen; Protonen sitzen fest im Kern. Der positiven Kugel fehlen Elektronen; geerdet fließen Elektronen aus der Erde zu, und sie wird neutral.")),
      V(T("İki farklı cisim birbirine sürtülerek elektriklendiğinde aşağıdakilerden hangisi doğrudur?", "When two different objects are charged by rubbing, which statement is true?", "Was gilt, wenn zwei verschiedene Körper durch Reibung aufgeladen werden?"),
        T("Cisimler eşit miktarda zıt cins yükle yüklenir", "They gain equal amounts of opposite charge", "Sie erhalten gleich große, entgegengesetzte Ladungen"),
        [T("Cisimler aynı cins yükle yüklenir", "They gain the same kind of charge", "Sie erhalten gleichnamige Ladungen"), T("Yalnızca biri yüklenir, diğeri nötr kalır", "Only one becomes charged, the other stays neutral", "Nur einer wird geladen, der andere bleibt neutral"), T("Cisimler arasında proton geçişi olur", "Protons move between them", "Zwischen ihnen wandern Protonen"), T("Toplam yük artar", "The total charge increases", "Die Gesamtladung nimmt zu"), T("Yük miktarları her zaman farklı olur", "The amounts of charge are always different", "Die Ladungsmengen sind immer verschieden")],
        T("Sürtünmede elektron, elektron tutma isteği az olan cisimden fazla olana geçer. Biri ne kadar elektron kaybederse diğeri o kadar kazanır: yükler eşit büyüklükte ve zıt cinstir, toplam yük korunur.",
          "When rubbed, electrons move from the object that holds them less strongly to the other. One loses exactly as many as the other gains: equal and opposite charges, total charge conserved.",
          "Beim Reiben wandern Elektronen vom Körper, der sie schwächer bindet, zum anderen. Einer verliert genau so viele, wie der andere gewinnt: gleich große, entgegengesetzte Ladungen; die Gesamtladung bleibt erhalten.")),
      V(T("Yüklü, içi boş iletken bir kürede yükler nasıl dağılır?", "How is the charge distributed on a charged, hollow conducting sphere?", "Wie verteilt sich die Ladung auf einer geladenen, hohlen leitenden Kugel?"),
        T("Dış yüzeye düzgün olarak dağılır", "Evenly over the outer surface", "Gleichmäßig auf der äußeren Oberfläche"),
        [T("Kürenin merkezinde toplanır", "It collects at the centre", "Sie sammelt sich im Mittelpunkt"), T("İç yüzeyde toplanır", "It collects on the inner surface", "Sie sammelt sich auf der Innenfläche"), T("Kürenin içinde düzgün dağılır", "Evenly through the inside", "Gleichmäßig im Inneren"), T("Yalnızca alt yüzeyde toplanır", "Only on the bottom surface", "Nur auf der Unterseite"), T("Rastgele bir noktada toplanır", "At a random point", "An einem zufälligen Punkt")],
        T("Aynı cins yükler birbirini iter ve iletkende serbestçe hareket ederek birbirinden en uzak noktalara, yani dış yüzeye yerleşir. İletkenin içinde elektrik alan sıfırdır (Faraday kafesi bu yüzden korur).",
          "Like charges repel and, moving freely in a conductor, spread as far apart as possible — onto the outer surface. Inside the conductor the electric field is zero (which is why a Faraday cage protects).",
          "Gleichnamige Ladungen stoßen sich ab und verteilen sich im Leiter möglichst weit voneinander – auf der Außenfläche. Im Inneren ist das elektrische Feld null (deshalb schützt ein Faradayscher Käfig).")),
    ],
  });

  add({
    id: "fiz10-kavram-manyetizma", topic: "manyetizma", grade: 10, level: 1,
    bank: [
      V(T("Bir çubuk mıknatıs tam ortasından ikiye bölünürse ne olur?", "What happens if a bar magnet is cut in half?", "Was passiert, wenn man einen Stabmagneten in der Mitte durchbricht?"),
        T("Her parça N ve S kutbu olan ayrı bir mıknatıs olur", "Each piece becomes a magnet with its own N and S pole", "Jedes Stück wird ein eigener Magnet mit N- und S-Pol"),
        [T("Bir parça yalnız N, diğeri yalnız S kutbu olur", "One piece is only N, the other only S", "Ein Stück ist nur N, das andere nur S"), T("Parçalar mıknatıslığını kaybeder", "The pieces lose their magnetism", "Die Stücke verlieren ihren Magnetismus"), T("Yalnızca büyük parça mıknatıs kalır", "Only the bigger piece stays a magnet", "Nur das größere Stück bleibt magnetisch"), T("Parçalar birbirini her durumda iter", "The pieces always repel each other", "Die Stücke stoßen sich immer ab"), T("Kutuplar parçaların ortasına geçer", "The poles move to the middle of the pieces", "Die Pole wandern in die Mitte der Stücke")],
        T("Tek kutuplu mıknatıs yoktur. Mıknatıslık, maddenin içindeki küçük manyetik bölgelerin aynı yöne dizilmesinden kaynaklanır; bölünen her parçada bu düzen sürdüğü için yeni N ve S kutupları oluşur.",
          "There are no single-pole magnets. Magnetism comes from tiny magnetic domains lined up inside the material; each piece keeps that alignment, so new N and S poles appear.",
          "Es gibt keine Magnete mit nur einem Pol. Magnetismus entsteht durch gleich ausgerichtete Weiss-Bezirke; jedes Stück behält diese Ordnung, also entstehen neue N- und S-Pole.")),
      V(T("Üzerinden akım geçen uzun düz bir telin çevresindeki manyetik alan çizgileri nasıldır?", "What do the magnetic field lines around a long straight current-carrying wire look like?", "Wie sehen die Magnetfeldlinien um einen langen, geraden, stromdurchflossenen Draht aus?"),
        T("Teli çevreleyen eş merkezli çemberlerdir", "Concentric circles around the wire", "Konzentrische Kreise um den Draht"),
        [T("Tele paralel düz çizgilerdir", "Straight lines parallel to the wire", "Gerade Linien parallel zum Draht"), T("Telden dışarı doğru çıkan ışınlardır", "Rays pointing out from the wire", "Strahlen, die vom Draht weg zeigen"), T("Akım geçerken manyetik alan oluşmaz", "No magnetic field is produced by a current", "Strom erzeugt kein Magnetfeld"), T("Yalnızca telin uçlarında oluşur", "They only appear at the ends of the wire", "Sie entstehen nur an den Drahtenden"), T("Tele dik düz çizgilerdir", "Straight lines perpendicular to the wire", "Gerade Linien senkrecht zum Draht")],
        T("Akım manyetik alan oluşturur (Ørsted deneyi). Düz telde alan çizgileri teli merkez alan çemberlerdir; yönü sağ el kuralıyla bulunur: başparmak akım yönünü gösterirken kıvrılan parmaklar alan yönünü gösterir. Alan telden uzaklaştıkça zayıflar.",
          "A current produces a magnetic field (Ørsted's experiment). Around a straight wire the field lines are circles centred on the wire; the right-hand rule gives the direction: thumb along the current, curled fingers along the field. The field weakens with distance.",
          "Strom erzeugt ein Magnetfeld (Ørsted-Versuch). Um einen geraden Draht sind die Feldlinien Kreise um den Draht; die Richtung liefert die Rechte-Hand-Regel: Daumen in Stromrichtung, gekrümmte Finger in Feldrichtung. Das Feld wird mit dem Abstand schwächer.")),
      V(T("Bir elektromıknatısın (bobin) manyetik alanını güçlendirmek için aşağıdakilerden hangisi yapılmalıdır?", "What should be done to make an electromagnet (coil) stronger?", "Was macht einen Elektromagneten (Spule) stärker?"),
        T("Sarım sayısını artırmak", "Increase the number of turns", "Die Windungszahl erhöhen"),
        [T("Akımı azaltmak", "Decrease the current", "Den Strom verringern"), T("İçindeki demir çekirdeği çıkarmak", "Remove the iron core", "Den Eisenkern entfernen"), T("Telin yalıtkan kaplamasının rengini değiştirmek", "Change the colour of the wire's insulation", "Die Farbe der Isolierung ändern"), T("Sarım sayısını azaltmak", "Decrease the number of turns", "Die Windungszahl verringern"), T("Bobini doğru akım yerine kapalı devreden ayırmak", "Disconnect the coil from the circuit", "Die Spule vom Stromkreis trennen")],
        T("Bobinin manyetik alanı, birim uzunluktaki sarım sayısıyla ve akımla orantılıdır; demir çekirdek alanı ayrıca çok güçlendirir. Akımı veya sarımı azaltmak ve çekirdeği çıkarmak alanı zayıflatır.",
          "A coil's field is proportional to the turns per unit length and the current; an iron core strengthens it further. Reducing current or turns, or removing the core, weakens it.",
          "Das Feld einer Spule ist proportional zur Windungsdichte und zum Strom; ein Eisenkern verstärkt es zusätzlich. Weniger Strom, weniger Windungen oder kein Kern schwächen es.")),
      V(T("Pusula iğnesinin kuzey–güney doğrultusunda durmasının nedeni aşağıdakilerden hangisidir?", "Why does a compass needle line up north–south?", "Warum richtet sich eine Kompassnadel nach Nord–Süd aus?"),
        T("Dünya'nın manyetik alanının iğneye kuvvet uygulaması", "Earth's magnetic field exerts a force on the needle", "Das Magnetfeld der Erde übt eine Kraft auf die Nadel aus"),
        [T("Dünya'nın çekim kuvvetinin iğneyi çekmesi", "Earth's gravity pulls the needle", "Die Schwerkraft der Erde zieht die Nadel"), T("Güneş ışığının iğneyi itmesi", "Sunlight pushes the needle", "Sonnenlicht drückt die Nadel"), T("Rüzgârın iğneyi döndürmesi", "The wind turns the needle", "Der Wind dreht die Nadel"), T("İğnenin elektrikle yüklü olması", "The needle is electrically charged", "Die Nadel ist elektrisch geladen"), T("Kutuplardaki buzulların iğneyi çekmesi", "Polar ice attracts the needle", "Das Polareis zieht die Nadel an")],
        T("Dünya büyük bir mıknatıs gibi davranır. Pusula iğnesi küçük bir mıknatıstır ve manyetik alan çizgileri doğrultusuna döner. Coğrafi kuzeye yakın bölgede Dünya'nın manyetik güney kutbu bulunur; iğnenin N kutbu bu yüzden kuzeyi gösterir.",
          "Earth behaves like a large magnet. A compass needle is a small magnet that turns along the field lines. Near the geographic North Pole lies Earth's magnetic south pole, so the needle's N pole points north.",
          "Die Erde verhält sich wie ein großer Magnet. Die Kompassnadel ist ein kleiner Magnet und dreht sich entlang der Feldlinien. In der Nähe des geografischen Nordpols liegt der magnetische Südpol der Erde; deshalb zeigt der N-Pol der Nadel nach Norden.")),
    ],
  });

  add({
    id: "fiz9-kavram-akiskan", topic: "basinc", grade: 9, level: 2,
    bank: [
      V(T("Uçak kanatlarının kaldırma kuvveti oluşturmasının temel nedeni aşağıdakilerden hangisidir?", "What is the main reason an aircraft wing produces lift?", "Was ist der Hauptgrund für den Auftrieb an einer Flugzeugtragfläche?"),
        T("Kanadın üstünde hızlı akan havanın basıncının, alttakinden küçük olması", "Faster air above the wing has lower pressure than the air below", "Die schneller strömende Luft über dem Flügel hat einen kleineren Druck als die Luft darunter"),
        [T("Kanadın altındaki havanın daha hızlı akması", "The air below the wing flows faster", "Die Luft unter dem Flügel strömt schneller"), T("Kanatların çok hafif olması", "The wings are very light", "Die Flügel sind sehr leicht"), T("Motorların uçağı yukarı itmesi", "The engines push the plane upwards", "Die Triebwerke drücken das Flugzeug nach oben"), T("Havanın kaldırma kuvvetinin uçağın ağırlığından her zaman büyük olması", "The buoyancy of air always exceeds the plane's weight", "Der Auftrieb der Luft ist immer größer als das Gewicht"), T("Kanadın üstündeki basıncın daha büyük olması", "The pressure above the wing is greater", "Der Druck über dem Flügel ist größer")],
        T("Bernoulli ilkesi: akışkanın hızı arttıkça basıncı azalır. Kanadın biçimi ve açısı nedeniyle üstteki hava daha hızlı akar, üstteki basınç düşer; alttaki büyük basınç kanadı yukarı iter.",
          "Bernoulli's principle: the faster a fluid flows, the lower its pressure. Because of the wing's shape and angle the air above moves faster, so the pressure above falls; the higher pressure below pushes the wing up.",
          "Bernoulli-Prinzip: Je schneller ein Fluid strömt, desto kleiner sein Druck. Wegen Form und Anstellwinkel strömt die Luft oben schneller; der Druck oben sinkt, der größere Druck unten drückt den Flügel nach oben.")),
      V(T("Yüksek bir dağın tepesinde suyun kaynama sıcaklığı deniz seviyesine göre nasıldır?", "How does the boiling point of water on a high mountain compare with that at sea level?", "Wie ist die Siedetemperatur von Wasser auf einem hohen Berg im Vergleich zum Meeresniveau?"),
        T("Daha düşüktür, çünkü açık hava basıncı daha küçüktür", "Lower, because the air pressure is lower", "Niedriger, weil der Luftdruck kleiner ist"),
        [T("Daha yüksektir, çünkü hava daha soğuktur", "Higher, because the air is colder", "Höher, weil die Luft kälter ist"), T("Değişmez; her yerde 100 °C'dir", "The same; always 100 °C", "Gleich; überall 100 °C"), T("Daha yüksektir, çünkü açık hava basıncı daha büyüktür", "Higher, because the air pressure is greater", "Höher, weil der Luftdruck größer ist"), T("Daha düşüktür, çünkü yer çekimi yoktur", "Lower, because there is no gravity", "Niedriger, weil es keine Schwerkraft gibt"), T("Suyun miktarına göre değişir", "It depends on the amount of water", "Hängt von der Wassermenge ab")],
        T("Bir sıvı, buhar basıncı dış basınca eşit olduğunda kaynar. Yükseklere çıkıldıkça üstteki hava sütunu kısaldığı için açık hava basıncı azalır; su daha düşük sıcaklıkta kaynar. Düdüklü tencere ise basıncı artırarak kaynama sıcaklığını yükseltir.",
          "A liquid boils when its vapour pressure equals the outside pressure. Higher up the air column above is shorter, so air pressure is lower and water boils at a lower temperature. A pressure cooker does the opposite by raising the pressure.",
          "Eine Flüssigkeit siedet, wenn ihr Dampfdruck gleich dem äußeren Druck ist. In der Höhe ist die Luftsäule kürzer, der Luftdruck kleiner, und Wasser siedet bei niedrigerer Temperatur. Ein Schnellkochtopf erhöht den Druck und damit die Siedetemperatur.")),
      V(T("Pipetle meyve suyu içebilmemizin nedeni aşağıdakilerden hangisidir?", "Why can we drink juice through a straw?", "Warum kann man Saft mit einem Strohhalm trinken?"),
        T("Pipet içindeki basınç azalınca açık hava basıncının sıvıyı yukarı itmesi", "When the pressure in the straw drops, air pressure pushes the liquid up", "Wenn der Druck im Halm sinkt, drückt der äußere Luftdruck die Flüssigkeit nach oben"),
        [T("Ağzımızın sıvıyı doğrudan çekmesi", "Our mouth pulls the liquid directly", "Der Mund zieht die Flüssigkeit direkt an"), T("Sıvının kaldırma kuvvetinin artması", "The liquid's buoyancy increases", "Der Auftrieb der Flüssigkeit steigt"), T("Pipetin sıvıyı kılcallıkla yükseltmesi", "The straw lifts the liquid by capillarity", "Der Halm hebt die Flüssigkeit durch Kapillarität"), T("Pipet içindeki basıncın artması", "The pressure inside the straw increases", "Der Druck im Halm steigt"), T("Sıvının özkütlesinin azalması", "The liquid's density decreases", "Die Dichte der Flüssigkeit sinkt")],
        T("Emerek pipet içindeki havanın basıncını azaltırız. Bardaktaki sıvı yüzeyine etki eden açık hava basıncı artık daha büyüktür ve sıvıyı pipetten yukarı iter. Kılcallık bu kadar kalın bir boruda önemsizdir.",
          "By sucking we lower the air pressure in the straw. The air pressure on the liquid in the glass is now larger and pushes the liquid up the straw. Capillarity is negligible in such a wide tube.",
          "Durch Saugen senken wir den Druck im Halm. Der Luftdruck auf die Flüssigkeit im Glas ist nun größer und drückt sie im Halm nach oben. Kapillarität spielt in so einem dicken Rohr keine Rolle.")),
      V(T("Yatay bir boruda akan su, borunun daraldığı bölgeden geçerken hızı ve basıncı nasıl değişir?", "Water flows through a horizontal pipe. In the narrow section, how do its speed and pressure change?", "Wasser fließt durch ein waagerechtes Rohr. Wie ändern sich Geschwindigkeit und Druck an einer Engstelle?"),
        T("Hızı artar, basıncı azalır", "Speed increases, pressure decreases", "Geschwindigkeit steigt, Druck sinkt"),
        [T("Hızı azalır, basıncı artar", "Speed decreases, pressure increases", "Geschwindigkeit sinkt, Druck steigt"), T("Hızı ve basıncı artar", "Both increase", "Beide steigen"), T("Hızı ve basıncı azalır", "Both decrease", "Beide sinken"), T("İkisi de değişmez", "Neither changes", "Keines ändert sich"), T("Hızı değişmez, basıncı artar", "Speed unchanged, pressure increases", "Geschwindigkeit gleich, Druck steigt")],
        T("Süreklilik: birim zamanda geçen su miktarı her yerde aynıdır (A · v = sabit); kesit küçülünce hız artar. Bernoulli ilkesine göre hızın arttığı yerde basınç azalır.",
          "Continuity: the same volume passes each point per second (A · v = constant); a smaller cross-section means a higher speed. By Bernoulli, where the speed is higher the pressure is lower.",
          "Kontinuität: Pro Sekunde fließt überall dieselbe Menge (A · v = konstant); an der Engstelle ist die Geschwindigkeit größer. Nach Bernoulli ist dort der Druck kleiner.")),
    ],
  });

  add({
    id: "fiz10-kavram-optik", topic: "optik", grade: 10, level: 2,
    bank: [
      V(T("Beyaz ışık bir prizmadan geçerken renklerine ayrılıyor. En çok kırılan (sapan) renk hangisidir?", "White light is split into colours by a prism. Which colour is refracted (bent) the most?", "Weißes Licht wird durch ein Prisma zerlegt. Welche Farbe wird am stärksten gebrochen?"),
        T("Mor", "Violet", "Violett"),
        [T("Kırmızı", "Red", "Rot"), T("Turuncu", "Orange", "Orange"), T("Sarı", "Yellow", "Gelb"), T("Yeşil", "Green", "Grün"), T("Hepsi eşit kırılır", "All are refracted equally", "Alle gleich stark")],
        T("Camın kırıcılık indisi dalga boyu küçüldükçe artar. Görünür ışıkta dalga boyu en küçük olan mor ışık en çok, en büyük olan kırmızı en az kırılır. Bu olaya renk ayrışması (dispersiyon) denir.",
          "Glass has a larger refractive index for shorter wavelengths. Violet, with the shortest visible wavelength, is bent the most and red the least. This is called dispersion.",
          "Der Brechungsindex von Glas ist für kürzere Wellenlängen größer. Violett (kürzeste Wellenlänge) wird am stärksten, Rot am schwächsten gebrochen. Das nennt man Dispersion.")),
      V(T("Yeşil bir yaprak, karanlık bir odada yalnızca kırmızı ışıkla aydınlatılırsa nasıl görünür?", "A green leaf is lit only by red light in a dark room. What colour does it appear?", "Ein grünes Blatt wird in einem dunklen Raum nur mit rotem Licht beleuchtet. Wie erscheint es?"),
        T("Siyah", "Black", "Schwarz"),
        [T("Yeşil", "Green", "Grün"), T("Kırmızı", "Red", "Rot"), T("Sarı", "Yellow", "Gelb"), T("Beyaz", "White", "Weiß"), T("Mavi", "Blue", "Blau")],
        T("Bir cisim, yalnızca yansıttığı rengin ışığıyla o renkte görünür. Yeşil yaprak yeşili yansıtır, kırmızıyı soğurur. Üzerine yeşil ışık düşmediği için gözümüze ışık gelmez ve yaprak siyah görünür.",
          "An object looks a colour only if light of that colour reaches it and is reflected. A green leaf reflects green and absorbs red. No green light falls on it, so no light reaches our eyes and it looks black.",
          "Ein Körper erscheint farbig, wenn er Licht dieser Farbe zurückwirft. Das grüne Blatt reflektiert Grün und absorbiert Rot. Ohne grünes Licht gelangt kein Licht ins Auge – es erscheint schwarz.")),
      V(T("Fiber optik kablolarda ışığın kayıpsız iletilmesi hangi olaya dayanır?", "Which phenomenon allows light to travel along optical fibres without loss?", "Auf welchem Effekt beruht die Lichtleitung in Glasfasern?"),
        T("Tam yansıma", "Total internal reflection", "Totalreflexion"),
        [T("Işığın soğurulması", "Absorption of light", "Absorption von Licht"), T("Renk ayrışması", "Dispersion", "Dispersion"), T("Gölge oluşumu", "Shadow formation", "Schattenbildung"), T("Işığın kırınımı", "Diffraction", "Beugung"), T("Düzgün olmayan (dağınık) yansıma", "Diffuse reflection", "Diffuse Reflexion")],
        T("Işık, kırıcılık indisi büyük ortamdan küçük ortama sınır açısından büyük bir açıyla geldiğinde hiç kırılmadan tamamen geri yansır. Fiberin çekirdeği bu yüzden ışığı yansıta yansıta uzak mesafelere taşır.",
          "When light goes from a higher to a lower refractive index at an angle greater than the critical angle, it is completely reflected. The fibre core keeps reflecting the light and carries it over long distances.",
          "Trifft Licht vom optisch dichteren ins dünnere Medium unter einem Winkel größer als der Grenzwinkel, wird es vollständig reflektiert. So leitet der Faserkern das Licht über weite Strecken.")),
      V(T("Düz aynada oluşan görüntü için aşağıdakilerden hangisi doğrudur?", "Which statement about the image in a plane mirror is correct?", "Welche Aussage über das Bild im ebenen Spiegel ist richtig?"),
        T("Sanaldır, düzdür ve cisimle aynı boydadır", "Virtual, upright and the same size as the object", "Virtuell, aufrecht und gleich groß wie der Gegenstand"),
        [T("Gerçektir ve terstir", "Real and inverted", "Reell und umgekehrt"), T("Cisimden her zaman büyüktür", "Always larger than the object", "Immer größer als der Gegenstand"), T("Perdede elde edilebilir", "It can be caught on a screen", "Es lässt sich auf einem Schirm auffangen"), T("Aynaya cisimden daha yakındır", "Closer to the mirror than the object", "Näher am Spiegel als der Gegenstand"), T("Cisimden her zaman küçüktür", "Always smaller than the object", "Immer kleiner als der Gegenstand")],
        T("Düz aynada yansıyan ışınların uzantıları aynanın arkasında kesişir; görüntü sanaldır ve perdede oluşmaz. Görüntü düz, cisimle aynı boyda ve aynaya cisimle aynı uzaklıktadır; yalnızca sağ–sol yer değiştirir.",
          "In a plane mirror the reflected rays only appear to meet behind the mirror: the image is virtual and cannot be caught on a screen. It is upright, the same size and as far behind the mirror as the object is in front; only left and right are swapped.",
          "Beim ebenen Spiegel scheinen sich die reflektierten Strahlen hinter dem Spiegel zu schneiden: Das Bild ist virtuell. Es ist aufrecht, gleich groß und genauso weit hinter dem Spiegel; nur links und rechts sind vertauscht.")),
      V(T("Uzağı net göremeyen (miyop) bir göz hangi tür mercekle düzeltilir?", "Which type of lens corrects short-sightedness (myopia)?", "Mit welcher Linse korrigiert man Kurzsichtigkeit?"),
        T("Kalın kenarlı (ıraksak) mercek", "A diverging (concave) lens", "Eine Zerstreuungslinse (konkav)"),
        [T("İnce kenarlı (yakınsak) mercek", "A converging (convex) lens", "Eine Sammellinse (konvex)"), T("Düz ayna", "A plane mirror", "Ein ebener Spiegel"), T("Çukur ayna", "A concave mirror", "Ein Hohlspiegel"), T("Prizma", "A prism", "Ein Prisma"), T("Renkli filtre", "A coloured filter", "Ein Farbfilter")],
        T("Miyop gözde uzaktan gelen ışınlar retinanın önünde odaklanır. Kalın kenarlı mercek ışınları biraz ıraksatarak odağı retinaya taşır. Hipermetropta ise ince kenarlı mercek kullanılır.",
          "In a short-sighted eye, light from distant objects focuses in front of the retina. A diverging lens spreads the rays slightly so they focus on the retina. Long-sightedness is corrected with a converging lens.",
          "Beim kurzsichtigen Auge liegt der Brennpunkt vor der Netzhaut. Eine Zerstreuungslinse weitet die Strahlen etwas auf, sodass sie auf der Netzhaut gebündelt werden. Weitsichtigkeit korrigiert man mit einer Sammellinse.")),
    ],
  });

  add({
    id: "fiz10-kavram-dalga", topic: "dalga", grade: 10, level: 1,
    bank: [
      V(T("Sesin ince ya da kalın (tiz ya da pes) olması, ses dalgasının hangi özelliğine bağlıdır?", "Whether a sound is high or low (its pitch) depends on which property of the sound wave?", "Ob ein Ton hoch oder tief ist, hängt von welcher Eigenschaft der Schallwelle ab?"),
        T("Frekansına", "Its frequency", "Von ihrer Frequenz"),
        [T("Genliğine", "Its amplitude", "Von ihrer Amplitude"), T("Yayılma hızına", "Its speed", "Von ihrer Ausbreitungsgeschwindigkeit"), T("Kaynağın kütlesine", "The source's mass", "Von der Masse der Quelle"), T("Dinleyicinin uzaklığına", "The listener's distance", "Vom Abstand des Hörers"), T("Ortamın sıcaklığına", "The temperature of the medium", "Von der Temperatur des Mediums")],
        T("Sesin yüksekliği (inceliği) frekansla belirlenir: frekans büyüdükçe ses incelir. Sesin şiddeti (yüksek ya da alçak sesle konuşma) ise genliğe bağlıdır.",
          "Pitch is set by frequency: the higher the frequency, the higher the note. Loudness depends on the amplitude.",
          "Die Tonhöhe hängt von der Frequenz ab: höhere Frequenz, höherer Ton. Die Lautstärke hängt von der Amplitude ab.")),
      V(T("Ses dalgaları aşağıdaki ortamlardan hangisinde yayılamaz?", "In which of the following can sound waves NOT travel?", "In welchem Medium kann sich Schall NICHT ausbreiten?"),
        T("Boşlukta", "In a vacuum", "Im Vakuum"),
        [T("Havada", "In air", "In Luft"), T("Suda", "In water", "In Wasser"), T("Demirde", "In iron", "In Eisen"), T("Tahtada", "In wood", "In Holz"), T("Toprakta", "In soil", "Im Erdboden")],
        T("Ses mekanik bir dalgadır; taneciklerin titreşimiyle yayılır ve bu yüzden maddesel bir ortama ihtiyaç duyar. Boşlukta tanecik olmadığı için ses yayılmaz. Işık ise elektromanyetik dalgadır ve boşlukta yayılır.",
          "Sound is a mechanical wave carried by vibrating particles, so it needs a material medium. A vacuum has no particles, so sound cannot travel. Light is an electromagnetic wave and travels through a vacuum.",
          "Schall ist eine mechanische Welle und braucht schwingende Teilchen, also ein Medium. Im Vakuum gibt es keine Teilchen. Licht ist eine elektromagnetische Welle und breitet sich im Vakuum aus.")),
      V(T("Su dalgaları derin bölgeden sığ bölgeye geçerken aşağıdakilerden hangisi doğrudur?", "As water waves pass from deep to shallow water, which statement is correct?", "Was gilt, wenn Wasserwellen von tiefem in flaches Wasser laufen?"),
        T("Hızı ve dalga boyu azalır, frekansı değişmez", "Speed and wavelength decrease, frequency stays the same", "Geschwindigkeit und Wellenlänge nehmen ab, die Frequenz bleibt gleich"),
        [T("Hızı, dalga boyu ve frekansı azalır", "Speed, wavelength and frequency all decrease", "Geschwindigkeit, Wellenlänge und Frequenz nehmen ab"), T("Hızı artar, frekansı azalır", "Speed increases, frequency decreases", "Geschwindigkeit steigt, Frequenz sinkt"), T("Frekansı artar, dalga boyu değişmez", "Frequency increases, wavelength unchanged", "Frequenz steigt, Wellenlänge gleich"), T("Hızı ve dalga boyu artar", "Speed and wavelength increase", "Geschwindigkeit und Wellenlänge nehmen zu"), T("Hiçbir özelliği değişmez", "Nothing changes", "Nichts ändert sich")],
        T("Su dalgalarının hızı derinlikle artar; sığ bölgede hız azalır. Frekans yalnızca kaynağa bağlıdır, değişmez. v = λ · f olduğundan hız azalınca dalga boyu da azalır.",
          "Water waves are faster in deeper water, so they slow down in shallow water. The frequency depends only on the source and stays the same. Since v = λ · f, the wavelength also decreases.",
          "Wasserwellen sind in tiefem Wasser schneller und werden im flachen langsamer. Die Frequenz hängt nur von der Quelle ab. Wegen v = λ · f wird auch die Wellenlänge kleiner.")),
      V(T("Aşağıdakilerden hangisi <b>enine</b> bir dalgadır?", "Which of the following is a <b>transverse</b> wave?", "Welche der folgenden Wellen ist eine <b>Transversalwelle</b>?"),
        T("Işık dalgası", "A light wave", "Eine Lichtwelle"),
        [T("Havadaki ses dalgası", "A sound wave in air", "Eine Schallwelle in Luft"), T("Yayda sıkışma–genleşme dalgası", "A compression wave in a spring", "Eine Verdichtungswelle in einer Feder"), T("Deprem P dalgası", "An earthquake P-wave", "Eine Erdbeben-P-Welle"), T("Suyun içindeki ses dalgası", "A sound wave in water", "Eine Schallwelle in Wasser"), T("Ultrason dalgası", "An ultrasound wave", "Eine Ultraschallwelle")],
        T("Enine dalgada titreşim doğrultusu yayılma doğrultusuna diktir; ışık (ve tüm elektromanyetik dalgalar) enine dalgadır. Ses, ultrason, yaydaki sıkışma dalgası ve P dalgaları ise titreşimin yayılma doğrultusunda olduğu boyuna dalgalardır.",
          "In a transverse wave the vibration is perpendicular to the direction of travel; light (and all electromagnetic waves) are transverse. Sound, ultrasound, compression waves in a spring and P-waves are longitudinal.",
          "Bei Transversalwellen schwingt es senkrecht zur Ausbreitungsrichtung; Licht (und alle elektromagnetischen Wellen) sind transversal. Schall, Ultraschall, Verdichtungswellen und P-Wellen sind longitudinal.")),
      V(T("Bir yayda oluşturulan dalganın <b>frekansı</b> neye bağlıdır?", "What does the <b>frequency</b> of a wave on a spring depend on?", "Wovon hängt die <b>Frequenz</b> einer Welle auf einer Feder ab?"),
        T("Yalnızca dalgayı oluşturan kaynağa", "Only on the source producing it", "Nur von der erzeugenden Quelle"),
        [T("Yalnızca yayın gerginliğine", "Only on the tension of the spring", "Nur von der Spannung der Feder"), T("Dalganın genliğine", "On the wave's amplitude", "Von der Amplitude"), T("Yayın uzunluğuna", "On the length of the spring", "Von der Länge der Feder"), T("Dalganın yayılma hızına", "On the wave speed", "Von der Ausbreitungsgeschwindigkeit"), T("Dalga boyuna", "On the wavelength", "Von der Wellenlänge")],
        T("Frekans, kaynağın birim zamanda yaptığı titreşim sayısıdır ve yalnızca kaynağa bağlıdır. Yayılma hızı ise ortama (yayın gerginliği ve birim uzunluğunun kütlesi) bağlıdır; dalga boyu λ = v / f ile her ikisinden etkilenir.",
          "Frequency is the number of vibrations of the source per second and depends only on the source. The speed depends on the medium (tension and mass per unit length); the wavelength λ = v / f depends on both.",
          "Die Frequenz ist die Zahl der Schwingungen der Quelle pro Sekunde und hängt nur von der Quelle ab. Die Geschwindigkeit hängt vom Medium ab (Spannung, Masse pro Länge); die Wellenlänge λ = v / f von beidem.")),
    ],
  });

  // ===================== YENİ HESAP KALIPLARI =====================

  add({
    id: "fiz9-isi-buz-erime", topic: "isi", grade: 9, level: 2,
    vars: { m: { values: [20, 50, 100, 200] }, T2: { values: [10, 20, 30, 40, 50] } },
    answer: "m * 80 + m * T2", unit: "cal",
    distractors: ["m * T2", "m * 80", "m * 80 - m * T2", "m * (80 + T2) * 2"],
    text: T(
      "0 °C'deki {m} g buzu tamamen eritip {T2} °C'de su elde etmek için kaç kalori ısı gerekir? (Buzun erime ısısı 80 cal/g, c<sub>su</sub> = 1 cal/g·°C)",
      "How many calories are needed to melt {m} g of ice at 0 °C completely and warm the water to {T2} °C? (Latent heat of fusion of ice 80 cal/g, c<sub>water</sub> = 1 cal/g·°C)",
      "Wie viele Kalorien braucht man, um {m} g Eis von 0 °C vollständig zu schmelzen und das Wasser auf {T2} °C zu erwärmen? (Schmelzwärme 80 cal/g, c<sub>Wasser</sub> = 1 cal/g·°C)"),
  });

  add({
    id: "fiz9-genlesme", topic: "isi", grade: 9, level: 2,
    vars: { L0: { values: [10, 20, 50, 100] }, k: { values: [1, 1.2, 2, 2.4] }, dT: { values: [20, 25, 40, 50] }, dL: "L0 * k * dT / 100" },
    answer: "dL", unit: "mm",
    distractors: ["L0 * k * dT / 1000", "L0 * k * dT / 10", "L0 * k / 100", "2 * dL"],
    text: T(
      "Boyu {L0} m olan bir metal çubuğun sıcaklığı {dT} °C artırılıyor. Metalin boyca uzama katsayısı {k}·10<sup>−5</sup> 1/°C olduğuna göre çubuk kaç mm uzar?",
      "The temperature of a {L0} m metal rod is raised by {dT} °C. The linear expansion coefficient is {k}·10<sup>−5</sup> 1/°C. By how many millimetres does the rod lengthen?",
      "Die Temperatur eines {L0} m langen Metallstabs steigt um {dT} °C. Der Längenausdehnungskoeffizient beträgt {k}·10<sup>−5</sup> 1/°C. Um wie viele Millimeter wird der Stab länger?"),
  });

  add({
    id: "fiz10-elektrik-guc", topic: "elektrik", grade: 10, level: 1,
    vars: { V: { values: [12, 24, 110, 220] }, R: { values: [2, 4, 6, 10, 20, 22, 44, 55] }, P: "V * V / R" },
    where: "P == round(P)",
    answer: "P", unit: "W",
    distractors: ["V / R", "V * R", "V * V * R", "V * V / (2 * R)"],
    text: T(
      "Direnci {R} Ω olan bir ısıtıcı {V} V'luk gerilimle çalıştırılıyor. Isıtıcının harcadığı elektriksel güç kaç W'tır?",
      "A heater with a resistance of {R} Ω is run at {V} V. What electrical power does it use, in watts?",
      "Ein Heizgerät mit dem Widerstand {R} Ω wird an {V} V betrieben. Welche elektrische Leistung in Watt nimmt es auf?"),
  });

  add({
    id: "fiz10-lamba-parlaklik", topic: "elektrik", grade: 10, level: 3,
    vars: { RK: { values: [2, 4, 6] }, RL: { values: [3, 6, 12] }, RM: { values: [3, 6, 12] }, V: { values: [12, 24] },
      Rp: "RL * RM / (RL + RM)", I: "V / (RK + Rp)", Vp: "I * Rp" },
    where: "!(RL == RM and RK * I * I == Vp * Vp / RL)",
    items: { K: "I * I * RK", L: "Vp * Vp / RL", M: "Vp * Vp / RM" },
    symbol: "P",
    text: T(
      "Dirençleri R<sub>K</sub> = {RK} Ω, R<sub>L</sub> = {RL} Ω ve R<sub>M</sub> = {RM} Ω olan K, L, M lambalarından L ve M birbirine paralel bağlanmış, bu grup K lambasıyla seri olarak {V} V'luk üretece bağlanmıştır. Lambaların güçleri (parlaklıkları) P<sub>K</sub>, P<sub>L</sub>, P<sub>M</sub> arasındaki ilişki nedir? (Lamba dirençleri sabit, üretecin iç direnci önemsiz)",
      "Lamps K, L and M have resistances R<sub>K</sub> = {RK} Ω, R<sub>L</sub> = {RL} Ω and R<sub>M</sub> = {RM} Ω. L and M are in parallel, and this pair is in series with K across a {V} V source. What is the relationship between their powers (brightness) P<sub>K</sub>, P<sub>L</sub>, P<sub>M</sub>? (Constant lamp resistances, ideal source)",
      "Die Lampen K, L, M haben die Widerstände R<sub>K</sub> = {RK} Ω, R<sub>L</sub> = {RL} Ω und R<sub>M</sub> = {RM} Ω. L und M sind parallel geschaltet, diese Gruppe liegt mit K in Reihe an {V} V. Welche Beziehung besteht zwischen den Leistungen (Helligkeiten) P<sub>K</sub>, P<sub>L</sub>, P<sub>M</sub>? (Konstante Widerstände, ideale Quelle)"),
  });

  add({
    id: "fiz10-uretec-seri", topic: "elektrik", grade: 10, level: 2,
    vars: { n: { values: [2, 3, 4] }, e: { values: [1.5, 3, 6, 9] }, r: { values: [0.5, 1] }, R: { values: [2, 4, 5, 10] }, I: "n * e / (R + n * r)" },
    where: "abs(I * 100 - round(I * 100)) < 0.000001",
    answer: "I", unit: "A",
    distractors: ["n * e / R", "e / (R + r)", "n * e / (R + r)", "e / R"],
    text: T(
      "Her birinin emk'sı {e} V ve iç direnci {r} Ω olan {n} özdeş üreteç seri bağlanarak {R} Ω'luk bir dirence bağlanıyor. Devreden geçen akım kaç A'dir?",
      "{n} identical cells, each with emf {e} V and internal resistance {r} Ω, are connected in series to a {R} Ω resistor. What current flows, in amperes?",
      "{n} gleiche Zellen mit je {e} V Quellenspannung und {r} Ω Innenwiderstand sind in Reihe an einen Widerstand von {R} Ω angeschlossen. Welcher Strom in Ampere fließt?"),
  });

  add({
    id: "fiz10-manometre", topic: "basinc", grade: 10, level: 2,
    vars: { P0: { values: [70, 72, 74, 76] }, h: { values: [5, 10, 12, 15, 20, 24] }, up: { values: [0, 1] } },
    answer: "P0 + if(up, h, -h)", unit: "cmHg",
    distractors: ["P0 + if(up, -h, h)", "P0", "h", "P0 + 2 * h"],
    text: T(
      "Bir gaz deposuna bağlı, içinde cıva bulunan açık uçlu U borusunda, açık koldaki cıva seviyesi depoya bağlı koldakinden {h} cm {if:up|yukarıdadır|aşağıdadır}. Açık hava basıncı {P0} cmHg olduğuna göre depodaki gazın basıncı kaç cmHg'dir?",
      "A mercury U-tube is connected to a gas tank and is open at the other end. The mercury in the open arm is {h} cm {if:up|higher|lower} than in the arm connected to the tank. Atmospheric pressure is {P0} cmHg. What is the gas pressure in cmHg?",
      "Ein offenes U-Rohr mit Quecksilber ist an einen Gasbehälter angeschlossen. Im offenen Schenkel steht das Quecksilber {h} cm {if:up|höher|tiefer} als im Schenkel am Behälter. Der Luftdruck beträgt {P0} cmHg. Wie groß ist der Gasdruck in cmHg?"),
  });

  add({
    id: "fiz10-ayna-sayisi", topic: "optik", grade: 10, level: 1,
    vars: { a: { values: [30, 36, 40, 45, 60, 72, 90, 120] } },
    answer: "360 / a - 1", unit: "",
    distractors: ["360 / a", "360 / a + 1", "180 / a", "360 / a - 2"],
    text: T(
      "Aralarındaki açı {a}° olan iki düz aynanın arasına bir cisim konuyor. Aynalarda cismin kaç görüntüsü oluşur?",
      "An object is placed between two plane mirrors at {a}° to each other. How many images of the object are formed?",
      "Zwischen zwei ebene Spiegel, die einen Winkel von {a}° bilden, wird ein Gegenstand gestellt. Wie viele Bilder entstehen?"),
  });

  add({
    id: "fiz10-cukur-ayna", topic: "optik", grade: 10, level: 2,
    vars: { s: { values: [1, 2, 3, 4, 5, 6, 7, 8] }, f: "pick(s, 20, 20, 20, 10, 10, 10, 12, 12)", u: "pick(s, 30, 60, 40, 15, 30, 12, 36, 24)", v: "pick(s, 60, 30, 40, 30, 15, 60, 18, 24)" },
    answer: "v", unit: "cm",
    distractors: ["u", "f", "u - f", "u + f"],
    text: T(
      "Odak uzaklığı {f} cm olan bir çukur aynanın önüne, asal eksen üzerinde aynadan {u} cm uzağa bir cisim konuyor. Cismin görüntüsü aynadan kaç cm uzakta oluşur?",
      "An object is placed on the principal axis {u} cm in front of a concave mirror with a focal length of {f} cm. How far from the mirror is the image formed, in cm?",
      "Ein Gegenstand steht auf der optischen Achse {u} cm vor einem Hohlspiegel mit der Brennweite {f} cm. In welchem Abstand vom Spiegel entsteht das Bild, in cm?"),
  });

  add({
    id: "fiz10-mercek-boy", topic: "optik", grade: 10, level: 3,
    vars: { s: { values: [1, 2, 3, 4, 5, 6, 7, 8] }, f: "pick(s, 20, 20, 20, 10, 10, 10, 12, 12)", u: "pick(s, 30, 60, 40, 15, 30, 12, 36, 24)", v: "pick(s, 60, 30, 40, 30, 15, 60, 18, 24)", h: { values: [2, 4, 6, 10] } },
    answer: "h * v / u", unit: "cm",
    distractors: ["h", "h * u / v", "h * f / u", "h * v / f"],
    text: T(
      "Odak uzaklığı {f} cm olan ince kenarlı bir merceğin önüne, asal eksene dik olarak duran {h} cm boyundaki bir cisim mercekten {u} cm uzağa konuyor. Perdede oluşan görüntünün boyu kaç cm'dir?",
      "An object {h} cm tall stands upright on the axis {u} cm in front of a converging lens with a focal length of {f} cm. How tall is the image on the screen, in cm?",
      "Ein {h} cm hoher Gegenstand steht senkrecht zur Achse {u} cm vor einer Sammellinse mit der Brennweite {f} cm. Wie groß ist das Bild auf dem Schirm, in cm?"),
  });

  add({
    id: "fiz10-kirilma-snell", topic: "optik", grade: 10, level: 2,
    vars: { s: { values: [1, 2, 3] }, a1: "pick(s, 53, 37, 53)", a2: "pick(s, 37, 30, 30)", s1: "pick(s, 0.8, 0.6, 0.8)", s2: "pick(s, 0.6, 0.5, 0.5)", n1: { values: [1, 1.2, 1.25, 1.5] }, n: "n1 * s1 / s2" },
    answer: "n", decimals: 2, unit: "",
    distractors: ["n1 * s2 / s1", "s1 / s2", "n1", "n1 + s1 - s2"],
    text: T(
      "Kırıcılık indisi {n1} olan bir ortamdan ikinci bir saydam ortama geçen ışığın gelme açısı {a1}°, kırılma açısı {a2}°'dir. İkinci ortamın kırıcılık indisi kaçtır? (sin 30° = 0,5; sin 37° = 0,6; sin 53° = 0,8)",
      "Light passes from a medium with refractive index {n1} into a second transparent medium. The angle of incidence is {a1}° and the angle of refraction {a2}°. What is the refractive index of the second medium? (sin 30° = 0.5; sin 37° = 0.6; sin 53° = 0.8)",
      "Licht geht aus einem Medium mit dem Brechungsindex {n1} in ein zweites durchsichtiges Medium; Einfallswinkel {a1}°, Brechungswinkel {a2}°. Wie groß ist der Brechungsindex des zweiten Mediums? (sin 30° = 0,5; sin 37° = 0,6; sin 53° = 0,8)"),
  });

  add({
    id: "fiz10-aydinlanma", topic: "optik", grade: 10, level: 1,
    vars: { I: { values: [40, 80, 100, 160, 200, 360] }, d: { values: [1, 2, 3, 4] }, E: "I / (d * d)" },
    where: "abs(E * 10 - round(E * 10)) < 0.000001",
    answer: "E", unit: "lx",
    distractors: ["I / d", "I * d", "I / (2 * d)", "I * d * d"],
    text: T(
      "Işık şiddeti {I} cd olan noktasal bir kaynak, kendisinden {d} m uzaktaki ve ışınlara dik duran bir yüzeyi aydınlatıyor. Yüzeyin aydınlanma şiddeti kaç lx'tür?",
      "A point source with a luminous intensity of {I} cd lights a surface {d} m away, perpendicular to the rays. What is the illuminance of the surface, in lux?",
      "Eine punktförmige Lichtquelle mit der Lichtstärke {I} cd beleuchtet eine {d} m entfernte Fläche senkrecht. Wie groß ist die Beleuchtungsstärke in Lux?"),
  });

  add({
    id: "fiz10-dalga-hiz", topic: "dalga", grade: 10, level: 1,
    vars: { n: { values: [5, 10, 20, 40] }, t: { values: [1, 2, 4, 5] }, lam: { values: [2, 4, 5, 10] }, f: "n / t" },
    where: "f == round(f)",
    answer: "lam * n / t", unit: "cm/s",
    distractors: ["lam * t / n", "n / t", "lam / t", "lam * n"],
    text: T(
      "Bir dalga kaynağı {t} saniyede {n} tam dalga üretiyor. Oluşan dalgaların dalga boyu {lam} cm olduğuna göre dalgaların yayılma hızı kaç cm/s'dir?",
      "A wave source produces {n} complete waves in {t} s. The wavelength is {lam} cm. What is the wave speed, in cm/s?",
      "Eine Wellenquelle erzeugt in {t} s {n} vollständige Wellen. Die Wellenlänge beträgt {lam} cm. Wie groß ist die Ausbreitungsgeschwindigkeit in cm/s?"),
  });

  add({
    id: "fiz10-ses-dalgaboyu", topic: "dalga", grade: 10, level: 1,
    vars: { f: { values: [85, 170, 340, 680, 850, 1700] } },
    answer: "340 / f", decimals: 2, unit: "m",
    distractors: ["f / 340", "340 * f / 1000", "170 / f", "680 / f"],
    text: T(
      "Frekansı {f} Hz olan bir ses dalgasının havadaki dalga boyu kaç m'dir? (Sesin havadaki hızı 340 m/s)",
      "What is the wavelength in air of a sound wave with a frequency of {f} Hz, in metres? (Speed of sound in air 340 m/s)",
      "Wie groß ist die Wellenlänge einer Schallwelle mit {f} Hz in Luft, in Metern? (Schallgeschwindigkeit 340 m/s)"),
  });

  QB.solve({
    "fiz9-isi-buz-erime": {
      tr: ["İki aşama vardır: önce buz 0 °C'de erir (sıcaklık değişmez), sonra oluşan su ısınır.", "Erime: Q₁ = m · L = {m} · 80 = {=m*80} cal.", "Isınma: Q₂ = m · c · ΔT = {m} · 1 · ({T2} − 0) = {=m*T2} cal.", "Toplam: Q = {=m*80} + {=m*T2} = {=m*80+m*T2} cal."],
      en: ["Two stages: first the ice melts at 0 °C (temperature constant), then the water warms up.", "Melting: Q₁ = m · L = {m} · 80 = {=m*80} cal.", "Warming: Q₂ = m · c · ΔT = {m} · 1 · ({T2} − 0) = {=m*T2} cal.", "Total: Q = {=m*80} + {=m*T2} = {=m*80+m*T2} cal."],
      de: ["Zwei Schritte: Zuerst schmilzt das Eis bei 0 °C (Temperatur konstant), dann wird das Wasser erwärmt.", "Schmelzen: Q₁ = m · L = {m} · 80 = {=m*80} cal.", "Erwärmen: Q₂ = m · c · ΔT = {m} · 1 · ({T2} − 0) = {=m*T2} cal.", "Gesamt: Q = {=m*80} + {=m*T2} = {=m*80+m*T2} cal."],
    },
    "fiz9-genlesme": {
      tr: ["Boyca uzama: ΔL = L₀ · α · ΔT.", "ΔL = {L0} m · {k}·10<sup>−5</sup> · {dT} = {=L0*k*dT/100000:5} m.", "1 m = 1000 mm olduğundan ΔL = {=L0*k*dT/100000:5} · 1000 = {dL} mm."],
      en: ["Linear expansion: ΔL = L₀ · α · ΔT.", "ΔL = {L0} m · {k}·10<sup>−5</sup> · {dT} = {=L0*k*dT/100000:5} m.", "Since 1 m = 1000 mm, ΔL = {=L0*k*dT/100000:5} · 1000 = {dL} mm."],
      de: ["Längenausdehnung: ΔL = L₀ · α · ΔT.", "ΔL = {L0} m · {k}·10<sup>−5</sup> · {dT} = {=L0*k*dT/100000:5} m.", "Wegen 1 m = 1000 mm ist ΔL = {=L0*k*dT/100000:5} · 1000 = {dL} mm."],
    },
    "fiz10-elektrik-guc": {
      tr: ["Elektriksel güç: P = V · I; Ohm yasasıyla I = V / R yazılırsa P = V² / R.", "Akım: I = {V} / {R} = {=V/R:2} A.", "P = {V}² / {R} = {=V*V} / {R} = {P} W."],
      en: ["Electrical power: P = V · I; with Ohm's law I = V / R this gives P = V² / R.", "Current: I = {V} / {R} = {=V/R:2} A.", "P = {V}² / {R} = {=V*V} / {R} = {P} W."],
      de: ["Elektrische Leistung: P = U · I; mit I = U / R folgt P = U² / R.", "Strom: I = {V} / {R} = {=V/R:2} A.", "P = {V}² / {R} = {=V*V} / {R} = {P} W."],
    },
    "fiz10-lamba-parlaklik": {
      tr: ["Lambanın parlaklığı harcadığı güçle orantılıdır.", "L ∥ M: R<sub>p</sub> = {RL} · {RM} / ({RL} + {RM}) = {=Rp:2} Ω; R<sub>eş</sub> = {RK} + {=Rp:2} = {=RK+Rp:2} Ω.", "Ana akım (K'den geçen): I = {V} / {=RK+Rp:2} = {=I:2} A; paralel kolun gerilimi V<sub>p</sub> = {=I:2} · {=Rp:2} = {=Vp:2} V.", "P<sub>K</sub> = I² · R<sub>K</sub> = {=I*I*RK:2} W; P<sub>L</sub> = V<sub>p</sub>² / R<sub>L</sub> = {=Vp*Vp/RL:2} W; P<sub>M</sub> = V<sub>p</sub>² / R<sub>M</sub> = {=Vp*Vp/RM:2} W.", "Paralel kollarda gerilim aynı olduğundan direnci küçük olan lamba daha parlak yanar."],
      en: ["A lamp's brightness is proportional to its power.", "L ∥ M: R<sub>p</sub> = {RL} · {RM} / ({RL} + {RM}) = {=Rp:2} Ω; R<sub>eq</sub> = {RK} + {=Rp:2} = {=RK+Rp:2} Ω.", "Main current (through K): I = {V} / {=RK+Rp:2} = {=I:2} A; voltage across the parallel pair V<sub>p</sub> = {=I:2} · {=Rp:2} = {=Vp:2} V.", "P<sub>K</sub> = I² · R<sub>K</sub> = {=I*I*RK:2} W; P<sub>L</sub> = V<sub>p</sub>² / R<sub>L</sub> = {=Vp*Vp/RL:2} W; P<sub>M</sub> = V<sub>p</sub>² / R<sub>M</sub> = {=Vp*Vp/RM:2} W.", "In parallel the voltage is the same, so the lamp with the smaller resistance is brighter."],
      de: ["Die Helligkeit einer Lampe ist proportional zu ihrer Leistung.", "L ∥ M: R<sub>p</sub> = {RL} · {RM} / ({RL} + {RM}) = {=Rp:2} Ω; R<sub>ges</sub> = {RK} + {=Rp:2} = {=RK+Rp:2} Ω.", "Hauptstrom (durch K): I = {V} / {=RK+Rp:2} = {=I:2} A; Spannung an der Parallelgruppe U<sub>p</sub> = {=I:2} · {=Rp:2} = {=Vp:2} V.", "P<sub>K</sub> = I² · R<sub>K</sub> = {=I*I*RK:2} W; P<sub>L</sub> = U<sub>p</sub>² / R<sub>L</sub> = {=Vp*Vp/RL:2} W; P<sub>M</sub> = U<sub>p</sub>² / R<sub>M</sub> = {=Vp*Vp/RM:2} W.", "Parallel liegt dieselbe Spannung an; die Lampe mit dem kleineren Widerstand leuchtet heller."],
    },
    "fiz10-uretec-seri": {
      tr: ["Seri bağlı üreteçlerde emk'lar ve iç dirençler toplanır.", "Toplam emk: {n} · {e} = {=n*e} V; toplam iç direnç: {n} · {r} = {=n*r} Ω.", "Devrenin toplam direnci: {R} + {=n*r} = {=R+n*r} Ω.", "I = {=n*e} / {=R+n*r} = {I} A."],
      en: ["For cells in series, the emfs and internal resistances add.", "Total emf: {n} · {e} = {=n*e} V; total internal resistance: {n} · {r} = {=n*r} Ω.", "Total circuit resistance: {R} + {=n*r} = {=R+n*r} Ω.", "I = {=n*e} / {=R+n*r} = {I} A."],
      de: ["In Reihe addieren sich Quellenspannungen und Innenwiderstände.", "Gesamtspannung: {n} · {e} = {=n*e} V; gesamter Innenwiderstand: {n} · {r} = {=n*r} Ω.", "Gesamtwiderstand: {R} + {=n*r} = {=R+n*r} Ω.", "I = {=n*e} / {=R+n*r} = {I} A."],
    },
    "fiz10-manometre": {
      tr: ["Cıvanın içinde aynı yatay düzlemdeki noktalarda basınç eşittir. Alçakta kalan cıva yüzeyinin hizasını referans alalım.", "{if:up|Açık koldaki cıva {h} cm daha yüksekte: gazın basıncı hem açık hava basıncını hem de {h} cm'lik cıva sütununu dengeler.|Açık koldaki cıva {h} cm daha aşağıda: gaz tarafındaki cıva sütunu yukarıda kalır, gazın basıncı açık hava basıncından {h} cmHg küçüktür.}", "P<sub>gaz</sub> = {P0} {if:up|+|−} {h} = {=P0+if(up, h, -h)} cmHg."],
      en: ["Points at the same level in the mercury have equal pressure. Use the level of the lower mercury surface as reference.", "{if:up|The mercury in the open arm is {h} cm higher: the gas balances the air pressure plus a {h} cm mercury column.|The mercury in the open arm is {h} cm lower: the column is on the gas side, so the gas pressure is {h} cmHg less than atmospheric.}", "P<sub>gas</sub> = {P0} {if:up|+|−} {h} = {=P0+if(up, h, -h)} cmHg."],
      de: ["Im Quecksilber herrscht auf gleicher Höhe gleicher Druck. Bezugsebene ist die tiefer liegende Quecksilberoberfläche.", "{if:up|Im offenen Schenkel steht das Quecksilber {h} cm höher: Das Gas trägt den Luftdruck plus eine {h} cm hohe Quecksilbersäule.|Im offenen Schenkel steht es {h} cm tiefer: Die Säule liegt auf der Gasseite, der Gasdruck ist um {h} cmHg kleiner als der Luftdruck.}", "p<sub>Gas</sub> = {P0} {if:up|+|−} {h} = {=P0+if(up, h, -h)} cmHg."],
    },
    "fiz10-ayna-sayisi": {
      tr: ["Aralarında α açısı bulunan iki düz aynada (360/α tam sayı iken) görüntü sayısı: n = 360° / α − 1.", "n = 360 / {a} − 1 = {=360/a} − 1 = {=360/a-1}.", "Örnek kontrol: 90°'lik aynalarda 3 görüntü oluşur."],
      en: ["For two plane mirrors at angle α (when 360/α is a whole number) the number of images is n = 360° / α − 1.", "n = 360 / {a} − 1 = {=360/a} − 1 = {=360/a-1}.", "Quick check: mirrors at 90° give 3 images."],
      de: ["Zwei ebene Spiegel unter dem Winkel α (wenn 360/α ganzzahlig ist) erzeugen n = 360° / α − 1 Bilder.", "n = 360 / {a} − 1 = {=360/a} − 1 = {=360/a-1}.", "Probe: Spiegel unter 90° erzeugen 3 Bilder."],
    },
    "fiz10-cukur-ayna": {
      tr: ["Ayna denklemi: 1/f = 1/d<sub>c</sub> + 1/d<sub>g</sub> (d<sub>c</sub>: cismin, d<sub>g</sub>: görüntünün aynaya uzaklığı).", "1/d<sub>g</sub> = 1/{f} − 1/{u}.", "1/d<sub>g</sub> = 1/{v} → d<sub>g</sub> = {v} cm.", "{if:u > f|Cisim odak noktasının dışında olduğu için görüntü gerçek ve ters olur.|Cisim odakta ya da içinde olsaydı görüntü sanal olurdu.}"],
      en: ["Mirror equation: 1/f = 1/d<sub>o</sub> + 1/d<sub>i</sub> (object and image distances from the mirror).", "1/d<sub>i</sub> = 1/{f} − 1/{u}.", "1/d<sub>i</sub> = 1/{v} → d<sub>i</sub> = {v} cm.", "{if:u > f|The object is beyond the focal point, so the image is real and inverted.|An object at or inside the focal point would give a virtual image.}"],
      de: ["Spiegelgleichung: 1/f = 1/g + 1/b (Gegenstands- und Bildweite).", "1/b = 1/{f} − 1/{u}.", "1/b = 1/{v} → b = {v} cm.", "{if:u > f|Der Gegenstand liegt außerhalb der Brennweite, das Bild ist reell und umgekehrt.|Innerhalb der Brennweite entstünde ein virtuelles Bild.}"],
    },
    "fiz10-mercek-boy": {
      tr: ["Mercek denklemi: 1/f = 1/d<sub>c</sub> + 1/d<sub>g</sub> → 1/d<sub>g</sub> = 1/{f} − 1/{u} = 1/{v}; d<sub>g</sub> = {v} cm.", "Büyütme: h<sub>g</sub> / h<sub>c</sub> = d<sub>g</sub> / d<sub>c</sub> = {v} / {u}.", "h<sub>g</sub> = {h} · {v} / {u} = {=h*v/u:2} cm.", "Perdede oluştuğu için görüntü gerçek ve terstir."],
      en: ["Lens equation: 1/f = 1/d<sub>o</sub> + 1/d<sub>i</sub> → 1/d<sub>i</sub> = 1/{f} − 1/{u} = 1/{v}; d<sub>i</sub> = {v} cm.", "Magnification: h<sub>i</sub> / h<sub>o</sub> = d<sub>i</sub> / d<sub>o</sub> = {v} / {u}.", "h<sub>i</sub> = {h} · {v} / {u} = {=h*v/u:2} cm.", "It forms on a screen, so the image is real and inverted."],
      de: ["Linsengleichung: 1/f = 1/g + 1/b → 1/b = 1/{f} − 1/{u} = 1/{v}; b = {v} cm.", "Abbildungsmaßstab: B / G = b / g = {v} / {u}.", "B = {h} · {v} / {u} = {=h*v/u:2} cm.", "Das Bild entsteht auf dem Schirm, ist also reell und umgekehrt."],
    },
    "fiz10-kirilma-snell": {
      tr: ["Snell yasası: n₁ · sin θ₁ = n₂ · sin θ₂.", "{n1} · sin {a1}° = n · sin {a2}° → {n1} · {s1} = n · {s2}.", "n = {n1} · {s1} / {s2} = {=n1*s1} / {s2} = {n:2}.", "Işık normale yaklaştı ({a2}° < {a1}°); demek ki ikinci ortam daha yoğundur ve n > {n1} bulunması beklenir."],
      en: ["Snell's law: n₁ · sin θ₁ = n₂ · sin θ₂.", "{n1} · sin {a1}° = n · sin {a2}° → {n1} · {s1} = n · {s2}.", "n = {n1} · {s1} / {s2} = {=n1*s1} / {s2} = {n:2}.", "The light bends towards the normal ({a2}° < {a1}°), so the second medium is optically denser and n > {n1} as expected."],
      de: ["Brechungsgesetz: n₁ · sin α = n₂ · sin β.", "{n1} · sin {a1}° = n · sin {a2}° → {n1} · {s1} = n · {s2}.", "n = {n1} · {s1} / {s2} = {=n1*s1} / {s2} = {n:2}.", "Das Licht wird zum Lot hin gebrochen ({a2}° < {a1}°); das zweite Medium ist optisch dichter, also n > {n1}."],
    },
    "fiz10-aydinlanma": {
      tr: ["Noktasal kaynağın dik yüzeyde oluşturduğu aydınlanma: E = I / d² (uzaklığın karesiyle ters orantılı).", "E = {I} / {d}² = {I} / {=d*d} = {E} lx."],
      en: ["Illuminance from a point source on a perpendicular surface: E = I / d² (inverse square law).", "E = {I} / {d}² = {I} / {=d*d} = {E} lx."],
      de: ["Beleuchtungsstärke einer Punktquelle auf einer senkrechten Fläche: E = I / d² (quadratisches Abstandsgesetz).", "E = {I} / {d}² = {I} / {=d*d} = {E} lx."],
    },
    "fiz10-dalga-hiz": {
      tr: ["Frekans: f = dalga sayısı / süre = {n} / {t} = {f} Hz.", "Yayılma hızı: v = λ · f = {lam} · {f} = {=lam*n/t} cm/s."],
      en: ["Frequency: f = number of waves / time = {n} / {t} = {f} Hz.", "Wave speed: v = λ · f = {lam} · {f} = {=lam*n/t} cm/s."],
      de: ["Frequenz: f = Anzahl der Wellen / Zeit = {n} / {t} = {f} Hz.", "Ausbreitungsgeschwindigkeit: v = λ · f = {lam} · {f} = {=lam*n/t} cm/s."],
    },
    "fiz10-ses-dalgaboyu": {
      tr: ["Dalga denklemi: v = λ · f → λ = v / f.", "λ = 340 / {f} = {=340/f:2} m.", "Frekans arttıkça (ses inceldikçe) dalga boyu kısalır."],
      en: ["Wave equation: v = λ · f → λ = v / f.", "λ = 340 / {f} = {=340/f:2} m.", "The higher the frequency (pitch), the shorter the wavelength."],
      de: ["Wellengleichung: v = λ · f → λ = v / f.", "λ = 340 / {f} = {=340/f:2} m.", "Je höher die Frequenz (der Ton), desto kürzer die Wellenlänge."],
    },
  });
})();
