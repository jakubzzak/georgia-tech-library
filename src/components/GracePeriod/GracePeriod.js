import { useEffect, useState } from 'react'
import { Button, Dimmer, Divider, Grid, Icon, Loader, Table } from 'semantic-ui-react'
import Layout from '../Layout/Layout'
import moment from 'moment'
import toast from 'react-hot-toast'
import securedAPI from '../../api'


const GracePeriod = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    securedAPI.fetchOverDueLoans({ page: currentPage })
      .then(response => {
        if (response.ok && response.data.ok) {
          setItems(response.data.data)
        } else {
          setItems([])
          toast.error(`[${response.status}] Failed to fetch overdue loans`)
        }
      }).catch((error) => {
      toast.error(`Something went wrong when fetching overdue loans! => ${error}`)
    }).finally(() => {
      setLoading(false)
    })
  }, [currentPage])

  return (
    <Layout useWrapper={false}>
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>

        <Grid style={{ width: '100%' }}>
          <Grid.Row>
            <Grid.Column >

              <Table attached={'top'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={1} textAlign={'center'}/>
                    <Table.HeaderCell width={2} textAlign={'center'}>Customer name</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign={'center'}>Book title</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign={'center'}>Loaned at</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign={'center'}>Due date</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign={'center'}>End of grace period</Table.HeaderCell>
                    <Table.HeaderCell width={5} textAlign={'center'}>Email</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>
              {items?.map((item, index) => {
                const when = moment(item.due_date).isBefore(moment()) ? 'BEFORE' :
                  moment(item.grace_period_end).isBefore(moment()) ? 'BETWEEN' : 'AFTER'
                return (
                  <Table color={item.type === 'PROFESSOR' ? 'blue' : 'grey'}>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell width={1} textAlign={'center'}>
                          {when === 'BEFORE' ? (
                            <Icon name={'check'} color={'green'}/>
                          ) : when === 'BETWEEN' ? (
                            <Icon name={'exclamation'} color={'orange'}/>
                          ) : (
                            <>
                              <Icon name={'exclamation'} color={'red'}/>
                              <Icon name={'exclamation'} color={'red'}/>
                            </>
                          )}
                        </Table.Cell>
                        <Table.Cell width={2} textAlign={'center'}>{item.name}</Table.Cell>
                        <Table.Cell width={2} textAlign={'center'}>{item.title}</Table.Cell>
                        <Table.Cell width={2}
                                    textAlign={'center'}>{moment(item.loaned_at).format('DD MMM YYYY')}</Table.Cell>
                        <Table.Cell width={2}
                                    textAlign={'center'}>{moment(item.due_date).format('DD MMM YYYY')}</Table.Cell>
                        <Table.Cell width={2}
                                    textAlign={'center'}>{moment(item.grace_period_end).format('DD MMM YYYY')}</Table.Cell>
                        <Table.Cell width={5} textAlign={'center'}>{item.email}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                )
              })}

              <Grid style={{ width: '100%' }} centered>
                <Grid.Row>
                  <Grid.Column>
                    <Divider/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign={'center'}>
                    <Button icon={'left arrow'} disabled={currentPage === 0} style={{ width: '100px', margin: 0 }}
                            onClick={() => setCurrentPage(currentPage - 1)}/>
                    <span style={{ margin: '0 3em' }}>
                      {currentPage + 1}
                    </span>
                    <Button icon={'right arrow'} disabled={items.length < 25} style={{ width: '100px', margin: 0 }}
                            onClick={() => setCurrentPage(currentPage + 1)}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Dimmer.Dimmable>
    </Layout>
  )
}

export default GracePeriod
