/// <reference types="Cypress" />

describe('REST API test with Cypress', () => {
	it('API test - validate headers', () => {
		const pokemonsId = [1, 2, 3, 10, 23, 25]
		pokemonsId.forEach(id => {
			cy.request(`https://pokeapi.co/api/v2/pokemon/${id}`)
				.as('pokemon')
				.then(response => {
					cy.writeFile(`cypress/json/pokemon${id}.json`, response.body)
				})
		})

		cy.get('@pokemon')
			.its('headers')
			.its('content-type')
			.should('include', 'application/json; charset=utf-8')
	})

	it('API test - validate status code', () => {
		cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
		cy.get('@pokemon').its('status').should('equal', 200)
	})

	it('API test - validate name value', () => {
		cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
		cy.get('@pokemon').its('body').should('include', { name: 'pikachu' })
	})

	it('API test - validate negative status code', () => {
		cy.request({
			method: 'GET',
			url: 'https://pokeapi.co/api/v2/pokemon/1000',
			failOnStatusCode: false,
		}).as('pokemon')
		cy.get('@pokemon').its('status').should('equal', 404)
	})
})
