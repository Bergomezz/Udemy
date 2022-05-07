Cypress.Commands.add('login', (username, password) => {
	cy.clearCookie('all')
	cy.clearLocalStorage()
	cy.get('#user_remember_me').check().should('be.checked')
	cy.get('#user_login').clear().type(username)
	cy.get('#user_password').clear().type(`${password}{enter}`, { log: false })
})
