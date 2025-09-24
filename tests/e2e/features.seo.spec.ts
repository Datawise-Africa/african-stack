import { test, expect } from '@playwright/test';

test('has correct metadata on the homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/African Stack/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
});
