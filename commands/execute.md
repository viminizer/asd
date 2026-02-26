---
name: asd:execute
description: "Execute implementation plans with checkpoints. Breaks work into verifiable chunks with test validation."
argument-hint: "[plan file path]"
---

# /asd:execute

Execute implementation plans with verification checkpoints.

## Usage

```
/asd:execute [plan file path]
```

## What It Does

1. Read and understand the plan
2. Setup environment (branch/worktree)
3. Break into checkpoint tasks
4. Execute with verification at each checkpoint
5. Incremental commits
6. Verify all tests pass

## Checkpoint Model

Each checkpoint includes:
- Task description
- Verification criteria
- Test requirement

## Output

- Completed plan with checked items
- Commits per logical unit

## Next Step

After execution → `/asd:review`
