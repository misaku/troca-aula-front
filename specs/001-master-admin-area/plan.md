# Implementation Plan: Área Administrativa Master

**Branch**: `fix/env` | **Date**: 2026-05-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-master-admin-area/spec.md`

## Summary

Desenvolver uma área administrativa para o usuário Master gerenciar escolas, diretores e administradores do sistema Troca-Aula. A implementação segue os padrões existentes do projeto (Next.js 15, styled-components, react-hook-form) e a Constituição do projeto.

## Technical Context

**Language/Version**: TypeScript 5.x

**Primary Dependencies**: 
- Next.js 15 (App Router)
- React 19
- styled-components 6.x
- react-hook-form + yup
- Axios (api.service.tsx existente)
- react-toastify
- date-fns

**Storage**: N/A (Frontend apenas, consome API REST)

**Testing**: Vitest + React Testing Library (já configurados no projeto)

**Target Platform**: Web (navegadores modernos)

**Project Type**: Web Application (Next.js 15)

**Performance Goals**: 
- Tempo de carregamento da página < 2 segundos
- Feedback de ações < 1 segundo

**Constraints**: 
- Seguir padrão de componentes da Constitution (service/hook/view/style separados)
- WCAG 2.1 para acessibilidade
- Test-first para funcionalidades críticas

**Scale/Scope**: 
- 4 páginas principais (dashboard, escolas, diretores, administradores)
- Forms para create/edit
- Tables para listagem

## Constitution Check

| Princípio | Status | Observação |
|----------|--------|-------------|
| I. Acessibilidade WCAG | ✅ Pass | Elementos de interface devem seguir padrões |
| II. Arquitetura Modular | ✅ Pass | Cada feature terá service/hook/view/style |
| III. Test-First | ✅ Pass | Testes para funcionalidades críticas |
| IV. Padrão Componentes | ✅ Pass | Usar styled-components, PascalCase |
| V. Simplicity First | ✅ Pass | Começar simples, iterar se necessário |
| VI. Mermaid | ✅ Pass | Diagramas incluídos no spec e plan |

## Project Structure

### Documentation (this feature)

```text
specs/001-master-admin-area/
├── plan.md              # This file
├── research.md         # Phase 0 output ✓
├── data-model.md       # Phase 1 output ✓
├── quickstart.md       # Phase 1 output ✓
├── contracts/          # Phase 1 output (internal interfaces)
└── tasks.md            # Phase 2 (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Web application (detected: frontend)
src/
├── app/
│   ├── master/                    # NOVA ROTA
│   │   ├── page.tsx               # Layout principal
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Dashboard com estatísticas
│   │   ├── escolas/
│   │   │   ├── page.tsx           # Lista e criar escolas
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Editar escola
│   │   ├── diretores/
│   │   │   └── page.tsx           # Lista e criar diretores
│   │   └── administradores/
│   │       └── page.tsx           # Lista e criar administradores
│   ├── components/                # Componentes compartilhados
│   ├── services/                  # Services (futuro: master.service.ts)
│   └── hooks/                     # Hooks (futuro: useMaster.ts)
│
├── api.service.tsx               # já existe
└── user/
    └── useUserHook.tsx           # já existe (retorna profileId)

tests/
├── unit/
│   └── master/                   # Testes unitários
└── integration/
    └── master/                   # Testes de integração
```

**Structure Decision**: Web application com Next.js App Router. Nova pasta `master` dentro de `app/` seguindo convenção do framework. Components compartilhados reutilizados de `/app/components/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Nenhuma | N/A | N/A |

---

## Research Summary

Research completado com sucesso. Decisões de implementação baseadas nas tecnologias já utilizadas no projeto:

- Next.js 15 App Router
- styled-components para estilos
- react-hook-form + yup para validação
- api.service.tsx existente para requisições HTTP
- useUserHook para dados do usuário logado

**Sem NEEDS CLARIFICATION** - todas as decisões tomadas baseadas em padrões do projeto.

---

## Arquivos Gerados

1. **research.md** - Decisões técnicas e alternativas consideradas
2. **data-model.md** - Entidades e interfaces de API
3. **quickstart.md** - Guia rápido de implementação

---

## Próximos Passos

Executar `/speckit.tasks` para gerar as tarefas de implementação, ou prosseguir diretamente para desenvolvimento.

**Nota**: Esta é uma feature de frontend que consome API existente do backend. Não há necessidade de contracts externos para sistemas terceiros.