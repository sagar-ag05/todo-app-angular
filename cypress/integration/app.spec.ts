/// <reference types="Cypress" />

describe('Todo Home page', () => {

    it('should have the Add List button', ()=> {
        cy.visit('/');
        cy.get('button').should('have.class', 'btn--primary');
        
    });

    it('Add List button should open create dialog', ()=> {
        cy.visit('/');
        cy.get('button#createList').click();
        cy.get('div#headline').should('contain', 'Enter List name');        
    });

    it('Close dialog on click of cancel', () => {
        cy.visit('/');
        cy.get('button#createList').click();
        cy.get('button#cancel').click();
        cy.get('div#headline').should('not.be.hidden');        
    });

    it('create list', () => {
        cy.visit('/');
        cy.get('button#createList').click();
        cy.get('.list-name').type('random');        
        cy.get('button#create').click();
        cy.get('.list').should('have.length', 3);
    });

    it('delete list', () => {
        cy.visit('/');
        cy.get('.close-button').eq(2).click()
    });

})