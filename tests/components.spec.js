const { test, expect } = require('@playwright/test');

test.describe('Quiz Components Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('home page displays quiz features', async ({ page }) => {
    await expect(page.locator('text=Quiz Application')).toBeVisible();

    await expect(page.locator('text=Single Choice Questions')).toBeVisible();
    await expect(page.locator('text=Multiple Choice Questions')).toBeVisible();
    await expect(page.locator('text=Fill in the Blanks')).toBeVisible();
    await expect(page.locator('text=Match Pairs')).toBeVisible();
  });

  test('line chart is visible on home page', async ({ page }) => {
    await expect(page.locator('text=Line Chart Component')).toBeVisible();

    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();
  });

  test('not found page works', async ({ page }) => {
    await page.goto('http://localhost:3000/nonexistent-page');

    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('text=Page Not Found')).toBeVisible();

    await page.click('text=Return Home');
    await expect(page).toHaveURL('http://localhost:3000/');
  });
});
