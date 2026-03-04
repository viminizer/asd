---
name: review
description: "Use when reviewing code changes (diffs, PRs, branches). Dispatches asd-code-reviewer in diff mode with severity-based reporting."
---

# Code review

Review code changes by dispatching the `asd-code-reviewer` agent in diff mode.

## When to use

- After `/asd:execute` completes
- Before creating or merging a PR
- During PR review

## Phase 1: Determine target

| Input | Action |
|-------|--------|
| Empty | `git diff` on current branch against base |
| Number | `gh pr view {n}` to get branch and diff |
| Branch | `git diff main...{branch}` |
| URL | Parse PR number, then same as number |

If the base branch is ambiguous, ask the user.

## Phase 2: Pre-filter

Dispatch the `asd-diff-analyzer` agent (haiku) to classify changes:

```
[Diff content or branch range]

Summarize changes and recommend which review passes to run.
```

## Phase 3: Review

Dispatch the `asd-code-reviewer` agent in diff mode, passing the diff-analyzer's recommendations:

```
Review scope: diff review

[Diff content or branch range]

Recommended passes from diff analysis: [passes from Phase 2]
Skip passes marked as not needed.
```

## Phase 4: Next steps

Based on findings, use AskUserQuestion:

- **Critical issues found:**
  1. **Fix issues** → Address critical items, then re-review
  2. **Request human review** → Flag for team member
- **Warnings only:**
  1. **Fix warnings** → Address items, then re-review
  2. **Merge anyway** → Proceed with merge/PR
  3. **Request human review** → Flag for team member
- **Clean:**
  1. **Merge/PR** → Proceed with integration
  2. **Capture** → `/asd:capture` to document solutions

## Protected artifacts

Never flag for deletion:
- `docs/asd/plans/*.md`
- `docs/asd/design/*.md`
- `docs/asd/reviews/*.md`

## Rules

- Delegate all review logic to `asd-code-reviewer` - don't duplicate its passes
- Be specific: include file:line references
- Don't block on style preferences
- If the diff is too large (50+ files), ask the user to narrow the scope
