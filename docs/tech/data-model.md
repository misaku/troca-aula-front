# Modelo de Dados

## Visão Geral do Banco

O banco de dados PostgreSQL é gerenciado pelo **Prisma ORM** e contém todas as entidades do sistema Troca Aula.

```mermaid
graph TB
    subgraph "Camada de Aplicação"
        APP[NestJS API]
    end
    
    subgraph "Camada de Persistência"
        PRISMA[Prisma Client]
        MIGRATE[Prisma Migrate]
    end
    
    subgraph "PostgreSQL"
        POOL[Connection Pool]
        MAIN[(Banco Principal)]
    end
    
    APP --> PRISMA
    PRISMA --> POOL
    POOL --> MAIN
    MIGRATE --> MAIN
    
    style APP fill:#e3f2fd
    style PRISMA fill:#e8f5e9
    style MAIN fill:#fff3e0
```

## Entidades do Sistema

### Modelo Entidade-Relacionamento

```mermaid
erDiagram
    USERS ||--o{ USERS_PROFILES_SCHOOLS : "vinculos"
    USERS ||--o{ CLASSES_CREATED : "criadas_por"
    USERS ||--o{ CLASSES_APPROVED : "aprovadas_por"
    USERS ||--o{ ENROLLMENT_REQUESTS : "candidaturas"
    SCHOOLS ||--o{ USERS_PROFILES_SCHOOLS : "usuarios"
    SCHOOLS ||--o{ CLASSES : "aulas"
    PROFILES ||--o{ USERS_PROFILES_SCHOOLS : "perfis"
    SUBJECTS ||--o{ CLASSES : "disciplinas"
    SUBJECTS ||--o{ USERS : "professor_especialidade"
    CLASSES ||--o{ ENROLLMENT_REQUESTS : "inscricoes"
```

## Tabelas e Estruturas

### USERS (Usuários)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int | PK - Identificador único |
| name | string | Nome completo |
| email | string | Email único |
| phone | string | Telefone de contato |
| passwordHash | string | Senha hasheada (bcrypt) |
| subjectId | int | FK - Disciplina do professor |
| createdAt | datetime | Data de criação |
| deletedAt | datetime | Data de exclusão (soft delete) |

### SCHOOLS (Escolas)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int | PK - Identificador único |
| name | string | Nome da escola |
| createdAt | datetime | Data de criação |
| deletedAt | datetime | Data de exclusão |

### PROFILES (Perfis)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int | PK - Identificador único |
| name | string | Nome do perfil |
| description | string | Descrição |

**Perfis disponíveis**:
- DIRETOR (id: 1)
- PROFESSOR (id: 2)
- AUXILIAR_ADMIN (id: 3)

### SUBJECTS (Disciplinas)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int | PK - Identificador único |
| name | string | Nome da disciplina |
| description | string | Descrição |

### CLASSES (Aulas/Turmas)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int | PK - Identificador único |
| schoolId | int | FK - Escola |
| subjectId | int | FK - Disciplina |
| createdById | int | FK - Quem criou |
| approvedById | int | FK - Quem aprovou |
| statededAt | datetime | Data/hora de início |
| finishedAt | datetime | Data/hora de término |
| available | boolean | Disponível para candidatura |
| enrolledById | int | FK - Professor inscrito |
| createdAt | datetime | Data de criação |
| deletedAt | datetime | Data de exclusão |

### ENROLLMENT_REQUESTS (Candidaturas)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int | PK - Identificador único |
| classId | int | FK - Aula |
| userId | int | FK - Professor candidato |
| status | enum | PENDING, APPROVED, REJECTED, CANCELLED |
| createdAt | datetime | Data de criação |
| updatedAt | datetime | Data de atualização |

### USERS_PROFILES_SCHOOLS (Relacionamento N:N)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| userId | int | FK - Usuário |
| profileId | int | FK - Perfil |
| schoolId | int | FK - Escola |
| approvedAt | datetime | Data de aprovação |

## Diagrama de Classes

```mermaid
classDiagram
    class User {
        +int id
        +string name
        +string email
        +string phone
        +string passwordHash
        +int subjectId
        +getProfile() Profile
    }
    
    class Profile {
        +int id
        +string name
        +string description
    }
    
    class School {
        +int id
        +string name
        +getClasses() Class[]
    }
    
    class Class {
        +int id
        +int schoolId
        +int subjectId
        +int dayOfWeek
        +string startTime
        +string endTime
        +boolean available
        +getEnrollment() Enrollment
    }
    
    class Subject {
        +int id
        +string name
    }
    
    class Enrollment {
        +int id
        +int classId
        +int userId
        +enum status
        +datetime enrolledAt
    }
    
    class UserProfileSchool {
        +int userId
        +int profileId
        +int schoolId
    }
    
    User "1" --> "*" UserProfileSchool
    Profile "1" --> "*" UserProfileSchool
    School "1" --> "*" UserProfileSchool
    
    School "1" --> "*" Class
    Subject "1" --> "*" Class
    Class "1" --> "0..1" Enrollment
    User "1" --> "*" Enrollment
```

## Índices e Constraints

```sql
-- Índices para performance
CREATE INDEX idx_classes_school ON classes(schoolId);
CREATE INDEX idx_classes_subject ON classes(subjectId);
CREATE INDEX idx_classes_available ON classes(available);
CREATE INDEX idx_enrollment_class ON enrollment_requests(classId);
CREATE INDEX idx_enrollment_status ON enrollment_requests(status);
CREATE INDEX idx_users_email ON users(email);

-- Constraints
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE schools ADD CONSTRAINT unique_name UNIQUE (name);
```

## Migrations

```bash
# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção
npx prisma migrate deploy

# Resetar banco de dados
npx prisma migrate reset
```

## Prisma Studio

Para visualizar e editar dados diretamente:

```bash
npx prisma studio
```

Isso abre uma interface web em `http://localhost:5555` para gerenciar os dados.