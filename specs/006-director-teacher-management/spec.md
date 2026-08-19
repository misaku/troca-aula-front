# Feature Specification: Director Teacher Management

**Feature Branch**: `006-director-teacher-management`

**Created**: 2026-05-17

**Status**: Draft

**Input**: User description: "A área do Diretor e Admin precisa de funcionalidades adicionais para gestão de professores e visualização de candidaturas."

## User Scenarios & Testing

### User Story 1 - Link Teachers (Priority: P1)

Diretor acessa área de gestão de professores para vincular professores à escola.

**Why this priority**: Funcionalidade essencial para que diretores possam gerenciar equipe pedagógica da escola.

**Independent Test**: Diretor acessa aba de professores, visualiza lista atual, clica em "Vincular Professor", seleciona professor da lista e confirma vínculo.

**Acceptance Scenarios**:

1. **Given** o Diretor está na aba "Professores", **When** visualiza a lista, **Then** vê todos os professores vinculados à escola com nome, email, disciplina e número de substituições
2. **Given** o Diretor clica em "Vincular Professor", **When** abre modal com lista de professores não vinculados, **When** seleciona professor e confirma, **Then** professor aparece na lista de vinculados
3. **Given** professor está vinculado à escola, **When** Diretor clica em "Desvincular", **When** confirma ação, **Then** professor sai da lista de vinculados

---

### User Story 2 - View Enrollment Applications (Priority: P1)

Diretor visualiza lista de candidaturas de professores à escola.

**Why this priority**: Permite ao diretor analisar e approve/reject solicitações de professores que querem lecionar na escola.

**Independent Test**: Diretor acessa área de candidaturas, visualiza lista de pedidos pendentes, clica em um para ver detalhes e Approve/Reject.

**Acceptance Scenarios**:

1. **Given** o Diretor está na aba de "Candidaturas", **When** acessa a página, **Then** vê lista de candidaturas com status (PENDING, APPROVED, REJECTED)
2. **Given** existem candidaturas pendentes, **When** Diretor filtra por "Pendente", **Then** vê apenas candidaturas aguardando aprovação
3. **Given** Diretor clica em uma candidatura pendente, **When** visualiza detalhes do candidato, **Then** vê nome, email, disciplina que leciona, histórico de substituições
4. **Given** Diretor decide approve/reject, **When** clica no botão correspondente, **Then** candidacy é atualizada e lista é atualizada

---

### User Story 3 - Teacher Details (Priority: P2)

Diretor visualiza informações detalhadas do professor para tomada de decisão.

**Why this priority**: Fornece contexto para o diretor decidir sobre vínculo ou aprovação de candidatura.

**Independent Test**: Ao vincular ou aprobar candidatura, diretor visualiza dados completos do professor.

**Acceptance Scenarios**:

1. **Given** professor está na lista ou candidatura, **When** Diretor visualiza detalhes, **Then** vê nome completo, email, disciplina, total de substituições realizadas
2. **Given** candidato tem histórico de substituições, **When** diretor avalia, **Then** visualiza contagem de substituições como indicador de experiência

---

### Edge Cases

- Professor já vinculado a outra escola tentar se candidatar
- множественные candidaturas do mesmo professor à mesma escola
- Diretor tenta desvincular último professor da escola
- Lista de professores não vinculados está vazia

## Requirements

### Functional Requirements

- **FR-001**: Sistema DEVE listar professores vinculados à escola do diretor logado
- **FR-002**: Sistema DEVE exibir botão para desvincular professor da escola
- **FR-003**: Sistema DEVE exibir botão para vincular novo professor à escola
- **FR-004**: Sistema DEVE apresentar lista de professores não vinculados para seleção
- **FR-005**: Sistema DEVE listar candidaturas da escola com filtro por status
- **FR-006**: Sistema DEVE exibir detalhes do candidato ao seleccionar candidatura
- **FR-007**: Sistema DEVE permitir approve ou reject de candidatura pendente
- **FR-008**: Sistema DEVE atualizar lista após aprovação/rejeição de candidatura
- **FR-009**: Sistema DEVE mostrar dados do professor: nome, email, disciplina, total de substituições

### Key Entities

- **Professor Vinculado**: userId, schoolId, profileId=4, subject, totalSubstitutions
- **Candidatura**: id, userId, schoolId, status (PENDING/APPLIED/REJECTED), appliedAt
- **Professor dados**: name, email, subject.name, totalSubstitutions

## Success Criteria

### Measurable Outcomes

- **SC-001**: Diretor consegue listar todos os professores vinculados em menos de 3 segundos
- **SC-002**: Processo de vincular/desvincular professor completa em menos de 2 segundos
- **SC-003**: Lista de candidaturas carrega com todos os filtros em menos de 3 segundos
- **SC-004**: 95% das ações de approve/reject resultam em atualização imediata da interface

## Assumptions

- Backend já implementa endpoints GET /users?schoolId=X&profileId=4 e similares
- Sistema de autenticação já identifica perfil do usuário (Diretor = profileId 2)
- API de enrollment requests já existe com suporte a filtros por schoolId e status
- O vínculo professor-escola usa tabela intermediária ou campo schoolId na tabela de usuários
- totalSubstitutions é calculado baseado em histórico de substituições aceitas
- O perfil "Professor" no sistema é profileId=4