---

description: "Task list for Director Teacher Management feature"

---

# Tasks: Director Teacher Management

**Input**: Design documents from `/specs/006-director-teacher-management/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Required - Constitution mandates Test-First approach

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing Master structure

- [x] T001 Verify existing MasterSidebar.tsx component in src/app/master/components/
- [x] T002 Verify existing Master layout structure in src/app/master/
- [x] T003 Verify existing api.service.tsx in src/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Define TypeScript interfaces for Teacher and EnrollmentRequest in src/types/teacher.ts
- [x] T005 [P] Create teacher service for API calls in src/services/teacher.service.tsx (depends on T004)
- [x] T006 [P] Create useTeachers hook for business logic in src/hooks/useTeachers.ts (depends on T005)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Link Teachers (Priority: P1) 🎯 MVP

**Goal**: Diretor pode listar, vincular e desvincular professores da escola

**Independent Test**: Diretor acessa aba de professores, lista professores vinculados, vincula novo professor, desvincular professor existente

### Tests for User Story 1 (REQUIRED - Test-First) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T007 [P] [US1] Write unit test for teacherService.getLinkedTeachers in tests/unit/teacher.service.test.tsx
- [x] T008 [P] [US1] Write unit test for teacherService.getAvailableTeachers in tests/unit/teacher.service.test.tsx
- [x] T009 [P] [US1] Write unit test for teacherService.linkTeacher in tests/unit/teacher.service.test.tsx
- [x] T010 [P] [US1] Write unit test for useTeachers hook in tests/unit/useTeachers.test.tsx

### Implementation for User Story 1

- [x] T011 [P] [US1] Create Professors page with tabs in src/app/master/professores/page.tsx
- [x] T012 [US1] Implement linked teachers list display in src/app/master/professores/page.tsx (depends on T006)
- [x] T013 [US1] Implement "Desvincular" button action in src/app/master/professores/page.tsx (depends on T012)
- [x] T014 [US1] Implement "Vincular Professor" modal with available teachers in src/app/master/professores/page.tsx (depends on T011)
- [x] T015 [US1] Integrate linkTeacher function in modal in src/app/master/professores/page.tsx (depends on T014)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Enrollment Applications (Priority: P1)

**Goal**: Diretor visualiza e gerencia candidaturas de professores

**Independent Test**: Diretor acessa aba de candidaturas, lista candidaturas pendentes, approve/reject candidaturas

### Tests for User Story 2 (REQUIRED - Test-First) ⚠️

- [x] T016 [P] [US2] Write unit test for teacherService.getEnrollmentRequests in tests/unit/teacher.service.test.tsx
- [x] T017 [P] [US2] Write unit test for teacherService.updateEnrollmentStatus in tests/unit/teacher.service.test.tsx
- [x] T018 [P] [US2] Add enrollment requests service methods in src/services/teacher.service.tsx (depends on T005)
- [x] T019 [US2] Add "Candidaturas" tab to professors page in src/app/master/professores/page.tsx
- [x] T020 [US2] Implement enrollment list with status filter in src/app/master/professores/page.tsx (depends on T019)
- [x] T021 [US2] Implement "Aprovar" button action in src/app/master/professores/page.tsx
- [x] T022 [US2] Implement "Rejeitar" button action in src/app/master/professores/page.tsx
- [x] T023 [US2] Update enrollment list after approve/reject in src/app/master/professores/page.tsx (depends on T021, T022)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Teacher Details (Priority: P2)

**Goal**: Diretor visualiza informações detalhadas do professor para tomada de decisão

**Independent Test**: Ao selecionar professor ou candidatura, visualiza detalhes completos

### Implementation for User Story 3

- [x] T024 [US3] Add teacher details display in teacher list rows in src/app/master/professores/page.tsx
- [x] T025 [US3] Add candidate details display (name, email, subject, substitutions) in enrollment list in src/app/master/professores/page.tsx
- [x] T026 [US3] Add visual indicator for totalSubstitutions in both lists in src/app/master/professores/page.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T027 [P] Add "Professores" tab to MasterSidebar navigation in src/app/master/components/MasterSidebar.tsx
- [x] T028 [P] Add accessibility attributes (aria-labels) to all buttons in professors page
- [x] T029 Add loading states for async operations in src/app/master/professores/page.tsx
- [x] T030 Add error handling and user feedback for failed operations
- [x] T031 Run build to verify no errors: pnpm build
- [x] T032 Run tests to verify all pass: pnpm test (102 tests pass)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent from US1, but uses same service
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 and US2 display logic

### Within Each User Story

- Tests (REQUIRED) MUST be written and FAIL before implementation
- Types before services
- Services before hooks
- Hooks before UI integration
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- All test tasks for a user story marked [P] can run in parallel
- User Stories 1 and 2 can be worked on in parallel (different tabs)
- Polish tasks can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Write unit test for teacherService.getLinkedTeachers in tests/unit/teacher.service.test.tsx"
Task: "Write unit test for teacherService.getAvailableTeachers in tests/unit/teacher.service.test.tsx"
Task: "Write unit test for teacherService.linkTeacher in tests/unit/teacher.service.test.tsx"

# Launch all implementation for User Story 1:
Task: "Create Professors page with tabs in src/app/master/professores/page.tsx"
Task: "Define TypeScript interfaces for Teacher and EnrollmentRequest in src/types/teacher.ts"
Task: "Create teacher service for API calls in src/services/teacher.service.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Write tests for Phase 3: User Story 1
4. Implement Phase 3: User Story 1
5. **STOP and VALIDATE**: Test User Story 1 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Write and fail tests for User Story 1 → Implement → Test independently → Deploy/Demo (MVP!)
3. Write and fail tests for User Story 2 → Implement → Test independently → Deploy/Demo
4. Write and fail tests for User Story 3 → Implement → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3 + Polish
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests MUST be written and FAIL before implementing (Constitution: Test-First)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence