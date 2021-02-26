import React, { useState } from 'react'
import { Loader, Dimmer, Button, Form, Grid } from 'semantic-ui-react'
import { FormProvider, useForm } from 'react-hook-form'
import { InputHooks } from '../utils/inputs'
import DropzoneComponent from 'react-dropzone-component'
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'
import api from '../../api'
import PropTypes from 'prop-types'
import { oneWord } from '../utils/validations'
import useDebounce from '../useDebounce'


const UploadFile = ({ token }) => {

  const [uploadedFileId, setUploadedFileId] = useState(null)

  const isUniqueTitle = async (title) => {
    const response = await api.fileExistsByUserAndTitle(title)
    return response.ok
  }

  const { trigger, isValidOk } = useDebounce({ action: isUniqueTitle, delay: 300 });

  const djsConfig = {
    dictDefaultMessage: 'Add file',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  const componentConfig = {
    postUrl: '/api/file/upload',
  }

  let dropzone = null

  const init = dropzoneInitObj => {
    dropzone = dropzoneInitObj
  }
  const success = (item, response) => {
    setUploadedFileId(response[0].id)
  }

  const eventHandlers = {
    init,
    success,
  }

  const useFormMethods = useForm({ shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState, reset } = useFormMethods
  const { isSubmitting, isValid } = formState

  const onSubmit = async (data) => {
    const response = await api.uploadFileTitle({ title: data.title, fileId: uploadedFileId })
    if (response.ok) {
      console.log('successful', response.data)
      reset()
      // TODO: success message
    } else {
      // TODO: fail message
    }
  }

  return (
    <div style={{ padding: '50px' }}>
      <FormProvider {...useFormMethods}>
        <Dimmer active={isSubmitting} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <Form onSubmit={handleSubmit(onSubmit)} loading={isSubmitting}>
          <Grid stackable>
            <Grid.Row textAlign={'left'}>
              <Grid.Column>
                <InputHooks name={'title'} placeholder={'Title'} label={'Title'}
                            rules={{ required: true, minLength: 8, validate: { isOneWord: oneWord, isUnique: isUniqueTitle } }}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign={'right'}>
              <Grid.Column>
                <Button color={'orange'} type='submit'
                        disabled={isSubmitting || !isValid || uploadedFileId === null}
                        content={'Submit'} labelPosition='left' icon='upload'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </FormProvider>
    </div>
  )
}

UploadFile.propTypes = {
  token: PropTypes.string.isRequired,
}


export default UploadFile
