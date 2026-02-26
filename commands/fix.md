---
name: asd:fix
description: "Quick fix workflow - create a bug fix plan and execute it automatically."
argument-hint: "[issue description or bug to fix]"
disable-model-invocation: true
---

# /asd:fix

Quick fix workflow - create and execute a bug fix plan.

## Usage

```
/asd:fix [issue description or bug to fix]
```

## What It Does

Runs these steps in order:

1. **Create fix plan** - Generate a bug fix plan with:
   - Problem description
   - Root cause analysis
   - Fix approach
   - Acceptance criteria

2. **Execute fix** - Run the fix with checkpoint verification

3. **Review** - Run code review on the fix

## Steps (Sequential)

1. `/asd:plan $ARGUMENTS` — Create fix plan
2. `/asd:execute` — Execute the fix
3. `/asd:review` — Review the changes

Start now.
