# Changelog

All notable changes to this project will be documented in this file.

This format follows **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)**, and this project adheres to **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.  
Commit messages follow **[Conventional Commits](https://www.conventionalcommits.org/)**.

## [Unreleased]

### Added

- **Fonts:** Added Inter (UI) and Fira Code (code blocks) via single optimized Google Fonts request.
- **SEO:** Added `hreflang` tags, `sitemap.xml`, improved meta descriptions, enhanced JSON-LD structured data with `author` and `sameAs`.
- **Accessibility:** Added `role="img"` to poster header SVGs for proper screen reader support.
- **Accessibility:** Added `prefers-reduced-motion` support — all CSS animations and hover transforms are disabled for users who prefer reduced motion.
- **Navbar:** Redesigned with brand icon + text, active page indicator (green underline), hamburger/close icon toggle, and dedicated GitHub button with inline SVG icon.
- **Stage lighting:** Environmental lighting system with ambient radial glow (`::before`), atmospheric shadow (`stage-shadow` div), and multi-layered contact/lift shadows on the poster.
- **Footer:** Always visible with `margin-top: auto` flex layout; added gradient separator line and improved backdrop blur.
- **Sitemap:** Added `sitemap.xml` for search engine indexing.

### Changed

- **HTML structure:** Moved `<header>` inside `<body>` (was invalid HTML5 — header was a direct child of `<html>` before `<body>`).
- **CSS design system:** Complete redesign with design tokens (`--r-*`, `--sp-*`, `--shadow-*`), glass morphism panel, refined form controls, and premium button styles.
- **Typography:** Replaced JetBrains Mono with Fira Code; added Inter as primary UI font; consolidated all fonts into one request.
- **Layout:** Grid-based layout with sticky sidebar, centered poster preview, and responsive breakpoints (1100px, 980px, 780px, 680px, 560px, 420px).
- **Button transitions:** Scoped `transition: all 0.15s ease` to UI controls only (`.panel button`, `.btn-github`, `.nav-toggle`, `.to-top`) — no longer leaks into poster internals.
- **Animation fill-mode:** Changed from `both` to `backwards` on `.panel` and `.sheet` animations — fixes hover transform being blocked by persistent animation fill.
- **Scroll behavior:** Removed `scroll-behavior: smooth` from `html` — was conflicting with the custom JS back-to-top spring animation.
- **CSS cleanup:** Removed 6 unused variables (`--accent`, `--brand-light`, `--brand-glow`, `--shadow-sheet`, `--shadow-xl`, `--shadow-md`, `--surface-glass`). Removed duplicate `.sheet` declaration, redundant `padding-bottom`, and redundant `align-self` rules.
- **JS refactoring:** Extracted `debounce()` to module scope; consolidated `syncURL`/`makeShareURL` via shared `buildShareParams()`; extracted avatar logic into `initAvatar()`; extracted color presets into `PRESETS` object; removed duplicate back-to-top handler.
- **JS scroll listener leak:** `fitCodeByFont()` now properly removes its scroll event listener on cleanup.
- **Export/Print:** All decorative effects (ambient glow, atmospheric shadow, sheet shadow) are automatically removed during PNG/PDF export and print.
- **Site shell:** Updated `site-shell.js` to handle hamburger/close icon toggle via `.is-open` class.
- **Meta descriptions:** Updated to English for both pages (were previously in Persian only).

### Fixed

- **Horizontal scrollbar:** `.stage-wrap::before` with `inset: -20%` was extending beyond the viewport. Fixed by adding `overflow: hidden` to `.stage-wrap` with reduced inset on mobile.
- **Space below footer:** `body { min-height: 100vh }` was forcing the body to fill the viewport, creating dead space below the footer. Removed `min-height` — footer now sits naturally via flex layout.
- **Animation hover bug:** `.sheet { animation: ... both }` prevented `.sheet:hover { transform }` from ever working. Changed to `backwards` fill-mode.
- **Scroll conflict:** `scroll-behavior: smooth` on `html` interfered with the custom `requestAnimationFrame` back-to-top animation. Removed from global styles.
- **Scroll listener leak:** `fitCodeByFont()` added a scroll listener on every call but never removed it. Now properly cleaned up.
- **Duplicate `.sheet` CSS:** Two `.sheet` blocks existed (main + animation). Merged into one.
- **Missing `.hint` class:** HTML referenced `class="hint"` but CSS had no rule for it. Added.
- **Print overflow:** `.stage-wrap` now gets `overflow: visible !important` in print styles to ensure poster renders correctly.

## [1.1.0] - 2025-11-12

### Added

- **UI / Export / Print:** Polished avatar flow with drag-and-drop, remove, and **reliable _Hide on export/print_ switch**.  
  Includes runtime class sync for print and export modes, and ObjectURL memory safety.
- **Share:** **Shareable URL** + copy-to-clipboard button. URL auto-sync keeps state in query parameters.
- **Export guards:** Friendly fallbacks if `html-to-image` or `jsPDF` are not yet available.
- **Docs:** Dual-language README (`README.md` English, `README.fa.md` Persian) with language switcher and professional badges.
- **CI / Assets:** Social preview & favicon; optimized `<head>` metadata (Open Graph / Twitter).

### Changed

- **Theming & inputs:** Improved color handling, presets, and input sync across pages.
- **Print pipeline:** Adaptive code fitting for print/PNG/PDF (font-size based, no transform).
- **Page config:** `#sheet` `data-*` attributes drive defaults (date label, defaults, filename prefix, theme key).

### Fixed

- Print styles for **A4 landscape** (panel hidden, safe inner margins).
- Isolated `--ink` text color scope (avoid bleeding outside code block).
- More robust screenshot refresh workflow (error handling).

### Removed

- Development-only files: `.vscode/settings.json`, obsolete screenshots / PNGs.
- Old CNAME replaced and re-created for Pages domain refresh.

### CI / Tooling

- Scheduled live screenshot refresh via GitHub Actions (Playwright).

**Credits:** @power0matin

## [1.0.0] - 2025-11-05

### Added

- Initial public release:
  - Birthday poster (`index.html`) and Exam poster (`school.html`)
  - HTML-driven template system aligned with CSS tokens
  - Export **PNG / PDF (A4)**, native **Print**
  - Warm/Cool/Dark presets + custom color pickers
  - README with live demo + preview

## Raw Commit Digest (Nov 04–12, 2025)

> A condensed view of the individual commits that informed releases.  
> (Authored/Committed by **power0matin**, unless noted)

- **2025-11-12**

  - feat(ui,export,print): add polished avatar flow + reliable hide-on-export; URL autosync; export guards

- **2025-11-11**

  - feat(share): add shareable URL + copy-to-clipboard button for poster state

- **2025-11-10**

  - Merge branch 'main' of github repo
  - docs(readme): update default values for customization

- **2025-11-09**

  - docs: update link for Exam Motivational Poster Generator _(Verified)_
  - docs: refine link text for Birthday Cake Generator _(Verified)_
  - chore: refresh live screenshot _(github-actions[bot])_
  - ci: refactor screenshot workflow to use Playwright and improve error handling
  - ci: refactor screenshot refresh workflow with error handling _(Verified)_
  - chore: delete .vscode/settings.json _(Verified)_
  - chore: delete school-poster-_.png _(Verified)\*
  - chore: move Screenshot → `assets/birthday-cake-preview.png` _(Verified)_
  - chore: add files via upload _(Verified)_
  - docs: update live demo link and preview image _(Verified)_
  - ci: implement scheduled live screenshot refresh workflow _(Verified)_
  - docs: update README; remove project status notice _(Verified)_
  - feat(export): adaptive code fit for print/PNG/PDF + page-agnostic config
  - refactor: exam preparation messages and variables _(Verified)_
  - i18n: add Persian translations to code snippets _(Verified)_
  - docs: update school.html _(Verified)_
  - refactor: enhance theming and input handling in main.js _(Verified)_
  - style(print): enhance A4 landscape styles _(Verified)_

- **2025-11-06 ~ 2025-11-05**
  - feat: social preview + favicon; optimize head for Telegram/OG
  - docs(meta): enhance OG/Twitter meta tags for better social sharing
  - feat(head): stabilize and optimize `<head>` for GitHub Pages; scaffolds
  - docs(chore): CNAME delete & recreate _(Verified)_
  - fix: isolate text color (--ink) to code section only

## Versioning

We use **Semantic Versioning**: `MAJOR.MINOR.PATCH`.

- **MAJOR**: incompatible API/HTML/CSS/JS changes
- **MINOR**: backward-compatible features
- **PATCH**: backward-compatible bug fixes

## Release Process

1. Update **CHANGELOG.md** under `[Unreleased]` with changes.
2. Decide version bump (major/minor/patch).
3. Create a new section `## [x.y.z] - YYYY-MM-DD`; move entries from `[Unreleased]` here.
4. Tag the release:
   ```bash
   git tag -a vX.Y.Z -m "Release X.Y.Z"
   git push origin vX.Y.Z
   ```
5. Create a GitHub Release and attach preview/screenshot if needed.

## Links

- **[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)**
- **[Conventional Commits](https://www.conventionalcommits.org/)**
- **[Semantic Versioning](https://semver.org/)**
