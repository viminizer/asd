---
name: review-feature
description: "Use when reviewing an existing feature's implementation end-to-end. Searches codebase, dispatches asd-code-reviewer in audit mode, and writes a review document."
---

# Review feature

Review an existing feature's full implementation across backend and frontend.

## When to use

- User wants to audit a feature's implementation quality
- Before refactoring a feature
- When onboarding to understand a feature's health

## Phase 1: Identify scope

Dispatch the `asd-file-scoper` agent (haiku) to find all related files:

```
Feature: [feature description from user]

Find all files related to this feature across backend and frontend.
```

Present the returned file list to the user and ask: "These are the files I found for this feature. Anything missing or anything I should exclude?"

## Phase 2: Review

Dispatch the `asd-code-reviewer` agent in audit mode:

```
Review scope: feature audit

Feature: [feature description from user]

Review the implementation of this feature end-to-end.
Files found: [file list from Phase 1]

Run all relevant passes: security, performance, architecture, database, code quality.
```

## Phase 3: Write review document

```bash
mkdir -p docs/asd/reviews/
```

Save to `docs/asd/reviews/YYYY-MM-DD-<feature-name>.md`

Filename rules:
- Date prefix required
- Kebab-case feature name, 2-4 descriptive words
- Example: `2026-03-04-user-authentication.md`

Read the review template for structure reference:
```
Read templates/review.md
```

Follow the template format. If no issues found, set verdict to `pass` and write "No issues found" under Findings.

## Phase 4: Next steps

Use AskUserQuestion to present options:

1. **Fix issues** → `/asd:fix` with the critical/warning items
2. **Review another feature** → `/asd:review_feature`
3. **Done** → No further action

## Rules

- Read at most 15 files (prioritize by risk - auth, data handling, public endpoints first)
- Don't modify any code - review only
- Include file:line references for every finding
- The review document is the deliverable - always write it
