const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'pack-cecrl-base.json');
const raw = fs.readFileSync(filePath, 'utf8');
const pack = JSON.parse(raw);

pack.datasets.APPARIER_DATA.push(
  {
    category: 'Courses',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    pairs: [
      { term: 'Panier', def: 'Objet pour porter les achats dans le magasin' },
      { term: 'Caisse', def: 'Endroit ou l on paie les produits' },
      { term: 'Prix', def: 'Somme demandee pour acheter un produit' },
      { term: 'Ticket', def: 'Papier donne apres le paiement' },
      { term: 'Promotion', def: 'Reduction temporaire sur un produit' }
    ]
  },
  {
    category: 'Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    pairs: [
      { term: 'Rendez-vous', def: 'Moment fixe pour voir une personne ou un service' },
      { term: 'Horaire', def: 'Heure prevue pour une activite ou un service' },
      { term: 'Confirmer', def: 'Dire que la date ou l heure convient' },
      { term: 'Reporter', def: 'Choisir un autre moment plus tard' },
      { term: 'Annuler', def: 'Dire que l on ne vient pas' }
    ]
  }
);

pack.datasets.QUIZ_DATA.push(
  {
    category: 'Courses',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    question: 'Ou paie-t-on les produits dans un magasin ?',
    choices: ['A la caisse', 'Au quai', 'Au guichet communal', 'A l arret de bus'],
    answer: 0,
    explication: 'La caisse est l endroit ou le client paie ses achats.'
  },
  {
    category: 'Courses',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    question: 'Que faut-il faire avant de payer ses courses ?',
    choices: ['Verifier les produits et le prix', 'Signer un contrat', 'Prendre un rendez-vous', 'Envoyer un e-mail a la banque'],
    answer: 0,
    explication: 'Verifier ses produits et le montant aide a eviter les erreurs.'
  },
  {
    category: 'Courses',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    question: 'Que signifie promotion dans un supermarche ?',
    choices: ['Un produit vendu temporairement moins cher', 'Un produit reserve au personnel', 'Un paiement par virement', 'Un document obligatoire'],
    answer: 0,
    explication: 'Une promotion indique en general une reduction pendant une periode limitee.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    question: 'Que faut-il faire si on ne peut pas venir a un rendez-vous ?',
    choices: ['Prevenir le service ou la personne', 'Ne rien dire', 'Changer de logement', 'Acheter un billet'],
    answer: 0,
    explication: 'Prevenir est la bonne chose a faire quand on ne peut pas venir.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    question: 'Que signifie confirmer un rendez-vous ?',
    choices: ['Dire que la date et l heure conviennent', 'Demander un remboursement', 'Refuser de venir', 'Payer une facture'],
    answer: 0,
    explication: 'Confirmer veut dire accepter le moment propose.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    question: 'Que signifie reporter un rendez-vous ?',
    choices: ['Le deplacer a une autre date', 'Le payer en liquide', 'Le transformer en entretien de travail', 'Le faire sans horaire'],
    answer: 0,
    explication: 'Reporter signifie choisir un autre moment plus tard.'
  }
);

pack.datasets.VRAI_FAUX_DATA.push(
  {
    category: 'Courses',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    statement: 'La caisse est l endroit ou on paie ses achats.',
    answer: true,
    explication: 'Dans un magasin, le paiement se fait a la caisse.'
  },
  {
    category: 'Courses',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    statement: 'Il est utile de verifier le prix avant de payer.',
    answer: true,
    explication: 'Verifier le prix permet d eviter les erreurs au moment du paiement.'
  },
  {
    category: 'Courses',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    statement: 'Une promotion signifie toujours que le produit est gratuit.',
    answer: false,
    explication: 'Une promotion indique une reduction, pas un produit gratuit.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    statement: 'Si on ne peut pas venir a un rendez-vous, il vaut mieux prevenir.',
    answer: true,
    explication: 'Prevenir le service ou la personne est la bonne pratique.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    statement: 'Confirmer un rendez-vous signifie dire que la date convient.',
    answer: true,
    explication: 'Confirmer veut dire accepter le moment prevu.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    statement: 'Reporter un rendez-vous signifie l annuler definitivement.',
    answer: false,
    explication: 'Reporter veut dire le deplacer a une autre date, pas l annuler pour toujours.'
  }
);

fs.writeFileSync(filePath, JSON.stringify(pack, null, 2) + '\n', 'utf8');
console.log('pack-cecrl-base.json enriched');
