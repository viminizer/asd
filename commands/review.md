---
name: asd:review
description: "Review code changes (diffs, PRs, branches) by dispatching asd-code-reviewer in diff mode."
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
2. **Review** - Dispatch `asd-code-reviewer` in diff mode
3. **Report** - Present issues by severity
4. **Next steps** - Fix issues, merge, or request human review

## Execution

Invoke the `review` skill and follow it exactly.

## Output

Review report with issues grouped by severity (critical, warning, suggestion).

## Next step

After review → `/asd:capture` to document solutions found
