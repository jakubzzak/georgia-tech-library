import { useEffect, useState } from 'react'
import { unsecuredAPI } from '../../api'
import toast from 'react-hot-toast'


const useSearch = ({ phrase }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    unsecuredAPI.searchInCatalog({ phrase })
      .then(response => {
        if (response.ok) {
          setData(response.data)
        } else {
          toast.error(`[${response.status}] Search failed`)
        }
      }).catch(error => {
        toast.error(`Search failed => ${error}`)
      }).finally(() => {
        setData([
          {
            title: 'book 1',
            author: 'author 1',
            description: 'desc 1',
          },
          {
            title: 'book 2',
            author: 'author 2',
            description: 'desc 2',
          },
          {
            title: 'book 3',
            author: 'author 3',
            description: 'desc 3',
          },
          {
            title: 'book 4',
            author: 'author 4',
            description: 'desc 4',
          },
          {
            title: 'book 5',
            author: 'author 5',
            description: 'desc 5',
          },
        ])
        setLoading(false)
      })
  }, [phrase])

  return {
    loading,
    results: data,
  }
}

export default useSearch
