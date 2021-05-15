import { useEffect, useState } from 'react'
import { unsecuredAPI } from '../../api'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import _ from 'lodash'


const useSearch = ({ initCurrentPage, initPageSize, initPhrase, initGroup, initColumns }) => {
  const [lastSearch, setLastSearch] = useState({
    currentPage: initCurrentPage,
    pageSize: initPageSize,
    phrase: initPhrase,
    group: initGroup,
    columns: initColumns || [],
  })
  const [search, setSearch] = useState({
    currentPage: initCurrentPage,
    pageSize: initPageSize,
    phrase: initPhrase,
    group: initGroup,
    columns: initColumns || [],
  })
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const isValid = () => {
    return search && search.group && !_.isEmpty(search.phrase) && !_.isEmpty(search.columns)
  }

  const isLastPage = () => {
    return results?.length < search.pageSize
  }

  const isStateChanged = () => !_.isEqual(lastSearch, search)

  const changeSearch = (values) => {
    setSearch(s => ({ ...s, ...values }))
  }

  const prevPage = () => {
    if (search.currentPage > 0) {
      triggerSearch({ prompt: true, currentPage: search.currentPage - 1 })
    }
  }

  const nextPage = () => {
    if (results?.length === search.pageSize) {
      triggerSearch({ prompt: true, currentPage: search.currentPage + 1 })
    }
  }

  const triggerSearch = ({ prompt, currentPage }) => {
    if (prompt || (isStateChanged() && isValid())) {
      if (currentPage) {
        changeSearch({ currentPage })
      } else {
        changeSearch({ currentPage: 0 })
      }
      setLastSearch({ ...search })
      setLoading(true)
      unsecuredAPI.searchInCatalog(search)
        .then(response => {
          if (response.ok) {
            setResults(response.data.data)
          } else {
            setResults([])
            toast.error(`[${response.status}] Search failed`)
          }
        }).catch(error => {
        toast.error(`Search failed => ${error}`)
      }).finally(() => {
        // setResults([
        //   { id: '1', title: 'book 1', author: 'author 1', description: 'desc 1' },
        //   { id: '2', title: 'book 2', author: 'author 2', description: 'desc 2' },
        //   { id: '3', title: 'book 3', author: 'author 3', description: 'desc 3' },
        //   { id: '4', title: 'book 4', author: 'author 4', description: 'desc 4' },
        //   { id: '5', title: 'book 5', author: 'author 5', description: 'desc 5' },
        // ])
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    if (initGroup && initPhrase && !_.isEmpty(initPhrase)) {
      triggerSearch({ prompt: true })
    }
  }, [])

  return {
    loading,
    results,
    getSearch: search,
    changeSearch,
    triggerSearch,
    isValid,
    searchChanged: isStateChanged,
    currentPage: search.currentPage,
    isLastPage,
    prevPage,
    nextPage,
  }
}

useSearch.propTypes = {
  initPhrase: PropTypes.string,
  initGroup: PropTypes.string.isRequired,
  initColumns: PropTypes.array,
}

export default useSearch
