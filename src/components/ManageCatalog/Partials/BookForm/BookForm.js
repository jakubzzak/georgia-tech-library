import { Button, Divider, Form, Grid, Header } from 'semantic-ui-react'
import { DropdownHooks, InputHooks, TextAreaHooks } from '../../../utils/inputs'
import { useForm, FormProvider } from 'react-hook-form'
import PropTypes from 'prop-types'
import { options as bookTypes } from './../../../BookCatalog/SearchBar/SearchBar'


const BookForm = ({ onSubmit, defaultValues, isEdit }) => {
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
                          placeholder={'Isbn'}
                          readOnly={isEdit}
                          type="text"
                          label="Isbn"
                          icon={'barcode'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="title"
                          placeholder={'Title'}
                          type="text"
                          label="Title"
                          icon={'header'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <InputHooks name="author"
                          placeholder={'Author'}
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
                          placeholder={'Subject area'}
                          type="text"
                          label="Subject area"
                          icon={'university'}
                          rules={{ required: true }}
              />
            </Grid.Column>
            <Grid.Column>
              <DropdownHooks name="resource_type"
                             label="Resource type"
                             defaultValue={bookTypes[0].value}
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
                             placeholder={'Description'}
                             type="text"
                             label="Description"
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
  isEdit: PropTypes.bool,
}

export default BookForm
