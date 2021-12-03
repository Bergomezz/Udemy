/// <reference types="cypress" />

describe('Working with clock time', () => {

    const testPage = "https://wcaquino.me/cypress/componentes.html";

    before(() => {
        cy.visit(testPage);
    });

    beforeEach(() => {
        cy.reload();
    });

    it('going back to the past', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '02/12/2021')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Using TICK to advance in the time', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16384')
        cy.get('#resultado > span').invoke('text').should('gt', '1638458566049')

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', '0')

        // cy.wait(1000)
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('lte', '1000')

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', '5000')
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', '15000')



    })

})