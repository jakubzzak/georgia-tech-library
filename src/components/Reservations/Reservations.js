import Layout from '../Layout/Layout'
import { Button, Label, List } from 'semantic-ui-react'
import moment from 'moment'
import ControlledPopup from '../utils/ControlledPopup'
import Avatar from 'react-avatar'
import { getRandomColor } from '../utils/colors'
import React from 'react'
import useLibraryReservations from '../Wishlist/useLibraryReservations'

const Reservations = () => {
  const { data: items, loading, markAsAccepted: accept } = useLibraryReservations()

  return (
    <Layout loading={loading} useWrapper={items.length === 0}>
      {(!Array.isArray(items) || items.length === 0) ? (
        <span className="note">There are no awaiting reservations, good job!</span>
      ) : (
        <List divided verticalAlign={'middle'}>
          {Array.isArray(items) && items.length > 0 && items.map((item, index) => (
            <List.Item key={index}>
              <List.Content style={{ margin: 0, padding: 0 }} floated="right">
                {item.picked_up ? (
                  <Label color={'green'} style={{ width: '100px', marginRight: '2em' }}>PICKED UP</Label>
                ) : (
                  <ControlledPopup
                    trigger={<Button color={'blue'} content={'Accept'} style={{ marginRight: '2em' }}/>}
                    content={closePopup =>
                      <Button color="blue" content="Confirm" size={'tiny'} onClick={() => {
                        accept(item)
                          .finally(() => {
                            closePopup()
                          })
                      }}/>
                    }
                    timeoutLength={2500}
                    on="click"
                    position="top center"
                  />
                )}
                Requested at:
                <Label color={moment(item.requested_at).diff(moment(), 'day') > 3 ? 'grey' : 'red'}
                       style={{ width: '100px', textAlign: 'center', marginRight: '2em' }}
                >
                  {moment(item.requested_at).utc().format('DD MMM YYYY')}
                </Label>
              </List.Content>
              <List.Content style={{ margin: 0, padding: 0 }}>
                <Avatar round={'25px'}
                        size={32}
                        name={item.book?.title}
                        style={{ marginRight: '2em' }}
                        color={getRandomColor()}
                />
                {item.book?.title}
              </List.Content>
            </List.Item>
          ))}
        </List>
      )}
    </Layout>

  )
}

export default Reservations
