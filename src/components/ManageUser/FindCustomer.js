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


const FindCustomer = ({ customer, setCustomer, findCustomer, getCustomer, updateCustomer, extendCardValidity, fetchActiveRentals }) => {
  const [action, setAction] = useState(null)
  const { close: closeLoan } = useLoan()

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
                <CustomerCardMainContent card_id={customer.card.id}
                                         email={customer.email}
                                         firstname={customer.first_name}
                                         lastname={customer.last_name}
                                         campus={customer.campus}
                />
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
                                       extendCardValidity({ card_id: customer.card.id })
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
                <Checkout cardId={customer.card.id} />
              ) : action === 'checkin' ? (
                <CheckIn fetchActiveRentals={() => fetchActiveRentals({ ssn: customer.ssn })}
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
        </React.Fragment>
        }
      </Grid>
    </Segment>
  )
}

FindCustomer.propTypes = {
  customer: PropTypes.object,
  setCustomer: PropTypes.func.isRequired,
  findCustomer: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  extendCardValidity: PropTypes.func.isRequired,
  fetchActiveRentals: PropTypes.func.isRequired,
}

export default FindCustomer
