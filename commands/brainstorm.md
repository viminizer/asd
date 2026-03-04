---
name: asd:brainstorm
description: Explore requirements and approaches through collaborative dialogue before planning implementation
argument-hint: "[feature idea or problem to explore]"
---

# Brainstorm a Feature or Improvement

Brainstorming answers **WHAT** to build through collaborative dialogue. It precedes `/asd:plan`, which answers **HOW** to build it.

## Feature Description

<feature_description> #$ARGUMENTS </feature_description>

**If the feature description above is empty, ask the user:** "What would you like to explore? Please describe the feature, problem, or improvement you're thinking about."

Do not proceed until you have a feature description from the user.

<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.
</HARD-GATE>

## Task Tracking

Create one task per phase at the start of the brainstorming session:

1. Explore project context
2. Ask clarifying questions
3. Propose approaches
4. Present and validate design

Mark each task `in_progress` when starting, `completed` when done.

## Execution Flow

### Phase 1: Explore Project Context

Dispatch the `asd-repo-researcher` agent to scan the codebase:
- Task asd-repo-researcher("Understand existing patterns related to: <feature_description>")

Also check `docs/plans/` for prior plans on similar topics to avoid re-exploring settled decisions.

**If requirements are already clear** (specific acceptance criteria, exact expected behavior, well-defined scope):
Use **AskUserQuestion tool** to suggest: "Your requirements seem detailed enough to proceed directly to planning. Should I run `/asd:plan` instead, or would you like to explore the idea further?"

### Phase 2: Collaborative Dialogue

Use the **AskUserQuestion tool** to ask questions **one at a time**.

**Guidelines (see `brainstorming` skill for detailed techniques):**
- Prefer multiple choice when natural options exist
- Start broad (purpose, users) then narrow (constraints, edge cases)
- Validate assumptions explicitly
- Ask about success criteria early

**Exit condition:** Continue until the idea is clear OR user says "proceed"

### Phase 3: Explore Approaches

Propose **2-3 concrete approaches** based on research and conversation.

For each approach, provide:
- Brief description (2-3 sentences)
- Pros and cons
- When it's best suited

Lead with your recommendation and explain why. Apply YAGNI — prefer simpler solutions.

Use **AskUserQuestion tool** to ask which approach the user prefers.

### Phase 4: Present and Validate Design

Present the design **in sections**, scaled to complexity. After each section, validate:
- "Does this match what you had in mind?"
- "Any adjustments before we continue?"

**Sections to cover** (skip any that don't apply):
- Architecture / structure
- Components / modules
- Data flow
- Error handling
- Testing strategy

Keep each section to **200-300 words max**. Be ready to go back and revise.

### Phase 5: Confirm and Transition to Planning

Use **AskUserQuestion tool** to confirm:

**Question:** "Design looks complete. Ready to move to planning?"

**Options:**
1. **Proceed to planning** — Invoke `/asd:plan` now
2. **Ask more questions** — Probe deeper into edge cases, constraints, or unexplored areas
3. **Done for now** — Stop here

**If user selects "Ask more questions":** Return to Phase 2 (Collaborative Dialogue) and continue asking questions one at a time. When satisfied, return to Phase 5.

**If user selects "Proceed to planning":** Summarize the key decisions, then immediately invoke `/asd:plan` passing the design context. Do NOT wait for the user to run it manually.

**If user selects "Done for now":** Display the key decisions summary and stop.

## Important Guidelines

- **Stay focused on WHAT, not HOW** — Implementation details belong in the plan
- **Ask one question at a time** — Don't overwhelm
- **Apply YAGNI** — Prefer simpler approaches
- **Keep outputs concise** — 200-300 words per section max
- **Every project gets a design** — Even "simple" ones. Short is fine, but present it and get approval.

NEVER CODE! Just explore and capture decisions.
