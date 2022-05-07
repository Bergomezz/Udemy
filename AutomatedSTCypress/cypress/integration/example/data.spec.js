describe('Write / Read Data to JSON / Text File', () => {
	it('should write data into JSON', () => {
		cy.writeFile('cypress/jsons/log.json', {
			name: 'Bernardo',
			age: 25,
			operation: 'Tester',
			worktime: '1 year',
		})
	})

	it('should write data to a text file', () => {
		cy.writeFile('cypress/txt/log.txt', 'Hello World')
	})

	it('should read and verify data from JSON', () => {
		cy.readFile('cypress/jsons/log.json').then((log) => {
			expect(log.name).to.equal('Bernardo')
		})
	})

	it('should read and verify data from txt file', () => {
		cy.readFile('cypress/txt/log.txt').should('eq', 'Hello World')
	})

	it('should read and verify browser documents', () => {
		cy.visit('https://example.com')
		cy.wait(2000)
		cy.document().its('contentType').should('eq', 'text/html')

		cy.document().should('have.a.property', 'charset').and('equal', 'UTF-8')
	})
})
