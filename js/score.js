'use strict';

(function initScoreManager() {
  const STORAGE_KEY = 'ah:scores:v1';
  const LEVEL_KEY = 'ah:preferred-level';
  const STATUS_ORDER = { not_started: 0, in_progress: 1, completed: 2 };
  const LEVEL_THRESHOLDS = [0, 50, 150, 350, 600, 900, 1300, 1800, 2400, 3100];

  function normalizePreferredLevel(value) {
    const normalized = String(value || '').trim().toUpperCase();
    return ['A1', 'A2', 'B1'].includes(normalized) ? normalized : '';
  }

  function getStorageKey() {
    if (!window.localStorage) return STORAGE_KEY;
    const preferredLevel = normalizePreferredLevel(localStorage.getItem(LEVEL_KEY));
    return preferredLevel ? STORAGE_KEY + ':' + preferredLevel.toLowerCase() : STORAGE_KEY;
  }

  function levelInfo(xp) {
    const x = Math.max(0, Number(xp) || 0);
    let levelIndex = 0;
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i -= 1) {
      if (x >= LEVEL_THRESHOLDS[i]) { levelIndex = i; break; }
    }
    const levelStart = LEVEL_THRESHOLDS[levelIndex];
    const nextThreshold = LEVEL_THRESHOLDS[levelIndex + 1];
    const isMaxLevel = nextThreshold === undefined;
    return {
      level: levelIndex + 1,
      label: 'Niv. ' + (levelIndex + 1),
      isMaxLevel,
      xpIntoLevel: x - levelStart,
      xpForNextLevel: isMaxLevel ? 0 : nextThreshold - levelStart,
      progressPct: isMaxLevel ? 100 : Math.round(((x - levelStart) / (nextThreshold - levelStart)) * 100)
    };
  }

  function safeParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function defaultMetrics() {
    return {
      correct: 0,
      typed: 0,
      errors: 0,
      xp: 0,
      status: 'not_started',
      votes: { like: 0, dislike: 0 }
    };
  }

  function readStore() {
    if (!window.localStorage) return { scores: {}, sessions: [] };
    const parsed = safeParse(localStorage.getItem(getStorageKey()), { scores: {}, sessions: [] });
    if (!parsed || typeof parsed !== 'object') return { scores: {}, sessions: [] };
    if (!parsed.scores || typeof parsed.scores !== 'object') parsed.scores = {};
    if (!Array.isArray(parsed.sessions)) parsed.sessions = [];
    return parsed;
  }

  function writeStore(store) {
    if (!window.localStorage) return;
    localStorage.setItem(getStorageKey(), JSON.stringify(store));
  }

  function emitUpdate() {
    document.dispatchEvent(new CustomEvent('score:updated'));
  }

  function localDateKey(date) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function ensureMetrics(store, page) {
    if (!store.scores[page] || typeof store.scores[page] !== 'object') {
      store.scores[page] = defaultMetrics();
    }
    return store.scores[page];
  }

  const ScoreManager = {
    getLevelInfo(xp) {
      return levelInfo(xp);
    },

    readMetrics(page) {
      const store = readStore();
      return Object.assign(defaultMetrics(), ensureMetrics(store, page));
    },

    writeMetrics(page, data) {
      const store = readStore();
      const current = ensureMetrics(store, page);
      const next = Object.assign({}, current, data || {});
      next.correct = Math.max(0, Number(next.correct) || 0);
      next.typed = Math.max(0, Number(next.typed) || 0);
      next.errors = Math.max(0, Number(next.errors) || 0);
      next.xp = Math.max(0, Number(next.xp) || 0);
      next.status = STATUS_ORDER[next.status] !== undefined ? next.status : 'not_started';
      if (!next.votes || typeof next.votes !== 'object') next.votes = { like: 0, dislike: 0 };
      next.votes.like = Math.max(0, Number(next.votes.like) || 0);
      next.votes.dislike = Math.max(0, Number(next.votes.dislike) || 0);
      store.scores[page] = next;
      writeStore(store);
      emitUpdate();
    },

    updateMetrics(page, delta) {
      const current = this.readMetrics(page);
      this.writeMetrics(page, {
        correct: current.correct + (Number(delta && delta.correct) || 0),
        typed: current.typed + (Number(delta && delta.typed) || 0),
        errors: current.errors + (Number(delta && delta.errors) || 0),
        xp: current.xp + (Number(delta && delta.xp) || 0)
      });
    },

    promoteStatus(page, status) {
      if (STATUS_ORDER[status] === undefined) return;
      const current = this.readMetrics(page);
      if (STATUS_ORDER[status] >= STATUS_ORDER[current.status]) {
        this.writeMetrics(page, { status });
      }
    },

    getAllData() {
      return readStore().scores;
    },

    getGlobalSummary(pages) {
      const all = this.getAllData();
      const targets = Array.isArray(pages) && pages.length ? pages : Object.keys(all);
      let totalCorrect = 0;
      let totalTyped = 0;
      let totalErrors = 0;
      let totalXp = 0;
      let completed = 0;
      let inProgress = 0;

      for (const p of targets) {
        const m = Object.assign(defaultMetrics(), all[p] || {});
        totalCorrect += m.correct;
        totalTyped += m.typed;
        totalErrors += m.errors;
        totalXp += m.xp;
        if (m.status === 'completed') completed += 1;
        if (m.status === 'in_progress') inProgress += 1;
      }

      return {
        totalCorrect,
        totalTyped,
        totalErrors,
        totalXp,
        accuracy: totalTyped > 0 ? Math.round((totalCorrect / totalTyped) * 100) : 0,
        completed,
        inProgress,
        level: levelInfo(totalXp).level
      };
    },

    pushSessionHistory(session) {
      const store = readStore();
      store.sessions.unshift({
        timestamp: Date.now(),
        gameName: session && session.name ? session.name : (session && session.page) || 'Exercice',
        xp: Number(session && session.xp) || 0,
        correct: Number(session && session.correct) || 0,
        typed: Number(session && session.typed) || 0,
        errors: Number(session && session.errors) || 0,
        page: (session && session.page) || ''
      });
      store.sessions = store.sessions.slice(0, 200);
      writeStore(store);
      emitUpdate();
    },

    getSessionHistory() {
      return readStore().sessions.slice(0, 5);
    },

    getDailyXP(days) {
      const count = Math.max(1, Number(days) || 7);
      const now = new Date();
      const sessions = readStore().sessions;
      const byDay = new Map();
      for (const s of sessions) {
        const d = new Date(s.timestamp || 0);
        const key = localDateKey(d);
        byDay.set(key, (byDay.get(key) || 0) + (Number(s.xp) || 0));
      }
      const result = [];
      for (let i = count - 1; i >= 0; i -= 1) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const key = localDateKey(d);
        result.push({
          key,
          label: d.toLocaleDateString('fr-CH', { weekday: 'short' }),
          xp: byDay.get(key) || 0
        });
      }
      return result;
    },

    getStreakData() {
      const sessions = readStore().sessions;
      const daysWithXp = new Set();
      for (const s of sessions) {
        if ((Number(s.xp) || 0) > 0) {
          daysWithXp.add(localDateKey(new Date(s.timestamp || 0)));
        }
      }
      const sorted = Array.from(daysWithXp).sort();
      let best = 0;
      let run = 0;
      let prev = null;
      for (const day of sorted) {
        if (!prev) {
          run = 1;
        } else {
          const a = new Date(prev + 'T00:00:00Z').getTime();
          const b = new Date(day + 'T00:00:00Z').getTime();
          run = (b - a === 86400000) ? run + 1 : 1;
        }
        if (run > best) best = run;
        prev = day;
      }

      let current = 0;
      const today = localDateKey(new Date());
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = localDateKey(yesterdayDate);
      if (daysWithXp.has(today) || daysWithXp.has(yesterday)) {
        let cursor = daysWithXp.has(today) ? new Date() : yesterdayDate;
        while (true) {
          const key = localDateKey(cursor);
          if (!daysWithXp.has(key)) break;
          current += 1;
          cursor.setDate(cursor.getDate() - 1);
        }
      }

      return { current, best };
    },

    exportStore() {
      const store = readStore();
      return {
        scores: store.scores,
        sessions: store.sessions
      };
    },

    importStore(data) {
      if (!data || typeof data !== 'object') return false;
      const payload = {
        scores: (data.scores && typeof data.scores === 'object') ? data.scores : {},
        sessions: Array.isArray(data.sessions) ? data.sessions : []
      };
      writeStore(payload);
      emitUpdate();
      return true;
    },

    reset() {
      writeStore({ scores: {}, sessions: [] });
      emitUpdate();
    }
  };

  window.ScoreManager = ScoreManager;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').catch(function() {
        /* Le site reste fonctionnel sans cache hors ligne. */
      });
    });
  }
})();
