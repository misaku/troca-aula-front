---

description: "Task list for Área Administrativa Master feature implementation"
---

# Tasks: Área Administrativa Master

**Input**: Design documents from `/specs/001-master-admin-area/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL for this feature unless explicitly required by Constitution (Test-First for critical features)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create master route directory structure in src/app/master/
- [x] T002 [P] Create shared component directories if needed
- [x] T003 Create type definitions for the feature in src/types/master.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Create master API service layer in src/services/master.service.tsx
- [x] T005 [P] Create master hooks directory and base useMaster.ts hook
- [x] T006 Setup MasterLayout component structure in src/app/master/page.tsx
- [x] T007 Implement route protection for /master in MasterLayout

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Acesso à Área Administrativa (Priority: P1) 🎯 MVP

**Goal**: Create the master layout with sidebar navigation and route protection that allows only Master users

**Independent Test**: Login with different profileIds and verify only profileId=1 can access /master

### Tests for User Story 1 (Test-First REQUIRED - Constitution III) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008T [P] [US1] Write unit tests for route protection logic in tests/unit/master/routeProtection.test.ts
- [x] T008I [US1] Write integration test for Master access flow in tests/integration/master/accessControl.test.ts

### Implementation for User Story 1

- [x] T008 [P] [US1] Create MasterSidebar component in src/app/master/components/MasterSidebar.tsx
- [x] T009 [P] [US1] Create MasterHeader component in src/app/master/components/MasterHeader.tsx
- [x] T010 [US1] Implement route protection in src/app/master/page.tsx using useUserHook
- [x] T011 [US1] Add navigation links to sidebar (Dashboard, Escolas, Diretores, Administradores)
- [x] T012 [US1] Add redirect to /dashboard for non-Master users in src/app/master/page.tsx
- [x] T013 [US1] Add keyboard navigation and WCAG 2.1 compliance to layout components

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Gerenciar Escolas (Priority: P1)

**Goal**: CRUD operations for schools (create, list, edit, delete)

**Independent Test**: Create a school, verify it appears in list, edit it, delete it with confirmation

### Tests for User Story 2 (Test-First REQUIRED - Constitution III) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T014T [P] [US2] Write unit tests for useSchools hook in tests/unit/hooks/useSchools.test.ts
- [x] T014I [US2] Write integration test for schools CRUD flow in tests/integration/master/schools.test.ts

### Implementation for User Story 2

- [x] T014 [P] [US2] Create useSchools hook in src/hooks/useSchools.ts
- [x] T015 [P] [US2] Create SchoolsPage component in src/app/master/escolas/page.tsx
- [x] T016 [US2] Implement list schools table in src/app/master/escolas/page.tsx
- [x] T017 [US2] Create SchoolForm modal component in src/app/master/escolas/components/SchoolForm.tsx
- [x] T018 [US2] Implement create school functionality with react-hook-form + yup validation
- [x] T019 [US2] Implement edit school functionality in SchoolForm.tsx
- [x] T020 [US2] Create ConfirmModal component in src/components/ConfirmModal.tsx
- [x] T021 [US2] Implement delete school with confirmation modal
- [x] T022 [US2] Add toast notifications for success/error feedback
- [x] T023 [US2] Handle edge case: prevent delete if school has users linked (show error)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Gerenciar Diretores (Priority: P1)

**Goal**: Create and manage directors (profileId=2) linked to schools

**Independent Test**: Create a director linked to a school, verify appears in list, unlink from school

### Tests for User Story 3 (Test-First REQUIRED - Constitution III) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T024T [P] [US3] Write unit tests for useUsers hook in tests/unit/hooks/useUsers.test.ts

### Implementation for User Story 3

- [x] T024 [P] [US3] Create useUsers hook in src/hooks/useUsers.ts (reusable for directors/admins)
- [x] T025 [P] [US3] Create DiretoresPage component in src/app/master/diretores/page.tsx
- [x] T026 [US3] Implement list directors table filtered by profileId=2
- [x] T027 [US3] Create UserForm modal component in src/app/master/diretores/components/UserForm.tsx
- [x] T028 [US3] Implement create director with school selection dropdown
- [x] T029 [US3] Implement unlink director functionality (remove schoolId, keep user)
- [x] T030 [US3] Add toast notifications for success/error feedback
- [x] T031 [US3] Handle edge case: email already exists (show API error message)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should work independently

---

## Phase 6: User Story 4 - Gerenciar Administradores (Priority: P1)

**Goal**: Create and manage administrators (profileId=3) linked to schools

**Independent Test**: Create an admin linked to a school, verify appears in list, unlink from school

### Tests for User Story 4 (Test-First REQUIRED - Constitution III) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T032T [P] [US4] Write integration test for administrators flow in tests/integration/master/administrators.test.ts

### Implementation for User Story 4

- [x] T032 [P] [US4] Reuse useUsers hook from US3
- [x] T033 [P] [US4] Create AdministradoresPage component in src/app/master/administradores/page.tsx
- [x] T034 [US4] Implement list administrators table filtered by profileId=3
- [x] T035 [US4] Reuse UserForm component from US3 for creating admins
- [x] T036 [US4] Implement create administrator with school selection (profileId=3)
- [x] T037 [US4] Implement unlink administrator functionality
- [x] T038 [US4] Add toast notifications for success/error feedback

**Checkpoint**: At this point, User Stories 1-4 should work independently

---

## Phase 7: User Story 5 - Visualizar Dashboard Global (Priority: P2)

**Goal**: Display global statistics in 3 stat cards (total schools, available classes, substitutions this month)

**Independent Test**: Access /master/dashboard and verify all 3 stat cards show correct numbers

### Implementation for User Story 5

- [x] T039 [P] [US5] Create useMasterDashboard hook in src/hooks/useMasterDashboard.ts
- [x] T040 [P] [US5] Create StatCard component in src/components/StatCard.tsx
- [x] T041 [US5] Create DashboardPage in src/app/master/dashboard/page.tsx
- [x] T042 [US5] Fetch and display total schools count (GET /schools)
- [x] T043 [US5] Fetch and display available classes count (GET /classes?available=true)
- [x] T044 [US5] Fetch and display substitutions this month (GET /enrollment-requests?status=APPROVED)
- [x] T045 [US5] Add loading and error states to dashboard

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T046 [P] Add responsive styles for mobile/tablet views
- [x] T047 Run accessibility audit (keyboard nav, contrast, screen readers)
- [x] T048 Code cleanup: extract repeated logic into shared utilities
- [x] T049 Run final integration tests and fix any issues
- [x] T050 Update documentation in quickstart.md with final implementation details

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on US1 (MasterLayout must exist first)
- **User Story 3 (P1)**: Depends on US1 + US2 (needs schools to link directors)
- **User Story 4 (P1)**: Depends on US1 + US2 (needs schools to link admins)
- **User Story 5 (P2)**: Depends on US1 (needs MasterLayout structure)

### Within Each User Story

- Shared components before page-specific implementation
- Hooks before components that use them
- Core implementation before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- T001, T002, T003 can run in parallel (Setup)
- T004, T005, T006 can run in parallel (Foundational)
- T008, T009 can run in parallel (US1)
- T014, T015 can run in parallel (US2)
- T024, T025 can run in parallel (US3)
- T032, T033 can run in parallel (US4)
- T039, T040 can run in parallel (US5)
- T046, T047 can run in parallel (Polish)

---

## Parallel Example: User Story 1

```bash
# Launch layout components together:
Task: "Create MasterSidebar component in src/app/master/components/MasterSidebar.tsx"
Task: "Create MasterHeader component in src/app/master/components/MasterHeader.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Constitution requires Test-First for critical features: authentication (US1), CRUD operations (US2-US4)
- WCAG 2.1 compliance is required for all interactive elements