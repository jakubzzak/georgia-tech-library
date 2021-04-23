import React, { useEffect, useState } from 'react'
import './App.css'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import Preferences from './Preferences/Preferences'
import LandingPage from './LandingPage/LandingPage'
import useToken from './useToken'
import useUser from './useUser'
import History from './ListFiles/History'
import { Tab, Menu, Label, Icon, Image } from 'semantic-ui-react'
import { Toaster } from 'react-hot-toast'
import logo from '../assets/logo.png'
import ModalWindow from './ModalWindow/ModalWindow'
import Logout from './Logout/Logout'
import Wishlist from './Wishlist/Wishlist'
import BookCatalog from './BookCatalog/BookCatalog'


const App = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [activeKey, setActiveKey] = useState('dashboard')

  // const { token, setToken } = useToken()
  // const { user, setUser } = useUser()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token != null) {
      // TODO: fetch user here or merge it with token
      setUser(u => ({ ...u, role: 'USER' })) // for now, override user data here
    } else {
      setUser(null)
    }
  }, [token])

  const panes = [
    { key: 'dashboard', name: 'Me', icon: 'user', render: <Dashboard user={user}/> },
    { key: 'search', name: 'Search', icon: 'search', render: <BookCatalog user={user}/> },
    { key: 'wishlist', name: 'Wishlist', icon: 'list', render: <Wishlist/>, protected: ['USER'] },
    { key: 'libraryWishlist', name: 'Library wishlist', icon: 'list alternate outline', render: <Wishlist/>, protected: ['ADMIN', 'CHECKOUT'] },
    { key: 'history', name: 'History', icon: 'history', render: <History initPageSize={5}/>, protected: ['USER'] },
    { key: 'userHistory', name: 'Manage users', icon: 'users', render: <History initPageSize={5}/>, protected: ['ADMIN', 'CHECKOUT'] },
    { key: 'preferences', name: 'Preferences', icon: 'settings', render: <Preferences user={user}/>, protected: [] },
  ]

  return (
    <div className="wrapper">
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 5000,
          style: {},

          success: {
            style: {
              border: 'solid green 2px',
            },
          },
          error: {
            duration: 8000,
            style: {
              border: 'solid red 2px',
            },
          },
        }}
      />
      <ModalWindow isOpen={isOpenModal} setOpen={setOpenModal}>
        {token && user ? (
          <Logout closeModal={() => setOpenModal(false)} setToken={() => setToken(null)}/>
        ) : (
          <Login closeModal={() => setOpenModal(false)} setToken={setToken} setUser={setUser}/>
        )}
      </ModalWindow>
      <Image src={logo} size={'small'} alt={'Georgia Tech Library'}/>
      <div className="paper-shadow">
        {token && user ? (
          <>
            <Menu pointing secondary>
              {panes.filter(pane => !pane.protected || pane.protected.length === 0 || pane.protected.includes(user.role)).map((pane, index) => (
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
        ) : (
          <LandingPage setOpenModal={setOpenModal}/>
        )}
      </div>
      <footer>
        &copy; Powered by two eager students of computer science
      </footer>
    </div>
  )
}

export default App
