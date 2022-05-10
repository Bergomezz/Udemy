export default class FeedbackPage {
	static visitFeedbackPage() {
		cy.visitFeedbackPage()
	}

	static fillFeedbackForm() {
		cy.get('#name').type('name')
		cy.get('#email').type('email')
		cy.get('#subject').type('subject')
		cy.get('#comment').type('message')
	}

	static submitFeedbackForm() {
		cy.get('input[type="submit"]').click()
	}
}
