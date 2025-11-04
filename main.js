// main.js — optimized & unified theming

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

  // color actions
  btnResetColors: $("#btn-reset-colors"),
  btnRandomColors: $("#btn-random-colors"),
  btnSaveTheme: $("#btn-save-theme"),
  btnLoadTheme: $("#btn-load-theme"),
  btnCopyCSS: $("#btn-copy-css"),
  btnExportTheme: $("#btn-export-theme"),
  btnImportTheme: $("#btn-import-theme"),
  inpImportTheme: $("#inp-import-theme"),
};

// ---------- defaults ----------
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

const THEME_KEY = "cake_poster_theme_v1";

// ---------- CSS var ops ----------
function setCSSVars(colors, scope = els.sheet) {
  Object.entries(colors).forEach(([k, v]) =>
    scope.style.setProperty(`--${k}`, v)
  );
}

// Apply to both: whole app (root) + poster (sheet)
function applyTheme(colors) {
  const { ink, ...rest } = colors;
  setCSSVars(rest, document.documentElement);
  setCSSVars(colors, els.sheet);
}

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

function applyThemeFromPickers() {
  applyTheme(getPickerColors());
}

// ---------- misc helpers ----------
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
  const css = `:root{
  --bg:${colors.bg}; --ink:${colors.ink}; --kw:${colors.kw}; --mod:${colors.mod};
  --func:${colors.func}; --str:${colors.str}; --num:${colors.num}; --border:${colors.border};
  --codebg:${colors.codebg}; --punct:${colors.punct};
}`;
  return navigator.clipboard?.writeText(css);
}

function saveTheme(colors) {
  localStorage.setItem(THEME_KEY, JSON.stringify(colors));
}
function loadTheme() {
  try {
    return JSON.parse(localStorage.getItem(THEME_KEY) || "null");
  } catch {
    return null;
  }
}

// ---------- code area ----------
function updateCode(name, user, birthday) {
  let y = 2000,
    m = 1,
    d = 1;
  if (/^\d{4}-\d{2}-\d{2}$/.test(birthday))
    [y, m, d] = birthday.split("-").map(Number);

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

// ---------- inputs sync ----------
function applyInputs() {
  const name = els.name.value.trim() || defaults.name;
  const user = els.username.value.trim() || defaults.username;
  const bday = els.birthday.value || defaults.birthday;
  els.outName.innerHTML = escapeHtml(name).replace(/\s/g, "&nbsp;");
  els.outUser.textContent = user;
  updateCode(name, user, bday);
}

function loadDefaults() {
  els.name.value = defaults.name;
  els.username.value = defaults.username;
  els.birthday.value = defaults.birthday;

  // theme to both scopes + sync pickers
  applyTheme(defaults.colors);
  setPickers(defaults.colors);

  applyInputs();
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

async function savePNG() {
  await document.fonts?.ready?.catch(() => {});
  const dataUrl = await htmlToImage.toPng(els.sheet, {
    pixelRatio: 2,
    cacheBust: true,
  });
  download(dataUrl, `cake-poster-${Date.now()}.png`);
}

async function savePDF() {
  await document.fonts?.ready?.catch(() => {});
  const dataUrl = await htmlToImage.toPng(els.sheet, {
    pixelRatio: 2,
    cacheBust: true,
  });
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  pdf.addImage(dataUrl, "PNG", 0, 0, pageW, pageH, undefined, "FAST");
  pdf.save(`cake-poster-${Date.now()}.pdf`);
}

// ---------- bindings ----------
function bind() {
  // text/date inputs
  ["input", "change"].forEach((ev) => {
    els.name.addEventListener(ev, applyInputs);
    els.username.addEventListener(ev, applyInputs);
    els.birthday.addEventListener(ev, applyInputs);
  });

  // color pickers → live theme for app + sheet
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
    el.addEventListener("input", applyThemeFromPickers);
    el.addEventListener("change", applyThemeFromPickers);
  });

  // presets (include codebg & punct)
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

  // export actions
  els.btnPNG.onclick = savePNG;
  els.btnPDF.onclick = savePDF;
  els.btnPrint.onclick = () => window.print();

  // color actions
  els.btnResetColors.onclick = () => {
    setPickers(defaults.colors);
    applyTheme(defaults.colors);
  };
  els.btnRandomColors.onclick = () => {
    const p = randomPalette();
    setPickers(p);
    applyTheme(p);
  };

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
      applyTheme(c);
    } else {
      els.btnLoadTheme.textContent = "No Theme";
      setTimeout(() => (els.btnLoadTheme.textContent = "Load"), 1000);
    }
  };

  els.btnCopyCSS.onclick = async () => {
    await copyCssVars(getPickerColors());
    els.btnCopyCSS.textContent = "Copied ✓";
    setTimeout(() => (els.btnCopyCSS.textContent = "Copy CSS"), 1000);
  };

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

  els.btnImportTheme.onclick = () => els.inpImportTheme.click();
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
  loadDefaults();
  bind();
});
