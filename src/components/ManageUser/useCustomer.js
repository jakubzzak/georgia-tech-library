import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useCustomer = () => {
  const [customer, setCustomer] = useState(null)

  const onExtendCardValidity = ({ id }) => {
    return securedAPI.extendCardValidity({ id })
      .then(response => {
        if (response.ok && response.data.ok) {
          setCustomer(response.data.data)
          toast.success('Card validity extended successfully')
        } else {
          toast.error(`[${response.status}] Failed to extend card validity`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when extending card validity => ${error}`)
      })
  }
  const onGetCustomer = ({ id: ssn }) => {
    return securedAPI.getCustomer({ ssn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setCustomer(response.data.data)
        } else {
          toast.error(`[${response.status}] Failed to fetch customer details`)
        }
        return response.ok && response.data.ok
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
        if (response.ok && response.data.ok) {
          setCustomer(response.data.data)
          toast.success('Customer created successfully')
        } else {
          toast.error(`[${response.status}] Failed to create new customer`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when creating user => ${error}`)
      })
  }
  const onUpdate = (data) => {
    return securedAPI.updateCustomer(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          setCustomer(response.data.data)
          toast.success('Customer updated successfully')
        } else {
          toast.error(`Failed to update customer, ${response.data.error}`)
        }
        return response.ok && response.data.data
      }).catch(error => {
        toast.error(`Something went wrong when updating customer => ${error}`)
      })
  }
  const onDisable = ({ ssn }) => {
    return securedAPI.disableCustomer({ ssn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setCustomer(response.data.data)
          toast.success('Customer disabled successfully')
        } else {
          toast.error(`Failed to disable customer, ${response.data.error}`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when disabling customer => ${error}`)
      })
  }
  const onEnable = ({ ssn }) => {
    return securedAPI.enableCustomer({ ssn })
      .then(response => {
        if (response.ok && response.data.ok) {
          setCustomer(response.data.data)
          toast.success('Customer enabled successfully')
        } else {
          toast.error(`Failed to enable customer, ${response.data.error}`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Something went wrong when enabling customer => ${error}`)
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
    disable: onDisable,
    enable: onEnable,
  }
}

export default useCustomer
