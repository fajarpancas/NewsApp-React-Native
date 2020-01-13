import React, { Component, Fragment, useEffect } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import TodayData from '../Redux/TodayRedux'
import PropTypes from 'prop-types'
import Moment from 'moment'
import firebase from 'react-native-firebase'

// Styles
import styles from './Styles/TodayScreenStyle'
import { Images } from '../Themes'

class TodayScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    getTopNews: PropTypes.func,
    getBusiness: PropTypes.func,
    getTech: PropTypes.func,
    getVideo: PropTypes.func,
    setHeader: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      isTop: false,
      isBusiness: false,
      isTech: false,
      isVideo: false,
      fetchingSeeAll: false,
      data: []
    }
  }

  componentDidMount() {
    // alert('get')
    const data = {
      page: 1
    }

    this.checkPermission();
    const { getTopNews, getBusiness, getTech, getVideo } = this.props
    getTopNews(data)
    getBusiness(data)
    // getTech(data)
    getVideo(data)
    this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
    });
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      // this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      // this.showAlert('Failed', 'No token received');
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }

  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }

  onPressDetail = (item) => {
    this.props.setHeader(item)
  }
  
  onPressDetailVideo = (item) => {
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

  _onRefresh = () => {
    this.setState({ isRefreshing: true })
    setTimeout(() => {
      this.componentDidMount()
      this.setState({ isRefreshing: false })
    }, 1000);
  }

  seeAll = (type) => {
    if(type === 'top'){
      this.props.navigation.navigate('LoadMoreNewsScreen')
    }
    if(type === 'business'){
      this.props.navigation.navigate('LoadMoreBusinessScreen')
    }
    if(type === 'tech'){
      this.props.navigation.navigate('LoadMoreTechScreen')
    }
    if(type === 'video'){
      this.props.navigation.navigate('LoadMoreVideoScreen')
    }
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
      />
    );
  };

  renderVideo = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.onPressDetailVideo(item)} style={styles.containerVideo} key={index.toString()}>
        <Image source={{ uri: item.urlToImage }} style={styles.videoImage} />
        {item.title && item.title.length > 50 ?
          <Text style={styles.titleVideo}>{item.title.slice(0, 50)}..</Text>
          :
          <Text style={styles.titleVideo}>{item.title} </Text>
        }
      </TouchableOpacity>
    )
  }

  renderItem = (item, index) => {
    return (
      <View key={index.toString()}>
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
      </View>
    )
  }

  loadingContent() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text> load content</Text>
        <ActivityIndicator size={'small'} />
      </View>
    )
  }

  errorContent() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text> sorry something error </Text>
        <Text> pull to refresh content </Text>
      </View>
    )
  }

  emptyContent() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text> currently no news in this section </Text>
        <Text> pull to refresh content </Text>
      </View>
    )
  }

  renderTopSection = () => {
    const { getTopNewsData, newList } = this.props
    const { fetching, error } = getTopNewsData
    const data = newList.slice(0, 3)
    const newsType = 'top'

    const hasSeeAll = data.length > 0

    let renderContent = this.loadingContent()

    if (!fetching && data.length === 0) {
      renderContent = this.emptyContent()
    }

    if (data.length > 0) {
      renderContent = data.map((item, index) => {
        return this.renderItem(item, `top-${index}`)
      })
    }

    if (error) {
      renderContent = this.errorContent()
    }

    return (
      <View>
        <View style={styles.containerHead}>
          <View style={styles.boxTitle}>
            <Text style={styles.topNewsTitle}>Top News</Text>
          </View>
          {hasSeeAll && (
            <View style={styles.boxTitle}>
              <TouchableOpacity onPress={() => this.seeAll(newsType)}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {renderContent}
        <View style={styles.contentAdvert}>
          <Image source={Images.advertise} style={styles.advertise} resizeMode='stretch' />
        </View>
      </View>
    )
  }

  renderVideoSection = () => {
    const { getVideoData, videoList } = this.props
    const { fetching, error } = getVideoData
    const data = videoList.slice(0, 3)
    const newsType = 'video'

    const hasSeeAll = data.length > 0
    let renderContent = this.loadingContent()

    if (!fetching && data.length === 0) {
      renderContent = this.emptyContent()
    }

    if (data.length) {
      renderContent = (<ScrollView horizontal={true}>
        {data.map((item, index) => {
          return this.renderVideo(item, `vid-${index}`)
        })}
      </ScrollView>)
    }

    if (error) {
      renderContent = this.errorContent()
    }

    return (
      <View>
        <View style={styles.containerHead}>
          <View style={styles.boxTitle}>
            <Text style={styles.topNewsTitle}>Videos</Text>
          </View>
          {hasSeeAll && (
            <View style={styles.boxTitle}>
              <TouchableOpacity onPress={() => this.seeAll(newsType)}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {renderContent}
      </View>
    )
  }

  renderBusinessSection = () => {
    const { businessList, getBusinessData } = this.props
    const { fetching, error } = getBusinessData
    const data = businessList.slice(0, 3)
    const newsType = 'business'

    const hasSeeAll = data.length > 0
    let renderContent = this.loadingContent()

    if (!fetching && data.length === 0) {
      renderContent = this.emptyContent()
    }

    if (data.length > 0) {
      renderContent = data.map((item, index) => {
        return this.renderItem(item, `business-${index}`)
      })
    }

    if (error) {
      renderContent = this.errorContent()
    }

    return (
      <View>
        <View style={styles.containerHead}>
          <View style={styles.boxTitle}>
            <Text style={styles.topNewsTitle}>Business</Text>
          </View>
          {hasSeeAll && (
            <View style={styles.boxTitle}>
              <TouchableOpacity onPress={() => this.seeAll(newsType)}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {renderContent}

        <View style={styles.contentAdvert}>
          <Image source={Images.advertise} style={styles.advertise} resizeMode='stretch' />
        </View>
      </View>
    )
  }

  renderTechSection = () => {
    const { techList, getTechnData } = this.props
    const { fetching, error } = getTechnData
    const data = techList.slice(0, 3)
    const newsType = 'tech'

    const hasSeeAll = data.length > 0
    let renderContent = this.loadingContent()

    if (!fetching && data.length === 0) {
      renderContent = this.emptyContent()
    }

    if (data.length > 0) {
      renderContent = data.map((item, index) => {
        return this.renderItem(item, `tech-${index}`)
      })
    }

    if (error) {
      renderContent = this.errorContent()
    }

    return (
      <View>
        <View style={styles.containerHead}>
          <View style={styles.boxTitle}>
            <Text style={styles.topNewsTitle}>Technology</Text>
          </View>
          {hasSeeAll && (
            <View style={styles.boxTitle}>
              <TouchableOpacity onPress={() => this.seeAll(newsType)}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {renderContent}
      </View>
    )
  }

  render() {
    return (
      <ScrollView
        refreshControl={this._renderRefreshControl()}>
        <View style={styles.wrapper}>
          {this.renderTopSection()}
          {this.renderVideoSection()}
          {this.renderBusinessSection()}
          {this.renderTechSection()}
        </View>
      </ScrollView>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    getTopNewsData: state.news.getTopNews,
    newList: state.news.newsTopList,
    getBusinessData: state.news.getBusiness,
    businessList: state.news.businessList,
    getTechnData: state.news.getTech,
    techList: state.news.videoList,
    getVideoData: state.news.getVideo,
    videoList: state.news.videoList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopNews: data => dispatch(TodayData.getTopRequest(data)),
    getBusiness: data => dispatch(TodayData.getBusinessRequest(data)),
    getTech: data => dispatch(TodayData.getTechnoRequest(data)),
    getVideo: data => dispatch(TodayData.getVideoRequest(data)),
    setHeader: data => dispatch(TodayData.setHeader(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayScreen)
