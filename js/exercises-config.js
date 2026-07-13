'use strict';

/* Configuration centrale du parcours : les jeux sont les seules etapes actives. */
(function initGameConfig() {
  const entries = [
    ['jeu-alphabet', 'Alphabet', 'A', 'A2', 'Classe les mots utiles du quotidien et retrouve leur ordre.'],
    ['jeu-pendu', 'Pendu', 'P', 'A2', 'Trouve un mot utile en francais, lettre apres lettre.'],
    ['jeu-mots-meles', 'Mots meles', 'W', 'A2-B1', 'Repere le vocabulaire du quotidien dans des grilles courtes.'],
    ['jeu-anagramme', 'Anagramme', 'AN', 'A2', 'Remets en ordre des mots frequents de la vie quotidienne.'],
    ['jeu-apparier', 'Apparier', '=', 'A2', 'Relie les mots, actions et situations qui vont ensemble.'],
    ['jeu-paire', 'Paires', '2', 'A2', 'Memorise des cartes simples et retrouve les bons duos.'],
    ['jeu-demeler', 'Demeler', 'S', 'B1', 'Reconstruis des phrases courtes puis plus detaillees.'],
    ['jeu-cherche-clique', 'Cherche & clique', '+', 'A2', 'Observe une scene et retrouve les elements importants.'],
    ['jeu-vrai-faux', 'Vrai / Faux', 'VF', 'A2-B1', 'Lis une situation concrete et decide si elle est juste.'],
    ['jeu-quiz', 'Quiz', 'Q', 'A2-B1', 'Reponds a des questions de vie quotidienne et revise tes erreurs.'],
    ['jeu-classement', 'Classement', '#', 'B1', 'Organise des etapes dans un ordre logique et utile.'],
    ['jeu-mots-croises', 'Mots croises', 'X', 'B1', 'Croise les indices pour consolider le vocabulaire.']
  ];

  const xpRules = {
    'jeu-alphabet': '+5 XP par bonne reponse.',
    'jeu-pendu': '+5 XP sans indice, +3 XP avec indice.',
    'jeu-mots-meles': '+3 XP par mot trouve.',
    'jeu-anagramme': '+3 XP sans indice, +1 XP avec indice.',
    'jeu-apparier': '+2 XP par paire trouvee.',
    'jeu-paire': '+2 XP par paire memorisee.',
    'jeu-demeler': '+5 XP sans indice, +3 XP avec indice.',
    'jeu-cherche-clique': '+3 XP par clic correct.',
    'jeu-vrai-faux': '+2 XP par bonne reponse + bonus de serie.',
    'jeu-quiz': '+3 XP par bonne reponse + bonus de serie.',
    'jeu-classement': '+5 XP par classement parfait.',
    'jeu-mots-croises': '+5 XP par mot trouve.'
  };

  const meta = {};
  const orderedPages = [];
  const byPage = {};

  entries.forEach(([page, name, icon, level, summary]) => {
    meta[page] = {
      name,
      icon,
      cat: 'Jeu',
      section: 'Jeux',
      themes: ['jeu', level.toLowerCase()],
      details: {
        summary,
        objective: 'Jouer, progresser et gagner de l XP.',
        practice: 'Attention, memoire et comprehension.',
        useWhen: 'A tout moment, pour avancer dans le parcours.'
      },
      href: page + '.html'
    };

    orderedPages.push(page);
    byPage[page] = xpRules[page] || { perCorrect: 1, perAttempt: 0, completionBonus: 3 };
  });

  window.EXERCISE_CONFIG = {
    meta,
    orderedPages,
    nonOrderedPages: ['accueil'],
    bonusExercises: [],
    categoryContentByCategory: {
      Jeu: {
        title: 'Le parcours des jeux',
        desc: 'Memoriser, observer, classer et repondre en jouant.'
      }
    },
    xpRules: { byPage },
    apps: []
  };
})();
