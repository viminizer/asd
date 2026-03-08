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

## Language detection

Before launching subagents, detect the project language from file extensions and build files:
- **Java:** `.java` files, `pom.xml` or `build.gradle` present → use `asd-java-reviewer`
- **TypeScript/JavaScript:** `.ts`, `.tsx`, `.js`, `.jsx` files, `package.json` present → use `asd-ts-reviewer`
- **Other or mixed:** use `asd-code-reviewer`

### Phase 1: Read and understand

Read the plan file completely. Identify:
- Technologies and frameworks involved
- File paths referenced
- Database/migration changes
- Security-sensitive areas (auth, payments, data handling)
- Scale of change (number of files, complexity)

### Phase 2: Quick sanity check

Planning already validates structure. Focus only on what planning can't catch:

- **Unstated assumptions** - Dependencies on external services, environment, data
- **Scope creep risk** - Tasks that are too broad or could expand
- **Unresolved decisions** - Open questions that should be settled before execution

### Phase 3: Technical soundness

Use the Agent tool to launch the appropriate reviewer subagent (`subagent_type: "asd:asd-java-reviewer"`, `"asd:asd-ts-reviewer"`, or `"asd:asd-code-reviewer"`) for technical approach:

```
Review scope: plan-level audit

Review the technical approach in this plan for soundness.
Focus on the implementation strategy, not document quality.

[Full plan content]

Run relevant passes: security, performance, architecture, database.
Skip passes that don't apply based on plan content.
```

### Phase 4: Learnings check (conditional)

If `docs/solutions/` exists, scan for past solutions that relate to the plan's domain. Flag any learnings that the plan should account for.

Skip this phase if the directory doesn't exist.

### Phase 5: Report

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

### Phase 6: Score

Score the plan on each criterion from 1 to 10. Base scores on findings from phases 2-4.

```
## Plan score

| Criteria                    | Score | Notes                                |
|-----------------------------|-------|--------------------------------------|
| Clarity                     |  _/10 | How easy to understand and follow    |
| Completeness                |  _/10 | All requirements and edge cases covered |
| Specificity                 |  _/10 | Exact paths, commands, expected outputs |
| YAGNI                       |  _/10 | No unnecessary features or abstractions |
| Technical soundness         |  _/10 | Correct approach, no design flaws    |
| Implementation feasibility  |  _/10 | Realistic scope, correct ordering    |

**Overall: _/10**
```

Overall is the average of all six scores, rounded to one decimal.

### Phase 7: Next steps

Based on findings and score:

- **Critical issues or overall < 6** - Fix the plan, then re-review (`/asd:technical_review`)
- **Warnings only or overall 6-7** - Ask: fix first or proceed to `/asd:execute`?
- **Clean / suggestions only or overall > 7** - Offer `/asd:execute`

## Rules

- Review only - never modify the plan file
- Be specific: quote the problematic section
- Be actionable: say what to fix, not just what's wrong
- Don't block on style preferences
- One pass through the plan, not iterative refinement (this isn't document editing)
- If the plan is small (1-2 tasks), skip feasibility deep-dive
- Max 2 minutes of review time - this is a gate check, not research
