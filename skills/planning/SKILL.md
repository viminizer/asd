---
name: planning
description: "Create implementation plans with research and bite-sized TDD tasks. Use when converting feature descriptions or brainstorm output into actionable plans."
---

# Planning

Create validated implementation plans from ideas or brainstorm output. Plans combine strategic context with bite-sized TDD tasks in sequential order.

## When to Use

- User provides a feature description
- After `/asd:brainstorm` completes
- When converting requirements to actionable plans

## Language detection

Before dispatching agents, detect the project language from file extensions and build files:
- **Java:** `.java` files, `pom.xml` or `build.gradle` present → use `asd-java-*` agents
- **TypeScript/JavaScript:** `.ts`, `.tsx`, `.js`, `.jsx` files, `package.json` present → use `asd-ts-*` agents
- **Other or mixed:** use generic `asd-*` agents

## Phase 1: Input Resolution

### 1a. Check for Brainstorm Context

If invoked from `/asd:brainstorm`, design context is already available in the conversation. Extract: key decisions, approach, constraints, open questions. Skip to Phase 2.

### 1b. Idea Refinement (if no brainstorm context)

If the feature description is already detailed, offer: "Description is clear. Proceed with research?"

Otherwise, ask questions one at a time via AskUserQuestion:
- What problem does this solve?
- Any constraints or dependencies?
- How will you measure success?

## Phase 2: Research (Parallel)

**If brainstorm context exists** (codebase already scanned in brainstorm Phase 1):
- Task asd-learnings-researcher(feature_description)
- Task asd-docs-researcher(feature_description)

**If no brainstorm context** (standalone `/asd:plan`):
- Task asd-repo-researcher(feature_description)
- Task asd-learnings-researcher(feature_description)
- Task asd-docs-researcher(feature_description)

Launch all applicable agents in parallel. Wait for all to return.

## Phase 3: Plan Generation

Dispatch the appropriate plan-writer (`asd-java-plan-writer`, `asd-ts-plan-writer`, or `asd-plan-writer`) with:
- Feature description (and brainstorm context if available)
- Raw research agent outputs from Phase 2 (pass them through, don't summarize)
- Any constraints or decisions from user interaction
- Plan file path: `docs/plans/YYYY-MM-DD-<type>-<name>-plan.md`

Filename rules:
- Date prefix required
- Type prefix after date (feat, fix, refactor)
- Kebab-case, 3-5 descriptive words
- End with `-plan.md`

The plan-writer runs in a clean context, reads the template and relevant source files, and writes the complete plan file.

## Phase 4: Validate and Next Steps

### 4a. Agent Validation

Dispatch the `asd-plan-validator` agent on the written plan.

If validator returns critical issues:
- Re-dispatch `asd-plan-writer` with the validator feedback and the current plan path (max 2 iterations)
- Warnings are noted but don't block

### 4b. Next Steps

Use AskUserQuestion to present options:

1. **Review** (Recommended) → `/asd:technical_review docs/plans/<filename>`
2. **Execute** → `/asd:execute docs/plans/<filename>`
3. **Refine** → Improve specific sections

## Key Principles

- **Validate after writing** - Plans must pass agent validation
- **YAGNI** - Scale plan to scope, no more
- **Testable criteria** - Every acceptance criterion must be verifiable
- **Zero-context tasks** - Engineer needs no prior codebase knowledge
- **DRY** - No duplicate information across plan sections
