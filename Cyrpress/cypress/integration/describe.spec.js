/// <reference types="cypress" />

it('A external test...', () => {

})

describe('Should group test...', () => {
    describe('Should be a more specific test...', () => {
        it.skip('A sprecific test...', () => {

        })    
    })
    
    it('A internal test...', () => {

    })
})