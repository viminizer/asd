---
name: planning
description: "Use when creating implementation plans from feature descriptions or brainstorm output. Transforms ideas into structured, validated plans with appropriate detail levels."
---

# Planning

Create implementation plans from ideas or brainstorm output.

## When to Use

- User provides feature description
- After `/asd:brainstorm` completes
- When converting requirements to actionable plans

## Process

### Phase 1: Check for Brainstorm

**Always check first:**

```bash
ls -la docs/brainstorms/*.md 2>/dev/null | head -5
```

**If brainstorm exists (within 14 days):**
1. Read the brainstorm doc thoroughly
2. Extract: key decisions, approach, constraints, open questions
3. Use as primary input
4. Skip idea refinement

**If no brainstorm → Phase 2.**

### Phase 2: Idea Refinement (if no brainstorm)

Ask questions one at a time:
- What problem does this solve?
- Who are the users?
- Any constraints or dependencies?
- How will you measure success?

### Phase 3: Local Research

Run in parallel:
- Check CLAUDE.md for project conventions
- Look for existing patterns in codebase
- Check `docs/solutions/` for relevant learnings

### Phase 4: External Research (if needed)

**Research if:**
- Security, payments, external APIs
- Unfamiliar technology
- No codebase patterns exist

**Skip if:**
- Clear codebase patterns exist
- User knows exactly what they want

### Phase 5: Generate Plan

Create plan with appropriate detail level:

#### MINIMAL
```markdown
---
title: <title>
type: feat|fix|refactor
status: active
date: YYYY-MM-DD
---

# <Title>

## Problem
[What we're solving]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Context
[Any critical info]
```

#### STANDARD
```markdown
---
title: <title>
type: feat|fix|refactor
status: active
date: YYYY-MM-DD
origin: docs/brainstorms/YYYY-MM-DD-<topic>-brainstorm.md
---

# <Title>

## Overview
[Description]

## Problem Statement
[Why this matters]

## Proposed Solution
[High-level approach]

## Technical Considerations
- Architecture impacts
- Performance implications

## Acceptance Criteria
- [ ] Functional requirement 1
- [ ] Functional requirement 2

## Dependencies & Risks
[What could block this]
```

#### COMPREHENSIVE
Includes: detailed implementation phases, alternative approaches, system-wide impact analysis, integration test scenarios.

### Phase 5.5: Dependency Analysis (Mandatory)

For each task/phase in the plan, explicitly determine:

- **Direct dependencies** - What must complete first
- **Indirect dependencies** - What affects indirectly
- **Whether it mutates:**
  - Database schema
  - Shared APIs / DTOs
  - Core domain models
  - Cross-cutting concerns
- **Whether it introduces foundational infrastructure**
- **Whether it can execute in parallel** with other tasks

No circular dependencies allowed.

### Phase 5.6: Group Construction

**A task MUST be isolated in its own group if it:**

- Modifies database schema
- Changes shared contracts (API, DTO, domain core)
- Introduces foundational layers
- Is internally depended upon by another task
- Restructures core logic
- Requires heavy reasoning or possible compaction

**Tasks MAY share a group ONLY if:**

- No direct dependency between them
- No indirect dependency between them
- No shared schema or contract mutation
- They depend only on already-completed groups
- They could be implemented safely in parallel

If unsure → isolate. Dependency order overrides size.

### Phase 5.7: Execution Contract

Include this section in the generated plan:

```markdown
## Execution Contract

### Branch Strategy

Before starting Group 1:

git checkout develop
git pull
git checkout -b feat/<FEATURE_NAME>

All groups continue on the same branch.

### Commit Strategy

Within each group, commit per logical unit:

- migration
- entity
- repository
- service
- controller
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

### Group Completion Protocol

After completing a group:

1. Run tests
2. Verify:
   - All tests pass (full suite)
   - No uncommitted changes
   - Acceptance criteria completed
3. Commit all changes
4. Clear context: /clear
5. Start next group: /asd:execute <PLAN_FILE> group <NEXT_GROUP_ID>

### Clean Context Rule

A clean context is mandatory:
- Between groups
- After schema or contract mutations
- After structural phases
- If compaction occurred
```

### Phase 6: VALIDATE PLAN

**Before finalizing, run validation checklist:**

- [ ] Title is descriptive and searchable
- [ ] All acceptance criteria are testable (not vague)
- [ ] Dependencies are identified
- [ ] No scope creep (边界清晰)
- [ ] Technical approach is feasible
- [ ] Files to modify are identified
- [ ] Risks are documented
- [ ] **Dependency graph is explicit** - Each task's dependencies are listed
- [ ] **Group isolation rules applied** - Schema/contract changes isolated
- [ ] **Execution contract included** - Branch strategy, commit rules, completion protocol
- [ ] **No circular dependencies**

**If validation fails:**
- Fix issues
- Re-validate
- Max 3 iterations

### Phase 7: Write Plan

Save to `docs/asd/plans/YYYY-MM-DD-<name>-plan.md`

### Phase 8: Offer Next Steps

1. Execute → `/asd:execute`
2. Refine → Improve specific sections
3. Deepen → More research

## Output Location

`docs/asd/plans/YYYY-MM-DD-<type>-<name>-plan.md`

## Key Principles

- **Validate before executing** - Plans must pass validation
- **YAGNI** - Start simple, add complexity only if needed
- **Testable criteria** - Every acceptance criterion must be verifiable
- **Clear boundaries** - Know what's in scope and out of scope
