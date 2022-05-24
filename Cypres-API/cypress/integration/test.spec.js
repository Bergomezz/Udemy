describe('REST API test with Cypress', () => {
	it('API test - validate headers', () => {
		cy.intercept(
			'POST',
			'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
			{
				failOnStatusCode: false,
				body: {
					message: 'testing something',
					number: 123456789,
				},
				statusCode: 404,
			}
		)
			.as('postInformation')
			.should(response => {
				cy.writeFile('cypress/fixtures/user.json', response.body)
			})
	})
})
