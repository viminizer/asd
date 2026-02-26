---
name: review
description: "Use when reviewing code changes. Performs systematic analysis with multiple perspectives, prioritizes issues by severity."
---

# Code Review

Perform systematic code review with severity prioritization.

## When to Use

- After `/asd:execute` completes
- Before creating PR
- During PR review

## Process

### Phase 1: Determine Target

Determine what to review:

| Input | Action |
|-------|--------|
| Empty | `git diff` on current branch |
| Number | `gh pr view {n}` + checkout |
| Branch | `git diff main...{branch}` |
| URL | Parse PR number, fetch |

### Phase 2: Setup Environment

1. Ensure clean working directory
2. Fetch latest changes
3. Checkout target if needed
4. Load project conventions (CLAUDE.md)

### Phase 3: Multi-Agent Analysis

Run review agents in parallel:

**Always run:**
- Security review
- Architecture review
- Pattern consistency

**Conditional:**
- Database (if migrations)
- Performance (if queries)
- Security (if auth/payments)

### Phase 4: Synthesize Findings

Organize issues by severity:

| Severity | Description | Action |
|----------|-------------|--------|
| CRITICAL | Security, data loss risk | Block merge |
| WARNING | Bugs, regressions | Must fix |
| SUGGESTION | Improvements | Consider |

### Phase 5: Present Report

Format:

```
## Review Summary

### Critical Issues
- [Issue 1]: Description + file:line

### Warnings  
- [Issue 1]: Description + file:line

### Suggestions
- [Issue 1]: Description (optional)
```

### Phase 6: Offer Next Steps

1. Fix critical issues
2. Address warnings
3. Merge (if no critical)
4. Request human review

## Protected Artifacts

Never flag for deletion:
- `docs/asd/plans/*.md` - Plan files
- `docs/asd/design/*.md` - Design docs

## Key Principles

- **Severity first** - Focus on critical issues
- **Be specific** - Include file:line references
- **Provide solutions** - Don't just identify, suggest fixes
- **Balance** - Don't block on style preferences
