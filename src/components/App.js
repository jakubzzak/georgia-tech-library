import React, { useEffect } from 'react'
import './App.css'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import Preferences from './Preferences/Preferences'
import useToken from './useToken'
import useUser from './useUser'
import ListFiles from './ListFiles/ListFiles'
import UploadFile from './UploadFile/UploadFile'
import { Tab, Menu, Label, Icon } from 'semantic-ui-react'
import { Toaster } from 'react-hot-toast'
import FileUploader from './UploadFile/FileUploader'


const App = () => {

  const { token, setToken } = useToken()
  const { user, setUser } = useUser()

  useEffect(() => {
    if(token && !user) {
      setUser(token, setToken)
    }
  }, [token])

  if (!token) {
    return <Login setToken={setToken}/>
  }

  const signOut = () => {
    setToken(null)
  }

  const panes = [
    {
      menuItem: (
        <Menu.Item key='me'>
          <Icon name={'user'}/>
          Me
        </Menu.Item>
      ),
      render: () => <Dashboard user={user} signOut={signOut}/>,
    },
    {
      menuItem: (
        <Menu.Item key='list'>
          <Icon name={'list'}/>
          List<Label>15</Label>
        </Menu.Item>
      ),
      render: () => <ListFiles initPageSize={5}/>,
    },
    {
      menuItem: (
        <Menu.Item key='upload'>
          <Icon name={'upload'}/>
          Upload
        </Menu.Item>
      ),
      render: () => <FileUploader onUploadComplete={() => console.log('uploaded')} acceptedFileTypes={['image/jpeg', 'image/gif']}  token={token} maxFileSize={5}/>
      // render: () => <UploadFile token={token}/>,
    },
    {
      menuItem: (
        <Menu.Item key='preferences'>
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
      <h3>personalApi</h3>
      <div className="paper-shadow">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
      </div>
      <footer>
        <img alt="Slovakia" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/SK.svg"
             style={{ maxWidth: '16px' }}/>
        {' Powered with <3 by personalApi '}
        <img alt="Slovakia" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/SK.svg"
             style={{ maxWidth: '16px' }}/>
      </footer>
    </div>
  )
}

export default App
