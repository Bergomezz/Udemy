describe('Working with inputs', () => {
	const faker = require('faker')
	const username = faker.random.word()
	const password = faker.random.word()

	it('should override the current time', () => {
		const date = new Date(2022, 3, 10).getTime()
		cy.clock(date)
		cy.log(date)
	})

	it('should visit the webpage', () => {
		cy.visit('http://zero.webappsecurity.com/login.html').clearCookie('all', {
			log: true,
		})
		cy.clearLocalStorage('your item', { log: true })
		cy.title().should('include', 'Zero - Log in')
	})

	it('should fill username', () => {
		cy.get('#user_login').clear().type(username)
	})

	it('should fill password', () => {
		cy.get('#user_password').clear().type(`${password}`)
	})

	it('should mark checkbox', () => {
		cy.get('#user_remember_me').check().should('be.checked')
	})

	it('should submit login form', () => {
		cy.get('.btn').click()
	})

	it('should display error message', () => {
		cy.get('.alert')
			.should('be.visible')
			.and('contain', 'Login and/or password are wrong')
	})
})
