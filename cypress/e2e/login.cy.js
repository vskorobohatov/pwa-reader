describe('Login test', () => {
  it('Login', () => {
    cy.login("jon@doe.com", "123456");
    cy.url().should('include', '/books');
  });
});