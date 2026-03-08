---
name: asd:review
description: "Review code changes (diffs, PRs, branches) by launching asd-code-reviewer via Agent tool in diff mode."
argument-hint: "[PR number, branch name, or leave empty for current changes]"
---

# /asd:review

Review code changes with systematic analysis.

## Review target

<review_target> #$ARGUMENTS </review_target>

| Input | Review target |
|-------|---------------|
| Empty | Current branch changes |
| `123` | GitHub PR #123 |
| `branch-name` | Local branch diff against base |
| URL | GitHub PR URL |

## What it does

1. **Determine target** - Identify what to review based on input
2. **Review** - Launch appropriate reviewer via Agent tool in diff mode
3. **Save findings** - Write review file to `docs/reviews/` (skipped if clean)
4. **Next steps** - Fix issues, merge, or request human review

## Execution

Invoke the `review` skill and follow it exactly.

## Output

Review file in `docs/reviews/` with issues grouped by severity. Naming: `pr-{number}-{title}-pending.md` or `{branch}-pending.md`. On re-review, updates existing pending files. Auto-renames to `*-completed.md` when all issues are resolved. No file created if review is clean.

## Next step

After review → `/asd:capture` to document solutions found
