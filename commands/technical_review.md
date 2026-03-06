---
name: asd:technical_review
description: "Review implementation plans for quality, technical soundness, and feasibility before execution."
argument-hint: "[plan file path]"
---

# /asd:technical_review

Review an implementation plan before executing it. Checks document quality, technical soundness, and implementation feasibility.

## Execution

Invoke the `technical-review` skill and follow it exactly.

## Output

Review report with issues grouped by severity (critical, warning, suggestion), plus a plan score (1-10).

Next steps based on findings and score:

- **Critical issues or overall < 6** - fix plan, re-review
- **Warnings only or overall 6-7** - fix or proceed to `/asd:execute`
- **Clean or overall > 7** - proceed to `/asd:execute`
