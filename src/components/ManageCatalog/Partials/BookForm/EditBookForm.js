import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import BookForm from './BookForm'


const EditBookForm = ({ editBook, defaultValues }) => {

  const onSubmit = (data) => {
    editBook(data)
  }

  return (
    <Segment>
      <BookForm onSubmit={onSubmit}
                isEdit={true}
                defaultValues={defaultValues}
      />
    </Segment>
  )
}

EditBookForm.propTypes = {
  editBook: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default EditBookForm
