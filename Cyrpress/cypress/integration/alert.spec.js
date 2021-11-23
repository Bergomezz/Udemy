/// <reference types="cypress" />

describe('Work with alert', () => {
    const testPage = 'https://wcaquino.me/cypress/componentes.html'

    before(() => {
        cy.visit(testPage)
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })
})