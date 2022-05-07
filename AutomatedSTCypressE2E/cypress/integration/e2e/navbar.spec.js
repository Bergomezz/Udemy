describe('Navbar Test', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/index.html')
	})

	it('should display Online content Banking', () => {
		cy.contains('Online Banking').click()
		cy.url().should('include', 'online-banking.html')
		cy.get('h1').should('be.visible')
		cy.get('h1').should('contain', 'Online Banking')
	})

	it('should display Feedback content', () => {
		cy.contains('Feedback').click()
		cy.url().should('include', 'feedback.html')
		cy.get('h3').should('contain', 'Feedback')
	})

	it('should display homepage content', () => {
		cy.get('.brand').click()
		cy.url().should('include', 'index.html')
		cy.get('#homeMenu > div > strong').should('contain', 'Home')
	})
})
