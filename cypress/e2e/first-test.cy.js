/// <reference types="Cypress" />

describe('Task management', () => {
  it('modal to open and close', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.backdrop').click({force:true})
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    cy.contains('Add Task').click();
    cy.contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  })
  
  it('Adding task',()=>{
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('New Task');
    cy.get('#summary').type('Summary for the task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains('New Task');
    cy.get('.task p').contains('Summary for the task');
  })

  it('validation error for adding task',()=>{
      cy.visit('http://localhost:5173/');
      cy.contains('Add Task').click();
      cy.get('.modal').contains('Add Task').click();
      cy.get('.error-message').contains('Please provide values for task title, summary and category!');
  })

  it('filtering tasks',()=>{
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('New Task');
    cy.get('#summary').type('Summary for the task');
    cy.get('#category').select('🚨 Urgent')
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains('New Task');
    cy.get('.task p').contains('Summary for the task');
    cy.get('.task-category').contains('🚨');

    cy.get('#filter').select('🔵 Moderate');
    cy.get('.task').should('have.length',0);

    cy.get('#filter').select('All');
    cy.get('.task').should('have.length',1);

  })

  it('adding multiple tasks',()=>{
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('First Task');
    cy.get('#summary').type('Summary for the task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    cy.contains('Add Task').click();
    cy.get('#title').type('Second Task');
    cy.get('#summary').type('Summary for the task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);
    cy.get('.task').eq(0).contains('First Task');
    cy.get('.task').eq(1).contains('Second Task');
  })

})

