import { test, expect } from '@playwright/test';

test.describe('Accessibility Features', () => {
  test('has proper page structure with landmarks', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
