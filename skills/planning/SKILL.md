---
name: planning
description: "Create implementation plans with research, dependency analysis, and bite-sized TDD tasks. Use when converting feature descriptions or brainstorm output into actionable plans."
---

# Planning

Create validated implementation plans from ideas or brainstorm output. Plans combine strategic context with bite-sized TDD tasks grouped by dependency order.

## When to Use

- User provides a feature description
- After `/asd:brainstorm` completes
- When converting requirements to actionable plans

Announce: "Using the planning skill to create the implementation plan."

## Phase 1: Input Resolution

### 1a. Check for Brainstorm

Look for recent brainstorm documents matching the feature:

```bash
ls -la docs/brainstorms/*.md 2>/dev/null | head -5
```

**If brainstorm found (within 14 days, topic matches):**
1. Read the brainstorm thoroughly
2. Extract: key decisions, approach, constraints, open questions
3. Announce: "Found brainstorm from [date]: [topic]. Using as foundation."
4. Skip idea refinement (Phase 1b)

**If no brainstorm found** → Phase 1b.

### 1b. Idea Refinement (if no brainstorm)

Ask questions one at a time via AskUserQuestion:
- What problem does this solve?
- Any constraints or dependencies?
- How will you measure success?

Note signals for research decision: user familiarity, topic risk, uncertainty level.

**Skip if:** Feature description is already detailed. Offer: "Description is clear. Proceed with research?"

## Phase 2: Research (Parallel)

### 2a. Local Research (always runs)

Launch both agents in parallel:
- Task asd-repo-researcher(feature_description)
- Task asd-learnings-researcher(feature_description)

### 2b. Research Decision

Based on signals from Phase 1 and findings from Phase 2a:

**Always research externally:** Security, payments, external APIs, data privacy.
**Skip external research:** Strong local patterns exist, user knows what they want.
**Research if uncertain:** New technology, no codebase examples, open-ended approach.

Announce the decision briefly and proceed.

### 2c. External Research (conditional)

If external research warranted, use:
- WebSearch for best practices and current patterns
- Context7 MCP for framework-specific documentation and code examples

## Phase 3: Plan Generation

### 3a. Load Template

Read the plan template for structure reference:
```
Read @asd/templates/plan.md
```

### 3b. Auto-Detect Detail Level

Select based on scope (user can override with `--level` flag):
- **MINIMAL:** 1-2 files, single concern (bugs, small fixes)
- **STANDARD:** 3-10 files, multiple concerns (most features)
- **COMPREHENSIVE:** 10+ files, architectural change (major features)

### 3c. Write Strategic Sections

Generate the plan header sections per template:
- Frontmatter (title, type, status, date, origin if brainstorm)
- Problem statement, proposed solution
- Technical considerations (STANDARD+)
- Alternative approaches, system-wide impact (COMPREHENSIVE)

### 3d. Dependency Analysis (STANDARD+ mandatory)

For each planned task, determine:
- Direct dependencies (what must complete first)
- Whether it mutates: database schema, shared APIs/DTOs, core domain models
- Whether it introduces foundational infrastructure
- Whether it can execute in parallel with other tasks

No circular dependencies allowed.

### 3e. Group Construction (STANDARD+ mandatory)

**Isolate a task in its own group if it:**
- Modifies database schema or shared contracts
- Introduces foundational layers
- Is depended upon by other tasks
- Requires heavy reasoning or possible compaction

**Tasks may share a group only if:**
- No direct or indirect dependency between them
- No shared schema or contract mutation
- They depend only on already-completed groups

If unsure → isolate.

### 3f. Write Bite-Sized Tasks

For each task within each group, follow superpowers TDD format:

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

### 3g. Write Footer Sections

- Acceptance criteria (testable, specific)
- Execution contract (COMPREHENSIVE: commit strategy, group protocol, clean context rule)
- Risks and dependencies

**Planning does NOT create branches.** Document branch strategy in the execution contract for `/asd:execute` to follow.

## Phase 4: Validation

Self-check before writing. Max 3 fix iterations.

- [ ] Title is descriptive and searchable
- [ ] All acceptance criteria are testable (not vague)
- [ ] Dependencies are explicit, no circular dependencies
- [ ] Group isolation rules applied (schema/contract changes isolated)
- [ ] Files to modify are identified with exact paths
- [ ] Risks are documented
- [ ] Brainstorm cross-check passed (if brainstorm exists: every key decision reflected)

If validation fails: fix issues, re-validate. After 3 failures, write plan with warnings.

## Phase 5: Write and Offer Next Steps

### 5a. Write Plan

```bash
mkdir -p docs/asd/plans/
```

Save to `docs/asd/plans/YYYY-MM-DD-<type>-<name>-plan.md`

Filename rules:
- Date prefix required
- Type prefix after date (feat, fix, refactor)
- Kebab-case, 3-5 descriptive words
- End with `-plan.md`

### 5b. Next Steps

Use AskUserQuestion to present options:

1. **Execute** → `/asd:execute docs/asd/plans/<filename>`
2. **Refine** → Improve specific sections
3. **Deepen** → Add more research to specific areas

**Pipeline mode:** If invoked from an automated workflow with `disable-model-invocation`, skip AskUserQuestion. Write plan and return silently.

## Key Principles

- **Validate before writing** - Plans must pass self-check
- **YAGNI** - Start with MINIMAL, escalate only if scope demands it
- **Testable criteria** - Every acceptance criterion must be verifiable
- **Zero-context tasks** - Engineer needs no prior codebase knowledge
- **DRY** - No duplicate information across plan sections
