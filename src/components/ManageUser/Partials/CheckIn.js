import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, List, Segment } from 'semantic-ui-react'
import ControlledPopup from '../../utils/ControlledPopup'
import Avatar from 'react-avatar'
import { getRandomColor } from '../../utils/colors'
import Layout from '../../Layout/Layout'


const CheckIn = ({ fetchActiveRentals, returnBook }) => {
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetchActiveRentals()
      .then(results => setItems(results))
  }, [fetchActiveRentals])

  return (
    <Segment>
      <Layout loading={!items} useWrapper>
        <List divided verticalAlign={'middle'}>
          {items?.length > 0 && items.map((item, index) => (
            <List.Item key={index}>
              <List.Content style={{ margin: 0, padding: 0 }} floated="right">
                <ControlledPopup
                  trigger={<Button color={'red'} icon={'remove'}/>}
                  content={closePopup =>
                    <Button color="red" content="Confirm" size={'tiny'} onClick={() => {
                      returnBook({ loanId: item.id })
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
              <List.Content style={{ margin: 0, padding: 0 }}>
                <Avatar round={'25px'}
                        size={32}
                        name={item.title}
                        style={{ marginRight: '2em' }}
                        color={getRandomColor()}
                />
                {item.title}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Layout>
    </Segment>
  )
}

CheckIn.propTypes = {
  fetchActiveRentals: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
}

export default CheckIn
