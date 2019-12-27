import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: null,
  facebookLoginRequest: ['data'],
  facebookLoginSuccess: ['payload'],
  facebookLoginFailure: ['error']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const DEFAULT_STATE = {
  data: undefined,
  fetching: undefined,
  payload: undefined,
  error: undefined
}

export const INITIAL_STATE = Immutable({
  login: DEFAULT_STATE,
  facebookLogin: DEFAULT_STATE
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const loginRequest = (state, { data }) => {
  // alert(JSON.stringify(data))
  return state.merge({ ...state, login: {fetching: true, data, payload: null} })
}

// successful api lookup
export const loginSuccess = (state, {payload}) => {
  // const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const loginFailure = state =>
  state.merge({ fetching: false, error: true, payload: null })

// request the data from an api
export const facebookLoginRequest = (state) => {
  // alert(JSON.stringify(data))
  return state.merge({ ...state, facebookLogin: {fetching: true, payload: null} })
}

// successful api lookup
export const facebookLoginSuccess = (state, {payload}) => {
  // const { payload } = action
  return state.merge({ ...state, facebookLogin: {fetching: false, error: null, payload} })
}

// Something went wrong somewhere.
export const facebookLoginFailure = state =>
  state.merge({ ...state, facebookLogin: {fetching: false, error: true, payload: null} })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.FACEBOOK_LOGIN_REQUEST]: facebookLoginRequest,
  [Types.FACEBOOK_LOGIN_SUCCESS]: facebookLoginSuccess,
  [Types.FACEBOOK_LOGIN_FAILURE]: facebookLoginFailure
})
