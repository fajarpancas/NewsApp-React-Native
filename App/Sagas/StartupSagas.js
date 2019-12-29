import { put, select } from 'redux-saga/effects'
import SessionActions, { SessionSelectors } from '../Redux/SessionRedux'
import { is } from 'ramda'
import NavigationServices from '../Services/NavigationServices'

// exported to make available for tests
// export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  const isLogin = yield select(SessionSelectors.getLoginStatus)
  if (isLogin) {
    NavigationServices.navigate('Main')
  } else {
    NavigationServices.navigate('Auth')
  }
}
