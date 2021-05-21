import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { Button, Dimmer, Grid, Loader } from 'semantic-ui-react'
import useBook from './useBook'
import FindBook from './FindBook'
import CreateBookForm from './Partials/BookForm/CreateBookForm'


const ManageCatalog = () => {
  const { book, loading, find, get, create, update, stock, disable, enable } = useBook()
  const [activeTab, setActiveTab] = useState('find')

  return (
    <Layout useWrapper>
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
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
              <FindBook book={book}
                        findBook={find}
                        getBook={get}
                        updateBook={update}
                        disableBook={disable}
                        enableBook={enable}
                        changeStock={stock}
              />
            ) : (
              <CreateBookForm createBook={create}
                              switchTab={() => setActiveTab('find')}
              />
            )}
          </Grid.Row>
        </Grid>
      </Dimmer.Dimmable>
    </Layout>
  )
}

export default ManageCatalog
