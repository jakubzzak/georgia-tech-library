import React, { useEffect, useState } from 'react'
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

const SearchBar = ({ setResults }) => {
  const [inputCss, setInputCss] = useState(inputStyle)

  const options = [
    { key: 'everything', text: 'Everything', value: 'EVERYTHING' },
    { key: 'books', text: 'Books', value: 'BOOK' },
    { key: 'articles', text: 'Articles', value: 'ARTICLE' },
    { key: 'journals', text: 'Journals', value: 'JOURNAL' },
    { key: 'maps', text: 'Maps', value: 'MAP' },
  ]

  const searchInOptions = [
    { key: 'title', label: 'Title', value: 'TITLE' },
    { key: 'author', label: 'Author', value: 'AUTHOR' },
    { key: 'area', label: 'Subject area', value: 'AREA' },
  ]

  const {
    loading,
    getSearch,
    results,
    triggerSearch,
    changeSearch,
    isValid,
    searchChanged,
  } = useSearch({ initGroup: options[0].value, initColumns: [searchInOptions[0].value] })

  useEffect(() => {
    setResults(results)
  }, [results])

  return (
    <Grid centered>
      <Grid.Row>
        <Input type="text" placeholder="Search...">
          <Select options={options}
                  defaultValue={options[0].value}
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
        <Icon name={'filter outline'} style={{ marginRight: '2em' }} />
        {searchInOptions.map((item, index) =>
          <Checkbox key={item.key}
                    label={item.label}
                    checked={getSearch.columns.includes(item.value)}
                    onChange={() => {
                      if (getSearch.columns.includes(item.value)) {
                        changeSearch({ columns: getSearch.columns.filter(column => column !== item.value) })
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
  setResults: PropTypes.func.isRequired,
}

export default SearchBar
