import React from 'react'
import PropTypes from 'prop-types'
import { getRandomColor } from '../../utils/colors'
import { Card, Icon } from 'semantic-ui-react'


const BookCard = ({ item, isInWishlist, removeFromWishlist, addToWishlist }) => {

  return (
    <Card fluid color={getRandomColor()}>
      <Card.Content>
        <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
          {item.title}
          {addToWishlist && removeFromWishlist &&
          <Icon name={isInWishlist ? 'heart' : 'heart outline'}
                color={isInWishlist ? 'red' : 'black'}
                onClick={() => isInWishlist ? removeFromWishlist(item) : addToWishlist(item)}
                style={{ cursor: 'pointer' }}
          />
          }
        </Card.Header>
        <Card.Meta>{item.author}</Card.Meta>
        <Card.Description>Isbn: {item.isbn}</Card.Description>
        <Card.Description>Subject area: {item.subject_area}</Card.Description>
        <Card.Description>Currently available copies: {item.available_copies}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>About: {item.description}</Card.Description>
      </Card.Content>
    </Card>
  )
}

BookCard.propTypes = {
  item: PropTypes.object.isRequired,
  isInWishlist: PropTypes.bool,
  addToWishlist: PropTypes.func,
  removeFromWishlist: PropTypes.func,
}

export default BookCard
