const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test('has link to sign in page', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.click('text=Sign In');

    await expect(page).toHaveURL('http://localhost:3000/user/signin');

    await expect(page.locator('h2')).toContainText('Sign in to your account');
  });

  test('has link to register page', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.click('text=Register');

    await expect(page).toHaveURL('http://localhost:3000/user/register');

    await expect(page.locator('h2')).toContainText('Create your account');
  });

  test('home page has correct title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(page).toHaveTitle(/Frontend Labs/);

    await expect(page.locator('h1')).toContainText('Frontend Labs');
  });
});
