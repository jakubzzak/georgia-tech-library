import React, { useEffect } from 'react'
import './Logout.css'
import PropTypes from 'prop-types'
import { Button, Grid, Image } from 'semantic-ui-react'
import logo from '../../assets/logo.png'
import securedAPI from '../../api'

const Logout = ({ setToken, closeModal }) => {

  const onSubmit = () => {
    securedAPI.logout()
      .then(response => {
        closeModal()
      })
  }

  return (
    <div className="wrapper" style={{ padding: '0 3em' }}>
      <Image src={logo} size={'small'} alt={'Georgia Tech Library'} style={{ marginBottom: '2em' }}/>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign={'center'}>
            See you soon!
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign={'center'}>
          <Grid.Column>
            <Button content={'Log out'}
                    color={'orange'}
                    onClick={() => {
                      // setToken()
                      onSubmit()
                    }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

Logout.propTypes = {
  setToken: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Logout
