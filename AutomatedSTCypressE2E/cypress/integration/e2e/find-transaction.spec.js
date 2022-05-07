describe('Find Transaction Test', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/login.html')
		cy.fixture('user').then((user) => {
			const username = user.id
			const password = user.pwd

			cy.login(username, password)
		})
	})

	it('should filter transaction', () => {
		cy.get('#account_activity_tab > a').click()
		cy.contains('Find Transaction').click()
		cy.get('#aa_fromAmount').type('200')
		cy.get('#aa_toAmount').type('1000')
		cy.get('button[type="submit"]').click()
	})

	it('should display results', () => {
		cy.get('#filtered_transactions_for_account').should('be.visible')
		cy.get('tbody > tr').its('length').should('be.gt', 0)
	})
})
