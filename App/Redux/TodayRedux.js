import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTopRequest: null,
  getTopSuccess: ['payload'],
  getTopFailure: ['error'],
  getBusinessRequest: null,
  getBusinessSuccess: ['payload'],
  getBusinessFailure: ['error'],
  getTechnoRequest: null,
  getTechnoSuccess: ['payload'],
  getTechnoFailure: ['error'],
  getVideoRequest: null,
  getVideoSuccess: ['payload'],
  getVideoFailure: ['error']
})

export const TodayTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const DEFAULT_STATE = {
  data: undefined,
  fetching: undefined,
  payload: undefined,
  error: undefined
}

export const INITIAL_STATE = Immutable({
  getTopNews: DEFAULT_STATE,
  getBusiness: DEFAULT_STATE,
  getTech: DEFAULT_STATE,
  getVideo: DEFAULT_STATE,
  newsTopList: [],
  TechList: [],
  businessList: [],
  videoList: []
})

/* ------------- Selectors ------------- */

export const TodaySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const getTopRequest = state =>
  state.merge({ ...state, getTopNews: { fetching: true, payload: undefined } })

// successful api lookup
export const getTopSuccess = (state, {payload}) => {
  // const { data } = action
  return state.merge({ ...state, getTopNews: { fetching: false, error: undefined, payload }, newsTopList: payload })
}

// Something went wrong somewhere.
export const getTopFailure = (state) =>
  state.merge({ ...state, getTopNews : { fetching: false, error: true, payload: undefined } })

// request the data from an api
export const getBusinessRequest = state =>
  state.merge({ ...state, getBusiness: { fetching: true, payload: undefined } })

// successful api lookup
export const getBusinessSuccess = (state, {payload}) => {
  // const { data } = action
  return state.merge({ ...state, getBusiness: { fetching: false, error: undefined, payload }, businessList: payload })
}

// Something went wrong somewhere.
export const getBusinessFailure = (state) =>
  state.merge({ ...state, getBusiness : { fetching: false, error: true, payload: undefined } })

// request the data from an api
export const getTechnoRequest = state =>
  state.merge({ ...state, getTech: { fetching: true, payload: undefined } })

// successful api lookup
export const getTechnoSuccess = (state, {payload}) => {
  // const { data } = action
  return state.merge({ ...state, getTech: { fetching: false, error: undefined, payload }, TechList: payload })
}

// Something went wrong somewhere.
export const getTechnoFailure = (state) =>
  state.merge({ ...state, getTech : { fetching: false, error: true, payload: undefined } })

// request the data from an api
export const getVideoRequest = state =>
  state.merge({ ...state, getTech: { fetching: true, payload: undefined } })

// successful api lookup
export const getVideoSuccess = (state, {payload}) => {
  // const { data } = action
  return state.merge({ ...state, getTech: { fetching: false, error: undefined, payload }, videoList: payload })
}

// Something went wrong somewhere.
export const getVideoFailure = (state) =>
  state.merge({ ...state, getTech : { fetching: false, error: true, payload: undefined } })
  
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TOP_REQUEST]: getTopRequest,
  [Types.GET_TOP_SUCCESS]: getTopSuccess,
  [Types.GET_TOP_FAILURE]: getTopFailure,
  [Types.GET_BUSINESS_REQUEST]: getBusinessRequest,
  [Types.GET_BUSINESS_SUCCESS]: getBusinessSuccess,
  [Types.GET_BUSINESS_FAILURE]: getBusinessFailure,
  [Types.GET_TECHNO_REQUEST]: getTechnoRequest,
  [Types.GET_TECHNO_SUCCESS]: getTechnoSuccess,
  [Types.GET_TECHNO_FAILURE]: getTechnoFailure,
  [Types.GET_VIDEO_REQUEST]: getVideoRequest,
  [Types.GET_VIDEO_SUCCESS]: getVideoSuccess,
  [Types.GET_VIDEO_FAILURE]: getVideoFailure
})
