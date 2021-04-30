import PropTypes from 'prop-types'
import CustomerForm from './CustomerForm'
import { Segment } from 'semantic-ui-react'


const EditCustomerForm = ({ editCustomer, setCustomer, defaultValues }) => {

  const onSubmit = (data) => {
    editCustomer(data)
      .then(response => {
        if (response.ok) {
          setCustomer(response.data)
        }
      })
  }

  return (
    <Segment>
      <CustomerForm onSubmit={onSubmit}
                    defaultValues={defaultValues}
      />
    </Segment>
  )
}

EditCustomerForm.propTypes = {
  editCustomer: PropTypes.func.isRequired,
  setCustomer: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default EditCustomerForm
