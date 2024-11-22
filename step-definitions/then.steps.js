const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then("the following elements are displayed", async function (dataTable) {
  for (const row of dataTable.hashes()) {
    const locatorValue = row.Locator_Value;

    let element = await this.page.locator(locatorValue);

    const isVisible = await element.isVisible();
    expect(isVisible).toBe(true);
  }
});

Then("the following elements are not displayed", async function (dataTable) {
  for (const row of dataTable.hashes()) {
    const locatorValue = row.Locator_Value;

    let element = await this.page.locator(locatorValue);

    const isVisible = await element.isVisible();
    expect(isVisible).toBe(false);
  }
});

Then("the element with the locator {string} contains the text {string}", async function (locatorValue, expectedText) {
  const element = await this.page.locator(locatorValue);
  const text = await element.textContent();
  expect(text).toContain(expectedText);
});

Then("the element with the locator {string} does not contain the text {string}", async function (locatorValue, expectedText) {
  const element = await this.page.locator(locatorValue);
  const text = await element.textContent();
  expect(text).not.toContain(expectedText);
});

Then("the input field with the locator {string} contains the text {string}", async function (locatorValue, expectedText) {
  const element = await this.page.locator(locatorValue);
  const text = await element.inputValue();
  expect(text).toContain(expectedText);
});
