Feature: Login to Application
  As a invalid user
  I cannot login into the applicatio


  As a valid user
  I want to log in the applicatio

  Scenario: Invalid login
    Given I open login page
    And I want to wait for 2000 milliseconds
    And I see "Zero - Log in" in the title
    And I see "/login" in the url
    When I fill the username with "invalidusername"
    And I fill the password with "invalidpassword"
    And I click on the submit
    Then I should see error message
    And I reload the browser

  Scenario: Valid login
    Given I open login page
    When I fill the username with "username"
    And I fill the password with "password"
    And I click on the submit
    Then I should see homepage
