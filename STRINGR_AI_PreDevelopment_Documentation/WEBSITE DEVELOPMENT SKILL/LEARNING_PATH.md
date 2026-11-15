# STRINGR Website Development Learning Path

## Program purpose
Build practical team capability to plan, develop, test, deploy, and maintain client websites, while using AI coding agents responsibly. The program is project-based: learners build and improve a real practice website rather than only watching tutorials.

## Recommended sequence
The duration is flexible. A learner should demonstrate the outcomes before moving forward; completion is based on skills, not hours.

| Stage | Focus | Evidence of competence |
|---|---|---|
| 0 | Web foundations and tooling | Explain browser/server basics; use editor, terminal, Git |
| 1 | HTML, CSS, responsive design | Build accessible responsive pages |
| 2 | JavaScript and TypeScript | Implement interactions and typed logic |
| 3 | Framework and component development | Build reusable pages, layouts, and components |
| 4 | Forms, APIs, and backend fundamentals | Validate data and integrate APIs safely |
| 5 | Databases and authentication | Model data and implement secure access where needed |
| 6 | Testing, accessibility, and security | Test critical flows and fix common risks |
| 7 | Deployment and operations | Deploy to staging, configure environments, monitor and recover |
| 8 | AI-assisted engineering | Plan, prompt, inspect diffs, verify, and document AI changes |
| 9 | Capstone and handover | Deliver a maintainable website with documentation |

## Stage 0 — Foundations and developer workflow
Learn:
- How browsers, servers, HTTP, URLs, DNS, and hosting relate.
- VS Code or approved editor, terminal, project files, and package scripts.
- Git basics: status, diff, branch, commit, merge, and pull request.
- How to read errors and browser developer tools.

Practice:
- Clone or initialize a small repository.
- Run a local development server.
- Make a small change, inspect the diff, and commit it.

Assessment:
- Can explain the request/response cycle and recover a simple Git mistake safely.

## Stage 1 — HTML, CSS, and responsive design
Learn:
- Semantic HTML, forms, headings, links, images, and metadata.
- CSS box model, cascade, layout, Flexbox, Grid, and responsive breakpoints.
- Accessible structure, labels, focus, contrast, and alt text.

Practice:
- Recreate a simple business landing page from an approved design reference.
- Make it usable on mobile, tablet, and desktop.

Assessment:
- Page structure is semantic, responsive, and keyboard usable.

## Stage 2 — JavaScript and TypeScript
Learn:
- Variables, functions, arrays, objects, modules, async/await, and error handling.
- DOM and browser events.
- TypeScript types, interfaces, narrowing, and safe API data handling.

Practice:
- Build a navigation menu, filterable list, and validated form interaction.

Assessment:
- Explain the code and handle invalid input and failed operations.

## Stage 3 — Framework and component development
Learn the framework selected by the project. Topics may include:
- Routing and layouts.
- Components, props, state, and composition.
- Server/client boundaries where relevant.
- Data fetching and loading/error states.
- Reusable design-system components.

Practice:
- Build a multi-page company website with shared navigation, footer, and reusable content sections.

Assessment:
- Components have clear responsibilities and pages follow the approved design system.

## Stage 4 — Forms, APIs, and backend fundamentals
Learn:
- HTTP methods, status codes, JSON, REST concepts, and API contracts.
- Client and server validation.
- Environment variables and secrets.
- Error states, rate limits, timeouts, and duplicate submissions.

Practice:
- Build a Request for Quotation form that validates input and submits to a test endpoint.

Assessment:
- Invalid submissions are rejected safely and API failures are communicated clearly.

## Stage 5 — Databases and authentication
Learn when the project requires persistent data or user accounts:
- Relational data concepts, tables, keys, relationships, and indexes.
- Migrations and seed data.
- Authentication versus authorization.
- Role-based permissions and server-side access checks.

Practice:
- Store test RFQ submissions and create a protected admin view using test accounts.

Assessment:
- Users cannot access records or actions outside their permissions.

## Stage 6 — Testing, accessibility, and security
Learn:
- Unit, integration, and end-to-end testing.
- Responsive testing and accessibility checks.
- Common web risks: injection, broken access control, insecure secrets, unsafe uploads, and misconfiguration.
- Dependency review and error logging.

Practice:
- Write tests for a critical form journey and verify authorization boundaries.

Assessment:
- Demonstrate a repeatable test process and explain how sensitive data is protected.

## Stage 7 — Deployment and operations
Learn:
- Development, staging, and production environments.
- Build processes, hosting, DNS, HTTPS, and environment configuration.
- Database migration and backup basics.
- Logs, monitoring, rollback, and incident escalation.

Practice:
- Deploy the capstone to staging and perform a release checklist.

Assessment:
- Another team member can follow the deployment and rollback instructions.

## Stage 8 — AI-assisted engineering
Learn:
- Project context, `AGENTS.md`, skills, and source-of-truth hierarchy.
- Small scoped prompts and plan-before-implementation.
- Reviewing diffs and identifying hallucinated files or dependencies.
- Verifying tests rather than trusting AI claims.
- Safe tool permissions and human approval gates.

Practice:
- Ask an AI agent to plan and implement one feature.
- Review its plan, diff, tests, and documentation.
- Reject or revise at least one unsuitable AI suggestion and explain why.

Assessment:
- Learner can demonstrate responsible AI use without surrendering technical judgment.

## Stage 9 — Capstone
Build a practice website for a fictional or approved business.

Suggested capstone features:
- Home, About, Services, and Contact pages.
- Responsive navigation and reusable page sections.
- Contact or RFQ form with validation.
- Content management approach selected for the project.
- Admin access only if required by scope.
- Basic analytics or monitoring where appropriate.
- Tests, deployment notes, and handover documentation.

Required deliverables:
- Completed website in a Git repository.
- Project planning documents.
- Setup and deployment README.
- Test evidence.
- Known limitations and maintenance notes.
- Demonstration and technical handover.

## Role-based focus
- **Project Manager:** requirements, scope, acceptance criteria, risks, approvals, coordination, and release readiness.
- **UI/UX Designer:** user journeys, design system, responsive layouts, accessibility, and design QA.
- **Frontend Developer:** HTML/CSS, JavaScript/TypeScript, framework, components, state, and browser testing.
- **Backend Developer:** APIs, validation, database, authentication, authorization, and integrations.
- **QA / Reviewer:** test planning, regression, accessibility, security checks, and evidence.
- **AI-assisted Developer:** all relevant engineering fundamentals plus agent instructions, prompt discipline, diff review, and verification.

## Assessment rubric
Score each area from 1 to 4:
1. **Needs guidance:** cannot complete reliably without step-by-step help.
2. **Developing:** completes basic tasks with frequent review.
3. **Competent:** completes routine tasks independently and explains decisions.
4. **Ready to lead:** handles edge cases, reviews others' work, and improves the process.

Assess requirements, UI, code quality, data/API, security, testing, Git workflow, deployment, and AI-agent governance. Do not use AI-generated code volume as a measure of skill.
