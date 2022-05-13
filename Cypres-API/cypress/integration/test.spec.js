describe('REST API test with Cypress', () => {
	it('API test - validate headers', () => {
		cy.request({
			method: 'POST',
			url: 'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
			failOnStatusCode: false,
			Body: {
				message: 'testing something',
				number: 123456789,
			},
		}).then(response => {
			cy.writeFile('cypress/json/user.json', response.body)
		})
	})
})
