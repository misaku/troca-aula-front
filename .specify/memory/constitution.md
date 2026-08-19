# Troca-Aula Constitution

## Core Principles

### I. Acessibilidade Universal (WCAG)
Toda interface deve ser acessível seguindo diretrizes WCAG 2.1. Isso inclui: navegação por teclado completa, contraste adequado, suporte a leitores de tela, e Labels claros. A acessibilidade não é opcional — é requisito fundamental para garantir inclusão de todos os perfis de usuários.

### II. Arquitetura Modular (Separation of Concerns)
Cada funcionalidade deve seguir a estrutura de arquivos separada: Service (API), Hook (Controller/lógica), Component (View), e Style. Um componente não deve conter tudo no mesmo arquivo. Essa separação garante manutenibilidade e testabilidade.

### III. Test-First (NÃO NEGOCIÁVEL)
Antes de implementar qualquer funcionalidade, os testes devem ser escritos. Segue o ciclo Red-Green-Refactor: teste falha → implementação passa → refatoração. Testes são obrigatória para funcionalidades críticas (autenticação, gestão de vacâncias, controle de teto).

### IV. Padrão de Componentes (Component Standards)
Componentes devem seguir convenção: arquivo de estilo (styled-components), arquivo de lógica (hook), arquivo de estrutura (component). Não colocar estilos inline, usar sempre styled-components. Nomes de componentes em PascalCase.

### V. Simplicity First (YAGNI)
Prefira soluções simples e funcionais sobre soluções complexas perfeitas. "Simples bemfeito é melhor que complexo perfeito." Evite over-engineering. Comece pequeno, itere conforme necessidade.

### VI. Visualização com Mermaid (NÃO NEGOCIÁVEL)
Toda especificação (spec), plano e tasks deve incluir diagramas Mermaid quando a complexidade exigir compreensão de fluxos. Diagramas devem ser usados para: fluxos de usuário, sequências de API, máquinas de estado, e arquitetura de componentes. diagrams como ferramenta de compreensão, não de decoração — devem ajudar na execução.

## Technology Stack

**Frontend**: Next.js 15, React 18+, TypeScript

**Package Manager**: pnpm

**Node Version**: 22.x (gerenciado via nvm)

**Styling**: styled-components

**Testing**: Jest + React Testing Library

**API Client**: Axios com interceptors

**Authentication**: Gov.br API Integration

**Quality**: ESLint, Prettier, commitlint (Conventional Commits)

## Development Workflow

**Arquitetura de Componentes**:
- `*.service.tsx` — chamadas API e integração
- `use*.ts` ou `use*.tsx` — hooks de lógica (controllers)
- `*.tsx` (dentro de pasta) — componente visual
- `*.styles.ts` ou styled no mesmo arquivo — estilização

**Estrutura de Diretórios**:
```
src/
├── app/              # Next.js App Router (páginas e layouts)
│   └── components/  # Componentes de apresentação
├── services/         # Services de API (futuro)
├── hooks/            # Hooks de lógica (futuro)
└── lib/              # Utilitários e configurações
```

**Commits**: Seguir Conventional Commits via commitlint. Exemplos: `feat:`, `fix:`, `docs:`, `refactor:`

**Feature Branch**: `###-feature-name` (issue number + descrição)

## Governance

Esta constituição estabelece as regras fundamentais do projeto. Qualquer alteração deve seguir o processo:
1. Proposta documentada no PR
2. Revisão de código obrigatória
3. Verificação de compliance com princípios

Todas as implementações devem respeitar os princípios de acessibilidade, arquitetura modular e test-first. Complexidade adicional deve ser explicitamente justificada.

**Version**: 1.1.0 | **Ratified**: 2026-05-16 | **Last Amended**: 2026-05-16