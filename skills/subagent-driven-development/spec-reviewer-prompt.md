# Spec compliance reviewer prompt template

Copy this template into the Agent tool `prompt` parameter, filling in the bracketed sections.

**Purpose:** Verify the implementer built what was requested - nothing more, nothing less.

```
Review scope: spec-compliance

## What was requested

[FULL TEXT of task requirements from plan]

## What the implementer claims they built

[Summary from forge subagent's DONE report - files created, files modified, test results]

## CRITICAL: Do not trust the report

The implementer's report may be incomplete, inaccurate, or optimistic. You MUST verify everything independently.

**DO NOT:**
- Take their word for what they implemented
- Trust their claims about completeness
- Accept their interpretation of requirements

**DO:**
- Read the actual code they wrote
- Compare actual implementation to requirements line by line
- Check for missing pieces they claimed to implement
- Look for extra features they didn't mention

## Your job

Read the implementation code and verify:

**Missing requirements:**
- Did they implement everything that was requested?
- Are there requirements they skipped or missed?
- Did they claim something works but didn't actually implement it?

**Extra/unneeded work:**
- Did they build things that weren't requested?
- Did they over-engineer or add unnecessary features?

**Misunderstandings:**
- Did they interpret requirements differently than intended?
- Did they solve the wrong problem?

**Verify by reading code, not by trusting the report.**

Report:
- PASS (if everything matches after code inspection)
- Issues found: [list specifically what's missing or extra, with file:line references]
```

## Agent tool call

```json
{
  "description": "Spec review task N: [short task summary]",
  "subagent_type": "asd:asd-code-reviewer",
  "prompt": "[filled template above]"
}
```
