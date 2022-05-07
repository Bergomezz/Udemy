describe('Feedback Page Test', () => {
	it('should fill the feedback form', () => {
		cy.visitFeedbackPage()
		cy.fixture('feedbackData').then(({name, email, subject, message}) => {
			cy.submitFeedback(name, email, subject, message)
		})
		cy.get('#feedback-title').should('contain', 'Feedback')
	})
})
