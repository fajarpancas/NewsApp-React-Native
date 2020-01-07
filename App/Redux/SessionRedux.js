import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveUserAuth: ['data'],
  removeSession: null,
  newsTopReducer: ['data', 'page'],
  newsBusinessReducer: ['data', 'page'],
  newsTechReducer: ['data', 'page'],
  newsVideoReducer: ['data', 'page'],
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: { isLoggedIn: false, data: null },
  newsTop: null,
  newsBusiness: null,
  newsTech: null,
  newsVideo: null
})

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getData: state => state.data,
  selectUserAuth: state => state.session.user,
  getLoginStatus: state => state.session.user.isLoggedIn,
  getLoginType: state => state.session.user.data.loginType
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

export const newsTopReducer = (state, { data, page }) => {
  let tempNews = state.newsTop;
  if (page === 1) {
    tempNews = [...data];
  } else {
    tempNews = tempNews.concat(data);
  }
  return state.merge({ ...state, newsTop: tempNews });
};

export const newsBusinessReducer = (state, { data, page }) => {
  let tempNews = state.newsBusiness;
  if (page === 1) {
    tempNews = [...data];
  } else {
    tempNews = tempNews.concat(data);
  }
  return state.merge({ ...state, newsBusiness: tempNews });
};

export const newsTechReducer = (state, { data, page }) => {
  let tempNews = state.newsTech;
  if (page === 1) {
    tempNews = [...data];
  } else {
    tempNews = tempNews.concat(data);
  }
  return state.merge({ ...state, newsTech: tempNews });
};

export const newsVideoReducer = (state, { data, page }) => {
  let tempNews = state.newsVideo;
  if (page === 1) {
    tempNews = [...data];
  } else {
    tempNews = tempNews.concat(data);
  }
  return state.merge({ ...state, newsVideo: tempNews });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER_AUTH]: saveUserAuth,
  [Types.REMOVE_SESSION]: removeSession,
  [Types.NEWS_TOP_REDUCER]: newsTopReducer,
  [Types.NEWS_BUSINESS_REDUCER]: newsBusinessReducer,
  [Types.NEWS_TECH_REDUCER]: newsTechReducer,
  [Types.NEWS_VIDEO_REDUCER]: newsVideoReducer

})
