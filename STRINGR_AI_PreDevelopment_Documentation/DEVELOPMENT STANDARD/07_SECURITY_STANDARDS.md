# Security & Data Protection Standards

**Project:** [PROJECT NAME]  
**Version:** 1.0  
**Status:** Draft / In Review / Approved

## 1. Security ownership
- Technical owner: [NAME]
- Security reviewer: [NAME]
- Incident contact / process: [DETAILS]

## 2. Identity and access
- Define authentication and account recovery.
- Enforce authorization on the server for every protected operation.
- Apply least-privilege access and role-based permissions where appropriate.
- Protect sessions and tokens; define expiry and revocation.
- Require stronger controls for privileged accounts where appropriate.

## 3. Application security
Assess protections against common risks, including injection, cross-site scripting, cross-site request forgery where applicable, broken access control, insecure file uploads, and security misconfiguration.

## 4. Secrets management
- Store secrets in approved environment configuration or a secrets manager.
- Never commit secrets or expose them in client-side bundles.
- Use separate credentials for development, staging, and production.
- Define rotation and revocation procedures.

## 5. Data protection
- Identify personal, confidential, and sensitive data.
- Collect only data required for the stated purpose.
- Define lawful basis, notices, retention, access, correction, and deletion processes where applicable.
- Encrypt data in transit and assess encryption at rest.
- Restrict access to production data.
- Use masked or synthetic data for testing.

Consider applicable laws and contractual obligations, including the Philippine Data Privacy Act of 2012 where relevant. Obtain qualified review for legal or regulatory obligations.

## 6. Logging and monitoring
- Log security-relevant events without recording passwords, tokens, or unnecessary personal data.
- Restrict log access and define retention.
- Monitor authentication failures, privilege changes, and unusual activity.

## 7. Dependencies and infrastructure
- Review dependency vulnerabilities.
- Keep supported runtimes and services patched.
- Restrict database and administrative access.
- Define backup protection and restore testing.

## 8. Incident response
Document detection, escalation, containment, investigation, recovery, communication, and post-incident review responsibilities.

## 9. Security acceptance checklist
- [ ] Authorization is enforced server-side.
- [ ] Secrets are not committed or exposed.
- [ ] Inputs are validated.
- [ ] Sensitive data is appropriately protected.
- [ ] Dependencies and deployment settings are reviewed.
- [ ] Logging avoids secrets and unnecessary personal data.
- [ ] Backup and incident procedures are documented.
