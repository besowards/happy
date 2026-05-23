# Agent Workflow

## Installation Role

This checkout is Brian's canonical source-backed Happy installation:

`/Users/briandtr/happy-main`

The global `happy` command should resolve through:

`/Users/briandtr/happy-main/packages/happy-cli`

The active production Happy daemon should run from:

`/Users/briandtr/happy-main/packages/happy-cli/dist/index.mjs`

Do not use `/Users/briandtr/Documents/codex/project/happy-dev/source/happy` as the active Happy installation. That path is a development and experimentation worktree only.

## Sync To Main

When the user says `sync to main` or `synt to main`, they mean:

1. Fetch `origin/main`.
2. Rebase the current branch on `origin/main`.
3. Push the current HEAD directly to `main` with a normal push, for example:
   `git push origin HEAD:main`

Do not force push for this workflow.
