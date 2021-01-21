import React, { useState } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
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
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <FormProvider {...useFormMethods}>
            <Form onSubmit={handleSubmit(onSubmit)} loading={isSubmitting}>
              <Grid stackable>
                <Grid.Row textAlign={'left'}>
                  <Grid.Column width={8}>
                    <InputHooks name={'title'} placeholder={'Title'} label={'Title'}/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign={'left'}>
                  <Grid.Column>
                    <InputHooks name={'description'}
                                placeholder={'Description'}
                                label={'Description'}/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <DropzoneComponent config={componentConfig}
                                       eventHandlers={eventHandlers}
                                       djsConfig={djsConfig}/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign={'right'}>
                  <Grid.Column>
                    <Button primary type='submit'
                            disabled={isSubmitting || uploadedFileId === null || !isValid}
                            content={'Submit'} labelPosition='left' icon='upload'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </FormProvider>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

UploadFile.propTypes = {
  token: PropTypes.string.isRequired,
}


export default UploadFile
