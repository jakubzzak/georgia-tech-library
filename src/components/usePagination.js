import React, { useEffect, useState } from 'react'
import { securedAPI } from '../api'
import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'


const fetchTableData = async ({ pageDetails, setPage }) => {
  return securedAPI.fetchHistory(pageDetails)
}

const usePagination = ({ initPageSize = 10, initCurrentPage = 0, initSort = [], initSearch = {} }) => {

  const [page, setPage] = useState({ data: [], totalItems: 0, sort: [] })
  const [loading, setLoading] = useState(false)

  const [pageSize, setPageSize] = useState(initPageSize)
  const [currentPage, setCurrentPage] = useState(initCurrentPage)
  const [sort, setSort] = useState(initSort)
  const [search, setSearch] = useState(initSearch)


  useEffect(() => {
    setLoading(true)
    fetchTableData({ pageDetails: { currentPage, pageSize, sort, search }, setPage })
      .then(response => {
        if (response.ok) {
          setPage(response.data)
        } else {
          toast.error(`[${response.status}] Failed to load history`)
        }
      }).catch(error => {
      toast.error('Files failed to load => ', error)
    }).finally(() => {
      setPage({
        data: [
          {
            title: 'first loan',
            dateOut: new Date(),
            dateIn: new Date(),
            fine: null,
          },
          {
            title: 'second loan',
            dateOut: new Date(),
            dateIn: new Date(),
            fine: null,
          },
          {
            title: 'third loan',
            dateOut: new Date(),
            dateIn: new Date(),
            fine: 10.20,
          },
        ],
        totalItems: 100,
        sort: [],
      })
      setLoading(false)
    })
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
          desc: false,
        })
      }
    } else {
      sortCopy = sortCopy.concat({
        id: column.id,
        desc: false,
      })
    }
    setSort(sortCopy)
  }

  const onSearchChange = (search) => {
    setSearch(search)
  }

  const removeItem = (id) => {
    // console.log('page before', page.data)
    setPage({ ...page, data: page.data.filter(item => item.id !== id) })
    // console.log('page after', page.data)
  }

  return {
    loading,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
    removeItem,
  }
}

usePagination.protoTypes = {
  initPageSize: PropTypes.number,
  initCurrentPage: PropTypes.number,
  initSort: PropTypes.array,
  initSearch: PropTypes.object,
}

export default usePagination
