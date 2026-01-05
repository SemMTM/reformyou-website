(() => {
  // ====== Nav Component Script Start ====== //
  // ====== Nav Component Script Start ====== //
  const body = document.body;
  const navToggle = document.querySelector('.nav1-toggle');
  const navHeader = document.querySelector('#nav1-navigation');
  const overlay = document.getElementById('nav-overlay');

  const closeMainNav = () => { 
    navToggle.classList.remove('active'); 
    navHeader.classList.remove('nav1-active'); 
    body.classList.remove('nav1-open'); 
    navToggle.setAttribute('aria-expanded', 'false'); 
    if (overlay) overlay.classList.remove('active'); 
    // also close any open submenus when nav closes
    document.querySelectorAll('.nav1-has-submenu.open').forEach((li) => closeItem(li)); // ADDED
  };
  
  // Main Aria Nav Toggle
  navToggle.addEventListener('click', () => {
    const navAria = navToggle.getAttribute("aria-expanded");
    navToggle.classList.toggle('active');
    navHeader.classList.toggle('nav1-active');
    body.classList.toggle('nav1-open');
    navToggle.setAttribute(
      "aria-expanded", navAria === "false" ? "true" : "false")
    overlay.classList.toggle('active');
  });

  if (overlay) { 
    overlay.addEventListener('click', closeMainNav); 
  }
  // ====== Nav Component Script END ====== //
  // ====== Nav Component Script END ====== //
})();