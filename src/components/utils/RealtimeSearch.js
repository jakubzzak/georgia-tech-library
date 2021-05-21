import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import { Search, Label, Grid } from 'semantic-ui-react'
import placeholder from 'lodash/fp/placeholder'

const initialState = {
  loading: false,
  results: [],
  value: '',
}

const exampleReducer = (state, action) => {
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
      throw new Error()
  }
}

const RealtimeSearch = ({ setChosenValue, apiFetch, customResultRenderer, placeholder }) => {
  const [state, dispatch] = useReducer(exampleReducer, initialState)
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

      apiFetch(data.value)
        .then(results => {
          dispatch({
            type: 'FINISH_SEARCH',
            results: results,
          })
        })

    }, 800)
  }, [apiFetch])

  useEffect(() => {
    // clean up
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Grid centered style={{ padding: '2em' }}>
      <Search loading={loading}
              style={{ width: '320px' }}
              fluid
              resultRenderer={customResultRenderer}
              placeholder={placeholder}
              onResultSelect={(e, data) => {
                setChosenValue({ id: data.result.id })
                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.full_name })
                dispatch({ type: 'CLEAN_QUERY' })
              }}
              onSearchChange={handleSearchChange}
              results={results}
              value={value}
      />
    </Grid>
  )
}

RealtimeSearch.propTypes = {
  setChosenValue: PropTypes.func.isRequired,
  apiFetch: PropTypes.func.isRequired,
  customResultRenderer: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default RealtimeSearch
