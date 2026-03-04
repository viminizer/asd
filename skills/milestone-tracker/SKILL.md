---
name: milestone-tracker
description: "Use to record milestone completions. Appends entries to the project milestones file with stats from git history."
---

# Milestone tracker

Record milestone completions with accomplishments and stats.

## When to use

- After completing a significant phase of work
- After shipping a feature or version
- When user says "record milestone" or "we shipped"

## Phase 1: Gather info

Ask the user:
- **Version** - What version or milestone name? (e.g. v0.8, "auth system")
- **What shipped** - One sentence summary

Then gather stats from git:
- Files changed: `git diff --stat <start-commit>..HEAD`
- Commit range: `git log --oneline <start-commit>..HEAD`

If the user doesn't know the start commit, check for the previous milestone entry or use the last tag.

## Phase 2: Write entry

Check if `docs/asd/milestones.md` exists:
- If yes, read it and prepend the new entry (newest first)
- If no, create it using the milestone template

Read the milestone template for structure reference:
```
Read @asd/templates/milestone.md
```

Fill in: version, name, date, delivered summary, key accomplishments, file stats, git range, what's next.

## Phase 3: Confirm

Show the entry to the user before writing. Commit after confirmation.

## Rules

- Entries are reverse chronological (newest first)
- One entry per milestone - don't combine
- Stats come from git, not estimates
- Keep accomplishments to 3-5 bullets
