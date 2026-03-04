---
name: asd:execute
description: "Execute implementation plans with parallel group execution, smart model selection, and combined reviews."
argument-hint: "[plan file path]"
---

# /asd:execute

Execute implementation plans using subagent-driven development with parallel execution within groups.

## Plan file

<plan_path> #$ARGUMENTS </plan_path>

**If empty, ask:** "Which plan should I execute?" or check `docs/asd/plans/` for recent plans.

## Execution

Invoke the `execution-checkpoints` skill and follow it exactly.

## Output

- Feature branch with incremental commits per task
- All tasks verified by per-group reviews + full branch review
