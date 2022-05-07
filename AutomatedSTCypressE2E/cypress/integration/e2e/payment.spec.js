describe('Payment Test', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/login.html')
		cy.fixture('user').then((user) => {
			const username = user.id
			const password = user.pwd

			cy.login(username, password)
		})
	})

	it('should send new payment (faker)', () => {
		cy.get('#pay_bills_tab > a').click()
		cy.contains('Pay Saved Payee').click()
		cy.get('#sp_payee').select('Wells Fargo')
		cy.get('#sp_account').select('Credit Card')
		cy.get('#sp_amount').type('200000')
		cy.get('#sp_date').type('2022-05-04 {enter}')
		cy.get('#sp_description').type('Good bye money!!!')
		cy.get('#pay_saved_payees').click()
	})

	it('should show sucess message', () => {
		cy.get('#alert_content')
			.should('be.visible')
			.and('contain', 'The payment was successfully submitted.')
	})
})
