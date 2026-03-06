---
name: asd:plan
description: "Create implementation plans with research and bite-sized TDD tasks."
argument-hint: "[feature description]"
---

# /asd:plan

Transform feature descriptions into validated implementation plans.

## What it does

1. **Input** - Use brainstorm context if available, or refine idea with user
2. **Research** - Parallel: `asd-repo-researcher` + `asd-learnings-researcher` + `asd-docs-researcher` + language detection (all in one turn)
3. **Plan** - `asd-plan-writer` receives all context pre-resolved (language, research summaries, template path)
4. **Validate** - `asd-plan-validator` checks the written plan
5. **Next** - Offer: Review (recommended) / Execute / Refine

## Feature description

<feature_description> #$ARGUMENTS </feature_description>

**If empty, ask:** "What would you like to plan?"

## Execution

Invoke the `planning` skill and follow it exactly.

## Output

Plan at `docs/plans/YYYY-MM-DD-<type>-<name>-plan.md`

## Next step

After plan is written: `/asd:technical_review` (recommended) or `/asd:execute`
