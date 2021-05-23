import apisauce from 'apisauce'

const create = (baseURL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  let token = JSON.parse(sessionStorage.getItem('token'))

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 30000,
  })
  const blobApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    responseType: 'blob',
    // 10 second timeout...
    timeout: 30000,
  })

  const setToken = (currentAuthToken) => {
    token = currentAuthToken
  }


  const getSecuredHeaders = (customHeaders = {}) => ({
    headers: {
      ...customHeaders,
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
      'Authorization': `Bearer ${token}`,
    },
  })
  const getMultipartApiHeaders = () => ({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept-Language': 'en',
      'Authorization': `Bearer ${token}`,
    },
  })
  const getUnsecuredHeaders = () => ({
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const createRequestFromPageDetails = ({ phrase, group, columns, pageSize, currentPage }) => {

    return {
      offset: currentPage * pageSize,
      limit: pageSize,
      phrase: phrase,
      group: group,
      columns: columns,
    }
  }
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const uploadFile = (request) => api.post('file/attache', request, getUnsecuredHeaders())
  const downloadFile = (id) => api.get(`file/download/${id}`, null, {
    ...getUnsecuredHeaders(),
    responseType: 'blob',
  })

  const searchInCatalog = (search) => api.post(`search`, createRequestFromPageDetails(search), getUnsecuredHeaders())
  // customer
  const loginCustomer = (credentials) => api.post(`user/login`, credentials, getUnsecuredHeaders())
  const logoutCustomer = () => api.get(`user/logout`, null, getUnsecuredHeaders())
  const fetchHistory = () => api.get(`user/history`, null, getUnsecuredHeaders())
  // customer - wishlist
  const getMyWishlist = () => api.get(`user/wishlist`, null, getUnsecuredHeaders())
  const addToMyWishlist = ({ isbn }) => api.put(`user/wishlist/add/${isbn}`, null, getUnsecuredHeaders())
  const removeFromMyWishlist = ({ isbn }) => api.delete(`user/wishlist/remove/${isbn}`, null, getUnsecuredHeaders())
  const requestFromWishlist = ({ id }) => api.get(`user/wishlist/request/${id}`, null, getUnsecuredHeaders())
  // customer - from librarian view
  const findCustomer = ({ cardId }) => api.get(`customer/find/${cardId}`, null, getUnsecuredHeaders())
  const getCustomer = ({ ssn }) => api.get(`customer/${ssn}`, null, getUnsecuredHeaders())
  const createCustomer = (data) => api.put(`customer/create`, data, getUnsecuredHeaders())
  const updateCustomer = ({ ssn, ...data }) => api.post(`customer/${ssn}/update`, data, getUnsecuredHeaders())
  const enableCustomer = ({ ssn }) => api.put(`customer/${ssn}/enable`, null, getUnsecuredHeaders())
  const disableCustomer = ({ ssn }) => api.delete(`customer/${ssn}/disable`, null, getUnsecuredHeaders())
  const fetchCustomersActiveRentals = ({ ssn }) => api.get(`customer/${ssn}/rentals/active`, null, getUnsecuredHeaders())
  const extendCardValidity = ({ id }) => api.get(`customer/card/${id}/extend`, null, getUnsecuredHeaders())
  // loan
  const startLoan = (data) => api.post(`loan/start`, data, getUnsecuredHeaders())
  const closeLoan = ({ loanId }) => api.get(`loan/close/${loanId}`, null, getUnsecuredHeaders())
  // book
  const findBook = ({ isbn }) => api.get(`book/find/${isbn}`, null, getUnsecuredHeaders())
  const getBook = ({ isbn }) => api.get(`book/${isbn}`, null, getUnsecuredHeaders())
  const createBook = (data) => api.put(`book/create`, data, getUnsecuredHeaders())
  const updateBook = ({ isbn, ...data }) => api.post(`book/${isbn}/update`, data, getUnsecuredHeaders())
  const disableBook = ({ isbn }) => api.delete(`book/${isbn}/disable`, null, getUnsecuredHeaders())
  const enableBook = ({ isbn }) => api.put(`book/${isbn}/enable`, null, getUnsecuredHeaders())
  const changeStock = ({ isbn, ...data }) => api.post(`book/${isbn}/stock`, data, getUnsecuredHeaders())
  // library - librarian
  const loginLibrarian = (credentials) => api.post(`library/login`, credentials, getUnsecuredHeaders())
  const logoutLibrarian = () => api.get(`library/logout`, null, getUnsecuredHeaders())
  const getLibraryWishlist = () => api.get(`library/wishlist`, null, getUnsecuredHeaders())
  const addToLibraryWishlist = (data) => api.put(`library/wishlist/add`, data, getUnsecuredHeaders())
  const removeFromLibraryWishlist = ({ id }) => api.delete(`library/wishlist/remove/${id}`, null, getUnsecuredHeaders())
  const markItemAsAcquiredInLibraryWishlist = ({ id }) => api.get(`library/wishlist/acquired/${id}`, null, getUnsecuredHeaders())
  const getLibraryReservations = () => api.get(`library/reservations`, null, getUnsecuredHeaders())
  const markItemAsAcceptedInLibraryReservations = ({ id }) => api.get(`library/reservations/accepted/${id}`, null, getUnsecuredHeaders())
  const fetchOverDueLoans = ({ page }) => api.get(`library/loans/overdue/${page}`, null, getUnsecuredHeaders())
  // static
  const fetchCampuses = () => api.get(`library/static/campuses`, null, getUnsecuredHeaders())
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    uploadFile,
    downloadFile,

    searchInCatalog,
    // user
    loginCustomer,
    logoutCustomer,
    fetchHistory,
    getMyWishlist,
    addToMyWishlist,
    removeFromMyWishlist,
    requestFromWishlist,
    // customer - user from librarian point of view
    findCustomer,
    getCustomer,
    createCustomer,
    updateCustomer,
    enableCustomer,
    disableCustomer,
    extendCardValidity,
    fetchCustomersActiveRentals,
    // loan
    startLoan,
    closeLoan,
    // book
    findBook,
    getBook,
    createBook,
    updateBook,
    changeStock,
    disableBook,
    enableBook,
    // library
    loginLibrarian,
    logoutLibrarian,
    getLibraryWishlist,
    addToLibraryWishlist,
    removeFromLibraryWishlist,
    markItemAsAcquiredInLibraryWishlist,
    getLibraryReservations,
    markItemAsAcceptedInLibraryReservations,
    fetchOverDueLoans,
    // library - static
    fetchCampuses,
  }
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export const getApiBaseUrl = () => __DEV__ ? 'http://localhost:3000/' : '/'

export const securedAPI = create(getApiBaseUrl() + 'api')
export const unsecuredAPI = create(getApiBaseUrl())

export default securedAPI
