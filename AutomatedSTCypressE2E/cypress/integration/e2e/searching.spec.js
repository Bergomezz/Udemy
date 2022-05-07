describe('Searchbox Test', () => {
	const faker = require('faker')
	const random = faker.random.word()
	before(() => {
		cy.visit('http://zero.webappsecurity.com/index.html')
	})

	it(`should type ${random} into a searchbox and submit pressing enter`, () => {
		cy.get('#searchTerm').type(`${random}{enter}`)
		cy.url().should('contain', random)
		cy.title().should('be.eq', 'Zero - Search Tips')
	})

	it('should show search result page', () => {
		cy.get('h2').contains('Search Results:')
	})
})
