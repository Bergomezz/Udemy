Feature: Send Feedback
  As a customer
  I can send my feedback via form

  Scenario: Submit feedback form
    Given I open feedback page
    When I fill feedback form
    And I click on submit button
    Then I see "sendFeedback.html" in the url
