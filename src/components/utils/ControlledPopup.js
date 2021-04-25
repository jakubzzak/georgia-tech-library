import React, { useEffect, useRef, useState } from 'react'
import { Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'


const ControlledPopup = ({ trigger, content, timeoutLength, position }) => {
  let timeOut = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    if (timeoutLength) {
      timeOut.current = setTimeout(() => {
        handleClose()
      }, timeoutLength)
    }
  }

  useEffect(() => {
    return () => {
      // don't forget to clean after yourself
      clearTimeout(timeOut.current)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    clearTimeout(timeOut.current)
  }

  return (
    <Popup
      trigger={trigger}
      content={content(handleClose)}
      on="click"
      open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      position={position}
    />
  )
}

ControlledPopup.propTypes = {
  trigger: PropTypes.element.isRequired,
  content: PropTypes.func.isRequired,
  timeoutLength: PropTypes.number,
  position: PropTypes.string,
}

export default ControlledPopup
