import React from 'react'
import { Grid, Card, Divider, Label } from 'semantic-ui-react'
import './LandingPage.css'
import '../App.css'
import SearchBar from '../BookCatalog/SearchBar/SearchBar'


const LandingPage = ({ setOpenModal }) => {

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
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>News</Card.Header>
                  <Card.Meta>INFO</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    sth here
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card className="card">
                <Card.Content>
                  <Card.Header>Hot</Card.Header>
                  <Card.Meta>hot hot hot</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    Hot news here.
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
                    desc of library
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>More</Card.Header>
                  <Card.Meta>STH</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    desc
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}


export default LandingPage
