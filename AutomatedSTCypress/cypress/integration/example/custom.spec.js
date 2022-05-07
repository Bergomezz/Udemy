const faker = require('faker')
describe('Custom Commands', () => {
	const username = faker.random.word()
	const password = faker.random.word()

	it('should login application using custom commands', () => {
		cy.visit('http://zero.webappsecurity.com/login.html')
		cy.login(username, password)
		cy.get('.alert')
			.should('be.visible')
			.and('contain', 'Login and/or password are wrong')
	})
})
