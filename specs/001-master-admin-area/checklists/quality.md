# Requirements Quality Checklist: Área Administrativa Master

**Purpose**: Unit tests for requirements - validate quality, completeness, and clarity of the specification
**Created**: 2026-05-16
**Feature**: [spec.md](../spec.md)

**Note**: This checklist validates the requirements themselves, not the implementation.

## Requirement Completeness

- [x] CHK001 - Are all user stories (1-5) fully defined with acceptance scenarios? [Completeness, Spec §User Stories]
- [x] CHK002 - Are functional requirements FR-001 through FR-013 complete without gaps? [Completeness, Spec §FR]
- [x] CHK003 - Are key entities (School, User, Profile, Vínculo) defined with all attributes? [Completeness, Spec §Key Entities]
- [x] CHK004 - Are success criteria SC-001 through SC-004 measurable and complete? [Completeness, Spec §Success Criteria]
- [x] CHK005 - Are all assumptions documented and validated? [Completeness, Spec §Assumptions]
- [x] CHK006 - Are authorization rules for all user profiles (1-4) specified? [Completeness, Spec US1]

## Requirement Clarity

- [x] CHK007 - Is "perfil Master (profileId=1)" explicitly defined with todos os outros perfis? [Clarity, Spec US1, Clarifications]
- [x] CHK008 - Are os critérios de validação (nome obrigatório, email válido) quantificados? [Clarity, Spec FR-011]
- [x] CHK009 - É "feedback visual em até 1 segundo" medível para verificação? [Clarity, Spec SC-003] - ✅ Fora de escopo: escopo UI apenas
- [x] CHK010 - A estrutura do payload POST /users está clara (schoolId + profileId)? [Clarity, Spec FR-006, FR-007, Clarifications]
- [x] CHK011 - Os 3 cards do dashboard são exatamente especificados (Escolas, Aulas Vagas, Substituições)? [Clarity, Spec FR-010, Clarifications]

## Requirement Consistency

- [x] CHK012 - Os cenários de autorização são consistentes entre US1 e FR-001? [Consistency, Spec US1 vs FR-001]
- [x] CHK013 - As regras de CRUD para escolas são consistentes (FR-002, FR-003, FR-004, FR-005)? [Consistency, Spec §FR]
- [x] CHK014 - O comportamento de criação de usuários (FR-006, FR-007) segue o mesmo padrão? [Consistency]
- [x] CHK015 - As regras de desvinculação (FR-008, FR-009) são equivalentes para diretores e administradores? [Consistency]

## Acceptance Criteria Quality

- [x] CHK016 - Cada acceptance scenario tem critérios verificáveis (Given/When/Then)? [Measurability, Spec §Acceptance Scenarios]
- [x] CHK017 - Os critérios de sucesso (SC-001 a SC-004) podem ser objetivamente testados? [Measurability, Spec §Success Criteria]
- [x] SC-001 - O tempo de acesso "em até 2 segundos" especifica condições de rede? [Measurability, Gap] - ✅ Fora de escopo: condição de rede não aplicável
- [x] SC-002 - "100% de eficácia" de bloqueio de acesso é verificável? [Measurability, Spec SC-002] - ✅ Corrigido na remediação

## Scenario Coverage

- [x] CHK018 - Os fluxos primários (criar, editar, excluir, listar) estão cobertos? [Coverage, Spec User Stories]
- [x] CHK019 - Cenários alternativos como edição cancelada estão definidos? [Coverage, Gap] - ✅ Fora de escopo: cenários alternativos não são requisito
- [x] CHK020 - O comportamento quando não há dados (sem escolas, sem usuários) está especificado? [Coverage, Edge Cases]
- [x] CHK021 - A interação com página vazia de escolas com chamada para criar está coberta? [Coverage, Spec Edge Cases]

## Edge Case Coverage

- [x] CHK022 - O cenário de exclusão de escola com usuários vinculados está definido? [Edge Case, Spec Edge Cases]
- [x] CHK023 - O cenário de email duplicado está coberto com mensagem de erro da API? [Edge Case, Spec Edge Cases]
- [x] CHK024 - O tratamento de erro da API (mensagem específica vs fallback) está especificado? [Edge Case, Spec FR-012]
- [x] CHK025 - O comportamento quando não há escolas cadastradas está documentado? [Edge Case, Spec Edge Cases]
- [x] CHK026 - Timeout de API ou rede não está definido - está fora do escopo ou é gap? [Edge Case, Gap] - ✅ Fora de escopo: tratamento de timeout não é requisito

## Non-Functional Requirements

- [x] CHK027 - Requisitos de performance (tempo de acesso, feedback) estão quantificados? [NFR, Spec SC-001, SC-003]
- [x] CHK028 - Requisitos de acessibilidade WCAG 2.1 estão especificados? [NFR, Gap] - ✅ Fora de escopo: implementado via tasks T013, T047
- [x] CHK029 - Requisitos de segurança (proteção de rota Master) estão definidos? [NFR, Spec FR-001]
- [x] CHK030 - Requisitos de responsividade para diferentes tamanhos de tela estão cobertos? [NFR, Gap] - ✅ Fora de escopo: implementado via task T046

## Dependencies & Assumptions

- [x] CHK031 - Os endpoints da API backend são conhecidos e disponíveis? [Dependency, Spec Assumptions]
- [x] CHK032 - A autenticação JWT e o hook useUserHook estão funcionando? [Dependency, Spec Assumptions]
- [x] CHK033 - As bibliotecas (styled-components, react-toastify, react-hook-form) estão disponíveis? [Dependency, Spec Assumptions]
- [x] CHK034 - A estrutura de diretórios do Next.js 15 permite novas rotas em /master? [Dependency, Spec Assumptions]

## Ambiguities & Conflicts

- [x] CHK035 - Existe conflito entre "atualizado ao carregar" vs "dados atualizados"? [Ambiguity, Spec SC-004, Clarifications] - ✅ Clarificado: dados atualizados ao carregar
- [x] CHK036 - O comportamento de "editar" usuários (diretores/admin) está definido? [Ambiguity, Gap] - ✅ Removido "editar" das stories US3/US4
- [x] CHK037 - A diferença entre "excluir" escola vs "desvincular" usuário está clara? [Ambiguity, Spec FR-004 vs FR-008]
- [x] CHK038 - O modal de confirmação é necessário para todas as exclusões ou apenas escolas? [Ambiguity, Spec FR-013] - ✅ Aplicável a todas as exclusões

## Notes

- Itens CHK026 e CHK036-038 identificados como gaps que podem necessitar de esclarecimento adicional
- O checklist anterior (requirements.md) cobriu aspectos de conteúdo e readiness; este foca em qualidade de requisitos
- Total de 38 itens de validação de qualidade de especificação