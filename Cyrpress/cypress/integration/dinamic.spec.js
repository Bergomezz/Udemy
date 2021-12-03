/// <reference types="cypress" />

describe("Dinamic testing", () => {
    const testPage = "https://wcaquino.me/cypress/componentes.html";

    before(() => {
        cy.visit(testPage);
    });

    beforeEach(() => {
        cy.reload();
    });

    const foods = ["Carne", "Frango", "Pizza", "Vegetariano"];

    foods.forEach(food => {
        it(`Form with variable ${food}`, () => {
            cy.get("#formNome").type('Usuario');
            cy.get("#formSobrenome").type('Qualquer');
            cy.get(`[name=formSexo][value=F]`).click();
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click();
            cy.get("#formEscolaridade").select('Doutorado');
            cy.get("#formEsportes").select('Corrida');
            cy.get("#formCadastrar").click();
            cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!");
        });
    })

    it.only('Should selected using EACH', () => {
        cy.get("#formNome").type('Usuario');
        cy.get("#formSobrenome").type('Qualquer');
        cy.get(`[name=formSexo][value=F]`).click();
        
        cy.get('[name=formComidaFavorita]').each($el => {
            // $el.click()
            if($el.val() != 'vegetariano')
                cy.wrap($el).click()
        });
        
        cy.get("#formEscolaridade").select('Doutorado');
        cy.get("#formEsportes").select('Corrida');
        cy.get("#formCadastrar").click();
        cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!");
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
    
});
