import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Image } from 'semantic-ui-react'
import logo from '../../../assets/logo.png'
import book_cover from '../../../assets/book_cover.png'


const BookCardMainContent = ({ isbn, title, author, subject_area, available_copies }) => {

  return (
    <Card.Content style={{ padding: '2em 2em 0 2em' }}>
      <Image src={logo}
             alt={'GTL logo'}
             size={'mini'}
             floated={'right'}
             style={{ margin: 0 }}
      />
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={book_cover}
                   alt={'Book cover'}
                   size={'tiny'}
                   style={{ margin: 0 }}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>Author: {author}</Card.Meta>
            <Card.Description>Subject area: {subject_area}</Card.Description>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Card.Description>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              Isbn: {isbn}
              <br/>
              Total copies: {available_copies}
              <br/>
              Available copies: {available_copies}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Description>
    </Card.Content>
  )
}

BookCardMainContent.propTypes = {
  isbn: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  subject_area: PropTypes.string.isRequired,
  available_copies: PropTypes.number.isRequired,
}



export default BookCardMainContent
