---
name: asd:campaign_edit
description: "Add, remove, or reorder items in a campaign."
argument-hint: "[campaign file path]"
---

# /asd:campaign_edit

Modify an existing campaign's items.

## What it does

1. **Load** - Find campaign (argument or auto-detect in-progress)
2. **Ask** - Add, remove, or reorder items
3. **Update** - Adjust items, renumber, fix dependencies
4. **Save** - Commit updated campaign file

## Campaign file

<campaign_path> #$ARGUMENTS </campaign_path>

**If empty,** list campaigns in `docs/checklists/` and ask which one.

## Execution

Invoke the `campaign-management` skill with `<operation>edit</operation>`.
