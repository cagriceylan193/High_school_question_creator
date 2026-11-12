// Genel ayarlar. İhtiyaca göre değiştirebilirsiniz.
globalThis.QB_CONFIG = {
  // Desteklenen diller. Her şablonun her dilde metni olmalı.
  languages: ["tr", "en", "de"],
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
};
