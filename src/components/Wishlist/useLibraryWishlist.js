import { useEffect, useState } from 'react'
import { securedAPI } from '../../api/index'
import toast from 'react-hot-toast'
import moment from 'moment'


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
      // setData([
      //   {
      //     id: '1',
      //     title: 'sth',
      //   },
      //   {
      //     id: '2',
      //     title: 'sth else',
      //   },
      // ])
      setLoading(false)
    })
  }, [])

  const isInWishlist = ({ id }) => {
    return data.find(item => item.id === id) != null
  }

  const onRemove = ({ id }) => {
    return new Promise(() => {
      setData(e => e.filter(item => item.id !== id))
    })// TODO: remove this return and everything before
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

  const onAdd = ({ id, title }) => {
    setData(e => ([ ...e, { id, title } ]))
    return // TODO: remove this return and everything before
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
    return new Promise(()=> {
      const item = data.find(item => item.id === id)
      setData(e => ([ ...e.filter(item => item.id !== id), { ...item, requestedAt: moment().utc().format('YYYY-MM-DD') } ]))
    }) // TODO: remove this return and everything before
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
    data,
    remove: onRemove,
    add: onAdd,
    request: onRequest,
    isInWishlist,
  }
}

export default useWishlist
