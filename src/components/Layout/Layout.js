import { Dimmer, Loader } from 'semantic-ui-react'
import React from 'react'


const Layout = ({ children, loading, useWrapper }) => {

  return (
    <div className={useWrapper ? 'wrapper':''} style={{ margin: '3em 0' }}>
      <Dimmer active={loading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      {children}
    </div>
  )
}

export default Layout
