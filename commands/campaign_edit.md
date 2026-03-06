---
name: asd:campaign_edit
description: >
  Add, remove, or reorder items in an existing campaign checklist.
  Use when the user wants to modify campaign items - adding new work items, removing completed or cancelled ones,
  reordering priorities, or adjusting scope. Also triggers on "update campaign", "change campaign items",
  "add to campaign", "remove from campaign". Do NOT use for creating new campaigns or checking status.
argument-hint: "[campaign file path]"
---

# /asd:campaign_edit

Modify an existing campaign's items.

## Campaign file

<campaign_path> #$ARGUMENTS </campaign_path>

**If empty,** list campaigns in `docs/campaigns/` and ask which one.

## Execution

Invoke the `campaign-management` skill with `<operation>edit</operation>`.
