import PropTypes from 'prop-types'
import CustomerForm from './CustomerForm'
import { Segment } from 'semantic-ui-react'


const EditCustomerForm = ({ editCustomer, setCustomer, defaultValues }) => {

  const onSubmit = (data) => {
    editCustomer(data)
      .then(updatedCustomer => {
        if (updatedCustomer) {
          setCustomer(updatedCustomer)
        }
      })
  }

  return (
    <Segment>
      <CustomerForm onSubmit={onSubmit}
                    defaultValues={{ ...defaultValues, campus_id: defaultValues?.campus.id }}
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
