import React from 'react'
import './BookCatalog.css'
import Layout from '../Layout/Layout'
import SearchBar from './SearchBar/SearchBar'
import { Card, Divider, Grid } from 'semantic-ui-react'
import useSearch from './useSearch'
import { getRandomColor } from '../utils/colors'


const BookCatalog = ({}) => {
  const { loading, phrase, setPhrase, results: items } = useSearch({})

  return (
    <Layout loading={loading} useWrapper>
      <Grid textAlign={'center'}>
        <Grid.Row>
          <div className={'wrapper'}>
            <SearchBar setPhrase={setPhrase}/>
          </div>
        </Grid.Row>
        <React.Fragment>
          {items.length > 0 &&
            <Grid.Row>
              <Divider/>
              <span className="note">Showing {items.length} results</span>
            </Grid.Row>
          }
          {items.map((item, index) => (
            <Card key={index} fluid color={getRandomColor()}>
              <Card.Content>
                <Card.Header>{item.title}</Card.Header>
                <Card.Meta>{item.author}</Card.Meta>
                <Card.Description>{item.description}</Card.Description>
              </Card.Content>
            </Card>
          ))}
          {items.length === 0 &&
            <Grid.Row>
              <span style={{ marginTop: '2em' }}>Search for whatever you wish from more than <strong>100 000</strong> titles</span>
            </Grid.Row>
          }
        </React.Fragment>
      </Grid>
    </Layout>
  )
}

export default BookCatalog
