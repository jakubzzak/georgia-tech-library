import { useEffect, useState } from 'react'
import { securedAPI } from '../../api/index'
import toast from 'react-hot-toast'
import { customerRole } from '../utils/roles'


const useCustomerWishlist = ({ type, ssn }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    if (Object.keys(customerRole).includes(type)) {
      onFetchWishlist()
    }
  }, [type])

  const onFetchWishlist = () => {
    setLoading(true)
    return securedAPI.getMyWishlist()
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to load wishlist`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
      toast.error(`Failed to load wishlist => ${error}`)
    }).finally(() => {
      setLoading(false)
    })
  }

  const isInWishlist = ({ isbn }) => data.find(item => item.book.isbn === isbn) != null

  const onAdd = ({ isbn }) => {
    setLoading(true)
    return securedAPI.addToMyWishlist({ isbn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to add item to wishlist`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Failed to add item to wishlist => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  const onRemove = ({ isbn }) => {
    setLoading(true)
    return securedAPI.removeFromMyWishlist({ isbn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to remove item from wishlist`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Failed to remove item from wishlist => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  const onRequest = ({ id }) => {
    setLoading(true)
    return securedAPI.requestFromWishlist({ id })
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to request item`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Failed to request item => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return {
    data,
    loading,
    fetch: onFetchWishlist,
    remove: onRemove,
    add: onAdd,
    request: onRequest,
    isInWishlist,
  }
}

export default useCustomerWishlist
