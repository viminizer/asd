---
name: brainstorming
description: "Use when the user has a feature idea, design question, or improvement that needs exploration before implementation. Triggers on: vague or half-baked feature requests, trade-off exploration ('not sure which approach', 'torn between', 'explore the options'), ambiguous scope or requirements, 'let's brainstorm', 'help me think through', 'what should we build'. Do NOT trigger for bug fixes, refactors following known patterns, test writing, deployments, code review, or tasks with clear specific instructions."
---

# Brainstorming

Techniques and principles for turning ideas into fully formed designs through collaborative dialogue. The `/asd:brainstorm` command handles orchestration - this skill provides the **how**.

## Questioning Techniques

Ask questions **one at a time** to understand the user's intent. Never ask 2+ questions in a single message.

### 1. Prefer multiple choice when natural options exist

Multiple choice questions are faster to answer and surface options the user may not have considered.

- Good: "Should the notification be: (a) email only, (b) in-app only, or (c) both?"
- Avoid: "How should users be notified?"

### 2. Start broad, then narrow

- First: What is the core purpose? What problem does this solve?
- Then: Who are the users? What's their context?
- Then: What constraints exist? Technical limitations? Timeline?
- Finally: Edge cases, error states, success criteria

### 3. Validate assumptions explicitly

Don't assume - state and confirm: "I'm assuming users will be logged in. Is that correct?"

### 4. Ask about success criteria early

"How will you know this feature is working well?" grounds the conversation and prevents scope creep.

## Knowing When to Stop Asking

Stop asking questions when you have enough to propose concrete approaches. Signals:

- **Core problem is clear** - you can state it back in one sentence
- **Users and context are understood** - you know who benefits and how
- **Key constraints are identified** - technical, timeline, or scope limits
- **Success criteria exist** - even rough ones

You don't need to explore every edge case before proposing approaches. Edge cases surface naturally during design validation. Aim for 4-7 questions for typical features, fewer for simple ones.

If the user says "proceed", "let's move on", or seems impatient - stop asking and propose approaches with what you have.

## Design Presentation

Present the design **in sections**, scaled to complexity. Each section should be 200-300 words max.

**Validate after each section** before moving on:
- "Does this match what you had in mind?"
- "Any adjustments before we continue?"

This incremental validation catches misunderstandings early and prevents wasted effort. Be ready to go back and revise.

**Sections to cover** (skip any that don't apply):
- Architecture / structure
- Components / modules
- Data flow
- Error handling
- Testing strategy

## YAGNI

During brainstorming, actively resist complexity:

- Choose the simplest approach that solves the stated problem
- Prefer boring, proven patterns over clever solutions
- Ask "Do we really need this?" when complexity emerges
- Defer decisions that don't need to be made now
- Don't design for hypothetical future requirements

## Anti-Patterns

| Anti-Pattern | Better Approach |
|--------------|-----------------|
| Asking 5 questions at once | One at a time |
| Jumping to implementation details | Stay focused on WHAT, not HOW |
| Proposing overly complex solutions | Start simple, add complexity only if needed |
| Ignoring existing codebase patterns | Research what exists first |
| Making assumptions without validating | State and confirm |
| Creating lengthy design documents | Keep it concise - details go in the plan |
| Asking questions indefinitely | Stop when you can propose concrete approaches |
