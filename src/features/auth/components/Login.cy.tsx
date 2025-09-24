import { mount } from 'cypress/react'
import Login from './Login'

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Login />)
  })
})