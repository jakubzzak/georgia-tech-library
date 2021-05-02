import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Grid, Image, Label, Segment } from 'semantic-ui-react'
import './FindCustomer.css'
import logo from '../../assets/logo.png'
import RealtimeSearch from '../utils/RealtimeSearch'
import ControlledPopup from '../utils/ControlledPopup'
import EditCustomerForm from './Partials/CustomerForm/EditCustomerForm'
import CheckIn from './Partials/CheckIn'
import Checkout from './Partials/Checkout'
import useLoan from '../ManageCatalog/useLoan'


const FindCustomer = ({ customer, setCustomer, findCustomer, updateCustomer, extendCardValidity, fetchActiveRentals }) => {
  const [action, setAction] = useState(null)
  const { close: closeLoan } = useLoan()

  return (
    <Segment color={'blue'} style={{ width: '100%' }}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <RealtimeSearch setChosenValue={setCustomer}
                            apiFetch={findCustomer}
                            customResultRenderer={({ cardid, firstname, lastname }) => (
                              <Label key={cardid}
                                     as="span"
                                     content={`${cardid} (${firstname} ${lastname})`}
                              />
                            )}
                            placeholder={'Enter card number'}
            />
          </Grid.Column>
        </Grid.Row>
        {customer &&
        <>
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
                               alt={'User photo'}
                               size={'tiny'}
                               style={{ margin: 0 }}
                        />
                      </Grid.Column>
                      <Grid.Column width={12}>
                        <Card.Header>{`${customer.firstname} ${customer.lastname}`}</Card.Header>
                        <Card.Meta>{customer.campus}</Card.Meta>
                        <Card.Description>
                          address/ssn/email/phone here ? maybe not necessary
                        </Card.Description>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Card.Description>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          Card number: {customer.cardid}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Description>
                </Card.Content>
                <Card.Content className="find-action" textAlign={'center'}>
                  <Button basic={action !== 'edit'}
                          color={'orange'}
                          content={'Edit'}
                          onClick={() => setAction('edit')}
                  />
                  <Button basic={action !== 'checkout'}
                          color={'yellow'}
                          content={'Check out'}
                          onClick={() => setAction('checkout')}
                  />
                  <Button basic={action !== 'checkin'}
                          color={'purple'}
                          content={'Check in'}
                          onClick={() => setAction('checkin')}
                  />
                  <ControlledPopup trigger={<Button basic color={'red'} content={'Extend'}/>}
                                   content={closePopup =>
                                     <Button color="red" content="Confirm" size={'tiny'} onClick={() => {
                                       extendCardValidity({ cardId: customer.cardid })
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
              {action === 'checkout' ? (
                <Checkout cardId={customer.cardid} />
              ) : action === 'checkin' ? (
                <CheckIn fetchActiveRentals={() => fetchActiveRentals({ cardId: customer.cardid })}
                         closeLoan={closeLoan}
                />
              ) : action === 'edit' && (
                <EditCustomerForm editCustomer={updateCustomer}
                                  setCustomer={setCustomer}
                                  defaultValues={customer}
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

FindCustomer.propTypes = {
  customer: PropTypes.object,
  setCustomer: PropTypes.func.isRequired,
  findCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  extendCardValidity: PropTypes.func.isRequired,
  fetchActiveRentals: PropTypes.func.isRequired,
}

export default FindCustomer
