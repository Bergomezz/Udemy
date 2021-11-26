/// <reference types="cypress" />

describe('Work with PopUp', () => {

    it('Its have to test the popup directly', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

    it.only('Its have to verify if the popup was invoke ', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('popup')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@popup').should('be.called')
    })

    describe.only('With links', () => {
        beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        })
        it('Check popup URL', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })

        it('Should access popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('eh funcional dessa forma?')
            })
            //bom para link dinâmicos.
        })

        it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            
            cy.get('#tfield').type('eh funcional')
            
        })
    })
})