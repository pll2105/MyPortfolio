/**
 * certifications.js — Certiport certificate showcase.
 * All DOM classes prefixed .cert- to prevent Bootstrap .card leakage.
 *
 * Card DOM hierarchy:
 *   .cert-card[.front|.behind]   wrapper — no bg/border/padding
 *     .cert-tilt                 receives --rx/--ry for 3-D tilt
 *       .cert-flip               rotateY(180deg) when .cert-card.flipped
 *         .cert-face.cert-front  front face (cream paper)
 *         .cert-face.cert-back   back face  (dark navy, rotateY 180)
 */

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const CERT_DATA = [
  {
    id:          'cert-html-css',
    ac:          '#3b5bfd',
    certName:    'HTML and CSS',
    holderName:  'Pia Elleine L. Lucero',           
    issued:      'June 2026',               
    credentialId: "nU6T-DwVk",           
    verifyUrl:   'assets/HTML%26CSS.pdf',   /* opens HTML&CSS.pdf in a new tab, view-only */
    skills: [
      'HTML Fundamentals',
      'CSS Fundamentals',
      'Document Structure using HTML',
      'Multimedia Structure using HTML',
      'Webpage Styling using CSS',
      'Accesibility, Readability, and Testing',
    ],
  },
  {
    id:          'cert-second',
    ac:          '#12b184',
    certName:    'DATABASE',
    holderName:  'Pia Elleine L. Lucero',           
    issued:      'September 2025',               
    credentialId: "wNdRJ-2Fvb",           
    verifyUrl:   'assets/Databases.pdf',    /* opens Databases.pdf in a new tab, view-only */
    skills: [
      'Database Design',
      'Database Object Mamangement',
      'Data Retrieval',
      'Data Manipulation',
      'Troubleshooting',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────
let activeIdx = 0;
const RM      = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─────────────────────────────────────────────────────────────────────────────
// BUILD CARD HTML
// ─────────────────────────────────────────────────────────────────────────────
function buildCard(i) {
  const c   = CERT_DATA[i];
  const cls = i === activeIdx ? 'front' : 'behind';

  const sealSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff"
    stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;

  return `
<div class="cert-card ${cls}"
     tabindex="${i === activeIdx ? 0 : -1}"
     role="button"
     aria-label="${c.certName} certificate"
     data-idx="${i}"
     style="--ac:${c.ac}">
  <div class="cert-tilt">
    <div class="cert-flip">

      <!-- FRONT -->
      <div class="cert-face cert-front">
        <div class="cert-fr-top">
          <span class="cert-fr-issuer">CERTIPORT · IT SPECIALIST</span>
          <div class="cert-fr-seal" aria-hidden="true">${sealSvg}</div>
        </div>
        <div class="cert-fr-bottom">
          <div class="cert-fr-cert-of">Certificate of achievement</div>
          <h3 class="cert-fr-title">${c.certName}</h3>
          <div class="cert-fr-name">${c.holderName}</div>
          <div class="cert-fr-footer">
            <span>Issued:&nbsp;${c.issued}</span>
            <span>ID:&nbsp;${c.credentialId}</span>
          </div>
        </div>
      </div>

      <!-- BACK -->
      <div class="cert-face cert-back">
        <h4 class="cert-bk-heading">Skills validated</h4>
        <ul class="cert-bk-skills">
          ${c.skills.map(s => `<li>${s}</li>`).join('\n          ')}
        </ul>
        <div class="cert-bk-id">ID:&nbsp;${c.credentialId}</div>
        <a href="${c.verifyUrl}"
           class="cert-bk-verify"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="View ${c.certName} certificate (opens PDF in new tab)">
          Verify Credential ↗
        </a>
      </div>

    </div><!-- /.cert-flip -->
  </div><!-- /.cert-tilt -->
</div><!-- /.cert-card -->`;
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────
function renderCertifications() {
  const section = document.getElementById('certifications');
  if (!section) return;

  const chipLabels = ['HTML and CSS', 'Second certificate'];

  section.innerHTML = `
<div class="certs-inner">

  <!-- LEFT -->
  <div class="certs-left">
    <p class="certs-eyebrow">Certified by Certiport · IT Specialist</p>

    <h2 class="certs-headline">
      Proof that I know what
      <mark class="certs-hl">works.</mark>
    </h2>

    <p class="certs-para">
      Two IT Specialist certifications from Certiport that back up the work
      in my projects. Tilt a card, click it to flip it, or pick one to
      bring it to the front.
    </p>

    <div class="cert-chips" role="group" aria-label="Select certificate">
      ${CERT_DATA.map((c, i) => `
      <button class="cert-chip"
              type="button"
              aria-pressed="${i === activeIdx}"
              aria-label="Show ${c.certName} certificate"
              data-chip-idx="${i}">
        ${i === activeIdx ? '✓ ' : ''}${chipLabels[i]}
      </button>`).join('')}
    </div>
  </div>

  <!-- RIGHT -->
  <div class="cert-stage">
    <div class="cert-deck" id="cert-deck">
      ${CERT_DATA.map((_, i) => buildCard(i)).join('\n      ')}
    </div>
  </div>

</div>
<div class="certs-live" id="certs-live" aria-live="polite" aria-atomic="true"></div>`;

  attachBehavior(section);
}

// ─────────────────────────────────────────────────────────────────────────────
// setActive
// ─────────────────────────────────────────────────────────────────────────────
function setActive(newIdx) {
  const deck     = document.getElementById('cert-deck');
  const cards    = Array.from(deck.querySelectorAll('.cert-card'));
  const chips    = Array.from(document.querySelectorAll('.cert-chip'));
  const labels   = ['HTML and CSS', 'Second certificate'];

  cards.forEach(c => c.classList.remove('flipped'));
  activeIdx = newIdx;

  cards.forEach(card => {
    const i     = parseInt(card.dataset.idx, 10);
    const front = i === activeIdx;
    card.classList.toggle('front',  front);
    card.classList.toggle('behind', !front);
    card.tabIndex = front ? 0 : -1;
  });

  chips.forEach((chip, i) => {
    const active = i === activeIdx;
    chip.setAttribute('aria-pressed', String(active));
    chip.textContent = active ? `✓ ${labels[i]}` : labels[i];
  });

  announce(`Now showing: ${CERT_DATA[activeIdx].certName}`);

  // Re-attach tilt to new front card
  const frontCard = deck.querySelector('.cert-card.front');
  if (frontCard) attachTilt(frontCard);
}

// ─────────────────────────────────────────────────────────────────────────────
// TILT + GLARE — fine pointer, front card only
// ─────────────────────────────────────────────────────────────────────────────
function attachTilt(cardEl) {
  if (RM) return;
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  const tiltEl  = cardEl.querySelector('.cert-tilt');
  const frontEl = cardEl.querySelector('.cert-front');
  if (!tiltEl || !frontEl) return;

  // Clone to strip old listeners
  const fresh = cardEl.cloneNode(true);
  cardEl.parentNode.replaceChild(fresh, cardEl);

  const tilt  = fresh.querySelector('.cert-tilt');
  const front = fresh.querySelector('.cert-front');

  fresh.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const r  = fresh.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width;
    const y  = (e.clientY - r.top)  / r.height;
    tilt.style.setProperty('--ry', `${(x - .5) * 16}deg`);
    tilt.style.setProperty('--rx', `${(.5 - y) * 12}deg`);
    front.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    front.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
    front.style.setProperty('--go', '1');
  }, { passive: true });

  fresh.addEventListener('pointerleave', () => {
    tilt.style.setProperty('--rx', '0deg');
    tilt.style.setProperty('--ry', '0deg');
    front.style.setProperty('--go', '0');
  }, { passive: true });

  fresh.addEventListener('click',   e => handleCardClick(e, fresh));
  fresh.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(e, fresh);
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD CLICK
// ─────────────────────────────────────────────────────────────────────────────
function handleCardClick(e, cardEl) {
  if (e.target.closest('.cert-bk-verify')) return;
  const i = parseInt(cardEl.dataset.idx, 10);
  if (cardEl.classList.contains('front')) {
    cardEl.classList.toggle('flipped');
    announce(cardEl.classList.contains('flipped')
      ? `Showing back of ${CERT_DATA[i].certName}`
      : `Showing front of ${CERT_DATA[i].certName}`);
  } else {
    setActive(i);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ATTACH BEHAVIOR
// ─────────────────────────────────────────────────────────────────────────────
function attachBehavior(section) {
  const deck = document.getElementById('cert-deck');
  if (!deck) return;

  deck.querySelectorAll('.cert-card').forEach(card => {
    if (card.classList.contains('front')) {
      if (RM) {
        card.addEventListener('click',   e => handleCardClick(e, card));
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); handleCardClick(e, card);
          }
        });
      } else {
        attachTilt(card);  // attachTilt clones and re-wires
      }
    } else {
      card.addEventListener('click',   e => handleCardClick(e, card));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); handleCardClick(e, card);
        }
      });
    }
  });

  section.querySelectorAll('.cert-chip').forEach(chip => {
    const handler = () => setActive(parseInt(chip.dataset.chipIdx, 10));
    chip.addEventListener('click',   handler);
    chip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ARIA LIVE
// ─────────────────────────────────────────────────────────────────────────────
function announce(msg) {
  const el = document.getElementById('certs-live');
  if (!el) return;
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 2500);
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCertifications);
} else {
  renderCertifications();
}
