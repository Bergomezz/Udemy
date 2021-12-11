// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (email, pass) => {
    cy.get(loc.LOGIN.USER).type(email)
    cy.get(loc.LOGIN.PASSWORD).type(pass)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('loginBernardo', () => {
    cy.login('bernardo@teste.com.br', '123456')
})

Cypress.Commands.add('getToken', (user, pass) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: pass,
        }
    }).its('body.token').should('not.be.empty')
    .then(token => {
        return token
    })
})

Cypress.Commands.add('getTokenUsuarioCriado', () => {
    cy.getToken('bernardo@teste.com.br', '123456')
})

Cypress.Commands.add('resetarContas', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESETAR).click()
})

Cypress.Commands.add('resetRest', (token) => {
    cy.getTokenUsuarioCriado()
    cy.request({
        url: '/reset',
        method: 'GET',
        headers: { Authorization: `JWT ${token}`},
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('getContaByName', nome => {
    cy.getToken('bernardo@teste.com.br', '123456').then(token => {
        cy.request({
            method: 'GET',
            url: `/contas`,
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: nome,
            }
        }).then(res => {
            return res.body[0].id
        })
    })
})