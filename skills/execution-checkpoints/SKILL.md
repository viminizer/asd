---
name: execution-checkpoints
description: "Use when executing implementation plans. Dispatches subagents per task with parallel group execution, combined reviews, and smart model selection."
---

# Execution checkpoints

Execute validated plans using subagent-driven development. Tasks within a group run in parallel, each gets a combined spec + quality review, and model selection is based on task complexity.

## When to use

- Running `/asd:execute` with a plan file
- Implementing features from a validated plan

## Phase 1: Load and prepare

1. Read the plan file
2. Create TodoWrite tasks for each plan task
3. Identify groups, dependencies, and execution order
4. Classify each task's complexity (see model selection below)
5. Pre-read files that tasks will modify (for pre-warming subagent context)

### Model selection

Classify each task before execution:

| Complexity | Model | Examples |
|------------|-------|---------|
| **Simple** | haiku | Create config, add boilerplate, wire routes, rename files, add simple test |
| **Complex** | sonnet | New business logic, security-sensitive code, complex algorithms, architecture decisions |

Heuristics for simple: task creates files from a template, modifies < 3 files, has exact code provided in the plan, no branching logic.

When in doubt, use sonnet.

## Phase 2: Branch setup

Create a feature branch from the current branch:

```bash
git checkout -b feat/<plan-name>
```

Never start implementation on main/master without explicit user consent.

## Phase 3: Execute groups

Process groups sequentially in dependency order. Within each group, execute tasks in parallel.

### Per group:

#### 3a. Pre-warm context

For each task in the group, read the files it will modify. Pass file contents directly to the subagent so it doesn't need to explore.

#### 3b. Dispatch implementation subagents (parallel within group)

Dispatch all tasks in the group simultaneously using the Agent tool. Each subagent gets:
- Full task text from the plan (do NOT make the subagent read the plan file)
- Scene-setting context: what prior groups accomplished, relevant files created/modified
- Pre-read file contents for files being modified
- The `test-driven-development` skill should be followed
- Instruction to commit when done

**Subagent prompt template:**

```
You are implementing task N of a plan.

## Context
[What prior groups accomplished, relevant files created/modified]

## Pre-read files
[Contents of files this task will modify - so you don't need to read them]

## Your task
[Full task text from plan, including file paths, code, commands]

## Rules
- Follow TDD: write failing test first, then implement, then verify
- Commit when the task is complete and tests pass
- If you hit a blocker, report it clearly and stop
```

Use the model selected in Phase 1 (haiku for simple, sonnet for complex).

**Parallel safety:** Tasks in the same group must not modify the same files. The plan's group construction rules guarantee this. If you suspect a conflict, run those tasks sequentially instead.

#### 3c. Combined review (per group)

After all tasks in the group complete, dispatch a single `asd-code-reviewer` review covering the entire group:

```
Review scope: group-level

Specification for each task:
[Task N: full task text]
[Task M: full task text]

Diff: git diff HEAD~<tasks-in-group>..HEAD

Check both spec compliance AND code quality in one pass.
Report PASS or list issues per task.
```

**If review finds issues:** Resume the relevant implementation subagent using the Agent tool's `resume` parameter. Provide the specific issues to fix. After fixes, re-review only the affected tasks. Repeat until PASS. Max 3 iterations per task.

#### 3d. Move to next group

Only proceed when the group review passes. Mark all TodoWrite tasks in the group as completed.

## Phase 4: Final verification

After all groups complete:

1. Dispatch the `asd-test-runner` agent (haiku) to run the full test suite
2. If no test suite exists, verify manually by running the changed code paths
3. Verify acceptance criteria from the plan
4. Check for regressions

## Phase 5: Full branch review

After all groups pass and tests are green, dispatch the `asd-code-reviewer` agent on the entire branch:

```
Review scope: branch-level

Run: git diff main..HEAD (or the base branch)

Focus on cross-task integration issues only. Per-group reviews already passed.
Report PASS or list issues.
```

**If review finds critical or warning issues:** Dispatch a fix subagent to address them. Re-run tests. Re-review. Repeat until PASS.

## Phase 6: Finish

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

- **Parallel within groups** - tasks in the same group run simultaneously
- **Sequential between groups** - respect dependency order
- **One review per group** - combined spec + quality check, not two separate passes
- **Smart model selection** - haiku for simple tasks, sonnet for complex
- **Pre-warmed context** - pass file contents to subagents directly
- **Fresh context per task** - subagents prevent context pollution
- **Commit per task** - each completed task gets its own commit
- **Stop when blocked** - don't guess, ask
