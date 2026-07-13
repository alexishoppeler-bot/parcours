const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'pack-cecrl-base.json');
const pack = JSON.parse(fs.readFileSync(filePath, 'utf8'));

pack.datasets.ANAGRAMME_DATA.push(
  { word: 'PAIN', hint: 'Aliment tres courant du petit-dejeuner', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'LAIT', hint: 'Boisson blanche souvent au frigo', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'PRIX', hint: 'Somme demandee pour un produit', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'HEURE', hint: 'Moment precis dans la journee', category: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'DATE', hint: 'Jour fixe pour un rendez-vous', category: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'PANIER', hint: 'Objet pour porter les courses', category: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'CAISSE', hint: 'Endroit ou l on paie dans un magasin', category: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'TICKET', hint: 'Papier donne apres le paiement', category: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'HORAIRE', hint: 'Heure prevue pour un service', category: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'ANNULER', hint: 'Dire que l on ne vient pas', category: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'PROMOTION', hint: 'Reduction temporaire dans un magasin', category: 'Courses', difficulty: 'hard', theme: 'vie-quotidienne' },
  { word: 'SUPERMARCHE', hint: 'Grand magasin pour les achats du quotidien', category: 'Courses', difficulty: 'hard', theme: 'vie-quotidienne' },
  { word: 'CONFIRMER', hint: 'Dire que la date convient', category: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne' },
  { word: 'REPORTER', hint: 'Choisir une autre date plus tard', category: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne' }
);

pack.datasets.CHERCHE_CLIQUE_DATA.push(
  { id: 'basket', icon: '🧺', label: 'Panier', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { id: 'cashier', icon: '💰', label: 'Caisse', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { id: 'price', icon: '🏷️', label: 'Prix', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { id: 'receipt', icon: '🧾', label: 'Ticket', category: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne' },
  { id: 'promo', icon: '📣', label: 'Promotion', category: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne' },
  { id: 'appointment', icon: '📅', label: 'Rendez-vous', category: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne' },
  { id: 'alarm', icon: '⏰', label: 'Heure', category: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne' },
  { id: 'confirm', icon: '✅', label: 'Confirmer', category: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne' },
  { id: 'cancel', icon: '❌', label: 'Annuler', category: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne' },
  { id: 'reservation', icon: '📲', label: 'Reservation', category: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne' }
);

pack.datasets.MOTS_MELES_DATA.push(
  {
    name: 'Courses',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    size: 12,
    words: [
      { word: 'PAIN', r: 0, c: 0, dir: 'H' },
      { word: 'LAIT', r: 1, c: 0, dir: 'H' },
      { word: 'PRIX', r: 2, c: 0, dir: 'H' },
      { word: 'PANIER', r: 3, c: 0, dir: 'H' },
      { word: 'CAISSE', r: 4, c: 0, dir: 'H' },
      { word: 'TICKET', r: 5, c: 0, dir: 'H' },
      { word: 'CARTE', r: 6, c: 0, dir: 'H' },
      { word: 'FRUIT', r: 7, c: 0, dir: 'H' },
      { word: 'RAYON', r: 8, c: 0, dir: 'H' },
      { word: 'SAC', r: 9, c: 0, dir: 'H' }
    ]
  },
  {
    name: 'Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    size: 12,
    words: [
      { word: 'DATE', r: 0, c: 0, dir: 'H' },
      { word: 'HEURE', r: 1, c: 0, dir: 'H' },
      { word: 'RETARD', r: 2, c: 0, dir: 'H' },
      { word: 'ANNULER', r: 3, c: 0, dir: 'H' },
      { word: 'CONFIRMER', r: 4, c: 0, dir: 'H' },
      { word: 'REPORTER', r: 5, c: 0, dir: 'H' },
      { word: 'MESSAGE', r: 6, c: 0, dir: 'H' },
      { word: 'APPEL', r: 7, c: 0, dir: 'H' },
      { word: 'RAPPEL', r: 8, c: 0, dir: 'H' },
      { word: 'AGENDA', r: 9, c: 0, dir: 'H' }
    ]
  },
  {
    name: 'Demarches quotidiennes',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    size: 12,
    words: [
      { word: 'FORMULAIRE', r: 0, c: 0, dir: 'H' },
      { word: 'JUSTIFICATIF', r: 1, c: 0, dir: 'H' },
      { word: 'RENDEZVOUS', r: 2, c: 0, dir: 'H' },
      { word: 'RESERVATION', r: 3, c: 0, dir: 'H' },
      { word: 'PROMOTION', r: 4, c: 0, dir: 'H' },
      { word: 'VIREMENT', r: 5, c: 0, dir: 'H' },
      { word: 'FACTURE', r: 6, c: 0, dir: 'H' },
      { word: 'CONTRAT', r: 7, c: 0, dir: 'H' },
      { word: 'HORAIRE', r: 8, c: 0, dir: 'H' },
      { word: 'DISPONIBLE', r: 9, c: 0, dir: 'H' }
    ]
  }
);

pack.datasets.MOTS_CROISES_DATA.push(
  {
    name: 'Grille 5 - Courses',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    rows: 7,
    cols: 8,
    layout: [
      'PAIN####',
      'R#A#####',
      'I#I#####',
      'X#T#####',
      '###PANIER',
      'CAISSE##',
      'TICKET##'
    ],
    words: [
      { id: 1, dir: 'across', r: 0, c: 0, answer: 'PAIN', clue: 'Aliment tres courant du quotidien' },
      { id: 2, dir: 'across', r: 4, c: 3, answer: 'PANIER', clue: 'Objet pour porter les achats' },
      { id: 3, dir: 'across', r: 5, c: 0, answer: 'CAISSE', clue: 'Endroit ou l on paie' },
      { id: 4, dir: 'across', r: 6, c: 0, answer: 'TICKET', clue: 'Papier donne apres le paiement' },
      { id: 5, dir: 'down', r: 0, c: 0, answer: 'PRIX', clue: 'Somme demandee pour acheter' },
      { id: 6, dir: 'down', r: 0, c: 2, answer: 'LAIT', clue: 'Boisson blanche du frigo' }
    ]
  },
  {
    name: 'Grille 6 - Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    rows: 8,
    cols: 8,
    layout: [
      'DATE####',
      'E#P#####',
      'U#P#####',
      'R#E#####',
      'E#L#####',
      '###HEURE',
      'ANNULER#',
      'RAPPEL##'
    ],
    words: [
      { id: 1, dir: 'across', r: 0, c: 0, answer: 'DATE', clue: 'Jour fixe pour venir' },
      { id: 2, dir: 'across', r: 5, c: 3, answer: 'HEURE', clue: 'Moment precis de la journee' },
      { id: 3, dir: 'across', r: 6, c: 0, answer: 'ANNULER', clue: 'Dire que l on ne vient pas' },
      { id: 4, dir: 'across', r: 7, c: 0, answer: 'RAPPEL', clue: 'Message pour ne pas oublier' },
      { id: 5, dir: 'down', r: 0, c: 0, answer: 'RETARD', clue: 'Arrivee apres l heure prevue' },
      { id: 6, dir: 'down', r: 1, c: 2, answer: 'APPEL', clue: 'Action de telephoner' }
    ]
  },
  {
    name: 'Grille 7 - Demarches',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    rows: 8,
    cols: 10,
    layout: [
      'CONTRAT###',
      'O##A######',
      'N##C######',
      'F##T######',
      'I##U######',
      'R##R######',
      'MERCI#####',
      'FORMULAIRE'
    ],
    words: [
      { id: 1, dir: 'across', r: 0, c: 0, answer: 'CONTRAT', clue: 'Document signe entre deux parties' },
      { id: 2, dir: 'across', r: 6, c: 0, answer: 'MERCI', clue: 'Mot de politesse frequent' },
      { id: 3, dir: 'across', r: 7, c: 0, answer: 'FORMULAIRE', clue: 'Document avec des champs a remplir' },
      { id: 4, dir: 'down', r: 0, c: 0, answer: 'CONFIRMER', clue: 'Dire que la date convient' },
      { id: 5, dir: 'down', r: 0, c: 3, answer: 'FACTURE', clue: 'Document indiquant un montant a payer' }
    ]
  }
);

fs.writeFileSync(filePath, JSON.stringify(pack, null, 2) + '\n', 'utf8');
console.log('pack-cecrl-base.json enriched round 3');
