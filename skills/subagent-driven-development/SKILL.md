---
name: subagent-driven-development
description: "Use when the user invokes /asd:subagent_execute. Executes plans with fresh subagent per task and two-stage review: spec compliance first, then code quality. Do NOT auto-trigger for /asd:execute - that uses the execution-checkpoints skill instead."
---

# Subagent-driven development

Execute plan by dispatching a fresh subagent per task, with two-stage review after each: spec compliance first, then code quality.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, no context pollution

<HARD-GATE>
You MUST use the Agent tool to spawn a subagent for EVERY task implementation and EVERY review.
You MUST NOT write implementation code, edit files, or run tests yourself in the main context.
Your only job as orchestrator is to: read the plan, pre-read files, launch subagents via Agent tool, and track progress.
If you catch yourself writing code or editing files directly, STOP and use the Agent tool instead.
</HARD-GATE>

## Process

```dot
digraph process {
    rankdir=TB;

    "1. Read plan, extract all tasks, create TodoWrite" [shape=box];
    "2. Create feature branch" [shape=box];

    subgraph cluster_per_task {
        label="Per Task (sequential)";
        "Pre-read files task will modify" [shape=box];
        "Dispatch asd-forge subagent (./implementer-prompt.md)" [shape=box];
        "Forge asks questions?" [shape=diamond];
        "Answer questions, re-dispatch forge" [shape=box];
        "Forge implements, tests, self-reviews, commits" [shape=box];
        "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)" [shape=box];
        "Spec reviewer approves?" [shape=diamond];
        "Resume forge to fix spec gaps" [shape=box];
        "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" [shape=box];
        "Code quality reviewer approves?" [shape=diamond];
        "Resume forge to fix quality issues" [shape=box];
        "Mark task complete in TodoWrite" [shape=box];
    }

    "More tasks?" [shape=diamond];
    "Run full test suite (asd-test-runner subagent)" [shape=box];
    "Branch review (3+ tasks only, asd-code-reviewer subagent)" [shape=box];
    "Present finish options to user" [shape=box];

    "1. Read plan, extract all tasks, create TodoWrite" -> "2. Create feature branch";
    "2. Create feature branch" -> "Pre-read files task will modify";
    "Pre-read files task will modify" -> "Dispatch asd-forge subagent (./implementer-prompt.md)";
    "Dispatch asd-forge subagent (./implementer-prompt.md)" -> "Forge asks questions?";
    "Forge asks questions?" -> "Answer questions, re-dispatch forge" [label="yes"];
    "Answer questions, re-dispatch forge" -> "Dispatch asd-forge subagent (./implementer-prompt.md)";
    "Forge asks questions?" -> "Forge implements, tests, self-reviews, commits" [label="no"];
    "Forge implements, tests, self-reviews, commits" -> "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)";
    "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)" -> "Spec reviewer approves?";
    "Spec reviewer approves?" -> "Resume forge to fix spec gaps" [label="no"];
    "Resume forge to fix spec gaps" -> "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)" [label="re-review"];
    "Spec reviewer approves?" -> "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" [label="yes"];
    "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" -> "Code quality reviewer approves?";
    "Code quality reviewer approves?" -> "Resume forge to fix quality issues" [label="no"];
    "Resume forge to fix quality issues" -> "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" [label="re-review"];
    "Code quality reviewer approves?" -> "Mark task complete in TodoWrite" [label="yes"];
    "Mark task complete in TodoWrite" -> "More tasks?";
    "More tasks?" -> "Pre-read files task will modify" [label="yes"];
    "More tasks?" -> "Run full test suite (asd-test-runner subagent)" [label="no"];
    "Run full test suite (asd-test-runner subagent)" -> "Branch review (3+ tasks only, asd-code-reviewer subagent)";
    "Branch review (3+ tasks only, asd-code-reviewer subagent)" -> "Present finish options to user";
}
```

## Prompt templates

Use these templates when constructing Agent tool calls:

- `./implementer-prompt.md` - Template for dispatching asd-forge subagent
- `./spec-reviewer-prompt.md` - Template for dispatching spec compliance reviewer
- `./code-quality-reviewer-prompt.md` - Template for dispatching code quality reviewer

## Phase 1: Load and prepare

1. Read the plan file once. Extract every task's full text (including file paths, code, commands, acceptance criteria). Store in memory - do not re-read the plan during execution.
2. Note inter-task context: what each task produces that later tasks need.
3. Create a TodoWrite task for each plan task.

## Phase 2: Branch setup

```bash
git checkout -b feat/<plan-name>
```

Never start implementation on main/master without explicit user consent.

## Phase 3: Execute tasks

Process tasks sequentially in plan order. For each task:

### 3a. Pre-read files

Read the current version of files the task will modify. Pass contents directly to the subagent so it doesn't need to explore. If the task only creates new files, say so in the prompt.

### 3b. Launch asd-forge subagent

Fill in the template from `./implementer-prompt.md` and call the Agent tool with `subagent_type: "asd:asd-forge"`.

**If forge returns QUESTIONS:** Answer using context from the plan and codebase, then launch a new Agent tool call with the answers included. Max 2 question rounds, then escalate to the user.

**If forge returns BLOCKED:** Mark the task as blocked in TodoWrite, stop, and ask the user.

### 3c. Spec compliance review

After forge returns DONE, fill in the template from `./spec-reviewer-prompt.md` and call the Agent tool with `subagent_type: "asd:asd-code-reviewer"`.

This review checks ONLY whether the implementation matches the spec - nothing more, nothing less.

**If issues found:** Resume the same forge agent (using Agent tool `resume` parameter) to fix spec gaps. Re-dispatch spec reviewer. Max 2 iterations.

### 3d. Code quality review

Only after spec compliance passes. Fill in the template from `./code-quality-reviewer-prompt.md` and call the Agent tool with `subagent_type: "asd:asd-code-reviewer"`.

**If issues found:** Resume the same forge agent to fix quality issues. Re-dispatch code quality reviewer. Max 2 iterations.

**Start code quality review ONLY after spec compliance passes. Never reverse this order.**

### 3e. Move to next task

Only proceed when both reviews pass. Mark the task as completed.

## Phase 4: Final verification

After all tasks complete, use the Agent tool to launch an `asd-test-runner` subagent to run the full test suite. If no test suite exists, verify manually.

## Phase 5: Branch review (3+ tasks only)

Skip for plans with fewer than 3 tasks - per-task reviews are sufficient.

Call the Agent tool with `subagent_type: "asd:asd-code-reviewer"`:

```
Review scope: branch-level
Diff: git diff <base-branch>..HEAD
Focus on cross-task integration issues only. Per-task reviews already passed.
Report PASS or list issues.
```

## Phase 6: Finish

Present options to the user:

1. **Merge locally** - merge into base branch, run tests, delete feature branch
2. **Create PR** - push and open a pull request with summary
3. **Keep as-is** - leave the branch for later
4. **Discard** - confirm, then delete the branch

After the user chooses (not on discard): if a campaign link exists in the plan (`<!-- campaign: path#item -->`), update the campaign file - mark item done, update progress count, update date. Commit the update.

## Context hygiene

- **Your role:** You are the orchestrator. You read the plan, pre-read files, call the Agent tool, and track progress. You never write implementation code.
- **Subagent prompts:** Use the prompt templates. Pass task text, pre-read files, and one-line prior task summaries.
- **Processing results:** Extract only DONE/BLOCKED/PASS/issues. Discard narrative and reasoning.
- **Between tasks:** Do not accumulate context. Each task starts fresh with its own spec and pre-read files.

## Red flags - never do these

- Write code, edit files, or run tests yourself (use Agent tool)
- Start implementation on main/master without user consent
- Skip reviews or proceed with unfixed issues
- Dispatch multiple forge subagents in parallel (conflicts)
- Make subagent read plan file (provide full text instead)
- Skip scene-setting context (subagent needs to understand where task fits)
- Ignore subagent questions (answer before letting them proceed)
- Accept "close enough" on spec compliance (reviewer found issues = not done)
- Skip review loops (reviewer found issues = forge fixes = review again)
- Move to next task while either review has open issues
- Let forge self-review replace actual review (both are needed)
- **Start code quality review before spec compliance passes** (wrong order)

## When to stop and ask

- Hit a blocker (missing dependency, repeated test failure, unclear instruction)
- Plan has critical gaps
- Fix loop exceeds 2 iterations
- Verification fails after fixes
