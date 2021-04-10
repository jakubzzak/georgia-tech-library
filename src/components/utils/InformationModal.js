import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import styles from './InformationModal.module.css'

const InformationModal = ({ openAction, buttonIcon, buttonText, intro, title, icon }) => {

  const [isModalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState(null)

  return (
    <Modal
      trigger={
        <Button primary
                basic
                onClick={() => openAction().then((response) => {
                  setModalOpen(true)
                  setContent(response)
                })}
        >
          <Icon name={buttonIcon}/>
          {buttonText}
        </Button>
      }
      open={isModalOpen}
      onClose={() => setModalOpen(false)}
      basic
      size='small'
    >

      {/*<Header icon={icon} content={title}/>*/}
      <Modal.Content>
        <h3>{intro}</h3>
        <span className={styles.informationModalContent}>{content}</span>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={() => setModalOpen(false)} inverted floated={"right"}>
          <Icon name='checkmark'/> OK
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

InformationModal.propTypes = {
  openAction: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  buttonIcon: PropTypes.string,
  icon: PropTypes.string,
}

export default InformationModal
