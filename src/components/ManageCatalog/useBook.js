import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useBook = () => {
  const [book, setBook] = useState(null)

  const onBookReturn = ({ loanId }) => {
    return securedAPI.closeLoan({ loanId })
      .then(response => {
        if (response.ok) {
          return response.data
        } else {
          toast.error(`[${response.status}] Failed to return a book.`)
          return []
        }
      }).catch(error => {
        toast.error(`Something went wrong when returning a book => ${error}`)
      })
  }

  return {
    returnBook: onBookReturn,
    book,
    setBook
  }
}

export default useBook
