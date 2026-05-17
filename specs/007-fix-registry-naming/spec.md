# Feature Specification: Fix Registry Nomenclature

**Feature Branch**: `007-fix-registry-naming`

**Created**: 2026-05-17

**Status**: Draft

**Input**: User description: "O frontend usa `registredById` mas a API usa `enrolledById`. Precisa padronizar."

## User Scenarios & Testing

### User Story 1 - Standardize Enrollment Field Names (Priority: P1)

Desenvolvedor atualiza o código frontend para usar os nomes de campo corretos (`enrolledById`, `enrolledBy`) que correspondem à API, em vez dos nomes incorretos atuais (`registredById`, `registredBy`).

**Why this priority**: A inconsistência entre frontend e API causa confusão, dificulta manutenção e pode levar a bugs quando novos desenvolvedores assumem o código. É uma correção de foundation que impacta todas as features que lidam com aulas e candidaturas.

**Independent Test**: Após a alteração, todas as referências a `registredById` e `registredBy` no código frontend são substituídas por `enrolledById` e `enrolledBy`, e a aplicação continua funcionando corretamente (build passa, testes passam).

**Acceptance Scenarios**:

1. **Given** o código frontend usa `registredById` e `registredBy`, **When** a padronização é aplicada, **Then** todas as ocorrências são substituídas por `enrolledById` e `enrolledBy`
2. **Given** a padronização foi aplicada, **When** o build é executado, **Then** não há erros de compilação
3. **Given** a padronização foi aplicada, **When** os testes são executados, **Then** todos os testes passam

---

### Edge Cases

- Campos `registredById` e `registredBy` em dados mockados de testes também devem ser atualizados
- Comentários no código que mencionam `registred` devem ser atualizados para `enrolled`

## Requirements

### Functional Requirements

- **FR-001**: O sistema DEVE usar `enrolledById` em vez de `registredById` para identificar o usuário que se inscreveu em uma aula
- **FR-002**: O sistema DEVE usar `enrolledBy` em vez de `registredBy` para acessar os dados do usuário que se inscreveu em uma aula
- **FR-003**: A substituição DEVE ser aplicada em todos os arquivos do frontend que referenciam esses campos
- **FR-004**: Os testes DEVE serem atualizados para usar os novos nomes de campo nos dados mockados

### Key Entities

- **Class (Aula)**: Entidade que representa uma aula. O campo `enrolledById` indica qual usuário se inscreveu na aula. O campo `enrolledBy` contém os dados do usuário inscrito.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Zero ocorrências de `registred` no código fonte (excluindo node_modules e arquivos de build)
- **SC-002**: Build passa sem erros após a alteração
- **SC-003**: Todos os testes existentes passam após a alteração

## Assumptions

- A API já usa `enrolledById` e `enrolledBy` como nomes de campo corretos
- A mudança é puramente de nomenclatura no frontend, sem alteração de comportamento
- Não há necessidade de migração de dados no backend
