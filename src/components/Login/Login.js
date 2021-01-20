import React, { useState } from 'react'
import './Login.css'
import api, { unsecuredAPI } from '../../api'
import PropTypes from 'prop-types'
import { Button, Form, Grid, Label } from 'semantic-ui-react'
import { InputHooks } from '../utils/inputs'
import { email } from '../utils/validations'
import { FormProvider, useForm } from 'react-hook-form'

const Login = ({ setToken }) => {

  const [errorMessage, setErrorMessage] = useState(null)

  const onSubmit = async (data) => {
    const logInResponse = await unsecuredAPI.checkLogin({ ...data })
    if (logInResponse.ok) {
      const apiResponse = await unsecuredAPI.createSession({ ...logInResponse.data })
      if (apiResponse.ok) {
        setToken(apiResponse.data)
      } else {
        setErrorMessage("Api session failed to create!")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      setErrorMessage("Wrong email or password!")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const useFormMethods = useForm({ shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState, control, setValue, getValues } = useFormMethods
  const { isSubmitting, isValid } = formState

  return (
    <div className="login-wrapper">
      <h1>personalApi</h1>
      <FormProvider {...useFormMethods}>
        <Form onSubmit={handleSubmit(onSubmit)} loading={isSubmitting}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <InputHooks name={'username'} width={16} rules={{ required: true, email }} label={'Email'}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <InputHooks name={'password'} width={16} rules={{ required: true }} label={'Password'}/>
              </Grid.Column>
            </Grid.Row>
            {errorMessage &&
            <Grid.Row textAlign={'center'} style={{ paddingBottom: 0 }}>
              <Grid.Column>
                <Label basic color='red' pointing='below'>
                  Wrong email or password
                </Label>
              </Grid.Column>
            </Grid.Row>
            }
            <Grid.Row textAlign={'center'}>
              <Grid.Column>
                <Button type={'submit'} content={'Submit'} color={'orange'} disabled={isSubmitting || !isValid}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </FormProvider>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default Login
