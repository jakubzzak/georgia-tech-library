import Layout from '../Layout/Layout'
import PropTypes from 'prop-types'
import { Button, List } from 'semantic-ui-react'
import Avatar from 'react-avatar'
import React from 'react'
import ControlledPopup from '../utils/ControlledPopup'
import { getRandomColor } from '../utils/colors'
import moment from 'moment'
import useWishlist from './useWishlist'


const Wishlist = ({ loading, items, request, remove }) => {
  const {
    loading: loadingWishlist,
    data: wishlistItems,
    request: requestWishlistItem,
    remove: removeWishlistItem,
    add: addWishlistItem,
    isInWishlist,
  } = useWishlist()

  return (
    <Layout loading={loading} useWrapper={items.length === 0}>
      {(!Array.isArray(items) || items.length === 0) ? (
        <span className="note">Your wishlist is empty. Go ahead and add some items!</span>
      ) : (
        <List divided verticalAlign={'middle'}>
          {Array.isArray(items) && items.length > 0 && items.map((item, index) => (
            <List.Item key={index}>
              <List.Content style={{ margin: 0, padding: 0 }} floated="right">
                {item.requestedAt ? (
                  <span className="note">Requested: {moment(item.requestedAt).utc().format('YYYY-MM-DD')}</span>
                ) : (
                  <ControlledPopup
                    trigger={
                      <Button color={'blue'} content={'request'}/>
                    }
                    content={closePopup =>
                      <Button color="blue" content="Confirm" size={'tiny'} onClick={() => {
                        request(item)
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
                <ControlledPopup
                  trigger={<Button color={'red'} icon={'remove'}/>}
                  content={closePopup =>
                    <Button color="red" content="Confirm" size={'tiny'} onClick={() => {
                      remove(item)
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
      )}
    </Layout>
  )
}

Wishlist.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array,
  request: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Wishlist
