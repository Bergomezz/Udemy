/// <reference types="cypress" />

import loc from '../../support/locators';
import '../../support/commandsContas';

describe('Starting a new real application', () => {
    const aplicacaoPagina = 'https://barrigareact.wcaquino.me/'

    before(() => {
        cy.visit(aplicacaoPagina)
        cy.loginBernardo()
        cy.resetarContas()
    })

    it('Inserting bills', () => {
        cy.entrandoAbaConta()
        cy.adicionandoValorConta('Aluguel')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
        
    })

    it('Amended bills', () => {
        cy.entrandoAbaConta()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Aluguel casa')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

    })

    it('Inserting repeated bills', () => {

    })

    it('Inserting moviments', () => {

    })

    it('Removing moviments', () => {

    })
})