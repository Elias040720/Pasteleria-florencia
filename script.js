'use strict';

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Mobile navigation: Escape, focus restoration, and no hidden clickable links.
const header = qs('.site-header');
const menuToggle = qs('.menu-toggle');
const mobileNav = qs('.mobile-nav');
let lastMenuFocus = null;
function setMenuOpen(open) {
  header.classList.toggle('menu-active', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileNav.inert = !open;
  if (open) {
    lastMenuFocus = document.activeElement;
    menuToggle.focus({preventScroll: true});
  } else if (mobileNav.contains(document.activeElement)) {
    (lastMenuFocus || menuToggle).focus();
  }
}
menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
qsa('a', mobileNav).forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenuOpen(false);
  if (event.key !== 'Tab' || menuToggle.getAttribute('aria-expanded') !== 'true') return;
  const focusable = [menuToggle, ...qsa('a', mobileNav)];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenuOpen(false); });
function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 18); }
window.addEventListener('scroll', updateHeader, {passive: true});
updateHeader();

// Quiet, user-controllable hero. Pauses in hidden tabs and respects reduced motion.
const heroSlides = qsa('.hero__slide');
const heroDots = qsa('.hero__dot');
let activeHero = 0;
let heroTimer;
function showHero(index) {
  activeHero = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeHero));
  heroDots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === activeHero);
    dot.setAttribute('aria-pressed', String(i === activeHero));
  });
}
function stopHeroTimer() { if (heroTimer) window.clearInterval(heroTimer); heroTimer = undefined; }
function startHeroTimer() {
  stopHeroTimer();
  if (!prefersReducedMotion.matches && !document.hidden) heroTimer = window.setInterval(() => showHero(activeHero + 1), 6800);
}
heroDots.forEach((dot, index) => dot.addEventListener('click', () => { showHero(index); startHeroTimer(); }));
document.addEventListener('visibilitychange', startHeroTimer);
prefersReducedMotion.addEventListener('change', startHeroTimer);
startHeroTimer();

// The names below are drawn from published Florencia menus/listings; no prices are implied.
const menuData = {
  favoritos: {
    items: ['Tres leches de pisco sour', 'Pan con chicharrón', 'Cheesecake de Oreo', 'Club sándwich'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1050&q=85',
    alt: 'Pastel de chocolate, fotografía de ambientación'
  },
  desayunos: {
    items: ['Pan con chicharrón', 'Croissant de pollo', 'Butifarra de jamón', 'Copa de fruta'],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1050&q=85',
    alt: 'Sándwich preparado, fotografía de ambientación'
  },
  postres: {
    items: ['Tres leches de pisco sour', 'Cheesecake de Oreo', 'Pasteles variados', 'Tortas para compartir'],
    image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1050&q=85',
    alt: 'Piezas de pastelería, fotografía de ambientación'
  },
  cafes: {
    items: ['Cortado', 'Café', 'Jugos de fruta', 'Bebidas para acompañar'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1050&q=85',
    alt: 'Taza de café, fotografía de ambientación'
  },
  salados: {
    items: ['Lasagna de carne', 'Tallarines a la huancaína', 'Sopa a la minuta', 'Bistec a lo pobre'],
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1050&q=85',
    alt: 'Plato de pasta, fotografía de ambientación'
  }
};
const tabs = qsa('.menu-tab');
const itemsList = qs('#menu-items');
const menuPanel = qs('#menu-panel');
const menuPhoto = qs('#menu-photo');
let photoSwapId = 0;
function selectCategory(category, {focus = false} = {}) {
  const data = menuData[category];
  if (!data) return;
  tabs.forEach(tab => {
    const active = tab.dataset.tab === category;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  menuPanel.setAttribute('aria-labelledby', `tab-${category}`);
  itemsList.replaceChildren(...data.items.map(name => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `https://wa.me/51989048345?text=${encodeURIComponent(`Hola, quisiera consultar por ${name} en Florencia.`)}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    const label = document.createElement('span');
    label.textContent = name;
    const arrow = document.createElement('span');
    arrow.className = 'menu-item-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    a.append(label, arrow);
    li.append(a);
    return li;
  }));
  const photoSwap = ++photoSwapId;
  menuPhoto.classList.add('is-changing');
  // Keep responsive behavior even if a photo cannot load.
  const replacement = new Image();
  replacement.onload = () => {
    if (photoSwap !== photoSwapId) return;
    menuPhoto.src = data.image;
    menuPhoto.alt = data.alt;
    menuPhoto.classList.remove('is-changing');
  };
  replacement.onerror = () => { if (photoSwap === photoSwapId) menuPhoto.classList.remove('is-changing'); };
  replacement.src = data.image;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCategory(tab.dataset.tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectCategory(tabs[nextIndex].dataset.tab, {focus: true});
  });
});
qsa('.specialty-card[data-category]').forEach(card => card.addEventListener('click', () => selectCategory(card.dataset.category)));

// Progressive enhancement: all content stays visible when IntersectionObserver is unavailable.
const revealNodes = qsa('.reveal');
if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .075, rootMargin: '0px 0px 65px 0px'});
  revealNodes.forEach(node => { node.classList.add('will-reveal'); revealObserver.observe(node); });
} else revealNodes.forEach(node => node.classList.add('is-visible'));
prefersReducedMotion.addEventListener('change', event => {
  if (event.matches) revealNodes.forEach(node => node.classList.add('is-visible'));
});

qs('#year').textContent = String(new Date().getFullYear());
