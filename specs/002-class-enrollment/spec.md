# Feature Specification: Sistema de Candidaturas de Aulas

**Feature Branch**: `[002-class-enrollment]`

**Created**: 2026-05-17

**Status**: Draft

**Input**: User description: "O frontend atualmente usa PATCH /classes/:id para aceitar/aprovar aulas, mas deveria usar o fluxo correto de enrollment requests. Este é o fluxo formal de candidaturas do sistema."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Candidatar-se a uma Aula (Priority: P1)

**Como** professor,
**Eu quero** me candidatar a uma aula disponível,
**Para que** eu possa ser considerado como substituto.

**Why this priority**: Este é o fluxo principal - sem ele, o sistema de candidaturas não funciona.

**Independent Test**: pode ser testado efetuando login como professor, visualizando aulas disponíveis e clicado em "Candidatar-se". O POST /enrollment-requests deve ser chamado corretamente.

**Acceptance Scenarios**:

1. **Given** o professor está na página de aulas disponíveis, **When** clica no botão "Candidatar-se", **Then** uma requisição POST /enrollment-requests é enviada com classId e toast de sucesso exibido
2. **Given** o professor tenta candidatar-se a uma aula sem disponibilidade, **When** clica em "Candidatar-se", **Then** o sistema exibe erro indicando que a aula não está disponível
3. **Given** o professor atingiu o limite de substituições, **When** tenta candidatar-se, **Then** erro "Limite atingido" é exibido
4. **Given** o professor tem conflito de horário, **When** tenta candidatar-se, **Then** erro "Conflito de horário" é exibido

---

### User Story 2 - Cancelar Minha Candidatura (Priority: P1)

**Como** professor,
**Eu quero** cancelar minha própria candidatura,
**Para que** eu possa desistir de uma aula que não quero mais.

**Why this priority**: O professor precisa ter controle sobre suas candidaturas ativas.

**Independent Test**: pode ser testado na aba "Minhas Aulas" onde o professor visualiza suas candidaturas e clica em "Cancelar" para uma PENDING.

**Acceptance Scenarios**:

1. **Given** o professor está em "Minhas Aulas" com uma candidatura PENDING, **When** clica em "Cancelar", **Then** PATCH /enrollment-requests/:id/cancel é chamado e lista atualiza
2. **Given** o professor tenta cancelar uma candidatura já APPROVED, **When** clica em "Cancelar", **Then** o sistema informa que não é possível cancelar uma candidatura aprovada

---

### User Story 3 - Aprovar/Rejeitar Candidaturas (Priority: P1)

**Como** diretor ou administrador,
**Eu quero** visualizar e processar as candidaturas pendentes,
**Para que** eu possa aceitar ou rejeitar professores substitutos.

**Why this priority**: Sem este fluxo, o sistema de aprovação não funciona - os professores não conseguem ser confirmados.

**Independent Test**: pode ser testado efetuando login como diretor/admin, acessando a aba "Candidaturas" e processando uma candidatura PENDING.

**Acceptance Scenarios**:

1. **Given** estou na aba "Candidaturas" como diretor/admin, **When** visualizo a lista de PENDING, **Then** vejo nome do professor, disciplina, escola e data de cada candidatura
2. **Given** tenho uma candidatura PENDING, **When** clico em "Aprovar", **Then** PATCH /enrollment-requests/:id/approve é chamado, toast sucesso e lista atualiza
3. **Given** tenho uma candidatura PENDING, **When** clico em "Rejeitar", **Then** campo para motivo aparece, PATCH /enrollment-requests/:id/reject é chamado, toast sucesso e lista atualiza
4. **Given** tento aprovar uma candidatura já processada (não PENDING), **When** clico em "Aprovar", **Then** o sistema informa que a candidatura não pode ser processada

---

### User Story 4 - Visualizar Minhas Aulas (Priority: P2)

**Como** professor,
**Eu quero** visualizar todas as aulas onde me candidatei,
**Para que** eu possa acompanhar o status das minhas candidaturas.

**Why this priority**: Permite ao professor acompanhar suas candidaturas em diferentes status.

**Independent Test**: pode ser testado acessando a aba "Minhas Aulas" e verificando que as candidaturas aparecem com seus respectivos status.

**Acceptance Scenarios**:

1. **Given** estou logado como professor, **When** acesso "Minhas Aulas", **Then** vejo lista de todas as minhas candidaturas (PENDING, APPROVED, REJECTED, CANCELLED)
2. **Given** tenho candidatura APPROVED, **When** visualizo em "Minhas Aulas", **Then** vejo status confirmado sem botão de cancelar

---

### User Story 5 - Visualizar Todas as Candidaturas (Priority: P2)

**Como** diretor ou administrador,
**Eu quero** visualizar todas as candidaturas por status,
**Para que** eu possa ter visibilidade completa do fluxo.

**Why this priority**: Allows filtering and managing all enrollment requests.

**Independent Test**: pode ser testado alternando entre abas Pendentes/Aprovadas/Rejeitadas.

**Acceptance Scenarios**:

1. **Given** estou como diretor/admin, **When** clico na aba "Aprovadas", **Then** lista de apenas APPROVED é exibida
2. **Given** estou como diretor/admin, **When** clico na aba "Rejeitadas", **Then** lista de apenas REJECTED é exibida

---

### Edge Cases

- O que acontece quando o professor tenta candidatar-se a uma aula de escola que não está vinculado? O sistema deve informar erro de vínculo.
- O que acontece quando o professor tenta candidatar-se a uma aula que já se candidatou? O sistema deve informar "Já candidaturei".
- O que acontece quando o diretor/admin aprova uma candidatura e a aula fica indisponível para outros? A aula deve mudar para available=false.
- O que acontece quando a API retorna erro de validação? O sistema deve exibir a mensagem específica do erro.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir ao professor candidatar-se a uma aula disponível via POST /enrollment-requests
- **FR-002**: O sistema DEVE permitir ao professor cancelar própria candidatura PENDING via PATCH /enrollment-requests/:id/cancel
- **FR-003**: O sistema DEVE permitir ao diretor/admin aprovar candidatura PENDING via PATCH /enrollment-requests/:id/approve
- **FR-004**: O sistema DEVE permitir ao diretor/admin rejeitar candidatura PENDING via PATCH /enrollment-requests/:id/reject (com motivo opcional)
- **FR-005**: O sistema DEVE listar todas as candidaturas do professor (GET /enrollment-requests?userId=X)
- **FR-006**: O sistema DEVE listar candidaturas pendentes para o diretor/admin (GET /enrollment-requests?status=PENDING)
- **FR-007**: O sistema DEVE exibir erros de validação do backend (limite atingido, conflito de horário, vínculo)
- **FR-008**: O sistema DEVE atualizar a disponibilidade da aula (available=false) quando candidatura é aprovada
- **FR-009**: O sistema DEVE permitir filtrar candidaturas por status (PENDING, APPROVED, REJECTED, CANCELLED)

### Key Entities

- **Candidatura (EnrollmentRequest)**: Representa uma candidatura, com atributos: id, classId, userId, status, rejectionReason, createdAt
- **Aula (Class)**: Aula disponível para substituição, atributos: id, subjectId, date, available
- **Usuário (User)**: Professor que se candidate, atributos: id, name, schoolId, profileId
- **Escola (School)**: Instituição de ensino, atributos: id, name

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Professor consegue enviar candidatura e receber feedback em até 2 segundos
- **SC-002**: Candidaturas PENDING aparecem imediatamente para o diretor/admin após criação
- **SC-003**: Aprovação de candidatura resulta em atualização instantânea do status da aula
- **SC-004**: 100% das validações de backend são exibidas como mensagens de erro para o usuário

## Assumptions

- Assume-se que o backend já expõe os endpoints de enrollment requests (GET, POST, PATCH /approve, /reject, /cancel)
- Assume-se que a autenticação via JWT está funcionando corretamente
- Assume-se que o perfil do usuário logado está disponível no hook useUserHook existente
- Assume-se que as bibliotecas de UI já utilizadas (styled-components, react-toastify, react-hook-form) estão disponíveis
- Assume-se que o componente de abas (Tabs) pode ser implementado ou reutilizado

---

## Clarifications

[Nenhum NEEDS CLARIFICATION - todas as informações foram fornecidas pelo usuário]

---

**Version**: 1.0.0