#!/usr/bin/env node
/**
 * Generate SHA-256 hashes for access gate passphrases.
 *
 * Usage:
 *   node scripts/generate-hashes.mjs "passphrase1" "passphrase2" ...
 *
 * The script applies the same normalisation used by the client:
 *   - lowercased
 *   - "Hi, " prefix removed
 *   - trailing punctuation (!?.) stripped
 *   - trimmed
 *
 * Paste the output array into src/components/AccessGate.jsx → VALID_HASHES.
 */

import { createHash } from 'node:crypto';

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/^hi,\s*/i, '')
    .replace(/[!?.]+$/g, '')
    .trim();
}

function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/generate-hashes.mjs "phrase1" "phrase2" ...');
  process.exit(1);
}

console.log('\n// Paste into VALID_HASHES in AccessGate.jsx:\nconst VALID_HASHES = [');
for (const raw of args) {
  const normalized = normalize(raw);
  const hash = sha256(normalized);
  console.log(`  '${hash}', // "${raw}" → "${normalized}"`);
}
console.log('];\n');
