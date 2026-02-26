---
name: asd:technical_review
description: "Get technical feedback on plans from code-focused reviewers."
argument-hint: "[plan file path]"
---

# /asd:technical_review

Get technical feedback on implementation plans from multiple reviewers.

## Usage

```
/asd:technical_review [plan file path]
```

## What It Does

1. Read the plan file
2. Run multiple review agents in parallel:
   - Architecture reviewer
   - Security reviewer
   - Performance reviewer
   - Code simplicity reviewer
3. Synthesize feedback
4. Present issues by severity

## When to Use

- After `/asd:plan` creates a plan
- Before `/asd:execute`
- When you want expert feedback on the approach

## Output

Technical review report with:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider)

## Next Step

After review → `/asd:execute` (if no critical issues)
