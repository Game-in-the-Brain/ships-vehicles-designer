#!/usr/bin/env node
/**
 * Bump version by 0.01 and sync to package.json + repo description
 *
 * Usage:
 *   node scripts/bump-version.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VERSION_FILE = path.resolve('VERSION');
const PKG_FILE = path.resolve('package.json');
const BRC_FORGEJO = '/run/host/home/justin/opencode260220/agent260222/.brc/forgejo';

function readForgejoCreds() {
  const lines = fs.readFileSync(BRC_FORGEJO, 'utf8').split('\n');
  const creds = {};
  for (const line of lines) {
    const m = line.match(/^#\s*(\w+):\s*(.+)$/);
    if (m) creds[m[1]] = m[2].trim();
  }
  return creds;
}

// Read current version
let version = parseFloat(fs.readFileSync(VERSION_FILE, 'utf8').trim());
version = Math.round((version + 0.01) * 100) / 100;
const versionStr = version.toFixed(2);

// Write VERSION
fs.writeFileSync(VERSION_FILE, versionStr + '\n');
console.log(`VERSION bumped to ${versionStr}`);

// Sync package.json
const pkg = JSON.parse(fs.readFileSync(PKG_FILE, 'utf8'));
pkg.version = versionStr;
fs.writeFileSync(PKG_FILE, JSON.stringify(pkg, null, 2) + '\n');
console.log(`package.json synced to ${versionStr}`);

// Sync src/version.ts
const VERSION_TS = path.resolve('src', 'version.ts');
fs.writeFileSync(VERSION_TS, `export const VERSION = '${versionStr}';\n`);
console.log(`src/version.ts synced to ${versionStr}`);

// Update repo description via Forgejo API
try {
  const { url, token } = readForgejoCreds();
  const repoUrl = `${url}/api/v1/repos/gi7b/ships-vehicles-designer`;
  const desc = `Mneme Ship & Vehicle Designer v${versionStr} — Mass-based, delta-V-centric spacecraft construction framework`;

  execSync(`curl -s -X PATCH \
    -H "Authorization: token ${token}" \
    -H "Content-Type: application/json" \
    -d '${JSON.stringify({ description: desc })}' \
    "${repoUrl}"`, { stdio: 'inherit' });
  console.log(`Forgejo repo description updated to v${versionStr}`);
} catch (err) {
  console.warn('Could not update Forgejo description:', err.message);
}
