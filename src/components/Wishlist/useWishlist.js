import { useEffect, useState } from 'react'
import api, { securedAPI } from '../../api/index'
import toast from 'react-hot-toast'


const useWishlist = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    securedAPI.getMyWishlist()
      .then(response => {
        if (response.ok) {
          setData(response.data)
        } else {
          toast.error(`[${response.status}] Failed to load wishlist`)
        }
      }).catch(error => {
      toast.error(`Failed to load wishlist => ${error}`)
    }).finally(() => {
      setData([
        {
          title: 'sth',
        },
        {
          title: 'sth else',
        },
      ])
      setLoading(false)
    })
  }, [])

  const onRemove = ({ id }) => {
    return securedAPI.removeFromMyWishlist({ id })
      .then(response => {
        if (response.ok) {
          setData(response.data)
          toast.success('Item removed from wishlist')
        } else {
          toast.error(`[${response.status}] Failed to remove item from wishlist`)
        }
      }).catch(error => {
      toast.error(`Failed to remove item from wishlist => ${error}`)
    })
  }

  const onAdd = ({ id }) => {
    return securedAPI.addToMyWishlist({ id })
      .then(response => {
        if (response.ok) {
          setData(response.data)
          toast.success('Item added to wishlist')
        } else {
          toast.error(`[${response.status}] Failed to add item to wishlist`)
        }
      }).catch(error => {
      toast.error(`Failed to add item to wishlist => ${error}`)
    })
  }

  const onRequest = ({ id }) => {
    return securedAPI.requestFromWishlist({ id })
      .then(response => {
        if (response.ok) {
          toast.success('Item requested')
        } else {
          toast.error(`[${response.status}] Failed to request item`)
        }
      }).catch(error => {
      toast.error(`Failed to request item => ${error}`)
    })
  }

  return {
    loading,
    wishlist: data,
    setWishlist: setData,
    remove: onRemove,
    add: onAdd,
    request: onRequest,
  }
}

export default useWishlist
