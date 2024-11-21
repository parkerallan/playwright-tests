Feature: Google Search

  Scenario: Search for "Playwright"
    Given I am on the Google homepage
    When I search for "Playwright"
    Then the page title should contain "Playwright"
