/// <reference types="cypress" />

describe('Cypress basics', () => {
    const testPage = 'https://wcaquino.me/cypress/componentes.html'
    it.only('Should visit a page and assert title', () => {        
        cy.visit(testPage)
        function assertiva(titulo,string){
            cy.title()
                .should('be.equal', titulo)
                .should('contain', string).debug()
        }
        // const title = cy.title()
        // console.log(title)
        assertiva('Campo de Treinamento', 'Campo')

        let syncTitle

        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })

    })


    it('Should find and interact with an element', () => {
        cy.visit(testPage)
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })

})