'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'js', 'data');
const OUTPUT_DIR = path.join(ROOT, 'content');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'pack-cecrl-base.json');

const DATASET_FILES = {
  ALPHABET_DATA: 'alphabet-data.js',
  ANAGRAMME_DATA: 'anagramme-data.js',
  APPARIER_DATA: 'apparier-data.js',
  CHERCHE_CLIQUE_DATA: 'cherche-clique-data.js',
  CLASSEMENT_DATA: 'classement-data.js',
  DEMELER_DATA: 'demeler-data.js',
  MOTS_CROISES_DATA: 'mots-croises-data.js',
  MOTS_MELES_DATA: 'mots-meles-data.js',
  PAIRE_DATA: 'paire-data.js',
  PENDU_DATA: 'pendu-data.js',
  QUIZ_DATA: 'quiz-data.js',
  VRAI_FAUX_DATA: 'vrai-faux-data.js'
};

function loadDataset(filename, globalName) {
  const fullPath = path.join(DATA_DIR, filename);
  const code = fs.readFileSync(fullPath, 'utf8');
  const sandbox = { window: {}, console };
  sandbox.global = sandbox;
  vm.runInNewContext(code, sandbox, { filename: fullPath });
  return sandbox.window[globalName];
}

function loadExerciseConfig() {
  const fullPath = path.join(ROOT, 'js', 'exercises-config.js');
  const code = fs.readFileSync(fullPath, 'utf8');
  const sandbox = { window: {}, console };
  sandbox.global = sandbox;
  vm.runInNewContext(code, sandbox, { filename: fullPath });
  const config = sandbox.window.EXERCISE_CONFIG || {};
  const meta = config.meta || {};
  const xpRules = (config.xpRules && config.xpRules.byPage) || {};
  return Object.keys(meta).map((page) => ({
    page,
    name: meta[page].name,
    icon: meta[page].icon,
    level: (meta[page].themes || []).find((item) => /a\d|b\d/i.test(item)) ? ((meta[page].themes || []).find((item) => /a\d|b\d/i.test(item))).toUpperCase() : 'A2',
    summary: meta[page].details && meta[page].details.summary ? meta[page].details.summary : '',
    xpRule: typeof xpRules[page] === 'string' ? xpRules[page] : ''
  }));
}

function loadProfiles() {
  const fullPath = path.join(ROOT, 'js', 'automation.js');
  const code = fs.readFileSync(fullPath, 'utf8');
  const start = code.indexOf('const CEFR_PROFILES = ');
  const end = code.indexOf(';\n  const DATASETS =', start);
  if (start < 0 || end < 0) throw new Error('Impossible de trouver CEFR_PROFILES dans js/automation.js');
  const objectSource = code.slice(start + 'const CEFR_PROFILES = '.length, end);
  return vm.runInNewContext('(' + objectSource + ')');
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const datasets = {};
  for (const [globalName, filename] of Object.entries(DATASET_FILES)) {
    datasets[globalName] = loadDataset(filename, globalName);
  }

  const pack = {
    meta: {
      id: 'cecrl-base',
      name: 'Base CECRL',
      description: 'Source unique du contenu pedagogique et des profils de niveau.',
      generatedAt: new Date().toISOString()
    },
    profiles: loadProfiles(),
    exercises: loadExerciseConfig(),
    datasets
  };

  ensureDir(OUTPUT_DIR);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pack, null, 2) + '\n', 'utf8');
  console.log('Pack exporte vers ' + OUTPUT_FILE);
}

main();
