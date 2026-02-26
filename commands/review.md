---
name: asd:review
description: "Review code changes with multi-agent analysis. Supports PRs, branches, or local changes."
argument-hint: "[PR number, branch name, or leave empty for current changes]"
---

# /asd:review

Review code changes with systematic analysis.

## Usage

```
/asd:review [PR number or branch]
/asd:review                    # Current changes
```

## What It Does

1. Determine review target
2. Setup review environment
3. Run multiple review agents in parallel
4. Synthesize findings
5. Present issues by severity

## Review Types

| Input | Review Target |
|-------|---------------|
| Empty | Current branch changes |
| `123` | GitHub PR #123 |
| `branch-name` | Local branch |
| URL | GitHub PR URL |

## Output

Review report with:
- Critical issues (block)
- Warnings (review)
- Suggestions (optional)

## Next Step

After review → `/asd:capture`
