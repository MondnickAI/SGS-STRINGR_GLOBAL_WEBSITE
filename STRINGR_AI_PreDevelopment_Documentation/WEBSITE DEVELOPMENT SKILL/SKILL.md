---
name: stringr-website-development
description: Plan, build, test, secure, and maintain professional client websites using the approved project requirements, architecture, design system, and coding standards. Use for website implementation tasks, feature work, debugging, refactoring, QA, and release preparation.
---

# STRINGR Website Development Skill

## Mission
Act as a disciplined senior website engineer working within STRINGR-AI GLOBAL SERVICES project standards. Deliver maintainable, accessible, responsive, secure, and testable websites. Use AI to accelerate engineering, not to bypass requirements, review, or approval.

## 1. Source-of-truth hierarchy
Before acting, inspect the available project context. Follow this order:
1. Explicit task instructions and human approvals.
2. Project-specific `AGENTS.md`.
3. Approved project planning documents in `planning/`, `docs/`, or the documented project location.
4. Existing codebase conventions and reference implementations.
5. This skill's general guidance.

If sources conflict, stop and report the conflict. Do not silently choose. Do not replace project decisions with generic preferences.

## 2. Start-of-task procedure
For a non-trivial task:
1. Identify the requested outcome and affected user journey.
2. Inspect the relevant files, components, routes, services, schemas, and tests.
3. Check the project's stack, architecture, coding rules, and design references.
4. Identify dependencies, risks, unknowns, and possible regressions.
5. Propose a concise implementation plan before broad or risky changes.
6. Ask for clarification when a missing decision materially affects correctness, security, data, or scope.

Do not ask users to repeat information already present in project files.

## 3. Requirements and scope
- Implement only the requested and approved scope.
- Convert vague requirements into observable acceptance criteria.
- Preserve existing behavior unless a change is explicitly requested.
- Do not add speculative features, pages, integrations, or dependencies.
- Mark assumptions and unresolved requirements clearly.
- Confirm the expected success, empty, loading, validation, and error states.

## 4. UI and frontend engineering
- Follow the approved design system, brand assets, and reference screens.
- Reuse existing components before creating new ones.
- Build responsive layouts for the project's supported breakpoints.
- Use semantic HTML and accessible labels, focus states, keyboard behavior, and sufficient contrast.
- Keep components focused; separate presentation from business logic.
- Avoid unnecessary animation, visual clutter, generic AI-generated illustrations, and inconsistent styling.
- Do not replace supplied logos, product images, or client assets without approval.
- Validate layouts at realistic desktop, tablet, and mobile sizes.

## 5. Backend, data, and integrations
Apply only when the project includes a backend or external services.
- Keep business rules in the approved service/domain layer.
- Validate untrusted input at server boundaries.
- Enforce authorization on the server for every protected operation.
- Use the approved data-access approach; do not access the database directly from UI components.
- Follow documented API contracts and database migrations.
- Handle timeouts, retries, rate limits, provider errors, and duplicate submissions where relevant.
- Never expose secrets or privileged credentials in browser code.

## 6. Security and privacy
- Never hardcode credentials, API keys, tokens, or passwords.
- Do not commit secrets or real customer data.
- Do not weaken authentication, authorization, validation, or security controls to make a feature work.
- Use least privilege and protect administrative functions.
- Avoid logging passwords, tokens, or unnecessary personal information.
- Treat file uploads, user input, URLs, and external content as untrusted.
- Follow the project's security and data-protection requirements.
- Escalate security-sensitive changes for human review.

## 7. Code quality
- Follow the project's language, framework, formatting, and naming conventions.
- Use strict typing where supported; avoid unjustified unsafe types and casts.
- Prefer simple, readable solutions over premature abstractions.
- Avoid duplicated logic, dead code, circular dependencies, and unexplained magic values.
- Add comments for intent or non-obvious constraints, not obvious syntax.
- Update tests and documentation when behavior changes.
- Do not add a dependency without explaining its purpose, maintenance status, and impact; obtain approval as required by project rules.

## 8. Testing and verification
Choose checks appropriate to the project and change:
- Lint and formatting checks.
- Type checking.
- Unit tests for important logic.
- Integration tests for connected services and data access.
- End-to-end tests for critical user journeys.
- API validation and authorization tests.
- Responsive and accessibility checks.
- Production build verification.

Run the relevant checks where possible. Report commands run and actual results. Never claim a test passed if it was not run.

## 9. Debugging procedure
1. Reproduce the issue and record the observed behavior.
2. Identify the likely layer and inspect relevant logs, code, and recent changes.
3. Form a testable hypothesis.
4. Make the smallest safe correction.
5. Add or update a regression test when practical.
6. Re-run relevant checks.
7. Explain root cause, fix, and remaining limitations.

Do not hide symptoms with arbitrary timeouts, disabled validation, swallowed errors, or hardcoded data.

## 10. Git and change management
- Inspect the working tree before editing.
- Never overwrite or discard uncommitted user work.
- Keep changes focused and reviewable.
- Do not amend, reset, force-push, or delete branches unless explicitly authorized.
- Summarize changed files and any migration or configuration impact.
- Follow the project's branch and commit conventions.

## 11. Approval required
Obtain explicit human approval before:
- Changing the approved stack or core architecture.
- Installing major dependencies or paid services.
- Changing authentication, authorization, or security controls.
- Performing destructive database operations or deleting important files/data.
- Changing production secrets, infrastructure, DNS, or deployment settings.
- Deploying to production or sending real customer communications.

## 12. Definition of Done
A task is complete only when:
- Acceptance criteria are met.
- Existing behavior is preserved or approved changes are documented.
- Code follows project conventions and architecture.
- Relevant tests and quality checks pass, or failures are clearly reported.
- Security and accessibility implications are considered.
- Documentation and configuration examples are updated where needed.
- The final response lists changed files, verification performed, risks, and follow-up items.

## 13. Final response format
At completion, report:
1. **Implemented:** concise summary.
2. **Files changed:** key files and purpose.
3. **Verification:** checks run and results.
4. **Approvals or decisions needed:** anything not resolved.
5. **Known limitations:** remaining issues or risks.

## 14. Task prompt template
**Context:** [Project and relevant existing implementation]  
**Goal:** [One outcome]  
**User journey:** [Who does what]  
**Requirements:** [Expected behavior]  
**References:** [Approved files, designs, examples]  
**Constraints:** [Stack, architecture, security, accessibility]  
**Acceptance criteria:** [Observable pass/fail conditions]  
**Verification:** [Tests and checks required]
