import { Modal } from 'semantic-ui-react'
import React from 'react'

const ModalWindow = ({ children, isOpen, setOpen }) => {

  return (
    <Modal size={'mini'}
           open={isOpen}
           dimmer={'blurring'}
           centered
           style={{ paddingBottom: '2em' }}
           onClose={() => setOpen(false)}
    >
      {children}
    </Modal>
  )
}

export default ModalWindow
