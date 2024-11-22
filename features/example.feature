Feature: Google Search

  Scenario: Search for "Playwright"
    Given I am on the Google homepage
    When I search for "Playwright"

  Scenario: Search for "Playwright" with reusable step definitions
    Given a user opens the page "https://google.com"
    When entering the text "Playwright" in the element with locator value "#APjFqb"
    When pressing the "Enter" key
    When implicitly waiting for 2000 milliseconds
    Then the input field with the locator "#APjFqb" contains the text "Playwright"
    Then the following elements are displayed
      | Locator | Locator_Value |
      | id      | #logo         |