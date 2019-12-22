import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import TodayData from '../Redux/TodayRedux'
import PropTypes from 'prop-types'

// Styles
import styles from './Styles/TodayScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome';

class TodayScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    getTopNews: PropTypes.func
  }
  
  constructor(props){    
    super(props)
    this.state = {
      data: [
        {
          id: 1,
          title: 'Trumps says new U.S law on Hong Kong doesn’t help China trade talk',
          image: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png',
          upload: 2,
          view: 110,
          share: 131
        },
        {
          id: 2,
          title: 'Elon Musk’s jury to be queried on opinions of billionaires',
          image: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          upload: 2,
          view: 120,
          share: 111
        },
        {
          id: 3,
          title: 'China’s Xiaomi launches online lending service in India',
          image: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          upload: 2,
          view: 125,
          share: 112
        },
      ]
    }
  }

  componentDidMount() {
    const {getTopNews} = this.props
    getTopNews()

  }

  renderVideo = ({item}) =>{
    return(
      <View style={styles.containerVideo}>
        <Image source={{uri: item.image}} style={styles.videoImage} />
        <Text style={styles.titleVideo}>{item.title}</Text>
      </View>
    )
  }

  renderItem = ({item}) => {
    // alert(JSON.stringify(item))
    return (
      <View>
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
                <Text style={styles.timeText}>{item.publishedAt} hours ago</Text>
              </View>
              <View style={styles.view}>
              <Icon.Button
                  name="eye"
                  backgroundColor="white"
                  color="grey"
                  size={9}
                  padding={0}
                  margin={5}
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
      </View>
    )
  }

  render () {
    const { getTopNewsData, newList } = this.props
    const { fetching, payload, error } = getTopNewsData

    if (fetching === true) {
      return(
        <View><Text>Loading</Text></View>
      )
      // return <RenderLoading />
    }

    if (fetching === false && error === true){
      return(
        <View><Text>Failure Get Data</Text></View>
      )
    }

    if(fetching === false && payload !== undefined){
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
            numColumns={2}
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

          {/* <FlatList
          horizontal
            data={data}
            renderItem={this.renderVideo}
            showsHorizontalScrollIndicator={false}
            // keyExtractor={item => item.id}
          /> */}

          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Business</Text>
              </View>
              <View style={styles.boxTitle}>
                <Text style={styles.seeAllText}>See all</Text>
              </View>
          </View>

          {/* <FlatList
            data={data}
            renderItem={this.renderItem}
            // keyExtractor={item => item.id}
          /> */}

          <View style={styles.contentAdvert}></View>

          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Technology</Text>
              </View>
              <View style={styles.boxTitle}>
                <Text style={styles.seeAllText}>See all</Text>
              </View>
          </View>

          {/* <FlatList
            data={data}
            renderItem={this.renderItem}
            // keyExtractor={item => item.id}
          /> */}
        </View>  
      </ScrollView>
    )
    }
  }
}

const mapStateToProps = (state) => {
  // alert(JSON.stringify(state.news.newsTopList.articles))
  return {
    getTopNewsData: state.news.getTopNews,
    newList: state.news.newsTopList.articles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopNews: () => dispatch(TodayData.getTopRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayScreen)
