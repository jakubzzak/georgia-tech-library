import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useCustomer = () => {
  const [customer, setCustomer] = useState(null)

  const onExtendCardValidity = ({ ssn }) => {
    return securedAPI.extendCardValidity({ ssn })
      .then(response => {
        if (response.ok) {
          toast.success('Card validity extended successfully')
        } else {
          toast.error(`[${response.status}] Failed to extend card validity`)
        }
      }).catch(error => {
        toast.error(`Something went wrong when extending card validity => ${error}`)
      })
  }
  const onGetCustomer = ({ id: ssn }) => {
    return securedAPI.getCustomer({ ssn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setCustomer(response.data.data)
          return response.data.data
        }
      }).catch(error => {
        toast.error(`Something went wrong when fetching the customer => ${error}`)
      })
  }
  const onFindByCardId = (cardId) => {
    return securedAPI.findCustomer({ cardId })
      .then(response => {
        if (response.ok && response.data.ok) {
          return response.data.data?.map(customer => ({
            id: customer.ssn,
            card_id: customer.card_id,
            title: customer.card_id,
            full_name: customer.full_name,
            city: customer.city,
          }))
        } else {
          toast.error(`[${response.status}] Failed to fetch customers`)
          return []
        }
      }).catch(error => {
        toast.error(`Something went wrong when fetching customers => ${error}`)
      })
  }
  const onCreate = (data) => {
    return securedAPI.createCustomer(data)
      .then(response => {
        if (response.ok) {
          toast.success('Customer created successfully')
        } else {
          toast.error(`[${response.status}] Failed to create new customer`)
        }
      }).catch(error => {
        toast.error(`Something went wrong when creating user => ${error}`)
      })
  }
  const onUpdate = (data) => {
    return securedAPI.updateCustomer(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          toast.success('Customer updated successfully')
          return response.data.data
        } else {
          toast.error(`Failed to update customer, ${response.data.error}`)
          return null
        }
      }).catch(error => {
        toast.error(`Something went wrong when updating customer => ${error}`)
      })
  }

  return {
    customer,
    setCustomer,
    extendCard: onExtendCardValidity,
    find: onFindByCardId,
    get: onGetCustomer,
    create: onCreate,
    update: onUpdate,
  }
}

export default useCustomer
