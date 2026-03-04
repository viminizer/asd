---
name: asd:capture
description: "Document recently solved problems to build knowledge base. Captures solutions while context is fresh."
argument-hint: "[optional: brief context about what was solved]"
---

# /asd:capture

Document solved problems to build team knowledge.

## Context

<capture_context> #$ARGUMENTS </capture_context>

**If empty:** Analyze recent git history and ask "What did we solve?"

## What it does

1. **Gather context** - Recent commits, changed files, user input
2. **Extract** - Problem, root cause, solution, prevention
3. **Write** - Save to `docs/solutions/YYYY-MM-DD-<topic>.md`
4. **Cross-reference** - Link to related existing solutions

## Execution

Invoke the `capture` skill and follow it exactly.

## Output

Solution document at `docs/solutions/YYYY-MM-DD-<topic>.md`

## Next step

After capture → start new cycle with `/asd:brainstorm`
