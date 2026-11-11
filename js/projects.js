/**
 * projects.js — My Projects section with laptop mockup.
 *
 * To add your screenshot:
 *   screenshot: 'assets/alwan-screenshot.jpg'   (tall full-page image, min 1200px wide)
 *   screenshotAlt: 'ALWAN website homepage'
 * Leave screenshot: null to show the placeholder.
 *
 * To add your live link:
 *   link: 'https://your-live-url.com'
 */

const PROJECTS_DATA = [
  {
    id:            'alwan',
    title:         'ALWAN',
    titleCase:     'upper',
    description:
      'ALWAN is an online lending application built to make borrowing simple, clear, and fully managed from your phone. ' +
      'From sign-up and identity verification to applying and tracking your account, everything happens in one app. ' +
      "It's designed around one idea: you should always know exactly what you're getting into.",
    tags:          ['React', 'TailwindCSS', 'Expo', 'Supabase'],
    link:          'https://www.alwann.app/',
    screenshot:    'assets/alwan.png',
    screenshotAlt: 'ALWAN online lending application',
  },
  {
    id:            'lakbai',
    title:         'LakbAI',
    titleCase:     'upper',
    description:
      'LakbAI is a commuter app built to make riding the jeepney simpler and less stressful. ' +
      'It helps riders plan their trips and find their way around, so getting from one place to another takes less guesswork. ' +
      "It's designed around one idea: a smarter way to ride.",
    tags:          ['React Native', 'Node JS', 'Firebase'],
    link:          'https://lakbai-jeepney.netlify.app/',
    screenshot:    'assets/lakbai.png',
    screenshotAlt: 'LakbAI Digital Jeepney System website',
  },
  {
    id:            'kyakoyarn',
    title:         'Kya Ko Yarn',
    titleCase:     'original',
    description:
      'Kya Ko Yarn is a small local business that sells handcrafted crochet items, custom keychains, and aesthetic accessories. ' +
      'This project is a mobile-responsive e-commerce website that replaces manual ordering through social media DMs. ' +
      "It improves the brand's online presence and makes customer interactions smoother.",
    tags:          ['React', 'Supabase', 'PostGreSQL', 'Vercel'],
    link:          'https://kya-ko-yarn.vercel.app/',
    screenshot:    'assets/kyakoyarn.png',
    screenshotAlt: 'Kya Ko Yarn web application',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BUILD LAPTOP HTML
// ─────────────────────────────────────────────────────────────────────────────
function buildLaptop(p) {
  const title      = p.titleCase === 'upper' ? p.title.toUpperCase() : p.title;
  const hasShot    = Boolean(p.screenshot);

  const screenContent = hasShot
    ? `<img
         class="proj-page"
         src="${p.screenshot}"
         alt="${p.screenshotAlt || title + ' screenshot'}"
         loading="lazy"
         width="1280"
         height="4000"
         draggable="false">`
    : `<div class="proj-screen-placeholder">
         <span class="proj-ph-title">${title}</span>
         <span>screenshot coming soon</span>
       </div>`;

  return `
<div class="proj-laptop"
     tabindex="0"
     role="img"
     aria-label="${title} website shown on a laptop"
     data-laptop>
  <div class="proj-tilt">
    <!-- Lid (screen) -->
    <div class="proj-lid">
      <div class="proj-screen">
        ${screenContent}
      </div>
    </div>
    <!-- Base -->
    <div class="proj-base-wrap">
      <div class="proj-hinge"></div>
      <div class="proj-base-foot"></div>
    </div>
  </div>
  <p class="proj-hint" aria-hidden="true">Hover to scroll the page</p>
</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER SECTION
// ─────────────────────────────────────────────────────────────────────────────
function renderProjects() {
  const container = document.getElementById('my-projects-rows');
  if (!container) return;

  container.innerHTML = PROJECTS_DATA.map((p) => {
    const title  = p.titleCase === 'upper' ? p.title.toUpperCase() : p.title;

    // Tags: single run separated by " / " using theme tokens for color
    // tag color 1: --accent (blue); tag color 2: --muted (no warm secondary token)
    const tagRun = p.tags.map((t, i) =>
      `<span class="mp-tag-item proj-tag-${i % 2 === 0 ? 'a' : 'b'}">${t}</span>`
    ).join(`<span class="mp-tag-sep"> / </span>`);

    return `
    <div class="mp-row" data-proj-row>
      <div class="mp-text-col">
        <h3 class="mp-title">${title}</h3>
        <p  class="mp-desc">${p.description}</p>
        <p  class="mp-tags">${tagRun}</p>
        <a  class="mp-link" href="${p.link}" target="_blank"
            rel="noopener noreferrer">View project ↗</a>
      </div>
      <div class="mp-image-col">
        ${buildLaptop(p)}
      </div>
    </div>`;
  }).join('');

  initLaptops(container);
}

// ─────────────────────────────────────────────────────────────────────────────
// LAPTOP BEHAVIORS
// ─────────────────────────────────────────────────────────────────────────────
function initLaptops(container) {
  const RM       = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch  = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // Mark touch devices so CSS can hide the hint
  if (isTouch) document.body.classList.add('is-touch');

  // ── 1. Lid open: IntersectionObserver (once, threshold .3) ──────────────
  const lidIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-open');
        lidIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  container.querySelectorAll('[data-laptop]').forEach(laptop => {
    if (RM) {
      laptop.classList.add('is-open');   // already open, no animation
    } else {
      lidIO.observe(laptop);
    }

    const tiltEl  = laptop.querySelector('.proj-tilt');
    const screenEl = laptop.querySelector('.proj-screen');
    const pageEl  = laptop.querySelector('.proj-page');

    // ── 2. Hover/focus scroll ──────────────────────────────────────────────
    if (pageEl && !RM) {
      const SPEED = 80;  // px per second
      let scrollTimer = null;

      function startScroll() {
        const screenH    = screenEl.offsetHeight;
        const pageH      = pageEl.naturalHeight || pageEl.offsetHeight;
        const maxScroll  = Math.max(0, pageH - screenH);
        if (maxScroll <= 0) return;
        const duration   = (maxScroll / SPEED) * 1000;
        pageEl.style.transition = `transform ${duration}ms linear`;
        pageEl.style.transform  = `translateY(-${maxScroll}px)`;
      }

      function stopScroll() {
        clearTimeout(scrollTimer);
        pageEl.style.transition = 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)';
        pageEl.style.transform  = 'translateY(0)';
      }

      laptop.addEventListener('mouseenter',   startScroll, { passive: true });
      laptop.addEventListener('mouseleave',   stopScroll,  { passive: true });
      laptop.addEventListener('focus',        startScroll);
      laptop.addEventListener('blur',         stopScroll);
      // Enter/Space for keyboard activation
      laptop.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startScroll(); }
      });
    }

    // ── 3. Mouse tilt + glare (desktop only) ──────────────────────────────
    if (!isTouch && !RM && tiltEl && screenEl) {
      const MAX_Y = 10;   // deg
      const MAX_X =  6;   // deg

      function onMove(e) {
        const r  = laptop.getBoundingClientRect();
        const x  = (e.clientX - r.left)  / r.width;
        const y  = (e.clientY - r.top)   / r.height;
        const ry = (x - 0.5) * MAX_Y * 2;
        const rx = (0.5 - y) * MAX_X * 2;
        tiltEl.style.setProperty('--ty', `${ry}deg`);
        tiltEl.style.setProperty('--tx', `${rx}deg`);
        // glare
        screenEl.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
        screenEl.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
        screenEl.style.setProperty('--go', '1');
      }

      function onLeave() {
        tiltEl.style.setProperty('--ty', '0deg');
        tiltEl.style.setProperty('--tx', '0deg');
        screenEl.style.setProperty('--go', '0');
      }

      laptop.addEventListener('mousemove',  onMove,  { passive: true });
      laptop.addEventListener('mouseleave', onLeave, { passive: true });
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TAG COLORS (injected as CSS vars so they use tokens)
// ─────────────────────────────────────────────────────────────────────────────
// We write these as a tiny <style> block so we can reference CSS custom props.
// Tag A uses --accent (primary blue), Tag B uses --muted (no warm secondary
// token exists in this palette — reporting below).
function injectTagStyles() {
  if (document.getElementById('proj-tag-styles')) return;
  const s = document.createElement('style');
  s.id = 'proj-tag-styles';
  s.textContent = `
    .proj-tag-a { color: var(--accent); }
    .proj-tag-b { color: var(--muted);  }
    .mp-tag-sep { color: var(--line);   }
  `;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────────────────
function init() {
  injectTagStyles();
  renderProjects();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
