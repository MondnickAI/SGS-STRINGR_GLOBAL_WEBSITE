# Database Schema & Data Management

**Project:** [PROJECT NAME]  
**Database:** [DATABASE AND VERSION]  
**Version:** 1.0  
**Status:** Draft / In Review / Approved

## 1. Database overview
[Describe the database purpose, hosting, and environment separation.]

## 2. Entity Relationship Diagram
Insert or link the approved ERD here.

## 3. Table definitions
For each table, document:
- Table name and purpose
- Column name and data type
- Primary key and foreign keys
- Nullability and default values
- Unique constraints and indexes
- Created/updated timestamps
- Retention or deletion rules

### Example table
| Column | Type | Required | Constraints / Notes |
|---|---|---|---|
| id | UUID | Yes | Primary key |
| name | VARCHAR | Yes | [MAX LENGTH] |
| created_at | TIMESTAMP | Yes | Default current timestamp |

## 4. Relationships and integrity
[Describe one-to-one, one-to-many, and many-to-many relationships, cascade behavior, and business constraints.]

## 5. Data validation
[Specify required fields, formats, ranges, uniqueness, and cross-field rules.]

## 6. Migrations
- Use version-controlled migrations.
- Review migration scripts before execution.
- Define rollback or forward-fix procedures.
- Do not make untracked schema changes in shared environments.

## 7. Seed and test data
[Describe repeatable seed data and safe test fixtures. Never use real personal data unless properly authorized and protected.]

## 8. Backup and recovery
- Backup frequency: [FREQUENCY]
- Retention: [PERIOD]
- Responsible owner: [OWNER]
- Recovery objectives (RPO/RTO): [TARGETS]
- Restore testing schedule: [SCHEDULE]

## 9. Data lifecycle
Document retention, archival, correction, export, and deletion requirements.
