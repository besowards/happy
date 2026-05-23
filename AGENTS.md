# Agent Workflow

## Installation Role

This checkout is Brian's canonical source-backed Happy installation:

`/Users/briandtr/happy-main`

The global `happy` command should resolve through:

`/Users/briandtr/happy-main/packages/happy-cli`

The active production Happy daemon should run from:

`/Users/briandtr/happy-main/packages/happy-cli/dist/index.mjs`

There should not be a second active Happy checkout under `/Users/briandtr/happy`, `/Users/briandtr/archive/happy-coder-legacy-*`, or `/Users/briandtr/Documents/codex/project/happy-dev`. If one appears, treat it as noncanonical until Brian explicitly asks to create a separate development checkout.

## Version Role

When Brian asks to upgrade Happy, use the highest numbered Happy CLI version available for this local source-backed install. Do not downgrade to npm dist-tags when they are lower than the current local numbered version.

Current canonical local version: `1.3.1-3`.

## Sync To Main

When the user says `sync to main` or `synt to main`, they mean:

1. Fetch `origin/main`.
2. Rebase the current branch on `origin/main`.
3. Push the current HEAD directly to `main` with a normal push, for example:
   `git push origin HEAD:main`

Do not force push for this workflow.
