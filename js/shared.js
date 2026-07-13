'use strict';

(function initSharedLayout() {
  var LEVEL_KEY = 'ah:preferred-level';

  function normalizePreferredLevel(value) {
    var normalized = String(value || '').trim().toUpperCase();
    return ['A1', 'A2', 'B1'].includes(normalized) ? normalized : 'A2';
  }

  function getPreferredLevel() {
    try {
      return normalizePreferredLevel(localStorage.getItem(LEVEL_KEY));
    } catch (_) {
      return 'A2';
    }
  }

  function getLevelRoute(level) {
    return 'parcours-' + normalizePreferredLevel(level).toLowerCase() + '.html';
  }

  function applyLevelTheme() {
    var level = getPreferredLevel();
    document.body.classList.remove('level-a1', 'level-a2', 'level-b1');
    document.body.classList.add('level-' + level.toLowerCase());
    document.body.dataset.preferredLevel = level;
    return level;
  }

  function currentPageId() {
    var file = window.location.pathname.split('/').pop() || '';
    var page = file.replace(/\.html$/i, '') || 'accueil';
    try {
      return decodeURIComponent(page);
    } catch (_) {
      return page;
    }
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function(char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[char];
    });
  }

  function animateCount(el, to) {
    if (!el) return;
    var from = parseInt(el.textContent, 10) || 0;
    var target = Math.max(0, Number(to) || 0);
    if (from === target) return;

    if (el.__xpAnimFrame) {
      cancelAnimationFrame(el.__xpAnimFrame);
      el.__xpAnimFrame = 0;
    }

    var duration = Math.min(800, Math.max(200, Math.abs(target - from) * 10));
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(from + (target - from) * eased);
      el.textContent = String(Math.max(0, value));

      if (progress < 1) {
        el.__xpAnimFrame = requestAnimationFrame(step);
      } else {
        el.__xpAnimFrame = 0;
      }
    }

    el.__xpAnimFrame = requestAnimationFrame(step);
  }

  function renderHeader() {
    var slot = document.getElementById('header-slot');
    if (!slot) return;
    var level = getPreferredLevel();
    var routeHref = getLevelRoute(level);

    slot.insertAdjacentHTML('beforebegin', '<a href="#main" class="skip-link">Aller au contenu</a>');
    slot.innerHTML =
      '<header class="platform-header game-platform-header">' +
        '<a href="' + routeHref + '" class="platform-brand" aria-label="Retour au parcours">' +
          '<span class="platform-brand-mark"><img src="assets/logo.png" alt=""></span>' +
          '<span>Parcours ' + escapeHtml(level) + '</span>' +
        '</a>' +
        '<a href="' + routeHref + '" class="game-header-back">Retour au parcours</a>' +
        '<div class="header-progress" aria-label="Progression globale">' +
          '<span><b id="headerCompletedCount">0</b>/<b id="headerTotalGames">12</b></span>' +
          '<div class="header-progress-track" aria-hidden="true"><span id="headerProgressBar"></span></div>' +
          '<span id="headerProgressPercent">0%</span>' +
        '</div>' +
        '<span class="header-xp" id="headerXpBadge"><b id="headerXpTotal">0</b> XP</span>' +
      '</header>';
  }

  function renderFooter() {
    var slot = document.getElementById('footer-slot');
    if (!slot) return;
    slot.innerHTML = "<footer class=\"site-footer\">Creation d'Alexis Hoppeler</footer>";
  }

  function updateHeaderProgress() {
    if (!window.ScoreManager || !window.EXERCISE_CONFIG) return;

    var orderedPages = window.EXERCISE_CONFIG.orderedPages || [];
    var totalXp = 0;
    var completed = 0;

    for (var i = 0; i < orderedPages.length; i += 1) {
      var metrics = window.ScoreManager.readMetrics(orderedPages[i]);
      totalXp += Number(metrics.xp) || 0;
      if (metrics.status === 'completed') completed += 1;
    }

    var total = orderedPages.length;
    var percent = total ? Math.round((completed / total) * 100) : 0;

    animateCount(document.getElementById('headerXpTotal'), totalXp);

    var completedEl = document.getElementById('headerCompletedCount');
    var totalEl = document.getElementById('headerTotalGames');
    var percentEl = document.getElementById('headerProgressPercent');
    var barEl = document.getElementById('headerProgressBar');

    if (completedEl) completedEl.textContent = String(completed);
    if (totalEl) totalEl.textContent = String(total);
    if (percentEl) percentEl.textContent = percent + '%';
    if (barEl) barEl.style.width = percent + '%';
  }

  function initConsigneAudio() {
    if (!('speechSynthesis' in window)) return;
    if (document.querySelector('.consigne-audio-btn')) return;

    var header = document.querySelector('.page-header');
    var title = header ? header.querySelector('h1') : document.querySelector('h1');
    if (!title) return;

    var parts = [title.textContent];
    if (header) {
      header.querySelectorAll('p').forEach(function(p) {
        parts.push(p.textContent);
      });
    }

    var intro = document.querySelector('.intro-card');
    if (intro) parts.push(intro.textContent);

    var text = parts.join('. ').replace(/\s+/g, ' ').trim();
    if (!text) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-secondary btn-sm consigne-audio-btn';
    btn.setAttribute('aria-label', 'Ecouter la consigne');
    btn.textContent = 'Ecouter la consigne';

    btn.addEventListener('click', function() {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        btn.classList.remove('speaking');
        return;
      }

      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.onend = function() { btn.classList.remove('speaking'); };
      utterance.onerror = function() { btn.classList.remove('speaking'); };

      btn.classList.add('speaking');
      window.speechSynthesis.speak(utterance);
    });

    if (header) header.appendChild(btn);
    else title.insertAdjacentElement('afterend', btn);
  }

  function init() {
    var level = applyLevelTheme();
    renderHeader();
    renderFooter();
    initConsigneAudio();
    document.querySelectorAll('a[href="accueil.html"]').forEach(function(link) {
      if (link.closest('.layout')) {
        link.setAttribute('href', getLevelRoute(level));
        if ((link.textContent || '').trim() === '← Accueil' || (link.textContent || '').trim() === 'Accueil' || (link.textContent || '').trim() === 'â† Accueil') {
          link.textContent = '← Parcours';
        }
      }
    });
    updateHeaderProgress();
    document.addEventListener('score:updated', updateHeaderProgress);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
