---
name: brainstorming
description: "Use before any creative work — features, components, or behavior changes. Explores user intent, requirements, and design before planning. Triggered by: 'let's brainstorm', 'help me think through', 'what should we build', ambiguous requests, or multiple valid interpretations."
---

# Brainstorming

Turn ideas into fully formed designs through collaborative dialogue. This skill provides the **techniques, templates, and principles** for effective brainstorming. For the full orchestrated flow, use the `/asd:brainstorm` command.

## When to Use

**Use this skill when:**
- Requirements are unclear or ambiguous
- Multiple approaches could solve the problem
- User hasn't fully articulated what they want
- Feature scope needs refinement
- Trade-offs need exploring

**"This is too simple to brainstorm"** — Every project goes through this process. A todo list, a single-function utility, a config change. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short (a few sentences for truly simple projects), but you MUST present it and get approval.

**When requirements are already clear** (specific acceptance criteria, exact behavior, well-defined scope), suggest proceeding directly to `/asd:plan` instead.

## Core Process

When loaded standalone (not via `/asd:brainstorm`), follow these phases:

### Phase 1: Assess Clarity

Quickly determine if brainstorming is needed.

**Clear requirements signals:**
- Specific acceptance criteria provided
- Referenced existing patterns to follow
- Described exact behavior expected
- Scope is constrained and well-defined

**Unclear signals:**
- Vague terms ("make it better", "add something like")
- Multiple reasonable interpretations
- Trade-offs not discussed
- User seems unsure

**Clear → Suggest:** "Your requirements seem clear. Proceed to planning directly."
**Unclear → Continue.**

### Phase 2: Explore the Idea

Ask questions **one at a time** to understand the user's intent.

**Question Techniques:**

1. **Prefer multiple choice when natural options exist**
   - Good: "Should the notification be: (a) email only, (b) in-app only, or (c) both?"
   - Avoid: "How should users be notified?"

2. **Start broad, then narrow**
   - First: What is the core purpose?
   - Then: Who are the users?
   - Finally: What constraints exist?

3. **Validate assumptions explicitly**
   - "I'm assuming users will be logged in. Is that correct?"

4. **Ask about success criteria early**
   - "How will you know this feature is working well?"

**Key Topics to Explore:**

| Topic | Example Questions |
|-------|-------------------|
| Purpose | What problem does this solve? What's the motivation? |
| Users | Who uses this? What's their context? |
| Constraints | Technical limitations? Timeline? Dependencies? |
| Success | How will you measure success? What's the happy path? |
| Edge Cases | What shouldn't happen? Any error states to consider? |
| Existing Patterns | Are there similar features in the codebase to follow? |

**Rules:**
- One question per message — never ask 2+ questions at once
- Use AskUserQuestion tool when possible for structured responses
- State assumptions explicitly and confirm them

**Exit condition:** Continue until the idea is clear OR user says "proceed" or "let's move on"

### Phase 3: Propose Approaches

Present 2-3 concrete approaches.

For each approach: brief description (2-3 sentences), pros, cons, and when it's best suited.

- Lead with your recommendation and explain why
- Be honest about trade-offs
- Apply YAGNI - simpler is usually better
- Reference codebase patterns when relevant

### Phase 4: Present Design

Present the design in sections, scaled to complexity (200-300 words max each).

**Validate after each section:**
- "Does this match what you had in mind?"
- "Any adjustments before we continue?"

**Sections to cover** (skip any that don't apply):
- Architecture / structure
- Components / modules
- Data flow
- Error handling
- Testing strategy

Be ready to go back and revise. Incremental validation prevents wasted effort.

### Phase 5: Transition

Once the user confirms the design, immediately invoke `/asd:plan` passing the design context. Do NOT write a separate brainstorm document. Do NOT write code or implement.

## Design Summary Format

When transitioning to planning, invoke `/asd:plan` and pass a summary with these key points:
- **What we're building** - concise description
- **Chosen approach** - and why
- **Key decisions** - with rationale
- **Open questions** - if any remain

This summary becomes the input context for `/asd:plan`.

## YAGNI Principles

During brainstorming, actively resist complexity:

- **Don't design for hypothetical future requirements**
- **Choose the simplest approach that solves the stated problem**
- **Prefer boring, proven patterns over clever solutions**
- **Ask "Do we really need this?" when complexity emerges**
- **Defer decisions that don't need to be made now**

## Anti-Patterns to Avoid

| Anti-Pattern | Better Approach |
|--------------|-----------------|
| Asking 5 questions at once | Ask one at a time |
| Jumping to implementation details | Stay focused on WHAT, not HOW |
| Proposing overly complex solutions | Start simple, add complexity only if needed |
| Ignoring existing codebase patterns | Research what exists first |
| Making assumptions without validating | State assumptions explicitly and confirm |
| Creating lengthy design documents | Keep it concise — details go in the plan |
| Skipping "simple" projects | Every project gets a design, even simple ones |

## Key Principles

- **One at a time** — Don't overwhelm with questions
- **Multiple choice preferred** — Easier to answer than open-ended
- **YAGNI** — Remove unnecessary features from all designs
- **Explore alternatives** — Always propose 2-3 approaches
- **Incremental validation** — Present design section by section, get approval before moving on
- **Be flexible** — Go back and revise when something doesn't make sense

## Integration with Planning

Brainstorming answers **WHAT** to build:
- Requirements and acceptance criteria
- Chosen approach and rationale
- Key decisions and trade-offs

Planning answers **HOW** to build it:
- Implementation steps and file changes
- Technical details and code patterns
- Testing strategy and verification

After brainstorming, invoke `/asd:plan` directly - no separate document is written. The design context flows straight into planning.
