// Gizlilik ve aydınlatma metni (gizlilik.html). {owner}, {contact} → config.js
// Bu metin sitenin gerçekte topladığı verilere göre yazılmıştır; site değişirse güncelleyin.
globalThis.QB_PRIVACY = {
  updated: "2026-11-12",
  tr: {
    title: "Gizlilik ve aydınlatma metni",
    ownerFallback: "Bu siteyi yayınlayan öğretmen",
    contactFallback: "iletişim bilgisi henüz eklenmedi",
    updatedLabel: "Son güncelleme",
    body: `
<h2>Kısaca</h2>
<p>Siteyi hesap açmadan veya <b>e-postasız hesapla</b> kullanırsan hiçbir bilgin bir sunucuya gönderilmez; her şey kendi tarayıcında kalır. Sadece <b>e-posta ile hesap</b> açarsan aşağıdaki veriler Google Firebase'de saklanır. Reklam, analiz veya izleme çerezi kullanılmaz.</p>

<h2>Veri sorumlusu</h2>
<p>{owner}. İletişim: {contact}.</p>

<h2>E-posta ile hesap açarsan hangi veriler işlenir?</h2>
<ul>
  <li>Ad soyad ve (isteğe bağlı) sınıf/şube,</li>
  <li>e-posta adresi,</li>
  <li>şifre (Firebase tarafından tek yönlü şifrelenmiş olarak saklanır; site yöneticisi dahil kimse göremez),</li>
  <li>çözdüğün sınavların kayıtları: tarih, sınav kodu, soru kalıplarının kimlikleri, verdiğin cevaplar ve puanın.</li>
</ul>
<p>Bunların dışında veri toplanmaz.</p>

<h2>Amaç</h2>
<p>Hesabına her cihazdan girebilmen ve çözdüğün sınavları sonradan görebilmen. Veriler başka bir amaçla kullanılmaz, kimseyle paylaşılmaz ve satılmaz.</p>

<h2>Nerede saklanır? (Yurt dışına aktarım)</h2>
<p>Veriler Google LLC'nin Firebase hizmetinde saklanır. Sınav kayıtların Avrupa'daki (Almanya) sunucularda tutulur; giriş bilgilerin (e-posta ve şifre) Google'ın küresel altyapısında, ABD dahil yurt dışında işlenebilir. Bu nedenle kayıt olurken bu aktarıma açık rızan istenir.</p>

<h2>Hukuki sebep</h2>
<p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında açık rızan. Rızanı istediğin zaman hesabını silerek geri alabilirsin.</p>

<h2>Ne kadar süre saklanır?</h2>
<p>Hesabını silene kadar. <b>Hesabım → Hesabı sil</b> ile hesabın ve tüm sınav kayıtların kalıcı olarak silinir. Tek tek sınavları da silebilirsin.</p>

<h2>18 yaşından küçüksen</h2>
<p>E-posta ile hesap açmadan önce velinle konuş. İstersen e-postasız hesabı kullanabilirsin; o durumda hiçbir veri sunucuya gitmez.</p>

<h2>Hakların</h2>
<p>KVKK'nın 11. maddesi uyarınca verilerinin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltilmesini veya silinmesini isteme ve diğer haklarını kullanmak için veri sorumlusuna başvurabilirsin. Verilerinin silinmesi için Hesabım sayfasındaki “Hesabı sil” düğmesini de kullanabilirsin.</p>

<h2>Yapay zekâ asistanı</h2>
<p>Asistanı yalnızca e-posta ile giriş yapan öğrenciler kullanabilir. “Yardım iste”ye yazdığın mesajlar, ilgili sorunun metni ve şekli, cevap üretilmesi için ara sunucumuz (Cloudflare) üzerinden Anthropic'in Claude yapay zekâ hizmetine (ABD) gönderilir. Kötüye kullanımı önlemek için hesabına ait anonim bir kimlik kodu da gönderilir; adın ve e-postan gönderilmez. Bu sohbetler sitede saklanmaz. Anthropic, ticari kullanım koşulları gereği API üzerinden gelen verileri modellerini eğitmek için kullanmaz. Asistana adını veya kişisel bilgilerini yazma.</p>

<h2>Bu cihazda saklananlar</h2>
<p>Seçtiğin dil, son yazdığın ad, e-postasız hesaplar ve oturum bilgisi tarayıcının yerel depolamasında tutulur. Tarayıcı verilerini silerek bunları kaldırabilirsin.</p>
`,
  },
  en: {
    title: "Privacy notice",
    ownerFallback: "The teacher who publishes this site",
    contactFallback: "contact details not added yet",
    updatedLabel: "Last updated",
    body: `
<h2>In short</h2>
<p>If you use the site without an account or with an <b>account without email</b>, nothing is sent to a server; everything stays in your own browser. Only if you create an <b>email account</b> is the data below stored in Google Firebase. No advertising, analytics or tracking cookies are used.</p>

<h2>Data controller</h2>
<p>{owner}. Contact: {contact}.</p>

<h2>What data is processed if you create an email account?</h2>
<ul>
  <li>Your name and (optionally) your class,</li>
  <li>your email address,</li>
  <li>your password (stored one-way encrypted by Firebase; nobody, including the site administrator, can see it),</li>
  <li>records of the exams you solve: date, exam code, question pattern IDs, your answers and your score.</li>
</ul>
<p>No other data is collected.</p>

<h2>Purpose</h2>
<p>So that you can sign in from any device and see the exams you have solved. The data is not used for anything else, not shared and not sold.</p>

<h2>Where is it stored? (Transfer abroad)</h2>
<p>The data is stored in Firebase, a service of Google LLC. Your exam records are kept on servers in Europe (Germany); your sign-in data (email and password) may be processed on Google's global infrastructure, including in the USA. That's why your explicit consent to this transfer is requested when you sign up.</p>

<h2>Legal basis</h2>
<p>Your explicit consent under the Turkish Personal Data Protection Law (KVKK, No. 6698). You can withdraw it at any time by deleting your account.</p>

<h2>How long is it kept?</h2>
<p>Until you delete your account. <b>My account → Delete account</b> permanently deletes your account and all exam records. You can also delete individual exams.</p>

<h2>If you are under 18</h2>
<p>Talk to a parent before creating an email account. You can use the account without email instead; then no data is sent to a server.</p>

<h2>Your rights</h2>
<p>Under Article 11 of the KVKK you can ask the data controller whether your data is processed, request information, and ask for it to be corrected or deleted. You can also delete your data yourself with “Delete account” on the My account page.</p>

<h2>AI assistant</h2>
<p>Only students signed in with email can use the assistant. The messages you write under “Ask for help”, together with the text and diagram of the question, are sent through our relay server (Cloudflare) to Anthropic's Claude AI service (USA) to generate a reply. An anonymous ID code of your account is also sent to prevent misuse; your name and email are not sent. These chats are not stored by the site. Under its commercial terms, Anthropic does not use data received through its API to train its models. Don't write your name or other personal information to the assistant.</p>

<h2>Stored on this device</h2>
<p>Your chosen language, the last name you typed, accounts without email and sign-in state are kept in your browser's local storage. Clearing your browser data removes them.</p>
`,
  },
  de: {
    title: "Datenschutzhinweise",
    ownerFallback: "Die Lehrkraft, die diese Seite veröffentlicht",
    contactFallback: "Kontaktdaten noch nicht eingetragen",
    updatedLabel: "Zuletzt aktualisiert",
    body: `
<h2>Kurz gesagt</h2>
<p>Wenn du die Seite ohne Konto oder mit einem <b>Konto ohne E-Mail</b> nutzt, wird nichts an einen Server geschickt; alles bleibt in deinem eigenen Browser. Nur wenn du ein <b>E-Mail-Konto</b> anlegst, werden die unten genannten Daten bei Google Firebase gespeichert. Es werden keine Werbe-, Analyse- oder Tracking-Cookies verwendet.</p>

<h2>Verantwortlicher</h2>
<p>{owner}. Kontakt: {contact}.</p>

<h2>Welche Daten werden bei einem E-Mail-Konto verarbeitet?</h2>
<ul>
  <li>Name und (optional) Klasse,</li>
  <li>E-Mail-Adresse,</li>
  <li>Passwort (von Firebase nur als Einweg-Hash gespeichert; niemand, auch nicht die Seitenbetreiber, kann es sehen),</li>
  <li>Aufzeichnungen deiner gelösten Prüfungen: Datum, Prüfungscode, Kennungen der Aufgabenvorlagen, deine Antworten und dein Ergebnis.</li>
</ul>
<p>Darüber hinaus werden keine Daten erhoben.</p>

<h2>Zweck</h2>
<p>Damit du dich auf jedem Gerät anmelden und deine gelösten Prüfungen später ansehen kannst. Die Daten werden für nichts anderes verwendet, nicht weitergegeben und nicht verkauft.</p>

<h2>Wo werden sie gespeichert? (Übermittlung ins Ausland)</h2>
<p>Die Daten werden bei Firebase, einem Dienst der Google LLC, gespeichert. Deine Prüfungsdaten liegen auf Servern in Europa (Deutschland); deine Anmeldedaten (E-Mail und Passwort) können in Googles weltweiter Infrastruktur, auch in den USA, verarbeitet werden. Deshalb wird bei der Registrierung deine ausdrückliche Einwilligung zu dieser Übermittlung eingeholt.</p>

<h2>Rechtsgrundlage</h2>
<p>Deine ausdrückliche Einwilligung nach dem türkischen Datenschutzgesetz (KVKK, Nr. 6698). Du kannst sie jederzeit widerrufen, indem du dein Konto löschst.</p>

<h2>Wie lange werden sie gespeichert?</h2>
<p>Bis du dein Konto löschst. Mit <b>Mein Konto → Konto löschen</b> werden dein Konto und alle Prüfungsdaten endgültig gelöscht. Du kannst auch einzelne Prüfungen löschen.</p>

<h2>Wenn du unter 18 bist</h2>
<p>Sprich vor der Registrierung mit deinen Eltern. Du kannst stattdessen das Konto ohne E-Mail nutzen; dann werden keine Daten an einen Server geschickt.</p>

<h2>Deine Rechte</h2>
<p>Nach Artikel 11 KVKK kannst du beim Verantwortlichen erfragen, ob deine Daten verarbeitet werden, Auskunft verlangen und die Berichtigung oder Löschung beantragen. Du kannst deine Daten auch selbst mit „Konto löschen“ auf der Seite „Mein Konto“ löschen.</p>

<h2>KI-Assistent</h2>
<p>Den Assistenten können nur mit E-Mail angemeldete Schüler nutzen. Was du unter „Hilfe holen“ schreibst, wird zusammen mit Text und Abbildung der Aufgabe über unseren Vermittlungsserver (Cloudflare) an den KI-Dienst Claude von Anthropic (USA) geschickt, um eine Antwort zu erzeugen. Zur Missbrauchsvermeidung wird außerdem eine anonyme Kennung deines Kontos übermittelt; Name und E-Mail werden nicht übermittelt. Die Unterhaltungen werden von der Seite nicht gespeichert. Nach seinen gewerblichen Nutzungsbedingungen verwendet Anthropic über die API erhaltene Daten nicht zum Training seiner Modelle. Schreib dem Assistenten nicht deinen Namen oder andere persönliche Daten.</p>

<h2>Auf diesem Gerät gespeichert</h2>
<p>Deine Sprachwahl, der zuletzt eingegebene Name, Konten ohne E-Mail und der Anmeldestatus liegen im lokalen Speicher deines Browsers. Wenn du die Browserdaten löschst, werden sie entfernt.</p>
`,
  },
};
