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

## Language detection

Before dispatching agents, detect the project language from file extensions, build files, and the diff context:
- **Java:** `.java` files, `pom.xml` or `build.gradle` present → use `asd-java-reviewer`
- **TypeScript/JavaScript:** `.ts`, `.tsx`, `.js`, `.jsx` files, `package.json` present → use `asd-ts-reviewer`
- **Other or mixed:** use `asd-code-reviewer`

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

Dispatch the appropriate reviewer (`asd-java-reviewer`, `asd-ts-reviewer`, or `asd-code-reviewer`) in diff mode, passing the diff-analyzer's recommendations:

```
Review scope: diff review

[Diff content or branch range]

Recommended passes from diff analysis: [passes from Phase 2]
Skip passes marked as not needed.
```

## Phase 4: Write review file

Save findings to `docs/reviews/`. Skip this phase if no issues were found.

### File naming

| Target | Filename |
|--------|----------|
| PR #123 "Add auth" | `pr-123-add-auth-pending.md` |
| Branch `feature-login` | `feature-login-pending.md` |

Slugify the PR title or branch name (lowercase, hyphens, no special chars).

### Check for existing file

Before creating a new file, check if a `*-pending.md` file already exists for the same PR/branch in `docs/reviews/`. If found, update it in place with the latest findings instead of creating a new one.

### Auto-complete on re-review

When re-reviewing a target that has an existing pending file and all previously reported issues are now resolved, rename the file from `*-pending.md` to `*-completed.md`.

### File content

Use the `templates/review.md` template. Add to the frontmatter:

- `status: pending` or `status: completed`
- `pr: {number}` (if applicable)
- `branch: {branch-name}`

## Phase 5: Next steps

Based on findings, use AskUserQuestion:

- **Issues found** (file created):
  1. **Fix issues now** → Address items, then re-review with `/asd:review`
  2. **Fix later** → Review file saved, work on it when ready
  3. **Request human review** → Flag for team member
- **Clean** (no file created):
  1. **Merge/PR** → Proceed with integration
  2. **Capture** → `/asd:capture` to document solutions
- **All issues resolved** (file marked completed):
  1. **Merge/PR** → Proceed with integration
  2. **Clean up** → Delete completed review file
  3. **Capture** → `/asd:capture` to document solutions

## Protected artifacts

Never flag for deletion:
- `docs/plans/*.md`
- `docs/design/*.md`
- `docs/reviews/*.md`

## Rules

- Delegate all review logic to `asd-code-reviewer` - don't duplicate its passes
- Be specific: include file:line references
- Don't block on style preferences
- If the diff is too large (50+ files), ask the user to narrow the scope
