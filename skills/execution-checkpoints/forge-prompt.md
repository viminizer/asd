# Forge subagent prompt template

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

Once requirements are clear, implement the task following the process in your agent prompt (TDD, self-review, commit).

Work from: [working directory]
```

## Agent tool call

```json
{
  "description": "Task N: [short task summary]",
  "subagent_type": "asd:asd-forge",
  "prompt": "[filled template above]"
}
```
