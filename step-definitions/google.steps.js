const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Given('I am on the Google homepage', async function () {
  this.browser = await chromium.launch({ headless: false }); // Launch the browser
  this.page = await this.browser.newPage(); // Create a new page
  await this.page.goto('https://www.google.com'); // Navigate to Google
});

When('I search for {string}', async function (searchQuery) {
  const searchBox = await this.page.$('//*[@id="APjFqb"]'); // Find the search box
  await searchBox.type(searchQuery); // Type the query
  await searchBox.press('Enter'); // Submit the search
});

Then('the page title should contain {string}', async function (expectedText) {
  const title = await this.page.title(); // Get the page title
  if (!title.includes(expectedText)) {
    throw new Error(`Expected title to contain "${expectedText}", but got "${title}"`);
  }
  await this.browser.close(); // Close the browser
});
