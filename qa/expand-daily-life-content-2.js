const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'pack-cecrl-base.json');
const pack = JSON.parse(fs.readFileSync(filePath, 'utf8'));

pack.datasets.ALPHABET_DATA.push(
  {
    source: 'core',
    words: ['Caisse', 'Carte', 'Fruit', 'Lait', 'Pain', 'Panier', 'Prix', 'Ticket'],
    difficulty: 'easy',
    theme: 'courses'
  },
  {
    source: 'core',
    words: ['Appel', 'Date', 'Heure', 'Jour', 'Message', 'Note', 'Rappel', 'Retard'],
    difficulty: 'easy',
    theme: 'rendez-vous'
  },
  {
    source: 'core',
    words: ['Annuler', 'Choisir', 'Confirmer', 'Deplacer', 'Horaire', 'Reporter', 'Reserver', 'Venir'],
    difficulty: 'medium',
    theme: 'rendez-vous'
  },
  {
    source: 'core',
    words: ['Boisson', 'Catalogue', 'Commander', 'Monnaie', 'Promotion', 'Rabais', 'Rayon', 'Supermarche'],
    difficulty: 'medium',
    theme: 'courses'
  },
  {
    source: 'core',
    words: ['Bon de reduction', 'Carte de fidelite', 'Date disponible', 'Heure de passage', 'Liste de courses', 'Prendre rendez-vous', 'Retirer en caisse', 'Ticket de caisse'],
    difficulty: 'hard',
    theme: 'courses'
  },
  {
    source: 'core',
    words: ['Changer la date', 'Confirmer par telephone', 'Demande de rendez-vous', 'Heure disponible', 'Message de rappel', 'Prevenir en avance', 'Reporter au lendemain', 'Reservation en ligne'],
    difficulty: 'hard',
    theme: 'rendez-vous'
  }
);

pack.datasets.CLASSEMENT_DATA.push(
  {
    category: 'Courses',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    question: 'Faire des courses simples',
    label: 'Dans l ordre logique',
    items: ['Prendre un panier', 'Choisir les produits', 'Aller a la caisse', 'Payer', 'Ranger les achats']
  },
  {
    category: 'Rendez-vous',
    difficulty: 'easy',
    theme: 'vie-quotidienne',
    question: 'Aller a un rendez-vous',
    label: 'Dans l ordre logique',
    items: ['Regarder la date', 'Verifier l heure', 'Preparer les documents', 'Partir a temps', 'Arriver au rendez-vous']
  },
  {
    category: 'Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    question: 'Reporter un rendez-vous',
    label: 'Dans l ordre logique',
    items: ['Voir que l heure ne convient pas', 'Contacter le service', 'Expliquer le probleme', 'Choisir une nouvelle date', 'Noter le nouveau rendez-vous']
  },
  {
    category: 'Courses',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    question: 'Verifier un achat avant de payer',
    label: 'Dans l ordre logique',
    items: ['Regarder les produits', 'Comparer les prix', 'Verifier la promotion', 'Passer a la caisse', 'Controler le ticket']
  },
  {
    category: 'Courses',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    question: 'Faire des achats avec une promotion',
    label: 'Dans l ordre logique',
    items: ['Lire l offre', 'Verifier la date de validite', 'Choisir le bon produit', 'Passer a la caisse', 'Controler la reduction sur le ticket']
  },
  {
    category: 'Rendez-vous',
    difficulty: 'hard',
    theme: 'vie-quotidienne',
    question: 'Prendre un rendez-vous par telephone',
    label: 'Dans l ordre logique',
    items: ['Appeler le service', 'Dire son nom', 'Expliquer la demande', 'Choisir une date', 'Noter l horaire confirme']
  }
);

pack.datasets.DEMELER_DATA.push(
  { cat: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne', text: 'Je prends un panier avant de faire mes courses.' },
  { cat: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne', text: 'Je regarde le prix avant de payer.' },
  { cat: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne', text: 'Je note la date de mon rendez-vous.' },
  { cat: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne', text: 'Je pars en avance pour arriver a l heure.' },
  { cat: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne', text: 'Je compare les prix avant de choisir le produit.' },
  { cat: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne', text: 'Je controle le ticket de caisse apres le paiement.' },
  { cat: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne', text: 'Je telephone pour confirmer le rendez-vous de demain.' },
  { cat: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne', text: 'Je demande une autre date quand je ne suis pas disponible.' },
  { cat: 'Courses', difficulty: 'hard', theme: 'vie-quotidienne', text: 'Je verifie si la promotion est encore valable avant de passer a la caisse.' },
  { cat: 'Courses', difficulty: 'hard', theme: 'vie-quotidienne', text: 'Je compare le prix au kilo pour choisir le produit le plus interessant.' },
  { cat: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne', text: 'Je reporte le rendez-vous parce que je ne peux pas me liberer cet apres-midi.' },
  { cat: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne', text: 'Je note l heure confirmee pour ne pas oublier le rendez-vous.' }
);

pack.datasets.PENDU_DATA.push(
  { word: 'CAISSE', hint: 'Endroit ou l on paie les achats', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'PANIER', hint: 'Objet pour porter les produits dans le magasin', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'PRIX', hint: 'Somme demandee pour acheter un produit', category: 'Courses', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'DATE', hint: 'Jour indique pour un rendez-vous', category: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'HEURE', hint: 'Moment precis de la journee', category: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'RETARD', hint: 'Situation ou on arrive apres l heure prevue', category: 'Rendez-vous', difficulty: 'easy', theme: 'vie-quotidienne' },
  { word: 'TICKET', hint: 'Papier donne apres le paiement', category: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'RABAIS', hint: 'Reduction de prix', category: 'Courses', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'HORAIRE', hint: 'Heure prevue pour un service ou un rendez-vous', category: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'ANNULER', hint: 'Dire que l on ne vient pas', category: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'CONFIRMER', hint: 'Dire que la date convient', category: 'Rendez-vous', difficulty: 'medium', theme: 'vie-quotidienne' },
  { word: 'PROMOTION', hint: 'Reduction temporaire sur un produit', category: 'Courses', difficulty: 'hard', theme: 'vie-quotidienne' },
  { word: 'SUPERMARCHE', hint: 'Grand magasin ou l on achete des produits du quotidien', category: 'Courses', difficulty: 'hard', theme: 'vie-quotidienne' },
  { word: 'REPORTER', hint: 'Choisir une autre date plus tard', category: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne' },
  { word: 'DISPONIBLE', hint: 'Etat d une personne qui peut venir ou commencer', category: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne' },
  { word: 'RESERVATION', hint: 'Action de garder une place ou un moment', category: 'Rendez-vous', difficulty: 'hard', theme: 'vie-quotidienne' }
);

fs.writeFileSync(filePath, JSON.stringify(pack, null, 2) + '\n', 'utf8');
console.log('pack-cecrl-base.json enriched round 2');
