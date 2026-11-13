// Özel Ders Buluşturma sayfası (ders.html).
// Ders vermek isteyenlerle ders almak isteyenleri buluşturur. Üniversite öğrencisi eğitmenler
// platforma ücret ödemez; diğer eğitmenler aylık üyelik ücreti öder (config.js → tutoring).
// Ders ücretini eğitmen belirler; site ders ücretinden komisyon almaz.
// tutoring.live = false iken sayfa ÖRNEK ilanlarla tanıtım modunda çalışır ve hiçbir veri toplamaz.
(function () {
  "use strict";
  const { el } = UI;
  const CFG = (QB_CONFIG.tutoring || {});

  // --- Örnek ilanlar (gerçek kişiler değildir; yalnızca sayfanın işleyişini gösterir) ---
  const DEMO = [
    { id: 1, name: "A. K.", type: "uni", info: { tr: "Fizik bölümü, 3. sınıf", en: "Physics, 3rd year", de: "Physik, 3. Studienjahr" }, subjects: ["fizik", "matematik"], levels: ["9", "10", "tyt"], mode: "online", city: "", price: 300 },
    { id: 2, name: "E. D.", type: "uni", info: { tr: "Makine Mühendisliği, 2. sınıf", en: "Mechanical Engineering, 2nd year", de: "Maschinenbau, 2. Studienjahr" }, subjects: ["fizik", "matematik"], levels: ["11", "12", "ayt"], mode: "both", city: "Ankara", price: 350 },
    { id: 3, name: "S. Y.", type: "teacher", info: { tr: "Fizik öğretmeni, 12 yıl deneyim", en: "Physics teacher, 12 years", de: "Physiklehrkraft, 12 Jahre" }, subjects: ["fizik"], levels: ["11", "12", "tyt", "ayt"], mode: "both", city: "İstanbul", price: 800 },
    { id: 4, name: "M. A.", type: "uni", info: { tr: "Kimya Öğretmenliği, 4. sınıf", en: "Chemistry Education, 4th year", de: "Chemie-Lehramt, 4. Studienjahr" }, subjects: ["kimya"], levels: ["9", "10", "11"], mode: "online", city: "", price: 250 },
    { id: 5, name: "Z. Ç.", type: "grad", info: { tr: "Elektrik-Elektronik Mühendisi", en: "Electrical engineer", de: "Elektroingenieurin" }, subjects: ["fizik", "matematik"], levels: ["12", "ayt"], mode: "inperson", city: "İzmir", price: 700 },
    { id: 6, name: "B. T.", type: "uni", info: { tr: "Tıp Fakültesi, 2. sınıf", en: "Medicine, 2nd year", de: "Medizin, 2. Studienjahr" }, subjects: ["biyoloji", "kimya"], levels: ["tyt", "ayt"], mode: "online", city: "", price: 400 },
    { id: 7, name: "H. Ö.", type: "teacher", info: { tr: "Matematik öğretmeni, 8 yıl deneyim", en: "Maths teacher, 8 years", de: "Mathematiklehrkraft, 8 Jahre" }, subjects: ["matematik"], levels: ["9", "10", "11", "12"], mode: "inperson", city: "Diyarbakır", price: 600 },
    { id: 8, name: "C. E.", type: "uni", info: { tr: "Matematik bölümü, 3. sınıf", en: "Mathematics, 3rd year", de: "Mathematik, 3. Studienjahr" }, subjects: ["matematik"], levels: ["9", "10", "tyt"], mode: "both", city: "Erzurum", price: 250 },
  ];

  const L = {
    tr: {
      badge: "Pilot · örnek ilanlarla tanıtım",
      title: "Özel Ders Buluşturma",
      lead: "Ders vermek isteyenlerle ders almak isteyenleri buluşturuyoruz. Ders ücretini eğitmen belirler, ödeme eğitmenle öğrenci arasında yapılır; site aradan komisyon almaz.",
      feeLine: "Üniversite öğrencisi eğitmenler platforma hiç ücret ödemez. Diğer eğitmenler (öğretmenler, mezunlar) aylık üyelik ücreti öder.",
      tabFind: "Ders almak istiyorum", tabTeach: "Ders vermek istiyorum",
      demoNote: "Aşağıdaki ilanlar sayfanın nasıl çalışacağını göstermek için hazırlanmış örneklerdir; gerçek kişiler değildir.",
      fSubject: "Ders", fLevel: "Sınıf / sınav", fMode: "Ders şekli", fCity: "Şehir", fMax: "En fazla ücret (saatlik)", fUni: "Yalnız üniversite öğrencileri",
      any: "Hepsi", anyCity: "Tüm şehirler",
      subjects: { fizik: "Fizik", matematik: "Matematik", kimya: "Kimya", biyoloji: "Biyoloji" },
      levels: { 9: "9. sınıf", 10: "10. sınıf", 11: "11. sınıf", 12: "12. sınıf", tyt: "TYT", ayt: "AYT" },
      modes: { online: "Çevrim içi", inperson: "Yüz yüze", both: "Çevrim içi ve yüz yüze" },
      types: { uni: "Üniversite öğrencisi", teacher: "Öğretmen", grad: "Mezun / uzman" },
      perHour: "{p} {c} / saat", example: "Örnek ilan",
      contact: "Mesaj gönder", contactOff: "Mesajlaşma pilot sonrasında site içinden açılacak.",
      results: "{n} eğitmen", none: "Bu ölçütlere uyan ilan yok. Filtreleri genişlet.",
      teachTitle: "Eğitmen olarak katıl",
      amI: "Şu anda bir üniversitede öğrenci misin?",
      yes: "Evet, üniversite öğrencisiyim", no: "Hayır (öğretmen, mezun, uzman…)",
      feeUni: "Platform ücreti: 0 {c}. Üniversite öğrencilerinden ücret alınmaz; öğrencilik e-Devlet'ten alınan barkodlu öğrenci belgesiyle doğrulanır ve her dönem yenilenir.",
      feeOther: "Aylık üyelik ücreti: {f} {c}. Ders ücretlerinden komisyon alınmaz.",
      feeTbd: "Aylık üyelik ücreti henüz belirlenmedi. Ders ücretlerinden komisyon alınmayacak.",
      steps: ["Profilini oluştur: verdiğin dersler, sınıflar, ders şekli ve saatlik ücretin.", "Kimliğini ve (üniversite öğrencisiysen) öğrenci belgeni doğrulat.", "İlanın yayına girer; öğrenciler ve veliler sana site içinden mesaj gönderir.", "Dersi ve ödemeyi öğrenciyle birlikte planlarsın; her dersten sonra öğrenci değerlendirme yapabilir."],
      apply: "Başvur", applyOff: "Başvurular pilot başladığında açılacak; şu an hiçbir bilgi toplanmıyor.",
      rulesTitle: "Güvenlik ve kurallar",
      rules: ["Her eğitmenin kimliği doğrulanır; öğretmen ve mezunlardan adli sicil kaydı belgesi istenir.", "18 yaşından küçük öğrenciler veli onayıyla katılır; ilk iletişim yalnızca site içinden mesajla olur.", "Eğitmen ücretini ilanında açıkça yazar; sonradan ek ücret istenemez.", "Her ders sonrası değerlendirme ve tek tıkla şikâyet; kurallara uymayan eğitmenin ilanı kaldırılır.", "Site yalnızca buluşturur; ders ücretine aracılık etmez ve komisyon almaz."],
      whyTitle: "Neden üniversite öğrencilerine ücretsiz?",
      why: "Amacımız eğitimde fırsat eşitliği: üniversite öğrencileri genellikle daha uygun ücretle ders verir, böylece özel derse daha çok aile ulaşabilir. Aynı zamanda üniversite öğrencileri ek gelir ve öğretme deneyimi kazanır. Diğer eğitmenlerin üyelik ücreti sitenin giderlerini karşılar.",
      contactLabel: "İletişim", noContact: "İletişim adresi yakında eklenecek.",
    },
    en: {
      badge: "Pilot · preview with sample listings",
      title: "Private Tutoring Match",
      lead: "We connect people who want to teach with people who want lessons. Tutors set their own price and are paid directly by the student; the site takes no commission.",
      feeLine: "University students who tutor pay nothing to use the platform. Other tutors (teachers, graduates) pay a monthly membership fee.",
      tabFind: "I want lessons", tabTeach: "I want to teach",
      demoNote: "The listings below are samples made to show how the page will work; they are not real people.",
      fSubject: "Subject", fLevel: "Grade / exam", fMode: "Format", fCity: "City", fMax: "Maximum price (per hour)", fUni: "University students only",
      any: "All", anyCity: "All cities",
      subjects: { fizik: "Physics", matematik: "Maths", kimya: "Chemistry", biyoloji: "Biology" },
      levels: { 9: "Grade 9", 10: "Grade 10", 11: "Grade 11", 12: "Grade 12", tyt: "TYT", ayt: "AYT" },
      modes: { online: "Online", inperson: "In person", both: "Online and in person" },
      types: { uni: "University student", teacher: "Teacher", grad: "Graduate / expert" },
      perHour: "{p} {c} / hour", example: "Sample listing",
      contact: "Send a message", contactOff: "Messaging on the site will open after the pilot.",
      results: "{n} tutors", none: "No listings match these filters. Try widening them.",
      teachTitle: "Join as a tutor",
      amI: "Are you currently a university student?",
      yes: "Yes, I'm a university student", no: "No (teacher, graduate, expert…)",
      feeUni: "Platform fee: 0 {c}. University students pay nothing; student status is verified with an official student certificate and renewed every term.",
      feeOther: "Monthly membership fee: {f} {c}. No commission on lesson fees.",
      feeTbd: "The monthly membership fee has not been set yet. There will be no commission on lesson fees.",
      steps: ["Create your profile: subjects, grades, format and hourly price.", "Verify your identity and, if you are a university student, your student status.", "Your listing goes live; students and parents message you on the site.", "You arrange lessons and payment with the student; after each lesson the student can leave a review."],
      apply: "Apply", applyOff: "Applications will open when the pilot starts; no information is collected now.",
      rulesTitle: "Safety and rules",
      rules: ["Every tutor's identity is verified; teachers and graduates provide a criminal record certificate.", "Students under 18 take part with a parent's consent; first contact happens only through messages on the site.", "Tutors state their price clearly in the listing; no extra charges may be added later.", "A review after every lesson and one-click reporting; listings of tutors who break the rules are removed.", "The site only connects people; it does not handle lesson payments or take a commission."],
      whyTitle: "Why is it free for university students?",
      why: "Our aim is equal opportunity in education: university students usually charge less, so more families can afford private lessons, and the students earn income and teaching experience. Membership fees from other tutors cover the site's running costs.",
      contactLabel: "Contact", noContact: "A contact address will be added soon.",
    },
    de: {
      badge: "Pilot · Vorschau mit Beispielanzeigen",
      title: "Nachhilfe-Vermittlung",
      lead: "Wir bringen Menschen, die unterrichten möchten, mit Menschen zusammen, die Nachhilfe suchen. Den Preis legt die Lehrkraft fest, bezahlt wird direkt; die Seite nimmt keine Provision.",
      feeLine: "Studierende zahlen für die Plattform nichts. Andere Lehrkräfte (Lehrerinnen und Lehrer, Absolventen) zahlen einen monatlichen Mitgliedsbeitrag.",
      tabFind: "Ich suche Nachhilfe", tabTeach: "Ich möchte unterrichten",
      demoNote: "Die folgenden Anzeigen sind Beispiele, die zeigen, wie die Seite funktionieren wird; es sind keine echten Personen.",
      fSubject: "Fach", fLevel: "Klasse / Prüfung", fMode: "Form", fCity: "Stadt", fMax: "Höchstpreis (pro Stunde)", fUni: "Nur Studierende",
      any: "Alle", anyCity: "Alle Städte",
      subjects: { fizik: "Physik", matematik: "Mathematik", kimya: "Chemie", biyoloji: "Biologie" },
      levels: { 9: "Klasse 9", 10: "Klasse 10", 11: "Klasse 11", 12: "Klasse 12", tyt: "TYT", ayt: "AYT" },
      modes: { online: "Online", inperson: "Vor Ort", both: "Online und vor Ort" },
      types: { uni: "Studierende/r", teacher: "Lehrkraft", grad: "Absolvent/in / Fachkraft" },
      perHour: "{p} {c} / Stunde", example: "Beispielanzeige",
      contact: "Nachricht senden", contactOff: "Nachrichten über die Seite werden nach dem Pilotversuch freigeschaltet.",
      results: "{n} Lehrkräfte", none: "Keine Anzeigen passen zu diesen Filtern. Erweitere die Auswahl.",
      teachTitle: "Als Lehrkraft mitmachen",
      amI: "Studierst du zurzeit an einer Hochschule?",
      yes: "Ja, ich studiere", no: "Nein (Lehrkraft, Absolvent/in, Fachkraft …)",
      feeUni: "Plattformgebühr: 0 {c}. Studierende zahlen nichts; der Studierendenstatus wird mit einer amtlichen Studienbescheinigung geprüft und jedes Semester erneuert.",
      feeOther: "Monatlicher Mitgliedsbeitrag: {f} {c}. Keine Provision auf Unterrichtsgebühren.",
      feeTbd: "Der monatliche Mitgliedsbeitrag steht noch nicht fest. Auf Unterrichtsgebühren wird keine Provision erhoben.",
      steps: ["Lege dein Profil an: Fächer, Klassen, Form und Stundenpreis.", "Bestätige deine Identität und, falls du studierst, deinen Studierendenstatus.", "Deine Anzeige wird veröffentlicht; Schüler und Eltern schreiben dir über die Seite.", "Termine und Bezahlung vereinbarst du mit dem Schüler; nach jeder Stunde kann er eine Bewertung abgeben."],
      apply: "Bewerben", applyOff: "Bewerbungen werden mit dem Pilotversuch geöffnet; derzeit werden keine Daten erhoben.",
      rulesTitle: "Sicherheit und Regeln",
      rules: ["Die Identität jeder Lehrkraft wird geprüft; Lehrkräfte und Absolventen legen ein Führungszeugnis vor.", "Unter 18 nur mit Zustimmung der Eltern; der erste Kontakt läuft nur über Nachrichten auf der Seite.", "Der Preis steht klar in der Anzeige; spätere Zusatzkosten sind nicht erlaubt.", "Bewertung nach jeder Stunde und Meldung mit einem Klick; Anzeigen bei Regelverstößen werden entfernt.", "Die Seite vermittelt nur; sie wickelt keine Zahlungen ab und nimmt keine Provision."],
      whyTitle: "Warum ist es für Studierende kostenlos?",
      why: "Unser Ziel ist Chancengleichheit: Studierende unterrichten meist günstiger, sodass sich mehr Familien Nachhilfe leisten können, und sie gewinnen Einkommen und Unterrichtserfahrung. Die Beiträge der anderen Lehrkräfte decken die Kosten der Seite.",
      contactLabel: "Kontakt", noContact: "Eine Kontaktadresse folgt in Kürze.",
    },
  };

  const state = { tab: "find", subject: "", level: "", mode: "", city: "", max: "", uni: false, isUni: "uni" };
  const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
  const money = (n) => new Intl.NumberFormat({ tr: "tr-TR", en: "en-GB", de: "de-DE" }[UI.lang] || "tr-TR").format(n);

  function select(id, label, opts, val, on) {
    const s = el("select", { id });
    for (const [v, t] of opts) { const o = el("option", { value: v }, t); if (v === val) o.selected = true; s.append(o); }
    s.addEventListener("change", () => on(s.value));
    return el("label", { class: "field tutor-filter", for: id }, el("span", { class: "small muted" }, label), s);
  }

  function card(x, T) {
    const pill = el("span", { class: "tutor-type tutor-type-" + x.type }, T.types[x.type]);
    const where = x.mode === "online" ? T.modes.online : `${T.modes[x.mode]} · ${x.city}`;
    return el("article", { class: "panel tutor-listing" },
      el("div", { class: "tutor-listing-head" },
        el("div", {}, el("h3", {}, x.name), el("p", { class: "small muted" }, x.info[UI.lang] || x.info.tr)),
        el("div", { class: "tutor-price" }, fmt(T.perHour, { p: money(x.price), c: CFG.currency || "TL" }))),
      el("div", { class: "tutor-tags" }, pill, el("span", { class: "tutor-demo" }, T.example)),
      el("p", { class: "small" }, x.subjects.map((s) => T.subjects[s]).join(", ") + " · " + x.levels.map((l) => T.levels[l]).join(", ")),
      el("p", { class: "small muted" }, where),
      el("button", { type: "button", disabled: !CFG.live, title: CFG.live ? "" : T.contactOff }, T.contact));
  }

  function render() {
    const T = L[UI.lang] || L.tr;
    const root = document.getElementById("tutorPage");
    root.innerHTML = "";
    document.title = T.title + " · " + UI.t("appName");
    root.append(el("div", { class: "page-head" },
      el("span", { class: "tutor-badge" }, T.badge),
      el("h1", {}, T.title),
      el("p", { class: "lead" }, T.lead),
      el("p", { class: "tutor-feeline" }, T.feeLine)));

    const tabs = el("div", { class: "tabs", role: "tablist" });
    for (const [k, label] of [["find", T.tabFind], ["teach", T.tabTeach]]) {
      const b = el("button", { type: "button", role: "tab", "aria-selected": String(state.tab === k) }, label);
      b.addEventListener("click", () => { state.tab = k; render(); });
      tabs.append(b);
    }
    root.append(tabs);

    if (state.tab === "find") {
      const cities = [...new Set(DEMO.filter((d) => d.city).map((d) => d.city))].sort((a, b) => a.localeCompare(b, "tr"));
      const filters = el("div", { class: "panel tutor-filters" },
        select("fSubject", T.fSubject, [["", T.any], ...Object.entries(T.subjects)], state.subject, (v) => { state.subject = v; render(); }),
        select("fLevel", T.fLevel, [["", T.any], ...Object.entries(T.levels)], state.level, (v) => { state.level = v; render(); }),
        select("fMode", T.fMode, [["", T.any], ["online", T.modes.online], ["inperson", T.modes.inperson]], state.mode, (v) => { state.mode = v; render(); }),
        select("fCity", T.fCity, [["", T.anyCity], ...cities.map((c) => [c, c])], state.city, (v) => { state.city = v; render(); }),
        select("fMax", T.fMax, [["", T.any], ...[300, 400, 600, 800].map((p) => [String(p), `${money(p)} ${CFG.currency || "TL"}`])], state.max, (v) => { state.max = v; render(); }));
      const uni = el("input", { type: "checkbox", id: "fUni" });
      uni.checked = state.uni;
      uni.addEventListener("change", () => { state.uni = uni.checked; render(); });
      filters.append(el("label", { class: "check-inline", for: "fUni" }, uni, T.fUni));
      root.append(filters);
      root.append(el("p", { class: "notice small" }, T.demoNote));
      const list = DEMO.filter((x) =>
        (!state.subject || x.subjects.includes(state.subject)) &&
        (!state.level || x.levels.includes(state.level)) &&
        (!state.mode || x.mode === state.mode || x.mode === "both") &&
        (!state.city || x.city === state.city) &&
        (!state.max || x.price <= Number(state.max)) &&
        (!state.uni || x.type === "uni"))
        .sort((a, b) => a.price - b.price);
      root.append(el("p", { class: "small muted" }, fmt(T.results, { n: list.length })));
      const grid = el("div", { class: "tutor-listings" });
      list.forEach((x) => grid.append(card(x, T)));
      if (!list.length) grid.append(el("p", { class: "muted" }, T.none));
      root.append(grid);
    } else {
      const box = el("section", { class: "panel tutor-teach" }, el("h2", {}, T.teachTitle), el("p", {}, T.amI));
      const radios = el("div", { class: "chips" });
      for (const [k, label] of [["uni", T.yes], ["other", T.no]]) {
        const r = el("input", { type: "radio", name: "isUni", id: "isUni-" + k, value: k });
        r.checked = state.isUni === k;
        r.addEventListener("change", () => { state.isUni = k; render(); });
        radios.append(el("label", { class: "chip grade-chip", for: "isUni-" + k }, r, label));
      }
      box.append(radios);
      const fee = CFG.memberFeeMonthly;
      const feeText = state.isUni === "uni" ? fmt(T.feeUni, { c: CFG.currency || "TL" })
        : fee == null ? T.feeTbd : fmt(T.feeOther, { f: money(fee), c: CFG.currency || "TL" });
      box.append(el("p", { class: "tutor-fee " + (state.isUni === "uni" ? "is-free" : "") }, feeText));
      const ol = el("ol", { class: "tutor-steps" });
      T.steps.forEach((s) => ol.append(el("li", {}, s)));
      box.append(ol, el("div", { class: "actions" },
        el("button", { type: "button", class: "primary", disabled: !CFG.live }, T.apply),
        CFG.live ? null : el("span", { class: "small muted" }, T.applyOff)));
      root.append(box);
    }

    const info = el("div", { class: "tutor-grid" },
      el("section", { class: "panel tutor-card" }, el("h2", {}, T.rulesTitle), el("ul", { class: "tutor-list" }, ...T.rules.map((r) => el("li", {}, r)))),
      el("section", { class: "panel tutor-card" }, el("h2", {}, T.whyTitle), el("p", {}, T.why)));
    root.append(info);
    const contact = (QB_CONFIG.privacyContact || "").trim();
    root.append(el("p", { class: "muted small tutor-contact" }, T.contactLabel + ": ",
      contact ? el("a", { href: contact.includes("@") ? "mailto:" + contact : contact }, contact) : T.noContact));
  }
  render();
  UI.onLang(render);
})();
