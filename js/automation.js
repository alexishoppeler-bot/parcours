'use strict';

(function initPlatformAutomation(global) {
  const STORE_KEY = 'ah:automation:v2';
  const LEVEL_KEY = 'ah:preferred-level';
  const STORE_VERSION = 2;
  const DIFFICULTIES = ['easy', 'medium', 'hard'];
  const CEFR_PROFILES = {
  "A1": {
    "label": "A1",
    "allowedDifficulties": [
      "easy"
    ],
    "sessionLengths": {
      "jeu-alphabet": 4,
      "jeu-anagramme": 6,
      "jeu-apparier": 3,
      "jeu-cherche-clique": 5,
      "jeu-classement": 4,
      "jeu-demeler": 4,
      "jeu-mots-croises": 2,
      "jeu-mots-meles": 2,
      "jeu-paire": 6,
      "jeu-pendu": 6,
      "jeu-quiz": 5,
      "jeu-vrai-faux": 5
    }
  },
  "A2": {
    "label": "A2",
    "allowedDifficulties": [
      "easy",
      "medium"
    ],
    "sessionLengths": {
      "jeu-alphabet": 5,
      "jeu-anagramme": 8,
      "jeu-apparier": 4,
      "jeu-cherche-clique": 6,
      "jeu-classement": 5,
      "jeu-demeler": 6,
      "jeu-mots-croises": 3,
      "jeu-mots-meles": 3,
      "jeu-paire": 8,
      "jeu-pendu": 8,
      "jeu-quiz": 6,
      "jeu-vrai-faux": 6
    }
  },
  "B1": {
    "label": "B1",
    "allowedDifficulties": [
      "medium",
      "hard"
    ],
    "sessionLengths": {
      "jeu-alphabet": 6,
      "jeu-anagramme": 10,
      "jeu-apparier": 5,
      "jeu-cherche-clique": 8,
      "jeu-classement": 6,
      "jeu-demeler": 8,
      "jeu-mots-croises": 4,
      "jeu-mots-meles": 4,
      "jeu-paire": 10,
      "jeu-pendu": 10,
      "jeu-quiz": 8,
      "jeu-vrai-faux": 8
    }
  }
};
  const DATASETS = {
    'jeu-alphabet': 'ALPHABET_DATA', 'jeu-anagramme': 'ANAGRAMME_DATA',
    'jeu-apparier': 'APPARIER_DATA', 'jeu-cherche-clique': 'CHERCHE_CLIQUE_DATA',
    'jeu-classement': 'CLASSEMENT_DATA', 'jeu-demeler': 'DEMELER_DATA',
    'jeu-mots-croises': 'MOTS_CROISES_DATA', 'jeu-mots-meles': 'MOTS_MELES_DATA',
    'jeu-paire': 'PAIRE_DATA', 'jeu-pendu': 'PENDU_DATA',
    'jeu-quiz': 'QUIZ_DATA', 'jeu-vrai-faux': 'VRAI_FAUX_DATA'
  };

  function pageId() { return (location.pathname.split('/').pop() || '').replace(/\.html$/i, '') || 'accueil'; }
  function getPreferredLevel() { return normalizeCefr(global.localStorage && localStorage.getItem(LEVEL_KEY)); }
  function getScopedStoreKey() {
    const preferredLevel = getPreferredLevel();
    return preferredLevel ? STORE_KEY + ':' + preferredLevel.toLowerCase() : STORE_KEY;
  }
  function setPreferredLevel(level) {
    const normalized = normalizeCefr(level);
    if (!global.localStorage || !normalized) return false;
    localStorage.setItem(LEVEL_KEY, normalized);
    document.dispatchEvent(new CustomEvent('level:changed', { detail: { level: normalized } }));
    return true;
  }
  function readStore() {
    try {
      const parsed = JSON.parse(localStorage.getItem(getScopedStoreKey()) || 'null');
      if (parsed && parsed.version === STORE_VERSION) return parsed;
      if (parsed && parsed.sessions) return { version: STORE_VERSION, sessions: parsed.sessions, lastPage: parsed.lastPage || '' };
    } catch (_) { /* ignore malformed legacy state */ }
    return { version: STORE_VERSION, sessions: {}, lastPage: '' };
  }
  function writeStore(store) { localStorage.setItem(getScopedStoreKey(), JSON.stringify(store)); }
  function seeded(seed) {
    let value = Number(seed) || Date.now();
    return () => ((value = (value * 1664525 + 1013904223) >>> 0) / 4294967296);
  }
  function shuffle(items, random) {
    const out = items.slice();
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
    return out;
  }
  function normalizeCefr(level) {
    const normalized = String(level || '').trim().toUpperCase();
    if (normalized === 'B1') return 'B1';
    if (normalized === 'A2') return 'A2';
    return '';
  }
  function inferCefrFromMetrics(game) {
    const metrics = global.ScoreManager && typeof global.ScoreManager.readMetrics === 'function'
      ? global.ScoreManager.readMetrics(game)
      : { typed: 0, correct: 0 };
    const attempts = Number(metrics && metrics.typed) || 0;
    const accuracy = attempts > 0 ? Math.round(((Number(metrics.correct) || 0) / attempts) * 100) : 0;
    return accuracy >= 78 ? 'B1' : 'A2';
  }
  function matchDifficulty(item, allowedDifficulties) {
    if (!item || !allowedDifficulties || !allowedDifficulties.length) return true;
    const difficulty = item.difficulty;
    if (!difficulty) return true;
    return allowedDifficulties.includes(difficulty);
  }

  const ContentProfiles = {
    getLevel(game, requestedLevel) {
      const normalized = normalizeCefr(requestedLevel) || getPreferredLevel();
      return normalized || inferCefrFromMetrics(game);
    },
    getProfile(game, requestedLevel) {
      const level = this.getLevel(game, requestedLevel);
      return Object.assign({ level }, CEFR_PROFILES[level] || CEFR_PROFILES.A2);
    },
    getSessionLength(game, requestedLevel, fallbackLength) {
      const profile = this.getProfile(game, requestedLevel);
      return profile.sessionLengths[game] || fallbackLength || 0;
    },
    buildSessionPool(game, items, options) {
      const opts = Object.assign({ level: '', length: 0, seed: Date.now() }, options || {});
      const source = Array.isArray(items) ? items.slice() : [];
      const profile = this.getProfile(game, opts.level);
      let pool = source.filter((item) => matchDifficulty(item, profile.allowedDifficulties));
      if (!pool.length) pool = source.slice();
      const limit = Math.max(1, Number(opts.length) || this.getSessionLength(game, profile.level, source.length) || source.length || 1);
      return { level: profile.level, cefr: profile.label, items: shuffle(pool, seeded(opts.seed)).slice(0, Math.min(limit, pool.length || limit)) };
    }
  };

  const ContentGenerator = {
    generate(options) {
      const opts = Object.assign({ length: 10, seed: Date.now() }, options || {});
      const datasetName = DATASETS[opts.game];
      const source = datasetName && Array.isArray(global[datasetName]) ? global[datasetName] : [];
      const difficultyRank = DIFFICULTIES.indexOf(opts.difficulty || opts.level);
      let pool = source.filter(item => {
        const themeOk = !opts.theme || item.theme === opts.theme || item.category === opts.theme;
        const itemRank = DIFFICULTIES.indexOf(item.difficulty);
        return themeOk && (difficultyRank < 0 || itemRank < 0 || itemRank <= difficultyRank);
      });
      if (!pool.length) pool = source.slice();
      const items = shuffle(pool, seeded(opts.seed)).slice(0, Math.max(1, Number(opts.length) || 10));
      return { id: `${opts.game}-${opts.seed}`, game: opts.game, seed: opts.seed, generatedAt: Date.now(), items };
    },
    availableGames() { return Object.keys(DATASETS).filter(game => Array.isArray(global[DATASETS[game]])); }
  };

  function hasBrokenEncoding(value) { return typeof value === 'string' && /A[©¨ª´¹¢‰€§®]|a[€™”“¦]|ðY|�/.test(value); }
  function walk(value, visit, path) {
    visit(value, path || '$');
    if (Array.isArray(value)) value.forEach((item, i) => walk(item, visit, `${path || '$'}[${i}]`));
    else if (value && typeof value === 'object') Object.keys(value).forEach(key => walk(value[key], visit, `${path || '$'}.${key}`));
  }
  const ContentValidator = {
    validateGame(game) {
      const name = DATASETS[game], data = name && global[name];
      const issues = [];
      if (!Array.isArray(data) || !data.length) return { game, valid: false, issues: [{ severity: 'error', code: 'EMPTY_DATASET', path: '$' }] };
      const seen = new Set();
      data.forEach((item, index) => {
        if (!item || typeof item !== 'object') issues.push({ severity: 'error', code: 'INVALID_ITEM', path: `$[${index}]` });
        const signature = JSON.stringify(item);
        if (seen.has(signature)) issues.push({ severity: 'warning', code: 'DUPLICATE', path: `$[${index}]` });
        seen.add(signature);
        if (item && item.difficulty && !DIFFICULTIES.includes(item.difficulty)) issues.push({ severity: 'warning', code: 'UNKNOWN_DIFFICULTY', path: `$[${index}].difficulty` });
      });
      walk(data, (value, path) => {
        if (hasBrokenEncoding(value)) issues.push({ severity: 'error', code: 'BROKEN_ENCODING', path, value: String(value).slice(0, 80) });
        if (typeof value === 'string' && value.length > 240) issues.push({ severity: 'warning', code: 'LONG_TEXT', path, length: value.length });
      });
      return { game, dataset: name, count: data.length, valid: !issues.some(i => i.severity === 'error'), issues };
    },
    validateAll() {
      const games = ContentGenerator.availableGames();
      const reports = games.map(game => this.validateGame(game));
      return { generatedAt: new Date().toISOString(), valid: reports.every(r => r.valid), games: reports, issueCount: reports.reduce((n, r) => n + r.issues.length, 0) };
    }
  };

  const adapters = {};
  const SessionStore = {
    registerAdapter(game, adapter) { adapters[game] = adapter; },
    save(game, state) {
      const store = readStore();
      store.sessions[game] = { version: 1, savedAt: Date.now(), state };
      store.lastPage = game; writeStore(store); return store.sessions[game];
    },
    load(game) { return readStore().sessions[game] || null; },
    clear(game) { const store = readStore(); delete store.sessions[game]; if (store.lastPage === game) store.lastPage = ''; writeStore(store); },
    getLastSession() { const store = readStore(); return store.lastPage ? Object.assign({ game: store.lastPage }, store.sessions[store.lastPage]) : null; },
    export() { return readStore(); },
    import(payload) { if (!payload || typeof payload !== 'object' || !payload.sessions) return false; writeStore({ version: STORE_VERSION, sessions: payload.sessions, lastPage: payload.lastPage || '' }); return true; },
    capture(game) {
      const adapter = adapters[game];
      if (adapter && adapter.capture) return this.save(game, adapter.capture());
      const fields = {};
      document.querySelectorAll('input,select,textarea').forEach((el, i) => { fields[el.id || el.name || `field-${i}`] = el.type === 'checkbox' ? el.checked : el.value; });
      return this.save(game, { url: location.href, scrollY: global.scrollY, fields });
    },
    restore(game) {
      const saved = this.load(game); if (!saved) return false;
      const adapter = adapters[game];
      if (adapter && adapter.restore) adapter.restore(saved.state);
      else if (saved.state && saved.state.fields) document.querySelectorAll('input,select,textarea').forEach((el, i) => {
        const key = el.id || el.name || `field-${i}`; if (!(key in saved.state.fields)) return;
        if (el.type === 'checkbox') el.checked = !!saved.state.fields[key]; else el.value = saved.state.fields[key];
      });
      if (saved.state && Number.isFinite(saved.state.scrollY)) global.scrollTo(0, saved.state.scrollY);
      document.dispatchEvent(new CustomEvent('automation:session-restored', { detail: saved })); return true;
    }
  };

  function initAutosave() {
    const game = pageId(); if (!DATASETS[game]) return;
    let timer;
    const schedule = () => { clearTimeout(timer); timer = setTimeout(() => SessionStore.capture(game), 350); };
    document.addEventListener('input', schedule, true); document.addEventListener('change', schedule, true);
    document.addEventListener('click', schedule, true); global.addEventListener('pagehide', () => SessionStore.capture(game));
    if (new URLSearchParams(location.search).get('resume') === '1') {
      setTimeout(() => SessionStore.restore(game), 0);
    }
  }

  global.ContentGenerator = ContentGenerator;
  global.ContentValidator = ContentValidator;
  global.ContentProfiles = ContentProfiles;
  global.ContentProfiles.getPreferredLevel = getPreferredLevel;
  global.ContentProfiles.setPreferredLevel = setPreferredLevel;
  global.SessionStore = SessionStore;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAutosave, { once: true }); else initAutosave();
})(window);
