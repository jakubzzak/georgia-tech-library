import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RealtimeSearch from '../../utils/RealtimeSearch'
import useBook from '../../ManageCatalog/useBook'
import { Button, Card, Grid, Label, Segment } from 'semantic-ui-react'
import ControlledPopup from '../../utils/ControlledPopup'
import useLoan from '../../ManageCatalog/useLoan'
import BookCardMainContent from '../../ManageCatalog/Partials/BookCardMainContent'


const Checkout = ({ ssn }) => {
  const { book, find: findBook, get: getBook } = useBook()
  const { start: startLoan } = useLoan()

  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <RealtimeSearch setChosenValue={getBook}
                            apiFetch={findBook}
                            customResultRenderer={({ isbn, title, author }) => (
                              <Label key={isbn}
                                     style={{ width: '285px' }}
                                     as="span"
                                     content={<span>{isbn} <br/> ({title}, {author})</span>}
                              />
                            )}
                            placeholder={'Enter book isbn'}
            />
          </Grid.Column>
        </Grid.Row>
        {book &&
        <Grid.Row>
          <Grid.Column textAlign={'left'}>
            <Card style={{ margin: 'auto', width: '550px' }}>
              <BookCardMainContent isbn={book.isbn}
                                   title={book.title}
                                   author={book.author}
                                   subject_area={book.subject_area}
                                   available_copies={book.available_copies}
              />
              <Card.Content className="find-action" textAlign={'center'}>
                <ControlledPopup trigger={<Button basic color={'blue'} content={'Checkout'} disabled={book.available_copies === 0}/>}
                                 content={closePopup =>
                                   <Button color="blue" content="Confirm" size={'tiny'} onClick={() => {
                                     startLoan({ ssn, isbn: book.isbn })
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
        }
      </Grid>
    </Segment>
  )
}

Checkout.propTypes = {
  cardId: PropTypes.string.isRequired,
}


export default Checkout
