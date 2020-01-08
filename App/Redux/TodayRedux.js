import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { mergeAndReplace } from '../Lib/Helper'
// import mergeAndReplace from '../Transforms/Array'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getListRequest: ['data'],
  getListSuccess: ['payload'],
  getListFailure: ['error'],
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
  getVideoFailure: ['error'],
  setHeader: ['payload'],
  setViewDataTop: ['payload'],
  setViewDataBusiness: ['payload'],
  setViewDataTechnology: ['payload'],
  setViewDataVideo: ['payload']
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
  techList: [],
  businessList: [],
  videoList: [],
  header: DEFAULT_STATE,
  getList: DEFAULT_STATE,
  list: []

})

/* ------------- Selectors ------------- */

export const TodaySelectors = {
  getData: state => state.news.header,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const getTopRequest = state =>
  state.merge({ ...state, getTopNews: { fetching: true, payload: undefined } })

// successful api lookup
export const getTopSuccess = (state, { payload }) => {
  // const { articles } = payload
  // alert(JSON.stringify(articles))
  const parseTopList = payload.articles.map((item) => { return { ...item, newsType: 'Top News', viewCount: 0, shareCount: 0 } })
  return state.merge({ ...state, getTopNews: { fetching: false, error: undefined, payload }, newsTopList: parseTopList })
}

// Something went wrong somewhere.
export const getTopFailure = (state) =>
  state.merge({ ...state, getTopNews: { fetching: false, error: true, payload: undefined } })

// request the data from an api
export const getBusinessRequest = state =>
  state.merge({ ...state, getBusiness: { fetching: true, payload: undefined } })

// successful api lookup
export const getBusinessSuccess = (state, { payload }) => {
  // const { data } = action
  // const { articles } = payload
  const parseBusinessList = payload.articles.map((item) => { return { ...item, newsType: 'Business', viewCount: 0, shareCount: 0 } })
  return state.merge({ ...state, getBusiness: { fetching: false, error: undefined, payload }, businessList: parseBusinessList })
}

// Something went wrong somewhere.
export const getBusinessFailure = (state) =>
  state.merge({ ...state, getBusiness: { fetching: false, error: true, payload: undefined } })

// request the data from an api
export const getTechnoRequest = state =>
  state.merge({ ...state, getTech: { fetching: true, payload: undefined } })

// successful api lookup
export const getTechnoSuccess = (state, { payload }) => {
  // const { data } = action
  const parseTechnoList = payload.articles.map((item) => { return { ...item, newsType: 'Technology', viewCount: 10, shareCount: 0 } })
  return state.merge({ ...state, getTech: { fetching: false, error: undefined, payload }, techList: parseTechnoList })
}

// Something went wrong somewhere.
export const getTechnoFailure = (state) =>
  state.merge({ ...state, getTech: { fetching: false, error: true, payload: undefined } })

// request the data from an api
export const getVideoRequest = state =>
  state.merge({ ...state, getVideo: { fetching: true, payload: undefined } })

// successful api lookup
export const getVideoSuccess = (state, { payload }) => {
  // const { data } = action
  // const { articles } = payload

  const parseVideoList = payload.articles.map((item) => { return { ...item, newsType: 'Video', viewCount: 0, shareCount: 0 } })
  return state.merge({ ...state, getVideo: { fetching: false, error: undefined, payload }, videoList: parseVideoList })
}

// Something went wrong somewhere.
export const getVideoFailure = (state) =>
  state.merge({ ...state, getVideo: { fetching: false, error: true, payload: undefined } })

export const getListRequest = (state, { data }) => {
  return state.merge({ ...state, getList: { ...state.getList, fetching: true, data, error: undefined } })
}

export const getListSuccess = (state, { payload }) => {
  const { data } = state.getList
  let newList = [...state.list]
  if (data.page === 1) {
    newList = payload.articles
  } else {
    newList = mergeAndReplace(newList, payload.articles, 'url', 'publishedAt', 'desc', true)
  }
  return state.merge({ ...state, getList: { ...state.getList, fetching: false, error: undefined, payload }, list: newList })
}

export const getListFailure = (state) => {
  return state.merge({ ...state, getList: { ...state.gerList, fetching: false, error: true } })
}

export const setHeader = (state, { payload }) => {
  // alert(`hey: ${payload}`)
  const detail = {
    source: {
      id: payload.id,
      name: payload.name
    },
    author: payload.author,
    title: payload.title,
    description: payload.description,
    url: payload.url,
    urlToImage: payload.urlToImage,
    publishedAt: payload.publishedAt,
    content: payload.content,
    newsType: payload.newsType,
    viewCount: payload.viewCount + 1,
    shareCount: payload.shareCount
  }
  return state.merge({ ...state, header: detail })
}

export const setViewDataTop = (state, { payload }) => {
  const tempData = [];
  console.log(state.newsTopList.length)
  for (let i = 0; i < state.newsTopList.length; i++) {
    console.log(state.newsTopList[i].title.length, "aaaa : ", payload.title.length)
    if (state.newsTopList[i].title.length === payload.title.length) {
      console.log("true", i)
      tempData.push({
        source: {
          id: state.newsTopList[i].id,
          name: state.newsTopList[i].name
        },
        author: state.newsTopList[i].author,
        title: state.newsTopList[i].title,
        description: state.newsTopList[i].description,
        url: state.newsTopList[i].url,
        urlToImage: state.newsTopList[i].urlToImage,
        publishedAt: state.newsTopList[i].publishedAt,
        content: state.newsTopList[i].content,
        newsType: state.newsTopList[i].newsType,
        viewCount: state.newsTopList[i].viewCount + 1,
        shareCount: state.newsTopList[i].shareCount
      });
    } else {
      console.log("false", i)

      tempData.push({
        source: {
          id: state.newsTopList[i].id,
          name: state.newsTopList[i].name
        },
        author: state.newsTopList[i].author,
        title: state.newsTopList[i].title,
        description: state.newsTopList[i].description,
        url: state.newsTopList[i].url,
        urlToImage: state.newsTopList[i].urlToImage,
        publishedAt: state.newsTopList[i].publishedAt,
        content: state.newsTopList[i].content,
        newsType: state.newsTopList[i].newsType,
        viewCount: state.newsTopList[i].viewCount,
        shareCount: state.newsTopList[i].shareCount
      });
    }
  }
  return state.merge({ ...state, getTopNews: { fetching: false, error: undefined, payload }, newsTopList: tempData })
}

export const setViewDataBusiness = (state, { payload }) => {
  const tempData = [];
  console.log(state.businessList.length)
  for (let i = 0; i < state.businessList.length; i++) {
    console.log(state.businessList[i].title.length, "aaaa : ", payload.title.length)
    if (state.businessList[i].title.length === payload.title.length) {
      console.log("true", i)
      tempData.push({
        source: {
          id: state.businessList[i].id,
          name: state.businessList[i].name
        },
        author: state.businessList[i].author,
        title: state.businessList[i].title,
        description: state.businessList[i].description,
        url: state.businessList[i].url,
        urlToImage: state.businessList[i].urlToImage,
        publishedAt: state.businessList[i].publishedAt,
        content: state.businessList[i].content,
        newsType: state.businessList[i].newsType,
        viewCount: state.businessList[i].viewCount + 1,
        shareCount: state.businessList[i].shareCount
      });
    } else {
      console.log("false", i)

      tempData.push({
        source: {
          id: state.businessList[i].id,
          name: state.businessList[i].name
        },
        author: state.businessList[i].author,
        title: state.businessList[i].title,
        description: state.businessList[i].description,
        url: state.businessList[i].url,
        urlToImage: state.businessList[i].urlToImage,
        publishedAt: state.businessList[i].publishedAt,
        content: state.businessList[i].content,
        newsType: state.businessList[i].newsType,
        viewCount: state.businessList[i].viewCount,
        shareCount: state.businessList[i].shareCount
      });
    }
  }
  return state.merge({ ...state, getBusiness: { fetching: false, error: undefined, payload }, businessList: tempData })
}

export const setViewDataTechnology = (state, { payload }) => {
  const tempData = [];
  console.log(state.techList.length)
  for (let i = 0; i < state.techList.length; i++) {
    console.log(state.techList[i].title.length, "aaaa : ", payload.title.length)
    if (state.techList[i].title.length === payload.title.length) {
      console.log("true", i)
      tempData.push({
        source: {
          id: state.techList[i].id,
          name: state.techList[i].name
        },
        author: state.techList[i].author,
        title: state.techList[i].title,
        description: state.techList[i].description,
        url: state.techList[i].url,
        urlToImage: state.techList[i].urlToImage,
        publishedAt: state.techList[i].publishedAt,
        content: state.techList[i].content,
        newsType: state.techList[i].newsType,
        viewCount: state.techList[i].viewCount + 1,
        shareCount: state.techList[i].shareCount
      });
    } else {
      console.log("false", i)

      tempData.push({
        source: {
          id: state.techList[i].id,
          name: state.techList[i].name
        },
        author: state.techList[i].author,
        title: state.techList[i].title,
        description: state.techList[i].description,
        url: state.techList[i].url,
        urlToImage: state.techList[i].urlToImage,
        publishedAt: state.techList[i].publishedAt,
        content: state.techList[i].content,
        newsType: state.techList[i].newsType,
        viewCount: state.techList[i].viewCount,
        shareCount: state.techList[i].shareCount
      });
    }
  }
  return state.merge({ ...state, getTech: { fetching: false, error: undefined, payload }, techList: tempData })
}

export const setViewDataVideo = (state, { payload }) => {
  var tempData = [];
  console.log(state.videoList.length)
  for (let i = 0; i < state.videoList.length; i++) {
    console.log(state.videoList[i].title.length, "aaaa : ", payload.title.length)
    if (state.videoList[i].title.length === payload.title.length) {
      console.log("true", i)
      tempData.push({
        source: {
          id: state.videoList[i].id,
          name: state.videoList[i].name
        },
        author: state.videoList[i].author,
        title: state.videoList[i].title,
        description: state.videoList[i].description,
        url: state.videoList[i].url,
        urlToImage: state.videoList[i].urlToImage,
        publishedAt: state.videoList[i].publishedAt,
        content: state.videoList[i].content,
        newsType: state.videoList[i].newsType,
        viewCount: state.videoList[i].viewCount + 1,
        shareCount: state.videoList[i].shareCount
      });
    } else {
      console.log("false", i)

      tempData.push({
        source: {
          id: state.videoList[i].id,
          name: state.videoList[i].name
        },
        author: state.videoList[i].author,
        title: state.videoList[i].title,
        description: state.videoList[i].description,
        url: state.videoList[i].url,
        urlToImage: state.videoList[i].urlToImage,
        publishedAt: state.videoList[i].publishedAt,
        content: state.videoList[i].content,
        newsType: state.videoList[i].newsType,
        viewCount: state.videoList[i].viewCount,
        shareCount: state.videoList[i].shareCount
      });
    }
  }
  return state.merge({ ...state, getVideo: { fetching: false, error: undefined, payload }, videoList: tempData })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_REQUEST]: getListRequest,
  [Types.GET_LIST_SUCCESS]: getListSuccess,
  [Types.GET_LIST_FAILURE]: getListFailure,
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
  [Types.GET_VIDEO_FAILURE]: getVideoFailure,
  [Types.SET_HEADER]: setHeader,
  [Types.SET_VIEW_DATA_TOP]: setViewDataTop,
  [Types.SET_VIEW_DATA_BUSINESS]: setViewDataBusiness,
  [Types.SET_VIEW_DATA_TECHNOLOGY]: setViewDataTechnology,
  [Types.SET_VIEW_DATA_VIDEO]: setViewDataVideo
})
