/*
 * Soru motoru (question engine)
 * --------------------------------
 * Şablonları (QB.add ile eklenen) alır ve her öğrenci için aynı kalıpta,
 * farklı sayılarla soru üretir. Aynı öğrenci + aynı sınav kodu her zaman
 * aynı soruları verir (deterministik rastgelelik).
 *
 * Tarayıcıda ve Node'da (tools/check.js) aynı şekilde çalışır.
 */
(function (root) {
  "use strict";

  const CONFIG = root.QB_CONFIG || {};
  const LANGS = CONFIG.languages || ["tr", "en", "de"];
  const LOCALES = { tr: "tr-TR", en: "en-US", de: "de-DE" };

  // Dile göre kişi adları. Her listede aynı sayıda ad olmalı: rastgele seçilen
  // sıra numarası dilden bağımsızdır, böylece dil değişince sayılar değişmez.
  const NAMES = {
    tr: ["Ali", "Ayşe", "Mehmet", "Zeynep", "Can", "Elif", "Emre", "Defne", "Kerem", "Ece", "Mert", "Selin"],
    en: ["Alex", "Emma", "Liam", "Olivia", "Noah", "Mia", "Ethan", "Sophia", "Lucas", "Chloe", "Ryan", "Grace"],
    de: ["Lukas", "Anna", "Felix", "Lea", "Jonas", "Marie", "Paul", "Lena", "Finn", "Emma", "Ben", "Sophie"],
  };

  // ---------------------------------------------------------------------------
  // Deterministik rastgele sayı üreteci
  // ---------------------------------------------------------------------------
  function hashStr(s) {
    let h = 2166136261 >>> 0;
    for (const ch of s) {
      h ^= ch.codePointAt(0);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function makeRng(...parts) {
    return mulberry32(hashStr(parts.join("␟")));
  }

  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalize(s) {
    return String(s || "").trim().toLocaleLowerCase("tr-TR").replace(/\s+/g, " ");
  }

  // ---------------------------------------------------------------------------
  // Matematik yardımcıları
  // ---------------------------------------------------------------------------
  function round(x, d = 0) {
    const f = Math.pow(10, d);
    return (Math.sign(x) * Math.round(Math.abs(x) * f * (1 + Math.pow(2, -40)))) / f;
  }
  function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) [a, b] = [b, a % b];
    return a;
  }
  function lcm(a, b) {
    return a && b ? Math.abs(Math.round(a) * Math.round(b)) / gcd(a, b) : 0;
  }
  function fact(n) {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }
  function comb(n, k) {
    if (k < 0 || k > n) return 0;
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
    return Math.round(r);
  }
  function perm(n, k) {
    if (k < 0 || k > n) return 0;
    let r = 1;
    for (let i = 0; i < k; i++) r *= n - i;
    return r;
  }
  const deg = Math.PI / 180;

  // Şablon ifadelerinde kullanılabilen fonksiyonlar.
  // Trigonometri DERECE ile çalışır (lise konvansiyonu).
  const FUNCS = {
    sqrt: Math.sqrt,
    abs: Math.abs,
    floor: Math.floor,
    ceil: Math.ceil,
    round,
    min: Math.min,
    max: Math.max,
    pow: Math.pow,
    sin: (x) => Math.sin(x * deg),
    cos: (x) => Math.cos(x * deg),
    tan: (x) => Math.tan(x * deg),
    asin: (x) => Math.asin(x) / deg,
    acos: (x) => Math.acos(x) / deg,
    atan: (x) => Math.atan(x) / deg,
    log: Math.log10,
    ln: Math.log,
    exp: Math.exp,
    gcd,
    lcm,
    fact,
    comb,
    perm,
    // pick(i, a, b, c, ...) → i. değer (1'den başlar). Birbirine bağlı
    // değerleri (ör. 3-4-5 üçgeni) birlikte seçmek için kullanılır.
    pick: (i, ...xs) => xs[Math.round(i) - 1],
  };
  const CONSTS = { pi: Math.PI, e: Math.E };

  // ---------------------------------------------------------------------------
  // Güvenli ifade çözümleyici (eval kullanılmaz)
  //   + - * / % ^  ( )  < <= > >= == !=  && || !  and or not
  // ---------------------------------------------------------------------------
  function tokenize(src) {
    const toks = [];
    const re = /\s*(?:(\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|\.\d+)|([A-Za-z_][A-Za-z_0-9]*)|(<=|>=|==|!=|&&|\|\||[-+*/%^(),<>!]))/y;
    let i = 0;
    while (i < src.length) {
      if (/^\s*$/.test(src.slice(i))) break;
      re.lastIndex = i;
      const m = re.exec(src);
      if (!m) throw new Error(`Beklenmeyen karakter "${src.slice(i).trim()[0]}" — ifade: ${src}`);
      i = re.lastIndex;
      if (m[1] !== undefined) toks.push({ t: "num", v: parseFloat(m[1]) });
      else if (m[2] !== undefined) {
        const w = m[2];
        if (w === "and") toks.push({ t: "op", v: "&&" });
        else if (w === "or") toks.push({ t: "op", v: "||" });
        else if (w === "not") toks.push({ t: "op", v: "!" });
        else toks.push({ t: "id", v: w });
      } else toks.push({ t: "op", v: m[3] });
    }
    return toks;
  }

  const compiled = new Map();

  function compile(src) {
    if (typeof src === "number") return () => src;
    src = String(src);
    if (compiled.has(src)) return compiled.get(src);

    const toks = tokenize(src);
    let p = 0;
    const err = (m) => new Error(`${m} — ifade: ${src}`);
    const isOp = (v) => toks[p] && toks[p].t === "op" && toks[p].v === v;
    const expect = (v) => {
      if (!isOp(v)) throw err(`"${v}" bekleniyordu`);
      p++;
    };
    const near = (x, y) => Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y));

    function parseOr() {
      let l = parseAnd();
      while (isOp("||")) {
        p++;
        const a = l, b = parseAnd();
        l = (s) => (a(s) || b(s) ? 1 : 0);
      }
      return l;
    }
    function parseAnd() {
      let l = parseCmp();
      while (isOp("&&")) {
        p++;
        const a = l, b = parseCmp();
        l = (s) => (a(s) && b(s) ? 1 : 0);
      }
      return l;
    }
    function parseCmp() {
      let l = parseAdd();
      while (toks[p] && toks[p].t === "op" && ["<", "<=", ">", ">=", "==", "!="].includes(toks[p].v)) {
        const op = toks[p++].v;
        const a = l, b = parseAdd();
        l = (s) => {
          const x = a(s), y = b(s);
          switch (op) {
            case "<": return x < y && !near(x, y) ? 1 : 0;
            case "<=": return x <= y || near(x, y) ? 1 : 0;
            case ">": return x > y && !near(x, y) ? 1 : 0;
            case ">=": return x >= y || near(x, y) ? 1 : 0;
            case "==": return near(x, y) ? 1 : 0;
            default: return near(x, y) ? 0 : 1;
          }
        };
      }
      return l;
    }
    function parseAdd() {
      let l = parseMul();
      while (isOp("+") || isOp("-")) {
        const op = toks[p++].v;
        const a = l, b = parseMul();
        l = op === "+" ? (s) => a(s) + b(s) : (s) => a(s) - b(s);
      }
      return l;
    }
    function parseMul() {
      let l = parseUnary();
      while (isOp("*") || isOp("/") || isOp("%")) {
        const op = toks[p++].v;
        const a = l, b = parseUnary();
        if (op === "*") l = (s) => a(s) * b(s);
        else if (op === "/") l = (s) => a(s) / b(s);
        else l = (s) => { const y = b(s); return ((a(s) % y) + y) % y; };
      }
      return l;
    }
    function parseUnary() {
      if (isOp("-")) { p++; const a = parseUnary(); return (s) => -a(s); }
      if (isOp("+")) { p++; return parseUnary(); }
      if (isOp("!")) { p++; const a = parseUnary(); return (s) => (a(s) ? 0 : 1); }
      return parsePow();
    }
    function parsePow() {
      const b = parsePrimary();
      if (isOp("^")) {
        p++;
        const e = parseUnary();
        return (s) => Math.pow(b(s), e(s));
      }
      return b;
    }
    function parsePrimary() {
      const t = toks[p++];
      if (!t) throw err("İfade eksik");
      if (t.t === "num") { const v = t.v; return () => v; }
      if (t.t === "op" && t.v === "(") { const e = parseOr(); expect(")"); return e; }
      if (t.t === "id") {
        const name = t.v;
        if (isOp("(")) {
          p++;
          const fn = FUNCS[name];
          if (!fn) throw err(`Bilinmeyen fonksiyon "${name}"`);
          const args = [];
          if (!isOp(")")) {
            args.push(parseOr());
            while (isOp(",")) { p++; args.push(parseOr()); }
          }
          expect(")");
          return (s) => fn(...args.map((a) => a(s)));
        }
        return (s) => {
          if (Object.prototype.hasOwnProperty.call(s, name)) {
            const v = s[name];
            if (typeof v !== "number") throw err(`"${name}" bir sayı değil, hesapta kullanılamaz`);
            return v;
          }
          if (name in CONSTS) return CONSTS[name];
          throw err(`Tanımsız değişken "${name}"`);
        };
      }
      throw err(`Beklenmeyen "${t.v}"`);
    }

    const fn = parseOr();
    if (p < toks.length) throw err(`Fazladan "${toks[p].v}"`);
    compiled.set(src, fn);
    return fn;
  }

  function evaluate(src, scope = {}) {
    return compile(src)(scope);
  }

  // ---------------------------------------------------------------------------
  // Sayı biçimlendirme (dile göre ondalık ayırıcı: TR/DE virgül, EN nokta)
  // ---------------------------------------------------------------------------
  function formatNum(v, d, lang) {
    if (typeof v !== "number") return String(v);
    if (!Number.isFinite(v)) return "?";
    const opts = { useGrouping: Math.abs(v) >= 10000 };
    if (d === undefined) opts.maximumFractionDigits = 4;
    else { opts.minimumFractionDigits = 0; opts.maximumFractionDigits = d; }
    const r = d === undefined ? v : round(v, d);
    return new Intl.NumberFormat(LOCALES[lang] || lang, opts).format(r === 0 ? 0 : r).replace("-", "−");
  }

  function decimalsOf(x) {
    const s = String(x);
    if (s.includes("e")) return 4;
    const i = s.indexOf(".");
    return i < 0 ? 0 : s.length - i - 1;
  }

  // ---------------------------------------------------------------------------
  // Şablon kaydı
  // ---------------------------------------------------------------------------
  const templates = [];
  const problems = []; // { id, message }

  function add(tpl) {
    const id = tpl && tpl.id;
    try {
      if (!id) throw new Error("Şablonun 'id' alanı yok");
      if (templates.some((t) => t.id === id)) throw new Error(`Aynı id iki kez kullanılmış: ${id}`);
      if (!tpl.text || typeof tpl.text !== "object") throw new Error("'text' alanı yok");
      for (const l of LANGS) if (!tpl.text[l]) throw new Error(`'${l}' dilinde metin yok`);
      if (tpl.answer === undefined) throw new Error("'answer' alanı yok");
      templates.push(tpl);
    } catch (e) {
      problems.push({ id: id || "(adsız)", message: e.message });
    }
  }

  // ---------------------------------------------------------------------------
  // Soru üretimi
  // ---------------------------------------------------------------------------
  function NameRef(i) { this.i = i; }

  function sampleVar(spec, rng, scope) {
    if (typeof spec === "number") return { v: spec, d: decimalsOf(spec) };
    if (typeof spec === "string") return { v: evaluate(spec, scope) };
    if (Array.isArray(spec)) spec = { values: spec };
    if (spec.type === "name") return { v: new NameRef(Math.floor(rng() * NAMES.tr.length)) };
    if (spec.values) {
      const v = spec.values[Math.floor(rng() * spec.values.length)];
      return { v, d: spec.decimals ?? Math.max(...spec.values.map(decimalsOf)) };
    }
    if ("min" in spec && "max" in spec) {
      const min = evaluate(spec.min, scope);
      const max = evaluate(spec.max, scope);
      const step = spec.step ?? 1;
      const n = Math.floor((max - min) / step + 1e-9);
      if (!(n >= 0)) throw new Error(`Aralık boş: min=${min}, max=${max}`);
      const d = spec.decimals ?? Math.max(decimalsOf(step), decimalsOf(min));
      return { v: round(min + Math.floor(rng() * (n + 1)) * step, d), d };
    }
    throw new Error(`Değişken tanımı anlaşılamadı: ${JSON.stringify(spec)}`);
  }

  function generate(tpl, seed) {
    const rng = makeRng(seed, tpl.id);
    const where = tpl.where ? [].concat(tpl.where) : [];
    const maxTries = 2000;

    for (let attempt = 0; attempt < maxTries; attempt++) {
      const scope = {};
      const dec = {};
      for (const [key, spec] of Object.entries(tpl.vars || {})) {
        const { v, d } = sampleVar(spec, rng, scope);
        scope[key] = v;
        if (d !== undefined) dec[key] = d;
        else if (spec && typeof spec === "object" && spec.decimals !== undefined) dec[key] = spec.decimals;
      }
      if (!where.every((w) => evaluate(w, scope))) continue;

      const answer = evaluate(tpl.answer, scope);
      if (!Number.isFinite(answer)) continue;
      const d = tpl.decimals ?? (Number.isInteger(round(answer, 6)) ? 0 : 2);

      const type = tpl.type || CONFIG.defaultType || "mc";
      let choices = null;
      if (type === "mc") choices = buildChoices(tpl, scope, answer, d, rng);

      return { tpl, seed, scope, dec, answer, d, type, choices };
    }
    throw new Error(`${maxTries} denemede 'where' koşullarını sağlayan sayı bulunamadı`);
  }

  function buildChoices(tpl, scope, answer, d, rng) {
    const n = tpl.choices ?? CONFIG.choiceCount ?? 5;
    const key = (x) => round(x, d);
    const opts = [key(answer)];
    const seen = new Set(opts);
    const keepSign = answer > 0 ? (v) => v > 0 : answer < 0 ? (v) => v < 0 : () => true;

    for (const ex of tpl.distractors || []) {
      if (opts.length >= n) break;
      const v = key(evaluate(ex, scope));
      if (Number.isFinite(v) && !seen.has(v)) { seen.add(v); opts.push(v); }
    }
    // Yeterli çeldirici yoksa doğru cevaba yakın değerler üret.
    const unit = Math.pow(10, -d);
    for (let guard = 0; opts.length < n && guard < 400; guard++) {
      const spread = Math.max(unit, Math.abs(answer) * 0.25) * (1 + guard / 20);
      const v = key(answer + (rng() < 0.5 ? -1 : 1) * (unit + rng() * spread));
      if (!keepSign(v) || seen.has(v)) continue;
      seen.add(v);
      opts.push(v);
    }
    return shuffle(opts.map((v, i) => ({ v, correct: i === 0 })), rng);
  }

  // ---------------------------------------------------------------------------
  // Metin oluşturma
  //   {x}       → x değişkeni (kendi ondalık sayısıyla)
  //   {x:2}     → x, 2 ondalık
  //   {=a*b}    → hesaplanan ifade
  //   {=a/b:1}  → hesaplanan ifade, 1 ondalık
  // ---------------------------------------------------------------------------
  function fill(text, inst, lang) {
    return text.replace(/\{(=)?\s*([^{}]+?)\s*(?::(\d+))?\}/g, (m, eq, body, dd) => {
      let v, d = dd !== undefined ? Number(dd) : undefined;
      if (eq) v = evaluate(body, inst.scope);
      else {
        if (!Object.prototype.hasOwnProperty.call(inst.scope, body)) throw new Error(`Metinde tanımsız değişken: {${body}}`);
        v = inst.scope[body];
        if (d === undefined) d = inst.dec[body];
      }
      if (v instanceof NameRef) return (NAMES[lang] || NAMES.tr)[v.i];
      return formatNum(v, d, lang);
    });
  }

  function localized(field, lang) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field.tr ?? "";
  }

  function render(inst, lang) {
    return fill(localized(inst.tpl.text, lang), inst, lang);
  }

  function unitFor(inst, lang) {
    return localized(inst.tpl.unit, lang);
  }

  function valueString(inst, v, lang) {
    const u = unitFor(inst, lang);
    return formatNum(v, inst.d, lang) + (u ? " " + u : "");
  }

  const LETTERS = "ABCDEFGHIJ";

  function answerString(inst, lang) {
    if (inst.type === "mc") {
      const i = inst.choices.findIndex((c) => c.correct);
      return `${LETTERS[i]}) ${valueString(inst, inst.choices[i].v, lang)}`;
    }
    return valueString(inst, inst.answer, lang);
  }

  // ---------------------------------------------------------------------------
  // Sınav oluşturma ve cevap kontrolü
  // ---------------------------------------------------------------------------
  function examSeed(student, code) {
    return normalize(student) + "|" + normalize(code);
  }

  function buildExam({ student, code, count, subjects }) {
    const seed = examSeed(student, code);
    let pool = templates.filter((t) => !subjects || !subjects.length || subjects.includes(t.subject));
    // Şablon seçimi yalnızca sınav koduna bağlı: aynı sınavda herkes aynı
    // soru kalıplarını aynı sırayla görür, sadece sayılar kişiye özeldir.
    pool = shuffle(pool, makeRng("pick", normalize(code)));
    if (count) pool = pool.slice(0, count);
    return pool.map((tpl) => {
      try { return generate(tpl, seed); }
      catch (e) { return { tpl, seed, error: e.message }; }
    });
  }

  // Öğrencinin yazdığı cevabı sayıya çevirir: "1,5" "1.5" "3/4" "2^3" "-0,25"
  function parseAnswer(str) {
    let s = String(str || "").replace(/\s+/g, "").replace(/−/g, "-");
    if (!s) return NaN;
    const hasDot = s.includes("."), hasComma = s.includes(",");
    if (hasDot && hasComma) {
      // Son gelen ayırıcı ondalıktır, diğeri binlik ayırıcıdır.
      if (s.lastIndexOf(",") > s.lastIndexOf(".")) s = s.replace(/\./g, "").replace(",", ".");
      else s = s.replace(/,/g, "");
    } else if (hasComma) s = s.replace(",", ".");
    if (!/^[-+*/^().\d]+$/.test(s)) return NaN;
    try { return evaluate(s, {}); } catch { return NaN; }
  }

  function isCorrect(inst, response) {
    if (inst.type === "mc") {
      return response !== null && response !== undefined && inst.choices[response] && inst.choices[response].correct;
    }
    const x = parseAnswer(response);
    if (!Number.isFinite(x)) return false;
    const tol = inst.tpl.tolerance ?? 0.5 * Math.pow(10, -inst.d);
    return Math.abs(x - inst.answer) <= tol + 1e-9 * Math.max(1, Math.abs(inst.answer));
  }

  root.QB = {
    LANGS,
    LETTERS,
    NAMES,
    templates,
    problems,
    add,
    compile,
    evaluate,
    makeRng,
    normalize,
    formatNum,
    generate,
    render,
    localized,
    unitFor,
    valueString,
    answerString,
    examSeed,
    buildExam,
    parseAnswer,
    isCorrect,
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
