import React, { useState } from 'react'
import { Grid, Card, Divider, Label } from 'semantic-ui-react'
import './LandingPage.css'
import '../App.css'
import PropTypes from 'prop-types'
import SearchBar from '../BookCatalog/SearchBar/SearchBar'
import BookCard from '../BookCard/BookCard'


const LandingPage = ({ setOpenModal }) => {
  const [items, setItems] = useState(null)

  return (
    <div>
      <Grid.Row>
        <Label as={'a'} attached={'top right'} content={'Sign in'} onClick={() => setOpenModal(true)}/>
      </Grid.Row>
      <Grid className="content" style={{ padding: '50px' }} textAlign={'center'}>
        <Grid.Row>
          <SearchBar setResults={setItems}/>
        </Grid.Row>
        {!Array.isArray(items) &&
        <Grid.Row>
          <span style={{ marginTop: '2em' }}>Search for whatever you wish from more than <strong>100 000</strong> titles</span>
        </Grid.Row>
        }
        <Divider/>
        {!Array.isArray(items) ? (
          <>
            <Grid.Row>
              <Grid.Column>
                <Card.Group centered>
                  <Card>
                    <Card.Content>
                      <Card.Header>News</Card.Header>
                      <Card.Meta>INFO</Card.Meta>
                      <Divider/>
                      <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                        Schools are open and so are libraries as of April 1st.
                      </Card.Description>
                    </Card.Content>
                  </Card>
                  <Card className="card">
                    <Card.Content>
                      <Card.Header>COVID19</Card.Header>
                      <Card.Meta>RESTRICTIONS</Card.Meta>
                      <Divider/>
                      <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                        To prevent the spread of the virus we took certain steps..
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Card.Group centered>
                  <Card>
                    <Card.Content>
                      <Card.Header>About library</Card.Header>
                      <Card.Meta>LIBRARY</Card.Meta>
                      <Divider/>
                      <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                        Georgia Tech Library was founded in 19..
                      </Card.Description>
                    </Card.Content>
                  </Card>
                  <Card>
                    <Card.Content>
                      <Card.Header>Contact</Card.Header>
                      <Card.Meta>HOW TO REACH US</Card.Meta>
                      <Divider/>
                      <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                        You can reach us every working day from 8:30 to 16:30 by phone.
                        You can also expect to get an email response within 24 hours.
                        <br/>
                        <br/>
                        email: gtl@ucn.dk
                        <br/>
                        phone: +45 00 00 00 00
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </>
        ) : items.length === 0 ? (
          <>
            <Grid.Row>
              <span className="note">No results found corresponding to your search</span>
            </Grid.Row>
          </>
        ) : (
          <>
            <span className="note">Showing {items.length} results</span>
            {items.map((item, index) => (
              <BookCard key={index} item={item}/>
            ))}
          </>
        )}
      </Grid>
    </div>
  )
}

LandingPage.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
}


export default LandingPage
