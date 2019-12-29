import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveUserAuth: ['data'],
  removeSession: null
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: { isLoggedIn: false, data: null },
})

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getData: state => state.data,
  selectUserAuth: state => state.session.user,
  getLoginStatus: state => state.session.user.isLoggedIn
}

/* ------------- Reducers ------------- */

export const saveUserAuth = (state, { data }) => {
  return state.merge({ ...state, user: { isLoggedIn: true, data } });
};

export const removeSession = state => {
  return state.merge({
    ...state,
    user: { isLoggedIn: false, data: null }
  });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER_AUTH]: saveUserAuth,
  [Types.REMOVE_SESSION]: removeSession
})
