# Arquitetura do Projeto

## Visão Geral da Arquitetura

```mermaid
flowchart TB
    subgraph Client["Frontend - Next.js 15"]
        UI[Interface do Usuário]
        State[Gerenciamento de Estado]
        API[Axios Client]
    end
    
    subgraph NextAPI["Next.js API Routes"]
        Auth[Auth API]
        Classes[Classes API]
    end
    
    subgraph Backend["Backend - NestJS"]
        Controller[Controllers]
        Service[Services]
        DB[(PostgreSQL)]
    end
    
    subgraph AuthExt["Autenticação Externa"]
        GOVBR[Gov.br API]
    end
    
    UI --> State
    State --> API
    API --> NextAPI
    NextAPI --> Backend
    Backend --> DB
    Backend --> GOVBR
```

## Arquitetura Backend - Clean Architecture

```mermaid
graph TB
    subgraph Camada_de_Apresentacao
        C[Controllers]
    end
    
    subgraph Camada_de_Aplicacao
        S[Services]
        D[DTOs]
    end
    
    subgraph Camada_de_Dados
        R[Repositories]
        E[Entities]
    end
    
    subgraph Infraestrutura
        P[Prisma<br/>PostgreSQL]
        A[Auth JWT]
    end
    
    C --> S
    S --> D
    S --> R
    R --> E
    R --> P
    C --> A
    
    style C fill:#e1f5fe
    style S fill:#e8f5e9
    style P fill:#fff3e0
```

## Estrutura de Módulos Backend

```mermaid
graph TD
    subgraph "src/modules/"
        Auth[auth/]
        Users[users/]
        Schools[schools/]
        Subjects[subjects/]
        Classes[classes/]
        Profile[profile/]
        Enrollment[enrollment-requests/]
    end
    
    subgraph "Recursos Compartilhados"
        Config[config/]
        Prisma[prisma.service.ts]
    end
    
    Auth -.-> Prisma
    Users -.-> Prisma
    Schools -.-> Prisma
    Subjects -.-> Prisma
    Classes -.-> Prisma
    Enrollment -.-> Prisma
    
    style Auth fill:#e3f2fd
    style Users fill:#e8f5e9
    style Classes fill:#fff3e0
    style Enrollment fill:#fce4ec
```

## Arquitetura de Deployment

```mermaid
graph TB
    subgraph "Desenvolvimento"
        DEV_PC[Desktop<br/>Desenvolvedor]
        DEV_DB[(Docker<br/>PostgreSQL local)]
        DEV_PN[pnpm<br/>next dev]
    end
    
    subgraph "Build & Test"
        GH[GitHub<br/>Actions]
        TEST[Jest<br/>Tests]
        LINT[ESLint]
    end
    
    subgraph "Produção (Cloud)"
        NGINX[NGINX<br/>Reverse Proxy]
        APP[Container<br/>NestJS]
        CLOUD_DB[(Cloud<br/>PostgreSQL)]
        GOVBR[Conta<br/>Gov.br]
    end
    
    DEV_PC --> DEV_PN
    DEV_PN --> DEV_DB
    
    DEV_PC -->|"git push"| GH
    GH --> TEST
    GH --> LINT
    GH -->|"deploy"| NGINX
    
    NGINX --> APP
    APP --> CLOUD_DB
    APP -.->|"OAuth2"| GOVBR
    
    style GH fill:#333,color:#fff
    style NGINX fill:#009639,color:#fff
    style APP fill:#0078D4,color:#fff
```

## Fluxo de Dados

### Fluxo de Login

```mermaid
sequenceDiagram
    participant User as Usuário
    participant UI as Frontend
    participant API as Next.js API
    participant Auth as Backend NestJS
    participant DB as PostgreSQL
    participant GOV as Gov.br API

    User->>UI: Preenche credenciais
    UI->>API: POST /api/auth/login
    API->>Auth: Encaminha requisição
    Auth->>GOVBR: Valida credenciais Gov.br
    GOVBR-->>Auth: Token válido
    Auth->>DB: Verifica usuário
    DB-->>Auth: Dados do usuário
    Auth-->>API: Token JWT
    API-->>UI: Login bem-sucedido
    UI->>User: Redireciona para Dashboard
```

### Fluxo de Criação de Aula Vaga

```mermaid
sequenceDiagram
    participant Admin as Administrador
    participant Dashboard as Página Dashboard
    participant API as API Route
    participant Backend as Backend
    participant DB as Banco de Dados

    Admin->>Dashboard: Preenche formulário
    Dashboard->>API: POST /api/classes
    API->>Backend: Encaminha dados
    Backend->>DB: Cria registro
    DB-->>Backend: Confirmação
    Backend-->>API: Sucesso
    API-->>Dashboard: Aula criada
    Dashboard->>Admin: Exibe sucesso (toast)
```

### Fluxo de Candidatura a Aula

```mermaid
flowchart LR
    A[Professor visualiza<br/>aulas disponíveis] --> B{Seleciona aula}
    B -->|Clica aceitar| C[Envia POST<br/>/classes/:id]
    C --> D[Backend valida<br/>teto de aulas]
    D -->|Dentro do limite| E[Atualiza registro<br/>registredById]
    D -->|Acima do limite| F[Bloqueia e retorna<br/>erro]
    E --> G[Aula marcada como<br/>aceita]
    G --> H[Admin aprova]
    H --> I[Substituição<br/>confirmada]
```

## Arquitetura de Componentes

### Estrutura de Arquivos

```mermaid
graph TD
    A[src/] --> B[app/]
    A --> C[components/]
    A --> D[user/]
    A --> E[lib/]
    
    B --> F[page.tsx - Login]
    B --> G[dashboard/page.tsx]
    B --> H[cadastro/page.tsx]
    B --> I[components/Logo.tsx]
    
    C --> J[BotaoGovBr.tsx]
    
    D --> K[useUserHook.tsx]
    D --> L[user.types.ts]
    
    E --> M[registry.tsx]
    
    style A fill:#e3f2fd
    style B fill:#e8f5e9
    style C fill:#fff3e0
```

### Padrão Service-Hook-View

```mermaid
flowchart LR
    subgraph Service["Service Layer"]
        S[api.service.tsx]
    end
    
    subgraph Hook["Hook/Controller"]
        H[useUserHook.tsx]
    end
    
    subgraph View["View Layer"]
        V[page.tsx]
    end
    
    S -->|HTTP requests| H
    H -->|state/handlers| V
    V -->|user actions| H
    H -->|api calls| S
```

## Estados da Aplicação

### Máquina de Estados - Aula

```mermaid
stateDiagram-v2
    [*] --> Disponivel
    Disponivel --> Candidata: Professor aceita
    Candidata --> Aprovada: Admin aprova
    Candidata --> Rejeitada: Admin rejeita
    Rejeitada --> Disponivel: Volta para disponíveis
    Aprovada --> Concluida: Aula realizada
    Concluida --> [*]
```

### Fluxo de Usuário

```mermaid
stateDiagram-v2
    [*] --> Login
    Login --> Cadastro: Não tem conta
    Login --> Dashboard: Credenciais válidas
    Cadastro --> Login: Cadastro realizado
    Dashboard --> Logout: Usuário sai
    Logout --> [*]
```

## Middleware e Segurança

```mermaid
flowchart TB
    Request[Requisição] --> Middle[Middleware]
    
    subgraph Middle["Middleware de Autenticação"]
        M1[Verifica cookie JWT]
        M2[Decodifica token]
        M3[Valida expiração]
    end
    
    Middle -->|Válido| Route[Rota específica]
    Middle -->|Inválido| Redirect[Redirect /]
    
    Route --> Response[Resposta]
    Redirect --> LoginPage[Page /]
```

## Máquina de Estados

### Ciclo de Vida de uma Candidatura

```mermaid
stateDiagram-v2
    [*] --> PENDING
    
    PENDING --> APPROVED: Diretor aprova
    PENDING --> REJECTED: Diretor rejeita
    PENDING --> CANCELLED: Candidato cancela
    PENDING --> CANCELLED: Criador cancela
    
    APPROVED --> [*]
    REJECTED --> [*]
    CANCELLED --> [*]
    
    note right of PENDING: Aguardando<br/>aprovação<br/>do diretor
    note right of APPROVED: Substituição<br/>oficializada
    note right of REJECTED: Candidato<br/>notificado
    note right of CANCELLED: Vaga volta<br/>a estar disponível
```

### Ciclo de Vida de uma Aula Vaga

```mermaid
stateDiagram-v2
    [*] --> ACTIVE
    
    ACTIVE --> FILLED: Substituição aprovada
    ACTIVE --> CANCELLED: Cancelada
    ACTIVE --> EXPIRED: Sem candidatos
    
    FILLED --> [*]
    CANCELLED --> [*]
    EXPIRED --> [*]
    
    note right of ACTIVE: Visível para<br/>candidaturas
    note right of FILLED: Professor<br/>designado
    note right of CANCELLED: Removida pelo<br/>criador/admin
    note right of EXPIRED:超过了 janela<br/>de tempo
```

## Validação de Acesso por Perfil

```mermaid
flowchart TD
    subgraph "Validação de Acesso"
        INICIO[Acessa o sistema] --> LOGIN{Tem conta<br/>Gov.br?}
        LOGIN -->|Não| CRIAR[Redirect para<br/>Gov.br]
        LOGIN -->|Sim| VALIDAR{Token<br/>válido?}
        VALIDAR -->|Não| REFRESH[Renovar token]
        VALIDAR -->|Sim| PERFIL{Checar perfil<br/>do usuário}
    end
    
    subgraph "Ações por Perfil"
        PERFIL -->|DIRETOR| Acoes_D[Todas as ações]
        PERFIL -->|AUXILIAR_ADMIN| Acoes_AA[Cria/Edita/Aprova]
        PERFIL -->|PROFESSOR| Acoes_P[Busca/Candida/Historico]
    end
    
    style LOGIN fill:#2196F3,color:#fff
    style VALIDAR fill:#4CAF50,color:#fff
    style PERFIL fill:#FF9800,color:#fff
    style Acoes_D fill:#9C27B0,color:#fff
    style Acoes_AA fill:#673AB7,color:#fff
    style Acoes_P fill:#3F51B5,color:#fff
```

## Validação de Candidatura

```mermaid
flowchart TB
    START[Candidatura recebida] --> V1{Professor<br/>habilitado?}
    V1 -->|Não| E1[Bloqueia + Motivo]
    V1 -->|Sim| V2{Horário<br/>livre?}
    V2 -->|Não| E2[Bloqueia + Conflito]
    V2 -->|Sim| V3{Limite<br/>atingido?}
    V3 -->|Sim| E3[Bloqueia + Limite OK]
    V3 -->|Não| V4{Aula<br/>disponível?}
    V4 -->|Não| E4[Bloqueia + Ocupada]
    V4 -->|Sim| SUCESSO[Cria registro<br/>PENDING]
    
    style V1 fill:#FF9800
    style V2 fill:#FF9800
    style V3 fill:#FF9800
    style V4 fill:#FF9800
    style SUCESSO fill:#4CAF50,color:#fff
    style E1 fill:#f44336,color:#fff
    style E2 fill:#f44336,color:#fff
    style E3 fill:#f44336,color:#fff
    style E4 fill:#f44336,color:#fff
```

## Estrutura de API

### Endpoints Implementados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login de usuário |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Dados do usuário atual |
| POST | `/api/classes` | Criar aula vaga |
| GET | `/api/classes` | Listar aulas |
| PATCH | `/api/classes/:id` | Aceitar/Aprovar aula |
| DELETE | `/api/classes/:id` | Remover aula |
| GET | `/api/schools/:id` | Dados da escola |
| GET | `/api/subjects` | Listar disciplinas |

## Styled Components - Estrutura de Estilos

```mermaid
graph LR
    subgraph Estilo["Styled Components"]
        E1[Variáveis de tema]
        E2[Componentesstyled]
        E3[Global styles]
    end
    
    subgraph Exemplo["Exemplo de Uso"]
        C1[const Button = styled.button`...`]
    end
    
    E1 --> E2
    E2 --> C1
```

## Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
# URL da API backend
```

## Performance e Otimizações

### Estratégias

1. **Server-Side Rendering**: Next.js App Router
2. **Code Splitting**: Automatico pelo Next.js
3. **Image Optimization**: Next.js Image component
4. **Memoization**: useMemo, useCallback
5. **Lazy Loading**: Rotas dinamicas

### Limitações Atuais

- Sem cache de API implementado
- Sem bundle analysis
- Sem optimizações de build