import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('displays the login form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome back');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('validates email field', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="email"] + p')).toContainText('Please enter a valid email address');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="email"] + p')).toContainText('Please enter a valid email address');
  });

  test('validates password field', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="password"] + p')).toContainText('Password must be at least 6 characters');
    await page.fill('input[name="password"]', '123');
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="password"] + p')).toContainText('Password must be at least 6 characters');
  });

  test('allows user to login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/reader/);
    await expect(page.locator('h1')).toContainText('Reader Dashboard');
  });
});
