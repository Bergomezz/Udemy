describe('REST API test with Cypress', () => {
	it('API test - validate headers', () => {
		cy.request({
			method: 'POST',
			url: 'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
			Headers: {
				date: 'Thu, 12 May 2022 18:01:38 GMT',
				'content-type': 'application/json',
				'content-length': '42',
				connection: 'keep-alive',
				'x-amzn-requestid': 'ca5ee3a2-4b73-496c-a2ee-6a82fb779a92',
				'x-amzn-errortype': 'MissingAuthenticationTokenException',
				'x-amz-apigw-id': 'SBi8eHUboAMFf5w=',
			},
			Body: {
				message: 'testing something',
				number: 123456789,
			},
		}).then(response => {
			cy.writeFile('cypress/json/user.json', response.body)
		})
	})
})
