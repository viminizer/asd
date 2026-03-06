---
name: campaign-management
description: >
  Internal skill invoked by campaign commands (/asd:campaign_create, /asd:campaign_edit,
  /asd:campaign_next, /asd:campaign_status). Do not auto-trigger - only activate when
  a campaign command delegates to this skill with an <operation> tag.
---

# Campaign management

Track large, multi-plan changes through ordered checklists. The invoking command passes `<operation>create|edit|next|status</operation>` and optional arguments.

## Campaign discovery

When no file path is given:

1. List markdown files in `docs/campaigns/` (exclude `archive/`)
2. If exactly one has `status: in-progress`, use it automatically
3. If multiple, show the list and ask the user to choose
4. If none, tell the user to run `/asd:campaign_create`

## Phase: Create

1. Ask the user to describe the big change (use `$ARGUMENTS` if provided)
2. Run `mkdir -p docs/campaigns/`
3. If research context was passed from a brainstorming or planning escalation, use it. Otherwise dispatch `asd-campaign-researcher` to explore the codebase in depth (it runs parallel searches for structure, usage patterns, and dependencies, returning a structured module breakdown).
4. If research finds no matching files or patterns, tell the user the change doesn't apply to this codebase. Do not fabricate items for files that don't exist. Stop here.
5. Analyze scope and suggest an incremental approach (e.g. "migrate by module" or "migrate by feature area"). Aim for 3-8 items - group related files into logical units rather than listing one item per file.
6. Present the approach and ask the user to confirm before generating
7. Generate ordered checklist items. Each item includes:
   - Description of what to do
   - Scope: specific files or glob patterns from researcher output
   - Effort: small (1-3 files), medium (4-8 files), large (9+ files)
   - Dependencies: item numbers that must be done first
8. Read `templates/campaign.md` for structure reference
9. Save to `docs/campaigns/<kebab-case-name>.md`
10. Commit the file

## Phase: Edit

1. Discover or load the campaign file
2. Show current items and ask: "Add, remove, or reorder?"
3. **Add:** ask for description, dispatch `asd-repo-researcher` to find scope, assign effort and dependencies
4. **Remove:** ask which item, remove it, renumber remaining items, update all dependency references
5. **Reorder:** ask for new order, renumber, recalculate dependencies - warn if reorder breaks a dependency
6. Update the file, update the `updated` date in frontmatter, commit

## Phase: Next

1. Discover or load the campaign file
2. Find eligible items: `status: pending` AND all items listed in `Depends on` have `status: done`
3. Recommend the first eligible item by number; show all eligible items and let the user pick
4. Mark selected item as `in-progress`, update `updated` date in frontmatter, update the `Progress` line, commit
5. Invoke `/asd:plan` with the item description and scope as the feature description, plus a note to add `<!-- campaign: docs/campaigns/<name>.md#<item-number> -->` at the top of the generated plan file

## Phase: Status

1. List all campaign files in `docs/campaigns/` (exclude `archive/`)
2. For each campaign, show:
   - Campaign title
   - Progress: X/Y done (Z%)
   - Next eligible item (first pending item with all dependencies done)
   - Remaining scope summary
3. If the `updated` date in frontmatter is 7+ days ago, show a stale warning
4. If a specific file path is given, show a detailed view with all items and their statuses

## Rules

- Never modify plan files - the campaign comment is added during plan creation by the planning skill
- Always update the `updated` date in frontmatter when changing any item
- Keep the `Progress` line in sync: count `done` items vs total
- Campaign file names use kebab-case: `tanstack-migration.md`, not `TanStack Migration.md`
