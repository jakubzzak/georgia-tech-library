import { Dimmer, Loader } from 'semantic-ui-react'
import React from 'react'


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

export default Layout
