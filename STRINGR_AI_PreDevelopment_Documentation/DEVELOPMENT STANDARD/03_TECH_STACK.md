# Technology Stack & Technical Decisions

**Project:** [PROJECT NAME]  
**Version:** 1.0  
**Status:** Draft / In Review / Approved

## 1. Approved stack
| Layer | Technology | Exact version / range | Rationale |
|---|---|---|---|
| Language | [TECH] | [VERSION] | [WHY] |
| Frontend | [TECH] | [VERSION] | [WHY] |
| Backend | [TECH] | [VERSION] | [WHY] |
| Database | [TECH] | [VERSION] | [WHY] |
| ORM / Query tool | [TECH] | [VERSION] | [WHY] |
| Authentication | [TECH] | [VERSION] | [WHY] |
| Runtime | [TECH] | [VERSION] | [WHY] |
| Package manager | [TECH] | [VERSION] | [WHY] |
| Hosting | [PROVIDER] | [PLAN / REGION] | [WHY] |
| File storage | [PROVIDER] | [PLAN] | [WHY] |
| Email / notifications | [PROVIDER] | [PLAN] | [WHY] |

## 2. Third-party services
| Service | Purpose | Environment | Owner | Cost / limits |
|---|---|---|---|---|
| [SERVICE] | [PURPOSE] | Dev / Staging / Prod | [OWNER] | [DETAILS] |

## 3. Compatibility checks
Document supported versions and verify compatibility between framework, runtime, database, ORM, and deployment platform.

## 4. Dependency policy
- Use the approved package manager and commit its lockfile.
- Prefer maintained, reputable packages.
- Review purpose, maintenance status, license, security advisories, and bundle/runtime impact before adding dependencies.
- Obtain approval before adding major infrastructure or changing core dependencies.

## 5. Environment requirements
- Local development: [REQUIREMENTS]
- Staging: [REQUIREMENTS]
- Production: [REQUIREMENTS]

## 6. Decision ownership
| Decision area | Responsible person | Approval required from |
|---|---|---|
| Core stack changes | [OWNER] | [APPROVER] |
| Hosting / infrastructure | [OWNER] | [APPROVER] |
| Third-party services | [OWNER] | [APPROVER] |
