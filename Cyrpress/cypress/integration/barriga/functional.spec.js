/// <reference types="cypress" />

import loc from '../../support/locators';
import '../../support/commandsContas';
import '../../support/commandsMovimentacao';
import { get } from 'lodash';

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
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Aluguel')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Aluguel casa')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

    })

    it('Inserting repeated bills', () => {
        cy.entrandoAbaConta()
        cy.get(loc.CONTAS.NOME).type('Aluguel casa')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'status code 400')
    })

    it('Inserting moviments', () => {
        cy.acessarMovimentacao()
        cy.adicionarMovimentacao('Desc', '123', 'Inter')
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Aluguel casa')).should('contain', '123')
    })
    it('Removing moviments', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Desc')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    })
})