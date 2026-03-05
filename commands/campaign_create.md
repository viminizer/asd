---
name: asd:campaign_create
description: "Create a campaign to track a big change across multiple plans."
argument-hint: "[description of the big change]"
---

# /asd:campaign_create

Break big changes into incremental, trackable campaigns.

## What it does

1. **Input** - Describe the big change (or use `$ARGUMENTS`)
2. **Research** - Analyze codebase scope via `asd-repo-researcher`
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
