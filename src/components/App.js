import React, { useState } from 'react'
import './App.css'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import Preferences from './Preferences/Preferences'
import LandingPage from './LandingPage/LandingPage'
import useToken from './useToken'
import useUser from './useUser'
import ListFiles from './ListFiles/ListFiles'
import { Tab, Menu, Label, Icon, Image } from 'semantic-ui-react'
import { Toaster } from 'react-hot-toast'
import FileUploader from './UploadFile/FileUploader'
import logo from '../assets/logo.png'
import ModalWindow from './ModalWindow/ModalWindow'


const App = () => {
  const [isOpenModal, setOpenModal] = useState(false)

  const { token, setToken } = useToken()
  const { user, setUser } = useUser()

  // const signOut = () => {
  //   setToken(null)
  // }

  const panes = [
    {
      menuItem: (
        <Menu.Item key="me">
          <Icon name={'user'}/>
          Me
        </Menu.Item>
      ),
      render: () => <Dashboard user={user} signOut={() => {
      }}/>,
    },
    {
      menuItem: (
        <Menu.Item key="list">
          <Icon name={'list'}/>
          List<Label>15</Label>
        </Menu.Item>
      ),
      render: () => <ListFiles initPageSize={5}/>,
    },
    {
      menuItem: (
        <Menu.Item key="upload">
          <Icon name={'upload'}/>
          Upload
        </Menu.Item>
      ),
      render: () => <FileUploader
        token={token}
        maxFileSize={5}
      />,
    },
    {
      menuItem: (
        <Menu.Item key="preferences">
          <Icon name={'settings'}/>
          Preferences
        </Menu.Item>
      ),
      render: () => <Preferences user={user}/>,
    },
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
        <Login setToken={() => {
        }}/>
      </ModalWindow>
      <Image src={logo} size={'small'} alt={'Georgia Tech Library'}/>
      <div className="paper-shadow">
        {!token ? (
          <LandingPage setOpenModal={setOpenModal}/>
        ) : (
          <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
        )}
      </div>
      <footer>
        &copy; Powered by two eager students of computer science
      </footer>
    </div>
  )
}

export default App
