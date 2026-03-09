---
name: asd:execute
description: "Execute implementation plans with asd-forge agents and per-task reviews."
argument-hint: "[plan file path]"
---

# /asd:execute

Execute implementation plans by launching `asd-forge` subagents via the Agent tool per task with TDD and per-task reviews.

<HARD-GATE>
You are the ORCHESTRATOR. You MUST use the Agent tool to spawn subagents for ALL implementation and review work.
You MUST NOT write code, edit files, or run tests yourself. Your job is to read the plan, pre-read files, call the Agent tool, and track progress.
Every task → Agent tool call with `subagent_type: "asd:asd-forge"`.
Every review → Agent tool call with `subagent_type: "asd:asd-code-reviewer"`.
</HARD-GATE>

## Plan file

<plan_path> #$ARGUMENTS </plan_path>

**If empty, ask:** "Which plan should I execute?" or check `docs/plans/` for recent plans.

## Execution

Invoke the `execution-checkpoints` skill and follow it exactly.

## Output

- Feature branch with incremental commits per task
- All tasks verified by per-task reviews + full branch review
