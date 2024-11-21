const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
require('dotenv').config();

const isHeadless = process.env.HEADLESS === 'true';

Given('I am on the Google homepage', async function () {
  console.log(`Headless mode: ${process.env.HEADLESS}`);
  this.browser = await chromium.launch({headless: isHeadless}); //{  headless: false }
  this.page = await this.browser.newPage();
  await this.page.goto('https://www.google.com');
});

When('I search for {string}', async function (searchQuery) {
  const searchBox = await this.page.$('//*[@id="APjFqb"]');
  await searchBox.type(searchQuery);
  await searchBox.press('Enter');
});

Then('the page title should contain {string}', async function (expectedText) {
  const title = await this.page.title();
  if (!title.includes(expectedText)) {
    throw new Error(`Expected title to contain "${expectedText}", but got "${title}"`);
  }
  await this.browser.close(); // Close the browser
});
