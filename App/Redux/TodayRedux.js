import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTopRequest: null,
  getTopSuccess: ['payload'],
  getTopFailure: ['error']
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
  newsTopList: []
})

/* ------------- Selectors ------------- */

export const TodaySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
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


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TOP_REQUEST]: getTopRequest,
  [Types.GET_TOP_SUCCESS]: getTopSuccess,
  [Types.GET_TOP_FAILURE]: getTopFailure
})
