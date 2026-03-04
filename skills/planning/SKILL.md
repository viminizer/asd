---
name: planning
description: "Create implementation plans with research and bite-sized TDD tasks. Use when converting feature descriptions or brainstorm output into actionable plans."
---

# Planning

Create validated implementation plans from ideas or brainstorm output. Plans combine strategic context with bite-sized TDD tasks in sequential order.

## When to Use

- User provides a feature description
- After `/asd:brainstorm` completes
- When converting requirements to actionable plans

## Phase 1: Input Resolution

### 1a. Check for Brainstorm Context

If invoked from `/asd:brainstorm`, design context is already available in the conversation. Extract: key decisions, approach, constraints, open questions. Skip to Phase 2.

### 1b. Idea Refinement (if no brainstorm context)

If the feature description is already detailed, offer: "Description is clear. Proceed with research?"

Otherwise, ask questions one at a time via AskUserQuestion:
- What problem does this solve?
- Any constraints or dependencies?
- How will you measure success?

## Phase 2: Research (Parallel)

Launch all three research agents in parallel:
- Task asd-repo-researcher(feature_description)
- Task asd-learnings-researcher(feature_description)
- Task asd-docs-researcher(feature_description)

Wait for all agents to return. Synthesize findings into a unified research context for plan generation.

## Phase 3: Plan Generation

### 3a. Load Template

Read the plan template for structure reference:
```
Read templates/plan.md
```

### 3b. Scale to Scope

Scale the plan naturally based on scope. Small changes get short plans. Large changes get more detail. No flags needed - just use good judgment.

### 3c. Write Strategic Sections

Generate the plan header sections per template:
- Frontmatter (title, type, status, date, origin if brainstorm)
- Problem statement, proposed solution
- Technical considerations (if scope warrants)
- Alternative approaches, system-wide impact (for large changes)

### 3d. Write Bite-Sized Tasks

Write tasks in sequential order (foundational work first, then features that build on it). Follow this TDD format:

```
### Task N: [Name]

**Files:**
- Create: exact/path/to/file.ext
- Modify: exact/path/to/existing.ext
- Test: tests/exact/path/to/test.ext

**Step 1: Write failing test** [exact test code]
**Step 2: Run test (expect fail)** [exact command + expected error]
**Step 3: Implement** [exact implementation code]
**Step 4: Verify** [exact command + expected PASS]
**Step 5: Commit** [exact commit command]
```

**Task rules:**
- Each task is one action (2-5 minutes)
- Include exact file paths, exact code, exact commands
- Assume the engineer has zero codebase context
- Include expected output for verification commands

### 3e. Write Footer Sections

- Acceptance criteria (testable, specific)
- Risks and dependencies

## Phase 4: Validate, Write, and Next Steps

### 4a. Self-Check

Run the validation checklist. Max 2 fix iterations.

- [ ] Title is descriptive and searchable
- [ ] All acceptance criteria are testable (not vague)
- [ ] Tasks are in logical sequential order (foundational work first)
- [ ] Files to modify are identified with exact paths
- [ ] Risks are documented
- [ ] Brainstorm cross-check passed (if brainstorm exists: every key decision reflected)

If validation fails: fix issues, re-validate. After 2 failures, write plan with warnings.

### 4b. Write Plan

```bash
mkdir -p docs/asd/plans/
```

Save to `docs/asd/plans/YYYY-MM-DD-<type>-<name>-plan.md`

Filename rules:
- Date prefix required
- Type prefix after date (feat, fix, refactor)
- Kebab-case, 3-5 descriptive words
- End with `-plan.md`

### 4c. Agent Validation

Dispatch the plan validator on the written plan:
- Task asd-plan-validator(plan_file_content)

If validator returns issues:
- Fix critical issues inline (max 2 iterations)
- Warnings are noted but don't block

### 4d. Next Steps

Use AskUserQuestion to present options:

1. **Review** (Recommended) → `/asd:technical_review docs/asd/plans/<filename>`
2. **Execute** → `/asd:execute docs/asd/plans/<filename>`
3. **Refine** → Improve specific sections

## Key Principles

- **Validate before writing** - Plans must pass self-check
- **YAGNI** - Scale plan to scope, no more
- **Testable criteria** - Every acceptance criterion must be verifiable
- **Zero-context tasks** - Engineer needs no prior codebase knowledge
- **DRY** - No duplicate information across plan sections
