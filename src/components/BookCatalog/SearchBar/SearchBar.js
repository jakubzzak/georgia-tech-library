import React, { useReducer, useCallback, useRef, useEffect } from 'react'
import { Search } from 'semantic-ui-react'


const initialState = {
  loading: false,
  results: [],
  value: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }
    default:
      throw new Error(`Something went wrong with search, state: ${state}, action: ${action}`)
  }
}

const SearchBar = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, results, value } = state

  const timeoutRef = useRef()
  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      // TODO: DB request here, not on debounce ?

      dispatch({
        type: 'FINISH_SEARCH',
        results: [],
      })
    }, 1000)
  }, [])

  useEffect(() => {
    console.log('creare timeout')
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div>
      <Search loading={loading} placeholder={'Search..'}
              onResultSelect={(e, data) => {
                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
              }}
              onSearchChange={handleSearchChange}
              results={results}
              value={value}
      />
    </div>
  )
}

export default SearchBar
