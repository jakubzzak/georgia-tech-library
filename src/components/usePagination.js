import { useState } from 'react'
import PropTypes from 'prop-types'


const usePagination = ({ initPageSize = 10, initCurrentPage = 0 }) => {

  const [currentPage, setCurrentPage] = useState(initCurrentPage)
  const [pageSize, setPageSize] = useState(initPageSize)

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  return {
    currentPage,
    pageSize,
    prevPage,
    nextPage,
  }
}

usePagination.protoTypes = {
  initPageSize: PropTypes.number,
  initCurrentPage: PropTypes.number,
}

export default usePagination
