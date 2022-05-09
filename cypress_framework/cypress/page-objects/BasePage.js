import cypress from 'cypress'

export default class BasePage {
	static pause(ms) {
		cypress.wait(ms)
	}

	static logInfo(messaga) {
		cy.log(messaga)
	}

	static setMobileViewport() {
		cy.viewport('iphone-x')
	}

	static setTabletViewport() {
		cy.viewport('ipad-2')
	}

	static setDesktopViewport() {
		cy.viewport('macbook-16')
	}

	static setLargeDesktopViewport() {
		cy.viewport(1980, 1080)
	}
}
