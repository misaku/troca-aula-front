# Data Model: Área Administrativa Master

## Entidades

### Escola (School)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | number | sim (API) | Identificador único |
| name | string | sim | Nome da escola |
| substitutionLimitPerSemester | number | não | Limite de substituições por semestre |
| createdAt | datetime | sim (API) | Data de criação |

### Usuário (User)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | number | sim (API) | Identificador único |
| name | string | sim | Nome completo |
| email | string | sim | Email (deve ser válido e único) |
| phone | string | não | Telefone de contato |
| schoolId | number | sim | Escola vinculada |
| profileId | number | sim | Perfil (2=Diretor, 3=Admin) |
| createdAt | datetime | sim (API) | Data de criação |

### Estatísticas do Dashboard

| Campo | Tipo | Descrição |
|-------|------|-----------|
| totalSchools | number | Total de escolas cadastradas |
| totalClassesAvailable | number | Total de aulas vagas ativas |
| totalSubstitutionsThisMonth | number | Total de substituições neste mês |

---

## Interfaces de API

### Request - Criar Escola

```typescript
interface CreateSchoolRequest {
  name: string;                      // Obrigatório
  substitutionLimitPerSemester?: number;  // Opcional
}
```

### Response - Escola

```typescript
interface SchoolResponse {
  id: number;
  name: string;
  substitutionLimitPerSemester: number | null;
  createdAt: string;
}
```

### Request - Criar Usuário (Diretor/Admin)

```typescript
interface CreateUserRequest {
  name: string;           // Obrigatório
  email: string;          // Obrigatório, válido
  phone?: string;        // Opcional
  password?: string;     // Opcional
  schoolId: number;      // Obrigatório
  profileId: number;    // 2=Diretor, 3=Admin
}
```

### Response - Usuário

```typescript
interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  schoolId: number;
  profileId: number;
  createdAt: string;
}
```

### Response - Dashboard Stats

```typescript
interface DashboardStats {
  totalSchools: number;
  totalClassesAvailable: number;
  totalSubstitutionsThisMonth: number;
}
```

---

## Validações

### Escola
- `name`: Obrigatório, mínimo 2 caracteres
- `substitutionLimitPerSemester`: Opcional, deve ser número positivo

### Usuário
- `name`: Obrigatório, mínimo 2 caracteres
- `email`: Obrigatório, formato válido, único no sistema
- `phone`: Opcional, formato livre
- `password`: Opcional, mínimo 6 caracteres (se enviado)
- `schoolId`: Obrigatório
- `profileId`: Obrigatório, deve ser 2 ou 3

---

## Estado da UI

### Página de Escolas

```typescript
interface SchoolsPageState {
  schools: School[];
  loading: boolean;
  error: string | null;
  formModal: {
    open: boolean;
    mode: 'create' | 'edit';
    data: School | null;
  };
}
```

### Página de Diretores/Administradores

```typescript
interface UsersPageState {
  users: User[];
  loading: boolean;
  error: string | null;
  filters: {
    profileId: 2 | 3;
    schoolId?: number;
  };
  formModal: {
    open: boolean;
    mode: 'create' | 'edit';
    data: User | null;
  };
}
```

### Dashboard Master

```typescript
interface MasterDashboardState {
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
}
```