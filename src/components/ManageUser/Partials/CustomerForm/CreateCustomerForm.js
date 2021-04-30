import { Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import CustomerForm from './CustomerForm'


const CreateCustomerForm = ({ createCustomer, setCustomer }) => {

  const onSubmit = (data) => {
    createCustomer(data)
      .then(response => {
        if (response.ok) {
          setCustomer(response.data)
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
  setCustomer: PropTypes.func.isRequired,
}

export default CreateCustomerForm
