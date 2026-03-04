---
name: capture
description: "Use after completing work to document solutions. Captures problems, root causes, and prevention strategies for future reference."
---

# Knowledge capture

Document solved problems for team knowledge compounding.

## When to use

- After `/asd:execute` and `/asd:review` complete
- After fixing a bug with `/asd:fix`
- After implementing a tricky feature
- When a solution is worth remembering

## Phase 1: Gather context

Check recent work:
- Recent commits (`git log --oneline -10`)
- Files changed (`git diff --name-only HEAD~5`)

If the user provided context, use that. Otherwise ask: "What did we solve?"

## Phase 2: Write solution document

```bash
mkdir -p docs/asd/solutions/
```

Save to `docs/asd/solutions/YYYY-MM-DD-<topic>.md`

Read the solution template for structure reference:
```
Read @asd/templates/solution.md
```

Fill in each section from the gathered context:
- **Problem** - What was the issue?
- **Symptoms** - How did it manifest?
- **Root cause** - Why did it happen?
- **Solution** - How was it fixed? Include code if helpful.
- **Prevention** - How to prevent recurrence?

## Phase 3: Cross-reference

1. Check existing `docs/asd/solutions/` for related solutions
2. Add links in the Related section
3. Update related solutions with a link back to this one

## Rules

- Capture while fresh - context evaporates quickly
- Be specific - include file:line references and code snippets
- Focus on why, not just what
- Don't over-document obvious fixes - capture things worth remembering
- One solution per document - don't combine unrelated fixes
