import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Grid, Label, Segment } from 'semantic-ui-react'
import '../ManageUser/FindCustomer.css'
import RealtimeSearch from '../utils/RealtimeSearch'
import ControlledPopup from '../utils/ControlledPopup'
import BookCardMainContent from './Partials/BookCardMainContent'
import EditBookForm from './Partials/BookForm/EditBookForm'
import ChangeStock from './Partials/ChangeStock'


const FindBook = ({ book, setBook, findBook, updateBook, changeStock, removeBook }) => {
  const [action, setAction] = useState(null)

  return (
    <Segment color={'blue'} style={{ width: '100%' }}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <RealtimeSearch setChosenValue={setBook}
                            apiFetch={findBook}
                            customResultRenderer={({ isbn, title, author }) => (
                              <Label key={isbn}
                                     as="span"
                                     content={`${isbn} (${title}, ${author})`}
                              />
                            )}
                            placeholder={'Enter book isbn'}
            />
          </Grid.Column>
        </Grid.Row>
        {book &&
        <>
          <Grid.Row>
            <Grid.Column textAlign={'left'}>
              <Card style={{ margin: 'auto', width: '550px' }}>
                <BookCardMainContent isbn={book.isbn}
                                     title={book.title}
                                     author={book.author}
                                     available={book.available}
                />
                <Card.Content className="find-action" textAlign={'center'}>
                  <Button basic={action !== 'edit'}
                          color={'orange'}
                          content={'Edit'}
                          onClick={() => setAction('edit')}
                  />
                  <Button basic={action !== 'stock'}
                          color={'purple'}
                          content={'Stock'}
                          onClick={() => setAction('stock')}
                  />
                  <ControlledPopup trigger={<Button basic color={'red'} content={'Delete'}/>}
                                   content={closePopup =>
                                     <Button color="red" content="Confirm" size={'tiny'} onClick={() => {
                                       removeBook(book)
                                         .finally(() => {
                                           closePopup()
                                         })
                                     }}/>
                                   }
                                   timeoutLength={2500}
                                   on="click"
                                   position="top center"
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {action === 'stock' ? (
                <ChangeStock isbn={book.isbn}
                             changeStock={changeStock}
                             setBook={setBook}
                             closeAction={() => setAction(null)}
                />
              ) : action === 'edit' && (
                <EditBookForm editBook={updateBook}
                              setBook={setBook}
                              defaultValues={book}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </>
        }
      </Grid>
    </Segment>
  )
}

FindBook.propTypes = {
  book: PropTypes.object,
  setBook: PropTypes.func.isRequired,
  findBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  changeStock: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
}

export default FindBook
