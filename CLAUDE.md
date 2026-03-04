# Code simplicity principle

Implement features using the smallest clear solution.

Less code usually means fewer bugs, lower cognitive load, and easier maintenance - but clarity always comes first. Do not sacrifice readability for brevity.

## Guidelines

- Prefer simple, direct implementations.
- Avoid unnecessary abstractions.
- Reuse existing utilities instead of writing custom logic.
- Remove duplication and dead code immediately.
- Simplify control flow when it improves understanding.
- Refactor continuously, but never at the cost of correctness.

The goal is not fewer lines - the goal is less unnecessary complexity.

## Resource efficiency

- No skill or agent should be loaded every time. Only load them when genuinely necessary.
- Language-specific skills and agents are dispatched conditionally - only when the project language is detected and the task benefits from specialization.
- Generic agents handle most work. Specialized agents are for cases where domain knowledge materially improves the output.
- Skill descriptions must be specific enough to avoid false-positive auto-triggers.
