---
name: execution-checkpoints
description: "Use when executing implementation plans. Dispatches subagents per task with two-stage review loops (spec compliance then code quality)."
---

# Execution checkpoints

Execute validated plans using subagent-driven development. Each task gets a fresh subagent to prevent context pollution, followed by automated spec and code quality reviews.

## When to use

- Running `/asd:execute` with a plan file
- Implementing features from a validated plan

## Phase 1: Load and prepare

1. Read the plan file
2. Create TodoWrite tasks for each plan task
3. Identify task dependencies and execution order

## Phase 2: Branch setup

Create a feature branch from the current branch:

```bash
git checkout -b feat/<plan-name>
```

Never start implementation on main/master without explicit user consent.

## Phase 3: Execute tasks

Process tasks sequentially in dependency order. Never dispatch multiple implementation subagents in parallel (they will conflict).

### Per task:

#### 3a. Dispatch implementation subagent

Use the Agent tool to dispatch a subagent with:
- Full task text from the plan (do NOT make the subagent read the plan file)
- Scene-setting context: what was done in prior tasks, where this task fits
- The `test-driven-development` skill should be followed
- Instruction to commit when done

**Subagent prompt template:**

```
You are implementing task N of a plan.

## Context
[What prior tasks accomplished, relevant files created/modified]

## Your task
[Full task text from plan, including file paths, code, commands]

## Rules
- Follow TDD: write failing test first, then implement, then verify
- Commit when the task is complete and tests pass
- If you hit a blocker, report it clearly and stop
```

#### 3b. Dispatch spec reviewer

After the implementation subagent completes, dispatch a reviewer subagent:

```
Review the changes for task N against this specification:

[Full task text from plan]

Check:
- Does the implementation match what the plan specified?
- Are all acceptance criteria met?
- Are all files created/modified as specified?

Report: PASS or list specific issues.
```

**If spec review fails:** Resume the implementation subagent using the Agent tool's `resume` parameter with its agent ID. Provide the specific issues to fix. After fixes, re-review. Repeat until PASS.

#### 3c. Dispatch code quality reviewer

Only after spec review passes, dispatch a code quality reviewer:

```
Review the changes for task N for code quality.

Run: git diff feat/<plan-name>~1..HEAD

Check:
- Code clarity and readability
- Error handling
- Test coverage and quality
- Follows existing codebase patterns

Report: PASS or list specific issues.
```

**If code review fails:** Resume the implementation subagent (same `resume` parameter) to fix issues. Re-review. Repeat until PASS.

#### 3d. Move to next task

Only proceed when both reviews pass. Mark the TodoWrite task as completed.

## Phase 4: Final verification

After all tasks complete:

1. Run the project's test suite (check CLAUDE.md or package.json for the test command)
2. If no test suite exists, verify manually by running the changed code paths
3. Verify acceptance criteria from the plan
4. Check for regressions

## Phase 5: Finish

Follow the `finishing-a-development-branch` process to present options:

1. **Merge locally** - merge feature branch into base branch
2. **Create PR** - push and create pull request
3. **Keep as-is** - leave branch for later
4. **Discard** - delete the branch

## When to stop and ask for help

Stop executing immediately when:
- Hit a blocker (missing dependency, test fails repeatedly, instruction unclear)
- Plan has critical gaps
- You don't understand an instruction
- Verification fails after fix loop

Ask for clarification rather than guessing.

## Subagent communication

- If a subagent asks questions, answer clearly and completely before letting it proceed
- Provide additional context if needed - don't rush subagents into implementation

## Error handling

- If a subagent fails a task, dispatch a new fix subagent with specific instructions. Don't fix manually (context pollution).
- If a reviewer finds issues, the same implementation subagent fixes them (resume it).
- If a fix loop exceeds 3 iterations, stop and ask the user.
- Never skip re-review after fixes.

## Key principles

- **Fresh context per task** - subagents prevent context pollution on large plans
- **Spec before code quality** - verify correctness first, then style
- **Sequential execution** - one task at a time, respect dependency order
- **Commit per task** - each completed task gets its own commit
- **Stop when blocked** - don't guess, ask
