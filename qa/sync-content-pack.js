'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_PACK = path.join(ROOT, 'content', 'pack-cecrl-base.json');

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

function readPack(packPath) {
  return JSON.parse(fs.readFileSync(packPath, 'utf8'));
}

function writeDatasetFiles(pack) {
  const dataDir = path.join(ROOT, 'js', 'data');
  for (const [globalName, filename] of Object.entries(DATASET_FILES)) {
    const items = pack.datasets[globalName];
    if (!Array.isArray(items)) throw new Error(globalName + ' absent ou invalide dans le pack');
    const label = filename.replace(/\.js$/i, '').toUpperCase();
    const content = "/* ===== JS/DATA/" + label + ".JS ===== */\n'use strict';\n\nwindow." + globalName + ' = ' + JSON.stringify(items, null, 2) + ';\n';
    fs.writeFileSync(path.join(dataDir, filename), content, 'utf8');
  }
}

function writeExerciseConfig(pack) {
  const entries = (pack.exercises || []).map((item) => "    ['" + item.page + "', '" + escapeJs(item.name) + "', '" + escapeJs(item.icon) + "', '" + escapeJs(item.level) + "', '" + escapeJs(item.summary) + "']").join(',\n');
  const xpRules = (pack.exercises || []).map((item) => "    '" + item.page + "': '" + escapeJs(item.xpRule || '+1 XP par bonne reponse.') + "'").join(',\n');
  const content =
"'use strict';\n\n" +
"/* Configuration centrale du parcours : les jeux sont les seules etapes actives. */\n" +
"(function initGameConfig() {\n" +
"  const entries = [\n" + entries + "\n  ];\n\n" +
"  const xpRules = {\n" + xpRules + "\n  };\n\n" +
"  const meta = {};\n" +
"  const orderedPages = [];\n" +
"  const byPage = {};\n\n" +
"  entries.forEach(([page, name, icon, level, summary]) => {\n" +
"    meta[page] = {\n" +
"      name,\n" +
"      icon,\n" +
"      cat: 'Jeu',\n" +
"      section: 'Jeux',\n" +
"      themes: ['jeu', level.toLowerCase()],\n" +
"      details: {\n" +
"        summary,\n" +
"        objective: 'Jouer, progresser et gagner de l XP.',\n" +
"        practice: 'Attention, memoire et comprehension.',\n" +
"        useWhen: 'A tout moment, pour avancer dans le parcours.'\n" +
"      },\n" +
"      href: page + '.html'\n" +
"    };\n\n" +
"    orderedPages.push(page);\n" +
"    byPage[page] = xpRules[page] || { perCorrect: 1, perAttempt: 0, completionBonus: 3 };\n" +
"  });\n\n" +
"  window.EXERCISE_CONFIG = {\n" +
"    meta,\n" +
"    orderedPages,\n" +
"    nonOrderedPages: ['accueil'],\n" +
"    bonusExercises: [],\n" +
"    categoryContentByCategory: {\n" +
"      Jeu: {\n" +
"        title: 'Le parcours des jeux',\n" +
"        desc: 'Memoriser, observer, classer et repondre en jouant.'\n" +
"      }\n" +
"    },\n" +
"    xpRules: { byPage },\n" +
"    apps: []\n" +
"  };\n" +
"})();\n";
  fs.writeFileSync(path.join(ROOT, 'js', 'exercises-config.js'), content, 'utf8');
}

function writeProfiles(pack) {
  const automationPath = path.join(ROOT, 'js', 'automation.js');
  const source = fs.readFileSync(automationPath, 'utf8');
  const replacement = 'const CEFR_PROFILES = ' + JSON.stringify(pack.profiles || {}, null, 2) + ';';
  const start = source.indexOf('const CEFR_PROFILES = ');
  const end = source.indexOf('  const DATASETS = ');
  if (start === -1 || end === -1 || end <= start) throw new Error('Remplacement de CEFR_PROFILES impossible');
  const updated = source.slice(0, start) + replacement + '\n' + source.slice(end);
  fs.writeFileSync(automationPath, updated, 'utf8');
}

function escapeJs(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function main() {
  const input = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_PACK;
  const pack = readPack(input);
  writeDatasetFiles(pack);
  writeExerciseConfig(pack);
  writeProfiles(pack);
  console.log('Contenu synchronise depuis ' + input);
}

main();
