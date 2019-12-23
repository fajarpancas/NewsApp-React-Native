import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { TodayTypes } from '../Redux/TodayRedux'
import { LoginTypes } from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getToday, getBusinessToday, getTechToday, getVideoToday } from './TodaySagas'
import { login } from './LoginSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(TodayTypes.GET_TOP_REQUEST, getToday, api),
    takeLatest(TodayTypes.GET_BUSINESS_REQUEST, getBusinessToday, api),
    takeLatest(TodayTypes.GET_TECHNO_REQUEST, getTechToday, api),
    takeLatest(TodayTypes.GET_VIDEO_REQUEST, getVideoToday, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login)
  ])
}
