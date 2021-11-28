/// <reference types="cypress" />


describe('Work with basic elements', () => {
    const testPage = 'https://wcaquino.me/cypress/componentes.html'

    before(() => {
        cy.visit(testPage)
    })

    beforeEach(() => {
        cy.reload();
    })

    it('Jquery Selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type=button]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onclick*=Francisco]')
        cy.get('table#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input').type('Teste')
        cy.get('table#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input').type('Teste')
        cy.get('table#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) > input').type('Teste')
        cy.get('table#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) > input')
    })

    it.only('using Xpath', () => {
        cy.xpath("//input[contains(@onclick, \'Francisco\')]")
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(.,"Francisco")]/following-sibling::td/input')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(.,"Francisco")]/..//input[@type="text"]')
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Deu certo?')
    })
})