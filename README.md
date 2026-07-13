# Autonomie - parcours de jeux

Plateforme web statique de jeux interactifs en francais. Le parcours anime propose 12 jeux, avec progression et XP stockes localement dans le navigateur.

## Caracteristiques

- Fonctionne sans backend ni base de donnees.
- Progression et scores enregistres dans `localStorage`.
- Parcours filtrable par niveau A1, A2 et B1.
- Service Worker prevu pour le fonctionnement hors ligne.

## Lancer le site

Servez le dossier avec un serveur HTTP statique, par exemple :

```bash
python -m http.server 8080
```

Puis ouvrez `http://localhost:8080/`.

## Structure

- `accueil.html` - carte animee du parcours
- `jeu-*.html` - jeux disponibles
- `css/` - styles globaux
- `js/` - logique, scoring, progression et donnees
- `js/data/` - donnees generees pour chaque jeu
- `content/` - packs JSON centralises
- `qa/` - scripts de generation, validation et tests navigateur

## Validation Automatique

```bash
node qa/validate-content.js
```

Le rapport detaille est ecrit dans `qa/content-report.json`.

## Modifier Le Contenu Simplement

Le contenu peut maintenant etre pilote depuis un seul pack JSON.

Fichiers utiles :

- `content/pack-cecrl-base.json` - source unique du contenu
- `qa/export-content-pack.js` - exporte l'etat courant vers un pack
- `qa/sync-content-pack.js` - regenere `js/data/*.js`, `js/exercises-config.js` et les profils de niveau
- `qa/clone-content-pack.js` - cree une copie de pack pour un autre niveau

Workflow conseille :

```bash
node qa/clone-content-pack.js content/pack-cecrl-base.json "CECRL A2"
node qa/sync-content-pack.js content/pack-cecrl-a2.json
node qa/validate-content.js
node qa/test-games-cdp.js
```

Dans le pack, tu modifies :

- `profiles` - volumes de session et progression A2/B1
- `exercises` - titres, niveaux affiches, resumes, regles XP
- `datasets` - tout le contenu pedagogique des jeux

Lanceurs rapides Windows :

- `build-a1.cmd`
- `build-a2.cmd`
- `build-b1.cmd`
