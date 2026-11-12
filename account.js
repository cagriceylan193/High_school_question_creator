/*
 * Hesaplar (üyelik) ve sınav geçmişi
 * ----------------------------------
 * Site bir sunucu kullanmaz: hesaplar ve geçmiş, öğrencinin kendi
 * tarayıcısında (localStorage) saklanır. Aynı cihazı birden fazla öğrenci
 * kullanabilir; isteğe bağlı PIN, arkadaşların birbirinin geçmişini
 * açmasını engeller (gerçek bir güvenlik önlemi değildir).
 *
 * Bir sınav kaydı soruların kendisini değil, onları yeniden üretmek için
 * gerekenleri tutar: tohum (seed), şablon kimlikleri ve cevaplar. Bu yüzden
 * kayıtlar çok küçüktür.
 */
(function (root) {
  "use strict";
  const KEY = "qb-accounts-v1";
  const CUR = "qb-current";
  const APP = "soru-ureteci";

  function read() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || "null");
      if (d && d.users && typeof d.users === "object") return d;
    } catch { /* bozuk ya da erişilemeyen depolama */ }
    return { v: 1, users: {} };
  }
  function write(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch { return false; }
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  // PIN'i düz yazı olarak saklamamak için basit bir özet (şifreleme değildir).
  function pinHash(id, pin) {
    let h = 2166136261 >>> 0;
    for (const ch of `${id}:${pin}`) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36);
  }
  function currentId() {
    try { return sessionStorage.getItem(CUR) || localStorage.getItem(CUR); } catch { return null; }
  }
  // PIN'siz hesaplar tarayıcı kapanınca da açık kalır; PIN'li hesaplar her oturumda PIN ister.
  function setCurrent(id, remember) {
    try { sessionStorage.setItem(CUR, id); } catch { /* yok say */ }
    try { if (remember) localStorage.setItem(CUR, id); else localStorage.removeItem(CUR); } catch { /* yok say */ }
  }
  function clearCurrent() {
    try { sessionStorage.removeItem(CUR); } catch { /* yok say */ }
    try { localStorage.removeItem(CUR); } catch { /* yok say */ }
  }

  function validAttempt(a) {
    return a && typeof a.seed === "string" && Array.isArray(a.ids) && Array.isArray(a.resp);
  }

  const QBA = {
    // Tarayıcı veri saklamaya izin veriyor mu? (gizli pencerede kapalı olabilir)
    available() {
      try { localStorage.setItem("qb-test", "1"); localStorage.removeItem("qb-test"); return true; } catch { return false; }
    },

    list() {
      return Object.values(read().users).sort((a, b) => a.name.localeCompare(b.name, "tr"));
    },

    current() {
      const id = currentId();
      return (id && read().users[id]) || null;
    },

    create({ name, cls, pin }) {
      name = String(name || "").trim();
      if (!name) return null;
      const d = read();
      const id = uid();
      d.users[id] = {
        id, name, cls: String(cls || "").trim(), created: new Date().toISOString(),
        pin: pin ? pinHash(id, pin) : "", history: [],
      };
      if (!write(d)) return null;
      setCurrent(id, !pin);
      return d.users[id];
    },

    hasPin(id) {
      const u = read().users[id];
      return !!(u && u.pin);
    },

    login(id, pin) {
      const u = read().users[id];
      if (!u) return false;
      if (u.pin && pinHash(id, String(pin || "")) !== u.pin) return false;
      setCurrent(id, !u.pin);
      return true;
    },

    logout() {
      clearCurrent();
    },

    // Sınav sonucunu giriş yapmış öğrencinin geçmişine ekler.
    addAttempt(att) {
      const d = read();
      const u = d.users[currentId()];
      if (!u) return null;
      const rec = { ...att, id: uid(), at: new Date().toISOString() };
      u.history.unshift(rec);
      return write(d) ? rec : null;
    },

    deleteAttempt(aid) {
      const d = read();
      const u = d.users[currentId()];
      if (!u) return;
      u.history = u.history.filter((a) => a.id !== aid);
      write(d);
    },

    deleteAccount() {
      const d = read();
      delete d.users[currentId()];
      write(d);
      clearCurrent();
    },

    // Başka cihaza taşımak için yedek (PIN dahil edilmez)
    exportCurrent() {
      const u = this.current();
      if (!u) return null;
      return JSON.stringify({ app: APP, v: 1, exported: new Date().toISOString(),
        user: { name: u.name, cls: u.cls, created: u.created, history: u.history } }, null, 1);
    },

    // Yedeği yükler: giriş yapılmışsa geçmişi birleştirir, değilse yeni hesap açar.
    // Dönen değer: eklenen sınav sayısı; dosya geçersizse -1.
    importBackup(text) {
      let data;
      try { data = JSON.parse(text); } catch { return -1; }
      if (!data || data.app !== APP || !data.user || !Array.isArray(data.user.history)) return -1;
      const incoming = data.user.history.filter(validAttempt);
      let u = this.current();
      if (!u) u = this.create({ name: data.user.name || "?", cls: data.user.cls });
      if (!u) return -1;
      const d = read();
      const target = d.users[u.id];
      const have = new Set(target.history.map((a) => a.id));
      let added = 0;
      for (const a of incoming) {
        if (have.has(a.id)) continue;
        target.history.push(a);
        added++;
      }
      target.history.sort((a, b) => String(b.at).localeCompare(String(a.at)));
      write(d);
      return added;
    },
  };

  root.QBA = QBA;
})(typeof globalThis !== "undefined" ? globalThis : this);
