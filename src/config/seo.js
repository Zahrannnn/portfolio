// SEO Configuration for Mohamed Zahran Portfolio
export const seoConfig = {
  siteName: "Mohamed Zahran Portfolio",
  siteUrl: "https://mzahran.tech",
  author: "Mohamed Zahran",

  defaultTitle: "Mohamed Zahran - Software Engineer at RICOH Europe",
  titleTemplate: "%s | Mohamed Zahran",
  defaultDescription:
    "Software engineer at RICOH Europe (formerly Corelia). Six enterprise systems in parallel: React and Next.js front ends, NestJS and ASP.NET Core services, PostgreSQL and MongoDB, and agentic AI workflows in production.",

  keywords: [
    "Mohamed Zahran",
    "Software Engineer",
    "Full Stack Engineer",
    "RICOH Europe",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "NestJS",
    "ASP.NET Core",
    "Node.js",
    "PostgreSQL",
    "LangGraph",
    "Three.js",
    "GSAP",
    "Portfolio",
    "Egypt Developer",
    "Agentic systems",
  ],

  social: {
    twitter: "@zahranzone",
    github: "https://github.com/Zahrannnn",
    linkedin: "https://www.linkedin.com/in/mohamed-zahran-383859222/",
    email: "info@mzahran.tech",
    phone: "+20 109 208 8922",
  },

  ogImage: {
    url: "https://mzahran.tech/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Mohamed Zahran - Software Engineer Portfolio",
  },

  themeColor: "#06d6a0",
  backgroundColor: "#e5e5e0",

  structuredData: {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mohamed Zahran",
      alternateName: "Mohamed Osama Zahran",
      jobTitle: "Software Engineer",
      description:
        "Software engineer at RICOH Europe (formerly CORELIA) shipping six production enterprise systems in parallel: React and Next.js front ends, NestJS and ASP.NET Core services, real-time dashboards, 3D web experiences, and agentic AI workflows.",
      url: "https://mzahran.tech",
      image: "https://mzahran.tech/og-image.jpg",
      email: "mailto:info@mzahran.tech",
      telephone: "+20 109 208 8922",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      sameAs: [
        "https://github.com/Zahrannnn",
        "https://www.linkedin.com/in/mohamed-zahran-383859222/",
        "https://www.instagram.com/zahranzone/",
      ],
      knowsAbout: [
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "React Three Fiber",
        "Three.js",
        "Redux Toolkit",
        "TanStack Query",
        "Node.js",
        "NestJS",
        "ASP.NET Core",
        "PostgreSQL",
        "MongoDB",
        "SQL Server",
        "REST API Design",
        "Software Architecture",
        "LangGraph",
        "GSAP",
        "Framer Motion",
        "Tailwind CSS",
        "Web Accessibility",
        "RTL and Internationalization",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Shorouk Academy",
      },
      worksFor: {
        "@type": "Organization",
        name: "RICOH Europe",
      },
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Mohamed Zahran Portfolio",
      description:
        "Portfolio of Mohamed Zahran, software engineer at RICOH Europe.",
      url: "https://mzahran.tech",
      author: {
        "@type": "Person",
        name: "Mohamed Zahran",
      },
      inLanguage: "en-US",
      copyrightYear: new Date().getFullYear(),
      genre: "Portfolio",
    },
  },

  pages: {
    home: {
      title: "Mohamed Zahran - Software Engineer at RICOH Europe",
      description:
        "Software engineer at RICOH Europe. Six enterprise systems in parallel: React and Next.js front ends, NestJS and .NET services, and agentic AI in production.",
      path: "/",
      priority: 1.0,
    },
    services: {
      title: "Services - Full-Stack Engineering, Design Systems & Agentic AI",
      description:
        "Full-stack product engineering, frontend architecture and design systems, backend APIs and integrations, and agentic AI systems with React, Next.js, NestJS, and ASP.NET Core.",
      path: "/#services",
      priority: 0.8,
    },
    about: {
      title: "About Mohamed Zahran - Software Engineer",
      description:
        "Software engineer at RICOH Europe (formerly Corelia), shipping six production systems end to end: TypeScript, React, Next.js, NestJS, and ASP.NET Core.",
      path: "/#about",
      priority: 0.8,
    },
    work: {
      title: "Portfolio Projects - Enterprise Systems & Client Work",
      description:
        "Selected projects including RICOH Europe systems, Wasla CRM, MAC-Egypt, Nabdh, government healthcare portals, and agentic AI pipelines.",
      path: "/#work",
      priority: 0.9,
    },
    contact: {
      title: "Contact Mohamed Zahran",
      description:
        "Get in touch for software engineering, full-stack product work, or collaborations.",
      path: "/#contact",
      priority: 0.7,
    },
  },
};

export const getPageSEO = (pageKey) => {
  const page = seoConfig.pages[pageKey];
  if (!page) return seoConfig;

  return {
    ...seoConfig,
    title: page.title,
    description: page.description,
    url: `${seoConfig.siteUrl}${page.path}`,
    canonical: `${seoConfig.siteUrl}${page.path}`,
  };
};

export const getKeywordsString = (additionalKeywords = []) => {
  return [...seoConfig.keywords, ...additionalKeywords].join(", ");
};
