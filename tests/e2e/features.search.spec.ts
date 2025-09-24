import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows search bar in header', async ({ page }) => {
    await expect(page.locator('[data-testid="search-bar"]')).toBeVisible();
  });
});
