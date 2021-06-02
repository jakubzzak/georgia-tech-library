import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, List, Segment } from 'semantic-ui-react'
import ControlledPopup from '../../utils/ControlledPopup'
import Avatar from 'react-avatar'
import { getRandomColor } from '../../utils/colors'
import Layout from '../../Layout/Layout'
import moment from 'moment'


const CheckIn = ({ loans: items, fetchActiveRentals, closeLoan }) => {
  // const [items, setItems] = useState(null)

  useEffect(() => {
    fetchActiveRentals()
  }, [])

  return (
    <Segment>
      <Layout loading={!items} useWrapper={Array.isArray(items) && items.length === 0}>
        {items?.length > 0 ? (
          <List divided verticalAlign={'middle'}>
            {items.map((item, index) => (
              <List.Item key={index}>
                <List.Content style={{ margin: 0, padding: 0 }} floated="right">
                  {`Loaned at: ${moment(item.loaned_at).format('DD MMM YYYY')} `}
                  <ControlledPopup
                    trigger={<Button color={'blue'} content={'Close'}/>}
                    content={closePopup =>
                      <Button color="blue" content="Confirm" size={'tiny'} onClick={() => {
                        closeLoan(item)
                          .finally(() => {
                            closePopup()
                          })
                      }}/>
                    }
                    timeoutLength={2500}
                    on="click"
                    position="top center"
                  />
                </List.Content>
                <List.Content style={{ margin: 0, padding: 0 }} floated={'left'}>
                  <Avatar round={'25px'}
                          size={32}
                          name={item.title}
                          style={{ marginRight: '2em' }}
                          color={getRandomColor()}
                  />
                  {`${item.book?.title} (${item.book?.isbn})`}
                </List.Content>
              </List.Item>
            ))}
          </List>
        ) : (
         'There are no active loans for selected user.'
        )}
      </Layout>
    </Segment>
  )
}

CheckIn.propTypes = {
  fetchActiveRentals: PropTypes.func.isRequired,
  loans: PropTypes.array,
  closeLoan: PropTypes.func.isRequired,
}

export default CheckIn
