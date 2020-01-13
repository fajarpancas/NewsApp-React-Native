// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { Alert } from 'react-native'

// our "constructor"
const create = (baseURL = 'https://newsapi.org/v2/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'X-Api-Key': '4fb5d5505596460fba24aa2de7c560ec',
    },
    // 10 second timeout...
    timeout: 25000
  })

  let showErrorAler = false

  api.addMonitor(response => {
    const { status, config, data } = response
    if (status.toString().charAt(0) !== '2') {
      const { message } = data
      if (!showErrorAler) {
        showErrorAler = true

        Alert.alert(
          'Error',
          message,
          [
            { text: 'OK', onPress: () => { showErrorAler = false } },
          ],
          { cancelable: false }
        )
      }
    }
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
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', { q: username })
  const getListBusiness = (params) => api.get('top-headlines?sources=techcrunch', params)
  const getList = (params) => api.get('top-headlines?country=us&category=business', params)
  const getListVideo = (params) => api.get('everything?domains=wsj.com', params)
  const getListTech = (params) => api.get('everything?domains=wsj.com', params)

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
    getList,
    getListBusiness,
    getListTech,
    getListVideo
  }
}

// let's return back our create method as the default.
export default {
  create
}
