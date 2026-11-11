/**
 * app.js — Portfolio application shell.
 * Handles: theme, dot-grid, spotlight, header, offcanvas, role lens,
 *          tech logos, what-i-do, skills, contact, scrollspy,
 *          project filter/grid/modal.
 *
 * NOT handled here (each has its own file):
 *   • splash-hero  → js/splash-hero.js
 *   • certifications → js/certifications.js
 */

import {
  meta, navLinks, projects, projectFilters,
  skillCards, certifications, roleLens,
  techLogos, focusAreas,
} from './data.js';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & STATE
// ─────────────────────────────────────────────────────────────────────────────
const THEME_KEY     = 'portfolio-theme';
const LENS_KEY      = 'portfolio-lens';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let activeLens   = localStorage.getItem(LENS_KEY) || 'ba';
let activeFilter = 'all';

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────
const I = {
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/>
    <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/>
    <line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/></svg>`,

  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,

  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/></svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/></svg>`,

  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217
    .682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158
    -1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032
    .892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113
    -4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27
    2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747
    -1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688
    0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012
    2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,

  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
    0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85
    3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0
    1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z
    M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2
    24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/></svg>`,

  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,

  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/></svg>`,

  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/></svg>`,

  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/></svg>`,
};

// ─────────────────────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────────────────────
function getStoredTheme() {
  const s = localStorage.getItem(THEME_KEY);
  if (s) return s;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    const dark = theme === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.innerHTML = dark ? I.sun : I.moon;
  });
  if (typeof window._drawDots === 'function') window._drawDots();
}

function toggleTheme() {
  applyTheme(
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOT-GRID BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
let mx = -9999, my = -9999;

function initDotGrid() {
  if (reducedMotion) return;
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function draw() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const dot   = dark ? 'rgba(232,237,247,0.10)' : 'rgba(20,33,61,0.10)';
    const hover = dark ? 'rgba(124,155,255,0.35)' : 'rgba(47,91,255,0.28)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const GAP = 28, R = 1, HR = 160;
    for (let x = GAP / 2; x < canvas.width; x += GAP) {
      for (let y = GAP / 2; y < canvas.height; y += GAP) {
        const d = Math.hypot(x - mx, y - my);
        const p = Math.max(0, 1 - d / HR);
        ctx.beginPath();
        ctx.arc(x, y, R + p * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p > 0.05 ? hover : dot;
        ctx.globalAlpha = 0.55 + p * 0.45;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  window._drawDots = draw;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  if (finePointer) {
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      draw();
    }, { passive: true });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SPOTLIGHT
// ─────────────────────────────────────────────────────────────────────────────
function initSpotlight() {
  if (reducedMotion || !finePointer) return;
  const el = document.getElementById('spotlight');
  if (!el) return;
  window.addEventListener('mousemove', e => {
    el.style.setProperty('--mx', e.clientX + 'px');
    el.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
function renderHeader() {
  const brand = document.getElementById('brand-name');
  if (brand) brand.textContent = meta.name;

  const nav = document.getElementById('desktop-nav');
  if (nav) {
    nav.innerHTML = navLinks.map(l =>
      `<a href="${l.href}" data-section="${l.href.slice(1)}">${l.label}</a>`
    ).join('');
  }

  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', toggleTheme);

  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) menuBtn.innerHTML = I.menu;

  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE OFFCANVAS
// ─────────────────────────────────────────────────────────────────────────────
function renderOffcanvas() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;

  const hdr = menu.querySelector('.offcanvas-header');
  if (hdr) {
    hdr.innerHTML = `
      <span style="font-weight:600;color:var(--ink);">${meta.name}</span>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
        aria-label="Close menu"></button>`;
  }

  const body = menu.querySelector('.offcanvas-body');
  if (body) {
    body.innerHTML = `
      <nav class="offcanvas-nav" aria-label="Navigation">
        ${navLinks.map(l =>
          `<a href="${l.href}" data-bs-dismiss="offcanvas">${l.label}</a>`
        ).join('')}
      </nav>
      <div style="margin-top:auto;padding:var(--s2) var(--s3);border-top:1px solid var(--line);
           display:flex;gap:var(--s2);align-items:center;">
        <a href="${meta.github}"   target="_blank" rel="noopener noreferrer"
           aria-label="GitHub" style="color:var(--muted);">${I.github}</a>
        <a href="${meta.linkedin}" target="_blank" rel="noopener noreferrer"
           aria-label="LinkedIn" style="color:var(--muted);">${I.linkedin}</a>
        <button class="theme-toggle" id="theme-toggle-mobile"
          type="button" aria-label="Switch theme"
          style="margin-left:auto;"></button>
      </div>`;
    document.getElementById('theme-toggle-mobile')
      ?.addEventListener('click', toggleTheme);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ROLE LENS
// ─────────────────────────────────────────────────────────────────────────────
function renderLens(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = roleLens.map(r => `
    <button class="lens-chip" data-lens="${r.key}"
      type="button" aria-pressed="${activeLens === r.key}"
      aria-label="View as ${r.label}">
      <span class="check-icon" style="width:13px;height:13px;">${I.check}</span>
      ${r.shortLabel}
    </button>`).join('');
  el.querySelectorAll('.lens-chip').forEach(btn =>
    btn.addEventListener('click', () => setLens(btn.dataset.lens))
  );
}

function setLens(key) {
  if (activeLens === key) return;
  activeLens = key;
  localStorage.setItem(LENS_KEY, key);

  document.querySelectorAll('.lens-chip').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.lens === key ? 'true' : 'false');
  });

  const obj = roleLens.find(r => r.key === key);
  const ann = document.getElementById('lens-announce');
  if (ann && obj) {
    ann.textContent = `Now viewing as: ${obj.label}`;
    setTimeout(() => { ann.textContent = ''; }, 2000);
  }

  if (!reducedMotion) {
    const grid = document.getElementById('skills-grid');
    if (grid) grid.style.opacity = '0';
    setTimeout(() => {
      renderSkillCards();
      if (grid) grid.style.opacity = '1';
    }, 200);
  } else {
    renderSkillCards();
  }

  projects.forEach(p => {
    const list = document.getElementById(`bullets-${p.id}`);
    if (!list) return;
    const bullets = p.roleBullets[key] || [];
    if (!reducedMotion) {
      list.classList.add('animating');
      setTimeout(() => {
        list.innerHTML = bullets.map(b => `<li>${b}</li>`).join('');
        list.classList.remove('animating');
      }, 200);
    } else {
      list.innerHTML = bullets.map(b => `<li>${b}</li>`).join('');
    }
  });

  // Update What I Do Focus badges
  if (typeof updateFocusBadges === 'function') updateFocusBadges(key);
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH LOGOS
// ─────────────────────────────────────────────────────────────────────────────
function renderTechLogos() {
  const el = document.getElementById('tech-logos');
  if (!el) return;
  el.innerHTML = techLogos.map(logo => `
    <a href="${logo.url}" target="_blank" rel="noopener noreferrer"
       class="tech-logo-btn" role="listitem"
       data-name="${logo.name}" aria-label="${logo.name} — open official site">
      <img src="${logo.img}" alt="${logo.name} logo"
           width="48" height="48" loading="lazy" decoding="async"
           onerror="this.style.display='none'">
    </a>`).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// WHAT I DO — render + scroll thread
// ─────────────────────────────────────────────────────────────────────────────
const PROJECT_DISPLAY = {
  alwan: 'ALWAN', nookph: 'NOOK PH', kyakoyarn: 'Kya Ko Yarn',
};

const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

function renderWhatIDo() {
  const container = document.getElementById('wid-items');
  if (!container) return;
  document.body.classList.add('wid-js');

  container.innerHTML = focusAreas.map(area => {
    const skillChips = area.tags.map(t => `<span class="wid-tag">${t}</span>`).join('');
    const projectBtns = area.projects.map(pid => {
      const name = PROJECT_DISPLAY[pid] || pid;
      return `<button class="wid-project-tag" type="button"
        data-project="${pid}" aria-label="View case study for ${name}">${name}</button>`;
    }).join('');
    const badge = `<span class="wid-focus-badge" data-role="${area.roleKey}"
      aria-label="Focus area for current role">${CHECK_SVG} FOCUS</span>`;

    return `
    <div class="wid-item" data-role="${area.roleKey}" data-number="${area.number}">
      <div class="wid-item-dot-wrap" aria-hidden="true">
        <div class="wid-item-dot"></div>
      </div>
      <div class="wid-item-title-col">
        <div class="wid-item-number"><span>${area.number}</span></div>
        <div class="wid-title-badge-row">
          <h3 class="wid-item-title">${area.title}</h3>
          ${badge}
        </div>
      </div>
      <div class="wid-item-content-col">
        <p class="wid-item-desc">${area.description}</p>
        <div class="wid-item-tags">${skillChips}${projectBtns}</div>
      </div>
    </div>`;
  }).join('');

  container.querySelectorAll('.wid-project-tag').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
  });
}

function updateFocusBadges(key) {
  document.querySelectorAll('.wid-focus-badge').forEach(badge => {
    badge.classList.toggle('wid-focus-badge--active', badge.dataset.role === key);
  });
  const ann = document.getElementById('lens-announce');
  if (ann) {
    const names = focusAreas.filter(a => a.roleKey === key).map(a => a.title).join(' and ');
    if (names) {
      setTimeout(() => {
        ann.textContent = `Focus areas: ${names}.`;
        setTimeout(() => { ann.textContent = ''; }, 3000);
      }, 300);
    }
  }
}

function initScrollLine() {
  const section  = document.getElementById('what-i-do');
  const itemsWrap = document.getElementById('wid-items');
  if (!section || !itemsWrap) return;

  const isMobile = () => window.innerWidth <= 760;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg   = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'wid-svg');
  svg.setAttribute('aria-hidden', 'true');
  const trackPath = document.createElementNS(svgNS, 'path');
  trackPath.setAttribute('class', 'wid-svg-track');
  const drawPath = document.createElementNS(svgNS, 'path');
  drawPath.setAttribute('class', 'wid-svg-draw');
  svg.appendChild(trackPath);
  svg.appendChild(drawPath);
  section.insertBefore(svg, section.firstChild);

  let totalLen = 0;
  let dotNodes = [];

  function buildPath() {
    const items  = itemsWrap.querySelectorAll('.wid-item');
    if (!items.length) return;
    const secRect = section.getBoundingClientRect();
    const secTop  = secRect.top + window.scrollY;
    const mobile  = isMobile();
    const threadX = mobile ? 28 : window.innerWidth * 0.5;
    const swing   = mobile ? 18 : window.innerWidth * 0.10;

    dotNodes = [];
    items.forEach(item => {
      const dotEl = item.querySelector('.wid-item-dot');
      if (!dotEl) return;
      const r  = dotEl.getBoundingClientRect();
      const cx = mobile ? threadX : (r.left + r.right) / 2;
      const cy = r.top + window.scrollY - secTop + r.height / 2;
      dotNodes.push({ el: item, dotEl, cx, cy });
    });

    if (!dotNodes.length) return;
    const startY = dotNodes[0].cy - window.innerHeight * 0.3;
    const endY   = dotNodes[dotNodes.length - 1].cy + window.innerHeight * 0.3;

    let d = `M ${threadX} ${startY} L ${threadX} ${dotNodes[0].cy}`;
    for (let i = 0; i < dotNodes.length - 1; i++) {
      const p1  = dotNodes[i], p2 = dotNodes[i + 1];
      const dir = i % 2 === 0 ? 1 : -1;
      const cp1x = p1.cx + dir * swing;
      const cp2x = p2.cx - dir * swing;
      const midY = (p1.cy + p2.cy) / 2;
      d += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, ${p2.cx} ${p2.cy}`;
    }
    d += ` L ${threadX} ${endY}`;

    trackPath.setAttribute('d', d);
    drawPath.setAttribute('d', d);
    totalLen = drawPath.getTotalLength ? drawPath.getTotalLength() : 1000;
    drawPath.style.strokeDasharray  = totalLen;
    drawPath.style.strokeDashoffset = totalLen;
  }

  function findLenAtY(targetY) {
    if (!totalLen) return 0;
    let lo = 0, hi = totalLen;
    for (let i = 0; i < 16; i++) {
      const mid = (lo + hi) / 2;
      const pt  = drawPath.getPointAtLength(mid);
      if (pt.y < targetY) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }

  let rafId = null;
  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => { rafId = null; tick(); });
  }

  function tick() {
    if (!totalLen || !dotNodes.length) return;
    const secRect    = section.getBoundingClientRect();
    const readingY   = window.innerHeight * 0.6;
    const targetAbsY = window.scrollY + readingY - (secRect.top + window.scrollY);
    const len   = findLenAtY(targetAbsY);
    const clamp = Math.max(0, Math.min(totalLen, len));
    drawPath.style.strokeDashoffset = totalLen - clamp;
    dotNodes.forEach(({ el, cy }) => el.classList.toggle('wid-in', cy <= targetAbsY));
  }

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { buildPath(); tick(); }, 80);
  }

  if (reducedMotion) {
    buildPath();
    if (totalLen) drawPath.style.strokeDashoffset = '0';
    dotNodes.forEach(({ el }) => el.classList.add('wid-in'));
    return;
  }

  buildPath();
  tick();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(() => { buildPath(); tick(); });
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS (filter chips + grid for modal data)
// ─────────────────────────────────────────────────────────────────────────────
function renderFilterChips() {
  const row = document.getElementById('filter-row');
  if (!row) return;
  row.innerHTML = projectFilters.map(f => `
    <button class="filter-chip${activeFilter === f.key ? ' active' : ''}"
      data-filter="${f.key}" type="button" aria-pressed="${activeFilter === f.key}">
      ${f.label}
    </button>`).join('');
  row.querySelectorAll('.filter-chip').forEach(btn =>
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      renderFilterChips();
      renderProjectGrid();
    })
  );
}

function renderProjectGrid() {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);
  if (!filtered.length) {
    grid.innerHTML = `<p style="color:var(--muted);font-size:.9375rem;">No projects match this filter.</p>`;
    return;
  }
  grid.innerHTML = filtered.map(p => {
    const bullets = p.roleBullets[activeLens] || [];
    return `
    <button class="project-card" data-project="${p.id}"
      aria-label="View case study for ${p.title}">
      <div class="card-shot card-shot--${p.gradient}">
        <span class="card-badge">${p.category} · ${p.year}</span>
        <span class="card-shot-name">${p.title}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="card-summary">${p.summary}</div>
        <ul class="card-bullets" id="bullets-${p.id}">
          ${bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="card-tags">
          ${p.stack.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
      </div>
    </button>`;
  }).join('');
  grid.querySelectorAll('.project-card').forEach(card =>
    card.addEventListener('click', () => openModal(card.dataset.project))
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT MODAL
// ─────────────────────────────────────────────────────────────────────────────
function openModal(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  const gradClass = `card-shot--${p.gradient}`;
  const hdr = document.getElementById('modal-header-grad');
  if (hdr) {
    hdr.className = `modal-header-grad ${gradClass}`;
    hdr.innerHTML = `
      <button class="btn-close-modal" data-bs-dismiss="modal"
        aria-label="Close case study">${I.x}</button>
      <div class="modal-project-name" id="modal-project-name">${p.title}</div>
      <div class="modal-project-summary">${p.summary}</div>`;
  }
  const body = document.getElementById('modal-body-content');
  if (body) {
    body.innerHTML = `
      <div><div class="modal-section-label">Problem</div>
        <p class="modal-text">${p.caseStudy.problem}</p></div>
      <div><div class="modal-section-label">My Role</div>
        <p class="modal-text">${p.caseStudy.myRoleDetail}</p></div>
      <div><div class="modal-section-label">What I Did</div>
        <ul class="modal-list">
          ${p.caseStudy.whatIDid.map(item => `<li>${item}</li>`).join('')}
        </ul></div>
      <div><div class="modal-section-label">Tech Stack</div>
        <div class="card-tags" style="margin-top:.5rem;">
          ${p.stack.map(s => `<span class="tag">${s}</span>`).join('')}
        </div></div>`;
  }
  const actions = document.getElementById('modal-actions');
  if (actions) {
    const demoOk = !p.demoUrl.startsWith('[');
    const srcOk  = !p.sourceUrl.startsWith('[');
    actions.innerHTML = `
      <a href="${demoOk ? p.demoUrl : '#'}" class="btn-modal-link"
         ${demoOk ? 'target="_blank" rel="noopener noreferrer"'
                  : 'aria-disabled="true" tabindex="-1" style="opacity:.4;pointer-events:none;"'}
         title="${demoOk ? 'Open live demo' : 'Live demo URL not yet confirmed'}">
        ${I.external} Live demo
      </a>
      <a href="${srcOk ? p.sourceUrl : '#'}" class="btn-modal-link"
         ${srcOk ? 'target="_blank" rel="noopener noreferrer"'
                 : 'aria-disabled="true" tabindex="-1" style="opacity:.4;pointer-events:none;"'}
         title="${srcOk ? 'View source code' : 'GitHub URL not yet confirmed'}">
        ${I.github} Source code
      </a>`;
  }
  const modal = document.getElementById('project-modal');
  if (modal && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────────────
function renderSkillCards() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  const lens     = roleLens.find(r => r.key === activeLens);
  const priority = lens ? lens.priorityCards : [];
  const sorted   = [...skillCards].sort((a, b) => {
    const ai = priority.indexOf(a.key), bi = priority.indexOf(b.key);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1; if (bi === -1) return -1;
    return ai - bi;
  });
  grid.innerHTML = sorted.map(card => {
    const isHighlight = priority.includes(card.key);
    return `
    <div class="skill-card${isHighlight ? ' highlighted' : ' dimmed'}">
      <div class="skill-card-icon" aria-hidden="true">${card.icon}</div>
      <div class="skill-card-title">${card.title}</div>
      <p class="skill-card-desc">${card.description}</p>
      <div class="skill-tags">
        ${card.skills.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function renderEduCard() {
  const el = document.getElementById('edu-card');
  if (!el) return;
  el.innerHTML = `
    <div class="edu-card-title">Education &amp; Certifications</div>
    <div class="edu-items">
      <div class="edu-item">
        <div class="edu-item-title">${meta.degree}</div>
        <div class="edu-item-sub">${meta.school} · Graduating ${meta.gradYear}</div>
      </div>
      <hr class="edu-divider">
      ${certifications.map(cert => `
        <div class="edu-item">
          <div class="edu-item-title">${cert.name}</div>
          <div class="edu-item-sub">${cert.issuer} · ${cert.date}</div>
        </div>`).join('')}
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────────────
function renderContact() {
  const el = document.getElementById('contact-actions');
  if (!el) return;
  el.innerHTML = `
    <button class="btn-contact btn-contact--email" id="copy-email-btn"
      type="button" aria-label="Copy email address">
      ${I.copy} Copy email
    </button>
    <a href="mailto:${meta.email}" class="btn-contact btn-contact--outline"
      aria-label="Send email">
      ${I.mail} ${meta.email}
    </a>
    <a href="${meta.github}" target="_blank" rel="noopener noreferrer"
       class="btn-contact btn-contact--outline" aria-label="GitHub profile">
      ${I.github} GitHub
    </a>
    <a href="${meta.linkedin}" target="_blank" rel="noopener noreferrer"
       class="btn-contact btn-contact--outline" aria-label="LinkedIn profile">
      ${I.linkedin} LinkedIn
    </a>
    <a href="${meta.resume}" download
       class="btn-contact btn-contact--outline" aria-label="Download resume PDF">
      ${I.download} Download resume
    </a>`;
  document.getElementById('copy-email-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(meta.email)
      .then(() => showToast('Email copied!'))
      .catch(() => {
        const ta = Object.assign(document.createElement('textarea'),
          { value: meta.email, style: 'position:fixed;opacity:0' });
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Email copied!');
      });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast custom-toast show';
  el.setAttribute('role', 'status');
  el.innerHTML = `<div class="toast-body">
    <span class="toast-icon">${I.check}</span>${msg}</div>`;
  container.appendChild(el);
  if (window.bootstrap?.Toast) {
    const t = new window.bootstrap.Toast(el, { delay: 2500 });
    t.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  } else {
    setTimeout(() => el.remove(), 2500);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLLSPY
// ─────────────────────────────────────────────────────────────────────────────
function initScrollspy() {
  const sections = navLinks.map(l => document.getElementById(l.href.slice(1))).filter(Boolean);
  if (!sections.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.header-nav a').forEach(a => {
          a.setAttribute('aria-current', a.dataset.section === id ? 'true' : 'false');
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
  sections.forEach(s => obs.observe(s));
}

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────
function init() {
  applyTheme(getStoredTheme());

  renderHeader();
  renderOffcanvas();
  renderLens('role-lens-strip');
  // certifications.js handles #certifications — no role-lens-desktop in that section
  renderTechLogos();
  renderWhatIDo();
  updateFocusBadges(activeLens);
  renderFilterChips();
  renderProjectGrid();
  renderContact();

  initDotGrid();
  initSpotlight();
  initScrollspy();
  initScrollLine();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
