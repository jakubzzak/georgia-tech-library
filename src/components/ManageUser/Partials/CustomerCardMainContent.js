import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Image } from 'semantic-ui-react'
import logo from '../../../assets/logo.png'


const CustomerCardMainContent = ({ cardid, firstname, lastname, campus }) => {

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
                   alt={'User photo'}
                   size={'tiny'}
                   style={{ margin: 0 }}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Header>{`${firstname} ${lastname}`}</Card.Header>
            <Card.Meta>{campus}</Card.Meta>
            <Card.Description>
              address/ssn/email/phone here ? maybe not necessary
            </Card.Description>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Card.Description>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              Card number: {cardid}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Description>
    </Card.Content>
  )
}

CustomerCardMainContent.propTypes = {
  cardid: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  campus: PropTypes.string.isRequired,
}



export default CustomerCardMainContent
