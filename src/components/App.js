import React, { useState } from 'react'
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
import FileUploader from './UploadFile/FileUploader'
import logo from '../assets/logo.png'
import ModalWindow from './ModalWindow/ModalWindow'
import Logout from './Logout/Logout'
import Wishlist from './Wishlist/Wishlist'
import BookCatalog from './BookCatalog/BookCatalog'


const App = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // const { token, setToken } = useToken()
  // const { user, setUser } = useUser()
  let token = 'myNewToken'
  let user = {
    name: 'someone',
    role: 'ADMIN',
  }


  // const signOut = () => {
  //   setToken(null)
  // }

  const panes = [
    { name: 'Me', icon: 'user', render: <Dashboard user={user}/> },
    { name: 'Wishlist', icon: 'list', render: <Wishlist/> },
    { name: 'Search', icon: 'search', render: <BookCatalog/> },
    { name: 'History', icon: 'history', render: <History initPageSize={5}/> },
    { name: 'Preferences', icon: 'settings', render: <Preferences user={user}/> },
  ]

  console.log('token user', token, user)

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
          <Logout closeModal={() => setOpenModal(false)} setToken={() => {
            token = null
            user = null
          }}/>
        ) : (
          <Login closeModal={() => setOpenModal(false)} setToken={() => {
            token = 'myNewToken'
            user = {
              name: 'someone',
              role: 'ADMIN',
            }
          }}/>
        )}
      </ModalWindow>
      <Image src={logo} size={'small'} alt={'Georgia Tech Library'}/>
      <div className="paper-shadow">
        {token && user ? (
          <>
            <Menu pointing secondary>
              {panes.map((pane, index) => (
                <Menu.Item key={pane.name}
                           active={activeIndex === index}
                           onClick={() => setActiveIndex(index)}
                >
                  <Icon name={pane.icon}/>
                  {pane.name}
                </Menu.Item>
              ))}
              <Menu.Menu position="right">
                <Menu.Item name="Logout"
                           active={activeIndex === -1}
                           onClick={() => {
                             setOpenModal(true)
                           }}
                >
                  Log out
                  <Icon style={{ marginLeft: '1em' }} name={'log out'}/>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            {panes[activeIndex].render}
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
