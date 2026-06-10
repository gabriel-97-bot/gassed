/**
 * Gassed — Playwright smoke tests
 * Run: node test.js
 * Requires local server: python3 -m http.server 8080
 */

const { chromium } = require('playwright');

const BASE = 'http://localhost:8080';
const PASS = '✅';
const FAIL = '❌';

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`${PASS} ${name}`);
    passed++;
  } catch (e) {
    console.log(`${FAIL} ${name}`);
    console.log(`   → ${e.message}`);
    failed++;
  }
}

async function setup(page) {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  // Add 2 players if on setup screen
  const nameInput = page.locator('#player-name-input');
  if (await nameInput.isVisible()) {
    await nameInput.fill('Ola');
    await page.locator('#add-player-btn').click();
    await nameInput.fill('Kari');
    await page.locator('#add-player-btn').click();
    await page.locator('#start-btn').click();
  }
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();

  console.log('\n══ GASSED — Smoke Tests ══\n');

  // ── Setup screen ──
  await test('Setup screen loads', async () => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#screen-setup.active', { timeout: 5000 });
  });

  await test('Can add a player', async () => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    const input = page.locator('#player-name-input');
    await input.fill('Ola');
    await page.locator('#add-player-btn').click();
    await page.waitForSelector('.player-chip', { timeout: 3000 });
  });

  await test('Can add second player and reach Home', async () => {
    const input = page.locator('#player-name-input');
    await input.fill('Kari');
    await page.locator('#add-player-btn').click();
    await page.locator('#start-btn').click();
    await page.waitForSelector('#screen-home.active', { timeout: 5000 });
  });

  // ── Home screen ──
  await test('Home screen shows all game cards', async () => {
    const cards = page.locator('.game-card');
    const count = await cards.count();
    if (count < 4) throw new Error(`Only ${count} game cards found, expected ≥4`);
  });

  // ── Gassed (card game) ──
  await test('Gassed game starts and shows config overlay', async () => {
    await setup(page);
    await page.locator('.game-card').first().click();
    // Either config overlay or gassed screen appears
    const overlay = page.locator('#gassed-config-overlay');
    const gassedScreen = page.locator('#screen-gassed.active');
    await Promise.race([
      overlay.waitFor({ timeout: 4000 }),
      gassedScreen.waitFor({ timeout: 4000 }),
    ]);
  });

  // ── Truth or Dare ──
  await test('Truth or Dare screen opens', async () => {
    await setup(page);
    const todCard = page.locator('.game-card', { hasText: /truth|dare|sannhet|tørr/i });
    await todCard.click();
    await page.waitForSelector('#screen-tod.active', { timeout: 5000 });
  });

  // ── Trivia ──
  await test('Trivia screen opens', async () => {
    await setup(page);
    const triviaCard = page.locator('.game-card', { hasText: /trivia/i });
    await triviaCard.click();
    await page.waitForSelector('#screen-trivia.active', { timeout: 5000 });
  });

  // ── Waterfall ──
  await test('Waterfall screen opens', async () => {
    await setup(page);
    const wfCard = page.locator('.game-card', { hasText: /waterfall/i });
    await wfCard.click();
    await page.waitForSelector('#screen-waterfall.active', { timeout: 5000 });
  });

  // ── Jeopardy ──
  await test('Jeopardy screen opens', async () => {
    await setup(page);
    const jeoCard = page.locator('.game-card', { hasText: /jeopardy/i });
    await jeoCard.click();
    await page.waitForSelector('#screen-jeopardy.active', { timeout: 5000 });
  });

  // ── Navigation ──
  await test('Back button returns to Home', async () => {
    await page.locator('#back-btn').click();
    await page.waitForSelector('#screen-home.active', { timeout: 3000 });
  });

  await test('Language toggle works', async () => {
    await setup(page);
    await page.locator('#settings-btn').click();
    const langToggle = page.locator('#lang-toggle, .lang-btn').first();
    await langToggle.click();
    await page.waitForTimeout(300);
    // No crash = pass
  });

  // ── Summary ──
  console.log(`\n══ Results: ${passed} passed, ${failed} failed ══\n`);
  await browser.close();
  process.exit(failed > 0 ? 1 : 0);
})();
