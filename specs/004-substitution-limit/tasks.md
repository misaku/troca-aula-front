---

description: "Task list for Substitution Limit Display and Enforcement feature implementation"
---

# Tasks: Substitution Limit Display and Enforcement

**Input**: Design documents from `/specs/004-substitution-limit/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md

**Tests**: Tests are OPTIONAL - UI display and validation, not critical functionality

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create hook and types for substitution limit management

- [X] T001 [P] Add substitutionLimit field to School type in src/types/master.ts
- [X] T002 [P] Create useSubstitutionLimit hook in src/hooks/useSubstitutionLimit.ts

**Checkpoint**: Hook ready - can be used by components

---

## Phase 2: Foundational (Build Hook Logic)

**Purpose**: Core logic for fetching and calculating limit

- [X] T003 Add fetchSchoolLimit function to useSubstitutionLimit hook
- [X] T004 Add fetchApprovedCount function to useSubstitutionLimit hook
- [X] T005 Add calculatePercentage function to useSubstitutionLimit hook

**Checkpoint**: Hook logic complete - ready for UI components

---

## Phase 3: User Story 1 - View Substitution Count (Priority: P1) 🎯 MVP

**Goal**: Professor can view their substitution count and limit

**Independent Test**: Login as Professor, access dashboard, verify counter shows

### Implementation for User Story 1

- [X] T006 [P] [US1] Create SubstitutionCounter component in src/components/SubstitutionCounter.tsx
- [X] T007 [US1] Add conditional rendering for "X de Y" vs "Sem limite definido"
- [X] T008 [US1] Add status colors (green/yellow/red based on percentage)
- [X] T009 [US1] Integrate SubstitutionCounter in dashboard page for profileId=3

**Checkpoint**: User Story 1 complete - Professor sees counter on dashboard

---

## Phase 4: User Story 2 - Block Application When Limit Reached (Priority: P1)

**Goal**: Block professor from applying when limit is reached

**Independent Test**: Login as Professor at limit, verify button is disabled

### Implementation for User Story 2

- [X] T010 [P] [US2] Add canApply logic to useSubstitutionLimit hook
- [X] T011 [US2] Pass canApply to classes page and disable apply button
- [X] T012 [US2] Add check before creating enrollment in enrollment service

**Checkpoint**: User Story 2 complete - Apply button blocked at limit

---

## Phase 5: User Story 3 - Handle API Limit Error (Priority: P2)

**Goal**: Show clear error message when API returns limit error

**Independent Test**: Simulate API 400 error, verify toast shows correct message

### Implementation for User Story 3

- [X] T013 [P] [US3] Add error interception in enrollment service for 400 status
- [X] T014 [US3] Add specific toast message for limit error in classes page
- [X] T015 [US3] Display limit value in error message when available

**Checkpoint**: User Story 3 complete - API errors handled gracefully

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T016 [P] Add loading state handling to SubstitutionCounter
- [X] T017 Add error state handling for API failures in useSubstitutionLimit
- [X] T018 Final integration testing across all user stories

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Depends on Foundational (needs canApply logic)
- **User Story 3 (P2)**: Depends on Foundational (hook ready for error handling)

### Within Each User Story

- Hook logic before component implementation
- Component before page integration
- Story complete before moving to next priority

### Parallel Opportunities

- T001, T002 can run in parallel (Setup)
- T003, T004, T005 can run in parallel (Foundational)
- T006, T010, T013 can run in parallel (User story components)
- T016, T017 can run in parallel (Polish)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T005)
3. Complete Phase 3: User Story 1 (T006-T009)
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
- Constitution III (Test-First) is optional for this feature (UI display)
- WCAG 2.1 compliance required for SubstitutionCounter component
- Use existing enrollment.service.tsx for counting APPROVED enrollments