import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import FileSaver from 'file-saver'
import { Button, Icon, Popup } from 'semantic-ui-react'
import api from '../../api'


const ListFiles = ({ data }) => {

  const [loading, setLoading] = useState(true);
  const [showPagination, setShoWPagination] = useState(false);

  useEffect(() => {
    if (!data) { // if real data coming remove !
      setLoading(false)
    }
    if (data && data.length > 10) {
      setShoWPagination(true)
    }
  }, [data])

  const onRemove = async (data) => {
    const response = await api.removeFile(data)
    if (response.ok) {

    } else {

    }
  }
  const onDownload = (id) => {
    FileSaver.saveAs(id)
  }

  const dataTest = [{
    createdAt: '2020-10-01',
    title: 'portfolio_pic',
    size: '100kb',
    extension: 'png',
  }]

  const columns = [{
    Header: 'Created at',
    accessor: 'createdAt', // String-based value accessors!
    width: 130
  }, {
    Header: 'Title',
    accessor: 'title',
    Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
  }, {
    Header: props => <span>Extension</span>, // Custom header components!
    accessor: 'extension',
    width: 130
  }, {
    id: 'size', // Required because our accessor is not a string
    Header: 'Size',
    accessor: d => d.size, // Custom value accessors!
    width: 130
  }, {
    Header: 'Actions',
    accessor: 'action', // String-based value accessors!
    sortable: false,
    style: { 'textAlign': 'center' },
    width: 180,
    Cell: row => (
      <div>
        <Popup
          trigger={
            <Button color={"green"} content={'download'} size={"tiny"} basic/>
          }
          content={
            <Button color='green' content='Confirm' size={"tiny"} onClick={() => onDownload(row.id)}/>
          }
          on='click'
          position='top center'
        />
        <Popup
          trigger={
            <Button color={"red"} content={'remove'} size={"tiny"} basic/>
          }
          content={
            <Button color='red' content='Confirm' size={"tiny"} onClick={() => onRemove(row.id)}/>
          }
          on='click'
          position='top center'
        />
      </div>
    ),
  }]

  return (
    <div style={{ padding: '50px' }}>
      <ReactTable className='-striped -highlight'
                  noDataText="Noting to show"
                  defaultPageSize={10} showPagination={showPagination}
                  data={dataTest}
                  columns={columns}
                  loading={loading}
                  getTheadThProps={() => ({
                    style: {
                      outline: '0'
                    }
                  })}
      />
    </div>
  )
}


export default ListFiles
