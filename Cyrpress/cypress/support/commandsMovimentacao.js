import loc from './locators';

Cypress.Commands.add('acessarMovimentacao', () => {
    cy.get(loc.MENU.MOVIMENTO).click()
})

Cypress.Commands.add('adicionarMovimentacao', (desc, valor, inter) => {
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type(desc)
    cy.get(loc.MOVIMENTACAO.VALOR).type(valor)
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type(inter)
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
})