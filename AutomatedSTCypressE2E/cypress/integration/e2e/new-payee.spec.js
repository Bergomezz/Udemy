describe('New Payee Test', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/login.html')
		cy.fixture('user').then((user) => {
			const username = user.id
			const password = user.pwd

			cy.login(username, password)
		})
	})

	it('should add new payee to the list', () => {
		cy.get('#pay_bills_tab > a').click()
		cy.contains('Add New Payee').click()
		cy.fixture('payee').then((user) => {
			cy.get('#np_new_payee_name').type(user.name)
			cy.get('#np_new_payee_address').type(user.adress)
			cy.get('#np_new_payee_account').type(user.account)
			cy.get('#np_new_payee_details').type(user.details)
		})
		cy.get('#add_new_payee').click()
	})

	it('should show sucess message', () => {
		cy.get('#alert_content')
			.should('be.visible')
			.and('contain', `The new payee Supplier A was successfully created.`)
	})
})
