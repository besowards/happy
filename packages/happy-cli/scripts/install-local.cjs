#!/usr/bin/env node

/**
 * Install this workspace as the global `happy` binary for local development.
 *
 * Steps:
 *   1. build
 *   2. stop any running daemon (ignores failure)
 *   3. npm link (replaces the globally-installed `happy` with a symlink to this workspace)
 *   4. start the daemon again
 *   5. verify by running `happy --version`
 *
 * Reuses ~/.happy/ — no separate dev home dir. Auth and sessions carry over.
 * To undo: `npm unlink -g happy && npm i -g happy@latest`.
 */

const { spawnSync } = require('child_process');
const path = require('path');

const PACKAGE_DIR = path.resolve(__dirname, '..');
const IS_WINDOWS = process.platform === 'win32';
const PATH_DELIMITER = IS_WINDOWS ? ';' : ':';

function withoutWorkspaceBin(envPath) {
    const workspaceBins = new Set([
        path.resolve(PACKAGE_DIR, 'node_modules', '.bin'),
        path.resolve(PACKAGE_DIR, '..', '..', 'node_modules', '.bin'),
    ]);
    return (envPath || '')
        .split(PATH_DELIMITER)
        .filter(Boolean)
        .filter((entry) => !workspaceBins.has(path.resolve(entry)))
        .join(PATH_DELIMITER);
}

function run(cmd, args, { allowFailure = false, scrubWorkspaceBin = false } = {}) {
    const label = [cmd, ...args].join(' ');
    console.log(`\n▶ ${label}`);
    const env = scrubWorkspaceBin
        ? { ...process.env, PATH: withoutWorkspaceBin(process.env.PATH) }
        : process.env;
    const result = spawnSync(cmd, args, {
        cwd: PACKAGE_DIR,
        stdio: 'inherit',
        env,
        // shell: true resolves `.cmd` shims on Windows so `pnpm` / `npm` / `happy` are found.
        shell: IS_WINDOWS,
    });
    if (result.error) {
        console.error(`Failed to spawn: ${label}`, result.error.message);
        if (!allowFailure) process.exit(1);
        return 1;
    }
    const status = result.status ?? 1;
    if (status !== 0 && !allowFailure) {
        console.error(`\nExit ${status}: ${label}`);
        process.exit(status);
    }
    return status;
}

run('pnpm', ['run', 'build']);
run('happy', ['daemon', 'stop'], { allowFailure: true });
run('npm', ['link']);
run('happy', ['daemon', 'start']);
run('happy', ['--version'], { scrubWorkspaceBin: true });

console.log(`\n✓ Installed from ${PACKAGE_DIR}`);
console.log('  To undo: npm unlink -g happy && npm i -g happy@latest');
