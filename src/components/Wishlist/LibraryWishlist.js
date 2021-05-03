import Layout from '../Layout/Layout'
import PropTypes from 'prop-types'
import { Button, Divider, Form, Grid, List, Segment } from 'semantic-ui-react'
import Avatar from 'react-avatar'
import React, { useState } from 'react'
import ControlledPopup from '../utils/ControlledPopup'
import { getRandomColor } from '../utils/colors'
import moment from 'moment'
import securedAPI from '../../api'
import toast from 'react-hot-toast'
import { FormProvider, useForm } from 'react-hook-form'
import { InputHooks } from '../utils/inputs'


const LibraryWishlist = ({ loading, items, request, remove }) => {
  const [showForm, setShowForm] = useState(false)

  const onSubmit = (data) => {
    securedAPI.addToLibraryWishlist(data)
      .then(response => {
        if (response.ok) {
          setShowForm(false)
        } else {
          toast.error(`[${response.status}] Failed to add item to library wishlist`)
        }
      }).catch(error => {
      toast.error(`Failed when adding item to library wishlist => ${error}`)
    })
  }

  const useFormMethods = useForm({ shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState, setValue } = useFormMethods
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
        <>
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
                          <InputHooks name="copies"
                                      type={'number'}
                                      label={'Copies'}
                                      rules={{ required: true }}
                                      onChange={(e, { value }) => {
                                        if (value < 1) {
                                          setValue('copies', 1)
                                        }
                                      }}
                                      defaultValue={1}
                                      style={{ maxWidth: '100px' }}
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
        </>
        }
      </Grid>
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

LibraryWishlist.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array,
  request: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default LibraryWishlist
