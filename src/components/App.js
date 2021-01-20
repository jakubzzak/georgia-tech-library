import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import Preferences from './Preferences/Preferences'
import useToken from './useToken'
import ListImages from './ListImages/ListImages'
import UploadImage from './UploadImage/UploadImage'


const App = () => {

  const { userId, token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard/>
          </Route>
          <Route path="/listImages">
            <ListImages/>
          </Route>
          <Route path="/uploadImage">
            <UploadImage/>
          </Route>
          <Route path="/preferences">
            <Preferences/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
