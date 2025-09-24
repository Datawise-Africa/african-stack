import ErrorPage from './ErrorPage';

// Create a mock version of ErrorPage that doesn't depend on React Router hooks

describe('<ErrorPage />', () => {
  it('renders mock error page', () => {
    // Use standard mounting for the mock component
    cy.mountWithRouter(<ErrorPage />)
    
    // Verify error page content
    cy.contains('Oops!').should('be.visible')
    cy.contains('Sorry, an unexpected error has occurred.').should('be.visible')
    cy.contains('Not Found').should('be.visible')
    cy.get('[role="alert"]').should('be.visible')
  })
})