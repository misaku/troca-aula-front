# Contracts: Área Administrativa Master

## Interface de Uso (Frontend → API)

Esta seção documenta as chamadas de API que o frontend faz para a API backend.

### Schools (Escolas)

```typescript
// GET /schools
// Lista todas as escolas
// Headers: Authorization: Bearer <token>
interface SchoolsResponse {
  data: School[];
  message: string;
  statusCode: number;
}

// POST /schools
// Criar nova escola
interface CreateSchoolRequest {
  name: string;
  substitutionLimitPerSemester?: number;
}

// PATCH /schools/:id
// Atualizar escola
interface UpdateSchoolRequest {
  name?: string;
  substitutionLimitPerSemester?: number;
}
```

### Users (Usuários)

```typescript
// GET /users?profileId=2
// Lista diretores
// GET /users?profileId=3
// Lista administradores
// GET /users?schoolId=1
// Lista usuários de uma escola
interface UsersResponse {
  data: User[];
  message: string;
  statusCode: number;
}

// POST /users
// Criar usuário (diretor/admin)
interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  schoolId: number;
  profileId: 2 | 3;  // 2=Diretor, 3=Admin
}
```

### Dashboard Stats

```typescript
// GET /schools
// GET /classes?available=true
// GET /enrollment-requests?status=APPROVED&mes= atual
// Aggregação para dashboard
interface DashboardStats {
  totalSchools: number;
  totalClassesAvailable: number;
  totalSubstitutionsThisMonth: number;
}
```

---

## Interface de Componentes (Props)

### MasterLayout

```typescript
interface MasterLayoutProps {
  children: React.ReactNode;
}
```

### StatCard

```typescript
interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}
```

### DataTable

```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}
```

### ConfirmModal

```typescript
interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}
```

### UserForm (Diretor/Admin)

```typescript
interface UserFormProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: User;
  onSubmit: (data: CreateUserRequest) => void;
  onClose: () => void;
}
```

### SchoolForm

```typescript
interface SchoolFormProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: School;
  onSubmit: (data: CreateSchoolRequest) => void;
  onClose: () => void;
}
```

---

## Estados de Requisição

```typescript
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
- 400: Dados inválidos (validação)
- 401: Não autenticado
- 403: Não autorizado
- 404: Não encontrado
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