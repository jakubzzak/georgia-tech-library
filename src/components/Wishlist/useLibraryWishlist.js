import { useEffect, useState } from 'react'
import { securedAPI } from '../../api/index'
import toast from 'react-hot-toast'


const useLibraryWishlist = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    securedAPI.getLibraryWishlist()
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to load library wishlist`)
        }
      }).catch(error => {
      toast.error(`Failed to load library wishlist => ${error}`)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const onAdd = (data) => {
    setLoading(true)
    return securedAPI.addToLibraryWishlist(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(e => [ response.data.data, ...e ])
          toast.success('Item added to library wishlist')
          return true
        } else {
          toast.error(`[${response.status}] Failed to add item to library wishlist`)
          return false
        }
      }).catch(error => {
        toast.error(`Failed when adding item to library wishlist => ${error}`)
        return false
      }).finally(() => {
        setLoading(false)
      })
  }

  const onRemove = ({ id }) => {
    setLoading(true)
    return securedAPI.removeFromLibraryWishlist({ id })
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(e => e.filter(item => item.id !== id))
          toast.success('Item removed from library wishlist')
        } else {
          toast.error(`[${response.status}] Failed to remove item from library wishlist`)
        }
      }).catch(error => {
        toast.error(`Failed to remove item from library wishlist => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  const onMarkAsAcquired = ({ id }) => {
    setLoading(true)
    return securedAPI.markItemAsAcquiredInLibraryWishlist({ id })
      .then(response => {
        if (response.ok && response.data.ok) {
          toast.success('Item marked as acquired')
        } else {
          toast.error(`[${response.status}] Failed to mark item as acquired`)
        }
      }).catch(error => {
        toast.error(`Failed to mark item as acquired => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    data,
    remove: onRemove,
    add: onAdd,
    markAsAcquired: onMarkAsAcquired,
  }
}

export default useLibraryWishlist
