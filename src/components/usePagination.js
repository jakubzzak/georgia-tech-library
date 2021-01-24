import React, { useEffect, useState } from 'react'
import api from '../api'
import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'


const fetchTableData = async ({ pageDetails, setPage }) => {
  const response = await api.listFiles(pageDetails)
  if (response.ok) {
    setPage(response.data)
  } else {
    // TODO: handle on failed
  }
}

const usePagination = ({ initPageSize = 10, initCurrentPage = 0, initSort = [], initSearch = {} }) => {

  const [page, setPage] = useState({ data: [], totalItems: 0, sort: [] })

  const [pageSize, setPageSize] = useState(initPageSize)
  const [currentPage, setCurrentPage] = useState(initCurrentPage)
  const [sort, setSort] = useState(initSort)
  const [search, setSearch] = useState(initSearch)


  useEffect(() => {
    fetchTableData({ pageDetails: { currentPage, pageSize, sort, search }, setPage })
  }, [pageSize, currentPage, sort, search])


  const onPageChange = (index) => {
    setCurrentPage(index)
  }

  const onPageSizeChange = (size, index) => {
    setPageSize(size)
    setCurrentPage(index)
  }

  const onSortChange = (column, shiftKey) => {
    let sortCopy = sort.find(d => d.id === column.id) || shiftKey ? Immutable([...sort]) : Immutable([])
    if (sortCopy.length !== 0) {
      const sortItem = sort.find(d => d.id === column.id)
      if (sortItem) {
        if (sortItem.desc && shiftKey) {
          const foundIdx = sortCopy.indexOf(sortItem)
          sortCopy = sortCopy.slice(0, foundIdx).concat(sortCopy.slice(foundIdx + 1))
        } else {
          sortCopy = sortCopy.setIn([sortCopy.indexOf(sortItem), 'desc'], !sortItem.desc)
        }
      } else {
        sortCopy = sortCopy.concat({
          id: column.id,
          desc: false
        })
      }
    } else {
      sortCopy = sortCopy.concat({
        id: column.id,
        desc: false
      })
    }
    setSort(sortCopy)
  }

  const onSearchChange = (search) => {
    setSearch(search)
  }

  const removeItem = (id) => {
    console.log('page before', page.data)
    setPage({ ...page, data: page.data.filter(item => item.id !== id) })
    console.log('page after', page.data)
  }

  return {
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
    removeItem
  }
}

usePagination.protoTypes = {
  initPageSize: PropTypes.number,
  initCurrentPage: PropTypes.number,
  initSort: PropTypes.array,
  initSearch: PropTypes.object,
}

export default usePagination
