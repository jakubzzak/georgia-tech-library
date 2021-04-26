import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useCustomer = () => {
  const [customer, setCustomer] = useState(null)

  const onExtendCardValidity = ({ cardId }) => {
    return new Promise(() => {
      securedAPI.extendCardValidity({ cardId })
        .then(response => {
          if (response.ok) {
            toast.success('Card validity extended successfully')
          } else {
            toast.error(`[${response.status}] Failed to extend card validity`)
          }
        }).catch(error => {
        toast.error(`Something went wrong when extending card validity => ${error}`)
      })
    })
  }
  const onFind = ({ cardId }) => {
    return new Promise(() => {
      securedAPI.findCustomer({ cardId })
        .then(response => {
          if (response.ok) {
            // TODO
          } else {
            toast.error(`[${response.status}] Failed to fetch customer`)
          }
        }).catch(error => {
        toast.error(`Something went wrong when fetching customer => ${error}`)
      })
    })
  }
  const onCreate = (data) => {
    return new Promise(() => {
      securedAPI.createCustomer(data)
        .then(response => {
          if (response.ok) {
            toast.success('Customer created successfully')
          } else {
            toast.error(`[${response.status}] Failed to create new customer`)
          }
        }).catch(error => {
        toast.error(`Something went wrong when creating user => ${error}`)
      })
    })
  }
  const onUpdate = (data) => {
    return new Promise(() => {
      securedAPI.updateCustomer(data)
        .then(response => {
          if (response.ok) {
            toast.success('Customer updated successfully')
          } else {
            toast.error(`[${response.status}] Failed to update customer`)
          }
        }).catch(error => {
        toast.error(`Something went wrong when updating customer => ${error}`)
      })
    })
  }

  return {
    customer,
    setCustomer,
    extendCard: onExtendCardValidity,
    find: onFind,
    create: onCreate,
    update: onUpdate,
  }
}

export default useCustomer
