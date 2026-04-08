import { test, expect } from '@playwright/test';

test.describe('VibeStack Core Navigation & Render Loops', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('/');
    });

    test('Homepage renders hero and core features without crashing', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/VibeStack|Home/);

        // Expect the VibeStack main logo text to be visible
        await expect(page.locator('text=VibeStack').first()).toBeVisible();
    });

    test('Navigation bar allows routing to Tools Directory', async ({ page }) => {
        // Click the tools link in the header via standard locator or role
        const toolsLink = page.locator('a[id="nav-link-tools"]');
        
        // Use click explicitly
        await toolsLink.click();

        // Expects page to have navigated to /tools
        await expect(page).toHaveURL(/.*\/tools/);

        // Expect the filters or header to be visible
        await expect(page.locator('h1').first()).toContainText(/Tools/i);
    });

    test('Build feature allows triggering the wizard', async ({ page }) => {
        const buildLink = page.locator('a[id="nav-link-build"]');
        await buildLink.click();

        await expect(page).toHaveURL(/.*\/build/);
    });

    test('Authentication popup safely triggers on unauthenticated actions', async ({ page }) => {
        // Assume UserNav has a Sign In button when unauthenticated
        const signInBtn = page.getByRole('button', { name: /Sign In/i });
        
        if (await signInBtn.isVisible()) {
            await signInBtn.click();
            // Expect the dialogue to pop up
            const authDialog = page.getByRole('dialog');
            await expect(authDialog).toBeVisible();
        }
    });
});
