---
name: execution-checkpoints
description: "Use when executing implementation plans. Dispatches asd-forge agents per task with smart model selection and reviews."
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
4. If the plan was validated by `asd-plan-validator`, use its complexity classifications. Otherwise, classify each task (see model selection below).

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

## Phase 3: Execute tasks

Process tasks sequentially in plan order. For each task:

### 3a. Pre-read files

Read the current version of files the task will modify. Pass contents directly to the subagent so it doesn't need to explore.

### 3b. Dispatch asd-forge

Dispatch the task to an `asd-forge` agent:

```
Task asd-forge({
  context: [what prior tasks accomplished, relevant files created/modified],
  pre_read_files: [contents of files this task will modify],
  task: [full task text extracted in Phase 1]
})
```

Use the model selected in Phase 1 (haiku for simple, sonnet for complex).

**If asd-forge returns questions instead of completed work:** Answer using context from the plan and codebase, then re-dispatch with the answers included. Do not guess on behalf of the subagent.

### 3c. Spec compliance review

After the task completes, dispatch `asd-code-reviewer` using the spec compliance prompt template:

```
Read templates/spec-compliance-review.md
```

Provide the template with:
- **Specification:** Full task text extracted in Phase 1
- **Diff:** `git diff HEAD~1..HEAD`

**If issues found:** Resume the `asd-forge` agent to fix. Re-review. Max 3 iterations.

### 3d. Code quality review

Only after spec compliance passes, dispatch `asd-code-reviewer` using the code quality prompt template:

```
Read templates/code-quality-review.md
```

Provide the template with:
- **Diff:** `git diff HEAD~1..HEAD`

**If issues found:** Resume the `asd-forge` agent to fix. Re-review. Max 3 iterations.

### 3e. Move to next task

Only proceed when both reviews pass. Mark the task as completed.

## Phase 4: Final verification

After all tasks complete:

1. Dispatch the `asd-test-runner` agent (haiku) to run the full test suite
2. If no test suite exists, verify manually by running the changed code paths
3. Verify acceptance criteria from the plan

## Phase 5: Full branch review

Dispatch the `asd-code-reviewer` agent on the entire branch:

```
Review scope: branch-level

Run: git diff main..HEAD (or the base branch)

Focus on cross-task integration issues only. Per-task reviews already passed.
Report PASS or list issues.
```

**If review finds issues:** Dispatch a fix subagent to address them. Re-run tests. Re-review. Max 3 iterations.

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

## Error handling

- If `asd-forge` fails a task, resume it with specific fix instructions
- If a fix loop exceeds 3 iterations, stop and ask the user
- Never skip re-review after fixes

## Context hygiene

Subagent output must not flood the orchestrator's context window.

**Dispatching subagents:**
- Pass only what the subagent needs: task text, pre-read files, and a one-line summary of prior task results. Never forward raw output from previous subagents.
- Prior task context is just: `"Task N done: created foo.rb, bar.rb. Commit abc123."` - not the full agent response.

**Processing subagent results:**
- Extract only the structured result: DONE/BLOCKED/PASS/issues list.
- Discard narrative, reasoning, and intermediate output - do not carry it forward.
- For reviews, carry forward only: verdict (PASS or issue list). Drop everything else.

**Between tasks:**
- Do not accumulate context. Each task starts with: its own task text (from Phase 1), pre-read files (from 3a), and one-line summaries of prior tasks.

## Key principles

- **Sequential execution** - tasks run in plan order
- **Two-stage review** - spec compliance first, then code quality
- **Smart model selection** - haiku for simple tasks, sonnet for complex
- **Just-in-time context** - read files per task and pass to asd-forge directly
- **Fresh context per task** - subagents prevent context pollution
- **Minimal context return** - extract structured results only, discard narrative
- **Commit per task** - each completed task gets its own commit
- **Stop when blocked** - don't guess, ask
