import { Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import BookForm from './BookForm'


const CreateBookForm = ({ createBook, setBook }) => {

  const onSubmit = (data) => {
    createBook(data)
      .then(response => {
        if (response.ok) {
          setBook(response.data)
        }
      })
  }

  return (
    <Segment color={'green'}>
      <BookForm onSubmit={onSubmit}/>
    </Segment>
  )
}

CreateBookForm.propTypes = {
  createBook: PropTypes.func.isRequired,
  setBook: PropTypes.func.isRequired,
}

export default CreateBookForm
