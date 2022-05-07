Cypress.Commands.add('login', (username, password) => {
	cy.get('#user_login').type(username)
	cy.get('#user_password').type(password, { log: false })
	cy.get('#user_remember_me').check()
	cy.contains('Sign in').click()
})

Cypress.Commands.add('getToken', (user, pass) => {
	cy.request({
		method: 'POST',
		url: 'http://zero.webappsecurity.com/login.html',
		body: {
			email: user,
			redirecionar: false,
			senha: pass,
		},
	})
		.its('body.token')
		.should('not.be.empty')
		.then((token) => {
			Cypress.env('token', token)
			return token
		})
})

Cypress.Commands.add('getTokenUser', () => {
	cy.fixture('user').then((user) => {
		cy.getToken(user.id, user.pwd)
	})
})
