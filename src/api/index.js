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

  const createRequestFromPageDetails = ({ sort, pageSize, currentPage, search }) => ({
    offset: currentPage * pageSize,
    limit: pageSize,
    sort: sort,
    search: search,
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
  const removeDocumentUpload = (id) => api.delete(`documentUpload/remove/${id}`, null, getSecuredHeaders())
  const processFile = (action) => api.post(`documentUpload/processFile/${action.id}`, { ...action.data }, getSecuredHeaders())

  const meFromToken = (tokenToValidate) => api.post('sessions/me', { token: tokenToValidate }, getUnsecuredHeaders())

  const createSession = (request) => api.post('sessions/create', request, getUnsecuredHeaders())
  const register = (request) => api.post('sessions/register', request, getUnsecuredHeaders())
  const checkLogin = (request) => api.post('sessions/checkLogin', request, getUnsecuredHeaders())

  // const uploadFile = (request) => api.post('file/attache', request, getSecuredHeaders()) // sets file custom title -> with it to be retrieved
  const uploadFileTitle = (request) => api.post('file/attacheTitle', request, getSecuredHeaders())
  const fileExistsByUserAndTitle = (title) => api.get(`file/existsByUserAndTitle/${title}`, null, getSecuredHeaders())
  const downloadFile = (id) => api.get(`file/download/${id}`, null, {
    ...getSecuredHeaders(),
    responseType: 'blob',
  })
  const generateApiKey = () => api.get(`users/getApiKey`, null, getSecuredHeaders())



  const searchInCatalog = (search) => api.post(`search`, search, getUnsecuredHeaders())
  const fetchHistory = (pageDetails) => api.post(`user/history/tableData`, createRequestFromPageDetails(pageDetails), getSecuredHeaders())
  const getMyWishlist = () => api.get(`user/wishlist`, null, getSecuredHeaders())
  const removeFromMyWishlist = ({ id }) => api.delete(`user/wishlist/remove/${id}`, null, getSecuredHeaders())
  const addToMyWishlist = ({ id }) => api.put(`user/wishlist/add/${id}`, null, getSecuredHeaders())
  const requestFromWishlist = ({ id }) => api.put(`user/wishlist/request/${id}`, null, getSecuredHeaders())
  const createCustomer = (data) => api.put(`customer/create`, data, getSecuredHeaders())
  const updateCustomer = ({ cardId }) => api.get(`customer/update/${cardId}`, null, getSecuredHeaders())
  const fetchCustomersActiveRentals = () => api.get(`customer/rentals/active`, null, getSecuredHeaders())
  const findCustomer = ({ cardId }) => api.get(`customer/${cardId}`, null, getSecuredHeaders())
  const extendCardValidity = ({ cardId }) => api.get(`customer/extend/${cardId}`, null, getSecuredHeaders())
  const closeLoan = ({ loanId }) => api.get(`loan/close/${loanId}`, null, getSecuredHeaders())
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
    removeDocumentUpload,
    processFile,
    meFromToken,
    createSession,
    register,
    checkLogin,
    downloadFile,

    uploadFileTitle,
    fileExistsByUserAndTitle,
    generateApiKey,

    // new
    getMyWishlist,
    searchInCatalog,
    fetchHistory,
    removeFromMyWishlist,
    addToMyWishlist,
    requestFromWishlist,
    createCustomer,
    updateCustomer,
    findCustomer,
    extendCardValidity,
    fetchCustomersActiveRentals,
    closeLoan,
  }
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export const getApiBaseUrl = () => __DEV__ ? 'http://localhost:3000/' : '/'

export const securedAPI = create(getApiBaseUrl() + 'api')
export const unsecuredAPI = create(getApiBaseUrl())

export default securedAPI
