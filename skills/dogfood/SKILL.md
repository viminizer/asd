---
name: dogfood
description: "Use when testing or exploring a web application. Systematically explore pages, test features, and document issues with detailed descriptions."
allowed-tools: Bash
---

# Dogfood - Web Application QA

Systematically explore a web application and document issues.

## Prerequisites

**Required:**
- `agent-browser` tool must be installed

## When to Use

- User says "dogfood", "QA", "test this app", "find bugs"
- Exploratory testing of a web application
- Bug hunting on a deployed site

## Workflow

```
1. Setup     - Initialize session, output dirs
2. Auth      - Sign in if needed
3. Explore   - Systematically visit pages, test features
4. Document  - Describe each issue found
5. Report    - Summarize all findings
```

### 1. Setup

Get target URL from user if not provided.

```bash
mkdir -p ./dogfood-output
```

Start a session:

```bash
agent-browser --session {SESSION} open {TARGET_URL}
agent-browser --session {SESSION} wait --load networkidle
```

### 2. Authenticate (if needed)

If app requires login, ask user for credentials:

```bash
agent-browser --session {SESSION} snapshot -i
# Identify form refs, fill credentials
agent-browser --session {SESSION} fill @e1 "{EMAIL}"
agent-browser --session {SESSION} fill @e2 "{PASSWORD}"
agent-browser --session {SESSION} click @e3
agent-browser --session {SESSION} wait --load networkidle
```

### 3. Explore

**Strategy - work through systematically:**

- Start from main navigation, visit each section
- Test interactive elements: buttons, forms, dropdowns, modals
- Check edge cases: empty states, error handling, boundary inputs
- Try realistic workflows: create, edit, delete flows
- Check browser console for errors

**At each page:**

```bash
agent-browser --session {SESSION} snapshot -i
agent-browser --session {SESSION} console
agent-browser --session {SESSION} errors
```

### 4. Document Issues

**For each issue found, document:**

```
### ISSUE-{NNN}: [Brief Title]

**Severity:** critical | medium | low

**Page:** [URL or page name]

**Description:**
[Detailed description of what went wrong]

**Steps to Reproduce:**
1. Step one
2. Step two
3. ...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happened]

**Console Output:**
[Any relevant errors]
```

### 5. Report

After exploring:

1. Summarize findings: X critical, Y medium, Z low
2. List each issue with brief description
3. Close session:

```bash
agent-browser --session {SESSION} close
```

## Guidelines

- **Detailed descriptions** - Write enough that someone can understand the issue
- **Test like a user** - Click what a real user would click
- **Check console** - Many issues show as JS errors
- **No source code** - Test the app, don't audit code
- **5-10 issues** - Quality over quantity
- **Reproducible** - Describe clearly enough to reproduce

## Output

Report saved to `./dogfood-output/report.md`
