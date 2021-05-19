import { Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import CustomerForm from './CustomerForm'


const CreateCustomerForm = ({ createCustomer, switchCustomerView }) => {

  const onSubmit = (data) => {
    createCustomer(data)
      .then(success => {
        if (success) {
          switchCustomerView()
        }
      })
  }

  return (
    <Segment color={'green'}>
      <CustomerForm onSubmit={onSubmit} />
    </Segment>
  )
}

CreateCustomerForm.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  switchCustomerView: PropTypes.func.isRequired,
}

export default CreateCustomerForm
