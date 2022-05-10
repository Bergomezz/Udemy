import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import FeedbackPage from './feedbackPage'

Given('I open feedback page', () => {
	FeedbackPage.visitFeedbackPage()
})

When('I fill feedback form', () => {
	FeedbackPage.fillFeedbackForm()
})

When('I click on submit button', () => {
	FeedbackPage.submitFeedbackForm()
})
