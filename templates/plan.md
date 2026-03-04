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

<!-- Group tasks by dependency order. -->
<!-- Isolate tasks that modify schema, shared contracts, or foundational layers. -->

### Group 1: [Name] (depends: none)

#### Task 1: [Name]

**Files:**
- Create: `exact/path/to/file.ext`
- Modify: `exact/path/to/existing.ext`
- Test: `tests/exact/path/to/test.ext`

**Step 1: Write failing test**
```language
// exact test code
```

**Step 2: Implement**
```language
// exact implementation code
```

**Step 3: Verify**
Run: `<test command>`
Expected: PASS

### Group 2: [Name] (depends: Group 1)

#### Task 2: [Name]
<!-- Same structure as Task 1 -->

## Acceptance criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Tests pass, no regressions

## Sources
- **Codebase patterns:** [file_path:line]
- **External docs:** [url]
