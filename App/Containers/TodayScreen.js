import React, { Component } from 'react'
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

// Styles
import styles from './Styles/TodayScreenStyle'
import { Images } from '../Themes'

class TodayScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    getTopNews: PropTypes.func,
    getBusiness: PropTypes.func,
    getTech: PropTypes.func,
    getVideo: PropTypes.func
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
    const { getTopNews, getBusiness, getTech, getVideo } = this.props
    getTopNews()
    getBusiness(),
    getTech()
    getVideo()
  }

  detail = (item) => {
    this.props.navigation.navigate('DetailScreen', {
      dataDetail: item
    })
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
    if (type === 'top') {
      this.setState({ isTop: true })
    }
    if (type === 'business') {
      this.setState({ isBusiness: true })
    }
    if (type === 'tech') {
      this.setState({ isTech: true })
    }
    if (type === 'video') {
      this.setState({ isVideo: true })
    }
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
        <Text style={styles.titleVideo}>{item.title}</Text>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.detail(item)}>
        <View style={styles.container}>
          <View style={styles.boxTitleTopNews}>
            <Text style={styles.title}>{item.title}</Text>
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
            <Text style={styles.total}>125k</Text>
          </View>
          <View style={styles.shared}>
            <Image source={Images.share} style={styles.shareIcon} />
            <Text style={styles.total}>125k</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
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
        <View><Text>Failure Get Data</Text></View>
      )
    }

    if (getTopNewsData.fetching === false && getTopNewsData.payload !== undefined && getBusiness !== undefined && getTech !== undefined && getVideoData !== undefined
      && this.state.isTop === false && this.state.isBusiness === false && this.state.isTech === false && this.state.isVideo === false && this.state.fetchingSeeAll === false) {
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
              // keyExtractor={(item, index) => index.toString()}
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

            // keyExtractor={item => item.id}
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

            // keyExtractor={item => item.id}
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
        <ScrollView refreshControl={this._renderRefreshControl()}>
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
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              // keyExtractor={(item, index) => index.toString()}
              // keyExtractor={item => item.id}
              keyExtractor={item => item.author}

            />
          </View>
        </ScrollView>
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

            // keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item => item.id}
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

            // keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item => item.id}
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
  return {
    getTopNewsData: state.news.getTopNews,
    newList: state.news.newsTopList.articles,
    getBusinessData: state.news.getBusiness,
    businessList: state.news.businessList.articles,
    getTechno: state.news.getTech,
    techList: state.news.TechList.articles,
    getVideoData: state.news.getVideo,
    videoList: state.news.videoList.articles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopNews: () => dispatch(TodayData.getTopRequest()),
    getBusiness: () => dispatch(TodayData.getBusinessRequest()),
    getTech: () => dispatch(TodayData.getTechnoRequest()),
    getVideo: () => dispatch(TodayData.getVideoRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayScreen)
