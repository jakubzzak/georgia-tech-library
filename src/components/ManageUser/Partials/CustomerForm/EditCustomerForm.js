import PropTypes from 'prop-types'
import CustomerForm from './CustomerForm'
import { Segment } from 'semantic-ui-react'


const EditCustomerForm = ({ editCustomer, defaultValues }) => {

  const onSubmit = (data) => {
    if (data.ssn === defaultValues.ssn) {
      editCustomer(data)
    } else {
      editCustomer({ ...data, ssn: defaultValues.ssn, newSsn: data.ssn })
    }
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
  defaultValues: PropTypes.object,
}

export default EditCustomerForm
