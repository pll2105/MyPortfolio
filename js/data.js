/**
 * data.js — Single source of truth for all portfolio content.
 * Edit this file to update the site. Never hardcode content in HTML or JS.
 * Search for // CONFIRM or // ADD DETAIL to find every placeholder.
 */

// ---------------------------------------------------------------------------
// META
// ---------------------------------------------------------------------------
export const meta = {
  // CONFIRM: Replace with your full name
  name: "YOUR FULL NAME",

  title: "BSIT Student · Aspiring Business Analyst",

  // Hero paragraph — shown below h1
  heroParagraph:
    "I'm YOUR FULL NAME, a 4th-year BSIT student at National University – " +
    "Dasmariñas, looking for a 400-hour internship in business analysis, " +
    "project coordination, front-end, UI/UX, or QA.",

  // Hero subtitle — updated by Role Lens
  heroSubtitles: {
    ba: "Currently viewing highlights for Business Analysis & PM roles.",
    fe: "Currently viewing highlights for Front-End Developer roles.",
    ux: "Currently viewing highlights for UI/UX Designer roles.",
    qa: "Currently viewing highlights for QA Tester roles.",
  },

  // CONFIRM: Replace with your email
  email: "your@email.com",

  // CONFIRM: Replace with your phone (optional — delete if not wanted)
  phone: "[CONFIRM PHONE]",

  // CONFIRM: Replace with your LinkedIn URL
  linkedin: "https://linkedin.com/in/your-handle",

  // CONFIRM: Replace with your GitHub URL
  github: "https://github.com/your-handle",

  // Resume PDF — place at assets/resume.pdf
  resume: "assets/resume.pdf",

  // CONFIRM: graduation year
  gradYear: "[CONFIRM YEAR]",

  school: "National University – Dasmariñas",
  degree: "Bachelor of Science in Information Technology",

  // OJT target — CONFIRM month/year
  ojtTarget: "[CONFIRM MONTH YEAR]",
};

// ---------------------------------------------------------------------------
// NAV LINKS
// ---------------------------------------------------------------------------
export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

// ---------------------------------------------------------------------------
// STATS ROW  (use only verified facts — no invented numbers)
// ---------------------------------------------------------------------------
export const stats = [
  { number: "3",    label: "academic projects"      },
  { number: "3",    label: "Certiport certificates" },
  { number: "4",    label: "role paths"             },
  { number: "400",  label: "hr internship goal"     },
];

// ---------------------------------------------------------------------------
// PROJECTS
// gradient: "blue" | "orange" | "green" | "purple"
// category: used by filter chips
// roleBullets: 2 bullets per lens key (ba | fe | ux | qa)
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: "alwan",
    title: "ALWAN",
    summary: "Online Lending Application",
    category: "mobile",
    gradient: "blue",
    year: "2024",
    teamSize: 3,
    myRole: "Project Lead",
    stack: ["Flutter", "Laravel", "Supabase"],
    // CONFIRM: live demo URL
    demoUrl: "[CONFIRM LIVE DEMO URL]",
    // CONFIRM: GitHub repo URL
    sourceUrl: "[CONFIRM GITHUB URL]",

    caseStudy: {
      problem:
        "Users needed a streamlined digital channel for loan applications and " +
        "approvals, replacing a manual paper-based process. [ADD DETAIL]",
      myRoleDetail:
        "Served as Project Lead for a team of 3. Responsible for task assignment, " +
        "research and documentation, stakeholder coordination, and frontend contribution.",
      whatIDid: [
        "Defined project scope and assigned development tasks across the team.",
        "Conducted stakeholder interviews and produced requirements documentation.",
        "Coordinated between frontend and backend developers throughout development.",
        "Contributed to Flutter UI screens for the loan application flow.",
        // ADD DETAIL: add more specifics once available
      ],
    },

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
    summary: "Rental Management System",
    category: "web",
    gradient: "orange",
    year: "2024",
    teamSize: 5,
    myRole: "Team Member",
    // CONFIRM: confirm the actual stack
    stack: ["[CONFIRM]"],
    // CONFIRM: live demo URL
    demoUrl: "[CONFIRM LIVE DEMO URL]",
    // CONFIRM: GitHub repo URL
    sourceUrl: "[CONFIRM GITHUB URL]",

    caseStudy: {
      problem:
        "Property managers needed a centralized system to handle rental listings, " +
        "tenant records, and payment tracking. [ADD DETAIL]",
      myRoleDetail:
        "Team member in a group of 5. Focused on team coordination, research and " +
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
    summary: "Web Application — deployed on Vercel",
    category: "web",
    gradient: "green",
    year: "2024",
    teamSize: 6,
    myRole: "Team Member",
    deployedOn: "Vercel",
    // CONFIRM: confirm the actual stack
    stack: ["[CONFIRM]", "Vercel"],
    // CONFIRM: live Vercel URL
    demoUrl: "[CONFIRM VERCEL URL]",
    // CONFIRM: GitHub repo URL
    sourceUrl: "[CONFIRM GITHUB URL]",

    caseStudy: {
      problem:
        "Yarn enthusiasts lacked a dedicated platform to browse, track, and share " +
        "yarn projects and stash inventory. [ADD DETAIL]",
      myRoleDetail:
        "Team member in a group of 6. Handled task distribution, research and " +
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
// PROJECT FILTER CHIPS
// ---------------------------------------------------------------------------
export const projectFilters = [
  { key: "all",    label: "All" },
  { key: "web",    label: "Web" },
  { key: "mobile", label: "Mobile" },
];

// ---------------------------------------------------------------------------
// SKILLS
// category: ba | fe | ux | qa | other
// level: "Basic" | "Working" | "Comfortable"
// ---------------------------------------------------------------------------
export const skills = [
  // Front-End
  { name: "HTML",             category: "fe",    level: "Working"     },
  { name: "CSS",              category: "fe",    level: "Working"     },
  { name: "JavaScript",       category: "fe",    level: "Working"     },
  { name: "React",            category: "fe",    level: "Working"     },
  { name: "Tailwind CSS",     category: "fe",    level: "Working"     },

  // Business Analyst / PM
  { name: "Requirements & Research", category: "ba", level: "Working" },
  { name: "Documentation",    category: "ba",    level: "Working"     },
  { name: "Task Tracking",    category: "ba",    level: "Working"     },
  { name: "Stakeholder Coordination", category: "ba", level: "Working"},
  // CONFIRM: Jira level
  { name: "Jira",             category: "ba",    level: "Basic"       },

  // UI/UX
  { name: "Figma",            category: "ux",    level: "Working"     },
  { name: "Wireframing",      category: "ux",    level: "Working"     },
  { name: "User Flows",       category: "ux",    level: "Working"     },

  // QA
  { name: "Testing & Validation", category: "qa", level: "Working"   },
  { name: "Bug Reporting",    category: "qa",    level: "Working"     },
  // CONFIRM: Postman level
  { name: "Postman",          category: "qa",    level: "Working"     },

  // Other
  { name: "Java",             category: "other", level: "Working"     },
  { name: "Supabase",         category: "other", level: "Working"     },
  { name: "GitHub",           category: "other", level: "Working"     },
  { name: "Google Workspace", category: "other", level: "Working"     },
  { name: "Microsoft Excel",  category: "other", level: "Working"     },
  { name: "AI-Assisted Development", category: "other", level: "Working"},
];

// ---------------------------------------------------------------------------
// SKILL CARDS (displayed in the Skills section — 4 role cards)
// ---------------------------------------------------------------------------
export const skillCards = [
  {
    key: "ba",
    title: "Business Analysis & PM",
    icon: "📋",
    description: "Requirements gathering, documentation, task tracking, and stakeholder coordination.",
    skills: ["Requirements & Research", "Documentation", "Task Tracking", "Stakeholder Coordination", "Jira"],
  },
  {
    key: "fe",
    title: "Front-End",
    icon: "💻",
    description: "Building clean, responsive interfaces with modern web technologies.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    key: "ux",
    title: "UI/UX",
    icon: "🎨",
    description: "Wireframing, user flows, and interface design using Figma.",
    skills: ["Figma", "Wireframing", "User Flows"],
  },
  {
    key: "qa",
    title: "QA & Testing",
    icon: "🧪",
    description: "Testing, validation, bug reporting, and API testing.",
    skills: ["Testing & Validation", "Bug Reporting", "Postman"],
  },
];

// ---------------------------------------------------------------------------
// CERTIFICATIONS
// ---------------------------------------------------------------------------
export const certifications = [
  {
    name: "Certiport — HTML",
    issuer: "Certiport",
    // CONFIRM: certification date
    date: "[CONFIRM DATE]",
    // CONFIRM: credential URL if available
    url: "[CONFIRM URL]",
  },
  {
    name: "Certiport — CSS",
    issuer: "Certiport",
    // CONFIRM: certification date
    date: "[CONFIRM DATE]",
    // CONFIRM: credential URL if available
    url: "[CONFIRM URL]",
  },
  {
    name: "Certiport — Databases",
    issuer: "Certiport",
    // CONFIRM: certification date
    date: "[CONFIRM DATE]",
    // CONFIRM: credential URL if available
    url: "[CONFIRM URL]",
  },
];

// ---------------------------------------------------------------------------
// ROLE LENS CONFIG
// ---------------------------------------------------------------------------
export const roleLens = [
  {
    key: "ba",
    label: "Business Analyst/PM",
    shortLabel: "BA/PM",
    // Skill cards to highlight (put at top) when this lens is active
    priorityCards: ["ba", "other"],
  },
  {
    key: "fe",
    label: "Front-End",
    shortLabel: "Front-End",
    priorityCards: ["fe", "other"],
  },
  {
    key: "ux",
    label: "UI/UX",
    shortLabel: "UI/UX",
    priorityCards: ["ux", "fe", "other"],
  },
  {
    key: "qa",
    label: "QA",
    shortLabel: "QA",
    priorityCards: ["qa", "other"],
  },
];

// ---------------------------------------------------------------------------
// TECH LOGOS ROW  ("I'm good at this")
// img: URL to official logo (CDN — no local files needed)
// url: official site — opens in new tab on click
// name: shown as tooltip on hover
// ---------------------------------------------------------------------------
export const techLogos = [
  {
    name: "HTML5",
    url:  "https://developer.mozilla.org/en-US/docs/Web/HTML",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    url:  "https://developer.mozilla.org/en-US/docs/Web/CSS",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    url:  "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    url:  "https://react.dev",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Tailwind CSS",
    url:  "https://tailwindcss.com",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Java",
    url:  "https://www.java.com",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Flutter",
    url:  "https://flutter.dev",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "Supabase",
    url:  "https://supabase.com",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },
  {
    name: "Figma",
    url:  "https://figma.com",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "GitHub",
    url:  "https://github.com",
    img:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
];

// ---------------------------------------------------------------------------
// TERMINAL LINES (typing animation)
// type: "prompt" | "output" | "output-name" | "output-accent" | "blinking"
// ---------------------------------------------------------------------------
export const terminalLines = [
  { text: "$ whoami",                      type: "prompt"       },
  { text: "YOUR FULL NAME, BSIT student",  type: "output-name"  },
  { text: "$ ls projects/",                type: "prompt"       },
  { text: "ALWAN  NOOK-PH  Kya-Ko-Yarn",   type: "output-accent"},
  { text: "$ status",                      type: "prompt"       },
  { text: "open to internship (400 hrs)",  type: "blinking"     },
];

// ---------------------------------------------------------------------------
// FOCUS AREAS — "What I Do" scroll-timeline section
// roleKey matches existing roleLens keys: "ba" | "fe" | "ux" | "qa"
// projects: IDs that match the projects array — "alwan" | "nookph" | "kyakoyarn"
// Keep every [CONFIRM] marker until replaced.
// ---------------------------------------------------------------------------
export const focusAreas = [
  {
    number: "01",
    title: "Business analysis",
    description:
      "Researching the problem, gathering requirements, and turning them " +
      "into clear documentation for developers and stakeholders.",
    roleKey: "ba",
    tags: ["Research", "Documentation", "Requirements"],
    projects: ["alwan", "nookph", "kyakoyarn"],
  },
  {
    number: "02",
    title: "Project coordination",
    description:
      "Assigning tasks, tracking progress, and keeping the team aligned. " +
      "I led a team of 3 on ALWAN and distributed tasks in a team of 6 on Kya Ko Yarn.",
    roleKey: "ba",
    tags: ["Task tracking", "Team coordination", "Jira (basic)"],
    projects: ["alwan", "kyakoyarn", "nookph"],
  },
  {
    number: "03",
    title: "Front-end development",
    description:
      "Building responsive interfaces with HTML, CSS, JavaScript, React, " +
      "and Tailwind CSS. I deployed Kya Ko Yarn on Vercel.",
    roleKey: "fe",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Certiport HTML and CSS"],
    projects: ["alwan", "nookph", "kyakoyarn"],
  },
  {
    number: "04",
    title: "UI/UX design",
    // CONFIRM: which projects and what I designed
    description:
      "Planning screens and user flows in Figma before building them. " +
      "[CONFIRM which projects and what I designed]",
    roleKey: "ux",
    // CONFIRM: add confirmed wireframe tools/deliverables
    tags: ["Figma", "Wireframes [CONFIRM]", "User flows"],
    projects: [],
  },
  {
    number: "05",
    title: "QA and testing",
    // CONFIRM: what testing I actually did
    description:
      "Checking that features work as expected, validating requirements, " +
      "and reporting bugs. [CONFIRM what testing I actually did]",
    roleKey: "qa",
    // CONFIRM: confirm Postman usage
    tags: ["Testing", "Validation", "Bug reporting", "Postman [CONFIRM]"],
    projects: [],
  },
];
