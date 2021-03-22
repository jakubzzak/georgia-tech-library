import React, { useState } from 'react'
import { Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'


const ControlledPopup = ({ trigger, content, timeoutLength, position }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [timeOut, setTimeOut] = useState(null)

  const handleOpen = () => {
    setIsOpen(true)
    if (timeoutLength) {
      setTimeOut(() => setTimeout(() => {
        setIsOpen(false)
      }, timeoutLength))
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    clearTimeout(timeOut)
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
