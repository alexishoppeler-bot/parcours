# Packs De Contenu

Le contenu pedagogique de la plateforme peut etre centralise dans un seul fichier JSON.

Fichiers principaux :

- `pack-cecrl-base.json` : source de verite actuelle
- `STRUCTURE-VIE-QUOTIDIENNE-SUISSE.md` : plan de reference pour organiser A1 / A2 / B1 autour de la vie quotidienne en Suisse
- `node qa/export-content-pack.js` : exporte l'etat courant vers un pack
- `node qa/make-level-packs.js` : genere directement `pack-cecrl-a1.json`, `pack-cecrl-a2.json` et `pack-cecrl-b1.json`
- `node qa/sync-content-pack.js content/pack-cecrl-base.json` : regenere `js/data/*.js`, `js/exercises-config.js` et les profils de niveau
- `node qa/clone-content-pack.js content/pack-cecrl-base.json "CECRL A2"` : cree une copie editable

Workflow recommande :

1. Modifier un pack JSON dans `content/`
2. Lancer `node qa/sync-content-pack.js <pack>`
3. Lancer `node qa/validate-content.js`
4. Lancer `node qa/test-games-cdp.js`

Generation rapide des packs standards :

```bash
node qa/make-level-packs.js
```
