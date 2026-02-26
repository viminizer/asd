---
name: asd:fix
description: "Quick fix workflow - create a bug fix plan and execute with parallel agents."
argument-hint: "[issue description or bug to fix]"
disable-model-invocation: true
---

# /asd:fix

Quick fix workflow with parallel execution.

## Usage

```
/asd:fix [issue description or bug to fix]
```

## What It Does

1. **Create fix plan** - Generate a bug fix plan
2. **Execute in parallel** - Spawn multiple agents to fix simultaneously
3. **Review** - Run code review in parallel

## Steps

### Phase 1: Plan

1. `/asd:plan $ARGUMENTS` — Create fix plan

### Phase 2: Execute (Parallel)

After plan is created, spawn parallel agents to execute:

```
Task(subagent for each fix task, parallel=true)
```

- Break fix into independent tasks
- Spawn agents in parallel to handle each task
- Agents coordinate through shared context

### Phase 3: Review (Parallel)

While execution completes, prepare review:
- Spawn review agent as background task

### Phase 4: Finalize

After parallel execution:
- Wait for all agents to complete
- Run `/asd:review` on the changes

## Parallel Execution Rules

- Split fix into independent, parallelizable tasks
- Each agent works on separate task
- Merge results after all complete
- If any agent fails, address issues and retry

Start now.
