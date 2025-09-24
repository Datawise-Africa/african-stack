import { test, expect } from '@playwright/test';

test.describe('Reader Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'reader@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/reader/);
  });

  test('displays reader dashboard with overview stats', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Reader Dashboard');
    await expect(page.locator('text=Articles Read')).toBeVisible();
    await expect(page.locator('text=Saved Articles')).toBeVisible();
    await expect(page.locator('text=Reading Time')).toBeVisible();
  });

  test('shows reading history tab with articles', async ({ page }) => {
    await page.click('text=Reading History');
    await expect(page.locator('[data-testid="reading-history-list"]')).toBeVisible();
  });

  test('navigates to profile settings', async ({ page }) => {
    await page.click('[data-testid="profile-menu"]');
    await page.click('text=Settings');
    await expect(page).toHaveURL(/\/settings/);
  });
});

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin/);
  });

  test('displays admin dashboard with overview', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    await expect(page.locator('text=Total Users')).toBeVisible();
  });
});

test.describe('Creator Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'author@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.goto('/creator');
    await expect(page).toHaveURL(/\/creator/);
  });

  test('displays creator dashboard with overview', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Creator Dashboard');
    await expect(page.locator('text=Total Views')).toBeVisible();
  });
});
