---
name: asd:cleanup
description: "Archive old brainstorms and todos by merging into monthly files."
---

# /asd:cleanup

Archive old brainstorms and todos into monthly files.

## What It Does

1. **Archive brainstorms** - `docs/brainstorms/*.md` → `docs/archives/brainstorms/YYYY-MM.md`
2. **Archive todos** - `todos/*.md` → `docs/archives/todos/YYYY-MM.md`

**Does NOT archive:**
- Plans in `docs/asd/plans/` - kept as-is

## Rules

- Archives by **current month** (e.g., 2026-02)
- If archive file exists for current month → **append** to it
- If new month → **create** new file
- Separator: `---` between entries

## Process

### 1. Archive Brainstorms

```bash
# Get current month
MONTH=$(date +%Y-%m)

# Create archive dir
mkdir -p docs/archives/brainstorms

# Check if archive exists for this month
if [ -f "docs/archives/brainstorms/${MONTH}.md" ]; then
    # Append new entries
    for file in docs/brainstorms/*.md; do
        echo "---" >> "docs/archives/brainstorms/${MONTH}.md"
        echo "<!-- Source: $(basename $file) -->" >> "docs/archives/brainstorms/${MONTH}.md"
        cat "$file" >> "docs/archives/brainstorms/${MONTH}.md"
        rm "$file"
    done
else
    # Create new archive
    for file in docs/brainstorms/*.md; do
        echo "---" >> "docs/archives/brainstorms/${MONTH}.md"
        echo "<!-- Source: $(basename $file) -->" >> "docs/archives/brainstorms/${MONTH}.md"
        cat "$file" >> "docs/archives/brainstorms/${MONTH}.md"
        rm "$file"
    done
fi
```

### 2. Archive Todos

Same logic for `todos/` → `docs/archives/todos/`

## Output

```
docs/archives/
├── brainstorms/
│   └── 2026-02.md    # All Feb brainstorms merged
└── todos/
    └── 2026-02.md    # All Feb todos merged
```

## Usage

```
/asd:cleanup
```

Run when you want to clean up old brainstorms and todos.
