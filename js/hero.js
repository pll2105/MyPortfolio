/**
 * hero.js — Behavior for the hero page only.
 * Reads meta + social links from data.js.
 */

import { meta, navLinks } from './data.js';

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------
const THEME_KEY = 'portfolio-theme';

const Icons = {
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/>
    <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/>
    <line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/></svg>`,

  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,

  menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/></svg>`,

  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
    0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
    -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
    .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
    -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844
    a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
    .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
    0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484
    17.522 2 12 2z"/></svg>`,

  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
    2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267
    5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782
    13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24
    1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

  user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/></svg>`,

  arrowDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    width="14" height="14">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/></svg>`,
};

// ---------------------------------------------------------------------------
// THEME
// ---------------------------------------------------------------------------
function getTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);

  document.querySelectorAll('.theme-btn').forEach((btn) => {
    const dark = theme === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.innerHTML = dark ? Icons.sun : Icons.moon;
  });

  if (typeof window.drawDotGrid === 'function') window.drawDotGrid();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ---------------------------------------------------------------------------
// DOT-GRID BACKGROUND
// ---------------------------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
let mouseX = -9999, mouseY = -9999;

function initDotGrid() {
  if (prefersReducedMotion) return;
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  function draw() {
    if (!ctx) return;
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    const dot   = dark ? 'rgba(255,109,41,0.08)'  : 'rgba(229,90,24,0.10)';
    const hover = dark ? 'rgba(255,109,41,0.40)'  : 'rgba(229,90,24,0.38)';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const GAP = 28, R = 1, HOVER_R = 160;

    for (let x = GAP / 2; x < canvas.width; x += GAP) {
      for (let y = GAP / 2; y < canvas.height; y += GAP) {
        const d = Math.hypot(x - mouseX, y - mouseY);
        const p = Math.max(0, 1 - d / HOVER_R);

        ctx.beginPath();
        ctx.arc(x, y, R + p * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p > 0.05 ? hover : dot;
        ctx.globalAlpha = 0.55 + p * 0.45;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  window.drawDotGrid = draw;
  window.addEventListener('resize', resize, { passive: true });
  resize();

  if (isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      draw();
    }, { passive: true });
  }
}

// ---------------------------------------------------------------------------
// NAV — render top nav from data
// ---------------------------------------------------------------------------
function renderNav() {
  const nav = document.getElementById('top-nav');
  if (!nav) return;

  nav.innerHTML = `
    <a href="#hero" class="nav-logo" aria-label="${meta.name} — go to top">
      <img src="assets/logo.svg" alt="" width="32" height="32">
      <span>
        <!-- Monogram: initials from name placeholder -->
        <span aria-hidden="true" style="font-size:1.1rem; letter-spacing:-.03em;">
          ${getInitials(meta.name)}
        </span>
      </span>
    </a>

    <ul class="nav-links" role="list">
      ${navLinks.map(l => `
        <li>
          <a href="${l.href}">${l.label}</a>
        </li>`).join('')}
      <li>
        <button class="nav-theme-btn p-btn-icon theme-btn"
          type="button" aria-label="Switch theme">
          ${Icons.sun}
        </button>
      </li>
    </ul>

    <div style="display:flex; gap:.5rem; align-items:center;">
      <button class="nav-theme-btn p-btn-icon theme-btn" id="theme-btn-mobile"
        type="button" aria-label="Switch theme"
        style="display:none;">
        ${Icons.sun}
      </button>
      <button
        class="nav-mobile-toggle p-btn-icon"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobile-drawer"
        aria-controls="mobile-drawer"
        aria-label="Open navigation menu">
        ${Icons.menu}
      </button>
    </div>
  `;

  // Show mobile theme btn only at mobile widths
  const mobileThemeBtn = document.getElementById('theme-btn-mobile');
  function checkMobile() {
    if (!mobileThemeBtn) return;
    mobileThemeBtn.style.display = window.innerWidth < 768 ? 'flex' : 'none';
  }
  checkMobile();
  window.addEventListener('resize', checkMobile, { passive: true });

  // Theme events
  nav.querySelectorAll('.theme-btn').forEach(btn =>
    btn.addEventListener('click', toggleTheme)
  );

  // Scroll glass effect
  const handler = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

function getInitials(name) {
  if (!name || name.startsWith('[')) return 'P'; // placeholder fallback
  return name.trim().split(/\s+/)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

// ---------------------------------------------------------------------------
// MOBILE DRAWER — render from data
// ---------------------------------------------------------------------------
function renderDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;

  const header = drawer.querySelector('.offcanvas-header');
  if (header) {
    header.innerHTML = `
      <span style="font-weight:600; color:var(--text);">${meta.name}</span>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
        aria-label="Close menu"></button>
    `;
  }

  const body = drawer.querySelector('.offcanvas-body');
  if (body) {
    body.innerHTML = `
      <nav class="drawer-nav" aria-label="Page sections">
        ${navLinks.map(l => `
          <a href="${l.href}" data-bs-dismiss="offcanvas">${l.label}</a>
        `).join('')}
      </nav>
      <div style="display:flex; gap:var(--s2); padding:var(--s2) var(--s3);
           border-top:1px solid var(--border); margin-top:auto;">
        <a href="${meta.linkedin}" target="_blank" rel="noopener noreferrer"
           class="social-link" aria-label="LinkedIn"
           style="color:var(--muted);">${Icons.linkedin}</a>
        <a href="${meta.github}" target="_blank" rel="noopener noreferrer"
           class="social-link" aria-label="GitHub"
           style="color:var(--muted);">${Icons.github}</a>
      </div>
    `;
  }
}

// ---------------------------------------------------------------------------
// SOCIAL RAIL — render from data
// ---------------------------------------------------------------------------
function renderSocialRail() {
  const rail = document.getElementById('social-rail');
  if (!rail) return;

  rail.innerHTML = `
    <a href="${meta.github}" target="_blank" rel="noopener noreferrer"
       aria-label="GitHub profile">${Icons.github}</a>
    <a href="${meta.linkedin}" target="_blank" rel="noopener noreferrer"
       aria-label="LinkedIn profile">${Icons.linkedin}</a>
  `;

  // Also populate the right-side email rail
  const emailLink = document.getElementById('rail-email');
  if (emailLink) {
    emailLink.href = `mailto:${meta.email}`;
    emailLink.textContent = meta.email;
    emailLink.setAttribute('aria-label', `Send email to ${meta.email}`);
  }
}

// ---------------------------------------------------------------------------
// HERO TEXT — render from data
// ---------------------------------------------------------------------------
function renderHero() {
  // Name line
  const nameEl = document.getElementById('hero-name');
  if (nameEl) {
    nameEl.innerHTML = `my name is <strong>${meta.name}</strong>`;
  }

  // Tagline
  const tagEl = document.getElementById('hero-tagline');
  if (tagEl) {
    tagEl.textContent = 'I turn ideas into experiences.';
  }

  // Bio — first sentence of hero line + OJT goal
  const bioEl = document.getElementById('hero-bio');
  if (bioEl) {
    bioEl.innerHTML = `I'm a <span class="hl">4th-year BSIT student</span> at
      <span class="hl">National University – Dasmariñas</span> with a passion for
      business analysis, project coordination, and building clean interfaces.
      Seeking a <span class="hl">400-hour internship</span>.`;
  }

  // CTA href
  const ctaEl = document.getElementById('hero-cta');
  if (ctaEl) {
    ctaEl.href = '#contact';
  }
}

// ---------------------------------------------------------------------------
// PHOTO — lazy-load with placeholder
// ---------------------------------------------------------------------------
function initPhoto() {
  const img = document.getElementById('hero-img');
  const placeholder = document.getElementById('hero-photo-placeholder');
  if (!img) return;

  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
    placeholder?.classList.add('hidden');
  } else {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      placeholder?.classList.add('hidden');
    });
    img.addEventListener('error', () => {
      // Keep placeholder visible if photo missing
    });
  }
}

// ---------------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------------
function init() {
  applyTheme(getTheme());
  renderNav();
  renderDrawer();
  renderSocialRail();
  renderHero();
  initDotGrid();
  initPhoto();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
