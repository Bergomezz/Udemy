/// <reference types="cypress" />


describe('Work with basic elements', () => {
    const testPage = 'https://wcaquino.me/cypress/componentes.html'

    before(() => {
        cy.visit(testPage)
    })

    beforeEach(() => {
        cy.reload();
    })
    it('Text', () => {        
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 
        'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {        
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        cy.clearCookies()

        cy.contains('Voltar').click()
        cy.clearCookies()
    })

    it('TextFildes', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 
        'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
            .type('TextArea')
            .should('have.value', 
            'TextArea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('Vai la')
                

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}Acerto', {delay: 152})
            .should('have.value', 
            'Acerto')
    })

    it('Radio Button', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get('[name="formSexo"]').should('have.length', 2)
    })

    it.only('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]')
            .click({multiple: true}, {delay: 150})
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it.only('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')
            
        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option')
            .then($arr => {
                const values = []

                $arr.each(function() {
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(["Superior", "Mestrado"])
            })
    })


    it.only('Combo with mutiple selections', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])

        // cy.get('[data-testid=dataEsportes]').should('have.value', 'nada')

    cy.get('[data-testid=dataEsportes]').then($el => {
        expect($el.val()).to.be.deep.equal([
            'natacao', 
            'Corrida', 
            'nada'
        ])
        expect($el.val()).to.have.length(3)
    })

    cy.get('[data-testid=dataEsportes]')
        .invoke('val')
        .should('eql',['natacao', 'Corrida', 'nada'])
    })


})