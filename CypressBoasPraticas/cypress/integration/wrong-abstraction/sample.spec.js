describe('Wrong abstraction bad practice', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**'
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')
  })
  
  const terms = ['cypress', 'selenium', 'playwright']

  terms.forEach(term => {
    it('user custom commad for assretion just for the sake of reusability', () => {
      cy.search(term)
      cy.wait('@getStories')

      cy.get('.table-row').its('length').should('be.at.least', 1)
    })
  })
})
