(() => {
  // ====== Nav Component Script Start ====== //
  // ====== Nav Component Script Start ====== //
  const body = document.body;
  const navToggle = document.querySelector(".nav1-toggle");
  const navHeader = document.querySelector("#nav1-navigation");
  const overlay = document.getElementById("nav-overlay");

  if (navHeader) {
    const onScroll = () => {
      navHeader.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const closeMainNav = () => {
    navToggle.classList.remove("active");
    navHeader.classList.remove("nav1-active");
    body.classList.remove("nav1-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  // Main Aria Nav Toggle
  navToggle.addEventListener("click", () => {
    const navAria = navToggle.getAttribute("aria-expanded");
    navToggle.classList.toggle("active");
    navHeader.classList.toggle("nav1-active");
    body.classList.toggle("nav1-open");
    navToggle.setAttribute(
      "aria-expanded",
      navAria === "false" ? "true" : "false",
    );
    overlay.classList.toggle("active");

    const shouldBeScrolled =
      window.scrollY > 10 || navHeader.classList.contains("nav1-active");

    if (shouldBeScrolled) {
      navHeader.classList.add("is-scrolled");
    } else {
      setTimeout(() => {
        // re-check to avoid race conditions
        if (
          window.scrollY <= 10 &&
          !navHeader.classList.contains("nav1-active")
        ) {
          navHeader.classList.remove("is-scrolled");
        }
      }, 300);
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeMainNav);
  }
  // ====== Nav Component Script END ====== //
  // ====== Nav Component Script END ====== //

  //Reveal animation trigger
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  revealEls.forEach((el) => observer.observe(el));
})();
