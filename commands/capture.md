---
name: asd:capture
description: "Document recently solved problems to build knowledge base. Captures solutions while context is fresh."
argument-hint: "[optional: brief context about what was solved]"
---

# /asd:capture

Document solved problems to build team knowledge.

## Usage

```
/asd:capture                    # Document recent fix
/asd:capture [context hint]    # With additional context
```

## What It Does

1. Analyze recent work (from git history, recent files)
2. Extract problem, solution, root cause
3. Find related docs
4. Generate prevention strategies
5. Write to `docs/asd/solutions/`

## Output

Solution document at `docs/asd/solutions/YYYY-MM-DD-<topic>.md`

## Why Capture

- First solve: takes research
- Second solve: minutes (with documentation)
- Knowledge compounds over time

## Next Step

After capture → start new cycle with `/asd:brainstorm`
