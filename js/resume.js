import { contact, resume } from './data.js';

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[char]);

const mailIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="3" y="5" width="18" height="14" rx="2"/>
  <polyline points="3 7 12 13 21 7"/></svg>`;

const lockIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="4" y="10" width="16" height="11" rx="2"/>
  <path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`;

const linkedinIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0"/></svg>`;

const githubIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.53.23 2.67.11 2.95.72.78 1.16 1.78 1.16 3 0 4.29-2.6 5.23-5.09 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8"/></svg>`;

const sectionHeading = (id, label) => `
  <h2 class="resume-section-title" id="resume-${id}-heading"><span>${escapeHTML(label)}</span></h2>`;

const entryHeading = (title, status, tag = '') => `
  <div class="resume-entry-heading">
    <div class="resume-entry-title-group">
      <h3>${escapeHTML(title)}</h3>
      ${tag ? `<span class="resume-tag">${escapeHTML(tag)}</span>` : ''}
    </div>
    ${status ? `<span class="resume-entry-status">${escapeHTML(status)}</span>` : ''}
  </div>`;

const bulletList = bullets => `
  <ul class="resume-bullets">
    ${bullets.map(bullet => `<li>${escapeHTML(bullet)}</li>`).join('')}
  </ul>`;

const sectionMarkup = `
  <section class="resume-intro" aria-labelledby="resume-title">
    <p class="resume-eyebrow">${escapeHTML(resume.eyebrow)}</p>
    <h1 class="resume-title" id="resume-title">
      ${escapeHTML(resume.headline)}<mark>${escapeHTML(resume.highlight)}</mark>
    </h1>
    <p class="resume-description">${escapeHTML(resume.intro)}</p>

    <nav class="resume-pills flex flex-wrap" aria-label="Contact links">
      <a class="resume-pill inline-flex items-center" href="mailto:${escapeHTML(contact.email)}">
        ${mailIcon}<span>Email</span>
      </a>
      <a class="resume-pill inline-flex items-center" href="${escapeHTML(contact.linkedin)}"
         target="_blank" rel="noopener noreferrer">
        ${linkedinIcon}<span>LinkedIn</span>
      </a>
      <a class="resume-pill inline-flex items-center" href="${escapeHTML(contact.github)}"
         target="_blank" rel="noopener noreferrer">
        ${githubIcon}<span>GitHub</span>
      </a>
      <span class="resume-pill resume-pill--private inline-flex items-center">
        ${lockIcon}<span>${escapeHTML(resume.phoneNotice)}</span>
      </span>
    </nav>

    <div class="resume-person">
      <h2>${escapeHTML(resume.name)}</h2>
      <p>${escapeHTML(resume.affiliation)}</p>
    </div>
  </section>

  <div class="resume-sections">
    <section class="resume-section" aria-labelledby="resume-summary-heading">
      ${sectionHeading('summary', 'Summary')}
      <p class="resume-summary">${escapeHTML(resume.summary)}</p>
    </section>

    <section class="resume-section" aria-labelledby="resume-education-heading">
      ${sectionHeading('education', 'Education')}
      <div class="resume-entry-list">
        ${resume.education.map(entry => `
          <article class="resume-entry">
            ${entryHeading(entry.title, entry.status)}
            <p class="resume-entry-detail">${escapeHTML(entry.detail)}</p>
          </article>`).join('')}
      </div>
    </section>

    <section class="resume-section" aria-labelledby="resume-projects-heading">
      ${sectionHeading('projects', 'Projects')}
      <div class="resume-entry-list">
        ${resume.projects.map(project => `
          <article class="resume-entry">
            ${entryHeading(project.title, project.status, project.tag)}
            ${project.stack ? `<p class="resume-entry-stack">${escapeHTML(project.stack)}</p>` : ''}
            ${bulletList(project.bullets)}
          </article>`).join('')}
      </div>
    </section>

    <section class="resume-section" aria-labelledby="resume-skills-heading">
      ${sectionHeading('skills', 'Skills')}
      <ul class="resume-skills">
        ${resume.skills.map(skill => `
          <li><strong>${escapeHTML(skill.label)}:</strong> ${escapeHTML(skill.items)}</li>`).join('')}
      </ul>
    </section>

    <section class="resume-section" aria-labelledby="resume-organizations-heading">
      ${sectionHeading('organizations', 'Organizations')}
      <div class="resume-entry-list">
        ${resume.organizations.map(entry => `
          <article class="resume-entry">
            ${entryHeading(entry.title, '')}
            <p class="resume-entry-detail">${escapeHTML(entry.detail)}</p>
          </article>`).join('')}
      </div>
    </section>

    <section class="resume-section" aria-labelledby="resume-certifications-heading">
      ${sectionHeading('certifications', 'Certifications')}
      <div class="resume-entry-list">
        ${resume.certifications.map(entry => `
          <article class="resume-entry">
            ${entryHeading(entry.title, entry.status)}
          </article>`).join('')}
      </div>
    </section>

    <section class="resume-section" aria-labelledby="resume-additional-heading">
      ${sectionHeading('additional', 'Additional')}
      <ul class="resume-skills">
        ${resume.additional.map(entry => `
          <li><strong>${escapeHTML(entry.label)}:</strong> ${escapeHTML(entry.detail)}</li>`).join('')}
      </ul>
    </section>
  </div>

  <p class="resume-contact-line">
    <span>$ contact --phone</span>
    <span class="resume-contact-value">available on request</span>
  </p>`;

const content = document.getElementById('resume-content');
if (!content) throw new Error('Resume content container #resume-content was not found.');
content.innerHTML = sectionMarkup;
