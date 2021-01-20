import moment from 'moment'
// import { wrap } from 'object-path-immutable'
import isNumber from 'lodash/isNumber'


export const messages = {
  'required': 'Required',
  'email': 'Invalid email address',
  'validate': 'Incorrect value',
  'isUnique': 'Document already exists',
  'isDayOfMonth': 'Not valid day of month',
  'max': 'Maximum length exceeded',
  'maxLength': 'Maximum length exceeded',
}

export const required = value => value || isNumber(value) ? undefined : 'Required'

export const requiredIfDependant = (value, dependant) => !dependant || value || isNumber(value) ? undefined : 'Required'

export const date = value =>
  !value || (value instanceof Date && moment(value).isValid()) || (moment.isMoment(value) && value.isValid()) ||
  moment(value).isValid() ? undefined : 'Invalid date & time value'

export const minLength = min => value => value && value.length < min ? 'Must have at lease ' + min + ' characters' : undefined

export const minLength8 = minLength(8)

export const maxLength = max => value => value && value.length > max ? 'Must be ' + max + ' characters or less' : undefined

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value => value && value < min ? 'Must be at least ' + min : undefined

export const email = value =>
  value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    ? 'Invalid email address' : undefined

// export const onAsyncValidation = (error, oldErrors, currentField) => {
//   let combo = combineErrors(error, oldErrors, currentField)
//   return new Promise((resolve, reject) => {
//     if (Object.keys(combo).length > 0) {
//       reject(combo)
//     } else {
//       resolve()
//     }
//   })
// }
//
// function combineErrors(newError, oldErrors, currentField) {
//   let oE = wrap(oldErrors)
//   if (Array.isArray(currentField)) {
//     currentField.forEach(arrayField => oE.del(arrayField))
//   } else {
//     oE.del(currentField)
//   }
//   if (newError !== null && newError !== undefined) {
//     if (Array.isArray(currentField)) {
//       currentField.forEach(arrayField => oE.set(arrayField, newError.message))
//     } else {
//       oE.set(currentField, newError.message)
//     }
//   }
//   return oE.value()
// }
