describe('Authentication E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show login page', () => {
    cy.contains('Login').should('be.visible');
    cy.contains('Register').should('be.visible');
  });

  it('should handle form validation', () => {
    cy.contains('Register').click();
    cy.contains('button', 'Register').click();
    cy.contains('required').should('exist');
  });
});
