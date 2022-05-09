export default class LoginPage {
	static login(username, password) {
		cy.login(username, password)
	}

	static clickForgotPasswordLink() {
		cy.contains('Forgot your password ?').click()
	}

	static displayErroMessage() {
		cy.isVisible('.alert-error')
	}
}
