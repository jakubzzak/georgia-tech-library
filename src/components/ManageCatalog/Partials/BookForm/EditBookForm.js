import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import BookForm from './BookForm'


const EditBookForm = ({ editBook, defaultValues }) => {

  const onSubmit = (data) => {
    if (data.isbn === defaultValues.isbn ) {
      editBook(data)
    } else {
      editBook({ ...data, isbn: defaultValues.isbn, newIsbn: data.isbn })
    }
  }

  return (
    <Segment>
      <BookForm onSubmit={onSubmit} defaultValues={defaultValues}/>
    </Segment>
  )
}

EditBookForm.propTypes = {
  editBook: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default EditBookForm
