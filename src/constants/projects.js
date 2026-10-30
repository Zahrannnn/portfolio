// Portfolio projects (Works section)
export const projects = [
  {
    id: 1,
    name: "Wasla CRM Platform",
    description:
      "Full-featured multi-tenant CRM built as a graduation project. Features role-based access, VAPI voice AI agent, Microsoft SignalR real-time notifications, Gemini AI chatbot, appointment scheduling, task management, and Paymob payment integration across four languages.",
    href: "https://wasla-crm.vercel.app/en/login",
    image: "/assets/projects/wasla.webp",
    frameworks: [
      { id: 1, name: "Next.js 15" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Redux" },
      { id: 4, name: "TanStack Query" },
      { id: 5, name: "SignalR" },
      { id: 6, name: "Gemini AI" },
      { id: 7, name: "VAPI" },
      { id: 8, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "Nabdh — Healthcare Marketplace",
    description:
      "Real-time home nursing marketplace for Egypt. NestJS modular monolith, MongoDB geospatial queries, 18-state booking machine, outbox events, SOS dispatch, scheduled visits, and Egyptian payment integrations.",
    href: "https://github.com/Zahrannnn/nabdh-backend",
    image: "",
    frameworks: [
      { id: 1, name: "NestJS" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Outbox pattern" },
    ],
  },
  {
    id: 3,
    name: "Medical System — Gov Healthcare Insurance Portal",
    description:
      "Live government healthcare insurance portal with citizen, doctor, and admin portals. Built the admin verification workflow across 4 phases, the doctor clinical workspace, and the citizen application experience with a 2-developer team (40 of 59 commits).",
    href: "https://medical-system-gov.vercel.app",
    image: "",
    frameworks: [
      { id: 1, name: "TypeScript" },
      { id: 2, name: "React" },
      { id: 3, name: "Collaborator" },
    ],
  },
  {
    id: 4,
    name: "CyrusLearn – Interactive Learning Platform",
    description:
      "Feature-driven e-learning platform with 3D interactive labs, structured learning paths, quiz engine, collaborative rooms, Google OAuth, subscription/payment flow, and an admin dashboard for content management.",
    href: "https://stagging-cylearn.vercel.app/",
    image: "/assets/projects/cyrus.webp",
    frameworks: [
      { id: 1, name: "React 19" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Redux Toolkit" },
      { id: 4, name: "React Three Fiber" },
      { id: 5, name: "TanStack Query" },
      { id: 6, name: "Shadcn UI" },
      { id: 7, name: "Tailwind CSS" },
    ],
  },
  {
    id: 5,
    name: "Tailgating Detection System",
    description:
      "Real-time surveillance dashboard shipped at RICOH Europe: live MJPEG channel streaming, license-plate OCR workflows, anomaly and history views, role-based access, and audit trails, wired across three OpenAPI-documented REST APIs.",
    href: "https://github.com/Zahrannnn/tailgating-frontend",
    image: "/assets/projects/tailgating.webp",
    frameworks: [
      { id: 1, name: "React 18" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Redux Toolkit" },
      { id: 4, name: "TanStack Query" },
      { id: 5, name: "Shadcn UI" },
      { id: 6, name: "Tailwind CSS" },
    ],
  },
  {
    id: 6,
    name: "RICOH Europe — 3D Building Viewer",
    description:
      "Shipped at RICOH Europe (formerly Corelia). Multi-mode 3D space viewer (Dollhouse, Panorama, Split) for building capture datasets, with room-aware navigation, panorama markers, and progressive loading.",
    href: "https://www.ricoh-europe.com",
    image: "/assets/projects/3d-modelling.webp",
    frameworks: [
      { id: 1, name: "React 19" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "React Three Fiber" },
      { id: 4, name: "Three.js" },
      { id: 5, name: "GSAP" },
      { id: 6, name: "Framer Motion" },
      { id: 7, name: "Tailwind CSS" },
    ],
  },
  {
    id: 21,
    name: "MAC-Egypt — UNIDO/NOU/EED M&E Platform",
    description:
      "Production monitoring & evaluation platform for a UNIDO / NOU / EED Egypt programme, digitizing the full lifecycle of the mobile air-conditioning servicing sector: workshop identification, surveys, validation and selection, training, equipment handover, and reports. Arabic-first RTL / English Next.js 16 + React 19 client over an ASP.NET Core 8 API, with 409 passing frontend tests.",
    href: "https://rac-egypt.mzahran.tech",
    image: "",
    frameworks: [
      { id: 1, name: "Next.js 16" },
      { id: 2, name: "React 19" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Tailwind CSS v4" },
      { id: 5, name: "shadcn/ui" },
      { id: 6, name: "ASP.NET Core 8" },
      { id: 7, name: "Arabic RTL" },
    ],
  },
  {
    id: 7,
    name: "OZ Storefront",
    description:
      "Arabic RTL e-commerce storefront with a Soft Brutalism Next.js interface.",
    href: "https://oz-storefront.vercel.app",
    image: "",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "RTL" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 8,
    name: "AI Job Searcher",
    description:
      "Agent pipeline that scrapes job boards, scores fit, and generates tailored LaTeX resumes and cover letters, with a dashboard for one-click PDF export.",
    href: "https://github.com/Zahrannnn/ai-job-searcher",
    image: "",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "Claude Code" },
      { id: 3, name: "LaTeX" },
    ],
  },
  {
    id: 9,
    name: "NedSwiss CRM Dashboard",
    description:
      "Multilingual admin/staff CRM dashboard with rich data tables, chart analytics, rich-text editing, TanStack Query mutations, and real-time data sync across Arabic and English locales.",
    href: "https://stage-nedswiss.vercel.app/",
    image: "/assets/projects/nedx.webp",
    frameworks: [
      { id: 1, name: "Next.js 15" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "TanStack Query" },
      { id: 4, name: "TanStack Table" },
      { id: 5, name: "Recharts" },
      { id: 6, name: "next-intl" },
      { id: 7, name: "Tailwind CSS" },
    ],
  },
  {
    id: 10,
    name: "NedSwiss Marketing Website",
    description:
      "High-performance multilingual marketing website with advanced scroll animations, GSAP/Lenis-powered micro-interactions, lead capture form with Zod validation, and i18n routing.",
    href: "https://ned-swiss.ch/",
    image: "/assets/projects/nedswiss.webp",
    frameworks: [
      { id: 1, name: "Next.js 15" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "GSAP" },
      { id: 4, name: "Framer Motion" },
      { id: 5, name: "Lenis" },
      { id: 6, name: "next-intl" },
      { id: 7, name: "Tailwind CSS" },
    ],
  },
  {
    id: 11,
    name: "AGL Invoice Management — SharePoint → AS400 Pipeline",
    description:
      "Invoice-processing pipeline shipped at RICOH Europe: scanned invoices pulled from SharePoint, OCR extraction of fields and line items, a side-by-side document-vs-data verification UI, then validated auto-submission to the enterprise AS400 API.",
    href: "https://github.com/Zahrannnn",
    image: "/assets/projects/agl-invoice.webp",
    frameworks: [
      { id: 1, name: "React 19" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Redux Toolkit" },
      { id: 4, name: "TanStack Query" },
      { id: 5, name: "Framer Motion" },
      { id: 6, name: "Tailwind CSS" },
    ],
  },
  {
    id: 12,
    name: "Qalam Vision – NLP Keyword Extraction",
    description:
      "Frontend interface for Arabic/multilingual NLP keyword extraction and annotation, integrating Label Studio for data labeling workflows with file upload, YAML/markdown output, and exportable annotated datasets.",
    href: "https://github.com/Zahrannnn",
    image: "/assets/projects/qalam.webp",
    frameworks: [
      { id: 1, name: "React 19" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "TanStack Query" },
      { id: 4, name: "Shadcn UI" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 13,
    name: "Wasla Feedback Moderation API",
    description:
      "AI microservice for multilingual toxicity and hate-speech detection using dual-model architecture (DistilBERT + DeHateBERT for Arabic) with an optional Mistral-7B LLM verification layer for grey-zone predictions.",
    href: "https://mohameddda-moderator-api.hf.space/docs",
    image: "",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "FastAPI" },
      { id: 3, name: "HuggingFace Transformers" },
      { id: 4, name: "Docker" },
    ],
  },
  {
    id: 14,
    name: "Wasla CRM – Backend API",
    description:
      "Clean 3-layer .NET 8 backend (API/CORE/EF) with multi-tenant JWT auth, SignalR real-time notifications, Hangfire background jobs, Stripe webhooks, QuestPDF offer generation, and 15 REST controllers.",
    href: "http://waslacrm.runasp.net/",
    image: "",
    frameworks: [
      { id: 1, name: "ASP.NET Core 8" },
      { id: 2, name: "Entity Framework Core" },
      { id: 3, name: "SignalR" },
      { id: 4, name: "Hangfire" },
      { id: 5, name: "Stripe" },
      { id: 6, name: "SQL Server" },
    ],
  },
  {
    id: 15,
    name: "AI-Powered Translation Platform",
    description:
      "Multilingual translation platform (Arabic, English, French) with Paymob payment gateway, credit system with daily quota, admin dashboard for transaction monitoring, and blog management module.",
    href: "https://github.com/Zahrannnn",
    image: "/assets/projects/translaxable.webp",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "next-intl" },
      { id: 4, name: "Paymob" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 16,
    name: "ARME Egypt",
    description: "Client marketing site for ARME Egypt.",
    href: "https://www.armegypt.com/",
    image: "",
    frameworks: [
      { id: 1, name: "Frontend" },
      { id: 2, name: "Client work" },
    ],
  },
  {
    id: 17,
    name: "Standby Egypt",
    description: "Client website for Standby Egypt.",
    href: "https://standby-eg.com/",
    image: "",
    frameworks: [
      { id: 1, name: "Frontend" },
      { id: 2, name: "Client work" },
    ],
  },
  {
    id: 18,
    name: "Best Valet",
    description: "Client valet service web experience.",
    href: "https://best-valet.vercel.app/",
    image: "",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Client work" },
    ],
  },
  {
    id: 19,
    name: "Planit Software",
    description: "Client product site for Planit Software.",
    href: "https://planit-software.vercel.app/",
    image: "",
    frameworks: [
      { id: 1, name: "Frontend" },
      { id: 2, name: "Client work" },
    ],
  },
  {
    id: 20,
    name: "Notecker",
    description: "Client web app for Notecker.",
    href: "https://notecker.vercel.app/",
    image: "",
    frameworks: [
      { id: 1, name: "Frontend" },
      { id: 2, name: "Client work" },
    ],
  },
  {
    id: 22,
    name: "agentic-shop — Agentic AI Shopping System",
    description:
      "Multi-agent shopping pipeline (LangGraph) that turns a one-sentence goal into ranked products, a conversational answer, and a validated UI plan rendered client-side over SSE streaming. Deterministic product scorer with Pydantic v2 contracts and 504 passing tests in offline mock mode.",
    href: "https://github.com/Zahrannnn/agentic-shop",
    image: "",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "FastAPI" },
      { id: 3, name: "LangGraph" },
      { id: 4, name: "Pydantic v2" },
      { id: 5, name: "SSE" },
    ],
  },
  {
    id: 23,
    name: "Meapal LogBook — RICOH/Corelia Activity Platform",
    description:
      "Daily activity log for RICOH/Corelia teams: calendar-driven pay-period tracking with pace markers, work streaks that honor Fri/Sat rest days, and three role surfaces (employee, project manager, admin). Optimistic-everything UX with undo windows, crash recovery, and per-browser draft resumption.",
    href: "https://github.com/Zahrannnn/meapal-logbook",
    image: "",
    frameworks: [
      { id: 1, name: "React 19" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "TanStack Query" },
      { id: 4, name: "Zod 4" },
      { id: 5, name: "Tailwind CSS v4" },
    ],
  },
  {
    id: 24,
    name: "Gym Management API",
    description:
      "Single-tenant gym subscription API with cryptographic QR check-in: atomic session deduction under concurrency (SQL applocks + conditional updates), time-based and per-sale credit subscriptions, RFC 7807 errors, and an xUnit test suite.",
    href: "https://github.com/Zahrannnn/Gym-Management",
    image: "",
    frameworks: [
      { id: 1, name: "ASP.NET Core 8" },
      { id: 2, name: "EF Core" },
      { id: 3, name: "SQL Server" },
      { id: 4, name: "xUnit" },
    ],
  },
];
