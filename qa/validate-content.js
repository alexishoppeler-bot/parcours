'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'js', 'data');
const files = fs.readdirSync(dataDir).filter(file => file.endsWith('-data.js')).sort();
const sandbox = { window: {} };
vm.createContext(sandbox);

const issues = [];
const broken = /A[©¨ª´¹¢‰€§®]|a[€™”“¦]|ðY|�/;
const allowedDifficulties = new Set(['easy', 'medium', 'hard']);

function add(file, severity, code, location, detail) {
  issues.push({ file, severity, code, location, detail: detail || '' });
}

function walk(value, file, location) {
  if (typeof value === 'string') {
    if (broken.test(value)) add(file, 'error', 'BROKEN_ENCODING', location, value.slice(0, 100));
    if (value.length > 240) add(file, 'warning', 'LONG_TEXT', location, String(value.length));
    return;
  }
  if (Array.isArray(value)) return value.forEach((item, index) => walk(item, file, `${location}[${index}]`));
  if (value && typeof value === 'object') Object.keys(value).forEach(key => walk(value[key], file, `${location}.${key}`));
}

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  try { vm.runInContext(fs.readFileSync(fullPath, 'utf8'), sandbox, { filename: file }); }
  catch (error) { add(file, 'error', 'INVALID_JAVASCRIPT', '$', error.message); }
}

for (const [name, data] of Object.entries(sandbox.window)) {
  const file = files.find(candidate => name.toLowerCase().replaceAll('_', '-').includes(candidate.replace('-data.js', '').replace('mots-', 'mots-'))) || name;
  if (!Array.isArray(data) || !data.length) { add(file, 'error', 'EMPTY_DATASET', '$'); continue; }
  const seen = new Set();
  data.forEach((item, index) => {
    if (!item || typeof item !== 'object') add(file, 'error', 'INVALID_ITEM', `$[${index}]`);
    const signature = JSON.stringify(item);
    if (seen.has(signature)) add(file, 'warning', 'DUPLICATE', `$[${index}]`);
    seen.add(signature);
    if (item && item.difficulty && !allowedDifficulties.has(item.difficulty)) add(file, 'warning', 'UNKNOWN_DIFFICULTY', `$[${index}].difficulty`, item.difficulty);
  });
  walk(data, file, '$');
}

const report = {
  generatedAt: new Date().toISOString(),
  files: files.length,
  datasets: Object.keys(sandbox.window).length,
  valid: !issues.some(issue => issue.severity === 'error'),
  totals: {
    errors: issues.filter(issue => issue.severity === 'error').length,
    warnings: issues.filter(issue => issue.severity === 'warning').length
  },
  issues
};

const reportPath = path.join(__dirname, 'content-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log(`Content QA: ${report.datasets} datasets, ${report.totals.errors} errors, ${report.totals.warnings} warnings.`);
console.log(`Report: ${reportPath}`);
process.exitCode = report.valid ? 0 : 1;
