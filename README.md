# asd - Accelerated Software Development

Coding agents are fast but sloppy. They skip research, write untested code, miss edge cases, and forget what they learned. Without structure, you spend more time fixing their output than you saved.

asd fixes this by giving your agent a complete workflow - from brainstorming through implementation to knowledge capture. Every feature goes through research, planning, TDD, and two-stage code review. Dedicated subagents handle each task with fresh context, so nothing gets lost to context window pollution. Solutions are documented automatically so the same mistakes don't repeat.

## Installation

```bash
/plugin marketplace add viminizer/asd
/plugin install asd@viminizer/asd
```

## Components

| Component | Count |
|-----------|-------|
| Commands | 15 |
| Skills | 15 |
| Agents | 19 |
| Templates | 7 |

## Commands

| Command | Description |
|---------|-------------|
| `/asd:brainstorm` | Explore ideas before planning |
| `/asd:plan` | Create implementation plans with research and validation |
| `/asd:technical_review` | Review plans for quality, soundness, and feasibility |
| `/asd:execute` | Execute plans with asd-forge agents and two-stage reviews |
| `/asd:review` | Review code changes (diffs, PRs, branches) |
| `/asd:review_feature` | Review an existing feature's implementation end-to-end |
| `/asd:fix` | Fix bugs with root cause investigation and TDD |
| `/asd:capture` | Document solved problems for knowledge compounding |
| `/asd:dogfood` | QA a web app - find bugs and UX issues |
| `/asd:cleanup` | Archive completed plans and old reviews |
| `/asd:report_issue` | Report a bug, request a feature, or give feedback |
| `/asd:campaign_create` | Create a campaign to track a big change across multiple plans |
| `/asd:campaign_edit` | Add, remove, or reorder items in a campaign |
| `/asd:campaign_next` | Pick the next campaign item and create a plan for it |
| `/asd:campaign_status` | View progress of campaigns |

## Skills

| Skill | Description |
|-------|-------------|
| `brainstorming` | Explore user intent, propose approaches, transition to planning |
| `planning` | Transform ideas into validated plans with TDD tasks |
| `technical-review` | Check plan quality, technical soundness, implementation feasibility |
| `execution-checkpoints` | Dispatch asd-forge per task with two-stage review |
| `finishing-a-development-branch` | Present merge/PR/keep/discard options after execution |
| `test-driven-development` | RED-GREEN-REFACTOR cycle before writing code |
| `review` | Dispatch asd-code-reviewer on diffs and PRs |
| `review-feature` | Audit existing feature implementations end-to-end |
| `fix` | Root cause investigation, TDD fix, review cycle |
| `capture` | Document problems, root causes, and prevention strategies |
| `dogfood` | Systematic web app QA with agent-browser |
| `milestone-tracker` | Record milestone completions with git stats |
| `campaign-management` | Manage campaigns - create, edit, next, and status operations |
| `java-spring-boot` | Spring Boot conventions and best practices |
| `typescript-expert` | TypeScript/JavaScript conventions and best practices |

## Agents

| Agent | Description |
|-------|-------------|
| `asd-code-reviewer` | Review code for security, performance, architecture, database, and quality |
| `asd-repo-researcher` | Research codebase patterns, conventions, and structure |
| `asd-learnings-researcher` | Search past solutions for relevant institutional knowledge |
| `asd-docs-researcher` | Search external documentation and best practices for planning context |
| `asd-forge` | Implement a single plan task using TDD - write tests, code, and commit |
| `asd-diff-analyzer` | Pre-filter diffs to determine which review passes are needed (haiku) |
| `asd-file-scoper` | Find all files related to a feature for review scope (haiku) |
| `asd-test-runner` | Run tests and return concise pass/fail summary (haiku) |
| `asd-plan-validator` | Validate plan structure, task ordering, and feasibility (haiku) |
| `asd-plan-writer` | Write implementation plans from research context |
| `asd-approach-proposer` | Propose 2-3 implementation approaches with trade-offs |
| `asd-investigator` | Deep root cause investigation for bug fixes |
| `asd-campaign-researcher` | Parallel codebase exploration for campaign creation |
| `asd-java-plan-writer` | Java/Spring-specialized plan writer |
| `asd-java-reviewer` | Java/Spring-specialized code reviewer |
| `asd-java-investigator` | Java/Spring-specialized root cause investigator |
| `asd-ts-plan-writer` | TypeScript/JavaScript-specialized plan writer |
| `asd-ts-reviewer` | TypeScript/JavaScript-specialized code reviewer |
| `asd-ts-investigator` | TypeScript/JavaScript-specialized root cause investigator |

## Workflow

```
/asd:brainstorm → /asd:plan → /asd:technical_review → /asd:execute → /asd:capture
```

For big changes spanning multiple plans:
```
/asd:campaign_create → /asd:campaign_next → (plan → execute loop) → /asd:campaign_status
```

Side workflows:
- `/asd:fix` - Bug fix cycle (investigate → TDD fix → review → commit)
- `/asd:review_feature` - Audit an existing feature's implementation
- `/asd:dogfood` - QA a web application
- `/asd:cleanup` - Archive completed work

## Directory structure

```
asd/
├── .claude-plugin/       # Plugin metadata
├── agents/               # 19 specialized agents
│   ├── asd-approach-proposer.md
│   ├── asd-campaign-researcher.md
│   ├── asd-code-reviewer.md
│   ├── asd-diff-analyzer.md
│   ├── asd-docs-researcher.md
│   ├── asd-file-scoper.md
│   ├── asd-forge.md
│   ├── asd-investigator.md
│   ├── asd-java-investigator.md
│   ├── asd-java-plan-writer.md
│   ├── asd-java-reviewer.md
│   ├── asd-learnings-researcher.md
│   ├── asd-plan-validator.md
│   ├── asd-plan-writer.md
│   ├── asd-repo-researcher.md
│   ├── asd-test-runner.md
│   ├── asd-ts-investigator.md
│   ├── asd-ts-plan-writer.md
│   └── asd-ts-reviewer.md
├── commands/             # 15 /asd:* commands
│   ├── brainstorm.md
│   ├── campaign_create.md
│   ├── campaign_edit.md
│   ├── campaign_next.md
│   ├── campaign_status.md
│   ├── capture.md
│   ├── cleanup.md
│   ├── dogfood.md
│   ├── execute.md
│   ├── fix.md
│   ├── plan.md
│   ├── report_issue.md
│   ├── review.md
│   ├── review_feature.md
│   └── technical_review.md
├── skills/               # 15 automatic skills
│   ├── brainstorming/
│   ├── campaign-management/
│   ├── capture/
│   ├── dogfood/
│   ├── execution-checkpoints/
│   ├── finishing-a-development-branch/
│   ├── fix/
│   ├── java-spring-boot/
│   ├── milestone-tracker/
│   ├── planning/
│   ├── review/
│   ├── review-feature/
│   ├── technical-review/
│   ├── test-driven-development/
│   └── typescript-expert/
├── templates/            # 7 document templates
│   ├── campaign.md
│   ├── code-quality-review.md
│   ├── milestone.md
│   ├── plan.md
│   ├── review.md
│   ├── solution.md
│   └── spec-compliance-review.md
├── CLAUDE.md             # Code simplicity principle
└── README.md
```

## License

MIT
