import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Grid, Label, Segment } from 'semantic-ui-react'
import './FindCustomer.css'
import RealtimeSearch from '../utils/RealtimeSearch'
import ControlledPopup from '../utils/ControlledPopup'
import EditCustomerForm from './Partials/CustomerForm/EditCustomerForm'
import CheckIn from './Partials/CheckIn'
import Checkout from './Partials/Checkout'
import useLoan from '../ManageCatalog/useLoan'
import CustomerCardMainContent from './Partials/CustomerCardMainContent'
import moment from 'moment'


const FindCustomer = ({
                        customer,
                        findCustomer,
                        getCustomer,
                        updateCustomer,
                        enableCustomer,
                        disableCustomer,
                        extendCardValidity,
                      }) => {
  const [action, setAction] = useState(null)
  const { loans, fetchActiveRentals, close: closeLoan, start: startLoan } = useLoan()

  return (
    <Segment color={'blue'} style={{ width: '100%' }}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <RealtimeSearch setChosenValue={getCustomer}
                            apiFetch={findCustomer}
                            customResultRenderer={({ card_id, full_name, city }) => (
                              <Label key={card_id}
                                     style={{ width: '285px' }}
                                     as="span"
                                     content={<span>{card_id} <br/> ({full_name}, {city})</span>}
                              />
                            )}
                            placeholder={'Enter card number'}
            />
          </Grid.Column>
        </Grid.Row>
        {customer &&
        <React.Fragment>
          <Grid.Row>
            <Grid.Column textAlign={'left'}>
              <Card style={{ margin: 'auto', width: '550px' }}>
                <CustomerCardMainContent card_id={customer.card?.id}
                                         expiration_date={customer.card?.expiration_date}
                                         email={customer.email}
                                         firstname={customer.first_name}
                                         lastname={customer.last_name}
                                         campus={customer.campus}
                />
                <Card.Content className="find-action" textAlign={'center'} extra>
                  {customer.is_active ? (
                    <>
                      <Button basic={action !== 'edit'}
                              className={'card-button'}
                              color={'orange'}
                              content={'Edit'}
                              onClick={() => setAction(action === 'edit' ? null : 'edit')}
                      />
                      <Button basic={action !== 'checkout'}
                              disabled={moment(customer.card?.expiration_date).isBefore(moment())}
                              className={'card-button'}
                              color={'yellow'}
                              content={'Lend'}
                              onClick={() => setAction(action === 'checkout' ? null : 'checkout')}
                      />
                      <Button basic={action !== 'checkin'}
                              className={'card-button'}
                              color={'purple'}
                              content={'Return'}
                              onClick={() => setAction(action === 'checkin' ? null : 'checkin')}
                      />
                      <ControlledPopup trigger={<Button basic
                                                        color={'blue'}
                                                        className={'card-button'}
                                                        content={'Extend'}
                                                        disabled={moment(customer.card.expiration_date).isAfter(moment().add(-30, 'day'))}/>}
                                       content={closePopup =>
                                         <Button color="red" content="Confirm" size={'tiny'} onClick={() => {
                                           extendCardValidity({ id: customer.card.id })
                                             .finally(() => {
                                               closePopup()
                                             })
                                         }}/>
                                       }
                                       timeoutLength={2500}
                                       on="click"
                                       position="top center"
                      />
                      <Button basic
                              className={'card-button'}
                              color={'red'}
                              content={'Disable'}
                              onClick={() => {
                                disableCustomer(customer)
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
                            className={'card-button'}
                            color={'green'}
                            content={'Enable'}
                            onClick={() => enableCustomer(customer)}
                    />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {action === 'checkout' ? (
                <Checkout ssn={customer.ssn}
                          startLoan={startLoan}
                />
              ) : action === 'checkin' ? (
                <CheckIn fetchActiveRentals={() => fetchActiveRentals(customer)}
                         loans={loans}
                         closeLoan={closeLoan}
                />
              ) : action === 'edit' && (
                <EditCustomerForm editCustomer={updateCustomer}
                                  defaultValues={customer}
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

FindCustomer.propTypes = {
  customer: PropTypes.object,
  findCustomer: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  enableCustomer: PropTypes.func.isRequired,
  disableCustomer: PropTypes.func.isRequired,
  extendCardValidity: PropTypes.func.isRequired,
}

export default FindCustomer
