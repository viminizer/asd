# Group Derivation + Embedded Execution Contract

## 1. Dependency Analysis (Mandatory)

For every phase, explicitly determine:

- Direct dependencies
- Indirect dependencies
- Whether it mutates:
  - Database schema
  - Shared APIs / DTOs
  - Core domain models
  - Cross-cutting concerns
- Whether it introduces foundational infrastructure
- Whether it can execute in parallel with any other phase

Establish a clear dependency order first.

No circular dependencies allowed.

---

## 2. Group Construction Rules

### A phase MUST be isolated in its own group if it

- Modifies database schema
- Changes shared contracts (API, DTO, domain core)
- Introduces foundational layers
- Is internally depended upon by another phase
- Restructures core logic
- Requires heavy reasoning or possible compaction

### Phases MAY share a group ONLY if

- No direct dependency between them
- No indirect dependency between them
- No shared schema or contract mutation
- They depend only on already-completed groups
- They could be implemented safely in parallel

If unsure → isolate.

Dependency order overrides size.

---

## 3. Required Output Structure

The final plan must contain these sections in this exact order:

### 1. Dependency Graph

Explicit relationships, e.g.:

Phase 1 → Phase 2  
Phase 2 → Phase 4  
Phase 3 (independent)

---

### 2. Execution Groups

Define clearly:

Group 1: Phase X  
Group 2: Phase Y, Phase Z  
Group 3: Phase A

Execution order:

G1 → G2 → G3

Each group depends on all prior groups being completed and committed.

---

### 3. Execution Contract

Include this section verbatim in the generated plan:

#### Branch Strategy

Before starting Group 1:

git checkout develop  
git pull  
git checkout -b feat/<FEATURE_NAME>

All groups continue on the same branch.

---

#### Commit Strategy

Within each group, commit per logical unit:

- migration
- entity
- repository
- service
- controller
- calculator
- test class

Rules:

- Code compiles
- Full test suite passes
- No disabled tests
- No partial implementations
- Do not bundle an entire group into one commit

Use conventional commits:
feat(scope): add X  
refactor(scope): adjust Y  
fix(scope): correct Z  
test(scope): add coverage

---

### Group Completion Protocol

After completing a group:

1. Run tests
2. Verify:

   - All tests pass (full suite)
   - No uncommitted changes
   - Acceptance criteria completed

3. Commit all changes

4. Clear context:
   /clear

5. Start next group:
   /workflows:work <PLAN_FILE_PATH> group <NEXT_GROUP_ID>

---

#### Clean Context Rule

A clean context is mandatory:

- Between groups
- After schema or contract mutations
- After structural phases
- If compaction occurred

---

The generated plan must be deterministic, explicit about ordering, and safe for execution without reinterpretation.
