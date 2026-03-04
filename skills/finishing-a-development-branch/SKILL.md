---
name: finishing-a-development-branch
description: "Use when implementation is complete and all tests pass. Presents options for merging, creating a PR, keeping, or discarding the feature branch."
---

# Finishing a development branch

Guide completion of development work on a feature branch.

## When to use

- After `/asd:execute` completes all tasks
- When all tests pass and work is ready to integrate

## Step 1: Verify tests

Run the project's test suite (check CLAUDE.md or package.json for the test command). If no test suite exists, verify manually by running the changed code paths.

If tests fail, stop. Do not proceed with any merge or PR until tests pass.

## Step 2: Determine base branch

```bash
git log --oneline --all --graph -10
```

Identify the branch this feature was branched from. Usually `main` or `master`.

## Step 3: Present options

Use AskUserQuestion to ask:

**Question:** "All tests pass. How do you want to integrate this work?"

**Options:**
1. **Merge locally** - merge into base branch
2. **Create PR** - push and open a pull request
3. **Keep as-is** - leave the branch for later
4. **Discard** - delete the branch

## Step 4: Execute choice

### Merge locally

```bash
git checkout <base-branch>
git pull
git merge <feature-branch>
```

Run tests again on the merged result. If they pass:

```bash
git branch -d <feature-branch>
```

### Create PR

```bash
git push -u origin <feature-branch>
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
<2-3 bullets of what changed>

## Test plan
- [ ] <verification steps>
EOF
)"
```

Report the PR URL to the user.

### Keep as-is

Do nothing. Inform the user which branch they're on.

### Discard

Confirm with the user first, then:

```bash
git checkout <base-branch>
git branch -D <feature-branch>
```

## Red flags

- Never merge without tests passing
- Never force push a feature branch without asking
- Never delete a branch without confirmation
- Never proceed if you're unsure which branch is the base
