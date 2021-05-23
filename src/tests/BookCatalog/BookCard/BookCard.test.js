import React from 'react'
import { shallow } from 'enzyme'
import BookCard from '../../../components/BookCatalog/BookCard/BookCard'


describe('BookCard', () => {
  const book = {
    title: 'Hey there!',
    author: 'Someone famous',
    isbn:'123124u1249124824',
    subject_area: 'Romance',
    available_copies: 15,
    description: 'not important'
  }

  const fakeFunc = () => {
    return 'I am a fake function'
  }

  it('should display heart icon', () => {
    const wrapper = shallow(<BookCard item={book} removeFromWishlist={fakeFunc} addToWishlist={fakeFunc} isInWishlist={true}/>)
    expect(wrapper.find('Card CardContent CardHeader Icon').exists()).toBeTruthy();
  })

  it('should not display heart icon', () => {
    const wrapper = shallow(<BookCard item={book}/>)
    expect(wrapper.find('Card CardContent CardHeader Icon').exists()).toBeFalsy();
  })

})
