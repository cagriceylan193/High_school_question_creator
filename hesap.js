// Hesap sayfası: e-posta ile (bulut) ve e-postasız (bu cihaz) hesaplar,
// istatistikler, sınav geçmişi, inceleme, PDF, yedek, aktarım
(function () {
  "use strict";
  const { t, el } = UI;
  const $ = (id) => document.getElementById(id);

  let pendingId = null;          // PIN bekleyen yerel hesap
  const open = new Set();        // açık incelemeler
  let cloudMode = "login";       // login | register | reset

  if (!QBA.available()) $("noStorage").hidden = false;

  function render() {
    const u = QBA.current();
    $("guest").hidden = !!u;
    $("member").hidden = !u;
    if (u) renderMember(u); else renderGuest();
    UI.applyStatic(); // menüdeki baş harf
  }

  function msg(elm, text, kind) {
    elm.textContent = text || "";
    elm.className = "small" + (kind ? " " + kind : "");
  }
  function errText(e) {
    const key = QBC.errorKey(e);
    return t(key, { code: (e && (e.code || e.message)) || "?" });
  }
  async function busy(form, fn) {
    const btns = form.querySelectorAll("button");
    btns.forEach((b) => { b.disabled = true; });
    try { await fn(); } finally { btns.forEach((b) => { b.disabled = false; }); }
  }

  // --- E-posta ile giriş / kayıt / şifre sıfırlama -------------------------------------
  function setCloudMode(m) {
    cloudMode = m;
    $("tabLogin").setAttribute("aria-selected", m === "login");
    $("tabRegister").setAttribute("aria-selected", m === "register");
    $("loginForm").hidden = m !== "login";
    $("registerForm").hidden = m !== "register";
    $("resetForm").hidden = m !== "reset";
    msg($("cloudMsg"), "");
  }
  $("tabLogin").addEventListener("click", () => setCloudMode("login"));
  $("tabRegister").addEventListener("click", () => setCloudMode("register"));
  $("forgotBtn").addEventListener("click", () => { $("rsEmail").value = $("liEmail").value; setCloudMode("reset"); });
  $("resetBack").addEventListener("click", () => setCloudMode("login"));

  $("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    busy(e.target, async () => {
      msg($("cloudMsg"), t("cloudLoading"), "muted");
      try {
        await QBC.signIn({ email: $("liEmail").value, password: $("liPass").value, remember: $("liRemember").checked });
        $("liPass").value = "";
        msg($("cloudMsg"), "");
      } catch (err) { msg($("cloudMsg"), errText(err), "error"); }
    });
  });

  $("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!$("reConsent").checked) { msg($("cloudMsg"), t("consentRequired"), "error"); return; }
    if ($("rePass").value.length < 6) { msg($("cloudMsg"), t("errWeak"), "error"); return; }
    busy(e.target, async () => {
      msg($("cloudMsg"), t("cloudLoading"), "muted");
      try {
        await QBC.signUp({ name: $("reName").value, cls: $("reClass").value, email: $("reEmail").value,
          password: $("rePass").value, remember: $("reRemember").checked });
        e.target.reset();
        msg($("cloudMsg"), "");
        render();
      } catch (err) { msg($("cloudMsg"), errText(err), "error"); }
    });
  });

  $("resetForm").addEventListener("submit", (e) => {
    e.preventDefault();
    busy(e.target, async () => {
      try {
        await QBC.resetPassword($("rsEmail").value);
        msg($("cloudMsg"), t("resetSent", { email: $("rsEmail").value.trim() }), "ok");
      } catch (err) { msg($("cloudMsg"), errText(err), "error"); }
    });
  });

  // --- E-postasız (bu cihaz) hesaplar ------------------------------------------------
  function renderGuest() {
    if (!QBC.state.available) {
      $("cloudPanel").hidden = true;
      $("localPanel").open = true;
    }
    const box = $("profiles");
    box.innerHTML = "";
    const list = QBA.list();
    $("noProfiles").hidden = list.length > 0;
    if (list.length) $("localPanel").open = true;
    for (const u of list) {
      box.append(el("button", { type: "button", class: "profile", onclick: () => pick(u) },
        el("span", { class: "avatar", "aria-hidden": "true" }, initial(u.name)),
        el("span", { class: "profile-name" }, u.name, u.cls ? el("span", { class: "muted small" }, " · " + u.cls) : null),
        QBA.hasPin(u.id) ? el("span", { class: "lock small muted" }, "PIN") : null));
    }
    $("pinForm").hidden = !pendingId;
  }

  function pick(u) {
    if (!QBA.hasPin(u.id)) { QBA.login(u.id); render(); return; }
    pendingId = u.id;
    $("pinLabel").textContent = t("accPinFor", { name: u.name });
    $("pinError").textContent = "";
    $("pinInput").value = "";
    $("pinForm").hidden = false;
    $("pinInput").focus();
  }

  $("pinForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (QBA.login(pendingId, $("pinInput").value.trim())) { pendingId = null; render(); }
    else { $("pinError").textContent = t("accWrongPin"); $("pinInput").select(); }
  });
  $("pinCancel").addEventListener("click", () => { pendingId = null; $("pinForm").hidden = true; });

  $("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const pin = $("suPin").value.trim();
    if (pin && !/^\d{4}$/.test(pin)) { $("suError").textContent = t("accPinInvalid"); return; }
    const u = QBA.create({ name: $("suName").value, cls: $("suClass").value, pin });
    if (!u) { $("suError").textContent = t("accCreateError"); return; }
    $("suError").textContent = "";
    e.target.reset();
    render();
  });

  // --- Üye görünümü -------------------------------------------------------------------
  const initial = (name) => String(name || "?").trim().charAt(0).toLocaleUpperCase("tr-TR");

  function renderMember(u) {
    $("avatar").textContent = initial(u.name);
    $("pName").textContent = u.name;
    $("pMeta").textContent = [u.cls, t("accMemberSince", { date: UI.formatDate(u.created) })].filter(Boolean).join(" · ");
    $("pType").textContent = u.cloud ? t("accTypeCloud", { email: u.email }) : t("accTypeLocal");
    $("pType").className = "small acc-type " + (u.cloud ? "cloud" : "local");
    $("storageNote").textContent = u.cloud ? t("cloudNote") : t("accLocalNote");
    renderSync();

    // E-postasız hesaptan e-posta hesabına geçiş önerisi
    $("upgradePanel").hidden = u.cloud || !QBC.state.available;

    // Bulut hesabındayken bu cihazdaki e-postasız hesapların sınavlarını aktar
    const have = new Set(u.history.map((a) => a.id));
    const locals = u.cloud ? QBA.list().filter((x) => x.history.some((a) => !have.has(a.id))) : [];
    $("migratePanel").hidden = !locals.length;
    const ml = $("migrateList");
    ml.innerHTML = "";
    for (const lu of locals) {
      const b = el("button", { type: "button" }, t("migrateBtn"));
      b.addEventListener("click", () => {
        if (QBA.hasPin(lu.id) && !QBA.checkPin(lu.id, prompt(t("accPinFor", { name: lu.name })) || "")) { msg($("migrateMsg"), t("accWrongPin"), "error"); return; }
        const n = QBA.copyFromLocal(lu.id);
        msg($("migrateMsg"), t("migrated", { n }), "ok");
        render();
      });
      ml.append(el("div", { class: "profile static" },
        el("span", { class: "avatar", "aria-hidden": "true" }, initial(lu.name)),
        el("span", { class: "profile-name" }, t("migrateItem", { name: lu.name, n: lu.history.length })), b));
    }

    // Özet
    const h = u.history;
    const asked = h.reduce((s, a) => s + (a.total || 0), 0);
    const right = h.reduce((s, a) => s + (a.score || 0), 0);
    const rate = asked ? Math.round((right / asked) * 100) : null;
    const pctFmt = (r) => new Intl.NumberFormat({ tr: "tr-TR", en: "en-GB", de: "de-DE" }[UI.lang] || "tr-TR", { style: "percent" }).format(r / 100);
    $("stats").innerHTML = "";
    [[t("accStatExams"), String(h.length)], [t("accStatQuestions"), String(asked)], [t("accStatRate"), rate === null ? "–" : pctFmt(rate)]]
      .forEach(([k, v]) => $("stats").append(el("div", { class: "stat" }, el("span", { class: "stat-label" }, k), el("b", {}, v))));

    renderTopicBars(h);
    renderHistory(h);

    const delAcc = confirmButton(t("accDeleteAccount"), () => {
      if (u.cloud) { $("deleteCloudForm").hidden = false; $("dcPass").focus(); return; }
      QBA.deleteAccount(); open.clear(); render();
    }, "danger");
    delAcc.id = "deleteAcc";
    $("deleteAcc").replaceWith(delAcc);
  }

  function renderSync() {
    const u = QBA.current();
    const box = $("syncStatus");
    if (!u || !u.cloud) { box.hidden = true; return; }
    const s = QBC.state;
    const pending = QBA.pendingAttempts().length;
    let text = "", cls = "muted";
    if (!s.ready || s.sync === "syncing") text = t("syncing");
    else if (s.sync === "offline") { text = t("syncOffline"); cls = "warn"; }
    else if (s.sync === "error") { text = t("syncError", { msg: errText({ code: s.error }) }); cls = "error"; }
    else if (pending) text = t("syncing");
    else { text = t("synced"); cls = "ok"; }
    box.hidden = false;
    box.textContent = text;
    box.className = "sync small " + cls;
  }

  function rateClass(r) {
    return r >= 70 ? "good" : r >= 40 ? "mid" : "low";
  }

  function renderTopicBars(history) {
    const box = $("topicBars");
    box.innerHTML = "";
    const agg = {};
    for (const a of history) {
      a.ids.forEach((id, i) => {
        const tpl = QB.templates.find((x) => x.id === id);
        if (!tpl) return;
        const k = QB.topicOf(tpl);
        agg[k] = agg[k] || { n: 0, ok: 0 };
        agg[k].n++;
        if (a.ok && a.ok[i]) agg[k].ok++;
      });
    }
    const order = Object.keys(QB_I18N.tr.topics || {});
    const keys = Object.keys(agg).sort((x, y) => (order.indexOf(x) + 1 || 99) - (order.indexOf(y) + 1 || 99));
    if (!keys.length) { box.append(el("p", { class: "muted small" }, t("accByTopicEmpty"))); return; }
    // Düzeltilmemiş yanlışlar: aynı kalıplardan yeni sayılarla soru
    const all = QB.mistakeIds(history);
    const tip = el("div", { class: "retry-box" });
    if (all.length) {
      tip.append(el("p", {}, t("retryCount", { n: all.length })),
        el("a", { class: "button primary", href: "sorular.html?tekrar=1&n=" + Math.min(all.length, 10) }, t("retryBtn")));
    } else tip.append(el("p", { class: "muted small" }, t("retryAllDone")));
    box.append(tip);
    for (const k of keys) {
      const { n, ok } = agg[k];
      const r = Math.round((ok / n) * 100);
      const open = QB.mistakeIds(history, [k]).length;
      const act = open
        ? el("a", { class: "bar-act", href: "sorular.html?tekrar=1&konu=" + encodeURIComponent(k) }, t("retryTopic", { n: open }))
        : r < 70 ? el("a", { class: "bar-act", href: "sorular.html?konu=" + encodeURIComponent(k) }, t("practiceTopic")) : el("span", { class: "bar-act" });
      box.append(el("div", { class: "bar-row" + (r < 50 ? " weak" : "") },
        el("span", { class: "bar-name" }, UI.topicName(k)),
        el("span", { class: "bar-track" }, el("span", { class: "bar-fill " + rateClass(r), style: `width:${Math.max(r, 2)}%` })),
        el("span", { class: "bar-val" }, `${ok}/${n}`),
        act));
    }
  }

  // Kayıttan soruları yeniden üret (aynı tohum → aynı sayılar)
  function rebuild(att) {
    return att.ids.map((id) => {
      const tpl = QB.templates.find((x) => x.id === id);
      if (!tpl) return { tpl: { id }, error: t("accRemoved") };
      try { return QB.generate(tpl, att.seed); } catch (e) { return { tpl, error: e.message }; }
    });
  }

  function confirmButton(label, onConfirm, cls) {
    const b = el("button", { type: "button", class: cls || "" }, label);
    let armed = null;
    b.addEventListener("click", () => {
      if (armed) { clearTimeout(armed); armed = null; b.textContent = label; b.classList.remove("armed"); onConfirm(); return; }
      b.textContent = t("accConfirm");
      b.classList.add("armed");
      armed = setTimeout(() => { armed = null; b.textContent = label; b.classList.remove("armed"); }, 4000);
    });
    return b;
  }

  function renderHistory(history) {
    const list = $("history");
    list.innerHTML = "";
    $("histEmpty").hidden = history.length > 0;
    $("histCount").textContent = history.length ? t("accHistCount", { n: history.length }) : "";
    const lang = UI.lang;

    for (const att of history) {
      const pct = att.total ? Math.round((att.score / att.total) * 100) : 0;
      const topics = att.topics && att.topics.length ? att.topics.map(UI.topicName).join(", ") : t("allSubjects");
      const levels = att.levels && att.levels.length ? " · " + att.levels.map(UI.levelName).join(", ") : "";

      // Açık uçlu soru varsa puanı da göster
      let pointsLine = null;
      if (att.ids.some((id) => (QB.templates.find((x) => x.id === id) || {}).parts)) {
        const items = rebuild(att);
        let pts = 0, max = 0;
        items.forEach((inst, qi) => { if (!inst.error) { pts += QB.pointsOf(inst, att.resp[qi]); max += QB.maxPoints(inst); } });
        pointsLine = el("span", { class: "small" }, t("pointsTotal", { p: pts, m: max }));
      }

      const li = el("li", { class: "hist-item" });
      const review = el("div", { class: "hist-review" });
      review.hidden = !open.has(att.id);

      const reviewBtn = el("button", { type: "button" }, t(open.has(att.id) ? "accHide" : "accReview"));
      reviewBtn.addEventListener("click", () => {
        if (open.has(att.id)) open.delete(att.id); else open.add(att.id);
        renderHistory(QBA.current().history);
      });

      const pdfBtn = el("button", { type: "button" }, t("pdfDownload"));
      QBPDF.bindButton(pdfBtn, () => ({
        sheets: [{ student: att.student, code: att.code, date: att.at, items: rebuild(att), responses: att.resp, checked: true }],
        includeKey: false,
        filename: `${QBPDF.slug(att.student)}_${QBPDF.slug(att.code)}_${String(att.at).slice(0, 10)}.pdf`,
      }), $("pdfStatus"));

      const del = confirmButton(t("accDelete"), () => { QBA.deleteAttempt(att.id); open.delete(att.id); render(); }, "danger");

      li.append(
        el("div", { class: "hist-main" },
          el("div", { class: "hist-info" },
            el("span", { class: "hist-date" }, UI.formatDate(att.at, true)),
            el("span", { class: "hist-code" }, att.code),
            el("span", { class: "muted small" }, topics + levels),
            pointsLine,
            att.pending ? el("span", { class: "pending small" }, t("pendingTag")) : null),
          el("span", { class: "hist-score " + rateClass(pct) }, `${att.score}/${att.total}`)),
        el("div", { class: "actions" }, reviewBtn, pdfBtn, del),
        review);

      if (open.has(att.id)) {
        const ol = el("ol", { class: "questions" });
        rebuild(att).forEach((inst, qi) => ol.append(UI.questionCard(inst, qi, lang, {
          resp: att.resp[qi], checked: true, locked: true, name: `h${att.id}q${qi}`,
        })));
        review.append(ol);
      }
      list.append(li);
    }
  }

  $("logout").addEventListener("click", async () => {
    open.clear();
    if (QBA.isCloud()) { try { await QBC.signOut(); } catch (e) { console.warn(e); } }
    QBA.logout();
    render();
  });

  $("upgradeBtn").addEventListener("click", () => {
    QBA.logout();
    render();
    setCloudMode("register");
    $("reName").focus();
  });

  // Bulut hesabını sil (şifre ister)
  $("dcCancel").addEventListener("click", () => { $("deleteCloudForm").hidden = true; });
  $("deleteCloudForm").addEventListener("submit", (e) => {
    e.preventDefault();
    busy(e.target, async () => {
      try {
        await QBC.deleteAccount($("dcPass").value);
        $("dcPass").value = "";
        $("deleteCloudForm").hidden = true;
        QBA.clearCloudUser();
        render();
        msg($("cloudMsg"), t("deleted"), "ok");
      } catch (err) { msg($("dataMsg"), errText(err), "error"); }
    });
  });

  // --- Yedek -----------------------------------------------------------------------------
  $("backupBtn").addEventListener("click", () => {
    const json = QBA.exportCurrent();
    if (!json) return;
    const u = QBA.current();
    const a = el("a", {
      href: URL.createObjectURL(new Blob([json], { type: "application/json" })),
      download: `soru-ureteci-yedek_${QBPDF.slug(u.name)}_${new Date().toISOString().slice(0, 10)}.json`,
    });
    document.body.append(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  });

  function restoreFrom(input, msgEl) {
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const n = QBA.importBackup(String(reader.result));
        input.value = "";
        if (n < 0) { msg(msgEl, t("accRestoreError"), "error"); return; }
        render();
        msg(QBA.current() ? $("dataMsg") : msgEl, t("accRestored", { n }), "ok");
      };
      reader.readAsText(file);
    });
  }
  restoreFrom($("restoreGuest"), $("restoreGuestMsg"));
  restoreFrom($("restoreMember"), $("dataMsg"));

  // --- Başlat ---------------------------------------------------------------------------
  QBC.onChange(() => render());
  UI.onLang(render);
  render();
  if (QBC.state.available) {
    QBC.init().catch((e) => {
      console.warn(e);
      msg($("cloudMsg"), t("cloudUnavailable"), "error");
      if (QBA.isCloud()) renderSync();
    });
  }
})();
