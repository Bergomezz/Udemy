describe('Keyboard Press Simulation', () => {
	it('should submit searchbox with pressing enter', () => {
		const term = 'text'
		cy.visit('http://zero.webappsecurity.com/index.html')

		cy.get('#searchTerm').type(`${term}{enter}`)
		cy.url().should(
			'be.equal',
			`http://zero.webappsecurity.com/search.html?searchTerm=${term}`
		)
		//cy.contains('No results were found for the query: anything')
	})
})
