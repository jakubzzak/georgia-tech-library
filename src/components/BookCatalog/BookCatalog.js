import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './BookCatalog.css'
import Layout from '../Layout/Layout'
import SearchBar from './SearchBar/SearchBar'
import { Divider, Grid } from 'semantic-ui-react'
import BookCard from './BookCard/BookCard'


const BookCatalog = ({ addToWishlist, removeFromWishlist, isInWishlist }) => {
  const [items, setItems] = useState(null)

  return (
    <Layout useWrapper>
      <Grid textAlign={'center'}>
        <Grid.Row>
          <SearchBar setResults={setItems}/>
        </Grid.Row>
        {!Array.isArray(items) ? (
          <Grid.Row>
            <span style={{ marginTop: '2em' }}>Search for whatever you wish from more than <strong>100 000</strong> titles</span>
          </Grid.Row>

        ) : (
          <Divider/>
        )}
        {Array.isArray(items) &&
        <>
          {items.length === 0 ? (
            <Grid.Row>
              <span className="note">No results found corresponding to your search</span>
            </Grid.Row>
          ) : (
            <>
              <span className="note">Showing {items.length} results</span>
              {items.map((item, index) => (
                <BookCard key={index}
                          item={item}
                          isInWishlist={isInWishlist(item)}
                          addToWishlist={addToWishlist}
                          removeFromWishlist={removeFromWishlist}
                />
              ))}
            </>
          )}
        </>
        }
      </Grid>
    </Layout>
  )
}

BookCatalog.propTypes = {
  addToWishlist: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
  isInWishlist: PropTypes.func.isRequired,
}

export default BookCatalog
