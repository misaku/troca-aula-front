# Quickstart: Sistema de Candidaturas de Aulas

## Visão Geral

Esta feature implementa o fluxo formal de candidaturas onde professores se candidatam a aulas disponíveis e diretores/admins aprovam ou rejeitam.

## Estrutura de Diretórios

```
src/
├── hooks/
│   ├── useEnrollment.ts       # Mutations (create, cancel, approve, reject)
│   └── useEnrollments.ts      # Listagens
├── services/
│   └── enrollment.service.tsx # Chamadas API
├── types/
│   └── enrollment.ts          # Type definitions
├── app/
│   ├── minhas-aulas/         # NOVA ROTA (professor)
│   │   └── page.tsx          # Minhas candidaturas
│   └── classes/
│       └── page.tsx          #现有 - adicionar botão candidatar
```

## Comandos para Executar

```bash
# Development
pnpm dev

# Acessar como Professor
# http://localhost:3000/classes (aulas disponíveis)
# http://localhost:3000/minhas-aulas

# Acessar como Diretor/Admin
# http://localhost:3000/dashboard (aba Candidaturas)
```

## Fluxo de Implementação

### 1. Service Layer (enrollment.service.tsx)

- GET /enrollment-requests (listar com filtros)
- POST /enrollment-requests (criar candidatura)
- PATCH /enrollment-requests/:id/approve
- PATCH /enrollment-requests/:id/reject
- PATCH /enrollment-requests/:id/cancel

### 2. Hooks

- useEnrollment: para mutations
- useEnrollments: para listagens por perfil

### 3. Componentes UI

- ClassCard com botão "Candidatar-se"
- EnrollmentList (tabs por status)
- ApproveButton / RejectButton
- CancelButton

## Libraries Utilizadas

- `styled-components` - Estilização
- `react-hook-form` - Formulários
- `react-toastify` - Feedback
- `api.service.tsx` - Requisições HTTP
- `useUserHook` - Dados do usuário

## Testes

```bash
pnpm test
pnpm test:coverage
```

## Checklist de Implementação

- [ ] enrollment.service.tsx com todos os endpoints
- [ ] useEnrollment hook
- [ ] useEnrollments hook
- [ ] Botão "Candidatar-se" na lista de aulas
- [ ] Página Minhas Aulas com lista de candidaturas
- [ ] Aba "Candidaturas" no dashboard (diretor/admin)
- [ ] Funcionalidade Aprovar com PATCH /approve
- [ ] Funcionalidade Rejeitar com PATCH /reject (motivo opcional)
- [ ] Funcionalidade Cancelar (professor)
- [ ] Toast notifications
- [ ] Validações de backend exibidas
- [ ] WCAG 2.1 compliance

## Referências

- Especificação: [spec.md](./spec.md)
- Constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md)