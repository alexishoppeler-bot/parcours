'use strict';

(function initGamePlatform() {
  const levelKey = 'ah:preferred-level';
  const allowedLevels = ['A1', 'A2', 'B1'];

  function normalizeLevel(value) {
    const normalized = String(value || '').trim().toUpperCase();
    return allowedLevels.includes(normalized) ? normalized : 'A2';
  }

  function getPreferredLevel() {
    return normalizeLevel(localStorage.getItem(levelKey));
  }

  function setPreferredLevel(level) {
    localStorage.setItem(levelKey, normalizeLevel(level));
  }

  function animateCount(el, to) {
    if (!el) return;
    const from = parseInt(el.textContent, 10) || 0;
    const target = Math.max(0, Number(to) || 0);
    if (from === target) {
      el.textContent = String(target);
      return;
    }

    if (el.__countFrame) {
      cancelAnimationFrame(el.__countFrame);
      el.__countFrame = 0;
    }

    const duration = Math.min(700, Math.max(200, Math.abs(target - from) * 12));
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (target - from) * eased);
      el.textContent = String(value);

      if (progress < 1) {
        el.__countFrame = requestAnimationFrame(step);
      } else {
        el.__countFrame = 0;
      }
    }

    el.__countFrame = requestAnimationFrame(step);
  }

  function bindLevelButtons(currentLevel) {
    document.querySelectorAll('.journey-level-btn').forEach((button) => {
      const level = normalizeLevel(button.dataset.level);
      const target = String(button.dataset.target || '').trim();
      button.classList.toggle('is-active', level === currentLevel);
      button.addEventListener('click', () => {
        setPreferredLevel(level);
        if (target) {
          window.location.href = target;
        }
      });
    });
  }

  function readMetricsFor(card) {
    if (!window.ScoreManager) return null;
    const gameId = String(card.dataset.game || '').trim();
    if (!gameId) return null;
    return window.ScoreManager.readMetrics(gameId);
  }

  function renderRoutePage() {
    const cards = Array.from(document.querySelectorAll('.game-card'));
    if (!cards.length || !window.ScoreManager) return;

    let completed = 0;
    let totalXp = 0;
    let currentCard = null;

    cards.forEach((card) => {
      const metrics = readMetricsFor(card) || { xp: 0, status: 'not_started' };
      const isCompleted = metrics.status === 'completed';

      totalXp += Number(metrics.xp) || 0;
      card.classList.toggle('is-complete', isCompleted);
      card.classList.remove('is-current');

      if (isCompleted) {
        completed += 1;
      } else if (!currentCard) {
        currentCard = card;
      }
    });

    if (!currentCard) {
      currentCard = cards[cards.length - 1];
    }

    if (currentCard) currentCard.classList.add('is-current');

    const total = cards.length;
    const remaining = Math.max(0, total - completed);
    const percent = total ? Math.round((completed / total) * 100) : 0;
    const currentLabel = currentCard ? currentCard.querySelector('strong') : null;
    const continueLink = document.getElementById('continue-link');

    const completedCount = document.getElementById('completed-count');
    const totalGames = document.getElementById('total-games');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const remainingCount = document.getElementById('remaining-count');
    const currentCardState = document.getElementById('current-card-state');
    const continueLabel = document.getElementById('continue-label');
    const headerXp = document.getElementById('header-xp');
    const progressHint = document.getElementById('progress-hint');

    if (completedCount) completedCount.textContent = String(completed);
    if (totalGames) totalGames.textContent = String(total);
    if (progressPercent) progressPercent.textContent = percent + '%';
    if (progressBar) progressBar.style.width = percent + '%';
    if (remainingCount) remainingCount.textContent = String(remaining);
    if (headerXp) animateCount(headerXp, totalXp);

    if (currentCardState) {
      currentCardState.textContent = completed >= total ? 'Parcours termine' : 'A jouer';
    }

    if (continueLabel && currentLabel) {
      continueLabel.textContent = currentLabel.textContent;
    }

    if (continueLink && currentCard) {
      continueLink.href = currentCard.getAttribute('href') || 'jeu-alphabet.html';
    }

    if (progressHint) {
      progressHint.textContent = remaining > 0
        ? remaining + ' bulles a explorer'
        : 'Toutes les bulles sont terminees';
    }
  }

  function init() {
    const bodyLevel = document.body.dataset.preferredLevel;
    if (bodyLevel) {
      setPreferredLevel(bodyLevel);
    }

    const currentLevel = bodyLevel ? normalizeLevel(bodyLevel) : getPreferredLevel();
    bindLevelButtons(currentLevel);
    renderRoutePage();
    document.addEventListener('score:updated', renderRoutePage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
