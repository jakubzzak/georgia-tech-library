import securedAPI from '../../api'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useLoan = () => {
  const [loan, setLoan] = useState()

  const onFetchActiveRentals = ({ cardId }) => {
    return securedAPI.fetchCustomersActiveRentals({ cardId })
      .then(response => {
        if (response.ok) {
          return response.data
        } else {
          toast.error(`[${response.status}] Failed to fetch customer's active rentals`)
          return [
            {
              loanId: '123-2321-2312-321',
              title: 'Hobbit',
              dateStart: '2021-01-01',
            },
            {
              loanId: 'zcs-2d21-23d2-d2x',
              title: 'The legend',
              dateStart: '2021-03-01',
            },
          ]
        }
      }).catch(error => {
        toast.error(`Something went wrong when fetching customer's rentals => ${error}`)
      })
  }
  const onStart = ({ cardId, isbn }) => {
    return securedAPI.startLoan({ cardId, isbn })
      .then(response => {
        if (response.ok) {
          toast.success(`New loan started successfully.`)
          return response.data
        } else {
          toast.error(`[${response.status}] Failed to start a loan.`)
          return []
        }
      }).catch(error => {
        toast.error(`Something went wrong when starting a loan => ${error}`)
      })
  }

  const onClose = ({ loanId }) => {
    return securedAPI.closeLoan({ loanId })
      .then(response => {
        if (response.ok) {
          return response.data
        } else {
          toast.error(`[${response.status}] Failed to close a loan.`)
          return []
        }
      }).catch(error => {
        toast.error(`Something went wrong when closing a loan => ${error}`)
      })
  }

  return {
    loan,
    setLoan,
    start: onStart,
    close: onClose,
    fetchActiveRentals: onFetchActiveRentals,
  }
}

export default useLoan
