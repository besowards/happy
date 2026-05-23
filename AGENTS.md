# Agent Workflow

## Installation Role

This checkout is Brian's Happy development and experimentation worktree:

`/Users/briandtr/Documents/codex/project/happy-dev/source/happy`

Do not treat this checkout as the active Happy installation. Do not link the global `happy` command to this checkout, and do not run the production Happy daemon from it unless Brian explicitly asks for a development test.

Brian's canonical source-backed Happy installation is:

`/Users/briandtr/happy-main`

The active production Happy daemon should run from:

`/Users/briandtr/happy-main/packages/happy-cli/dist/index.mjs`

## Sync To Main

When the user says `sync to main` or `synt to main`, they mean:

1. Fetch `origin/main`.
2. Rebase the current branch on `origin/main`.
3. Push the current HEAD directly to `main` with a normal push, for example:
   `git push origin HEAD:main`

Do not force push for this workflow.
