---
name: asd:plan
description: "Create implementation plans with research and bite-sized TDD tasks."
argument-hint: "[feature description]"
---

# /asd:plan

Transform feature descriptions into validated implementation plans.

## What It Does

1. **Input** - Use brainstorm context if available, or refine idea with user
2. **Research** - Parallel research via `asd-repo-researcher` + `asd-learnings-researcher` + `asd-docs-researcher`
3. **Plan** - Strategic overview + sequential bite-sized TDD tasks
4. **Validate + Write** - Agent validation via `asd-plan-validator`, save to `docs/plans/`
5. **Next** - Offer: Review (recommended) / Execute / Refine

## Feature Description

<feature_description> #$ARGUMENTS </feature_description>

**If empty, ask:** "What would you like to plan?"

## Execution

Invoke the `planning` skill and follow it exactly.

## Output

Plan at `docs/plans/YYYY-MM-DD-<type>-<name>-plan.md`

## Next Step

After plan is written → `/asd:technical_review` (recommended) or `/asd:execute`
