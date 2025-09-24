
import { Page } from '@playwright/test';

export async function loginAs(page: Page, email: string, password = 'password') {
  // UI-driven login (keeps parity with Cypress flow). Use seeding for speed/reliability when possible.
  await page.goto('/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
}

export async function logout(page: Page) {
  await page.click('button:has-text("Log out")');
}

export async function seedAuthStorage(page: Page, email: string) {
  // Build mock user to match zustand mock in src/stores/authStore.ts
  const role = email === 'admin@example.com' ? 'admin' : email === 'author@example.com' ? 'author' : 'reader';
  const displayName = role === 'admin' ? 'Admin User' : role === 'author' ? 'Author User' : 'Reader User';

  const mockUser = {
    id: '1',
    email,
    displayName,
    role,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const persisted = JSON.stringify({ state: { user: mockUser, isAuthenticated: true } });

  // Set before navigation so app picks it up on load
  await page.addInitScript((value: string) => {
    // value is the serialized persisted value
    localStorage.setItem('auth-storage', value);
  }, persisted);
}
