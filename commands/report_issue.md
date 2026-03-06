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

### 2. Draft the issue

Read `templates/issue.md` for structure. Use the section matching the chosen type. Fill in the fields by asking the user for any missing details.

For bugs, read the asd version from `.claude-plugin/plugin.json` to populate the environment field.

### 3. Confirm and submit

Show the draft title and body to the user. Ask: "Submit this issue?"

If confirmed, run:
```bash
gh issue create --repo viminizer/asd --title "<title>" --label "<type>" --body "<body>"
```

Labels: `bug`, `enhancement`, or `feedback` (matching the type).

### 4. Done

Print the issue URL.
