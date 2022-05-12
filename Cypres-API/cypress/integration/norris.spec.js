describe('REST API test with Cypress', () => {
	it('API test - validate headers', () => {
		cy.request({
			method: 'GET',
			url: 'https://api.chucknorris.io/jokes/categories',
		}).then(response => {
			cy.writeFile('cypress/fixtures/norrisjoke.json', response.body)
		})
	})
	it('API test - using fixture to create a json file', () => {
		cy.request({
			method: 'GET',
			url: `https://api.chucknorris.io/jokes/random`,
		}).then(response => {
			const joke = response.body
			cy.writeFile(`cypress/txt/randomjoke.txt`, joke.value)
		})
	})
})
