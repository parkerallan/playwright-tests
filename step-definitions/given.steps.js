const { Given, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { resolveVars } = require ('../utils/resolveVars.js');
require('dotenv').config();

const isHeadless = process.env.HEADLESS === 'true';
setDefaultTimeout(15000);

Given("a user opens the page {string}", async function (pageUrl) {
  this.browser = await chromium.launch({headless: isHeadless});
  const context = await this.browser.newContext();
  this.page = await context.newPage();
  const url = resolveVars(pageUrl);
  await this.page.goto(url);
});