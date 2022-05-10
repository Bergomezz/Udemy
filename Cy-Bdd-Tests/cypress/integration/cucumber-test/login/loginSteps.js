import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import LoginPage from './loginPage'

Given('I open login page', () => {
	cy.visitLogin()
})

When('I fill the username with {string}', usernamer => {
	LoginPage.userId(usernamer)
})

When('I fill the password with {string}', password => {
	LoginPage.userPassword(password)
})

When('I click on the submit', () => {
	LoginPage.submit()
})

Then('I should see homepage', () => {
	cy.get('#account_summary_tab').should('be.visible')
})

Then('I should see error message', () => {
	LoginPage.errorMessageAlert()
})
