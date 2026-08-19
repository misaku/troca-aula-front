# Data Model: Sistema de Candidaturas de Aulas

## Entidades

### EnrollmentRequest (Candidatura)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | number | sim (API) | Identificador único |
| classId | number | sim | Aula que está se candidatando |
| userId | number | sim (API) | Professor candidato |
| status | enum | sim | PENDING, APPROVED, REJECTED, CANCELLED |
| rejectionReason | string | não | Motivo da rejeição (opcional) |
| createdAt | datetime | sim (API) | Data de criação |

### Class (Aula)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | number | sim (API) | Identificador único |
| subjectId | number | sim | Disciplina |
| date | datetime | sim | Data da aula |
| available | boolean | sim | Se está disponível para candidatura |
| schoolId | number | sim | Escola da aula |

---

## Interfaces de API

### Request - Criar Candidatura

```typescript
interface CreateEnrollmentRequest {
  classId: number;  // Obrigatório
}
```

### Response - Candidatura

```typescript
interface EnrollmentResponse {
  id: number;
  classId: number;
  userId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  rejectionReason: string | null;
  createdAt: string;
}
```

### Response - Lista de Candidaturas

```typescript
interface EnrollmentListResponse {
  data: EnrollmentResponse[];
  message: string;
  statusCode: number;
}
```

### Request - Rejeitar Candidatura

```typescript
interface RejectEnrollmentRequest {
  rejectionReason?: string;  // Opcional
}
```

---

## Validações

### Ao candidatar-se
- `classId`: Obrigatório, deve existir
- Aula deve ter available=true
- Professor deve ter vínculo com a escola da aula
- Professor não deve ter conflito de horário
- Professor não deve ter atingido limite de substituições

### Ao aprovar
- Apenas DIRETOR (profileId=2) ou ADMIN (profileId=3) podem aprovar
- Status deve ser PENDING

### Ao rejeitar
- Apenas DIRETOR ou ADMIN podem rejeitar
- Status deve ser PENDING

### Ao cancelar
- Apenas o candidato pode cancelar
- Status deve ser PENDING

---

## Estado da UI

### Página de Aulas Disponíveis

```typescript
interface AvailableClassesPageState {
  classes: Class[];
  loading: boolean;
  error: string | null;
}
```

### Página Minhas Aulas (Professor)

```typescript
interface MyEnrollmentsPageState {
  enrollments: EnrollmentResponse[];
  loading: boolean;
  error: string | null;
  filter: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
}
```

### Página Candidaturas (Diretor/Admin)

```typescript
interface EnrollmentsPageState {
  pendingEnrollments: EnrollmentResponse[];
  approvedEnrollments: EnrollmentResponse[];
  rejectedEnrollments: EnrollmentResponse[];
  loading: boolean;
  error: string | null;
}
```