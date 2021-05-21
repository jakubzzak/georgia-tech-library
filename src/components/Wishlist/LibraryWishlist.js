import Layout from '../Layout/Layout'
import { Button, Card, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import React, { useState } from 'react'
import ControlledPopup from '../utils/ControlledPopup'
import { FormProvider, useForm } from 'react-hook-form'
import { InputHooks, TextAreaHooks } from '../utils/inputs'
import useLibraryWishlist from './useLibraryWishlist'
import './LibraryWishlist.css'


const LibraryWishlist = () => {
  const [showForm, setShowForm] = useState(false)
  const { data: items, loading, add, remove } = useLibraryWishlist()

  const onSubmit = (data) => {
    add(data)
      .then(success => {
        if (success) {
          setShowForm(false)
        }
      })
  }

  const useFormMethods = useForm({ shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState } = useFormMethods
  const { isSubmitting, isValid } = formState

  return (
    <Layout loading={loading} useWrapper={items.length === 0}>
      <Grid style={{ width: '100%' }}>
        <Grid.Row>
          <Grid.Column>
            <Button color={'orange'}
                    icon={showForm ? 'minus' : 'plus'}
                    onClick={() => setShowForm(!showForm)}
                    floated={'right'}
            />
          </Grid.Column>
        </Grid.Row>
        {showForm &&
        <React.Fragment>
          <Grid.Row textAlign={'center'}>
            <Grid.Column>
              <FormProvider {...useFormMethods}>
                <Form form={'bookForm'} onSubmit={handleSubmit(onSubmit)}>
                  <Segment color={'green'} style={{ maxWidth: '350px', margin: 'auto' }}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          <InputHooks name="title"
                                      type={'text'}
                                      rules={{ required: true }}
                                      label={'Title'}
                                      placeholder={'Title'}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <TextAreaHooks name="description"
                                         defaultValue={''}
                                         type={'text'}
                                         label={'Description'}
                                         placeholder={'Description'}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Button color={'green'}
                                  disabled={isSubmitting || !isValid}
                                  content={'Add'}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Form>
              </FormProvider>
            </Grid.Column>
          </Grid.Row>
          <Divider/>
        </React.Fragment>
        }
      </Grid>
      {(!Array.isArray(items) || items.length === 0) ? (
        <span className="note">Your wishlist is empty. Go ahead and add some items!</span>
      ) : (
        <Card.Group centered stackable>
          {items?.map(item => (
            <Card key={item.id} className={'library-wishlist-card'} raised color={item.acquired ? 'green':'red'}>
              <Card.Content>
                <Card.Header>{item.title}</Card.Header>
                <Divider/>
                <Card.Description className={'overlap'} style={{ maxHeight: '115px' }}>
                  {item.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <ControlledPopup
                  trigger={<Button color={'red'} icon={'remove'} basic/>}
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
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Layout>
  )
}

export default LibraryWishlist
