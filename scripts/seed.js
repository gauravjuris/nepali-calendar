#!/usr/bin/env node
// Seed script — run once to create data/today.json before first Actions run
const { execSync } = require('child_process');
execSync('node scripts/update-today.js', { stdio: 'inherit' });
