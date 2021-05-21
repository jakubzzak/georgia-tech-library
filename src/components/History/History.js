import React, { useEffect } from 'react'
import 'react-table-v6/react-table.css'
import Layout from '../Layout/Layout'
import useLoan from '../ManageCatalog/useLoan'
import { Label, List } from 'semantic-ui-react'
import Avatar from 'react-avatar'
import { getRandomColor } from '../utils/colors'
import moment from 'moment'


const History = () => {
  const { loans: items, loading, fetchHistory } = useLoan()

  useEffect(() => {
    if (!items || items.length === 0) {
      fetchHistory()
    }
  }, [])

  return (
    <Layout loading={loading} useWrapper={!items || items?.length === 0}>
      {(!Array.isArray(items) || items.length === 0) ? (
        <span className="note">Your history is empty.</span>
      ) : (
        <List divided verticalAlign={'middle'}>
          {items?.map((item, index) => (
            <List.Item key={index}>
              <List.Content style={{ margin: 0, padding: 0 }} floated={'right'}>
                Loaned at: <Label color={'grey'} style={{ width: '100px',marginRight: '5em' }}>{moment(item.loaned_at).utc().format('DD MMM YYYY')}</Label>
                Returned at: <Label color={item.returned_at ? 'grey':'red'} style={{ width: '100px', textAlign: 'center' }}>{item.returned_at ? moment(item.returned_at).utc().format('DD MMM YYYY') : 'NEVER'}</Label>
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

History.propTypes = {}


export default History
