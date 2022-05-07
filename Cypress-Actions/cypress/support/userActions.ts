declare namespace Cypress {
	interface Chainable {
		/**
		 * Logs into our application
		 * @param username - takes username or id
		 * @param password - takes user password
		 */
		login(username?: string, password?: string): Chainable<Element>

		/**
		 * Fill the feedback form
		 * @param name - takes name of the messa author
		 * @param email - takes email (there is no validation on the backend)
		 * @param subject - takes subjects of the message
		 * @param message - the message of the author
		 */
		submitFeedback(
			name: string,
			email: string,
			subject: string,
			message: string
		): Chainable<Element>
	}
}

Cypress.Commands.add(
	'login',
	(
		username = Cypress.env('USER_ID'),
		password = Cypress.env('USER_PASSWORD')
	) => {
		cy.get('#user_login').type(username)
		cy.get('#user_password').type(password, { log: false })
		cy.get('#user_remember_me').check()
		cy.get('.btn').click()
	}
)

Cypress.Commands.add('submitFeedback', (name, email, subject, message) => {
	cy.get('#name').type(name)
	cy.get('#email').type(email)
	cy.get('#subject').type(subject)
	cy.get('#comment').type(message)
	cy.get('.btn-signin').click()
})
