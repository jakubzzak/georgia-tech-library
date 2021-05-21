import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useBook = () => {
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState(null)

  const onFindByIsbn = (isbn) => {
    setLoading(true)
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
      }).finally(() => {
        setLoading(false)
      })
  }
  const onGetBook = ({ id: isbn }) => {
    setLoading(true)
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
      }).finally(() => {
        setLoading(false)
      })
  }
  const onCreate = (data) => {
    setLoading(true)
    return securedAPI.createBook(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          setBook(response.data.data)
          toast.success('Book created successfully')
        } else {
          toast.error(`[${response.status}] Failed to create a new book`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when creating a new book => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onUpdate = (data) => {
    setLoading(true)
    return securedAPI.updateBook(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          setBook(response.data.data)
          toast.success('Book updated successfully')
        } else {
          toast.error(`[${response.status}] Failed to update a book`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when updating a book => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onChangeStock = (data) => {
    setLoading(true)
    return securedAPI.changeStock(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          setBook(response.data.data)
          toast.success('Book stock updated successfully')
        } else {
          toast.error(`[${response.status}] Failed to update a book's stock`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when updating a book's stock => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onDisable = ({ isbn }) => {
    setLoading(true)
    return securedAPI.disableBook({ isbn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setBook(response.data.data)
          toast.success('Book disabled successfully')
        } else {
          toast.error(`[${response.status}] Failed to disable a book`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when disabling a book => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onEnable = ({ isbn }) => {
    setLoading(true)
    return securedAPI.enableBook({ isbn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setBook(response.data.data)
          toast.success('Book enabled successfully')
        } else {
          toast.error(`[${response.status}] Failed to enable a book`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when enabling a book => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    book,
    find: onFindByIsbn,
    get: onGetBook,
    create: onCreate,
    update: onUpdate,
    stock: onChangeStock,
    disable: onDisable,
    enable: onEnable,
  }
}

export default useBook
