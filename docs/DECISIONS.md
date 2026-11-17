# Architecture & Technical Decision Log — STRINGR GLOBAL SERVICES Website

Format follows `STRINGR_AI_PreDevelopment_Documentation/DEVELOPMENT STANDARD/DECISIONS.md`.
Decisions marked **Accepted** were chosen by the project owner on 2026-11-15. Decisions marked
**Proposed** were made during implementation and need confirmation.

| ADR | Title | Status | Date |
|---|---|---|---|
| ADR-001 | Next.js + TypeScript + Tailwind CSS | Accepted | 2026-11-15 |
| ADR-002 | Host-agnostic Node deployment, hosted on Netlify | Accepted | 2026-11-17 |
| ADR-003 | Structured JSON content files instead of a CMS | Accepted | 2026-11-15 |
| ADR-004 | Inquiry delivery by SMTP | Accepted | 2026-11-15 |
| ADR-005 | Form abuse protection without third-party services | Proposed | 2026-11-15 |
| ADR-006 | Contact Center & BPO as a third service division | Proposed | 2026-11-15 |
| ADR-007 | No stock photography; provisional logo files | Proposed | 2026-11-15 |
| ADR-008 | Version pins for Node 20.17 | Proposed | 2026-11-15 |
| ADR-009 | Scope of additional pages | Proposed | 2026-11-15 |

---

### ADR-001: Next.js + TypeScript + Tailwind CSS
- **Context:** The planning templates were blank and no code existed, so no stack was defined.
- **Options:** Next.js; Astro; WordPress.
- **Decision:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS 4.
- **Rationale:** Static pre-rendering for speed and SEO, a built-in server route for the inquiry form, and it demonstrates the company's own web capability.
- **Consequences:** Requires Node-capable hosting. Content editing needs a rebuild (see ADR-003).
- **Review trigger:** Next.js 15 reaching end of support; plan the upgrade to the current major.

### ADR-002: Host-agnostic Node deployment, hosted on Netlify
- **Context:** No hosting had been bought. The domain and email (Titan / GoDaddy Professional Email) are at GoDaddy. GoDaddy's entry-level shared cPanel plans generally cannot run Node.js and commonly block outbound SMTP, which the inquiry form needs.
- **Options:** GoDaddy shared cPanel; GoDaddy VPS; Vercel Pro (Hobby plan is non-commercial); Netlify.
- **Decision (2026-11-17):** Host on Netlify, deployed from GitHub, with Node 22 (`netlify.toml`). Keep the domain and email at GoDaddy and point only the website DNS records to Netlify. The application stays a standard Next.js server app with no platform-specific APIs, and `outputFileTracingIncludes` ships `content/` with the inquiry function.
- **Consequences:** No server to maintain; SSL is automatic. `/api/contact` is serverless, so rate limiting is best-effort (ADR-005). Not deployable to PHP-only shared hosting; that would need `output: "export"` and a replacement for `/api/contact`.
- **Review trigger:** Netlify plan limits reached, or a move to self-managed hosting.

### ADR-003: Structured JSON content files instead of a CMS
- **Options:** JSON files; Git-based visual editor (Keystatic); hosted headless CMS (Sanity).
- **Decision:** JSON files in `content/`, read only by `src/lib/content.ts`, validated by `tests/content.test.ts`.
- **Rationale:** No accounts, costs or extra dependencies at launch, while keeping all content out of components.
- **Consequences:** Editors change JSON and redeploy. Adopting a CMS later means replacing the loaders in one file.
- **Review trigger:** Non-technical staff need to publish frequently (for example a blog).

### ADR-004: Inquiry delivery by SMTP
- **Decision:** `/api/contact` sends email with nodemailer using SMTP credentials from environment variables. Inquiries are not stored.
- **Consequences:** Depends on the mailbox provider's deliverability and sending limits. Unconfigured production returns a clear error with the company email rather than failing silently.
- **Review trigger:** Deliverability problems, or a need to keep an inquiry log/CRM integration.

### ADR-005: Form abuse protection without third-party services
- **Decision:** Server-side validation, same-origin check, honeypot, minimum fill time and an in-memory rate limit (5 per 10 minutes per IP).
- **Rationale:** Avoids CAPTCHA friction and third-party scripts/cookies for a low-volume B2B form.
- **Consequences:** The in-memory limiter is per server instance, so it is best-effort on serverless platforms.
- **Review trigger:** Spam reaches the mailbox; add the host's rate limiting/WAF or a privacy-friendly CAPTCHA.

### ADR-006: Contact Center & BPO as a third service division
- **Context:** The company profile lists call center services under Virtual Assistant Services; the website brief requires three service areas.
- **Decision:** Inbound, Outbound and Omnichannel/Non-Voice services form the "Contact Center & BPO Services" division. Virtual Bookkeeping & Accounting stays under Virtual Assistant Services in a "Finance Support" group.
- **Review trigger:** Business feedback on the grouping (edit `content/divisions/*.json`; no code change).

### ADR-007: No stock photography; provisional logo files
- **Context:** No logo file or photography was supplied, only company-profile page images.
- **Decision:** The logo and "S" mark were cropped from the profile image without altering the design. The visual language uses brand colours, angular shapes and icons rather than stock or AI imagery.
- **Consequences:** Logo resolution is limited; the footer uses the mark with typed company name on the dark background. Replace `public/brand/logo.png`, `public/brand/mark.png` and `src/app/icon.png` when official files are available.
- **Update 2026-11-15 (design reference):** Following the owner's visual reference, the homepage now has a top information bar, a dark split-screen hero with diagonal orange geometry, and photography. No company photos exist yet, so two Unsplash-licence stock photos are used as stand-ins (`public/images/`); they must not be presented as STRINGR staff and should be replaced with real photography. Business hours and social links were left out of the top bar because none have been provided.
- **Update 2026-11-15:** The project owner supplied the new SGS globe logo. It replaces the cropped logo in the header and footer (white background made transparent, artwork unchanged). The browser-tab icon is the globe symbol from that logo. Because the lettering is dark, the footer shows the logo on a white plate; `mark.png` was removed.
- **Update 2026-11-16 (hero motion):** At the owner's request the hero's orange bar now runs to the left edge and carries a slow light-flow animation, and the background rings became a radar ripple that shows one service label per ring. Both are CSS only and fall back to a still state under `prefers-reduced-motion`. The five ring labels are the owner's wording and live in `content/company.json` (`serviceLayers`); "Business Operations" is not one of the three published divisions and should be confirmed against the company profile.

### ADR-008: Version pins for Node 20.17
- **Context:** The development machine runs Node 20.17.
- **Decision:** Next.js 15.5 (well-established major), TypeScript 5.9, ESLint 9, and Tailwind CSS pinned to 4.3.3 (4.3.4+ requires Node 20.19+).
- **Review trigger:** Node upgraded to 22 LTS or newer.

### ADR-009: Scope of additional pages
- **Decision:** A Privacy Policy is included because the form collects personal data. Careers, Blog/Insights and Terms & Conditions are not built, since no content exists for them.
- **Review trigger:** The business has job openings, articles or contractual terms to publish.
