/// <reference types='cypress' />

import loc from '../../support/locators';
import '../../support/commandsContas';
import '../../support/commandsMovimentacao';
import buildEnv from '../../support/buildEnv';


describe('Should test at a functional level', () => {
    
    after(() => {
        cy.clearLocalStorage()
    })
    
    beforeEach(() => {
        buildEnv()
        cy.login('bernardo@teste.com.br', '1234')
        cy.get(loc.MENU.HOME).click()
    })

    it('Should test the responsiveness', () => {
        cy.get('[data-test=menu-home] > .fas').should('exist')
            .and('be.visible')
        cy.viewport(500, 700)
        cy.get('[data-test=menu-home] > .fas').should('exist')
            .and('be.not.visible')
        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home] > .fas').should('exist')
            .and('be.not.visible')
        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home] > .fas').should('exist')
            .and('be.visible')
    })

    it('Inserting bills', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 26655}
        }).as('adicionandoContas')

        cy.entrandoAbaConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1, nome: 'Carteira', visivel:true, usuario_id:26655},
                {id:2, nome: 'Banco', visivel:true, usuario_id:26655},
                {id:3, nome: 'Conta de teste', visivel:true, usuario_id:26655},
        ]
        }).as('contasSave')

        cy.adicionandoValorConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Amended bills', () => {
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: {
                id:1, nome: 'Conta alterada', visivel: true, usuario_id: 26655
            }
        })

        cy.entrandoAbaConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

    })

    it('Inserting repeated bills', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {'error': 'Já existe uma conta com esse nome!'},
            status: 400
        }).as('saveContaMesmoNome')

        cy.entrandoAbaConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'status code 400')
    })

    it('Inserting moviments', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {
                id:921608,
                descricao: 'adsd',
                envolvido: 'asdf',
                observacao:null,
                tipo: 'REC',
                data_transacao:'2021-12-30T03:00:00.000Z',
                data_pagamento:'2021-12-30T03:00:00.000Z',
                valor: 1233.00,
                status: true,
                conta_id: 980326,
                usuario_id: 26655,
                transferencia_id: null,
                parcelamento_id: null
            }
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.acessarMovimentacao()
        cy.adicionarMovimentacao('Desc', '123', 'Inter', 'Banco')
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: {
                "conta":"Conta para saldo",
                "id":921611,
                "descricao":"Movimentacao 1, calculo saldo",
                "envolvido":"CCC","observacao":null,
                "tipo":"REC",
                "data_transacao":"2021-12-30T03:00:00.000Z",
                "data_pagamento":"2021-12-30T03:00:00.000Z",
                "valor":"3500.00",
                "status":false,
                "conta_id":990588,
                "usuario_id":26655,
                "transferencia_id":null,
                "parcelamento_id":null
            }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                "conta":"Conta para saldo",
                "id":921611,
                "descricao":"Movimentacao 1, calculo saldo",
                "envolvido":"CCC","observacao":null,
                "tipo":"REC",
                "data_transacao":"2021-12-30T03:00:00.000Z",
                "data_pagamento":"2021-12-30T03:00:00.000Z",
                "valor":"3500.00",
                "status":false,
                "conta_id":990588,
                "usuario_id":26655,
                "transferencia_id":null,
                "parcelamento_id":null
            }
        })

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.wait(3000)
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id:999,
                    conta: 'Carteira',
                    saldo:4034.00,
                },
                {
                    conta_id:9909,
                    conta: 'Banco',
                    saldo:1000000.00,
                },
            ],
        }).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })
    it('Removing moviments', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    })

    it('Should validate data send to create an account', () => {
        const reqStub = cy.stub()

        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 26655},
            // onRequest: req => {
            //     expect(req.request.body.nome).to.be.empty
            //     expect(req.request.headers).to.have.property('Authorization')
            // }
            onRequest: reqStub
        }).as('adicionandoContas')

        cy.entrandoAbaConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1, nome: 'Carteira', visivel:true, usuario_id:26655},
                {id:2, nome: 'Banco', visivel:true, usuario_id:26655},
                {id:3, nome: 'Conta de teste', visivel:true, usuario_id:26655},
        ]
        }).as('contasSave')

        cy.adicionandoValorConta('{CONTROL}')
        // cy.wait('@contasSave').its('request.body.nome').should('not.be.empty')
        cy.wait('@contasSave').then(() => {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should test colors', () => {
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {"conta":"Conta para movimentacoes","id":921609,"descricao":"Receita paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":990586,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":921610,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":990587,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":921611,"descricao":"Despesa paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":990588,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":921614,"descricao":"Despesa pendente","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"-220.00","status":false,"conta_id":990589,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null}
            ]
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    })

})