describe('Open book', () => {
  it('Open book', () => {
    cy.login("jon@doe.com", "123456");
    cy.wait(1000);
    cy.get('.books-list > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('#book-content').click();
    
  });
});