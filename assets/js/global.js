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

  // Toggle Aria and Open class on submenus
  const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;
  
  const openItem = (li) => {
    const btn = li.querySelector('.nav1-submenu-dropdown');
    const submenu = li.querySelector('.nav1-submenu');
    li.classList.add('open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (!isDesktop && submenu) submenu.style.maxHeight = submenu.scrollHeight + 'px';
  };

  const closeItem = (li) => {
    const btn = li.querySelector('.nav1-submenu-dropdown');
    const submenu = li.querySelector('.nav1-submenu');
    li.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (!isDesktop && submenu) submenu.style.maxHeight = 0;
  };

  document.querySelectorAll('.nav1-has-submenu').forEach(li => {
    const btn = li.querySelector('.nav1-submenu-dropdown');
    const submenu = li.querySelector('.nav1-submenu');
    // Ensure mobile inline style starts closed
    if (!isDesktop && submenu) submenu.style.maxHeight = 0;

    // Desktop: hover to open/close
    if (isDesktop) {
      // MODIFIED: when hovering a submenu, first close any others, then open this one
      li.addEventListener('mouseenter', () => { 
        document.querySelectorAll('.nav1-has-submenu.open').forEach(el => { 
          if (el !== li) closeItem(el); 
        }); 
        openItem(li);
      }); 

      li.addEventListener('mouseleave', () => closeItem(li));
      if (submenu) submenu.addEventListener('mouseleave', () => closeItem(li));
    } else if (btn) {

      // Mobile/Tablet: click to toggle
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (li.classList.contains('open')) {
          closeItem(li);
        } else {
          document.querySelectorAll('.nav1-has-submenu.open').forEach(el => {
            if (el !== li) closeItem(el);
          }); 
          openItem(li);
        }
      });
    }
  });

  // Click outside to close 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav1-has-submenu')) {
      document.querySelectorAll('.nav1-has-submenu.open').forEach(closeItem);
    }
  });
  // ====== Nav Component Script END ====== //
  // ====== Nav Component Script END ====== //
})();