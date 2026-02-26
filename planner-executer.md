# PLANNER MODE INSTRUCTION

# (Group Derivation + Embedded Execution Contract)

Your responsibilities are:

1. Analyze all phases.
2. Build a dependency graph.
3. Divide phases into execution groups.
4. Embed a complete Execution Contract section into the plan.
5. Produce a self-contained plan that an Executor Agent can follow without reinterpretation.

Do NOT implement code.
Do NOT skip dependency analysis.
Do NOT leave grouping implicit.

---

# STEP 1 — Dependency Analysis (Mandatory)

For every phase, explicitly determine:

- Direct dependencies (which phases must complete first)
- Indirect dependencies
- Whether it mutates:
  - Database schema
  - Shared APIs / DTOs
  - Core domain models
  - Cross-cutting concerns
- Whether it introduces foundational infrastructure
- Whether it can be implemented in parallel with any other phase

Build a clear dependency ordering before grouping.

No circular dependencies allowed.

---

# STEP 2 — Group Construction Rules

Apply these rules strictly:

## A phase MUST be isolated in its own group if it

- Modifies database schema
- Changes shared contracts
- Introduces foundational domain layers
- Is depended on internally by another phase
- Restructures core logic
- Requires heavy reasoning or possible compaction

## Phases MAY share a group ONLY if

- No direct dependency between them
- No indirect dependency between them
- No shared contract or schema mutation
- They depend only on already-completed groups
- They could be implemented safely in parallel

If unsure → isolate.

Dependency order overrides size.

---

# STEP 3 — Output Required Structure

The final plan MUST contain these sections in this exact order:

---

## 1. Dependency Graph

Provide explicit dependency relationships.

Example format:

Phase 1 → Phase 2  
Phase 2 → Phase 4  
Phase 3 (independent)

---

## 2. Execution Groups

Define groups clearly:

Group 1: Phase X  
Group 2: Phase Y, Phase Z  
Group 3: Phase A

Groups must execute sequentially:

G1 → G2 → G3

Each group depends on all prior groups being fully completed and committed.

---

## 3. Execution Contract (For Executor Agent)

Include this section verbatim in the generated plan:

---

### Execution Instructions

Run:

/workflows:work <PLAN_FILE_PATH> group <GROUP_ID>

---

### Branch Strategy

Before starting Group 1:

git checkout develop  
git pull  
git checkout -b feat/<FEATURE_NAME> or git checkout -b fix/<FIX_NAME>

All groups continue on the same branch.

---

### Commit Strategy

Within each group:

Commit per logical unit:

- migration
- entity
- repository
- service
- controller
- calculator
- test class

Rules:

- Code compiles
- All tests pass
- No disabled tests
- No partial implementations
- No bundling entire group into one commit

Use conventional commits:
feat(scope): add X  
refactor(scope): adjust Y  
fix(scope): correct Z  
test(scope): add coverage

---

### Group Completion Protocol

After completing a group:

1. Run tests:
   cd <PROJECT_ROOT> && <TEST_COMMAND>

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

### Clean Context Rule

A clean context is mandatory:

- Between groups
- After schema or contract mutations
- After structural phases
- If compaction occurred

---

# STEP 4 — Quality Constraints

The plan must be:

- Deterministic
- Explicit about ordering
- Explicit about isolation boundaries
- Safe for enterprise execution
- Free of ambiguity
- Immediately executable by a separate agent

Do not assume executor reasoning.
Do not omit execution contract.
Do not collapse dependency layers for convenience.

Planning ends when groups and execution contract are fully embedded.
