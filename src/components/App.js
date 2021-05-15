import React, { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { Image } from 'semantic-ui-react'
import useToken from './useToken'
import useUser from './useUser'
import Login from './Login/Login'
import LandingPage from './LandingPage/LandingPage'
import ModalWindow from './ModalWindow/ModalWindow'
import Logout from './Logout/Logout'
import AccountPage from './AccountPage/AccountPage'
import logo from '../assets/logo.png'


const App = () => {
  const [isOpenModal, setOpenModal] = useState(false)

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
          <AccountPage user={user} isOpenModal={isOpenModal} setOpenModal={setOpenModal}/>
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
