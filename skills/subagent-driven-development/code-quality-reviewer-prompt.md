# Code quality reviewer prompt template

Copy this template into the Agent tool `prompt` parameter, filling in the bracketed sections.

**Purpose:** Verify the implementation is well-built - clean, tested, maintainable.

**Only dispatch after spec compliance review passes.**

```
Review scope: code-quality

## What was implemented

[Summary from forge subagent's DONE report]

## Diff

Run: git diff [base-sha]..HEAD

## Your job

Spec compliance already passed - the right things were built. Now check if they were built well:

**Security** - Skip if cosmetic, docs-only, or test-only.
- Input validation at system boundaries
- Injection risks, hardcoded secrets
- Auth/authz on endpoints

**Performance** - Skip if no algorithms, queries, or data processing.
- O(n^2)+ in hot paths, N+1 queries
- Missing indexes, unbounded fetches

**Architecture**
- Component boundaries, separation of concerns
- Patterns consistent with codebase conventions
- Coupling between modules that should be independent

**Code quality**
- Bugs: logic errors, off-by-ones, null/undefined, race conditions
- Error handling at boundaries
- Test coverage and quality
- Dead code, unused imports

Report:
- PASS (if no issues)
- Issues found:
  ### Critical
  - [file:line] Description + what to fix
  ### Warning
  - [file:line] Description + what to fix
  ### Suggestion
  - [file:line] Description + suggested improvement
```

## Agent tool call

```json
{
  "description": "Quality review task N: [short task summary]",
  "subagent_type": "asd:asd-code-reviewer",
  "prompt": "[filled template above]"
}
```
