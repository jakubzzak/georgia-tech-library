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
  const [cardExpirationDaysLeft] = useState(moment(user.card?.expiration_date).diff(moment(), 'days'))

  const getFullName = () => {
    if (user) {
      return user.first_name + ' ' + user.last_name
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
                    <br/>
                    {user.phone_numbers?.map((item, index) => (
                      <div key={index}>
                        <span>{`${item.type.toLowerCase()}: +${item.country_code} ${item.number}`}</span>
                        <br/>
                      </div>
                    ))}
                  </Card.Description>
                </Card.Content>
              </Card>
              {user.card &&
              <Card className="card">
                <Card.Content>
                  <Card.Header>Card</Card.Header>
                  <Card.Meta>MEMBERSHIP</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    <div>Due date: {moment(user.card.expiration_date).utc().format('DD MMM YYYY')}</div>
                    <br/>
                    {cardExpirationDaysLeft > 0 && cardExpirationDaysLeft <= 30 ? (
                      <div>
                        Your card will expire in
                        <span style={{ color: 'red' }}> {cardExpirationDaysLeft} </span>
                        {cardExpirationDaysLeft === 1 ? 'day' : 'days'}
                      </div>
                    ) : cardExpirationDaysLeft <= 0 && (
                      <span style={{ color: 'red' }}>Your card has expired. Please, renew it immediately!</span>
                    )}
                  </Card.Description>
                </Card.Content>
              </Card>
              }
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>Campus</Card.Header>
                  <Card.Meta>INSTITUTION</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    <span>{`${user.campus?.address?.street || ''} ${user.campus?.address?.number || ''}`}</span>
                    <br/>
                    <span>{`${user.campus?.address?.post_code || ''}, ${user.campus?.address?.city || ''}`}</span>
                    <br/>
                    <span>{user.campus?.address?.country || ''}</span>
                  </Card.Description>
                </Card.Content>
              </Card>
              {user.address &&
              <Card>
                <Card.Content>
                  <Card.Header>Address</Card.Header>
                  <Card.Meta>HOME ADDRESS</Card.Meta>
                  <Divider/>
                  <Card.Description style={{ margin: '1em' }} textAlign={'left'}>
                    <span>{`${user.address.street || ''} ${user.address.number || ''}`}</span>
                    <br/>
                    <span>{`${user.address.post_code || ''}, ${user.address.city || ''}`}</span>
                    <br/>
                    <span>{user.address.country || ''}</span>
                  </Card.Description>
                </Card.Content>
              </Card>
              }
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
