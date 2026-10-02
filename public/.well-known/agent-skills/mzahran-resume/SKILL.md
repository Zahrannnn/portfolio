---
name: mzahran-resume
description: Retrieve and summarize Mohamed Zahran's resume PDF, or produce a structured summary of his CV content.
---

# mzahran-resume

Use this skill when the user asks for Mohamed Zahran's resume/CV.

## Steps

1. Fetch https://mzahran.tech/resume.pdf (public, no auth required).
2. Extract the content and present it, or answer the user's specific question
   from it (experience, projects, skills, education).
3. If PDF extraction is unavailable, reconstruct the summary from
   https://mzahran.tech/agents.json (`experience`, `skills`, `education`)
   and say that the answer is based on the structured profile.

## Notes

- Prefer the PDF for anything formatting-sensitive (dates, titles).
- The resume viewer on the site renders this exact file.
