// Expose portfolio actions to AI agents via the WebMCP API.
// Tools are feature-detected: newer builds put the API on document.modelContext,
// older Chrome builds on navigator.modelContext. Nothing registers when the
// API is absent, so the site behaves identically for regular visitors.
import { projects } from "./constants/projects";

const RESUME_URL = "https://mzahran.tech/resume.pdf";

async function fetchProfile() {
  const res = await fetch("/agents.json");
  if (!res.ok) throw new Error(`agents.json ${res.status}`);
  return res.json();
}

const tools = [
  {
    name: "get-profile",
    description:
      "Get Mohamed Zahran's professional profile: role, employer, location, summary, skills, and contact details.",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      const p = await fetchProfile();
      return JSON.stringify({
        name: p.fullName,
        role: p.role,
        employer: p.employer,
        location: p.location,
        website: p.website,
        summary: p.summary,
        skills: p.skills,
        education: p.education,
        contact: p.contact,
      });
    },
  },
  {
    name: "get-experience",
    description: "Get Mohamed Zahran's work experience history with highlights for each role.",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      const p = await fetchProfile();
      return JSON.stringify(p.experience);
    },
  },
  {
    name: "list-projects",
    description:
      "List portfolio projects with descriptions, tech stacks, and links. Optionally filter by keyword.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Optional keyword to filter projects (e.g. '3D', 'dashboard', 'AI')",
        },
      },
    },
    execute: async ({ query } = {}) => {
      const q = (query ?? "").trim().toLowerCase();
      const matched = q
        ? projects.filter((project) =>
            [project.name, project.description, ...project.frameworks.map((f) => f.name)]
              .join(" ")
              .toLowerCase()
              .includes(q),
          )
        : projects;
      return JSON.stringify(
        matched.map(({ name, description, href, frameworks }) => ({
          name,
          description,
          url: href,
          tech: frameworks.map((f) => f.name),
        })),
      );
    },
  },
  {
    name: "get-resume",
    description: "Get the URL of Mohamed Zahran's resume PDF.",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      JSON.stringify({
        url: RESUME_URL,
        format: "application/pdf",
        note: "Public, no authentication required.",
      }),
  },
  {
    name: "get-contact",
    description: "Get contact details: email, phone, GitHub, LinkedIn, Instagram.",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      const p = await fetchProfile();
      return JSON.stringify(p.contact);
    },
  },
];

let registering = false;

async function registerTools() {
  if (registering) return;
  const modelContext = document.modelContext ?? navigator.modelContext;
  if (!modelContext || typeof modelContext.registerTool !== "function") return;

  registering = true;
  // Aborting this signal unregisters every tool when the browser tears the context down.
  const controller = new AbortController();
  for (const tool of tools) {
    try {
      await modelContext.registerTool(tool, { signal: controller.signal });
    } catch (error) {
      console.debug(`WebMCP: could not register "${tool.name}"`, error);
    }
  }
}

export function setupWebMCP() {
  // The API may attach modelContext after scripts evaluate; retry on load.
  registerTools();
  window.addEventListener("load", () => registerTools(), { once: true });
  setTimeout(() => registerTools(), 2000);
}
