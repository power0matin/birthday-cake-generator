# Changelog

All notable changes to this project will be documented in this file.

This format follows **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)**, and this project adheres to **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.  
Commit messages follow **[Conventional Commits](https://www.conventionalcommits.org/)**.

## [Unreleased]

### Planned

- Presets: Pastel / Neon / Solarized
- Avatar shape toggle (circle / rounded-square)
- Big countdown overlay for Exam mode
- PWA (Add to Home Screen)
- High-contrast accessibility theme

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
