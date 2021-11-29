/// <reference types="cypress" />


describe('Testing radio button', () => {

    it('Enter vehicle data', () => {
        cy.visit('http://sampleapp.tricentis.com/101/app.php')

        cy.get("#make").select('BMW')
        cy.get("#model").select('Motorcycle')
        cy.get("#cylindercapacity").type('1100')
        cy.get("#engineperformance").type('200')
        cy.get("#dateofmanufacture").type('12/20/1984')
        cy.get("#numberofseats").select('2')
        cy.get(':nth-child(7) > .group > :nth-child(1) > .ideal-radio').click()
        cy.get('#numberofseatsmotorcycle').select('3')
        cy.get('#fuel').type('Gas')
        cy.get('#payload').type('150')
        cy.get('#totalweight').type('300')
        cy.get('#listprice').type('10000')
        cy.get('#licenseplatenumber').type('RIF46AA')
        cy.get('#annualmileage').type('100000')
        cy.get('#nextenterinsurantdata').click()
    })


})