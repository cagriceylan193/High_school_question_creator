#!/usr/bin/env node
// Şablon denetleyici: tüm soru şablonlarını yükler ve her birinden çok sayıda
// soru üretip hata arar.  Kullanım:  node tools/check.js
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SAMPLES = 300;

const ctx = vm.createContext({ console });
const load = (rel) => vm.runInContext(fs.readFileSync(path.join(ROOT, rel), "utf8"), ctx, { filename: rel });

load("config.js");
load("i18n.js");
load("faq.js");
load("engine.js");
load("figures.js");

const qFiles = fs.readdirSync(path.join(ROOT, "questions")).filter((f) => f.endsWith(".js")).sort();
for (const f of qFiles) load("questions/" + f);

const QB = ctx.QB;
const errors = [];
const warnings = [];

// 1) Soru dosyaları her iki HTML sayfasında da yüklenmeli.
for (const page of ["index.html", "sorular.html", "ogretmen.html", "hesap.html"]) {
  const html = fs.readFileSync(path.join(ROOT, page), "utf8");
  for (const f of qFiles) {
    if (!html.includes(`src="questions/${f}"`)) errors.push(`${page}: <script src="questions/${f}"></script> satırı eksik`);
  }
  if (!html.includes('src="figures.js"')) errors.push(`${page}: <script src="figures.js"></script> satırı eksik`);
}

// 2) Yükleme sırasında reddedilen şablonlar.
for (const p of QB.problems) errors.push(`${p.id}: ${p.message}`);

// 3) Arayüz metinleri her dilde olmalı.
const I18N = ctx.QB_I18N;
for (const l of QB.LANGS) {
  if (!I18N[l]) { errors.push(`i18n.js: '${l}' dili yok`); continue; }
  for (const k of Object.keys(I18N.tr)) if (!(k in I18N[l])) errors.push(`i18n.js: '${l}' dilinde '${k}' metni yok`);
  if (!QB.NAMES[l]) errors.push(`engine.js: '${l}' için isim listesi yok`);
}

// 4) Her şablondan çok sayıda soru üret.
for (const tpl of QB.templates) {
  if (tpl.subject && !I18N.tr.subjects[tpl.subject]) warnings.push(`${tpl.id}: '${tpl.subject}' dersi i18n.js'de tanımlı değil`);
  for (const sk of tpl.skills || []) if (!(I18N.tr.skills || {})[sk]) errors.push(`${tpl.id}: '${sk}' becerisi i18n.js'de tanımlı değil`);
  if (tpl.topic) for (const l of QB.LANGS) {
    if (!(I18N[l] && I18N[l].topics && I18N[l].topics[tpl.topic])) errors.push(`${tpl.id}: '${tpl.topic}' konusu i18n.js'de '${l}' dilinde tanımlı değil`);
  }
  let shortChoices = 0;
  const answers = new Set();
  for (let i = 0; i < SAMPLES; i++) {
    let inst;
    try {
      inst = QB.generate(tpl, "kontrol-" + i);
    } catch (e) {
      errors.push(`${tpl.id}: ${e.message}`);
      break;
    }
    answers.add(inst.answer);
    for (const l of QB.LANGS) {
      try {
        const txt = QB.render(inst, l);
        if (/[{}]/.test(txt)) errors.push(`${tpl.id} (${l}): metinde çözülmemiş süslü parantez var: ${txt}`);
        if (/NaN|Infinity|∞|undefined/.test(txt)) errors.push(`${tpl.id} (${l}): metinde geçersiz değer: ${txt.slice(0, 200)}`);
        if (tpl.figure && !txt.includes("<svg")) errors.push(`${tpl.id} (${l}): şekil çizilemedi`);
        if (inst.type === "yazili") {
          const bits = [];
          inst.tpl.parts.forEach((pt, i) => {
            bits.push(QB.partText(inst, i, l), QB.partAnswer(inst, i, l));
            if (pt.kind === "select") bits.push(...QB.partOptions(inst, i, l));
            if (pt.kind === "text") { bits.push(QB.partModel(inst, i, l)); QB.partRubric(inst, i, l).forEach((r) => bits.push(r.text)); }
          });
          for (const b of bits) {
            if (/[{}]/.test(b)) errors.push(`${tpl.id} (${l}): bölümde çözülmemiş süslü parantez: ${b.slice(0, 120)}`);
            if (/NaN|Infinity|undefined/.test(b)) errors.push(`${tpl.id} (${l}): bölümde geçersiz değer: ${b.slice(0, 120)}`);
          }
          // Doğru cevaplar + tüm ölçütler işaretli → tam puan
          const resp = { p: inst.parts.map((p, i) => (p.kind === "number" ? QB.formatNum(p.answer, p.d, l) : p.kind === "select" ? p.answer : "x")), s: {} };
          inst.tpl.parts.forEach((pt, i) => { if (pt.kind === "text") resp.s[String(i)] = pt.rubric.map(() => true); });
          if (QB.pointsOf(inst, resp) !== QB.maxPoints(inst)) errors.push(`${tpl.id} (${l}): doğru cevaplarla tam puan alınamıyor (${QB.pointsOf(inst, resp)}/${QB.maxPoints(inst)})`);
        }
        // Adım adım çözüm: her sayısal/seçmeli madde ve her test/kısa cevap sorusu için
        const sols = inst.type === "yazili"
          ? inst.tpl.parts.map((pt, i) => (pt.kind === "text" ? "-" : QB.partSolution(inst, i, l)))
          : QB.solutionSteps(inst, l);
        if (!sols.length || sols.some((x) => !x)) errors.push(`${tpl.id} (${l}): adım adım çözüm eksik (questions/cozumler.js)`);
        for (const b of sols) {
          if (/[{}]/.test(b)) errors.push(`${tpl.id} (${l}): çözümde çözülmemiş süslü parantez: ${b.slice(0, 160)}`);
          if (/NaN|Infinity|undefined|\?(?= |$)/.test(b.replace(/\?\s*$/, ""))) errors.push(`${tpl.id} (${l}): çözümde geçersiz değer: ${b.slice(0, 160)}`);
        }
        if (inst.choices) inst.choices.forEach((c, ci) => {
          const ct = QB.choiceText(inst, ci, l);
          if (!ct || /NaN|undefined/.test(ct)) errors.push(`${tpl.id} (${l}): ${ci + 1}. şık geçersiz: ${ct}`);
        });
      } catch (e) {
        errors.push(`${tpl.id} (${l}): ${e.message}`);
      }
    }
    if (inst.choices) {
      const want = tpl.choices ?? ctx.QB_CONFIG.choiceCount ?? 5;
      if (inst.choices.length < want) shortChoices++;
      if (inst.choices.filter((c) => c.correct).length !== 1) errors.push(`${tpl.id}: doğru şık sayısı 1 değil`);
    }
    if (errors.length > 200) break;
  }
  if (shortChoices) warnings.push(`${tpl.id}: ${SAMPLES} sorunun ${shortChoices} tanesinde şık sayısı eksik kaldı`);
  if (answers.size < 5 && ["mc", "open"].includes(QB.kindOf(tpl))) warnings.push(`${tpl.id}: yalnızca ${answers.size} farklı cevap üretiliyor; öğrenciler arasında çeşitlilik az`);
}

// 4a) Çözüm dosyasındaki her kimlik bir şablona ait olmalı ve her dilde aynı sayıda adım içermeli.
for (const [id, sol] of Object.entries(QB.SOLUTIONS)) {
  const tpl = QB.templates.find((t) => t.id === id);
  if (!tpl) { errors.push(`cozumler.js: '${id}' adında şablon yok`); continue; }
  if (sol.tr) for (const l of QB.LANGS) {
    if (!Array.isArray(sol[l])) errors.push(`cozumler.js: '${id}' için '${l}' adımları yok`);
    else if (sol[l].length !== sol.tr.length) errors.push(`cozumler.js: '${id}' — '${l}' adım sayısı (${sol[l].length}) Türkçeden (${sol.tr.length}) farklı`);
  }
  if (sol.parts) for (const [i, txt] of Object.entries(sol.parts)) {
    if (!tpl.parts || !tpl.parts[i]) errors.push(`cozumler.js: '${id}' şablonunda ${i}. madde yok`);
    for (const l of QB.LANGS) if (!txt[l]) errors.push(`cozumler.js: '${id}' ${i}. madde için '${l}' çözümü yok`);
  }
}

// 4c) Her fizik şablonunun Maarif sınıfı questions/_mufredat.js'te verilmeli (0 = programda yok).
for (const tpl of QB.templates) {
  if (tpl.subject !== "fizik") continue;
  if (!Object.prototype.hasOwnProperty.call(QB.CURRICULUM, tpl.id)) errors.push(`_mufredat.js: '${tpl.id}' şablonunun Maarif sınıfı yok`);
  else if (![0, 9, 10, 11, 12].includes(QB.CURRICULUM[tpl.id])) errors.push(`_mufredat.js: '${tpl.id}' için sınıf 0, 9, 10, 11 veya 12 olmalı`);
}
for (const id of Object.keys(QB.CURRICULUM)) if (!QB.templates.some((t) => t.id === id)) errors.push(`_mufredat.js: '${id}' adında şablon yok`);

// 4b) SSS her dilde aynı sayıda soru içermeli.
const FAQ = ctx.QB_FAQ;
for (const l of QB.LANGS) {
  if (!FAQ[l]) errors.push(`faq.js: '${l}' dili yok`);
  else if (FAQ[l].length !== FAQ.tr.length) errors.push(`faq.js: '${l}' dilinde ${FAQ[l].length} soru var, Türkçede ${FAQ.tr.length}`);
}

// 5) Cevap okuma testleri.
const parseCases = [["1,5", 1.5], ["1.5", 1.5], ["3/4", 0.75], ["-2", -2], ["1.234,5", 1234.5], ["2^3", 8], ["abc", NaN]];
for (const [s, want] of parseCases) {
  const got = QB.parseAnswer(s);
  if (!(Object.is(got, want) || Math.abs(got - want) < 1e-12)) errors.push(`parseAnswer("${s}") = ${got}, beklenen ${want}`);
}

// 6) Aynı öğrenci + kod → aynı sınav; farklı öğrenci → farklı sayılar.
if (QB.templates.length) {
  const a = JSON.stringify(QB.buildExam({ student: "Ayşe Demir", code: "X", count: 5 }).map((i) => i.answer));
  const b = JSON.stringify(QB.buildExam({ student: "  ayşe   demir ", code: "x", count: 5 }).map((i) => i.answer));
  if (a !== b) errors.push("Aynı öğrenci için sınav tekrarlanabilir değil");
}

// 7) Sanal laboratuvar: deney metinleri her dilde, sayfada yüklü, fizik doğrulama testleri geçiyor.
let labSummary = "";
{
  const I18N = ctx.QB_I18N;
  const labCtx = vm.createContext({ console, Intl, UI: { lang: "tr", t: (k) => (I18N.tr[k] ?? k) } });
  const loadLab = (rel) => vm.runInContext(fs.readFileSync(path.join(ROOT, rel), "utf8"), labCtx, { filename: rel });
  ["lab/core.js", "lab/draw.js", "lab/gauge.js"].forEach(loadLab);
  const QBL = labCtx.QBL;
  const expFiles = fs.readdirSync(path.join(ROOT, "lab")).filter((f) => /^exp-.*\.js$/.test(f)).sort();
  const labHtml = fs.readFileSync(path.join(ROOT, "laboratuvar.html"), "utf8");
  const keysOf = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
  let tests = 0;
  for (const f of expFiles) {
    if (!labHtml.includes(`src="lab/${f}"`)) errors.push(`laboratuvar.html: <script src="lab/${f}"></script> satırı eksik`);
    const before = new Set(QBL.experiments.map((d) => d.id));
    loadLab("lab/" + f);
    const def = QBL.experiments.find((d) => !before.has(d.id));
    if (!def) { errors.push(`lab/${f}: deney kaydedilmedi ya da kimliği tekrar ediyor`); continue; }
    const tr = def.text && def.text.tr;
    if (!tr) { errors.push(`lab/${f}: Türkçe metin yok`); continue; }
    for (const k of ["kicker", "title", "short", "tools", "aim", "theory", "steps"]) if (!(k in tr)) errors.push(`lab/${f}: '${k}' metni yok`);
    for (const l of QB.LANGS) {
      const T = def.text[l];
      if (!T) { errors.push(`lab/${f}: '${l}' dili yok`); continue; }
      for (const k of Object.keys(tr)) {
        if (!(k in T)) { errors.push(`lab/${f}: '${l}' dilinde '${k}' metni yok`); continue; }
        const a = tr[k], b = T[k];
        if (typeof a === "string") { if (keysOf(a) !== keysOf(b)) errors.push(`lab/${f}: '${l}' dilinde '${k}' yer tutucuları farklı`); }
        else if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) errors.push(`lab/${f}: '${l}' dilinde '${k}' listesinin uzunluğu farklı`); }
        else if (a && typeof a === "object") {
          for (const sk of Object.keys(a)) if (!b[sk] || b[sk].length !== a[sk].length) errors.push(`lab/${f}: '${l}' dilinde '${k}.${sk}' farklı`);
        }
      }
    }
    if (tr.steps && !Array.isArray(tr.steps)) for (const p of def.parts) if (!tr.steps[p.id] && !tr.steps._) errors.push(`lab/${f}: '${p.id}' bölümünün adımları yok`);
    for (const p of def.parts) if (!(p.title in tr)) errors.push(`lab/${f}: '${p.title}' bölüm başlığı metni yok`);
    // kodda kullanılan metin anahtarları tanımlı olmalı
    const src = fs.readFileSync(path.join(ROOT, "lab", f), "utf8");
    for (const m of src.matchAll(/\b(?:t|c\.t)\("([A-Za-z0-9_]+)"/g)) if (!(m[1] in tr) && !(m[1] in I18N.tr)) errors.push(`lab/${f}: '${m[1]}' metni tanımlı değil`);
    for (const m of src.matchAll(/\btg\("([A-Za-z0-9_]+)"/g)) if (!(m[1] in I18N.tr)) errors.push(`lab/${f}: ortak '${m[1]}' metni i18n.js'de yok`);
    // fizik doğrulama
    if (typeof def.selfTest === "function") {
      try {
        for (const r of def.selfTest()) {
          tests++;
          const ok = r.expected === 0 ? Math.abs(r.value) <= r.tol : Math.abs(r.value - r.expected) <= r.tol * Math.abs(r.expected);
          if (!(ok && Number.isFinite(r.value))) errors.push(`lab/${f}: doğrulama '${r.name}' başarısız: ${r.value} (beklenen ${r.expected} ± ${r.tol})`);
        }
      } catch (e) { errors.push(`lab/${f}: doğrulama hatası: ${e.message}`); }
    } else warnings.push(`lab/${f}: doğrulama testi (selfTest) yok`);
  }
  // çekirdek: belirsizlik yuvarlama ve uydurma
  const uc = [[9.8234, 0.02385, "9,82 ± 0,02"], [92.81, 0.3, "92,8 ± 0,3"], [92.81, 3, "93 ± 3"], [3042.37, 20, "3040 ± 20"], [1.234, 0.14, "1,23 ± 0,14"]];
  for (const [v, e, want] of uc) { const got = QBL.unc(v, e); if (got !== want) errors.push(`QBL.unc(${v}, ${e}) = "${got}", beklenen "${want}"`); }
  const q = QBL.fitQuad([0, 1, 2, 3, 4], [1, 3, 9, 19, 33], 0);
  if (!q || Math.abs(q.c[0] - 1) > 1e-9 || Math.abs(q.c[1] - 0) > 1e-9 || Math.abs(q.c[2] - 2) > 1e-9) errors.push("QBL.fitQuad yanlış sonuç veriyor");
  const ln = QBL.fitLine([1, 2, 3, 4], [3, 5, 7, 9]);
  if (!ln || Math.abs(ln.a - 2) > 1e-12 || Math.abs(ln.b - 1) > 1e-12) errors.push("QBL.fitLine yanlış sonuç veriyor");
  labSummary = `Laboratuvar: ${QBL.experiments.length} deney, ${tests} fizik doğrulama testi`;
}

console.log(`${QB.templates.length} şablon (${QB.active().length} tanesi sitede açık), ${qFiles.length} soru dosyası, diller: ${QB.LANGS.join(", ")}`);
console.log(labSummary);
const act = QB.active();
const byLevel = [1, 2, 3].map((lv) => act.filter((t) => QB.levelOf(t) === lv).length);
const byKind = {};
for (const t of act) byKind[QB.kindOf(t)] = (byKind[QB.kindOf(t)] || 0) + 1;
console.log(`Zorluk: ${byLevel[0]} kolay, ${byLevel[1]} orta, ${byLevel[2]} zor · Şekilli: ${act.filter((t) => t.figure).length} · Tipler: ${JSON.stringify(byKind)}`);
for (const w of warnings) console.log("UYARI: " + w);
for (const e of errors) console.log("HATA:  " + e);
if (errors.length) {
  console.log(`\n${errors.length} hata bulundu.`);
  process.exit(1);
}
console.log("Tüm kontroller geçti.");
