<div style="
  background: #fff3cd;
  color: #856404;
  border-bottom: 1px solid #ffeeba;
  padding: 10px 20px;
  font-family: sans-serif;
  font-size: 15px;
  text-align: center;
">
  ⚠️ This project is under development and not fully functional yet.
</div>

# 🎂 Birthday Cake Generator

A free and open-source tool to **create printable A4 cake posters** — perfect for bakeries, birthday parties, and fun code-style designs!

With this project you can edit your **name**, **username**, **birthday**, and **color theme** directly in your browser, then **export it as PNG or PDF (A4 landscape)** — ready for printing on your birthday cake! 🍰


## 🌐 Live Demo
👉 [https://power0matin.github.io/birthday-cake-generator/](https://power0matin.github.io/birthday-cake-generator/)


## ✨ Features
- 🎨 Fully customizable (name, username, birthday, colors)
- 🧁 A4 **landscape** layout optimized for printing
- 📸 Export as **PNG** or **PDF (A4)**
- 🖨️ Print directly with perfect margins
- 💻 Works offline — just open `index.html`
- 🌈 Live color palette presets + custom color pickers
- ⚡ No frameworks, no build — 100% pure HTML, CSS, JS


## 🚀 Quick Start
1. **Clone** this repository:
   ```bash
   git clone https://github.com/power0matin/birthday-cake-generator.git
   cd birthday-cake-generator

2. **Open** `index.html` in your browser.
3. Customize your text and colors.
4. Export as **PNG**, **PDF (A4)**, or print it directly.


## 🖼️ How It Works

The generator uses:

* **html-to-image** → to export the page as a PNG
* **jsPDF** → to save a ready-to-print PDF file
* **CSS @page** rules for perfect A4 landscape printing
* **JetBrains Mono** font for the beautiful code-look


## 🧠 Use Cases

* Print for **birthday cakes**
* Use as **digital poster**
* Create **personalized gifts**
* Fun project for **developers who love code**


## ⚙️ Customize Defaults

Edit the `defaults` object inside `main.js` to set your own default:

```js
const defaults = {
  name: "Matin Shahabadi",
  username: "@powermatin",
  birthday: "2007-10-14",
};
```


## 💾 Export Options

* **Save PNG** → for bakeries or photo printing (recommended)
* **Save PDF (A4)** → for home printing or sharing
* **Print** → opens system print dialog with A4 landscape format


## 🪄 SEO Keywords

`birthday cake generator, cake poster, printable cake design, A4 cake template, birthday code poster, birthday card for developers`


## 🧁 Credits

Created with ❤️ by [power0matin](https://github.com/power0matin)
Based on an idea by Matin Shahabadi
Font: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)


## 📜 License

This project is licensed under the **MIT License** — free to use and modify.