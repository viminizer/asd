---
name: asd:brainstorm
description: "Explore ideas before planning. Ask questions, propose approaches, capture design."
---

# /asd:brainstorm

Explore user intent and capture a design before planning.

## Usage

```
/asd:brainstorm
```

## What It Does

1. Assesses if brainstorming is needed
2. Asks clarifying questions (one at a time)
3. Proposes 2-3 approaches with trade-offs
4. Presents design for user approval
5. Saves design to `docs/asd/design/`
6. Transitions to `/asd:plan`

## Trigger This Command When

- User says "let's brainstorm", "help me think through"
- Request is ambiguous or has multiple interpretations
- User asks "what should we build"
- Requirements are unclear

## Output

Design document at `docs/asd/design/YYYY-MM-DD-<topic>.md`

## Next Step

After design approval → `/asd:plan`
