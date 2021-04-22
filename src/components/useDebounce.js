import { useState } from 'react'


const useDebounce = ({ action, delay }) => {
  const [isValid, setIsValid] = useState(true)
  const [timeOut, setTimeOut] = useState(null)

  const trigger = (data) => {
    if (timeOut) {
      clearTimeout(timeOut)
    }
    setTimeOut(() => setTimeout(async () => {
        setIsValid(await action(data))
        console.log('isValid', isValid)
      }, delay),
    )
  }

  return {
    trigger,
    isValidOk: isValid,
  }
}


export default useDebounce
