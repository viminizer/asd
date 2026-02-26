# Enterprise-Safe Group Execution Strategy

This prioritizes safety, auditability, and contract stability over speed.

Dependency order overrides size.

---

## 1. Hard Isolation Rules (Non-Negotiable)

A phase MUST be isolated in its own group if it:

- Modifies database schema (tables, columns, constraints, indexes)
- Changes shared APIs or DTO contracts
- Alters core domain models used across modules
- Changes transaction boundaries
- Introduces or modifies cross-cutting concerns
  (security, auditing, validation, caching)
- Performs refactors affecting multiple bounded contexts
- Requires data migration
- Is likely to require compaction

Schema mutation ⇒ always isolated  
Contract mutation ⇒ always isolated  
Cross-cutting change ⇒ always isolated

---

## 2. Parallel-Safe Grouping (Allowed Only If All Conditions Hold)

Phases may share a group only if:

- No direct dependency
- No indirect dependency
- No circular dependency
- No shared contract mutation
- No shared schema mutation
- They only consume stable, already-committed contracts
- They could be implemented in parallel by separate engineers safely

If any condition fails → isolate.

---

## 3. Group Definition Format

Group <N>: Phase <A>, Phase <B>

Groups execute strictly in order:

G1 → G2 → G3 → ...

No group may depend on a partially completed group.

---

## 4. Execution Command

/workflows:work <PLAN_FILE_PATH> group <GROUP_ID>

---

## 5. Branch Strategy

Before starting Group 1:

git checkout develop  
git pull  
git checkout -b feat/<FEATURE_NAME>

All groups continue on the same branch.

No rebasing mid-group.  
No force pushes.

---

## 6. Commit Strategy (Audit-Friendly)

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
- No skipped tests
- No TODO placeholders
- No partial implementations
- No bundling entire group into one commit

Use conventional commits:

feat(scope): add X  
refactor(scope): adjust Y  
fix(scope): correct Z  
test(scope): add coverage

---

## 7. Group Completion Protocol (Strict)

After finishing a group:

1. Run tests  
   cd <PROJECT_ROOT> && <TEST_COMMAND>

2. Verify:

   - All tests pass
   - No uncommitted changes
   - Acceptance criteria fully completed
   - No temporary debug code

3. Commit all changes

4. Clear context  
   /clear

5. Start next group  
   /workflows:work <PLAN_FILE_PATH> group <NEXT_GROUP_ID>

---

## 8. Additional Enterprise Safeguards

- Never mix schema changes with feature logic in the same group
- Never mix refactors with new features in the same group
- Never modify shared contracts and implement dependent features in the same group
- Always complete and commit foundational layers before dependent layers begin

---

Mental Model:

Stability > Speed  
Isolation > Convenience  
Explicit boundaries > Implicit coupling

If there is any doubt about independence, isolate the phase.
