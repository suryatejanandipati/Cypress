
describe('modal to open and close', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click({force: true});
    cy.get('backdrop').should('not.exist');
    cy.get('modal').should('not.exist');

    cy.contains('Cancel').click();
    cy.get('backdrop').should('not.exist');
    cy.get('modal').should('not.exist');
  })
})