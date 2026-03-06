---
name: typescript-expert
description: "TypeScript/JavaScript conventions and best practices. Load only when actively writing, reviewing, or debugging TS/JS code and domain-specific guidance would materially help. Not needed for simple edits or non-code tasks."
---

# TypeScript/JavaScript best practices

Reference knowledge for writing idiomatic TypeScript/JavaScript applications (React frontend, Node.js backend). This skill provides reference knowledge for the specialized TS agents (`asd-ts-reviewer`, `asd-ts-investigator`) and the consolidated `asd-plan-writer` (which handles TS/JS conventions when language is detected as TypeScript).

## Specialist referral

If the issue requires ultra-specific expertise, recommend switching:
- Deep webpack/vite/rollup bundler internals - bundler specialist
- Complex ESM/CJS migration or circular dependency analysis - module system specialist
- Type performance profiling or compiler internals - type system specialist

## Project setup

- Detect tooling from `package.json` devDependencies before making assumptions
- Match existing import style (absolute vs relative, path aliases)
- Respect `baseUrl`/`paths` configuration in `tsconfig.json`
- In monorepos, consider project references before broad tsconfig changes
- Check `"type"` field in `package.json` for ESM vs CJS

## Type safety

- Enable `strict: true` in tsconfig - never weaken it
- Use `unknown` over `any` - require narrowing before use
- Use `interface` for object shapes (better error messages), `type` for unions and computed types
- Use branded types for domain primitives (UserId, OrderId) to prevent mixing
- Use `satisfies` for constraint validation while preserving literal types
- Use `as const` assertions for literal inference
- Explicit return types on public/exported APIs
- Avoid type assertions (`as`) - use type guards or discriminated unions instead
- Use `never` type for exhaustive switch checks

## Error handling

- Use discriminated unions for result types (`{ success: true; data: T } | { success: false; error: E }`)
- Custom error classes with proper `Error.captureStackTrace`
- Unhandled promise rejections: always `.catch()` or try/catch on await
- Type-safe error boundaries in React components

## Module system

- Prefer ESM (`"type": "module"` in package.json)
- Use `"moduleResolution": "bundler"` for modern tools
- Named exports over default exports (better refactoring safety)
- Avoid barrel file re-exports that cause bundle bloat
- Watch for circular imports between modules
- TypeScript paths only work at compile time - ensure bundler/runtime handles resolution

## React patterns

- Business logic in hooks or services, not in components
- `useMemo`/`useCallback`/`React.memo` only for expensive computations
- Always include all dependencies in `useEffect`/`useMemo`/`useCallback` arrays
- Clean up effects properly (return cleanup function)
- Avoid stale closures - watch for captured state in async operations inside effects
- Lazy loading for routes and heavy components
- Virtualize large lists
- Avoid prop drilling more than 2 levels - use context or state management

## Node.js patterns

- Never block the event loop with CPU-heavy sync operations
- Use connection pooling for database clients
- Limit concurrency on `Promise.all` for large arrays
- Clean up streams, event listeners, and timers to prevent memory leaks
- Parameterized queries - never concatenate user input into SQL/NoSQL queries
- Rate limit authentication endpoints

## Testing

- Detect test runner from `package.json`: Jest (`jest.mock()`) or Vitest (`vi.mock()`)
- React Testing Library for component tests (`render`, `screen`, `userEvent`)
- Supertest for API endpoint tests
- Test behavior, not implementation details
- Run commands: `npm test -- --testPathPattern=filename` or `npx vitest run filename`

## Performance

- `skipLibCheck: true` and `incremental: true` in tsconfig for faster builds
- Avoid importing entire libraries - use specific module imports
- Split large union types (>100 members) and limit type recursion depth
- Use `interface extends` instead of type intersections for complex object types
- For monorepos: use project references with `composite: true`

## Security

- No `eval()`, `Function()`, or dynamic `import()` with user-controlled strings
- No `dangerouslySetInnerHTML` or `innerHTML` with unescaped user input
- Validate prototype pollution risks from object spread with untrusted input
- No secrets in client-side code or committed `.env` files
- Configure CORS explicitly - no wildcard origin with credentials

## Diagnostics

When investigating type errors, `any` proliferation, or unfamiliar TS project setup, run `python3 skills/typescript-expert/scripts/ts_diagnostic.py` from the project root. Reports versions, tsconfig analysis, tooling detection, type errors, and `any` usage.

## References

Read these files only when the task benefits from them - do not load all of them by default.

- **Setting up or reviewing tsconfig:** Read `skills/typescript-expert/references/tsconfig-strict.json` for recommended strict TypeScript 5.x configuration
- **Writing complex types, generics, or type guards:** Read `skills/typescript-expert/references/typescript-cheatsheet.md` for quick syntax reference
- **Implementing branded types, Result/Option patterns, or deep utility types:** Read `skills/typescript-expert/references/utility-types.ts` for copy-ready implementations
