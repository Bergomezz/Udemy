describe('Visual Regression - Login Page', () => {
	before(() => {
		cy.visit('http://zero.webappsecurity.com/index.html')
		cy.get('#signin_button').click()
		cy.get('#user_login').type('test')
		cy.get('#user_password').type('test', { log: false })
		cy.get('#user_remember_me').check()
	})
	it('desktop layout', () => {
		cy.setResolution([1280, 720])
		cy.matchImageSnapshot()
	})

	it('tablet layout', () => {
		cy.setResolution('ipad-2')
		cy.matchImageSnapshot()
	})

	it('mobile layout', () => {
		cy.setResolution('iphone-6')
		cy.matchImageSnapshot()
	})
})
