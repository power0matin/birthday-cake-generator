<!-- Language Switcher -->
<p align="center">
  <b>🌐 This page:</b> English &nbsp;|&nbsp;
  <a href="./README.fa.md"><b>فارسی</b></a>
</p>

<h1 align="center">🎂 Cake/Exam Poster Generator</h1>

<p align="center">
  <a href="https://power0matin.github.io/birthday-cake-generator/">
    <img alt="Poster preview" src="./assets/birthday-cake-preview.png" width="100%" loading="lazy">
  </a>
</p>

<p align="center">
  <a href="https://img.shields.io/badge/pages-live-6f48ff?logo=github&logoColor=white"><img alt="GitHub Pages" src="https://img.shields.io/badge/pages-live-6f48ff?logo=github&logoColor=white"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success.svg"></a>
  <a href="./CHANGELOG.md"><img alt="Changelog" src="https://img.shields.io/badge/changelog-Keep%20a%20Changelog-0ea5e9"></a>
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/power0matin/birthday-cake-generator?label=size">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/power0matin/birthday-cake-generator">
  <img alt="Open issues" src="https://img.shields.io/github/issues/power0matin/birthday-cake-generator">
  <img alt="Stars" src="https://img.shields.io/github/stars/power0matin/birthday-cake-generator?style=social">
</p>

<p align="center">
  <a href="https://www.javascript.com/"><img alt="Made with JS" src="https://img.shields.io/badge/made%20with-JavaScript-f7df1e?logo=javascript&logoColor=000"></a>
  <img alt="Offline Ready" src="https://img.shields.io/badge/offline-ready-0ea5e9">
  <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-10b981">
</p>

A free, offline, zero-build tool to create **print-ready A4 landscape posters** in a playful, code-styled layout — perfect for **birthday cakes**, **exam motivation**, gifts, and dev events.

<p align="center">
  <a href="https://power0matin.github.io/birthday-cake-generator/"><b>🎉 Birthday Poster (Demo)</b></a> ·
  <a href="https://power0matin.github.io/birthday-cake-generator/school.html"><b>📚 Exam Poster (Demo)</b></a>
</p>

## ✨ Highlights

- 🎨 Customizable: **Name**, **Username**, **Date** (Birthday/Exam), **Color Theme**
- 🖼️ **Avatar/Logo** with **click** or **drag & drop** + remove
- 🧩 **Hide logo on export/print** (modern switch UI)
- 🌈 Presets + full custom pickers
- 💾 **Save/Load** theme (localStorage), **Export/Import** theme (JSON)
- 🔗 **Shareable URL** (auto-syncs to query params)
- 📤 Export **PNG** (hi-res) / **PDF (A4)** · 🖨️ Native Print
- ⚡ No framework/build — just **HTML/CSS/JS**
- 📴 Works **offline**

## 🗂️ Structure

```
.
├─ index.html          # Birthday poster
├─ school.html         # Exam poster
├─ style.css           # UI + print/export styles
├─ main.js             # App logic
└─ assets/
   └─ birthday-cake-preview.png
```

## 🚀 Quick Start

```bash
git clone https://github.com/power0matin/birthday-cake-generator.git
cd birthday-cake-generator
# Open one of these in your browser:
# - index.html (Birthday)
# - school.html (Exam)
```

Optional local server:

```bash
python -m http.server 8080
# open http://localhost:8080
```

## 🧭 Usage

1. Enter **Name / Username / Date** in **Settings**.
2. Pick **Warm / Cool / Dark** or customize colors.
3. **Logo/Avatar**: click or drag & drop.
   - Toggle **Hide on export/print** as needed.
   - Use **Remove Logo** to clear.
4. Use **Share Link** (URL auto-updates).
5. Export **PNG**, **PDF (A4)**, or **Print**.

## ⚙️ Page Configuration

Each page reads defaults from `data-*` on `#sheet`:

```html
<section
  id="sheet"
  class="sheet"
  aria-label="A4 Cake Poster"
  data-date-label="Birthday"
  data-default-name="Your Name"
  data-default-username="@username"
  data-default-date="2000-01-01"
  data-filename-prefix="cake-poster"
  data-theme-key="cake_poster_theme_v1"
></section>
```

## 🔗 Shareable URL

Query params kept in sync:

```
n, u, d, bg, ink, kw, mod, func, str, num, border, codebg, punct
```

Open the URL to restore the same configuration.

## 🎛️ Theme JSON

```json
{
  "bg": "#ffffff",
  "ink": "#222222",
  "kw": "#ff5722",
  "mod": "#8e24aa",
  "func": "#2e7d32",
  "str": "#1565c0",
  "num": "#d32f2f",
  "border": "#e0e0e0",
  "codebg": "#fafafa",
  "punct": "#444444"
}
```

## 🧩 Tech Notes

- **Export**: `html-to-image` (PNG), `jsPDF` (A4 landscape)
- **Print**: `@page` rules; panel hidden; safe margins
- **Typography**: JetBrains Mono
- **Resilience**: guards if libs aren’t loaded yet; ObjectURL revocation; pre-print sync

## ♿ Accessibility

- Labeled controls, keyboard-focusable switch
- Color contrast depends on theme (consider a high-contrast preset)

## 🤝 Contributing

PRs welcome! Please use **Conventional Commits**:

```
feat: add new preset
fix: correct print margins in Firefox
docs: update README with URL params
```

## 🧭 Roadmap

- Presets (Pastel/Neon/Solarized)
- Circle/square avatar option
- Large countdown for Exam mode
- PWA (Add to Home Screen)

## 📜 License

**MIT** — free to use and modify.

## 🙌 Credits

Built with ❤️ by [power0matin](https://github.com/power0matin) · Font: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## 🧾 Changelog

See **[CHANGELOG.md](./CHANGELOG.md)** for release notes (Keep a Changelog + SemVer).
