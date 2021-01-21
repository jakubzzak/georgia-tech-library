import React from 'react'
import { Grid, Card, Image, Button } from 'semantic-ui-react'
import './Dashboard.css'
import '../App.css'
import Avatar from 'react-avatar'


const Dashboard = () => {

  return (
    <Grid className='content' style={{ padding: '50px' }} textAlign={'center'}>
      <Grid.Row>
        <Grid.Column>
          <Avatar round={10} size={150} name="Jakub Zak"
                  color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row textAlign={'center'}>
        <Grid.Column width={16}>
          <Card.Group centered>
            <Card>
              <Card.Content >
                <Card.Header>personal</Card.Header>
                <Card.Meta>INFO</Card.Meta>
                <Card.Description>
                  desc
                </Card.Description>
              </Card.Content>
            </Card>
            <Card className={'card'}>
              <Card.Content>
                <Card.Header>Role</Card.Header>
                <Card.Meta>ADMIN</Card.Meta>
                <Card.Description>
                  desc of this role
                </Card.Description>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>Company</Card.Header>
                <Card.Meta>MY COMPANY</Card.Meta>
                <Card.Description>
                  desc of company
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
  )
}


export default Dashboard
