---
name: fix
description: "Use when fixing bugs. Enforces root cause investigation before any fix attempt. Follows investigate, fix (TDD), review cycle. Launches asd-investigator via Agent tool for complex bugs."
---

# Fix

Fix bugs by finding the root cause first, then applying a targeted fix with test coverage.

## Iron law

No fixes without root cause investigation first.

## When to use

- User reports a bug or unexpected behavior
- Error messages or failing tests need investigation

## Language detection

Before launching subagents, detect the project language from file extensions, build files, and the bug context:
- **Java:** `.java` files, `pom.xml` or `build.gradle` present → use `asd-java-*` agents
- **TypeScript/JavaScript:** `.ts`, `.tsx`, `.js`, `.jsx` files, `package.json` present → use `asd-ts-*` agents
- **Other or mixed:** use generic `asd-*` agents

Agents run in clean contexts and cannot see skills. When launching specialized subagents via the Agent tool, include only the specific skill conventions relevant to the bug (e.g. transaction patterns for a JPA issue, React lifecycle rules for a stale closure bug). Do not pass the entire skill - just the parts that help the agent do its job.

## Phase 1: Investigate

### Simple bugs (root cause is obvious from the error)

If the error message, stack trace, or context makes the root cause immediately clear (e.g. typo, missing null check, wrong variable name) - document the root cause and move to Phase 2.

### Complex bugs (root cause is unclear)

Use the Agent tool to launch the appropriate investigator subagent (`subagent_type: "asd:asd-java-investigator"`, `"asd:asd-ts-investigator"`, or `"asd:asd-investigator"`) with:
- The bug description and error messages
- Affected file paths or areas (if known)
- Any initial observations you have

The investigator runs in a clean context, traces the root cause backward through the call stack, and returns a diagnosis with location, evidence, and suggested fix.

**If the investigator returns "Inconclusive"**, either:
- Provide more context and re-launch via the Agent tool
- Investigate manually using the narrowed-down area it identified
- Stop and report to the user

**Do not proceed to Phase 2 until the root cause is confirmed - you must be able to explain WHY the bug happens, not just WHERE.**

## Phase 2: Fix (TDD)

### 2a. Write failing test

Write a test that reproduces the bug:
- The test should fail now and pass after the fix
- Keep the test minimal - test the specific bug, not everything around it

### 2b. Implement fix

Apply a single, targeted fix:
- Fix the root cause, not the symptom
- Change as little code as possible
- Don't refactor surrounding code

### 2c. Verify

- Run the new test - should pass
- Use the Agent tool to launch an `asd-test-runner` subagent (`subagent_type: "asd:asd-test-runner"`) to run the full test suite - no regressions
- If no test suite exists, manually verify the fix

## Phase 3: Review

Use the Agent tool to launch the appropriate reviewer subagent (`subagent_type: "asd:asd-java-reviewer"`, `"asd:asd-ts-reviewer"`, or `"asd:asd-code-reviewer"`) on the fix:

```
Review scope: bug fix

Review the changes made in this fix for correctness and regressions.
Check the unstaged/staged diff, or if already committed, diff against the previous commit.
```

If issues found, fix them and re-review.

## Phase 4: Commit

After review passes, commit with a descriptive message explaining:
- What the bug was
- What caused it (root cause)
- How it was fixed

## Anti-patterns

Stop immediately if you catch yourself doing any of these:

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- Adding multiple changes at once hoping one works
- "I don't fully understand but this might work"

If 3 fix attempts fail, stop and tell the user - this likely signals a deeper architectural problem.

## Rules

- One fix at a time - don't batch unrelated fixes
- Root cause required before any code change
- Failing test required before implementing fix
- Review required before committing
- Don't fix on main/master without explicit consent - create a branch if the fix is non-trivial
