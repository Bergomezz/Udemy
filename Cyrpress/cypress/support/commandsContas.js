import loc from './locators'

Cypress.Commands.add('entrandoAbaConta', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('adicionandoValorConta', (nomeConta) => {
    cy.get(loc.CONTAS.NOME).type(nomeConta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})
