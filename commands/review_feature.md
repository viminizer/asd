---
name: asd:review_feature
description: "Review an existing feature's implementation end-to-end. Produces a review file in docs/reviews/."
argument-hint: "[feature name or description]"
---

# /asd:review_feature

Review an existing feature's implementation across backend and frontend. Produces a persistent review document.

## Feature

<feature_description> #$ARGUMENTS </feature_description>

**If empty, ask:** "Which feature should I review? Describe it or name it (e.g. 'user authentication', 'billing system')."

## What it does

1. **Find** - Search codebase for all files related to the feature
2. **Review** - Dispatch appropriate reviewer in audit mode with feature description
3. **Write** - Save review to `docs/reviews/YYYY-MM-DD-<feature-name>.md`
4. **Next steps** - Offer to fix issues found

## Execution

Invoke the `review-feature` skill and follow it exactly.

## Output

Review document at `docs/reviews/YYYY-MM-DD-<feature-name>.md`
