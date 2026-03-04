---
name: asd:cleanup
description: "Archive completed plans and old reviews into monthly files."
---

# /asd:cleanup

Archive completed work into monthly files. Solutions are permanent knowledge and are never archived.

## What it does

1. **Archive completed plans** - `docs/asd/plans/` with `status: complete` → `docs/asd/archives/plans/YYYY-MM.md`
2. **Archive old reviews** - `docs/asd/reviews/` older than 30 days → `docs/asd/archives/reviews/YYYY-MM.md`

**Never archives:**
- `docs/asd/solutions/` - Permanent knowledge base

## Rules

- Group by month based on the document's date (from frontmatter)
- If archive file exists for that month, append with `---` separator
- If new month, create new file
- Delete originals after successful archive
- Confirm with user before deleting anything

## Process

1. Scan `docs/asd/plans/` for files with `status: complete` in frontmatter
2. Scan `docs/asd/reviews/` for files older than 30 days
3. Show what will be archived and ask for confirmation
4. Create archive directories: `mkdir -p docs/asd/archives/plans docs/asd/archives/reviews`
5. Append each file to the appropriate monthly archive
6. Delete originals
7. Report what was archived

## Output

```
docs/asd/archives/
├── plans/
│   └── 2026-02.md
└── reviews/
    └── 2026-02.md
```
