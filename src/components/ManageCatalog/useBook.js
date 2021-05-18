import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useBook = () => {
  const [book, setBook] = useState(null)

  const onFindByIsbn = (isbn) => {
    return securedAPI.findBook({ isbn })
      .then(response => {
        if (response.ok && response.data.ok) {
          return response.data.data?.map(book => ({ ...book, id: book.isbn }))
        } else {
          toast.error(`[${response.status}] Failed to fetch books`)
          return []
        }
      }).catch(error => {
        toast.error(`Something went wrong when fetching books => ${error}`)
      })
  }
  const onGetBook = ({ id: isbn }) => {
    return securedAPI.getBook({ isbn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setBook(response.data.data)
          return response.data.data
        } else {
          toast.error(`[${response.status}] Failed to fetch book`)
          return null
        }
      }).catch(error => {
        toast.error(`Something went wrong when fetching the book => ${error}`)
      })
  }
  const onCreate = (data) => {
    return securedAPI.createBook(data)
      .then(response => {
        if (response.ok) {
          toast.success('Book created successfully')
        } else {
          toast.error(`[${response.status}] Failed to create a new book`)
        }
      }).catch(error => {
        toast.error(`Something went wrong when creating a new book => ${error}`)
      })
  }
  const onUpdate = (data) => {
    return securedAPI.updateBook(data)
      .then(response => {
        if (response.ok) {
          toast.success('Book updated successfully')
        } else {
          toast.error(`[${response.status}] Failed to update a book`)
        }
      }).catch(error => {
        toast.error(`Something went wrong when updating a book => ${error}`)
      })
  }
  const onChangeStock = (data) => {
    return securedAPI.changeStock(data)
      .then(response => {
        if (response.ok) {
          toast.success('Book stock updated successfully')
        } else {
          toast.error(`[${response.status}] Failed to update a book's stock`)
        }
        return response
      }).catch(error => {
        toast.error(`Something went wrong when updating a book's stock => ${error}`)
      })
  }
  const onRemove = ({ isbn }) => {
    return securedAPI.deleteBook({ isbn })
      .then(response => {
        if (response.ok) {
          toast.success('Book deleted successfully')
        } else {
          toast.error(`[${response.status}] Failed to delete a book`)
        }
      }).catch(error => {
        toast.error(`Something went wrong when deleting a book => ${error}`)
      })
  }

  return {
    book,
    setBook,
    find: onFindByIsbn,
    get: onGetBook,
    create: onCreate,
    update: onUpdate,
    stock: onChangeStock,
    remove: onRemove,
  }
}

export default useBook
