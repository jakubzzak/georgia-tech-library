import Layout from '../Layout/Layout'
import { Button, Grid } from 'semantic-ui-react'
import { useState } from 'react'
import CreateCustomerForm from './CreateCustomerForm'
import FindCustomer from './FindCustomer'
import useCustomer from './useCustomer'


const ManageUser = () => {
  const { customer, setCustomer, find, create, update, extendCard } = useCustomer()
  const [activeTab, setActiveTab] = useState('find')

  return (
    <Layout useWrapper>
      <Grid centered>
        <Grid.Row>
          <Button.Group>
            <Button content={'Find'}
                    disabled={activeTab === 'find'}
                    color={'blue'}
                    style={{ width: '200px' }}
                    onClick={() => setActiveTab(activeTab === 'find' ? 'create' : 'find')}
            />
            <Button.Or text={'or'}/>
            <Button content={'Create'}
                    disabled={activeTab === 'create'}
                    color={'green'}
                    style={{ width: '200px' }}
                    onClick={() => setActiveTab(activeTab === 'find' ? 'create' : 'find')}
            />
          </Button.Group>
        </Grid.Row>
        <Grid.Row>
          {activeTab === 'find' ? (
            <FindCustomer customer={customer}
                          setCustomer={setCustomer}
                          findCustomer={find}
                          updateCustomer={update}
                          extendCardValidity={extendCard}
            />
          ) : (
            <CreateCustomerForm createCustomer={create}
                                setCustomer={setCustomer}
            />
          )}
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default ManageUser
