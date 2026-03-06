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
- **Enhancement** - Request a new capability
- **Feedback** - General suggestion or comment

### 2. Clarify before drafting

Ask follow-up questions **one at a time** until you have enough detail to fill the template. Don't draft until you understand the issue.

**For bugs**, make sure you know:
- What happened vs what they expected
- Steps to reproduce (or at least what they were doing)
- Read the asd version from `.claude-plugin/plugin.json` for the environment field

**For enhancements**, make sure you know:
- What they want and why
- How they'd use it (the use case)

**For feedback**, a clear description is enough.

Skip questions if the user's description already covers them.

### 3. Draft the issue

Read `templates/issue.md` for structure. Use the section matching the chosen type.

### 4. Confirm and submit

Show the draft title and body to the user. Ask: "Submit this issue?"

If confirmed, run:
```bash
gh issue create --repo viminizer/asd --title "<title>" --label "<type>" --body "<body>"
```

Labels: `bug`, `enhancement`, or `feedback` (matching the type).

### 5. Done

Print the issue URL.
