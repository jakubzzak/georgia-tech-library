import { useEffect, useState } from 'react'
import { unsecuredAPI } from '../../api'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import _ from 'lodash'


const useSearch = ({ initPhrase, initGroup, initColumns }) => {
  const [lastSearch, setLastSearch] = useState({
    phrase: initPhrase,
    group: initGroup,
    columns: initColumns || [],
  })
  const [search, setSearch] = useState({
    phrase: initPhrase,
    group: initGroup,
    columns: initColumns || [],
  })
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const isValid = () => {
    return search && search.group && !_.isEmpty(search.phrase)
  }

  const isStateChanged = () => {
    return lastSearch.phrase !== search.phrase || lastSearch.group !== search.group
  }

  const changeSearch = (values) => {
    setSearch(s => ({ ...s, ...values }))
  }

  const triggerSearch = ({ prompt }) => {
    // TODO: empty columns handle as selected all, or disable search if not chosen any
    if (prompt || (isStateChanged() && isValid())) {
      setLastSearch({ ...search })
      setLoading(true)
      unsecuredAPI.searchInCatalog(search)
        .then(response => {
          if (response.ok) {
            setResults(response.data)
          } else {
            setResults([])
            toast.error(`[${response.status}] Search failed`)
          }
        }).catch(error => {
        toast.error(`Search failed => ${error}`)
      }).finally(() => {
        setResults([
          { id: '1', title: 'book 1', author: 'author 1', description: 'desc 1' },
          { id: '2', title: 'book 2', author: 'author 2', description: 'desc 2' },
          { id: '3', title: 'book 3', author: 'author 3', description: 'desc 3' },
          { id: '4', title: 'book 4', author: 'author 4', description: 'desc 4' },
          { id: '5', title: 'book 5', author: 'author 5', description: 'desc 5' },
        ])
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
    getSearch: search,
    changeSearch,
    triggerSearch,
    isValid,
    searchChanged: isStateChanged,
    results,
  }
}

useSearch.propTypes = {
  initPhrase: PropTypes.string,
  initGroup: PropTypes.string.isRequired,
  initColumns: PropTypes.array,
}

export default useSearch
