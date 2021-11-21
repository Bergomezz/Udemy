/// <reference types="cypress" />

describe('Cypress basics', () => {
    const testPage = 'https://wcaquino.me/cypress/componentes.html'
    it.only('Should visit a page and assrt title', () => {        
        cy.visit(testPage)
        function assertiva(titulo,string){
            cy.title()
                .should('be.equal', titulo)
                .should('contain', string).debug()
        }
        // const title = cy.title()
        // console.log(title)
        assertiva('Campo de Treinamento', 'Campo')


    })

    //TODO Imprimir o log no console
    //TODO Escrever o title em um campo de texto

    it('Should find and interact with an element', () => {
        cy.visit(testPage)
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })

})