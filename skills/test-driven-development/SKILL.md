---
name: test-driven-development
description: "Use when implementing features or bugfixes. Enforces RED-GREEN-REFACTOR cycle before writing implementation code."
---

# Test-driven development

Write tests first. Watch them fail. Write minimal code to pass.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

## When to Use

- New features
- Bug fixes
- Refactoring
- Behavior changes

**Exceptions:**
- Throwaway prototypes
- Generated code
- Configuration files

## Red-Green-Refactor Cycle

### RED - Write Failing Test

Write one minimal test showing expected behavior:

```typescript
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };

  const result = await retryOperation(operation);

  expect(result).toBe('success');
  expect(attempts).toBe(3);
});
```

**Requirements:**
- One behavior per test
- Clear name describing behavior
- Real code (no mocks unless unavoidable)

### GREEN - Minimal Code

Write simplest code to pass the test:

```typescript
async function retryOperation<T>(fn: () => Promise<T>): Promise<T> {
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === 2) throw e;
    }
  }
  throw new Error('unreachable');
}
```

Don't add features beyond what the test requires.

### REFACTOR - Clean Up

After green:
- Remove duplication
- Improve names
- Extract helpers

Keep tests green. Don't add behavior.

### Repeat

Next failing test for next feature.

## Verification Checklist

Before marking work complete:

- [ ] Every new function/method has a test
- [ ] Watched each test fail before implementing
- [ ] Each test failed for expected reason
- [ ] Wrote minimal code to pass each test
- [ ] All tests pass
- [ ] No test errors or warnings
- [ ] Edge cases and errors covered

## Common Rationalizations to Avoid

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Already manually tested" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "TDD will slow me down" | TDD faster than debugging. |
| "Need to explore first" | Fine. Throw away exploration, start with TDD. |

## Bug Fix Flow

**Bug found → Write failing test → Fix → Verify**

```typescript
// Bug: Empty email accepted
// RED
test('rejects empty email', async () => {
  const result = await submitForm({ email: '' });
  expect(result.error).toBe('Email required');
});

// GREEN
function submitForm(data) {
  if (!data.email?.trim()) {
    return { error: 'Email required' };
  }
  // ...
}
```

## Integration with Execution

During `/asd:execute`:
1. Break work into tasks
2. For each task: TDD cycle first
3. Verify tests pass before marking task complete
4. No production code without failing test first
