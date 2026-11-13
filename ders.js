// Gönüllü Ders Ağı sayfası (ders.html). Şu an yalnızca tanıtım/pilot sayfasıdır:
// hiçbir kişisel veri toplanmaz. Başvurular açılmadan önce raporda anlatılan
// güvenlik ve KVKK adımları tamamlanmalıdır.
(function () {
  "use strict";
  const C = {
    tr: {
      badge: "Pilot · yakında",
      title: "Gönüllü Ders Ağı",
      lead: "Özel derse parası yetmeyen lise öğrencilerini, ders vermek isteyen üniversite öğrencileriyle ücretsiz olarak buluşturmak istiyoruz. Program henüz başlamadı; şu an okul ve dernek ortakları arıyoruz.",
      sections: [
        { h: "Öğrenciler için nasıl işleyecek?", steps: [
          "Sorular sayfasında çözdüğün sınavlar, en çok zorlandığın konuları gösterir.",
          "Hesabım sayfasından, zorlandığın konu için ders isteği gönderirsin (18 yaşından küçüksen velinin onayıyla).",
          "Sistem seni sınıfına, konuna ve uygun saatlerine göre bir gönüllüyle ya da küçük bir çalışma grubuyla eşleştirir.",
          "Dersler yalnızca site üzerinden, çevrim içi ve ücretsiz yapılır; ders sonunda kısa bir değerlendirme yaparsın.",
        ] },
        { h: "Gönüllü olmak isteyen üniversite öğrencileri için", list: [
          "Üniversite e-posta adresi (.edu.tr) ile doğrulanmış hesap.",
          "Ders vermek istediği konuda, sitedeki sorularla yapılan kısa bir yeterlilik sınavı.",
          "Çocukların korunması ve çevrim içi güvenlik üzerine kısa bir eğitim ve davranış kuralları sözleşmesi.",
          "Haftada en az bir saat; verilen her ders için dönem sonunda gönüllülük belgesi.",
        ] },
        { h: "Güvenlik kurallarımız", list: [
          "Ücret alınmaz, ücret istenmez; para ya da hediye teklifi kurallara aykırıdır.",
          "Telefon numarası, sosyal medya hesabı ve adres gibi kişisel iletişim bilgileri paylaşılmaz; tüm iletişim site içinde kalır.",
          "18 yaşından küçük öğrenciler yalnızca veli onayıyla katılabilir; veli istediği zaman dersleri görebilir.",
          "Birebir dersler yerine öncelik küçük grup derslerinindir; ders kayıtları yalnızca şikâyet incelemesi için ve sınırlı süre saklanır.",
          "Her derste tek tıkla şikâyet bildirme; kurallara uymayan gönüllü programdan çıkarılır.",
        ] },
        { h: "Neden yapıyoruz?", text: "Türkiye'de özel ders ve dershane masrafı birçok aile için karşılanamıyor. Aynı zamanda binlerce üniversite öğrencisi bildiklerini paylaşmak, deneyim kazanmak ve topluma katkı vermek istiyor. Bu site kâr amacı gütmez; amacımız eğitimde fırsat eşitliğine küçük ama ölçülebilir bir katkı yapmak." },
        { h: "Destek olmak ister misiniz?", text: "Pilot için ortak okul, üniversite topluluğu, dernek veya sponsor arıyoruz. Program başvuruya açıldığında bu sayfada duyuracağız." },
      ],
      contact: "İletişim",
      noContact: "İletişim adresi yakında eklenecek.",
      cta: "Bu arada soru çözmeye başla",
    },
    en: {
      badge: "Pilot · coming soon",
      title: "Volunteer Tutoring Network",
      lead: "We want to connect high-school students who cannot afford private lessons with university students who want to teach, free of charge. The programme has not started yet; we are currently looking for school and charity partners.",
      sections: [
        { h: "How will it work for students?", steps: [
          "The exams you solve on the Questions page show the topics you find hardest.",
          "From My account you send a tutoring request for that topic (with a parent's consent if you are under 18).",
          "You are matched with a volunteer or a small study group by grade, topic and available times.",
          "Lessons happen only on this site, online and free; afterwards you give short feedback.",
        ] },
        { h: "For university students who want to volunteer", list: [
          "An account verified with a university e-mail address.",
          "A short proficiency test, using the site's questions, in the topic they want to teach.",
          "Brief training on child protection and online safety, plus a signed code of conduct.",
          "At least one hour a week; a volunteering certificate at the end of each term.",
        ] },
        { h: "Our safety rules", list: [
          "No fees are charged or requested; offering money or gifts breaks the rules.",
          "No personal contact details such as phone numbers, social-media accounts or addresses are shared; all communication stays on the site.",
          "Students under 18 can only take part with a parent's consent; parents can see the lessons at any time.",
          "Small-group lessons are preferred to one-to-one; recordings are kept only for a limited time and only to investigate complaints.",
          "One-click reporting in every lesson; volunteers who break the rules are removed.",
        ] },
        { h: "Why are we doing this?", text: "Private lessons and prep courses are unaffordable for many families in Türkiye, while thousands of university students want to share what they know, gain experience and give back. This site is non-profit; our aim is a small but measurable contribution to equal opportunities in education." },
        { h: "Would you like to help?", text: "For the pilot we are looking for partner schools, university societies, charities and sponsors. We will announce it on this page when applications open." },
      ],
      contact: "Contact",
      noContact: "A contact address will be added soon.",
      cta: "Meanwhile, start solving questions",
    },
    de: {
      badge: "Pilot · demnächst",
      title: "Netzwerk für ehrenamtliche Nachhilfe",
      lead: "Wir möchten Schülerinnen und Schüler, die sich keine Nachhilfe leisten können, kostenlos mit Studierenden zusammenbringen, die gern unterrichten. Das Programm hat noch nicht begonnen; wir suchen gerade Partnerschulen und Vereine.",
      sections: [
        { h: "Wie soll es für Schüler funktionieren?", steps: [
          "Die Prüfungen auf der Aufgabenseite zeigen dir, welche Themen dir am schwersten fallen.",
          "Unter „Mein Konto“ schickst du für dieses Thema eine Anfrage (unter 18 mit Zustimmung der Eltern).",
          "Du wirst nach Klasse, Thema und freien Zeiten einer ehrenamtlichen Person oder einer kleinen Lerngruppe zugeordnet.",
          "Der Unterricht findet nur über diese Seite statt, online und kostenlos; danach gibst du kurz Rückmeldung.",
        ] },
        { h: "Für Studierende, die mitmachen möchten", list: [
          "Ein mit der Hochschul-E-Mail-Adresse bestätigtes Konto.",
          "Ein kurzer Kenntnistest mit Aufgaben dieser Seite im gewünschten Fach.",
          "Eine kurze Schulung zu Kinderschutz und Online-Sicherheit sowie ein Verhaltenskodex.",
          "Mindestens eine Stunde pro Woche; am Semesterende eine Ehrenamtsbescheinigung.",
        ] },
        { h: "Unsere Sicherheitsregeln", list: [
          "Es wird kein Geld verlangt oder angenommen; Geld- oder Geschenkangebote verstoßen gegen die Regeln.",
          "Keine Weitergabe persönlicher Kontaktdaten wie Telefonnummern, Social-Media-Konten oder Adressen; die Kommunikation bleibt auf der Seite.",
          "Unter 18 nur mit Zustimmung der Eltern; Eltern können den Unterricht jederzeit einsehen.",
          "Kleingruppen haben Vorrang vor Einzelunterricht; Aufzeichnungen werden nur befristet und nur zur Prüfung von Beschwerden aufbewahrt.",
          "In jeder Stunde Meldung mit einem Klick; wer gegen die Regeln verstößt, wird ausgeschlossen.",
        ] },
        { h: "Warum machen wir das?", text: "Nachhilfe und Vorbereitungskurse sind für viele Familien in der Türkei unbezahlbar, während viele Studierende ihr Wissen teilen und Erfahrung sammeln möchten. Diese Seite ist nicht gewinnorientiert; unser Ziel ist ein kleiner, messbarer Beitrag zur Chancengleichheit in der Bildung." },
        { h: "Möchten Sie helfen?", text: "Für den Pilotversuch suchen wir Partnerschulen, Hochschulgruppen, Vereine und Sponsoren. Sobald Bewerbungen möglich sind, geben wir es hier bekannt." },
      ],
      contact: "Kontakt",
      noContact: "Eine Kontaktadresse folgt in Kürze.",
      cta: "Inzwischen Aufgaben lösen",
    },
  };

  function render() {
    const L = C[UI.lang] || C.tr;
    const { el } = UI;
    const box = document.getElementById("tutorPage");
    box.innerHTML = "";
    box.append(
      el("div", { class: "page-head" },
        el("span", { class: "tutor-badge" }, L.badge),
        el("h1", {}, L.title),
        el("p", { class: "lead" }, L.lead)),
    );
    const grid = el("div", { class: "tutor-grid" });
    for (const s of L.sections) {
      const card = el("section", { class: "panel tutor-card" }, el("h2", {}, s.h));
      if (s.steps) { const ol = el("ol", { class: "tutor-steps" }); s.steps.forEach((x) => ol.append(el("li", {}, x))); card.append(ol); }
      if (s.list) { const ul = el("ul", { class: "tutor-list" }); s.list.forEach((x) => ul.append(el("li", {}, x))); card.append(ul); }
      if (s.text) card.append(el("p", {}, s.text));
      grid.append(card);
    }
    box.append(grid);
    const contact = (QB_CONFIG.privacyContact || "").trim();
    box.append(el("p", { class: "muted small tutor-contact" }, L.contact + ": ",
      contact ? el("a", { href: contact.includes("@") ? "mailto:" + contact : contact }, contact) : L.noContact));
    box.append(el("div", { class: "actions" }, el("a", { class: "button primary", href: "sorular.html" }, L.cta)));
    document.title = L.title + " · " + UI.t("appName");
  }
  render();
  UI.onLang(render);
})();
