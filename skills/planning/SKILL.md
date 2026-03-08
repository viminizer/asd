---
name: planning
description: "Create implementation plans with research and bite-sized TDD tasks for multi-file features. Use PROACTIVELY when the user wants to plan before coding, break work into tasks, or convert ideas into actionable steps. Triggers: 'plan this', 'break this into tasks', 'create a plan', 'implementation plan', 'how should we implement', 'scaffold this feature', 'what's the approach for', 'let's break this down', 'plan before we start coding', 'concrete steps', or after brainstorming completes. Do NOT trigger for: executing existing plans, reviewing plans, bug fixes, brainstorming (use brainstorming skill instead), trivial single-file changes, code review, or deployment."
---

# Planning

Create validated implementation plans from ideas or brainstorm output.

## Phase 1: Input

If brainstorm context exists in conversation, extract key decisions, approach, and constraints. Skip to Phase 2.

If a feature description was provided and is clear, confirm: "Description is clear. Proceed with research?"

Otherwise, ask one at a time via AskUserQuestion:
- What problem does this solve?
- Any constraints or dependencies?

## Phase 2: Parallel research

Launch everything in a **single message with multiple tool calls**.

### What to launch (all in one turn):

**Three research agents** (all via Agent tool, all with `run_in_background: true`):

Agent 1 - `asd-repo-researcher`:
```
subagent_type: "asd:asd-repo-researcher"
prompt: "Research codebase patterns for this feature: <feature_description>. Project root: <project_path>"
```

Agent 2 - `asd-learnings-researcher`:
```
subagent_type: "asd:asd-learnings-researcher"
prompt: "Search for relevant past solutions for: <feature_description>. Project root: <project_path>"
```

Agent 3 - `asd-docs-researcher`:
```
subagent_type: "asd:asd-docs-researcher"
prompt: "Research external docs and best practices for: <feature_description>"
```

**If brainstorm context exists**, skip asd-repo-researcher (codebase was already scanned during brainstorm Phase 1). Launch only learnings + docs researchers via the Agent tool.

All three agents go in a single message. Wait for all to complete.

### Scope check

If research reveals the change is too large for a single plan (10+ files across multiple modules), suggest a campaign:

"This looks too big for a single plan - it spans [N files across M modules]. Want to create a campaign to break it into incremental steps?"

If user agrees, invoke `/asd:campaign_create` and pass the research context.

## Phase 3: Plan generation

Use the Agent tool to launch an `asd-plan-writer` subagent with everything pre-resolved:

```
subagent_type: "asd:asd-plan-writer"
prompt: |
  Write an implementation plan for this feature.

  Feature: <feature_description>
  Brainstorm context: <if available>
  Project root: <project_path>
  Plan file path: docs/plans/YYYY-MM-DD-<type>-<name>-plan.md
  Template path: templates/plan.md
  Campaign link: <if from campaign_next>

  Research findings:
  <paste agent summaries here - they are already concise>

  Constraints: <any from user interaction>
```

The repo-researcher's output includes detected language and project file contents - pass it through so the plan-writer doesn't re-read them.

Filename rules: date prefix, type (feat/fix/refactor), kebab-case 3-5 words, end with `-plan.md`.

## Phase 4: Validate and finish

Use the Agent tool to launch an `asd-plan-validator` subagent on the written plan file:

```
subagent_type: "asd:asd-plan-validator"
prompt: "Validate this plan: <plan_file_path>"
```

If validator returns critical issues, use the Agent tool to launch a new `asd-plan-writer` subagent with validator feedback and the current plan path. Max 2 iterations.

Present options via AskUserQuestion:
1. **Review** (recommended) - `/asd:technical_review docs/plans/<filename>`
2. **Execute** - `/asd:execute docs/plans/<filename>`
3. **Refine** - Improve specific sections

## Principles

- **Context hygiene** - Research agents run in their own contexts and return summaries. Main context stays lean.
- **Parallel by default** - Every independent task runs simultaneously in a single message.
- **No redundant reads** - Repo-researcher returns language, project config, and patterns. Plan-writer uses these summaries instead of re-reading the same files.
- **YAGNI** - Scale plan to scope. Small changes get small plans.
