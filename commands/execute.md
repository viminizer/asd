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

## What it does

1. **Load plan** - Read plan, classify task complexity, pre-read files
2. **Setup branch** - Create feature branch from current HEAD
3. **Per group** - Dispatch tasks in parallel (haiku for simple, sonnet for complex), then one combined review
4. **Full review** - Review entire branch diff, fix any issues
5. **Finish** - Present merge/PR options

## Execution

Invoke the `execution-checkpoints` skill and follow it exactly.

## Output

- Feature branch with incremental commits per task
- All tasks verified by per-group reviews + full branch review
