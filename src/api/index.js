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

  const createRequestFromPageDetails = ({ phrase, group, columns, pageSize, currentPage }) => ({
    offset: currentPage * pageSize,
    limit: pageSize,
    phrase: phrase,
    group: group,
    columns: columns,
  })
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

  const meFromToken = (tokenToValidate) => api.post('sessions/me', { token: tokenToValidate }, getUnsecuredHeaders())

  const createSession = (request) => api.post('sessions/create', request, getUnsecuredHeaders())
  const register = (request) => api.post('sessions/register', request, getUnsecuredHeaders())
  const checkLogin = (request) => api.post('sessions/checkLogin', request, getUnsecuredHeaders())

  const uploadFile = (request) => api.post('file/attache', request, getSecuredHeaders())
  const downloadFile = (id) => api.get(`file/download/${id}`, null, {
    ...getSecuredHeaders(),
    responseType: 'blob',
  })


  const searchInCatalog = (search) => api.post(`search`, createRequestFromPageDetails(search), getUnsecuredHeaders())
  // user
  const login = (credentials) => api.post(`user/login`, credentials, getUnsecuredHeaders())
  const logout = () => api.get(`user/logout`, null, getSecuredHeaders())
  const fetchHistory = (pageDetails) => api.post(`user/history`, createRequestFromPageDetails(pageDetails), getSecuredHeaders())
  const getMyWishlist = () => api.get(`user/wishlist`, null, getSecuredHeaders())
  const addToMyWishlist = ({ id }) => api.put(`user/wishlist/add/${id}`, null, getSecuredHeaders())
  const removeFromMyWishlist = ({ id }) => api.delete(`user/wishlist/remove/${id}`, null, getSecuredHeaders())
  const requestFromWishlist = ({ id }) => api.get(`user/wishlist/request/${id}`, null, getSecuredHeaders())
  // customer - user from librarian point of view
  const findCustomer = ({ cardId }) => api.get(`customer/${cardId}`, null, getSecuredHeaders())
  const createCustomer = (data) => api.put(`customer/create`, data, getSecuredHeaders())
  const updateCustomer = ({ cardId, ...data }) => api.post(`customer/${cardId}/update`, data, getSecuredHeaders())
  const fetchCustomersActiveRentals = ({ cardId }) => api.get(`customer/${cardId}/rentals/active`, null, getSecuredHeaders())
  const extendCardValidity = ({ cardId }) => api.get(`customer/${cardId}/card/extend`, null, getSecuredHeaders())
  // loan
  const startLoan = (data) => api.post(`loan/start`, data, getSecuredHeaders())
  const closeLoan = ({ loanId }) => api.get(`loan/close/${loanId}`, null, getSecuredHeaders())
  // book
  const findBook = ({ isbn }) => api.get(`book/${isbn}`, null, getSecuredHeaders())
  const createBook = (data) => api.put(`book/create`, data, getSecuredHeaders())
  const updateBook = ({ isbn, ...data }) => api.post(`book/${isbn}/update`, data, getSecuredHeaders())
  const changeStock = ({ isbn, ...data }) => api.post(`book/${isbn}/stock`, data, getSecuredHeaders())
  const deleteBook = ({ isbn }) => api.delete(`book/${isbn}/disable`, null, getSecuredHeaders())
  // library
  const addToLibraryWishlist = (data) => api.put(`library/wishlist/add`, data, getSecuredHeaders())

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
    meFromToken,
    createSession,
    register,
    checkLogin,
    downloadFile,

    // general
    searchInCatalog,
    // user
    login,
    logout,
    fetchHistory,
    getMyWishlist,
    addToMyWishlist,
    removeFromMyWishlist,
    requestFromWishlist,
    // customer - user from librarian point of view
    findCustomer,
    createCustomer,
    updateCustomer,
    extendCardValidity,
    fetchCustomersActiveRentals,
    // loan
    startLoan,
    closeLoan,
    // book
    findBook,
    createBook,
    updateBook,
    changeStock,
    deleteBook,
    // library
    addToLibraryWishlist,
  }
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export const getApiBaseUrl = () => __DEV__ ? 'http://localhost:3000/' : '/'

export const securedAPI = create(getApiBaseUrl() + 'api')
export const unsecuredAPI = create(getApiBaseUrl())

export default securedAPI
