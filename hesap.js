// Hesap sayfası: giriş/kayıt, istatistikler, sınav geçmişi, inceleme, PDF, yedek
(function () {
  "use strict";
  const { t, el } = UI;
  const $ = (id) => document.getElementById(id);

  let pendingId = null;          // PIN bekleyen hesap
  const open = new Set();        // açık incelemeler

  if (!QBA.available()) $("noStorage").hidden = false;

  function render() {
    const u = QBA.current();
    $("guest").hidden = !!u;
    $("member").hidden = !u;
    if (u) renderMember(u); else renderGuest();
    UI.applyStatic(); // menüdeki baş harfi güncelle
  }

  // --- Giriş / kayıt --------------------------------------------------------------
  function renderGuest() {
    const box = $("profiles");
    box.innerHTML = "";
    const list = QBA.list();
    $("noProfiles").hidden = list.length > 0;
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

    // Özet
    const h = u.history;
    const asked = h.reduce((s, a) => s + (a.total || 0), 0);
    const right = h.reduce((s, a) => s + (a.score || 0), 0);
    const rate = asked ? Math.round((right / asked) * 100) : null;
    $("stats").innerHTML = "";
    const pctFmt = (r) => new Intl.NumberFormat({ tr: "tr-TR", en: "en-GB", de: "de-DE" }[UI.lang] || "tr-TR", { style: "percent" }).format(r / 100);
    [[t("accStatExams"), String(h.length)], [t("accStatQuestions"), String(asked)], [t("accStatRate"), rate === null ? "–" : pctFmt(rate)]]
      .forEach(([k, v]) => $("stats").append(el("div", { class: "stat" }, el("span", { class: "stat-label" }, k), el("b", {}, v))));

    renderTopicBars(h);
    renderHistory(h);

    const delAcc = confirmButton(t("accDeleteAccount"), () => { QBA.deleteAccount(); open.clear(); render(); }, "danger");
    delAcc.id = "deleteAcc";
    $("deleteAcc").replaceWith(delAcc);
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
    for (const k of keys) {
      const { n, ok } = agg[k];
      const r = Math.round((ok / n) * 100);
      box.append(el("div", { class: "bar-row" },
        el("span", { class: "bar-name" }, UI.topicName(k)),
        el("span", { class: "bar-track" }, el("span", { class: "bar-fill " + rateClass(r), style: `width:${Math.max(r, 2)}%` })),
        el("span", { class: "bar-val" }, `${ok}/${n}`)));
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
      if (armed) { clearTimeout(armed); onConfirm(); return; }
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
            el("span", { class: "muted small" }, topics + levels)),
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

  $("logout").addEventListener("click", () => { QBA.logout(); open.clear(); render(); });

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
        if (n < 0) { msgEl.textContent = t("accRestoreError"); msgEl.className = "small error"; return; }
        render();
        const target = QBA.current() ? $("dataMsg") : msgEl;
        target.textContent = t("accRestored", { n });
        target.className = "small ok";
      };
      reader.readAsText(file);
    });
  }
  restoreFrom($("restoreGuest"), $("restoreGuestMsg"));
  restoreFrom($("restoreMember"), $("dataMsg"));

  UI.onLang(render);
  render();
})();
