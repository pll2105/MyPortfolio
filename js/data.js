/**
 * data.js — All portfolio content lives here.
 * Edit this file to update the site; never touch index.html or main.js for content.
 *
 * Search for // CONFIRM or // ADD DETAIL to find every placeholder.
 */

// ---------------------------------------------------------------------------
// META
// ---------------------------------------------------------------------------
export const meta = {
  // CONFIRM: Replace with your full name
  name: "YOUR FULL NAME",

  title: "BSIT Student · Aspiring Business Analyst",

  hero: "Aspiring Business Analyst and Project Coordinator who also builds and tests the interfaces.",

  // CONFIRM: e.g. "2025" or "2026"
  gradYear: "[CONFIRM GRADUATION YEAR]",

  school: "National University – Dasmariñas",
  degree: "Bachelor of Science in Information Technology",

  // 400-hour OJT target — CONFIRM the month/year
  ojtTarget: "Seeking 400-hr Internship · [CONFIRM MONTH YEAR]",

  // CONFIRM: Replace with your actual email
  email: "your@email.com",

  // CONFIRM: Replace with your phone number (optional — delete if you don't want it shown)
  phone: "[CONFIRM PHONE]",

  // CONFIRM: Replace with your actual LinkedIn profile URL
  linkedin: "https://linkedin.com/in/your-handle",

  // CONFIRM: Replace with your actual GitHub profile URL
  github: "https://github.com/your-handle",

  // Resume PDF — place your file at assets/resume.pdf
  resume: "assets/resume.pdf",
};

// ---------------------------------------------------------------------------
// NAV LINKS (order = scroll order)
// ---------------------------------------------------------------------------
export const navLinks = [
  { label: "About",          href: "#about" },
  { label: "Projects",       href: "#projects" },
  { label: "Skills",         href: "#skills" },
  { label: "Timeline",       href: "#timeline" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

// ---------------------------------------------------------------------------
// PROJECTS
// Role bullets: provide 2 bullets per role key so Role Lens can swap them.
// Keys: ba | fe | ux | qa
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: "alwan",
    title: "ALWAN",
    summary: "Online Lending Application — mobile and web platform for loan management.",
    teamSize: 3,
    myRole: "Project Lead",
    stack: ["Flutter", "Laravel", "Supabase"],
    // CONFIRM: Add live demo URL when available
    demoUrl: "[CONFIRM LIVE DEMO URL]",
    // CONFIRM: Add GitHub repository URL
    githubUrl: "[CONFIRM GITHUB URL]",

    // Modal case-study content
    caseStudy: {
      problem:
        "Users needed a streamlined digital channel for loan applications and approvals, " +
        "replacing a manual, paper-based process. [ADD DETAIL — describe the specific pain points]",
      myRoleDetail:
        "Served as Project Lead for a team of three. Responsible for task assignment, " +
        "research and documentation, stakeholder coordination, and frontend contribution.",
      whatIDid: [
        "Defined project scope and assigned development tasks across the team.",
        "Conducted stakeholder interviews and produced requirements documentation.",
        "Coordinated between frontend and backend developers throughout sprints.",
        "Contributed to Flutter UI screens for the loan application flow.",
        // ADD DETAIL: add more specifics once available
      ],
    },

    // Role Lens bullets — 2 per role (shown on card, swapped by lens)
    roleBullets: {
      ba: [
        "Led requirements gathering and produced end-to-end documentation.",
        "Coordinated stakeholders and managed task assignment across the team.",
      ],
      fe: [
        "Built Flutter UI screens for the loan application and approval flow.",
        "Contributed to frontend architecture decisions in a Laravel + Flutter stack.",
      ],
      ux: [
        "Designed user flows for the loan application journey. [ADD DETAIL]",
        "Prototyped screens and gathered feedback from stakeholders.",
      ],
      qa: [
        "Validated loan form inputs and edge-case error handling. [ADD DETAIL]",
        "Coordinated testing rounds and tracked bugs across the team.",
      ],
    },
  },

  {
    id: "nookph",
    title: "NOOK PH",
    summary: "Rental Management System — platform for property listings and tenant coordination.",
    teamSize: 5,
    myRole: "Team Member",
    // CONFIRM: Confirm the actual stack used
    stack: ["[CONFIRM]"],
    // CONFIRM: Add live demo URL when available
    demoUrl: "[CONFIRM LIVE DEMO URL]",
    // CONFIRM: Add GitHub repository URL
    githubUrl: "[CONFIRM GITHUB URL]",

    caseStudy: {
      problem:
        "Property managers needed a centralized system to handle rental listings, " +
        "tenant records, and payment tracking. [ADD DETAIL]",
      myRoleDetail:
        "Team member in a group of five. Focused on team coordination, research and " +
        "documentation, and frontend contribution.",
      whatIDid: [
        "Supported team coordination and helped unblock cross-functional dependencies.",
        "Produced research documentation and contributed to system design artifacts.",
        "Built frontend components for property listing views. [ADD DETAIL]",
        // ADD DETAIL: add more specifics once available
      ],
    },

    roleBullets: {
      ba: [
        "Produced research documentation and contributed to system requirements. [ADD DETAIL]",
        "Coordinated team tasks and helped resolve blockers across the group.",
      ],
      fe: [
        "Developed frontend components for the rental listing interface. [ADD DETAIL]",
        "Collaborated on UI implementation using the confirmed tech stack.",
      ],
      ux: [
        "Assisted with wireframing and user flow documentation. [ADD DETAIL]",
        "Gathered feedback on the rental browsing experience. [ADD DETAIL]",
      ],
      qa: [
        "Validated rental form inputs and listing data consistency. [ADD DETAIL]",
        "Participated in testing rounds and documented issues. [ADD DETAIL]",
      ],
    },
  },

  {
    id: "kyakoyarn",
    title: "Kya Ko Yarn",
    summary: "Web application for yarn crafters — deployed on Vercel.",
    teamSize: 6,
    myRole: "Team Member",
    // CONFIRM: Confirm the actual stack used
    stack: ["[CONFIRM]", "Vercel"],
    deployedOn: "Vercel",
    // CONFIRM: Add live demo URL (deployed on Vercel)
    demoUrl: "[CONFIRM VERCEL LIVE URL]",
    // CONFIRM: Add GitHub repository URL
    githubUrl: "[CONFIRM GITHUB URL]",

    caseStudy: {
      problem:
        "Yarn enthusiasts lacked a dedicated platform to browse, track, and share " +
        "yarn projects and stash inventory. [ADD DETAIL]",
      myRoleDetail:
        "Team member in a group of six. Handled task distribution, research and " +
        "documentation, and frontend contribution.",
      whatIDid: [
        "Distributed development tasks and tracked progress across six contributors.",
        "Produced research and documentation artifacts for the project. [ADD DETAIL]",
        "Contributed to frontend development and supported Vercel deployment. [ADD DETAIL]",
        // ADD DETAIL: add more specifics once available
      ],
    },

    roleBullets: {
      ba: [
        "Distributed tasks and tracked project progress across a 6-person team.",
        "Produced research documentation to support system design decisions. [ADD DETAIL]",
      ],
      fe: [
        "Built frontend components and supported the Vercel deployment pipeline. [ADD DETAIL]",
        "Contributed to UI implementation using the confirmed tech stack. [ADD DETAIL]",
      ],
      ux: [
        "Assisted with user flow documentation and interface planning. [ADD DETAIL]",
        "Participated in design reviews and usability feedback sessions. [ADD DETAIL]",
      ],
      qa: [
        "Validated application features across the Vercel deployment. [ADD DETAIL]",
        "Tracked and documented bugs during testing rounds. [ADD DETAIL]",
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// SKILLS
// levels: "Basic" | "Working" | "Comfortable"
// category keys must match ROLE_LENS keys: ba | fe | ux | qa | other
// ---------------------------------------------------------------------------
export const skills = [
  // --- Business Analyst / PM ---
  { name: "Requirements & Research",   category: "ba",    level: "Working" },
  { name: "Documentation",             category: "ba",    level: "Working" },
  { name: "Task Tracking",             category: "ba",    level: "Working" },
  { name: "Stakeholder Coordination",  category: "ba",    level: "Working" },
  { name: "Jira",                      category: "ba",    level: "Basic"   },

  // --- Front-End ---
  { name: "HTML",                      category: "fe",    level: "Working" },
  { name: "CSS",                       category: "fe",    level: "Working" },
  { name: "JavaScript",                category: "fe",    level: "Working" },
  { name: "React",                     category: "fe",    level: "Working" },
  { name: "Tailwind CSS",              category: "fe",    level: "Working" },

  // --- UI/UX ---
  { name: "Figma",                     category: "ux",    level: "Working" },
  { name: "Wireframing",               category: "ux",    level: "Working" },
  { name: "User Flows",                category: "ux",    level: "Working" },

  // --- QA ---
  { name: "Testing & Validation",      category: "qa",    level: "Working" },
  { name: "Bug Reporting",             category: "qa",    level: "Working" },
  // CONFIRM: Confirm whether Postman is used for QA and at what level
  { name: "Postman",                   category: "qa",    level: "Working" }, // CONFIRM level

  // --- Other / Cross-cutting ---
  { name: "Java",                      category: "other", level: "Working" },
  { name: "Supabase",                  category: "other", level: "Working" },
  { name: "GitHub",                    category: "other", level: "Working" },
  { name: "Google Workspace",          category: "other", level: "Working" },
  { name: "Microsoft Excel",           category: "other", level: "Working" },
  { name: "AI-Assisted Development",   category: "other", level: "Working" },
  { name: "Flutter",                   category: "other", level: "Working" },
];

// ---------------------------------------------------------------------------
// ROLE LENS CONFIG
// order: array of category keys; first = default shown at top of skills section
// ---------------------------------------------------------------------------
export const roleLens = [
  {
    key: "ba",
    label: "Business Analyst / PM",
    shortLabel: "BA/PM",
    // Which skill categories bubble to the top when this lens is active
    priorityCategories: ["ba", "other"],
  },
  {
    key: "fe",
    label: "Front-End Developer",
    shortLabel: "Front-End",
    priorityCategories: ["fe", "other"],
  },
  {
    key: "ux",
    label: "UI/UX Designer",
    shortLabel: "UI/UX",
    priorityCategories: ["ux", "fe", "other"],
  },
  {
    key: "qa",
    label: "QA Tester",
    shortLabel: "QA",
    priorityCategories: ["qa", "other"],
  },
];

// ---------------------------------------------------------------------------
// TIMELINE
// type: "education" | "work" | "ojt"
// ---------------------------------------------------------------------------
export const timeline = [
  {
    id: "bsit",
    type: "education",
    year: "2021 – Present",
    title: "Bachelor of Science in Information Technology",
    org: "National University – Dasmariñas",
    // CONFIRM: Add graduation year/semester
    detail:
      "4th-year student, graduating [CONFIRM YEAR]. Coursework includes software engineering, " +
      "systems analysis, database management, and web development.",
  },
  {
    id: "ojt",
    type: "ojt",
    // CONFIRM: Confirm the target internship month and year
    year: "[CONFIRM MONTH YEAR]",
    title: "Seeking 400-Hour Internship / OJT",
    org: "Open to opportunities",
    detail:
      "Targeting roles in Business Analysis / Project Management, with secondary interest " +
      "in Front-End Development, UI/UX Design, and QA Testing.",
  },
];

// ---------------------------------------------------------------------------
// CERTIFICATIONS
// ---------------------------------------------------------------------------
export const certifications = [
  {
    id: "cert-html",
    name: "Certiport — HTML",
    issuer: "Certiport",
    // CONFIRM: Add the certification date (e.g. "March 2024")
    date: "[CONFIRM DATE]",
    // CONFIRM: Add credential URL if available
    url: "[CONFIRM CREDENTIAL URL]",
  },
  {
    id: "cert-css",
    name: "Certiport — CSS",
    issuer: "Certiport",
    // CONFIRM: Add the certification date
    date: "[CONFIRM DATE]",
    // CONFIRM: Add credential URL if available
    url: "[CONFIRM CREDENTIAL URL]",
  },
  {
    id: "cert-db",
    name: "Certiport — Databases",
    issuer: "Certiport",
    // CONFIRM: Add the certification date
    date: "[CONFIRM DATE]",
    // CONFIRM: Add credential URL if available
    url: "[CONFIRM CREDENTIAL URL]",
  },
];

// ---------------------------------------------------------------------------
// ABOUT PARAGRAPH
// Keep under ~70 characters per line for readability in the editor.
// ---------------------------------------------------------------------------
export const about = [
  "I'm a 4th-year BSIT student at National University – Dasmariñas, " +
    "graduating [CONFIRM YEAR], with hands-on experience leading " +
    "academic software projects from requirements gathering to deployment.",
  "My primary focus is Business Analysis and Project Coordination — " +
    "I enjoy translating user needs into clear requirements, keeping " +
    "teams aligned, and making sure nothing falls through the cracks.",
  "I also contribute on the frontend and have a keen interest in " +
    "interface design and quality assurance, so I bring a cross-functional " +
    "perspective to every project I join.",
  "Currently seeking a 400-hour OJT / internship where I can " +
    "apply these skills in a real-world environment.",
];
