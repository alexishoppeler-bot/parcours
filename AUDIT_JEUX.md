# Audit QA du parcours de jeux

Date: 2026-07-12

Portée:
- audit structurel des pages `jeu-*.html` et des utilitaires communs;
- corrections de cohérence inter-jeux;
- campagne de tests navigateur automatisée sur l’ensemble des jeux.

## Corrections réalisées

### 1. Partage des résultats
- Le bouton `Copier mon résumé` lit maintenant les vraies statistiques au moment du clic.
- Le helper supporte les variantes d’identifiants de résultats encore présentes dans certains écrans.
- Référence:
  - `js/ui.js`

### 2. Navigation de fin de parcours
- Le bouton `Exercice suivant` ne reboucle plus du dernier jeu vers le premier.
- Référence:
  - `js/exercise-utils.js`

### 3. Lifecycle de session uniformisé
- Les jeux démarrent maintenant via `startExerciseSession(PAGE_ID)`.
- Les écrans de fin passent par `endExerciseSession(PAGE_ID)`.
- Effet:
  - historique de session plus cohérent;
  - panneau pédagogique plus fiable;
  - rejouabilité stabilisée.

### 4. Contrat de résultats rapproché
- `jeu-pendu.html` expose un bloc de résultats compatible avec les helpers communs.
- `jeu-quiz.html` et `jeu-vrai-faux.html` exposent `resAccuracy`.
- `jeu-demeler.html` utilise un bloc final standardisé.

### 5. Règles XP réactivées
- `showXPRules()` n’est plus un no-op.
- La fonction lit les règles depuis `EXERCISE_CONFIG` et affiche un rappel contextualisé.
- Référence:
  - `js/exercise-utils.js`

### 6. Tests automatiques ajoutés
- Ajout de hooks `window.__GAME_TEST_API__` sur les jeux qui en avaient besoin pour permettre une exécution complète automatisée.
- Ajout du runner `qa/test-games-cdp.js` pour piloter les jeux dans Chrome headless via CDP.
- Le runner purge maintenant l’état navigateur au démarrage et attend la stabilisation du header XP avant capture.

### 7. Nettoyage d’encodage
- Correction des chaînes visibles mal encodées dans les pages de jeux, notamment `jeu-cherche-clique.html`.
- Correction des messages de secours restants dans `jeu-anagramme.html`, `jeu-mots-meles.html` et `jeu-mots-croises.html`.

### 8. Cohérence des métriques XP
- Correction de `jeu-pendu.html` pour ne plus enregistrer les erreurs cumulées comme delta à chaque mot.
- Le cumul de l’en-tête XP et le total calculé par `ScoreManager` sont maintenant alignés sur la campagne QA finale.

## Validation effectuée

Campagne exécutée:
- `node qa/test-games-cdp.js`

Résultat:
- 12 jeux testés;
- 12 jeux terminent correctement;
- aucune exception JavaScript remontée pendant la campagne finale.

Jeux validés:
1. `jeu-alphabet.html`
2. `jeu-pendu.html`
3. `jeu-mots-meles.html`
4. `jeu-anagramme.html`
5. `jeu-apparier.html`
6. `jeu-paire.html`
7. `jeu-demeler.html`
8. `jeu-cherche-clique.html`
9. `jeu-vrai-faux.html`
10. `jeu-quiz.html`
11. `jeu-classement.html`
12. `jeu-mots-croises.html`

## Points restant à surveiller

### 1. Données textuelles communes
- Quelques fichiers JS de données et de contenus partagés méritent encore une revue dédiée d’encodage et de normalisation éditoriale.
- Ce point n’a pas bloqué l’exécution automatique des jeux testés.

### 2. Valeur XP de l’en-tête en contexte headless
- Point résolu dans cette passe.
- La dérive observée venait du protocole de test et d’un partage d’état entre campagnes concurrentes, pas du calcul applicatif final.
