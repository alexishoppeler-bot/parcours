/* eslint-disable no-console */
'use strict';

const BASE_URL = 'http://127.0.0.1:8080';

const PAGES = [
  'jeu-alphabet.html',
  'jeu-pendu.html',
  'jeu-mots-meles.html',
  'jeu-anagramme.html',
  'jeu-apparier.html',
  'jeu-paire.html',
  'jeu-demeler.html',
  'jeu-cherche-clique.html',
  'jeu-vrai-faux.html',
  'jeu-quiz.html',
  'jeu-classement.html',
  'jeu-mots-croises.html'
];

const PLAYERS = {
  'jeu-alphabet.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let guard = 0; guard < 30 && session && session.active; guard += 1) {
        const sorted = sortAlphabetically(currentWords.slice());
        const list = document.getElementById('alphabetList');
        const byText = new Map([...list.children].map((el) => [el.textContent, el]));
        sorted.forEach((word) => {
          const el = byText.get(word);
          if (el) list.appendChild(el);
        });
        checkAnswer();
        await sleep(650);
      }
      return {
        done: !session.active,
        subtitle: document.getElementById('resSubtitle')?.textContent || '',
        xp: document.getElementById('resFinalXp')?.textContent || ''
      };
    })()
  `,
  'jeu-pendu.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let guard = 0; guard < 50 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const hint = document.getElementById('wordHintText')?.textContent?.trim() || '';
        const category = document.getElementById('wordCategory')?.textContent?.trim() || '';
        const entry = (window.PENDU_DATA || []).find((item) => item.hint === hint && item.category === category);
        if (!entry) throw new Error('Pendu entry not found from visible hint/category');
        const letters = [...new Set(entry.word.split(''))];
        for (const letter of letters) {
          guessLetter(letter);
          if (document.getElementById('btnNext').style.display !== 'none') break;
        }
        await sleep(1500);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        won: document.getElementById('resCorrect')?.textContent || '',
        lost: document.getElementById('resErrors')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-mots-meles.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let guard = 0; guard < 10 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        revealAll();
        await sleep(900);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        found: document.getElementById('resFound')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-anagramme.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
      for (let guard = 0; guard < 40 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const category = document.getElementById('roundCategory')?.textContent?.trim() || '';
        const letters = [...document.querySelectorAll('.letter-tile')].map((el) => el.textContent.trim()).sort().join('');
        const entry = (window.ANAGRAMME_DATA || []).find((item) => item.word.split('').sort().join('') === letters
          && (!category || normalize(item.category) === normalize(category)));
        if (!entry) throw new Error('Anagramme entry not found from visible letters/category');
        eraseAll();
        for (const letter of entry.word.split('')) {
          const tile = [...document.querySelectorAll('.letter-tile:not(.used)')]
            .find((el) => el.textContent === letter);
          if (tile) tile.click();
        }
        validate();
        await sleep(1450);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resCorrect')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-apparier.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let guard = 0; guard < 30 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const pairIndexes = [...new Set([...document.querySelectorAll('.match-card')].map((el) => el.dataset.idx))];
        for (const idx of pairIndexes) {
          const left = document.querySelector('.match-card[data-side="left"][data-idx="' + idx + '"]');
          const right = document.querySelector('.match-card[data-side="right"][data-idx="' + idx + '"]');
          if (left && right && left.dataset.matched !== 'true') {
            left.click();
            right.click();
            await sleep(20);
          }
        }
        await sleep(1450);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resCorrect')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-paire.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
      for (let guard = 0; guard < 40 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const card1 = document.getElementById('card1Text')?.textContent?.trim() || '';
        const card2 = document.getElementById('card2Text')?.textContent?.trim() || '';
        const entry = (window.PAIRE_DATA || []).find((item) => {
          return normalize(item.card1.text) === normalize(card1)
            && normalize(item.card2.text) === normalize(card2);
        });
        if (!entry) throw new Error('Paire entry not found from visible cards');
        answer(entry.isPair);
        await sleep(1450);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resCorrect')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-demeler.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const normalizeWords = (text) => text.split(/\s+/).map((part) => part.trim()).filter(Boolean);
      const sameBag = (a, b) => a.length === b.length && a.every((word, index) => word === b[index]);
      for (let guard = 0; guard < 40 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const category = document.getElementById('sentence-cat')?.textContent?.trim() || '';
        const visibleWords = [...document.querySelectorAll('#source-zone .word-chip')].map((el) => el.textContent.trim()).sort();
        const entry = (window.DEMELER_DATA || []).find((item) => {
          return item.cat === category && sameBag(normalizeWords(item.text).sort(), visibleWords);
        });
        if (!entry) throw new Error('Demeler entry not found from visible words/category');
        const targetWords = normalizeWords(entry.text);
        for (const word of targetWords) {
          const chip = [...document.querySelectorAll('#source-zone .word-chip')].find((el) => el.textContent.trim() === word);
          if (chip) chip.click();
        }
        checkAnswer();
        await sleep(1500);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resCorrect')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-cherche-clique.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let guard = 0; guard < 40 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const targetName = document.getElementById('targetName')?.textContent?.trim() || '';
        const button = [...document.querySelectorAll('.game-item')]
          .find((el) => el.getAttribute('aria-label') === targetName);
        if (button) {
          button.click();
        }
        await sleep(700);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resFinal')?.textContent || '',
        accuracy: document.getElementById('resFinalAcc')?.textContent || ''
      };
    })()
  `,
  'jeu-vrai-faux.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
      for (let guard = 0; guard < 20 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const statement = document.getElementById('qStatement')?.textContent?.trim() || '';
        const entry = (window.VRAI_FAUX_DATA || []).find((item) => normalize(item.statement) === normalize(statement));
        if (!entry) throw new Error('Vrai/Faux entry not found from visible statement');
        answer(entry.answer);
        await sleep(1450);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resCorrect')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-quiz.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
      for (let guard = 0; guard < 20 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const question = document.getElementById('qText')?.textContent?.trim() || '';
        const entry = (window.QUIZ_DATA || []).find((item) => normalize(item.question) === normalize(question));
        if (!entry) throw new Error('Quiz entry not found from visible question');
        const choices = [...document.querySelectorAll('.quiz-choice')].map((el) => el.textContent.trim());
        const answerIdx = Number.isInteger(entry.answer)
          ? entry.answer
          : choices.findIndex((choice) => normalize(choice) === normalize(entry.answer));
        if (answerIdx === -1) throw new Error('Quiz visible answer index not found');
        answerQuestion(answerIdx);
        await sleep(1450);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resCorrect')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-classement.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let guard = 0; guard < 30 && !document.getElementById('resultZone')?.classList.contains('show'); guard += 1) {
        const question = document.getElementById('rankQuestion')?.textContent?.trim() || '';
        const entry = (window.CLASSEMENT_DATA || []).find((item) => item.question === question);
        if (!entry) throw new Error('Classement entry not found from visible question');
        renderList(entry.items);
        validate();
        await sleep(1450);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        correct: document.getElementById('resCorrect')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `,
  'jeu-mots-croises.html': String.raw`
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (let outer = 0; outer < 10 && !document.getElementById('resultZone')?.classList.contains('show'); outer += 1) {
        const count = document.querySelectorAll('.clue-item').length;
        for (let i = 0; i < count; i += 1) {
          revealWord();
          nextWord(1);
          await sleep(30);
        }
        await sleep(900);
      }
      return {
        done: document.getElementById('resultZone')?.classList.contains('show') || false,
        solved: document.getElementById('resSolved')?.textContent || '',
        accuracy: document.getElementById('resAccuracy')?.textContent || ''
      };
    })()
  `
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class CdpSession {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    this.errors = [];
    this.loadResolvers = [];
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    this.ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data.toString());
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result || {});
        return;
      }
      this.events.push(message);
      if (message.method === 'Page.loadEventFired') {
        const resolvers = this.loadResolvers.splice(0);
        resolvers.forEach((resolve) => resolve());
      }
      if (message.method === 'Runtime.exceptionThrown') {
        const details = message.params.exceptionDetails || {};
        this.errors.push({
          type: 'exception',
          text: details.text || details.exception?.description || 'Runtime exception'
        });
      }
      if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
        const text = (message.params.args || [])
          .map((arg) => arg.value || arg.description || '')
          .join(' ');
        this.errors.push({ type: 'console', text });
      }
      if (message.method === 'Log.entryAdded') {
        const entry = message.params.entry || {};
        if (entry.level === 'error' || entry.source === 'javascript') {
          this.errors.push({ type: 'log', text: entry.text || '' });
        }
      }
    });
  }

  async send(method, params = {}) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    const response = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
    this.ws.send(payload);
    return response;
  }

  async waitForLoad(timeoutMs = 10000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const state = await this.eval('document.readyState');
      if (state === 'complete' || state === 'interactive') return;
      await Promise.race([
        new Promise((resolve) => this.loadResolvers.push(resolve)),
        sleep(250)
      ]);
    }
    throw new Error('Timed out waiting for load');
  }

  async eval(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (result.exceptionDetails) {
      const details = result.exceptionDetails;
      const message = details.text
        || (details.exception && (details.exception.description || details.exception.value))
        || 'Runtime evaluate failed';
      throw new Error(message);
    }
    return result.result ? result.result.value : undefined;
  }

  async close() {
    if (!this.ws) return;
    this.ws.close();
    await sleep(50);
  }
}

async function openTarget(pagePath) {
  const url = `${BASE_URL}/${pagePath}?qa=${Date.now()}`;
  const response = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(url)}`, {
    method: 'PUT'
  });
  if (!response.ok) {
    throw new Error(`Failed to create target for ${pagePath}: ${response.status}`);
  }
  return response.json();
}

async function closeTarget(targetId) {
  await fetch(`http://127.0.0.1:9222/json/close/${targetId}`);
}

async function clearOriginState() {
  const target = await openTarget('accueil.html');
  const session = new CdpSession(target.webSocketDebuggerUrl);
  await session.connect();
  await session.send('Page.enable');
  await session.send('Runtime.enable');
  await session.waitForLoad(15000);
  await session.send('Storage.clearDataForOrigin', {
    origin: BASE_URL,
    storageTypes: 'all'
  });
  await session.eval(`
    (async () => {
      localStorage.clear();
      sessionStorage.clear();
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((reg) => reg.unregister()));
      }
      return true;
    })()
  `);
  await session.close();
  await closeTarget(target.id);
}

async function testPage(pagePath) {
  const target = await openTarget(pagePath);
  const session = new CdpSession(target.webSocketDebuggerUrl);
  await session.connect();
  await session.send('Page.enable');
  await session.send('Runtime.enable');
  await session.send('Log.enable');
  await session.waitForLoad(15000);
  await sleep(600);

  const hasTestApi = await session.eval('!!(window.__GAME_TEST_API__ && typeof window.__GAME_TEST_API__.run === "function")');
  const playExpression = hasTestApi
    ? 'window.__GAME_TEST_API__.run()'
    : PLAYERS[pagePath];
  if (!playExpression) throw new Error(`No player defined for ${pagePath}`);

  let runResult = null;
  let runError = null;
  try {
    runResult = await session.eval(playExpression);
  } catch (error) {
    runError = error.message;
  }

  const syncStart = Date.now();
  while (Date.now() - syncStart < 4000) {
    const headerState = await session.eval(`(() => {
      const header = document.getElementById('headerXpTotal');
      const summary = window.ScoreManager?.getGlobalSummary(window.EXERCISE_CONFIG?.orderedPages)?.totalXp;
      return {
        header: header ? Number(header.textContent || 0) : null,
        summary: Number(summary ?? 0)
      };
    })()`);
    if (headerState && headerState.header === headerState.summary) {
      break;
    }
    await sleep(150);
  }
  const title = await session.eval('document.title');
  const bodyText = await session.eval('document.body ? document.body.innerText.slice(0, 300) : ""');
  const headerXp = await session.eval('document.getElementById("headerXpTotal")?.textContent || ""');
  const totalXp = await session.eval('window.ScoreManager?.getGlobalSummary(window.EXERCISE_CONFIG?.orderedPages)?.totalXp ?? null');

  await session.close();
  await closeTarget(target.id);

  return {
    page: pagePath,
    title,
    hasTestApi,
    ok: !runError && runResult && runResult.done,
    runResult,
    runError,
    errors: session.errors,
    bodyText,
    headerXp,
    totalXp
  };
}

async function main() {
  const selectedPages = process.argv.slice(2);
  const pages = selectedPages.length ? selectedPages : PAGES;
  await clearOriginState();
  const results = [];
  for (const page of pages) {
    /* eslint-disable no-await-in-loop */
    console.error('TEST', page);
    const result = await testPage(page);
    results.push(result);
    /* eslint-enable no-await-in-loop */
  }
  process.stdout.write(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
