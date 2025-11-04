// main.js — fixed & robust

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);

const els = {
  // inputs
  name: $("#inp-name"),
  username: $("#inp-username"),
  birthday: $("#inp-birthday"),

  // color pickers
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

  // presets
  presetWarm: $("#preset-warm"),
  presetCool: $("#preset-cool"),
  presetDark: $("#preset-dark"),

  // actions
  btnPNG: $("#btn-png"),
  btnPDF: $("#btn-pdf"),
  btnPrint: $("#btn-print"),

  // outputs / stage
  outName: $("#out-name"),
  outUser: $("#out-username"),
  sheet: $("#sheet"),
  code: $("#code"),

  // actions for colors
  btnResetColors: $("#btn-reset-colors"),
  btnRandomColors: $("#btn-random-colors"),
  btnSaveTheme: $("#btn-save-theme"),
  btnLoadTheme: $("#btn-load-theme"),
  btnCopyCSS: $("#btn-copy-css"),
  btnExportTheme: $("#btn-export-theme"),
  btnImportTheme: $("#btn-import-theme"),
  inpImportTheme: $("#inp-import-theme"),
};

// معقول‌ترین مقادیر پیش‌فرض
const defaults = {
  name: "Your Name",
  username: "@username",
  birthday: "2000-01-01",
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

// ست کردن CSS Variables (با اسم‌هایی مثل --bg, --ink, ...)
function setCSSVars(colors, scope = els.sheet) {
  Object.entries(colors).forEach(([k, v]) =>
    scope.style.setProperty(`--${k}`, v)
  );
}

// جلوگیری از اینجکشن
function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function updateCode(name, user, birthday) {
  // تاریخ معتبر YYYY-MM-DD
  let y = 2000,
    m = 1,
    d = 1;
  if (/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
    [y, m, d] = birthday.split("-").map(Number);
  }

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
const THEME_KEY = "cake_poster_theme_v1";

function getPickerColors() {
  return {
    bg: els.clrBg.value,
    ink: els.clrInk.value,
    kw: els.clrKw.value,
    mod: els.clrMod.value,
    func: els.clrFunc.value,
    str: els.clrStr.value,
    num: els.clrNum.value,
    border: els.clrBorder.value,
    codebg: els.clrCodeBg.value,
    punct: els.clrPunct.value,
  };
}

function setPickers(colors) {
  if (!colors) return;
  els.clrBg.value = colors.bg;
  els.clrInk.value = colors.ink;
  els.clrKw.value = colors.kw;
  els.clrMod.value = colors.mod;
  els.clrFunc.value = colors.func;
  els.clrStr.value = colors.str;
  els.clrNum.value = colors.num;
  els.clrBorder.value = colors.border;
  els.clrCodeBg.value = colors.codebg;
  els.clrPunct.value = colors.punct;
}

function applyPickerColors() {
  setCSSVars(getPickerColors());
}

function randHex() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

// کمی هدایت‌شده: پس‌زمینه روشن/تیره با کنتراست معقول
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
  const css = `:root{
  --bg:${colors.bg}; --ink:${colors.ink}; --kw:${colors.kw}; --mod:${colors.mod};
  --func:${colors.func}; --str:${colors.str}; --num:${colors.num}; --border:${colors.border};
}`;
  return navigator.clipboard?.writeText(css);
}

function saveTheme(colors) {
  localStorage.setItem(THEME_KEY, JSON.stringify(colors));
}

function loadTheme() {
  const raw = localStorage.getItem(THEME_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// همگام‌سازی UI با خروجی
function applyInputs() {
  const name = els.name.value.trim() || defaults.name;
  const user = els.username.value.trim() || defaults.username;
  const bday = els.birthday.value || defaults.birthday;

  // نمایش عنوان و یوزرنیم
  els.outName.innerHTML = escapeHtml(name).replace(/\s/g, "&nbsp;");
  els.outUser.textContent = user;

  // کد پایتون-مانند
  updateCode(name, user, bday);
}

// پر کردن فرم با پیش‌فرض‌ها
function loadDefaults() {
  els.name.value = defaults.name;
  els.username.value = defaults.username;
  els.birthday.value = defaults.birthday;

  setCSSVars(defaults.colors);

  // ست کردن پیکرهای رنگ
  els.clrBg.value = defaults.colors.bg;
  els.clrInk.value = defaults.colors.ink;
  els.clrKw.value = defaults.colors.kw;
  els.clrMod.value = defaults.colors.mod;
  els.clrFunc.value = defaults.colors.func;
  els.clrStr.value = defaults.colors.str;
  els.clrNum.value = defaults.colors.num;
  els.clrBorder.value = defaults.colors.border;

  applyInputs();
}

// دانلود دیتای URL (سازگار با فایرفاکس)
function download(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// خروجی PNG با کیفیت بالا
async function savePNG() {
  const node = els.sheet;
  // بعد از رندر فونت‌ها
  await document.fonts?.ready?.catch(() => {});
  const dataUrl = await htmlToImage.toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
  });
  download(dataUrl, `cake-poster-${Date.now()}.png`);
}

// خروجی PDF A4 افقی
async function savePDF() {
  const node = els.sheet;
  await document.fonts?.ready?.catch(() => {});
  const dataUrl = await htmlToImage.toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
  });

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  // پر کردن تمام صفحه (حاشیه‌ها در دیزاین خود شیت لحاظ شده)
  pdf.addImage(dataUrl, "PNG", 0, 0, pageW, pageH, undefined, "FAST");
  pdf.save(`cake-poster-${Date.now()}.pdf`);
}

// بایند کردن رویدادها
function bind() {
  // همگام‌سازی ورودی‌های متنی و تاریخ
  ["input", "change"].forEach((ev) => {
    els.name.addEventListener(ev, applyInputs);
    els.username.addEventListener(ev, applyInputs);
    els.birthday.addEventListener(ev, applyInputs);

    const colorHandler = () =>
      setCSSVars({
        bg: els.clrBg.value,
        ink: els.clrInk.value,
        kw: els.clrKw.value,
        mod: els.clrMod.value,
        func: els.clrFunc.value,
        str: els.clrStr.value,
        num: els.clrNum.value,
        border: els.clrBorder.value,
        codebg: els.clrCodeBg.value, // ✅ جدید
        punct: els.clrPunct.value, // ✅ جدید
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
      els.clrPunct, // ✅ جدید
    ].forEach((el) =>
      ["input", "change"].forEach((ev) => el.addEventListener(ev, colorHandler))
    );
  });

  // پرِست‌ها
  els.presetWarm.onclick = () =>
    setCSSVars({
      bg: "#ffffff",
      ink: "#222222",
      kw: "#ff5722",
      mod: "#8e24aa",
      func: "#2e7d32",
      str: "#1565c0",
      num: "#d32f2f",
      border: "#e0e0e0",
    });

  els.presetCool.onclick = () =>
    setCSSVars({
      bg: "#ffffff",
      ink: "#1a1a1a",
      kw: "#00acc1",
      mod: "#3949ab",
      func: "#00897b",
      str: "#1976d2",
      num: "#e53935",
      border: "#e0e0e0",
    });

  els.presetDark.onclick = () =>
    setCSSVars({
      bg: "#121212",
      ink: "#f5f5f5",
      kw: "#ff8a65",
      mod: "#ba68c8",
      func: "#81c784",
      str: "#64b5f6",
      num: "#ef5350",
      border: "#333333",
    });

  // اکشن‌ها
  els.btnPNG.onclick = savePNG;
  els.btnPDF.onclick = savePDF;
  els.btnPrint.onclick = () => window.print();
}
// رنگ‌ها از پیکرها به CSS
const colorHandler = () => applyPickerColors();
// ... لیست addEventListener موجود برای کلرها تغییری نکند

// دکمه Reset: برگشت به defaults
els.btnResetColors.onclick = () => {
  setPickers(defaults.colors);
  setCSSVars(defaults.colors);
};

// دکمه Random: تولید پالت تصادفی
els.btnRandomColors.onclick = () => {
  const pal = randomPalette();
  setPickers(pal);
  setCSSVars(pal);
};

// Save / Load در localStorage
els.btnSaveTheme.onclick = () => {
  const c = getPickerColors();
  saveTheme(c);
  els.btnSaveTheme.textContent = "Saved ✓";
  setTimeout(() => (els.btnSaveTheme.textContent = "Save"), 1000);
};
els.btnLoadTheme.onclick = () => {
  const c = loadTheme();
  if (c) {
    setPickers(c);
    setCSSVars(c);
  } else {
    els.btnLoadTheme.textContent = "No Theme";
    setTimeout(() => (els.btnLoadTheme.textContent = "Load"), 1000);
  }
};

// Copy CSS vars
els.btnCopyCSS.onclick = async () => {
  await copyCssVars(getPickerColors());
  els.btnCopyCSS.textContent = "Copied ✓";
  setTimeout(() => (els.btnCopyCSS.textContent = "Copy CSS"), 1000);
};

// Export JSON
els.btnExportTheme.onclick = () => {
  const c = getPickerColors();
  const blob = new Blob([JSON.stringify(c, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "theme.json";
  a.click();
  URL.revokeObjectURL(url);
};

// Import JSON
els.btnImportTheme.onclick = () => els.inpImportTheme.click();
els.inpImportTheme.onchange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const c = JSON.parse(text);
    setPickers(c);
    setCSSVars(c);
  } catch {
    alert("Invalid theme file.");
  } finally {
    e.target.value = "";
  }
};

// شروع
window.addEventListener("DOMContentLoaded", () => {
  els.clrCodeBg.value = defaults.colors.codebg; // ✅
  els.clrPunct.value = defaults.colors.punct; // ✅
  loadDefaults();
  bind();
});
