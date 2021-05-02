import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RealtimeSearch from '../../utils/RealtimeSearch'
import useBook from '../../ManageCatalog/useBook'
import { Button, Card, Grid, Image, Label, Segment } from 'semantic-ui-react'
import logo from '../../../assets/logo.png'
import ControlledPopup from '../../utils/ControlledPopup'
import useLoan from '../../ManageCatalog/useLoan'


const Checkout = ({ cardId }) => {
  const [book, setBook] = useState(null)
  const { find: findBook } = useBook()
  const { start: startLoan } = useLoan()

  return (
    <Segment>
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
        <Grid.Row>
          <Grid.Column textAlign={'left'}>
            <Card style={{ margin: 'auto', width: '550px' }}>
              <Card.Content style={{ padding: '2em' }}>
                <Image src={logo}
                       alt={'GTL logo'}
                       size={'mini'}
                       floated={'right'}
                       style={{ margin: 0 }}
                />
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Image src={'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}
                             alt={'Book cover'}
                             size={'tiny'}
                             style={{ margin: 0 }}
                      />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Card.Header>{book.title}</Card.Header>
                      <Card.Meta>{book.author}</Card.Meta>
                      <Card.Description>
                        Available copies: {book.available}
                      </Card.Description>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Card.Description>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        Isbn: {book.isbn}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Description>
              </Card.Content>
              {book.available > 0 &&
              <Card.Content className="find-action" textAlign={'center'}>
                <ControlledPopup trigger={<Button basic color={'blue'} content={'Checkout'}/>}
                                 content={closePopup =>
                                   <Button color="blue" content="Confirm" size={'tiny'} onClick={() => {
                                     startLoan({ cardId, isbn: book.isbn })
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
              }
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
