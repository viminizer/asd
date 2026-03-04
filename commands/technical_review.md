---
name: asd:technical_review
description: "Review implementation plans for quality, technical soundness, and feasibility before execution."
argument-hint: "[plan file path]"
---

# /asd:technical_review

Review an implementation plan before executing it. Checks document quality, technical soundness, and implementation feasibility.

## What it does

1. **Plan quality** - Clarity, completeness, specificity, YAGNI, unstated assumptions
2. **Technical soundness** - Dispatch `asd-code-reviewer` on the plan's approach
3. **Implementation feasibility** - Task ordering, dependencies, file paths, realistic scope
4. **Learnings check** - Cross-reference past solutions if `docs/asd/solutions/` exists
5. **Report** - Issues by severity, then offer next steps

## Output

Review report with issues grouped by severity (critical, warning, suggestion), then:

- **Critical issues found** - fix plan, re-review
- **Warnings only** - fix or proceed to `/asd:execute`
- **Clean** - proceed to `/asd:execute`
