const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  // Go to a page
  await page.goto('https://example.com');

  // Check the page title
  await expect(page).toHaveTitle('Example Domain');
});