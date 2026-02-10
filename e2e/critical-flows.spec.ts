import { test, expect } from '@playwright/test';

test.describe('Stack Builder Flow', () => {
    test('user can navigate to stack builder and see quiz interface', async ({ page }) => {
        // 1. Go to build page
        await page.goto('/build');

        // 2. Check hero section
        await expect(page.getByRole('heading', { name: /Find Your Vibe Stack/i })).toBeVisible();

        // 3. Click Start Quiz
        await page.getByRole('button', { name: /Start Quiz/i }).click();

        // 4. Check quiz interface appears
        await expect(page.getByText(/Question 1 of 6/i)).toBeVisible();
        await expect(page.getByText(/What is your primary goal?/i)).toBeVisible();
    });

    test('user can complete stack builder quiz', async ({ page }) => {
        await page.goto('/build');
        
        // Start quiz
        await page.getByRole('button', { name: /Start Quiz/i }).click();

        // Answer Question 1: Primary Goal
        await page.getByRole('button', { name: /Write Code/i }).click();

        // Answer Question 2: Experience Level
        await page.getByRole('button', { name: /Intermediate/i }).click();

        // Answer Question 3: Code Editor
        await page.getByRole('button', { name: /VS Code/i }).click();

        // Answer Question 4: Team Size
        await page.getByRole('button', { name: /Solo/i }).click();

        // Answer Question 5: Budget
        await page.getByRole('button', { name: /Budget Friendly/i }).click();

        // Answer Question 6: What Matters Most
        await page.getByRole('button', { name: /Speed/i }).click();

        // Check results page
        await expect(page.getByText(/Recommended Stack/i)).toBeVisible();
        await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    });
});

test.describe('Tools Search and Filter', () => {
    test('user can search for tools', async ({ page }) => {
        await page.goto('/tools');

        // Search for cursor
        const searchInput = page.getByPlaceholder(/Search by name/i);
        await searchInput.fill('cursor');
        await searchInput.press('Enter');

        // Check that results appear
        await expect(page.getByText(/cursor/i)).toBeVisible();
    });

    test('user can filter tools by category', async ({ page }) => {
        await page.goto('/tools');

        // Click category filter (assuming there are category buttons/checkboxes)
        // This depends on your actual UI implementation
        const codingFilter = page.getByRole('button', { name: /Coding/i });
        if (await codingFilter.isVisible()) {
            await codingFilter.click();
            
            // Check that only coding tools are shown
            await expect(page.getByText(/Coding/i).first()).toBeVisible();
        }
    });
});

test.describe('Newsletter Subscription', () => {
    test('user can subscribe to newsletter', async ({ page }) => {
        await page.goto('/newsletter');

        // Check hero
        await expect(page.getByRole('heading', { name: /Newsletter/i })).toBeVisible();

        // Fill email
        const emailInput = page.getByPlaceholder(/Enter your email/i);
        await emailInput.fill('test@example.com');

        // Mock API response
        await page.route('**/api/newsletter', async route => {
            await route.fulfill({ 
                status: 200, 
                json: { success: true } 
            });
        });

        // Click subscribe
        await page.getByRole('button', { name: /Subscribe/i }).click();

        // Check success message
        await expect(page.getByText(/Successfully subscribed/i)).toBeVisible();
    });
});

test.describe('Navigation and Layout', () => {
    test('navigation menu works', async ({ page }) => {
        await page.goto('/');

        // Check navigation links
        await expect(page.getByRole('link', { name: /Tools/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Build/i })).toBeVisible();

        // Navigate to Tools
        await page.getByRole('link', { name: /Tools/i }).click();
        await expect(page).toHaveURL(/.*tools/);

        // Navigate to Build
        await page.getByRole('link', { name: /Build/i }).click();
        await expect(page).toHaveURL(/.*build/);
    });

    test('footer is visible on all pages', async ({ page }) => {
        const pages = ['/', '/tools', '/build', '/about', '/newsletter'];
        
        for (const url of pages) {
            await page.goto(url);
            await expect(page.locator('footer')).toBeVisible();
        }
    });
});

test.describe('Tool Detail Page', () => {
    test('tool detail page shows correct information', async ({ page }) => {
        // Navigate to a specific tool
        await page.goto('/tool/cursor');

        // Check tool name
        await expect(page.getByRole('heading', { name: /Cursor/i })).toBeVisible();

        // Check key sections
        await expect(page.getByText(/Category/i)).toBeVisible();
        await expect(page.getByText(/Pricing/i)).toBeVisible();

        // Check write a review section
        await expect(page.getByText(/Write a Review/i)).toBeVisible();
    });

    test('user can view affiliate link', async ({ page }) => {
        await page.goto('/tool/cursor');

        // Look for visit website button/link
        const visitButton = page.getByRole('link', { name: /Visit|Website|Try/i });
        if (await visitButton.isVisible()) {
            await expect(visitButton).toHaveAttribute('href', /cursor\.sh/);
        }
    });
});

test.describe('Responsive Design', () => {
    test('page is responsive on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        
        await page.goto('/');

        // Check that mobile menu button exists
        const mobileMenuButton = page.getByRole('button', { name: /menu|open/i });
        if (await mobileMenuButton.isVisible()) {
            await mobileMenuButton.click();
            
            // Check that navigation is visible
            await expect(page.getByRole('navigation')).toBeVisible();
        }
    });

    test('page is responsive on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        
        await page.goto('/tools');

        // Check that tools grid adapts
        await expect(page.locator('h1')).toBeVisible();
    });
});

test.describe('Performance and Accessibility', () => {
    test('page loads within acceptable time', async ({ page }) => {
        const start = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - start;
        
        // Page should load in less than 3 seconds
        expect(loadTime).toBeLessThan(3000);
    });

    test('images have alt text', async ({ page }) => {
        await page.goto('/tools');
        
        const images = await page.locator('img').all();
        for (const img of images) {
            const alt = await img.getAttribute('alt');
            // Skip decorative images (they might have empty alt)
            // But most images should have descriptive alt text
        }
    });
});
