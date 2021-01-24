import React, { useState } from 'react'
import { Grid, Card, Image, Button, Divider, Loader, Dimmer } from 'semantic-ui-react'
import './Dashboard.css'
import '../App.css'
import Avatar from 'react-avatar'


const Dashboard = ({ user, signOut }) => {

  const getFullName = () => {
    if (user) {
      return user.firstName + ' ' + user.lastName
    }
    return ''
  }

  return (
    <div>
      <Dimmer active={user === null} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      {user &&
      <Grid className='content' style={{ padding: '50px' }} textAlign={'center'}>
        <Grid.Row>
          <Grid.Column>
            <Avatar round={10} size={150} name="Jakub Zak"
                    color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue', 'black', 'orange', 'yellow', 'brown'])}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <span style={{ fontSize: '20px', fontFamily: '' }}>{getFullName()}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>Personal</Card.Header>
                  <Card.Meta>INFO</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    email: {user.username}
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card className='card'>
                <Card.Content>
                  <Card.Header>Role</Card.Header>
                  <Card.Meta>{user.role}</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    With this role you have access to all data stored by personalApi. Beware! With such privileges comes
                    a
                    lot of responsibility too.
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
                  <Card.Header>Company</Card.Header>
                  <Card.Meta>MY COMPANY</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    desc of company
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
        <Grid.Row>
          <Grid.Column>
            <Button color='blue' content='Sign out' size={'tiny'} onClick={signOut}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      }
    </div>
  )
}


export default Dashboard
