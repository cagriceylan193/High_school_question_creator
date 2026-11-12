// SSS (Sık Sorulan Sorular) içeriği. Her dilde aynı sırada olmalı.
// Cevaplarda basit HTML kullanılabilir (<b>, <a href="...">).
globalThis.QB_FAQ = {
  tr: [
    {
      q: "Bu site ne işe yarar?",
      a: "Lise öğrencileri için fizik alıştırma ve sınav sorusu üretir. Her soru bir kalıptır: soru aynıdır, sayılar her öğrenci için farklıdır. Cevabını yazdıktan sonra doğru olup olmadığını hemen görürsün.",
    },
    {
      q: "Neden arkadaşımın soruları benimkinden farklı?",
      a: "Sorulardaki sayılar adına ve sınav koduna göre seçilir. Aynı sınavda herkes aynı konulardan, aynı kalıpta soru alır, ama sayılar ve doğru cevap kişiye özeldir. Böylece cevapları birbirinden kopyalamak işe yaramaz, herkes kendi sorusunu çözer.",
    },
    {
      q: "Sayfayı kapatıp açınca sorularım değişir mi?",
      a: "Hayır. Adını ve sınav kodunu aynı yazdığın sürece aynı soruları görürsün. Büyük-küçük harf ve fazladan boşluk fark etmez. Ama adını farklı yazarsan (ör. “Ali” yerine “Ali Y.”) farklı sorular gelir, o yüzden adını her seferinde aynı yaz.",
    },
    {
      q: "Sınav kodunu nereden bulurum?",
      a: "Sınav kodunu öğretmenin verir. Öğretmeninin gönderdiği link ile girersen kod ve soru sayısı kendiliğinden yazılı gelir. Kendi başına alıştırma yapmak istersen istediğin bir kodu yazabilirsin; her yeni kod yeni sayılar demektir.",
    },
    {
      q: "Cevabımı nasıl yazmalıyım?",
      a: "Sadece sayıyı yaz, birimi yazmana gerek yok (birim kutunun yanında gösterilir). Ondalık için virgül de nokta da olur: <b>2,5</b> ve <b>2.5</b> aynıdır. Kesir de yazabilirsin: <b>3/4</b>. Çoktan seçmeli sorularda doğru şıkkı işaretlemen yeterli.",
    },
    {
      q: "Yer çekimi ivmesi (g) kaç alınıyor?",
      a: "Aksi yazmadıkça <b>g = 10 m/s²</b> alınır. Soruda gereken diğer sabitler (ör. suyun yoğunluğu) sorunun içinde verilir.",
    },
    {
      q: "Dili değiştirince ne olur?",
      a: "Sağ üstten Türkçe, İngilizce veya Almanca seçebilirsin. Soruların metni değişir, sayılar ve doğru cevap aynı kalır. Verdiğin cevaplar da silinmez. İngilizce ve Almanca fizik terimlerini öğrenmek için kullanışlıdır.",
    },
    {
      q: "Hangi konular var?",
      a: "Şu an 9. ve 10. sınıf (TYT) fizik konuları var: madde ve özellikleri, basınç, kaldırma kuvveti, ısı ve sıcaklık, hareket, kuvvet ve Newton yasaları, iş ve enerji, elektrostatik, elektrik akımı, optik ve dalgalar. Diğer dersler zamanla eklenecek.",
    },
    {
      q: "Soru tipleri ve zorluk seviyeleri neler?",
      a: "Sayısal çoktan seçmeli ve açık uçlu soruların yanında <b>“I, II, III yargılarından hangileri doğrudur?”</b>, <b>sıralama</b> (ör. P<sub>K</sub> &gt; P<sub>L</sub> = P<sub>M</sub>) ve <b>“Artar / Azalır / Değişmez”</b> soruları var. Birçok soruda grafik, devre, kap veya dalga şekli bulunur; şekildeki sayılar da sana özeldir. Her soru <b>Kolay</b>, <b>Orta</b> veya <b>Zor</b> olarak işaretlidir. Soru sayfasında zorluğu seçebilirsin; sınavda sorular kolaydan zora sıralanır.",
    },
    {
      q: "Adım ve cevaplarım bir yere kaydediliyor mu?",
      a: "Hesap açmazsan ya da e-postasız hesap kullanırsan hiçbir bilgi sunucuya gönderilmez; her şey kendi tarayıcında kalır. E-posta ile hesap açarsan adın, e-postan ve çözdüğün sınavlar Google Firebase'de yalnızca senin erişebileceğin şekilde saklanır; ayrıntılar <a href=\"gizlilik.html\">aydınlatma metninde</a>. Puanını öğretmenin görmez; sınavı kâğıtta yapıyorsanız cevaplarını kâğıda yaz.",
    },
    {
      q: "Hesap nasıl çalışır?",
      a: "<a href=\"hesap.html\">Hesabım</a> sayfasında iki seçenek var. <b>E-posta ile hesap:</b> her cihazdan aynı e-posta ve şifreyle girersin, sınavların bulutta saklanır; şifreni unutursan sıfırlama bağlantısı istenebilir. <b>E-postasız hesap:</b> e-posta vermeden açılır, geçmişin yalnızca o cihazdaki tarayıcıda durur (başka cihaza “Yedek indir / Yedek yükle” ile taşınır). İki durumda da “Cevapları kontrol et”e bastığın her sınav kaydedilir; tarihi, puanı ve konuları listelenir ve şekilleriyle tekrar incelenebilir. E-postasız hesaptaki sınavlarını sonradan e-posta hesabına aktarabilirsin.",
    },
    {
      q: "Soruları PDF olarak nasıl indiririm?",
      a: "Soru sayfasında sınavı oluşturduktan sonra <b>PDF indir</b>'e bas. Cevapları kontrol etmeden indirirsen boş bir sınav kâğıdı alırsın; “Cevap anahtarını ekle” seçiliyse son sayfada cevaplar olur. Kontrol ettikten sonra indirirsen PDF'te kendi cevapların ve doğru cevaplar işaretli olur. Hesabım sayfasından eski sınavlarını da PDF olarak indirebilirsin. Öğretmenler tüm sınıfın kâğıtlarını tek bir PDF'te alabilir.",
    },
    {
      q: "Öğretmenler siteyi nasıl kullanır?",
      a: "<a href=\"ogretmen.html\">Öğretmen sayfasında</a> sınav kodunu, soru sayısını ve konuları seçip sınıf listesini yapıştırırsınız. Sayfa her öğrencinin cevap anahtarını, öğrencilere gönderilecek linki ve her öğrenciye ayrı yazdırılabilir sınav kâğıdını hazırlar. Not verilen sınavlarda kâğıt çıktı kullanmanızı öneririz, çünkü çevrim içi sayfa tarayıcıda çalıştığı için cevaplar teknik olarak hesaplanabilir.",
    },
    {
      q: "Bir soruda hata buldum, ne yapmalıyım?",
      a: "Öğretmenine sorunun ekran görüntüsünü, adını ve sınav kodunu gönder. Bu üç bilgiyle aynı soru tekrar üretilip kontrol edilebilir.",
    },
  ],
  en: [
    {
      q: "What is this site for?",
      a: "It generates physics practice and exam questions for high school students. Each question is a pattern: the question stays the same while the numbers change for every student. After you type your answer you immediately see whether it is right.",
    },
    {
      q: "Why are my friend's questions different from mine?",
      a: "The numbers are chosen from your name and the exam code. In the same exam everyone gets the same topics and patterns, but the numbers and the correct answer are personal. Copying someone else's answers doesn't work; everyone solves their own question.",
    },
    {
      q: "Will my questions change if I close and reopen the page?",
      a: "No. As long as you type the same name and exam code you get the same questions. Upper/lower case and extra spaces don't matter. If you write your name differently (e.g. “Alex S.” instead of “Alex”) you get different questions, so always type it the same way.",
    },
    {
      q: "Where do I get the exam code?",
      a: "Your teacher gives you the exam code. If you open the link your teacher sent, the code and number of questions are filled in for you. To practise on your own you can type any code; every new code means new numbers.",
    },
    {
      q: "How should I type my answer?",
      a: "Type just the number; you don't need the unit (it is shown next to the box). Use a comma or a point for decimals: <b>2,5</b> and <b>2.5</b> are the same. Fractions work too: <b>3/4</b>. For multiple-choice questions just pick the correct option.",
    },
    {
      q: "What value is used for gravitational acceleration (g)?",
      a: "Unless stated otherwise, <b>g = 10 m/s²</b>. Any other constants a question needs (e.g. the density of water) are given in the question.",
    },
    {
      q: "What happens when I change the language?",
      a: "You can choose Turkish, English or German in the top right. The question text changes; the numbers and the correct answer stay the same, and your answers are kept. It's a handy way to learn physics vocabulary in other languages.",
    },
    {
      q: "Which topics are available?",
      a: "Currently grade 9 and 10 physics: matter and its properties, pressure, buoyancy, heat and temperature, motion, force and Newton's laws, work and energy, electrostatics, electric current, optics and waves. Other subjects will be added over time.",
    },
    {
      q: "What question types and difficulty levels are there?",
      a: "Besides numerical multiple-choice and open questions, there are <b>“Which of statements I, II, III are true?”</b>, <b>ordering</b> (e.g. P<sub>K</sub> &gt; P<sub>L</sub> = P<sub>M</sub>) and <b>“increases / decreases / no change”</b> questions. Many questions include a graph, circuit, container or wave diagram, and the numbers in the diagram are personal to you too. Every question is marked <b>Easy</b>, <b>Medium</b> or <b>Hard</b>. You can choose the difficulty on the questions page; in an exam the questions go from easy to hard.",
    },
    {
      q: "Are my name and answers saved anywhere?",
      a: "Without an account, or with an account without email, nothing is sent to a server; everything stays in your own browser. With an email account, your name, email and solved exams are stored in Google Firebase where only you can access them; see the <a href=\"gizlilik.html\">privacy notice</a> for details. Your teacher doesn't see your score; if the exam is on paper, write your answers on the paper.",
    },
    {
      q: "How does the account work?",
      a: "The <a href=\"hesap.html\">My account</a> page has two options. <b>Email account:</b> sign in from any device with the same email and password; your exams are stored in the cloud, and you can request a reset link if you forget your password. <b>Account without email:</b> no email needed; your history stays only in the browser on that device (move it with “Download backup / Load backup”). Either way, every exam you check with “Check answers” is saved with its date, score and topics, and you can review it again with its diagrams. You can later copy exams from an account without email into an email account.",
    },
    {
      q: "How do I download the questions as a PDF?",
      a: "After generating an exam on the questions page, press <b>Download PDF</b>. If you download before checking, you get a blank exam sheet; with “Include answer key” ticked, the last page has the answers. If you download after checking, your answers and the correct ones are marked. You can also download past exams from My account. Teachers can get the whole class's sheets in a single PDF.",
    },
    {
      q: "How do teachers use the site?",
      a: "On the <a href=\"ogretmen.html\">teacher page</a> you choose the exam code, number of questions and topics, then paste your class list. The page builds an answer key for every student, a link to send to students and a separate printable exam sheet for each student. For graded exams we recommend printed sheets, because the online page runs in the browser and the answers could technically be worked out.",
    },
    {
      q: "I found a mistake in a question. What should I do?",
      a: "Send your teacher a screenshot of the question, your name and the exam code. With those three things the same question can be generated again and checked.",
    },
  ],
  de: [
    {
      q: "Wofür ist diese Seite?",
      a: "Sie erzeugt Physik-Übungs- und Prüfungsaufgaben für die Oberstufe. Jede Aufgabe ist ein Muster: Die Frage bleibt gleich, die Zahlen ändern sich für jeden Schüler. Nach der Eingabe siehst du sofort, ob deine Antwort stimmt.",
    },
    {
      q: "Warum hat mein Mitschüler andere Aufgaben als ich?",
      a: "Die Zahlen werden aus deinem Namen und dem Prüfungscode bestimmt. In derselben Prüfung bekommen alle dieselben Themen und Muster, aber Zahlen und richtige Antwort sind persönlich. Abschreiben bringt also nichts; jeder löst seine eigene Aufgabe.",
    },
    {
      q: "Ändern sich meine Aufgaben, wenn ich die Seite schließe und wieder öffne?",
      a: "Nein. Solange du denselben Namen und Prüfungscode eingibst, bekommst du dieselben Aufgaben. Groß- und Kleinschreibung und zusätzliche Leerzeichen spielen keine Rolle. Schreibst du deinen Namen anders (z. B. „Lukas M.“ statt „Lukas“), bekommst du andere Aufgaben. Schreib ihn also immer gleich.",
    },
    {
      q: "Woher bekomme ich den Prüfungscode?",
      a: "Den Prüfungscode bekommst du von deiner Lehrkraft. Wenn du den Link deiner Lehrkraft öffnest, sind Code und Aufgabenanzahl schon eingetragen. Zum selbstständigen Üben kannst du einen beliebigen Code eingeben; jeder neue Code bedeutet neue Zahlen.",
    },
    {
      q: "Wie gebe ich meine Antwort ein?",
      a: "Gib nur die Zahl ein, die Einheit brauchst du nicht (sie steht neben dem Feld). Für Dezimalzahlen geht Komma oder Punkt: <b>2,5</b> und <b>2.5</b> sind gleich. Brüche gehen auch: <b>3/4</b>. Bei Multiple-Choice-Aufgaben wählst du einfach die richtige Antwort.",
    },
    {
      q: "Mit welchem Wert für die Fallbeschleunigung (g) wird gerechnet?",
      a: "Wenn nichts anderes angegeben ist, mit <b>g = 10 m/s²</b>. Weitere Konstanten (z. B. die Dichte von Wasser) stehen in der Aufgabe.",
    },
    {
      q: "Was passiert, wenn ich die Sprache wechsle?",
      a: "Oben rechts kannst du Türkisch, Englisch oder Deutsch wählen. Der Aufgabentext ändert sich, Zahlen und richtige Antwort bleiben gleich, und deine Antworten bleiben erhalten. So lernst du nebenbei Physikbegriffe in anderen Sprachen.",
    },
    {
      q: "Welche Themen gibt es?",
      a: "Derzeit Physik der Klassen 9 und 10: Stoffe und ihre Eigenschaften, Druck, Auftrieb, Wärme und Temperatur, Bewegung, Kraft und Newtonsche Gesetze, Arbeit und Energie, Elektrostatik, elektrischer Strom, Optik und Wellen. Weitere Fächer kommen nach und nach dazu.",
    },
    {
      q: "Welche Aufgabentypen und Schwierigkeitsstufen gibt es?",
      a: "Neben Multiple-Choice- und offenen Rechenaufgaben gibt es <b>„Welche der Aussagen I, II, III sind richtig?“</b>, <b>Reihenfolgen</b> (z. B. P<sub>K</sub> &gt; P<sub>L</sub> = P<sub>M</sub>) und <b>„nimmt zu / nimmt ab / bleibt gleich“</b>. Viele Aufgaben enthalten ein Diagramm, eine Schaltung, ein Gefäß oder eine Welle; auch die Zahlen in der Abbildung sind persönlich. Jede Aufgabe ist als <b>Leicht</b>, <b>Mittel</b> oder <b>Schwer</b> markiert. Auf der Aufgabenseite kannst du die Schwierigkeit wählen; in einer Prüfung gehen die Aufgaben von leicht nach schwer.",
    },
    {
      q: "Werden mein Name und meine Antworten gespeichert?",
      a: "Ohne Konto oder mit einem Konto ohne E-Mail wird nichts an einen Server geschickt; alles bleibt in deinem eigenen Browser. Mit einem E-Mail-Konto werden Name, E-Mail und gelöste Prüfungen bei Google Firebase gespeichert, nur du hast Zugriff; Einzelheiten in den <a href=\"gizlilik.html\">Datenschutzhinweisen</a>. Deine Lehrkraft sieht dein Ergebnis nicht; bei einer Prüfung auf Papier schreibst du die Antworten aufs Blatt.",
    },
    {
      q: "Wie funktioniert das Konto?",
      a: "Auf der Seite <a href=\"hesap.html\">Mein Konto</a> gibt es zwei Möglichkeiten. <b>E-Mail-Konto:</b> Du meldest dich auf jedem Gerät mit derselben E-Mail und demselben Passwort an; deine Prüfungen werden in der Cloud gespeichert, und bei vergessenem Passwort kannst du einen Link anfordern. <b>Konto ohne E-Mail:</b> ohne E-Mail-Adresse; dein Verlauf bleibt nur im Browser dieses Geräts (mit „Sicherung herunterladen / laden“ übertragbar). In beiden Fällen wird jede mit „Antworten prüfen“ abgeschlossene Prüfung mit Datum, Ergebnis und Themen gespeichert und kann samt Abbildungen erneut angesehen werden. Prüfungen aus einem Konto ohne E-Mail kannst du später in ein E-Mail-Konto übernehmen.",
    },
    {
      q: "Wie lade ich die Aufgaben als PDF herunter?",
      a: "Erzeuge auf der Aufgabenseite eine Prüfung und tippe auf <b>PDF herunterladen</b>. Vor dem Prüfen erhältst du ein leeres Prüfungsblatt; mit „Lösungsschlüssel anhängen“ stehen die Lösungen auf der letzten Seite. Nach dem Prüfen sind deine Antworten und die richtigen Lösungen markiert. Alte Prüfungen kannst du unter „Mein Konto“ herunterladen. Lehrkräfte erhalten die Blätter der ganzen Klasse in einem PDF.",
    },
    {
      q: "Wie nutzen Lehrkräfte die Seite?",
      a: "Auf der <a href=\"ogretmen.html\">Lehrerseite</a> wählen Sie Prüfungscode, Aufgabenanzahl und Themen und fügen die Klassenliste ein. Die Seite erstellt einen Lösungsschlüssel für jeden Schüler, einen Link für die Schüler und für jeden Schüler ein eigenes druckbares Prüfungsblatt. Für benotete Prüfungen empfehlen wir Ausdrucke, da die Online-Seite im Browser läuft und die Lösungen technisch berechnet werden könnten.",
    },
    {
      q: "Ich habe einen Fehler in einer Aufgabe gefunden. Was soll ich tun?",
      a: "Schick deiner Lehrkraft einen Screenshot der Aufgabe, deinen Namen und den Prüfungscode. Mit diesen drei Angaben lässt sich dieselbe Aufgabe erneut erzeugen und prüfen.",
    },
  ],
};
