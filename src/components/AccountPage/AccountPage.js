import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'
import BookCatalog from '../BookCatalog/BookCatalog'
import Dashboard from '../Dashboard/Dashboard'
import Wishlist from '../Wishlist/Wishlist'
import History from '../History/History'
// import Preferences from '../Preferences/Preferences'
import useWishlist from '../Wishlist/useWishlist'
import LibraryWishlist from '../Wishlist/LibraryWishlist'
import ManageCustomer from '../ManageUser/ManageCustomer'
import ManageCatalog from '../ManageCatalog/ManageCatalog'
import Reservations from '../Reservations/Reservations'

const AccountPage = ({ user, isOpenModal, setOpenModal }) => {
  const [activeKey, setActiveKey] = useState('search')
  const {
    loading: loadingWishlist,
    data: wishlistItems,
    request: requestWishlistItem,
    remove: removeWishlistItem,
    add: addWishlistItem,
    isInWishlist,
  } = useWishlist()

  const panes = [
    {
      key: 'search',
      name: 'Search',
      icon: 'search',
      render: <BookCatalog addToWishlist={user.role === 'USER' ? addWishlistItem:null}
                           removeFromWishlist={user.role === 'USER' ? removeWishlistItem:null}
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
                        items={wishlistItems}
                        remove={removeWishlistItem}
                        request={requestWishlistItem}
      />,
      protected: ['USER'],
    },
    {
      key: 'history',
      name: 'History',
      icon: 'history',
      render: <History initPageSize={5}/>,
      protected: ['USER'],
    },
    {
      key: 'libraryWishlist',
      name: 'Library wishlist',
      icon: 'list alternate outline',
      render: <LibraryWishlist loading={loadingWishlist}
                               items={wishlistItems}
                               remove={removeWishlistItem}
                               request={requestWishlistItem}
      />,
      protected: ['ADMIN', 'CHECKOUT'],
    },
    {
      key: 'reservations',
      name: 'Reservations',
      icon: 'numbered list',
      render: <Reservations/>,
      protected: ['ADMIN', 'CHECKOUT']
    },
    {
      key: 'manageUser',
      name: 'Users',
      icon: 'users',
      render: <ManageCustomer/>,
      protected: ['ADMIN', 'CHECKOUT'],
    },
    {
      key: 'manageCatalog',
      name: 'Catalog',
      icon: 'book',
      render: <ManageCatalog/>,
      protected: ['ADMIN', 'CHECKOUT'],
    },
    // {
    //   key: 'preferences',
    //   name: 'Preferences',
    //   icon: 'settings',
    //   render: <Preferences user={user}/>,
    //   protected: [],
    // },
  ]

  return (
    <>
      <Menu pointing secondary>
        {panes.filter(pane => !pane.protected || pane.protected.length === 0 || pane.protected.includes(user.role)).map(pane => (
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
    </>

  )
}

AccountPage.propTypes = {
  user: PropTypes.object.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
}

export default AccountPage
