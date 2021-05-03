import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import BookForm from './BookForm'


const EditBookForm = ({ editBook, setBook, defaultValues }) => {

  const onSubmit = (data) => {
    editBook(data)
      .then(response => {
        if (response.ok) {
          setBook(response.data)
        }
      })
  }

  return (
    <Segment>
      <BookForm onSubmit={onSubmit} defaultValues={defaultValues}/>
    </Segment>
  )
}

EditBookForm.propTypes = {
  editBook: PropTypes.func.isRequired,
  setBook: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default EditBookForm
