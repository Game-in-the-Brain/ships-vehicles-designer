#!/usr/bin/env node
/**
 * Deploy dist/ to Forgejo Pages (static-pages branch)
 *
 * CRITICAL: Forgejo raw API serves ALL files as text/plain.
 * Browsers block external .css/.js files (nosniff).
 * This script builds, inlines CSS/JS, then pushes to static-pages.
 *
 * Usage:
 *   node scripts/deploy.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const BRANCH = 'static-pages';
const REMOTE_NAME = 'origin';
const REMOTE_URL = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();

function run(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  return execSync(cmd, { encoding: 'utf-8', ...opts });
}

// 1. Build
console.log('\n📦 Step 1: Build');
run('npm run build');

// Verify dist exists
if (!fs.existsSync(DIST)) {
  console.error('Error: dist/ does not exist after build.');
  process.exit(1);
}
if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('Error: dist/index.html is missing.');
  process.exit(1);
}

// 2. Inline CSS/JS (CRITICAL for Forgejo Pages)
console.log('\n📝 Step 2: Inline CSS/JS');
run('python3 scripts/inline-build.py');

// Verify no external asset references remain
const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
if (html.includes('assets/')) {
  console.error('❌ ERROR: index.html still references assets/ after inlining');
  process.exit(1);
}
if (html.includes('registerSW.js') && html.includes('src=')) {
  console.error('❌ ERROR: registerSW.js is still external');
  process.exit(1);
}
console.log('✅ All assets inlined');

// 3. Deploy to static-pages branch
console.log('\n🚀 Step 3: Deploy to static-pages');
const tmpDir = run('mktemp -d').trim();
console.log(`Using temp dir: ${tmpDir}`);

try {
  // Try to clone existing static-pages branch; fall back to init
  try {
    run(`git clone --single-branch --branch ${BRANCH} --depth 1 ${REMOTE_URL} ${tmpDir}`);
  } catch {
    console.log(`Branch ${BRANCH} not found on remote, creating fresh...`);
    run(`git init ${tmpDir}`);
    run(`cd ${tmpDir} && git remote add origin ${REMOTE_URL}`);
    run(`cd ${tmpDir} && git checkout -b ${BRANCH}`);
  }

  // Clear old contents except .git
  const entries = fs.readdirSync(tmpDir);
  for (const entry of entries) {
    if (entry === '.git') continue;
    fs.rmSync(path.join(tmpDir, entry), { recursive: true, force: true });
  }

  // Copy dist contents (skip assets/ if any remain)
  for (const entry of fs.readdirSync(DIST)) {
    if (entry === 'assets') {
      console.warn(`⚠️  Skipping ${entry}/ (should have been removed by inline-build.py)`);
      continue;
    }
    fs.cpSync(path.join(DIST, entry), path.join(tmpDir, entry), { recursive: true });
  }

  // Commit and push
  run(`cd ${tmpDir} && git add -A`);
  try {
    run(`cd ${tmpDir} && git commit -m "Deploy $(date -u +%Y-%m-%d_%H:%M:%S)"`);
  } catch {
    console.log('Nothing to commit (no changes).');
  }
  run(`cd ${tmpDir} && git push -u ${REMOTE_NAME} ${BRANCH}`);

  console.log('\n✅ Deployed to Forgejo Pages!');
  console.log(`   URL: https://pages.gi7b.org/gi7b/ships-vehicles-designer/`);
} catch (err) {
  console.error('\n❌ Deploy failed:', err.message || err);
  process.exit(1);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
