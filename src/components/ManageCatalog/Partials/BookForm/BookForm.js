import { Button, Divider, Form, Grid, Header } from 'semantic-ui-react'
import { InputHooks, TextAreaHooks } from '../../../utils/inputs'
import { useForm, FormProvider } from 'react-hook-form'
import PropTypes from 'prop-types'
import { email } from '../../../utils/validations'


const BookForm = ({ onSubmit, defaultValues }) => {
  const useFormMethods = useForm({ defaultValues, shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState } = useFormMethods
  const { isSubmitting, isValid } = formState

  return (
    <FormProvider {...useFormMethods}>
      <Form form={'bookForm'} onSubmit={handleSubmit(onSubmit)}>
        <Grid stackable textAlign={'left'}>
          <Grid.Row>
            <Grid.Column>
              <Divider horizontal>
                <Header as="h3">
                  About
                </Header>
              </Divider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="isbn"
                          type="text"
                          label="Isbn"
                          icon={'barcode'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="title"
                          type="text"
                          label="Title"
                          icon={'header'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="author"
                          type="text"
                          label="Author"
                          icon={'user'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="area"
                          type="text"
                          label="Subject area"
                          icon={'university'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              {/* TODO: dropdown of book types */}
              <InputHooks name="type"
                          type="text"
                          label="Type"
                          icon={'gift'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="year"
                          type="number"
                          label="Year"
                          icon={'calendar'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TextAreaHooks name="description"
                             type="text"
                             label="Description"
                             rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Divider horizontal>
                <Header as="h3">
                  Copies
                </Header>
              </Divider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="totalCopies"
                          type="number"
                          label="Total copies"
                          icon={'hashtag'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="availableCopies"
                          type="number"
                          label="Available copies"
                          icon={'hashtag'}
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

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default BookForm
