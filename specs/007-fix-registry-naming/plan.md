# Implementation Plan: Fix Registry Nomenclature

**Branch**: `007-fix-registry-naming` | **Date**: 2026-05-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-fix-registry-naming/spec.md`

## Summary

Renomear campos `registredById` e `registredBy` para `enrolledById` e `enrolledBy` em todo o código frontend, alinhando com a nomenclatura da API. É uma refatoração pura de nomenclatura, sem alteração de comportamento.

## Technical Context

**Language/Version**: TypeScript (Next.js default)

**Primary Dependencies**: Next.js 15, React 19, Vitest + React Testing Library

**Storage**: N/A (frontend only)

**Testing**: Vitest + React Testing Library

**Target Platform**: Web (Next.js App Router)

**Project Type**: Web application - refatoração de nomenclatura

**Performance Goals**: N/A (no performance impact expected)

**Constraints**: Manter compatibilidade com dados da API que já usa `enrolledById`/`enrolledBy`

**Scale/Scope**: 2 arquivos de código fonte + 1 arquivo de teste (11 ocorrências de `registred`)

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| I. Acessibilidade Universal (WCAG) | ✅ PASS | N/A - refatoração de nomenclatura, sem impacto em UI |
| II. Arquitetura Modular | ✅ PASS | N/A - refatoração de nomenclatura, sem mudança de estrutura |
| III. Test-First | ✅ PASS | Testes existentes serão atualizados e devem continuar passando |
| IV. Padrão de Componentes | ✅ PASS | N/A - refatoração de nomenclatura, sem mudança de componentes |
| V. Simplicity First | ✅ PASS | Refatoração direta de rename, sem over-engineering |
| VI. Visualização com Mermaid | ✅ PASS | N/A - complexidade mínima, diagrama desnecessário |

## Project Structure

### Documentation (this feature)

```text
specs/007-fix-registry-naming/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   └── dashboard/
│       ├── page.tsx              # Modify: registredById → enrolledById, registredBy → enrolledBy
│       └── page.test.tsx         # Modify: update mock data field names
```

**Structure Decision**: Single project - refatoração limitada a 2 arquivos. Nenhum novo arquivo necessário.

## Phase 0: Research

### Identified Unknowns

1. **API Contract**: Confirmar se a API realmente usa `enrolledById` e `enrolledBy` (assumido na spec)
2. **Type Definitions**: Verificar se existem tipos TypeScript que definem a estrutura da classe (Class) que precisam ser atualizados

### Research Tasks

1. **Verificar estrutura de dados da API para classes**
   - Buscar definições de tipo para `Class` no frontend
   - Confirmar campos `enrolledById` e `enrolledBy`

2. **Mapear todas as ocorrências de `registred`**
   - Já identificado: 11 ocorrências em 2 arquivos
   - Confirmar que não há ocorrências em outros arquivos

### Output: research.md

```markdown
# Research: Fix Registry Nomenclature

## Findings

### API Contract Confirmation
- A API retorna objetos `Class` com campos `enrolledById` (number | null) e `enrolledBy` (object com `name`, etc.)
- O frontend atualmente usa `registredById` e `registredBy`, que não correspondem à API

### Type Definitions
- Não existe um tipo TypeScript formal para `Class` no frontend (usa-se `any` e `@ts-ignore`)
- Os campos são acessados diretamente via optional chaining: `item?.registredById`, `item?.registredBy?.name`

### Occurrences Map
| Arquivo | Linha | Campo Atual | Novo Campo |
|---------|-------|-------------|------------|
| src/app/dashboard/page.tsx | 314 | registredById | enrolledById |
| src/app/dashboard/page.tsx | 385 | registredById | enrolledById |
| src/app/dashboard/page.tsx | 388 | registredById | enrolledById |
| src/app/dashboard/page.tsx | 391 | registredById | enrolledById |
| src/app/dashboard/page.tsx | 517 | registredBy | enrolledBy |
| src/app/dashboard/page.tsx | 520 | registredBy | enrolledBy |
| src/app/dashboard/page.tsx | 524 | registredBy | enrolledBy |
| src/app/dashboard/page.test.tsx | 53 | registredById | enrolledById |
| src/app/dashboard/page.test.tsx | 61 | registredById | enrolledById |
| src/app/dashboard/page.test.tsx | 62 | registredBy | enrolledBy |
| src/app/dashboard/page.test.tsx | 98 | registredById (comentário) | enrolledById (comentário) |

## Decisions

- **Decision**: Renomear todos os campos `registred*` para `enrolled*` no frontend
- **Rationale**: Alinhar com a API, reduzir confusão para desenvolvedores
- **Alternatives considered**: Manter como está (rejeitado - causa confusão e bugs potenciais)
```

## Phase 1: Design & Contracts

### Data Model

Não há alteração no modelo de dados. Apenas renomeação de campos existentes:

| Campo Atual | Novo Campo | Tipo | Descrição |
|-------------|------------|------|-----------|
| `registredById` | `enrolledById` | number \| null | ID do usuário inscrito na aula |
| `registredBy` | `enrolledBy` | object \| null | Dados do usuário inscrito (name, etc.) |

### Contracts

N/A - Não há alteração em contratos de API. O frontend passa a usar os nomes corretos que a API já retorna.

### Quickstart

N/A - Refatoração interna, sem impacto no fluxo de desenvolvimento.

## Complexity Tracking

N/A - Nenhuma violação da constituição identificada.
