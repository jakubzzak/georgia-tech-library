import React, { useState } from 'react'
import { Grid, Card, Divider } from 'semantic-ui-react'
import './Dashboard.css'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../App.css'
import Avatar from 'react-avatar'
import Layout from '../Layout/Layout'
import { getRandomColor } from '../utils/colors'


const Dashboard = ({ user }) => {
  const [cardExpirationDaysLeft] = useState(moment(user.card.dueDate).diff(moment(), 'days'))

  const getFullName = () => {
    if (user) {
      return user.firstName + ' ' + user.lastName
    }
    return ''
  }

  return (
    <Layout loading={!user}>
      <Grid className="content" style={{ padding: '50px' }} textAlign={'center'}>
        <Grid.Row>
          <Grid.Column>
            <Avatar round={'25px'} size={150} name={getFullName()}
                    color={getRandomColor()}/>
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
                    email: {user.email}
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card className="card">
                <Card.Content>
                  <Card.Header>Card</Card.Header>
                  <Card.Meta>MEMBERSHIP</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    <div>Issue date: {user.card.issueDate}</div>
                    <div>Due date: {user.card.dueDate}</div>
                    <br/>
                    {cardExpirationDaysLeft > 0 && cardExpirationDaysLeft <= 30 ? (
                      <div>
                      Your card will expire in
                      <span style={{ color: 'red' }}> {cardExpirationDaysLeft} </span>
                      {cardExpirationDaysLeft === 1 ? 'day':'days'}
                      </div>
                    ) : cardExpirationDaysLeft <= 0 && (
                      <span style={{ color: 'red' }}>Your card has expired. Please, renew it immediately!</span>
                    )}
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
      </Grid>
    </Layout>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
}


export default Dashboard
