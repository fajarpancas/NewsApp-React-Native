/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import TodayActions from '../Redux/TodayRedux'
// import { TodaySelectors } from '../Redux/TodayRedux'

export function * getToday (api) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const response = yield call(api.getToday)

  // success?
  // console.tron.log("tes : ",response)
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(TodayActions.getTopSuccess(response.data))
  } else {
    yield put(TodayActions.getTopFailure())
  }
}

export function * getBusinessToday (api) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const response = yield call(api.getBusinessToday)

  // success?
  // console.tron.log("tes : ",response)
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(TodayActions.getBusinessSuccess(response.data))
  } else {
    yield put(TodayActions.getBusinessFailure())
  }
}

export function * getTechToday (api) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const response = yield call(api.getTechToday)

  // success?
  // console.tron.log("tes : ",response)
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(TodayActions.getTechnoSuccess(response.data))
  } else {
    yield put(TodayActions.getTechnoFailure())
  }
}

export function * getVideoToday (api) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const response = yield call(api.getVideoToday)

  // success?
  // console.tron.log("tes : ",response)
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(TodayActions.getVideoSuccess(response.data))
  } else {
    yield put(TodayActions.getVideoFailure())
  }
}

export function* setHeader(action) {
  // yield put(SessionActions.removeSession());
  // NavigationService.navigate('Auth')
}