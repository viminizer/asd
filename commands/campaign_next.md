---
name: asd:campaign_next
description: "Pick the next campaign item and create a plan for it."
argument-hint: "[campaign file path]"
---

# /asd:campaign_next

Select the next eligible campaign item and generate an implementation plan.

## What it does

1. **Find** - Campaign from argument or auto-detect in-progress
2. **Show** - Eligible items (pending + dependencies met)
3. **Pick** - User selects an item
4. **Plan** - Mark as in-progress, invoke `/asd:plan` with item context

## Campaign file

<campaign_path> #$ARGUMENTS </campaign_path>

**If empty and one in-progress campaign,** use it. **If multiple,** ask user to choose.

## Execution

Invoke the `campaign-management` skill with `<operation>next</operation>`.

The skill passes item description + scope to `/asd:plan` and instructs it to include `<!-- campaign: docs/checklists/<name>.md#<item-number> -->` at the top of the plan file.

## Next step

After plan is generated: `/asd:technical_review` or `/asd:execute`
