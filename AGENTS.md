<!-- myco:agent-awareness -->

## Agent awareness

- Session start / any work discussion: run `myco status --prompt`
  before proposing next steps — know the board first.
- User describes new work → offer to capture it (`myco todo add`,
  `issue new`, `proposal new`). Don't wait to be asked.
- Picking up a task: `myco resume <ID>` is the briefing.
- Wrapping up: `myco handoff <ID>` anything resumable; keep statuses
  honest (claimed → in-progress → blocked/done).

<!-- /myco:agent-awareness -->

<!-- sturn:agent-awareness -->

## Sturn awareness

- **No PRs.** The pushed branch/commit is the deliverable; review
  streams continuously (sturn WAL), merge is a human/sturn call.
- sturn-wired repo (`sturn.toml` present): `sturn claim "<glob>"
  --ws <ws>` *before* edits — claims surface conflicts in ms.
- Ops via `sturn write|rename|delete`; `sturn snap` folds the ws
  into a real commit; `sturn push` publishes heads + refs/sturn/*.
- `sturn leave` on exit — drops the actor's claims.

<!-- /sturn:agent-awareness -->

# 9aia.github.io — agent/dev map

Gaia's website — a VitePress site whose content lives at the repo
root (this is the site itself, not a repo with a `docs/` worktree).

## Layout

| Path | Role |
| --- | --- |
| `index.md`, `about.md`, `todo.md` | root content pages |
| `projects/*.md` | project pages — frontmatter feeds the VitePress content loader for the projects index |
| `components/` | Vue components (`PageSection`, `Projects`, `ProjectsItem`) |
| `.vitepress/` | site config (`config.mts`), custom theme, UnoCSS/SCSS wiring |
| `public/` | static assets (`CNAME` → 9aia.com) |
| `project/` | myco ledger worktree (orphan branch — never hand-edit; myco verbs are the write path) |

## Commands

```bash
bun install
bun run dev          # vitepress dev --port 13101
bun run build        # vitepress build → dist/
bun run preview      # preview the production build
bun run docs:deploy  # build + gh-pages deploy (9aia.com)
```

## Rules

- English everywhere; conventional commits.
- `project/` files are written by myco verbs only.
- This repo *is* the VitePress site — content/config at root,
  `.vitepress/` for theme wiring; `cypera.toml` exempts the
  docs-site contract rules (no separate docs worktree by design).

## Boundary

Owns the public website only. Org repos keep their own docs sites;
the shared look lives in `vitepress-theme-9aia` /
`slidev-theme-9aia`.
