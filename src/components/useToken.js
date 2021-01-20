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
  const [userId, setUserId] = useState(retrieveValueFromSession('userId'))

  const saveToken = ({ token, userId }) => {
    sessionStorage.setItem('token', JSON.stringify(token))
    sessionStorage.setItem('userId', JSON.stringify(userId))
    setToken(token)
    setUserId(userId)
  }

  return {
    setToken: saveToken,
    token,
    userId,
  }
}

export default useToken
