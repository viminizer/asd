Review scope: task-review

## Specification

{specification}

## Diff

{diff}

## Instructions

Check both spec compliance and code quality in one pass:

**Spec compliance:**
- Every requirement implemented (nothing missing)
- No extra features added (nothing beyond spec)
- File paths match what was specified
- Test coverage matches what was required

**Code quality:**
- Security vulnerabilities (injection, XSS, hardcoded secrets)
- Performance (N+1 queries, unbounded fetches, O(n^2) in hot paths)
- Error handling and edge cases
- Test quality (tests verify logic, not just mocks)

Report PASS or list issues with file:line references.
