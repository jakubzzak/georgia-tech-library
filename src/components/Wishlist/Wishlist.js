import Layout from '../Layout/Layout'
import useWishlist from './useWishlist'
import { Button, List } from 'semantic-ui-react'
import Avatar from 'react-avatar'
import React from 'react'
import ControlledPopup from '../utils/ControlledPopup'
import { getRandomColor } from '../utils/colors'


const Wishlist = ({}) => {
  const { wishlist: items, loading, request, remove } = useWishlist()

  return (
    <Layout loading={loading}>
      <div>
        <List divided verticalAlign={'middle'}>
          {items.map((item, index) => (
            <List.Item key={index}>
              <List.Content style={{ margin: 0, padding: 0 }} floated="right">
                <ControlledPopup
                  trigger={
                    <Button color={'blue'} content={'request'}/>
                  }
                  content={closePopup =>
                    <Button color="blue" content="Confirm" size={'tiny'} onClick={() => {
                      request({ id: item.id })
                        .finally(() => {
                          closePopup()
                        })
                    }}/>
                  }
                  timeoutLength={2500}
                  on="click"
                  position="top center"
                />
                <ControlledPopup
                  trigger={<Button color={'red'} icon={'remove'}/>}
                  content={closePopup =>
                    <Button color="red" content="Confirm" size={'tiny'} onClick={() => {
                      remove({ id: item.id })
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
      </div>
    </Layout>
  )
}

export default Wishlist
