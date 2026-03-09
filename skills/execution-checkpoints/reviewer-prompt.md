# Reviewer subagent prompt template

Use this template when dispatching a reviewer subagent. Checks spec compliance first, then code quality in one pass.

```
Agent tool (asd:asd-code-reviewer):
  description: "Review Task N: [task name]"
  subagent_type: "asd:asd-code-reviewer"
  prompt: |
    Review scope: task-review

    ## Specification

    [FULL TEXT of the task from the plan]

    ## What was implemented

    [Summary from implementer's report - files created, files modified, test results]

    ## Diff

    Run: git diff [base-sha]..HEAD

    ## Instructions

    Check spec compliance first, then code quality. Do not trust the implementer's
    report - read the actual code.

    **1. Spec compliance:**
    - Every requirement implemented? Nothing missing?
    - Nothing extra built beyond what was requested?
    - Requirements interpreted correctly?

    **2. Code quality (only if spec compliance passes):**
    - Security, performance, error handling
    - Test coverage and quality
    - Codebase conventions followed

    Report PASS or list issues with file:line references.
```
