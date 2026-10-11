// Main UI interactions, 3D card tilt effect, reveal animations & contact form handling
(function () {
  const C = window.EP_CONFIG || {};

  // Social & contact links handler
  document.querySelectorAll("[data-link]").forEach((a) => {
    const k = a.dataset.link;
    const v = k === "email" ? (C.email ? "mailto:" + C.email : "") : C[k];
    if (v) {
      a.href = v;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.removeAttribute("href");
      a.title = "Not configured yet";
      a.classList.add("off");
    }
  });

  // Dynamic 3D tilt effect on hover for service cards
  document.querySelectorAll(".svc").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
      el.style.setProperty("--mx", (x + 0.5) * 100 + "%");
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // Intersection observer for scroll reveal effects
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".rv").forEach((n) => io.observe(n));

  // Contact form submission logic
  const f = document.getElementById("enq");
  const s = document.getElementById("status");
  if (f && s) {
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!f.checkValidity()) {
        f.reportValidity();
        return;
      }
      if (!C.formEndpoint) {
        s.textContent = "Form not connected yet: set formEndpoint in js/config.js (e.g. Formspree). Nothing was sent.";
        return;
      }
      try {
        const r = await fetch(C.formEndpoint, {
          method: "POST",
          body: new FormData(f),
          headers: { Accept: "application/json" }
        });
        if (r.ok) {
          s.textContent = "Thanks, your enquiry was sent.";
          f.reset();
        } else {
          s.textContent = "Submission failed. Please try again.";
        }
      } catch (_) {
        s.textContent = "Network error. Please try again.";
      }
    });
  }

  // Scroll to top button behavior
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (scrollTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on load
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
