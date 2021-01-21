import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import Preferences from './Preferences/Preferences'
import useToken from './useToken'
import ListFiles from './ListFiles/ListFiles'
import UploadFile from './UploadFile/UploadFile'
import { Tab, Menu, Label, Icon } from 'semantic-ui-react'
import Flag from "react-flags";


const App = () => {

  const { userId, token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken}/>
  }

  const panes = [
    {
      menuItem: (
        <Menu.Item key='me'>
          <Icon name={'user'} />
          Me
        </Menu.Item>
      ),
      render: () =>  <Dashboard/>
    },
    {
      menuItem: (
        <Menu.Item key='list'>
          <Icon name={'list'} />
          List<Label>15</Label>
        </Menu.Item>
      ),
      render: () => <ListFiles/>
    },
    {
      menuItem: (
        <Menu.Item key='upload'>
          <Icon name={'upload'} />
          Upload
        </Menu.Item>
      ),
      render: () => <UploadFile token={token}/>
    },
    {
      menuItem: (
        <Menu.Item key='preferences'>
          <Icon name={'settings'} />
          Preferences
        </Menu.Item>
      ),
      render: () => <Preferences/>
    },
  ]


  return (
    <div className="wrapper">
      <h1>personalApi</h1>
      <div className="paper-shadow">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
      <footer>
        <img alt="Slovakia" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/SK.svg" style={{ maxWidth: '16px' }}/>
        {' Powered with <3 by personalApi '}
        <img alt="Slovakia" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/SK.svg" style={{ maxWidth: '16px' }}/>
      </footer>
    </div>
  )
}

export default App
