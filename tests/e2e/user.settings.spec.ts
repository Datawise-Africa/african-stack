import { test, expect } from '@playwright/test';

test.describe('User Profile and Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'reader@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
  });

  test('displays user profile information', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('[data-testid="profile-header"]')).toBeVisible();
  });

  test('allows updating profile information', async ({ page }) => {
    await page.goto('/profile');
    const newBio = `Updated bio for testing ${Date.now()}`;
    await page.click('[data-testid="edit-profile-btn"]');
    await page.fill('[data-testid="bio-input"]', newBio);
    await page.click('[data-testid="save-profile-btn"]');
    await expect(page.locator('[data-testid="save-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-bio"]')).toContainText(newBio);
  });
});
