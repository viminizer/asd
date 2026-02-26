---
name: asd:plan
description: "Transform ideas into structured implementation plans. Supports detail levels and includes plan validation."
argument-hint: "[feature description or topic]"
---

# /asd:plan

Create implementation plans from feature descriptions.

## Usage

```
/asd:plan [feature description]
```

## What It Does

1. Check for brainstorm output (`docs/asd/design/`)
2. Local research (repo patterns, learnings)
3. Optional external research
4. Generate plan with 3 detail levels
5. **Validate plan** before completion
6. Save to `docs/asd/plans/`

## Detail Levels

| Level | Best For |
|-------|----------|
| MINIMAL | Simple bugs, small improvements |
| STANDARD | Most features, complex bugs |
| COMPREHENSIVE | Major features, architectural changes |

## Output

Plan at `docs/asd/plans/YYYY-MM-DD-<name>-plan.md`

## Next Step

After validation passes → `/asd:execute`
