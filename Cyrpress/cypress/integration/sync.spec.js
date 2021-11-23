/// <reference types="cypress" />

describe('Waiting...', () => {
    const testPage = 'https://wcaquino.me/cypress/componentes.html'

    before(() => {
        cy.visit(testPage)
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Should wait the element be visible', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Qualquer coisa')
    })

    it.only('Should retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('exist')
            //.should('not.exist')
            .type('funciona')
    })

    it.only('Find use', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it.only('Find use', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it.only('Timeout use', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('exist')

        // cy.get('#buttonListDOM').click()
        // cy.wait(5000)
        // cy.get('#lista li span', {timeout: 30000})
        //     .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
    })

    it.only('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', "1")

    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').then($el => {
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })
    })
})