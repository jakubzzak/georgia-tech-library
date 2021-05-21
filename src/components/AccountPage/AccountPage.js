import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'
import BookCatalog from '../BookCatalog/BookCatalog'
import Dashboard from '../Dashboard/Dashboard'
import Wishlist from '../Wishlist/Wishlist'
import History from '../History/History'
import LibraryWishlist from '../Wishlist/LibraryWishlist'
import ManageCustomer from '../ManageUser/ManageCustomer'
import ManageCatalog from '../ManageCatalog/ManageCatalog'
import Reservations from '../Reservations/Reservations'
import useCustomerWishlist from '../Wishlist/useCustomerWishlist'
import { customerRole, librarianRole } from '../utils/roles'
import GracePeriod from '../GracePeriod/GracePeriod'


const AccountPage = ({ user, isOpenModal, setOpenModal }) => {
  const [activeKey, setActiveKey] = useState('search')
  const {
    loading: loadingWishlist,
    data: wishlistItems,
    request: requestWishlistItem,
    remove: removeWishlistItem,
    add: addWishlistItem,
    isInWishlist,
  } = useCustomerWishlist(user)

  const panes = [
    {
      key: 'search',
      name: 'Search',
      icon: 'search',
      render: <BookCatalog addToWishlist={Object.keys(customerRole).includes(user.type) ? addWishlistItem:null}
                           removeFromWishlist={Object.keys(customerRole).includes(user.type) ? removeWishlistItem:null}
                           isInWishlist={isInWishlist}
      />,
    },
    {
      key: 'dashboard',
      name: 'Me',
      icon: 'user',
      render: <Dashboard user={user}/>,
    },
    {
      key: 'wishlist',
      name: 'Wishlist',
      icon: 'list',
      render: <Wishlist loading={loadingWishlist}
                        request={requestWishlistItem}
                        remove={removeWishlistItem}
                        items={wishlistItems}/>,
      protected: Object.keys(customerRole),
    },
    {
      key: 'history',
      name: 'History',
      icon: 'history',
      render: <History/>,
      protected: Object.keys(customerRole),
    },
    {
      key: 'libraryWishlist',
      name: 'Library wishlist',
      icon: 'list alternate outline',
      render: <LibraryWishlist/>,
      protected: Object.keys(librarianRole),
    },
    {
      key: 'reservations',
      name: 'Reservations',
      icon: 'numbered list',
      render: <Reservations/>,
      protected: Object.keys(librarianRole),
    },
    {
      key: 'manageUser',
      name: 'Users',
      icon: 'users',
      render: <ManageCustomer/>,
      protected: Object.keys(librarianRole),
    },
    {
      key: 'manageCatalog',
      name: 'Catalog',
      icon: 'book',
      render: <ManageCatalog/>,
      protected: Object.keys(librarianRole),
    },
    {
      key: 'gracePeriod',
      name: 'Grace period',
      icon: 'exclamation',
      render: <GracePeriod/>,
      protected: Object.keys(librarianRole),
    },
  ]

  return (
    <React.Fragment>
      <Menu pointing secondary>
        {panes.filter(pane => !pane.protected || pane.protected.length === 0 || pane.protected.includes(user.type)).map(pane => (
          <Menu.Item key={pane.key}
                     active={!isOpenModal && activeKey === pane.key}
                     onClick={() => setActiveKey(pane.key)}
          >
            <Icon name={pane.icon}/>
            {pane.name}
          </Menu.Item>
        ))}
        <Menu.Menu position="right">
          <Menu.Item name="Logout"
                     active={isOpenModal}
                     onClick={() => {
                       setOpenModal(true)
                     }}
          >
            Log out
            <Icon style={{ marginLeft: '1em' }} name={'log out'}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {panes.find(pane => pane.key === activeKey).render}
    </React.Fragment>

  )
}

AccountPage.propTypes = {
  user: PropTypes.object.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
}

export default AccountPage
