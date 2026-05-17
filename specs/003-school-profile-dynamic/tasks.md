---

description: "Task list for School Selection by User Profile feature implementation"
---

# Tasks: School Selection by User Profile

**Input**: Design documents from `/specs/003-school-profile-dynamic/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md

**Tests**: Tests are OPTIONAL - UI modification, not critical functionality

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No additional setup required - existing services and hooks are sufficient.

- [X] T001 [P] Verify masterService.getSchools() returns school list in src/services/master.service.tsx
- [X] T002 [P] Verify useUserHook returns profileId and schoolId in src/user/useUserHook.tsx

**Checkpoint**: Existing infrastructure verified - proceed to implementation

---

## Phase 2: Foundational (Modify Existing Dashboard)

**Purpose**: Core modification to enable dynamic school selection

- [X] T003 Replace hardcoded school loading in src/app/dashboard/page.tsx
- [X] T004 Add school list loading for Master users (GET /schools)
- [X] T005 Read schoolId from user profile for Director/Admin

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Master Selects School from Dropdown (Priority: P1) 🎯 MVP

**Goal**: Master can select any school from a dropdown when creating a class

**Independent Test**: Login as Master, access class creation form, verify dropdown shows all schools

### Implementation for User Story 1

- [X] T006 [P] [US1] Modify dashboard form to show Select component for profileId=1 in src/app/dashboard/page.tsx
- [X] T007 [US1] Load all schools when user is Master
- [X] T008 [US1] Pass selected schoolId to form submission

**Checkpoint**: User Story 1 complete - Master can select any school

---

## Phase 4: User Story 2 - Director/Admin Sees Fixed School (Priority: P1)

**Goal**: Director/Admin sees their school as disabled (readonly) field

**Independent Test**: Login as Director, access class creation form, verify school field is disabled

### Implementation for User Story 2

- [X] T009 [P] [US2] Modify dashboard form to show disabled input for profileId=2 (Director/Admin) in src/app/dashboard/page.tsx
- [X] T010 [US2] Read school name from user's schoolId
- [X] T011 [US2] Auto-populate schoolId in form submission for Director

**Checkpoint**: User Story 2 complete - Director sees fixed school

---

## Phase 5: User Story 3 - Professor Cannot Create Classes (Priority: P1)

**Goal**: Professor cannot access class creation form

**Independent Test**: Login as Professor, verify form is not visible or user is redirected

### Implementation for User Story 3

- [X] T012 [P] [US3] Add conditional rendering to hide form for profileId=3 in src/app/dashboard/page.tsx
- [X] T013 [US3] Verify form is hidden or user is redirected for Professor

**Checkpoint**: User Story 3 complete - Professor cannot create classes

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T014 [P] Add empty state handling for Master when no schools available
- [X] T015 Add error handling for API failures in school loading
- [X] T016 [P] Final integration testing including accessibility audit (WCAG 2.1)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verify existing infrastructure
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Depends on Foundational (uses user profile data)
- **User Story 3 (P1)**: Depends on Foundational (profileId check)

### Within Each User Story

- Form modification before submission logic
- State management before rendering
- Story complete before moving to next priority

### Parallel Opportunities

- T001, T002 can run in parallel (Setup verification)
- T006, T009, T012 can run in parallel (Form modifications for each profile)
- T014, T015 can run in parallel (Polish tasks)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: Foundational modifications
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Constitution III (Test-First) is optional for this feature (UI modification, not critical)
- WCAG 2.1 compliance required for all interactive elements
- Current hardcoded `/schools/1` in dashboard needs to be replaced