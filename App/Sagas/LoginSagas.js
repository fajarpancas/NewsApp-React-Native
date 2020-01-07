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
import LoginActions from '../Redux/LoginRedux'
import SessionActions from '../Redux/SessionRedux'
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import NavigationService from '../Services/NavigationServices'
// import { LoginSelectors } from '../Redux/LoginRedux'

export function * getLogin (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(LoginSelectors.getData)
  // make the call to the api
  const response = yield call(api.getlogin, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LoginActions.loginSuccess(response.data))
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * login(action) {

  const { data } = action
  const { email, password } = data
  
  yield firebase.database().goOnline()
  try {
    const response = yield firebase.auth().signInWithEmailAndPassword(email, password)
    if (response && response.user.email == email) {
      // set actions when login success
      const dataLogin = {
        loginType: 'firebase',
        email: response.user.email,
        uid: response.user.uid
      }
      yield put(SessionActions.saveUserAuth(dataLogin));
      yield put(LoginActions.loginSuccess(dataLogin))
      NavigationService.navigate('Main')
      }
    }
    catch (error) {
        alert(`${error}`)
        yield put(LoginActions.loginFailure())
      // set actions when got error
    }
}

export function * loginFacebook(action) {
  const { data } = action
  const { token, name } = data
  if(token !== undefined){
    yield put(SessionActions.saveUserAuth(data));
    NavigationService.navigate('Main')
  }
  
}

export function * loginGoogle(action) {
  const { data } = action
  const { id } = data
  if(id !== undefined){
    yield put(SessionActions.saveUserAuth(data));
    NavigationService.navigate('Main')
  } 
}

export function * register(action) {

  const { data } = action
  const { email, password } = data
  const success = "Sign Up Success"
  
  yield firebase.database().goOnline()
  try {
    const response = yield firebase.auth().createUserWithEmailAndPassword(email, password)
    if (response) {
      // set actions when login success
      alert(`${success}`)
      yield put(LoginActions.signUpSuccess(response.data))
      NavigationService.navigate('Auth')
      }
    }
    catch (error) {
        alert(`${error}`)
        yield put(LoginActions.signUpFailure())
      // set actions when got error
    }
}

export function* logout(action) {
  yield put(SessionActions.removeSession());
  NavigationService.navigate('Auth')
}
  