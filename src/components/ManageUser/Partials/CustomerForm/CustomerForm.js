import { Button, Divider, Form, Grid, Header } from 'semantic-ui-react'
import { InputHooks } from '../../../utils/inputs'
import { useForm, FormProvider } from 'react-hook-form'
import PropTypes from 'prop-types'
import { email } from '../../../utils/validations'


const CustomerForm = ({ onSubmit, defaultValues }) => {
  const useFormMethods = useForm({ defaultValues, shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState } = useFormMethods
  const { isSubmitting, isValid } = formState

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
              <InputHooks name="firstName"
                          type="text"
                          label="First name"
                          icon={'user'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="lastName"
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
              {/* TODO: dropdown of campuses */}
              <InputHooks name="campus"
                          type="text"
                          label="Campus"
                          icon={'building'}
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
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="street"
                          type="text"
                          label="Street"
                          icon={'home'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="houseNumber"
                          type="text"
                          label="Number"
                          icon={'home'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="city"
                          type="text"
                          label="City"
                          icon={'home'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              {/* TODO: dropdown of countries */}
              <InputHooks name="country"
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
              <InputHooks name="email"
                          type="text"
                          label="Email"
                          icon={'at'}
                          rules={{ required: true, validate: { email } }}
                // style={{ width: '250px' }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="phone"
                          type="number"
                          label="Phone number"
                          icon={'phone'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button color={'green'} disabled={isSubmitting || !isValid} content={'Submit'} floated={'right'}/>
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
