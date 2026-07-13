const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'pack-cecrl-base.json');
const pack = JSON.parse(fs.readFileSync(filePath, 'utf8'));

pack.datasets.APPARIER_DATA.push(
  {
    category: 'Assurance',
    difficulty: 'hard',
    theme: 'sante',
    pairs: [
      { term: 'Franchise', def: 'Montant paye avant le remboursement de certains frais' },
      { term: 'Prime', def: 'Somme payee regulierement pour l assurance' },
      { term: 'Remboursement', def: 'Somme rendue apres certains frais de sante' },
      { term: 'Carte d assure', def: 'Carte utile lors d une consultation' },
      { term: 'Consultation', def: 'Rendez-vous avec un professionnel de sante' }
    ]
  },
  {
    category: 'Location',
    difficulty: 'hard',
    theme: 'logement',
    pairs: [
      { term: 'Etat des lieux', def: 'Controle du logement a l entree ou a la sortie' },
      { term: 'Depot de garantie', def: 'Somme bloquee pour garantir la location' },
      { term: 'Dossier de location', def: 'Ensemble de documents pour demander un logement' },
      { term: 'Regie immobiliere', def: 'Societe qui gere les logements en location' },
      { term: 'Visite du logement', def: 'Moment ou l on regarde un appartement avant de louer' }
    ]
  }
);

pack.datasets.ANAGRAMME_DATA.push(
  { word: 'BAIN', hint: 'Piece ou l on se lave', category: 'Logement', difficulty: 'easy', theme: 'logement' },
  { word: 'CLE', hint: 'Objet pour ouvrir la porte', category: 'Logement', difficulty: 'easy', theme: 'logement' },
  { word: 'SOIN', hint: 'Aide ou traitement medical', category: 'Sante', difficulty: 'easy', theme: 'sante' },
  { word: 'PRIME', hint: 'Paiement regulier de l assurance', category: 'Assurance', difficulty: 'medium', theme: 'sante' },
  { word: 'LOUER', hint: 'Prendre un logement contre paiement', category: 'Logement', difficulty: 'medium', theme: 'logement' },
  { word: 'VISITE', hint: 'Moment pour voir un appartement', category: 'Logement', difficulty: 'medium', theme: 'logement' },
  { word: 'FRANCHISE', hint: 'Montant a payer avant certains remboursements', category: 'Assurance', difficulty: 'hard', theme: 'sante' },
  { word: 'CONSULTATION', hint: 'Rendez-vous avec un professionnel de sante', category: 'Sante', difficulty: 'hard', theme: 'sante' },
  { word: 'REMBOURSEMENT', hint: 'Somme rendue apres certains frais', category: 'Assurance', difficulty: 'hard', theme: 'sante' },
  { word: 'LOCATAIRE', hint: 'Personne qui loue un logement', category: 'Logement', difficulty: 'hard', theme: 'logement' }
);

pack.datasets.PENDU_DATA.push(
  { word: 'VISITE', hint: 'Moment pour voir un appartement avant de louer', category: 'Logement', difficulty: 'medium', theme: 'logement' },
  { word: 'DOSSIER', hint: 'Ensemble de documents pour demander un logement', category: 'Logement', difficulty: 'medium', theme: 'logement' },
  { word: 'REGIE', hint: 'Societe qui gere des appartements', category: 'Logement', difficulty: 'medium', theme: 'logement' },
  { word: 'FRANCHISE', hint: 'Montant paye avant certains remboursements', category: 'Assurance', difficulty: 'hard', theme: 'sante' },
  { word: 'PRIME', hint: 'Paiement regulier de l assurance maladie', category: 'Assurance', difficulty: 'medium', theme: 'sante' },
  { word: 'REMBOURSEMENT', hint: 'Somme rendue apres certains frais de sante', category: 'Assurance', difficulty: 'hard', theme: 'sante' },
  { word: 'CONSULTATION', hint: 'Rendez-vous avec un professionnel de sante', category: 'Sante', difficulty: 'hard', theme: 'sante' },
  { word: 'TRAITEMENT', hint: 'Moyen de soigner une maladie', category: 'Sante', difficulty: 'medium', theme: 'sante' }
);

pack.datasets.DEMELER_DATA.push(
  { cat: 'Logement', difficulty: 'medium', theme: 'logement', text: 'Je prepare mon dossier avant la visite de l appartement.' },
  { cat: 'Logement', difficulty: 'hard', theme: 'logement', text: 'Je lis le bail et les charges avant de signer le contrat de location.' },
  { cat: 'Logement', difficulty: 'hard', theme: 'logement', text: 'Je compare plusieurs logements avant de choisir un appartement.' },
  { cat: 'Assurance', difficulty: 'medium', theme: 'sante', text: 'Je montre ma carte d assure avant la consultation.' },
  { cat: 'Assurance', difficulty: 'hard', theme: 'sante', text: 'Je compare les primes avant de choisir une assurance maladie.' },
  { cat: 'Assurance', difficulty: 'hard', theme: 'sante', text: 'Je garde les documents pour demander un remboursement plus tard.' }
);

pack.datasets.CLASSEMENT_DATA.push(
  {
    category: 'Location',
    difficulty: 'medium',
    theme: 'logement',
    question: 'Demander un appartement',
    label: 'Dans l ordre logique',
    items: ['Chercher une annonce', 'Prendre rendez-vous pour la visite', 'Visiter le logement', 'Preparer le dossier', 'Envoyer la demande']
  },
  {
    category: 'Location',
    difficulty: 'hard',
    theme: 'logement',
    question: 'Entrer dans un nouveau logement',
    label: 'Dans l ordre logique',
    items: ['Lire le bail', 'Signer le contrat', 'Verser la garantie', 'Faire l etat des lieux', 'Recevoir les cles']
  },
  {
    category: 'Assurance',
    difficulty: 'hard',
    theme: 'sante',
    question: 'Utiliser son assurance maladie',
    label: 'Dans l ordre logique',
    items: ['Prendre rendez-vous', 'Aller a la consultation', 'Recevoir la facture', 'Envoyer les documents utiles', 'Attendre le remboursement']
  }
);

pack.datasets.MOTS_MELES_DATA.push(
  {
    name: 'Assurance et sante',
    difficulty: 'hard',
    theme: 'sante',
    size: 12,
    words: [
      { word: 'PRIME', r: 0, c: 0, dir: 'H' },
      { word: 'CARTE', r: 1, c: 0, dir: 'H' },
      { word: 'MEDECIN', r: 2, c: 0, dir: 'H' },
      { word: 'SOINS', r: 3, c: 0, dir: 'H' },
      { word: 'FACTURE', r: 4, c: 0, dir: 'H' },
      { word: 'FRANCHISE', r: 5, c: 0, dir: 'H' },
      { word: 'CONSULTATION', r: 6, c: 0, dir: 'H' },
      { word: 'ORDONNANCE', r: 7, c: 0, dir: 'H' },
      { word: 'REMBOURSEMENT', r: 8, c: 0, dir: 'H' },
      { word: 'PHARMACIE', r: 9, c: 0, dir: 'H' }
    ]
  },
  {
    name: 'Location appartement',
    difficulty: 'hard',
    theme: 'logement',
    size: 12,
    words: [
      { word: 'BAIL', r: 0, c: 0, dir: 'H' },
      { word: 'LOYER', r: 1, c: 0, dir: 'H' },
      { word: 'CLES', r: 2, c: 0, dir: 'H' },
      { word: 'VISITE', r: 3, c: 0, dir: 'H' },
      { word: 'DOSSIER', r: 4, c: 0, dir: 'H' },
      { word: 'REGIE', r: 5, c: 0, dir: 'H' },
      { word: 'GARANTIE', r: 6, c: 0, dir: 'H' },
      { word: 'CHARGES', r: 7, c: 0, dir: 'H' },
      { word: 'LOCATAIRE', r: 8, c: 0, dir: 'H' },
      { word: 'APPARTEMENT', r: 9, c: 0, dir: 'H' }
    ]
  }
);

pack.datasets.MOTS_CROISES_DATA.push(
  {
    name: 'Grille 10 - Location',
    difficulty: 'hard',
    theme: 'logement',
    rows: 8,
    cols: 10,
    layout: [
      'BAIL######',
      '##########',
      'LOYER#####',
      '##########',
      'VISITE####',
      '##########',
      'DOSSIER###',
      'REGIE#####'
    ],
    words: [
      { id: 1, dir: 'across', r: 0, c: 0, answer: 'BAIL', clue: 'Contrat de location' },
      { id: 2, dir: 'across', r: 2, c: 0, answer: 'LOYER', clue: 'Somme payee chaque mois' },
      { id: 3, dir: 'across', r: 4, c: 0, answer: 'VISITE', clue: 'Moment pour voir un logement' },
      { id: 4, dir: 'across', r: 6, c: 0, answer: 'DOSSIER', clue: 'Documents pour demander un appartement' },
      { id: 5, dir: 'across', r: 7, c: 0, answer: 'REGIE', clue: 'Societe qui gere des logements' }
    ]
  }
);

fs.writeFileSync(filePath, JSON.stringify(pack, null, 2) + '\n', 'utf8');
console.log('pack-cecrl-base.json enriched round 5');
