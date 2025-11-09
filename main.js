// main.js — auto-config across pages (birthday, school, and future)

// ---------- tiny helpers ----------
const $ = (sel) => document.querySelector(sel);

const els = {
  name: $("#inp-name"),
  username: $("#inp-username"),
  birthday: $("#inp-birthday"),

  clrBg: $("#clr-bg"),
  clrInk: $("#clr-ink"),
  clrKw: $("#clr-kw"),
  clrMod: $("#clr-mod"),
  clrFunc: $("#clr-func"),
  clrStr: $("#clr-str"),
  clrNum: $("#clr-num"),
  clrBorder: $("#clr-border"),
  clrCodeBg: $("#clr-codebg"),
  clrPunct: $("#clr-punct"),

  presetWarm: $("#preset-warm"),
  presetCool: $("#preset-cool"),
  presetDark: $("#preset-dark"),

  btnPNG: $("#btn-png"),
  btnPDF: $("#btn-pdf"),
  btnPrint: $("#btn-print"),

  outName: $("#out-name"),
  outUser: $("#out-username"),
  sheet: $("#sheet"),
  code: $("#code"),

  btnResetColors: $("#btn-reset-colors"),
  btnRandomColors: $("#btn-random-colors"),
  btnSaveTheme: $("#btn-save-theme"),
  btnLoadTheme: $("#btn-load-theme"),
  btnCopyCSS: $("#btn-copy-css"),
  btnExportTheme: $("#btn-export-theme"),
  btnImportTheme: $("#btn-import-theme"),
  inpImportTheme: $("#inp-import-theme"),
};

// ---------- configuration via <section id="sheet" data-*> ----------
const dataset = els.sheet?.dataset || {};
const cfg = {
  dateLabel: dataset.dateLabel || "Birthday",
  defaultName: dataset.defaultName || "Your Name",
  defaultUsername: dataset.defaultUsername || "@username",
  defaultDate: dataset.defaultDate || "2000-01-01",
  filenamePrefix: dataset.filenamePrefix || "cake-poster",
  themeKey: dataset.themeKey || "cake_poster_theme_v1",
  mode:
    dataset.mode ||
    ((dataset.dateLabel || "").toLowerCase().includes("exam") ||
    (dataset.filenamePrefix || "").toLowerCase().includes("school") ||
    (els.sheet?.getAttribute("aria-label") || "").toLowerCase().includes("exam")
      ? "exam"
      : "birthday"),
};

// ---------- defaults ----------
const defaults = {
  name: cfg.defaultName,
  username: cfg.defaultUsername,
  birthday: cfg.defaultDate,
  colors: {
    bg: "#ffffff",
    ink: "#222222",
    kw: "#ff5722",
    mod: "#8e24aa",
    func: "#2e7d32",
    str: "#1565c0",
    num: "#d32f2f",
    border: "#e0e0e0",
    codebg: "#fafafa",
    punct: "#444444",
  },
};
let THEME_KEY = cfg.themeKey;

// reflect date label in UI
(function syncDateLabel() {
  if (!els.birthday) return;
  const label = els.birthday.closest("label");
  if (label) {
    const input = els.birthday;
    label.innerHTML = `${cfg.dateLabel}\n`;
    label.appendChild(input);
  }
})();

// ---------- CSS var ops ----------
function setCSSVars(colors, scope = els.sheet) {
  if (!scope) return;
  Object.entries(colors).forEach(([k, v]) =>
    scope.style.setProperty(`--${k}`, v)
  );
}
function applyTheme(colors) {
  if (!els.sheet) return;
  const { ink, ...rest } = colors;
  setCSSVars(rest, document.documentElement);
  setCSSVars(colors, els.sheet);
}
function getPickerColors() {
  return {
    bg: els.clrBg?.value || defaults.colors.bg,
    ink: els.clrInk?.value || defaults.colors.ink,
    kw: els.clrKw?.value || defaults.colors.kw,
    mod: els.clrMod?.value || defaults.colors.mod,
    func: els.clrFunc?.value || defaults.colors.func,
    str: els.clrStr?.value || defaults.colors.str,
    num: els.clrNum?.value || defaults.colors.num,
    border: els.clrBorder?.value || defaults.colors.border,
    codebg: els.clrCodeBg?.value || defaults.colors.codebg,
    punct: els.clrPunct?.value || defaults.colors.punct,
  };
}
function setPickers(c) {
  if (!c) return;
  if (els.clrBg) els.clrBg.value = c.bg;
  if (els.clrInk) els.clrInk.value = c.ink;
  if (els.clrKw) els.clrKw.value = c.kw;
  if (els.clrMod) els.clrMod.value = c.mod;
  if (els.clrFunc) els.clrFunc.value = c.func;
  if (els.clrStr) els.clrStr.value = c.str;
  if (els.clrNum) els.clrNum.value = c.num;
  if (els.clrBorder) els.clrBorder.value = c.border;
  if (els.clrCodeBg) els.clrCodeBg.value = c.codebg;
  if (els.clrPunct) els.clrPunct.value = c.punct;
}
function applyThemeFromPickers() {
  applyTheme(getPickerColors());
}

// ---------- misc ----------
function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function randHex() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}
function randomPalette() {
  const light = Math.random() > 0.5;
  const bg = light ? "#ffffff" : "#121212";
  const ink = light ? "#111111" : "#f5f5f5";
  return {
    bg,
    ink,
    kw: randHex(),
    mod: randHex(),
    func: randHex(),
    str: randHex(),
    num: randHex(),
    border: light ? "#e0e0e0" : "#333333",
    codebg: light ? "#fafafa" : "#1e1e1e",
    punct: light ? "#444444" : "#cccccc",
  };
}
function copyCssVars(colors) {
  const css = `:root{\n  --bg:${colors.bg}; --ink:${colors.ink}; --kw:${colors.kw}; --mod:${colors.mod};\n  --func:${colors.func}; --str:${colors.str}; --num:${colors.num}; --border:${colors.border};\n  --codebg:${colors.codebg}; --punct:${colors.punct};\n}`;
  return navigator.clipboard?.writeText(css);
}
function saveTheme(c) {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(c));
  } catch {}
}
function loadTheme() {
  try {
    return JSON.parse(localStorage.getItem(THEME_KEY) || "null");
  } catch {
    return null;
  }
}

// ---------- code templates ----------
function updateCode(name, user, dateStr) {
  let y = 2000,
    m = 1,
    d = 1;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr))
    [y, m, d] = dateStr.split("-").map(Number);
  if (!els.code) return;

  if (cfg.mode === "exam") {
    els.code.innerHTML = `\n<span class="kw">from</span> <span class="mod">datetime</span> <span class="kw">import</span> <span class="mod">date</span>
<span class="mod">today</span> <span class="kw">=</span> <span class="mod">date</span>.<span class="func">today</span>()

<span class="mod">name</span> <span class="kw">=</span> <span class="str">"${escapeHtml(
      name
    )}"</span>
<span class="mod">username</span> <span class="kw">=</span> <span class="str">"${escapeHtml(
      user
    )}"</span>

<span class="mod">exam_day</span> <span class="kw">=</span> <span class="mod">date</span>(<span class="num">${y}</span>, <span class="num">${m}</span>, <span class="num">${d}</span>)
<span class="mod">days_left</span> <span class="kw">=</span> (<span class="mod">exam_day</span> <span class="kw">-</span> <span class="mod">today</span>).<span class="func">days</span>

<span class="kw">if</span> <span class="mod">days_left</span> <span class="kw">&lt;=</span> <span class="num">0</span><span class="kw">:</span>
    <span class="func">print</span>(<span class="str">"🚀 روز آزمون رسیده: نفس بکش، تمرکز کن، و اجرا کن."</span>)
<span class="kw">elif</span> <span class="mod">today</span>.<span class="func">weekday</span>() <span class="kw">in</span> (<span class="num">5</span>, <span class="num">6</span>)<span class="kw">:</span>
    <span class="func">print</span>(<span class="str">"🌿 آخر هفته است — مرور کن و انرژی بگیر."</span>)
    <span class="func">review</span>()
    <span class="func">recharge</span>()
<span class="kw">else</span><span class="kw">:</span>
    <span class="func">print</span>(<span class="str">"📚 به فرایند اعتماد کن — هر بار یک سؤال."</span>)
    <span class="func">study</span>(<span class="mod">hours</span><span class="kw">=</span><span class="num">6</span>)
    <span class="func">practice</span>(<span class="mod">questions</span><span class="kw">=</span><span class="num">30</span>)
    <span class="func">review</span>()

<span class="kw">if</span> <span class="mod">days_left</span> <span class="kw">&gt;</span> <span class="num">0</span><span class="kw">:</span>
    <span class="func">print</span>(<span class="str">f"🎯 {days_left} روز تا آزمون — ادامه بده!"</span>)

<span class="func">print</span>(<span class="str">"🔥 تلاش امروزت = موفقیت فردایت."</span>)\n`;
  } else {
    els.code.innerHTML = `\n<span class="kw">from</span> <span class="mod">datetime</span> <span class="kw">import</span> <span class="mod">date</span>
<span class="mod">today</span> <span class="kw">=</span> <span class="mod">date</span>.<span class="func">today</span>()

<span class="mod">name</span> <span class="kw">=</span> <span class="str">"${escapeHtml(
      name
    )}"</span>
<span class="mod">username</span> <span class="kw">=</span> <span class="str">"${escapeHtml(
      user
    )}"</span>

<span class="mod">birthday</span> <span class="kw">=</span> <span class="mod">date</span>(<span class="num">${y}</span>, <span class="num">${m}</span>, <span class="num">${d}</span>)

<span class="kw">if</span> <span class="mod">today</span> <span class="kw">==</span> <span class="mod">birthday</span><span class="kw">:</span>
    <span class="func">print</span>(<span class="str">f"🎉 Happy Birthday, {name}! Level up unlocked!"</span>)
    <span class="func">party_mode</span>()
    <span class="func">spawn_confetti</span>(<span class="str">'🧁'</span>)
<span class="kw">elif</span> <span class="mod">today</span>.<span class="func">weekday</span>() <span class="kw">in</span> (<span class="num">5</span>, <span class="num">6</span>)<span class="kw">:</span>
    <span class="func">print</span>(<span class="str">"🌿 Weekend vibes — rest, play, repeat."</span>)
    <span class="func">recharge</span>()
<span class="kw">else</span><span class="kw">:</span>
    <span class="func">print</span>(<span class="str">"💻 Keep coding, keep growing."</span>)
    <span class="func">work</span>()

<span class="func">print</span>(<span class="str">"✨ End of script — beginning of greatness."</span>)\n`;
  }
}

// ---------- inputs sync ----------
function applyInputs() {
  const name = (els.name?.value || "").trim() || defaults.name;
  const user = (els.username?.value || "").trim() || defaults.username;
  const bday = els.birthday?.value || defaults.birthday;
  if (els.outName)
    els.outName.innerHTML = escapeHtml(name).replace(/\s/g, "&nbsp;");
  if (els.outUser) els.outUser.textContent = user;
  updateCode(name, user, bday);
}
function loadDefaults() {
  if (els.name) els.name.value = defaults.name;
  if (els.username) els.username.value = defaults.username;
  if (els.birthday) els.birthday.value = defaults.birthday;
  applyTheme(defaults.colors);
  setPickers(defaults.colors);
  applyInputs();
}

// ---------- FIT: adaptive by font-size (no transform) ----------
function fitCodeByFont() {
  const card = document.querySelector(".code-card");
  const pre = card?.querySelector("pre");
  if (!card || !pre) return () => {};

  // اندازه‌ی داخلی کارت
  const cardStyle = getComputedStyle(card);
  const availW =
    card.clientWidth -
    parseFloat(cardStyle.paddingLeft) -
    parseFloat(cardStyle.paddingRight);
  const availH =
    card.clientHeight -
    parseFloat(cardStyle.paddingTop) -
    parseFloat(cardStyle.paddingBottom);

  // اندازه های اولیه را نگه‌دار برای بازگردانی
  const prevSize = pre.style.fontSize || "";
  const prevLH = pre.style.lineHeight || "";

  // شروع از اندازه‌ی فعلی محاسبه‌شده
  const cs = getComputedStyle(pre);
  let sizePx = parseFloat(cs.fontSize) || 16;
  let lineH = parseFloat(cs.lineHeight) || sizePx * 1.4;

  pre.style.whiteSpace = "pre-wrap"; // خطوط شکسته شوند
  pre.style.overflow = "visible";
  pre.style.maxHeight = "none";

  // کاهش تطبیقی اندازه تا جا شود
  let guard = 120;
  while (guard-- > 0) {
    // اگر جا شد، تمام
    if (pre.scrollHeight <= availH && pre.scrollWidth <= availW) break;
    sizePx -= 0.5; // هر بار نیم‌پیکسل
    if (sizePx < 9) break; // حداقل خوانایی
    lineH = Math.max(sizePx * 1.35, 12);
    pre.style.fontSize = sizePx + "px";
    pre.style.lineHeight = lineH + "px";
  }

  // تابع بازگردانی
  return () => {
    pre.style.fontSize = prevSize;
    pre.style.lineHeight = prevLH;
  };
}

// ---------- export helpers ----------
function download(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function withExportStyles(run) {
  const html = document.documentElement;
  html.classList.add("exporting");
  try {
    await document.fonts?.ready;
  } catch {}

  // فیت تطبیقی
  const restore = fitCodeByFont();
  // دو فریم برای پایدار شدن layout
  await new Promise((r) =>
    requestAnimationFrame(() => requestAnimationFrame(r))
  );

  try {
    return await run();
  } finally {
    restore();
    html.classList.remove("exporting");
  }
}

async function savePNG() {
  if (!els.sheet) return;
  await withExportStyles(async () => {
    const bg = getComputedStyle(els.sheet).backgroundColor || "#ffffff";
    const dataUrl = await htmlToImage.toPng(els.sheet, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: bg,
    });
    download(dataUrl, `${cfg.filenamePrefix}-${Date.now()}.png`);
  });
}

async function savePDF() {
  if (!els.sheet) return;
  await withExportStyles(async () => {
    const bg = getComputedStyle(els.sheet).backgroundColor || "#ffffff";
    const dataUrl = await htmlToImage.toPng(els.sheet, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: bg,
    });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    pdf.addImage(dataUrl, "PNG", 0, 0, pageW, pageH, undefined, "FAST");
    pdf.save(`${cfg.filenamePrefix}-${Date.now()}.pdf`);
  });
}

// ---------- print: fit before/after ----------
window.addEventListener("beforeprint", () => {
  document.documentElement.classList.add("exporting");
  // نگه‌دارنده برای پس از چاپ
  window.__restorePrintFit = fitCodeByFont();
});
window.addEventListener("afterprint", () => {
  document.documentElement.classList.remove("exporting");
  if (window.__restorePrintFit) {
    window.__restorePrintFit();
    window.__restorePrintFit = null;
  }
});

// ---------- bindings ----------
function bind() {
  ["input", "change"].forEach((ev) => {
    els.name?.addEventListener(ev, applyInputs);
    els.username?.addEventListener(ev, applyInputs);
    els.birthday?.addEventListener(ev, applyInputs);
  });

  [
    els.clrBg,
    els.clrInk,
    els.clrKw,
    els.clrMod,
    els.clrFunc,
    els.clrStr,
    els.clrNum,
    els.clrBorder,
    els.clrCodeBg,
    els.clrPunct,
  ].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", applyThemeFromPickers);
    el.addEventListener("change", applyThemeFromPickers);
  });

  if (els.presetWarm)
    els.presetWarm.onclick = () =>
      applyTheme({
        bg: "#ffffff",
        ink: "#222222",
        kw: "#ff5722",
        mod: "#8e24aa",
        func: "#2e7d32",
        str: "#1565c0",
        num: "#d32f2f",
        border: "#e0e0e0",
        codebg: "#fafafa",
        punct: "#444444",
      });
  if (els.presetCool)
    els.presetCool.onclick = () =>
      applyTheme({
        bg: "#ffffff",
        ink: "#1a1a1a",
        kw: "#00acc1",
        mod: "#3949ab",
        func: "#00897b",
        str: "#1976d2",
        num: "#e53935",
        border: "#e0e0e0",
        codebg: "#f6f8fb",
        punct: "#3a3f47",
      });
  if (els.presetDark)
    els.presetDark.onclick = () =>
      applyTheme({
        bg: "#121212",
        ink: "#f5f5f5",
        kw: "#ff8a65",
        mod: "#ba68c8",
        func: "#81c784",
        str: "#64b5f6",
        num: "#ef5350",
        border: "#333333",
        codebg: "#1e1e1e",
        punct: "#cccccc",
      });

  if (els.btnPNG) els.btnPNG.onclick = savePNG;
  if (els.btnPDF) els.btnPDF.onclick = savePDF;
  if (els.btnPrint) els.btnPrint.onclick = () => window.print();

  if (els.btnResetColors)
    els.btnResetColors.onclick = () => {
      setPickers(defaults.colors);
      applyTheme(defaults.colors);
    };
  if (els.btnRandomColors)
    els.btnRandomColors.onclick = () => {
      const p = randomPalette();
      setPickers(p);
      applyTheme(p);
    };
  if (els.btnSaveTheme)
    els.btnSaveTheme.onclick = () => {
      const c = getPickerColors();
      saveTheme(c);
      els.btnSaveTheme.textContent = "Saved ✓";
      setTimeout(() => (els.btnSaveTheme.textContent = "Save"), 1000);
    };
  if (els.btnLoadTheme)
    els.btnLoadTheme.onclick = () => {
      const c = loadTheme();
      if (c) {
        setPickers(c);
        applyTheme(c);
      } else {
        els.btnLoadTheme.textContent = "No Theme";
        setTimeout(() => (els.btnLoadTheme.textContent = "Load"), 1000);
      }
    };
  if (els.btnCopyCSS)
    els.btnCopyCSS.onclick = async () => {
      await copyCssVars(getPickerColors());
      els.btnCopyCSS.textContent = "Copied ✓";
      setTimeout(() => (els.btnCopyCSS.textContent = "Copy CSS"), 1000);
    };

  if (els.btnExportTheme)
    els.btnExportTheme.onclick = () => {
      const blob = new Blob([JSON.stringify(getPickerColors(), null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "theme.json";
      a.click();
      URL.revokeObjectURL(url);
    };
  if (els.btnImportTheme)
    els.btnImportTheme.onclick = () => els.inpImportTheme?.click();
  if (els.inpImportTheme)
    els.inpImportTheme.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const c = JSON.parse(await file.text());
        setPickers(c);
        applyTheme(c);
      } catch {
        alert("Invalid theme file.");
      } finally {
        e.target.value = "";
      }
    };
}

// ---------- boot ----------
window.addEventListener("DOMContentLoaded", () => {
  THEME_KEY = cfg.themeKey;
  loadDefaults();
  bind();
});
