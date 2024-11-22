const { When } = require('@cucumber/cucumber');
const { resolveVars } = require ('../utils/resolveVars.js');
require('dotenv').config();

When("clicking the element with locator value {string}", async function (value) {
  let element = await this.page.locator(value);
  await element.click();
});

When("entering the text {string} in the element with locator value {string}", async function (text, value) {
  let cred = resolveVars(text);
  let element = await this.page.locator(value);
  await element.fill(cred);
});

When("implicitly waiting for {int} milliseconds", async function (milliseconds) {
  await this.page.waitForTimeout(milliseconds);
});

When("waiting for element with locator value {string} to be visible", async function (value) {
  let element = await this.page.locator(value);
  await element.waitFor({ state: 'visible' });
});

When("pressing the {string} key", async function (key) {
  await this.page.keyboard.press(key);
});