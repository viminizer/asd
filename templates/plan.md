---
title: <title>
type: feat|fix|refactor
status: not-started|in-progress|complete
date: YYYY-MM-DD
detail-level: minimal|standard|comprehensive
origin: docs/brainstorms/YYYY-MM-DD-<topic>-brainstorm.md
---

<!-- DETAIL LEVEL: MINIMAL -->
<!-- Use for: simple bugs, small improvements, 1-2 files -->

# <Title>

## Problem
[What we're solving and why it matters]

## Solution
[Approach in 2-3 sentences]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Implementation

### Task 1: [Name]

**Files:**
- Create: `exact/path/to/file.ext`
- Modify: `exact/path/to/existing.ext`
- Test: `tests/exact/path/to/test.ext`

**Step 1: Write failing test**
```language
// exact test code
```

**Step 2: Run test (expect fail)**
Run: `<test command>`
Expected: FAIL with "<error message>"

**Step 3: Implement**
```language
// exact implementation code
```

**Step 4: Verify**
Run: `<test command>`
Expected: PASS

**Step 5: Commit**
```bash
git add <files>
git commit -m "<type>(scope): description"
```

---

<!-- DETAIL LEVEL: STANDARD -->
<!-- Use for: most features, complex bugs, 3-10 files -->
<!-- Includes everything from MINIMAL plus sections below -->

## Overview
[Comprehensive description of the feature/fix]

## Problem Statement
[Why this matters, who is affected, what happens if we don't fix it]

## Proposed Solution
[High-level approach with rationale]

## Technical Considerations
- Architecture impacts
- Performance implications
- Security considerations

## Dependencies & Risks
- [Dependency/risk and mitigation]

## Implementation Groups

<!-- Group tasks by dependency order. Isolate groups that: -->
<!-- - Modify database schema -->
<!-- - Change shared contracts (API, DTO, domain core) -->
<!-- - Introduce foundational layers -->
<!-- - Are depended upon by other groups -->

### Group 1: [Foundation] (depends: none)

#### Task 1: [Name]

**Files:**
- Create: `exact/path/to/file.ext`
- Modify: `exact/path/to/existing.ext`
- Test: `tests/exact/path/to/test.ext`

**Step 1: Write failing test**
```language
// exact test code
```

**Step 2: Run test (expect fail)**
Run: `<test command>`
Expected: FAIL

**Step 3: Implement**
```language
// exact implementation code
```

**Step 4: Verify**
Run: `<test command>`
Expected: PASS

**Step 5: Commit**
```bash
git commit -m "<type>(scope): description"
```

### Group 2: [Core Logic] (depends: Group 1)

#### Task 2: [Name]
<!-- Same structure as Task 1 -->

## Acceptance Criteria
- [ ] Functional requirement 1
- [ ] Functional requirement 2
- [ ] Tests pass, no regressions

---

<!-- DETAIL LEVEL: COMPREHENSIVE -->
<!-- Use for: major features, architectural changes, 10+ files -->
<!-- Includes everything from STANDARD plus sections below -->

## Alternative Approaches Considered
| Approach | Pros | Cons | Why Rejected |
|----------|------|------|-------------|
| [Approach A] | ... | ... | ... |

## System-Wide Impact
- **Interaction graph:** What callbacks/middleware/observers fire?
- **Error propagation:** How do errors flow across layers?
- **State lifecycle:** Can partial failure leave inconsistent state?
- **API surface parity:** What other interfaces need the same change?

## Execution Contract

### Commit Strategy
Within each group, commit per logical unit:
- migration, entity, repository, service, controller, test

Rules:
- Code compiles after each commit
- Full test suite passes
- No disabled or partial implementations
- Use conventional commits: `feat(scope):`, `fix(scope):`, `test(scope):`

### Group Completion Protocol
After completing each group:
1. Run full test suite
2. Verify: all tests pass, no uncommitted changes, acceptance criteria met
3. Commit remaining changes
4. Clear context: `/clear`
5. Start next group: `/asd:execute <PLAN_FILE> group <NEXT_GROUP_ID>`

### Clean Context Rule
Clean context is mandatory:
- Between groups
- After schema or contract mutations
- After structural phases
- If compaction occurred

## Success Metrics
[How we measure success quantitatively]

## Sources
- **Origin brainstorm:** [path] (if applicable)
- **Codebase patterns:** [file_path:line]
- **External docs:** [url]
