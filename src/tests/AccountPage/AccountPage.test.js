import React from 'react'
import { shallow } from 'enzyme'
import AccountPage from '../../components/AccountPage/AccountPage'
import { customerRole, librarianRole } from '../../components/utils/roles'


describe('AccountPage', () => {
  const librarian = {
    type: librarianRole.LIBRARIAN.toUpperCase(),
  }
  const customer = {
    type: customerRole.STUDENT.toUpperCase(),
  }

  it('display librarian number of panes', () => {
    const wrapper = shallow(<AccountPage user={librarian} isOpenModal={false} setOpenModal={() => {}}/>)
    const menu_items = wrapper.find('MenuItem')
    expect(menu_items.getElements().filter(el => el.key != null)).toHaveLength(7)
  })

  it('should display two items', () => {
    const wrapper = shallow(<AccountPage user={customer}  isOpenModal={false} setOpenModal={() => {}}/>)
    const menu_items = wrapper.find('MenuItem')
    expect(menu_items.getElements().filter(el => el.key != null)).toHaveLength(4)
  })
})
