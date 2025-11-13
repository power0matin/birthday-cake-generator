// site-shell.js — header/menu + back-to-top (animated)
(() => {
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function scrollToTopAnimated(duration = 700) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }
    const start = window.scrollY || document.documentElement.scrollTop || 0;
    if (start <= 0) return;
    const startTime = performance.now();
    (function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const y = Math.round(start * (1 - easeInOutCubic(t)));
      window.scrollTo(0, y);
      if (t < 1) requestAnimationFrame(step);
    })(startTime);
  }

  function init() {
    // سال فوتر
    const y = document.getElementById("site-year");
    if (y) y.textContent = new Date().getFullYear();

    // منوی موبایل
    const btn = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (btn && nav) {
      btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", (e) => {
        if (!nav.classList.contains("open")) return;
        if (!(nav.contains(e.target) || btn.contains(e.target))) {
          nav.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
      // لینک‌هایی که اسکرول داخلی دارند
      nav.querySelectorAll("[data-scroll]").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const sel = a.getAttribute("data-scroll");
          const el = sel && document.querySelector(sel);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          nav.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        });
      });
    }

    let lastY = 0;
    addEventListener(
      "scroll",
      () => {
        const y = scrollY;
        document
          .querySelector(".site-header")
          ?.classList.toggle("is-compact", y > 24 && y > lastY);
        lastY = y;
      },
      { passive: true }
    );

    // back-to-top
    const toTopBtn = document.getElementById("back-to-top");
    if (toTopBtn) {
      const showAfter = 220;
      const update = () =>
        toTopBtn.classList.toggle("is-visible", window.scrollY > showAfter);
      update();
      window.addEventListener("scroll", update, { passive: true });

      toTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toTopBtn.classList.add("rippling");
        setTimeout(() => toTopBtn.classList.remove("rippling"), 360);
        scrollToTopAnimated(700); // ← سرعت
      });
    }
  }

  // اطمینان از اجرای به‌موقع
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
