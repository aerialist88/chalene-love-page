// ---------- Floating hearts background ----------
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const container = document.getElementById("heartsBg");
  const glyphs = ["❤️", "💗", "💖", "🌸", "💜"];
  const COUNT = 12;

  for (let i = 0; i < COUNT; i++) {
    const span = document.createElement("span");
    span.className = "floating-heart";
    span.textContent = glyphs[i % glyphs.length];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = (0.9 + Math.random() * 1.3) + "rem";

    if (reduced) {
      // Static, faint hearts scattered instead of animated
      span.style.top = Math.random() * 90 + "vh";
      span.style.opacity = 0.2;
    } else {
      const duration = 12 + Math.random() * 14; // gentle, slow
      span.style.animationDuration = duration + "s";
      span.style.animationDelay = -(Math.random() * duration) + "s";
    }
    container.appendChild(span);
  }
})();

// ---------- Surprise modal + confetti ----------
(function () {
  const overlay = document.getElementById("modalOverlay");
  const btn = document.getElementById("surpriseBtn");
  const closeBtn = document.getElementById("modalClose");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function confetti() {
    if (reduced) return;
    const glyphs = ["❤️", "💗", "💖", "💜", "🌸"];
    for (let i = 0; i < 24; i++) {
      const el = document.createElement("span");
      el.className = "confetti-heart";
      el.textContent = glyphs[i % glyphs.length];
      el.style.left = 50 + (Math.random() * 60 - 30) + "vw";
      el.style.top = "40vh";
      el.style.fontSize = (1 + Math.random() * 1.5) + "rem";
      el.style.animationDelay = (Math.random() * 0.4) + "s";
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
      setTimeout(() => el.remove(), 2500);
    }
  }

  function open() {
    overlay.hidden = false;
    confetti();
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    btn.focus();
  }

  btn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });
})();
