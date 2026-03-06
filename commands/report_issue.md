---
name: asd:report_issue
description: "Report a bug, request a feature, or give feedback on the asd plugin."
argument-hint: "[issue description]"
---

# /asd:report_issue

Create a GitHub issue on [viminizer/asd](https://github.com/viminizer/asd).

## Issue description

<issue_description> #$ARGUMENTS </issue_description>

## Process

### 1. Gather context

If `$ARGUMENTS` is empty, ask: "What would you like to report?"

Then ask the user to pick a type:
- **Bug** - Something isn't working as expected
- **Feature** - Request a new capability
- **Feedback** - General suggestion or comment

### 2. Draft the issue

Based on the type, draft the issue:

**Bug:**
```markdown
## What happened
[User's description]

## Expected behavior
[Ask if not obvious]

## Steps to reproduce
[Ask user or infer from description]

## Environment
- asd version: [read from .claude-plugin/plugin.json]
```

**Feature / Feedback:**
```markdown
## Description
[User's description]

## Use case
[Why this would be useful - ask if not clear]
```

### 3. Confirm and submit

Show the draft title and body to the user. Ask: "Submit this issue?"

If confirmed, run:
```bash
gh issue create --repo viminizer/asd --title "<title>" --label "<type>" --body "<body>"
```

Labels: `bug`, `enhancement`, or `feedback` (matching the type).

### 4. Done

Print the issue URL.
