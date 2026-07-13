'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BASE_PACK = path.join(CONTENT_DIR, 'pack-cecrl-base.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n', 'utf8');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeLevelLabel(level) {
  return String(level || '').toUpperCase();
}

function sessionLengthsFor(level) {
  if (level === 'A1') {
    return {
      'jeu-alphabet': 4,
      'jeu-anagramme': 6,
      'jeu-apparier': 3,
      'jeu-cherche-clique': 5,
      'jeu-classement': 4,
      'jeu-demeler': 4,
      'jeu-mots-croises': 2,
      'jeu-mots-meles': 2,
      'jeu-paire': 6,
      'jeu-pendu': 6,
      'jeu-quiz': 5,
      'jeu-vrai-faux': 5
    };
  }
  if (level === 'B1') {
    return {
      'jeu-alphabet': 6,
      'jeu-anagramme': 10,
      'jeu-apparier': 5,
      'jeu-cherche-clique': 8,
      'jeu-classement': 6,
      'jeu-demeler': 8,
      'jeu-mots-croises': 4,
      'jeu-mots-meles': 4,
      'jeu-paire': 10,
      'jeu-pendu': 10,
      'jeu-quiz': 8,
      'jeu-vrai-faux': 8
    };
  }
  return {
    'jeu-alphabet': 5,
    'jeu-anagramme': 8,
    'jeu-apparier': 4,
    'jeu-cherche-clique': 6,
    'jeu-classement': 5,
    'jeu-demeler': 6,
    'jeu-mots-croises': 3,
    'jeu-mots-meles': 3,
    'jeu-paire': 8,
    'jeu-pendu': 8,
    'jeu-quiz': 6,
    'jeu-vrai-faux': 6
  };
}

function targetLevelByGame(level) {
  if (level === 'A1') {
    return {
      'jeu-alphabet': 'A1',
      'jeu-pendu': 'A1',
      'jeu-mots-meles': 'A1-A2',
      'jeu-anagramme': 'A1-A2',
      'jeu-apparier': 'A1-A2',
      'jeu-paire': 'A1',
      'jeu-demeler': 'A1-A2',
      'jeu-cherche-clique': 'A1',
      'jeu-vrai-faux': 'A1-A2',
      'jeu-quiz': 'A1-A2',
      'jeu-classement': 'A1-A2',
      'jeu-mots-croises': 'A1-A2'
    };
  }
  if (level === 'B1') {
    return {
      'jeu-alphabet': 'A2-B1',
      'jeu-pendu': 'A2-B1',
      'jeu-mots-meles': 'B1',
      'jeu-anagramme': 'A2-B1',
      'jeu-apparier': 'A2-B1',
      'jeu-paire': 'A2-B1',
      'jeu-demeler': 'B1',
      'jeu-cherche-clique': 'A2-B1',
      'jeu-vrai-faux': 'B1',
      'jeu-quiz': 'B1',
      'jeu-classement': 'B1',
      'jeu-mots-croises': 'B1'
    };
  }
  return {
    'jeu-alphabet': 'A2',
    'jeu-pendu': 'A2',
    'jeu-mots-meles': 'A2-B1',
    'jeu-anagramme': 'A2',
    'jeu-apparier': 'A2',
    'jeu-paire': 'A2',
    'jeu-demeler': 'A2-B1',
    'jeu-cherche-clique': 'A2',
    'jeu-vrai-faux': 'A2-B1',
    'jeu-quiz': 'A2-B1',
    'jeu-classement': 'A2-B1',
    'jeu-mots-croises': 'A2-B1'
  };
}

function packDescription(level) {
  if (level === 'A1') return 'Vie quotidienne en Suisse pour debuter : reperes simples, situations frequentes et vocabulaire tres courant.';
  if (level === 'A2') return 'Vie quotidienne en Suisse pour devenir autonome : demarches simples, habitudes utiles et vocabulaire du quotidien.';
  return 'Vie quotidienne en Suisse pour consolider le niveau : demarches plus completes, situations realistes et vocabulaire plus precis.';
}

function summaryForLevel(page, level) {
  const byLevel = {
    A1: {
      'jeu-alphabet': 'Classe des mots tres frequents de la vie quotidienne en Suisse.',
      'jeu-pendu': 'Trouve des mots simples utiles pour la vie quotidienne en Suisse.',
      'jeu-mots-meles': 'Repere du vocabulaire simple de la vie quotidienne en Suisse.',
      'jeu-anagramme': 'Remets en ordre des mots simples du quotidien.',
      'jeu-apparier': 'Relie des mots simples a leur sens ou a leur situation.',
      'jeu-paire': 'Memorise des cartes tres simples du quotidien.',
      'jeu-demeler': 'Reconstruis des phrases courtes de la vie quotidienne.',
      'jeu-cherche-clique': 'Observe et retrouve les elements essentiels d une situation simple.',
      'jeu-vrai-faux': 'Lis une phrase simple sur la vie quotidienne en Suisse et choisis vrai ou faux.',
      'jeu-quiz': 'Reponds a des questions simples sur la vie quotidienne en Suisse.',
      'jeu-classement': 'Remets dans l ordre des actions tres concretes du quotidien.',
      'jeu-mots-croises': 'Retrouve quelques mots simples avec des indices courts.'
    },
    A2: {
      'jeu-alphabet': 'Classe les mots utiles du quotidien et retrouve leur ordre.',
      'jeu-pendu': 'Trouve un mot utile en francais, lettre apres lettre.',
      'jeu-mots-meles': 'Repere le vocabulaire du quotidien dans des grilles courtes.',
      'jeu-anagramme': 'Remets en ordre des mots frequents de la vie quotidienne.',
      'jeu-apparier': 'Relie les mots, actions et situations qui vont ensemble.',
      'jeu-paire': 'Memorise des cartes simples et retrouve les bons duos.',
      'jeu-demeler': 'Reconstruis des phrases courtes puis plus detaillees.',
      'jeu-cherche-clique': 'Observe une scene et retrouve les elements importants.',
      'jeu-vrai-faux': 'Lis une situation concrete et decide si elle est juste.',
      'jeu-quiz': 'Reponds a des questions de vie quotidienne et revise tes erreurs.',
      'jeu-classement': 'Organise des etapes dans un ordre logique et utile.',
      'jeu-mots-croises': 'Croise les indices pour consolider le vocabulaire.'
    },
    B1: {
      'jeu-alphabet': 'Classe du vocabulaire plus precis lie a la vie quotidienne en Suisse et aux demarches.',
      'jeu-pendu': 'Trouve des mots de la vie quotidienne en Suisse et des demarches.',
      'jeu-mots-meles': 'Repere du vocabulaire plus riche dans des situations de vie quotidienne en Suisse.',
      'jeu-anagramme': 'Remets en ordre des mots plus complexes du quotidien et des demarches.',
      'jeu-apparier': 'Relie vocabulaire, definitions et situations plus fines.',
      'jeu-paire': 'Memorise et distingue des notions proches de la vie quotidienne.',
      'jeu-demeler': 'Reconstruis des phrases plus naturelles sur la vie en Suisse.',
      'jeu-cherche-clique': 'Observe des scenes plus riches et retrouve les bons reperes.',
      'jeu-vrai-faux': 'Analyse des affirmations plus detaillees sur la vie quotidienne en Suisse.',
      'jeu-quiz': 'Reponds a des questions plus precises sur les demarches et les habitudes du quotidien.',
      'jeu-classement': 'Ordonne des etapes plus completes dans des situations reelles.',
      'jeu-mots-croises': 'Consolide un vocabulaire plus precis avec des indices plus riches.'
    }
  };
  return byLevel[level][page] || '';
}

function filterByAllowedDifficulty(items, allowed) {
  return items.filter((item) => !item || !item.difficulty || allowed.includes(item.difficulty));
}

function buildPack(basePack, level) {
  const pack = clone(basePack);
  const normalizedLevel = normalizeLevelLabel(level);
  const allowed = normalizedLevel === 'A1' ? ['easy'] : normalizedLevel === 'A2' ? ['easy', 'medium'] : ['medium', 'hard'];
  const secondaryAllowed = normalizedLevel === 'A1' ? ['easy', 'medium'] : allowed;

  pack.meta.id = 'cecrl-' + normalizedLevel.toLowerCase();
  pack.meta.name = 'CECRL ' + normalizedLevel;
  pack.meta.description = packDescription(normalizedLevel);
  pack.meta.generatedAt = new Date().toISOString();
  pack.meta.derivedFrom = 'pack-cecrl-base.json';
  pack.meta.focusThemes = ['vie-quotidienne-suisse', 'logement', 'sante', 'transports', 'administration', 'courses'];

  const ownProfile = {
    label: normalizedLevel,
    allowedDifficulties: allowed,
    sessionLengths: sessionLengthsFor(normalizedLevel)
  };

  pack.profiles = {
    A1: {
      label: 'A1',
      allowedDifficulties: ['easy'],
      sessionLengths: sessionLengthsFor('A1')
    },
    A2: {
      label: 'A2',
      allowedDifficulties: ['easy', 'medium'],
      sessionLengths: sessionLengthsFor('A2')
    },
    B1: {
      label: 'B1',
      allowedDifficulties: ['medium', 'hard'],
      sessionLengths: sessionLengthsFor('B1')
    },
    DEFAULT: ownProfile
  };

  const levelMap = targetLevelByGame(normalizedLevel);
  pack.exercises = (pack.exercises || []).map((exercise) => Object.assign({}, exercise, {
    level: levelMap[exercise.page] || normalizedLevel,
    summary: summaryForLevel(exercise.page, normalizedLevel) || exercise.summary
  }));

  for (const [datasetName, items] of Object.entries(pack.datasets || {})) {
    if (!Array.isArray(items)) continue;
    const allowedForDataset = datasetName === 'MOTS_CROISES_DATA' && normalizedLevel === 'A1' ? secondaryAllowed : allowed;
    let filtered = filterByAllowedDifficulty(items, allowedForDataset);
    if (!filtered.length) filtered = items.slice();
    pack.datasets[datasetName] = filtered;
  }

  return pack;
}

function main() {
  const basePack = readJson(BASE_PACK);
  for (const level of ['A1', 'A2', 'B1']) {
    const pack = buildPack(basePack, level);
    const target = path.join(CONTENT_DIR, 'pack-cecrl-' + level.toLowerCase() + '.json');
    writeJson(target, pack);
    console.log('Pack genere : ' + target);
  }
}

main();
