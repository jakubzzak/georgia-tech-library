import React from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader } from 'semantic-ui-react'


const Layout = ({ children, loading, useWrapper }) => {

  return (
    <div className={useWrapper ? 'wrapper':''} style={{ padding: '3em' }}>
      <Dimmer active={loading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      {children}
    </div>
  )
}

Layout.propTypes = {
  loading: PropTypes.bool,
  useWrapper: PropTypes.bool,
}

export default Layout
