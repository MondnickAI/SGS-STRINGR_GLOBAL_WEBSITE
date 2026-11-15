# STRINGR GLOBAL SERVICES — Corporate Website

Marketing and business-development website for STRINGR GLOBAL SERVICES (SGS).
*Smart Solutions. Seamless Operations.*

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS 4 (brand tokens in `src/app/globals.css`) |
| Content | JSON files in `content/` (no database) |
| Inquiry form | `POST /api/contact`, delivered by SMTP (nodemailer) |
| Runtime | Node.js 20.9 or newer |

Planning templates and the STRINGR development standard are in
`STRINGR_AI_PreDevelopment_Documentation/` (unchanged). Project-specific agent rules are in
`AGENTS.md`; technical decisions are in `docs/DECISIONS.md`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (form validation, content integrity) |
| `npm run check` | All of the above in sequence; run before every release |

## Environment variables

Set these in `.env.local` for development and in the hosting dashboard for production.
Never commit real values.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | Public address, e.g. `https://www.stringr-ai.com`. Used for canonical URLs, sitemap, robots.txt and social sharing. Must be set **before building**. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Production | Mail server used to deliver inquiries. |
| `CONTACT_FROM` | Production | Sender address (a mailbox the SMTP account may send as). |
| `CONTACT_TO` | Optional | Recipient. Defaults to the email in `content/site.json`. |

Without SMTP settings:

- **Development:** inquiries are printed to the server console and the form shows success.
- **Production:** the form tells the visitor it is unavailable and shows the company email. Nothing is silently lost.

## Editing content

Routine content changes do not require touching code. Edit the JSON files, run `npm test`
(it catches missing fields, broken references and unknown icons), then rebuild and deploy.

| To change | Edit |
|---|---|
| Company name, tagline, phone, email, address | `content/site.json` |
| Introduction, mission, vision, pillars, values, aims, differentiators, story | `content/company.json` |
| A service division (title, intro, grouping, SEO text) | `content/divisions/<division>.json` |
| A service page | `content/services/<division>/<service>.json` |
| Case studies | `content/case-studies/<slug>.json` |

**Add a service:** create `content/services/<division>/<slug>.json` (copy an existing file), then
add the slug to a group in `content/divisions/<division>.json`. The page, navigation links and
sitemap entry are generated automatically.

**Add a case study:** copy `content/case-studies/_template.json.example` to `<slug>.json` and fill
it in. The "Case studies" section on the Our Expertise page appears automatically once at least
one file exists. Publish only verified, client-approved information.

**Icons:** the `icon` field must be one of the names listed in `src/components/Icon.tsx`.

**Images:** the logo is `public/brand/logo.png` (1200 x 384, transparent background) and the
browser-tab icon is `src/app/icon.png` (the globe symbol). To change the logo, replace those files
and update the `width`/`height` in `Header.tsx` and `Footer.tsx` if the proportions differ.

## Project structure

```text
content/                 Editable website content (JSON)
public/brand/            Logo files
src/app/                 Routes: pages, /api/contact, sitemap, robots, social image
src/components/          Shared UI (Header, Footer, ContactForm, ui.tsx, Icon)
src/lib/content.ts       The only module that reads content/ (swap here to adopt a CMS)
src/lib/inquiry.ts       Form validation shared by browser and server
src/lib/mailer.ts        SMTP delivery
src/lib/rate-limit.ts    Basic abuse protection for the form endpoint
tests/                   Vitest unit tests
docs/DECISIONS.md        Architecture decision log
```

## Pages

Home · About Us · Services (overview, 3 division pages, 25 service pages) · Why Choose Us ·
Our Expertise · Contact Us · Privacy Policy · 404.
Also generated: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

## Inquiry form endpoint

`POST /api/contact` with JSON `{ name, email, company, phone?, service, message, consent }`.

| Status | Meaning |
|---|---|
| 200 | Accepted (`{ "ok": true }`) |
| 400 / 413 / 415 | Unreadable, oversized or non-JSON request |
| 403 | Request came from another website |
| 422 | Validation failed; `errors` lists messages per field |
| 429 | More than 5 submissions in 10 minutes from one address |
| 502 / 503 | Mail server rejected the message / SMTP not configured |

Protections: server-side validation, length limits, control-character stripping (prevents email
header injection), same-origin check, honeypot field, minimum fill time, rate limiting.
Inquiries are emailed only; nothing is stored on the server.

## Deployment

The site needs a host that can run Node.js (for the form endpoint). It is not a static export.

- **Vercel / Netlify:** import the repository, set the environment variables, deploy.
- **VPS or Node hosting:** `npm ci && npm run build && npm start` behind HTTPS (e.g. Nginx + PM2).
- **Shared cPanel hosting without Node:** not supported as built; see ADR-002 for the alternative.

Release checklist:

1. `npm run check` passes.
2. `NEXT_PUBLIC_SITE_URL` and SMTP variables are set on the host.
3. Send a test inquiry on the live site and confirm it arrives at the company mailbox.
4. Submit `/sitemap.xml` in Google Search Console.

## Open items (need a decision or input from the business)

| # | Item | Why it matters |
|---|---|---|
| 1 | **Logo version for dark backgrounds, and tagline wording** | The SGS logo (supplied 2026-11-15) has dark lettering, so the footer shows it on a white plate. A light-text version would sit directly on the charcoal footer. The logo reads "Smart Solution Seamless Operation" while the site text uses "Smart Solutions. Seamless Operations."; confirm which is correct. |
| 2 | **Hosting provider and production domain** | Determines deployment steps; `www.stringr-ai.com` is assumed from the email domain. |
| 3 | **SMTP credentials** for the mailbox that sends inquiries | The live form cannot deliver without them. |
| 4 | **Approved case studies** | None were supplied, so none are shown. No client names, statistics, testimonials or certifications have been invented. |
| 5 | **Photography** (team, office, operations) | The two homepage photos (`public/images/hero-team.jpg`, `team-collaboration.jpg`) are free-licence stock images from Unsplash used as stand-ins. They do not show STRINGR staff. Replace them with real company photography using the same file names. |
| 6 | **Legal review of the Privacy Policy** | Drafted in plain English for the form as built; it references the Philippine Data Privacy Act and UK GDPR and should be reviewed by a qualified adviser before launch. |
| 7 | **Confirm copy written for the site** | Service-page text (problems addressed, delivery, value), the four-step engagement approach, and the "Finance Support" grouping were written from the company profile and need business sign-off. |
| 8 | **Spelling convention** | Body copy uses British English for the UK audience; service names keep the company's "Contact Center" / "Call Center" spelling. Confirm or standardise. |
| 9 | **Company history wording** | The site says "founded eight years ago", as in the profile. A founding year would not go out of date. |

## Known limitations

- Rate limiting is in memory, so on serverless hosting it is best-effort (ADR-005).
- No analytics or cookie banner is installed; the Privacy Policy states this. Update both together if analytics are added.
- Tailwind CSS is pinned to 4.3.3 because later releases need Node 20.19+. Upgrade Node first, then Tailwind.
- One moderate `npm audit` advisory remains in development-only lint tooling (`minimatch` via `typescript-eslint`); it does not affect the deployed site.
- Automated end-to-end browser tests are not included; pages were verified by crawl, HTTP checks and screenshots.
