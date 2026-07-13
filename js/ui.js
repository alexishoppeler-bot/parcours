'use strict';

(function initUIHelpers() {
  function getText(id) {
    const el = document.getElementById(id);
    return el ? el.textContent.trim() : '';
  }

  function parseIntSafe(v) {
    const n = parseInt((v || '').replace(/[^0-9-]/g, ''), 10);
    return Number.isFinite(n) ? n : 0;
  }

  function firstText(ids) {
    for (let i = 0; i < ids.length; i += 1) {
      const value = getText(ids[i]);
      if (value) return value;
    }
    return '';
  }

  function resolveResultStats() {
    const correctText = firstText(['resCorrect', 'resWon', 'sc-ok']);
    const errorsText = firstText(['resErrors', 'resLost', 'sc-err']);
    const xpText = firstText(['resXP', 'sc-xp']);
    const accuracyText = firstText(['resAccuracy']);

    const correct = parseIntSafe(correctText);
    const errors = parseIntSafe(errorsText);
    let accuracy = parseIntSafe(accuracyText);

    if (!accuracy && (correct > 0 || errors > 0)) {
      accuracy = Math.round((correct / Math.max(1, correct + errors)) * 100);
    }

    return {
      correct,
      errors,
      xp: parseIntSafe(xpText),
      accuracy
    };
  }

  function bindShareButtons() {
    const buttons = document.querySelectorAll('.btn-share');
    if (!buttons.length || typeof copyResultSummary !== 'function') return;

    const pageTitle = (document.querySelector('h1') && document.querySelector('h1').textContent.trim()) || 'Exercice';

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => copyResultSummary(pageTitle, resolveResultStats()));
    });
  }

  document.addEventListener('DOMContentLoaded', bindShareButtons);
})();
