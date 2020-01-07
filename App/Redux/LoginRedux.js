import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: null,
  signUpRequest: ['data'],
  signUpSuccess: ['payload'],
  signUpFailure: null,
  facebookLoginRequest: ['data'],
  facebookLoginSuccess: ['payload'],
  facebookLoginFailure: ['error'],
  googleLoginRequest: ['data'],
  googleLoginSuccess: ['payload'],
  googleLoginFailure: ['error'],
  logout: ['callback']
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
  signUp: DEFAULT_STATE,
  facebookLogin: DEFAULT_STATE,
  googleLogin: DEFAULT_STATE
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
  return state.merge({ ...state, login: {fetching: false, error: null, payload} })
}

// Something went wrong somewhere.
export const loginFailure = state =>
  state.merge({ ...state, login : {fetching: false, error: true, payload: null} })

export const signUpRequest = (state, { data }) => {
  // alert(JSON.stringify(data))
  return state.merge({ ...state, signUp: {fetching: true, data, payload: null} })
}

// successful api lookup
export const signUpSuccess = (state, {payload}) => {
  // const { payload } = action
  return state.merge({ ...state, signUp: {fetching: false, error: null, payload} })
}

// Something went wrong somewhere.
export const signUpFailure = state =>
  state.merge({ ...state, signUp : {fetching: false, error: true, payload: null} })
    
// request the data from an api
export const facebookLoginRequest = (state, { data }) => {
  // alert(JSON.stringify(data))
  return state.merge({ ...state, facebookLogin: {fetching: true, data, payload: null} })
}

// successful api lookup
export const facebookLoginSuccess = (state, {payload}) => {
  // const { payload } = action
  return state.merge({ ...state, facebookLogin: {fetching: false, error: null, payload} })
}

// Something went wrong somewhere.
export const facebookLoginFailure = state =>
  state.merge({ ...state, facebookLogin: {fetching: false, error: true, payload: null} })

export const googleLoginRequest = (state, { data }) => {
  // alert(JSON.stringify(data))
  return state.merge({ ...state, googleLogin: {fetching: true, data, payload: null} })
}

// successful api lookup
export const googleLoginSuccess = (state, {payload}) => {
  // const { payload } = action
  return state.merge({ ...state, googleLogin: {fetching: false, error: null, payload} })
}

// Something went wrong somewhere.
export const googleLoginFailure = state =>
  state.merge({ ...state, googleLogin: {fetching: false, error: true, payload: null} })

export const logout = state => {
    return state.merge({ ...state, ...INITIAL_STATE });
  };
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,
  [Types.FACEBOOK_LOGIN_REQUEST]: facebookLoginRequest,
  [Types.FACEBOOK_LOGIN_SUCCESS]: facebookLoginSuccess,
  [Types.FACEBOOK_LOGIN_FAILURE]: facebookLoginFailure,
  [Types.GOOGLE_LOGIN_REQUEST]: googleLoginRequest,
  [Types.GOOGLE_LOGIN_SUCCESS]: googleLoginSuccess,
  [Types.GOOGLE_LOGIN_FAILURE]: googleLoginFailure,
  [Types.LOGOUT]: logout
})
