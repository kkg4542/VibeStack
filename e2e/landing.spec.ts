import { test, expect } from '@playwright/test';

test('landing page has title and hero section', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/VibeStack/);

    // Check if hero title exists
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
});

test('tools page is accessible', async ({ page }) => {
    await page.goto('/tools');
    await expect(page).toHaveURL(/.*tools/);

    // Check if page title is visible
    const pageTitle = page.getByRole('heading', { name: /All Tools/i });
    await expect(pageTitle).toBeVisible();
});
