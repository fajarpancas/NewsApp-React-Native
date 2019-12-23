import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import TodayData from '../Redux/TodayRedux'
import PropTypes from 'prop-types'
import Moment from 'moment'

// Styles
import styles from './Styles/TodayScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome';
// import { TouchableOpacity } from 'react-native-gesture-handler'

class TodayScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    getTopNews: PropTypes.func,
    getBusiness: PropTypes.func,
    getTech: PropTypes.func,
    getVideo: PropTypes.func
  }
  
  constructor(props){    
    super(props)
    this.state = {
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

  detail = (item) =>{
    this.props.navigation.navigate('DetailScreen', {
      dataDetail : item
    })
  }

  renderVideo = ({item}) =>{
    return(
      <View style={styles.containerVideo}>
        <Image source={{uri: item.urlToImage}} style={styles.videoImage} />
        <Text style={styles.titleVideo}>{item.title}</Text>
      </View>
    )
  }

  renderItem = ({item}) => {
    // alert(JSON.stringify(item))
    return (
      <TouchableOpacity onPress={() => this.detail(item)}>
        <View style={styles.container}>
        <View style={styles.boxTitleTopNews}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.boxImageTopNews}>
                <Image source={{uri: item.urlToImage}} style={styles.boxImageTopNews} />
                {/* <Text style={styles.image}>{item.image}</Text> */}
              </View>
          </View>
          <View style={styles.container2}>
              <View style={styles.uploaded}>
                <Text style={styles.timeText}>{Moment(item.publishedAt).format('DD MMMM YYYY')}</Text>
              </View>
              <View style={styles.view}>
              <Icon.Button
                  name="eye"
                  backgroundColor="white"
                  color="grey"
                  padding={0}
                  margin={5}
                  size={9}
                  onPress={this.loginWithFacebook}>
                    <Text></Text>
              </Icon.Button>
              </View>
              <View style={styles.shared}>
              <Icon.Button
                  name="share"
                  backgroundColor="white"
                  color="grey"
                  padding={0}
                  margin={5}
                  size={9}
                  onPress={this.loginWithFacebook}>
                    <Text></Text>
              </Icon.Button>      
              </View>
          </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { getTopNewsData, newList, getBusiness, businessList, getTech, techList, getVideoData, videoList  } = this.props
    const { fetching, payload, error } = getTopNewsData

    if (getTopNewsData.fetching === true) {
      return(
        <ActivityIndicator size="large" style={{marginTop: 20}}></ActivityIndicator>
      )
      // return <RenderLoading />
    }

    if (getTopNewsData.fetching === false && getTopNewsData.error === true){
      return(
        <View><Text>Failure Get Data</Text></View>
      )
    }

    // if(getTopNewsData.fetching === false && getTopNewsData.payload !== undefined){
    return (
      <ScrollView>
          <View style={styles.wrapper}>
          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Top News</Text>
              </View>
              <View style={styles.boxTitle}>
                <Text style={styles.seeAllText}>See all</Text>
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
            initialNumToRender={3}
            // keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item => item.id}
          />

          <View style={styles.contentAdvert}></View>

          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Videos</Text>
              </View>
              <View style={styles.boxTitle}>
                <Text style={styles.seeAllText}>See all</Text>
              </View>
          </View>

          <FlatList
          horizontal
            data={videoList}
            renderItem={this.renderVideo}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View><Text>Empty Data</Text></View>
              )
            }}
            // keyExtractor={item => item.id}
          />

          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Business</Text>
              </View>
              <View style={styles.boxTitle}>
                <Text style={styles.seeAllText}>See all</Text>
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
            // keyExtractor={item => item.id}
          />

          <View style={styles.contentAdvert}></View>

          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Technology</Text>
              </View>
              <View style={styles.boxTitle}>
                <Text style={styles.seeAllText}>See all</Text>
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
            // keyExtractor={item => item.id}
          />
          </View>  
      </ScrollView>
      )
    }
  // }
}

const mapStateToProps = (state) => {
  // alert(JSON.stringify(state.news.videoList.articles.length))
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
