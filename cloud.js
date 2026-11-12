/*
 * Bulut hesabı (Firebase): e-posta + şifre ile giriş, sınav geçmişinin
 * Firestore'da saklanması.
 *
 * Veri yapısı:
 *   users/{uid}                 { name, cls, created, updated }
 *   users/{uid}/attempts/{id}   sınav kaydı (account.js ile aynı biçim)
 *
 * Arayüz senkron kalsın diye giriş yapan öğrencinin profili ve geçmişi
 * account.js'teki tarayıcı önbelleğinde de tutulur. Yeni sınavlar önce
 * önbelleğe "bekliyor" olarak yazılır, sonra buluta gönderilir; bağlantı
 * yoksa bir sonraki açılışta tekrar denenir.
 *
 * Firebase kütüphanesi (vendor/firebase) yalnızca bu dosyayı yükleyen
 * sayfalarda ve ilk ihtiyaç anında yüklenir.
 */
(function () {
  "use strict";
  const here = document.currentScript ? document.currentScript.src : location.href;
  const BASE = new URL("vendor/firebase/", here).href;
  const CFG = (globalThis.QB_CONFIG || {}).firebase;

  // Yerel test: http://localhost:...?emulator → Firebase emülatörleri
  const local = ["localhost", "127.0.0.1"].includes(location.hostname);
  try { if (local && new URLSearchParams(location.search).has("emulator")) sessionStorage.setItem("qb-emulator", "1"); } catch { /* yok say */ }
  const EMU = local && (() => { try { return sessionStorage.getItem("qb-emulator") === "1"; } catch { return false; } })();

  const state = { ready: false, available: !!(CFG && CFG.apiKey), user: null, sync: "idle", error: "" };
  const listeners = new Set();
  let auth = null, db = null, loading = null;
  let fresh = null; // kayıt sırasında girilen profil (veritabanına yazılmadan önce oturum açılabilir)

  function emit() {
    for (const fn of listeners) { try { fn(state); } catch (e) { console.error(e); } }
  }
  function set(patch) { Object.assign(state, patch); emit(); }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(Object.assign(new Error("Yüklenemedi: " + src), { code: "qb/load" }));
      document.head.append(s);
    });
  }

  function init() {
    if (!state.available) return Promise.reject(Object.assign(new Error("Firebase yapılandırması yok"), { code: "qb/no-config" }));
    if (!loading) {
      loading = loadScript(BASE + "firebase-app-compat.js")
        .then(() => loadScript(BASE + "firebase-auth-compat.js"))
        .then(() => loadScript(BASE + "firebase-firestore-compat.js"))
        .then(() => {
          const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(CFG);
          auth = app.auth();
          db = app.firestore();
          if (EMU) {
            auth.useEmulator("http://127.0.0.1:9099", { disableWarnings: true });
            db.useEmulator("127.0.0.1", 8080);
          }
          auth.languageCode = (globalThis.UI && UI.lang) || "tr";
          return new Promise((resolve) => {
            let first = true;
            auth.onAuthStateChanged(async (u) => {
              try { await onUser(u); } catch (e) { console.error(e); set({ sync: "error", error: e.code || e.message }); }
              if (first) { first = false; set({ ready: true }); resolve(); }
            });
          });
        });
      loading.catch(() => { loading = null; });
    }
    return loading;
  }

  // --- Oturum değişince önbelleği güncelle ve geçmişi eşitle -----------------------
  async function onUser(u) {
    if (!u) {
      QBA.clearCloudUser();
      set({ user: null, sync: "idle", error: "" });
      return;
    }
    let profile = {};
    try {
      const snap = await db.collection("users").doc(u.uid).get();
      if (snap.exists) profile = snap.data();
    } catch (e) { console.warn(e); }
    if (!profile.name && fresh && fresh.email === String(u.email || "").toLowerCase()) profile = fresh;
    QBA.setCloudUser({
      uid: u.uid, email: u.email,
      name: profile.name || u.displayName || (u.email || "?").split("@")[0],
      cls: profile.cls || "", created: profile.created || u.metadata.creationTime || new Date().toISOString(),
    }, rememberedPersistence());
    set({ user: { uid: u.uid, email: u.email } });
    await sync();
  }

  function rememberedPersistence() {
    try { return localStorage.getItem("qb-cloud-remember") !== "0"; } catch { return true; }
  }

  function attempts(uid) {
    return db.collection("users").doc(uid).collection("attempts");
  }

  function clean(rec) {
    const { pending, ...rest } = rec;
    return JSON.parse(JSON.stringify(rest)); // undefined alanları at
  }

  // Buluttaki geçmişi indir, bekleyenleri gönder
  async function sync() {
    const u = auth && auth.currentUser;
    if (!u) return;
    set({ sync: "syncing", error: "" });
    try {
      const snap = await attempts(u.uid).orderBy("at", "desc").get();
      QBA.replaceCloudHistory(snap.docs.map((d) => d.data()));
      await push();
    } catch (e) {
      console.warn(e);
      set({ sync: navigator.onLine === false || e.code === "unavailable" ? "offline" : "error", error: e.code || e.message });
    }
  }

  async function push() {
    const u = auth && auth.currentUser;
    if (!u) return;
    const pending = QBA.pendingAttempts();
    if (!pending.length) { set({ sync: "synced", error: "" }); return; }
    set({ sync: "syncing", error: "" });
    try {
      for (let i = 0; i < pending.length; i += 400) {
        const batch = db.batch();
        for (const rec of pending.slice(i, i + 400)) batch.set(attempts(u.uid).doc(rec.id), clean(rec));
        await batch.commit();
      }
      QBA.markSynced(pending.map((r) => r.id));
      set({ sync: "synced", error: "" });
    } catch (e) {
      console.warn(e);
      set({ sync: navigator.onLine === false || e.code === "unavailable" ? "offline" : "error", error: e.code || e.message });
    }
  }

  async function remove(id) {
    const u = auth && auth.currentUser;
    if (!u) return;
    try { await attempts(u.uid).doc(id).delete(); }
    catch (e) { console.warn(e); set({ sync: "error", error: e.code || e.message }); }
  }

  // --- Hesap işlemleri ----------------------------------------------------------------
  async function setPersistence(remember) {
    try { localStorage.setItem("qb-cloud-remember", remember ? "1" : "0"); } catch { /* yok say */ }
    await auth.setPersistence(remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
  }

  async function signUp({ name, cls, email, password, remember }) {
    await init();
    await setPersistence(remember);
    name = String(name).trim();
    cls = String(cls || "").trim();
    const now = new Date().toISOString();
    fresh = { email: String(email).trim().toLowerCase(), name, cls, created: now };
    const cred = await auth.createUserWithEmailAndPassword(String(email).trim(), password);
    try { await cred.user.updateProfile({ displayName: name }); } catch (e) { console.warn(e); }
    await db.collection("users").doc(cred.user.uid).set({ name, cls, created: now, updated: now });
    QBA.setCloudUser({ uid: cred.user.uid, email: cred.user.email, name, cls, created: now }, remember);
    emit();
  }

  async function signIn({ email, password, remember }) {
    await init();
    await setPersistence(remember);
    await auth.signInWithEmailAndPassword(String(email).trim(), password);
  }

  async function resetPassword(email) {
    await init();
    auth.languageCode = (globalThis.UI && UI.lang) || "tr";
    await auth.sendPasswordResetEmail(String(email).trim());
  }

  // Ara sunucuya (asistan) kimlik kanıtı: Firebase ID belgesi (gerekirse yenilenir)
  async function idToken() {
    await init();
    const u = auth.currentUser;
    return u ? u.getIdToken() : null;
  }

  async function signOut() {
    await init();
    await auth.signOut();
  }

  // Hesabı ve tüm verileri kalıcı olarak siler (güvenlik için şifre tekrar istenir)
  async function deleteAccount(password) {
    await init();
    const u = auth.currentUser;
    if (!u) return;
    const cred = firebase.auth.EmailAuthProvider.credential(u.email, password);
    await u.reauthenticateWithCredential(cred);
    const snap = await attempts(u.uid).get();
    for (let i = 0; i < snap.docs.length; i += 400) {
      const batch = db.batch();
      snap.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
    await db.collection("users").doc(u.uid).delete();
    await u.delete();
  }

  // Firebase hata kodu → i18n anahtarı
  function errorKey(e) {
    const c = (e && e.code) || "";
    if (["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found", "auth/invalid-login-credentials"].includes(c)) return "errInvalid";
    if (c === "auth/email-already-in-use") return "errExists";
    if (c === "auth/weak-password") return "errWeak";
    if (c === "auth/invalid-email" || c === "auth/missing-email") return "errEmail";
    if (c === "auth/too-many-requests") return "errMany";
    if (c === "auth/network-request-failed" || c === "unavailable" || c === "qb/load") return "errNetwork";
    if (c === "auth/operation-not-allowed" || c === "auth/configuration-not-found") return "errDisabled";
    if (c === "auth/unauthorized-domain") return "errDomain";
    if (c === "permission-denied") return "errPerm";
    if (c === "auth/requires-recent-login") return "errRecent";
    return "errGeneric";
  }

  globalThis.QBC = {
    state,
    init,
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    sync, push, remove,
    signUp, signIn, signOut, resetPassword, deleteAccount, idToken,
    errorKey,
  };
})();
