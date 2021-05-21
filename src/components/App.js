import React, { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { Image } from 'semantic-ui-react'
import useUser from './useUser'
import Login from './Login/Login'
import LandingPage from './LandingPage/LandingPage'
import ModalWindow from './ModalWindow/ModalWindow'
import Logout from './Logout/Logout'
import AccountPage from './AccountPage/AccountPage'
import logo from '../assets/logo.png'


const App = () => {
  const [isOpenModal, setOpenModal] = useState(false)

  const { user, loading: loadingUser, setLoginType, getLoginType, login, logout } = useUser()

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
        {user ? (
          <Logout logout={logout}
                  loading={loadingUser}
                  closeModal={() => setOpenModal(false)}
          />
        ) : (
          <Login login={login}
                 getLoginType={getLoginType}
                 setLoginType={setLoginType}
                 loading={loadingUser}
                 closeModal={() => setOpenModal(false)}
          />
        )}
      </ModalWindow>
      <Image src={logo} size={'small'} alt={'Georgia Tech Library'}/>
      <div className="paper-shadow">
        {user ? (
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
