# Playwright Cucumber Template
This is a Playwright Cucumber template designed for automated browser testing with the Cucumber framework. It combines Playwright's browser automation with Cucumber's readable syntax for behavior-driven development (BDD).

## Prerequisites
Before setting up the template, ensure you have the following installed on your machine:

- Node.js v19/20/22

- npm (Node package manager)

### Setup
1. Clone this repository:
```bash
git clone https://github.com/parkerallan/playwright-template.git
cd playwright-cucumber-template
```
2. Install the required dependencies:
```bash
npm install
```
This installs all the necessary packages, including:

- @cucumber/cucumber - Cucumber framework for BDD.
- playwright - Playwright browser automation library.
- dotenv - Load environment variables from .env files.
3. Set Up Environment Variables

Create a .env file in the root directory of the project. Add the following variables, customizing the values for your environment:

```plaintext
PL_INSTANCE=https://example.com
LOCAL_USER=admin
LOCAL_PASSWORD=yourpassword
HEADLESS=true (or false)
```
These environment variables will be used in your test scenarios, such as the instance URL and user credentials.

## Feature Files
Create feature files under the features folder. Here's an example:

```gherkin
@debug
Feature: Portal Login
 
  Scenario: Login to Portal as an Admin
    Given a user opens the page "${PL_INSTANCE}/admin"
    When waiting for element with locator value "#user_field" to be visible
    When entering the text "${LOCAL_USER}" in the element with locator value "#user_field"
    When entering the text "${LOCAL_PASSWORD}" in the element with locator value "#pass_field"
    When clicking the element with locator value "#admin-login-btn"
    When implicitly waiting for 3000 milliseconds
    Then the following elements are displayed
      | Locator | Locator_Value        |
      | xpath   | //*[@id="user-menu"] |
      | xpath   | //*[@id="user-profile"] |
```
This feature file contains the BDD-style syntax, and the placeholders like ${PL_INSTANCE} will be resolved dynamically from the environment variables by adding variables to the resolveVar util function.
Example Step Definitions

Here is an example step definition included in the template:

```javascript
const { When } = require('@cucumber/cucumber');
const { resolveVars } = require ('../utils/resolveVars.js');
require('dotenv').config();

When("entering the text {string} in the element with locator value {string}", async function (text, value) {
  let cred = resolveVars(text);
  let element = await this.page.locator(value);
  await element.fill(cred);
});
```
If your step uses env variables or secrets such as here:
```gherkin
When entering the text "${LOCAL_USER}" in the element with locator value "#user_field"
```
They must be defined in the resolveVars.js and in your local .env file so they can be replaced with the real value for the environment you are testing.
```javascript
function resolveVars(inputString) {
  return inputString.replace(/\${(.*?)}/g, (match, varName) => {
    switch (varName) {
      case 'LOCAL_USER':
        return process.env.LOCAL_USER || match;
      case 'LOCAL_PASSWORD':
        return process.env.LOCAL_PASSWORD || match;
      ...
      default:
        return match;
    }
  });
```
## Running Tests
#### Run All Tests
To run all tests in your project, use the npm test command defined in the package.json. This will include feature files and step definitions:

```bash
npm test
```
#### Run Tests with Specific Tags
You can run tests with specific tags using the --tags option. For example, to run tests tagged with @debug:

```bash
npx cucumber-js --tags @debug
```
or by adding the tag to the package.json command for npm test
```json
  "scripts": {
    "test": "cucumber-js --require ./step-definitions/**/*.js ./features/**/*.feature --tags @debug"
  },
```