import { useState } from 'react'
import Layout from '../Layout/Layout'
import { Button, Grid } from 'semantic-ui-react'
import useBook from './useBook'
import FindBook from './FindBook'
import CreateBookForm from './Partials/BookForm/CreateBookForm'


const ManageCatalog = () => {
  const { book, setBook, find, get, create, update, stock, remove } = useBook()
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
            <FindBook book={book}
                      setBook={setBook}
                      findBook={find}
                      getBook={get}
                      updateBook={update}
                      changeStock={stock}
                      removeBook={remove}
            />
          ) : (
            <CreateBookForm createBook={create} setBook={setBook}/>
          )}
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default ManageCatalog
