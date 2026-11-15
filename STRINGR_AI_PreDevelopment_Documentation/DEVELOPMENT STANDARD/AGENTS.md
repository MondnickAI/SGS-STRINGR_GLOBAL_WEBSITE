# AI Coding Agent Instructions

This file defines project-specific rules for AI coding agents. Read it before inspecting or changing project files.

## 1. Project purpose
[Describe the application, its users, and its primary business purpose.]

## 2. Approved technology stack
Refer to `03_TECH_STACK.md`. Do not change core technologies or versions without explicit human approval.

## 3. Architecture and project structure
Refer to `04_SYSTEM_ARCHITECTURE.md`. Follow existing framework conventions and the approved module boundaries.

## 4. Required behavior
- Inspect relevant existing code before proposing changes.
- Understand the current implementation and dependencies before editing.
- For non-trivial work, provide a concise plan and wait for approval when requested by the task owner.
- Make the smallest coherent change that satisfies the requirement.
- Reuse existing components, services, and patterns where appropriate.
- Preserve existing behavior unless the task explicitly requires a change.
- Report files changed, tests run, results, and known limitations.

## 5. Coding rules
- Follow the project's language and framework conventions.
- Use strict types where supported; avoid unsafe types and unjustified type assertions.
- Keep UI, business logic, and data access separated.
- Validate untrusted input at system boundaries.
- Handle errors consistently.
- Avoid duplicated logic, circular dependencies, and unnecessary abstractions.
- Do not add dependencies without explaining the need and obtaining approval where required.

## 6. Security rules
- Never hardcode or reveal secrets.
- Never weaken authentication, authorization, validation, or security controls to make a test pass.
- Do not access or export production data unless explicitly authorized.
- Do not perform destructive database or infrastructure actions without approval.

## 7. Prohibited actions
- Do not silently change the approved stack or architecture.
- Do not delete files or functionality unrelated to the task.
- Do not overwrite user work without checking it.
- Do not deploy to production without explicit approval.
- Do not claim tests passed unless they were actually run and passed.

## 8. Human approval required
Obtain approval before changing core dependencies, database architecture, authentication, authorization, production configuration, data deletion, destructive commands, or production deployment.

## 9. Definition of Done
A change is complete only when applicable acceptance criteria are met, relevant checks pass, documentation is updated, and the final report identifies any remaining risks or limitations.

## 10. Task prompt template
**Context:** [Relevant project and code context]  
**Task:** [One specific objective]  
**References:** [Files or approved examples]  
**Requirements:** [Expected behavior]  
**Constraints:** [Architecture, security, and coding rules]  
**Acceptance criteria:** [Observable pass/fail conditions]  
**Verification:** [Tests, lint, type check, build]
