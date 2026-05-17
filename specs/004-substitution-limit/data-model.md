# Data Model: Substitution Limit Display and Enforcement

## Entities

### School (Escola)

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | School name |
| substitutionLimitPerSemester | number \| null | Limit per semester (null = no limit) |

**Source**: GET /schools/:id

### EnrollmentRequest (Candidatura)

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| userId | number | Professor ID |
| status | EnrollmentStatus | PENDING, APPROVED, REJECTED, CANCELLED |
| createdAt | datetime | Creation timestamp |

**Source**: GET /enrollment-requests

### SubstitutionCount (Computed)

| Field | Type | Description |
|-------|------|-------------|
| current | number | Count of APPROVED enrollments this semester |
| limit | number | School's substitutionLimitPerSemester |
| percentage | number | (current / limit) * 100 |

## Relationships

```
User (schoolId) → School (id) → substitutionLimitPerSemester
User (id) → EnrollmentRequest (userId) → status=APPROVED (current semester)
```

## State Transitions

- **On Page Load**: Idle → Loading → Loaded (with count/limit)
- **On Apply**: Allowed → Attempt → Success/Blocked/Error

## Validation Rules

- **Display**: Show "X de Y" when limit exists
- **Display**: Show "Sem limite definido" when limit is null
- **Alert**: Yellow warning at 80%
- **Block**: Disable apply button at 100%
- **Error**: Handle API 400 with custom message

---

**Version**: 1.0.0