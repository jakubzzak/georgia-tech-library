import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import securedAPI, { unsecuredAPI } from '../api'
import toast from 'react-hot-toast'


const useUser = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user === null) {
      onLogin({ email: '', password: '' })
    }
  }, [])

  const getLoginType = () => {
    const valueString = sessionStorage.getItem('type')
    if (valueString) {
      const val = JSON.parse(valueString)
      return val ?? null
    }
    return null
  }

  const setLoginType = (type) => {
    sessionStorage.setItem('type', JSON.stringify(type))
  }

  const onLogin = (data) => {
    setLoading(true)
    if (getLoginType() === 'LIBRARIAN') {
      return unsecuredAPI.loginLibrarian(data)
        .then(response => {
          if (response.ok && response.data.ok) {
            setUser(response.data.data)
          } else {
            setUser(null)
          }
          return response.ok && response.data.ok
        }).catch(error => {
          toast.error(`Login failed => ${error}`)
        }).finally(() => {
          setLoading(false)
        })
    }
    return unsecuredAPI.loginCustomer(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          setUser(response.data.data)
        } else {
          setUser(null)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Login failed => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onLogout = () => {
    setLoading(true)
    if (getLoginType() === 'LIBRARIAN') {
      return securedAPI.logoutLibrarian()
        .then(response => {
          if (response.ok && response.data.ok) {
            setUser(null)
          } else {
            toast.error(`[${response.status}] Logout failed`)
          }
          return response.ok && response.data.ok
        }).catch(error => {
          toast.error(`Logout failed => ${error}`)
        }).finally(() => {
          setLoading(false)
        })
    }
    return securedAPI.logoutCustomer()
      .then(response => {
        if (response.ok && response.data.ok) {
          setUser(null)
        } else {
          toast.error(`[${response.status}] Logout failed`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Logout failed => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return {
    user,
    loading,
    getLoginType,
    setLoginType,
    login: onLogin,
    logout: onLogout,
  }
}

export default useUser
