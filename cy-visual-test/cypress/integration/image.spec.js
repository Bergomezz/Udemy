const pages = ['https://example.com/']
const sizes = ['iphone-6', 'ipad-2', [1200, 800]]

describe('Visual Regression', () => {
	sizes.forEach(size => {
		pages.forEach(page => {
			it(`should match ${page} in the resolution ${size}`, () => {
				let currentTime = new Date(Date.UTC(2022, 1, 1)).getDate()
				cy.clock(currentTime)
				cy.setResolution(size)
				cy.visit(page)
				cy.matchImageSnapshot()
			})
		})
	})
})

describe('Single Element Snapshot', () => {
	it('should match a single element on the page', () => {
		cy.visit('https://example.com/')
		cy.get('h1').matchImageSnapshot({
			failureThreshold: 10.0,
			failureThresholdType: 'pixels',
		})
	})
})
