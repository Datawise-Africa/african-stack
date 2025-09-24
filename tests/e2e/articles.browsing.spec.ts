import { test, expect } from '@playwright/test';

test.describe('Article Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the landing page with featured articles', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('African Stack');
    await expect(page.locator('text=Featured Articles')).toBeVisible();
    await expect(page.locator('[data-testid="featured-article"]')).toHaveCount(1);
  });

  test('navigates to article detail page when clicking an article', async ({ page }) => {
    await page.locator('[data-testid="article-card"]').first().click();
    await expect(page).toHaveURL(/\/articles\//);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="article-content"]')).toBeVisible();
  });

  test('filters articles by category', async ({ page }) => {
    await page.goto('/articles');
    await page.click('[data-testid="category-filter"]');
    await page.click('text=AI');
    await expect(page).toHaveURL(/category=AI/);
    const articleCount = await page.locator('[data-testid="article-card"]').count();
    expect(articleCount).toBeGreaterThan(0);
  });

  test('searches for articles', async ({ page }) => {
    await page.goto('/articles');
    await page.fill('[data-testid="search-input"]', 'data');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/search=data/);
    const articleCount = await page.locator('[data-testid="article-card"]').count();
    expect(articleCount).toBeGreaterThan(0);
  });

  test('shows related articles at the bottom of an article page', async ({ page }) => {
    await page.locator('[data-testid="article-card"]').first().click();
    await page.locator('[data-testid="related-articles"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="related-articles"]')).toBeVisible();
    const relatedArticleCount = await page.locator('[data-testid="related-articles"] [data-testid="article-card"]').count();
    expect(relatedArticleCount).toBeGreaterThan(0);
  });
});

test.describe('Article Reading Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="article-card"]').first().click();
  });

  test('displays article with title, author, and content', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="article-author"]')).toBeVisible();
    await expect(page.locator('[data-testid="article-date"]')).toBeVisible();
    await expect(page.locator('[data-testid="article-content"]')).toBeVisible();
  });

  test('displays article reading time', async ({ page }) => {
    await expect(page.locator('[data-testid="reading-time"]')).toBeVisible();
    await expect(page.locator('[data-testid="reading-time"]')).toContainText('min read');
  });

  test('allows users to react to articles', async ({ page }) => {
    // login
    await page.goto('/login');
    await page.fill('input[name="email"]', 'reader@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');

    await page.goto('/');
    await page.locator('[data-testid="article-card"]').first().click();

    await page.locator('[data-testid="reaction-button"]').first().click();
    await expect(page.locator('[data-testid="reaction-button"].active')).toHaveCount(1);
  });

  test('allows logged-in users to comment on articles', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'reader@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');

    await page.goto('/');
    await page.locator('[data-testid="article-card"]').first().click();

    const commentText = `Test comment ${Date.now()}`;
    await page.fill('[data-testid="comment-input"]', commentText);
    await page.click('[data-testid="submit-comment"]');
    await expect(page.locator(`text=${commentText}`)).toBeVisible();
  });
});
