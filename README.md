# Soru Üreteci (High School Question Creator)

Lise öğrencileri için **kişiye özel soru** üreten, tarayıcıda çalışan bir araç.

- Her soru bir **şablondur**: kalıp aynı kalır, sayılar her öğrenci için değişir.
- Aynı öğrenci + aynı sınav kodu → her zaman **aynı sorular** (tekrar açınca değişmez).
- Farklı öğrenci → aynı soru kalıpları, **farklı sayılar** (kopya çekmek zorlaşır).
- **3 dil:** Türkçe, İngilizce, Almanca. Dil değişince sayılar aynı kalır, sadece metin değişir.
- Çoktan seçmeli (A–E) veya açık uçlu sorular. Doğru cevap kodla hesaplanır.
- **Öğretmen sayfası:** sınıf listesi için cevap anahtarı, yazdırılabilir kişiye özel sınav kâğıtları ve şablon önizleme.
- Kurulum gerekmez: düz HTML + JavaScript, sunucu ya da veritabanı yok.

## Sayfalar

| Sayfa | Ne işe yarar |
|---|---|
| `index.html` | Ana sayfa: sitenin tanıtımı, aynı sorunun üç öğrenciye nasıl farklı sayılarla çıktığını gösteren canlı örnek, konu listesi. |
| `sorular.html` | Soru sayfası: öğrenci adını ve sınav kodunu yazar, konu seçer, kendi sorularını çözer, "Kontrol et" ile sonucunu görür. |
| `sss.html` | Sık sorulan sorular (içerik `faq.js` dosyasında, 3 dilde). |
| `ogretmen.html` | Öğretmen sayfası: cevap anahtarı, öğrenci linki, yazdırılabilir kâğıtlar ve şablon önizleme. |

Öğretmen sayfasının verdiği link (`sorular.html?kod=...&n=...&konu=...&dil=...`) öğrencilere gönderilir. Linke `&ad=Ali` eklenirse sınav doğrudan açılır.

Şu an sitede **yalnızca fizik** açık. Diğer dersleri açmak için `config.js` içindeki `activeSubjects` listesine ders adını ekleyin (ör. `["fizik", "matematik"]`). Matematik, kimya ve geometri örnekleri `questions/ornekler.js` içinde hazır bekliyor.

> **Not:** Her şey tarayıcıda çalıştığı için teknik bilgisi olan bir öğrenci cevapları hesaplayabilir. Not verilen sınavlar için öğretmen sayfasından **kâğıt çıktı** alın; çevrim içi sayfa alıştırma için idealdir.

## İnternette yayınlama (GitHub Pages, ücretsiz)

1. GitHub'da depo sayfasında **Settings → Pages** bölümüne gidin.
2. **Source:** "Deploy from a branch", **Branch:** `main` ve `/ (root)` seçip **Save**'e basın.
3. Birkaç dakika sonra site şu adreste açılır:
   `https://cagriceylan193.github.io/High_school_question_creator/`

Bilgisayarda denemek için `index.html` dosyasını tarayıcıda açmanız yeterli.

## Yeni soru ekleme

Sorular `questions/` klasöründeki `.js` dosyalarındadır. Fizik soruları `questions/fizik.js` içindedir. Yeni bir konu eklerseniz adını `i18n.js` içindeki `topics` listesine 3 dilde yazın. Her soru bir `QB.add({...})` bloğudur:

```js
QB.add({
  id: "fiz-yol-01",            // benzersiz ad (her soruda farklı olmalı)
  subject: "fizik",            // matematik, geometri, fizik, kimya, biyoloji
  topic: "hareket",            // konu (i18n.js içindeki "topics" listesinden)
  grade: 9,                    // sınıf (isteğe bağlı)
  type: "mc",                  // "mc" = çoktan seçmeli, "open" = açık uçlu
  vars: {
    ad: { type: "name" },                    // dile uygun rastgele bir isim
    v:  { min: 40, max: 120, step: 20 },     // 40, 60, 80, 100, 120
    t:  { min: 1, max: 5, step: 0.5 },       // 1; 1,5; 2; ... 5
  },
  where: "v * t <= 500",       // sayılar bu koşulu sağlamalı (isteğe bağlı)
  answer: "v * t",             // doğru cevabın formülü
  decimals: 0,                 // cevaptaki ondalık basamak (isteğe bağlı)
  unit: "km",                  // birim (veya { tr: "...", en: "...", de: "..." })
  distractors: ["v + t", "v * t / 2", "v * (t + 1)"],   // yanlış şıklar (isteğe bağlı)
  text: {
    tr: "{ad}, {v} km/sa hızla {t} saat yol alıyor. Kaç km yol alır?",
    en: "{ad} drives at {v} km/h for {t} hours. How far does {ad} go?",
    de: "{ad} fährt {t} Stunden mit {v} km/h. Wie weit fährt {ad}?",
  },
});
```

### Değişken türleri (`vars`)

| Yazım | Anlamı |
|---|---|
| `{ min: 2, max: 9 }` | 2 ile 9 arasında tam sayı |
| `{ min: 0.5, max: 3, step: 0.5 }` | 0,5'er adımla sayı |
| `{ values: [30, 45, 60] }` | listeden biri |
| `{ type: "name" }` | o dile uygun bir kişi adı |
| `"a * b"` | önceki değişkenlerden hesaplanan değer |
| `{ min: "a + 1", max: 20 }` | sınırlar da formül olabilir |

Birbirine bağlı değerler için `pick(s, ...)` kullanılır. Örneğin `s` 1–4 arasında seçilir, `a: "pick(s, 3, 5, 8)"` ve `b: "pick(s, 4, 12, 15)"` aynı sıradaki değerleri alır (3-4, 5-12, 8-15 üçgenleri).

### Metin içinde

- `{v}` → değişkenin değeri. TR/DE'de ondalık ayırıcı virgül, EN'de noktadır.
- `{v:2}` → 2 ondalıkla.
- `{=a*b}` → metin içinde hesaplama.
- `<i>x</i>`, `H<sub>2</sub>O`, `m/s<sup>2</sup>` gibi basit HTML kullanılabilir.

### Formüllerde kullanılabilenler

`+ - * / % ^`, parantez, `sqrt abs round floor ceil min max pow log ln exp gcd lcm fact comb perm pick`, `pi`, `e`.
`sin cos tan asin acos atan` **derece** ile çalışır.
Koşullarda `< <= > >= == !=` ile `and`, `or`, `not` kullanılabilir.

### Çeldiriciler (yanlış şıklar)

`distractors` listesine öğrencilerin sık yaptığı hataların formüllerini yazın (işaret hatası, birim çevirmeyi unutma, yanlış formül). Liste yetmezse sistem doğru cevaba yakın, inandırıcı değerlerle şıkları tamamlar. Aynı değere sahip şıklar otomatik ayıklanır.

### Yeni soru dosyası eklerken

`questions/` içine yeni bir dosya (ör. `questions/fizik-11.js`) eklediğinizde, onu `index.html`, `sorular.html` ve `ogretmen.html` içindeki soru dosyaları listesine ekleyin:

```html
<script src="questions/fizik-9.js"></script>
```

## Kontrol aracı

Tüm şablonları her dilde 300'er kez üretip hata arar. Eksik çeviri, çözülmemiş `{değişken}`, sağlanamayan koşul ve listeye eklenmemiş soru dosyası gibi sorunları yakalar:

```bash
node tools/check.js
```

Her `push` işleminde GitHub Actions bu kontrolü otomatik çalıştırır.

## Ayarlar

`config.js`: varsayılan dil, sınav kodu, soru sayısı, şık sayısı, varsayılan soru türü ve kontrol sonrası doğru cevabın gösterilip gösterilmeyeceği.
`i18n.js`: arayüz metinleri. Yeni dil eklemek için buraya, `config.js`'teki `languages` listesine ve `engine.js`'teki `NAMES` / `LOCALES` listelerine ekleme yapın.

## Dosyalar

```
index.html         Ana sayfa (home.js)
sorular.html       Soru sayfası (app.js)
sss.html           Sık sorulan sorular (faq.js)
ogretmen.html      Öğretmen sayfası (teacher.js)
engine.js          Soru motoru (rastgelelik, formül çözümleyici, biçimlendirme)
ui.js              Ortak menü, dil seçimi ve alt bilgi
config.js, i18n.js Ayarlar ve çeviriler
style.css          Görünüm
questions/         Soru şablonları
tools/check.js     Şablon denetleyici
```
