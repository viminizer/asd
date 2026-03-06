# TypeScript/JavaScript conventions

## Project files to read (if not already in research summary)
- `tsconfig.json` (if needed for module resolution or strictness)
- One existing test file (to match test patterns)

## Tests
- Detect runner from `package.json` devDependencies. Jest: `jest.mock()`. Vitest: `vi.mock()`.
- React Testing Library for components. Supertest for APIs.
- Run: `npm test -- --testPathPattern=filename` or equivalent from `package.json` scripts.
- Don't write tests that only verify types at compile time - tests must have meaningful runtime assertions.

## Style
- Proper types (no `any` unless justified). Named exports. Async/await.
- ESM/CJS determined by `"type"` field in package.json.

## Frontend
- Component + test together. Route registration. Match project state management.

## Backend
- Route + handler + validation + test. Migration files for DB changes.

## Dependencies
- `npm install <package>` as first step for new packages.
