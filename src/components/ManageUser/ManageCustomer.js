import Layout from '../Layout/Layout'
import { Button, Grid } from 'semantic-ui-react'
import { useState } from 'react'
import CreateCustomerForm from './Partials/CustomerForm/CreateCustomerForm'
import FindCustomer from './FindCustomer'
import useCustomer from './useCustomer'
import useLoan from '../ManageCatalog/useLoan'


const ManageCustomer = () => {
  const { customer, find, get, create, update, enable, disable, extendCard } = useCustomer()
  const { fetchActiveRentals } = useLoan()
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
                          findCustomer={find}
                          getCustomer={get}
                          updateCustomer={update}
                          extendCardValidity={extendCard}
                          fetchActiveRentals={fetchActiveRentals}
                          disableCustomer={disable}
                          enableCustomer={enable}
            />
          ) : (
            <CreateCustomerForm createCustomer={create}
                                switchCustomerView={() => setActiveTab('find')}
            />
          )}
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default ManageCustomer
