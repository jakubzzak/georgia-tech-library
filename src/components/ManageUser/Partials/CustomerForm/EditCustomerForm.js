import PropTypes from 'prop-types'
import CustomerForm from './CustomerForm'
import { Segment } from 'semantic-ui-react'


const EditCustomerForm = ({ editCustomer, defaultValues }) => {

  const onSubmit = (data) => {
    editCustomer(data)
  }

  return (
    <Segment>
      <CustomerForm onSubmit={onSubmit}
                    isEdit={true}
                    defaultValues={{ ...defaultValues, campus_id: defaultValues?.campus.id }}
      />
    </Segment>
  )
}

EditCustomerForm.propTypes = {
  editCustomer: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default EditCustomerForm
