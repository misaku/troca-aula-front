# API Requirements Quality Checklist: Gov.br OAuth2 Integration

**Purpose**: Validate completeness and quality of API contracts and integration requirements
**Created**: 2026-05-17
**Feature**: specs/005-govbr-oauth/spec.md
**Focus**: API & Integration | Depth: Standard | Testability: Yes

## Requirement Completeness

- [ ] CHK001 - Are all required endpoints documented in the API contract? [Completeness, Spec §Requirements]
- [ ] CHK002 - Are request body schemas defined for all POST/PUT endpoints? [Completeness, Contract §POST /auth/login-govbr]
- [ ] CHK003 - Are response schemas defined for both success and error cases? [Completeness, Contract §Errors]
- [ ] CHK004 - Is the state parameter handling specified in the OAuth2 flow? [Completeness, Contract §GET /auth/govbr-auth-url]

## Requirement Clarity

- [ ] CHK005 - Is the redirect_uri parameter format explicitly defined? [Clarity, Contract §POST /auth/login-govbr]
- [ ] CHK006 - Are error response formats standardized across all error codes? [Clarity, Contract §Errors]
- [ ] CHK007 - Is the token expiration (expires_in) unit specified (seconds)? [Clarity, Contract §Response]
- [ ] CHK008 - Are the UserDTO field types and formats explicitly defined? [Clarity, Spec §Key Entities]

## Requirement Consistency

- [ ] CHK009 - Do the contract specifications align with functional requirements? [Consistency, Spec §FR-003 vs Contract]
- [ ] CHK010 - Are error handling requirements consistent between spec and contract? [Consistency, Spec §FR-006 vs Contract §Errors]
- [ ] CHK011 - Is the token storage approach consistent with assumptions? [Consistency, Spec §Assumptions vs §FR-005]

## Acceptance Criteria Quality

- [ ] CHK012 - Are success criteria quantifiable with specific metrics? [Measurability, Spec §SC-001 to SC-004]
- [ ] CHK013 - Can SC-001 (30 segundos) be objectively verified? [Measurability, Spec §SC-001]
- [ ] CHK014 - Can SC-002 (95% taxa de sucesso) be measured? [Measurability, Spec §SC-002]
- [ ] CHK015 - Can SC-004 (tratamento de erros em 2 segundos) be verified? [Measurability, Spec §SC-004]

## Scenario Coverage

- [ ] CHK016 - Are all primary flow endpoints covered in the contract? [Coverage, Spec §User Story 1]
- [ ] CHK017 - Is the fallback login flow documented in requirements? [Coverage, Spec §User Story 2]
- [ ] CHK018 - Are error scenarios (400, 401, 500) explicitly handled in contract? [Coverage, Contract §Errors]

## Edge Case Coverage

- [ ] CHK019 - Is replay attack prevention (code reuse) addressed in requirements? [Edge Case, Spec §Edge Cases]
- [ ] CHK020 - Is browser close during auth flow handled in requirements? [Edge Case, Spec §Edge Cases]

## Non-Functional Requirements

- [ ] CHK021 - Are performance requirements (SC-001, SC-004) testable? [Performance, Spec §Success Criteria]
- [x] CHK022 - Is security requirement for callback protection specified? [Security, Spec §FR-008] ✅ Reviewed - T014b covers state validation + replay protection

## Ambiguities & Gaps

- [x] CHK023 - Is the state parameter validation logic documented? [Gap, Contract §GET /auth/govbr-auth-url] ✅ Reviewed - Contract specifies state field in response
- [ ] CHK024 - Is the redirect URI validation on backend specified? [Ambiguity] - Backend responsibility (out of scope for frontend)