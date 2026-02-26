---
name: milestone-tracker
description: "Use to track progress across multiple plans or phases. Visualizes status and helps manage milestones."
---

# Milestone Tracker

Track progress across plans and milestones.

## When to Use

- Working on multi-phase features
- Need to see overall progress
- Completing a milestone

## Process

### Phase 1: Check Existing Status

Check for existing milestone file:

```bash
ls docs/asd/milestones.md 2>/dev/null
```

### Phase 2: Track Progress

For each plan being worked on, track:

| Field | Description |
|-------|-------------|
| Status | not-started, in-progress, complete |
| Plan | Plan name |
| Tasks | N/M completed |
| Blockers | Any blocking issues |

### Phase 3: Milestone Completion

When milestone completes:

1. Calculate stats:
   - Files changed: `git diff --stat`
   - Lines of code: `wc -l`
   - Time elapsed

2. Write milestone entry:

```markdown
## v[X.Y] [Name] (Shipped: YYYY-MM-DD)

**Delivered:** [One sentence]

**Key accomplishments:**
- Achievement 1
- Achievement 2

**Stats:**
- X files created/modified
- Y lines of code
- Z days from start

**Git range:** `commit1` → `commit2`

**What's next:** [Next milestone goals]
```

## Key Principles

- Track continuously, not just at end
- Update status after each checkpoint
- Celebrate milestone completion
