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
