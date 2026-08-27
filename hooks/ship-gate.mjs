#!/usr/bin/env node
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

if (!fs.existsSync('package.json')) {
  console.log('No package.json in current directory; ship gate skipped.');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = pkg.scripts || {};
const candidates = ['typecheck', 'lint', 'test', 'build'];
let failed = false;

for (const name of candidates) {
  if (!scripts[name]) continue;
  console.log(`\n> npm run ${name}`);
  const result = spawnSync('npm', ['run', name], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) {
    failed = true;
    break;
  }
}

if (failed) process.exit(1);
console.log('\nDeterministic ship checks passed. Functional/browser verification is still required for POC_READY.');
