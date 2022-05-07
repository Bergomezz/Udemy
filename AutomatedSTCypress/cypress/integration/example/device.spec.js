describe('Device Test', () => {
	beforeEach(() => {
		cy.visit('https://www.google.com.br/')
	})
	it('720p', () => {
		cy.viewport(1280, 720)
		cy.wait(3000)
	})

	it('1080p', () => {
		cy.viewport(1920, 1080)
		cy.wait(3000)
	})

	it('4k', () => {
		cy.viewport(4096, 2160)
		cy.wait(3000)
	})

	it('iPhoneX', () => {
		cy.viewport('iphone-x')
		cy.wait(3000)
	})

	it('IPad', () => {
		cy.viewport('ipad-2')
		cy.wait(3000)
	})
})
