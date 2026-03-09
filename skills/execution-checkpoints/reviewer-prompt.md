# Reviewer subagent prompt template

Copy this template into the Agent tool `prompt` parameter, filling in the bracketed sections.

```
Review scope: task-review

## Specification

[FULL TEXT of the task from the plan - paste it here]

## What was implemented

[Summary from forge subagent's DONE report - files created, files modified, test results]

## Diff

Run: git diff [base-sha]..HEAD

## Instructions

Check spec compliance first, then code quality:

1. **Spec compliance** - Read the actual code. Do not trust the implementer's report.
   - Every requirement implemented? Nothing missing?
   - Nothing extra built beyond what was requested?
   - Requirements interpreted correctly?

2. **Code quality** - Only if spec compliance passes.
   - Security, performance, error handling
   - Test coverage and quality
   - Codebase conventions followed

Report PASS or list issues with file:line references.
```

## Agent tool call

```json
{
  "description": "Review task N: [short task summary]",
  "subagent_type": "asd:asd-code-reviewer",
  "prompt": "[filled template above]"
}
```
