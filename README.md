# asd - Accelerated Software Development

Enterprise workflow plugin for coding agents with structured planning, execution checkpoints, and knowledge capture.

## Components

| Component | Count |
|-----------|-------|
| Commands | 5 |
| Skills | 6 |
| Templates | 4 |

## Commands

| Command | Description |
|---------|-------------|
| `/asd:brainstorm` | Explore ideas before planning |
| `/asd:plan` | Create implementation plans with validation |
| `/asd:execute` | Execute plans with checkpoint verification |
| `/asd:review` | Multi-agent code review |
| `/asd:capture` | Document learnings for team knowledge |

## Skills

| Skill | Description |
|-------|-------------|
| `brainstorming` | Explore user intent, propose approaches, capture design |
| `planning` | Transform ideas into structured, validated plans |
| `execution-checkpoints` | Execute with verifiable checkpoints |
| `review` | Systematic code review with severity prioritization |
| `capture` | Document solved problems for knowledge compounding |
| `milestone-tracker` | Track progress across plans and milestones |

## Workflow

```
/asd:brainstorm → /asd:plan → /asd:execute → /asd:review → /asd:capture
```

## Installation

```bash
/plugin marketplace add <your-github-username>/asd
/plugin install asd@<your-github-username>/asd
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
