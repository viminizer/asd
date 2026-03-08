---
name: asd:fix
description: "Fix a bug with root cause investigation, TDD fix, and review."
argument-hint: "[bug description or error message]"
---

# /asd:fix

Fix a bug by finding the root cause first, then applying a targeted fix with test coverage.

## Bug description

<bug_description> #$ARGUMENTS </bug_description>

**If empty, ask:** "What's the bug? Include error messages, unexpected behavior, or steps to reproduce."

## What it does

1. **Investigate** - Reproduce, trace root cause, gather evidence
2. **Fix** - Write failing test, implement fix, verify
3. **Review** - Launch `asd-code-reviewer` via Agent tool on the diff
4. **Commit** - If review passes

## Execution

Invoke the `fix` skill and follow it exactly.

## Output

- Bug fix with test coverage on current branch
- Review-verified commit

## Next step

After fix → `/asd:review` if part of a larger change, or `/asd:capture` to document the solution
