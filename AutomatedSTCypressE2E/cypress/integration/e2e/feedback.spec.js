describe('Feedback Test', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/index.html')
	})

	it('should load feedback form', () => {
		cy.get('#feedback').click()
		cy.get('#feedback-title').should('contain', 'Feedback')
		cy.get('form').should('be.visible')
	})

	it('should fill feedback form', () => {
		cy.get('#name').type('Anyone')
		cy.get('#email').type('test@email.com')
		cy.get('#subject').type('Bug Tests')
		cy.get('#comment').type(
			'Please, you need to amend on the button to access this page'
		)
	})

	it('should submit feedback form', () => {
		cy.get('.btn-signin').click()
	})

	it('should display feedback message', () => {
		cy.url().should('include', 'sendFeedback.html')
	})
})
