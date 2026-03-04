---
name: asd:execute
description: "Execute implementation plans using subagents with automated review loops."
argument-hint: "[plan file path]"
---

# /asd:execute

Execute implementation plans using subagent-driven development. Each task gets a fresh subagent for implementation, then two review stages before moving on.

## What It Does

1. **Load plan** - Read plan file, identify tasks and dependencies
2. **Setup branch** - Create feature branch from current HEAD
3. **Per task** - Dispatch subagent to implement, then spec review, then code quality review
4. **Full review** - Review entire branch diff, fix any issues found
5. **Finish** - Present merge/PR options

## Output

- Feature branch with incremental commits per task
- All tasks verified by per-task reviews + full branch review
