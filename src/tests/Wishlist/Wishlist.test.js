import React from 'react'
import { shallow } from 'enzyme'
import Wishlist from '../../components/Wishlist/Wishlist'


describe('Wishlist', () => {
  const items = [
    {
      requested_at: '2021-01-01',
      book: {
        title: 'Never ending story'
      }
    },
    {
      requested_at: '2021-03-04',
      book: {
        title: 'Shrek'
      }
    }
  ]

  it('should display empty wishlist info', () => {
    const wrapper = shallow(<Wishlist loading remove={() => {}} request={() => {}}/>)
    const text = wrapper.find('Layout span')
    expect(text.text()).toBe('Your wishlist is empty. Go ahead and add some items!')
  })

  it('should display two items', () => {
    const wrapper = shallow(<Wishlist loading remove={() => {}} request={() => {}} items={items}/>)
    expect(wrapper.find('Layout span')).toHaveLength(2)
  })
})
