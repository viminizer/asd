---
name: asd:dogfood
description: "Explore a web application and find bugs, UX issues, and problems."
argument-hint: "[target URL]"
---

# /asd:dogfood

Explore a web application systematically and document issues.

## Usage

```
/asd:dogfood [target URL]
```

## Prerequisites

- `agent-browser` tool must be installed

## What It Does

1. **Setup** - Initialize session, create output directory
2. **Authenticate** - Sign in if needed (ask user for credentials)
3. **Explore** - Visit pages systematically, test features
4. **Document** - Describe each issue with detailed steps
5. **Report** - Summarize all findings

## Output

Report at `./dogfood-output/report.md`

## Example

```
/asd:dogfood vercel.com
/asd:dogfood http://localhost:3000
```
