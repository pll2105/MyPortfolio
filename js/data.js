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
  name: "PIA ELLEINE LUCERO",

  title: "BSIT Student · Aspiring Business Analyst",

  // Hero paragraph — shown below h1
  heroParagraph:
    "I'm Pia Elleine Lucero, a 4th-year BSIT student at National University – " +
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
  email: "piaelleinelucero2105@gmail.com",

  // [CONFIRM] Replace with your LinkedIn URL
  linkedin: "https://www.linkedin.com/in/pia-elleine-lucero-08960844a",

  // [CONFIRM] Replace with your GitHub URL
  github: "https://github.com/pll2105",

  resume: "resume.html",

  // CONFIRM: graduation year
  gradYear: "2027",

  school: "National University – Dasmariñas",
  degree: "Bachelor of Science in Information Technology - Specialized in Mobile and Web Application",

  // OJT target — CONFIRM month/year
  ojtTarget: "This month of November 2026",
};

// ---------------------------------------------------------------------------
// NAV LINKS
// ---------------------------------------------------------------------------
export const navLinks = [
  { label: "What I Do",       href: "#what-i-do"     },
  { label: "Certifications",  href: "#certifications" },
  { label: "Projects",        href: "#my-projects"    },
  { label: "Contact",         href: "#contact"        },
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
    date: "6/8/2026",
    // CONFIRM: credential URL if available
    url: "[CONFIRM URL]",
  },
  {
    name: "Certiport — CSS",
    issuer: "Certiport",
    // CONFIRM: certification date
    date: "6/8/2026",
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
      "Researching the problem, gathering requirements, anf turning" +
      "them into clear documentation for developers and stakeholders." +
      "I make sure every feature built traces back to real user need.",
    roleKey: "ba",
    tags: ["Research", "Documentation", "Requirements"],
    projects: [],
  },
  {
    number: "02",
    title: "Project coordination",
    description:
      "Coordinating tasks, timelines, and team communication to keep work on schedule and aligned with project goals. " +
      "Tracking progress and addressing blockers early to support smooth delivery. ", 
    roleKey: "ba",
    tags: ["Task tracking", "Team coordination", "Jira (basic)"],
    projects: [],
  },
  {
    number: "03",
    title: "Front-end development",
    description:
      "Developing responsive, accessible user interfaces using HTML, CSS, JavaScript, React, and Tailwind CSS. " +
      "Focused on clean, maintainable code and consistent performance across devices.",
    roleKey: "fe",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    projects: [],
  },
  {
    number: "04",
    title: "UI/UX design",
    description:
      "Designing user flows, wireframes, and interface layouts in Figma" +
      "to translate requirements into clear, usable experiences. Applying consistent " +
      "design principles to improve usability and reduce friction.",
    roleKey: "ux",
    tags: ["Figma", "Canva", "User flows"],
    projects: [],
  },
  {
    number: "05",
    title: "QA and testing",
    description:
      "Testing features against defined requirements to verify expected behavior and identify defects before release." +
      "Documenting issues with clear reproduction steps to support efficient resolution. ",
    roleKey: "qa",
    tags: ["Testing", "Validation", "Bug reporting"],
    projects: [],
  },
];

// ---------------------------------------------------------------------------
// CONTACT SECTION
// Edit all values here. Keep [CONFIRM] markers until you replace them.
// ---------------------------------------------------------------------------
export const contact = {
  heading:    "Let's talk.",
  intro:      "Have a project, an internship opening, or a question about my work? Send me a message. I'd love to hear what you're building.",
  email:      "piaelleinelucero2105@gmail.com",
  // [CONFIRM] Existing portfolio profile URLs; verify before publishing.
  github:     "https://github.com/pll2105",
  linkedin:   "https://www.linkedin.com/in/pia-elleine-lucero-08960844a",
  resume:     "resume.html",
  resumeLabel:"Resume",
  status:     "--open-to-work",
  roles: [
    { label: "Business Analyst",    tag: "1st choice", featured: true  },
    { label: "Project Manager",     tag: "2nd choice", featured: true  },
    { label: "Front-End Developer",                    featured: false },
    { label: "UI/UX Designer",                         featured: false },
    { label: "QA Tester",                              featured: false },
  ],
};

// ---------------------------------------------------------------------------
// RESUME PAGE
// Keep resume content here so the page renderer only handles presentation.
// ---------------------------------------------------------------------------
export const resume = {
  eyebrow: "RESUME",
  headline: "Coordination, code, and research in ",
  highlight: "one record.",
  intro: "A concise view of my academic projects, skills, and the roles I’m aiming for.",
  name: "Pia Elleine L. Lucero",
  affiliation: "BS Information Technology student · National University Dasmariñas · Dasmariñas, Cavite",
  phoneNotice: "Phone number available on request",
  summary:
    "Fourth-year BSIT student with academic project experience in web and mobile development, " +
    "UI/UX, software testing, requirements-related research, and project coordination. Seeking a " +
    "400-hour OJT where technical skills, analytical thinking, and collaboration can support a " +
    "software or IT team.",
  education: [
    {
      title: "National University | Dasmariñas, Cavite",
      detail: "Bachelor of Science in Information Technology (BSIT), 4th year",
      status: "Expected 2027",
    },
    {
      title: "Cavite Science Integrated School | Maragondon, Cavite",
      detail: "Senior High School, STEM (Regional Science High School)",
      status: "2023",
    },
    {
      title: "King’s Way Christian Academe | Naic, Cavite",
      detail: "Junior High School",
      status: "2021",
    },
  ],
  projects: [
    {
      title: "ALWAN, Online Lending Application",
      tag: "Capstone",
      status: "Deployed",
      stack: "React, Tailwind CSS, Supabase",
      bullets: [
        "Led the project team: assigned tasks, coordinated development, conducted research, and maintained documentation.",
        "Coordinated with developers and project stakeholders while contributing to the frontend.",
      ],
    },
    {
      title: "NOOK PH, Rental Management Application",
      status: "Academic · Not deployed",
      bullets: [
        "Coordinated a five-member team: organized tasks, followed up on progress, and aligned contributions with project requirements.",
        "Contributed to research, documentation, and frontend work.",
      ],
    },
    {
      title: "Kya Ko Yarn, E-commerce Website",
      status: "Academic · Deployed on Vercel",
      bullets: [
        "Led a six-member team through task distribution, research, documentation, and coordination with stakeholders.",
        "Contributed to frontend development and helped complete the project.",
      ],
    },
    {
      title: "LakbAI / TsuperTech, Jeepney QR Fare and Location Concept",
      status: "Academic · Concept",
      bullets: [
        "Worked on a proposed QR-based jeepney fare and location solution, using React/Expo and Firebase.",
        "Contributed to early planning of user-facing and operational workflows.",
      ],
    },
  ],
  skills: [
    {
      label: "Project coordination",
      items: "task assignment, team coordination, progress follow-up, research, documentation",
    },
    {
      label: "Business/system analysis",
      items: "requirements-related research, understanding project needs, stakeholder communication",
    },
    { label: "Web", items: "HTML, CSS, Tailwind CSS, React, Flutter, Bootstrap" },
    { label: "Mobile", items: "Flutter, React Native, Expo" },
    { label: "Backend", items: "Java, Supabase, MySQL, Oracle Database" },
    { label: "Design", items: "Figma, UI/UX fundamentals, Canva" },
    {
      label: "Tools",
      items: "Google Docs, Sheets, and Drive, Microsoft Excel, Jira (basic familiarity), Git, GitHub, Visual Studio Code, Android Studio",
    },
    { label: "Other", items: "AI-assisted frontend development; basic AI concepts" },
  ],
  organizations: [
    {
      title: "Graphic Designer | Computer Society",
      detail: "Designed publication materials (pubmats) for organization events and announcements.",
    },
  ],
  certifications: [
    { title: "Certiport Certification | HTML and CSS", status: "Jun 2026" },
    { title: "Certiport Certification | Databases", status: "Sep 2025" },
  ],
  additional: [
    {
      label: "Availability",
      detail: "required 400-hour OJT; schedule and start date to be coordinated with the employer",
    },
    { label: "Languages", detail: "Filipino, English" },
    {
      label: "Soft skills",
      detail: "Leadership, teamwork, communication, time management, adaptability, attention to detail",
    },
  ],
};
