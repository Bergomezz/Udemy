describe('Password Test', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/index.html')
	})

	it('should click on signin button', () => {
		cy.get('#signin_button').click()
	})

	it('should click on the forgotten password', () => {
		cy.get('.offset3 > a').click()
	})

	it('should fill email form', () => {
		cy.get('#user_email').type('user@email.com')
	})

	it('should submit the form', () => {
		cy.get('.btn').click()
		cy.get('.offset3').contains(
			'Your password will be sent to the following email: user@email.com'
		)
	})
})
