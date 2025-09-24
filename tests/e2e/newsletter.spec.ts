import { test, expect } from '@playwright/test';

test.describe('Newsletter Subscription', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays newsletter subscription form', async ({ page }) => {
    await page.locator('[data-testid="newsletter-form"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="newsletter-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="newsletter-email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="newsletter-submit"]')).toBeVisible();
  });

  test('validates email address in newsletter form', async ({ page }) => {
    await page.locator('[data-testid="newsletter-form"]').scrollIntoViewIfNeeded();
    await page.click('[data-testid="newsletter-submit"]');
    await expect(page.locator('[data-testid="newsletter-error"]')).toBeVisible();

    await page.fill('[data-testid="newsletter-email-input"]', 'invalid-email');
    await page.click('[data-testid="newsletter-submit"]');
    await expect(page.locator('[data-testid="newsletter-error"]')).toBeVisible();
  });

  test('shows success message on valid subscription', async ({ page }) => {
    await page.locator('[data-testid="newsletter-form"]').scrollIntoViewIfNeeded();
    const email = `test${Date.now()}@example.com`;
    await page.fill('[data-testid="newsletter-email-input"]', email);
    await page.click('[data-testid="newsletter-submit"]');
    // Component shows a thank you card after success
    await expect(page.locator('text=Thank You for Subscribing!')).toBeVisible();
  });

  // The app doesn't have a dedicated /newsletter route currently; skip that expectation
});
