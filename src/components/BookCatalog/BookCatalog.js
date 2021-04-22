import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import SearchBar from './SearchBar/SearchBar'
import { Card, Divider } from 'semantic-ui-react'
import useSearch from './useSearch'


const BookCatalog = ({}) => {
  const { loading, results: items } = useSearch({})

  const colors = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"]

  return (
    <Layout loading={loading}>
      <div className={'wrapper'}>
        <SearchBar/>
        <span style={{ marginTop: '2em' }}>Search for whatever you  need and choose from #results</span>
      </div>
      <Divider/>
      <React.Fragment>
        {items.map((item, index) => (
          <Card key={index} fluid color={`${colors[Math.floor(Math.random() * colors.length)]}`}>
            <Card.Content>
              <Card.Header>{item.title}</Card.Header>
              <Card.Meta>{item.author}</Card.Meta>
              <Card.Description>{item.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </React.Fragment>
    </Layout>
  )
}

export default BookCatalog
