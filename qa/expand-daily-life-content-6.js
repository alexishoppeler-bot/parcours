const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'pack-cecrl-base.json');
const pack = JSON.parse(fs.readFileSync(filePath, 'utf8'));

pack.datasets.APPARIER_DATA.push(
  {
    category: 'Poste',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    pairs: [
      { term: 'Lettre', def: 'Courrier papier dans une enveloppe' },
      { term: 'Colis', def: 'Paquet a envoyer ou recevoir' },
      { term: 'Destinataire', def: 'Personne qui recoit un envoi' },
      { term: 'Expediteur', def: 'Personne qui envoie un courrier' },
      { term: 'Adresse', def: 'Information necessaire pour la livraison' }
    ]
  },
  {
    category: 'Pharmacie',
    difficulty: 'medium',
    theme: 'sante',
    pairs: [
      { term: 'Pharmacien', def: 'Professionnel qui delivre des medicaments' },
      { term: 'Ordonnance', def: 'Document du medecin pour certains traitements' },
      { term: 'Traitement', def: 'Maniere de soigner un probleme de sante' },
      { term: 'Dose', def: 'Quantite de medicament a prendre' },
      { term: 'Conseil', def: 'Information utile donnee au patient' }
    ]
  }
);

pack.datasets.PAIRE_DATA.push(
  {
    category: 'Poste',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    isPair: true,
    card1: { emoji: '🃏', text: 'Colis' },
    card2: { emoji: '🃏', text: 'Paquet a envoyer' },
    explication: 'Un colis est un paquet envoye par la poste.'
  },
  {
    category: 'Assurance',
    difficulty: 'hard',
    theme: 'sante',
    isPair: true,
    card1: { emoji: '🃏', text: 'Franchise' },
    card2: { emoji: '🃏', text: 'Montant paye avant remboursement' },
    explication: 'La franchise est la part payee avant certains remboursements.'
  },
  {
    category: 'Logement',
    difficulty: 'hard',
    theme: 'logement',
    isPair: true,
    card1: { emoji: '🃏', text: 'Etat des lieux' },
    card2: { emoji: '🃏', text: 'Controle du logement' },
    explication: 'L etat des lieux verifie l etat du logement.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    isPair: true,
    card1: { emoji: '🃏', text: 'Confirmer' },
    card2: { emoji: '🃏', text: 'Dire que la date convient' },
    explication: 'Confirmer signifie accepter le moment propose.'
  },
  {
    category: 'Courses',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    isPair: true,
    card1: { emoji: '🃏', text: 'Promotion' },
    card2: { emoji: '🃏', text: 'Reduction temporaire' },
    explication: 'Une promotion baisse le prix pendant une periode limitee.'
  },
  {
    category: 'Poste',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    isPair: false,
    card1: { emoji: '🃏', text: 'Colis' },
    card2: { emoji: '🃏', text: 'Consultation medicale' },
    explication: 'Un colis appartient a la poste, pas a la sante.'
  },
  {
    category: 'Assurance',
    difficulty: 'hard',
    theme: 'sante',
    isPair: false,
    card1: { emoji: '🃏', text: 'Franchise' },
    card2: { emoji: '🃏', text: 'Quai de gare' },
    explication: 'La franchise concerne l assurance, pas les transports.'
  },
  {
    category: 'Logement',
    difficulty: 'hard',
    theme: 'logement',
    isPair: false,
    card1: { emoji: '🃏', text: 'Etat des lieux' },
    card2: { emoji: '🃏', text: 'Ordonnance' },
    explication: 'L etat des lieux concerne le logement, pas la pharmacie.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    isPair: false,
    card1: { emoji: '🃏', text: 'Confirmer' },
    card2: { emoji: '🃏', text: 'Partir sans prevenir' },
    explication: 'Confirmer ne veut pas dire disparaitre sans message.'
  },
  {
    category: 'Courses',
    difficulty: 'medium',
    theme: 'vie-quotidienne',
    isPair: false,
    card1: { emoji: '🃏', text: 'Promotion' },
    card2: { emoji: '🃏', text: 'Produit toujours gratuit' },
    explication: 'Une promotion est une reduction, pas forcement la gratuite.'
  }
);

pack.datasets.CHERCHE_CLIQUE_DATA.push(
  { id: 'post', icon: '📮', label: 'Poste', category: 'Poste', difficulty: 'easy', theme: 'vie-quotidienne' },
  { id: 'parcel', icon: '📦', label: 'Colis', category: 'Poste', difficulty: 'medium', theme: 'vie-quotidienne' },
  { id: 'letter', icon: '✉️', label: 'Lettre', category: 'Poste', difficulty: 'easy', theme: 'vie-quotidienne' },
  { id: 'pharmacist', icon: '👨‍⚕️', label: 'Pharmacien', category: 'Sante', difficulty: 'medium', theme: 'sante' },
  { id: 'insurance_card', icon: '🪪', label: 'Carte d assure', category: 'Assurance', difficulty: 'medium', theme: 'sante' },
  { id: 'franchise', icon: '📄', label: 'Franchise', category: 'Assurance', difficulty: 'hard', theme: 'sante' },
  { id: 'guarantee', icon: '🏦', label: 'Depot de garantie', category: 'Logement', difficulty: 'hard', theme: 'logement' },
  { id: 'inventory', icon: '📝', label: 'Etat des lieux', category: 'Logement', difficulty: 'hard', theme: 'logement' },
  { id: 'agency', icon: '🏢', label: 'Regie', category: 'Logement', difficulty: 'medium', theme: 'logement' },
  { id: 'platform', icon: '🚉', label: 'Correspondance', category: 'Transports', difficulty: 'hard', theme: 'transports' }
);

fs.writeFileSync(filePath, JSON.stringify(pack, null, 2) + '\n', 'utf8');
console.log('pack-cecrl-base.json enriched round 6');
