declare namespace Cypress {
	interface Chainable {
		/**
		 * Navigate to the home page of our application
		 */
		visitHomepage(): Chainable<Element>
		/**
		 * Navigate to the login page of our application
		 */
		visitLoginPage(): Chainable<Element>
		/**
		 * Navigate to the Feedback page of our application
		 */
		visitFeedbackPage(): Chainable<Element>
		
		/**
		 * Wait for a short amount of a time in seconds
		 * @param seconds - how many seconds should the execution wait
		 */
		waitForSeconds(seconds: number): Chainable<Element>
	}
}

Cypress.Commands.add('visitHomepage', () => {
	cy.visit('index.html')
})

Cypress.Commands.add('visitLoginPage', () => {
	cy.visit('login.html')
})

Cypress.Commands.add('visitFeedbackPage', () => {
	cy.visit('feedback.html')
})

Cypress.Commands.add('waitForSeconds', (seconds) => {
	cy.wait(seconds * 1000)
})