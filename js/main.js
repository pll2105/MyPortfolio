/**
 * main.js — All portfolio interactivity
 * Consumes data.js for all content; never hardcodes strings here.
 */

import {
  meta,
  navLinks,
  projects,
  skills,
  roleLens,
  timeline,
  certifications,
  about,
} from './data.js';

// ---------------------------------------------------------------------------
// CONSTANTS & STATE
// ---------------------------------------------------------------------------
const LENS_STORAGE_KEY = 'portfolio-lens';
const THEME_STORAGE_KEY = 'portfolio-theme';

let activeLens = localStorage.getItem(LENS_STORAGE_KEY) || 'ba';
let activeSkillFilter = 'all';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---------------------------------------------------------------------------
// ICONS (inline SVG strings — no extra network requests)
// ---------------------------------------------------------------------------
const Icons = {
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/>
    <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/>
    <line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/></svg>`,

  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,

  menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,

  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18
    6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608
    1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951
    0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1
    2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688
    0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22
    12.017C22 6.484 17.522 2 12 2z"/></svg>`,

  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
    0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0
    4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1
    2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0
    23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

  externalLink: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1
    2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,

  arrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" width="16" height="16"><line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/></svg>`,

  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,

  copy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,

  download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,

  mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1
    0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,

  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0
    1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1
    3.6 2.22l3-.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0
    1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339
    1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,

  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" width="16" height="16"><polyline points="6 9 12 15 18 9"/></svg>`,

  award: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" width="16" height="16"><circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,

  send: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
};

// ---------------------------------------------------------------------------
// THEME
// ---------------------------------------------------------------------------
function getInitialTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  // Update all toggle buttons
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    const isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.innerHTML = isDark
      ? `${Icons.sun}<span class="sr-only">Light mode</span>`
      : `${Icons.moon}<span class="sr-only">Dark mode</span>`;
  });
  // Update dot-grid colors
  if (window._bgCanvas && typeof window.drawDotGrid === 'function') {
    window.drawDotGrid();
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ---------------------------------------------------------------------------
// DOT-GRID BACKGROUND (canvas)
// ---------------------------------------------------------------------------
let mouseX = -9999, mouseY = -9999;

function initDotGrid() {
  if (prefersReducedMotion) return;
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  window._bgCanvas = canvas;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drawDotGrid();
  }

  function drawDotGrid() {
    if (!ctx) return;
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const dotColor = theme === 'light' ? 'rgba(15,118,110,0.18)' : 'rgba(45,212,191,0.12)';
    const hoverColor = theme === 'light' ? 'rgba(15,118,110,0.45)' : 'rgba(45,212,191,0.5)';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gap = 28;
    const radius = 1;
    const hoverRadius = 150;

    for (let x = gap / 2; x < canvas.width; x += gap) {
      for (let y = gap / 2; y < canvas.height; y += gap) {
        const dist = Math.hypot(x - mouseX, y - mouseY);
        const proximity = Math.max(0, 1 - dist / hoverRadius);

        ctx.beginPath();
        ctx.arc(x, y, radius + proximity * 1.5, 0, Math.PI * 2);
        // Interpolate color
        ctx.fillStyle = proximity > 0.05 ? hoverColor : dotColor;
        ctx.globalAlpha = 0.6 + proximity * 0.4;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  window.drawDotGrid = drawDotGrid;

  window.addEventListener('resize', resize, { passive: true });
  resize();

  if (isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      drawDotGrid();
    }, { passive: true });
  }
}

// ---------------------------------------------------------------------------
// CURSOR SPOTLIGHT
// ---------------------------------------------------------------------------
function initSpotlight() {
  if (prefersReducedMotion || !isFinePointer) return;
  const el = document.getElementById('spotlight');
  if (!el) return;

  window.addEventListener('mousemove', (e) => {
    el.style.setProperty('--mx', e.clientX + 'px');
    el.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
}

// ---------------------------------------------------------------------------
// RENDER: SIDEBAR
// ---------------------------------------------------------------------------
function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <img src="assets/logo.svg" alt="${meta.name} logo" width="36" height="36">
      <div>
        <div class="sidebar-name">${meta.name}</div>
        <div class="sidebar-title">${meta.title}</div>
      </div>
    </div>

    <p class="sidebar-hero">${meta.hero}</p>

    <!-- Role Lens (desktop) -->
    <div>
      <div class="lens-label">View as</div>
      <div id="role-lens-desktop" role="group" aria-label="View as role">
        ${roleLens.map((r) => `
          <button
            class="lens-btn"
            data-lens="${r.key}"
            aria-pressed="${activeLens === r.key ? 'true' : 'false'}"
            type="button"
          >
            <span class="check-icon">${Icons.check}</span>
            ${r.shortLabel}
          </button>`).join('')}
      </div>
    </div>

    <!-- Section nav -->
    <nav id="sidebar-nav" aria-label="Page sections">
      ${navLinks.map((l) => `
        <a href="${l.href}" class="nav-link" data-section="${l.href.slice(1)}">
          ${l.label}
        </a>`).join('')}
    </nav>

    <!-- Social + theme -->
    <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-top:auto;">
      <div class="sidebar-social">
        <a href="${meta.linkedin}" target="_blank" rel="noopener noreferrer"
           class="social-link" aria-label="LinkedIn profile">
          ${Icons.linkedin}
        </a>
        <a href="${meta.github}" target="_blank" rel="noopener noreferrer"
           class="social-link" aria-label="GitHub profile">
          ${Icons.github}
        </a>
      </div>
      <button class="theme-toggle" id="theme-toggle-desktop" type="button"
        aria-label="Switch theme">
        ${Icons.sun}
      </button>
    </div>
  `;

  // Attach lens events
  sidebar.querySelectorAll('.lens-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLens(btn.dataset.lens));
  });

  // Attach theme toggle
  document.getElementById('theme-toggle-desktop')?.addEventListener('click', toggleTheme);
}

// ---------------------------------------------------------------------------
// RENDER: MOBILE TOP BAR
// ---------------------------------------------------------------------------
function renderTopBar() {
  const bar = document.getElementById('top-bar');
  if (!bar) return;

  bar.innerHTML = `
    <a href="#main-content" class="top-bar-logo" aria-label="${meta.name} — go to top">
      <img src="assets/logo.svg" alt="" width="28" height="28">
      <span class="top-bar-name">${meta.name}</span>
    </a>
    <div class="top-bar-actions">
      <button class="theme-toggle" id="theme-toggle-mobile" type="button"
        aria-label="Switch theme">
        ${Icons.sun}
      </button>
      <button class="menu-btn" type="button"
        data-bs-toggle="offcanvas" data-bs-target="#mobile-menu"
        aria-controls="mobile-menu" aria-label="Open navigation menu">
        ${Icons.menu}
      </button>
    </div>
  `;

  document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);
}

// ---------------------------------------------------------------------------
// RENDER: MOBILE OFFCANVAS MENU
// ---------------------------------------------------------------------------
function renderMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;

  const header = menu.querySelector('.offcanvas-header');
  if (header) {
    header.innerHTML = `
      <span style="font-weight:600; color:var(--text);">${meta.name}</span>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
        aria-label="Close menu"></button>
    `;
  }

  const body = menu.querySelector('.offcanvas-body');
  if (body) {
    body.innerHTML = `
      <nav class="offcanvas-nav" aria-label="Page sections">
        ${navLinks.map((l) => `
          <a href="${l.href}" class="nav-link" data-bs-dismiss="offcanvas"
             data-section="${l.href.slice(1)}">
            ${l.label}
          </a>`).join('')}
      </nav>
      <div class="offcanvas-social">
        <a href="${meta.linkedin}" target="_blank" rel="noopener noreferrer"
           class="social-link" aria-label="LinkedIn profile">
          ${Icons.linkedin}
        </a>
        <a href="${meta.github}" target="_blank" rel="noopener noreferrer"
           class="social-link" aria-label="GitHub profile">
          ${Icons.github}
        </a>
      </div>
    `;
  }
}

// ---------------------------------------------------------------------------
// RENDER: MOBILE ROLE LENS STRIP
// ---------------------------------------------------------------------------
function renderMobileLens() {
  const strip = document.getElementById('role-lens-mobile');
  if (!strip) return;

  strip.setAttribute('role', 'group');
  strip.setAttribute('aria-label', 'View as role');

  strip.innerHTML = roleLens.map((r) => `
    <button
      class="lens-btn"
      data-lens="${r.key}"
      aria-pressed="${activeLens === r.key ? 'true' : 'false'}"
      type="button"
    >
      <span class="check-icon">${Icons.check}</span>
      ${r.shortLabel}
    </button>`).join('');

  strip.querySelectorAll('.lens-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLens(btn.dataset.lens));
  });
}

// ---------------------------------------------------------------------------
// RENDER: ABOUT
// ---------------------------------------------------------------------------
function renderAbout() {
  const el = document.getElementById('about-content');
  if (!el) return;
  el.innerHTML = `<div class="about-paragraphs">
    ${about.map((p) => `<p>${p}</p>`).join('')}
  </div>`;
}

// ---------------------------------------------------------------------------
// RENDER: PROJECTS
// ---------------------------------------------------------------------------
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((p) => {
    const bullets = p.roleBullets[activeLens] || [];
    return `
    <button class="project-card" data-project="${p.id}"
      data-bs-toggle="modal" data-bs-target="#project-modal"
      aria-label="View case study for ${p.title}">
      <span class="project-card-arrow">${Icons.arrowUpRight}</span>
      <div class="project-card-header">
        <span class="project-title">${p.title}</span>
        <span class="project-role-badge">${p.myRole}</span>
      </div>
      <p class="project-summary">${p.summary}</p>
      <ul class="project-bullets" id="bullets-${p.id}" aria-label="Role highlights">
        ${bullets.map((b) => `<li>${b}</li>`).join('')}
      </ul>
      <div class="stack-tags">
        ${p.stack.map((s) => `<span class="stack-tag">${s}</span>`).join('')}
      </div>
    </button>`;
  }).join('');

  // Attach modal-open listeners
  grid.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project));
  });
}

// ---------------------------------------------------------------------------
// PROJECT MODAL
// ---------------------------------------------------------------------------
function openProjectModal(projectId) {
  const p = projects.find((x) => x.id === projectId);
  if (!p) return;

  const modalLabel  = document.getElementById('project-modal-label');
  const modalBody   = document.getElementById('project-modal-body');
  const modalFooter = document.getElementById('project-modal-footer');

  if (modalLabel) modalLabel.textContent = p.title;

  if (modalBody) {
    modalBody.innerHTML = `
      <div class="case-study-section">
        <div class="case-study-label">Problem</div>
        <p class="case-study-text">${p.caseStudy.problem}</p>
      </div>
      <div class="case-study-section">
        <div class="case-study-label">My Role</div>
        <p class="case-study-text">${p.caseStudy.myRoleDetail}</p>
      </div>
      <div class="case-study-section">
        <div class="case-study-label">What I Did</div>
        <ul class="case-study-list">
          ${p.caseStudy.whatIDid.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="case-study-section">
        <div class="case-study-label">Stack</div>
        <div class="stack-tags">
          ${p.stack.map((s) => `<span class="stack-tag">${s}</span>`).join('')}
        </div>
      </div>
      ${p.deployedOn ? `<div class="case-study-section">
        <div class="case-study-label">Deployed On</div>
        <p class="case-study-text">${p.deployedOn}</p>
      </div>` : ''}
    `;
  }

  if (modalFooter) {
    const demoDisabled = p.demoUrl.startsWith('[');
    const ghDisabled   = p.githubUrl.startsWith('[');
    modalFooter.innerHTML = `
      <div class="modal-links">
        <a href="${demoDisabled ? '#' : p.demoUrl}"
           class="btn-modal-link"
           ${demoDisabled ? 'aria-disabled="true" tabindex="-1" style="opacity:.4; pointer-events:none;"' : 'target="_blank" rel="noopener noreferrer"'}
           title="${demoDisabled ? 'Live demo URL not yet confirmed' : 'Open live demo'}">
          ${Icons.externalLink} Live Demo
        </a>
        <a href="${ghDisabled ? '#' : p.githubUrl}"
           class="btn-modal-link"
           ${ghDisabled ? 'aria-disabled="true" tabindex="-1" style="opacity:.4; pointer-events:none;"' : 'target="_blank" rel="noopener noreferrer"'}
           title="${ghDisabled ? 'GitHub URL not yet confirmed' : 'View on GitHub'}">
          ${Icons.github} GitHub
        </a>
      </div>
    `;
  }
}

// ---------------------------------------------------------------------------
// RENDER: SKILLS
// ---------------------------------------------------------------------------
const CATEGORY_LABELS = {
  ba:    'Business Analyst / PM',
  fe:    'Front-End',
  ux:    'UI/UX',
  qa:    'QA',
  other: 'Other',
};

function getSkillGroupOrder(lensKey) {
  const lens = roleLens.find((r) => r.key === lensKey);
  if (!lens) return Object.keys(CATEGORY_LABELS);
  const prioritized = lens.priorityCategories;
  const rest = Object.keys(CATEGORY_LABELS).filter((k) => !prioritized.includes(k));
  return [...prioritized, ...rest];
}

function renderSkills() {
  renderSkillFilters();
  renderSkillGroups();
}

function renderSkillFilters() {
  const row = document.getElementById('skills-filter-row');
  if (!row) return;

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)];
  row.innerHTML = categories.map((cat) => `
    <button
      class="filter-chip${activeSkillFilter === cat ? ' active' : ''}"
      data-filter="${cat}"
      type="button"
      aria-pressed="${activeSkillFilter === cat}"
    >
      ${cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
    </button>`).join('');

  row.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      activeSkillFilter = chip.dataset.filter;
      renderSkillFilters();
      renderSkillGroups();
    });
  });
}

function renderSkillGroups() {
  const container = document.getElementById('skills-groups');
  if (!container) return;

  const order  = getSkillGroupOrder(activeLens);
  const lensObj = roleLens.find((r) => r.key === activeLens);
  const priorityCats = lensObj ? lensObj.priorityCategories : [];

  // Filter skills by active chip
  const filteredSkills = activeSkillFilter === 'all'
    ? skills
    : skills.filter((s) => s.category === activeSkillFilter);

  // Group into ordered buckets
  const groups = order
    .map((cat) => ({
      cat,
      items: filteredSkills.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  if (groups.length === 0) {
    container.innerHTML = `<p style="color:var(--muted); font-size:.875rem;">
      No skills match the current filter.</p>`;
    return;
  }

  container.innerHTML = groups.map(({ cat, items }) => {
    const isHighlightGroup = priorityCats.includes(cat);
    return `
    <div class="skill-group${isHighlightGroup ? '' : ' dimmed'}" data-cat="${cat}">
      <div class="skill-group-name">${CATEGORY_LABELS[cat]}</div>
      <div class="skill-list">
        ${items.map((s) => `
          <span class="skill-pill${isHighlightGroup ? ' highlighted' : ' dimmed'}">
            ${s.name}
            <span class="skill-level">${s.level}</span>
          </span>`).join('')}
      </div>
    </div>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// RENDER: TIMELINE
// ---------------------------------------------------------------------------
function renderTimeline() {
  const list = document.getElementById('timeline-list');
  if (!list) return;

  list.innerHTML = timeline.map((item) => `
    <li class="timeline-item" data-type="${item.type}" id="tl-${item.id}">
      <div class="timeline-dot" aria-hidden="true"></div>
      <button
        class="timeline-trigger"
        aria-expanded="false"
        aria-controls="tl-detail-${item.id}"
        type="button"
      >
        <div class="timeline-meta">
          <span class="timeline-year">${item.year}</span>
          <span class="timeline-title">${item.title}</span>
          <span class="timeline-org">${item.org}</span>
        </div>
        <span class="timeline-chevron">${Icons.chevronDown}</span>
      </button>
      <div class="timeline-detail" id="tl-detail-${item.id}" hidden>
        ${item.detail}
      </div>
    </li>`).join('');

  // Expand/collapse
  list.querySelectorAll('.timeline-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const detailId = btn.getAttribute('aria-controls');
      const detail   = document.getElementById(detailId);
      if (!detail) return;

      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        detail.hidden = true;
      } else {
        detail.hidden = false;
      }
    });
  });
}

// ---------------------------------------------------------------------------
// RENDER: CERTIFICATIONS
// ---------------------------------------------------------------------------
function renderCertifications() {
  const list = document.getElementById('cert-list');
  if (!list) return;

  list.innerHTML = certifications.map((cert) => {
    const hasUrl = cert.url && !cert.url.startsWith('[');
    return `
    <div class="cert-item">
      <div class="cert-info">
        <div class="cert-name">${cert.name}</div>
        <div class="cert-issuer-date">${cert.issuer} · ${cert.date}</div>
      </div>
      ${hasUrl
        ? `<a href="${cert.url}" target="_blank" rel="noopener noreferrer"
             class="cert-link" aria-label="View ${cert.name} credential">
             ${Icons.externalLink}
           </a>`
        : `<span class="cert-link" aria-hidden="true" style="opacity:.3;">${Icons.award}</span>`}
    </div>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// RENDER: CONTACT
// ---------------------------------------------------------------------------
function renderContact() {
  const layout = document.getElementById('contact-layout');
  if (!layout) return;

  const hasPhone = meta.phone && !meta.phone.startsWith('[');
  const mailtoSubject = encodeURIComponent('Internship Inquiry');
  const mailtoBody    = encodeURIComponent('Hi,\n\nI came across your portfolio and would like to connect.\n\n');

  layout.innerHTML = `
    <!-- Left: contact info -->
    <div class="contact-info">
      <div class="contact-row">
        ${Icons.mail}
        <a href="mailto:${meta.email}">${meta.email}</a>
      </div>
      ${hasPhone ? `
      <div class="contact-row">
        ${Icons.phone}
        <span>${meta.phone}</span>
      </div>` : ''}
      <div class="contact-row">
        ${Icons.linkedin}
        <a href="${meta.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <div class="contact-row">
        ${Icons.github}
        <a href="${meta.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
        <button class="btn-copy-email" id="copy-email-btn" type="button"
          aria-label="Copy email address to clipboard">
          ${Icons.copy} Copy email
        </button>
        <a href="${meta.resume}" download class="btn-resume"
          aria-label="Download resume PDF">
          ${Icons.download} Download Resume
        </a>
      </div>
    </div>

    <!-- Right: contact form -->
    <form class="contact-form" id="contact-form"
      action="mailto:${meta.email}"
      method="GET"
      enctype="text/plain"
      aria-label="Send a message">
      <div class="form-group">
        <label class="form-label" for="cf-name">Name</label>
        <input class="form-input" id="cf-name" name="from" type="text"
          placeholder="Your name" autocomplete="name" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-email">Email</label>
        <input class="form-input" id="cf-email" name="reply-to" type="email"
          placeholder="your@email.com" autocomplete="email" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-subject">Subject</label>
        <input class="form-input" id="cf-subject" name="subject" type="text"
          value="Internship Inquiry" placeholder="Subject">
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-message">Message</label>
        <textarea class="form-textarea" id="cf-message" name="body"
          placeholder="Your message…" required></textarea>
      </div>
      <button type="submit" class="btn-submit">
        ${Icons.send} Send Message
      </button>
    </form>
  `;

  // Copy email
  document.getElementById('copy-email-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(meta.email).then(() => {
      showToast('Email copied to clipboard!');
    }).catch(() => {
      // Fallback for environments without clipboard API
      const ta = document.createElement('textarea');
      ta.value = meta.email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Email copied to clipboard!');
    });
  });
}

// ---------------------------------------------------------------------------
// BOOTSTRAP TOAST
// ---------------------------------------------------------------------------
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toastEl = document.createElement('div');
  toastEl.className = 'toast custom-toast show';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  toastEl.innerHTML = `
    <div class="toast-body">
      <span class="toast-icon">${Icons.check}</span>
      ${message}
    </div>`;

  container.appendChild(toastEl);

  // Use Bootstrap Toast if available, else fallback
  if (window.bootstrap?.Toast) {
    const bsToast = new window.bootstrap.Toast(toastEl, { delay: 2500 });
    bsToast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  } else {
    setTimeout(() => toastEl.remove(), 2500);
  }
}

// ---------------------------------------------------------------------------
// ROLE LENS — set active lens, update all UI
// ---------------------------------------------------------------------------
function setLens(key) {
  if (activeLens === key) return;
  activeLens = key;
  localStorage.setItem(LENS_STORAGE_KEY, key);

  // Update all lens buttons (desktop + mobile)
  document.querySelectorAll('.lens-btn').forEach((btn) => {
    const pressed = btn.dataset.lens === key;
    btn.setAttribute('aria-pressed', String(pressed));
  });

  // Announce change to screen readers
  const lensObj = roleLens.find((r) => r.key === key);
  const announce = document.getElementById('lens-announce');
  if (announce && lensObj) {
    announce.textContent = `Now viewing as: ${lensObj.label}`;
    // Clear after announcement
    setTimeout(() => { announce.textContent = ''; }, 2000);
  }

  // Animate skill groups
  const skillGroups = document.getElementById('skills-groups');
  if (skillGroups && !prefersReducedMotion) {
    skillGroups.classList.add('lens-animating');
    setTimeout(() => {
      renderSkillGroups();
      skillGroups.classList.remove('lens-animating');
    }, 200);
  } else {
    renderSkillGroups();
  }

  // Animate project bullets
  projects.forEach((p) => {
    const bulletList = document.getElementById(`bullets-${p.id}`);
    if (!bulletList) return;
    const newBullets = p.roleBullets[key] || [];

    if (!prefersReducedMotion) {
      bulletList.classList.add('lens-animating');
      setTimeout(() => {
        bulletList.innerHTML = newBullets.map((b) => `<li>${b}</li>`).join('');
        bulletList.classList.remove('lens-animating');
      }, 200);
    } else {
      bulletList.innerHTML = newBullets.map((b) => `<li>${b}</li>`).join('');
    }
  });
}

// ---------------------------------------------------------------------------
// SCROLLSPY — active nav link
// ---------------------------------------------------------------------------
function initScrollspy() {
  const sections = navLinks
    .map((l) => document.getElementById(l.href.slice(1)))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

// ---------------------------------------------------------------------------
// INIT — run all renders
// ---------------------------------------------------------------------------
function init() {
  // Apply theme before render to avoid flash
  applyTheme(getInitialTheme());

  // Render all structural pieces
  renderSidebar();
  renderTopBar();
  renderMobileMenu();
  renderMobileLens();
  renderAbout();
  renderProjects();
  renderSkills();
  renderTimeline();
  renderCertifications();
  renderContact();

  // Start ambient effects
  initDotGrid();
  initSpotlight();
  initScrollspy();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
