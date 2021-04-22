import React from 'react'
import PropTypes from 'prop-types'
import Input from 'semantic-ui-react/dist/es/elements/Input/Input'
import Form from 'semantic-ui-react/dist/es/collections/Form/Form'
import TextArea from 'semantic-ui-react/dist/es/addons/TextArea/TextArea'
import Checkbox from 'semantic-ui-react/dist/es/modules/Checkbox/Checkbox'
import Dropdown from 'semantic-ui-react/dist/es/modules/Dropdown/Dropdown'
import Select from 'semantic-ui-react/dist/es/addons/Select/Select'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './Forms.module.css'
import { messages } from './validations'
import { Controller, useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import { ErrorMessage } from '@hookform/error-message'
import { FormGroup, Radio } from 'semantic-ui-react'


export const renderInput = ({ meta: { touched, error }, label, inline, width, ...custom }) => (
  <Form.Field error={error && touched} width={width} inline={inline}>
    {label &&
    <label>{label}</label>
    }
    <Input {...custom} error={error && touched} autoComplete="off"/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

export const InputHooks = ({
                             name, label, inline, rules, width, onChange = () => {
  }, defaultValue, ...custom
                           }) => {

  const { control, errors } = useFormContext()

  const getError = () => get(errors, name)

  const defVal = defaultValue === null || defaultValue === undefined ? '' : defaultValue

  return (
    <Form.Field error={getError() !== undefined} width={width} inline={inline}>
      {label &&
      <label>{label}</label>
      }

      <Controller
        control={control}
        render={(props) => (
          <Input
            {...custom}
            autoComplete="off"
            value={props.value}
            onChange={(event) => {
              props.onChange(event)
              onChange(event, event.target)
              return event
            }}
            onBlur={() => props.onBlur()}
          />)}
        rules={rules}
        name={name}
        defaultValue={defVal}
      />
      <ErrorMessage errors={errors} name={name} render={() => <div
        className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}/>
    </Form.Field>
  )
}

renderInput.propTypes = {
  meta: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  width: PropTypes.number,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const renderRadio = ({ meta: { touched, error }, label, inline, width, ...custom }) => (
  <Form.Field error={error && touched} width={width} inline={inline}>
    {label &&
    <label>{label}</label>
    }
    <Input {...custom} error={error && touched} autoComplete="off"/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

export const RadioHooks = ({
                             name, label, items, inline, rules, onChange = () => {
  }, defaultValue, radioStyle, ...custom
                           }) => {

  const { control, errors, getValues } = useFormContext()

  const getError = () => get(errors, name)

  const defVal = defaultValue === null || defaultValue === undefined ? '' : defaultValue

  return (
    <Form.Field error={getError() !== undefined} inline={inline}>
      <Controller
        control={control}
        render={(props) => (
          <FormGroup style={{ margin: '.5em' }}>
            {items.map((item, index) => {
              return <Radio
                {...custom}
                key={index}
                label={item.label}
                name={item.name}
                value={item.value}
                checked={getValues(name) === item.value}
                onChange={(event, { value }) => {
                  props.onChange(value)
                  onChange(event, value)
                }}
                style={radioStyle}
                onBlur={() => props.onBlur()}
              />
            })
            }
          </FormGroup>
        )}
        rules={rules}
        name={name}
        defaultValue={defVal}
      />
      <ErrorMessage errors={errors} name={name} render={() => <div
        className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}/>
    </Form.Field>
  )
}

renderRadio.propTypes = {
  meta: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  width: PropTypes.number,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const TextAreaHooks = ({ name, label, defaultValue, ...custom }) => {

  const { control, errors } = useFormContext()

  const getError = () => get(errors, name)

  return (
    <Form.Field error={getError() !== undefined}>
      {label &&
      <label>{label}</label>
      }

      <Controller
        control={control}
        render={(props) => <TextArea {...custom} autoComplete="off" value={props.value} onChange={(event) => {
          props.onChange(event)
          return event
        }}/>}
        defaultValue={defaultValue || ''}
        name={name}
      />
      <ErrorMessage errors={errors} name={name} render={() => <div
        className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}/>
    </Form.Field>
  )
}

export const renderCheckbox = ({ meta: { touched, error }, label, input, readOnlyAttr, width }) => (
  <Form.Field error={touched && error} width={width}>
    <label>{label}</label>
    <Checkbox name={input.name} toggle readOnly={readOnlyAttr} checked={input.checked} onChange={() => input.onChange({
      target: { type: 'checkbox', checked: !input.checked }, stopPropagation: () => {
      }, preventDefault: () => {
      },
    })}/>
  </Form.Field>
)

export const CheckboxHooks = ({
                                label, name, readOnlyAttr, rules, width, defaultValue, onChange = () => {
  },
                              }) => {

  const { control, errors } = useFormContext()

  const getError = () => get(errors, name)

  return (
    <Form.Field error={getError() !== undefined} width={width}>
      <label>{label}</label>
      <Controller
        control={control}
        render={(props) => <Checkbox toggle readOnly={readOnlyAttr} autoComplete="off" checked={props.value}
                                     onChange={(event, data) => {
                                       props.onChange(data.checked)
                                       onChange(event, data)
                                       return event
                                     }}/>}
        defaultValue={defaultValue || false}
        name={name}
      />
      <ErrorMessage errors={errors} name={name} render=
        {() => <div
          className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}
      />
    </Form.Field>
  )
}

renderCheckbox.propTypes = {
  meta: PropTypes.object.isRequired,
  width: PropTypes.number,
  readOnlyAttr: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  input: PropTypes.object.isRequired,
}

export const renderDatePicker = ({
                                   meta: { touched, error },
                                   label,
                                   input,
                                   placeholder,
                                   minDate,
                                   maxDate,
                                   inline,
                                   ...rest
                                 }) => {
  const momentValue = () => {
    let mmtVal = moment(input.value)
    return mmtVal.isValid() ? mmtVal : null
  }

  const handleOnChange = (date) => {
    if (date) {
      input.onChange(date.format('YYYY-MM-DD'))
    } else {
      input.onChange(null)
    }
  }

  return (
    <Form.Field error={error && touched} inline={inline}>
      <label>{label}</label>
      <DatePicker className={styles.datePicker} name={input.name} selected={momentValue()} placeholderText={placeholder}
                  minDate={minDate}
                  onChange={handleOnChange} onFocus={input.onFocus}
                  maxDate={maxDate} {...rest} autoComplete="off"
      />

      {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
    </Form.Field>
  )
}

export const DatePickerHooks = ({
                                  name,
                                  label,
                                  placeholder,
                                  minDate,
                                  maxDate,
                                  defaultValue,
                                  inline,
                                  rules,
                                  ...rest
                                }) => {

  const { control, errors } = useFormContext()
  const getError = () => get(errors, name)

  const momentValue = (val) => {
    let mmtVal = moment(val === undefined ? null : val)
    return mmtVal.isValid() ? mmtVal : null
  }

  return (
    <Form.Field error={getError() !== undefined} inline={inline}>
      <label>{label}</label>
      <Controller
        control={control}
        render={(props) => <DatePicker className={styles.datePicker}
                                       {...rest}
                                       name={name}
                                       selected={momentValue(props.value)}
                                       placeholderText={placeholder}
                                       minDate={minDate}
                                       onChange={date => {
                                         if (date) {
                                           props.onChange(date.format('YYYY-MM-DD'))
                                         } else {
                                           props.onChange(null)
                                         }
                                         return date
                                       }
                                       }
                                       maxDate={maxDate}
                                       autoComplete="off"
        />}
        rules={rules}
        name={name}
        defaultValue={defaultValue || ''}
      />

      <ErrorMessage errors={errors} name={name} render=
        {() => <div
          className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}
      />
    </Form.Field>
  )
}

renderDatePicker.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const renderDropdown = ({ meta: { touched, error }, label, input, options, multiple, width, ...rest }) => (
  <Form.Field error={error && touched} width={width}>
    <label>{label}</label>
    <Select name={input.name} options={options} value={input.value} multiple={multiple}
            {...rest}
            onFocus={input.onFocus}
            onBlur={(e, data) => input.onBlur({
              target: { type: 'select', value: data.value },
              stopPropagation: () => {
              },
              preventDefault: () => {
              },
            })}
            onChange={(e, data) => input.onChange({
              target: { type: 'select', value: data.value },
              stopPropagation: () => {
              },
              preventDefault: () => {
              },
            })}/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

export const DropdownHooks = ({
                                clearable,
                                label,
                                name,
                                options,
                                multiple,
                                width,
                                rules,
                                validateAll,
                                defaultValue,
                                onChange = () => {
                                },
                                ...rest
                              }) => {

  const { trigger, errors, control } = useFormContext()
  const getError = () => get(errors, name)
  return (
    <Form.Field error={getError() !== undefined} width={width}>
      <label>{label}</label>
      <Controller
        control={control}
        render={(props) => <Select
          name={name}
          options={options}
          selection={clearable}
          clearable={clearable}
          multiple={multiple}
          value={props.value}
          onChange={async (e, data) => {
            props.onChange(data.value)
            onChange(e, data)
            if (validateAll) {
              await trigger()
            } else {
              await trigger(name)
            }
          }}
          {...rest} />
        }
        rules={rules}
        name={name}
        defaultValue={defaultValue || ''}
      />

      <ErrorMessage errors={errors} name={name} render=
        {() => <div
          className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}
      />
    </Form.Field>
  )
}


renderDropdown.propTypes = {
  meta: PropTypes.object.isRequired,
  width: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
}

export const renderTextArea = ({ meta: { touched, error }, label, input, ...custom }) => (
  <Form.Field error={error && touched}>
    <label>{label}</label>
    <TextArea name={input.name} value={input.value} {...custom} onChange={input.onChange} onBlur={input.onBlur}
              onFocus={input.onFocus}/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

renderTextArea.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

const currencies = ['EUR', 'USD', 'CZK', 'HUF', 'PLN']

export const renderCurrencySelector = ({ meta: { touched, error }, label, input, ...custom }) => (
  <Form.Field error={error && touched}>
    <label>{label}</label>
    <Dropdown name={input.name} options={currencies.map(cr => ({ key: cr, value: cr, text: cr }))} value={input.value}
              selection onChange={(e, data) => input.onChange({
      target: { type: 'select', value: data.value },
      stopPropagation: () => {
      },
      preventDefault: () => {
      },
    })}/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)
renderCurrencySelector.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const renderInlineCheckbox = ({ meta: { touched, error }, label, input }) => (
  <Form.Field error={error && touched}>
    <Checkbox name={input.name} className="input" toggle checked={input.checked} label={label}
              onChange={() => input.onChange({
                target: { type: 'checkbox', checked: !input.checked }, stopPropagation: () => {
                }, preventDefault: () => {
                },
              })}/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

renderInlineCheckbox.propTypes = {
  meta: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  input: PropTypes.object.isRequired,
}


