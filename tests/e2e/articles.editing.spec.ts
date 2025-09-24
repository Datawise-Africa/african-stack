import { test, expect } from '@playwright/test';

test.describe('Article Creation and Editing', () => {
  test.beforeEach(async ({ page }) => {
    // Seed auth as author to avoid login UI flakiness
    await page.addInitScript(() => {
      // noop when not available in browser context; replaced below per-test
    });
    await page.goto('/login');
    await page.fill('input[name="email"]', 'author@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.goto('/articles/create');
    await expect(page).toHaveURL(/\/articles\/create/);
  });

  test('displays article creation form', async ({ page }) => {
    await expect(page.locator('text=Create New Article')).toBeVisible();
    await expect(page.locator('[data-testid="article-title-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="article-editor"]')).toBeVisible();
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
    await expect(page.locator('[data-testid="featured-image-upload"]')).toBeVisible();
  });

  test('validates article title field', async ({ page }) => {
    await page.click('[data-testid="publish-btn"]');
    await expect(page.locator('[data-testid="title-error"]')).toContainText('Title is required');
  });

  test('validates article content', async ({ page }) => {
    await page.fill('[data-testid="article-title-input"]', 'Test Article');
    await page.click('[data-testid="publish-btn"]');
    await expect(page.locator('[data-testid="content-error"]')).toContainText('Content is required');
  });

  test('validates category selection', async ({ page }) => {
    await page.fill('[data-testid="article-title-input"]', 'Test Article');
    await page.fill('[data-testid="article-editor"] [contenteditable=true]', 'This is a test article content.');
    await page.click('[data-testid="publish-btn"]');
    await expect(page.locator('[data-testid="category-error"]')).toContainText('Category is required');
  });

  test('creates a draft article', async ({ page }) => {
    const title = `Test Draft Article ${Date.now()}`;
    await page.fill('[data-testid="article-title-input"]', title);
    await page.fill('[data-testid="article-editor"] [contenteditable=true]', 'This is a test draft article content.');
    await page.click('[data-testid="category-select"]');
    await page.click('text=AI');
    await page.click('[data-testid="save-draft-btn"]');
    await expect(page).toHaveURL(/\/creator/);
    await page.click('[data-testid="status-filter"]');
    await page.click('text=Draft');
    await expect(page.locator(`text=${title}`)).toBeVisible();
  });

  test('publishes an article', async ({ page }) => {
    const title = `Test Published Article ${Date.now()}`;
    await page.fill('[data-testid="article-title-input"]', title);
    await page.fill('[data-testid="article-editor"] [contenteditable=true]', 'This is a test published article content.');
    await page.click('[data-testid="category-select"]');
    await page.click('text=Data Science');

    // Upload featured image using setInputFiles
    const fileInput = page.locator('[data-testid="featured-image-upload"] input[type=file]');
    if (await fileInput.count() > 0) {
      await fileInput.setInputFiles({ name: 'test-image.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('test') });
    }

    await page.fill('[data-testid="tags-input"]', 'test');
    await page.keyboard.press('Enter');
    await page.fill('[data-testid="tags-input"]', 'cypress');
    await page.keyboard.press('Enter');

    await page.click('[data-testid="publish-btn"]');
    await expect(page).toHaveURL(/\/articles\//);
    await expect(page.locator(`text=${title}`)).toBeVisible();
  });
});

test.describe('Article Editing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'author@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.goto('/creator');
    await expect(page).toHaveURL(/\/creator/);
    await page.click('text=Articles');
    const editBtn = page.locator('[data-testid="edit-article-btn"]');
    if (await editBtn.count() > 0) await editBtn.first().click();
  });

  test('loads existing article data in the editor', async ({ page }) => {
    await expect(page.locator('[data-testid="article-title-input"]')).toHaveValue(/.*/);
    await expect(page.locator('[data-testid="article-editor"] [contenteditable=true]')).not.toBeEmpty();
  });

  test('updates article title', async ({ page }) => {
    const newTitle = `Updated Title ${Date.now()}`;
    await page.fill('[data-testid="article-title-input"]', newTitle);
    await page.click('[data-testid="save-changes-btn"]');
    await page.goto('/creator');
    await page.click('text=Articles');
    await expect(page.locator(`text=${newTitle}`)).toBeVisible();
  });

  test('updates article content', async ({ page }) => {
    const addedContent = `New content added during test ${Date.now()}`;
    await page.fill('[data-testid="article-editor"] [contenteditable=true]', addedContent);
    await page.click('[data-testid="save-changes-btn"]');
    await expect(page.locator('[data-testid="save-success"]')).toBeVisible();
  });

  test('changes article category', async ({ page }) => {
    await page.click('[data-testid="category-select"]');
    await page.click('text=AI Ethics');
    await page.click('[data-testid="save-changes-btn"]');
    await expect(page.locator('[data-testid="save-success"]')).toBeVisible();
  });
});
