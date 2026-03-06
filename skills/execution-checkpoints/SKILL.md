---
name: execution-checkpoints
description: "Use when executing implementation plans. Dispatches asd-forge agents per task with per-task reviews. Trigger this skill whenever the user says to execute a plan, implement tasks from a plan, run through a plan file, work through plan tasks sequentially, or dispatch forge agents. Also trigger when the user references a plan file path and asks to implement it, or says the technical review passed and they want to proceed with implementation."
---

# Execution checkpoints

Execute validated plans using subagent-driven development. Each task is dispatched to an `asd-forge` agent, reviewed, then the next task begins.

## When to use

- Running `/asd:execute` with a plan file
- Implementing features from a validated plan

## Phase 1: Load and prepare

1. Read the plan file once. Extract every task's full text (including file paths, code, commands, acceptance criteria). Store in memory - do not re-read the plan during execution.
2. Note inter-task context: what each task produces that later tasks need.
3. Create a TodoWrite task for each plan task.

## Phase 2: Branch setup

Create a feature branch from the current branch:

```bash
git checkout -b feat/<plan-name>
```

Never start implementation on main/master without explicit user consent.

## Phase 3: Execute tasks

Process tasks sequentially in plan order. For each task:

### 3a. Pre-read files

Read the current version of files the task will modify. Pass contents directly to the subagent so it doesn't need to explore. If the task only creates new files, pass an empty `pre_read_files`.

### 3b. Dispatch asd-forge

Dispatch the task to an `asd-forge` agent:

```
Task asd-forge({
  context: [what prior tasks accomplished, relevant files created/modified],
  pre_read_files: [contents of files this task will modify],
  task: [full task text extracted in Phase 1]
})
```

**If asd-forge returns QUESTIONS:** Answer using context from the plan and codebase, then re-dispatch with the answers included. Max 2 question rounds, then escalate to the user.

**If asd-forge returns BLOCKED:** Mark the task as blocked in TodoWrite, then stop and ask the user.

### 3c. Review

After asd-forge returns DONE, dispatch an `asd-code-reviewer` agent with both spec compliance and code quality in a single pass:

```
Review scope: task-review

## Specification
[Full task text from Phase 1]

## Diff
git diff HEAD~1..HEAD

## Instructions
Check both spec compliance and code quality in one pass:
- Every requirement implemented, nothing missing, nothing extra
- File paths and test coverage match spec
- Security, performance, error handling, test quality
Report PASS or list issues with file:line references.
```

**If issues found:** Resume the `asd-forge` agent to fix. Re-review. Max 2 iterations, then stop and ask the user.

### 3d. Move to next task

Only proceed when review passes. Mark the task as completed.

## Phase 4: Final verification

After all tasks complete:

1. Dispatch the `asd-test-runner` agent to run the full test suite
2. If no test suite exists, verify manually by running the changed code paths
3. Verify acceptance criteria from the plan

## Phase 5: Branch review (3+ tasks only)

Skip for plans with fewer than 3 tasks - per-task reviews are sufficient.

Dispatch `asd-code-reviewer` on the entire branch:

```
Review scope: branch-level
Diff: git diff <base-branch>..HEAD
Focus on cross-task integration issues only. Per-task reviews already passed.
Report PASS or list issues.
```

**If issues found:** Fix them, re-run tests, re-review. Max 2 iterations.

## Phase 6: Finish

Present options to the user with AskUserQuestion:

**"All tasks complete and reviewed. How do you want to integrate?"**

1. **Merge locally** - merge into base branch, run tests, delete feature branch
2. **Create PR** - push and open a pull request with summary
3. **Keep as-is** - leave the branch for later
4. **Discard** - confirm, then delete the branch

After the user chooses (not on discard): if a campaign link exists in the plan (`<!-- campaign: path#item -->`), update the campaign file - mark item done, update progress count, update date. Commit the update. If the campaign file is missing or the item is not found, warn the user and skip.

## Context hygiene

- **Dispatching:** Pass only task text, pre-read files, and one-line prior task summaries. Example: `"Task 2 done: created foo.rb, bar.rb. Commit abc123."`
- **Processing results:** Extract only DONE/BLOCKED/PASS/issues. Discard narrative and reasoning.
- **Between tasks:** Do not accumulate context. Each task starts fresh with its own spec and pre-read files.

## When to stop and ask

- Hit a blocker (missing dependency, repeated test failure, unclear instruction)
- Plan has critical gaps
- Fix loop exceeds 2 iterations
- Verification fails after fixes
