# Feature Specification: Substitution Limit Display and Enforcement

**Feature Branch**: `[004-substitution-limit]`

**Created**: 2026-05-17

**Status**: Draft

**Input**: User description: "O frontend não exibe o limite de substituições do professor nem trata erros quando atinge o limite."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Substitution Count (Priority: P1)

**Como** professor,
**Eu quero** visualizar quantas substituições já realizei este semestre e qual o limite,
**Para que** eu possa saber se posso me candidatar a mais aulas.

**Why this priority**: O professor precisa saber seu status atual para planejar suas substituições.

**Independent Test**: pode ser testado efetuando login como professor e visualizando o dashboard com o contador de substituições.

**Acceptance Scenarios**:

1. **Given** o professor está logado e a escola tem limite configurado, **When** acessa o dashboard, **Then** vê "X de Y" com o contador e limite
2. **Given** o professor está logado e a escola não tem limite, **When** acessa o dashboard, **Then** vê "Sem limite definido"
3. **Given** o professor atingiu 80% do limite, **When** acessa o dashboard, **Then** vê alerta amarelo "Atenção: X de Y"

---

### User Story 2 - Block Application When Limit Reached (Priority: P1)

**Como** professor,
**Eu quero** que o sistema bloqueie minha candidatura quando atingir o limite de substituições,
**Para que** eu não receba erros da API ao tentar me candidatar.

**Why this priority**: Evita frustração do usuário ao tentar candidatar-se quando já atingiu o limite.

**Independent Test**: pode ser testado efetuando login como professor com limite atingido e tentando candidatar-se.

**Acceptance Scenarios**:

1. **Given** o professor atingiu o limite de substituições, **When** tenta candidatar-se a uma aula, **Then** o sistema exibe toast de erro e não envia a requisição
2. **Given** o professor atingiu o limite, **When** tenta candidatar-se, **Then** o botão "Candidatar-se" está desabilitado

---

### User Story 3 - Handle API Limit Error (Priority: P2)

**Como** professor,
**Eu quero** ver mensagem clara quando a API retornar erro de limite,
**Para que** eu entenda o motivo da rejeição.

**Why this priority**: MELHORA experiência quando o limite é atingido por outros fatores (ex: backend verifica depois).

**Independent Test**: pode ser testado simulando resposta de erro 400 do backend.

**Acceptance Scenarios**:

1. **Given** a API retorna erro 400 com mensagem de limite, **When** o professor tenta candidatar-se, **Then** o sistema exibe toast "Não é possível se candidatar. Limite de substituições atingido para este semestre."
2. **Given** a API retorna erro de limite com o valor do limite, **When** exibe a mensagem, **Then** inclui o número do limite na mensagem

---

### Edge Cases

- O que acontece quando o professor muda de escola no meio do semestre?
- O que acontece quando o limite da escola é alterado durante o semestre?
- O que acontece com professores sem escola vinculada (schoolId = null)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir o contador de substituições no dashboard do professor no formato "X de Y"
- **FR-002**: O sistema DEVE exibir "Sem limite definido" quando a escola não tiver substitutionLimitPerSemester
- **FR-003**: O sistema DEVE exibir alerta amarelo quando o professor atingir 80% do limite
- **FR-004**: O sistema DEVE bloquear o botão de candidatura quando o limite for atingido
- **FR-005**: O sistema DEVE tratar erro 400 da API com mensagem específica de limite
- **FR-006**: O sistema DEVE buscar o limite da escola via GET /schools/:id
- **FR-007**: O sistema DEVE contar as substituições do professor com status APPROVED no semestre atual

### Key Entities

- **Escola (School)**: Atributo: substitutionLimitPerSemester (número ou null)
- **EnrollmentRequest**: Atributos: userId, status (APPROVED/PENDING/REJECTED/CANCELLED), createdAt
- **Semestre**: Período de contagem (início do ano até agora ou sistema de semestre da escola)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Professor consegue visualizar seu contador de substituições no dashboard
- **SC-002**: Sistema bloqueia candidatura quando professor atinge limite
- **SC-003**: Sistema exibe alerta aos 80% do limite
- **SC-004**: 100% dos erros de limite retornados pela API são exibidos com mensagem clara

## Assumptions

- Assume-se que o endpoint GET /schools/:id retorna o campo substitutionLimitPerSemester
- Assume-se que o endpoint GET /enrollment-requests aceita filtro por userId, status e período
- Assume-se que o semestre atual é calculado como "ano atual" (jan-dez)
- Assume-se que o professor tem schoolId vinculado ao seu perfil (já existente)
- Assume-se que styled-components e react-toastify já estão disponíveis