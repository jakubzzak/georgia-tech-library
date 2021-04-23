import React from 'react'
import { Grid, Card, Divider, Label } from 'semantic-ui-react'
import './LandingPage.css'
import '../App.css'
import SearchBar from '../BookCatalog/SearchBar/SearchBar'
import { getRandomColor } from '../utils/colors'
import useSearch from '../BookCatalog/useSearch'


const LandingPage = ({ setOpenModal }) => {
  const { loading, results: items } = useSearch({})

  return (
    <div>
      <Grid.Row>
        <Label as={'a'} attached={'top right'} content={'Sign in'} onClick={() => setOpenModal(true)}/>
      </Grid.Row>
      <Grid className="content" style={{ padding: '50px' }} textAlign={'center'}>
        <Grid.Row>
          <SearchBar/>
        </Grid.Row>
        <Divider/>
        {items.length > 0 ? (
          <React.Fragment>
            <span className="note">Showing {items.length} results</span>
            {items.map((item, index) => (
              <Card key={index} fluid color={getRandomColor()}>
                <Card.Content>
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Meta>{item.author}</Card.Meta>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </React.Fragment>
        ) : (
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
        )}
      </Grid>
    </div>
  )
}


export default LandingPage
