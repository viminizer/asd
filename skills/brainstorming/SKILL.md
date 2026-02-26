---
name: brainstorming
description: "Use before any creative work - features, components, or behavior changes. Explores user intent, requirements, and design before planning. Triggered by: 'let's brainstorm', 'help me think through', 'what should we build', ambiguous requests, or when user request has multiple interpretations."
---

# Brainstorming

Turn ideas into fully formed designs through collaborative dialogue.

## When to Use

**Use this skill when:**
- Requirements are unclear or ambiguous
- Multiple approaches could solve the problem
- User hasn't fully articulated what they want
- Feature scope needs refinement
- Trade-offs need exploring

**Skip when:**
- Requirements are explicit with specific acceptance criteria
- User knows exactly what they want
- Task is a straightforward bug fix

## Process

### Phase 1: Assess Clarity

Quickly determine if brainstorming is needed.

**Clear requirements → Suggest:** "Your requirements seem clear. Proceed to `/asd:plan` directly."

**Unclear → Continue to Phase 2.**

### Phase 2: Explore (One Question at a Time)

Ask questions to understand:
- **Purpose**: What problem does this solve?
- **Users**: Who uses this? What's their context?
- **Constraints**: Technical limits? Timeline? Dependencies?
- **Success**: How will you measure success?
- **Edge Cases**: What shouldn't happen?

**Rules:**
- One question per message
- Prefer multiple choice when possible
- State assumptions explicitly: "I'm assuming X. Correct?"

### Phase 3: Propose Approaches

Present 2-3 approaches with:
- **Pros/Cons** for each
- **Best when** condition
- **Recommendation** with reasoning

### Phase 4: Present Design

Present in sections (max 200-300 words each). Validate after each:
- "Does this match what you had in mind?"
- "Any adjustments before we continue?"

Cover: architecture, components, data flow, error handling, testing.

### Phase 5: Document

Write to `docs/brainstorms/YYYY-MM-DD-<topic>-brainstorm.md`:

```markdown
---
date: YYYY-MM-DD
topic: <kebab-case-topic>
---

# <Topic Title>

## What We're Building
[Concise description—1-2 paragraphs max]

## Why This Approach
[Brief explanation of approaches considered and why this one was chosen]

## Key Decisions
- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]

## Open Questions
- [Any unresolved questions for the planning phase]

## Next Steps
→ `/asd:plan`
```

### Alternative Approaches (Optional)

If multiple valid approaches exist, document alternatives:

```markdown
### Approach A: [Name]

[2-3 sentence description]

**Pros:**
- [Benefit 1]
- [Benefit 2]

**Cons:**
- [Drawback 1]
- [Drawback 2]

**Best when:** [Circumstances where this approach shines]
```

### Phase 6: Transition

Invoke `/asd:plan` skill. Do NOT write code or implement.

## Key Principles

- **One at a time** - Don't overwhelm
- **Multiple choice preferred** - Easier to answer
- **YAGNI** - Remove unnecessary features
- **Explore alternatives** - Always 2-3 approaches
- **Incremental validation** - Get approval before moving on
- **Be flexible** - Go back when something doesn't make sense

## Integration

When brainstorm doc exists in `docs/brainstorms/`, `/asd:plan` should detect it and use as input, skipping idea refinement.
