describe('Demo Test', () => {
	it('should login into web application', () => {
		cy.visitLoginPage()
		cy.waitForSeconds(5)
		cy.login()
	})
})
