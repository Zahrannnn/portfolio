// The AI-first working loop — how coding agents actually run in Mohamed's
// daily practice. Rendered by the pinned horizontal strip in AIFlow.jsx.
// Keep every claim earned: the test counts mirror the resume and repos.
export const aiLoop = [
  {
    id: "spec",
    name: "Spec",
    tagline: "write the intent, not the boilerplate",
    detail:
      "Plans, boundaries and acceptance criteria land before generation starts. The agent inherits a contract, not a vibe.",
    icon: "lucide:clipboard-list",
  },
  {
    id: "delegate",
    name: "Delegate",
    tagline: "claude code + codex in the daily loop",
    detail:
      "Feature scaffolds, refactors and test drafts go to the agents — parallel, fast, and scoped by the spec.",
    icon: "claude-codex",
  },
  {
    id: "review",
    name: "Review",
    tagline: "every line understood before it ships",
    detail:
      "Agent output is a draft, never an autopilot. Each line is read, questioned and owned before it reaches a PR.",
    icon: "lucide:git-pull-request",
  },
  {
    id: "verify",
    name: "Verify",
    tagline: "merges gate on CI test suites",
    detail:
      "504 tests gate the latest AI system; 409 gate the MAC-Egypt platform deploy. Trust is measured, not assumed.",
    icon: "lucide:shield-check",
  },
  {
    id: "ship",
    name: "Ship",
    tagline: "the playbook ships with the platform",
    detail:
      "The team's Next.js boilerplate carries AGENTS.md and an agent playbook with a single verify gate before handoff.",
    icon: "lucide:rocket",
  },
];

// Public proof — every link must resolve.
export const aiProof = [
  {
    label: "awesome-claude-skills",
    href: "https://github.com/Zahrannnn/awesome-claude-skills",
    note: "curated agent skills",
  },
  {
    label: "corelia-next-boilerplate",
    href: "https://github.com/Zahrannnn/corelia-next-boilerplate",
    note: "AGENTS.md + verify gate",
  },
  {
    label: "agentic-shop",
    href: "https://github.com/Zahrannnn/agentic-shop",
    note: "504 tests, offline mock mode",
  },
];
