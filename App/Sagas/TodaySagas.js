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

import { call, put, select } from 'redux-saga/effects'
import TodayActions from '../Redux/TodayRedux'
import SessionActions from '../Redux/SessionRedux'
import { TodaySelectors } from '../Redux/TodayRedux'
import NavigationService from '../Services/NavigationServices'

// import { TodaySelectors } from '../Redux/TodayRedux'

export function* getToday(api, action) {
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const { page } = action.data
  const response = yield call(api.getList, { page })
  if (response.ok) {
    yield put(TodayActions.getTopSuccess(response.data))
  } else {
    yield put(TodayActions.getTopFailure())
  }
}

export function* getBusinessToday(api, action) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const { page } = action.data
  const response = yield call(api.getListBusiness, { page })

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

export function* getTechToday(api, action) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const { page } = action.data
  const response = yield call(api.getListTect, page)

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

export function* getVideoToday(api, action) {
  // const { data } = action
  // get current data from Store
  // const currentData = yield select(TodaySelectors.getData)
  // make the call to the api
  const { page } = action.data
  const response = yield call(api.getListVideo, page)

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

// export function* getListSaga(api, action) {
//   const { page, newsType } = action.data
//   if (newsType === 'top') {
//     const response = yield call(api.getList, { page })
//     if (response.ok) {
//       yield put(TodayActions.getListSuccess(response.data))
//     } else {
//       yield put(TodayActions.getListFailure())
//     }
//   }
//   if (newsType === 'business') {
//     const response = yield call(api.getListBusiness, { page })
//     if (response.ok) {
//       yield put(TodayActions.getListSuccess(response.data))
//     } else {
//       yield put(TodayActions.getListFailure())
//     }
//   }
//   if (newsType === 'video') {
//     const response = yield call(api.getListVideo, { page })
//     if (response.ok) {
//       yield put(TodayActions.getListSuccess(response.data))
//     } else {
//       yield put(TodayActions.getListFailure())
//     }
//   }
//   if (newsType === 'tech') {
//     const response = yield call(api.getListTech, { page })
//     if (response.ok) {
//       yield put(TodayActions.getListSuccess(response.data))
//     } else {
//       yield put(TodayActions.getListFailure())
//     }
//   }
// }

export function* setHeader(action) {
  const { payload } = action
  // const data = yield select(TodaySelectors.getData)

  // alert(JSON.stringify(payload))
  if (payload.newsType === 'Top News') {
    NavigationService.navigate('DetailTopScreen')
    yield put(TodayActions.setViewDataTop(payload))
  } else if (payload.newsType === 'Business') {
    NavigationService.navigate('DetailBusinessScreen')
    yield put(TodayActions.setViewDataBusiness(payload))
  } else if (payload.newsType === 'Technology') {
    NavigationService.navigate('DetailTechScreen')
    yield put(TodayActions.setViewDataVideo(payload))
  } else if (payload.newsType === 'Video') {
    NavigationService.navigate('DetailVideoScreen')
    yield put(TodayActions.setViewDataVideo(payload))
  } 
  // yield put(TodayActions.setViewDataVideo(payload))

}