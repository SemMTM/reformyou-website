(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const mobileNavigation = window.matchMedia("(max-width: 62rem)");

  const syncNavigationAccessibility = () => {
    if (!header || !navigation) return;

    const isOpen = header.classList.contains("is-open");
    const isMobile = mobileNavigation.matches;
    navigation.toggleAttribute("inert", isMobile && !isOpen);

    if (isMobile) {
      navigation.setAttribute("aria-hidden", String(!isOpen));
    } else {
      navigation.removeAttribute("aria-hidden");
    }

    [main, footer].forEach((region) => {
      if (region) region.toggleAttribute("inert", isMobile && isOpen);
    });
  };

  const closeMenu = (restoreFocus = false) => {
    if (!header || !menuToggle) return;
    header.classList.remove("is-open");
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    syncNavigationAccessibility();
    if (restoreFocus) menuToggle.focus();
  };

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  if (header && menuToggle) {
    menuToggle.addEventListener("click", () => {
      const willOpen = !header.classList.contains("is-open");
      header.classList.toggle("is-open", willOpen);
      body.classList.toggle("menu-open", willOpen);
      menuToggle.setAttribute("aria-expanded", String(willOpen));
      menuToggle.setAttribute(
        "aria-label",
        willOpen ? "Close navigation" : "Open navigation",
      );
      syncNavigationAccessibility();
    });
  }

  if (navigation) {
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header?.classList.contains("is-open"))
      closeMenu(true);
  });

  mobileNavigation.addEventListener("change", () => {
    if (!mobileNavigation.matches) closeMenu();
    syncNavigationAccessibility();
  });

  syncNavigationAccessibility();

  const initialiseMotion = () => {
    if (
      !window.gsap ||
      !window.ScrollTrigger ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    window.gsap.registerPlugin(window.ScrollTrigger);
    const scrubHeading = document.querySelector("[data-scrub-text]");
    const heroVisual = document.querySelector("[data-hero-visual]");

    if (heroVisual) {
      window.gsap.from(heroVisual.querySelector(".hero-media"), {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0, 0 0)",
        y: 20,
        duration: 1.05,
        delay: 0.12,
        ease: "power3.out",
      });

      window.gsap.from(heroVisual.querySelector(".hero-inset"), {
        x: -28,
        y: 24,
        opacity: 0,
        duration: 0.85,
        delay: 0.55,
        ease: "power3.out",
      });

      window.gsap.from(heroVisual.querySelector(".hero-frame"), {
        scaleY: 0.82,
        transformOrigin: "top",
        opacity: 0,
        duration: 0.8,
        delay: 0.35,
        ease: "power2.out",
      });
    }

    if (scrubHeading) {
      const words = scrubHeading.textContent.trim().split(/\s+/);
      scrubHeading.textContent = "";
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        scrubHeading.append(span, index === words.length - 1 ? "" : " ");
      });

      window.gsap.to(scrubHeading.querySelectorAll(".word"), {
        color: "#282828",
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: scrubHeading,
          start: "top 80%",
          end: "bottom 42%",
          scrub: true,
        },
      });
    }

    window.gsap.utils
      .toArray(
        ".hero-copy > *, .section-heading-row > *, .reviews-copy > *, .founder-copy > *",
      )
      .forEach((element) => {
        window.gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },
        });
      });

    window.gsap.utils.toArray("[data-reveal]").forEach((element) => {
      window.gsap.from(element, {
        y: 34,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    });

    window.gsap.utils.toArray("[data-media-reveal]").forEach((element) => {
      window.gsap.fromTo(
        element,
        { scale: 0.92, opacity: 0.55 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 92%",
            end: "top 48%",
            scrub: true,
          },
        },
      );
    });
  };

  initialiseMotion();
})();
