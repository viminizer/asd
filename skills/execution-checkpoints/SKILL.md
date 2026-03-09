---
name: execution-checkpoints
description: "Use when executing implementation plans. Launches asd-forge subagents via the Agent tool per task with per-task reviews. Trigger this skill whenever the user says to execute a plan, implement tasks from a plan, run through a plan file, work through plan tasks sequentially, or dispatch forge agents. Also trigger when the user references a plan file path and asks to implement it, or says the technical review passed and they want to proceed with implementation."
---

# Execution checkpoints

Execute validated plans using subagent-driven development. Each task runs in an independent `asd-forge` subagent via the Agent tool, reviewed, then the next task begins.

<HARD-GATE>
You MUST use the Agent tool to spawn a subagent for EVERY task implementation and EVERY review.
You MUST NOT write implementation code, edit files, or run tests yourself in the main context.
Your only job as orchestrator is to: read the plan, pre-read files, launch subagents via Agent tool, and track progress.
If you catch yourself writing code or editing files directly, STOP and use the Agent tool instead.
</HARD-GATE>

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

### 3b. Launch asd-forge subagent

Call the **Agent** tool with these exact parameters:
- `description`: short task summary (e.g. "Implement user auth endpoint")
- `subagent_type`: `"asd:asd-forge"`
- `prompt`: include context, pre-read file contents, and full task text

Example Agent tool call:
```json
{
  "description": "Task 1: Add validation helper",
  "subagent_type": "asd:asd-forge",
  "prompt": "Context: Fresh start, no prior tasks.\n\nPre-read files:\n--- src/utils.ts ---\n[file contents here]\n---\n\nTask:\n[full task text from plan]"
}
```

**Do NOT use Edit, Write, or Bash to implement the task yourself. The Agent tool subagent does all implementation work.**

**If asd-forge returns QUESTIONS:** Answer using context from the plan and codebase, then launch a new Agent tool call with the answers included. Max 2 question rounds, then escalate to the user.

**If asd-forge returns BLOCKED:** Mark the task as blocked in TodoWrite, then stop and ask the user.

### 3c. Review

After asd-forge returns DONE, call the **Agent** tool to review:

```json
{
  "description": "Review task 1: validation helper",
  "subagent_type": "asd:asd-code-reviewer",
  "prompt": "Review scope: task-review\n\n## Specification\n[Full task text from Phase 1]\n\n## Diff\ngit diff HEAD~1..HEAD\n\n## Instructions\nCheck both spec compliance and code quality in one pass:\n- Every requirement implemented, nothing missing, nothing extra\n- File paths and test coverage match spec\n- Security, performance, error handling, test quality\nReport PASS or list issues with file:line references."
}
```

**If issues found:** Call the Agent tool with the `resume` parameter to resume the same `asd-forge` agent to fix. Re-review via a new Agent tool call. Max 2 iterations, then stop and ask the user.

### 3d. Move to next task

Only proceed when review passes. Mark the task as completed.

## Phase 4: Final verification

After all tasks complete:

1. Use the Agent tool to launch an `asd-test-runner` subagent (`subagent_type: "asd:asd-test-runner"`) to run the full test suite
2. If no test suite exists, verify manually by running the changed code paths
3. Verify acceptance criteria from the plan

## Phase 5: Branch review (3+ tasks only)

Skip for plans with fewer than 3 tasks - per-task reviews are sufficient.

Call the **Agent** tool for the branch-level review:

```json
{
  "description": "Branch review: full implementation",
  "subagent_type": "asd:asd-code-reviewer",
  "prompt": "Review scope: branch-level\nDiff: git diff <base-branch>..HEAD\nFocus on cross-task integration issues only. Per-task reviews already passed.\nReport PASS or list issues."
}
```

**If issues found:** Fix them, re-run tests, re-review via new Agent tool calls. Max 2 iterations.

## Phase 6: Finish

Present options to the user with AskUserQuestion:

**"All tasks complete and reviewed. How do you want to integrate?"**

1. **Merge locally** - merge into base branch, run tests, delete feature branch
2. **Create PR** - push and open a pull request with summary
3. **Keep as-is** - leave the branch for later
4. **Discard** - confirm, then delete the branch

After the user chooses (not on discard): if a campaign link exists in the plan (`<!-- campaign: path#item -->`), update the campaign file - mark item done, update progress count, update date. Commit the update. If the campaign file is missing or the item is not found, warn the user and skip.

## Context hygiene

- **Your role:** You are the orchestrator. You read the plan, pre-read files, call the Agent tool, and track progress. You never write implementation code.
- **Subagent prompts:** Pass only task text, pre-read files, and one-line prior task summaries. Example: `"Task 2 done: created foo.rb, bar.rb. Commit abc123."`
- **Processing results:** Extract only DONE/BLOCKED/PASS/issues. Discard narrative and reasoning.
- **Between tasks:** Do not accumulate context. Each task starts fresh with its own spec and pre-read files.

## When to stop and ask

- Hit a blocker (missing dependency, repeated test failure, unclear instruction)
- Plan has critical gaps
- Fix loop exceeds 2 iterations
- Verification fails after fixes
