import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './BookCatalog.css'
import Layout from '../Layout/Layout'
import SearchBar, { useSearchBarState } from './SearchBar/SearchBar'
import { Button, Divider, Grid, Icon, Label } from 'semantic-ui-react'
import BookCard from './BookCard/BookCard'


const BookCatalog = ({ addToWishlist, removeFromWishlist, isInWishlist }) => {
  // const [items, setItems] = useState(null)
  const {
    loading,
    getSearch,
    results: items,
    triggerSearch,
    changeSearch,
    isValid,
    searchChanged,
    currentPage,
    isLastPage,
    prevPage,
    nextPage,
  } = useSearchBarState()

  return (
    <Layout useWrapper>
      <Grid textAlign={'center'}>
        <Grid.Row>
          <SearchBar loading={loading}
                     getSearch={getSearch}
                     triggerSearch={triggerSearch}
                     changeSearch={changeSearch}
                     isValid={isValid}
                     searchChanged={searchChanged}
                     currentPage={currentPage}
                     prevPage={prevPage}
                     nextPage={nextPage}
          />
        </Grid.Row>
        {!Array.isArray(items) ? (
          <Grid.Row>
            <span style={{ marginTop: '2em' }}>Search for whatever you wish from more than <strong>100 000</strong> titles</span>
          </Grid.Row>

        ) : (
          <Divider/>
        )}
        {Array.isArray(items) &&
        <React.Fragment>
          {items.length === 0 ? (
            <Grid.Row>
              <span className="note">No results found corresponding to your search</span>
            </Grid.Row>
          ) : (
            <React.Fragment>
              <span className="note">Found {items.length} results</span>
              {items.map((item, index) => (
                <BookCard key={index}
                          item={item}
                          isInWishlist={isInWishlist(item)}
                          addToWishlist={addToWishlist}
                          removeFromWishlist={removeFromWishlist}
                />
              ))}
              <Grid style={{ width: '100%' }} centered>
                <Grid.Row>
                  <Grid.Column>
                    <Divider />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign={'center'}>
                    <Button icon={'left arrow'} disabled={currentPage === 0} style={{ width: '100px', margin: 0 }} onClick={() => prevPage()} />
                    <span style={{ margin: '0 3em' }}>
                      {currentPage + 1}
                    </span>
                    <Button icon={'right arrow'} disabled={isLastPage()} style={{ width: '100px', margin: 0 }} onClick={() => nextPage()} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </React.Fragment>
          )}
        </React.Fragment>
        }
      </Grid>
    </Layout>
  )
}

BookCatalog.propTypes = {
  addToWishlist: PropTypes.func,
  removeFromWishlist: PropTypes.func,
  isInWishlist: PropTypes.func.isRequired,
}

export default BookCatalog
