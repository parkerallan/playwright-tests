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