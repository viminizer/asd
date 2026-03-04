---
name: asd:plan
description: "Create implementation plans with research, dependency analysis, and bite-sized TDD tasks."
argument-hint: "[feature description]"
---

# /asd:plan

Transform feature descriptions into validated implementation plans.

## What It Does

1. **Input** - Use brainstorm context if available, or refine idea with user
2. **Research** - Parallel local research via `asd-repo-researcher` + `asd-learnings-researcher`. External research if needed.
3. **Plan** - Strategic overview + dependency-ordered groups with bite-sized TDD tasks
4. **Validate** - Self-check plan quality (max 3 iterations)
5. **Write** - Save to `docs/asd/plans/YYYY-MM-DD-<type>-<name>-plan.md`
6. **Next** - Offer: Execute / Refine / Deepen

## Feature Description

<feature_description> #$ARGUMENTS </feature_description>

**If empty, ask:** "What would you like to plan?"

## Execution

Invoke the `planning` skill and follow it exactly.

## Output

Plan at `docs/asd/plans/YYYY-MM-DD-<type>-<name>-plan.md`

## Next Step

After plan is written → `/asd:execute`
