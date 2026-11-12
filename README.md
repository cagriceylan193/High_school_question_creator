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
| `ogretmen.html` | Öğretmen sayfası: cevap anahtarı, öğrenci linki, yazdırılabilir ve PDF kâğıtlar, şablon önizleme. |
| `hesap.html` | Hesabım: öğrenci hesabı, çözülen sınavların geçmişi, konulara göre başarı, PDF ve yedek. |

Öğretmen sayfasının verdiği link (`sorular.html?kod=...&n=...&konu=...&dil=...`) öğrencilere gönderilir. Linke `&ad=Ali` eklenirse sınav doğrudan açılır.

Şu an sitede **yalnızca fizik** açık. Diğer dersleri açmak için `config.js` içindeki `activeSubjects` listesine ders adını ekleyin (ör. `["fizik", "matematik"]`). Matematik, kimya ve geometri örnekleri `questions/ornekler.js` içinde hazır bekliyor.

> **Not:** Her şey tarayıcıda çalıştığı için teknik bilgisi olan bir öğrenci cevapları hesaplayabilir. Not verilen sınavlar için öğretmen sayfasından **kâğıt çıktı** alın; çevrim içi sayfa alıştırma için idealdir.

## Hesap (üyelik) ve geçmiş

`hesap.html` sayfasında iki tür hesap vardır:

| | E-posta ile hesap | E-postasız hesap |
|---|---|---|
| Giriş | E-posta + şifre, **her cihazdan** | Yalnızca o cihazdaki tarayıcı |
| Sınav geçmişi | Google Firebase'de (Firestore) | Tarayıcıda (localStorage) |
| Şifre unutulursa | Sıfırlama e-postası | İsteğe bağlı 4 haneli PIN |
| Cihaz değiştirme | Otomatik | “Yedek indir / Yedek yükle” |

Giriş yapan öğrencinin “Cevapları kontrol et”e bastığı her sınav kaydedilir. Hesap sayfasında çözülen sınav, cevaplanan soru ve başarı oranı, konulara göre başarı çubukları ve sınav listesi görünür; her sınav şekilleriyle **yeniden incelenebilir**, **PDF olarak indirilebilir** veya silinebilir. E-postasız hesaptaki sınavlar sonradan e-posta hesabına aktarılabilir. Hesap silindiğinde tüm veriler kalıcı olarak silinir.

Bir sınav kaydı soruların kendisini değil, onları yeniden üretmek için gerekenleri tutar (tohum, şablon kimlikleri, cevaplar); kayıtlar çok küçüktür. Not: Bir şablonun değişkenleri sonradan değiştirilirse eski kayıtlarda o sorunun sayıları da değişir.

### Firebase kurulumu (e-posta ile hesap için)

Proje bilgileri `config.js` içindeki `firebase` alanındadır (bunlar gizli değildir; verileri Firestore kuralları korur). Firebase konsolunda yapılması gerekenler:

1. **Authentication → Başlayın → Oturum açma yöntemi → E-posta/Şifre**: açın.
2. **Authentication → Ayarlar → Yetkili alan adları**: `cagriceylan193.github.io` ekleyin.
3. **Firestore Database → Veritabanı oluştur**: konum `europe-west3 (Frankfurt)`, üretim modu.
4. **Firestore Database → Kurallar**: `firebase/firestore.rules` dosyasının içeriğini yapıştırıp **Yayınla**.
5. `config.js` içindeki `privacyOwner` ve `privacyContact` alanlarına veri sorumlusunun adını ve iletişim adresini yazın (aydınlatma metninde görünür).

Kurallar her öğrencinin yalnızca kendi verisini okuyup yazmasına izin verir ve kayıtların biçimini/boyutunu denetler. Site Google Analytics kullanmaz.

**KVKK:** E-posta ile hesap açan öğrencinin verileri Google Firebase'de saklanır ve giriş bilgileri yurt dışında işlenebilir. Kayıt sırasında aydınlatma metni (`gizlilik.html`) onayı istenir. Okulda kullanmadan önce metni okul yönetimiyle gözden geçirin; 18 yaş altı öğrenciler için veli bilgilendirmesi önerilir. E-posta vermek istemeyenler e-postasız hesabı kullanabilir.

### Yerel test (Firebase emülatörleri)

```bash
npm install -g firebase-tools
firebase emulators:start --only auth,firestore --project soru-ureteci
python3 -m http.server 8000
# tarayıcıda: http://127.0.0.1:8000/hesap.html?emulator
```

`?emulator` parametresi yalnızca `localhost` / `127.0.0.1` adreslerinde çalışır ve gerçek projeye dokunmadan emülatörleri kullanır.

## Yapay zekâ asistanı

Soru sayfasında her sorunun altında **Yardım iste** paneli vardır. Öğrenci hazır sorulardan birini seçer (“Soruyu anlamadım”, “İpucu ver”, “Kavramı açıkla”) ya da kendi sorusunu yazar; asistan sorunun metnini ve şeklini (resim olarak) görerek akış hâlinde cevap verir.

- **Test sırasında ipucu modu:** cevabı ve doğru şıkkı söylemez; doğru cevap sunucuya hiç gönderilmez.
- **Kontrolden sonra açıklama modu:** çözümü adım adım anlatır, öğrencinin hatasını gösterir.
- Yalnızca **e-posta ile giriş yapmış** öğrenciler kullanabilir (Firebase kimliği sunucuda doğrulanır). Soru başına mesaj sınırı vardır (`config.js → assistant.maxQuestionsPerItem`).
- Model: Claude Opus 5.5 (`worker/wrangler.toml → MODEL`). Güvenlik sınıflandırıcısı bir isteği reddederse sunucu tarafında yedek modele geçiş (`fallbacks: "default"`) açıktır.

**Mimari:** API anahtarı tarayıcıya konamaz. `worker/` klasöründeki küçük Cloudflare Worker ara sunucu olarak çalışır: anahtarı gizli değer olarak saklar, Firebase kimlik belgesini doğrular, izin verilen siteyi (`ALLOWED_ORIGINS`) kontrol eder, istek boyutlarını sınırlar ve cevabı akış hâlinde iletir.

### Kurulum

1. **Anthropic API anahtarı:** https://console.anthropic.com → hesap açın → **Billing**'den kredi yükleyin → **API Keys → Create Key**. **Limits** bölümünden aylık harcama sınırı koymanız önerilir.
2. **Cloudflare (ücretsiz):** https://dash.cloudflare.com → hesap açın → **Workers & Pages** sayfasını bir kez açıp workers.dev alt alan adınızı seçin. **My Profile → API Tokens → Create Token → “Edit Cloudflare Workers”** şablonuyla bir anahtar oluşturun. **Account ID**'yi Workers & Pages sayfasının sağ tarafından kopyalayın.
3. **GitHub gizli değerleri:** depo → **Settings → Secrets and variables → Actions → New repository secret**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `ANTHROPIC_API_KEY`.
4. **Yayınla:** depo → **Actions → “Asistanı yayınla (Cloudflare Worker)” → Run workflow**. Bitince Worker adresi (ör. `https://soru-ureteci-asistan.ADINIZ.workers.dev`) Cloudflare'de Workers & Pages altında görünür.
5. Bu adresi `config.js → assistant.endpoint` alanına yazın. Boşken asistan sitede görünmez.

İsteğe bağlı **günlük sınır:** Cloudflare'de bir KV alanı oluşturun ve `worker/wrangler.toml` içindeki `USAGE` bağlamasının yorumunu kaldırıp kimliğini yazın; öğrenci başına günlük sınır `DAILY_LIMIT` ile ayarlanır.

**Maliyet:** Her cevap Claude API'den ücretlendirilir. Opus 5.5 ile bir öğrenci mesajı yaklaşık 1–2 ABD senti tutar (sistem talimatı, soru metni ve şekil girdisi ile kısa bir cevap; aynı sohbetteki sonraki mesajlar önceki mesajları da gönderdiği için biraz daha pahalıdır). Maliyeti düşürmek için `MODEL = "claude-haiku-5-5"` yazılabilir (yaklaşık 40 kat daha ucuz; açıklamalar daha basit olabilir).

**Yerel test:** `cd worker && npm install && npx wrangler dev` (anahtarı `worker/.dev.vars` dosyasına `ANTHROPIC_API_KEY=...` olarak yazın; bu dosya depoya eklenmez).

## Sanal laboratuvar

`laboratuvar.html` (menüde **Laboratuvar**) Fizik I (Mekanik) laboratuvar deneylerinin simülasyonlarını içerir. Deney konuları standart üniversite laboratuvar föylerine göre seçildi; metinler, çizimler ve sayılar özgündür, hiçbir föyden kopyalanmadı.

| Deney | Düzenek | Bulunan |
|---|---|---|
| Hazırlık · Ölçü aletleri | Verniyeli kumpas (1/20 mm), mikrometre (0,01 mm, sıfır hatası), terazi | Hacim ve yoğunluk ± hata |
| 1 · Basit harmonik hareket | Üç yay, kütle takımı, cetvel, kronometre, kâğıt işaretçi | k (F–Δx ve T²–m), yayın etkin kütlesi, enerji oranı |
| 2-A · Kuvvet masası | Makaralar, ip, halka, makara sürtünmesi | ΣF, sinüs (Lami) teoremi, kuvvet çokgeni |
| 2-B · Young modülü | Bıçak destekler, aynalı cetvel, mikrometre | E (F–D eğimi) |
| 3 · Serbest düşme | Elektromıknatıs (bırakma gecikmesi), ışık kapısı, sayaç | g (h–t²), gecikme t₀ |
| 4 · Eğik atış | Yaylı fırlatıcı, karbon kâğıtlı ekran, namlu fotoseli | α, υ₀, menzil, tepe yüksekliği (parabol uydurma) |
| 5 · Basit ve tersinir sarkaç | İp boyu, kumpas, kronometre ya da fotosel; delikli çubuk | g (l–τ²), g (τ–h eğrisi, yatay çizgi) |
| 6 · Newton'un II. yasası | Hava rayı, ayar vidası, iki ışık kapısı (GATE/PULSE) | a–F ve a–1/m grafikleri |
| 7-A · Dairesel hareket | Hava yastıklı disk, flama, E/F fotoselleri | ω, α, eylemsizlik momenti |
| 7-B · Açısal momentum | İki disk, mıknatıslı/yapışkan parçalar | L′/L, E′/E |
| 8 · Merkezcil kuvvet | Motorlu kol, kuvvet algılayıcı (sıfırlama), veri kaydedici | F–ω², eğim = m·r |
| 9 · Çarpışmalar | Hava masası, kıvılcım zamanlayıcısı, cetvel ve iletki | Momentum vektörleri, K′/K (6 çarpışma türü) |
| 10-A · Cavendish | Burulma terazisi, ışık izi, zaman hızlandırma | G (son sapma ve ivmelenme yöntemleri) |
| 10-B · Burulma modülü | Tel, çubuk, diskler, düzensiz cisim, mikrometre | D₀, Φ, eylemsizlik momenti |

**Gerçekçilik:** Her deneyde fizik sayısal olarak çözülür (hava direnci, sürtünme, sönüm, makara eylemsizliği, mıknatıs gecikmesi gibi etkilerle). Analog ölçekleri öğrenci büyüteçle kendisi okur; dijital aletlerin çözünürlüğü ve gürültüsü vardır; kronometreyi öğrencinin kendisi başlatıp durdurur. Aletlerin değerleri her "düzenek" için rastgele biraz değişir (**Yeni düzenek** düğmesi).

**Analiz:** Tablolar seçili satıra kayıt alır, türetilmiş sütunları hesaplar; grafikler en küçük kareler ile doğru, orijinden geçen doğru ya da parabol uydurur; sonuçlar föylerdeki kurala göre yuvarlanır (hata tek anlamlı basamak, ilk basamak 1 ise iki). Ölçümler tarayıcıda saklanır, rapor PDF olarak indirilir.

**Dosyalar:** `lab/core.js` (sahne, büyüteç, kronometre, tablo, grafik, sonuç, PDF), `lab/draw.js` (düzenek çizimleri), `lab/gauge.js` (kumpas ve mikrometre), `lab/exp-*.js` (her deney: metinler üç dilde, fizik modeli, `selfTest`), `lab.js` (sayfa), `lab/lab.css`.

**Yeni deney eklemek:** `lab/exp-ornek.js` dosyası `QBL.register({ id, order, text: {tr, en, de}, parts: [...], mount(api), selfTest() })` çağırır; `laboratuvar.html`'ye `<script>` satırı eklenir. `node tools/check.js` metinlerin üç dilde tam olduğunu, kullanılan metin anahtarlarını ve her deneyin `selfTest` fizik doğrulamalarını denetler.

## PDF indirme

- **Soru sayfası:** “PDF indir” sınavı şekilleriyle gerçek bir PDF dosyası olarak indirir. Kontrol etmeden önce boş sınav kâğıdı (istenirse sonda cevap anahtarı), kontrolden sonra öğrencinin cevapları ve doğru cevaplar işaretli olarak.
- **Hesabım:** geçmişteki her sınav için “PDF indir”.
- **Öğretmen sayfası:** “Kâğıtları PDF indir” tüm sınıfın kâğıtlarını tek dosyada, istenirse sonda cevap anahtarıyla verir.

PDF'ler [pdfmake](https://github.com/bpampuch/pdfmake) 0.2.7 ile tarayıcıda oluşturulur (MIT lisansı, Roboto fontu Apache 2.0). Kütüphane `vendor/pdfmake/` klasöründedir ve yalnızca ilk “PDF indir” tıklamasında yüklenir; internet bağlantısı veya CDN gerekmez. Şekiller PDF'te vektördür, metin seçilebilir.

## İnternette yayınlama (GitHub Pages, ücretsiz)

1. GitHub'da depo sayfasında **Settings → Pages** bölümüne gidin.
2. **Source:** "Deploy from a branch", **Branch:** `main` ve `/ (root)` seçip **Save**'e basın.
3. Birkaç dakika sonra site şu adreste açılır:
   `https://cagriceylan193.github.io/High_school_question_creator/`

Bilgisayarda denemek için `index.html` dosyasını tarayıcıda açmanız yeterli.

## Yeni soru ekleme

Sorular `questions/` klasöründeki `.js` dosyalarındadır. Fizik soruları: `fizik.js` (temel), `fizik-madde.js` (madde, basınç, kaldırma kuvveti, ısı), `fizik-hareket.js` (hareket, kuvvet, enerji), `fizik-elektrik-optik.js` (elektrostatik, elektrik, optik, dalgalar), `fizik-maarif.js` (açık uçlu, bağlamlı sorular). Tüm sorular ve şekiller bu proje için özgün olarak yazılmıştır; yayınevi kitaplarından soru, metin veya şekil kopyalanmamalıdır. Yeni bir konu eklerseniz adını `i18n.js` içindeki `topics` listesine 3 dilde yazın. Her soru bir `QB.add({...})` bloğudur:

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

### Zorluk seviyesi

`level: 1` (kolay), `level: 2` (orta) veya `level: 3` (zor). Yazılmazsa 1 sayılır. Öğrenci ve öğretmen sayfasında zorluğa göre seçim yapılabilir; sınavda sorular kolaydan zora sıralanır.

### Soru tipleri

**1) Sayısal çoktan seçmeli** (varsayılan): `answer` + `distractors`, yukarıdaki örnek gibi. `type: "open"` yazılırsa öğrenci cevabı kendisi yazar.

**2) “I, II, III yargılarından hangileri doğrudur?”** — `statements` listesi. Her yargının doğru olup olmadığı `truth` formülüyle hesaplanır; şıklar (Yalnız I, I ve II, ...) otomatik oluşur. Bir yargıda bazen doğru bazen yanlış bir sayı göstermek için `if()` kullanılır:

```js
vars: { ..., s2: { values: [0, 1] } },
statements: [
  { text: { tr: "K cismi sıvıda yüzer.", en: "...", de: "..." }, truth: "dK < dS" },
  { text: { tr: "İvme {=if(s2, a, a + 1)} m/s²'dir.", en: "...", de: "..." }, truth: "s2" },
  { text: { tr: "...", en: "...", de: "..." }, truth: "R1 > R2" },
],
```

**3) Sıralama** — `items` içindeki değerler büyükten küçüğe sıralanır, eşitler “=” ile gösterilir. `symbol: "P"` yazılırsa şıklar P<sub>K</sub> > P<sub>L</sub> = P<sub>M</sub> biçiminde görünür.

```js
items: { K: "hK * dK", L: "hL * dL", M: "hM * dM" },
symbol: "P",
```

**4) Artar / Azalır / Değişmez** — `changes` listesinde her büyüklüğün önceki (`before`) ve sonraki (`after`) değeri formülle hesaplanır:

```js
changes: [
  { label: { tr: "Kaldırma kuvveti", en: "Buoyant force", de: "Auftriebskraft" }, before: "min(dC, d1)", after: "min(dC, d2)" },
  { label: { tr: "Batan hacim", ... }, before: "...", after: "..." },
],
```

**5) Açık uçlu, bağlamlı sorular (Maarif Modeli yaklaşımı)** — `parts` listesi. Gerçek yaşamdan bir bağlam (`text`, isteğe bağlı `figure` / tablo) ve a), b), c) bölümleri. Her bölüm `kind` alır:

| `kind` | Öğrenci ne yapar | Puanlama |
|---|---|---|
| `number` | Sayı yazar (`answer`, `unit`, `decimals`) | Otomatik |
| `select` | Seçer: `options` + `answer` (1'den başlayan sıra) ya da `change: { before, after }` → Artar / Azalır / Değişmez | Otomatik |
| `text` | Açıklama yazar; `model` örnek cevap, `rubric` ölçütler | Rubrikle (öğrenci öz değerlendirme yapar; öğretmen PDF'teki anahtarla okur) |

```js
QB.add({
  id: "maarif-ornek",
  subject: "fizik", topic: "kuvvet", grade: 9, level: 3,
  skills: ["hesap", "gerekce"],                 // i18n.js → skills
  vars: { m: { values: [40, 50] }, a: { values: [1, 2] }, N: "m * (10 + a)" },
  text: { tr: "...bağlam...", en: "...", de: "..." },
  parts: [
    { kind: "number", points: 2, text: { tr: "Baskül kaç N gösterir?", en: "...", de: "..." }, answer: "N", unit: "N" },
    { kind: "select", text: { tr: "Sabit hızda değer nasıl değişir?", en: "...", de: "..." }, change: { before: "N", after: "m * 10" } },
    { kind: "text", text: { tr: "Nedenini açıkla.", en: "...", de: "..." },
      model: { tr: "Örnek cevap ... N = {N} N", en: "...", de: "..." },
      rubric: [
        { points: 1, text: { tr: "Tepki kuvvetini belirtir.", en: "...", de: "..." } },
        { points: 1, text: { tr: "Newton'un 2. yasasıyla ilişkilendirir.", en: "...", de: "..." } },
      ] },
  ],
});
```

Metinde `{if:koşul|doğruysa|yanlışsa}` sayıya göre farklı ifade yazdırır (ör. `{if:d > 0|yukarı|aşağı}`). Türkçe metinlerde değişken isimden sonra ek kullanmayın (`{ad}'nın` her isme uymaz); “öğrenci”, “bisikletli” gibi bir sözcük kullanın.

Örnekler: `questions/fizik-maarif.js`. Beceri etiketleri (`skills`) genel adlardır; isterseniz Maarif programındaki alan becerisi kodlarına göre düzenleyebilirsiniz.

### Şekilli sorular

Şablona `figure: (v, f) => { ... }` fonksiyonu eklenir. `v` değişkenlerin değerleri, `f` ise çizim araçlarıdır (`figures.js`). Şekil soru sayılarıyla birlikte çizildiği için her öğrencinin şekli de kendine özeldir; açık/koyu temaya ve çıktıya uyum sağlar.

```js
figure: (v, f) => {
  const s = f.svg(320, 175);                       // genişlik, yükseklik
  s.add(
    f.resistor(40, 40, 160, 40, "R_1 = " + f.$("R1") + " Ω"),
    f.resistor(160, 40, 280, 40, "R_2 = " + f.$("R2") + " Ω"),
    f.line(40, 40, 40, 140), f.line(280, 40, 280, 140),
    f.battery(40, 140, 280, 140, f.$("V") + " V"),
  );
  return s;
},
```

Hazır araçlar: `line, dashed, rect, circle, dot, poly, polyline, path, curve, text, arrow, dimH, dimV, ground, grid, vessel, resistor, battery, switchOpen, switchClosed, graph, wave, car, box`. `f.$("x")` değişkeni dile uygun biçimde yazar, `f.t({tr, en, de})` dile göre metin seçer, etiketlerde `R_1` alt simge olur. Örnekler için `questions/fizik-*.js` dosyalarına bakın.

### Formüllerde kullanılabilenler

`+ - * / % ^`, parantez, `sqrt abs round floor ceil min max pow log ln exp gcd lcm fact comb perm pick if`, `pi`, `e`.
`sin cos tan asin acos atan` **derece** ile çalışır.
Koşullarda `< <= > >= == !=` ile `and`, `or`, `not` kullanılabilir.

### Çeldiriciler (yanlış şıklar)

`distractors` listesine öğrencilerin sık yaptığı hataların formüllerini yazın (işaret hatası, birim çevirmeyi unutma, yanlış formül). Liste yetmezse sistem doğru cevaba yakın, inandırıcı değerlerle şıkları tamamlar. Aynı değere sahip şıklar otomatik ayıklanır.

### Yeni soru dosyası eklerken

`questions/` içine yeni bir dosya (ör. `questions/fizik-11.js`) eklediğinizde, onu `index.html`, `sorular.html`, `ogretmen.html` ve `hesap.html` içindeki soru dosyaları listesine ekleyin:

```html
<script src="questions/fizik-11.js"></script>
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
engine.js          Soru motoru (rastgelelik, formül çözümleyici, soru tipleri, biçimlendirme)
figures.js         Şekil çizim araçları (SVG)
hesap.html         Hesabım: giriş/kayıt, istatistikler, geçmiş (hesap.js)
ui.js              Ortak menü, dil seçimi, soru kartı ve alt bilgi
account.js         Hesaplar ve sınav geçmişi (tarayıcı önbelleği)
cloud.js           E-posta ile hesap: Firebase giriş ve Firestore eşitleme
assistant.js       Yapay zekâ asistanı paneli (öğrenci tarafı)
laboratuvar.html   Sanal laboratuvar sayfası (lab.js + lab/)
lab/               Laboratuvar çekirdeği, çizimler, kumpas/mikrometre ve 14 deney
worker/            Asistan ara sunucusu (Cloudflare Worker, Claude API)
gizlilik.html      Gizlilik ve aydınlatma metni (privacy.js)
firebase/          Firestore güvenlik kuralları
vendor/firebase/   Firebase JS SDK (Apache 2.0)
pdf.js             PDF indirme
vendor/pdfmake/    PDF kütüphanesi (MIT)
config.js, i18n.js Ayarlar ve çeviriler
style.css          Görünüm
questions/         Soru şablonları
tools/check.js     Şablon denetleyici
```
