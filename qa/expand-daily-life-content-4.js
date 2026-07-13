const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'pack-cecrl-base.json');
const pack = JSON.parse(fs.readFileSync(filePath, 'utf8'));

pack.datasets.QUIZ_DATA.push(
  {
    category: 'Poste',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    question: 'Ou peut-on envoyer une lettre ?',
    choices: ['A la poste', 'A la pharmacie', 'A la gare', 'Au quai'],
    answer: 0,
    explication: 'La poste est le service utilise pour envoyer une lettre ou un colis.'
  },
  {
    category: 'Poste',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    question: 'Que faut-il souvent verifier avant d envoyer un colis ?',
    choices: ['L adresse du destinataire', 'Le numero du train', 'Le loyer', 'Le dossier de candidature'],
    answer: 0,
    explication: 'Il faut verifier l adresse pour que le colis arrive au bon endroit.'
  },
  {
    category: 'Pharmacie',
    difficulty: 'easy',
    theme: 'sante',
    question: 'Ou achete-t-on des medicaments ?',
    choices: ['A la pharmacie', 'A la commune', 'Au guichet de gare', 'A la banque'],
    answer: 0,
    explication: 'La pharmacie est le lieu pour acheter des medicaments.'
  },
  {
    category: 'Pharmacie',
    difficulty: 'medium',
    theme: 'sante',
    question: 'Que peut demander la pharmacie pour certains medicaments ?',
    choices: ['Une ordonnance', 'Un ticket de bus', 'Un contrat de location', 'Une carte de fidelite'],
    answer: 0,
    explication: 'Certains medicaments sont delivres seulement avec ordonnance.'
  },
  {
    category: 'Commune',
    difficulty: 'easy',
    theme: 'commune',
    question: 'Ou va-t-on pour certaines demarches administratives locales ?',
    choices: ['A la commune', 'Au supermarche', 'A l hopital', 'Au restaurant'],
    answer: 0,
    explication: 'La commune gere de nombreuses demarches administratives locales.'
  },
  {
    category: 'Commune',
    difficulty: 'hard',
    theme: 'commune',
    question: 'Que faut-il souvent prendre avant d aller a la commune ?',
    choices: ['Les documents demandes', 'Des fruits pour le repas', 'Un billet de cinema', 'Un panier de courses'],
    answer: 0,
    explication: 'Les services administratifs demandent souvent des pieces justificatives.'
  },
  {
    category: 'Transports',
    difficulty: 'hard',
    theme: 'transports',
    question: 'Que faut-il faire si une correspondance est tres courte ?',
    choices: ['Verifier le quai et l horaire avant l arrivee', 'Attendre sans regarder les panneaux', 'Acheter un panier', 'Annuler le logement'],
    answer: 0,
    explication: 'Avec une correspondance courte, il faut anticiper le changement.'
  },
  {
    category: 'Assurance',
    difficulty: 'medium',
    theme: 'sante',
    question: 'A quoi sert une assurance maladie ?',
    choices: ['A couvrir une partie des frais de sante', 'A payer le train', 'A envoyer des lettres', 'A louer un appartement'],
    answer: 0,
    explication: 'L assurance maladie couvre une partie des frais de sante selon les regles prevues.'
  },
  {
    category: 'Assurance',
    difficulty: 'hard',
    theme: 'sante',
    question: 'Que faut-il souvent presenter lors d une consultation ?',
    choices: ['La carte d assure', 'Le ticket de caisse du magasin', 'Le code PIN bancaire', 'Le billet de train'],
    answer: 0,
    explication: 'La carte d assure est souvent demandee lors d une consultation.'
  },
  {
    category: 'Logement',
    difficulty: 'hard',
    theme: 'logement',
    question: 'Que faut-il souvent faire avant de louer un appartement ?',
    choices: ['Visiter le logement et preparer le dossier', 'Envoyer une ordonnance', 'Acheter un abonnement de train', 'Aller a la caisse'],
    answer: 0,
    explication: 'La visite et le dossier sont frequents avant une location.'
  }
);

pack.datasets.VRAI_FAUX_DATA.push(
  { category: 'Poste', difficulty: 'easy', theme: 'vie-quotidienne', statement: 'On peut envoyer une lettre a la poste.', answer: true, explication: 'La poste sert a envoyer lettres et colis.' },
  { category: 'Poste', difficulty: 'medium', theme: 'vie-quotidienne', statement: 'Il est utile de verifier l adresse avant d envoyer un colis.', answer: true, explication: 'Une adresse incorrecte peut empecher la livraison.' },
  { category: 'Pharmacie', difficulty: 'easy', theme: 'sante', statement: 'On va a la pharmacie pour acheter des medicaments.', answer: true, explication: 'La pharmacie delivre les medicaments.' },
  { category: 'Pharmacie', difficulty: 'medium', theme: 'sante', statement: 'Une ordonnance peut etre necessaire pour certains medicaments.', answer: true, explication: 'Certains traitements demandent une ordonnance.' },
  { category: 'Commune', difficulty: 'easy', theme: 'commune', statement: 'La commune gere certaines demarches administratives locales.', answer: true, explication: 'La commune est un service administratif local.' },
  { category: 'Commune', difficulty: 'hard', theme: 'commune', statement: 'Il n est jamais utile d apporter des documents a la commune.', answer: false, explication: 'Des documents sont souvent demandes pour une demarche.' },
  { category: 'Transports', difficulty: 'hard', theme: 'transports', statement: 'Avec une correspondance courte, il vaut mieux verifier le quai a l avance.', answer: true, explication: 'Verifier le quai aide a reussir la correspondance.' },
  { category: 'Assurance', difficulty: 'medium', theme: 'sante', statement: 'L assurance maladie peut couvrir une partie des frais de sante.', answer: true, explication: 'Elle participe aux frais selon le contrat.' },
  { category: 'Assurance', difficulty: 'hard', theme: 'sante', statement: 'La carte d assure peut etre demandee lors d une consultation.', answer: true, explication: 'Elle sert a l identification et a la facturation.' },
  { category: 'Logement', difficulty: 'hard', theme: 'logement', statement: 'Visiter un appartement peut faire partie de la demarche de location.', answer: true, explication: 'La visite est souvent une etape normale avant de louer.' }
);

pack.datasets.DEMELER_DATA.push(
  { cat: 'Poste', difficulty: 'easy', theme: 'vie-quotidienne', text: 'Je vais a la poste pour envoyer une lettre.' },
  { cat: 'Poste', difficulty: 'medium', theme: 'vie-quotidienne', text: 'Je verifie l adresse avant de fermer le colis.' },
  { cat: 'Pharmacie', difficulty: 'easy', theme: 'sante', text: 'Je vais a la pharmacie acheter mes medicaments.' },
  { cat: 'Pharmacie', difficulty: 'medium', theme: 'sante', text: 'Je montre l ordonnance pour recevoir le traitement.' },
  { cat: 'Commune', difficulty: 'easy', theme: 'commune', text: 'Je vais a la commune avec mes documents.' },
  { cat: 'Commune', difficulty: 'hard', theme: 'commune', text: 'Je prepare les justificatifs demandes avant le rendez-vous a la commune.' },
  { cat: 'Transports', difficulty: 'hard', theme: 'transports', text: 'Je regarde le quai suivant avant d arriver pour reussir la correspondance.' },
  { cat: 'Assurance', difficulty: 'medium', theme: 'sante', text: 'Je prends ma carte d assure avant la consultation.' },
  { cat: 'Assurance', difficulty: 'hard', theme: 'sante', text: 'Je lis les conditions de l assurance avant de choisir une franchise.' },
  { cat: 'Logement', difficulty: 'hard', theme: 'logement', text: 'Je visite le logement et je prepare le dossier de location.' }
);

pack.datasets.MOTS_CROISES_DATA.push(
  {
    name: 'Grille 8 - Poste',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    rows: 7,
    cols: 8,
    layout: [
      'POSTE###',
      '########',
      '########',
      '########',
      '########',
      'COLIS###',
      'LETTRE##'
    ],
    words: [
      { id: 1, dir: 'across', r: 0, c: 0, answer: 'POSTE', clue: 'Service pour lettres et colis' },
      { id: 2, dir: 'across', r: 5, c: 0, answer: 'COLIS', clue: 'Paquet a envoyer ou recevoir' },
      { id: 3, dir: 'across', r: 6, c: 0, answer: 'LETTRE', clue: 'Courrier papier dans une enveloppe' }
    ]
  },
  {
    name: 'Grille 9 - Assurance',
    difficulty: 'hard',
    theme: 'sante',
    rows: 8,
    cols: 10,
    layout: [
      'CARTE#####',
      '##########',
      '##########',
      '##########',
      '##########',
      '##########',
      '##########',
      'ASSURANCE#'
    ],
    words: [
      { id: 1, dir: 'across', r: 0, c: 0, answer: 'CARTE', clue: 'Piece souvent demandee a la consultation' },
      { id: 2, dir: 'across', r: 7, c: 0, answer: 'ASSURANCE', clue: 'Protection pour les frais de sante' }
    ]
  }
);

fs.writeFileSync(filePath, JSON.stringify(pack, null, 2) + '\n', 'utf8');
console.log('pack-cecrl-base.json enriched round 4');
