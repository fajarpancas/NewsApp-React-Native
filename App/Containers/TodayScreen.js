import React, { Component, Fragment, useEffect } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import TodayData from '../Redux/TodayRedux'
import PropTypes from 'prop-types'
import Moment from 'moment'
import firebase from 'react-native-firebase'
import type { Notification, NotificationOpen } from 'react-native-firebase'

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
    this.checkPermission();
    const { getTopNews, getBusiness, getTech, getVideo } = this.props
    getTopNews()
    getBusiness()
    getTech()
    getVideo()
    this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
    });
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
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

  detail = (item) => {
    // alert(item)
    this.props.setHeader(item)
    // this.props.navigation.navigate('DetailScreen', {
    //   dataDetail: item
    // })
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true })
    setTimeout(() => {
      this.componentDidMount()
      this.setState({ isRefreshing: false })
    }, 1000);
  }

  delaySeeAll = (type) => {
    this.setState({ fetchingSeeAll: true })
    setTimeout(() => {
      this.setState({ fetchingSeeAll: false })
      this.seeAll(type);
    }, 1000);
  }

  delaySeeLess = (type) => {
    this.setState({ fetchingSeeAll: true })
    setTimeout(() => {
      this.setState({ fetchingSeeAll: false })
      this.seeLess(type);
    }, 1000);
  }

  seeAll = (type) => {
    this.props.navigation.navigate('LoadMoreNewsScreen')
    // if (type === 'top') {
    //   this.setState({ isTop: true })
    // }
    // if (type === 'business') {
    //   this.setState({ isBusiness: true })
    // }
    // if (type === 'tech') {
    //   this.setState({ isTech: true })
    // }
    // if (type === 'video') {
    //   this.setState({ isVideo: true })
    // }
  }

  seeLess = (type) => {
    if (type === 'top') {
      this.setState({ isTop: false })
    }
    if (type === 'business') {
      this.setState({ isBusiness: false })
    }
    if (type === 'tech') {
      this.setState({ isTech: false })
    }
    if (type === 'video') {
      this.setState({ isVideo: false })
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

  renderVideo = ({ item }) => {
    return (
      <View style={styles.containerVideo}>
        <Image source={{ uri: item.urlToImage }} style={styles.videoImage} />
        {item.title && item.title.length > 50 ?
          <Text style={styles.titleVideo}>{item.title.slice(0, 50)}..</Text>
          :
          <Text style={styles.titleVideo}>{item.title} </Text>
        }
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.detail(item)}>
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
    // if (this.props.fetching) {
      return <ActivityIndicator />
    // }
    // return null
  }

  render() {
    const { getTopNewsData, newList, getBusiness, businessList, getTech, techList, getVideoData, videoList } = this.props

    if (getTopNewsData.fetching === true) {
      return (
        <ActivityIndicator size="large" style={{ marginTop: 20 }}></ActivityIndicator>
      )
    }

    if (getTopNewsData.fetching === false && getTopNewsData.error === true) {
      return (
        <ScrollView refreshControl={this._renderRefreshControl()}>
          <Text>Failure Get Data</Text>
        </ScrollView>
      )
    }

    if (getTopNewsData.fetching === false && getTopNewsData.payload !== undefined && getBusiness !== undefined && getTech !== undefined && getVideoData !== undefined
      && this.state.isTop === false && this.state.isBusiness === false && this.state.isTech === false && this.state.isVideo === false && this.state.fetchingSeeAll === false) {
      // if(newList && newList.length){
      //   for( let i = 0; i < newList.length; i++){
      //     newList[0]
      //   }
      // }
      return (
        <ScrollView refreshControl={this._renderRefreshControl()}>
          <View style={styles.wrapper}>
            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Top News</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeAll('top')}>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={newList && newList.length ? newList.slice(0, 3) : newList}
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              keyExtractor={item => item.author}
            />

            <View style={styles.contentAdvert}>
              <Image source={Images.advertise} style={styles.advertise} resizeMode='stretch' />
            </View>

            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Videos</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeAll('video')}>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              horizontal
              data={videoList && videoList.length ? videoList.slice(0, 3) : videoList}
              renderItem={this.renderVideo}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              keyExtractor={item => item.author}
            />

            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Business</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeAll('business')}>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={businessList && businessList.length ? businessList.slice(0, 3) : businessList}
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              keyExtractor={item => item.author}
            />

            <View style={styles.contentAdvert}>
              <Image source={Images.advertise} style={styles.advertise} resizeMode='stretch' />
            </View>

            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Technology</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeAll('tech')}>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={techList && techList.length ? techList.slice(0, 3) : techList}
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              // keyExtractor={item => item.id}
              keyExtractor={item => item.author}

            />
          </View>
        </ScrollView>

      )
    }

    if (this.state.fetchingSeeAll === true) {
      return (
        <ActivityIndicator size="large" style={{ marginTop: 20 }}></ActivityIndicator>
      )
    }

    if (newList && this.state.isTop === true) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.wrapper}>
            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>All Top News</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeLess('top')}>
                  <Text style={styles.seeAllText}>See Less</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={newList}
              renderItem={this.renderItem.bind(this)}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              // keyExtractor={(item, index) => index.toString()}
              // keyExtractor={item => item.id}
              keyExtractor={item => item.author}
              ListFooterComponent={this.renderLoading}
              onEndReachedThreshold={0.5}
              onEndReached={(distance) => console.log(distance)}

            />
          </View>
        </View>
      )
    }

    if (newList && this.state.isBusiness === true) {
      return (
        <ScrollView refreshControl={this._renderRefreshControl()}>
          <View style={styles.wrapper}>
            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>All Business</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeLess('business')}>
                  <Text style={styles.seeAllText}>See Less</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={businessList}
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              keyExtractor={item => item.author}
            />
          </View>
        </ScrollView>
      )
    }

    if (newList && this.state.isVideo === true) {
      return (
        <ScrollView refreshControl={this._renderRefreshControl()}>
          <View style={styles.wrapper}>
            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>All Video</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeLess('video')}>
                  <Text style={styles.seeAllText}>See Less</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={videoList}
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              keyExtractor={item => item.author}
            />
          </View>
        </ScrollView>
      )
    }

    if (techList && this.state.isTech === true) {
      return (
        <ScrollView refreshControl={this._renderRefreshControl()}>
          <View style={styles.wrapper}>
            <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>All Technology</Text>
              </View>
              <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => this.delaySeeLess('tech')}>
                  <Text style={styles.seeAllText}>See Less</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={techList}
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              keyExtractor={item => item.author}
            />
          </View>
        </ScrollView>
      )
    }

    return (
      <View><Text></Text></View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(JSON.stringify(state.session.newsTop))
  return {
    getTopNewsData: state.news.getTopNews,
    newList: state.news.newsTopList,
    getBusinessData: state.news.getBusiness,
    businessList: state.news.businessList,
    getTechno: state.news.getTech,
    techList: state.news.videoList,
    getVideoData: state.news.getVideo,
    videoList: state.news.videoList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopNews: () => dispatch(TodayData.getTopRequest()),
    getBusiness: () => dispatch(TodayData.getBusinessRequest()),
    getTech: () => dispatch(TodayData.getTechnoRequest()),
    getVideo: () => dispatch(TodayData.getVideoRequest()),
    setHeader: data => dispatch(TodayData.setHeader(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayScreen)
