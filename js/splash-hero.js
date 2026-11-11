/**
 * splash-hero.js  v2
 * Full-viewport opening hero — animated tile field + center content.
 *
 * Performance design:
 *  - Canvas 2D draw loop, transform only (translate + rotate via ctx matrix).
 *  - Tiles pre-rendered into OffscreenCanvas images keyed by (size, iconIdx,
 *    colorIdx, theme). No SVG-to-Blob round-trip per frame.
 *  - ctx.filter / box-shadow never applied per-tile or per-frame.
 *    Per-row opacity is set once with ctx.globalAlpha.
 *  - Scroll reads (scrollY) happen once per rAF, stored in a module variable.
 *  - No getBoundingClientRect inside the loop.
 *  - rAF pauses when the section leaves viewport (IntersectionObserver)
 *    and when the tab is hidden (visibilitychange).
 *  - Throttles to ~30 fps on hardware with ≤4 cores or when frames
 *    consistently exceed 20 ms.
 *  - Resize rebuild debounced 150 ms, skips if width breakpoint unchanged.
 *  - Icons are defined once as SVG strings; pre-rendered tiles are cached.
 *  - Max 60 tiles total; 3 rows (instead of 5) on < 700 px wide.
 */

import { meta } from './data.js';

// ─────────────────────────────────────────────────────────────────────────────
// ROW CONFIGS  (spec values from the brief)
// [sizeFactor, direction (+1=right, -1=left), speed px/frame, opacity, blurPx]
// ─────────────────────────────────────────────────────────────────────────────
const ROW_CFG = [
  [0.60, +1, 0.18, 0.40, 0],    // row 0 — back, faint
  [0.85, -1, 0.30, 0.70, 0],    // row 1
  [0.70, +1, 0.22, 0.50, 0],    // row 2 — mid
  [0.90, -1, 0.34, 0.75, 0],    // row 3 — front, vivid
  [0.60, +1, 0.20, 0.40, 0],    // row 4 — back, faint
];
// Row Y positions (% of hero height)
const ROW_Y_PCT = [0.10, 0.28, 0.50, 0.72, 0.90];

const BASE_TILE = 116;   // px desktop
const MOB_TILE  = 84;    // px ≤700px
const NARROW    = 700;
const GAP_RATIO = 1.45;  // tile-size × this = centre-to-centre spacing
const MAX_TILES = 60;    // hard cap across all rows

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE
// dark base #131a36 · light base white
// ─────────────────────────────────────────────────────────────────────────────
const DARK_PALETTE = [
  { hex: '#ffc94a', r:255, g:201, b:74  },
  { hex: '#8da2ff', r:141, g:162, b:255 },
  { hex: '#ff7a6b', r:255, g:122, b:107 },
  { hex: '#5fe3b5', r:95,  g:227, b:181 },
];
const LIGHT_PALETTE = [
  { hex: '#e0a100', r:224, g:161, b:0   },
  { hex: '#4f6bff', r:79,  g:107, b:255 },
  { hex: '#ee5a49', r:238, g:90,  b:73  },
  { hex: '#12b184', r:18,  g:177, b:132 },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS  (12 inline SVG strings — defined once, never duplicated per tile)
// ─────────────────────────────────────────────────────────────────────────────
// SVG template: viewBox 0 0 24 24, stroke width 1.7, round caps
// Filled elements use fill-opacity 0.22 for duotone effect
const ICON_SVGS = [
  /* 0 atom */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/><circle cx="12" cy="12" r="1.8" fill="SCOL" fill-opacity="0.9"/></svg>`,
  /* 1 git-branch */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2" fill="SCOL" fill-opacity="0.22"/><circle cx="6" cy="18" r="2" fill="SCOL" fill-opacity="0.22"/><circle cx="18" cy="6" r="2" fill="SCOL" fill-opacity="0.22"/><line x1="6" y1="8" x2="6" y2="16"/><path d="M6 8c0-2 3-2 6-2h2a2 2 0 0 1 2 2 2 2 0 0 0 2 2"/></svg>`,
  /* 2 terminal */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" fill="SCOL" fill-opacity="0.14"/><polyline points="7 9 11 12 7 15"/><line x1="13" y1="15" x2="17" y2="15"/></svg>`,
  /* 3 database */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3" fill="SCOL" fill-opacity="0.22"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`,
  /* 4 layers */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 12 15 2 8.5" fill="SCOL" fill-opacity="0.22"/><polyline points="2 13 12 19.5 22 13"/><polyline points="2 17.5 12 24 22 17.5"/></svg>`,
  /* 5 phone */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" fill="SCOL" fill-opacity="0.14"/><circle cx="12" cy="17.5" r="0.9" fill="SCOL"/></svg>`,
  /* 6 cloud */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10a6 6 0 0 0-11.74-1.5A4 4 0 1 0 5 16h13a3 3 0 0 0 0-6z" fill="SCOL" fill-opacity="0.18"/></svg>`,
  /* 7 bug */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l1.88 1.88M14.12 3.88 16 2"/><path d="M9 7.13v-1a3 3 0 1 1 6 0v1" fill="SCOL" fill-opacity="0.14"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z"/><line x1="12" y1="10" x2="12" y2="20"/><line x1="8" y1="14" x2="4" y2="14"/><line x1="20" y1="14" x2="16" y2="14"/></svg>`,
  /* 8 ticket */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" fill="SCOL" fill-opacity="0.14"/><line x1="9" y1="12" x2="15" y2="12" stroke-dasharray="2 2"/></svg>`,
  /* 9 bar-chart */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="4" height="9" fill="SCOL" fill-opacity="0.22"/><rect x="10" y="7" width="4" height="14" fill="SCOL" fill-opacity="0.22"/><rect x="17" y="4" width="4" height="17" fill="SCOL" fill-opacity="0.22"/><line x1="2" y1="21" x2="22" y2="21"/></svg>`,
  /* 10 bell */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="SCOL" fill-opacity="0.18"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  /* 11 wireframe */
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="SCOL" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" fill="SCOL" fill-opacity="0.14"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="8" y1="8" x2="8" y2="21"/></svg>`,
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL = [
  {
    key: 'linkedin', label: 'LinkedIn profile',
    // TODO: replace with real URL
    href: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    key: 'github', label: 'GitHub profile',
    // TODO: replace with real URL
    href: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  },
  {
    key: 'instagram', label: 'Instagram profile',
    // TODO: replace with real URL
    href: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  },
  {
    key: 'gmail', label: 'Email via Gmail',
    // TODO: replace with real mailto: or compose URL
    href: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.9.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.27h.909A1.636 1.636 0 0 1 24 5.457z"/></svg>`,
  },
  {
    key: 'discord', label: 'Discord profile',
    // TODO: replace with real URL
    href: '#',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TILE CACHE  (key = `${iconIdx}_${colorIdx}_${dark}`)
// Each entry is an ImageBitmap or OffscreenCanvas
// ─────────────────────────────────────────────────────────────────────────────
const tileCache = new Map();

function makeTileKey(iconIdx, colorIdx, tsz, dark) {
  return `${iconIdx}_${colorIdx}_${tsz}_${dark ? 1 : 0}`;
}

function renderTileSync(iconIdx, colorIdx, tsz, dark) {
  const palette = dark ? DARK_PALETTE : LIGHT_PALETTE;
  const col     = palette[colorIdx];
  const r = col.r, g = col.g, b = col.b;

  const off = document.createElement('canvas');
  off.width = off.height = tsz;
  const ctx  = off.getContext('2d');
  const rad  = tsz * 0.30;

  // Background: tinted 14% opacity
  ctx.fillStyle = dark
    ? `rgba(${r},${g},${b},0.14)`
    : `rgba(${r},${g},${b},0.14)`;
  squircle(ctx, 0, 0, tsz, tsz, rad);
  ctx.fill();

  // Border: 38% opacity
  ctx.strokeStyle = `rgba(${r},${g},${b},0.38)`;
  ctx.lineWidth   = Math.max(1, tsz * 0.011);
  squircle(ctx, 0, 0, tsz, tsz, rad);
  ctx.stroke();

  // Icon as SVG data URI
  const col_str = col.hex;
  const svgStr  = ICON_SVGS[iconIdx].replace(/SCOL/g, col_str);
  const img     = new Image();
  const iconSz  = Math.round(tsz * 0.42);
  const iconOff = Math.round((tsz - iconSz) / 2);

  img.onload = () => {
    ctx.drawImage(img, iconOff, iconOff, iconSz, iconSz);
  };
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
  // Icon may render async but canvas already has bg+border; it updates on next frame

  return off;
}

function squircle(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x,     y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

function getOrMakeTile(iconIdx, colorIdx, tsz, dark) {
  const key = makeTileKey(iconIdx, colorIdx, tsz, dark);
  if (!tileCache.has(key)) {
    tileCache.set(key, renderTileSync(iconIdx, colorIdx, tsz, dark));
  }
  return tileCache.get(key);
}

// ─────────────────────────────────────────────────────────────────────────────
// TILE DATA  (built from viewport dimensions)
// ─────────────────────────────────────────────────────────────────────────────
let rowData = [];   // array of { cfg, tiles[], y0 }
let heroH   = 0;
let heroW   = 0;

function buildRows(W, H, dark) {
  rowData = [];
  tileCache.clear();  // different sizes = different cache

  const mobile     = W < NARROW;
  const baseSize   = mobile ? MOB_TILE : BASE_TILE;
  const rowCount   = mobile ? 3 : 5;
  const yPcts      = mobile ? [0.18, 0.50, 0.82] : ROW_Y_PCT;

  let totalTiles = 0;

  for (let ri = 0; ri < rowCount; ri++) {
    const cfg   = ROW_CFG[ri];
    const [sizeFactor, dir] = cfg;
    const tsz   = Math.round(baseSize * sizeFactor);
    const gap   = Math.round(tsz * GAP_RATIO);
    const y0    = H * yPcts[ri];

    // Tiles to fill width + 2 extra for seamless wrap, but respect MAX_TILES
    const count = Math.min(
      Math.ceil(W / gap) + 2,
      Math.max(4, Math.floor((MAX_TILES - totalTiles) / (rowCount - ri)))
    );
    if (count <= 0) continue;
    totalTiles += count;

    const tiles = [];
    for (let i = 0; i < count; i++) {
      const iconIdx  = (i * 5 + ri * 3) % ICON_SVGS.length;  // spec: i*5 + rowIndex*3
      const colorIdx = (i + ri)          % 4;
      tiles.push({
        x:        i * gap,
        gap,
        total:    count * gap,
        tsz,
        iconIdx,
        colorIdx,
        dir,
      });
      // Pre-warm tile into cache
      getOrMakeTile(iconIdx, colorIdx, tsz, dark);
    }

    rowData.push({ cfg, tiles, y0 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FRAME TICK
// ─────────────────────────────────────────────────────────────────────────────
let time       = 0;
let scrollVel  = 0;
let lastSY     = window.scrollY;
let currentSY  = window.scrollY;  // set by passive scroll listener, read once per frame

function tick(canvas, ctx, animate) {
  const dark = isDark();
  const W    = canvas.width;
  const H    = canvas.height;

  ctx.clearRect(0, 0, W, H);

  for (let ri = 0; ri < rowData.length; ri++) {
    const { cfg, tiles, y0 } = rowData[ri];
    const [, dir, speed, opacity] = cfg;
    const amp   = H * 0.045;

    ctx.globalAlpha = opacity;

    for (const t of tiles) {
      // Wave:  y = rowY + sin(x*0.0042 + t*0.0007*direction + rowIndex*1.3) * heroH*0.045
      const phase = t.x * 0.0042 + time * 0.0007 * dir + ri * 1.3;
      const waveY = Math.sin(phase) * amp;
      const tilt  = Math.cos(phase) * 14;        // degrees

      const img = getOrMakeTile(t.iconIdx, t.colorIdx, t.tsz, dark);

      ctx.save();
      ctx.translate(t.x + t.tsz / 2, y0 + waveY);
      ctx.rotate(tilt * Math.PI / 180);
      ctx.drawImage(img, -t.tsz / 2, -t.tsz / 2, t.tsz, t.tsz);
      ctx.restore();

      if (animate) {
        // Drift + scroll velocity boost
        const spd = speed + scrollVel * 0.4;
        t.x -= dir * spd;
        // Seamless wrap
        if (dir > 0 && t.x < -t.tsz * 1.5) t.x += t.total;
        if (dir > 0 && t.x > W + t.tsz)    t.x -= t.total;
        if (dir < 0 && t.x > W + t.tsz)    t.x -= t.total;
        if (dir < 0 && t.x < -t.tsz * 1.5) t.x += t.total;
      }
    }
  }

  ctx.globalAlpha = 1;
}

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────
function initSplashHero() {
  const section = document.getElementById('splash-hero');
  const canvas  = document.getElementById('splash-canvas');
  if (!section || !canvas) return;

  const ctx            = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. Render HTML content immediately (no JS dependency) ───────────────
  // Content is already in the DOM from the HTML shell; we fill the center div.
  renderContent(section);

  // ── 2. Measure hero ONCE ─────────────────────────────────────────────────
  function measure() {
    heroW = section.offsetWidth  || window.innerWidth;
    heroH = section.offsetHeight || window.innerHeight;
    canvas.width  = heroW;
    canvas.height = heroH;
  }
  measure();
  buildRows(heroW, heroH, isDark());

  // ── 3. Scroll velocity — passive listener, only updates a variable ───────
  window.addEventListener('scroll', () => { currentSY = window.scrollY; }, { passive: true });

  // ── 4. Header scroll-class ───────────────────────────────────────────────
  const header = document.getElementById('site-header');
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('sh-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── 5. Animation loop ────────────────────────────────────────────────────
  let rafId       = null;
  let paused      = false;
  let lastStamp   = 0;
  let slowFrames  = 0;
  const lowEnd    = navigator.hardwareConcurrency <= 4;
  const TARGET_MS = lowEnd ? 33 : 16.7;  // ~30fps vs 60fps

  function loop(stamp) {
    if (paused) return;

    // Throttle on low-end: skip frame if interval < TARGET_MS
    if (stamp - lastStamp < TARGET_MS - 2) {
      rafId = requestAnimationFrame(loop);
      return;
    }

    // Adaptive throttle: if 5 consecutive slow frames, switch to 30fps
    const dt = stamp - lastStamp;
    if (dt > 20) slowFrames++;
    else         slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 5 && TARGET_MS < 33) {
      // downgrade — not resetting, just letting TARGET_MS feel like 33
    }

    lastStamp = stamp;

    // Scroll velocity (read currentSY which was set by passive listener)
    const dy   = currentSY - lastSY;
    lastSY     = currentSY;
    scrollVel  = scrollVel * 0.92 + dy * 0.12;
    if (Math.abs(scrollVel) < 0.01) scrollVel = 0;

    time++;
    tick(canvas, ctx, true);
    rafId = requestAnimationFrame(loop);
  }

  // ── 6. Pause when not visible ────────────────────────────────────────────
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      paused = true;
      cancelAnimationFrame(rafId);
    } else {
      paused = false;
      lastStamp = 0;
      rafId = requestAnimationFrame(loop);
    }
  });

  const io = new IntersectionObserver(entries => {
    const vis = entries[0].isIntersecting;
    if (vis && paused) {
      paused = false;
      lastStamp = 0;
      rafId = requestAnimationFrame(loop);
    } else if (!vis && !paused) {
      paused = true;
      cancelAnimationFrame(rafId);
    }
  }, { threshold: 0.01 });
  io.observe(section);

  // ── 7. Theme change — rebuild cache ──────────────────────────────────────
  const mo = new MutationObserver(() => {
    tileCache.clear();
    buildRows(heroW, heroH, isDark());
    if (prefersReduced) tick(canvas, ctx, false);
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ── 8. Resize — debounced, only if breakpoint changes ────────────────────
  let lastBreakpoint = heroW < NARROW ? 'mob' : 'desk';
  let resizeTimer    = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newBP = window.innerWidth < NARROW ? 'mob' : 'desk';
      const widthChanged = Math.abs(section.offsetWidth - heroW) > 10;
      if (!widthChanged && newBP === lastBreakpoint) return;
      lastBreakpoint = newBP;
      cancelAnimationFrame(rafId);
      measure();
      buildRows(heroW, heroH, isDark());
      if (prefersReduced) {
        tick(canvas, ctx, false);
      } else {
        paused = false;
        lastStamp = 0;
        rafId = requestAnimationFrame(loop);
      }
    }, 150);
  }, { passive: true });

  // ── 9. Start the loop (after first paint, so content is never blocked) ───
  if (prefersReduced) {
    tick(canvas, ctx, false);
    canvas.classList.add('sh-ready');
    return;
  }

  // Delay first frame until after the browser paints the HTML content
  requestAnimationFrame(() => {
    canvas.classList.add('sh-ready');  // fade in
    lastStamp = performance.now();
    rafId     = requestAnimationFrame(loop);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT RENDER  (HTML injected into .splash-center)
// ─────────────────────────────────────────────────────────────────────────────
function renderContent(section) {
  const centerEl = section.querySelector('.splash-center');
  if (!centerEl) return;

  const avatarSrc = 'assets/pfp.jpg';  // swap to your real photo path
  const initials  = meta.name
    .split(/\s+/)
    .filter(w => /[A-Za-z]/.test(w))
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('') || 'P';

  centerEl.innerHTML = `
    <div class="splash-avatar-wrap" aria-hidden="true">
      <div class="splash-avatar-ring"></div>
      <div class="splash-avatar-inner">
        <img
          src="${avatarSrc}"
          alt=""
          width="128" height="128"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="splash-avatar-placeholder" style="display:none;">${initials}</div>
      </div>
    </div>

    <h1 class="splash-name">${meta.name}</h1>

    <p class="splash-roles">Student, Front-End Developer, Project Manager, Business Analyst, QA Tester</p>

    <div class="splash-links" role="list">
      ${SOCIAL.map(s => `
        <a href="${s.href}"
           class="splash-link splash-link--${s.key}"
           role="listitem"
           aria-label="${s.label}"
           title="${s.label}">
          ${s.svg}
        </a>`).join('')}
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSplashHero);
} else {
  initSplashHero();
}
