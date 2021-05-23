import React from 'react'
import { shallow } from 'enzyme'
import LibraryWishlist from '../../components/Wishlist/LibraryWishlist'

describe('LibraryWishlist', () => {
  it('should display empty wishlist info', () => {
    const wrapper = shallow(<LibraryWishlist/>)
    const text = wrapper.find('Layout span')
    expect(text.text()).toBe('Your wishlist is empty. Go ahead and add some items!')
  })
})
