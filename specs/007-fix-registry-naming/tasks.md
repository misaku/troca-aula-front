---

description: "Task list for Fix Registry Nomenclature feature"

---

# Tasks: Fix Registry Nomenclature

**Input**: Design documents from `/specs/007-fix-registry-naming/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: No new tests required - existing tests must continue passing after refactoring

**Organization**: Single user story (P1) - rename `registredById` → `enrolledById` and `registredBy` → `enrolledBy` across all frontend files.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify current state and confirm occurrences map

- [x] T001 Verify all 11 occurrences of `registred` mapped in research.md are still present in codebase
- [x] T002 Confirm no additional occurrences exist outside the 2 identified files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: N/A for this refactoring - no foundational work needed

**Checkpoint**: Ready for user story implementation

---

## Phase 3: User Story 1 - Standardize Enrollment Field Names (Priority: P1) 🎯 MVP

**Goal**: Rename all `registredById` → `enrolledById` and `registredBy` → `enrolledBy` in frontend code

**Independent Test**: Zero occurrences of `registred` remain in source code, build passes, all tests pass

### Implementation for User Story 1

- [x] T003 [US1] Rename `registredById` → `enrolledById` at line 314 in src/app/dashboard/page.tsx (payload for accept function)
- [x] T004 [US1] Rename `registredById` → `enrolledById` at line 385 in src/app/dashboard/page.tsx (filter for 'classes' tab)
- [x] T005 [US1] Rename `registredById` → `enrolledById` at line 388 in src/app/dashboard/page.tsx (filter for profileId === 3)
- [x] T006 [US1] Rename `registredById` → `enrolledById` at line 391 in src/app/dashboard/page.tsx (filter for non-teacher users)
- [x] T007 [US1] Rename `registredBy` → `enrolledBy` at line 517 in src/app/dashboard/page.tsx (table cell display)
- [x] T008 [US1] Rename `registredBy` → `enrolledBy` at line 520 in src/app/dashboard/page.tsx (accept button condition)
- [x] T009 [US1] Rename `registredBy` → `enrolledBy` at line 524 in src/app/dashboard/page.tsx (delete/approve logic)
- [x] T010 [P] [US1] Rename `registredById` → `enrolledById` at line 53 in src/app/dashboard/page.test.tsx (mock class data)
- [x] T011 [P] [US1] Rename `registredById` → `enrolledById` at line 61 in src/app/dashboard/page.test.tsx (mock class data)
- [x] T012 [P] [US1] Rename `registredBy` → `enrolledBy` at line 62 in src/app/dashboard/page.test.tsx (mock class data)
- [x] T013 [P] [US1] Update comment at line 98 in src/app/dashboard/page.test.tsx: `registredById` → `enrolledById`

**Checkpoint**: At this point, all `registred` occurrences should be replaced with `enrolled`

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Validation and cleanup

- [x] T014 [P] Verify zero occurrences of `registred` remain: `grep -rn "registred" src/`
- [x] T015 Run build to verify no errors: pnpm build
- [x] T016 Run tests to verify all pass: pnpm test

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: N/A - skipped for this refactoring
- **User Story 1 (Phase 3)**: Can start immediately after Setup verification
- **Polish (Final Phase)**: Depends on all User Story 1 tasks being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories - single story feature

### Within User Story 1

- T003-T009 affect the same file (page.tsx) - should be done sequentially to avoid conflicts
- T010-T013 affect the same file (page.test.tsx) - marked [P] since they can be done together in a single edit pass
- Polish tasks (T014-T016) must run after all rename tasks complete

### Parallel Opportunities

- T010-T013 (test file renames) can be done in a single edit pass
- T014-T016 (validation tasks) are independent and can be run together

---

## Parallel Example: User Story 1

```bash
# Rename all occurrences in page.tsx (sequential, same file):
# T003 through T009 - one pass through the file

# Rename all occurrences in page.test.tsx (can be done in one pass):
Task: "Rename registredById → enrolledById at line 53 in src/app/dashboard/page.test.tsx"
Task: "Rename registredById → enrolledById at line 61 in src/app/dashboard/page.test.tsx"
Task: "Rename registredBy → enrolledBy at line 62 in src/app/dashboard/page.test.tsx"
Task: "Update comment at line 98 in src/app/dashboard/page.test.tsx"

# Validation (can run together):
Task: "Verify zero occurrences of registred remain"
Task: "Run build: pnpm build"
Task: "Run tests: pnpm test"
```

---

## Implementation Strategy

### MVP First (All-in-One)

This is a simple refactoring with a single user story:

1. Complete Phase 1: Setup (verify occurrences)
2. Complete Phase 3: User Story 1 (rename all fields)
3. Complete Phase N: Polish (validate with grep, build, tests)
4. **STOP and VALIDATE**: Confirm zero `registred` occurrences, build passes, tests pass

### Incremental Delivery

Not applicable - this is a single-pass refactoring. All changes should be made together to avoid leaving the codebase in an inconsistent state.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- This is a pure rename refactoring - no behavioral changes expected
- All changes should be committed together as a single atomic commit
- Avoid: partial renames that leave the codebase in an inconsistent state
