---
name: asd:subagent_execute
description: "Execute implementation plans with fresh subagent per task and two-stage review (spec compliance then code quality)."
argument-hint: "[plan file path]"
---

# /asd:subagent_execute

Execute implementation plans using subagent-driven development. Fresh subagent per task, two-stage review after each.

## Plan file

<plan_path> #$ARGUMENTS </plan_path>

**If empty, ask:** "Which plan should I execute?" or check `docs/plans/` for recent plans.

## Execution

Invoke the `subagent-driven-development` skill and follow it exactly.

## Output

- Feature branch with incremental commits per task
- All tasks verified by two-stage review (spec compliance + code quality) + full branch review
