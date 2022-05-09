import Navbar from '../../page-objects/components/Navbar'
import LoginPage from '../../page-objects/pages/LoginPage'

describe('Login Failed Test', () => {
	before(() => {
		cy.visit('/')
		Navbar.clickSignIn()
	})

	it('should try to login with invalid credential', () => {
		LoginPage.login('invalid username', 'invalid password')
	})

	it('should diplay error message', () => {
		LoginPage.displayErroMessage()
	})
})

describe('Login Success Test', () => {
	before(() => {
		cy.visit('/')
		Navbar.clickSignIn()
	})

	it('should login into the applicatio', () => {
		LoginPage.login(Cypress.env('USER_ID'), Cypress.env('USER_PASSWORD'))
	})

	it('should logout from application', () => {
		Navbar.logout()
		Navbar.displaySignInButton()
	})
})
