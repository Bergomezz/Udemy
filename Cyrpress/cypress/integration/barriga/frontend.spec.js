/// <reference types="cypress" />

import loc from '../../support/locators';
import '../../support/commandsContas';
import '../../support/commandsMovimentacao';


describe('Should test at a functional level', () => {
    
    after(() => {
        cy.clearLocalStorage()
    })

    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 2500,
                nome: 'Usuario falso',
                token: 'Uma string muito grande',
            },
        }).as('signin')
        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id:999999,
                    conta:"Carteira",
                    saldo:"100.00",
                },
                {
                    conta_id:999,
                    conta:"Banco",
                    saldo:"1000000.00",
                },
            ],
            }).as('saldo')
        cy.login('bernardo@teste.com.br', '1234')
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
    })

    it('Inserting bills', () => {
        cy.route({
            method: 'GET',
            url: '/conta',
            response: [
                {
                    id: 5454,
                    nome: 'Carteira',
                    visivel: true,
                    usuario_id: 5454,
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 2,
                }
            ]
        }).as('Contas')
    })

    it('Amended bills', () => {
        cy.entrandoAbaConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Aluguel casa')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

    })

    it('Inserting repeated bills', () => {
        cy.entrandoAbaConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
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
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.wait(3000)
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })
    it('Removing moviments', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    })
})