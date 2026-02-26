---
name: technical-review
description: "Use when getting technical feedback on plans. Runs multiple reviewers in parallel for comprehensive feedback."
---

# Technical Review

Get expert feedback on implementation plans.

## When to Use

- After `/asd:plan` creates a plan
- Before `/asd:execute`
- When you want multiple perspectives on the approach

## Process

### Phase 1: Read Plan

Read the plan file completely:
- Understand the full scope
- Identify technical components
- Note any specific technologies or patterns

### Phase 2: Run Reviewers

Run multiple review agents in parallel:

**Always run:**
- Architecture reviewer - Is the approach sound?
- Code simplicity reviewer - Is this too complex?

**Conditional (based on plan content):**
- Security reviewer - If auth, payments, data handling
- Performance reviewer - If queries, loops, scaling concerns
- Database reviewer - If migrations, schema changes

### Phase 3: Synthesize

Organize findings by severity:

| Severity | Description | Action |
|----------|-------------|--------|
| CRITICAL | Architecture flaw, security risk | Must fix |
| WARNING | Better approach available | Should fix |
| SUGGESTION | Could be improved | Consider |

### Phase 4: Present Report

Format:

```
## Technical Review Summary

### Critical Issues
- [Issue]: Description + file:line

### Warnings
- [Issue]: Description

### Suggestions
- [Issue]: Description (optional)
```

### Phase 5: Offer Next Steps

1. Fix critical issues → re-review
2. Address warnings → proceed
3. No critical issues → `/asd:execute`

## Key Principles

- **Multiple perspectives** - Different reviewers catch different things
- **Severity first** - Focus on critical issues
- **Actionable feedback** - Provide solutions, not just problems
- **Balance** - Don't block on style preferences
