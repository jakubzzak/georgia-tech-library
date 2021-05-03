import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useBook = () => {
  const [book, setBook] = useState(null)

  const onFindByIsbn = (isbn) => {
    return securedAPI.findBook({ isbn })
      .then(response => {
        if (response.ok) {
          // TODO
          return response.data
        } else {
          toast.error(`[${response.status}] Failed to fetch books`)
          return [
            {
              isbn: 'd32d-l32-3jl-3p4i',
              title: 'Hobbit', // necessary for realtime search
              author: 'Barack Obama',
              area: 'Sci-fi',
              available: 5,
            },
            {
              isbn: 'de23-2c3-d3d-d3d3',
              title: 'The legend',
              author: 'Unknown',
              area: 'Western',
              available: 3,
            },
          ]
        }
      }).catch(error => {
        toast.error(`Something went wrong when fetching books => ${error}`)
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
    create: onCreate,
    update: onUpdate,
    stock: onChangeStock,
    remove: onRemove,
  }
}

export default useBook
