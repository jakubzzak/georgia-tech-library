import React, { useState } from 'react'
import { Loader, Dimmer, Button, Form, Grid } from 'semantic-ui-react'
import { FormProvider, useForm } from 'react-hook-form'
import { InputHooks } from '../utils/inputs'
import DropzoneComponent from 'react-dropzone-component'
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'
import api from '../../api'
import PropTypes from 'prop-types'

const UploadFile = ({ token }) => {

  const [uploadedFileId, setUploadedFileId] = useState(null)

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

  const useFormMethods = useForm()
  const { handleSubmit, formState } = useFormMethods
  const { isSubmitting, isValid } = formState

  const onSubmit = async (data) => {
    const response = await api.uploadFile({ ...data, id: uploadedFileId })
    if (response.ok) {

    } else {

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
                <InputHooks name={'title'} placeholder={'Title'} label={'Title'} rules={{ required: true }}/>
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
                        disabled={isSubmitting || !isValid} // || uploadedFileId === null -> add back when receiving id from BE
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
