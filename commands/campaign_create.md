---
name: asd:campaign_create
description: >
  Create a campaign to break a large, cross-cutting change into an ordered checklist of trackable items.
  Use this whenever the user wants to migrate, replace, upgrade, or refactor something across many files
  or modules - e.g. "migrate from X to Y", "replace library A with B", "add X to every component",
  "upgrade all endpoints". Also use when the user mentions tracking progress across multiple PRs,
  phased rollouts, or multi-week refactoring efforts. Do NOT use for single-feature planning, bug fixes,
  or checking status of existing campaigns.
argument-hint: "[description of the big change]"
---

# /asd:campaign_create

Break big changes into incremental, trackable campaigns.

## What it does

1. **Input** - Describe the big change (or use `$ARGUMENTS`). If research context was passed from a brainstorming or planning escalation, skip step 2.
2. **Research** - Analyze codebase scope via `asd-campaign-researcher`
3. **Generate** - Ordered checklist with scope, effort, and dependencies
4. **Save** - Campaign file at `docs/checklists/<name>.md`

## Change description

<change_description> #$ARGUMENTS </change_description>

**If empty, ask:** "What big change do you want to track?"

## Execution

Invoke the `campaign-management` skill with `<operation>create</operation>`.

## Output

Campaign file at `docs/checklists/<name>.md`

## Next step

`/asd:campaign_next` to start the first item.
