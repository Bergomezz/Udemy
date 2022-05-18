describe('Assertions', () => {
  it('tips and ideas', () => {
    // retry until we find 5 matching selected lists
    cy.get('li.selected').should('have.lenght', 5)

    //retry until input does not have class disable
    cy.get('form').find('input').should('not.have.class', 'disable')

    //retry until textarea has the correct value
    cy.get('textarea').should('have.value', 'Placeholder..')

    //retry until span does not contain "click me"
    cy.get('a').parent('span').should('not.contain', 'click me')

    //retry until button is visible
    cy.get('button').should('be.visible')

    //retry until loading spinner no longer exist
    cy.get('#spinner').should('not.exist')
  })
})