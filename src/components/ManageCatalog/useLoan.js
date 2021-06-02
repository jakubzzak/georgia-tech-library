import securedAPI from '../../api'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useLoan = () => {
  const [loading, setLoading] = useState(false)
  const [loans, setLoans] = useState([])

  const onFetchHistory = () => {
    setLoading(true)
    return securedAPI.fetchHistory()
      .then(response => {
        if (response.ok && response.data.ok) {
          setLoans(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to fetch history`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when fetching history => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onFetchActiveRentals = ({ ssn }) => {
    setLoading(true)
    return securedAPI.fetchCustomersActiveRentals({ ssn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setLoans(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to fetch customer's active rentals`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when fetching customer's rentals => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onStart = ({ ssn, isbn }) => {
    setLoading(true)
    return securedAPI.startLoan({ ssn, isbn })
      .then(response => {
        if (response.ok && response.data.ok) {
          toast.success(`New loan started successfully.`)
        } else {
          toast.error(`[${response.status}] Failed to start a loan.`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when starting a loan => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  const onClose = ({ id }) => {
    setLoading(true)
    return securedAPI.closeLoan({ loanId: id })
      .then(response => {
        if (response.ok && response.data.ok) {
          setLoans(e => e.filter(loan => loan.id !== id))
          toast.success(`Loan was closed successfully.`)
        } else {
          toast.error(`[${response.status}] Failed to close a loan.`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when closing a loan => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return {
    loans,
    loading,
    start: onStart,
    close: onClose,
    fetchHistory: onFetchHistory,
    fetchActiveRentals: onFetchActiveRentals,
  }
}

export default useLoan
