# Roadmap - Próximos Passos

## Visão de Curto Prazo (1-3 meses)

### Sprint 1-2: Finalizar Integração Gov.br

```mermaid
gantt
    title Sprint 1-2: Integração Gov.br
    dateFormat YYYY-MM-DD
    
    section API
    Criar endpoint auth/govbr :done, 2026-05-20, 5d
    Integrar OAuth2 :active, 2026-05-25, 7d
    
    section Frontend
    Implementar callback :2026-06-01, 3d
    Testes de integração :2026-06-04, 5d
```

**Tarefas**:
- [ ] Configurar OAuth2/OpenID Connect
- [ ] Criar rota de callback
- [ ] Integrar botão Gov.br ao fluxo de login
- [ ] Testar integração completa
- [ ] Documentar configuração

### Sprint 3-4: Controle de Teto

```mermaid
flowchart LR
    A[Professor<br/>candidata] --> B{Verificar<br/>teto}
    B -->|Abaixo limite| C[Permitir]
    B -->|No limite| D[Bloquear]
    C --> E[Atualizar<br/>contador]
    D --> F[Mostrar<br/>erro]
    
    style B fill:#e3f2fd
    style C fill:#e8f5e9
    style D fill:#ffcdd2
```

**Tarefas**:
- [ ] Criar lógica de contagem de substituições
- [ ] Implementar limite configurável por escola
- [ ] Adicionar alertas quando próximo do limite
- [ ] Criar endpoint para consultar saldo
- [ ] Exibir saldo no dashboard do professor

## Visão de Médio Prazo (3-6 meses)

### Melhorias de UX/UI

**Tarefas**:
- [ ] Criar biblioteca de componentes
- [ ] Implementar Skeleton Loading
- [ ] Adicionar Error Boundaries
- [ ] Melhorar tratamento de erros
- [ ] Adicionar animações de transição

### Sistema de Notificações

```mermaid
flowchart TB
    subgraph Sistema
        A[Nova aula vaga] --> B[Backend]
        B --> C[Service Push]
        C --> D{Usuário<br/>subscreveu?}
        D -->|Sim| E[Notificação]
        D -->|Não| F[Ignorar]
        E --> G[Email/Push]
    end
```

**Tarefas**:
- [ ] Implementar WebSocket para tempo real
- [ ] Adicionar sistema de email
- [ ] Criar centro de notificações no UI
- [ ] Permitir filtros de notificação

### Expansão Mobile

```mermaid
graph LR
    A[Backend API] --> B[React Native App]
    B --> C[App Stores]
    
    style A fill:#e3f2fd
    style B fill:#e8f5e9
```

**Tarefas**:
- [ ] Criar projeto React Native
- [ ] Implementar autenticação Gov.br
- [ ] Exibir lista de vagas
- [ ] Adicionar push notifications
- [ ] Publicar nas stores

## Visão de Longo Prazo (6-12 meses)

### Relatórios e Analytics

- Dashboard administrativo com estatísticas
- Relatórios de ocupação de aulas
- Métricas de satisfação de usuários
- Exportação de dados (PDF/Excel)

### Integração IoT

```mermaid
flowchart LR
    subgraph IoT
        A[Sensor<br/>Presença] --> B[API Cloud]
        B --> C[Valida<br/>presença]
        C --> D[Baixa<br/>automática]
    end
    
    D --> E[Registro<br/>automático]
    
    style A fill:#fff3e0
    style D fill:#e8f5e9
```

- Prova de conceito com sensores RFID
- Validação automática de presença
- Registros em tempo real

### Sistema Multi-Escola

- Gestão de múltiplas escolas
- Permissões por papel (admin global vs local)
- Dashboard consolidado

## Backlog Técnico

### Testes

| Prioridade | Item |
|------------|------|
| Alta | Tests para auth middleware |
| Alta | Tests para dashboard |
| Média | Tests para useUserHook |
| Média | Integração com MSW |
| Baixa | Testes de componente |

### Documentação

- [x] README.md (básico)
- [x] docs/ (iniciada)
- [ ] README.md completo
- [ ] Contribuiting guide
- [ ] Wiki do projeto

### Qualidade de Código

- [ ] Remover todos `@ts-ignore`
- [ ] Adicionar TypeScript strict mode
- [ ] Criar custom hooks para lógica reutilizável
- [ ] Implementar Error Boundaries

## Priorização

```mermaid
quadrantChart
    title Matriz de Priorização
    x-axis Baixa Complexidade --> Alta Complexidade
    y-axis Baixa Impacto --> Alto Impacto
    
    "Integração Gov.br": [0.9, 0.9]
    "Controle de Teto": [0.7, 0.8]
    "Testes": [0.5, 0.7]
    "Notificações": [0.6, 0.6]
    "Mobile": [0.8, 0.5]
    "Relatórios": [0.4, 0.5]
    "IoT POC": [0.3, 0.3]
```

## Responsabilidades

| Área | Responsável |
|------|-------------|
| Frontend | Equipe atual |
| Backend | Equipe backend |
| Infraestrutura | DevOps |
| Design/UX | UI/UX Designer |
| Documentação | Todos |

## Como Contribuir

1. Verificar Issues no GitHub
2. Criar branch seguindo padrão `###-descricao`
3. Implementar seguindo Constitution
4. Escrever testes primeiro
5. Criar PR com description completa

## Referências

- [Constitution](../intro/constitution.md)
- [Tech Stack](../tech/tech-stack.md)
- [Arquitetura](../tech/architecture.md)
- [Estado Atual](./current-status.md)