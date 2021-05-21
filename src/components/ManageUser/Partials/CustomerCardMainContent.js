import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Image } from 'semantic-ui-react'
import logo from '../../../assets/logo.png'
import moment from 'moment'


const CustomerCardMainContent = ({ card_id, expiration_date, email, firstname, lastname, campus }) => {

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
            <Image src={'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}
                   alt={'User photo'}
                   size={'tiny'}
                   style={{ margin: 0 }}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Header>{`${firstname} ${lastname}`}</Card.Header>
            <Card.Meta>
              {`${campus.address.street} ${campus.address.number ?? ''},`}
              <br/>
              {`${campus.address.post_code} ${campus.address.city} (${campus.address.country})`}
            </Card.Meta>
            <Card.Description style={{ marginTop: '1em' }}>
              {email}
            </Card.Description>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Card.Description style={{ marginBottom: 0, paddingBottom: 0 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              Card number: {card_id}<br/>
              Expiration date: {moment(expiration_date).utc().format("DD MMM YYYY")}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Description>
    </Card.Content>
  )
}

CustomerCardMainContent.propTypes = {
  card_id: PropTypes.string.isRequired,
  expiration_date: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  campus: PropTypes.object.isRequired,
}



export default CustomerCardMainContent
