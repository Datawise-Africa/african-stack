import LandingPage from './LandingPage'

describe('<LandingPage />', () => {
  it('renders', () => {
    // Mount with all necessary providers
   cy.mountWithRouter(<LandingPage />)
  })
})