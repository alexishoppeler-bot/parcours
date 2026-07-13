'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE = path.join(ROOT, 'content', 'pack-cecrl-base.json');

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function main() {
  const sourcePath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SOURCE;
  const targetName = process.argv[3];
  if (!targetName) {
    throw new Error('Usage: node qa/clone-content-pack.js <source-pack> <nouveau-nom>');
  }
  const pack = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const slug = slugify(targetName);
  pack.meta = Object.assign({}, pack.meta, {
    id: slug,
    name: targetName,
    clonedFrom: path.basename(sourcePath),
    generatedAt: new Date().toISOString()
  });
  const targetPath = path.join(ROOT, 'content', 'pack-' + slug + '.json');
  fs.writeFileSync(targetPath, JSON.stringify(pack, null, 2) + '\n', 'utf8');
  console.log('Pack clone vers ' + targetPath);
}

main();
