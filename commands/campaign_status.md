---
name: asd:campaign_status
description: "View progress of campaigns."
argument-hint: "[campaign file path]"
---

# /asd:campaign_status

Show campaign progress, next eligible items, and stale warnings.

## What it does

1. **Load** - All campaigns or a specific one from argument
2. **Show** - Progress per campaign (X/Y done, Z%)
3. **Recommend** - Next eligible item with effort estimate
4. **Warn** - Stale campaigns with no progress in 7+ days

## Campaign file

<campaign_path> #$ARGUMENTS </campaign_path>

**If empty,** show all campaigns. **If provided,** show detailed view with all items.

## Execution

Invoke the `campaign-management` skill with `<operation>status</operation>`.
