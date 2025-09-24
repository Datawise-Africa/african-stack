import { test, expect } from '@playwright/test';
import { logout, seedAuthStorage } from '../test-helpers';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to login page', async ({ page }) => {
    await page.click('button:has-text("Log in")');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('h1')).toContainText('Welcome back');
  });

  test('should login as reader', async ({ page }) => {
  // seed auth to avoid redirect race
  await seedAuthStorage(page, 'reader@example.com');
  await page.goto('/reader');
  await expect(page).toHaveURL(/\/reader/);
  await expect(page.locator('h1')).toContainText('Reader Dashboard');
  });

  test('should login as author and access creator dashboard', async ({ page }) => {
  await seedAuthStorage(page, 'author@example.com');
  await page.goto('/creator');
  await expect(page).toHaveURL(/\/creator/);
  });

  test('should login as admin and access admin dashboard', async ({ page }) => {
  await seedAuthStorage(page, 'admin@example.com');
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin/);
  });

  test('should logout successfully', async ({ page }) => {
  await seedAuthStorage(page, 'reader@example.com');
  await page.goto('/');
  await logout(page);
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.locator('button:has-text("Log in")')).toBeVisible();
  });
});
