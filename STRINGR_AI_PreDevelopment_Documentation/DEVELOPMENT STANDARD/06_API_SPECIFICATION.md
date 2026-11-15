# API Specification

**Project:** [PROJECT NAME]  
**Base URL:** [BASE URL PER ENVIRONMENT]  
**Version:** 1.0  
**Status:** Draft / In Review / Approved

## 1. API conventions
- Protocol: HTTPS
- Format: JSON unless otherwise specified
- Authentication: [METHOD]
- Versioning: [STRATEGY]
- Pagination: [STANDARD]
- Date/time format and timezone: [STANDARD]

## 2. Endpoint inventory
| Method | Path | Purpose | Authentication | Roles |
|---|---|---|---|---|
| GET | /api/[resource] | [PURPOSE] | Required / Public | [ROLES] |

## 3. Endpoint contract
### [METHOD] /api/[resource]
**Purpose:** [DESCRIPTION]  
**Authentication:** [REQUIRED / NOT REQUIRED]  
**Authorization:** [ROLE / PERMISSION]

Request:
```json
{
  "field": "value"
}
```

Success response:
```json
{
  "data": {},
  "message": "Success"
}
```

Error responses:
- `400` — Invalid request
- `401` — Not authenticated
- `403` — Not authorized
- `404` — Resource not found
- `409` — Conflict
- `422` — Validation failure
- `429` — Rate limit exceeded
- `500` — Unexpected server error

Adjust codes and response shapes to the actual API conventions.

## 4. Validation and security
Document input schemas, authorization checks, rate limits, allowed origins, file upload restrictions, and sensitive-data handling.

## 5. External API integrations
| Provider | Endpoint / Product | Purpose | Credentials location | Limits |
|---|---|---|---|---|
| [PROVIDER] | [API] | [PURPOSE] | Secret manager / env | [LIMITS] |

## 6. API testing
List contract tests, authentication tests, validation cases, failure cases, and any API collection or test tooling.
