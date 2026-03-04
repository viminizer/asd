---
name: asd:plan
description: "Create implementation plans with research, dependency analysis, and bite-sized TDD tasks."
argument-hint: "[feature description] [--level minimal|standard|comprehensive]"
---

# /asd:plan

Transform feature descriptions into validated implementation plans.

## Usage

```
/asd:plan add user authentication with JWT
/asd:plan --level comprehensive redesign the payment system
/asd:plan fix the race condition in checkout
```

## What It Does

1. **Input** - Check for brainstorm output, or refine idea with user
2. **Research** - Parallel local research (codebase patterns + past learnings). External research if high-risk.
3. **Plan** - Generate hybrid plan: strategic overview + dependency-ordered groups with bite-sized TDD tasks
4. **Validate** - Self-check plan quality (max 3 iterations)
5. **Write** - Save to `docs/asd/plans/YYYY-MM-DD-<type>-<name>-plan.md`
6. **Next** - Offer: Execute / Refine / Deepen

## Feature Description

<feature_description> #$ARGUMENTS </feature_description>

**If empty, ask:** "What would you like to plan?"

## Execution

Invoke the `planning` skill and follow it exactly.

## Detail Levels

| Level | Scope | Output |
|-------|-------|--------|
| MINIMAL | 1-2 files | Problem + tasks + criteria |
| STANDARD | 3-10 files | + groups, dependencies, risks |
| COMPREHENSIVE | 10+ files | + impact analysis, execution contract, alternatives |

Auto-detected from scope. Override with `--level`.

## Output

Plan at `docs/asd/plans/YYYY-MM-DD-<type>-<name>-plan.md`

## Next Step

After plan is written → `/asd:execute`
