describe('Currency Exchange Test', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/login.html')
		cy.fixture('user').then((user) => {
			const username = user.id
			const password = user.pwd

			cy.login(username, password)
		})
	})

	it('should fill conversion form', () => {
		cy.get('#pay_bills_tab > a').click()
		cy.contains('Purchase Foreign Currency').click()
		cy.get('#pc_currency').select('China (yuan)')
		cy.get('#pc_amount').type('1000')
		cy.get('#pc_inDollars_true').check()
		cy.get('#pc_calculate_costs').click()
	})

	it('should display conversion amount', () => {
		cy.get('#pc_conversion_amount')
			.should('be.visible')
			.and('contain', '5757.05 yuan (CNY) = 1000.00 U.S. dollar (USD)')
	})
})
