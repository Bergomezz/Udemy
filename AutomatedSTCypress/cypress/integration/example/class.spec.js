class BasePage {
	static loadHomePage() {
		cy.visit('https://devexpress.github.io/testcafe/example/')
	}

	static wait(number) {
		cy.wait(number)
	}
}

class HomePage extends BasePage {
	static scrollToBottom() {
		cy.get('#submit-button').scrollIntoView()
	}

	static scrollToTop() {
		cy.get('header').scrollIntoView()
	}
}

describe('Abstraction with Classes', () => {
	before(() => {
		HomePage.loadHomePage()
	})

	after(() => {
		HomePage.wait(1000)
		cy.clearCookie('all')
		cy.clearLocalStorage()
	})
	it('should scroll down and up n the page', () => {
		HomePage.wait(2000)
		HomePage.scrollToBottom()
		HomePage.wait(3000)
		HomePage.scrollToTop()
	})
})