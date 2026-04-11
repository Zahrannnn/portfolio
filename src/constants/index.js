// index.js
export const servicesData = [
  {
    title: "Frontend Development",
    description:
      "Your digital presence deserves cutting-edge performance and stunning design. I build lightning-fast Next.js applications with server-side rendering, optimized performance, and pixel-perfect responsive interfaces that convert visitors into customers.",
    items: [
      {
        title: "Next.js Excellence",
        description: "(App Router, SSR/SSG, API Routes, Server Components)",
      },
      {
        title: "React Mastery",
        description: "(TypeScript, Custom Hooks, State Management, Performance)",
      },
      {
        title: "Performance Optimization",
        description: "(Core Web Vitals, Image Optimization, Bundle Analysis)",
      },
    ],
  },
  {
    title: "UI/UX Design & Development",
    description:
      "Beautiful interfaces that actually work. I transform complex user journeys into intuitive experiences, combining modern design principles with accessibility standards to create interfaces that users love and businesses profit from.",
    items: [
      {
        title: "Design Systems",
        description: "(Component Libraries, Figma to Code, Brand Consistency)",
      },
      {
        title: "User Experience",
        description: "(Wireframing, Prototyping, User Testing, Conversion Optimization)",
      },
      {
        title: "Responsive Design",
        description: "(Mobile-First, Cross-Browser, Accessibility Compliance)",
      },
    ],
  },
  {
    title: "Modern Web Architecture",
    description:
      "Scalable frontend architectures that grow with your business. I implement cutting-edge patterns like server components, micro-frontends, and JAMstack to deliver blazing-fast user experiences with maintainable codebases.",
    items: [
      {
        title: "Server Components",
        description: "(React Server Components, Streaming, Data Fetching)",
      },
      {
        title: "State Management",
        description: "(Zustand, Redux Toolkit, React Query, Context API)",
      },
      {
        title: "Build Optimization",
        description: "(Webpack, Vite, Code Splitting, Tree Shaking)",
      },
    ],
  },
  {
    title: "Interactive Experiences",
    description:
      "Bring your brand to life with immersive web experiences. From smooth animations to 3D visualizations, I create engaging interfaces that captivate users and make your product unforgettable with slick animations using GSAP and Framer Motion.",
    items: [
      {
        title: "Animation Libraries",
        description: "(GSAP, Framer Motion, React Spring, CSS Animations)",
      },
      {
        title: "3D Web Graphics",
        description: "(Three.js, React Three Fiber, WebGL, 3D Models)",
      },
      {
        title: "Micro-Interactions",
        description: "(Hover Effects, Loading States, Transition Design)",
      },
    ],
  },
];
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
    id: 3,
    name: "Tailgating Detection System",
    description:
      "Production frontend for real-time tailgating anomaly detection with live MJPEG video streaming, license plate OCR, MOT API integration, role-based access control, and a historical incident dashboard.",
    href: "",
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
    id: 4,
    name: "CORELIA 3D Building Viewer",
    description:
      "Multi-mode 3D space viewer (Dollhouse, Panorama, Split) for exploring building capture datasets. Features room-aware navigation, panorama markers, progressive loading, and data-driven scene setup from JSON transform metadata.",
    href: "",
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
    id: 5,
    name: "NedSwiss CRM Dashboard",
    description:
      "Multilingual admin/staff CRM dashboard with rich data tables, chart analytics, rich-text editing, TanStack Query mutations, and real-time data sync across Arabic and English locales.",
    href: "",
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
    id: 6,
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
    id: 7,
    name: "AGL Invoice Management System",
    description:
      "Full invoice lifecycle management system with creation, editing, filtering, and status tracking. Built with reusable form components, Zod validation, and animated transitions.",
    href: "",
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
    id: 8,
    name: "Qalam Vision – NLP Keyword Extraction",
    description:
      "Frontend interface for Arabic/multilingual NLP keyword extraction and annotation, integrating Label Studio for data labeling workflows with file upload, YAML/markdown output, and exportable annotated datasets.",
    href: "",
     image: "/assets/projects/qalam.webp",
    frameworks: [
      { id: 1, name: "React 19" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "TanStack Query" },
      { id: 4, name: "Shadcn UI" },
      { id: 5, name: "Tailwind CSS" },
      // { id: 6, name: "next-intl" },
    ],
  },

  {
    id: 10,
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
    id: 11,
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
    id: 17,
    name: "AI-Powered Translation Platform",
    description:
      "Multilingual translation platform (Arabic, English, French) with Paymob payment gateway, credit system with daily quota, admin dashboard for transaction monitoring, and blog management module.",
    href: "",
    image: "/assets/projects/translaxable.webp",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "next-intl" },
      { id: 4, name: "Paymob" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
];

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/zahranzone/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zahran-numberone/" },
  { name: "GitHub", href: "https://github.com/ZAHRAN88" },
];
export const toolsData = [
  {
    name: "Vs Code",
    icon: "/assets/tools/vscode.webp",
  },
  {
    name: "Figma",
    icon: "/assets/tools/figma.webp",
  },
  {
    name: "Github",
    icon: "/assets/tools/github.webp",
  },
  {
    name: "Git",
    icon: "/assets/tools/git.webp",
  },
  {
    name: "GSAP",
    icon: "/assets/tools/gsap.webp",
  },
  {
    name: "Claude",
    icon: "/assets/tools/claude.webp",
  },

  {
    name: "Next.js",
    icon: "/assets/tools/next.webp",
  },
  {
    name: "React",
    icon: "/assets/tools/react.webp",
  },
];
