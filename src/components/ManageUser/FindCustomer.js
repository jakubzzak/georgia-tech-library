import { Grid, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'


const FindCustomer = ({ customer, setCustomer, findCustomer }) => {

  return (
    <Segment color={'blue'}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            realtime search here
          </Grid.Column>
        </Grid.Row>
        {customer &&
        <Grid.Row>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>
        }
      </Grid>
    </Segment>
  )
}

FindCustomer.propTypes = {
  customer: PropTypes.object.isRequired,
  setCustomer: PropTypes.func.isRequired,
  findCustomer: PropTypes.func.isRequired,
}

export default FindCustomer
