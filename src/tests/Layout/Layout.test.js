import React from 'react'
import { shallow } from 'enzyme'
import Layout from '../../components/Layout/Layout'
import { Loader } from 'semantic-ui-react'

describe('Layout', () => {
  it('should apply wrapper class', () => {
    const wrapper = shallow(<Layout useWrapper />)
    expect(wrapper.find('div').hasClass('wrapper')).toEqual(true);
  })

  it('should display Loader', () => {
    const wrapper = shallow(<Layout useWrapper loading />)
    const loader = wrapper.find('div Dimmer Loader')
    expect(loader.getElement()).toStrictEqual(<Loader>Loading</Loader>);
  })
})
