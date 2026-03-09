---
title: <title>
type: feat|fix|refactor
status: not-started|in-progress|complete
date: YYYY-MM-DD
---

# <Title>

## Problem
[What we're solving and why it matters]

## Solution
[High-level approach with rationale]

## Technical considerations
<!-- Include only what's relevant. Skip sections that don't apply. -->
- Architecture impacts
- Performance implications
- Security considerations
- Dependencies and risks

## Alternative approaches considered
<!-- Optional. Include for non-trivial decisions. -->
| Approach | Pros | Cons | Why rejected |
|----------|------|------|-------------|
| [Approach A] | ... | ... | ... |

## Implementation

### Task 1: [Name]
**Depends on:** - (none, or comma-separated task numbers e.g. 1, 2)

**Files:**
- Create: `exact/path/to/file.ext`
- Modify: `exact/path/to/existing.ext`
- Test: `tests/exact/path/to/test.ext`

**Step 1: Write failing test**
```language
// exact test code
```

**Step 2: Run test (expect fail)**
Run: `<test command>`
Expected: FAIL with `<expected error>`

**Step 3: Implement**
```language
// exact implementation code
```

**Step 4: Run test (expect pass)**
Run: `<test command>`
Expected: PASS

**Step 5: Commit**
```bash
git add <files>
git commit -m "feat: description"
```

### Task 2: [Name]
<!-- Same structure as Task 1 -->

## Acceptance criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Tests pass, no regressions

## Sources
- **Codebase patterns:** [file_path:line]
- **External docs:** [url]
