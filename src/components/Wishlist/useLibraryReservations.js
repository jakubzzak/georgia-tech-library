import { useEffect, useState } from 'react'
import { securedAPI } from '../../api/index'
import toast from 'react-hot-toast'


const useLibraryReservations = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    securedAPI.getLibraryReservations()
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to load library reservations`)
        }
      }).catch(error => {
      toast.error(`Failed to load library reservations => ${error}`)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const onMarkAsAccepted = ({ id }) => {
    setLoading(true)
    return securedAPI.markItemAsAcceptedInLibraryReservations({ id })
      .then(response => {
        if (response.ok && response.data.ok) {
          setData(response.data.data)
          toast.success('Item marked as accepted')
        } else {
          toast.error(`[${response.status}] Failed to mark item as accepted`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Failed to mark item as accepted => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return {
    data,
    loading,
    markAsAccepted: onMarkAsAccepted,
  }
}

export default useLibraryReservations
