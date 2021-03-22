import React from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import FileSaver from 'file-saver'
import { Button, Dimmer, Loader } from 'semantic-ui-react'
import api from '../../api'
import PropTypes from 'prop-types'
import usePagination from '../usePagination'
import moment from 'moment'
import ControlledPopup from '../utils/ControlledPopup'
import toast from 'react-hot-toast'


const ListFiles = ({ initPageSize = 10 }) => {

  const { page, pageSize, onPageChange, onPageSizeChange, onSortChange, onSearchChange, removeItem } = usePagination({ initPageSize, initSort: [{ id: 'createdAt', desc: false}] })

  const onRemove = async (id) => {
    await api.removeFile(id)
      .then(response => {
        if (response.ok) {
          removeItem(id)
          toast.success("File removed")
        } else {
          toast.error("Removing file failed with status => " + response.status)
        }
      }).catch(error => {
        toast.error("Files failed to load => ", error)
      })
  }
  const onDownload = async (file) => {
    if (file != null) {
      await api.downloadFile(file.id).then(response => {
        if (response.ok) {
          FileSaver.saveAs(response.data, file.name + '.' + file.extension)
          toast.success("File downloaded")
        } else {
          toast.error("Failed to download file with status => " + response.status)
        }
      }).catch(error => {
        toast.error("Failed to download file => " + error)
      })
    } else {
      toast.error("Failed to download file, no file provided")
    }
  }

  const columns = [{
    id: 'createdAt',
    Header: 'Created at',
    accessor: (d) => moment(d.createdAt).format('YYYY-MM-DD'),
    width: 130,
    style: {'textAlign': 'center'},
  }, {
    Header: 'File name',
    accessor: 'title',
    sortable: false,
    Cell: props => <span>{props.value}</span>, // Custom cell components!
  },{
    Header: props => <span>Extension</span>, // Custom header components!
    accessor: 'extension',
    width: 130,
    style: {'textAlign': 'center'},
  }, {
    id: 'size', // Required because our accessor is not a string
    Header: 'Size',
    accessor: d => d.sizeInMb === 0 ? "< 1MB":d.sizeInMb + "MB", // Custom value accessors!
    width: 130,
    style: {'textAlign': 'center'},
  },{
    id: 'status', // Required because our accessor is not a string
    Header: 'Status',
    accessor: d => d.status, // Custom value accessors!
    width: 130,
    style: {'textAlign': 'center'},
  }, {
    Header: 'Actions',
    accessor: 'action', // String-based value accessors!
    sortable: false,
    style: { 'textAlign': 'center' },
    width: 180,
    Cell: row => (
      <div>
        <ControlledPopup
          trigger={
            <Button color={'green'} content={'download'} size={'tiny'} basic/>
          }
          content={ closePopup =>
            <Button color='green' content='Confirm' size={'tiny'} onClick={() => {
              closePopup()
              onDownload(row.original)
            }}/>
          }
          on='click'
          position='top center'
        />
        <ControlledPopup
          trigger={
            <Button color={'red'} content={'remove'} size={'tiny'} basic/>
          }
          content={ closePopup =>
            <Button color='red' content='Confirm' size={'tiny'} onClick={() => {
              closePopup()
              onRemove(row.original.id)
            }}/>
          }
          on='click'
          position='top center'
        />
      </div>
    ),
  }]

  return (
    <div style={{ padding: '50px' }}>
      <Dimmer active={page === null} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      <ReactTable className='-striped -highlight' noDataText="Noting to show" loading={page === null}
                  defaultPageSize={initPageSize} page={page.currentPage} pages={page.totalPages}
                  data={page.data} sorting={page.sort} manual
                  onPageChange={(pageIndex) => onPageChange(pageIndex)}
                  onPageSizeChange={(pageSize, pageIndex) => onPageSizeChange(pageSize, pageIndex)}
                  onSortedChange={(newSorted, column, shiftKey) => onSortChange(column, shiftKey)}
                  columns={columns}
                  getTheadThProps={() => ({
                    style: {
                      outline: '0',
                    },
                  })}
      />
    </div>
  )
}

ListFiles.propTypes = {
  initPageSize: PropTypes.number
}


export default ListFiles
