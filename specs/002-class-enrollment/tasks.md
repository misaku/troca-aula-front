---

description: "Task list for Sistema de Candidaturas de Aulas feature implementation"
---

# Tasks: Sistema de Candidaturas de Aulas

**Input**: Design documents from `/specs/002-class-enrollment/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, contracts/

**Tests**: Tests are OPTIONAL unless Constitution III (Test-First) is explicitly required

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Type definitions and service layer infrastructure

- [ ] T001 Create type definitions for enrollment in src/types/enrollment.ts
- [ ] T002 [P] Create enrollment service layer in src/services/enrollment.service.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core hooks and components needed before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 [P] Create useEnrollments hook for listing enrollments in src/hooks/useEnrollments.ts
- [ ] T004 [P] Create useEnrollment mutations hook in src/hooks/useEnrollment.ts
- [ ] T005 Setup existing class page to add "Candidatar-se" button in src/app/classes/page.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Candidatar-se a uma Aula (Priority: P1) 🎯 MVP

**Goal**: Professor can apply to available classes via POST /enrollment-requests

**Independent Test**: Login as professor, view classes, click "Candidatar-se", verify POST is called and toast shows

### Tests for User Story 1 (Test-First - Constitution III) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T006T [P] [US1] Write unit tests for enrollment service in tests/unit/services/enrollment.test.ts
- [ ] T006I [US1] Write integration test for apply flow in tests/integration/enrollment/apply.test.ts

### Implementation for User Story 1

- [ ] T006 [P] [US1] Create EnrollmentCard component for class list in src/components/EnrollmentCard.tsx
- [ ] T007 [US1] Add "Candidatar-se" button to existing class cards with apply logic
- [ ] T008 [US1] Add toast notification for success/error feedback
- [ ] T009 [US1] Handle backend validation errors (limite, conflito, vínculo)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Cancelar Minha Candidatura (Priority: P1)

**Goal**: Professor can cancel their own PENDING enrollment

**Independent Test**: Login as professor, go to "Minhas Aulas", click "Cancelar" on PENDING enrollment

### Implementation for User Story 2

- [ ] T010 [P] [US2] Create MyEnrollments page in src/app/minhas-aulas/page.tsx
- [ ] T011 [US2] Implement list of enrollments filtered by current user
- [ ] T012 [US2] Add "Cancelar" button for PENDING enrollments only
- [ ] T013 [US2] Implement cancel logic (PATCH /enrollment-requests/:id/cancel)
- [ ] T014 [US2] Add toast notification and list refresh after cancel

**Checkpoint**: At this point, User Stories 1 AND 2 should work independently

---

## Phase 5: User Story 3 - Aprovar/Rejeitar Candidaturas (Priority: P1)

**Goal**: Director/Admin can approve or reject PENDING enrollments

**Independent Test**: Login as director/admin, go to dashboard "Candidaturas", approve/reject PENDING

### Implementation for User Story 3

- [ ] T015 [P] [US3] Create Enrollments management component for dashboard in src/components/EnrollmentsList.tsx
- [ ] T016 [US3] Add "Candidaturas" tab/section to existing dashboard
- [ ] T017 [US3] List only PENDING enrollments for the school
- [ ] T018 [US3] Add "Aprovar" button with PATCH /enrollment-requests/:id/approve
- [ ] T019 [US3] Add "Rejeitar" button with PATCH /enrollment-requests/:id/reject (optional reason)
- [ ] T020 [US3] Verify available=false when enrollment is approved
- [ ] T021 [US3] Add toast notification and refresh after each action

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should work independently

---

## Phase 6: User Story 4 - Visualizar Minhas Aulas (Priority: P2)

**Goal**: Professor can view all their enrollments with different statuses

**Independent Test**: Login as professor, access "Minhas Aulas", see list with all statuses

### Implementation for User Story 4

- [ ] T022 [P] [US4] Add status filter tabs to MyEnrollments page
- [ ] T023 [US4] Filter enrollments by status (ALL, PENDING, APPROVED, REJECTED, CANCELLED)
- [ ] T024 [US4] Hide "Cancelar" button for APPROVED status

**Checkpoint**: At this point, User Stories 1-4 should work independently

---

## Phase 7: User Story 5 - Visualizar Todas as Candidaturas (Priority: P2)

**Goal**: Director/Admin can view all enrollments by status

**Independent Test**: Login as director/admin, switch between tabs in dashboard

### Implementation for User Story 5

- [ ] T025 [P] [US5] Add tabs to dashboard enrollments: Pendentes, Aprovadas, Rejeitadas
- [ ] T026 [US5] Filter and display enrollments by status

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T027 [P] Add responsive styles for mobile/tablet views
- [ ] T028 Run accessibility audit (keyboard nav, contrast, screen readers)
- [ ] T029 Code cleanup: extract repeated logic into shared utilities
- [ ] T030 Add unit tests for critical hooks
- [ ] T031 Final integration testing

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

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Depends on Foundational (needs MyEnrollments page)
- **User Story 3 (P1)**: Depends on Foundational (needs dashboard integration)
- **User Story 4 (P2)**: Depends on US2 (reuses MyEnrollments page)
- **User Story 5 (P2)**: Depends on US3 (reuses dashboard component)

### Within Each User Story

- Services/hooks before components that use them
- Core implementation before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- T001, T002 can run in parallel (Setup)
- T003, T004, T005 can run in parallel (Foundational)
- T006, T006T, T006I can run in parallel (US1 Tests & Implementation)
- T010, T011 can run in parallel (US2)
- T015, T016 can run in parallel (US3)
- T022, T025 can run in parallel (US4 & US5)
- T027, T028 can run in parallel (Polish)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Stories 4-5 → Test independently → Deploy/Demo

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Constitution III (Test-First) applied to US1 (critical - enrollment flow)
- WCAG 2.1 compliance required for all interactive elements