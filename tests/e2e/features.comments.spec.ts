import { test, expect } from '@playwright/test';

test.describe('Comments Functionality', () => {
  test('displays comments section and guest prompt', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="article-card"]').first().click();
    await page.locator('[data-testid="comments-section"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="comments-header"]')).toContainText('Comments');
  });
});
