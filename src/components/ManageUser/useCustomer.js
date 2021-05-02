import { useState } from 'react'
import securedAPI from '../../api'
import toast from 'react-hot-toast'


const useCustomer = () => {
  const [customer, setCustomer] = useState(null)

  const onExtendCardValidity = ({ cardId }) => {
    return securedAPI.extendCardValidity({ cardId })
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
  const onFindByCardId = (cardId) => {
    return securedAPI.findCustomer({ cardId })
      .then(response => {
        if (response.ok) {
          // TODO
          return response.data
        } else {
          toast.error(`[${response.status}] Failed to fetch customers`)
          return [
            {
              cardid: '32d32d-tl32-32jl-2nk3-23kl3p4i',
              title: '32d32d-tl32-32jl-2nk3-23kl3p4i', // necessary for realtime search
              firstname: 'Steve',
              lastname: 'Jobs',
              campus: 'Aalborg'
            },
            {
              cardid: 'de23g2-2c32-d23d-dd32-3232d3d3',
              title: 'de23g2-2c32-d23d-dd32-3232d3d3',
              firstname: 'Brad',
              lastname: 'Pitt',
              campus: 'USA'
            },
          ]
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
        if (response.ok) {
          toast.success('Customer updated successfully')
        } else {
          toast.error(`[${response.status}] Failed to update customer`)
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
    create: onCreate,
    update: onUpdate,
  }
}

export default useCustomer
