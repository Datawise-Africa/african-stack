import { mount } from 'cypress/react'
import OptimizedImage from './OptimizedImage'

describe('<OptimizedImage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <OptimizedImage
        src="https://example.com/test-image.jpg"
        alt="Test image"
      />
    )
  })
})