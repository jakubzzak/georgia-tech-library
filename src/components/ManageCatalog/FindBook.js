import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Grid, Label, Segment } from 'semantic-ui-react'
import '../ManageUser/FindCustomer.css'
import RealtimeSearch from '../utils/RealtimeSearch'
import BookCardMainContent from './Partials/BookCardMainContent'
import EditBookForm from './Partials/BookForm/EditBookForm'
import ChangeStock from './Partials/ChangeStock'


const FindBook = ({ book, findBook, getBook, updateBook, changeStock, disableBook, enableBook }) => {
  const [action, setAction] = useState(null)

  return (
    <Segment color={'blue'} style={{ width: '100%' }}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <RealtimeSearch setChosenValue={getBook}
                            apiFetch={findBook}
                            customResultRenderer={({ isbn, title, author }) => (
                              <Label key={isbn}
                                     as="span"
                                     style={{ width: '285px' }}
                                     content={<span>{isbn} <br/> ({title}, {author})</span>}
                              />
                            )}
                            placeholder={'Enter book isbn'}
            />
          </Grid.Column>
        </Grid.Row>
        {book &&
        <React.Fragment>
          <Grid.Row>
            <Grid.Column textAlign={'left'}>
              <Card style={{ margin: 'auto', width: '550px' }}>
                <BookCardMainContent isbn={book.isbn}
                                     title={book.title}
                                     author={book.author}
                                     subject_area={book.subject_area}
                                     total_copies={book.total_copies}
                                     available_copies={book.available_copies}
                />
                <Card.Content className="find-action" textAlign={'center'} extra>
                  {book.is_active ? (
                    <>
                      <Button basic={action !== 'description'}
                              color={'brown'}
                              content={'About'}
                              onClick={() => setAction(action === 'description' ? null : 'description')}
                      />
                      <Button basic={action !== 'edit'}
                              color={'orange'}
                              content={'Edit'}
                              onClick={() => setAction(action === 'edit' ? null : 'edit')}
                      />
                      <Button basic={action !== 'stock'}
                              color={'purple'}
                              content={'Stock'}
                              onClick={() => setAction(action === 'stock' ? null : 'stock')}
                      />
                      <Button basic
                              color={'red'}
                              content={'Disable'}
                              onClick={() => {
                                disableBook(book)
                                  .then(success => {
                                    if (success) {
                                      setAction(null)
                                    }
                                  })
                              }}
                      />
                    </>
                  ) : (
                    <Button basic
                            color={'green'}
                            content={'Enable'}
                            onClick={() => enableBook(book)}
                    />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {action === 'description' ? (
                <Segment>
                  <Grid textAlign={'left'}>
                    <Grid.Row>
                      <Grid.Column>
                        {book.description}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              ) : action === 'stock' ? (
                <ChangeStock isbn={book.isbn}
                             changeStock={changeStock}
                             defaultValues={book}
                />
              ) : action === 'edit' && (
                <EditBookForm editBook={updateBook}
                              defaultValues={book}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </React.Fragment>
        }
      </Grid>
    </Segment>
  )
}

FindBook.propTypes = {
  book: PropTypes.object,
  findBook: PropTypes.func.isRequired,
  getBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  changeStock: PropTypes.func.isRequired,
  disableBook: PropTypes.func.isRequired,
  enableBook: PropTypes.func.isRequired,
}

export default FindBook
