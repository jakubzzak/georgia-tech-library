import { Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import BookForm from './BookForm'


const CreateBookForm = ({ createBook, switchTab }) => {

  const onSubmit = (data) => {
    createBook(data)
      .then(success => {
        if (success) {
          switchTab()
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
  switchTab: PropTypes.func.isRequired,
}

export default CreateBookForm
