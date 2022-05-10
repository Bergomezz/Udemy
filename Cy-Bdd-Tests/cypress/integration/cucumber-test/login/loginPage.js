export default class LoginPage {
	static loginForm() {
		cy.get('#login_form').should('be.visible')
		cy.get('#user_login').type(Cypress.env('USER_ID'))
		cy.get('#user_password').type(Cypress.env('USER_PASSWORD'), { log: false })
		cy.get('#user_remember_me').check()
		cy.get('.btn').click()
	}

	static userId(name = Cypress.env('USER_ID')) {
		cy.get('#user_login').type(name)
	}

	static userPassword(password = Cypress.env('USER_PASSWORD')) {
		cy.get('#user_password').type(password, { log: false })
	}

	static submit() {
		cy.get('#user_remember_me').check()
		cy.get('.btn').click()
	}

	static errorMessageAlert() {
		cy.get('.alert-error')
			.should('be.visible')
			.and('contain', 'Login and/or password are wrong.')
	}
}
