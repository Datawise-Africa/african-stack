import { mount } from 'cypress/react'
import { Button } from './button'

describe('<Button />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Button />)
  })
})