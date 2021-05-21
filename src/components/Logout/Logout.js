import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, Grid, Image, Loader } from 'semantic-ui-react'
import './Logout.css'
import logo from '../../assets/logo.png'


const Logout = ({ logout, loading, closeModal }) => {

  return (
    <div className="wrapper" style={{ padding: '0 3em' }}>
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <div className={'wrapper'} style={{ paddingBottom: '2em' }}>
          <Image src={logo}
                 size={'small'}
                 alt={'Georgia Tech Library'}
                 tyle={{ marginBottom: '2em' }}
          />
        </div>
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
                        logout()
                          .then(success => {
                            if (success) {
                              closeModal()
                            }
                          })
                      }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Dimmer.Dimmable>
    </div>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Logout
