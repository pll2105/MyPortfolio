/**
 * projects.js — My Projects editorial section.
 * Edit PROJECTS_DATA below to swap in your real content.
 * imageSrc: set to 'assets/your-image.jpg' (or any URL) when ready.
 *           null = shows a styled placeholder tile.
 * link:     '#' for now — replace with your live URL or case-study link.
 */

const PROJECTS_DATA = [
  {
    id:          'alwan',
    title:       'ALWAN',
    titleCase:   'upper',
    description:
      'An online lending application' +
      'As project lead I handled task assignment, stakeholder coordination, ' +
      'requirements documentation, and contributed to the Flutter frontend. ' +
      'The system manages loan applications and approvals end-to-end.',
    tags:  ['Mobile App', 'Flutter', 'Laravel', 'Supabase'],
    link:  'https://www.alwann.app/',   // TODO: replace with live URL
    imageSrc: null,  // TODO: drop your screenshot at assets/alwan.jpg
    placeholderBg: '#0d1117',
    placeholderColor: '#7c9bff',
  },
  {
    id:          'nookph',
    title:       'LakbAI',
    titleCase:   'upper',
    description:
      'Student-led Digital Jeepney System for Dasmariñas' +
      'I coordinated tasks across the team, produced research and ' +
      'documentation artifacts, and contributed to the frontend implementation ' +
      'for property listing views.',
    tags:  ['Web App', '[CONFIRM STACK]'],  // CONFIRM: replace with real stack
    link:  'https://lakbai-jeepney.netlify.app/',   // TODO: replace with live URL
    imageSrc: null,  // TODO: drop your screenshot at assets/nookph.jpg
    placeholderBg: '#0a1628',
    placeholderColor: '#5fe3b5',
  },
  {
    id:          'kyakoyarn',
    title:       'Kya Ko Yarn',
    titleCase:   'original',
    description:
      'A web application for yarn crafters built with a team of six, ' +
      'deployed on Vercel. I distributed tasks across contributors, ' +
      'produced documentation, and contributed to the frontend build ' +
      'and Vercel deployment pipeline.',
    tags:  ['Web App', '[CONFIRM STACK]', 'Vercel'],  // CONFIRM: replace with real stack
    link:  'https://kya-ko-yarn.vercel.app/',   // TODO: replace with Vercel live URL
    imageSrc: null,  // TODO: drop your screenshot at assets/kyakoyarn.jpg
    placeholderBg: '#0f1a10',
    placeholderColor: '#ffc94a',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────
function renderProjects() {
  const container = document.getElementById('my-projects-rows');
  if (!container) return;

  container.innerHTML = PROJECTS_DATA.map((p) => {
    const title  = p.titleCase === 'upper' ? p.title.toUpperCase() : p.title;

    // Tags: single run separated by " / "
    const tagRun = p.tags.map((t, i) =>
      `<span class="mp-tag-item" style="color:${i % 2 === 0 ? '#3a5a8c' : '#8a6a4a'}">${t}</span>`
    ).join(`<span style="color:#9aa8c4"> / </span>`);

    // Image tile or dark placeholder
    const imageTile = p.imageSrc
      ? `<img src="${p.imageSrc}" alt="${title} screenshot" loading="lazy">`
      : `<div class="mp-placeholder-tile" style="background:${p.placeholderBg}">
           <span class="mp-placeholder-label">image placeholder</span>
           <span class="mp-placeholder-title" style="color:${p.placeholderColor}">${title}</span>
         </div>`;

    return `
    <div class="mp-row" data-mp-row>
      <div class="mp-text-col">
        <h3 class="mp-title">${title}</h3>
        <p class="mp-desc">${p.description}</p>
        <p class="mp-tags">${tagRun}</p>
        <a href="${p.link}" class="mp-link">View project ↗</a>
      </div>
      <div class="mp-image-col">
        <div class="mp-image-tile" data-mp-tile>${imageTile}</div>
      </div>
    </div>`;
  }).join('');

  // Clip-path reveal on scroll
  const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiles = container.querySelectorAll('[data-mp-tile]');

  if (pref) {
    tiles.forEach(t => t.classList.add('mp-revealed'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('mp-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  tiles.forEach(t => io.observe(t));
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProjects);
} else {
  renderProjects();
}
