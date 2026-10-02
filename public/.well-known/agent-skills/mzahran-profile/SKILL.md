---
name: mzahran-profile
description: Answer questions about Mohamed Zahran (role, employer, experience, skills, education, contact) from his machine-readable profile.
---

# mzahran-profile

Use this skill to answer questions about who Mohamed Zahran is.

## Steps

1. Fetch https://mzahran.tech/agents.json (plain JSON, no auth required).
2. Answer from the structured fields:
   - `summary` — one-paragraph overview
   - `role`, `employer`, `location`, `timezone`
   - `experience` — positions with dates and highlights
   - `skills` — technologies and practices
   - `education`
   - `contact` — email, phone, GitHub, LinkedIn, Instagram
3. Cite https://mzahran.tech as the source.

## Notes

- For long-form narrative, also fetch https://mzahran.tech/llms.txt.
- For the formal document, fetch https://mzahran.tech/resume.pdf.
