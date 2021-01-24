import { useState } from 'react'

const useToken = () => {

  const retrieveValueFromSession = (value) => {
    const valueString = sessionStorage.getItem(value) // use localStorage to share data across the browser, sessionStorage persist data within one session
    if (valueString) {
      const val = JSON.parse(valueString)
      return val ? val : null
    }
    return null
  }

  const [token, setToken] = useState(retrieveValueFromSession('token'))

  const saveToken = (token) => {
    sessionStorage.setItem('token', JSON.stringify(token))
    setToken(token)
  }

  return {
    setToken: saveToken,
    token
  }
}

export default useToken
