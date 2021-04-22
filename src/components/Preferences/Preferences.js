import React from 'react'
import { Card, Dimmer, Grid, Loader } from 'semantic-ui-react'
import InformationModal from '../utils/InformationModal'
import api from '../../api'


const Preferences = ({ user }) => {

  return (
    <div>
      <Dimmer active={user === null} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      {user &&
      <Grid className="content" style={{ padding: '50px' }} textAlign={'center'}>
        <Grid.Row textAlign={'center'}>
          <Grid.Column>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>Organization</Card.Header>
                  <Card.Meta>CREATE ORGANIZATION</Card.Meta>
                  <Card.Description>
                    create group of people with access to a group of files
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Reset password</Card.Header>
                  <Card.Meta>SECURITY</Card.Meta>
                  <Card.Description>
                    old, new -> maybe send by email?
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered>
              <Card className="card">
                <Card.Content>
                  <Card.Header>Background</Card.Header>
                  <Card.Meta>STYLE</Card.Meta>
                  <Card.Description>
                    change background color, custom.. nice :)
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>API key</Card.Header>
                  <Card.Meta>Generate API key</Card.Meta>
                  <Card.Description>
                    <p>
                      Here you can access your api key and use it as you wish, however you should not share it with
                      anyone
                      if you do not wish others mess with your things on you behalf
                    </p>
                    <br/>
                    <InformationModal
                      openAction={() => api.generateApiKey().then((response) => response.data.value)}
                      buttonIcon={'key'}
                      buttonText="Generate API KEY"
                      intro="Your API KEY is:"
                      title="Generate API KEY"
                      icon={'key'}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      }
    </div>
  )
}


export default Preferences
