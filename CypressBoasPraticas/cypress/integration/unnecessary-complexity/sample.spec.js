describe('Unnecessary complexity anti-patter', () => {
  beforeEach(() => {
    cy.visit('https://bit.ly/2XSuwCW')

    if (Math.random() > 0.5) {
      cy.get('#agree')
        .click()
      cy.log('check box was checked')
    }
  })

  Cypress._.times(5, () => {
    it('checks the checkbox only if not checked', () => {
      cy.get('#agree')
        .check()
        .should('be.checked')
    })
  })
})