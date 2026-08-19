# Quickstart: Área Administrativa Master

## Visão Geral

Esta feature adiciona uma área administrativa para o usuário Master gerenciar escolas, diretores e administradores.

## Estrutura de Diretórios

```
src/app/master/
├── page.tsx              # Layout principal
├── dashboard/
│   └── page.tsx         # Dashboard com estatísticas
├── escolas/
│   ├── page.tsx         # Lista de escolas + criar/editar
│   └── [id]/
│       └── page.tsx      # Editar escola
├── diretores/
│   └── page.tsx         # Lista de diretores + criar
└── administradores/
    └── page.tsx         # Lista de administradores + criar
```

## Comandos para Executar

```bash
# Development
pnpm dev

# Acessar área administrativa
# Após login como Master, acessar: http://localhost:3000/master
```

## Fluxo de Implementação

### 1. MasterLayout (src/app/master/page.tsx)

- Verificar se `user.profileId === 1`
- Se não for Master, redirecionar para /dashboard
- Renderizar sidebar com menu
- Renderizar children

### 2. Dashboard (src/app/master/dashboard/page.tsx)

- Buscar dados: GET /schools, GET /classes?available=true, GET /enrollment-requests?status=APPROVED
- Exibir 3 StatCards

### 3. Escolas (src/app/master/escolas/page.tsx)

- GET /schools para listar
- POST /schools para criar
- PATCH /schools/:id para editar
- DELETE /schools/:id para excluir (com modal de confirmação)

### 4. Diretores (src/app/master/diretores/page.tsx)

- GET /users?profileId=2 para listar
- POST /users para criar (profileId=2)

### 5. Administradores (src/app/master/administradores/page.tsx)

- GET /users?profileId=3 para listar
- POST /users para criar (profileId=3)

## Libraries Utilizadas

- `styled-components` - Estilização
- `react-hook-form` + `yup` - Formulários
- `react-toastify` - Feedback
- `api.service.tsx` - Requisições HTTP
- `useUserHook` - Dados do usuário

## Testes

```bash
# Executar testes
pnpm test

# Cobertura
pnpm test:coverage
```

## Checklist de Implementação

- [ ] MasterLayout com proteção de rota
- [ ] Sidebar com navegação
- [ ] Dashboard com 3 cards
- [ ] Lista de escolas (tabela)
- [ ] Criar escola (modal/form)
- [ ] Editar escola (modal/form)
- [ ] Excluir escola (modal confirmação)
- [ ] Lista de diretores
- [ ] Criar diretor
- [ ] Desvincular diretor
- [ ] Lista de administradores
- [ ] Criar administrador
- [ ] Desvincular administrador
- [ ] Validação de formulários
- [ ] Feedback toast em ações
- [ ] Tratamento de erros

## Referências

- Especificação: [spec.md](./spec.md)
- Constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md)
- API Service: [src/api.service.tsx](../../../src/api.service.tsx)
- Hook de usuário: [src/user/useUserHook.tsx](../../../src/user/useUserHook.tsx)