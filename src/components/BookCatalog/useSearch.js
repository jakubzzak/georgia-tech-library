import { useEffect, useState } from 'react'
import { unsecuredAPI } from '../../api'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import _ from 'lodash'


const useSearch = ({ initCurrentPage = 0, initPageSize = 15, initPhrase, initGroup, initColumns }) => {
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

  const triggerSearch = ({ prompt, currentPage = 0 }) => {
    if (prompt || (isStateChanged() && isValid())) {
      setLoading(true)
      changeSearch({ currentPage })
      const newSearch = { ...search, currentPage }
      unsecuredAPI.searchInCatalog(newSearch)
        .then(response => {
          if (response.ok && response.data.ok) {
            setResults(response.data.data)
            setLastSearch(newSearch)
          } else {
            setResults([])
            toast.error(`[${response.status}] Search failed`)
          }
        }).catch(error => {
        toast.error(`Search failed => ${error}`)
      }).finally(() => {
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
