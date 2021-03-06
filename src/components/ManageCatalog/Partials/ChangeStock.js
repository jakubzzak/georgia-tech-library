import PropTypes from 'prop-types'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import React from 'react'
import { InputHooks } from '../../utils/inputs'


const ChangeStock = ({ isbn, changeStock, defaultValues }) => {

  const useFormMethods = useForm({ defaultValues, shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState, setValue, getValues } = useFormMethods
  const { isSubmitting, isValid } = formState

  const onSubmit = (data) => {
    changeStock({ isbn, ...data })
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <FormProvider {...useFormMethods}>
            <Form form={'bookStockForm'} onSubmit={handleSubmit(onSubmit)}>
              <Segment>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <InputHooks name="total_copies"
                                  type={'number'}
                                  rules={{ required: true }}
                                  label={'Total copies'}
                                  placeholder={'Total copies'}
                                  onChange={(e, { value }) => {
                                    if (parseInt(value) < 0) {
                                      setValue('total_copies', 0)
                                    }
                                    if (parseInt(getValues('total_copies')) < parseInt(getValues('available_copies'))) {
                                      setValue('total_copies', getValues('available_copies'))
                                    }
                                  }}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <InputHooks name="available_copies"
                                  type={'number'}
                                  rules={{ required: true }}
                                  label={'Currently available copies'}
                                  placeholder={'Currently available copies'}
                                  onChange={(e, { value }) => {
                                    if (parseInt(value) < 0) {
                                      setValue('available_copies', 0)
                                    } else if (parseInt(value) > parseInt(getValues('total_copies'))) {
                                      setValue('available_copies', getValues('total_copies'))
                                    }
                                  }}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Button color={'green'} fluid style={{ marginTop: '1.7em' }}
                              disabled={isSubmitting || !isValid}
                              content={'Update stock'}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Form>
          </FormProvider>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

ChangeStock.propTypes = {
  isbn: PropTypes.string.isRequired,
  changeStock: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
}

export default ChangeStock
