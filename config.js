// Genel ayarlar. İhtiyaca göre değiştirebilirsiniz.
globalThis.QB_CONFIG = {
  // Desteklenen diller. Her şablonun her dilde metni olmalı.
  languages: ["tr", "en", "de"],
  // Sitede kullanılan dersler. Boş liste [] = tüm dersler.
  // Diğer dersleri açmak için ekleyin: ["fizik", "matematik", "kimya"]
  activeSubjects: ["fizik"],
  // Sayfa ilk açıldığında seçili dil.
  defaultLanguage: "tr",
  // Öğrenci sayfasında önceden yazılı gelen sınav kodu.
  defaultExamCode: "DENEME-1",
  // Varsayılan soru sayısı.
  defaultCount: 10,
  // Şablonda 'type' yazılmazsa: "mc" = çoktan seçmeli, "open" = açık uçlu.
  defaultType: "mc",
  // Çoktan seçmeli sorularda şık sayısı (A–E için 5).
  choiceCount: 5,
  // Öğrenci "Kontrol et" dediğinde yanlış sorularda doğru cevap gösterilsin mi?
  showCorrectAfterCheck: true,

  // E-posta ile giriş ve bulutta sınav geçmişi (Firebase).
  // Bu bilgiler gizli değildir; verileri Firestore kuralları korur (firebase/firestore.rules).
  // Analytics bilerek eklenmemiştir: site öğrencileri izlemez.
  firebase: {
    apiKey: "AIzaSyBPlAm-zlrecOO-N_nK_yWJ8E84K9k97u0",
    authDomain: "soru-ureteci.firebaseapp.com",
    projectId: "soru-ureteci",
    storageBucket: "soru-ureteci.firebasestorage.app",
    messagingSenderId: "103963102137",
    appId: "1:103963102137:web:a0e92c7f04a4c9edbb4468",
  },

  // Yapay zekâ asistanı: worker/ klasöründeki ara sunucunun adresi
  // (ör. "https://soru-ureteci-asistan.ADINIZ.workers.dev"). Boşsa asistan görünmez.
  assistant: {
    endpoint: "",
    maxQuestionsPerItem: 8, // bir soru için öğrencinin sorabileceği en fazla mesaj
  },

  // Aydınlatma metninde (gizlilik.html) görünen veri sorumlusu ve iletişim.
  // Okulda kullanmadan önce kendi adınızı/okulunuzu ve bir iletişim adresi yazın.
  privacyOwner: "",
  privacyContact: "",
};
