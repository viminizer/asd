---
name: capture
description: "Use after completing work to document solutions. Captures problems, root causes, and prevention strategies for future reference. Trigger on: 'capture this', 'document what we learned', 'save this solution', 'lessons learned', 'knowledge base', 'what did we solve', 'postmortem', or after finishing a fix/feature worth remembering."
---

# Knowledge capture

Document solved problems so future sessions can find and reuse them.

## Phase 1: Gather context

Use the user's description if provided. Otherwise, check recent work:
- `git log --oneline -20` to find relevant commits
- `git diff --stat HEAD~3` for a quick overview of changes

If the user's description is clear, proceed directly. If it's vague or missing, ask: "What should we capture?" and wait for a response. If git history shows multiple unrelated changes, ask the user which one to capture.

The goal is to understand two things: **what the challenge was** and **how it was resolved**.

## Phase 2: Write solution document

Create `docs/solutions/` if it doesn't exist. Save to `docs/solutions/YYYY-MM-DD-<topic>.md` where `<topic>` is 2-4 words in kebab-case describing the core issue (e.g. `csrf-token-mismatch`, `docker-build-cache`, `null-pointer-on-login`).

If a file with the same date and topic already exists, append a number (e.g. `-2`).

Read the solution template at `templates/solution.md` (relative to the plugin's install directory) for structure. Fill in each section:

- **Problem** - What the challenge was. For bugs: error messages, symptoms, affected components. For features/refactors: what was missing, painful, or limiting. Be specific enough that someone searching would recognize it.
- **Root cause** - Why this was hard or why it broke. This is the most valuable section - explain the underlying cause, not the surface issue.
- **Solution** - What was done. Include file paths (`file:line`), code snippets, and config changes.
- **Prevention** - How to avoid similar issues in the future. Skip for pure feature captures where prevention doesn't apply.
- **Tags** - Add 2-4 searchable keywords in the frontmatter `tags` field.

Keep the document scannable - aim for enough detail that a future session can understand the solution without re-investigating, but don't pad it.

## Phase 3: Cross-reference

List filenames in `docs/solutions/` and link any whose topic relates to this one. Add a backlink in those files too. If no related solutions exist, omit the Related section entirely.

## Rules

- Focus on why, not just what - the root cause is what helps future sessions
- Be specific - include file:line references, error messages, and code
- One problem per document
- Skip trivial fixes that aren't worth remembering
