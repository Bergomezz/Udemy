describe('Browser Actions', () => {
	it('visiting the website', () => {
		cy.visit('https://books.toscrape.com/index.html')
		cy.url().should('include', 'index.html')
		cy.log('Before Reload')
		cy.reload()
		cy.log('After Reload')
	})

	it('should click on Travel category', () => {
		cy.navCategories('Travel')
		cy.get('h1').contains('Travel')
	})

	it('Should display correct number of books', () => {
		cy.get('.product_pod').its('length').should('equal', 11)
	})
})

describe('Challenge lesson', () => {
	it('checking the price of some books', () => {
		cy.navCategories('Poetry')
		cy.get('.product_pod').contains('Olio').click()

		cy.get('.product_main > .price_color').should('contain', '£23.88')
	})
})
