# Research: Director Teacher Management

## Unknowns Identified

### 1. API Endpoints

**Question**: Os endpoints GET /users, PATCH /users/:id e GET /enrollment-requests existem e suportam os filtros necessários?

**Decision**: Assumir que endpoints seguem padrão RESTful conforme Quickstart. Frontend deve consumir APIs conforme especificado.

**Rationale**: A especificação define os contratos de API. Backend deve implementar endpoints conforme esses contratos.

---

### 2. User Profile IDs

**Question**: Confirmar que profileId=2 é Diretor e profileId=4 é Professor?

**Decision**: Usar convenção: 2=Diretor, 4=Professor conforme especificação do usuário.

**Rationale**: O usuário especificou explicitamente esses IDs na descrição.

---

### 3. Enrollment Request Endpoint

**Question**: O endpoint de enrollment requests é `/enrollment-requests` ou outro nome?

**Decision**: Usar `/enrollment-requests` conforme especificado pelo usuário.

**Rationale**: Nome especificado explicitamente nos requisitos.

---

## Best Practices Applied

1. **Arquitetura Modular**: Seguir padrão do projeto com service/hook/component
2. **Test-First**: Escrever testes antes da implementação
3. **Reutilização**: Usar api.service.tsx existente para chamadas HTTP
4. **Componentes Estilizados**: Usar styled-components conforme Constituição

## Assumptions Documented

- Backend implementa endpoints conforme contracts/teacher-api.md
- profileId=2 para Diretores, profileId=4 para Professores
- API retorna campos conforme data-model.md
- schoolId do usuário logado está disponível via useUserHook