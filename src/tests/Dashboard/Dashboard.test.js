import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from '../../components/Dashboard/Dashboard'



describe('Dashboard', () => {
  const librarian = {
    email: 'test@test.dk',
    campus: {
      address: {
        street: 'random',
        number: '144',
        post_code: '9220',
        city: 'Aalborg',
        country: 'Denmark',
      }
    }
  }

  const customer = {
    email: 'test@test.dk',
    campus: {
      address: {
        street: 'random',
        number: '144',
        post_code: '9220',
        city: 'Aalborg',
        country: 'Denmark',
      },
    },
    address: {
      street: 'random',
      number: '144',
      post_code: '9220',
      city: 'Aalborg',
      country: 'Denmark',
    },
    card: {
      expiration_date: '2021-01-01',

    }
  }

  const fakeFunc = () => {
    return 'I am a fake function'
  }

  it('customer should have 4 cards on dashboard', () => {
    const wrapper = shallow(<Dashboard user={customer} />)
    const cards = wrapper.find('Layout Grid GridRow GridColumn CardGroup Card.card')
    expect(cards.getElements()).toHaveLength(4);
    const headers = ['Personal', 'Card', 'Campus', 'Address']
    const headers_elements = cards.find('CardContent CardHeader')
    for (const header_el in headers_elements) {
      expect(headers.includes(header_el.text())).toBeTruthy()
    }
  })

  it('librarian should only have 2 cards on dashboard, personal and campus address', () => {
    const wrapper = shallow(<Dashboard user={librarian} />)
    const cards = wrapper.find('Layout Grid GridRow GridColumn CardGroup Card.card')
    expect(cards.getElements()).toHaveLength(2);
    const headers = ['Personal', 'Campus']
    const headers_elements = cards.find('CardContent CardHeader')
    for (const header_el in headers_elements) {
      expect(headers.includes(header_el.text())).toBeTruthy()
    }
  })

})
