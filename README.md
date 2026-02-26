# asd - Accelerated Software Development

Enterprise workflow plugin for coding agents with structured planning, execution checkpoints, and knowledge capture.

## Components

| Component | Count |
|-----------|-------|
| Commands | 9 |
| Skills | 9 |
| Templates | 4 |

## Commands

| Command | Description |
|---------|-------------|
| `/asd:brainstorm` | Explore ideas before planning |
| `/asd:plan` | Create implementation plans with validation |
| `/asd:technical_review` | Get expert feedback on plans |
| `/asd:execute` | Execute plans with checkpoint verification |
| `/asd:review` | Multi-agent code review |
| `/asd:capture` | Document learnings for team knowledge |
| `/asd:fix` | Quick fix workflow - plan and fix in one command |
| `/asd:dogfood` | QA web app, find bugs and UX issues |
| `/asd:cleanup` | Archive old brainstorms and todos by month |

## Skills

| Skill | Description |
|-------|-------------|
| `brainstorming` | Explore user intent, propose approaches, capture design |
| `planning` | Transform ideas into structured, validated plans |
| `technical-review` | Get expert feedback on plans |
| `execution-checkpoints` | Execute with verifiable checkpoints |
| `test-driven-development` | RED-GREEN-REFACTOR cycle before code |
| `dogfood` | QA web app, find bugs and UX issues |
| `review` | Systematic code review with severity prioritization |
| `capture` | Document solved problems for knowledge compounding |
| `milestone-tracker` | Track progress across plans and milestones |

## Workflow

```
/asd:brainstorm → /asd:plan → /asd:technical_review → /asd:execute → /asd:review → /asd:capture
```

## Installation

```bash
/plugin marketplace add viminizer/asd
/plugin install asd@viminizer/asd
```

## Directory Structure

```
asd/
├── commands/           # /asd:* commands
│   ├── brainstorm.md
│   ├── plan.md
│   ├── execute.md
│   ├── review.md
│   └── capture.md
├── skills/              # Automatic skills
│   ├── brainstorming/
│   ├── planning/
│   ├── execution-checkpoints/
│   ├── review/
│   ├── capture/
│   └── milestone-tracker/
└── templates/           # Document templates
    ├── plan.md
    ├── design.md
    ├── milestone.md
    └── solution.md
```

## Key Features

- **Plan Validation**: Mandatory checklist before executing plans
- **Execution Checkpoints**: Verify at each step, not just at the end
- **Knowledge Capture**: Document solutions for future reference
- **Milestone Tracking**: Visual progress across phases

## License

MIT
