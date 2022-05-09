/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * Logs into our app
		 * @param username - takes username or id
		 * @param password - takes user password
		 */
		login(username?: string, password?: string)

		/**
		 * Check if some element is visible in the application
		 * @param selector - take the selector of element
		 */
		isVisible(selector: string)

		/**
		 * Check if some element is NOT visible
		 * @param selector - take the selector of element
		 */
		isHidden(selector: string)
	}
}

export default Cypress
