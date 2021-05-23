import React, { useState } from 'react'
import { Button, Checkbox, Grid, Icon, Input, Select } from 'semantic-ui-react'
import './SearchBar.css'
import PropTypes from 'prop-types'
import useSearch from '../useSearch'


const inputStyle = {
  WebkitTransition: 'width .5s ease-in-out',
  transition: 'width .5s ease-in-out',
  width: '200px',
  border: 'none solid',
  borderRadius: 0,
}

export const options = [
  { key: 'everything', multiple: 'Everything', one: 'Everything', value: 'EVERYTHING', isType: false },
  { key: 'books', multiple: 'Books', one: 'Book', value: 'BOOK', isType: true },
  { key: 'articles', multiple: 'Articles', one: 'Article', value: 'ARTICLE', isType: true },
  { key: 'journals', multiple: 'Journals', one: 'Journal', value: 'JOURNAL', isType: true },
  { key: 'maps', multiple: 'Maps', one: 'Map', value: 'MAP', isType: true },
]

const searchInOptions = [
  { key: 'title', label: 'Title', value: 'TITLE' },
  { key: 'author', label: 'Author', value: 'AUTHOR' },
  { key: 'area', label: 'Subject area', value: 'AREA' },
]

export const useSearchBarState = () => {

  const {
    loading,
    getSearch,
    results,
    triggerSearch,
    changeSearch,
    isValid,
    searchChanged,
    currentPage,
    isLastPage,
    prevPage,
    nextPage,
  } = useSearch({
    initCurrentPage: 0,
    initPageSize: 15,
    initGroup: options[0].value,
    initColumns: [searchInOptions[0].value],
  })

  return {
    loading,
    getSearch,
    results,
    triggerSearch,
    changeSearch,
    isValid,
    searchChanged,
    currentPage,
    isLastPage,
    nextPage,
    prevPage,
  }
}

const SearchBar = ({ loading, isValid, searchChanged, changeSearch, triggerSearch, getSearch }) => {
  const [inputCss, setInputCss] = useState(inputStyle)

  return (
    <Grid centered>
      <Grid.Row>
        <Input type="text" placeholder="Search...">
          <Select defaultValue={options[0].value}
                  options={options.map(option => ({
                    key: option.key,
                    value: option.value,
                    text: option.multiple,
                  }))}
                  onChange={(e, { value }) => changeSearch({ group: value })}
                  style={{ borderRadius: '25px 0 0 25px', width: '150px' }}
          />
          <input style={inputCss}
                 onChange={(e) => changeSearch({ phrase: e.target.value })}
                 onFocus={() => setInputCss(css => ({ ...css, width: '400px', border: 'solid #DDD 1px' }))}
                 onBlur={() => setInputCss(inputStyle)}
          />
          <Button onClick={triggerSearch}
                  style={{ borderRadius: '0 25px 25px 0' }}
                  disabled={loading || !isValid() || !searchChanged()}
                  loading={loading}
          >
            Search
            <Icon name={'search'} style={{ marginLeft: '1em' }}/>
          </Button>
        </Input>
      </Grid.Row>
      <Grid.Row>
        <Icon name={'filter'} style={{ marginRight: '2em' }}/>
        {searchInOptions.map((item, index) =>
          <Checkbox key={item.key}
                    label={item.label}
                    checked={getSearch.columns.includes(item.value)}
                    onChange={() => {
                      if (getSearch.columns.includes(item.value)) {
                        if (getSearch.columns.length === 1) {
                          changeSearch({ columns: searchInOptions.map(option => option.value) })
                        } else {
                          changeSearch({ columns: getSearch.columns.filter(column => column !== item.value) })
                        }
                      } else {
                        changeSearch({ columns: [...getSearch.columns, item.value] })
                      }
                    }}
                    style={index > 0 ? { marginLeft: '2em' } : {}}
          />,
        )}
      </Grid.Row>
    </Grid>
  )
}

SearchBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  isValid: PropTypes.func.isRequired,
  searchChanged: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  triggerSearch: PropTypes.func.isRequired,
  getSearch: PropTypes.object.isRequired,
}

export default SearchBar
