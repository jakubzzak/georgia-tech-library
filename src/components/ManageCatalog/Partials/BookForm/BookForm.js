import { Button, Divider, Form, Grid, Header } from 'semantic-ui-react'
import { DropdownHooks, InputHooks, TextAreaHooks } from '../../../utils/inputs'
import { useForm, FormProvider } from 'react-hook-form'
import PropTypes from 'prop-types'
import { options as bookTypes } from './../../../BookCatalog/SearchBar/SearchBar'


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
          <Grid.Row columns={3}>
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
            <Grid.Column>
              <InputHooks name="author"
                          type="text"
                          label="Author"
                          icon={'user'}
                          rules={{ required: true }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <InputHooks name="subject_area"
                          type="text"
                          label="Subject area"
                          icon={'university'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <DropdownHooks name="resource_type"
                             label="Resource type"
                             type="text"
                             options={bookTypes?.filter(type => type.isType).map(type => ({
                               key: type.key,
                               value: type.value,
                               text: type.one,
                             }))}
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
              <InputHooks name="total_copies"
                          type="number"
                          label="Total copies"
                          icon={'hashtag'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="available_copies"
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
