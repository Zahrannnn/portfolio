// SEO Configuration for Mohamed Zahran Portfolio
export const seoConfig = {
  siteName: "Mohamed Zahran Portfolio",
  siteUrl: "https://mohamed-zahrann.vercel.app",
  author: "Mohamed Zahran",

  defaultTitle: "Mohamed Zahran - Frontend Engineer at RICOH Europe",
  titleTemplate: "%s | Mohamed Zahran",
  defaultDescription:
    "Frontend engineer at RICOH Europe (formerly Corelia). Building product UIs, marketplace systems, and agentic workflows with React, Next.js, TypeScript, and thoughtful motion.",

  keywords: [
    "Mohamed Zahran",
    "Frontend Engineer",
    "RICOH Europe",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Three.js",
    "GSAP",
    "Portfolio",
    "Egypt Developer",
    "UI/UX",
    "Agentic systems",
  ],

  social: {
    twitter: "@zahranzone",
    github: "https://github.com/Zahrannnn",
    linkedin: "https://www.linkedin.com/in/mohamed-zahran-383859222/",
    email: "mohamedzahrann0@gmail.com",
    phone: "+20 109 208 8922",
  },

  ogImage: {
    url: "https://mohamed-zahrann.vercel.app/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Mohamed Zahran - Frontend Engineer Portfolio",
  },

  themeColor: "#06d6a0",
  backgroundColor: "#e5e5e0",

  structuredData: {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mohamed Zahran",
      jobTitle: "Frontend Engineer",
      description:
        "Frontend engineer at RICOH Europe building product UIs and agentic systems with React, Next.js, and TypeScript.",
      url: "https://mohamed-zahrann.vercel.app",
      image: "https://mohamed-zahrann.vercel.app/og-image.jpg",
      sameAs: [
        "https://github.com/Zahrannnn",
        "https://www.linkedin.com/in/mohamed-zahran-383859222/",
        "https://www.instagram.com/zahranzone/",
      ],
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Three.js",
        "Frontend Development",
        "GSAP",
        "Framer Motion",
        "TailwindCSS",
      ],
      alumniOf: "Software Engineering",
      worksFor: {
        "@type": "Organization",
        name: "RICOH Europe",
      },
      email: "mohamedzahrann0@gmail.com",
      telephone: "+20 109 208 8922",
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Mohamed Zahran Portfolio",
      description:
        "Portfolio of Mohamed Zahran, frontend engineer at RICOH Europe.",
      url: "https://mohamed-zahrann.vercel.app",
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
      title: "Mohamed Zahran - Frontend Engineer at RICOH Europe",
      description:
        "Frontend engineer at RICOH Europe. Product UIs, marketplace architecture, and agentic systems with React, Next.js, and TypeScript.",
      path: "/",
      priority: 1.0,
    },
    services: {
      title: "Services - Frontend Development & Interactive Experiences",
      description:
        "Frontend development, UI/UX, modern web architecture, and interactive experiences with React, Next.js, GSAP, and Three.js.",
      path: "/#services",
      priority: 0.8,
    },
    about: {
      title: "About Mohamed Zahran - Frontend Engineer",
      description:
        "Frontend engineer at RICOH Europe (formerly Corelia), focused on system design, TypeScript, and shipping polished product interfaces.",
      path: "/#about",
      priority: 0.8,
    },
    work: {
      title: "Portfolio Projects - Product UIs & Client Work",
      description:
        "Selected projects including Wasla CRM, Nabdh, RICOH Europe 3D work, OZ Storefront, and freelance client sites.",
      path: "/#work",
      priority: 0.9,
    },
    contact: {
      title: "Contact Mohamed Zahran",
      description:
        "Get in touch for frontend engineering, product UI work, or collaborations.",
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
