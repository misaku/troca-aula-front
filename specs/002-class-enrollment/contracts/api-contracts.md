# Contracts: Sistema de Candidaturas de Aulas

## Interface de Uso (Frontend → API)

Esta seção documenta as chamadas de API que o frontend faz para a API backend.

### Enrollment Requests (Candidaturas)

```typescript
// GET /enrollment-requests
// Lista todas as candidaturas com filtros
// Query params: status, userId, classId
interface GetEnrollmentsParams {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  userId?: number;
  classId?: number;
}

interface EnrollmentsResponse {
  data: EnrollmentRequest[];
  message: string;
  statusCode: number;
}

// POST /enrollment-requests
// Criar nova candidatura
interface CreateEnrollmentRequest {
  classId: number;
}

// PATCH /enrollment-requests/:id/approve
// Aprovar candidatura (apenas DIRETOR/ADMIN)
interface ApproveEnrollmentResponse {
  data: EnrollmentRequest;
}

// PATCH /enrollment-requests/:id/reject
// Rejeitar candidatura (apenas DIRETOR/ADMIN)
interface RejectEnrollmentRequest {
  rejectionReason?: string;
}

interface RejectEnrollmentResponse {
  data: EnrollmentRequest;
}

// PATCH /enrollment-requests/:id/cancel
// Cancelar candidatura (apenas candidato)
interface CancelEnrollmentResponse {
  data: EnrollmentRequest;
}
```

---

## Interface de Componentes (Props)

### ClassCard (para lista de aulas disponíveis)

```typescript
interface ClassCardProps {
  classData: Class;
  onApply: (classId: number) => void;
  isApplying?: boolean;
  hasApplied?: boolean;
}
```

### EnrollmentList (para Minhas Aulas / Candidaturas)

```typescript
interface EnrollmentListProps {
  enrollments: EnrollmentRequest[];
  onCancel?: (enrollmentId: number) => void;
  onApprove?: (enrollmentId: number) => void;
  onReject?: (enrollmentId: number, reason?: string) => void;
  loading?: boolean;
}
```

### EnrollmentCard

```typescript
interface EnrollmentCardProps {
  enrollment: EnrollmentRequest;
  onCancel?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}
```

---

## Estados de Requisição

```typescript
type EnrollmentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApiState<T> {
  data: T | null;
  status: RequestStatus;
  error: string | null;
}
```

---

## Tipos de Erro

```typescript
interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
```

Exemplos de erros esperados:
- 400: Dados inválidos (classId não existe, aula indisponível)
- 401: Não autenticado
- 403: Não autorizado (não é candidato, não é diretor/admin)
- 409: Conflito (já candidato, conflito de horário, limite atingido)
- 422: Validação de negócio (aula indisponível, vínculo школы)
- 500: Erro interno

---

## Formato de Response (Padrão Backend)

Todas as respostas seguem o padrão:

```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}
```

O frontend deve extrair `.data` das respostas para uso nos componentes.