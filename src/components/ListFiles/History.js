import React from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import PropTypes from 'prop-types'
import usePagination from '../usePagination'
import moment from 'moment'
import Layout from '../Layout/Layout'


const History = ({ initPageSize = 10 }) => {

  const { page, pageSize, onPageChange, onPageSizeChange, onSortChange, onSearchChange, loading } = usePagination({
    initPageSize,
    initSort: [{ id: 'createdAt', desc: false }],
  })

  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      width: 500,
      Cell: props => <span>{props.value}</span>,
    }, {
      id: 'dateOut',
      Header: 'Date out',
      accessor: (d) => moment(d.dateOut).format('YYYY-MM-DD'),
      style: { 'textAlign': 'center' },
    }, {
      id: 'dateIn',
      Header: 'Date in',
      accessor: (d) => moment(d.dateIn).format('YYYY-MM-DD'),
      style: { 'textAlign': 'center' },
    }, {
      Header: props => <span>Fine DKK</span>, // Custom header components!
      accessor: 'fine',
      width: 80,
      style: { 'textAlign': 'center' },
      Cell: props => <span>{props.value}</span>,
    }
  ]

  return (
    <Layout loading={false}>
      <ReactTable className="-striped -highlight" noDataText="Noting to show" loading={loading}
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
    </Layout>
  )
}

History.propTypes = {
  initPageSize: PropTypes.number,
}


export default History
