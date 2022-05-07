describe('Screenshots', () => {
	it('ful page screenchot', () => {
		cy.visit('https://devexpress.github.io/testcafe/example/').screenshot({
			capture: 'fullPage',
		})
	})

	it('single element screenshot', () => {
		cy.get('header').screenshot()

		cy.get('#populate').screenshot()
	})
})
