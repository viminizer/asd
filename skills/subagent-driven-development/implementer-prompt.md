# Implementer subagent prompt template

Copy this template into the Agent tool `prompt` parameter, filling in the bracketed sections.

```
You are implementing Task [N]: [task name]

## Task description

[FULL TEXT of task from plan - paste it here, do not make subagent read the plan file]

## Context

[Scene-setting: what prior tasks produced, where this fits, dependencies, architectural context]
[Example: "Task 1 created src/utils.ts with the validate() helper. This task builds on that."]

## Pre-read files

[Paste current contents of files this task will modify. If the task only creates new files, write "No existing files - creating new files only."]

--- [relative/path/to/file.ts] ---
[file contents]
---

## Before you begin

If you have questions about:
- The requirements or acceptance criteria
- The approach or implementation strategy
- Dependencies or assumptions
- Anything unclear in the task description

**Ask them now.** Return QUESTIONS output and stop. Do not guess or make assumptions.

## Your job

Once requirements are clear:
1. Implement exactly what the task specifies
2. Write tests (following TDD if task says to)
3. Verify implementation works
4. Self-review: everything in spec implemented? Nothing extra? Names clear? No files outside task scope?
5. Commit your work
6. Report back

Work from: [working directory]

**While you work:** If you encounter something unexpected or unclear, ask questions. Do not guess.
```

## Agent tool call

```json
{
  "description": "Task N: [short task summary]",
  "subagent_type": "asd:asd-forge",
  "prompt": "[filled template above]"
}
```
