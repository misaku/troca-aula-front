# Data Model: School Selection by User Profile

## Entities

### School (Escola)

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | School name |

**Source**: GET /schools (master.service.tsx)

### User (Usuário)

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | User full name |
| email | string | User email |
| profileId | number | 1=Master, 2=Diretor, 3=Professor |
| schoolId | number \| null | Linked school ID (null for Master) |

**Source**: GET /auth/me (useUserHook)

### Class (Aula)

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| schoolId | number | School ID (dynamic based on profile) |
| subjectId | number | Subject ID |
| statededAt | datetime | Start date/time |
| finishedAt | datetime | End date/time |

**Destination**: POST /classes

## Relationships

```
User (profileId, schoolId) → School (id)
Class (schoolId) → School (id)
```

## State Transitions

N/A - não há mudanças de estado nesta feature.

## Validation Rules

- **Master**: schoolId deve ser selecionado do dropdown (obrigatório)
- **Diretor**: schoolId é fixo (não pode ser alterado)
- **Professor**: não pode acessar o formulário

---

**Version**: 1.0.0