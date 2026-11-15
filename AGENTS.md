# AI Coding Agent Instructions — STRINGR GLOBAL SERVICES Website

Project-specific rules. They follow the template in
`STRINGR_AI_PreDevelopment_Documentation/DEVELOPMENT STANDARD/AGENTS.md` and the
`WEBSITE DEVELOPMENT SKILL/SKILL.md`, which also apply.

## 1. Project purpose
Corporate website for STRINGR GLOBAL SERVICES. It presents the company's IT, virtual assistant
and contact center/BPO services to international (especially UK) business clients and converts
visitors into business inquiries.

## 2. Approved technology stack
Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS 4, nodemailer, lucide-react,
Vitest, ESLint. npm is the package manager; commit `package-lock.json`. See `docs/DECISIONS.md`.
Do not change core technologies or add dependencies without human approval.

## 3. Architecture rules
- Editable content lives in `content/*.json`. Do not hardcode company facts, service text or
  contact details in components.
- Only `src/lib/content.ts` reads the `content/` folder. Pages and components call its functions.
- Pages are server components. Add `"use client"` only where interaction requires it
  (currently `Header.tsx` and `ContactForm.tsx`).
- Reuse `src/components/ui.tsx` (buttons, headings, cards, PageHero, CtaBand) before creating
  new components. Use the colour tokens in `globals.css`; do not introduce new colours.
- Every page sets metadata through `pageMetadata()` in `src/lib/seo.ts` and has exactly one `<h1>`.
- Form rules live in `src/lib/inquiry.ts` and are enforced on the server in `/api/contact`.

## 4. Content rules
- Never invent client names, testimonials, statistics, certifications, awards or project results.
- The company profile is the source of truth for business facts.
- Do not redraw, recolour or distort the logo.
- Write in clear British English for a business audience. No keyword stuffing.

## 5. Security rules
- Secrets only in environment variables; never in code, content files or the client bundle.
- Do not weaken form validation, the origin check, the honeypot or rate limiting.
- Do not log message bodies or personal data in production.

## 6. Human approval required
Stack or dependency changes, hosting/DNS/production configuration, changes to form delivery or
security controls, legal text, and production deployment.

## 7. Definition of Done
`npm run check` passes (lint, typecheck, tests, build); changed pages are checked at desktop and
mobile widths; README/DECISIONS are updated when behaviour or decisions change; the final report
lists files changed, checks actually run, and remaining limitations.
