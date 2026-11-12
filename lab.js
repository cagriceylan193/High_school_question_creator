// Laboratuvar sayfası: deney listesi ve deney görünümü (#deney-kimligi)
(function () {
  "use strict";
  const { t, el } = UI;
  const root = document.getElementById("labRoot");

  function list() {
    QBL.unmount();
    root.innerHTML = "";
    document.title = t("labTitle") + " · " + t("appName");
    const grid = el("div", { class: "lab-list" });
    for (const def of QBL.experiments) {
      const n = QBL.countData(def);
      grid.append(el("a", { class: "lab-card", href: "#" + def.id },
        el("span", { class: "lab-card-kicker" }, QBL.tx(def, "kicker")),
        el("span", { class: "lab-card-title" }, QBL.tx(def, "title")),
        el("span", { class: "muted small" }, QBL.tx(def, "short")),
        el("span", { class: "lab-card-meta small" }, [QBL.tx(def, "tools"), n ? t("labHasData", { n }) : null].filter(Boolean).join(" · "))));
    }
    root.append(
      el("div", { class: "page-head" }, el("h1", {}, t("labTitle")), el("p", { class: "lead" }, t("labLead"))),
      grid,
      el("p", { class: "muted small lab-credit" }, t("labCredit")));
  }

  function route(scroll) {
    const id = decodeURIComponent(location.hash.slice(1));
    const def = id && QBL.find(id);
    if (def) {
      document.title = QBL.tx(def, "title") + " · " + t("labTitle");
      QBL.mount(root, def);
    } else list();
    if (scroll) window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", () => route(true));
  UI.onLang(() => route(false));
  route(false);
})();
