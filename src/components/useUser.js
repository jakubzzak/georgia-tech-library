import { useState } from 'react'
import jwtDecode from 'jwt-decode'
import { unsecuredAPI } from '../api'


const useUser = () => {

  const [user, setUser] = useState(null)

  const saveUser = async (token, setToken) => {
    const meFromToken = await unsecuredAPI.meFromToken(token)
    let user = null
    if (meFromToken.ok) {
      let decoded = jwtDecode(meFromToken.data.token)
      user = {
        id: decoded.id,
        username: decoded.sub,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        companyId: decoded.companyId,
        version: decoded.version,
        role: decoded.role,
        profilePictureId: decoded.profilePictureId,
      }
    } else if (meFromToken.status === 401) {
      setToken(null)
    } else {
      console.log('session error')
    }
    setUser(user)
  }

  return {
    setUser: saveUser,
    user,
  }
}

export default useUser
