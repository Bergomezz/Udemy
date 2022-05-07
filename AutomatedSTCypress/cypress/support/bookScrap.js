Cypress.Commands.add('navCategories', (name) => {
	cy.get('a').contains(name).click()
})
