///<reference types="cypress" />

context('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  // Test de nagacion antes de login 
  it('should navigate is not avaible after login ', () => {
    //Test navegacion a room antes de login 
    cy.visit('http://localhost:5173/rooms')
    // Verifica que un componente del login sea visible
    cy.get('[data-cy=email-input]').should('be.visible')
  })
  // Test de login fallido
  it('should stay on /login when credentials are incorrect', () => {
    cy.get('[data-cy=email-input]').type('error@example.com')
    cy.get('[data-cy=password-input]').type('contraseñamala')
    cy.get('[data-cy=login-submit]').click()

    // Verifica que un componente del login sea visible
    cy.get('[data-cy=email-input]').should('be.visible')
    // Verifica que el mensaje de error esté visible
    cy.get('[data-cy=error-message]').should('be.visible')
      .and('contain', 'Invalid email or password')
  })

  // Test de login exitoso
  it('should redirect to / after successful login', () => {
    cy.get('[data-cy=email-input]').type('admin@example.com')
    cy.get('[data-cy=password-input]').type('123456')
    cy.get('[data-cy=login-submit]').click()

    // Verifica que un componente del Dashboard sea visible
    cy.get('[data-cy=div]').should('be.visible')

    //Navegar a rooms
    cy.visit('http://localhost:5173/rooms')
    // Verifica que un componente del rooms sea visible
    cy.get('[data-cy=create-submit]').should('be.visible')
  })






})
