import React from 'react'
import { Card, Dimmer, Grid, Loader } from 'semantic-ui-react'


const Preferences = ({ user }) => {

  return (
    <div>
      <Dimmer active={user === null} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      {user &&
      <Grid className='content' style={{ padding: '50px' }} textAlign={'center'}>
        <Grid.Row textAlign={'center'}>
          <Grid.Column>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>Organization</Card.Header>
                  <Card.Meta>CREATE ORGANIZATION</Card.Meta>
                  <Card.Description>
                    create group of people with access to a group of files
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Reset password</Card.Header>
                  <Card.Meta>SECURITY</Card.Meta>
                  <Card.Description>
                    old, new -> maybe send by email?
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered>
              <Card className='card'>
                <Card.Content>
                  <Card.Header>Background</Card.Header>
                  <Card.Meta>STYLE</Card.Meta>
                  <Card.Description>
                    change background color, custom.. nice :)
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>more</Card.Header>
                  <Card.Meta>STH</Card.Meta>
                  <Card.Description>
                    desc
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      }
    </div>
  )
}


export default Preferences
