# Research: Gov.br OAuth2 Integration

## Unknowns Identified

### 1. Backend Endpoints

**Question**: Os endpoints `/auth/login-govbr` e `/auth/govbr-auth-url` estão implementados no backend?

**Decision**: Assumir que backend fornece esses endpoints. O frontend deve chamá-los conforme especificado.

**Rationale**: A especificação menciona explicitamente esses endpoints, indicando que existem ou serão implementados.

**Alternatives Considered**:
- Criar mock server para desenvolvimento - rejeitado pois backend deve fornecer endpoints reais

---

### 2. Token Storage Strategy

**Question**: localStorage vs cookies httpOnly - qual abordagem usar para armazenar o JWT?

**Decision**: localStorage como armazenamento primário, com documentação de que cookies httpOnly seria mais seguro em produção.

**Rationale**: Simplicidade para implementação inicial (Next.js server components não têm acesso fácil a cookies httpOnly setados por API). O projeto usa localStorage em outros lugares (conforme padrões observados no código).

**Alternatives Considered**:
- Cookies httpOnly: mais seguro contra XSS, mas requer configuração server-side mais complexa
- Decisão: localStorage por agora, com nota de melhoria futura

---

### 3. Redirect URI

**Question**: Qual URL de callback está registrada no Gov.br para receber o código de autorização?

**Decision**: Usar `${window.location.origin}/auth/govbr-callback` como redirect URI.

**Rationale**: Segue padrão Next.js App Router para rotas customizadas. Permite desenvolvimento local e produção com mesma lógica.

**Alternatives Considered**:
- URL fixa hardcoded - rejeitado pois não funciona para múltiplos ambientes
- Environment variable - possível, mas abordagem dinâmica é mais simples

---

## Best Practices Applied

1. **OAuth2 Authorization Code Flow**: Usar code exchange em vez de implicit flow (mais seguro)
2. **CSRF Protection**: State parameter fornecido pelo backend, validado no callback
3. **Error Handling**: Tratar erros de rede, código expirado/inválido, e fallback para login tradicional
4. **Testability**: Estruturar código com service e hook separados para facilitar testes unitários

## Assumptions Documented

- Backend expõe endpoints conforme contract em `contracts/auth-api.md`
- Gov.br fornece environment de teste para validação
- Usuários que fazem login via Gov.br pela primeira vez têm perfil criado automaticamente