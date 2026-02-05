import { test, expect } from '@playwright/test';

test.describe('Review Flow', () => {
    const toolSlug = 'chatgpt'; // Assuming this exists from seed

    test.skip('unauthenticated user sees auth dialog when trying to review', async ({ page }) => {
        // 1. Mock Session (Unauthenticated)
        await page.route('**/api/auth/session', async route => {
            await route.fulfill({ json: {} }); // Empty object for unauthenticated
        });

        // 2. Go to tool page
        await page.goto(`/tool/${toolSlug}`);

        // 3. Click a star to enable the submit button
        // Select the button that contains the star svg
        const starButton = page.locator('button:has(svg.lucide-star)').first();
        await starButton.click();

        // 3. Click Post Review
        const submitButton = page.getByRole('button', { name: /post review/i });
        await submitButton.click();

        // 4. Expect Auth Dialog
        // "Welcome to VibeStack" is the DialogTitle
        await expect(page.getByRole('dialog')).toBeVisible();
    });

    test('authenticated user can submit a review', async ({ page }) => {
        // 1. Mock Session
        await page.route('**/api/auth/session', async route => {
            const json = {
                user: { name: "Test User", email: "test@example.com", image: null },
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            };
            await route.fulfill({ json });
        });

        // 2. Mock Review Submission API
        await page.route('**/api/reviews', async route => {
            if (route.request().method() === 'POST') {
                await route.fulfill({ status: 200, json: { id: 'mock-review-id' } });
            } else {
                await route.continue();
            }
        });

        // 3. Go to page
        await page.goto(`/tool/${toolSlug}`);

        // 4. Fill Form
        const starButton = page.locator('button:has(svg.lucide-star)').nth(4); // 5 stars
        await starButton.click();

        const textarea = page.getByPlaceholder('Share your experience');
        await textarea.fill('This is a test review from Playwright.');

        // 5. Submit
        const submitButton = page.getByRole('button', { name: /post review/i });
        await submitButton.click();

        // 6. Verify Success Toast
        await expect(page.getByText('Review submitted successfully')).toBeVisible();
    });
});
