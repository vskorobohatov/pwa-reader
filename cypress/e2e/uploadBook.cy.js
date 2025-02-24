describe('Upload book', () => {
  it('Upload book', () => {
    cy.login("jon@doe.com", "123456");
    cy.wait(1000);
    cy.get('#add-book-btn').click();
    cy.get('.dropzone-wrapper input[type="file"]').selectFile("./cypress/downloads/testBook.fb2", { force: true });
    cy.get('#upload-btn').click();
    cy.wait(1000);
  });
});