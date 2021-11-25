/// <reference types="cypress" />

describe('Work with iFrames', () => {
    const testPage = 'https://wcaquino.me/cypress/componentes.html'
    before(() => {
        cy.visit(testPage)
    })

    it('It most complet textfild', () => {
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('Funciona')
                .should('have.value', 'Funciona')

            cy.on('window:alert', msg => {
                expect(msg).to.be.equal('Alert Simples')
            })
            
            cy.wrap(body).find('#otherButton').click()
        })

    })
})