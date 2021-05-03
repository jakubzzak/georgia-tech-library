import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Image } from 'semantic-ui-react'
import logo from '../../../assets/logo.png'


const BookCardMainContent = ({ isbn, title, author, available }) => {

  return (
    <Card.Content style={{ padding: '2em' }}>
      <Image src={logo}
             alt={'GTL logo'}
             size={'mini'}
             floated={'right'}
             style={{ margin: 0 }}
      />
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}
                   alt={'Book cover'}
                   size={'tiny'}
                   style={{ margin: 0 }}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{author}</Card.Meta>
            <Card.Description>
              Available copies: {available}
            </Card.Description>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Card.Description>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              Isbn: {isbn}
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
  available: PropTypes.number.isRequired,
}



export default BookCardMainContent
