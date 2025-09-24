import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('displays the registration form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Create an account');
    await expect(page.locator('input[name="displayName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('allows user to register with valid information', async ({ page }) => {
    const email = `test${Date.now()}@example.com`;
    await page.fill('input[name="displayName"]', 'New User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/reader/);
    await expect(page.locator('h1')).toContainText('Reader Dashboard');
  });
});
