---
name: asd:execute
description: "Execute implementation plans with asd-forge agents, smart model selection, and per-task reviews."
argument-hint: "[plan file path]"
---

# /asd:execute

Execute implementation plans by dispatching `asd-forge` agents per task with TDD, reviews, and smart model selection.

## Plan file

<plan_path> #$ARGUMENTS </plan_path>

**If empty, ask:** "Which plan should I execute?" or check `docs/asd/plans/` for recent plans.

## Execution

Invoke the `execution-checkpoints` skill and follow it exactly.

## Output

- Feature branch with incremental commits per task
- All tasks verified by per-task reviews + full branch review
