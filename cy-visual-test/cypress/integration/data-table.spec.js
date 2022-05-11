const { it } = require('mocha')

describe('Visual Regression - Data Tables', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/index.html')
		cy.get('#signin_button').click()
		cy.get('#user_login').type('username')
		cy.get('#user_password').type('password')
		cy.get('#user_remember_me').check()
		cy.get('input[type="submit]').click()
	})
	it('should load account activity', () => {
		cy.get('#account_activity_tab').click()
	})

	it('data table snapshot', () => {
		cy.matchImageSnapshot()
	})
})
