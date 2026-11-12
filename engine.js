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

  // Soru tiplerinin dile göre kalıp metinleri.
  const LOC = {
    tr: { only: "Yalnız {a}", and: " ve ", sep: ", ", ask: "yargılarından hangileri doğrudur?", up: "Artar", down: "Azalır", same: "Değişmez" },
    en: { only: "{a} only", and: " and ", sep: ", ", ask: "Which of these statements are true?", up: "Increases", down: "Decreases", same: "No change" },
    de: { only: "Nur {a}", and: " und ", sep: ", ", ask: "Welche dieser Aussagen sind richtig?", up: "Nimmt zu", down: "Nimmt ab", same: "Bleibt gleich" },
  };
  const ROMAN = ["I", "II", "III", "IV", "V"];

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function near(x, y) {
    return Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y));
  }

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
    // if(koşul, a, b) → koşul doğruysa a, değilse b
    if: (c, a, b) => (c ? a : b),
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
      // Kavram soruları: soru kökü her varyantın içindedir; 'text' isteğe bağlı giriş cümlesidir
      if (tpl.bank && !tpl.text) tpl.text = { tr: "", en: "", de: "" };
      if (!tpl.text || typeof tpl.text !== "object") throw new Error("'text' alanı yok");
      const kind = kindOf(tpl);
      if (kind !== "kavram") for (const l of LANGS) if (!tpl.text[l]) throw new Error(`'${l}' dilinde metin yok`);
      if (kind === "statements") {
        if (!Array.isArray(tpl.statements) || tpl.statements.length < 2 || tpl.statements.length > 4) throw new Error("'statements' 2-4 yargı içermeli");
        tpl.statements.forEach((st, i) => {
          if (st.truth === undefined) throw new Error(`${i + 1}. yargının 'truth' alanı yok`);
          for (const l of LANGS) if (!localized(st.text, l)) throw new Error(`${i + 1}. yargının '${l}' metni yok`);
        });
      } else if (kind === "kavram") {
        // bank: [{ q, right, wrong: [en az 4], why }] — her biri {tr, en, de}
        if (!Array.isArray(tpl.bank) || tpl.bank.length < 2) throw new Error("'bank' en az 2 varyant içermeli");
        const need = (CONFIG.choiceCount ?? 5) - 1;
        tpl.bank.forEach((b, i) => {
          const tag = `${i + 1}. varyant`;
          for (const key of ["q", "right", "why"]) for (const l of LANGS) if (!localized(b[key], l)) throw new Error(`${tag}: '${key}' alanının '${l}' metni yok`);
          if (!Array.isArray(b.wrong) || b.wrong.length < need) throw new Error(`${tag}: en az ${need} yanlış seçenek ('wrong') gerekli`);
          b.wrong.forEach((w, j) => { for (const l of LANGS) if (!localized(w, l)) throw new Error(`${tag}: ${j + 1}. yanlış seçeneğin '${l}' metni yok`); });
        });
      } else if (kind === "order") {
        if (!tpl.items || Object.keys(tpl.items).length < 3 || Object.keys(tpl.items).length > 4) throw new Error("'items' 3-4 öğe içermeli");
      } else if (kind === "changes") {
        if (!Array.isArray(tpl.changes) || tpl.changes.length < 1 || tpl.changes.length > 3) throw new Error("'changes' 1-3 öğe içermeli");
      } else if (kind === "yazili") {
        if (!Array.isArray(tpl.parts) || !tpl.parts.length || tpl.parts.length > 6) throw new Error("'parts' 1-6 bölüm içermeli");
        tpl.parts.forEach((pt, i) => {
          const tag = `${i + 1}. bölüm`;
          if (!["number", "select", "text"].includes(pt.kind)) throw new Error(`${tag}: 'kind' number, select veya text olmalı`);
          for (const l of LANGS) if (!localized(pt.text, l)) throw new Error(`${tag}: '${l}' metni yok`);
          if (pt.kind === "number" && pt.answer === undefined) throw new Error(`${tag}: 'answer' yok`);
          if (pt.kind === "select" && !pt.change && !(Array.isArray(pt.options) && pt.answer !== undefined)) throw new Error(`${tag}: 'options' + 'answer' ya da 'change' gerekli`);
          if (pt.kind === "text") {
            if (!pt.model) throw new Error(`${tag}: örnek cevap ('model') yok`);
            if (!Array.isArray(pt.rubric) || !pt.rubric.length) throw new Error(`${tag}: 'rubric' yok`);
            pt.rubric.forEach((r, j) => { for (const l of LANGS) if (!localized(r.text, l)) throw new Error(`${tag}: rubrik ${j + 1} '${l}' metni yok`); });
          }
          // Sayısal bölümde kısmi puan ölçütleri (ör. "Formül doğru yazıldığında 2 puan")
          if (pt.partial) {
            if (pt.kind !== "number") throw new Error(`${tag}: 'partial' yalnızca sayısal bölümde kullanılır`);
            const sum = pt.partial.reduce((s, r) => s + (r.points ?? 1), 0);
            if (sum >= partPoints(tpl, i)) throw new Error(`${tag}: kısmi puanların toplamı bölüm puanından küçük olmalı`);
            pt.partial.forEach((r, j) => { for (const l of LANGS) if (!localized(r.text, l)) throw new Error(`${tag}: kısmi ölçüt ${j + 1} '${l}' metni yok`); });
          }
          if (pt.solution) for (const l of LANGS) if (!localized(pt.solution, l)) throw new Error(`${tag}: çözümün '${l}' metni yok`);
        });
        if (tpl.outcome) {
          const M = globalThis.QB && QB.MAARIF;
          if (!M || !M.outcomes[tpl.outcome]) throw new Error(`'${tpl.outcome}' öğrenme çıktısı questions/_maarif.js içinde yok`);
          for (const b of tpl.beceri || []) if (!M.skills[b]) throw new Error(`'${b}' becerisi questions/_maarif.js içinde yok`);
        }
      } else if (tpl.answer === undefined) throw new Error("'answer' alanı yok");
      if (tpl.level !== undefined && ![1, 2, 3].includes(tpl.level)) throw new Error("'level' 1, 2 veya 3 olmalı");
      if (tpl.figure !== undefined && typeof tpl.figure !== "function") throw new Error("'figure' bir fonksiyon olmalı");
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

      const type = kindOf(tpl);
      const base = { tpl, seed, scope, dec, type, d: 0 };

      if (type === "statements") {
        const truth = tpl.statements.map((st) => !!evaluate(st.truth, scope));
        if (!truth.some(Boolean)) continue;
        const answer = truth.map((b, i) => (b ? String(i + 1) : "")).join("");
        const all = subsetKeys(tpl.statements.length);
        const choices = keyChoices(answer, all, rng, (a, b) => a.length - b.length || a.localeCompare(b));
        return { ...base, answer, choices };
      }

      if (type === "order") {
        const labels = Object.keys(tpl.items);
        const vals = labels.map((l) => evaluate(tpl.items[l], scope));
        if (vals.some((v) => !Number.isFinite(v))) continue;
        const idx = labels.map((_, i) => i).sort((a, b) => vals[b] - vals[a] || a - b);
        const groups = [];
        for (const i of idx) {
          const g = groups[groups.length - 1];
          if (g && near(vals[g[0]], vals[i])) g.push(i);
          else groups.push([i]);
        }
        const answer = groups.map((g) => g.sort((a, b) => a - b).map((i) => labels[i]).join(" = ")).join(" > ");
        return { ...base, answer, choices: keyChoices(answer, weakOrders(labels), rng) };
      }

      if (type === "yazili") {
        let bad = false;
        const parts = tpl.parts.map((pt) => {
          if (pt.kind === "number") {
            const a = evaluate(pt.answer, scope);
            if (!Number.isFinite(a)) bad = true;
            return { kind: "number", answer: a, d: pt.decimals ?? (Number.isInteger(round(a, 6)) ? 0 : 2) };
          }
          if (pt.kind === "select") {
            if (pt.change) {
              const b = evaluate(pt.change.before, scope), a = evaluate(pt.change.after, scope);
              return { kind: "select", answer: near(a, b) ? 2 : a > b ? 0 : 1, change: true };
            }
            const k = Math.round(evaluate(pt.answer, scope)) - 1;
            if (!(k >= 0 && k < pt.options.length)) bad = true;
            return { kind: "select", answer: k };
          }
          return { kind: "text" };
        });
        if (bad) continue;
        return { ...base, parts, answer: null };
      }

      if (type === "kavram") {
        const vi = Math.floor(rng() * tpl.bank.length);
        const b = tpl.bank[vi];
        const n = CONFIG.choiceCount ?? 5;
        const wrong = shuffle(b.wrong.slice(), rng).slice(0, n - 1);
        const choices = shuffle([{ t: b.right, correct: true }, ...wrong.map((t) => ({ t, correct: false }))], rng);
        return { ...base, variant: vi, answer: "v" + vi, choices };
      }

      if (type === "changes") {
        const outs = tpl.changes.map((c) => {
          const b = evaluate(c.before, scope), a = evaluate(c.after, scope);
          return near(a, b) ? "same" : a > b ? "up" : "down";
        });
        const answer = outs.join(",");
        return { ...base, answer, choices: keyChoices(answer, changeKeys(tpl.changes.length), rng) };
      }

      const answer = evaluate(tpl.answer, scope);
      if (!Number.isFinite(answer)) continue;
      const d = tpl.decimals ?? (Number.isInteger(round(answer, 6)) ? 0 : 2);
      let choices = null;
      if (type === "mc") choices = buildChoices(tpl, scope, answer, d, rng);
      return { ...base, answer, d, choices };
    }
    throw new Error(`${maxTries} denemede 'where' koşullarını sağlayan sayı bulunamadı`);
  }

  function kindOf(tpl) {
    if (tpl.type) return tpl.type;
    if (tpl.statements) return "statements";
    if (tpl.items) return "order";
    if (tpl.changes) return "changes";
    if (tpl.parts) return "yazili";
    if (tpl.bank) return "kavram";
    return CONFIG.defaultType || "mc";
  }

  function levelOf(tpl) {
    return tpl.level || 1;
  }

  // "1", "2", "12", "123" ... → I, II, I ve II, I, II ve III ...
  function subsetKeys(n) {
    const out = [];
    for (let mask = 1; mask < 1 << n; mask++) {
      let k = "";
      for (let i = 0; i < n; i++) if (mask & (1 << i)) k += String(i + 1);
      out.push(k);
    }
    return out;
  }

  // Eşitliklere izin veren tüm sıralamalar: "K > L = M" gibi
  function weakOrders(labels) {
    const res = [];
    const pos = (x) => labels.indexOf(x);
    (function rec(rest, acc) {
      if (!rest.length) {
        res.push(acc.map((g) => g.slice().sort((a, b) => pos(a) - pos(b)).join(" = ")).join(" > "));
        return;
      }
      for (let mask = 1; mask < 1 << rest.length; mask++) {
        const g = rest.filter((_, i) => mask & (1 << i));
        const r = rest.filter((_, i) => !(mask & (1 << i)));
        rec(r, acc.concat([g]));
      }
    })(labels.slice(), []);
    return res;
  }

  function changeKeys(n) {
    let keys = [[]];
    for (let i = 0; i < n; i++) keys = keys.flatMap((k) => ["up", "down", "same"].map((o) => k.concat(o)));
    return keys.map((k) => k.join(","));
  }

  // Doğru anahtar + rastgele seçilmiş yanlış anahtarlar
  function keyChoices(correct, all, rng, sortFn) {
    const n = CONFIG.choiceCount ?? 5;
    const others = shuffle(all.filter((k) => k !== correct), rng).slice(0, n - 1);
    let list = [correct, ...others];
    list = sortFn ? list.sort(sortFn) : shuffle(list, rng);
    return list.map((k) => ({ k, correct: k === correct }));
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
  function fill(text, inst, lang, mark) {
    const wrap = mark ? (s) => `<span class="v">${s}</span>` : (s) => s;
    // {if:koşul|doğruysa|yanlışsa} → koşula göre metin
    // (dallar içinde {x} gibi yer tutucular ve iç içe bir {if:…} kullanılabilir)
    const IF = /\{if:([^{}|]+)\|((?:[^{}|]|\{[^{}]*\})*)\|((?:[^{}|]|\{[^{}]*\})*)\}/g;
    for (let k = 0; k < 4 && text.includes("{if:"); k++) text = text.replace(IF, (m, c, a, b) => (evaluate(c, inst.scope) ? a : b));
    return text.replace(/\{(=)?\s*([^{}]+?)\s*(?::(\d+))?\}/g, (m, eq, body, dd) => {
      let v, d = dd !== undefined ? Number(dd) : undefined;
      if (eq) v = evaluate(body, inst.scope);
      else {
        if (!Object.prototype.hasOwnProperty.call(inst.scope, body)) throw new Error(`Metinde tanımsız değişken: {${body}}`);
        v = inst.scope[body];
        if (d === undefined) d = inst.dec[body];
      }
      if (v instanceof NameRef) return wrap((NAMES[lang] || NAMES.tr)[v.i]);
      return wrap(formatNum(v, d, lang));
    });
  }

  function localized(field, lang) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field.tr ?? "";
  }

  // Şekil: şablondaki figure(v, f) fonksiyonu SVG döndürür (bkz. figures.js).
  function figure(inst, lang) {
    if (typeof inst.tpl.figure !== "function" || !root.QB_FIG) return "";
    const f = Object.create(root.QB_FIG);
    f.lang = lang;
    f.n = (x, d) => formatNum(x, d, lang);
    f.$ = (key, d) => {
      const v = inst.scope[key];
      if (v instanceof NameRef) return (NAMES[lang] || NAMES.tr)[v.i];
      return formatNum(v, d ?? inst.dec[key], lang);
    };
    f.t = (field) => localized(field, lang);
    return String(inst.tpl.figure(inst.scope, f));
  }

  // Sorunun parçaları (HTML): metin, şekil (SVG), yargılar ve soru cümlesi.
  // mark = true → değişken değerleri <span class="v"> ile işaretlenir (ana sayfa örneği).
  function renderParts(inst, lang, mark) {
    const tpl = inst.tpl;
    const ask = tpl.ask ? localized(tpl.ask, lang) : tpl.statements ? (LOC[lang] || LOC.tr).ask : "";
    return {
      stem: fill([localized(tpl.text, lang), inst.type === "kavram" ? localized(tpl.bank[inst.variant].q, lang) : ""].filter(Boolean).join(" "), inst, lang, mark),
      figure: figure(inst, lang),
      figureFirst: !!tpl.figureFirst,
      statements: (tpl.statements || []).map((st) => fill(localized(st.text, lang), inst, lang, mark)),
      ask: ask ? fill(ask, inst, lang, mark) : "",
    };
  }

  // Sorunun tam HTML'i
  function render(inst, lang, mark) {
    const p = renderParts(inst, lang, mark);
    let html = `<div class="q-stem">${p.stem}</div>`;
    if (p.figure) {
      const box = `<div class="q-fig">${p.figure}</div>`;
      html = p.figureFirst ? box + html : html + box;
    }
    if (p.statements.length) {
      html += `<ol class="q-stmts">${p.statements.map((st, i) =>
        `<li><span class="roman">${ROMAN[i]}.</span><span>${st}</span></li>`).join("")}</ol>`;
    }
    if (p.ask) html += `<p class="q-ask">${p.ask}</p>`;
    return html;
  }

  function stmtLabel(k, lang) {
    const L = LOC[lang] || LOC.tr;
    const r = [...k].map((d) => ROMAN[Number(d) - 1]);
    if (r.length === 1) return L.only.replace("{a}", r[0]);
    return r.slice(0, -1).join(L.sep) + L.and + r[r.length - 1];
  }

  function orderLabel(inst, k, html) {
    const sym = inst.tpl.symbol;
    const labels = Object.keys(inst.tpl.items);
    return k.split(" ").map((tok) => {
      if (labels.includes(tok)) return sym ? (html ? `${sym}<sub>${tok}</sub>` : `${sym}_${tok}`) : tok;
      return html ? esc(tok) : tok;
    }).join(" ");
  }

  // Şık metni (düz yazı) ve HTML hâli
  function choiceText(inst, i, lang) {
    const c = inst.choices[i];
    const L = LOC[lang] || LOC.tr;
    switch (inst.type) {
      case "statements": return stmtLabel(c.k, lang);
      case "order": return orderLabel(inst, c.k, false);
      case "changes": return c.k.split(",").map((o) => L[o]).join(" / ");
      case "kavram": return fill(localized(c.t, lang), inst, lang).replace(/<[^>]+>/g, "");
      default: return valueString(inst, c.v, lang);
    }
  }
  function choiceHtml(inst, i, lang) {
    const c = inst.choices[i];
    const L = LOC[lang] || LOC.tr;
    switch (inst.type) {
      case "order": return orderLabel(inst, c.k, true);
      case "changes": return `<span class="chg">${c.k.split(",").map((o) => `<span>${L[o]}</span>`).join("")}</span>`;
      case "kavram": return fill(localized(c.t, lang), inst, lang);
      default: return esc(choiceText(inst, i, lang));
    }
  }
  // --- Açık uçlu (yazılı) sorular -------------------------------------------------
  const PART_LETTERS = "abcdef";
  const CHANGE_KEYS = ["up", "down", "same"];

  function partPoints(tpl, i) {
    const pt = tpl.parts[i];
    if (pt.kind === "text") return pt.rubric.reduce((s, r) => s + (r.points ?? 1), 0);
    return pt.points ?? (pt.kind === "number" ? 2 : 1);
  }
  function maxPoints(inst) {
    if (inst.type !== "yazili") return 1;
    return inst.tpl.parts.reduce((s, _, i) => s + partPoints(inst.tpl, i), 0);
  }
  function partText(inst, i, lang, mark) {
    return fill(localized(inst.tpl.parts[i].text, lang), inst, lang, mark);
  }
  function partOptions(inst, i, lang) {
    const pt = inst.tpl.parts[i];
    if (pt.change) return CHANGE_KEYS.map((k) => (LOC[lang] || LOC.tr)[k]);
    return pt.options.map((o) => fill(localized(o, lang), inst, lang));
  }
  function partUnit(inst, i, lang) {
    return localized(inst.tpl.parts[i].unit, lang);
  }
  function partModel(inst, i, lang) {
    return fill(localized(inst.tpl.parts[i].model, lang), inst, lang);
  }
  function partRubric(inst, i, lang) {
    const pt = inst.tpl.parts[i];
    const list = pt.kind === "text" ? pt.rubric : pt.partial || [];
    return list.map((r) => ({ text: fill(localized(r.text, lang), inst, lang), points: r.points ?? 1 }));
  }
  // Çözüm metni (sayısal/seçmeli bölümler için isteğe bağlı 'solution'; açıklamada örnek cevap)
  function partSolution(inst, i, lang) {
    const pt = inst.tpl.parts[i];
    if (pt.kind === "text") return partModel(inst, i, lang);
    const src = pt.solution || (SOLUTIONS[inst.tpl.id] && SOLUTIONS[inst.tpl.id].parts && SOLUTIONS[inst.tpl.id].parts[i]);
    return src ? fill(localized(src, lang), inst, lang) : "";
  }

  // ---------------------------------------------------------------------------
  // Adım adım çözümler (questions/cozumler.js):
  //   QB.solve({ "şablon-id": { tr: ["1. adım", "2. adım", …], en: […], de: […] } })
  //   Yazılı şablonların maddeleri için: { parts: { 0: { tr, en, de }, … } }
  // Adımlarda soru metnindeki gibi {x}, {=ifade:ondalık} ve {if:koşul|…|…} kullanılabilir.
  // ---------------------------------------------------------------------------
  const SOLUTIONS = {};
  function solve(map) {
    for (const [id, sol] of Object.entries(map)) SOLUTIONS[id] = Object.assign(SOLUTIONS[id] || {}, sol);
  }
  function hasSteps(tpl) {
    const s = SOLUTIONS[tpl.id];
    return !!(s && Array.isArray(s.tr) && s.tr.length);
  }
  // Doldurulmuş çözüm adımları (HTML dizisi); çözüm yoksa boş dizi
  function solutionSteps(inst, lang) {
    if (inst.error) return [];
    if (inst.type === "kavram") {
      const w = inst.tpl.bank[inst.variant].why;
      const v = (w && (w[lang] || w.tr)) || [];
      return [].concat(v).map((x) => fill(x, inst, lang));
    }
    const s = SOLUTIONS[inst.tpl.id];
    if (!s) return [];
    const list = (Array.isArray(s[lang]) && s[lang]) || s.tr || [];
    return list.map((x) => fill(x, inst, lang));
  }
  // MEB biçiminde alt madde numarası: 2. sorunun 3. maddesi → "2.3."
  function partLabel(qNo, i) {
    return `${qNo}.${i + 1}.`;
  }
  // Öğrenme çıktısı ve beceriler (yoksa null)
  function outcomeOf(tpl, lang) {
    const M = QB.MAARIF;
    if (!M || !tpl.outcome || !M.outcomes[tpl.outcome]) return null;
    const o = M.outcomes[tpl.outcome];
    const codes = tpl.beceri || o.beceri || [];
    return {
      code: tpl.outcome,
      text: `${tpl.outcome}. ${o[lang] || o.tr}`,
      skills: codes.map((c) => `${c}. ${(M.skills[c] && (M.skills[c][lang] || M.skills[c].tr)) || ""}`),
    };
  }
  /**
   * Sınavdaki açık uçlu bölümlerin puanlarını toplam 100 olacak biçimde tam sayılara dağıtır
   * (en büyük kalan yöntemi). Döndürür: her soru için bölüm puanları dizisi (yazılı değilse null).
   */
  function scale100(items) {
    const raw = [];
    items.forEach((inst, qi) => {
      if (!inst || inst.error || inst.type !== "yazili") return;
      inst.tpl.parts.forEach((_, i) => raw.push({ qi, i, p: partPoints(inst.tpl, i) }));
    });
    const out = items.map((inst) => (inst && !inst.error && inst.type === "yazili" ? inst.tpl.parts.map(() => 0) : null));
    const total = raw.reduce((s, r) => s + r.p, 0);
    if (!total) return out;
    let used = 0;
    const rest = raw.map((r) => {
      const exact = (100 * r.p) / total;
      const base = Math.max(1, Math.floor(exact));
      used += base;
      out[r.qi][r.i] = base;
      return { r, frac: exact - Math.floor(exact) };
    });
    rest.sort((a, b) => b.frac - a.frac);
    for (let k = 0; used < 100 && k < rest.length * 3; k++) { const x = rest[k % rest.length].r; out[x.qi][x.i]++; used++; }
    for (let k = 0; used > 100 && k < rest.length * 3; k++) { const x = rest[rest.length - 1 - (k % rest.length)].r; if (out[x.qi][x.i] > 1) { out[x.qi][x.i]--; used--; } }
    return out;
  }
  // Bir bölümün doğru cevabı (düz yazı)
  function partAnswer(inst, i, lang) {
    const p = inst.parts[i];
    if (p.kind === "number") {
      const u = partUnit(inst, i, lang);
      return formatNum(p.answer, p.d, lang) + (u ? " " + u : "");
    }
    if (p.kind === "select") return partOptions(inst, i, lang)[p.answer];
    return partModel(inst, i, lang).replace(/<[^>]+>/g, "");
  }
  // Öğrencinin cevabı: { p: [bölüm cevapları], s: { "2": [true, false] } } (s: rubrikte işaretlenen ölçütler)
  function partScores(inst, resp) {
    const r = resp && typeof resp === "object" ? resp : {};
    const given = r.p || [];
    return inst.tpl.parts.map((pt, i) => {
      const p = inst.parts[i];
      if (p.kind === "number") {
        const x = parseAnswer(given[i]);
        const tol = pt.tolerance ?? 0.5 * Math.pow(10, -p.d);
        if (Number.isFinite(x) && Math.abs(x - p.answer) <= tol + 1e-9 * Math.max(1, Math.abs(p.answer))) return partPoints(inst.tpl, i);
        // sonuç yanlışsa işaretlenen kısmi puan ölçütleri (ör. formül doğru yazılmış)
        const ticks = (r.s && r.s[String(i)]) || [];
        return (pt.partial || []).reduce((s, rb, j) => s + (ticks[j] ? (rb.points ?? 1) : 0), 0);
      }
      if (p.kind === "select") return given[i] !== null && given[i] !== undefined && Number(given[i]) === p.answer ? partPoints(inst.tpl, i) : 0;
      const ticks = (r.s && r.s[String(i)]) || [];
      return pt.rubric.reduce((s, rb, j) => s + (ticks[j] ? (rb.points ?? 1) : 0), 0);
    });
  }
  function pointsOf(inst, resp) {
    if (inst.type !== "yazili") return isCorrect(inst, resp) ? 1 : 0;
    return partScores(inst, resp).reduce((a, b) => a + b, 0);
  }
  function hasTextParts(inst) {
    return inst.type === "yazili" && inst.tpl.parts.some((p) => p.kind === "text");
  }
  // Soru biçimi: test (seçmeli) ya da açık uçlu
  function formatOf(tpl) {
    const k = kindOf(tpl);
    return k === "yazili" || k === "open" ? "acik" : "test";
  }

  // "Artar / Azalır" sorularında şıkların üstündeki sütun başlıkları
  function choiceHeader(inst, lang) {
    if (inst.type !== "changes") return "";
    return `<span class="chg">${inst.tpl.changes.map((c) => `<span>${localized(c.label, lang)}</span>`).join("")}</span>`;
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
    if (inst.type === "yazili") {
      return inst.parts.map((p, i) => `(${i + 1}) ${p.kind === "text" ? "…" : partAnswer(inst, i, lang)}`).join("  ");
    }
    if (inst.choices) {
      const i = inst.choices.findIndex((c) => c.correct);
      return `${LETTERS[i]}) ${choiceText(inst, i, lang)}`;
    }
    return valueString(inst, inst.answer, lang);
  }

  // ---------------------------------------------------------------------------
  // Sınav oluşturma ve cevap kontrolü
  // ---------------------------------------------------------------------------
  function examSeed(student, code) {
    return normalize(student) + "|" + normalize(code);
  }

  // config.js'teki activeSubjects listesine göre kullanımda olan şablonlar.
  function active() {
    const subs = CONFIG.activeSubjects;
    return subs && subs.length ? templates.filter((t) => subs.includes(t.subject)) : templates.slice();
  }

  function topicOf(t) {
    return t.topic || t.subject || "";
  }

  /**
   * Geçmişten kalıp istatistiği: id → { seen, wrong, open }
   * open: kalıbın en son çözümü yanlış (henüz düzeltilmemiş yanlış)
   */
  function practiceStats(history) {
    const st = {};
    const list = (history || []).slice().sort((a, b) => String(a.at || "").localeCompare(String(b.at || "")));
    for (const a of list) (a.ids || []).forEach((id, i) => {
      const s = (st[id] = st[id] || { seen: 0, wrong: 0, open: false });
      s.seen++;
      const ok = !!(a.ok && a.ok[i]);
      if (!ok) s.wrong++;
      s.open = !ok;
    });
    return st;
  }
  // Düzeltilmemiş yanlış kalıplar (en çok yanlış yapılan önce)
  function mistakeIds(history, topics) {
    const st = practiceStats(history);
    return Object.keys(st)
      .filter((id) => st[id].open && active().some((t) => t.id === id && (!topics || !topics.length || topics.includes(topicOf(t)))))
      .sort((a, b) => st[b].wrong - st[a].wrong);
  }

  /**
   * ids: yalnızca bu kalıplar (yanlışları tekrar çözme)
   * seen: id → kaç kez görüldüğü; verilirse en az görülen kalıplar önce gelir
   * (aynı kalıpların sürekli çıkmasını önler). Verilmezse seçim yalnızca sınav
   * koduna bağlıdır: öğretmenin sınavında herkes aynı kalıpları görür.
   */
  // Sınıf / sınav grupları: 9, 10, 11, 12 → o sınıfın soruları;
  // TYT → 9–10. sınıf konularından çoktan seçmeli; AYT → 11–12. sınıf konularından çoktan seçmeli.
  const GROUPS = ["9", "10", "11", "12", "tyt", "ayt"];
  function inGroup(tpl, g) {
    if (!g) return true;
    const gr = Number(tpl.grade);
    if (g === "tyt") return (gr === 9 || gr === 10) && formatOf(tpl) === "test";
    if (g === "ayt") return gr >= 11 && formatOf(tpl) === "test";
    return gr === Number(g);
  }
  function poolFor(g) {
    return active().filter((t) => inGroup(t, g));
  }

  function buildExam({ student, code, count, subjects, topics, levels, formats, ids, seen, salt, group }) {
    const seed = examSeed(student, code);
    let pool = ids
      ? ids.map((id) => active().find((t) => t.id === id)).filter(Boolean)
      : poolFor(group).filter((t) =>
        (!subjects || !subjects.length || subjects.includes(t.subject)) &&
        (!topics || !topics.length || topics.includes(topicOf(t))) &&
        (!levels || !levels.length || levels.includes(levelOf(t))) &&
        (!formats || !formats.length || formats.includes(formatOf(t))));
    if (!ids) pool = shuffle(pool, makeRng("pick", normalize(code), salt || ""));
    if (seen && !ids) {
      // en az görülen önce; eşitlikte karışık sıra korunur
      pool = pool.map((t, i) => [t, i]).sort((a, b) => (seen[a[0].id] || 0) - (seen[b[0].id] || 0) || a[1] - b[1]).map((x) => x[0]);
    }
    if (count) pool = pool.slice(0, count);
    // Kolaydan zora doğru sırala (aynı seviyede seçim sırası korunur).
    pool = pool.map((t, i) => [t, i]).sort((a, b) => levelOf(a[0]) - levelOf(b[0]) || a[1] - b[1]).map((x) => x[0]);
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
    if (inst.type === "yazili") return pointsOf(inst, response) >= maxPoints(inst);
    if (inst.choices) {
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
    active,
    topicOf,
    levelOf,
    kindOf,
    formatOf,
    PART_LETTERS,
    partPoints,
    partSolution,
    solve,
    hasSteps,
    solutionSteps,
    SOLUTIONS,
    partLabel,
    outcomeOf,
    scale100,
    maxPoints,
    partText,
    partOptions,
    partUnit,
    partModel,
    partRubric,
    partAnswer,
    partScores,
    pointsOf,
    hasTextParts,
    add,
    compile,
    evaluate,
    makeRng,
    normalize,
    formatNum,
    generate,
    render,
    renderParts,
    ROMAN,
    localized,
    unitFor,
    valueString,
    answerString,
    choiceText,
    choiceHtml,
    choiceHeader,
    figure,
    esc,
    examSeed,
    practiceStats,
    mistakeIds,
    buildExam,
    GROUPS,
    inGroup,
    poolFor,
    parseAnswer,
    isCorrect,
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
