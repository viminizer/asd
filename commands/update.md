---
name: asd:update
description: "Update the asd plugin to the latest version."
argument-hint: ""
---

# /asd:update

Update asd to the latest version from the marketplace.

## Process

1. Check current version

Read .claude-plugin/plugin.json and note the current version.

2. Clear cache

rm -r /Users/mac/.claude/plugins/cache/viminizer-marketplace/asd

3. Update

Run:
/plugin marketplace add viminizer/asd
/plugin install asd@viminizer/asd

4. Confirm

Read .claude-plugin/plugin.json again. Report:

- Previous version: X.Y.Z
- Updated version: X.Y.Z (or "already up to date" if unchanged)
