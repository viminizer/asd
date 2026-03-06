---
name: asd:campaign_status
description: >
  View progress and status of campaign checklists.
  Use when the user wants to see campaign progress, check how far along a migration is,
  view remaining items, or asks "how's the campaign going", "campaign progress", "what's left",
  "show campaigns". Also use for stale campaign warnings.
  Do NOT use for creating, editing, or advancing campaigns.
argument-hint: "[campaign file path]"
---

# /asd:campaign_status

Show campaign progress, next eligible items, and stale warnings.

## Campaign file

<campaign_path> #$ARGUMENTS </campaign_path>

**If empty,** show all campaigns. **If provided,** show detailed view with all items.

## Execution

Invoke the `campaign-management` skill with `<operation>status</operation>`.
