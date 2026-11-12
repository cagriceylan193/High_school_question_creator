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
load("engine.js");

const qFiles = fs.readdirSync(path.join(ROOT, "questions")).filter((f) => f.endsWith(".js")).sort();
for (const f of qFiles) load("questions/" + f);

const QB = ctx.QB;
const errors = [];
const warnings = [];

// 1) Soru dosyaları her iki HTML sayfasında da yüklenmeli.
for (const page of ["index.html", "ogretmen.html"]) {
  const html = fs.readFileSync(path.join(ROOT, page), "utf8");
  for (const f of qFiles) {
    if (!html.includes(`src="questions/${f}"`)) errors.push(`${page}: <script src="questions/${f}"></script> satırı eksik`);
  }
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
        if (/NaN|Infinity|∞/.test(txt)) errors.push(`${tpl.id} (${l}): metinde geçersiz sayı: ${txt}`);
      } catch (e) {
        errors.push(`${tpl.id} (${l}): ${e.message}`);
      }
    }
    if (inst.type === "mc") {
      const want = tpl.choices ?? ctx.QB_CONFIG.choiceCount ?? 5;
      if (inst.choices.length < want) shortChoices++;
      if (inst.choices.filter((c) => c.correct).length !== 1) errors.push(`${tpl.id}: doğru şık sayısı 1 değil`);
    }
    if (errors.length > 200) break;
  }
  if (shortChoices) warnings.push(`${tpl.id}: ${SAMPLES} sorunun ${shortChoices} tanesinde şık sayısı eksik kaldı`);
  if (answers.size < 5) warnings.push(`${tpl.id}: yalnızca ${answers.size} farklı cevap üretiliyor; öğrenciler arasında çeşitlilik az`);
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

console.log(`${QB.templates.length} şablon, ${qFiles.length} soru dosyası, diller: ${QB.LANGS.join(", ")}`);
for (const w of warnings) console.log("UYARI: " + w);
for (const e of errors) console.log("HATA:  " + e);
if (errors.length) {
  console.log(`\n${errors.length} hata bulundu.`);
  process.exit(1);
}
console.log("Tüm kontroller geçti.");
