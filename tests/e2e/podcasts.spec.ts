import { test, expect } from '@playwright/test';

test.describe('Podcast Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/podcasts');
  });

  test('displays podcast listing page', async ({ page }) => {
    await expect(page.locator('text=AI and Data Science Podcasts')).toBeVisible();
  await expect(page.locator('[data-testid="podcast-card"]')).toBeVisible();
  });
});
