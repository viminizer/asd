# asd - Accelerated Software Development

Workflow plugin for coding agents with structured planning, subagent-driven execution, automated code review, and knowledge capture.

## Components

| Component | Count |
|-----------|-------|
| Commands | 10 |
| Skills | 12 |
| Agents | 7 |
| Templates | 4 |

## Commands

| Command | Description |
|---------|-------------|
| `/asd:brainstorm` | Explore ideas before planning |
| `/asd:plan` | Create implementation plans with research and validation |
| `/asd:technical_review` | Review plans for quality, soundness, and feasibility |
| `/asd:execute` | Execute plans with subagent-driven development and review loops |
| `/asd:review` | Review code changes (diffs, PRs, branches) |
| `/asd:review_feature` | Review an existing feature's implementation end-to-end |
| `/asd:fix` | Fix bugs with root cause investigation and TDD |
| `/asd:capture` | Document solved problems for knowledge compounding |
| `/asd:dogfood` | QA a web app - find bugs and UX issues |
| `/asd:cleanup` | Archive completed plans and old reviews |

## Skills

| Skill | Description |
|-------|-------------|
| `brainstorming` | Explore user intent, propose approaches, transition to planning |
| `planning` | Transform ideas into validated plans with TDD tasks |
| `technical-review` | Check plan quality, technical soundness, implementation feasibility |
| `execution-checkpoints` | Subagent-driven execution with two-stage review loops |
| `finishing-a-development-branch` | Present merge/PR/keep/discard options after execution |
| `test-driven-development` | RED-GREEN-REFACTOR cycle before writing code |
| `review` | Dispatch asd-code-reviewer on diffs and PRs |
| `review-feature` | Audit existing feature implementations end-to-end |
| `fix` | Root cause investigation, TDD fix, review cycle |
| `capture` | Document problems, root causes, and prevention strategies |
| `dogfood` | Systematic web app QA with agent-browser |
| `milestone-tracker` | Record milestone completions with git stats |

## Agents

| Agent | Description |
|-------|-------------|
| `asd-code-reviewer` | Review code for security, performance, architecture, database, and quality |
| `asd-repo-researcher` | Research codebase patterns, conventions, and structure |
| `asd-learnings-researcher` | Search past solutions for relevant institutional knowledge |
| `asd-diff-analyzer` | Pre-filter diffs to determine which review passes are needed (haiku) |
| `asd-file-scoper` | Find all files related to a feature for review scope (haiku) |
| `asd-test-runner` | Run tests and return concise pass/fail summary (haiku) |
| `asd-plan-validator` | Validate plan structure, task ordering, and feasibility (haiku) |

## Workflow

```
/asd:brainstorm → /asd:plan → /asd:technical_review → /asd:execute → /asd:review → /asd:capture
```

Side workflows:
- `/asd:fix` - Bug fix cycle (investigate → TDD fix → review → commit)
- `/asd:review_feature` - Audit an existing feature's implementation
- `/asd:dogfood` - QA a web application
- `/asd:cleanup` - Archive completed work

## Installation

```bash
/plugin marketplace add viminizer/asd
/plugin install asd@viminizer/asd
```

## Directory structure

```
asd/
├── .claude-plugin/       # Plugin metadata
├── agents/               # Specialized agents
│   ├── asd-code-reviewer.md
│   ├── asd-repo-researcher.md
│   ├── asd-learnings-researcher.md
│   ├── asd-diff-analyzer.md
│   ├── asd-file-scoper.md
│   ├── asd-test-runner.md
│   └── asd-plan-validator.md
├── commands/             # /asd:* commands
│   ├── brainstorm.md
│   ├── plan.md
│   ├── technical_review.md
│   ├── execute.md
│   ├── review.md
│   ├── review_feature.md
│   ├── fix.md
│   ├── capture.md
│   ├── dogfood.md
│   └── cleanup.md
├── skills/               # Automatic skills
│   ├── brainstorming/
│   ├── planning/
│   ├── technical-review/
│   ├── execution-checkpoints/
│   ├── finishing-a-development-branch/
│   ├── test-driven-development/
│   ├── review/
│   ├── review-feature/
│   ├── fix/
│   ├── capture/
│   ├── dogfood/
│   └── milestone-tracker/
├── templates/            # Document templates
│   ├── plan.md
│   ├── review.md
│   ├── milestone.md
│   └── solution.md
├── CLAUDE.md             # Code simplicity principle
└── README.md
```

## License

MIT
