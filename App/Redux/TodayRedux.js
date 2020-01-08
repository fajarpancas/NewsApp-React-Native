import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
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
  TechList: [],
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
  return state.merge({ ...state, getTech: { fetching: false, error: undefined, payload }, TechList: parseTechnoList })
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
  console.tron.log('reset : ', data.reset)
  if(data.reset === true){
    return state.merge({ ...state, getList: { fetching: true, data, error: undefined }, list: [] })
    // state.list = []
  }else{
    return state.merge({ ...state, getList: { fetching: true, data, error: undefined } })
  }
}

export const getListSuccess = (state, { payload }) => {
  // alert(JSON.stringify(payload.articles))
  let newList = [...state.list]
  let temp = newList.concat(payload.articles)
  // newList = mergeAndReplace(newList, payload.articles)
  console.tron.log(JSON.stringify(`length data :  ${temp.length}`))
  return state.merge({ ...state, getList: { fetching: false, error: undefined, payload }, list: temp })
}

export const getListFailure = (state) => {
  return state.merge({ ...state, getList: { ...state.gerList, fetching: false, error: true, payload: undefined } })
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
  console.log(state.TechList.length)
  for (let i = 0; i < state.TechList.length; i++) {
    console.log(state.TechList[i].title.length, "aaaa : ", payload.title.length)
    if (state.TechList[i].title.length === payload.title.length) {
      console.log("true", i)
      tempData.push({
        source: {
          id: state.TechList[i].id,
          name: state.TechList[i].name
        },
        author: state.TechList[i].author,
        title: state.TechList[i].title,
        description: state.TechList[i].description,
        url: state.TechList[i].url,
        urlToImage: state.TechList[i].urlToImage,
        publishedAt: state.TechList[i].publishedAt,
        content: state.TechList[i].content,
        newsType: state.TechList[i].newsType,
        viewCount: state.TechList[i].viewCount + 1,
        shareCount: state.TechList[i].shareCount
      });
    } else {
      console.log("false", i)

      tempData.push({
        source: {
          id: state.TechList[i].id,
          name: state.TechList[i].name
        },
        author: state.TechList[i].author,
        title: state.TechList[i].title,
        description: state.TechList[i].description,
        url: state.TechList[i].url,
        urlToImage: state.TechList[i].urlToImage,
        publishedAt: state.TechList[i].publishedAt,
        content: state.TechList[i].content,
        newsType: state.TechList[i].newsType,
        viewCount: state.TechList[i].viewCount,
        shareCount: state.TechList[i].shareCount
      });
    }
  }
  return state.merge({ ...state, getTech: { fetching: false, error: undefined, payload }, TechList: tempData })
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
