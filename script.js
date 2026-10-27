(() => {
  const header = document.querySelector('#header');
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('#mobile-nav');
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  let framePending = false;
  function updateNavigation() {
    header.classList.toggle('scrolled', window.scrollY > 35);
    const current = sections.filter(section => section.getBoundingClientRect().top <= 160).at(-1);
    navLinks.forEach(link => {
      const active = current && link.hash === `#${current.id}`;
      link.classList.toggle('active', Boolean(active));
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    framePending = false;
  }
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '打开导航菜单');
    mobileNav.hidden = true;
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    mobileNav.hidden = !open;
  });
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
  window.matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);
  window.addEventListener('scroll', () => {
    if (!framePending) { framePending = true; window.requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  updateNavigation();
})();
