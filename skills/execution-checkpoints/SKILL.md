---
name: execution-checkpoints
description: "Use when executing implementation plans. Breaks work into verifiable checkpoints with tests, commits after each logical unit."
---

# Execution Checkpoints

Execute plans with verifiable checkpoints and incremental progress.

## When to Use

- Running `/asd:execute` with a plan file
- Implementing features from a validated plan

## Process

### Phase 1: Prepare

1. **Read the plan** completely
2. **Verify understanding** - ask clarifying questions if needed
3. **Get user approval** to proceed

### Phase 2: Environment Setup

**Check current branch:**

```bash
git branch --show-current
```

**If on default branch:**
- Create feature branch: `git checkout -b feat/<name>`
- Or use worktree for isolation

**If on feature branch:**
- Continue, or create new branch

### Phase 3: Break Into Checkpoints

Create checkpoints from plan tasks:

| Checkpoint | Task | Verification |
|------------|------|--------------|
| 1 | Implement X | Tests pass |
| 2 | Add Y | Tests pass |
| 3 | Integrate | Integration tests pass |

Use TodoWrite to track.

### Phase 4: Execute Checkpoints

For each checkpoint:

1. **Mark in_progress**
2. **Implement** - follow existing patterns
3. **Write tests** - TDD if possible
4. **Verify** - run tests
5. **Checkpoint verification:**
   - [ ] Tests pass
   - [ ] No regressions
   - [ ] Acceptance criteria met
6. **Mark completed**

### Phase 5: System-Wide Test Check

Before marking a checkpoint complete, verify:

| Question | Action |
|----------|--------|
| What fires when this runs? | Trace callbacks, middleware |
| Do tests exercise real chain? | At least one integration test |
| Can failure leave orphaned state? | Verify cleanup on failure |
| What other interfaces expose this? | Check parity needed |

### Phase 6: Incremental Commits

**Commit when:**
- Logical unit complete (model, service, component)
- Tests pass + meaningful progress
- About to switch contexts

**Don't commit when:**
- Tests failing
- Would need "WIP" message

**Commit workflow:**
```bash
git add <files for this unit>
git commit -m "feat(scope): description"
```

### Phase 7: Final Verification

After all checkpoints:

1. Run full test suite
2. Verify no regressions
3. Ensure acceptance criteria met

## Key Principles

- **Verify at each checkpoint** - Don't defer testing
- **Commit logical units** - Small, focused commits
- **Test real interactions** - Not just isolated unit tests
- **Clear context** - /clear between major sections if needed
