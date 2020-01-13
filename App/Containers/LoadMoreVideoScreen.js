import React, { Component } from 'react'
import { ActivityIndicator, RefreshControl, View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TodayData from '../Redux/TodayRedux'
import { Images } from '../Themes'
import _ from 'lodash'
import Fonts from '../Themes/Fonts'

// Styles
import styles from './Styles/TodayScreenStyle'

class LoadMoreVideoScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    getTech: PropTypes.func,
    setHeader: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.fetchFunction = this.fetchFunction.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadMore = _.debounce(this.onLoadMore.bind(this), 5000)
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: () => <Text></Text>,
    headerTitle: () => <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: Fonts.type.SPFBold, fontSize: Fonts.size.input }}>
      Video</Text>,
  })
  
  componentDidMount() {
    this.onRefresh()
  }

  fetchFunction(page, reset) {
    const data = {
      page: page,
      reset: reset,
    }
    this.props.getTech(data)
  }

  onRefresh() {
    this.page = 1
    this.fetchFunction(this.page)
  }

  onLoadMore() {
    this.page = this.page + 1
    this.fetchFunction(this.page, false)
  }

  onPressDetail = (item) => {
    const detail = {
      source: {
        id: item.id,
        name: item.name
      },
      author: item.author,
      title: item.title,
      description: item.description,
      url: item.url,
      urlToImage: item.urlToImage,
      publishedAt: item.publishedAt,
      content: item.content,
      newsType: 'Video',
      viewCount: item.viewCount,
      shareCount: item.shareCount
    }
    this.props.setHeader(detail)
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.onPressDetail(item)}>
        <View style={styles.container}>
          <View style={styles.boxTitleTopNews}>
            {item.title && item.title.length > 55 ?
              <Text style={styles.title}>{item.title.slice(0, 55)}..</Text>
              :
              <Text style={styles.title}>{item.title} </Text>
            }
          </View>
          <View style={styles.boxImageTopNews}>
            <Image source={{ uri: item.urlToImage }} style={styles.boxImageTopNews} />
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.uploaded}>
            <Text style={styles.timeText}>{Moment(item.publishedAt).format('DD MMMM YYYY')}</Text>
          </View>
          <View style={styles.view}>
            <Image source={Images.eye} style={styles.shareIcon} />
            <Text style={styles.total}>{item.viewCount}</Text>
          </View>
          <View style={styles.shared}>
            <Image source={Images.share} style={styles.shareIcon} />
            <Text style={styles.total}>{item.shareCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderLoading = () => {
    const { getTechData, techList } = this.props
    const { fetching, payload, error } = getTechData

    if (!fetching && payload) {
      const { totalResults } = payload
      if (techList.length >= totalResults) {
        return <Text>No More Data</Text>
      }
    }

    if (error !== true) {
      return <ActivityIndicator />
    }
    return null
  }

  render() {
    const { getTechData, techList } = this.props
    const { fetching } = getTechData

    return (
      <View style={{ marginTop: 15 }}>
        <FlatList
          data={techList}
          renderItem={this.renderItem}
          ListEmptyComponent={() => {
            return (
              <View><Text>Empty Data</Text></View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderLoading}
          refreshing={fetching && this.page === 1 ? true : false}
          onRefresh={this.onRefresh}
          onEndReached={this.onLoadMore}
        />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    getTechData: state.news.getVideo,
    techList: state.news.videoList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHeader: data => dispatch(TodayData.setHeader(data)),
    getTech: data => dispatch(TodayData.getVideoRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreVideoScreen)
