import React from 'react'
import { shallow } from 'enzyme'
import Reservations from '../../components/Reservations/Reservations'

describe('Reservations', () => {
  it('should show text', () => {
    const wrapper = shallow(<Reservations/>)
    const text = wrapper.find('Layout span')
    expect(text.text()).toBe('There are no awaiting reservations, good job!')
  })
})
