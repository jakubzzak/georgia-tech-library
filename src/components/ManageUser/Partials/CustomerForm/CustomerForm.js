import { Button, Divider, Form, Grid, Header } from 'semantic-ui-react'
import { DropdownHooks, InputHooks } from '../../../utils/inputs'
import { useForm, FormProvider, useFieldArray, useWatch } from 'react-hook-form'
import PropTypes from 'prop-types'
import { email } from '../../../utils/validations'
import { useEffect, useState } from 'react'
import securedAPI from '../../../../api'
import toast from 'react-hot-toast'


const CustomerForm = ({ onSubmit, defaultValues }) => {
  const useFormMethods = useForm({ defaultValues: { ...defaultValues }, shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState, control } = useFormMethods
  const { isSubmitting, isValid } = formState
  const [campuses, setCampuses] = useState([])

  const { fields, append, remove } = useFieldArray({ control, name: 'phone_numbers' })

  const phoneTypes = [
    { key: 'MOBILE', value: 'MOBILE', text: 'Mobile' },
    { key: 'HOME', value: 'HOME', text: 'Home' },
    { key: 'OFFICE', value: 'OFFICE', text: 'Office' },
  ]

  useEffect(() => {
    securedAPI.fetchCampuses()
      .then(response => {
        if (response.ok && response.data.ok) {
          setCampuses(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to load campuses`)
        }
      })
  }, [])

  return (
    <FormProvider {...useFormMethods}>
      <Form form={'customerForm'} onSubmit={handleSubmit(onSubmit)}>
        <Grid stackable textAlign={'left'}>
          <Grid.Row>
            <Grid.Column>
              <Divider horizontal>
                <Header as="h3">
                  Personal
                </Header>
              </Divider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="first_name"
                          type="text"
                          label="First name"
                          icon={'user'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="last_name"
                          type="text"
                          label="Last name"
                          icon={'user'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="ssn"
                          type="text"
                          label="Ssn"
                          icon={'user'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <DropdownHooks name="campus_id"
                             options={campuses?.map(campus => ({
                               key: campus.id,
                               value: campus.id,
                               text: `${campus.address.street} ${campus.address.number ?? ''},
                                ${campus.address.post_code} ${campus.address.city} (${campus.address.country})`,
                             }))}
                             type="text"
                             label="Campus"
                             rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Divider horizontal>
                <Header as="h3">
                  Address
                </Header>
              </Divider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <InputHooks name="address.street"
                          type="text"
                          label="Street"
                          icon={'home'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="address.number"
                          type="text"
                          label="Number"
                          icon={'home'}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="address.city"
                          type="text"
                          label="City"
                          icon={'home'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="address.post_code"
                          type="text"
                          label="Post code"
                          icon={'home'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              {/* TODO: dropdown of countries */}
              <InputHooks name="address.country"
                          type="text"
                          label="Country"
                          icon={'home'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Divider horizontal>
                <Header as="h3">
                  Contact
                </Header>
              </Divider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Grid>
                {fields.map((phoneNumber, index) => (
                  <Grid.Row key={phoneNumber.id}>
                    <Grid.Column>
                      <Form.Group>
                        <InputHooks name={`phone_numbers[${index}].country_code`}
                                    defaultValue={phoneNumber.country_code}
                                    type="number"
                                    label="Country code"
                                    icon={'plus'}
                                    iconPosition={'left'}
                                    rules={{ required: true }}
                        />
                        <InputHooks name={`phone_numbers[${index}].number`}
                                    defaultValue={phoneNumber.number}
                                    type="text"
                                    label="Phone number"
                                    icon={'phone'}
                                    rules={{ required: true }}
                        />
                        <DropdownHooks name={`phone_numbers[${index}].type`}
                                       defaultValue={phoneNumber.type}
                                       label="Type"
                                       options={phoneTypes}
                                       rules={{ required: true }}
                        />
                        {fields.length > 1 &&
                        <Button icon={'cancel'}
                                type={'button'}
                                color={'red'}
                                style={{ height: '38px', marginTop: '1.65em' }}
                                onClick={() => remove(index)}
                        />}
                      </Form.Group>
                    </Grid.Column>
                  </Grid.Row>
                ))}
                <Grid.Row>
                  <Grid.Column>
                    <Button icon={'plus'}
                            type={'button'}
                            content={'Add phone number'}
                            color={'green'}
                            onClick={() => {
                              append({ country_code: 45, number: '', type: phoneTypes[0].value })
                            }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <InputHooks name="email"
                                type="text"
                                label="Email"
                                icon={'at'}
                                rules={{ required: true, validate: { email } }}
                      // style={{ width: '250px' }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button color={'green'} disabled={isSubmitting || !isValid} content={'Submit'} floated={'right'}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </FormProvider>
  )
}

CustomerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default CustomerForm
