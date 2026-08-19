# Feature Specification: Gov.br OAuth2 Integration

**Feature Branch**: `005-govbr-oauth`

**Created**: 2026-05-17

**Status**: Draft

**Input**: User description: "O botão Gov.br existe mas a integração não funciona completamente. Precisa finalizar a integração OAuth2/OpenID Connect."

## User Scenarios & Testing

### User Story 1 - Login with Gov.br (Priority: P1)

Usuário acessa a página de login e escolhe autenticar-se usando sua conta Gov.br.

**Why this priority**: Este é o fluxo principal da feature - a funcionalidade Gov.br precisa funcionar completamente para atender o requisito de integração com o sistema federal.

**Independent Test**: O fluxo pode ser testado manualmente: usuário acessa página de login, clica no botão Gov.br, é redirecionado para autenticação Gov.br, retorna ao sistema autenticado.

**Acceptance Scenarios**:

1. **Given** o usuário está na página de login, **When** clica no botão "Entrar com Gov.br", **Then** é redirecionado para a página de autenticação do Gov.br
2. **Given** o usuário completou a autenticação no Gov.br com sucesso, **When** o Gov.br retorna o código de autorização para o sistema, **Then** o sistema troca o código por token JWT e redireciona para o dashboard
3. **Given** o usuário possui uma sessão JWT ativa via Gov.br, **When** acessa a página de login novamente, **Then** é automaticamente redirecionado para o dashboard (já está autenticado)

---

### User Story 2 - Fallback to Traditional Login (Priority: P1)

Quando a autenticação Gov.br falha, o sistema deve oferecer alternativa de login tradicional.

**Why this priority**: Garante que usuários que não conseguem usar Gov.br possam acessar o sistema via email/senha.

**Independent Test**: Pode ser testado simulando falha na autenticação Gov.br e verificando que o formulário de login tradicional continua disponível.

**Acceptance Scenarios**:

1. **Given** o usuário está no fluxo de autenticação Gov.br, **When** a autenticação falha ou é cancelada pelo usuário, **Then** o sistema retorna para a página de login com mensagem de erro e mantém o formulário tradicional visível
2. **Given** o usuário está na página de login após falha no Gov.br, **When** opta pelo login tradicional, **Then** pode realizar login com email e senha normalmente

---

### User Story 3 - Error Handling (Priority: P2)

O sistema deve tratar erros de forma amigável e orientar o usuário.

**Why this priority**: Proporciona boa experiência mesmo quando há problemas na integração.

**Independent Test**: Pode ser testado simulando diferentes cenários de erro e verificando as mensagens exibidas.

**Acceptance Scenarios**:

1. **Given** ocorre erro de rede durante autenticação Gov.br, **When** o sistema detecta o problema, **Then** exibe mensagem clara permitindo nova tentativa ou uso do login tradicional
2. **Given** o código de autorização Gov.br é inválido ou expirado, **When** o sistema tenta trocar por token, **Then** exibe erro e permite que usuário tente novamente

---

### Edge Cases

- O usuário fecha o navegador durante o fluxo de autenticação Gov.br e retorna posteriormente
- O código de autorização Gov.br é utilizado mais de uma vez (replay attack prevention)
- Tempo limite excedido durante espera pela autenticação Gov.br
- Usuário já possui conta no sistema com email diferente do Gov.br

## Requirements

### Functional Requirements

- **FR-001**: Sistema DEVE exibir botão "Entrar com Gov.br" na página de login
- **FR-002**: Sistema DEVE redirecionar usuário para URL de autenticação Gov.br ao clicar no botão
- **FR-003**: Sistema DEVE receber código de autorização retornado pelo Gov.br após autenticação
- **FR-004**: Sistema DEVE trocar código de autorização por token JWT via endpoint de backend
- **FR-005**: Sistema DEVE salvar token de autenticação e redirecionar para dashboard após login bem-sucedido
- **FR-006**: Sistema DEVE exibir mensagem de erro quando autenticação Gov.br falha
- **FR-007**: Sistema DEVE manter formulário de login tradicional visível como alternativa
- **FR-008**: Sistema DEVE proteger endpoint de callback contra uso indevido de código

### Key Entities

- **Usuário Autenticado**: Represents authenticated user via Gov.br, contains identifier from Gov.br, name, email
- **Token JWT**: Represents authentication token issued after successful Gov.br authentication

## Success Criteria

### Measurable Outcomes

- **SC-001**: Usuários completam autenticação Gov.br em menos de 30 segundos (tempo de redirecionamento e retorno)
- **SC-002**: 95% dos usuários que tentam login Gov.br conseguem autenticação bem-sucedida na primeira tentativa
- **SC-003**: Usuários que falham no login Gov.br podem completar login tradicional em menos de 1 minuto
- **SC-004**: Sistema trata erros de autenticação em menos de 2 segundos, exibindo mensagem amigável

## Assumptions

- O backend já possui os endpoints /auth/login-govbr e /auth/govbr-auth-url implementados ou serão implementados em paralelo
- O Gov.br fornece ambiente de teste para validação durante desenvolvimento
- A integração usará padrão OAuth2 com Authorization Code flow
- O token JWT será armazenado em cookies httpOnly para maior segurança (conforme decision em plan.md)
- O existing login tradicional (email/senha) continua funcionando normalmente
- Usuários Gov.br que acessam pela primeira vez têm perfil criado automaticamente com dados do Gov.br