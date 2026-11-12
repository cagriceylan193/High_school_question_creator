// Türkiye Yüzyılı Maarif Modeli: öğrenme çıktıları ve beceriler (yazılı sınav tabloları için)
// Kodlar ve Türkçe ifadeler MEB fizik öğretim programındaki öğrenme çıktılarıdır.
// Açık uçlu şablonlar 'outcome' (ör. "FİZ.10.1.2") ve isteğe bağlı 'beceri' (ör. ["FBAB10"]) alanı alır.
(function () {
  "use strict";
  QB.MAARIF = {
    outcomes: {
      "FİZ.9.1.1": { beceri: ["FBAB10"], tr: "Fizik biliminin tanımına yönelik tümevarımsal akıl yürütebilme", en: "Reasoning inductively about the definition of physics", de: "Induktives Schlussfolgern zur Definition der Physik" },
      "FİZ.9.1.2": { beceri: ["FBAB2"], tr: "Fizik biliminin alt dallarını sınıflandırabilme", en: "Classifying the branches of physics", de: "Die Teilgebiete der Physik klassifizieren" },
      "FİZ.9.1.3": { beceri: ["KB2.15"], tr: "Fizik bilimine katkıda bulunmuş bilim insanlarının deneyimlerini yansıtabilme", en: "Reflecting on the experiences of scientists who contributed to physics", de: "Die Erfahrungen von Wissenschaftlern, die zur Physik beigetragen haben, reflektieren" },
      "FİZ.9.2.1": { beceri: ["FBAB2"], tr: "SI birim sisteminde birimleri verilen temel ve türetilmiş nicelikleri sınıflandırabilme", en: "Classifying base and derived quantities whose SI units are given", de: "Basis- und abgeleitete Größen mit gegebenen SI-Einheiten klassifizieren" },
      "FİZ.9.2.2": { beceri: ["KB2.7"], tr: "Skaler ve vektörel nicelikleri karşılaştırabilme", en: "Comparing scalar and vector quantities", de: "Skalare und vektorielle Größen vergleichen" },
      "FİZ.9.2.3": { beceri: ["FBAB8"], tr: "Aynı doğrultu üzerinde yer alan farklı vektörlerin yön ve büyüklüklerine yönelik bilimsel çıkarım yapabilme", en: "Drawing scientific inferences about the directions and magnitudes of vectors along the same line", de: "Wissenschaftliche Schlüsse über Richtung und Betrag von Vektoren auf derselben Geraden ziehen" },
      "FİZ.9.2.4": { beceri: ["FBAB10"], tr: "Vektörlerin toplanmasında kullanılan uç uca ekleme ve paralelkenar yöntemi ile bileşenlerine ayırma işlemine ilişkin tümevarımsal akıl yürütebilme", en: "Reasoning inductively about adding vectors tip to tail, the parallelogram method and resolving vectors into components", de: "Induktives Schlussfolgern zur Vektoraddition (Aneinanderhängen, Parallelogramm) und zur Zerlegung in Komponenten" },
      "FİZ.9.2.5": { beceri: ["KB2.7"], tr: "Doğadaki temel kuvvetleri karşılaştırabilme", en: "Comparing the fundamental forces of nature", de: "Die Grundkräfte der Natur vergleichen" },
      "FİZ.9.2.6": { beceri: ["FBAB10"], tr: "Hareketin temel kavramlarının tanımlarına yönelik tümevarımsal akıl yürütebilme", en: "Reasoning inductively about the definitions of the basic concepts of motion", de: "Induktives Schlussfolgern zu den Grundbegriffen der Bewegung" },
      "FİZ.10.1.1": { beceri: ["FBAB10"], tr: "Yatay doğrultuda sabit hızlı hareket ile ilgili tümevarımsal akıl yürütebilme", en: "Reasoning inductively about motion with constant velocity along a horizontal line", de: "Induktives Schlussfolgern zur gleichförmigen Bewegung in horizontaler Richtung" },
      "FİZ.10.1.2": { beceri: ["FBAB10"], tr: "İvme ve hız değişimi arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme", en: "Reasoning inductively about the relation between acceleration and change of velocity", de: "Induktives Schlussfolgern zum Zusammenhang zwischen Beschleunigung und Geschwindigkeitsänderung" },
      "FİZ.10.1.3": { beceri: ["KB2.14"], tr: "Yatay doğrultuda sabit ivmeyle hareket eden cisimlerin hareket grafiklerinden elde edilen matematiksel modelleri yorumlayabilme", en: "Interpreting mathematical models obtained from motion graphs of bodies moving with constant acceleration along a horizontal line", de: "Mathematische Modelle aus Bewegungsdiagrammen gleichmäßig beschleunigter Körper interpretieren" },
      "FİZ.10.4.1": { beceri: ["FBAB5"], tr: "Dalgaların temel kavramlarına ilişkin operasyonel tanımlama yapabilme", en: "Giving operational definitions of the basic concepts of waves", de: "Grundbegriffe der Wellen operational definieren" },
      "FİZ.10.4.2": { beceri: ["FBAB2"], tr: "Dalgaları özelliklerine göre sınıflandırabilme", en: "Classifying waves by their properties", de: "Wellen nach ihren Eigenschaften klassifizieren" },
      "FİZ.10.4.3": { beceri: ["FBAB3"], tr: "Dalgaların yayılma süratini etkileyen etmenlere ilişkin bilimsel gözleme dayalı tahmin yapabilme", en: "Making predictions based on scientific observation about the factors affecting wave speed", de: "Auf Beobachtung gestützte Vorhersagen zu den Einflussgrößen der Wellengeschwindigkeit treffen" },
      "FİZ.10.4.4": { beceri: ["KB2.15"], tr: "Periyodik hareketlere ilişkin deneyimlerini yansıtabilme", en: "Reflecting on experiences with periodic motion", de: "Erfahrungen mit periodischen Bewegungen reflektieren" },
      "FİZ.11.1.1": { beceri: ["FBAB10"], tr: "Serbest düşme hareketi yapan cisimlerin ivmesine yönelik tümevarımsal akıl yürütebilme", en: "Reasoning inductively about the acceleration of freely falling bodies", de: "Induktives Schlussfolgern zur Beschleunigung frei fallender Körper" },
      "FİZ.11.1.2": { beceri: ["FBAB12"], tr: "Serbest düşme hareketi ile ilgili kanıt kullanabilme", en: "Using evidence about free fall", de: "Belege zum freien Fall verwenden" },
      "FİZ.11.1.3": { beceri: ["FBAB10"], tr: "İki boyutta sabit ivmeli hareket ile ilgili tümevarımsal akıl yürütebilme", en: "Reasoning inductively about motion with constant acceleration in two dimensions", de: "Induktives Schlussfolgern zur gleichmäßig beschleunigten Bewegung in zwei Dimensionen" },
      "FİZ.11.1.4": { beceri: ["FBAB10"], tr: "Newton'ın Hareket Yasaları ile ilgili tümevarımsal akıl yürütebilme", en: "Reasoning inductively about Newton's laws of motion", de: "Induktives Schlussfolgern zu den newtonschen Bewegungsgesetzen" },
      "FİZ.11.1.5": { beceri: ["KB2.14"], tr: "Newton'ın Hareket Yasalarını serbest cisim diyagramını kullanarak yorumlayabilme", en: "Interpreting Newton's laws of motion using free-body diagrams", de: "Die newtonschen Gesetze mithilfe von Kräfteplänen (Freikörperbildern) interpretieren" },
    },
    skills: {
      FBAB2: { tr: "Sınıflandırma", en: "Classifying", de: "Klassifizieren" },
      FBAB3: { tr: "Bilimsel Gözleme Dayalı Tahmin", en: "Prediction based on scientific observation", de: "Beobachtungsgestützte Vorhersage" },
      FBAB5: { tr: "Operasyonel Tanımlama", en: "Operational definition", de: "Operationales Definieren" },
      FBAB8: { tr: "Bilimsel Çıkarım Yapma", en: "Scientific inference", de: "Wissenschaftliches Schlussfolgern" },
      FBAB10: { tr: "Tümevarımsal Akıl Yürütme", en: "Inductive reasoning", de: "Induktives Schlussfolgern" },
      FBAB12: { tr: "Kanıt Kullanma", en: "Using evidence", de: "Belege verwenden" },
      "KB2.7": { tr: "Karşılaştırma", en: "Comparing", de: "Vergleichen" },
      "KB2.8": { tr: "Sorgulama", en: "Questioning", de: "Hinterfragen" },
      "KB2.14": { tr: "Yorumlama", en: "Interpreting", de: "Interpretieren" },
      "KB2.15": { tr: "Yansıtma", en: "Reflecting", de: "Reflektieren" },
    },
  };
})();
