---
name: capture
description: "Use after completing work to document solutions. Captures problems and solutions for future reference."
---

# Knowledge Capture

Document solved problems for team knowledge compounding.

## When to Use

- After `/asd:execute` and `/asd:review` complete
- After fixing a bug
- After implementing a tricky feature
- Before starting a new cycle

## Process

### Phase 1: Gather Context

1. **Recent commits:**
```bash
git log --oneline -10
```

2. **Files changed:**
```bash
git diff --name-only HEAD~5
```

3. **Ask user:** "What did we solve?"

### Phase 2: Parallel Analysis

Run subagents in parallel (text only, no file writes):

1. **Context Analyzer** - Extract problem, symptoms
2. **Solution Extractor** - Root cause, working solution
3. **Related Docs Finder** - Check existing `docs/asd/solutions/`
4. **Prevention Strategist** - How to prevent recurrence

### Phase 3: Assemble Document

Write to `docs/asd/solutions/YYYY-MM-DD-<topic>.md`:

```markdown
---
date: YYYY-MM-DD
topic: <kebab-case-topic>
type: bugfix|feature|learning
---

# <Title>

## Problem
[What was the issue?]

## Symptoms
- Symptom 1
- Symptom 2

## Root Cause
[Why did this happen?]

## Solution
[How was it fixed?]

## Prevention
[How to prevent recurrence?]

## Related
- [Related solutions]
- [Related issues]
```

### Phase 4: Cross-Reference

1. Update related solution docs with links
2. Check if existing solutions need updating

## Key Principles

- **Capture while fresh** - Context evaporates quickly
- **Be specific** - Include file:line references
- **Focus on why** - Not just what, but why it happened
- **Prevention over cure** - How to avoid recurrence
