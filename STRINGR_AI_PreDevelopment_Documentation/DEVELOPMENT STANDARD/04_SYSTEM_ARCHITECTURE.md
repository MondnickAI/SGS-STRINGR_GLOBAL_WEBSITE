# System Architecture

**Project:** [PROJECT NAME]  
**Version:** 1.0  
**Status:** Draft / In Review / Approved

## 1. Architecture overview
[Describe the system and its major components.]

## 2. Architecture diagram
Add an approved diagram showing clients, frontend, backend, database, external services, and key data flows.

## 3. Component responsibilities
| Component / Module | Responsibility | Dependencies |
|---|---|---|
| [MODULE] | [RESPONSIBILITY] | [DEPENDENCIES] |

## 4. Project structure
Adapt this example to the selected framework; do not force a structure that conflicts with framework conventions.

```text
src/
  app/              # Routes and pages
  components/       # Shared UI components
  features/         # Domain-specific modules
  services/         # Business logic and external/data access
  lib/              # Shared utilities and configuration
  hooks/            # Reusable hooks
  types/            # Shared type definitions
  constants/        # Application constants
public/             # Static assets
docs/               # Technical documentation
tests/              # Automated tests
```

## 5. Layering and dependency rules
- Presentation components must not access the database directly.
- Business rules belong in the designated domain/service layer.
- Data access must use the approved repository or service pattern.
- Shared modules must not depend on feature-specific implementation details.
- Avoid circular dependencies.
- Define where validation, authorization, and error translation occur.

## 6. Data flow
Describe how a request moves from the user interface through validation, authorization, business logic, data access, and response.

## 7. Authentication and authorization flow
[Document session/token approach, role checks, and protected resources.]

## 8. Integration boundaries
| External system | Direction | Data exchanged | Failure behavior |
|---|---|---|---|
| [SYSTEM] | Inbound / Outbound / Both | [DATA] | [HANDLING] |

## 9. Scalability and reliability
Document expected traffic, background jobs, caching, rate limits, availability needs, and recovery expectations where relevant.

## 10. Architecture decisions and open issues
Link major decisions to `DECISIONS.md`.
