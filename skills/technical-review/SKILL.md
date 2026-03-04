---
name: technical-review
description: "Use when reviewing implementation plans before execution. Checks plan quality, technical soundness, and implementation feasibility."
---

# Technical review

Review implementation plans to catch issues before execution starts.

## When to use

- After `/asd:plan` creates a plan
- Before `/asd:execute`
- Suggested automatically after plan creation

## Process

### Phase 1: Read and understand

Read the plan file completely. Identify:
- Technologies and frameworks involved
- File paths referenced
- Database/migration changes
- Security-sensitive areas (auth, payments, data handling)
- Scale of change (number of files, complexity)

### Phase 2: Plan quality check

Assess the plan as a document. Ask:

- **What is unclear?** - Vague language ("probably," "consider," "try to"), ambiguous requirements
- **What is unnecessary?** - Over-engineered sections, hypothetical features, premature abstractions
- **What decision is being avoided?** - Open questions that should be resolved before implementation
- **What assumptions are unstated?** - Dependencies on external services, environment assumptions, data assumptions
- **Where could scope expand?** - Tasks that are too broad, missing boundaries

Evaluate against:

| Criterion | What to check |
|-----------|---------------|
| **Clarity** | Problem statement is clear, tasks are unambiguous, no hand-waving |
| **Completeness** | All acceptance criteria are testable, no gaps between tasks and criteria |
| **Specificity** | Tasks have concrete file paths, code patterns, and expected behavior |
| **YAGNI** | No hypothetical features, simplest approach chosen, no premature abstractions |

### Phase 3: Technical soundness

Dispatch the `asd-code-reviewer` agent to review the plan's technical approach:

```
Review scope: plan-level audit

Review the technical approach in this plan for soundness.
Focus on the implementation strategy, not document quality.

[Full plan content]

Run relevant passes: security, performance, architecture, database.
Skip passes that don't apply based on plan content.
```

### Phase 4: Implementation feasibility

Check the plan as a set of executable tasks:

- **Task ordering** - Are dependencies correct? Would any task fail because a prerequisite isn't done yet?
- **File paths** - Do referenced files exist? Are create vs modify designations correct?
- **Scope per task** - Is any single task too large? Could it be split?
- **Test strategy** - Does each task have a clear verification step?
- **Missing tasks** - Are there implicit steps not captured (migrations, config changes, dependency installs)?

### Phase 5: Learnings check (conditional)

If `docs/asd/solutions/` exists, scan for past solutions that relate to the plan's domain. Flag any learnings that the plan should account for.

Skip this phase if the directory doesn't exist.

### Phase 6: Report

Organize all findings by severity:

```
## Technical review: [plan title]

### Critical (must fix before executing)
- [Source: quality/soundness/feasibility] Description + what to fix

### Warning (should fix)
- [Source: quality/soundness/feasibility] Description + what to fix

### Suggestion (consider)
- [Source: quality/soundness/feasibility] Description + suggested improvement
```

If no issues found, report **PASS**.

### Phase 7: Next steps

Based on findings:

- **Critical issues** - Fix the plan, then re-review (`/asd:technical_review`)
- **Warnings only** - Ask: fix first or proceed to `/asd:execute`?
- **Clean / suggestions only** - Offer `/asd:execute`

## Rules

- Review only - never modify the plan file
- Be specific: quote the problematic section
- Be actionable: say what to fix, not just what's wrong
- Don't block on style preferences
- One pass through the plan, not iterative refinement (this isn't document editing)
- If the plan is small (1-2 tasks), skip feasibility deep-dive
- Max 2 minutes of review time - this is a gate check, not research
