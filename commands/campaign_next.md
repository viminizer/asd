---
name: asd:campaign_next
description: >
  Pick the next eligible campaign item and create an implementation plan for it.
  Use when the user wants to start working on the next piece of a campaign, continue a campaign,
  or says things like "what's next", "next campaign item", "pick next task", "continue the migration".
  Do NOT use for creating campaigns, editing items, or checking status.
argument-hint: "[campaign file path]"
---

# /asd:campaign_next

Select the next eligible campaign item and generate an implementation plan.

## Campaign file

<campaign_path> #$ARGUMENTS </campaign_path>

**If empty and one in-progress campaign,** use it. **If multiple,** ask user to choose.

## Execution

Invoke the `campaign-management` skill with `<operation>next</operation>`.

## Next step

After plan is generated: `/asd:technical_review` or `/asd:execute`
