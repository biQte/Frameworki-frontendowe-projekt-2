const { test, expect } = require('@playwright/test');

test.describe('Authentication Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('successful login redirects to home', async ({ page }) => {
    await page.click('text=Sign In');

    await expect(page).toHaveURL(/\/user\/signin/);

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:3000/', { timeout: 5000 });

    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('protected route redirects unauthenticated users', async ({ page }) => {
    await page.goto('http://localhost:3000/user/profile');

    await page.waitForURL(/\/user\/signin/, { timeout: 5000 });

    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=/);

    const url = page.url();
    expect(url).toContain('returnUrl=%2Fuser%2Fprofile');
  });

  test('quiz page requires authentication', async ({ page }) => {
    await page.goto('http://localhost:3000/quiz');

    await page.waitForURL(/\/user\/signin/, { timeout: 5000 });

    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=/);
  });

  test('my quizzes page requires authentication', async ({ page }) => {
    await page.goto('http://localhost:3000/myquizzes');

    await page.waitForURL(/\/user\/signin/, { timeout: 5000 });

    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=/);
  });
});
